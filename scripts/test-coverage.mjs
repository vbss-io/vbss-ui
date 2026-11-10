import { spawnSync } from "node:child_process"
import { rmSync } from "node:fs"
import { join } from "node:path"
import { fileURLToPath } from "node:url"
import { listUnits, unitSlug } from "./coverage-policy.mjs"

const root = join(fileURLToPath(new URL(".", import.meta.url)), "..")
const vitest = join(root, "node_modules", "vitest", "vitest.mjs")
const requested = process.argv.slice(2)
const all = listUnits(root)
const units = requested.length === 0 ? all : all.filter((unit) => requested.some((name) => unit.dir === name || unit.dir.endsWith(`/${name}`)))

if (units.length === 0 || (requested.length > 0 && units.length !== requested.length)) {
  console.error(`unknown unit in: ${requested.join(", ")}\nknown: ${all.map((unit) => unit.dir).join(", ")}`)
  process.exit(2)
}

if (requested.length === 0) rmSync(join(root, "coverage"), { recursive: true, force: true })

const failed = []
for (const unit of units) {
  console.log(`\n=== ${unit.name} (${unit.dir})`)
  const run = spawnSync(process.execPath, [vitest, "run", "--coverage"], {
    cwd: root,
    stdio: "inherit",
    env: { ...process.env, VBSS_COVERAGE_UNIT: unit.dir },
  })
  if (run.status !== 0) failed.push(unit.name)
}

console.log("\n=== independent coverage gate")
const gate = spawnSync(process.execPath, [join(root, "scripts", "coverage-gate.mjs"), ...units.map((unit) => unit.dir)], { cwd: root, stdio: "inherit" })

if (failed.length > 0) console.error(`\nvitest failed for: ${failed.join(", ")}`)
process.exit(failed.length > 0 || gate.status !== 0 ? 1 : 0)
