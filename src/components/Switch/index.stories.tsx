import { IconsMap } from "@/components/Icons";
import type { Meta, StoryObj } from "@storybook/react";
import { Switch } from ".";

const meta: Meta<typeof Switch> = {
  title: "Components/Switch",
  component: Switch,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
};

export default meta;

type Story = StoryObj<typeof Switch>;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const argTypes: any = {
  label: {
    control: { type: "text" },
  },
  variant: {
    options: ["primary", "secondary", "outline", "bw"],
    control: { type: "select" },
  },
  iconOn: {
    options: Object.keys(IconsMap),
    control: { type: "select" },
  },
  iconOff: {
    options: Object.keys(IconsMap),
    control: { type: "select" },
  },
};

export const Primary: Story = {
  args: {
    variant: "primary",
  },
  argTypes,
};

export const Secondary: Story = {
  args: {
    variant: "secondary",
  },
  argTypes,
};

export const Outline: Story = {
  args: {
    variant: "outline",
  },
  argTypes,
};

export const BlackWhite: Story = {
  args: {
    variant: "bw",
  },
  argTypes,
};

export const WithLabel: Story = {
  args: {
    label: "Label for Switch",
    variant: "primary",
  },
  argTypes,
};

export const WithIcons: Story = {
  args: {
    variant: "primary",
    iconOn: "moon",
    iconOff: "sun",
  },
  argTypes,
};
