import { execFileSync, spawnSync } from 'node:child_process'
import { createHash } from 'node:crypto'
import { existsSync, readdirSync, readFileSync, writeFileSync } from 'node:fs'
import { basename, dirname, join, relative, resolve, sep } from 'node:path'
import { fileURLToPath } from 'node:url'

const repoRoot = join(dirname(fileURLToPath(import.meta.url)), '..')
const BUMPS = ['patch', 'minor', 'major']
const FLAGS = ['--dry-run', '--yes-publish']
const rawArgs = process.argv.slice(2)
const args = []
let planFile
for (let index = 0; index < rawArgs.length; index += 1) {
  const arg = rawArgs[index]
  if (arg === '--plan') {
    planFile = rawArgs[index + 1] ?? ''
    index += 1
  } else if (arg.startsWith('--plan=')) {
    planFile = arg.slice('--plan='.length)
  } else {
    args.push(arg)
  }
}
const bump = args.find((arg) => BUMPS.includes(arg))
const dryRun = args.includes('--dry-run') || process.env.npm_config_dry_run === 'true'
const confirmedPublish = args.includes('--yes-publish')
const VERSION_FILES = new Set(['package.json', 'package-lock.json', 'CHANGELOG.md'])
const RELEASE_IDENTITY = ['-c', 'user.name=Vitor Bastos', '-c', 'user.email=vbss-services@outlook.com']
const INTERNAL_RANGE = '*'
const DEPENDENCY_FIELDS = ['dependencies', 'devDependencies', 'peerDependencies', 'optionalDependencies']

const refuseUsage = (message) => {
  console.error(message)
  process.exit(2)
}

const USAGE = 'usage: release.mjs <patch|minor|major | --plan <file.json>> [--dry-run | --yes-publish] (flags and bump in any order)'
const unknownArgs = args.filter((arg) => !FLAGS.includes(arg) && !BUMPS.includes(arg))
const bumpCount = args.filter((arg) => BUMPS.includes(arg)).length
const usesPlan = planFile !== undefined
if (unknownArgs.length > 0 || bumpCount > 1 || usesPlan === (bumpCount === 1) || planFile === '') refuseUsage(USAGE)
if (!dryRun && !confirmedPublish) {
  refuseUsage(
    'release not started: a real release needs the explicit --yes-publish argument (npm run release -- <patch|minor|major | --plan release-plan.json> --yes-publish); to rehearse use npm run release:dry -- <patch|minor|major | --plan release-plan.json>'
  )
}

const loadPlan = (file) => {
  let plan
  try {
    plan = JSON.parse(readFileSync(resolve(repoRoot, file), 'utf8'))
  } catch (error) {
    refuseUsage(`release not started: plan file ${file} could not be read as JSON (${error.message})`)
  }
  if (plan === null || typeof plan !== 'object' || Array.isArray(plan)) {
    refuseUsage(`release not started: plan file ${file} must be a JSON object { "<package>": "major|minor|patch" }`)
  }
  const invalid = Object.entries(plan).filter(([, value]) => !BUMPS.includes(value))
  if (invalid.length > 0) {
    refuseUsage(`release not started: invalid plan values (only major, minor or patch): ${invalid.map(([name, value]) => `${name}=${JSON.stringify(value)}`).join(', ')}`)
  }
  return plan
}

const plan = usesPlan ? loadPlan(planFile) : null

const childEnv = { ...process.env, VBSS_RELEASE: '1' }
delete childEnv.npm_config_dry_run

const git = (...gitArgs) => execFileSync('git', gitArgs, { cwd: repoRoot, encoding: 'utf8' }).trim()

let versionStepStarted = false
let publishStarted = false
let startHead = ''
let tagsBefore = []

const listTags = () => git('tag', '--list').split('\n').filter(Boolean)

