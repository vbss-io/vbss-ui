# @vbss-ui/chip

> component for labels, categories, and status indicators.

The Chip component is a small, customizable UI element used to display categorized information, labels, or status indicators. It supports different variants, sizes, and styles, making it highly flexible for various use cases.

## **Installation**

To install only the Chip component, run one of the following commands:

```bash
npm install @vbss-ui/chip
# or
yarn add @vbss-ui/chip
```

---

## **Usage**

```jsx
import { Chip } from "@vbss-ui/chip"

export const App = () => {
  return <Chip>Example Chip</Chip>
}
```

---

## **Props**

| Prop         | Type                                                               | Description                                      | Default   |
|--------------|--------------------------------------------------------------------|--------------------------------------------------|-----------|
| `variant`    | `primary` \| `secondary` \| `outline`                              | Defines the visual style of the chip.            | `primary` |
| `size`       | `sm` \| `md` \| `lg`                                               | Specifies the size of the chip.                  | `md`      |
| `rounded`    | `none` \| `xs` \| `sm` \| `md` \| `lg` \| `full`                   | Determines the border radius of the chip.        | `md`      |
| `fontSize`   | `xs` \| `sm` \| `md` \| `lg` \| `xl`                               | Sets the font size of the chip text.             | `md`      |
| `fontWeight` | `thin` \| `light` \| `normal` \| `medium` \| `bold` \| `extrabold` | Specifies the font weight of the chip text.      | `normal`  |
| `as`         | `React.ElementType`                                                | Defines the HTML element or component to render. | `div`     |
| `ref`        | `React.Ref`                                                        | Allows accessing the underlying DOM element.     | `-`       |
| `children`   | `React.ReactNode`                                                  | Content to be displayed inside the chip.         | `-`       |
| `className`  | `string`                                                           | Additional CSS classes for custom styling.       | `-`       |
| `style`      | `React.CSSProperties`                                              | Additional style for custom styling.             | `-`       |

---

## **Customization**

You can extend the default styles by passing custom styles names using className or style.

```jsx
<Chip
  style={{
    backgroundColor: "red"
  }}
>
  Example
</Chip>
```

Or you can use the default component className chip.

```css
.chip {
  background-color: purple;
}
```

```jsx
import "./custom.css"

export const App = () => {
  return <Chip>Example</Chip>
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

For more information, please visit the [repository](https://github.com/vbss-io/vbss-ui) or check out the documentation at [ui.vbss.io/chip](https://ui.vbss.io/chip).  

To see the components in action, run Storybook locally. Navigate to the repository directory and execute:  

```bash
npm run storybook
```
