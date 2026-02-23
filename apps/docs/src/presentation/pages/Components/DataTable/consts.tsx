export const sections = [
  {
    title: "Installation",
    anchor: "installation",
    subsections: [
      {
        title: "Using npm",
        anchor: "using-npm",
      },
      {
        title: "Using yarn",
        anchor: "using-yarn",
      },
    ],
  },
  {
    title: "Usage",
    anchor: "usage",
    subsections: [
      { title: "Basic Usage", anchor: "basic-usage" },
      { title: "Sorting", anchor: "sorting" },
      { title: "Pagination", anchor: "pagination" },
      { title: "Empty State", anchor: "empty-state" },
      { title: "Styling", anchor: "styling" },
      { title: "Accessibility", anchor: "accessibility" },
    ],
  },
  {
    title: "Props",
    anchor: "props",
  },
  {
    title: "Customization",
    anchor: "customization",
    subsections: [
      {
        title: "Using style",
        anchor: "custom-style",
      },
      {
        title: "Using className",
        anchor: "custom-classname",
      },
    ],
  },
]

export const propsTableHeaders = [{ content: "Prop" }, { content: "Type" }, { content: "Description" }, { content: "Default" }]

export const propsTableRows = [
  {
    prop: "columns",
    type: "Array<DataTableColumn<T>>",
    description: "Array of column definitions",
    default: "-",
  },
  {
    prop: "data",
    type: "T[]",
    description: "Array of data objects to display",
    default: "-",
  },
  {
    prop: "initialSort",
    type: "{ columnId: string; direction: 'asc' | 'desc' } | null",
    description: "Initial sort state (uncontrolled mode)",
    default: "-",
  },
  {
    prop: "sort",
    type: "{ columnId: string; direction: 'asc' | 'desc' } | null",
    description: "Controlled sort state",
    default: "-",
  },
  {
    prop: "onSortChange",
    type: "(next: SortState) => void",
    description: "Callback fired when sort changes",
    default: "-",
  },
  {
    prop: "pageSize",
    type: "number",
    description: "Number of items per page (enables pagination)",
    default: "-",
  },
  {
    prop: "page",
    type: "number",
    description: "Current page number (controlled mode)",
    default: "-",
  },
  {
    prop: "onPageChange",
    type: "(page: number) => void",
    description: "Callback fired when page changes",
    default: "-",
  },
  {
    prop: "label",
    type: "React.ReactNode",
    description: "Label text for the table",
    default: "-",
  },
  {
    prop: "emptyState",
    type: "React.ReactNode",
    description: "Content to display when table is empty",
    default: "-",
  },
  {
    prop: "variant",
    type: '"primary" | "secondary" | "outline" | "ghost"',
    description: "Visual style variant",
    default: '"primary"',
  },
  {
    prop: "fontSize",
    type: '"xs" | "sm" | "md" | "lg" | "xl"',
    description: "Font size of table content",
    default: '"md"',
  },
  {
    prop: "fontWeight",
    type: '"thin" | "light" | "normal" | "medium" | "bold" | "extrabold"',
    description: "Font weight of table content",
    default: '"normal"',
  },
  {
    prop: "height",
    type: '"xs" | "sm" | "md" | "lg" | "xl"',
    description: "Height of table rows",
    default: '"md"',
  },
  {
    prop: "rounded",
    type: '"none" | "xs" | "sm" | "md" | "lg" | "xl"',
    description: "Border radius of the table",
    default: '"md"',
  },
  {
    prop: "outline",
    type: "boolean",
    description: "Add a border around the table",
    default: "true",
  },
  {
    prop: "className",
    type: "string",
    description: "Additional CSS classes for custom styling",
    default: "-",
  },
  {
    prop: "style",
    type: "React.CSSProperties",
    description: "Additional style for custom styling",
    default: "-",
  },
]

export interface MockUser {
  id: string
  name: string
  email: string
  role: string
  joinDate: Date
}

export const mockUsers: MockUser[] = [
  { id: "1", name: "John Doe", email: "john@example.com", role: "Admin", joinDate: new Date("2023-01-15") },
  { id: "2", name: "Jane Smith", email: "jane@example.com", role: "User", joinDate: new Date("2023-02-20") },
  { id: "3", name: "Bob Johnson", email: "bob@example.com", role: "User", joinDate: new Date("2023-03-10") },
  { id: "4", name: "Alice Williams", email: "alice@example.com", role: "Admin", joinDate: new Date("2023-04-05") },
  { id: "5", name: "Charlie Brown", email: "charlie@example.com", role: "User", joinDate: new Date("2023-05-12") },
]

