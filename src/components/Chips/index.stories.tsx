import type { Meta, StoryObj } from "@storybook/react";
import { Chips } from ".";

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
    options: ["sm", "md", "lg"],
    control: { type: "select" },
  },
  chipsProps: {
    control: { type: "object" },
  },
};

export const Primary: Story = {
  args: {
    as: "div",
    chips: ["Content", "Content", "Content"],
    gap: "md",
    chipsProps: {
      variant: "primary",
    },
  },
  argTypes,
};

export const Secondary: Story = {
  args: {
    chips: ["Content", "Content", "Content"],
    chipsProps: {
      variant: "secondary",
    },
  },
  argTypes,
};

export const Outline: Story = {
  args: {
    chips: ["Content", "Content", "Content"],
    chipsProps: {
      variant: "outline",
    },
  },
  argTypes,
};
