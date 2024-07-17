import type { Meta, StoryObj } from "@storybook/react";
import ptBR from "date-fns/locale/pt-BR";
import { DatePicker } from ".";

const meta: Meta<typeof DatePicker> = {
  title: "Components/DatePicker",
  component: DatePicker,
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
  label: { control: { type: "text" } },
  fnsFormatStr: { control: { type: "text" }, description: "date-fns format" },
  fnsLocale: { control: { type: "object" }, description: "date-fns locale" },
};

export const Primary: Story = {
  args: {
    label: "Pick a date",
    variant: "primary",
    popoverProps: { variant: "primary" },
    buttonProps: { variant: "primary" },
    calendarProps: { variant: "primary" },
    fnsFormatStr: "PPP",
    fnsLocale: ptBR,
  },
  argTypes,
};

export const Secondary: Story = {
  args: {
    label: "Pick a date",
    variant: "secondary",
    popoverProps: { variant: "secondary", side: "bottom" },
    buttonProps: { variant: "secondary" },
    calendarProps: { variant: "secondary" },
    fnsFormatStr: "PPP",
    fnsLocale: ptBR,
  },
  argTypes,
};

export const Outline: Story = {
  args: {
    label: "Pick a date",
    variant: "outline",
    popoverProps: { variant: "outline", side: "right" },
    buttonProps: { variant: "outline" },
    calendarProps: { variant: "outline" },
    fnsFormatStr: "PPP",
    fnsLocale: ptBR,
  },
  argTypes,
};
