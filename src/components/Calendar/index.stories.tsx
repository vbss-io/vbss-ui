import type { Meta, StoryObj } from "@storybook/react";
import { Calendar } from ".";

const meta: Meta<typeof Calendar> = {
  title: "Components/Calendar",
  component: Calendar,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
};

export default meta;

type Story = StoryObj<typeof Calendar>;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const argTypes: any = {
  variant: {
    options: ["primary", "secondary", "outline", "outlineSolid", "ghost"],
    control: { type: "select" },
  },
  icon: {
    options: [
      "arrow-arc",
      "arrow-arc",
      "arrow-circle",
      "arrow-circle",
      "arrow",
      "arrow",
      "arrow-square",
      "arrow-square",
      "caret",
      "caret",
    ],
    control: { type: "select" },
  },
  rounded: {
    options: ["sm", "md", "lg", "full"],
    control: { type: "select" },
  },
  disabled: {
    control: { type: "boolean" },
  },
};

export const Primary: Story = {
  args: {
    mode: "single",
    variant: "primary",
    selected: new Date(),
    onSelect: () => {},
    showOutsideDays: true,
    rounded: "md",
    icon: "caret",
  },
  argTypes,
};

export const Secondary: Story = {
  args: {
    mode: "single",
    variant: "secondary",
    selected: new Date(),
  },
  argTypes,
};

export const Outline: Story = {
  args: {
    mode: "single",
    variant: "outline",
    selected: new Date(),
  },
  argTypes,
};

export const OutlineSolid: Story = {
  args: {
    mode: "single",
    variant: "outline-solid",
    selected: new Date(),
  },
  argTypes,
};

export const Ghost: Story = {
  args: {
    mode: "single",
    variant: "ghost",
    selected: new Date(),
  },
  argTypes,
};
