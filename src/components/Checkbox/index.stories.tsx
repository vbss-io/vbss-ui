import type { Meta, StoryObj } from "@storybook/react";
import { Checkbox } from ".";
import { IconsMap } from "../Icons";

const meta: Meta<typeof Checkbox> = {
  title: "Components/Checkbox",
  component: Checkbox,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
};

export default meta;

type Story = StoryObj<typeof Checkbox>;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const argTypes: any = {
  variant: {
    options: ["primary", "secondary", "outline", "ghost"],
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
  icon: {
    options: Object.keys(IconsMap),
    control: { type: "select" },
  },
  disabled: {
    control: { type: "boolean" },
  },
};

export const Primary: Story = {
  args: {
    label: "Checkbox label",
    variant: "primary",
    size: "sm",
    rounded: "md",
    disabled: false,
    icon: "check",
  },
  argTypes,
};

export const Secondary: Story = {
  args: {
    label: "Checkbox label",
    variant: "secondary",
    size: "sm",
    rounded: "md",
    disabled: false,
  },
  argTypes,
};

export const Outline: Story = {
  args: {
    label: "Checkbox label",
    variant: "outline",
    size: "sm",
    rounded: "md",
    disabled: false,
  },
  argTypes,
};

export const Ghost: Story = {
  args: {
    label: "Checkbox label",
    variant: "ghost",
  },
  argTypes,
};

export const CustomIcon: Story = {
  args: {
    label: "Checkbox label",
    variant: "ghost",
  },
  argTypes,
};
