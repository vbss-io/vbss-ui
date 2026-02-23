import { Calendar, formatDate, isDateDisabled, normalizeDate, type DateValidationOptions, type Matcher } from "@vbss-ui/calendar"
import { Input } from "@vbss-ui/input"
import { cn } from "@vbss-ui/lib"
import { cva } from "class-variance-authority"
import { isValid, parse } from "date-fns"
import type { Locale } from "date-fns"
import { ComponentPropsWithoutRef, forwardRef, ReactNode, useCallback, useEffect, useMemo, useState } from "react"
import {
  Root as PopoverRoot,
  Trigger as PopoverTrigger,
  Portal as PopoverPortal,
  Content as PopoverContent,
} from "@radix-ui/react-popover"
import "./index.css"

// Re-export types for convenience
export type { Locale } from "date-fns"

export type DatePickerValue = Date | null

export interface DatePickerProps extends Omit<ComponentPropsWithoutRef<"input">, "value" | "onChange" | "defaultValue"> {
  // Controlled mode
  value?: DatePickerValue
  onChange?: (date: DatePickerValue) => void

  // Uncontrolled mode
  defaultValue?: DatePickerValue

  // Validation
  minDate?: Date
  maxDate?: Date
  disabledDates?: Date[] | ((date: Date) => boolean)

  // Formatting
  format?: string
  locale?: Locale

  // UI customization
  label?: ReactNode
  placeholder?: string
  allowClear?: boolean
  withPortal?: boolean
  disabled?: boolean
  error?: string

  // Calendar props
  calendarVariant?: "primary" | "secondary" | "outline" | "outlineSolid" | "ghost"
  calendarRounded?: "none" | "xs" | "sm" | "md" | "lg" | "full"

  // Input styling
  variant?: "primary" | "secondary" | "outline" | "ghost"
  height?: "xs" | "sm" | "md" | "lg" | "xl"
  rounded?: "none" | "xs" | "sm" | "md" | "lg" | "full"
  fontSize?: "xs" | "sm" | "md" | "lg" | "xl"
  fontWeight?: "thin" | "light" | "normal" | "medium" | "bold" | "extrabold"

  // Accessibility
  "aria-label"?: string
  "aria-describedby"?: string
}

export type DatePickerComponent = typeof DatePicker

/**
 * A customizable and accessible Date Picker component with calendar popup.
 * Supports controlled and uncontrolled modes, date validation, formatting, and localization.
 */
