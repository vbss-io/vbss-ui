import type { Meta, StoryObj } from "@storybook/react";
import { ColumnDef } from "@tanstack/react-table";
import { DataTable, DataTableColumnHeader } from ".";
import { Button } from "../Button";
import { Checkbox } from "../Checkbox";
import { DropdownMenu } from "../DropdownMenu";

const meta: Meta<typeof DataTable> = {
  title: "Components/DataTable",
  component: DataTable,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
};

export default meta;

type Story = StoryObj<typeof DataTable>;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const argTypes: any = {
  variant: {
    options: ["primary", "secondary", "outline", "ghost"],
    control: { type: "select" },
  },
  fontSize: {
    options: ["sm", "md", "lg"],
    control: { type: "select" },
  },
  height: {
    options: ["sm", "md", "lg"],
    control: { type: "select" },
  },
  rounded: {
    options: ["sm", "md", "lg"],
    control: { type: "select" },
  },
  outBorder: {
    control: { type: "boolean" },
  },
};

type Payment = {
  id: string;
  name: string;
  email: string;
  amount: number;
};

const simpleHeaders: ColumnDef<Payment>[] = [
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "email",
    header: "Email",
  },
  {
    accessorKey: "amount",
    header: "Amount",
  },
];

const simpleRows: Payment[] = [
  {
    id: "1",
    amount: 100,
    name: "John Doe 1",
    email: "JohnDoe1@email.com",
  },
  {
    id: "2",
    amount: 200,
    name: "John Doe 2",
    email: "JohnDoe2@email.com",
  },
  {
    id: "3",
    amount: 300,
    name: "John Doe 3",
    email: "JohnDoe3@email.com",
  },
  {
    id: "4",
    amount: 400,
    name: "John Doe 4",
    email: "JohnDoe4@email.com",
  },
  {
    id: "5",
    amount: 500,
    name: "John Doe 5",
    email: "JohnDoe5@email.com",
  },
];

export const SimplePrimary: Story = {
  args: {
    variant: "primary",
    fontSize: "md",
    height: "md",
    rounded: "lg",
    outBorder: true,
    // @ts-expect-error storybook types are not up to date
    headers: simpleHeaders,
    rows: simpleRows,
  },
  argTypes,
};

export const SimpleSecondary: Story = {
  args: {
    variant: "secondary",
    // @ts-expect-error storybook types are not up to date
    headers: simpleHeaders,
    rows: simpleRows,
  },
  argTypes,
};

export const SimpleOutline: Story = {
  args: {
    variant: "outline",
    // @ts-expect-error storybook types are not up to date
    headers: simpleHeaders,
    rows: simpleRows,
  },
  argTypes,
};

export const SimpleGhost: Story = {
  args: {
    variant: "ghost",
    // @ts-expect-error storybook types are not up to date
    headers: simpleHeaders,
    rows: simpleRows,
  },
  argTypes,
};

const formattedHeaders: ColumnDef<Payment>[] = [
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "email",
    header: "Email",
  },
  {
    accessorKey: "amount",
    header: "Amount",
    cell: ({ row }) => {
      const amount = parseFloat(row.getValue("amount"));
      const formatted = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
      }).format(amount);

      return <div className="text-right">{formatted}</div>;
    },
  },
];

export const FormattedHeaders: Story = {
  args: {
    // @ts-expect-error storybook types are not up to date
    headers: formattedHeaders,
    rows: simpleRows,
  },
  argTypes,
};

const rows: Payment[] = [
  {
    id: "1",
    amount: 100,
    name: "John Doe 1",
    email: "JohnDoe1@email.com",
  },
  {
    id: "2",
    amount: 200,
    name: "John Doe 2",
    email: "JohnDoe2@email.com",
  },
  {
    id: "3",
    amount: 300,
    name: "John Doe 3",
    email: "JohnDoe3@email.com",
  },
  {
    id: "4",
    amount: 400,
    name: "John Doe 4",
    email: "JohnDoe4@email.com",
  },
  {
    id: "5",
    amount: 500,
    name: "John Doe 5",
    email: "JohnDoe5@email.com",
  },
  {
    id: "6",
    amount: 600,
    name: "John Doe 6",
    email: "JohnDoe6@email.com",
  },
  {
    id: "7",
    amount: 700,
    name: "John Doe 7",
    email: "JohnDoe7@email.com",
  },
  {
    id: "8",
    amount: 800,
    name: "John Doe 8",
    email: "JohnDoe8@email.com",
  },
  {
    id: "9",
    amount: 900,
    name: "John Doe 9",
    email: "JohnDoe9@email.com",
  },
  {
    id: "10",
    amount: 1000,
    name: "John Doe 10",
    email: "JohnDoe10@email.com",
  },
];

export const Pagination: Story = {
  args: {
    // @ts-expect-error storybook types are not up to date
    headers: simpleHeaders,
    rows,
    paginationProps: {
      previousText: "Previous",
      nextText: "Next",
      pageSize: 5,
      pageIndex: 0,
    },
  },
  argTypes,
};

export const PaginationSelect: Story = {
  args: {
    headers: [
      {
        id: "select",
        header: ({ table }) => (
          <Checkbox
            variant={"outline"}
            className="bg-white "
            checked={
              table.getIsAllPageRowsSelected() ||
              (table.getIsSomePageRowsSelected() && "indeterminate")
            }
            onCheckedChange={(value) => {
              table.toggleAllRowsSelected(!!value);
            }}
            aria-label="Select all"
          />
        ),
        cell: ({ row }) => (
          <Checkbox
            checked={row.getIsSelected()}
            onCheckedChange={(value) => {
              row.toggleSelected(!!value);
            }}
          />
        ),
      },
      // @ts-expect-error storybook types are not up to date
      ...simpleHeaders,
    ],
    rows,
    paginationProps: {
      previousText: "Previous",
      nextText: "Next",
      pageSize: 5,
      pageIndex: 0,
    },
  },
  argTypes,
};

