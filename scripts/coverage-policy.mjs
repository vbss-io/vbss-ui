import { existsSync, readdirSync, readFileSync } from "node:fs"
import { join } from "node:path"

export const THRESHOLDS = { statements: 90, branches: 80, functions: 90, lines: 90 }

export const SOURCE_EXTENSIONS = "{ts,tsx}"

export const COVERAGE_EXCLUDE = [
  "**/*.d.ts",
  "**/*.test.{ts,tsx}",
  "**/*.spec.{ts,tsx}",
  "**/__tests__/**",
  "**/test-support/**",
  "**/*.stories.{ts,tsx}",
  "apps/docs/src/main.tsx",
]

export const listUnits = (root) => {
  const units = []
  const packagesDir = join(root, "packages")
  for (const entry of readdirSync(packagesDir, { withFileTypes: true })) {
    if (!entry.isDirectory()) continue
    const manifest = join(packagesDir, entry.name, "package.json")
    if (!existsSync(manifest)) continue
    units.push({
      name: JSON.parse(readFileSync(manifest, "utf8")).name,
      dir: `packages/${entry.name}`,
      source: `packages/${entry.name}/src/**/*.${SOURCE_EXTENSIONS}`,
      prefix: `packages/${entry.name}/src/`,
    })
  }
  const docsManifest = join(root, "apps", "docs", "package.json")
  if (existsSync(docsManifest)) {
    units.push({
      name: JSON.parse(readFileSync(docsManifest, "utf8")).name,
      dir: "apps/docs",
      source: `apps/docs/src/**/*.${SOURCE_EXTENSIONS}`,
      prefix: "apps/docs/src/",
    })
  }
  return units.sort((a, b) => a.dir.localeCompare(b.dir))
}

export const unitSlug = (unit) => unit.dir.replace(/\//g, "-")

export const unitThresholds = (units) => Object.fromEntries(units.map((unit) => [unit.source, { ...THRESHOLDS }]))
