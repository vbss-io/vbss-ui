# @vbss-ui/data-table

> A customizable and accessible Data Table component with sorting and pagination.

The Data Table component is a high-level table component built on top of `@vbss-ui/table`. It provides typed column definitions, sorting (controlled and uncontrolled), optional client-side pagination, and full accessibility support. The component uses TypeScript generics for type-safe column accessors and row data.

## **Installation**

To install only the Data Table component, run one of the following commands:

```bash
npm install @vbss-ui/data-table
# or
yarn add @vbss-ui/data-table
```

---

## **Usage**

```jsx
import { DataTable } from "@vbss-ui/data-table";

interface User {
  id: number;
  name: string;
  email: string;
  age: number;
}

const columns = [
  {
    id: "name",
    header: "Name",
    accessor: (row: User) => row.name,
    sortable: true,
  },
  {
    id: "email",
    header: "Email",
    accessor: (row: User) => row.email,
    sortable: true,
  },
  {
    id: "age",
    header: "Age",
    accessor: (row: User) => row.age,
    sortable: true,
    sortAccessor: (row: User) => row.age,
  },
];

const users = [
  { id: 1, name: "John Doe", email: "john@example.com", age: 30 },
  { id: 2, name: "Jane Smith", email: "jane@example.com", age: 25 },
];

export const App = () => {
  return <DataTable columns={columns} data={users} />;
};
```

---

## **Examples**

### Basic Table with Sorting

```jsx
import { DataTable } from "@vbss-ui/data-table";

const columns = [
  {
    id: "name",
    header: "Name",
    accessor: (row) => row.name,
    sortable: true,
  },
  {
    id: "email",
    header: "Email",
    accessor: (row) => row.email,
    sortable: true,
  },
];

const data = [
  { name: "Alice", email: "alice@example.com" },
  { name: "Bob", email: "bob@example.com" },
];

export const App = () => {
  return <DataTable columns={columns} data={data} />;
};
```

### Controlled Sorting

```jsx
import { DataTable, type SortState } from "@vbss-ui/data-table";
import { useState } from "react";

export const App = () => {
  const [sort, setSort] = useState<SortState>(null);

  return (
    <DataTable
      columns={columns}
      data={data}
      sort={sort}
      onSortChange={setSort}
    />
  );
};
```

### Pagination

```jsx
import { DataTable } from "@vbss-ui/data-table";
import { useState } from "react";

export const App = () => {
  const [page, setPage] = useState(1);

  return (
    <DataTable
      columns={columns}
      data={data}
      pageSize={10}
      page={page}
      onPageChange={setPage}
    />
  );
};
```

### Custom Column Alignment and Width

```jsx
const columns = [
  {
    id: "name",
    header: "Name",
    accessor: (row) => row.name,
    align: "left",
  },
  {
    id: "amount",
    header: "Amount",
    accessor: (row) => `$${row.amount}`,
    align: "right",
    width: 150,
  },
  {
    id: "status",
    header: "Status",
    accessor: (row) => row.status,
    align: "center",
  },
];
```

### Empty State

```jsx
<DataTable
  columns={columns}
  data={[]}
  emptyState={
    <div className="text-center py-8">
      <p>No data available</p>
    </div>
  }
/>
```

### With Label

```jsx
<DataTable
  columns={columns}
  data={data}
  label="User List"
  // or
  label={<h2 className="text-xl font-bold">User List</h2>}
/>
```

---

## **Props**

| Prop            | Type                                                                                          | Description                                        | Default |
|-----------------|----------------------------------------------------------------------------------------------|----------------------------------------------------|---------|
| `columns`       | `Array<DataTableColumn<T>>`                                                                  | Column definitions with headers and accessors      | `-`     |
| `data`          | `T[]`                                                                                         | Array of row data                                  | `-`     |
| `initialSort`   | `{ columnId: string; direction: 'asc' \| 'desc' } \| null`                                    | Initial sort state (uncontrolled mode)              | `null`  |
| `sort`          | `{ columnId: string; direction: 'asc' \| 'desc' } \| null`                                   | Controlled sort state                              | `-`     |
| `onSortChange`  | `(next: SortState) => void`                                                                  | Callback when sort changes (controlled mode)        | `-`     |
| `pageSize`      | `number`                                                                                      | Number of rows per page. Requires `page` and `onPageChange`; there are no built-in pagination controls | `-`     |
| `page`          | `number`                                                                                      | Current page number. Without it, only the first page is shown | `-`     |
| `onPageChange`  | `(page: number) => void`                                                                      | Callback to change the page; also called with 1 when the sort changes | `-`     |
| `label`         | `React.ReactNode`                                                                             | Optional label displayed above the table           | `-`     |
| `emptyState`    | `React.ReactNode`                                                                             | Content to display when data is empty              | `-`     |
| `variant`       | `'primary' \| 'secondary' \| 'outline' \| 'ghost'`                                           | Visual style variant (from Table component)        | `-`     |
| `fontSize`      | `'xs' \| 'sm' \| 'md' \| 'lg' \| 'xl'`                                                       | Font size (from Table component)                   | `-`     |
| `fontWeight`    | `'thin' \| 'light' \| 'normal' \| 'medium' \| 'bold' \| 'extrabold'`                       | Font weight (from Table component)                 | `-`     |
| `height`        | `'xs' \| 'sm' \| 'md' \| 'lg' \| 'xl'`                                                       | Row height (from Table component)                  | `-`     |
| `rounded`       | `'none' \| 'xs' \| 'sm' \| 'md' \| 'lg' \| 'xl'`                                            | Border radius (from Table component)               | `-`     |
| `outline`       | `boolean`                                                                                     | Add border around table (from Table component)     | `-`     |
| `className`     | `string`                                                                                      | Additional CSS class applied to the table          | `-`     |
| `style`         | `React.CSSProperties`                                                                         | Inline style applied to the table                  | `-`     |
| `ref`           | `React.Ref`                                                                                   | Allows accessing the underlying DOM element        | `-`     |

