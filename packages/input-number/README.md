# @vbss-ui/input-number

> A customizable and accessible Number Input component with increment/decrement controls.

The InputNumber component is a specialized form control for numeric input that includes increment and decrement buttons. It supports various input types, labels, and styling options. Built with accessibility in mind, it provides a clean and modern interface for numeric input with convenient controls.

## **Installation**

To install only the InputNumber component, run one of the following commands:

```bash
npm install @vbss-ui/input-number
# or
yarn add @vbss-ui/input-number
```

---

## **Usage**

```jsx
import { InputNumber } from "@vbss-ui/input-number"

export const App = () => {
  return <InputNumber placeholder="Enter a number" />
}
```

---

## **Examples**

### With Label

```jsx
import { InputNumber } from "@vbss-ui/input-number"

export const App = () => {
  return <InputNumber label="Quantity" placeholder="Enter quantity" />
}
```

### With Controls

```jsx
import { InputNumber } from "@vbss-ui/input-number"

export const App = () => {
  return (
    <InputNumber
      controlsProps={{
        variant: "primary",
      }}
      placeholder="Enter a number"
    />
  )
}
```

### Custom Variant

```jsx
import { InputNumber } from "@vbss-ui/input-number"

export const App = () => {
  return <InputNumber variant="secondary" rounded="lg" />
}
```

### State Management

```jsx
import { useState } from "react"
import { InputNumber } from "@vbss-ui/input-number"

export const App = () => {
  const [value, setValue] = useState("")

  return (
    <InputNumber
      value={value}
      onChange={(e) => setValue(e.target.value)}
      label="Quantity"
    />
  )
}
```

---

## **Props**

| Prop              | Type                                                                             | Description                                                                | Default   |
|-------------------|--------------------------------------------------------------------|------------------------------------------------------------------------------------------|-----------|
| `variant`         | `primary` \| `secondary` \| `outline` \| `ghost`                   | Defines the visual style of the InputNumber.                                             | `primary` |
| `height`          | `xs` \| `sm` \| `md` \| `lg` \| `xl`                               | Sets the height of the InputNumber.                                                      | `md`      |
| `rounded`         | `none` \| `xs` \| `sm` \| `md` \| `lg` \| `full`                   | Sets the border radius of the InputNumber.                                               | `md`      |
| `fontSize`        | `xs` \| `sm` \| `md` \| `lg` \| `xl`                               | Sets the font size of the InputNumber content.                                           | `md`      |
| `fontWeight`      | `thin` \| `light` \| `normal` \| `medium` \| `bold` \| `extrabold` | Specifies the font weight of the InputNumber content.                                    | `normal`  |
| `label`           | `string`                                                           | Text label for the InputNumber.                                                          | `-`       |
| `error`           | `string`                                                           | Error message to display.                                                                | `-`       |
| `isFloat`         | `boolean`                                                          | Enables decimal number input with specified decimal places.                              | `false`   |
| `step`            | `number`                                                           | Increment/decrement step value. For float values, this can be a decimal number.          | `1`       |
| `denyNegative`    | `boolean`                                                          | When true, prevents negative values in the input. Values below 0 will be set to 0.       | `false`   |
| `disableControls` | `boolean`                                                          | Prop to disable Input controls.                                                          | `false`   |
| `plusIcon`        | `React.ReactNode`                                                  | Icon for increment action.                                                               | `-`       |
| `minusIcon`       | `React.ReactNode`                                                  | Icon for decrement action.                                                               | `-`       |
| `controlsProps`   | `ButtonProps`                                                      | Props for the increment/decrement buttons. See [Button Props](https://ui.vbss.io/button) | `-`       |
| `disabled`        | `boolean`                                                          | Disables the InputNumber interaction.                                                    | `false`   |
| `ref`             | `React.Ref`                                                        | Allows accessing the underlying DOM element.                                             | `-`       |
| `className`       | `string`                                                           | Additional CSS classes for custom styling.                                               | `-`       |
| `style`           | `React.CSSProperties`                                              | Additional style for custom styling.                                                     | `-`       |

---

## **Customization**

You can extend the default styles by passing custom styles using className or style.

```jsx
<InputNumber
  style={{
    backgroundColor: "red"
  }}
/>
```

Or you can use the default component classNames.

```css
  .inputNumberContainer {
    .inputNumberLabel {
      color: purple;
    }
    .inputNumberContent {
      .inputNumberLeftControlContainer {
        .inputNumberLeftControl {
          .button {
            /* ...Button classNames */
          }
        }
      }
      .inputNumber {
        background-color: red;
        color: white
      }
      .inputNumberRightControlContainer {
        .inputNumberRightControl {
          .button {
            /* ...Button classNames */
          }
        }
      }
    }
  }
```

```jsx
import "./custom.css"

export const App = () => {
  return <InputNumber label="Label:" />
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

For more information, please visit the [repository](https://github.com/vbss-io/vbss-ui) or check out the documentation at [ui.vbss.io/input-number](https://ui.vbss.io/input-number).  

To see the components in action, run Storybook locally. Navigate to the repository directory and execute:  

```bash
npm run storybook
```
