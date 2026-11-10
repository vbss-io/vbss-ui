export interface CoverageUnit {
  name: string
  dir: string
  source: string
  prefix: string
}

export const THRESHOLDS: { statements: number; branches: number; functions: number; lines: number }
export const SOURCE_EXTENSIONS: string
export const COVERAGE_EXCLUDE: string[]
export function listUnits(root: string): CoverageUnit[]
export function unitSlug(unit: CoverageUnit): string
export function unitThresholds(units: CoverageUnit[]): Record<string, { statements: number; branches: number; functions: number; lines: number }>
