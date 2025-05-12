import React from "react"
import type { Meta, StoryObj } from "@storybook/react"
import { Button } from "../button/src"
import { Popover } from "../popover/src"

const meta: Meta<typeof Popover> = {
  title: "Components/Popover",
  component: Popover,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
}

export default meta

type Story = StoryObj

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const argTypes: any = {
  variant: {
    options: ["primary", "secondary", "outline"],
    control: { type: "select" },
  },
  size: {
    options: ["xs", "sm", "md", "lg", "xl"],
    control: { type: "select" },
  },
  rounded: {
    options: ["none", "sm", "md", "lg", "full"],
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
  side: {
    options: ["top", "right", "bottom", "left"],
    control: { type: "select" },
  },
  align: {
    options: ["center", "start", "end"],
    control: { type: "select" },
  },
}

export const Primary: Story = {
  args: {
    children: (
      <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
        <Button variant="ghost">Button</Button>
        <Button variant="ghost">Button</Button>
      </div>
    ),
    trigger: "Click Me",
    variant: "primary",
    size: "md",
    rounded: "md",
    fontSize: "md",
    fontWeight: "normal",
    side: "top",
    align: "center",
  },
  argTypes,
}

export const Secondary: Story = {
  args: {
    children: (
      <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
        <Button variant="ghost">Button</Button>
        <Button variant="ghost">Button</Button>
      </div>
    ),
    trigger: "Click Me",
    variant: "secondary",
    size: "md",
    rounded: "md",
    fontSize: "md",
    fontWeight: "normal",
    side: "top",
    align: "center",
  },
  argTypes,
}

export const Outline: Story = {
  args: {
    children: (
      <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
        <Button variant="ghost">Button</Button>
        <Button variant="ghost">Button</Button>
      </div>
    ),
    trigger: "Click Me",
    variant: "outline",
    size: "md",
    rounded: "md",
    fontSize: "md",
    fontWeight: "normal",
    side: "top",
    align: "center",
  },
  argTypes,
}