const changedVersionFiles = () =>
  git('diff', 'HEAD', '--name-only')
    .split('\n')
    .filter((file) => file && VERSION_FILES.has(basename(file)))

const restoreVersionFiles = () => {
  const files = changedVersionFiles()
  if (files.length > 0) git('checkout', 'HEAD', '--', ...files)
}

const undoVersionStep = () => {
  if (!versionStepStarted) return ''
  if (dryRun) {
    restoreVersionFiles()
    return ''
  }
  if (publishStarted) return ' (publish had already started: the version commit and tags were kept, check the registry before anything else)'
  const notes = []
  for (const tag of listTags().filter((name) => !tagsBefore.includes(name))) {
    try {
      git('tag', '-d', tag)
      notes.push(`tag ${tag} deleted`)
    } catch {
      notes.push(`tag ${tag} could not be deleted, delete it by hand`)
    }
  }
  try {
    if (git('rev-parse', 'HEAD') !== startHead) {
      git('reset', '--keep', startHead)
      notes.push(`HEAD moved back to ${startHead.slice(0, 7)}`)
    }
    restoreVersionFiles()
  } catch {
    notes.push(`HEAD could not be moved back, run "git reset --keep ${startHead}" by hand`)
  }
  return notes.length > 0 ? ` (undone: ${notes.join(', ')})` : ''
}

const refuse = (reason) => {
  const undone = undoVersionStep()
  console.error(`release refused: ${reason}${undone}`)
  process.exit(1)
}

const run = (command, { capture = false } = {}) => {
  const result = spawnSync(command, {
    cwd: repoRoot,
    stdio: capture ? ['inherit', 'pipe', 'inherit'] : 'inherit',
    encoding: 'utf8',
    shell: true,
    env: childEnv,
  })
  if (result.status !== 0) refuse(`"${command}" failed with exit ${result.status ?? 'null'}`)
  return result.stdout
}

const listFiles = (dir) =>
  readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    const path = join(dir, entry.name)
    return entry.isDirectory() ? listFiles(path) : [path]
  })

const distHash = (locations) => {
  const hash = createHash('sha256')
  for (const location of [...locations].sort()) {
    const dist = join(location, 'dist')
    if (!existsSync(dist)) refuse(`${location} has no dist/ after verify`)
    for (const file of listFiles(dist).sort()) {
      hash.update(file.slice(repoRoot.length))
      hash.update(readFileSync(file))
    }
  }
  return hash.digest('hex')
}

const readManifest = (pkg) => JSON.parse(readFileSync(join(pkg.location, 'package.json'), 'utf8'))

const topologicalOrder = (packages) => {
  const names = new Set(packages.map((pkg) => pkg.name))
  const internalDependencies = new Map(
    packages.map((pkg) => {
      const manifest = readManifest(pkg)
      const dependencies = DEPENDENCY_FIELDS.flatMap((field) => Object.keys(manifest[field] ?? {})).filter((name) => names.has(name) && name !== pkg.name)
      return [pkg.name, dependencies]
    })
  )
  const remaining = [...packages].sort((a, b) => a.name.localeCompare(b.name))
  const ordered = []
  while (remaining.length > 0) {
    const index = remaining.findIndex((pkg) => internalDependencies.get(pkg.name).every((name) => ordered.some((done) => done.name === name)))
    if (index === -1) refuse(`dependency cycle between ${remaining.map((pkg) => pkg.name).join(', ')}`)
    ordered.push(...remaining.splice(index, 1))
  }
  return ordered
}

const validatePlan = (planned, changedPackages, allPackages) => {
  const changedNames = new Set(changedPackages.map((pkg) => pkg.name))
  const problems = []
  for (const name of Object.keys(planned)) {
    const known = allPackages.find((pkg) => pkg.name === name)
    if (!known) problems.push(`${name} is not a package of this repository`)
    else if (known.private) problems.push(`${name} is private and is never released`)
    else if (!changedNames.has(name)) problems.push(`${name} did not change since its release tag`)
  }
  for (const name of changedNames) {
    if (!Object.hasOwn(planned, name)) problems.push(`${name} changed but is missing from the plan`)
  }
  if (problems.length > 0) refuseUsage(`release not started: the plan does not match the changed packages: ${problems.join('; ')}`)
}

