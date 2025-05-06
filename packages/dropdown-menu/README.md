# @vbss-ui/dropdown-menu

> A customizable and accessible Dropdown Menu component.

The Dropdown Menu component is a floating menu that appears when clicking on a trigger element. It provides a list of options or actions that users can select from. Built with accessibility in mind, it offers various styling options, positioning, and customization features.

## **Installation**

To install only the Dropdown Menu component, run one of the following commands:

```bash
npm install @vbss-ui/dropdown-menu
# or
yarn add @vbss-ui/dropdown-menu
```

---

## **Usage**

```jsx
import { DropdownMenu } from "@vbss-ui/dropdown-menu"

export const App = () => {
  return (
    <DropdownMenu
      trigger={<button>Open Menu</button>}
      menus={[
        { item: "Option 1" },
        { item: "Option 2" },
        { item: "Option 3" }
      ]}
    />
  )
}
```

---

## **Examples**

### With Menu Label

```jsx
import { DropdownMenu } from "@vbss-ui/dropdown-menu"

export const App = () => {
  return (
    <DropdownMenu
      trigger={<button>Open Menu</button>}
      menuLabel="Actions"
      menus={[
        { item: "Edit" },
        { item: "Delete" },
        { item: "Share" }
      ]}
    />
  )
}
```

### With Custom Position

```jsx
import { DropdownMenu } from "@vbss-ui/dropdown-menu"

export const App = () => {
  return (
    <DropdownMenu
      trigger={<button>Open Menu</button>}
      side="right"
      menus={[
        { item: "Option 1" },
        { item: "Option 2" },
        { item: "Option 3" }
      ]}
    />
  )
}
```

### Custom Variant

```jsx
import { DropdownMenu } from "@vbss-ui/dropdown-menu"

export const App = () => {
  return (
    <DropdownMenu
      trigger={<button>Open Menu</button>}
      variant="secondary"
      rounded="lg"
      menus={[
        { item: "Option 1" },
        { item: "Option 2" },
        { item: "Option 3" }
      ]}
    />
  )
}
```

---

## **Props**

| Prop         | Type                                                                             | Description                                           | Default   |
|--------------|----------------------------------------------------------------------------------|-------------------------------------------------------|-----------|
| `variant`    | `primary` \| `secondary` \| `outline` \| `ghost`                                 | Defines the visual style of the Dropdown Menu.        | `primary` |
| `size`       | `xs` \| `sm` \| `md` \| `lg` \| `xl`                                             | Sets the size of the Dropdown Menu.                   | `md`      |
| `rounded`    | `none` \| `sm` \| `md` \| `lg` \| `full`                                         | Sets the border radius of the Dropdown Menu.          | `md`      |
| `fontSize`   | `xs` \| `sm` \| `md` \| `lg` \| `xl`                                             | Sets the font size of the menu items.                 | `md`      |
| `fontWeight` | `thin` \| `light` \| `normal` \| `medium` \| `bold` \| `extrabold`               | Specifies the font weight of the menu items.          | `normal`  |
| `side`       | `top` \| `right` \| `bottom` \| `left`                                           | Sets the position of the Dropdown Menu.               | `top`     |
| `trigger`    | `React.ReactNode`                                                                | The element that triggers the Dropdown Menu.          | `-`       |
| `menuLabel`  | `React.ReactNode`                                                                | Optional label for the menu.                          | `-`       |
| `menus`      | `{ item: React.ReactNode \| "separator" }[]`                                     | Array of menu items or separators.                    | `[]`      |
| `ref`        | `React.Ref`                                                                      | Allows accessing the underlying DOM element.          | `-`       |
| `className`  | `string`                                                                         | Additional CSS classes for custom styling.            | `-`       |
| `style`      | `React.CSSProperties`                                                            | Additional style for custom styling.                  | `-`       |

---

## **Customization**

You can extend the default styles by passing custom styles using className or style.

```jsx
<DropdownMenu
  trigger={<button>Open Menu</button>}
  style={{
    backgroundColor: "red"
  }}
  menus={[
    { item: "Option 1" },
    { item: "Option 2" }
  ]}
/>
```

Or you can use the default component classNames.

```css
.customDropdownMenu {
  .dropdownMenuTrigger {
    background-color: red;
    padding: 0.5rem 1rem;
    border-radius: 1rem;
  }
}

.dropdownMenu {
  background-color: red !important;

  .dropdownMenuLabel {
    background-color: blue;
  }
  .dropdownMenuSeparator {}
  .dropdownMenuItem {
    background-color: purple;
  }
}
```

```jsx
import "./custom.css"

export const App = () => {
  return (
    <div className="customDropdownMenu">
      <DropdownMenu
        className="dropdownMenu"
        menuLabel="Actions"
        trigger={<button>Open Menu</button>}
        menus={[{ item: "Option 1" }, { item: "Option 2" }]}
      />
    </div>
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

For more information, please visit the [repository](https://github.com/vbss-io/vbss-ui) or check out the documentation at [ui.vbss.io/dropdown-menu](https://ui.vbss.io/dropdown-menu).  

To see the components in action, run Storybook locally. Navigate to the repository directory and execute:  

```bash
npm run storybook
```
