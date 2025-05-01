# @vbss-ui/textarea

> A customizable and accessible Textarea component for multi-line text input.

The Textarea component is a form control for multi-line text input that supports various styling options, labels, and accessibility features. Built with flexibility in mind, it provides a clean and modern interface for text input with customizable appearance and behavior.

## **Installation**

To install only the Textarea component, run one of the following commands:

```bash
npm install @vbss-ui/textarea
# or
yarn add @vbss-ui/textarea
```

---

## **Usage**

```jsx
import { Textarea } from "@vbss-ui/textarea"

export const App = () => {
  return <Textarea placeholder="Enter your text" />
}
```

---

## **Examples**

### With Label

```jsx
import { Textarea } from "@vbss-ui/textarea"

export const App = () => {
  return <Textarea label="Description" placeholder="Enter description" />
}
```

### Custom Variant

```jsx
import { Textarea } from "@vbss-ui/textarea"

export const App = () => {
  return <Textarea variant="secondary" rounded="lg" />
}
```

### State Management

```jsx
import { useState } from "react"
import { Textarea } from "@vbss-ui/textarea"

export const App = () => {
  const [value, setValue] = useState("")

  return (
    <Textarea
      value={value}
      onChange={(e) => setValue(e.target.value)}
      label="Description"
    />
  )
}
```

---

## **Props**

| Prop         | Type                                                                             | Description                                           | Default   |
|--------------|----------------------------------------------------------------------------------|-------------------------------------------------------|-----------|
| `variant`    | `primary` \| `secondary` \| `outline` \| `ghost`                                 | Defines the visual style of the Textarea.             | `primary` |
| `rounded`    | `none` \| `xs` \| `sm` \| `md` \| `lg` \| `full`                                 | Sets the border radius of the Textarea.               | `md`      |
| `fontSize`   | `xs` \| `sm` \| `md` \| `lg` \| `xl`                                             | Sets the font size of the Textarea content.           | `md`      |
| `fontWeight` | `thin` \| `light` \| `normal` \| `medium` \| `bold` \| `extrabold`               | Specifies the font weight of the Textarea content.    | `normal`  |
| `label`      | `string`                                                                         | Text label for the Textarea.                          | `-`       |
| `disabled`   | `boolean`                                                                        | Disables the Textarea interaction.                    | `false`   |
| `ref`        | `React.Ref`                                                                      | Allows accessing the underlying DOM element.          | `-`       |
| `className`  | `string`                                                                         | Additional CSS classes for custom styling.            | `-`       |
| `style`      | `React.CSSProperties`                                                            | Additional style for custom styling.                  | `-`       |

---

## **Customization**

You can extend the default styles by passing custom styles using className or style.

```jsx
<Textarea
  style={{
    backgroundColor: "red"
  }}
/>
```

Or you can use the default component classNames.

```css
.textareaContainer {
  .textareaLabel {
    color: red;
  }
  .textarea {
    background-color: purple;
  }
}
```

```jsx
import "./custom.css"

export const App = () => {
  return <Textarea />
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

For more information, please visit the [repository](https://github.com/vbss-io/vbss-ui) or check out the documentation at [ui.vbss.io/textarea](https://ui.vbss.io/textarea).  

To see the components in action, run Storybook locally. Navigate to the repository directory and execute:  

```bash
npm run storybook
```