export const usageExampleCode = `import { DataTable } from "@vbss-ui/data-table"
import { ReactNode } from "react"

interface User {
  id: string
  name: string
  email: string
  role: string
}

const columns = [
  {
    id: "name",
    header: "Name",
    accessor: (row: User) => row.name,
  },
  {
    id: "email",
    header: "Email",
    accessor: (row: User) => row.email,
  },
  {
    id: "role",
    header: "Role",
    accessor: (row: User) => row.role,
  },
]

const users: User[] = [
  { id: "1", name: "John Doe", email: "john@example.com", role: "Admin" },
  { id: "2", name: "Jane Smith", email: "jane@example.com", role: "User" },
]

export const App = () => {
  return <DataTable columns={columns} data={users} />
}`

export const sortingExampleCode = `import { DataTable } from "@vbss-ui/data-table"
import { useState } from "react"

const columns = [
  {
    id: "name",
    header: "Name",
    accessor: (row) => row.name,
    sortable: true,
    sortAccessor: (row) => row.name,
  },
  {
    id: "email",
    header: "Email",
    accessor: (row) => row.email,
    sortable: true,
    sortAccessor: (row) => row.email,
  },
  {
    id: "role",
    header: "Role",
    accessor: (row) => row.role,
    sortable: true,
  },
]

export const App = () => {
  const [sort, setSort] = useState(null)

  return (
    <DataTable
      columns={columns}
      data={users}
      sort={sort}
      onSortChange={setSort}
    />
  )
}`

export const paginationExampleCode = `import { DataTable } from "@vbss-ui/data-table"
import { useState } from "react"

export const App = () => {
  const [page, setPage] = useState(1)

  return (
    <DataTable
      columns={columns}
      data={users}
      pageSize={10}
      page={page}
      onPageChange={setPage}
    />
  )
}`

export const emptyStateExampleCode = `import { DataTable } from "@vbss-ui/data-table"

export const App = () => {
  return (
    <DataTable
      columns={columns}
      data={[]}
      emptyState={
        <div style={{ textAlign: "center", padding: "2rem" }}>
          <p>No data available</p>
        </div>
      }
    />
  )
}`

export const realUsageExampleCode = `import { DataTable } from "@vbss-ui/data-table"
import { useState } from "react"

interface User {
  id: string
  name: string
  email: string
  role: string
  joinDate: Date
}

const columns = [
  {
    id: "name",
    header: "Name",
    accessor: (row: User) => row.name,
    sortable: true,
    sortAccessor: (row) => row.name,
  },
  {
    id: "email",
    header: "Email",
    accessor: (row: User) => row.email,
    sortable: true,
    sortAccessor: (row) => row.email,
  },
  {
    id: "role",
    header: "Role",
    accessor: (row: User) => row.role,
    sortable: true,
  },
  {
    id: "joinDate",
    header: "Join Date",
    accessor: (row: User) => row.joinDate.toLocaleDateString(),
    sortable: true,
    sortAccessor: (row) => row.joinDate,
  },
]

export const App = () => {
  const [sort, setSort] = useState(null)
  const [page, setPage] = useState(1)

  return (
    <div style={{ padding: "2rem" }}>
      <DataTable
        columns={columns}
        data={users}
        sort={sort}
        onSortChange={setSort}
        pageSize={10}
        page={page}
        onPageChange={setPage}
        label={<h2 style={{ marginBottom: "1rem" }}>Users</h2>}
        emptyState={
          <div style={{ textAlign: "center", padding: "2rem" }}>
            <p>No users found</p>
          </div>
        }
      />
    </div>
  )
}`

export const customizingExampleCode = `<DataTable
  style={{
    backgroundColor: "#f3f4f6",
    border: "2px solid #e5e7eb"
  }}
  columns={columns}
  data={data}
/>`

export const customizingClassExampleCode = `// CSS
.customDataTable {
  .dataTableRoot {
    background-color: #f3f4f6;
    border: 2px solid #e5e7eb;
  }
}

// Usage
import "./custom.css"

export const App = () => {
  return (
    <div className="customDataTable">
      <DataTable columns={columns} data={data} />
    </div>
  )
}`
