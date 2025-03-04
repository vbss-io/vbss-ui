import type { Meta, StoryObj } from "@storybook/react";
import { Chips } from "../chips/src";

const meta: Meta<typeof Chips> = {
  title: "Components/Chips",
  component: Chips,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
};

export default meta;

type Story = StoryObj<typeof Chips>;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const argTypes: any = {
  gap: {
    options: ["xs", "sm", "md", "lg", "xl"],
    control: { type: "select" },
  },
  flexDirection: {
    options: ["row", "col"],
    control: { type: "select" },
  },
  chipsProps: {
    control: { type: "object" },
  },
};

export const Primary: Story = {
  args: {
    as: "div",
    gap: "md",
    flexDirection: "row",
    chips: ["Chip", "Chip", "Chip"],
    chipsProps: {
      variant: "primary",
    },
  },
  argTypes,
};

export const Secondary: Story = {
  args: {
    chips: ["Chip", "Chip", "Chip"],
    chipsProps: {
      variant: "secondary",
    },
  },
  argTypes,
};

export const Outline: Story = {
  args: {
    chips: ["Chip", "Chip", "Chip"],
    chipsProps: {
      variant: "outline",
    },
  },
  argTypes,
};
