import { readdirSync, rmSync } from "node:fs"
import { join } from "node:path"
import { fileURLToPath } from "node:url"

const STALE_TOOL_CACHES = [".vite-temp", ".vitest-cache"]

const root = join(fileURLToPath(new URL(".", import.meta.url)), "..")
const workspaces = [root, join(root, "apps", "docs")]
for (const entry of readdirSync(join(root, "packages"), { withFileTypes: true })) {
  if (entry.isDirectory()) workspaces.push(join(root, "packages", entry.name))
}
for (const workspace of workspaces) {
  for (const name of STALE_TOOL_CACHES) {
    rmSync(join(workspace, "node_modules", name), { recursive: true, force: true })
  }
}
