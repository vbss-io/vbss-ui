import { execFileSync, spawnSync } from 'node:child_process'
import { createHash } from 'node:crypto'
import { existsSync, readdirSync, readFileSync } from 'node:fs'
import { basename, dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

const repoRoot = join(dirname(fileURLToPath(import.meta.url)), '..')
const BUMPS = ['patch', 'minor', 'major']
const args = process.argv.slice(2)
const bump = args.find((arg) => BUMPS.includes(arg))
const dryRun = args.includes('--dry-run')
const VERSION_FILES = new Set(['package.json', 'package-lock.json', 'CHANGELOG.md'])

const unknownArgs = args.filter((arg) => arg !== '--dry-run' && !BUMPS.includes(arg))
if (!bump || args.filter((arg) => BUMPS.includes(arg)).length !== 1 || unknownArgs.length > 0) {
  console.error('usage: release.mjs <patch|minor|major> [--dry-run] (flag and bump in any order)')
  process.exit(2)
}

const git = (...args) => execFileSync('git', args, { cwd: repoRoot, encoding: 'utf8' }).trim()

let versionStepStarted = false

const changedVersionFiles = () =>
  git('diff', '--name-only')
    .split('\n')
    .filter((file) => file && VERSION_FILES.has(basename(file)))

const restoreDryRun = () => {
  if (!dryRun || !versionStepStarted) return
  const files = changedVersionFiles()
  if (files.length > 0) git('checkout', '--', ...files)
}

const refuse = (reason) => {
  restoreDryRun()
  console.error(`release refused: ${reason}`)
  process.exit(1)
}

const run = (command, { capture = false } = {}) => {
  const result = spawnSync(command, {
    cwd: repoRoot,
    stdio: capture ? ['inherit', 'pipe', 'inherit'] : 'inherit',
    encoding: 'utf8',
    shell: true,
    env: { ...process.env, VBSS_RELEASE: '1' },
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

requireCleanTree('before verify')
try {
  git('describe', '--tags', '--abbrev=0')
} catch {
  refuse('no release tags found; tag each published version first (git tag "<name>@<version>") so lerna can detect what changed')
}
const startHead = git('rev-parse', 'HEAD')

run('npm run verify')

requireCleanTree('after verify')
if (git('rev-parse', 'HEAD') !== startHead) refuse('HEAD moved during verify')

const changed = JSON.parse(run('npx --no-install lerna changed --json', { capture: true })).filter((pkg) => !pkg.private)
if (changed.length === 0) refuse('no publishable package changed since the last release tag')
const locations = changed.map((pkg) => pkg.location)
const verifiedDist = distHash(locations)

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

if (dryRun) {
  for (const pkg of changed) {
    console.log(`dry run: ${pkg.name}`)
    const result = spawnSync('npm publish --dry-run --ignore-scripts=false', {
      cwd: pkg.location,
      stdio: 'inherit',
      shell: true,
      env: { ...process.env, VBSS_RELEASE: '1' },
    })
    if (result.status !== 0) refuse(`dry-run publish of ${pkg.name} failed with exit ${result.status ?? 'null'}`)
  }
  restoreDryRun()
  console.log(`dry run finished: ${changed.length} package(s) would be published, nothing was published and the repository was restored`)
} else {
  run('npx --no-install lerna publish from-package --yes')
}
