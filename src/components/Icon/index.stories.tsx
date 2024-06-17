import { IconsMap } from "@/components/Icons/icons";
import type { Meta, StoryObj } from "@storybook/react";
import { Icon } from ".";

const meta: Meta<typeof Icon> = {
  title: "Components/Icon",
  component: Icon,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
};

export default meta;

type Story = StoryObj<typeof Icon>;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const argTypes: any = {
  icon: {
    options: [...Object.keys(IconsMap)],
    control: { type: "select" },
  },
};

export const Github: Story = {
  args: {
    icon: "github",
  },
  argTypes,
};

export const LinkedIn: Story = {
  args: {
    icon: "linkedin",
  },
  argTypes,
};
