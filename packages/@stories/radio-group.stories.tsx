import type { Meta, StoryObj } from "@storybook/react"
import { RadioGroup } from "../radio-group/src"

const meta: Meta<typeof RadioGroup> = {
  title: "Components/RadioGroup",
  component: RadioGroup,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
}

export default meta

type Story = StoryObj<typeof RadioGroup>

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const argTypes: any = {
  variant: {
    options: ["primary", "secondary", "outline", "ghost"],
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
  direction: {
    options: ["col", "row"],
    control: { type: "select" },
  },
  disabled: {
    control: { type: "boolean" },
  },
  itemProps: {
    control: { type: "object" },
  },
}

export const Primary: Story = {
  args: {
    variant: "primary",
    size: "sm",
    rounded: "lg",
    fontSize: "md",
    fontWeight: "normal",
    values: [
      { value: "1", label: "Option 1" },
      { value: "2", label: "Option 2" },
      { value: "3", label: "Option 3" },
    ],
    defaultValue: "1",
    disabled: false,
    itemProps: {},
    label: "Option 1",
    direction: "col",
  },
  argTypes,
}

export const Secondary: Story = {
  args: {
    variant: "secondary",
    size: "sm",
    rounded: "lg",
    values: [
      { value: "1", label: "Option 1" },
      { value: "2", label: "Option 2" },
      { value: "3", label: "Option 3" },
    ],
    defaultValue: "1",
    disabled: false,
    itemProps: {},
  },
  argTypes,
}

export const Outline: Story = {
  args: {
    variant: "outline",
    size: "sm",
    rounded: "lg",
    values: [
      { value: "1", label: "Option 1" },
      { value: "2", label: "Option 2" },
      { value: "3", label: "Option 3" },
    ],
    defaultValue: "1",
    disabled: false,
    itemProps: {},
  },
  argTypes,
}

export const Ghost: Story = {
  args: {
    variant: "ghost",
    size: "sm",
    rounded: "lg",
    values: [
      { value: "1", label: "Option 1" },
      { value: "2", label: "Option 2" },
      { value: "3", label: "Option 3" },
    ],
    defaultValue: "1",
    disabled: false,
    itemProps: {},
  },
  argTypes,
}
