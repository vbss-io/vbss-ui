import type { Meta, StoryObj } from "@storybook/react"
import { DatePicker } from "../date-picker/src"

const meta: Meta<typeof DatePicker> = {
  title: "Components/Date Picker",
  component: DatePicker,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
}

export default meta

type Story = StoryObj<typeof DatePicker>

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const argTypes: any = {
  variant: {
    control: { type: "select" },
    options: ["primary", "secondary", "outline", "ghost"],
  },
  rounded: {
    control: { type: "select" },
    options: ["none", "xs", "sm", "md", "lg", "full"],
  },
  calendarVariant: {
    control: { type: "select" },
    options: ["primary", "secondary", "outline", "outlineSolid", "ghost"],
  },
  calendarRounded: {
    control: { type: "select" },
    options: ["none", "xs", "sm", "md", "lg", "full"],
  },
  disabled: {
    control: { type: "boolean" },
  },
  allowClear: {
    control: { type: "boolean" },
  },
  withPortal: {
    control: { type: "boolean" },
  },
}

export const Primary: Story = {
  args: {
    variant: "primary",
    placeholder: "Select date...",
    rounded: "md",
    calendarVariant: "primary",
    calendarRounded: "md",
    withPortal: true,
    allowClear: false,
    disabled: false,
  },
  argTypes,
}

export const Secondary: Story = {
  args: {
    variant: "secondary",
    placeholder: "Select date...",
    rounded: "md",
    calendarVariant: "primary",
    calendarRounded: "md",
    withPortal: true,
    allowClear: false,
    disabled: false,
  },
  argTypes,
}

export const WithLabel: Story = {
  args: {
    label: "Select a date",
    variant: "primary",
    placeholder: "Select date...",
    rounded: "md",
    calendarVariant: "primary",
    calendarRounded: "md",
    withPortal: true,
    allowClear: false,
    disabled: false,
  },
  argTypes,
}

export const WithClearButton: Story = {
  args: {
    label: "Select a date",
    variant: "primary",
    placeholder: "Select date...",
    rounded: "md",
    calendarVariant: "primary",
    calendarRounded: "md",
    withPortal: true,
    allowClear: true,
    disabled: false,
  },
  argTypes,
}

export const Disabled: Story = {
  args: {
    label: "Select a date",
    variant: "primary",
    placeholder: "Select date...",
    rounded: "md",
    calendarVariant: "primary",
    calendarRounded: "md",
    withPortal: true,
    allowClear: false,
    disabled: true,
  },
  argTypes,
}
