import type { Meta, StoryObj } from "@storybook/react"
import React from "react"
import { Table } from "../table/src"

const meta: Meta<typeof Table> = {
  title: "Components/Table",
  component: Table,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
}

export default meta

type Story = StoryObj<typeof Table>

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const argTypes: any = {
  variant: {
    options: ["primary", "secondary", "outline", "ghost"],
    control: { type: "select" },
  },
  fontSize: {
    options: ["xs", "sm", "md", "lg", "xl"],
    control: { type: "select" },
  },
  fontWeight: {
    options: ["thin", "light", "normal", "medium", "bold", "extrabold"],
    control: { type: "select" },
  },
  height: {
    options: ["xs", "sm", "md", "lg", "xl"],
    control: { type: "select" },
  },
  rounded: {
    options: ["none", "xs", "sm", "md", "lg", "xl"],
    control: { type: "select" },
  },
  outline: {
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
}

const headers = [
  { content: <em>Name</em>, className: "", style: { color: "white" } },
  { content: "Email", className: "", style: { color: "white" } },
  { content: "Role", className: "", style: { color: "white" } },
]

const rows = [
  {
    name: <em>John Doe</em>,
    email: "JohnDoe@email.com",
    role: "Student",
    className: "",
    style: { color: "blue" },
  },
  {
    name: "John Doe",
    email: "JohnDoe@email.com",
    role: "Student",
    className: "",
    style: { color: "red" },
  },
  {
    name: "John Doe",
    email: "JohnDoe@email.com",
    role: "Student",
    className: "",
  },
]

const footer = {
  content: ["", <em key="2">Hello World</em>, `Total: ${rows.length}`],
  className: "",
  style: { color: "green" },
}

export const Primary: Story = {
  args: {
    variant: "primary",
    fontSize: "md",
    fontWeight: "normal",
    height: "md",
    rounded: "md",
    outline: true,
    headers: headers,
    rows: rows,
    footer: footer,
  },
  argTypes,
}

export const Secondary: Story = {
  args: {
    variant: "secondary",
    headers: headers,
    rows: rows,
  },
  argTypes,
}

export const Outline: Story = {
  args: {
    variant: "outline",
    headers: headers,
    rows: rows,
  },
  argTypes,
}

export const Ghost: Story = {
  args: {
    variant: "ghost",
    headers: headers,
    rows: rows,
  },
  argTypes,
}
