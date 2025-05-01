import { Minus, Plus } from "@phosphor-icons/react"
import type { Meta, StoryObj } from "@storybook/react"
import React from "react"
import { InputNumber } from "../input-number/src"

const meta: Meta<typeof InputNumber> = {
  title: "Components/InputNumber",
  component: InputNumber,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
}

export default meta

type Story = StoryObj<typeof InputNumber>

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const argTypes: any = {
  variant: {
    options: ["primary", "secondary", "outline", "ghost"],
    control: { type: "select" },
  },
  height: {
    options: ["sx", "sm", "md", "lg", "xl"],
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
  controlsProps: {
    control: { type: "object" },
  },
}

export const Primary: Story = {
  args: {
    label: "Input Label:",
    placeholder: "Type here...",
    variant: "primary",
    height: "md",
    rounded: "md",
    fontSize: "md",
    fontWeight: "normal",
    disabled: false,
    plusIcon: <Plus />,
    minusIcon: <Minus />,
  },
  argTypes,
}

export const Secondary: Story = {
  args: {
    label: "Input Label:",
    placeholder: "Type here...",
    variant: "secondary",
  },
  argTypes,
}

export const Outline: Story = {
  args: {
    label: "Input Label:",
    placeholder: "Type here...",
    variant: "outline",
  },
  argTypes,
}

export const Ghost: Story = {
  args: {
    label: "Input Label:",
    placeholder: "Type here...",
    variant: "ghost",
  },
  argTypes,
}

export const WithControlsPrimary: Story = {
  args: {
    label: "Input Label:",
    placeholder: "Type here...",
    variant: "primary",
    controlsProps: {
      variant: "primary",
      font: "medium",
      fontSize: "md",
    },
    plusIcon: <Plus />,
    minusIcon: <Minus />,
  },
  argTypes,
}

export const WithControlGhost: Story = {
  args: {
    label: "Input Label:",
    placeholder: "Type here...",
    variant: "primary",
    controlsProps: {
      variant: "ghost",
      font: "medium",
      fontSize: "md",
    },
    plusIcon: <Plus />,
    minusIcon: <Minus />,
  },
  argTypes,
}
