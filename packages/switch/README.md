# @vbss-ui/switch

> A customizable and accessible Switch component.

The Switch component is a toggle control that allows users to switch between two states. It supports various visual styles, sizes, and states, making it suitable for a wide range of interfaces. Built on top of Radix UI's Switch primitive, it provides a fully accessible and customizable solution.

## **Installation**

To install only the Switch component, run one of the following commands:

```bash
npm install @vbss-ui/switch
# or
yarn add @vbss-ui/switch
```

---

## **Usage**

```jsx
import { Switch } from "@vbss-ui/switch"

export const App = () => {
  return <Switch />
}
```

---

## **Examples**

### With Label

```jsx
import { Switch } from "@vbss-ui/switch"

export const App = () => {
  return <Switch label="Enable notifications" />
}
```

### With Icons

```jsx
import { Switch } from "@vbss-ui/switch"
import { Moon, Sun } from "@phosphor-icons/react"

export const App = () => {
  return <Switch iconOn={<Moon />} iconOff={<Sun />} />
}
```

### Custom Variant

```jsx
import { Switch } from "@vbss-ui/switch"

export const App = () => {
  return <Switch variant="secondary" rounded="lg" />
}
```

### State Management

```jsx
import { useState } from "react"
import { Switch } from "@vbss-ui/switch"

export const App = () => {
const [isEnabled, setIsEnabled] = useState(false)

  return (
    <Switch 
      checked={isEnabled}
      onCheckedChange={(checked) => setIsEnabled(checked)}
      label="Enable Feature"
    />
  )
}
```

---

## **Props**

| Prop         | Type                                                                             | Description                                           | Default   |
|--------------|----------------------------------------------------------------------------------|-------------------------------------------------------|-----------|
| `variant`    | `primary` \| `secondary` \| `outline` \| `ghost`                                 | Defines the visual style of the Switch.               | `primary` |
| `rounded`    | `none` \| `sm` \| `md` \| `lg` \| `full`                                         | Sets the border radius of the Switch.                 | `full`    |
| `fontSize`   | `xs` \| `sm` \| `md` \| `lg` \| `xl`                                             | Sets the font size of the Switch label.               | `sm`      |
| `fontWeight` | `thin` \| `light` \| `normal` \| `medium` \| `bold` \| `extrabold`               | Specifies the font weight of the Switch label.        | `normal`  |
| `inverted`   | `boolean`                                                                        | Inverts the Switch's direction.                       | `false`   |
| `disabled`   | `boolean`                                                                        | Disables the Switch interaction.                      | `false`   |
| `label`      | `string`                                                                         | Text label for the Switch.                            | `-`       |
| `iconOn`     | `React.ReactNode`                                                                      | Icon to display when Switch is on.                    | `-`       |
| `iconOff`    | `React.ReactNode`                                                                      | Icon to display when Switch is off.                   | `-`       |
| `ref`        | `React.Ref`                                                                      | Allows accessing the underlying DOM element.          | `-`       |
| `className`  | `string`                                                                         | Additional CSS classes for custom styling.            | `-`       |
| `style`      | `React.CSSProperties`                                                            | Additional style for custom styling.                  | `-`       |

---

## **Customization**

You can extend the default styles by passing custom styles using className or style.

```jsx
<Switch
  style={{
    backgroundColor: "red"
  }}
/>
```

Or you can use the default component classNames.

```css
  .switchContainer {
    .switchRoot {
      .switchIconOnContainer {}
      .switchThumb {
        background-color: red;
      }
      .switchIconOffContainer {}
    }
    .switchLabel {
      color: blue
    }
  }
```

```jsx
import "./custom.css";

export const App = () => {
  return <Switch label="Label:" />;
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

For more information, please visit the [repository](https://github.com/vbss-io/vbss-ui) or check out the documentation at [ui.vbss.io/switch](https://ui.vbss.io/switch).  

To see the components in action, run Storybook locally. Navigate to the repository directory and execute:  

```bash
npm run storybook
```
