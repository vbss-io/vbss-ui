# @vbss-ui

> Build beautiful UIs with minimal effort

vbss-ui is a modern and customizable UI components library designed to simplify the process of building web applications. With vbss-ui, you can create responsive and attractive interfaces using a minimal setup, just import the components you need, and you're ready to go!

Each component is available as an independent package, allowing you to keep your project lightweight by installing only what you need.

## Built with Modern Technologies

vbss-ui is built with the latest frontend technologies to ensure performance, maintainability, and ease of use:

- **React** for a declarative UI development experience
- **TypeScript** for type safety and better developer experience
- **Tailwind CSS** for rapid and consistent styling
- **Monorepo managed with Lerna** for scalable package management
- **Built with Vite** for fast development and optimized builds

## Built-in TypeScript Support

No need to install additional type definitions, vbss-ui comes with built-in TypeScript support. This ensures a seamless development experience with autocompletion and type checking out of the box.

## Open Source & Community-Driven

vbss-ui is an open-source project, and the code is available on [GitHub](https://github.com/vbss-io/vbss-ui). Contributions and feature requests are always welcome! If you have suggestions, issues, or ideas, feel free to open a pull request or an issue on the repository.

## Available Components

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

## Installation

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

## Color Customization

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
