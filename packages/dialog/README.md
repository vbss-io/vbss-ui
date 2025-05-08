# @vbss-ui/dialog

> A customizable and accessible Dialog component with support for triggers, overlays, and various content sections.

The Dialog component is a modal window that appears on top of the main content, providing a focused interaction space. Built with accessibility in mind, it offers various styling options, content sections, and customization features.

## **Installation**

To install only the Dialog component, run one of the following commands:

```bash
npm install @vbss-ui/dialog
# or
yarn add @vbss-ui/dialog
```

---

## **Usage**

```jsx
import { Dialog } from "@vbss-ui/dialog"
import { Button } from "@vbss-ui/button"

export const App = () => {
  return (
    <Dialog
      trigger={<Button as="div">Open Dialog</Button>}
      title="Dialog Title"
      description="Dialog Description"
    >
      <div>Dialog Content</div>
    </Dialog>
  )
}
```

---

## **Examples**

### Custom Variant

```jsx
import { Dialog } from "@vbss-ui/dialog"
import { Button } from "@vbss-ui/button"

export const App = () => {
  return (
    <Dialog
      trigger={<Button as="div">Open Dialog</Button>}
      variant="secondary"
      rounded="lg"
      border={true}
    >
      <div>Custom styled dialog</div>
    </Dialog>
  )
}
```

### With Footer

```jsx
import { Dialog } from "@vbss-ui/dialog"
import { Button } from "@vbss-ui/button"

export const App = () => {
  return (
    <Dialog
      trigger={<Button as="div">Open Dialog</Button>}
      title="Dialog Title"
      footer={
        <div>
          <Button variant="outline">Cancel</Button>
          <Button>Confirm</Button>
        </div>
      }
    >
      <div>Dialog Content</div>
    </Dialog>
  )
}
```

### Controlled State

```jsx
import { useState } from "react"
import { Dialog } from "@vbss-ui/dialog"
import { Button } from "@vbss-ui/button"

export const App = () => {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <Dialog
      open={isOpen}
      onOpenChange={setIsOpen}
      trigger={<Button as="div">Open Dialog</Button>}
      title="Dialog Title"
    >
      <div>Dialog Content</div>
    </Dialog>
  )
}
```

You can also prevent the dialog from closing by controlling the state:

```jsx
const [isOpen, setIsOpen] = useState(false)

const handleOpenChange = (open: boolean) => {
  // Only allow opening, prevent closing
  if (open) {
    setIsOpen(true)
  }
}

return (
  <Dialog
    open={isOpen}
    onOpenChange={handleOpenChange}
    trigger={<Button as="div">Open Dialog</Button>}
    hideClose
  >
    <div>This dialog can't be closed</div>
  </Dialog>
)
```

---

## **Props**

| Prop               | Type                                                                             | Description                                           | Default   |
|--------------------|----------------------------------------------------------------------------------|-------------------------------------------------------|-----------|
| `variant`          | `primary` \| `secondary` \| `outline` \| `ghost`                                 | Defines the visual style of the Dialog.               | `primary` |
| `rounded`          | `none` \| `sm` \| `md` \| `lg` \| `full`                                         | Sets the border radius of the Dialog.                 | `md`      |
| `trigger`          | `React.ReactNode`                                                                | The element that triggers the Dialog.                 | `<div />` |
| `overlayOpacity`   | `number`                                                                         | Sets the opacity of the overlay (0-100).              | `50`      |
| `border`           | `boolean`                                                                        | Adds a border to the Dialog.                          | `false`   |
| `title`            | `React.ReactNode`                                                                | The title of the Dialog.                              | `-`       |
| `description`      | `React.ReactNode`                                                                | The description text of the Dialog.                   | `-`       |
| `footer`           | `React.ReactNode`                                                                | Content to be displayed in the footer.                | `-`       |
| `disableTextColor` | `boolean`                                                                        | Disable variant-based text color.                     | `false`    |
| `hideClose`        | `boolean`                                                                        | Shows/hides the close button.                         | `false`   |
| `open`             | `boolean`                                                                        | Controls whether the dialog is open or closed.        | `-`       |
| `onOpenChange`     | `(open: boolean) => void`                                                        | Callback when the dialog's open state changes.        | `-`       |
| `className`        | `string`                                                                         | Additional CSS classes for custom styling.            | `-`       |
| `style`            | `React.CSSProperties`                                                            | Additional style for custom styling.                  | `-`       |

---

## **Customization**

You can extend the default styles by passing custom styles using className or style.

```jsx
<Dialog
  trigger={<Button as="div">Open Dialog</Button>}
  style={{
    backgroundColor: "red"
  }}
>
  Custom styled dialog
</Dialog>
```

Or you can use the default component classNames.

```css
.dialogTrigger {}
.dialogOverlay {}
.dialogContent {
  .dialogInfo {
    .dialogTitle {}
    .dialogDescription {}
  }
  .dialogFooter {}
  .dialogCloseContainer {
    .dialogCloseIcon {}
  }
}
```

```jsx
import "./custom.css"

export const App = () => {
  return (
    <Dialog trigger={<Button as="div">Open Dialog</Button>}>
      Custom styled dialog
    </Dialog>
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

For more information, please visit the [repository](https://github.com/vbss-io/vbss-ui) or check out the documentation at [ui.vbss.io/dialog](https://ui.vbss.io/dialog).  

To see the components in action, run Storybook locally. Navigate to the repository directory and execute:  

```bash
npm run storybook
```
