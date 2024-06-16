import { IconsMap } from "@/components/Icons";
import { GithubLogo } from "@phosphor-icons/react";
import type { Meta, StoryObj } from "@storybook/react";
import { Button } from ".";

const meta: Meta<typeof Button> = {
  title: "Components/Button",
  component: Button,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
};

export default meta;

type Story = StoryObj<typeof Button>;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const argTypes: any = {
  variant: {
    options: ["primary", "secondary", "outline", "outlineSolid", "ghost"],
    control: { type: "select" },
  },
  icon: {
    options: Object.keys(IconsMap),
    control: { type: "select" },
  },
  size: {
    options: ["sm", "md", "lg", "icon"],
    control: { type: "select" },
  },
  rounded: {
    options: ["sm", "md", "lg", "full"],
    control: { type: "select" },
  },
  disabled: {
    control: { type: "boolean" },
  },
};

export const Primary: Story = {
  args: {
    children: "Click Me",
    variant: "primary",
    size: "md",
    rounded: "md",
    disabled: false,
  },
  argTypes,
};

export const Secondary: Story = {
  args: {
    children: "Click Me",
    variant: "secondary",
    size: "md",
  },
  argTypes,
};

export const Outline: Story = {
  args: {
    children: "Click Me",
    variant: "outline",
    size: "md",
  },
  argTypes,
};

export const OutlineSolid: Story = {
  args: {
    children: "Click Me",
    variant: "outline-solid",
    size: "md",
  },
  argTypes,
};

export const Ghost: Story = {
  args: {
    children: "Click Me",
    variant: "ghost",
    size: "md",
  },
  argTypes,
};

export const WithIcon: Story = {
  args: {
    children: (
      <>
        <GithubLogo className="w-full h-full" /> Click Me
      </>
    ),
    variant: "primary",
    size: "md",
  },
  argTypes,
};

export const Icon: Story = {
  args: {
    variant: "primary",
    size: "icon-md",
    rounded: "full",
    icon: "github",
  },
  argTypes,
};

export const OutlineSolidIcon: Story = {
  args: {
    variant: "outline-solid",
    size: "icon-md",
    rounded: "full",
    icon: "github",
  },
  argTypes,
};
