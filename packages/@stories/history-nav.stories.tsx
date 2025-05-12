import { ArrowLeft, ArrowRight } from "@phosphor-icons/react"
import type { Meta, StoryObj } from "@storybook/react"
import React from "react"
import { HistoryNav } from "../history-nav/src"

const meta: Meta<typeof HistoryNav> = {
  title: "Components/HistoryNav",
  component: HistoryNav,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
}

export default meta

type Story = StoryObj<typeof HistoryNav>

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const argTypes: any = {
  gap: {
    options: ["xs", "sm", "md", "lg", "xl"],
    control: { type: "select" },
  },
  buttonProps: {
    control: { type: "object" },
  },
  leftOnClick: {
    control: { type: "function" },
  },
  rightOnClick: {
    control: { type: "function" },
  },
}

export const Primary: Story = {
  args: {
    gap: "md",
    arrow: "arrow",
    leftOnClick: () => {},
    rightOnClick: () => {},
    buttonsProps: {
      variant: "primary",
    },
  },
  argTypes,
}

export const Secondary: Story = {
  args: {
    gap: "lg",
    arrow: "arrow-arc",
    leftOnClick: () => {},
    rightOnClick: () => {},
    buttonsProps: {
      variant: "secondary",
      rounded: "full",
    },
    leftIcon: <ArrowLeft />,
    rightIcon: <ArrowRight />,
  },
  argTypes,
}

export const Outline: Story = {
  args: {
    gap: "sm",
    arrow: "arrow-circle",
    leftOnClick: () => {},
    rightOnClick: () => {},
    buttonsProps: {
      variant: "outline",
      size: "icon-sm",
    },
    leftIcon: <ArrowLeft />,
    rightIcon: <ArrowRight />,
  },
  argTypes,
}

export const OutlineSolid: Story = {
  args: {
    arrow: "arrow-square",
    leftOnClick: () => {},
    rightOnClick: () => {},
    buttonsProps: {
      variant: "outline-solid",
      size: "icon-lg",
    },
    leftIcon: <ArrowLeft />,
    rightIcon: <ArrowRight />,
  },
  argTypes,
}

export const Ghost: Story = {
  args: {
    arrow: "caret",
    leftOnClick: () => {},
    rightOnClick: () => {},
    buttonsProps: {
      variant: "ghost",
    },
    leftIcon: <ArrowLeft />,
    rightIcon: <ArrowRight />,
  },
  argTypes,
}
