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
  text: { control: { type: "text" } },
  label: { control: { type: "text" } },
  error: { control: { type: "text" } },
  fnsFormatStr: { control: { type: "text" }, description: "date-fns format" },
  fnsLocale: { control: { type: "object" }, description: "date-fns locale" },
};

export const Primary: Story = {
  args: {
    text: "Pick a date",
    label: "Date:",
    error: "Invalid date",
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
    text: "Pick a date",
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
    text: "Pick a date",
    variant: "outline",
    popoverProps: { variant: "outline", side: "right" },
    buttonProps: { variant: "outline" },
    calendarProps: { variant: "outline" },
    fnsFormatStr: "PPP",
    fnsLocale: ptBR,
  },
  argTypes,
};
