# @vbss-ui/input

> A customizable and accessible Input component.

The Input component is a versatile form control that supports various input types, labels, error states, and password visibility toggles. It offers multiple styling options, including different variants, sizes, and customizable content. Built with accessibility in mind, it provides a clean and modern interface for user input.

## **Installation**

To install only the Input component, run one of the following commands:

```bash
npm install @vbss-ui/input
# or
yarn add @vbss-ui/input
```

---

## **Usage**

```jsx
import { Input } from "@vbss-ui/input"

export const App = () => {
  return <Input placeholder="Enter your name" />
}
```

---

## **Examples**

### With Label

```jsx
import { Input } from "@vbss-ui/input"

export const App = () => {
  return <Input label="Username" placeholder="Enter your username" />
}
```

### With Error State

```jsx
import { Input } from "@vbss-ui/input"

export const App = () => {
  return <Input error="This field is required" />
}
```

### Password Input with Toggle

```jsx
import { Input } from "@vbss-ui/input"
import { Eye, EyeSlash } from "@phosphor-icons/react"

export const App = () => {
  return (
    <Input
      type="password"
      showPasswordSwitch
      iconOn={<Eye />}
      iconOff={<EyeSlash />}
    />
  )
}
```

### With Button

```jsx
import { Input } from "@vbss-ui/input"

export const App = () => {
  return (
    <Input
      placeholder="Enter your email"
      buttonProps={{
        children: "Subscribe",
        onClick: () => console.log("Subscribed!")
      }}
    />
  )
}
```

---

## **Props**

| Prop                | Type                                                                             | Description                                                                  | Default   |
|---------------------|----------------------------------------------------------------------------------|------------------------------------------------------------------------------|-----------|
| `variant`           | `primary` \| `secondary` \| `outline` \| `ghost`                                 | Defines the visual style of the Input.                                       | `primary` |
| `height`            | `xs` \| `sm` \| `md` \| `lg` \| `xl`                                             | Sets the height of the Input.                                                | `md`      |
| `rounded`           | `none` \| `xs` \| `sm` \| `md` \| `lg` \| `full`                                 | Sets the border radius of the Input.                                         | `md`      |
| `fontSize`          | `xs` \| `sm` \| `md` \| `lg` \| `xl`                                             | Sets the font size of the Input content.                                     | `md`      |
| `fontWeight`        | `thin` \| `light` \| `normal` \| `medium` \| `bold` \| `extrabold`               | Specifies the font weight of the Input content.                              | `normal`  |
| `type`              | `text` \| `password` \| `number`                                                 | Sets the input type.                                                         | `text`    |
| `label`             | `string`                                                                         | Text label for the Input.                                                    | `-`       |
| `error`             | `string`                                                                         | Error message to display.                                                    | `-`       |
| `showPasswordSwitch`| `boolean`                                                                        | Enables password visibility toggle.                                          | `false`   |
| `iconOn`            | `React.ReactNode`                                                                | Icon to display when password is hidden.                                     | `-`       |
| `iconOff`           | `React.ReactNode`                                                                | Icon to display when password is visible.                                    | `-`       |
| `buttonProps`       | `ButtonProps`                                                                    | Props for the attached button. See [Button Props](https://ui.vbss.io/button) | `-`       |
| `disabled`          | `boolean`                                                                        | Disables the Input interaction.                                              | `false`   |
| `ref`               | `React.Ref`                                                                      | Allows accessing the underlying DOM element.                                 | `-`       |
| `className`         | `string`                                                                         | Additional CSS classes for custom styling.                                   | `-`       |
| `style`             | `React.CSSProperties`                                                            | Additional style for custom styling.                                         | `-`       |

---

## **Customization**

You can extend the default styles by passing custom styles using className or style.

```jsx
<Input
  style={{
    backgroundColor: "red"
  }}
/>
```

Or you can use the default component classNames.

```css
  .inputRoot {
    .inputLabel {
      color: purple
    }
    .inputContainer {
      .inputContent {
        .input {
          background-color: red !important;
        }
        .inputIconOnContainer {
          .inputIconOn {}
        }
        .inputIconOffContainer {
          .inputIconOff {}
        }
        .button {
          /* ...Button classNames */
        }
      }
    }
    .inputError {
      color: blue
    }
  }
```

```jsx
import "./custom.css"

export const App = () => {
  return <Input label="Label:" />
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

For more information, please visit the [repository](https://github.com/vbss-io/vbss-ui) or check out the documentation at [ui.vbss.io/input](https://ui.vbss.io/input).  

To see the components in action, run Storybook locally. Navigate to the repository directory and execute:  

```bash
npm run storybook
```
