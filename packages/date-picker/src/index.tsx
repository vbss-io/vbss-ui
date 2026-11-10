import { Calendar, formatDate, isDateDisabled, normalizeDate, type DateValidationOptions, type Matcher } from "@vbss-ui/calendar"
import { Input } from "@vbss-ui/input"
import { cn } from "@vbss-ui/lib"
import { cva } from "class-variance-authority"
import { format as formatWith, isValid, parse } from "date-fns"
import type { Locale } from "date-fns"
import {
  ComponentPropsWithoutRef,
  ChangeEvent,
  FocusEvent,
  forwardRef,
  MouseEvent,
  ReactNode,
  useCallback,
  useEffect,
  useId,
  useMemo,
  useRef,
  useState,
} from "react"
import {
  Anchor as PopoverAnchor,
  Root as PopoverRoot,
  Portal as PopoverPortal,
  Content as PopoverContent,
} from "@radix-ui/react-popover"
import "./index.css"

export type { Locale } from "date-fns"

export type DatePickerValue = Date | null

export interface DatePickerProps extends Omit<ComponentPropsWithoutRef<"input">, "value" | "onChange" | "defaultValue"> {
  value?: DatePickerValue
  onChange?: (date: DatePickerValue) => void
  defaultValue?: DatePickerValue
  minDate?: Date
  maxDate?: Date
  disabledDates?: Date[] | ((date: Date) => boolean)
  format?: string
  locale?: Locale
  label?: ReactNode
  placeholder?: string
  allowClear?: boolean
  withPortal?: boolean
  disabled?: boolean
  error?: string
  calendarVariant?: "primary" | "secondary" | "outline" | "outlineSolid" | "ghost"
  calendarRounded?: "none" | "xs" | "sm" | "md" | "lg" | "full"
  variant?: "primary" | "secondary" | "outline" | "ghost"
  height?: "xs" | "sm" | "md" | "lg" | "xl"
  rounded?: "none" | "xs" | "sm" | "md" | "lg" | "full"
  fontSize?: "xs" | "sm" | "md" | "lg" | "xl"
  fontWeight?: "thin" | "light" | "normal" | "medium" | "bold" | "extrabold"
  "aria-label"?: string
  "aria-describedby"?: string
}

export type DatePickerComponent = typeof DatePicker

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

const parseExactDate = (text: string, formatString: string, locale?: Locale): Date | null => {
  const options = locale ? { locale } : undefined
  try {
    const parsed = parse(text, formatString, new Date(), options)
    if (!isValid(parsed)) return null
    return formatWith(parsed, formatString, options) === text ? parsed : null
  } catch {
    return null
  }
}

