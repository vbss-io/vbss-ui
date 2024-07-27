import { ExtendableButtonProps } from "@/components/Button/types";
import { CalendarProps } from "@/components/Calendar/types";
import { PopoverProps } from "@/components/Popover/types";
import { DivComponentProps } from "@/lib/types";
import { Locale } from "date-fns";
import { ElementType, ReactNode } from "react";

export type DatePickerComponentProps = DivComponentProps;
export type DatePickerExtraProps = {
  variant?: "primary" | "secondary" | "outline";
  selected?: Date;
  onSelect?: (date: unknown) => void;
  buttonProps?: Omit<ExtendableButtonProps<ElementType>, "icon">;
  popoverProps?: Omit<PopoverProps, "trigger">;
  calendarProps?: Omit<CalendarProps, "selected" | "onSelect">;
  label?: string;
  text: string;
  error?: string;
  fnsFormatStr?: string;
  fnsLocale?: Locale;
};

export type DatePickerProps = DatePickerComponentProps & DatePickerExtraProps;

export type DatePickerComponent = (props: DatePickerProps) => ReactNode;
