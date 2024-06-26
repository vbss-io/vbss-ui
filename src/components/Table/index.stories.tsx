import type { Meta, StoryObj } from "@storybook/react";
import { Table } from ".";

const meta: Meta<typeof Table> = {
  title: "Components/Table",
  component: Table,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
};

export default meta;

type Story = StoryObj<typeof Table>;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const argTypes: any = {
  label: {
    control: { type: "text" },
  },
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
  headers: {
    control: { type: "object" },
  },
  rows: {
    control: { type: "object" },
  },
  footer: {
    control: { type: "object" },
  },
};

const headers = [
  { content: "Name", className: "" },
  { content: "Email", className: "" },
  { content: "Role", className: "" },
];

const rows = [
  {
    name: "John Doe",
    email: "JohnDoe@email.com",
    role: "Student",
    className: "",
  },
  {
    name: "John Doe",
    email: "JohnDoe@email.com",
    role: "Student",
    className: "",
  },
  {
    name: "John Doe",
    email: "JohnDoe@email.com",
    role: "Student",
    className: "",
  },
];

const footer = { content: ["", "", `Total: ${rows.length}`], className: "" };

export const Primary: Story = {
  args: {
    variant: "primary",
    fontSize: "md",
    height: "md",
    rounded: "md",
    outBorder: true,
    headers: headers,
    rows: rows,
    footer: footer,
  },
  argTypes,
};

export const Secondary: Story = {
  args: {
    variant: "secondary",
    headers: headers,
    rows: rows,
  },
  argTypes,
};

export const Outline: Story = {
  args: {
    variant: "outline",
    headers: headers,
    rows: rows,
  },
  argTypes,
};

export const Ghost: Story = {
  args: {
    variant: "ghost",
    headers: headers,
    rows: rows,
  },
  argTypes,
};