const nextVersion = (version, level) => {
  const match = /^(\d+)\.(\d+)\.(\d+)$/.exec(version)
  if (!match) refuse(`cannot compute the ${level} bump of version ${version}: only plain x.y.z versions are supported`)
  const [major, minor, patch] = match.slice(1).map(Number)
  if (level === 'major') return `${major + 1}.0.0`
  if (level === 'minor') return `${major}.${minor + 1}.0`
  return `${major}.${minor}.${patch + 1}`
}

const requireWildcardInternalRanges = (releases, allPackages) => {
  const released = new Set(releases.map((release) => release.name))
  for (const pkg of allPackages) {
    const manifest = readManifest(pkg)
    for (const field of DEPENDENCY_FIELDS) {
      for (const [name, range] of Object.entries(manifest[field] ?? {})) {
        if (released.has(name) && range !== INTERNAL_RANGE) {
          refuse(`${pkg.name} depends on ${name}@${range} in ${field}; per-package plans only support the "${INTERNAL_RANGE}" range lerna leaves untouched`)
        }
      }
    }
  }
}

const readJsonFile = (file) => {
  const text = readFileSync(file, 'utf8')
  const eol = text.includes('\r\n') ? '\r\n' : '\n'
  const indent = /^([ \t]+)"/m.exec(text)?.[1] ?? '  '
  return { json: JSON.parse(text), indent, eol, finalEol: text.endsWith('\n') }
}

const writeJsonFile = (file, { json, indent, eol, finalEol }) => {
  const text = JSON.stringify(json, null, indent).replace(/\n/g, eol)
  writeFileSync(file, finalEol ? `${text}${eol}` : text)
}

const applyReleases = (releases) => {
  const lockFile = join(repoRoot, 'package-lock.json')
  const lock = readJsonFile(lockFile)
  const files = [lockFile]
  for (const release of releases) {
    const manifestFile = join(release.location, 'package.json')
    const manifest = readJsonFile(manifestFile)
    const lockEntry = lock.json.packages?.[relative(repoRoot, release.location).split(sep).join('/')]
    if (manifest.json.version !== release.from || lockEntry?.name !== release.name || lockEntry.version !== release.from) {
      refuse(`${release.name} is at ${manifest.json.version} in package.json and ${lockEntry?.version} in package-lock.json, expected ${release.from} in both`)
    }
    manifest.json.version = release.to
    lockEntry.version = release.to
    writeJsonFile(manifestFile, manifest)
    files.push(manifestFile)
  }
  writeJsonFile(lockFile, lock)
  return files.map((file) => relative(repoRoot, file))
}

const commitAndTagReleases = (releases, files) => {
  const label = (release) => `${release.name}@${release.to}`
  git('add', '--', ...files)
  git(...RELEASE_IDENTITY, 'commit', '--message', `chore(release): publish\n\n${releases.map((release) => `- ${label(release)}`).join('\n')}`)
  for (const release of releases) git(...RELEASE_IDENTITY, 'tag', '-a', label(release), '-m', label(release))
}

const requireCleanTree = (when) => {
  if (git('status', '--porcelain') !== '') refuse(`the working tree is dirty ${when}; commit or stash first`)
}

const requireAnnotatedReleaseTags = (packages) => {
  for (const pkg of packages) {
    const tag = `${pkg.name}@${pkg.version}`
    const type = git('for-each-ref', '--format=%(objecttype)', `refs/tags/${tag}`)
    if (type === '') refuse(`${pkg.name} has no release tag ${tag}; create it with: git tag -a "${tag}" -m "${tag}"`)
    if (type !== 'tag') {
      refuse(`${pkg.name} release tag ${tag} is lightweight and lerna ignores it; recreate it with: git tag -d "${tag}" && git tag -a "${tag}" -m "${tag}"`)
    }
  }
}

