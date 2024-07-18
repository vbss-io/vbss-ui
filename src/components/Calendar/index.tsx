import { buttonStyles } from "@/components/Button/styles";
import { cn } from "@/lib/utils";
import { VariantProps, cva } from "class-variance-authority";
import { DayPicker } from "react-day-picker";
import { IconsMap } from "../Icons";

const calendarStyles = cva(
  "border-0 h-9 w-9 p-0 font-normal",
  // "inline-flex items-center justify-center gap-2 whitespace-nowrap transition-colors",
  {
    variants: {
      variant: {
        primary:
          "bg-transparent text-black hover:text-white aria-selected:bg-primary",
        secondary:
          "bg-transparent text-black hover:text-white aria-selected:bg-secondary",
        outline:
          "border-0 border-primary text-primary bg-transparent hover:bg-primary/10 hover:border-2 aria-selected:border-primary",
        "outline-solid":
          "border-0 border-primary text-primary bg-transparent hover:bg-primary hover:text-white aria-selected:bg-primary aria-selected:text-white",
        ghost:
          "border-background hover:bg-primary/10 hover:border-primary/10 aria-selected:bg-primary/10",
      },
      disabled: {
        true: "disabled:pointer-events-none disabled:opacity-50",
      },
    },
    defaultVariants: {
      variant: "primary",
      disabled: false,
    },
  }
);

const DayToday: { [key: string]: string } = {
  primary: cn("bg-primary/10"),
  secondary: cn("bg-secondary/10"),
  outline: cn("border-2 border-primary/10 hover:border-primary"),
  "outline-solid": cn("border-2 border-primary/10 hover:border-primary"),
  ghost: cn("bg-primary/10"),
};

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

export type CalendarProps = React.ComponentProps<typeof DayPicker> &
  VariantProps<typeof calendarStyles> & {
    rounded?: "sm" | "md" | "lg" | "full";
    icon?: Icons;
  };

export const Calendar = ({
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
        day_today: `${variant && DayToday[variant]}`,
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
