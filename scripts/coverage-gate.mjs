import { existsSync, readFileSync } from "node:fs"
import { join, relative } from "node:path"
import { fileURLToPath } from "node:url"
import { listUnits, THRESHOLDS } from "./coverage-policy.mjs"

const root = join(fileURLToPath(new URL(".", import.meta.url)), "..")
const summaryPath = process.argv[2] ?? join(root, "coverage", "coverage-summary.json")

if (!existsSync(summaryPath)) {
  console.error(`coverage gate: ${summaryPath} not found, run vitest with the json-summary reporter first`)
  process.exit(1)
}

const summary = JSON.parse(readFileSync(summaryPath, "utf8"))
const files = Object.entries(summary)
  .filter(([key]) => key !== "total")
  .map(([key, value]) => [relative(root, key).split("\\").join("/"), value])

const metrics = Object.keys(THRESHOLDS)
const failures = []

for (const unit of listUnits(root)) {
  const own = files.filter(([path]) => path.startsWith(unit.prefix) && /\.(ts|tsx)$/.test(path))
  if (own.length === 0) {
    failures.push(`${unit.name}: no instrumented source file under ${unit.prefix}`)
    continue
  }
  const line = []
  for (const metric of metrics) {
    const covered = own.reduce((sum, [, value]) => sum + value[metric].covered, 0)
    const total = own.reduce((sum, [, value]) => sum + value[metric].total, 0)
    const pct = total === 0 ? 100 : (covered / total) * 100
    line.push(`${metric} ${pct.toFixed(2)}`)
    if (pct < THRESHOLDS[metric]) failures.push(`${unit.name}: ${metric} ${pct.toFixed(2)}% < ${THRESHOLDS[metric]}%`)
  }
  console.log(`${unit.name.padEnd(28)} ${own.length} files  ${line.join("  ")}`)
}

if (failures.length > 0) {
  for (const failure of failures) console.error(`FAIL ${failure}`)
  process.exit(1)
}
console.log("coverage gate passed: every unit meets the thresholds on its own")
