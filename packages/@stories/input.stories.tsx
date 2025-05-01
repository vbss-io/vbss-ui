import { Eye, EyeSlash } from "@phosphor-icons/react"
import type { Meta, StoryObj } from "@storybook/react"
import React from "react"
import { Input } from "../input/src"

const meta: Meta<typeof Input> = {
  title: "Components/Input",
  component: Input,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
}

export default meta

type Story = StoryObj<typeof Input>

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const argTypes: any = {
  variant: {
    options: ["primary", "secondary", "outline", "ghost"],
    control: { type: "select" },
  },
  height: {
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
  type: {
    options: ["text", "password", "number"],
    control: { type: "select" },
  },
  disabled: {
    control: { type: "boolean" },
  },
  showPasswordSwitch: {
    control: { type: "boolean" },
  },
  buttonProps: {
    control: { type: "object" },
  },
}

export const Primary: Story = {
  args: {
    label: "Input Label:",
    placeholder: "Type here...",
    type: "text",
    variant: "primary",
    height: "md",
    rounded: "md",
    fontSize: "md",
    fontWeight: "normal",
    disabled: false,
    showPasswordSwitch: false,
  },
  argTypes,
}

export const Secondary: Story = {
  args: {
    label: "Input Label:",
    placeholder: "Type here...",
    type: "text",
    variant: "secondary",
  },
  argTypes,
}

export const Outline: Story = {
  args: {
    label: "Input Label:",
    placeholder: "Type here...",
    type: "text",
    variant: "outline",
  },
  argTypes,
}

export const Ghost: Story = {
  args: {
    label: "Input Label:",
    placeholder: "Type here...",
    type: "text",
    variant: "ghost",
  },
  argTypes,
}

export const Password: Story = {
  args: {
    label: "Input Label:",
    placeholder: "Type here...",
    type: "password",
    variant: "primary",
    showPasswordSwitch: true,
    iconOn: <Eye />,
    iconOff: <EyeSlash />,
  },
  argTypes,
}

export const WithButton: Story = {
  args: {
    label: "Input Label:",
    placeholder: "Type here...",
    type: "text",
    variant: "primary",
    buttonProps: {
      children: "Confirm",
      variant: "primary",
    },
  },
  argTypes,
}
