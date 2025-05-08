import type { Meta, StoryObj } from "@storybook/react"
import React from "react"
import { Button } from "../button/src"
import { Dialog } from "../dialog/src"

const meta: Meta<typeof Dialog> = {
  title: "Components/Dialog",
  component: Dialog,
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
  rounded: {
    options: ["none", "sm", "md", "lg", "full"],
    control: { type: "select" },
  },
  overlayOpacity: {
    control: { type: "number" },
  },
  border: {
    control: { type: "boolean" },
  },
  disableTextColor: {
    control: { type: "boolean" },
  },
  hideClose: {
    control: { type: "boolean" },
  },
}

export const Primary: Story = {
  args: {
    children: (
      <div className="w-full flex flex-col gap-1 items-center">
        <Button variant="primary">Button</Button>
        <Button variant="primary">Button</Button>
      </div>
    ),
    trigger: <Button as="div">Button</Button>,
    variant: "primary",
    rounded: "md",
    title: "Dialog Title",
    description: "Dialog Description",
    footer: "Dialog Footer",
    overlayOpacity: 10,
    border: false,
    disableTextColor: false,
    hideClose: false,
  },
  argTypes,
}

export const Secondary: Story = {
  args: {
    children: (
      <div className="w-full flex flex-col gap-1 items-center">
        <Button variant="secondary">Button</Button>
        <Button variant="secondary">Button</Button>
      </div>
    ),
    trigger: <Button>Button</Button>,
    variant: "secondary",
    rounded: "md",
    title: "Dialog Title",
    description: "Dialog Description",
    footer: "Dialog Footer",
    overlayOpacity: 50,
    border: false,
    disableTextColor: false,
    hideClose: false,
  },
  argTypes,
}

export const Outline: Story = {
  args: {
    children: (
      <div className="w-full flex flex-col gap-1 items-center">
        <Button variant="outline">Button</Button>
        <Button variant="outline">Button</Button>
      </div>
    ),
    trigger: <Button>Button</Button>,
    variant: "outline",
    rounded: "md",
    title: "Dialog Title",
    description: "Dialog Description",
    footer: "Dialog Footer",
    overlayOpacity: 50,
    border: false,
    disableTextColor: false,
    hideClose: false,
  },
  argTypes,
}

export const Ghost: Story = {
  args: {
    children: (
      <div className="w-full flex flex-col gap-1 items-center">
        <Button variant="ghost">Button</Button>
        <Button variant="ghost">Button</Button>
      </div>
    ),
    trigger: <Button>Button</Button>,
    variant: "ghost",
    rounded: "md",
    title: "Dialog Title",
    description: "Dialog Description",
    footer: "Dialog Footer",
    overlayOpacity: 50,
    border: true,
    disableTextColor: false,
    hideClose: false,
  },
  argTypes,
}
