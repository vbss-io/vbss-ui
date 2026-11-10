if (process.env.VBSS_RELEASE !== '1') {
  console.error('publish refused: run "npm run release -- <patch|minor|major>" from the repository root; scripts/release.mjs verifies, versions and publishes in one process')
  process.exit(1)
}
