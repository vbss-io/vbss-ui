import { execFileSync, spawnSync } from 'node:child_process'
import { createHash } from 'node:crypto'
import { existsSync, readdirSync, readFileSync } from 'node:fs'
import { basename, dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

const repoRoot = join(dirname(fileURLToPath(import.meta.url)), '..')
const BUMPS = ['patch', 'minor', 'major']
const FLAGS = ['--dry-run', '--yes-publish']
const args = process.argv.slice(2)
const bump = args.find((arg) => BUMPS.includes(arg))
const dryRun = args.includes('--dry-run') || process.env.npm_config_dry_run === 'true'
const confirmedPublish = args.includes('--yes-publish')
const VERSION_FILES = new Set(['package.json', 'package-lock.json', 'CHANGELOG.md'])

const unknownArgs = args.filter((arg) => !FLAGS.includes(arg) && !BUMPS.includes(arg))
if (!bump || args.filter((arg) => BUMPS.includes(arg)).length !== 1 || unknownArgs.length > 0) {
  console.error('usage: release.mjs <patch|minor|major> [--dry-run | --yes-publish] (flags and bump in any order)')
  process.exit(2)
}
if (!dryRun && !confirmedPublish) {
  console.error(
    'release not started: a real release needs the explicit --yes-publish argument (npm run release -- <patch|minor|major> --yes-publish); to rehearse use npm run release:dry -- <patch|minor|major>'
  )
  process.exit(2)
}

const childEnv = { ...process.env, VBSS_RELEASE: '1' }
delete childEnv.npm_config_dry_run

const git = (...gitArgs) => execFileSync('git', gitArgs, { cwd: repoRoot, encoding: 'utf8' }).trim()

let versionStepStarted = false
let publishStarted = false
let startHead = ''
let tagsBefore = []

const listTags = () => git('tag', '--list').split('\n').filter(Boolean)

const changedVersionFiles = () =>
  git('diff', '--name-only')
    .split('\n')
    .filter((file) => file && VERSION_FILES.has(basename(file)))

const restoreVersionFiles = () => {
  const files = changedVersionFiles()
  if (files.length > 0) git('checkout', '--', ...files)
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

const publishable = JSON.parse(run('npx --no-install lerna ls --json', { capture: true })).filter((pkg) => !pkg.private)
requireAnnotatedReleaseTags(publishable)

const changed = JSON.parse(run('npx --no-install lerna changed --json', { capture: true })).filter((pkg) => !pkg.private)
if (changed.length === 0) refuse('no publishable package changed since the last release tag')
const locations = changed.map((pkg) => pkg.location)
console.log(`release plan (${bump}): ${changed.map((pkg) => `${pkg.name}@${pkg.version}`).join(', ')}`)

run('npm run verify')

requireCleanTree('after verify')
if (git('rev-parse', 'HEAD') !== startHead) refuse('HEAD moved during verify')
const verifiedDist = distHash(locations)

tagsBefore = listTags()
versionStepStarted = true
if (dryRun) {
  run(`npx --no-install lerna version ${bump} --yes --no-git-tag-version --no-push`)
} else {
  run(`npx --no-install lerna version ${bump} --yes --no-push --message "chore(release): publish"`)
  const touched = git('diff', '--name-only', startHead, 'HEAD').split('\n').filter(Boolean)
  const unexpected = touched.filter((file) => !VERSION_FILES.has(file.split('/').pop()))
  if (unexpected.length > 0) refuse(`the version commit touched unexpected files: ${unexpected.join(', ')}`)
  requireCleanTree('after version')
}

if (distHash(locations) !== verifiedDist) refuse('dist/ changed after verify; run the release again')

const nextVersions = changed.map((pkg) => {
  const manifest = JSON.parse(readFileSync(join(pkg.location, 'package.json'), 'utf8'))
  return `${manifest.name}@${manifest.version}`
})
console.log(`${dryRun ? 'would publish' : 'publishing'}: ${nextVersions.join(', ')}`)

if (dryRun) {
  for (const pkg of changed) {
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
  console.log(`dry run finished: ${changed.length} package(s) would be published, nothing was published and the repository was restored`)
} else {
  publishStarted = true
  run('npx --no-install lerna publish from-package --yes')
}
