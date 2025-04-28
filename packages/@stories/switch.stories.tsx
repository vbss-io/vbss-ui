import { Moon, Sun } from "@phosphor-icons/react"
import type { Meta, StoryObj } from "@storybook/react"
import React from "react"
import { Switch } from "../switch/src"

const meta: Meta<typeof Switch> = {
  title: "Components/Switch",
  component: Switch,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
}

export default meta

type Story = StoryObj<typeof Switch>

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
  inverted: {
    control: { type: "boolean" },
  },
  disabled: {
    control: { type: "boolean" },
  },
  label: {
    control: { type: "text" },
  },
}

export const Primary: Story = {
  args: {
    variant: "primary",
    rounded: "full",
    fontSize: "sm",
    fontWeight: "normal",
    inverted: false,
    disabled: false,
  },
  argTypes,
}

export const Secondary: Story = {
  args: {
    variant: "secondary",
  },
  argTypes,
}

export const Outline: Story = {
  args: {
    variant: "outline",
  },
  argTypes,
}

export const BlackWhite: Story = {
  args: {
    variant: "ghost",
  },
  argTypes,
}

export const WithLabel: Story = {
  args: {
    label: "Label for Switch",
    variant: "primary",
  },
  argTypes,
}

export const WithIcons: Story = {
  args: {
    variant: "primary",
    iconOn: <Moon />,
    iconOff: <Sun />,
  },
  argTypes,
}
