import { buttonStyles } from "@/components/Button/styles";
import { IconsMap } from "@/components/Icons";
import { cn } from "@/lib/utils";
import { DayPicker } from "react-day-picker";
import { calendarStyles, DayTodayStyles } from "./styles";
import { CalendarComponent, CalendarProps } from "./types";

export const Calendar: CalendarComponent = ({
  variant = "primary",
  rounded,
  disabled,
  classNames,
  showOutsideDays = true,
  icon,
  ...props
}: CalendarProps) => {
  const buttons = buttonStyles({ variant, rounded, disabled });
  const iconLeft = icon ? IconsMap[`${icon}-left`] : IconsMap["caret-left"];
  const IconRight = icon ? IconsMap[`${icon}-right`] : IconsMap["caret-right"];
  return (
    <DayPicker
      disabled={disabled}
      showOutsideDays={showOutsideDays}
      className={cn("p-3")}
      classNames={{
        months: "flex flex-col sm:flex-row space-y-4 sm:space-x-4 sm:space-y-0",
        month: "space-y-4",
        caption: "flex justify-center pt-1 relative items-center",
        caption_label: "text-sm font-medium",
        nav: "space-x-1 flex items-center",
        nav_button: cn(buttons, "h-7 w-7 p-0"),
        nav_button_previous: "absolute left-1",
        nav_button_next: "absolute right-1",
        table: "w-full border-collapse space-y-1",
        head_row: "flex",
        head_cell:
          "text-slate-500 rounded-md w-9 font-normal text-[0.8rem] dark:text-slate-400",
        row: "flex w-full mt-2",
        cell: "h-9 w-9 text-center text-sm m-px relative",
        day: cn(buttons, calendarStyles({ variant })),
        day_range_end: "day-range-end",
        day_selected: cn(buttons),
        day_today: `${variant && DayTodayStyles[variant]}`,
        day_outside: "day-outside opacity-50",
        day_disabled: "text-slate-500 opacity-50 dark:text-slate-400",
        day_range_middle: cn(buttons),
        day_hidden: "invisible",
        ...classNames,
      }}
      components={{
        IconLeft: () => iconLeft as React.ReactElement,
        IconRight: () => IconRight as React.ReactElement,
      }}
      {...props}
    />
  );
};
