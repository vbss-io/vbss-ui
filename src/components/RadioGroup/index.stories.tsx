import type { Meta, StoryObj } from "@storybook/react";
import { Radio } from ".";
import { IconsMap } from "../Icons";

const meta: Meta<typeof Radio> = {
  title: "Components/Radio",
  component: Radio,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
};

export default meta;

type Story = StoryObj<typeof Radio>;

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
  itemProps: {
    control: { type: "object" },
  },
};

export const Primary: Story = {
  args: {
    variant: "primary",
    size: "sm",
    rounded: "lg",
    icon: "check",
    values: [
      { value: "1", label: "Option 1" },
      { value: "2", label: "Option 2" },
      { value: "3", label: "Option 3" },
    ],
    defaultValue: "1",
    disabled: false,
    itemProps: {},
  },
  argTypes,
};

export const Secondary: Story = {
  args: {
    variant: "secondary",
    size: "sm",
    rounded: "lg",
    icon: "check",
    values: [
      { value: "1", label: "Option 1" },
      { value: "2", label: "Option 2" },
      { value: "3", label: "Option 3" },
    ],
    defaultValue: "1",
    disabled: false,
    itemProps: {},
  },
  argTypes,
};

export const Outline: Story = {
  args: {
    variant: "outline",
    size: "sm",
    rounded: "lg",
    icon: "check",
    values: [
      { value: "1", label: "Option 1" },
      { value: "2", label: "Option 2" },
      { value: "3", label: "Option 3" },
    ],
    defaultValue: "1",
    disabled: false,
    itemProps: {},
  },
  argTypes,
};

export const Ghost: Story = {
  args: {
    variant: "ghost",
    size: "sm",
    rounded: "lg",
    icon: "check",
    values: [
      { value: "1", label: "Option 1" },
      { value: "2", label: "Option 2" },
      { value: "3", label: "Option 3" },
    ],
    defaultValue: "1",
    disabled: false,
    itemProps: {},
  },
  argTypes,
};
