# @vbss-ui/chips

> wrapper component for multiple Chip elements.

The `Chips` component is a flexible container designed to render multiple `Chip` components in a customizable layout. It supports layout direction, spacing between chips, and allows passing shared props to chips.

## **Installation**

```bash
npm install @vbss-ui/chips
# or
yarn add @vbss-ui/chips
```

---

## **Usage**

```jsx
import { Chips } from "@vbss-ui/chips";

export const App = () => {
  return <Chips chips={["Design", "Development", "Marketing"]} />;
};
```

---

## **Props**

| Prop            | Type                                            | Description                                                                   | Default |
|-----------------|-------------------------------------------------|-------------------------------------------------------------------------------|---------|
| `chips`         | `string[]` \| `number[]` \| `React.ReactNode[]` | List of chip contents to render.                                              | `[]`    |
| `gap`           | `xs` \| `sm` \| `md` \| `lg` \| `xl`            | Defines the spacing between chips.                                            | `md`    |
| `flexDirection` | `row` \| `col`                                  | Determines the layout direction of the chips.                                 | `row`   |
| `chipsProps`    | `ChipProps`                                     | Props applied to `Chip` components. See [Chip Props](https://ui.vbss.io/chip) | `-`     |
| `as`            | `React.ElementType`                             | Defines the HTML element or component to render.                              | `div`   |
| `ref`           | `React.Ref`                                     | Allows accessing the underlying DOM element.                                  | `-`     |
| `className`     | `string`                                        | Additional CSS classes for custom styling.                                    | `-`     |
| `style`         | `React.CSSProperties`                           | Additional style for custom styling.                                          | `-`     |

### **chipsProps Example**

```jsx
function Example() {
  return (
    <Chips
      chips={["Chip"]}
      chipsProps={{
        as: "span",
        variant: "primary"
      }}
    />
  )
}
```

---

## **Customization**

You can extend the default styles by passing custom styles names using className or style.

```jsx
import { Chips } from "@vbss-ui/chips";

export const App = () => {
  return (
  <Chips chips={["Chip 1", "Chip 2"]} style={{ backgroundColor: "gray", padding: "1rem", borderRadius: "1rem" }} />;
  )
}
```

Or you can use the default component className chip.

```css
.chips {
  background-color: blue;
  padding: 10px;
  border-radius: 5px;
}

.chip {
  background-color: red;
}
```

```jsx
import { Chips } from "@vbss-ui/chips";
import "./custom.css";

export const App = () => {
  return <Chips chips={["Chip 1", "Chip 2"]} />;
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

For more information, please visit the [repository](https://github.com/vbss-io/vbss-ui) or check out the documentation at [ui.vbss.io/chips](https://ui.vbss.io/chips).  

To see the components in action, run Storybook locally. Navigate to the repository directory and execute:  

```bash
npm run storybook
# or
yarn storybook
```
