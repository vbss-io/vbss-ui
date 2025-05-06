# @vbss-ui/tooltip

> A customizable and accessible Tooltip component.

The Tooltip component is a floating label that appears when hovering over or focusing on an element. It provides additional information or context about the element it's attached to. Built with accessibility in mind, it offers various styling options, positioning, and customization features.

## **Installation**

To install only the Tooltip component, run one of the following commands:

```bash
npm install @vbss-ui/tooltip
# or
yarn add @vbss-ui/tooltip
```

---

## **Usage**

```jsx
import { Tooltip } from "@vbss-ui/tooltip"

export const App = () => {
  return (
    <Tooltip trigger={<button>Hover me</button>}>
      This is a tooltip
    </Tooltip>
  )
}
```

---

## **Examples**

### With Custom Trigger

```jsx
import { Tooltip } from "@vbss-ui/tooltip"
import { Button } from "@vbss-ui/button"

export const App = () => {
  return (
    <Tooltip trigger={<Button>Click me</Button>}>
      This is a tooltip with a button trigger
    </Tooltip>
  )
}
```

### With Custom Position

```jsx
import { Tooltip } from "@vbss-ui/tooltip"

export const App = () => {
  return (
    <Tooltip
      trigger={<button>Hover me</button>}
      side="right"
      sideOffset={8}
    >
      This tooltip appears on the right
    </Tooltip>
  )
}
```

### Custom Variant

```jsx
import { Tooltip } from "@vbss-ui/tooltip"

export const App = () => {
  return (
    <Tooltip
      trigger={<button>Hover me</button>}
      variant="secondary"
      rounded="lg"
    >
      This is a custom styled tooltip
    </Tooltip>
  )
}
```

---

## **Props**

| Prop         | Type                                                                             | Description                                           | Default   |
|--------------|----------------------------------------------------------------------------------|-------------------------------------------------------|-----------|
| `variant`    | `primary` \| `secondary` \| `outline`                                            | Defines the visual style of the Tooltip.              | `primary` |
| `size`       | `xs` \| `sm` \| `md` \| `lg` \| `xl`                                             | Sets the size of the Tooltip.                         | `md`      |
| `rounded`    | `none` \| `sm` \| `md` \| `lg` \| `full`                                         | Sets the border radius of the Tooltip.                | `md`      |
| `fontSize`   | `xs` \| `sm` \| `md` \| `lg` \| `xl`                                             | Sets the font size of the Tooltip content.            | `md`      |
| `fontWeight` | `thin` \| `light` \| `normal` \| `medium` \| `bold` \| `extrabold`               | Specifies the font weight of the Tooltip content.     | `normal`  |
| `side`       | `top` \| `right` \| `bottom` \| `left`                                           | Sets the position of the Tooltip.                     | `top`     |
| `sideOffset` | `number`                                                                         | Sets the offset from the trigger element.             | `4`       |
| `trigger`    | `React.ReactNode`                                                                | The element that triggers the Tooltip.                | `-`       |
| `ref`        | `React.Ref`                                                                      | Allows accessing the underlying DOM element.          | `-`       |
| `className`  | `string`                                                                         | Additional CSS classes for custom styling.            | `-`       |
| `style`      | `React.CSSProperties`                                                            | Additional style for custom styling.                  | `-`       |

---

## **Customization**

You can extend the default styles by passing custom styles using className or style.

```jsx
<Tooltip
  trigger={<button>Hover me</button>}
  style={{
    backgroundColor: "red"
  }}
>
  This is a custom styled tooltip
</Tooltip>
```

Or you can use the default component classNames.

```css
.tooltipTrigger {
  background-color: purple;
  color: white;
  border-radius: 1rem;
  padding: 1rem;
}
.tooltipContent {
  background-color: red;
}
```

```jsx
import "./custom.css"

export const App = () => {
  return (
    <Tooltip trigger={<button>Hover me</button>}>
      This is a custom styled tooltip
    </Tooltip>
  )
}
```

## **Customizing Colors (Optional)**

If you want to customize the colors used in the vbss-ui components, you can create a custom CSS file with your desired color scheme. Create a .css file (e.g., custom-colors.css) and define your colors using HSL format as follows:

```css
:root {
  --background: 0 0% 100%;
  --primary: 117 100% 47%;
  --secondary: 248 53% 58%;
}
```

After creating your custom colors file, import it into your main file:

```js
import "./custom-colors.css";
```

This will override the default colors with your custom colors.

---

### **More**

For more information, please visit the [repository](https://github.com/vbss-io/vbss-ui) or check out the documentation at [ui.vbss.io/tooltip](https://ui.vbss.io/tooltip).  

To see the components in action, run Storybook locally. Navigate to the repository directory and execute:  

```bash
npm run storybook
```
