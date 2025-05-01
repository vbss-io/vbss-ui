import type { Meta, StoryObj } from "@storybook/react"
import { Textarea } from "../textarea/src"

const meta: Meta<typeof Textarea> = {
  title: "Components/Textarea",
  component: Textarea,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
}

export default meta

type Story = StoryObj<typeof Textarea>

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const argTypes: any = {
  variant: {
    options: ["primary", "secondary", "outline", "ghost"],
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
  disabled: {
    control: { type: "boolean" },
  },
}

export const Primary: Story = {
  args: {
    label: "Label:",
    placeholder: "Type here...",
    variant: "primary",
    height: "md",
    rounded: "md",
    fontSize: "md",
    fontWeight: "normal",
    disabled: false,
  },
  argTypes,
}

export const Secondary: Story = {
  args: {
    placeholder: "Type here...",
    variant: "secondary",
  },
  argTypes,
}

export const Outline: Story = {
  args: {
    placeholder: "Type here...",
    variant: "outline",
  },
  argTypes,
}

export const Ghost: Story = {
  args: {
    placeholder: "Type here...",
    variant: "ghost",
  },
  argTypes,
}

export const WithLabel: Story = {
  args: {
    label: "Textarea Label:",
    placeholder: "Type here...",
    variant: "primary",
  },
  argTypes,
}

export const Disable: Story = {
  args: {
    placeholder: "Type here...",
    variant: "primary",
    disabled: true,
  },
  argTypes,
}
