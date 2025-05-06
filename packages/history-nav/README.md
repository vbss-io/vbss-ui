# @vbss-ui/history-nav

> A customizable and accessible History Navigation component.

The History Navigation component provides a simple way to navigate through history with back and forward buttons. It's built with accessibility in mind and offers various styling options and customization features.

## **Installation**

To install only the History Navigation component, run one of the following commands:

```bash
npm install @vbss-ui/history-nav
# or
yarn add @vbss-ui/history-nav
```

---

## **Usage**

```jsx
import { HistoryNav } from "@vbss-ui/history-nav"

export const App = () => {
  return (
    <HistoryNav
      leftIcon={<ChevronLeftIcon />}
      rightIcon={<ChevronRightIcon />}
      leftOnClick={() => window.history.back()}
      rightOnClick={() => window.history.forward()}
    />
  )
}
```

---

## **Examples**

### With Custom Icons

```jsx
import { HistoryNav } from "@vbss-ui/history-nav"
import { ArrowLeft, ArrowRight } from "@phosphor-icons/react"

export const App = () => {
  return (
    <HistoryNav
      leftIcon={<ArrowLeft />}
      rightIcon={<ArrowRight />}
      leftOnClick={() => window.history.back()}
      rightOnClick={() => window.history.forward()}
    />
  )
}
```

### With Custom Gap

```jsx
import { HistoryNav } from "@vbss-ui/history-nav"

export const App = () => {
  return (
    <HistoryNav
      gap="lg"
      leftIcon={<ChevronLeftIcon />}
      rightIcon={<ChevronRightIcon />}
      leftOnClick={() => window.history.back()}
      rightOnClick={() => window.history.forward()}
    />
  )
}
```

### With Custom Button Props

```jsx
import { HistoryNav } from "@vbss-ui/history-nav"

export const App = () => {
  return (
    <HistoryNav
      buttonsProps={{
        size: "icon-lg",
        variant: "secondary"
      }}
      leftIcon={<ChevronLeftIcon />}
      rightIcon={<ChevronRightIcon />}
      leftOnClick={() => window.history.back()}
      rightOnClick={() => window.history.forward()}
    />
  )
}
```

---

## **Props**

| Prop           | Type                                 | Description                                                                            | Default   |
|----------------|--------------------------------------|----------------------------------------------------------------------------------------|-----------|
| `gap`          | `xs` \| `sm` \| `md` \| `lg` \| `xl` | Sets the gap between buttons.                                                          | `md`      |
| `buttonsProps` | `ButtonProps`                        | Props passed to the underlying buttons.  See [Button Props](https://ui.vbss.io/button) | `-`       |
| `leftOnClick`  | `() => void`                         | Function called when the left button is clicked.                                       | `-`       |
| `rightOnClick` | `() => void`                         | Function called when the right button is clicked.                                      | `-`       |
| `leftIcon`     | `React.ReactNode`                    | Icon displayed in the left button.                                                     | `-`       |
| `rightIcon`    | `React.ReactNode`                    | Icon displayed in the right button.                                                    | `-`       |
| `ref`          | `React.Ref`                          | Allows accessing the underlying DOM element.                                           | `-`       |
| `className`    | `string`                             | Additional CSS classes for custom styling.                                             | `-`       |
| `style`        | `React.CSSProperties`                | Additional style for custom styling.                                                   | `-`       |

---

## **Customization**

You can extend the default styles by passing custom styles using className or style.

```jsx
<HistoryNav
  leftIcon={<ChevronLeftIcon />}
  rightIcon={<ChevronRightIcon />}
  style={{
    backgroundColor: "red"
  }}
  leftOnClick={() => window.history.back()}
  rightOnClick={() => window.history.forward()}
/>
```

Or you can use the default component classNames.

```css
.historyNavContainer {
  .button {
    /* ...Button classNames */
    background-color: red;
  }
}
```

```jsx
import "./custom.css"

export const App = () => {
  return (
    <HistoryNav
      leftIcon={<ChevronLeftIcon />}
      rightIcon={<ChevronRightIcon />}
      leftOnClick={() => window.history.back()}
      rightOnClick={() => window.history.forward()}
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

For more information, please visit the [repository](https://github.com/vbss-io/vbss-ui) or check out the documentation at [ui.vbss.io/history-nav](https://ui.vbss.io/history-nav).  

To see the components in action, run Storybook locally. Navigate to the repository directory and execute:  

```bash
npm run storybook
```
