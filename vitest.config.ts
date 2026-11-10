import react from "@vitejs/plugin-react"
import path from "node:path"
import { fileURLToPath } from "node:url"
import svgr from "vite-plugin-svgr"
import { defineConfig } from "vitest/config"
import { COVERAGE_EXCLUDE, listUnits, unitSlug, unitThresholds } from "./scripts/coverage-policy.mjs"

const root = path.dirname(fileURLToPath(import.meta.url))
const allUnits = listUnits(root)
const selected = process.env.VBSS_COVERAGE_UNIT
const units = selected ? allUnits.filter((unit) => unit.dir === selected) : allUnits

if (selected && units.length !== 1) throw new Error(`unknown coverage unit ${selected}`)

const sourceAliases = allUnits
  .filter((unit) => unit.dir.startsWith("packages/"))
  .map((unit) => ({
    find: new RegExp(`^${unit.name}$`),
    replacement: path.join(root, unit.dir, "src", unit.dir.endsWith("@lib") ? "index.ts" : "index.tsx"),
  }))

export default defineConfig({
  plugins: [
    react(),
    svgr({
      svgrOptions: { exportType: "default", ref: true, svgo: false, titleProp: true },
      include: "**/*.svg",
    }),
  ],
  resolve: { alias: sourceAliases },
  test: {
    environment: "jsdom",
    setupFiles: [path.join(root, "test-support", "setup.ts")],
    passWithNoTests: true,
    maxWorkers: 2,
    restoreMocks: true,
    fsModuleCachePath: path.join(root, "node_modules", ".vitest"),
    projects: units.map((unit) => ({
      extends: true,
      root: path.join(root, unit.dir),
      resolve: unit.dir === "apps/docs" ? { alias: [{ find: /^@\//, replacement: path.join(root, unit.dir, "src") + "/" }] } : {},
      test: {
        name: unit.name,
        include: ["src/**/*.{test,spec}.{ts,tsx}", "__tests__/**/*.{test,spec}.{ts,tsx}", "tests/**/*.{test,spec}.{ts,tsx}"],
      },
    })),
    coverage: {
      provider: "v8",
      reporter: ["text-summary", "json-summary", "html"],
      reportsDirectory: path.join(root, "coverage", selected ? unitSlug(units[0]) : "all"),
      reportOnFailure: true,
      clean: true,
      include: units.map((unit) => unit.source),
      exclude: COVERAGE_EXCLUDE,
      thresholds: unitThresholds(units),
    },
  },
})
