import type { Meta, StoryObj } from "@storybook/react";
import { HistoryNav } from ".";

const meta: Meta<typeof HistoryNav> = {
  title: "Components/HistoryNav",
  component: HistoryNav,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
};

export default meta;

type Story = StoryObj<typeof HistoryNav>;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const argTypes: any = {
  arrow: {
    options: ["arrow-arc", "arrow-circle", "arrow", "arrow-square", "caret"],
    control: { type: "select" },
  },
  gap: {
    options: ["sm", "md", "lg"],
    control: { type: "select" },
  },
  buttonProps: {
    control: { type: "object" },
  },
  forwardOnClick: {
    control: { type: "function" },
  },
  backOnClick: {
    control: { type: "function" },
  },
};

export const Primary: Story = {
  args: {
    gap: "md",
    arrow: "arrow",
    backOnClick: () => {},
    forwardOnClick: () => {},
    buttonsProps: {
      variant: "primary",
    },
  },
  argTypes,
};

export const Secondary: Story = {
  args: {
    gap: "lg",
    arrow: "arrow-arc",
    backOnClick: () => {},
    forwardOnClick: () => {},
    buttonsProps: {
      variant: "secondary",
      rounded: "full",
    },
  },
  argTypes,
};

export const Outline: Story = {
  args: {
    gap: "sm",
    arrow: "arrow-circle",
    backOnClick: () => {},
    forwardOnClick: () => {},
    buttonsProps: {
      variant: "outline",
      size: "icon-sm",
    },
  },
  argTypes,
};

export const OutlineSolid: Story = {
  args: {
    arrow: "arrow-square",
    backOnClick: () => {},
    forwardOnClick: () => {},
    buttonsProps: {
      variant: "outline-solid",
      size: "icon-lg",
    },
  },
  argTypes,
};

export const Ghost: Story = {
  args: {
    arrow: "caret",
    backOnClick: () => {},
    forwardOnClick: () => {},
    buttonsProps: {
      variant: "ghost",
    },
  },
  argTypes,
};
