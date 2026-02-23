import { cn } from "@vbss-ui/lib"
import { cva, VariantProps } from "class-variance-authority"
import { forwardRef } from "react"
import { DayPicker, type DayPickerProps } from "react-day-picker"
import "./index.css"

// Re-export locales from date-fns
export { de, enUS, es, fr, it, ja, ko, ptBR, ru, zhCN } from "date-fns/locale"

// Re-export commonly used types from react-day-picker for consumer convenience
export type { DayPickerProps, Mode, DateRange, Matcher, Modifiers, ModifiersClassNames, ModifiersStyles } from "react-day-picker"

// Export date utilities for DatePicker composition
export * from "./utils"

type CalendarComponentProps = DayPickerProps

type CalendarVariantProps = VariantProps<typeof calendarStyles>

type CalendarExtraProps = {
  rounded?: "none" | "xs" | "sm" | "md" | "lg" | "full"
  showOutsideDays?: boolean
  disabled?: boolean
  className?: string
  classNames?: Record<string, string>
}

export type CalendarProps = CalendarComponentProps & CalendarVariantProps & CalendarExtraProps

/**
 * A customizable and accessible Calendar component.
 */
export const Calendar = forwardRef<HTMLDivElement, CalendarProps>(
  ({ variant = "primary", rounded = "md", disabled = false, showOutsideDays = true, className, classNames, ...props }) => {
    const getRoundedClass = () => {
      const roundedMap = {
        none: "rounded-none",
        xs: "rounded-xs",
        sm: "rounded-sm",
        md: "rounded-md",
        lg: "rounded-lg",
        full: "rounded-full",
      }
      return roundedMap[rounded] || "rounded-md"
    }

    return (
      <DayPicker
        disabled={disabled}
        showOutsideDays={showOutsideDays}
        className={cn("calendar", calendarStyles({ variant, rounded, disabled }), className)}
        classNames={{
          nav_button: cn("nav-button", navButtonStyles({ variant }), getRoundedClass()),
          day: cn("day cursor-pointer", calendarDayStyles({ variant, rounded })),
          day_selected: cn("day-selected", calendarDayStyles({ variant, rounded })),
          day_today: cn("day-today", calendarTodayStyles({ variant, rounded })),
          day_outside: "day-outside opacity-40",
          day_disabled: "text-gray-400 opacity-50 cursor-not-allowed",
          ...classNames,
        }}
        {...props}
      />
    )
  }
)

Calendar.displayName = "Calendar"

export const calendarStyles = cva("p-6 bg-white border border-gray-200 shadow-lg rounded-lg", {
  variants: {
    variant: {
      primary: "bg-white border-gray-200 shadow-lg",
      secondary: "bg-gray-50 border-gray-300 shadow-md",
      outline: "bg-transparent border-2 border-primary shadow-none",
      outlineSolid: "bg-transparent border-2 border-primary shadow-none",
      ghost: "bg-transparent border-transparent shadow-none",
    },
    rounded: {
      none: "rounded-none",
      xs: "rounded-sm",
      sm: "rounded-md",
      md: "rounded-lg",
      lg: "rounded-xl",
      full: "rounded-xl",
    },
    disabled: {
      true: "opacity-50 pointer-events-none",
    },
  },
  defaultVariants: {
    variant: "primary",
    rounded: "md",
    disabled: false,
  },
})

export const navButtonStyles = cva("rdp-button_reset rdp-button bg-transparent transition-colors", {
  variants: {
    variant: {
      primary: "text-primary hover:bg-primary/10",
      secondary: "text-secondary hover:bg-secondary/10",
      outline: "text-primary hover:bg-primary/10",
      outlineSolid: "text-primary hover:bg-primary/10",
      ghost: "text-primary hover:bg-primary/10",
    },
  },
  defaultVariants: {
    variant: "primary",
  },
})

export const calendarDayStyles = cva(
  "border-0 h-9 w-9 p-0 font-normal transition-all duration-200 flex items-center justify-center text-sm",
  {
    variants: {
      variant: {
        primary:
          "bg-transparent text-gray-700 hover:bg-primary/10 hover:text-primary hover:scale-105 aria-selected:bg-primary aria-selected:text-white aria-selected:shadow-md",
        secondary:
          "bg-transparent text-gray-700 hover:bg-secondary/10 hover:text-secondary hover:scale-105 aria-selected:bg-secondary aria-selected:text-white aria-selected:shadow-md",
        outline:
          "border border-transparent text-gray-700 bg-transparent hover:bg-primary/10 hover:border-primary hover:text-primary hover:scale-105 aria-selected:border-primary aria-selected:bg-primary aria-selected:text-white aria-selected:shadow-md",
        outlineSolid:
          "border border-transparent text-gray-700 bg-transparent hover:bg-primary hover:text-white hover:scale-105 aria-selected:bg-primary aria-selected:text-white aria-selected:shadow-md",
        ghost:
          "border-transparent text-gray-700 hover:bg-primary/10 hover:text-primary hover:scale-105 aria-selected:bg-primary/10 aria-selected:text-primary",
      },
      rounded: {
        none: "rounded-none aria-selected:rounded-none hover:rounded-none",
        xs: "rounded-sm aria-selected:rounded-sm hover:rounded-sm",
        sm: "rounded-md aria-selected:rounded-md hover:rounded-md",
        md: "rounded-lg aria-selected:rounded-lg hover:rounded-lg",
        lg: "rounded-xl aria-selected:rounded-xl hover:rounded-xl",
        full: "rounded-xl aria-selected:rounded-full hover:rounded-full",
      },
    },
    defaultVariants: {
      variant: "primary",
      rounded: "md",
    },
  }
)

export const calendarTodayStyles = cva("font-semibold text-primary ring-2 ring-primary/20", {
  variants: {
    variant: {
      primary: "bg-primary/10 text-primary ring-primary/20",
      secondary: "bg-secondary/10 text-secondary ring-secondary/20",
      outline: "border border-primary/30 text-primary ring-primary/20",
      outlineSolid: "border border-primary/30 text-primary ring-primary/20",
      ghost: "bg-primary/10 text-primary ring-primary/20",
    },
    rounded: {
      none: "rounded-none",
      xs: "rounded-sm",
      sm: "rounded-md",
      md: "rounded-lg",
      lg: "rounded-xl",
      full: "rounded-full",
    },
  },
  defaultVariants: {
    variant: "primary",
    rounded: "md",
  },
})
