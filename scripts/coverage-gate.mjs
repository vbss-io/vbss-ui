import { existsSync, readFileSync } from "node:fs"
import { join, relative } from "node:path"
import { fileURLToPath } from "node:url"
import { listUnits, THRESHOLDS, unitSlug } from "./coverage-policy.mjs"

const root = join(fileURLToPath(new URL(".", import.meta.url)), "..")
const metrics = Object.keys(THRESHOLDS)
const failures = []

const only = process.argv.slice(2)
const units = listUnits(root).filter((unit) => only.length === 0 || only.includes(unit.dir))

for (const unit of units) {
  const summaryPath = join(root, "coverage", unitSlug(unit), "coverage-summary.json")
  if (!existsSync(summaryPath)) {
    failures.push(`${unit.name}: no coverage summary at ${relative(root, summaryPath)}`)
    continue
  }
  const files = Object.entries(JSON.parse(readFileSync(summaryPath, "utf8")))
    .filter(([key]) => key !== "total")
    .map(([key, value]) => [relative(root, key).split("\\").join("/"), value])
    .filter(([path]) => path.startsWith(unit.prefix) && /\.(ts|tsx)$/.test(path))
  if (files.length === 0) {
    failures.push(`${unit.name}: no instrumented source file under ${unit.prefix}`)
    continue
  }
  const line = []
  for (const metric of metrics) {
    const covered = files.reduce((sum, [, value]) => sum + value[metric].covered, 0)
    const total = files.reduce((sum, [, value]) => sum + value[metric].total, 0)
    const pct = total === 0 ? 100 : (covered / total) * 100
    line.push(`${metric} ${pct.toFixed(2)}`)
    if (pct < THRESHOLDS[metric]) failures.push(`${unit.name}: ${metric} ${pct.toFixed(2)}% < ${THRESHOLDS[metric]}%`)
  }
  console.log(`${unit.name.padEnd(28)} ${String(files.length).padStart(3)} files  ${line.join("  ")}`)
}

if (failures.length > 0) {
  for (const failure of failures) console.error(`FAIL ${failure}`)
  process.exit(1)
}
console.log("coverage gate passed: every unit meets the thresholds on its own tests")
