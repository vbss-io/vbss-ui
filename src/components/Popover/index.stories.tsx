import type { Meta, StoryObj } from "@storybook/react";
import { Popover } from ".";
import { Button } from "../Button";

const meta: Meta<typeof Popover> = {
  title: "Components/Popover",
  component: Popover,
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
    children: (
      <div className="flex flex-col gap-1">
        <Button variant="ghost" icon="github">
          Github
        </Button>
        <Button variant="ghost" icon="linkedin">
          Linkedin
        </Button>
      </div>
    ),
    trigger: "Click Me",
    variant: "primary",
    size: "md",
    rounded: "md",
    font: "regular",
    fontSize: "md",
    side: "top",
    align: "center",
  },
  argTypes,
};

export const Secondary: Story = {
  args: {
    children: (
      <div className="flex flex-col gap-1">
        <Button variant="ghost" icon="github">
          Github
        </Button>
        <Button variant="ghost" icon="linkedin">
          Linkedin
        </Button>
      </div>
    ),
    trigger: "Click Me",
    variant: "secondary",
    size: "md",
    rounded: "md",
    font: "regular",
    fontSize: "md",
    side: "top",
    align: "center",
  },
  argTypes,
};

export const Outline: Story = {
  args: {
    children: (
      <div className="flex flex-col gap-1">
        <Button variant="ghost" icon="github">
          Github
        </Button>
        <Button variant="ghost" icon="linkedin">
          Linkedin
        </Button>
      </div>
    ),
    trigger: "Click Me",
    variant: "outline",
    size: "md",
    rounded: "md",
    font: "regular",
    fontSize: "md",
    side: "top",
    align: "center",
  },
  argTypes,
};
