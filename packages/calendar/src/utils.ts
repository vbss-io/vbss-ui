import { format, parse, isValid, isWithinInterval, isSameDay, startOfDay } from "date-fns"
import type { Locale } from "date-fns"

/**
 * Date formatting utilities for Calendar and DatePicker components
 */

export interface DateValidationOptions {
  minDate?: Date
  maxDate?: Date
  disabledDates?: Date[] | ((date: Date) => boolean)
}

/**
 * Formats a date using date-fns with optional locale support
 * @param date - The date to format
 * @param formatStr - The format string (default: "PP" - localized date)
 * @param locale - Optional date-fns locale
 * @returns Formatted date string or empty string if date is invalid
 */
export const formatDate = (date: Date | null | undefined, formatStr = "PP", locale?: Locale): string => {
  if (!date || !isValid(date)) return ""
  try {
    return format(date, formatStr, locale ? { locale } : undefined)
  } catch {
    return ""
  }
}

/**
 * Parses a date string using date-fns
 * @param dateString - The date string to parse
 * @param formatStr - The format string (default: "PP" - localized date)
 * @param referenceDate - Reference date for parsing (default: new Date())
 * @param locale - Optional date-fns locale
 * @returns Parsed Date object or null if invalid
 */
export const parseDate = (
  dateString: string,
  formatStr = "PP",
  referenceDate: Date = new Date(),
  locale?: Locale
): Date | null => {
  if (!dateString) return null
  try {
    const parsed = parse(dateString, formatStr, referenceDate, locale ? { locale } : undefined)
    return isValid(parsed) ? parsed : null
  } catch {
    return null
  }
}

/**
 * Checks if a date is disabled based on validation options
 * @param date - The date to check
 * @param options - Validation options (minDate, maxDate, disabledDates)
 * @returns true if the date is disabled
 */
export const isDateDisabled = (date: Date, options: DateValidationOptions = {}): boolean => {
  const { minDate, maxDate, disabledDates } = options

  // Check min/max date range
  if (minDate || maxDate) {
    const interval = {
      start: minDate ? startOfDay(minDate) : new Date(0),
      end: maxDate ? startOfDay(maxDate) : new Date(8640000000000000), // Max valid date
    }
    if (!isWithinInterval(startOfDay(date), interval)) {
      return true
    }
  }

  // Check disabled dates
  if (disabledDates) {
    if (typeof disabledDates === "function") {
      return disabledDates(date)
    }
    return disabledDates.some((disabledDate) => isSameDay(date, disabledDate))
  }

  return false
}

/**
 * Validates if a date is selectable based on constraints
 * @param date - The date to validate
 * @param options - Validation options
 * @returns true if the date is valid and selectable
 */
export const isDateSelectable = (date: Date | null | undefined, options: DateValidationOptions = {}): boolean => {
  if (!date || !isValid(date)) return false
  return !isDateDisabled(date, options)
}

/**
 * Normalizes a date to start of day (00:00:00) for comparison
 * @param date - The date to normalize
 * @returns Normalized date or null if invalid
 */
export const normalizeDate = (date: Date | null | undefined): Date | null => {
  if (!date || !isValid(date)) return null
  return startOfDay(date)
}

/**
 * Checks if two dates are the same day
 * @param date1 - First date
 * @param date2 - Second date
 * @returns true if dates are the same day
 */
export const isSameDayAs = (date1: Date | null | undefined, date2: Date | null | undefined): boolean => {
  if (!date1 || !date2) return false
  if (!isValid(date1) || !isValid(date2)) return false
  return isSameDay(date1, date2)
}
