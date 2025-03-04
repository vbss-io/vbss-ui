# @vbss-ui/chips

The `Chips` component is a wrapper for grouping multiple `Chip` components.

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

function Example() {
  return <Chips chips={["Chip 1", "Chip 2", "Chip 3"]} />;
}
```

---

## **Props**

| Prop            | Type                                          | Description                                      | Default |
|-----------------|-----------------------------------------------|--------------------------------------------------|---------|
| `gap`           | `xs` \| `sm` \| `md` \| `lg` \| `xl`          | Defines the spacing between chips.               | `md`    |
| `flexDirection` | `row` \| `col`                                | Determines the layout direction of the chips.    | `row`   |
| `as`            | `React.ElementType`                           | Defines the HTML element or component to render. | `div`   |
| `chips`         | `string[]` \| `number[]` \| `React.ReactNode` | Content to be displayed inside the chip.         | `-`     |
| `chipsProps`    | `ChipProps`                                   | Props applied to `Chip` components.              | `-`     |
| `className`     | `string`                                      | Additional CSS classes for custom styling.       | `-`     |

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
