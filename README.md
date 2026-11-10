# @vbss-ui

> Build beautiful UIs with minimal effort

vbss-ui is a modern and customizable UI components library designed to simplify the process of building web applications. With vbss-ui, you can create responsive and attractive interfaces using a minimal setup, just import the components you need, and you're ready to go!

Each component is available as an independent package, allowing you to keep your project lightweight by installing only what you need.

## **Built with Modern Technologies**

vbss-ui is built with the latest frontend technologies to ensure performance, maintainability, and ease of use:

- **React** for a declarative UI development experience
- **TypeScript** for type safety and better developer experience
- **Tailwind CSS** for rapid and consistent styling
- **Monorepo managed with Lerna** for scalable package management
- **Built with Vite** for fast development and optimized builds

## **Built-in TypeScript Support**

No need to install additional type definitions, vbss-ui comes with built-in TypeScript support. This ensures a seamless development experience with autocompletion and type checking out of the box.

## **Open Source & Community-Driven**

vbss-ui is an open-source project, and the code is available on [GitHub](https://github.com/vbss-io/vbss-ui). Contributions and feature requests are always welcome! If you have suggestions, issues, or ideas, feel free to open a pull request or an issue on the repository.

## **Available Components**

Here's a list of all available components in the VBSS UI library:

| Component | Documentation | Package |
|-----------|--------------|---------|
| Button | [View Documentation](https://ui.vbss.io/button) | [@vbss-ui/button](https://www.npmjs.com/package/@vbss-ui/button) |
| Chip | [View Documentation](https://ui.vbss.io/chip) | [@vbss-ui/chip](https://www.npmjs.com/package/@vbss-ui/chip) |
| Chips | [View Documentation](https://ui.vbss.io/chips) | [@vbss-ui/chips](https://www.npmjs.com/package/@vbss-ui/chips) |
| Checkbox | [View Documentation](https://ui.vbss.io/checkbox) | [@vbss-ui/checkbox](https://www.npmjs.com/package/@vbss-ui/checkbox) |
| Dialog | [View Documentation](https://ui.vbss.io/dialog) | [@vbss-ui/dialog](https://www.npmjs.com/package/@vbss-ui/dialog) |
| Dropdown | [View Documentation](https://ui.vbss.io/dropdown-menu) | [@vbss-ui/dropdown-menu](https://www.npmjs.com/package/@vbss-ui/dropdown-menu) |
| History Nav | [View Documentation](https://ui.vbss.io/history-nav) | [@vbss-ui/history-nav](https://www.npmjs.com/package/@vbss-ui/history-nav) |
| Input | [View Documentation](https://ui.vbss.io/input) | [@vbss-ui/input](https://www.npmjs.com/package/@vbss-ui/input) |
| Input Number | [View Documentation](https://ui.vbss.io/input-number) | [@vbss-ui/input-number](https://www.npmjs.com/package/@vbss-ui/input-number) |
| Popover | [View Documentation](https://ui.vbss.io/popover) | [@vbss-ui/popover](https://www.npmjs.com/package/@vbss-ui/popover) |
| Radio Group | [View Documentation](https://ui.vbss.io/radio-group) | [@vbss-ui/radio-group](https://www.npmjs.com/package/@vbss-ui/radio-group) |
| Switch | [View Documentation](https://ui.vbss.io/switch) | [@vbss-ui/switch](https://www.npmjs.com/package/@vbss-ui/switch) |
| Table | [View Documentation](https://ui.vbss.io/table) | [@vbss-ui/table](https://www.npmjs.com/package/@vbss-ui/table) |
| Textarea | [View Documentation](https://ui.vbss.io/textarea) | [@vbss-ui/textarea](https://www.npmjs.com/package/@vbss-ui/textarea) |
| Tooltip | [View Documentation](https://ui.vbss.io/tooltip) | [@vbss-ui/tooltip](https://www.npmjs.com/package/@vbss-ui/tooltip) |

---

## **Installation**

> Adding Components to Your Project

### Install only what you need

Since each component is distributed as a separate package, you can install only the components required for your project.

For example, to install the Button component, use one of the following commands

```bash
# Using npm
npm install @vbss-ui/button

# Using yarn
yarn add @vbss-ui/button
```

### Usage

After installation, import the component and use it in your project:

```tsx
import { Button } from "@vbss-ui/button";

export const App = () => {
  return (
    <div>
      <Button>Click Me</Button>
    </div>
  );
};
```

## **Color Customization**

> Customize Your Component Colors

vbss-ui allows you to easily customize the color scheme of the components to match your brand or design system. By default, the library provides a clean and modern palette, but you can override these values to create a unique look.

### Default Color Palette

Out of the box, vbss-ui comes with the following color scheme:

```css
:root {
  --primary: 248 39% 39%;
  --secondary: 248 53% 58%;
  --highlight: 271 76% 53%;
  --text: 0 0% 0%;
  --background: 0 0% 100%;
}
```

### Customizing Colors

To override these defaults, create a CSS file (e.g. `custom-colors.css`) and define your custom colors using HSL format:

```css
:root {
  --primary: 200 100% 50%;     /* Bright blue primary */
  --secondary: 340 82% 52%;    /* Pink secondary */
  --highlight: 45 100% 51%;    /* Yellow highlight */
  --text: 0 0% 100%;           /* Light text */
  --background: 220 15% 20%;   /* Dark background */
}
```

Then, import this file into your project:

```tsx
import './custom-colors.css'
```

### How It Works

- These colors are automatically applied to all vbss-ui components
- You only need to define the variables you want to change
- The HSL format makes it easy to adjust hue, saturation, and lightness for fine-tuned color control

### **More**

For more information, please visit the [repository](https://github.com/vbss-io/vbss-ui) or check out the documentation at [ui.vbss.io](https://ui.vbss.io).  

To see the components in action, run Storybook locally. Navigate to the repository directory and execute:  

```bash
npm run storybook
```

---

## **Publishing**

Releases are published manually (there is no CI) and only through the release script. Packages have no `version:*` scripts and must never be versioned or published one by one with `npm version` or `npm publish`, since that skips the gate:

```bash
npm run release:dry -- patch             # rehearsal: gates, version, publish --dry-run, repository restored
npm run release -- patch --yes-publish   # real release (or minor / major)
```

A real release only starts with the explicit `--yes-publish` argument; without it the script refuses before doing anything. Dry mode is also detected when npm swallows the flag (`npm run release patch --dry-run` without `--` sets `npm_config_dry_run`), so that mistyped form stays a dry run and never becomes a real release. Always keep the `--` before the script arguments. The script prints the packages and versions it is about to publish.

`.npmrc` sets `ignore-scripts=true`, so npm never runs `prepublishOnly` on its own and a bare `npm publish` is not blocked unless `--ignore-scripts=false` is passed; releases go only through `scripts/release.mjs`, which runs everything in one process:

1. Refuses a dirty working tree and a repository without release tags. Lerna only reads annotated tags, so tag each already published version once with `git tag -a "<name>@<version>" -m "<name>@<version>"`; the script refuses, naming the package, when a publishable package has no such tag or only a lightweight one.
2. `npm run verify` (lint, typecheck:tests, per-unit 90/80/90/90 coverage, lock-guard, audit-gate and, as the last step, build). Any failure stops the release before versioning. Because the build is the last step, the dist fingerprint is taken right after the build.
3. `lerna version <bump> --no-push` for the changed packages (independent versions), then confirms the version commit only touched `package.json`, `package-lock.json` and `CHANGELOG.md`.
4. Confirms every changed package `dist/` is byte-identical to what verify built, then `lerna publish from-package`.

If the script refuses after the version step (for example `dist/` changed), it undoes only what it created: it deletes the tags it made and runs `git reset --keep` back to the pre-release commit, then reports. Once `lerna publish` has started nothing is undone, so check the registry before anything else. Do not edit files while a release runs: the tree is proven clean before versioning and the cleanup assumes nothing else changes it.

`--dry-run` runs the same gates, versions without committing or tagging, runs `npm publish --dry-run` for each changed package (with the `prepublishOnly` guard active) and restores the repository. Every publishable package has `prepublishOnly` set to `scripts/release-gate.mjs`, which refuses unless `VBSS_RELEASE=1`, set only by the release script. `apps/docs` is `private` and is never published. Pushing the version commit and tags is a separate manual step.

## **Support**

Help us keep vbss-ui free and open source. Your support enables continuous development, better docs and new components.

- Buy me a coffee: [buymeacoffee.com/vbss.io](https://www.buymeacoffee.com/vbss.io)
- GitHub Sponsors: [github.com/sponsors/vbss-io](https://github.com/sponsors/vbss-io)
- Star on GitHub: [github.com/vbss-io/vbss-ui](https://github.com/vbss-io/vbss-ui)
- Share with community: [ui.vbss.io](https://ui.vbss.io)

Thank you for supporting the project!
