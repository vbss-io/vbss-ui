# @vbss-ui/button

> a customizable and accessible Button component.

The Button component is a flexible UI element used to trigger actions or events. It supports various visual styles, sizes, shapes, and states, making it suitable for a wide range of interfaces.

## **Installation**

To install only the Button component, run one of the following commands:

```bash
npm install @vbss-ui/button
# or
yarn add @vbss-ui/button
```

---

## **Usage**

```jsx
import { Button } from "@vbss-ui/button"

export const App = () => {
  return <Button>Click Me</Button>
}
```

---

## **Props**

| Prop         | Type                                                                             | Description                                           | Default   |
|--------------|----------------------------------------------------------------------------------|-------------------------------------------------------|-----------|
| `variant`    | `primary` \| `secondary` \| `outline` \| `outlineSolid` \| `ghost`               | Defines the visual style of the Button.               | `primary` |
| `size`       | `xs` \| `sm` \| `md` \| `lg` \| `icon-xs` \| `icon-sm` \| `icon-md` \| `icon-lg` | Defines the size or icon-specific size of the Button. | `md`      |
| `rounded`    | `none` \| `xs` \| `sm` \| `md` \| `lg` \| `full`                                 | Sets the border radius of the Button.                 | `md`      |
| `fontSize`   | `xs` \| `sm` \| `md` \| `lg` \| `xl`                                             | Sets the font size of the Button text.                | `md`      |
| `fontWeight` | `thin` \| `light` \| `normal` \| `medium` \| `bold` \| `extrabold`               | Specifies the font weight of the Button text.         | `normal`  |
| `inverted`   | `boolean`                                                                        | Inverts the Button's direction.                       | `false`   |
| `disabled`   | `boolean`                                                                        | Disables the Button interaction.                      | `false`   |
| `as`         | `React.ElementType`                                                              | Defines the HTML element or component to render.      | `button`  |
| `ref`        | `React.Ref`                                                                      | Allows accessing the underlying DOM element.          | `-`       |
| `children`   | `string` \| `number` \| `React.ReactNode`                                        | Content to be displayed inside the button.            | `-`       |
| `className`  | `string`                                                                         | Additional CSS classes for custom styling.            | `-`       |
| `style`      | `React.CSSProperties`                                                            | Additional style for custom styling.                  | `-`       |

---

## **Customization**

You can extend the default styles by passing custom styles names using className or style.

```jsx
  <Button
    style={{
      backgroundColor: "red"
    }}
  >
    Click Me
  </Button>
```

Or you can use the default component className chip.

```css
.button {
  background-color: purple;
}
```

```jsx
import "./custom.css";

export const App = () => {
  return <Button>Click Me</Button>;
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

For more information, please visit the [repository](https://github.com/vbss-io/vbss-ui) or check out the documentation at [ui.vbss.io/button](https://ui.vbss.io/button).  

To see the components in action, run Storybook locally. Navigate to the repository directory and execute:  

```bash
npm run storybook
```
