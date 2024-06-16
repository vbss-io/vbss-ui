import type { Meta, StoryObj } from "@storybook/react";
import { Chip } from ".";

const meta: Meta<typeof Chip> = {
  title: "Components/Chip",
  component: Chip,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
};

export default meta;

type Story = StoryObj<typeof Chip>;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const argTypes: any = {
  variant: {
    options: ["primary", "secondary", "outline"],
    control: { type: "select" },
  },
  size: {
    options: ["sm", "md", "lg"],
    control: { type: "select" },
  },
  rounded: {
    options: ["sm", "md", "lg", "full"],
    control: { type: "select" },
  },
  font: {
    options: ["regular", "medium", "bold"],
    control: { type: "select" },
  },
  fontSize: {
    options: ["sm", "md", "lg"],
    control: { type: "select" },
  },
};

export const Primary: Story = {
  args: {
    children: "Content",
    variant: "primary",
    size: "md",
    rounded: "md",
    font: "medium",
    fontSize: "md",
  },
  argTypes,
};

export const Secondary: Story = {
  args: {
    children: "Content",
    variant: "secondary",
  },
  argTypes,
};

export const Outline: Story = {
  args: {
    children: "Content",
    variant: "outline",
  },
  argTypes,
};