export const DatePicker = forwardRef<HTMLInputElement, DatePickerProps>(
  (
    {
      value,
      onChange,
      defaultValue,
      minDate,
      maxDate,
      disabledDates,
      format: formatString = "PP",
      locale,
      label,
      placeholder = "Select date...",
      allowClear = false,
      withPortal = true,
      disabled = false,
      error,
      calendarVariant = "primary",
      calendarRounded = "md",
      variant = "primary",
      height = "md",
      rounded = "md",
      fontSize = "md",
      fontWeight = "normal",
      "aria-label": ariaLabel,
      "aria-describedby": ariaDescribedBy,
      className,
      id,
      onFocus,
      onClick,
      ...inputProps
    },
    forwardedRef
  ) => {
    const generatedId = useId()
    const inputId = id ?? generatedId
    const contentId = useId()
    const containerRef = useRef<HTMLDivElement>(null)

    const isControlled = value !== undefined

    const [internalDate, setInternalDate] = useState<DatePickerValue>(defaultValue || null)
    const [isOpen, setIsOpen] = useState(false)
    const [inputValue, setInputValue] = useState("")

    const currentDate = isControlled ? value : internalDate
    const validDate = currentDate && isValid(currentDate) ? currentDate : undefined

    useEffect(() => {
      if (currentDate && isValid(currentDate)) {
        setInputValue(formatDate(currentDate, formatString, locale))
      } else {
        setInputValue("")
      }
    }, [currentDate, formatString, locale])

    const validationOptions: DateValidationOptions = useMemo(
      () => ({
        minDate,
        maxDate,
        disabledDates,
      }),
      [minDate, maxDate, disabledDates]
    )

    const commit = useCallback(
      (next: DatePickerValue) => {
        if (!isControlled) setInternalDate(next)
        onChange?.(next)
      },
      [isControlled, onChange]
    )

    const handleDateSelect = useCallback(
      (date: Date | undefined) => {
        if (!date) return
        if (isDateDisabled(date, validationOptions)) return
        commit(normalizeDate(date))
        setIsOpen(false)
      },
      [commit, validationOptions]
    )

    const handleClear = useCallback(
      (e: MouseEvent) => {
        e.stopPropagation()
        commit(null)
        setInputValue("")
      },
      [commit]
    )

    const handleInputChange = useCallback(
      (e: ChangeEvent<HTMLInputElement>) => {
        const newValue = e.target.value
        setInputValue(newValue)

        if (!newValue) {
          commit(null)
          return
        }

        const parsed = parseExactDate(newValue, formatString, locale)
        if (parsed && !isDateDisabled(parsed, validationOptions)) {
          commit(normalizeDate(parsed))
        }
      },
      [commit, formatString, locale, validationOptions]
    )

    const handleInputFocus = (e: FocusEvent<HTMLInputElement>) => {
      onFocus?.(e)
      setIsOpen(true)
    }

    const handleInputClick = (e: MouseEvent<HTMLInputElement>) => {
      onClick?.(e)
      setIsOpen(true)
    }

    const handleInteractOutside = (e: Event) => {
      if (e.target instanceof Node && containerRef.current?.contains(e.target)) {
        e.preventDefault()
      }
    }

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

    const showClearButton = allowClear && currentDate && !disabled

    const popoverContent = (
      <PopoverContent
        id={contentId}
        align="start"
        className={cn("datePickerPopover p-0 bg-transparent border-0 shadow-none")}
        onOpenAutoFocus={(e) => e.preventDefault()}
        onInteractOutside={handleInteractOutside}
      >
        <Calendar
          mode="single"
          selected={validDate}
          defaultMonth={validDate}
          onSelect={handleDateSelect}
          disabled={disabledMatcher}
          variant={calendarVariant}
          rounded={calendarRounded}
          locale={locale}
          initialFocus
        />
      </PopoverContent>
    )

    return (
      <div className={cn("datePickerRoot", className)}>
        {label && (
          <label
            htmlFor={inputId}
            className={cn("datePickerLabel block mb-1 pl-0.5", datePickerLabelStyles({ fontSize, fontWeight }))}
          >
            {label}
          </label>
        )}

        <PopoverRoot open={isOpen} onOpenChange={setIsOpen}>
          <PopoverAnchor asChild>
            <div ref={containerRef} className="datePickerTriggerContainer relative">
              <Input
                {...inputProps}
                ref={forwardedRef}
                id={inputId}
                type="text"
                value={inputValue}
                onChange={handleInputChange}
                onFocus={handleInputFocus}
                onClick={handleInputClick}
                placeholder={placeholder}
                disabled={disabled}
                variant={variant}
                height={height}
                rounded={rounded}
                fontSize={fontSize}
                fontWeight={fontWeight}
                error={error}
                aria-haspopup="dialog"
                aria-expanded={isOpen}
                aria-controls={contentId}
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
                <button
                  type="button"
                  onClick={() => setIsOpen((open) => !open)}
                  className="datePickerIcon"
                  aria-label="Open calendar"
                  disabled={disabled}
                >
                  <CalendarIcon />
                </button>
              )}
            </div>
          </PopoverAnchor>

          {withPortal ? <PopoverPortal>{popoverContent}</PopoverPortal> : popoverContent}
        </PopoverRoot>
      </div>
    )
  }
)

DatePicker.displayName = "DatePicker"

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
