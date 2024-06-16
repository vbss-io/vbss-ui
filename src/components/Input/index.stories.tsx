import type { Meta, StoryObj } from "@storybook/react";
import { Input } from ".";

const meta: Meta<typeof Input> = {
  title: "Components/Input",
  component: Input,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
};

export default meta;

type Story = StoryObj<typeof Input>;

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
  type: {
    options: ["text", "password", "number"],
    control: { type: "select" },
  },
  disabled: {
    control: { type: "boolean" },
  },
  showPasswordSwitch: {
    control: { type: "boolean" },
  },
  buttonProps: {
    control: { type: "object" },
  },
};

export const Primary: Story = {
  args: {
    label: "Input Label:",
    placeholder: "Type here...",
    type: "text",
    variant: "primary",
    height: "md",
    rounded: "md",
    font: "medium",
    fontSize: "md",
    disabled: false,
    showPasswordSwitch: false,
  },
  argTypes,
};

export const Secondary: Story = {
  args: {
    label: "Input Label:",
    placeholder: "Type here...",
    type: "text",
    variant: "secondary",
  },
  argTypes,
};

export const Outline: Story = {
  args: {
    label: "Input Label:",
    placeholder: "Type here...",
    type: "text",
    variant: "outline",
  },
  argTypes,
};

export const Ghost: Story = {
  args: {
    label: "Input Label:",
    placeholder: "Type here...",
    type: "text",
    variant: "ghost",
  },
  argTypes,
};

export const Password: Story = {
  args: {
    label: "Input Label:",
    placeholder: "Type here...",
    type: "password",
    variant: "primary",
    showPasswordSwitch: true,
  },
  argTypes,
};

export const WithButton: Story = {
  args: {
    label: "Input Label:",
    placeholder: "Type here...",
    type: "text",
    variant: "primary",
    buttonProps: {
      children: "Confirm",
      variant: "primary",
    },
  },
  argTypes,
};