### **DataTableColumn<T>**

| Property       | Type                                  | Description                                                    | Default |
|----------------|---------------------------------------|----------------------------------------------------------------|---------|
| `id`           | `string`                               | Unique identifier for the column                              | `-`     |
| `header`       | `React.ReactNode`                     | Header content (supports ReactNode)                           | `-`     |
| `accessor`      | `(row: T) => React.ReactNode`         | Function to extract cell value from row data                  | `-`     |
| `sortable`      | `boolean`                              | Whether the column can be sorted. Needs a `sortAccessor`, or an `accessor` that returns a string, number or Date in every row | `false` |
| `sortAccessor` | `(row: T) => string \| number \| Date` | Optional function for sorting (defaults to accessor result). Required to sort a column whose accessor returns JSX | `-`     |
| `headerLabel`  | `string`                               | Text used in the sort `aria-label`; when unset, a string or number `header` is used, otherwise the `id` | `-`     |
| `width`         | `number \| string`                     | Column width (number in px, or CSS string)                    | `-`     |
| `align`         | `'left' \| 'center' \| 'right'`       | Column alignment                                               | `'left'` |

---

## **Sorting Behavior**

- **Uncontrolled Mode**: Use `initialSort` prop. Clicking a sortable header toggles: `null → asc → desc → null`
- **Controlled Mode**: Use `sort` and `onSortChange` props. Parent controls sort state
- **Sort Indicators**: Visual arrows (↑↓) show current sort direction
- **Keyboard Support**: Press Enter or Space on sortable headers to toggle sort
- **Sortable Columns**: A column with `sortable` is only sortable when it has a `sortAccessor` or its `accessor` returns a string, number or Date in every row. Columns that return JSX without a `sortAccessor` lose the sort control
- **Accessibility**: Headers include `aria-label` and proper ARIA attributes

---

## **Pagination Behavior**

- **Page size**: `pageSize` sets the number of rows per page; the table has no built-in pagination controls
- **Controlled Mode**: `pageSize` needs `page` and `onPageChange` controlled by the parent. Without `page`, only the first page is shown
- **Auto-reset**: When sorting changes, page resets to 1 (with controlled `page`, `onPageChange(1)` is called)
- **Calculation**: `totalPages = Math.ceil(sortedData.length / pageSize)`

---

## **TypeScript Support**

The component uses TypeScript generics for full type safety:

```typescript
interface MyRowType {
  id: number;
  name: string;
  // ...
}

const columns: DataTableColumn<MyRowType>[] = [
  {
    id: "name",
    header: "Name",
    accessor: (row: MyRowType) => row.name, // TypeScript knows 'row' is MyRowType
  },
];

<DataTable<MyRowType> columns={columns} data={myData} />
```

---

## **Accessibility**

- Proper table semantics (`<table>`, `<thead>`, `<tbody>`, `<th>`, `<td>`)
- Sortable headers with keyboard navigation (Enter/Space)
- ARIA labels on sortable headers
- Screen reader friendly sort indicators

---

## **Customization**

The Data Table component accepts all styling props from the underlying Table component (`variant`, `fontSize`, `fontWeight`, `height`, `rounded`, `outline`). You can also customize columns with `width` and `align` properties.

---

### **More**

For more information, please visit the [repository](https://github.com/vbss-io/vbss-ui) or check out the documentation at [ui.vbss.io/data-table](https://ui.vbss.io/data-table).

To see the components in action, run Storybook locally. Navigate to the repository directory and execute:

```bash
npm run storybook
```

---

## **Support**

Help us keep vbss-ui free and open source. Your support enables continuous development, better docs and new components.

- Buy me a coffee: [buymeacoffee.com/vbss.io](https://www.buymeacoffee.com/vbss.io)
- GitHub Sponsors: [github.com/sponsors/vbss-io](https://github.com/sponsors/vbss-io)
- Star on GitHub: [github.com/vbss-io/vbss-ui](https://github.com/vbss-io/vbss-ui)
- Share with community: [ui.vbss.io](https://ui.vbss.io)

Thank you for supporting the project!
