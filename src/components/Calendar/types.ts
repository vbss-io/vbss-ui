import { VariantProps } from "class-variance-authority";
import { ReactNode } from "react";
import { DayPickerMultipleProps, DayPickerRangeProps, DayPickerSingleProps } from "react-day-picker";
import { calendarStyles } from "./styles";

export type Icons =
  | "arrow-arc"
  | "arrow-arc"
  | "arrow-circle"
  | "arrow-circle"
  | "arrow"
  | "arrow"
  | "arrow-square"
  | "arrow-square"
  | "caret"
  | "caret";

export type CalendarComponentProps = DayPickerSingleProps | DayPickerMultipleProps | DayPickerRangeProps
export type CalendarVariantProps = VariantProps<typeof calendarStyles>;
export type ButtonExtraProps = {
  rounded?: "sm" | "md" | "lg" | "full";
  icon?: Icons;
};

export type CalendarProps = CalendarComponentProps &
  CalendarVariantProps &
  ButtonExtraProps;

export type CalendarComponent = (props: CalendarProps) => ReactNode;
