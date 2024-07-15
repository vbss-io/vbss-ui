import type { Meta, StoryObj } from "@storybook/react";
import { DropdownMenu } from ".";
import { Button } from "../Button";

const meta: Meta<typeof DropdownMenu> = {
  title: "Components/DropdownMenu",
  component: DropdownMenu,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
};

export default meta;

type Story = StoryObj<typeof DropdownMenu>;

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
  fontSize: {
    options: ["sm", "md", "lg"],
    control: { type: "select" },
  },
  side: {
    options: ["top", "right", "bottom", "left"],
    control: { type: "select" },
  },
  menuLabel: {
    control: { type: "text" },
  },
};

export const Primary: Story = {
  argTypes,
  args: {
    trigger: <Button>Click Me</Button>,
    menuLabel: "Label",
    menus: [
      { item: <Button variant="ghost">Button One</Button> },
      { item: "separator" },
      { item: <Button variant="ghost">Button Two</Button> },
      { item: <Button variant="ghost">Button Three</Button> },
    ],
    variant: "primary",
    size: "md",
    rounded: "md",
    fontSize: "md",
    side: "top",
  },
};

export const Secondary: Story = {
  argTypes,
  args: {
    trigger: <Button variant="secondary">Click Me</Button>,
    menuLabel: "Label",
    menus: [
      { item: <Button variant="ghost">Button One</Button> },
      { item: "separator" },
      { item: <Button variant="ghost">Button Two</Button> },
      { item: <Button variant="ghost">Button Three</Button> },
    ],
    variant: "secondary",
    size: "md",
    rounded: "md",
    fontSize: "md",
    side: "top",
  },
};

export const Outline: Story = {
  argTypes,
  args: {
    trigger: <Button variant="outline">Click Me</Button>,
    menuLabel: "Label",
    menus: [
      { item: <Button variant="ghost">Button One</Button> },
      { item: "separator" },
      { item: <Button variant="ghost">Button Two</Button> },
      { item: <Button variant="ghost">Button Three</Button> },
    ],
    variant: "outline",
    size: "md",
    rounded: "md",
    fontSize: "md",
    side: "top",
  },
};

export const Ghost: Story = {
  argTypes,
  args: {
    trigger: <Button variant="ghost">Click Me</Button>,
    menuLabel: "Label",
    menus: [
      { item: <Button variant="ghost">Button One</Button> },
      { item: "separator" },
      { item: <Button variant="ghost">Button Two</Button> },
      { item: <Button variant="ghost">Button Three</Button> },
    ],
    variant: "ghost",
    size: "md",
    rounded: "md",
    fontSize: "md",
    side: "top",
  },
};
