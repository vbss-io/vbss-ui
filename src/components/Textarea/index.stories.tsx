import type { Meta, StoryObj } from "@storybook/react";
import { Textarea } from ".";

const meta: Meta<typeof Textarea> = {
  title: "Components/Textarea",
  component: Textarea,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
};

export default meta;

type Story = StoryObj<typeof Textarea>;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const argTypes: any = {
  variant: {
    options: ["primary", "secondary", "outline", "ghost"],
    control: { type: "select" },
  },
  height: {
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
  disabled: {
    control: { type: "boolean" },
  },
};

export const Primary: Story = {
  args: {
    label: "",
    placeholder: "Type here...",
    variant: "primary",
    height: "md",
    rounded: "md",
    font: "medium",
    fontSize: "md",
    disabled: false,
  },
  argTypes,
};

export const Secondary: Story = {
  args: {
    placeholder: "Type here...",
    variant: "secondary",
  },
  argTypes,
};

export const Outline: Story = {
  args: {
    placeholder: "Type here...",
    variant: "outline",
  },
  argTypes,
};

export const Ghost: Story = {
  args: {
    placeholder: "Type here...",
    variant: "ghost",
  },
  argTypes,
};

export const WithLabel: Story = {
  args: {
    label: "Textarea Label:",
    placeholder: "Type here...",
    variant: "primary",
  },
  argTypes,
};

export const Disable: Story = {
  args: {
    placeholder: "Type here...",
    variant: "primary",
    disabled: true,
  },
  argTypes,
};