const sortHeaders: ColumnDef<Payment>[] = [
  {
    accessorKey: "name",
    header: ({ column }) => {
      return (
        <DataTableColumnHeader
          column={column}
          title="Email"
          menuLabel="Sort Email"
          itemsToHide={["hide"]}
          itemsProps={{ variant: "ghost" }}
        />
      );
    },
  },
  {
    accessorKey: "email",
    header: "Email",
  },
  {
    accessorKey: "amount",
    header: ({ column }) => {
      return (
        <DataTableColumnHeader
          column={column}
          title="Amount"
          menuLabel="Sort Amount"
          itemsToHide={["hide"]}
          itemsProps={{ variant: "ghost" }}
        />
      );
    },
  },
];

export const SortHeaders: Story = {
  args: {
    // @ts-expect-error storybook types are not up to date
    headers: sortHeaders,
    rows: simpleRows,
  },
  argTypes,
};

const columnHideHeaders: ColumnDef<Payment>[] = [
  {
    accessorKey: "name",
    header: ({ column }) => {
      return (
        <DataTableColumnHeader
          column={column}
          title="Email"
          menuLabel="Sort Email"
          itemsProps={{ variant: "ghost" }}
        />
      );
    },
  },
  {
    accessorKey: "email",
    header: "Email",
  },
  {
    accessorKey: "amount",
    header: ({ column }) => {
      return (
        <DataTableColumnHeader
          column={column}
          title="Amount"
          menuLabel="Sort Amount"
          itemsProps={{ variant: "ghost" }}
        />
      );
    },
  },
];

export const ColumnHideToggle: Story = {
  args: {
    // @ts-expect-error storybook types are not up to date
    headers: columnHideHeaders,
    rows: simpleRows,
    columnToggleProps: { title: "Columns", variant: "primary" },
  },
  argTypes,
};

export const FilterRows: Story = {
  args: {
    // @ts-expect-error storybook types are not up to date
    headers: simpleHeaders,
    rows: simpleRows,
    filterProps: { columnId: "name", placeholder: "Search..." },
  },
  argTypes,
};

export const WithActions: Story = {
  args: {
    headers: [
      // @ts-expect-error storybook types are not up to date
      ...simpleHeaders,
      {
        id: "actions",
        // @ts-expect-error storybook types are not up to date
        cell: ({ row }) => {
          const item = row.original;

          return (
            <DropdownMenu
              trigger={
                <Button icon="dots-three-outline" variant={"ghost"} size="sm" />
              }
              menuLabel={"Actions"}
              menus={[
                {
                  item: (
                    <Button
                      variant={"ghost"}
                      onClick={() => {
                        console.log(item);
                      }}
                    >
                      Console.log(item)
                    </Button>
                  ),
                },
              ]}
            />
          );
        },
      },
    ],
    rows: simpleRows,
  },
  argTypes,
};

const fullHeaders: ColumnDef<Payment>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        variant={"outline"}
        className="bg-white "
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => {
          table.toggleAllRowsSelected(!!value);
        }}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => {
          row.toggleSelected(!!value);
        }}
      />
    ),
  },
  {
    accessorKey: "name",
    header: ({ column }) => {
      return (
        <DataTableColumnHeader
          column={column}
          title="Name"
          menuLabel="Sort Name"
          itemsProps={{ variant: "ghost" }}
          headerProps={{ size: "sm" }}
        />
      );
    },
  },
  {
    accessorKey: "email",
    header: ({ column }) => {
      return (
        <DataTableColumnHeader
          column={column}
          title="Email"
          menuLabel="Sort Email"
          itemsProps={{ variant: "ghost" }}
          headerProps={{ size: "sm" }}
        />
      );
    },
  },
  {
    accessorKey: "amount",
    header: ({ column }) => {
      return (
        <DataTableColumnHeader
          column={column}
          title="Amount"
          menuLabel="Sort Amount"
          itemsProps={{ variant: "ghost" }}
          headerProps={{ size: "sm" }}
        />
      );
    },
    cell: ({ row }) => {
      const amount = parseFloat(row.getValue("amount"));
      const formatted = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
      }).format(amount);

      return <div className="text-right">{formatted}</div>;
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const item = row.original;

      return (
        <DropdownMenu
          trigger={
            <Button icon="dots-three-outline" variant={"ghost"} size="sm" />
          }
          menuLabel={"Actions"}
          menus={[
            {
              item: (
                <Button
                  variant={"ghost"}
                  onClick={() => {
                    console.log(item);
                  }}
                >
                  Console.log(item)
                </Button>
              ),
            },
          ]}
        />
      );
    },
  },
];

export const FullDataTable: Story = {
  args: {
    // @ts-expect-error storybook types are not up to date
    headers: fullHeaders,
    rows,
    paginationProps: {
      previousText: "Previous",
      nextText: "Next",
      pageSize: 5,
      pageIndex: 0,
    },
    filterProps: { columnId: "name", placeholder: "Search by Name" },
    columnToggleProps: { title: "Columns", variant: "primary" },
  },
  argTypes,
};
