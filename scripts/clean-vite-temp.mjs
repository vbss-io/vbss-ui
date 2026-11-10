import { readdirSync, rmSync } from "node:fs"
import { join } from "node:path"
import { fileURLToPath } from "node:url"

const root = join(fileURLToPath(new URL(".", import.meta.url)), "..")
const workspaces = [root, join(root, "apps", "docs")]
for (const entry of readdirSync(join(root, "packages"), { withFileTypes: true })) {
  if (entry.isDirectory()) workspaces.push(join(root, "packages", entry.name))
}
for (const workspace of workspaces) {
  rmSync(join(workspace, "node_modules", ".vite-temp"), { recursive: true, force: true })
}
