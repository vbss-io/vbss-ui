import type { Meta, StoryObj } from "@storybook/react"
import { DataTable, type DataTableColumn } from "../data-table/src"

interface MockUser {
  id: string
  name: string
  email: string
  role: string
}

const mockData: MockUser[] = [
  { id: "1", name: "John Doe", email: "john@example.com", role: "Admin" },
  { id: "2", name: "Jane Smith", email: "jane@example.com", role: "User" },
  { id: "3", name: "Bob Johnson", email: "bob@example.com", role: "User" },
]

const columns: DataTableColumn<MockUser>[] = [
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
  {
    id: "role",
    header: "Role",
    accessor: (row) => row.role,
    sortable: true,
  },
]

const meta: Meta<typeof DataTable> = {
  title: "Components/Data Table",
  component: DataTable,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
}

export default meta

type Story = StoryObj<typeof DataTable>

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const argTypes: any = {
  variant: {
    control: { type: "select" },
    options: ["primary", "secondary", "outline", "ghost"],
  },
  fontSize: {
    control: { type: "select" },
    options: ["xs", "sm", "md", "lg", "xl"],
  },
  rounded: {
    control: { type: "select" },
    options: ["none", "xs", "sm", "md", "lg", "xl"],
  },
}

export const Primary: Story = {
  args: {
    columns,
    data: mockData,
    variant: "primary",
    fontSize: "md",
    rounded: "md",
  },
  argTypes,
}

export const Secondary: Story = {
  args: {
    columns,
    data: mockData,
    variant: "secondary",
    fontSize: "md",
    rounded: "md",
  },
  argTypes,
}

export const WithLabel: Story = {
  args: {
    columns,
    data: mockData,
    variant: "primary",
    fontSize: "md",
    rounded: "md",
    label: <h2 style={{ marginBottom: "1rem", fontSize: "1.25rem", fontWeight: 600 }}>Users</h2>,
  },
  argTypes,
}

export const WithPagination: Story = {
  args: {
    columns,
    data: mockData,
    variant: "primary",
    fontSize: "md",
    rounded: "md",
    pageSize: 2,
  },
  argTypes,
}
