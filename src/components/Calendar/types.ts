import { VariantProps } from "class-variance-authority";
import { ComponentProps } from "react";
import { DayPicker } from "react-day-picker";
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

export type CalendarComponentProps = ComponentProps<typeof DayPicker>;
export type CalendarVariantProps = VariantProps<typeof calendarStyles>;
export type ButtonExtraProps = {
  rounded?: "sm" | "md" | "lg" | "full";
  icon?: Icons;
};

export type CalendarProps = CalendarComponentProps &
  CalendarVariantProps &
  ButtonExtraProps;
