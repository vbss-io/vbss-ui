# @vbss-ui/table

> A customizable and accessible Table component.

The Table component is a flexible and feature-rich data display component that supports headers, rows, and footers. It offers various styling options, including different variants, sizes, and customizable content. The component is built with accessibility in mind and provides a clean, modern interface for displaying tabular data.

## **Installation**

To install only the Table component, run one of the following commands:

```bash
npm install @vbss-ui/table
# or
yarn add @vbss-ui/table
```

---

## **Usage**

```jsx
import { Table } from "@vbss-ui/table";

export const App = () => {
  const headers = [
    { content: "Name" },
    { content: "Email" },
    { content: "Role" }
  ]

  const rows = [
    {
      name: "John Doe",
      email: "john@example.com",
      role: "Developer"
    }
  ]

  return <Table headers={headers} rows={rows} />
}
```

---

## **Examples**

### Table with Styled Headers

```jsx
import { Table } from "@vbss-ui/table";

export const App = () => {
  const headers = [
    { content: <em>Name</em>, style: { color: "white" } },
    { content: "Email", style: { color: "white" } },
    { content: "Role", style: { color: "white" } }
  ];

  const rows = [
    {
      name: "John Doe",
      email: "john@example.com",
      role: "Developer"
    }
  ];

  return <Table variant="primary" headers={headers} rows={rows} />;
}
```

### Table with Footer

```jsx
import { Table } from "@vbss-ui/table";

export const App = () => {
  const headers = [
    { content: "Name" },
    { content: "Email" },
    { content: "Role" }
  ];

  const rows = [
    {
      name: "John Doe",
      email: "john@example.com",
      role: "Developer"
    }
  ];

  const footer = {
    content: ["", "", `Total: ${rows.length}`],
    style: { color: "green" }
  };

  return <Table headers={headers} rows={rows} footer={footer} />;
}
```

### Custom Styled Table

```jsx
import { Table } from "@vbss-ui/table";

export const App = () => {
  const headers = [
    { content: "Name" },
    { content: "Email" },
    { content: "Role" }
  ];

  const rows = [
    {
      name: "John Doe",
      email: "john@example.com",
      role: "Developer",
      style: { color: "blue" }
    }
  ];

  return <Table 
    variant="outline" 
    headers={headers} 
    rows={rows} 
    rounded="lg"
    height="lg"
  />;
}
```

---

## **Props**

| Prop         | Type                                                                                           | Description                                     | Default   |
|--------------|------------------------------------------------------------------------------------------------|-------------------------------------------------|-----------|
| `variant`    | `primary` \| `secondary` \| `outline` \| `ghost`                                               | Defines the visual style of the Table.          | `primary` |
| `fontSize`   | `xs` \| `sm` \| `md` \| `lg` \| `xl`                                                           | Sets the font size of the Table content.        | `md`      |
| `fontWeight` | `thin` \| `light` \| `normal` \| `medium` \| `bold` \| `extrabold`                             | Specifies the font weight of the Table content. | `normal`  |
| `height`     | `xs` \| `sm` \| `md` \| `lg` \| `xl`                                                           | Sets the height of table rows.                  | `md`      |
| `rounded`    | `none` \| `xs` \| `sm` \| `md` \| `lg` \| `xl`                                                 | Sets the border radius of the Table.            | `md`      |
| `outline`    | `boolean`                                                                                      | Adds a border around the Table.                 | `true`    |
| `headers`    | `Array<{ content: string \| number \| ReactNode, className?: string, style?: CSSProperties }>` | Table headers configuration.                    | `-`       |
| `rows`       | `Array<{ [key: string]: string \| number \| ReactNode \| CSSProperties }>`                     | Table rows data.                                | `-`       |
| `footer`     | `{ content: Array<string \| ReactNode>, className?: string, style?: CSSProperties }`           | Table footer configuration.                     | `-`       |
| `ref`        | `React.Ref`                                                                                    | Allows accessing the underlying DOM element.    | `-`       |
| `className`  | `string`                                                                                       | Additional CSS classes for custom styling.      | `-`       |
| `style`      | `React.CSSProperties`                                                                          | Additional style for custom styling.            | `-`       |

---

## **Customization**

You can extend the default styles by passing custom styles using className or style.

```jsx
<Table
  style={{
    backgroundColor: "red"
  }}
/>
```

Or you can use the default component classNames.

```css
  .tableContainer {
    .table {
      .thead {
        .htr {
          .hth {
            background-color: blue;
            color: red
          }
        }
      }
      .tbody {
        .btr {
          .btd {
            color: green
          }
        }
      }
      .tfoot {
        .ftd {
          color: purple
        }
      }
    }
  }
```

```jsx
import "./custom.css"

export const App = () => {
  return <Table />
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

For more information, please visit the [repository](https://github.com/vbss-io/vbss-ui) or check out the documentation at [ui.vbss.io/table](https://ui.vbss.io/table).  

To see the components in action, run Storybook locally. Navigate to the repository directory and execute:  

```bash
npm run storybook
```
