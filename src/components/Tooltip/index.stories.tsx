import type { Meta, StoryObj } from "@storybook/react";
import { Tooltip } from ".";

const meta: Meta<typeof Tooltip> = {
  title: "Components/Tooltip",
  component: Tooltip,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
};

export default meta;

type Story = StoryObj;

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
  side: {
    options: ["top", "right", "bottom", "left"],
    control: { type: "select" },
  },
};

export const Primary: Story = {
  args: {
    children: "Content",
    trigger: "Hover",
    variant: "primary",
    size: "md",
    rounded: "md",
    font: "regular",
    fontSize: "md",
    side: "top",
  },
  argTypes,
};

export const Secondary: Story = {
  args: {
    children: "Content",
    trigger: "Hover",
    variant: "secondary",
    size: "md",
    rounded: "md",
    font: "regular",
    side: "top",
  },
  argTypes,
};

export const Outline: Story = {
  args: {
    children: "Content",
    trigger: "Hover",
    variant: "outline",
    size: "md",
    rounded: "md",
    font: "regular",
    side: "top",
  },
  argTypes,
};
