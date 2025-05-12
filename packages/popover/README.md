# @vbss-ui/popover

> A customizable and accessible Popover component that displays content in a floating container next to a trigger element.

The Popover component is a floating container that appears next to a trigger element, providing additional information or actions. Built with accessibility in mind, it offers various styling options, positioning features, and customization capabilities.

## **Installation**

To install only the Popover component, run one of the following commands:

```bash
npm install @vbss-ui/popover
# or
yarn add @vbss-ui/popover
```

---

## **Usage**

```jsx
import { Popover } from "@vbss-ui/popover"
import { Button } from "@vbss-ui/button"

export const App = () => {
  return (
    <Popover
      trigger={<Button as="div">Click Me</Button>}
      variant="primary"
    >
      <div>Popover Content</div>
    </Popover>
  )
}
```

---

## **Examples**

### Variants

```jsx
import { Popover } from "@vbss-ui/popover"
import { Button } from "@vbss-ui/button"

export const App = () => {
  return (
    <Popover
      trigger={<Button as="div">Primary</Button>}
      variant="primary"
      size="xs"
      side="top"
    >
      <div>Popover Content</div>
    </Popover>
  )
}
```

---

## **Props**

| Prop         | Type                                                                             | Description                                           | Default   |
|--------------|----------------------------------------------------------------------------------|-------------------------------------------------------|-----------|
| `variant`    | `primary` \| `secondary` \| `outline`                                            | Defines the visual style of the Popover.              | `primary` |
| `size`       | `xs` \| `sm` \| `md` \| `lg` \| `xl`                                             | Sets the padding size of the Popover.                 | `md`      |
| `rounded`    | `none` \| `sm` \| `md` \| `lg` \| `full`                                         | Sets the border radius of the Popover.                | `md`      |
| `fontSize`   | `xs` \| `sm` \| `md` \| `lg` \| `xl`                                             | Sets the font size of the Popover content.            | `md`      |
| `fontWeight` | `thin` \| `light` \| `normal` \| `medium` \| `bold` \| `extrabold`               | Sets the font weight of the Popover content.          | `normal`  |
| `trigger`    | `React.ReactNode`                                                                | The element that triggers the Popover.                | `<div />` |
| `side`       | `top` \| `right` \| `bottom` \| `left`                                           | Sets the position of the Popover.                     | `top`     |
| `align`      | `start` \| `center` \| `end`                                                     | Sets the alignment of the Popover.                    | `center`  |
| `sideOffset` | `number`                                                                         | Sets the offset from the trigger element.             | `4`       |
| `className`  | `string`                                                                         | Additional CSS classes for custom styling.            | `-`       |
| `style`      | `React.CSSProperties`                                                            | Additional style for custom styling.                  | `-`       |

---

## **Customization**

You can extend the default styles by passing custom styles using className or style.

```jsx
<Popover
  trigger={<Button as="div">Open Popover</Button>}
  style={{
    backgroundColor: "red"
  }}
>
  Custom styled popover
</Popover>
```

Or you can use the default component classNames.

```css
.popoverTrigger {
  background-color: red;
  padding: 1rem;
}

.popoverContent {
  background-color: blue;
}
```

```jsx
import "./custom.css"

export const App = () => {
  return (
    <Popover trigger={<Button as="div">Open Popover</Button>}>
      Custom styled popover
    </Popover>
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

For more information, please visit the [repository](https://github.com/vbss-io/vbss-ui) or check out the documentation at [ui.vbss.io/popover](https://ui.vbss.io/popover).  

To see the components in action, run Storybook locally. Navigate to the repository directory and execute:  

```bash
npm run storybook
```