console.log(dryRun ? 'mode: dry run (nothing will be published, the repository is restored)' : 'mode: REAL release (--yes-publish given)')

requireCleanTree('before verify')
try {
  git('describe', '--tags', '--abbrev=0')
} catch {
  refuse('no release tags found; tag each published version first (git tag -a "<name>@<version>" -m "<name>@<version>") so lerna can detect what changed')
}
startHead = git('rev-parse', 'HEAD')

const allPackages = JSON.parse(run('npx --no-install lerna ls --all --json', { capture: true }))
const publishable = allPackages.filter((pkg) => !pkg.private)
requireAnnotatedReleaseTags(publishable)

const changed = JSON.parse(run('npx --no-install lerna changed --json', { capture: true })).filter((pkg) => !pkg.private)
if (changed.length === 0) refuse('no publishable package changed since the last release tag')
if (plan) validatePlan(plan, changed, allPackages)
const ordered = topologicalOrder(changed)
const locations = ordered.map((pkg) => pkg.location)

const releases = plan ? ordered.map((pkg) => ({ name: pkg.name, location: pkg.location, from: pkg.version, to: nextVersion(pkg.version, plan[pkg.name]), level: plan[pkg.name] })) : []
if (plan) {
  requireWildcardInternalRanges(releases, allPackages)
  console.log('release plan (per package):')
  for (const release of releases) console.log(`  ${release.name}: ${release.from} -> ${release.to} (${release.level})`)
} else {
  console.log(`release plan (${bump}): ${ordered.map((pkg) => `${pkg.name}@${pkg.version}`).join(', ')}`)
}

run('npm run verify')

requireCleanTree('after verify')
if (git('rev-parse', 'HEAD') !== startHead) refuse('HEAD moved during verify')
const verifiedDist = distHash(locations)

tagsBefore = listTags()
versionStepStarted = true
if (plan) {
  const files = applyReleases(releases)
  if (!dryRun) commitAndTagReleases(releases, files)
} else if (dryRun) {
  run(`npx --no-install lerna version ${bump} --yes --no-git-tag-version --no-push`)
} else {
  run(`npx --no-install lerna version ${bump} --yes --no-push --message "chore(release): publish"`)
}
if (!dryRun) {
  const touched = git('diff', '--name-only', startHead, 'HEAD').split('\n').filter(Boolean)
  const unexpected = touched.filter((file) => !VERSION_FILES.has(file.split('/').pop()))
  if (unexpected.length > 0) refuse(`the version commit touched unexpected files: ${unexpected.join(', ')}`)
  requireCleanTree('after version')
}

if (distHash(locations) !== verifiedDist) refuse('dist/ changed after verify; run the release again')

const nextVersions = ordered.map((pkg) => {
  const manifest = readManifest(pkg)
  return `${manifest.name}@${manifest.version}`
})
console.log(`${dryRun ? 'would publish' : 'publishing'}: ${nextVersions.join(', ')}`)

if (dryRun) {
  for (const pkg of ordered) {
    console.log(`dry run: ${pkg.name}`)
    const result = spawnSync('npm publish --dry-run --ignore-scripts=false', {
      cwd: pkg.location,
      stdio: 'inherit',
      shell: true,
      env: childEnv,
    })
    if (result.status !== 0) refuse(`dry-run publish of ${pkg.name} failed with exit ${result.status ?? 'null'}`)
  }
  restoreVersionFiles()
  console.log(`dry run finished: ${ordered.length} package(s) would be published, nothing was published and the repository was restored`)
} else {
  publishStarted = true
  run('npx --no-install lerna publish from-package --yes')
}
