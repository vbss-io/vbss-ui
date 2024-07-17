import type { Meta, StoryObj } from "@storybook/react";
import { Dialog } from ".";
import { Button } from "../Button";

const meta: Meta<typeof Dialog> = {
  title: "Components/Dialog",
  component: Dialog,
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
  rounded: {
    options: ["sm", "md", "lg", "full"],
    control: { type: "select" },
  },
  overlayOpacity: {
    control: { type: "number" },
  },
  border: {
    control: { type: "boolean" },
  },
  textColor: {
    control: { type: "boolean" },
  },
  showClose: {
    control: { type: "boolean" },
  },
};

export const Primary: Story = {
  args: {
    children: (
      <div className="w-full flex flex-col gap-1 items-center">
        <Button variant="primary" icon="github">
          Github
        </Button>
        <Button variant="primary" icon="linkedin">
          Linkedin
        </Button>
      </div>
    ),
    trigger: <Button icon="github">Github</Button>,
    variant: "primary",
    rounded: "md",
    title: "Dialog Title",
    description: "Dialog Description",
    footer: "Dialog Footer",
    overlayOpacity: 50,
    border: false,
    textColor: true,
    showClose: true,
  },
  argTypes,
};

export const Secondary: Story = {
  args: {
    children: (
      <div className="w-full flex flex-col gap-1 items-center">
        <Button variant="secondary" icon="github">
          Github
        </Button>
        <Button variant="secondary" icon="linkedin">
          Linkedin
        </Button>
      </div>
    ),
    trigger: <Button icon="github">Github</Button>,
    variant: "secondary",
    rounded: "md",
    title: "Dialog Title",
    description: "Dialog Description",
    footer: "Dialog Footer",
    overlayOpacity: 50,
    border: false,
    textColor: true,
    showClose: true,
  },
  argTypes,
};

export const Outline: Story = {
  args: {
    children: (
      <div className="w-full flex flex-col gap-1 items-center">
        <Button variant="outline" icon="github">
          Github
        </Button>
        <Button variant="outline" icon="linkedin">
          Linkedin
        </Button>
      </div>
    ),
    trigger: <Button icon="github">Github</Button>,
    variant: "outline",
    rounded: "md",
    title: "Dialog Title",
    description: "Dialog Description",
    footer: "Dialog Footer",
    overlayOpacity: 50,
    border: false,
    textColor: true,
    showClose: true,
  },
  argTypes,
};

export const Ghost: Story = {
  args: {
    children: (
      <div className="w-full flex flex-col gap-1 items-center">
        <Button variant="ghost" icon="github">
          Github
        </Button>
        <Button variant="ghost" icon="linkedin">
          Linkedin
        </Button>
      </div>
    ),
    trigger: <Button icon="github">Github</Button>,
    variant: "ghost",
    rounded: "md",
    title: "Dialog Title",
    description: "Dialog Description",
    footer: "Dialog Footer",
    overlayOpacity: 50,
    border: true,
    textColor: true,
    showClose: true,
  },
  argTypes,
};
