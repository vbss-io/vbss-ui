# @vbss-ui/checkbox

> A customizable and accessible Checkbox component with label support.

The Checkbox component is a form control for boolean input that supports various styling options, labels, and accessibility features. Built with flexibility in mind, it provides a clean and modern interface for checkbox input with customizable appearance and behavior.

## **Installation**

To install only the Checkbox component, run one of the following commands:

```bash
npm install @vbss-ui/checkbox
# or
yarn add @vbss-ui/checkbox
```

---

## **Usage**

```jsx
import { Checkbox } from "@vbss-ui/checkbox"

export const App = () => {
  return <Checkbox label="Accept terms" />
}
```

---

## **Examples**

### With Label

```jsx
import { Checkbox } from "@vbss-ui/checkbox"

export const App = () => {
  return <Checkbox label="Accept terms" />
}
```

### Custom Variant

```jsx
import { Checkbox } from "@vbss-ui/checkbox"

export const App = () => {
  return <Checkbox variant="secondary" rounded="lg" />
}
```

### State Management

```jsx
import { useState } from "react"
import { Checkbox } from "@vbss-ui/checkbox"

export const App = () => {
  const [checked, setChecked] = useState(false)

  return (
    <Checkbox
      checked={checked}
      onCheckedChange={setChecked}
      label="Accept terms"
    />
  )
}
```

---

## **Props**

| Prop         | Type                                                                             | Description                                           | Default   |
|--------------|----------------------------------------------------------------------------------|-------------------------------------------------------|-----------|
| `variant`    | `primary` \| `secondary` \| `outline` \| `ghost`                                 | Defines the visual style of the Checkbox.             | `primary` |
| `size`       | `xs` \| `sm` \| `md` \| `lg` \| `xl`                                             | Sets the size of the Checkbox.                        | `sm`      |
| `rounded`    | `none` \| `sm` \| `md` \| `lg` \| `full`                                         | Sets the border radius of the Checkbox.               | `md`      |
| `fontSize`   | `xs` \| `sm` \| `md` \| `lg` \| `xl`                                             | Sets the font size of the Checkbox label.             | `md`      |
| `fontWeight` | `thin` \| `light` \| `normal` \| `medium` \| `bold` \| `extrabold`               | Specifies the font weight of the Checkbox label.      | `normal`  |
| `label`      | `string`                                                                         | Text label for the Checkbox.                          | `-`       |
| `icon`       | `React.ReactNode`                                                                | Custom icon for the checked state.                    | `-`       |
| `disabled`   | `boolean`                                                                        | Disables the Checkbox interaction.                    | `false`   |
| `ref`        | `React.Ref`                                                                      | Allows accessing the underlying DOM element.          | `-`       |
| `className`  | `string`                                                                         | Additional CSS classes for custom styling.            | `-`       |
| `style`      | `React.CSSProperties`                                                            | Additional style for custom styling.                  | `-`       |

---

## **Customization**

You can extend the default styles by passing custom styles using className or style.

```jsx
<Checkbox
  style={{
    backgroundColor: "red"
  }}
/>
```

Or you can use the default component classNames.

```css
.customCheckbox {
  .checkboxContainer {
    .checkboxRoot {
      background-color: blue;
      .checkboxIconContainer {
        color: red;
      }
    }
    .checkboxLabel {
      color: red;
    }
  }
}
```

```jsx
import "./custom.css"

export const App = () => {
  return <Checkbox />
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

For more information, please visit the [repository](https://github.com/vbss-io/vbss-ui) or check out the documentation at [ui.vbss.io/checkbox](https://ui.vbss.io/checkbox).  

To see the components in action, run Storybook locally. Navigate to the repository directory and execute:  

```bash
npm run storybook
```