export const DatePicker = forwardRef<HTMLInputElement, DatePickerProps>(
  (
    {
      // Value props
      value,
      onChange,
      defaultValue,

      // Validation
      minDate,
      maxDate,
      disabledDates,

      // Formatting
      format: formatString = "PP",
      locale,

      // UI
      label,
      placeholder = "Select date...",
      allowClear = false,
      withPortal = true,
      disabled = false,
      error,

      // Calendar styling
      calendarVariant = "primary",
      calendarRounded = "md",

      // Input styling
      variant = "primary",
      height = "md",
      rounded = "md",
      fontSize = "md",
      fontWeight = "normal",

      // Accessibility
      "aria-label": ariaLabel,
      "aria-describedby": ariaDescribedBy,

      className,
    },
    forwardedRef
  ) => {
    // Determine if component is controlled
    const isControlled = value !== undefined

    // Internal state for uncontrolled mode
    const [internalDate, setInternalDate] = useState<DatePickerValue>(defaultValue || null)
    const [isOpen, setIsOpen] = useState(false)
    const [inputValue, setInputValue] = useState("")

    // Get current date (controlled or uncontrolled)
    const currentDate = isControlled ? value : internalDate

    // Format current date for display
    useEffect(() => {
      if (currentDate && isValid(currentDate)) {
        const formatted = formatDate(currentDate, formatString, locale)
        setInputValue(formatted)
      } else {
        setInputValue("")
      }
    }, [currentDate, formatString, locale])

    // Validation options for calendar
    const validationOptions: DateValidationOptions = useMemo(
      () => ({
        minDate,
        maxDate,
        disabledDates,
      }),
      [minDate, maxDate, disabledDates]
    )

    // Handle date selection from calendar
    const handleDateSelect = useCallback(
      (date: Date | undefined) => {
        if (!date) return

        // Check if date is disabled
        if (isDateDisabled(date, validationOptions)) {
          return
        }

        const normalizedDate = normalizeDate(date)

        if (isControlled) {
          onChange?.(normalizedDate)
        } else {
          setInternalDate(normalizedDate)
        }

        // Close popover after selection
        setIsOpen(false)
      },
      [isControlled, onChange, validationOptions]
    )

    // Handle clear button
    const handleClear = useCallback(
      (e: React.MouseEvent) => {
        e.stopPropagation()

        if (isControlled) {
          onChange?.(null)
        } else {
          setInternalDate(null)
        }

        setInputValue("")
      },
      [isControlled, onChange]
    )

    // Handle manual input
    const handleInputChange = useCallback(
      (e: React.ChangeEvent<HTMLInputElement>) => {
        const newValue = e.target.value
        setInputValue(newValue)

        // Try to parse the input
        if (newValue) {
          try {
            const parsed = parse(newValue, formatString, new Date(), locale ? { locale } : undefined)
            if (isValid(parsed) && !isDateDisabled(parsed, validationOptions)) {
              const normalized = normalizeDate(parsed)
              if (isControlled) {
                onChange?.(normalized)
              } else {
                setInternalDate(normalized)
              }
            }
          } catch {
            // Invalid input, keep as is
          }
        } else {
          // Empty input, clear date
          if (isControlled) {
            onChange?.(null)
          } else {
            setInternalDate(null)
          }
        }
      },
      [formatString, locale, isControlled, onChange, validationOptions]
    )

    // Build disabled matcher for react-day-picker
    const disabledMatcher = useMemo((): Matcher | Matcher[] | undefined => {
      const matchers: Matcher[] = []

      if (minDate) {
        matchers.push({ before: minDate })
      }

      if (maxDate) {
        matchers.push({ after: maxDate })
      }

      if (disabledDates) {
        if (typeof disabledDates === "function") {
          matchers.push(disabledDates)
        } else {
          matchers.push(...disabledDates.map((date) => normalizeDate(date)!).filter(Boolean))
        }
      }

      if (matchers.length === 0) {
        return undefined
      }
      if (matchers.length === 1) {
        return matchers[0]
      }
      return matchers
    }, [minDate, maxDate, disabledDates])

    // Calendar icon SVG
    const CalendarIcon = () => (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
        <line x1="16" y1="2" x2="16" y2="6"></line>
        <line x1="8" y1="2" x2="8" y2="6"></line>
        <line x1="3" y1="10" x2="21" y2="10"></line>
      </svg>
    )

    // Clear icon SVG
    const ClearIcon = () => (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <line x1="18" y1="6" x2="6" y2="18"></line>
        <line x1="6" y1="6" x2="18" y2="18"></line>
      </svg>
    )

    const showClearButton = allowClear && currentDate && !disabled

    return (
      <div className={cn("datePickerRoot", className)}>
        {label && (
          <label className={cn("datePickerLabel block mb-1 pl-0.5", datePickerLabelStyles({ fontSize, fontWeight }))}>
            {label}
          </label>
        )}

        <PopoverRoot open={isOpen} onOpenChange={setIsOpen}>
          <PopoverTrigger asChild>
            <div className="datePickerTriggerContainer relative">
              <Input
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                ref={forwardedRef as any}
                type="text"
                value={inputValue}
                onChange={handleInputChange}
                placeholder={placeholder}
                disabled={disabled}
                variant={variant}
                height={height}
                rounded={rounded}
                fontSize={fontSize}
                fontWeight={fontWeight}
                error={error}
                aria-label={ariaLabel || (typeof label === "string" ? label : "Select date")}
                aria-describedby={ariaDescribedBy}
                className={cn("datePickerTrigger pr-10", showClearButton && "pr-16")}
              />

              {showClearButton ? (
                <button
                  type="button"
                  onClick={handleClear}
                  className="datePickerClearButton"
                  aria-label="Clear date"
                  tabIndex={-1}
                >
                  <ClearIcon />
                </button>
              ) : (
                <div className="datePickerIcon">
                  <CalendarIcon />
                </div>
              )}
            </div>
          </PopoverTrigger>

          {withPortal ? (
            <PopoverPortal>
              <PopoverContent
                align="start"
                className={cn("datePickerPopover p-0 bg-transparent border-0 shadow-none")}
                onOpenAutoFocus={(e) => e.preventDefault()}
              >
                <Calendar
                  mode="single"
                  selected={currentDate || undefined}
                  onSelect={handleDateSelect}
                  // eslint-disable-next-line @typescript-eslint/no-explicit-any
                  {...(disabledMatcher ? { disabled: disabledMatcher as any } : {})}
                  variant={calendarVariant}
                  rounded={calendarRounded}
                  locale={locale}
                  initialFocus
                />
              </PopoverContent>
            </PopoverPortal>
          ) : (
            <PopoverContent
              align="start"
              className={cn("datePickerPopover p-0 bg-transparent border-0 shadow-none")}
              onOpenAutoFocus={(e) => e.preventDefault()}
            >
              <Calendar
                mode="single"
                selected={currentDate || undefined}
                onSelect={handleDateSelect}
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                {...(disabledMatcher ? { disabled: disabledMatcher as any } : {})}
                variant={calendarVariant}
                rounded={calendarRounded}
                locale={locale}
                initialFocus
              />
            </PopoverContent>
          )}
        </PopoverRoot>
      </div>
    )
  }
)

DatePicker.displayName = "DatePicker"

// Label styles helper
export const datePickerLabelStyles = cva("", {
  variants: {
    fontSize: {
      xs: "text-xs",
      sm: "text-sm",
      md: "text-base",
      lg: "text-lg",
      xl: "text-xl",
    },
    fontWeight: {
      thin: "font-thin",
      light: "font-light",
      normal: "font-normal",
      medium: "font-medium",
      bold: "font-bold",
      extrabold: "font-extrabold",
    },
  },
  defaultVariants: {
    fontSize: "md",
    fontWeight: "normal",
  },
})
