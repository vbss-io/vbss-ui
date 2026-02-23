/**
 * Unit tests for Calendar utility functions
 *
 * Note: These tests require Jest to be configured in the project.
 * Run with: npm test (after Jest setup)
 */

import { ptBR } from "date-fns/locale"
import { formatDate, isDateDisabled, isDateSelectable, isSameDayAs, normalizeDate, parseDate } from "../src/utils"

describe("Calendar Utils", () => {
  describe("formatDate", () => {
    it("should format a valid date", () => {
      const date = new Date(2025, 10, 3) // November 3, 2025
      const result = formatDate(date, "yyyy-MM-dd")
      expect(result).toBe("2025-11-03")
    })

    it("should return empty string for null date", () => {
      const result = formatDate(null)
      expect(result).toBe("")
    })

    it("should return empty string for undefined date", () => {
      const result = formatDate(undefined)
      expect(result).toBe("")
    })

    it("should return empty string for invalid date", () => {
      const result = formatDate(new Date("invalid"))
      expect(result).toBe("")
    })

    it("should format with locale", () => {
      const date = new Date(2025, 10, 3)
      const result = formatDate(date, "PPPP", ptBR)
      expect(result).toContain("novembro")
    })
  })

  describe("parseDate", () => {
    it("should parse a valid date string", () => {
      const result = parseDate("2025-11-03", "yyyy-MM-dd")
      expect(result).toBeInstanceOf(Date)
      expect(result?.getFullYear()).toBe(2025)
      expect(result?.getMonth()).toBe(10) // November (0-indexed)
      expect(result?.getDate()).toBe(3)
    })

    it("should return null for empty string", () => {
      const result = parseDate("")
      expect(result).toBeNull()
    })

    it("should return null for invalid date string", () => {
      const result = parseDate("invalid-date", "yyyy-MM-dd")
      expect(result).toBeNull()
    })

    it("should parse with locale", () => {
      const result = parseDate("3 de novembro de 2025", "PPP", new Date(), ptBR)
      expect(result).toBeInstanceOf(Date)
      expect(result?.getMonth()).toBe(10)
    })
  })

  describe("isDateDisabled", () => {
    const testDate = new Date(2025, 10, 3) // November 3, 2025

    it("should return false when no options provided", () => {
      const result = isDateDisabled(testDate)
      expect(result).toBe(false)
    })

    it("should return true when date is before minDate", () => {
      const minDate = new Date(2025, 10, 5) // November 5, 2025
      const result = isDateDisabled(testDate, { minDate })
      expect(result).toBe(true)
    })

    it("should return true when date is after maxDate", () => {
      const maxDate = new Date(2025, 10, 1) // November 1, 2025
      const result = isDateDisabled(testDate, { maxDate })
      expect(result).toBe(true)
    })

    it("should return false when date is within range", () => {
      const minDate = new Date(2025, 10, 1)
      const maxDate = new Date(2025, 10, 5)
      const result = isDateDisabled(testDate, { minDate, maxDate })
      expect(result).toBe(false)
    })

    it("should return true when date is in disabledDates array", () => {
      const disabledDates = [new Date(2025, 10, 3), new Date(2025, 10, 4)]
      const result = isDateDisabled(testDate, { disabledDates })
      expect(result).toBe(true)
    })

    it("should return true when disabledDates function returns true", () => {
      const disabledDates = (date: Date) => date.getDay() === 0 // Disable Sundays
      const sunday = new Date(2025, 10, 2) // November 2, 2025 is a Sunday
      const result = isDateDisabled(sunday, { disabledDates })
      expect(result).toBe(true)
    })

    it("should return false when disabledDates function returns false", () => {
      const disabledDates = (date: Date) => date.getDay() === 0 // Disable Sundays
      const monday = new Date(2025, 10, 3) // November 3, 2025 is a Monday
      const result = isDateDisabled(monday, { disabledDates })
      expect(result).toBe(false)
    })
  })

  describe("isDateSelectable", () => {
    it("should return false for null date", () => {
      const result = isDateSelectable(null)
      expect(result).toBe(false)
    })

    it("should return false for undefined date", () => {
      const result = isDateSelectable(undefined)
      expect(result).toBe(false)
    })

    it("should return false for invalid date", () => {
      const result = isDateSelectable(new Date("invalid"))
      expect(result).toBe(false)
    })

    it("should return false for disabled date", () => {
      const testDate = new Date(2025, 10, 3)
      const minDate = new Date(2025, 10, 5)
      const result = isDateSelectable(testDate, { minDate })
      expect(result).toBe(false)
    })

    it("should return true for valid and enabled date", () => {
      const testDate = new Date(2025, 10, 3)
      const result = isDateSelectable(testDate)
      expect(result).toBe(true)
    })
  })

  describe("normalizeDate", () => {
    it("should normalize date to start of day", () => {
      const date = new Date(2025, 10, 3, 15, 30, 45, 123) // 3:30:45.123 PM
      const result = normalizeDate(date)
      expect(result?.getHours()).toBe(0)
      expect(result?.getMinutes()).toBe(0)
      expect(result?.getSeconds()).toBe(0)
      expect(result?.getMilliseconds()).toBe(0)
    })

    it("should return null for null date", () => {
      const result = normalizeDate(null)
      expect(result).toBeNull()
    })

    it("should return null for undefined date", () => {
      const result = normalizeDate(undefined)
      expect(result).toBeNull()
    })

    it("should return null for invalid date", () => {
      const result = normalizeDate(new Date("invalid"))
      expect(result).toBeNull()
    })
  })

  describe("isSameDayAs", () => {
    it("should return true for same day", () => {
      const date1 = new Date(2025, 10, 3, 10, 0, 0)
      const date2 = new Date(2025, 10, 3, 15, 30, 0)
      const result = isSameDayAs(date1, date2)
      expect(result).toBe(true)
    })

    it("should return false for different days", () => {
      const date1 = new Date(2025, 10, 3)
      const date2 = new Date(2025, 10, 4)
      const result = isSameDayAs(date1, date2)
      expect(result).toBe(false)
    })

    it("should return false when first date is null", () => {
      const date2 = new Date(2025, 10, 3)
      const result = isSameDayAs(null, date2)
      expect(result).toBe(false)
    })

    it("should return false when second date is null", () => {
      const date1 = new Date(2025, 10, 3)
      const result = isSameDayAs(date1, null)
      expect(result).toBe(false)
    })

    it("should return false when both dates are null", () => {
      const result = isSameDayAs(null, null)
      expect(result).toBe(false)
    })

    it("should return false for invalid dates", () => {
      const date1 = new Date("invalid")
      const date2 = new Date(2025, 10, 3)
      const result = isSameDayAs(date1, date2)
      expect(result).toBe(false)
    })
  })
})
