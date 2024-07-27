import { cn } from "@/lib/utils";
import { cva } from "class-variance-authority";

export const calendarStyles = cva("border-0 h-9 w-9 p-0 font-normal", {
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
});

export const DayTodayStyles: { [key: string]: string } = {
  primary: cn("bg-primary/10"),
  secondary: cn("bg-secondary/10"),
  outline: cn("border-2 border-primary/10 hover:border-primary"),
  "outline-solid": cn("border-2 border-primary/10 hover:border-primary"),
  ghost: cn("bg-primary/10"),
};
