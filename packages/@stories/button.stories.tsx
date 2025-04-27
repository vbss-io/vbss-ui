import { GithubLogo } from "@phosphor-icons/react"
import type { Meta, StoryObj } from "@storybook/react"
import React from "react"
import { Button } from "../button/src"

const meta: Meta<typeof Button> = {
  title: "Components/Button",
  component: Button,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
}

export default meta

type Story = StoryObj<typeof Button>

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const argTypes: any = {
  variant: {
    options: ["primary", "secondary", "outline", "outlineSolid", "ghost"],
    control: { type: "select" },
  },
  size: {
    options: ["xs", "sm", "md", "lg", "icon-xs", "icon-sm", "icon-md", "icon-lg"],
    control: { type: "select" },
  },
  rounded: {
    options: ["none", "xs", "sm", "md", "lg", "full"],
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
}

export const Primary: Story = {
  args: {
    as: "button",
    variant: "primary",
    size: "sm",
    rounded: "md",
    fontSize: "md",
    fontWeight: "normal",
    inverted: false,
    disabled: false,
    children: "Click Me",
  },
  argTypes,
}

export const Secondary: Story = {
  args: {
    children: "Click Me",
    variant: "secondary",
  },
  argTypes,
}

export const Outline: Story = {
  args: {
    children: "Click Me",
    variant: "outline",
  },
  argTypes,
}

export const OutlineSolid: Story = {
  args: {
    children: "Click Me",
    variant: "outlineSolid",
  },
  argTypes,
}

export const Ghost: Story = {
  args: {
    children: "Click Me",
    variant: "ghost",
  },
  argTypes,
}

export const WithIcon: Story = {
  args: {
    children: (
      <>
        <GithubLogo /> Click Me
      </>
    ),
    variant: "primary",
  },
  argTypes,
}

export const WithIconInverted: Story = {
  args: {
    children: (
      <>
        <GithubLogo /> Click Me
      </>
    ),
    variant: "secondary",
    inverted: true,
  },
  argTypes,
}

export const Icon: Story = {
  args: {
    variant: "primary",
    size: "icon-md",
    rounded: "full",
    children: <GithubLogo />,
  },
  argTypes,
}

export const OutlineSolidIcon: Story = {
  args: {
    variant: "outlineSolid",
    size: "icon-md",
    rounded: "full",
    children: <GithubLogo weight="bold" />,
  },
  argTypes,
}
