# @vbss-ui/radio-group

> A customizable and accessible RadioGroup component for single selection.

The RadioGroup component is a form control that allows users to select a single option from a set of choices. It supports various styling options, labels, and accessibility features. Built with flexibility in mind, it provides a clean and modern interface for radio input with customizable appearance and behavior.

## **Installation**

To install only the RadioGroup component, run one of the following commands:

```bash
npm install @vbss-ui/radio-group
# or
yarn add @vbss-ui/radio-group
```

---

## **Usage**

```jsx
import { RadioGroup } from "@vbss-ui/radio-group"

export const App = () => {
  return (
    <RadioGroup
      values={[
        { value: "option1", label: "Option 1" },
        { value: "option2", label: "Option 2" }
      ]}
    />
  )
}
```

---

## **Examples**

### With Label

```jsx
import { RadioGroup } from "@vbss-ui/radio-group"

export const App = () => {
  return (
    <RadioGroup
      label="Select an option"
      values={[
        { value: "option1", label: "Option 1" },
        { value: "option2", label: "Option 2" }
      ]}
    />
  )
}
```

### Custom Variant

```jsx
import { RadioGroup } from "@vbss-ui/radio-group"

export const App = () => {
  return (
    <RadioGroup
      variant="secondary"
      rounded="lg"
      values={[
        { value: "option1", label: "Option 1" },
        { value: "option2", label: "Option 2" }
      ]}
    />
  )
}
```

### State Management

```jsx
import { useState } from "react"
import { RadioGroup } from "@vbss-ui/radio-group"

export const App = () => {
  const [value, setValue] = useState("option1")

  return (
    <RadioGroup
      value={value}
      onValueChange={setValue}
      values={[
        { value: "option1", label: "Option 1" },
        { value: "option2", label: "Option 2" }
      ]}
    />
  )
}
```

---

## **Props**

| Prop            | Type                                                                             | Description                                           | Default   |
|-----------------|----------------------------------------------------------------------------------|-------------------------------------------------------|-----------|
| `variant`       | `primary` \| `secondary` \| `outline` \| `ghost`                                 | Defines the visual style of the RadioGroup.           | `primary` |
| `size`          | `xs` \| `sm` \| `md` \| `lg` \| `xl`                                             | Sets the size of the RadioGroup.                      | `sm`      |
| `rounded`       | `none` \| `sm` \| `md` \| `lg` \| `full`                                         | Sets the border radius of the RadioGroup.             | `md`      |
| `fontSize`      | `xs` \| `sm` \| `md` \| `lg` \| `xl`                                             | Sets the font size of the RadioGroup label.           | `md`      |
| `fontWeight`    | `thin` \| `light` \| `normal` \| `medium` \| `bold` \| `extrabold`               | Specifies the font weight of the RadioGroup label.    | `normal`  |
| `direction`     | `col` \| `row`                                                                   | Change the items direction for the RadioGroup.        | `col`     |
| `label`         | `string`                                                                         | Text label for the RadioGroup.                        | `-`       |
| `icon`          | `React.ReactNode`                                                                | Custom icon for the checked state.                    | `-`       |
| `values`        | `{ value: string; label: string }[]`                                             | Array of options for the RadioGroup.                  | `[]`      |
| `value`         | `string`                                                                         | Controlled value of the RadioGroup.                   | `-`       |
| `onValueChange` | `(value: string) => void`                                                        | Callback when value changes.                          | `-`       |
| `defaultValue`  | `string`                                                                         | Default value of the RadioGroup.                      | `-`       |
| `disabled`      | `boolean`                                                                        | Disables the RadioGroup interaction.                  | `false`   |
| `ref`           | `React.Ref`                                                                      | Allows accessing the underlying DOM element.          | `-`       |
| `className`     | `string`                                                                         | Additional CSS classes for custom styling.            | `-`       |
| `style`         | `React.CSSProperties`                                                            | Additional style for custom styling.                  | `-`       |

---

## **Customization**

You can extend the default styles by passing custom styles using className or style.

```jsx
<RadioGroup
  style={{
    backgroundColor: "red"
  }}
  values={[
    { value: "option1", label: "Option 1" },
    { value: "option2", label: "Option 2" }
  ]}
/>
```

Or you can use the default component classNames.

```css
.customRadioGroup {
  .radioGroupContainer {
    .radioGroupLabel {
      color: red;
    }
    .radioGroupRoot {
      .radioGroupItemContainer {
        .radioGroupItem {
          .radioGroupIndicator {
          }
        }
        .radioGroupItemLabel {
          color: blue;
        }
      }
    }
  }
}
```

```jsx
import "./custom.css"

export const App = () => {
  return (
    <RadioGroup
      values={[
        { value: "option1", label: "Option 1" },
        { value: "option2", label: "Option 2" }
      ]}
    />
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

For more information, please visit the [repository](https://github.com/vbss-io/vbss-ui) or check out the documentation at [ui.vbss.io/radio-group](https://ui.vbss.io/radio-group).  

To see the components in action, run Storybook locally. Navigate to the repository directory and execute:  

```bash
npm run storybook
```
