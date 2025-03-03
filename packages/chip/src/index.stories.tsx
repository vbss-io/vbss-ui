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
  }
};

export const Primary: Story = {
  args: {
    as: "div",
    children: "Chip",
    variant: "primary",
    size: "sm",
    rounded: "md",
    fontSize: "xs",
    fontWeight: "normal",
  },
  argTypes,
};

export const Secondary: Story = {
  args: {
    children: "Chip",
    variant: "secondary",
  },
  argTypes,
};

export const Outline: Story = {
  args: {
    children: "Chip",
    variant: "outline",
  },
  argTypes,
};
