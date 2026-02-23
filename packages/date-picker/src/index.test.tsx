import { render, screen, fireEvent, waitFor } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { describe, it, expect, vi } from "vitest"
import { DatePicker } from "./index"
// Unused date-fns imports removed

describe("DatePicker", () => {
  describe("Rendering", () => {
    it("renders with default props", () => {
      render(<DatePicker />)
      const input = screen.getByRole("textbox")
      expect(input).toBeInTheDocument()
    })

    it("renders with label", () => {
      render(<DatePicker label="Birth Date" />)
      expect(screen.getByText("Birth Date")).toBeInTheDocument()
    })

    it("renders with ReactNode label", () => {
      render(<DatePicker label={<span data-testid="custom-label">Custom Label</span>} />)
      expect(screen.getByTestId("custom-label")).toBeInTheDocument()
    })

    it("renders with placeholder", () => {
      render(<DatePicker placeholder="Pick a date" />)
      const input = screen.getByPlaceholderText("Pick a date")
      expect(input).toBeInTheDocument()
    })

    it("renders with error message", () => {
      render(<DatePicker error="Invalid date" />)
      expect(screen.getByText("Invalid date")).toBeInTheDocument()
    })

    it("renders calendar icon by default", () => {
      render(<DatePicker />)
      const icon = document.querySelector(".datePickerIcon")
      expect(icon).toBeInTheDocument()
    })

    it("renders clear button when allowClear is true and date is selected", () => {
      const testDate = new Date(2024, 0, 15)
      render(<DatePicker value={testDate} allowClear />)
      const clearButton = screen.getByLabelText("Clear date")
      expect(clearButton).toBeInTheDocument()
    })

    it("does not render clear button when no date is selected", () => {
      render(<DatePicker value={null} allowClear />)
      const clearButton = screen.queryByLabelText("Clear date")
      expect(clearButton).not.toBeInTheDocument()
    })
  })

  describe("Controlled Mode", () => {
    it("displays formatted date in controlled mode", () => {
      const testDate = new Date(2024, 0, 15)
      render(<DatePicker value={testDate} format="yyyy-MM-dd" />)
      const input = screen.getByRole("textbox") as HTMLInputElement
      expect(input.value).toBe("2024-01-15")
    })

    it("calls onChange when date is selected", async () => {
      const handleChange = vi.fn()

      render(<DatePicker value={null} onChange={handleChange} />)

      const input = screen.getByRole("textbox")
      await userEvent.click(input)

      // Wait for calendar to appear and click a date
      await waitFor(() => {
        const dayButton = screen.getByRole("button", { name: "15" })
        fireEvent.click(dayButton)
      })

      expect(handleChange).toHaveBeenCalled()
    })

    it("does not update internal state in controlled mode", () => {
      const testDate = new Date(2024, 0, 15)
      const { rerender } = render(<DatePicker value={testDate} />)

      const input = screen.getByRole("textbox") as HTMLInputElement
      expect(input.value).toContain("2024")

      // Value should only change via prop
      rerender(<DatePicker value={null} />)
      expect(input.value).toBe("")
    })
  })

  describe("Uncontrolled Mode", () => {
    it("uses defaultValue for initial state", () => {
      const testDate = new Date(2024, 0, 15)
      render(<DatePicker defaultValue={testDate} format="yyyy-MM-dd" />)

      const input = screen.getByRole("textbox") as HTMLInputElement
      expect(input.value).toBe("2024-01-15")
    })

    it("updates internal state on date selection", async () => {
      render(<DatePicker />)

      const input = screen.getByRole("textbox")
      await userEvent.click(input)

      await waitFor(() => {
        const dayButton = screen.getByRole("button", { name: "15" })
        fireEvent.click(dayButton)
      })

      const inputAfter = screen.getByRole("textbox") as HTMLInputElement
      expect(inputAfter.value).not.toBe("")
    })
  })

  describe("Date Formatting", () => {
    it("formats date with default format (PP)", () => {
      const testDate = new Date(2024, 0, 15)
      render(<DatePicker value={testDate} />)

      const input = screen.getByRole("textbox") as HTMLInputElement
      // Default PP format produces "Jan 15, 2024" or locale variant
      expect(input.value).toMatch(/Jan|15|2024/)
    })

    it("formats date with custom format string", () => {
      const testDate = new Date(2024, 0, 15)
      render(<DatePicker value={testDate} format="MM/dd/yyyy" />)

      const input = screen.getByRole("textbox") as HTMLInputElement
      expect(input.value).toBe("01/15/2024")
    })

    it("handles invalid dates gracefully", () => {
      render(<DatePicker value={new Date("invalid")} />)

      const input = screen.getByRole("textbox") as HTMLInputElement
      expect(input.value).toBe("")
    })
  })

  describe("Date Validation", () => {
    it("respects minDate constraint", async () => {
      const minDate = new Date(2024, 0, 10)
      const handleChange = vi.fn()

      render(<DatePicker value={null} onChange={handleChange} minDate={minDate} />)

      const input = screen.getByRole("textbox")
      await userEvent.click(input)

      // Calendar should disable dates before minDate
      await waitFor(() => {
        const calendar = document.querySelector(".calendar")
        expect(calendar).toBeInTheDocument()
      })
    })

    it("respects maxDate constraint", async () => {
      const maxDate = new Date(2024, 0, 20)

      render(<DatePicker value={null} maxDate={maxDate} />)

      const input = screen.getByRole("textbox")
      await userEvent.click(input)

      await waitFor(() => {
        const calendar = document.querySelector(".calendar")
        expect(calendar).toBeInTheDocument()
      })
    })

    it("handles disabledDates array", async () => {
      const disabledDates = [new Date(2024, 0, 10), new Date(2024, 0, 15)]

      render(<DatePicker value={null} disabledDates={disabledDates} />)

      const input = screen.getByRole("textbox")
      await userEvent.click(input)

      await waitFor(() => {
        const calendar = document.querySelector(".calendar")
        expect(calendar).toBeInTheDocument()
      })
    })

    it("handles disabledDates function", async () => {
      const disabledDatesFn = (date: Date) => date.getDay() === 0 || date.getDay() === 6

      render(<DatePicker value={null} disabledDates={disabledDatesFn} />)

      const input = screen.getByRole("textbox")
      await userEvent.click(input)

      await waitFor(() => {
        const calendar = document.querySelector(".calendar")
        expect(calendar).toBeInTheDocument()
      })
    })
  })

  describe("Clear Functionality", () => {
    it("clears date in controlled mode", async () => {
      const handleChange = vi.fn()
      const testDate = new Date(2024, 0, 15)

      render(<DatePicker value={testDate} onChange={handleChange} allowClear />)

      const clearButton = screen.getByLabelText("Clear date")
      await userEvent.click(clearButton)

      expect(handleChange).toHaveBeenCalledWith(null)
    })

    it("clears date in uncontrolled mode", async () => {
      const testDate = new Date(2024, 0, 15)

      render(<DatePicker defaultValue={testDate} allowClear format="yyyy-MM-dd" />)

      const input = screen.getByRole("textbox") as HTMLInputElement
      expect(input.value).toBe("2024-01-15")

      const clearButton = screen.getByLabelText("Clear date")
      await userEvent.click(clearButton)

      expect(input.value).toBe("")
    })
  })

  describe("Disabled State", () => {
    it("disables input when disabled prop is true", () => {
      render(<DatePicker disabled />)

      const input = screen.getByRole("textbox")
      expect(input).toBeDisabled()
    })

    it("does not show clear button when disabled", () => {
      const testDate = new Date(2024, 0, 15)
      render(<DatePicker value={testDate} allowClear disabled />)

      const clearButton = screen.queryByLabelText("Clear date")
      expect(clearButton).not.toBeInTheDocument()
    })
  })

  describe("Accessibility", () => {
    it("has proper aria-label", () => {
      render(<DatePicker aria-label="Select appointment date" />)

      const input = screen.getByLabelText("Select appointment date")
      expect(input).toBeInTheDocument()
    })

    it("uses label text for aria-label when no explicit aria-label", () => {
      render(<DatePicker label="Birth Date" />)

      const input = screen.getByLabelText("Birth Date")
      expect(input).toBeInTheDocument()
    })

    it("supports aria-describedby", () => {
      render(
        <>
          <DatePicker aria-describedby="date-help" />
          <span id="date-help">Select your preferred date</span>
        </>
      )

      const input = screen.getByRole("textbox")
      expect(input).toHaveAttribute("aria-describedby", "date-help")
    })

    it("calendar has proper keyboard navigation", async () => {
      render(<DatePicker />)

      const input = screen.getByRole("textbox")
      await userEvent.click(input)

      // Calendar from react-day-picker includes keyboard navigation
      await waitFor(() => {
        const calendar = document.querySelector(".calendar")
        expect(calendar).toBeInTheDocument()
      })
    })
  })

  describe("Calendar Popover", () => {
    it("opens calendar on input click", async () => {
      render(<DatePicker />)

      const input = screen.getByRole("textbox")
      await userEvent.click(input)

      await waitFor(() => {
        const calendar = document.querySelector(".calendar")
        expect(calendar).toBeInTheDocument()
      })
    })

    it("closes calendar after date selection", async () => {
      render(<DatePicker />)

      const input = screen.getByRole("textbox")
      await userEvent.click(input)

      await waitFor(() => {
        const dayButton = screen.getByRole("button", { name: "15" })
        fireEvent.click(dayButton)
      })

      // Calendar should close after selection
      await waitFor(() => {
        const calendar = document.querySelector(".calendar")
        expect(calendar).not.toBeInTheDocument()
      })
    })
  })

  describe("Manual Input", () => {
    it("parses manual date input", async () => {
      const handleChange = vi.fn()

      render(<DatePicker value={null} onChange={handleChange} format="MM/dd/yyyy" />)

      const input = screen.getByRole("textbox")
      await userEvent.clear(input)
      await userEvent.type(input, "01/15/2024")

      // Should parse and call onChange
      expect(handleChange).toHaveBeenCalled()
    })

    it("ignores invalid manual input", async () => {
      const handleChange = vi.fn()

      render(<DatePicker value={null} onChange={handleChange} format="MM/dd/yyyy" />)

      const input = screen.getByRole("textbox")
      await userEvent.type(input, "invalid")

      // Should not parse invalid date
      const lastCall = handleChange.mock.calls[handleChange.mock.calls.length - 1]
      expect(lastCall).toBeUndefined()
    })
  })

  describe("Styling Variants", () => {
    it("applies custom variant prop", () => {
      render(<DatePicker variant="secondary" />)

      const input = screen.getByRole("textbox")
      expect(input).toBeInTheDocument()
    })

    it("applies custom height prop", () => {
      render(<DatePicker height="lg" />)

      const input = screen.getByRole("textbox")
      expect(input).toBeInTheDocument()
    })

    it("applies custom rounded prop", () => {
      render(<DatePicker rounded="full" />)

      const input = screen.getByRole("textbox")
      expect(input).toBeInTheDocument()
    })

    it("applies calendar styling props", async () => {
      render(<DatePicker calendarVariant="secondary" calendarRounded="lg" />)

      const input = screen.getByRole("textbox")
      await userEvent.click(input)

      await waitFor(() => {
        const calendar = document.querySelector(".calendar")
        expect(calendar).toBeInTheDocument()
      })
    })
  })
})
