import type { Meta, StoryObj } from "@storybook/react"
import { Tooltip } from "../tooltip/src"

const meta: Meta<typeof Tooltip> = {
  title: "Components/Tooltip",
  component: Tooltip,
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
  side: {
    options: ["top", "right", "bottom", "left"],
    control: { type: "select" },
  },
  sideOffset: {
    control: { type: "number" },
  },
  fontSize: {
    options: ["xs", "sm", "md", "lg", "xl"],
    control: { type: "select" },
  },
  fontWeight: {
    options: ["thin", "light", "normal", "medium", "bold", "extrabold"],
    control: { type: "select" },
  },
}

export const Primary: Story = {
  args: {
    children: "Content",
    trigger: "Hover",
    variant: "primary",
    size: "md",
    rounded: "md",
    side: "top",
    sideOffset: 4,
    fontSize: "md",
    fontWeight: "normal",
  },
  argTypes,
}

export const Secondary: Story = {
  args: {
    children: "Content",
    trigger: "Hover",
    variant: "secondary",
    size: "md",
    rounded: "md",
    fontWeight: "normal",
    side: "top",
  },
  argTypes,
}

export const Outline: Story = {
  args: {
    children: "Content",
    trigger: "Hover",
    variant: "outline",
    size: "md",
    rounded: "md",
    fontWeight: "normal",
    side: "top",
  },
  argTypes,
}
