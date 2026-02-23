import type { Meta, StoryObj } from "@storybook/react"
import { Calendar, ptBR } from "@vbss-ui/calendar"

const meta: Meta<typeof Calendar> = {
  title: "Components/Calendar",
  component: Calendar,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
}

export default meta

type Story = StoryObj<typeof Calendar>

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const argTypes: any = {
  variant: {
    control: { type: "select" },
    options: ["primary", "secondary", "outline", "outlineSolid", "ghost"],
  },
  rounded: {
    control: { type: "select" },
    options: ["none", "xs", "sm", "md", "lg", "full"],
  },
  mode: {
    control: { type: "select" },
    options: ["single", "multiple", "range"],
  },
  disabled: {
    control: { type: "boolean" },
  },
  showOutsideDays: {
    control: { type: "boolean" },
  },
}

export const Primary: Story = {
  args: {
    mode: "single",
    variant: "primary",
    selected: new Date(),
    onSelect: () => {},
    showOutsideDays: true,
    rounded: "md",
  },
  argTypes,
}

export const Secondary: Story = {
  args: {
    mode: "single",
    variant: "secondary",
    selected: new Date(),
    onSelect: () => {},
    showOutsideDays: true,
    rounded: "md",
  },
  argTypes,
}

export const Outline: Story = {
  args: {
    mode: "single",
    variant: "outline",
    selected: new Date(),
    onSelect: () => {},
    showOutsideDays: true,
    rounded: "md",
  },
  argTypes,
}

export const OutlineSolid: Story = {
  args: {
    mode: "single",
    variant: "outlineSolid",
    selected: new Date(),
    onSelect: () => {},
    showOutsideDays: true,
    rounded: "md",
  },
  argTypes,
}

export const Ghost: Story = {
  args: {
    mode: "single",
    variant: "ghost",
    selected: new Date(),
    onSelect: () => {},
    showOutsideDays: true,
    rounded: "md",
  },
  argTypes,
}

export const Multiple: Story = {
  args: {
    mode: "multiple",
    variant: "primary",
    selected: [new Date(), new Date(Date.now() + 86400000)],
    onSelect: () => {},
    showOutsideDays: true,
    rounded: "md",
  },
  argTypes,
}

export const Range: Story = {
  args: {
    mode: "range",
    variant: "primary",
    selected: {
      from: new Date(),
      to: new Date(Date.now() + 7 * 86400000),
    },
    onSelect: () => {},
    showOutsideDays: true,
    rounded: "md",
  },
  argTypes,
}

export const Disabled: Story = {
  args: {
    mode: "single",
    variant: "primary",
    selected: new Date(),
    onSelect: () => {},
    showOutsideDays: true,
    rounded: "md",
    disabled: true,
  },
  argTypes,
}

export const WithoutOutsideDays: Story = {
  args: {
    mode: "single",
    variant: "primary",
    selected: new Date(),
    onSelect: () => {},
    showOutsideDays: false,
    rounded: "md",
  },
  argTypes,
}

export const RoundedFull: Story = {
  args: {
    mode: "single",
    variant: "primary",
    selected: new Date(),
    onSelect: () => {},
    showOutsideDays: true,
    rounded: "full",
  },
  argTypes,
}

export const LocalePtBR: Story = {
  args: {
    mode: "single",
    variant: "primary",
    selected: new Date(),
    onSelect: () => {},
    showOutsideDays: true,
    rounded: "md",
    locale: ptBR,
  },
  argTypes,
}

export const WithMinMaxDates: Story = {
  args: {
    mode: "single",
    variant: "primary",
    selected: new Date(),
    onSelect: () => {},
    showOutsideDays: true,
    rounded: "md",
    fromDate: new Date(),
    toDate: new Date(Date.now() + 30 * 86400000), // 30 days from now
  },
  argTypes,
}

export const WithDisabledDates: Story = {
  args: {
    mode: "single",
    variant: "primary",
    selected: new Date(),
    onSelect: () => {},
    showOutsideDays: true,
    rounded: "md",
    disabled: [
      { dayOfWeek: [0, 6] }, // Disable weekends
      new Date(Date.now() + 3 * 86400000), // Disable specific date
    ],
  },
  argTypes,
}
