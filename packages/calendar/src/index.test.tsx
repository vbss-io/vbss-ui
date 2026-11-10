import { render, screen, within } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { describe, expect, it, vi } from "vitest"
import type { DateRange } from "react-day-picker"
import { Calendar, calendarDayStyles, calendarStyles, enUS, ptBR } from "./index"

const january = new Date(2025, 0, 1)

const dayButton = (name: RegExp | string) => screen.getByRole("button", { name })

const root = (container: HTMLElement) => container.querySelector<HTMLElement>(".calendar")!

describe("Calendar", () => {
  describe("rendering", () => {
    it("renders a month grid with the weekday headers and the month caption", () => {
      render(<Calendar defaultMonth={january} />)
      expect(screen.getByRole("grid")).toBeInTheDocument()
      expect(screen.getByText("January 2025")).toBeInTheDocument()
      expect(screen.getAllByRole("columnheader", { hidden: true })).toHaveLength(7)
    })

    it("renders a button for every day of the displayed month", () => {
      render(<Calendar defaultMonth={january} mode="single" showOutsideDays={false} />)
      expect(screen.getAllByRole("button", { name: /, 2025$/ })).toHaveLength(31)
    })

    it("shows the days of adjacent months by default", () => {
      render(<Calendar defaultMonth={january} mode="single" />)
      expect(screen.getByRole("button", { name: /December 31st, 2024/ })).toBeInTheDocument()
      expect(screen.getByRole("button", { name: /February 1st, 2025/ })).toBeInTheDocument()
    })

    it("hides the days of adjacent months when showOutsideDays is false", () => {
      render(<Calendar defaultMonth={january} mode="single" showOutsideDays={false} />)
      expect(screen.queryByRole("button", { name: /December 31st, 2024/ })).not.toBeInTheDocument()
      expect(screen.queryByRole("button", { name: /February 1st, 2025/ })).not.toBeInTheDocument()
    })

    it("uses the given locale for captions and weekday names", () => {
      render(<Calendar defaultMonth={january} mode="single" locale={ptBR} />)
      expect(screen.getByText(/janeiro 2025/i)).toBeInTheDocument()
      expect(screen.getByRole("button", { name: /^quarta-feira, 1 de janeiro de 2025$/ })).toBeInTheDocument()
    })

    it("starts the week on the requested day", () => {
      render(<Calendar defaultMonth={january} weekStartsOn={1} locale={enUS} />)
      const headers = screen.getAllByRole("columnheader", { hidden: true })
      expect(headers[0]).toHaveAttribute("aria-label", "Monday")
      expect(headers[6]).toHaveAttribute("aria-label", "Sunday")
    })

    it("marks today", () => {
      render(<Calendar defaultMonth={new Date()} />)
      expect(document.querySelector("[data-today='true']")).toBeInTheDocument()
    })
  })

  describe("styling", () => {
    it("applies the base class and the default variant and radius to the root", () => {
      const { container } = render(<Calendar defaultMonth={january} />)
      expect(root(container)).toHaveClass("calendar", ...calendarStyles().split(" "))
    })

    it.each(["primary", "secondary", "outline", "outlineSolid", "ghost"] as const)(
      "applies the %s variant to the root",
      (variant) => {
        const { container } = render(<Calendar defaultMonth={january} variant={variant} />)
        expect(root(container)).toHaveClass(...calendarStyles({ variant }).split(" "))
      }
    )

    it.each(["none", "xs", "sm", "md", "lg", "full"] as const)("applies the rounded %s radius to the root", (rounded) => {
      const { container } = render(<Calendar defaultMonth={january} rounded={rounded} />)
      expect(root(container)).toHaveClass(...calendarStyles({ rounded }).split(" "))
    })

    it("appends the consumer className to the root", () => {
      const { container } = render(<Calendar defaultMonth={january} className="mine" />)
      expect(root(container)).toHaveClass("calendar", "mine")
    })

    it("applies the variant styling to the day buttons", () => {
      render(<Calendar defaultMonth={january} mode="single" variant="secondary" />)
      const cell = dayButton(/January 15th, 2025/).closest("td")!
      expect(cell).toHaveClass(...calendarDayStyles({ variant: "secondary" }).split(" "))
    })

    it("lets the consumer override the class of a calendar part", () => {
      render(<Calendar defaultMonth={january} mode="single" classNames={{ day: "my-day" }} />)
      expect(dayButton(/January 15th, 2025/).closest("td")).toHaveClass("my-day")
    })
  })

  describe("single selection", () => {
    it("calls onSelect with the clicked date", async () => {
      const user = userEvent.setup()
      const onSelect = vi.fn()
      render(<Calendar defaultMonth={january} mode="single" onSelect={onSelect} />)
      await user.click(dayButton(/January 15th, 2025/))
      expect(onSelect).toHaveBeenCalledTimes(1)
      const [selected] = onSelect.mock.calls[0]
      expect(selected).toBeInstanceOf(Date)
      expect(selected.getFullYear()).toBe(2025)
      expect(selected.getMonth()).toBe(0)
      expect(selected.getDate()).toBe(15)
    })

    it("marks the selected date as selected for assistive technology", () => {
      render(<Calendar defaultMonth={january} mode="single" selected={new Date(2025, 0, 10)} />)
      expect(dayButton(/January 10th, 2025/).closest("td")).toHaveAttribute("aria-selected", "true")
      expect(dayButton(/January 11th, 2025/).closest("td")).not.toHaveAttribute("aria-selected", "true")
    })

    it("selects with the keyboard", async () => {
      const user = userEvent.setup()
      const onSelect = vi.fn()
      render(<Calendar defaultMonth={january} mode="single" onSelect={onSelect} />)
      dayButton(/January 20th, 2025/).focus()
      await user.keyboard("{Enter}")
      expect(onSelect).toHaveBeenCalledTimes(1)
      expect(onSelect.mock.calls[0][0].getDate()).toBe(20)
    })

    it("moves focus between days with the arrow keys", async () => {
      const user = userEvent.setup()
      render(<Calendar defaultMonth={january} mode="single" />)
      dayButton(/January 20th, 2025/).focus()
      await user.keyboard("{ArrowRight}")
      expect(dayButton(/January 21st, 2025/)).toHaveFocus()
      await user.keyboard("{ArrowDown}")
      expect(dayButton(/January 28th, 2025/)).toHaveFocus()
    })
  })

  describe("multiple and range selection", () => {
    it("collects several dates in multiple mode", async () => {
      const user = userEvent.setup()
      const onSelect = vi.fn()
      render(<Calendar defaultMonth={january} mode="multiple" onSelect={onSelect} />)
      await user.click(dayButton(/January 5th, 2025/))
      expect(onSelect.mock.calls[0][0].map((d: Date) => d.getDate())).toEqual([5])
    })

    it("reports the start of a range on the first click", async () => {
      const user = userEvent.setup()
      const onSelect = vi.fn()
      render(<Calendar defaultMonth={january} mode="range" onSelect={onSelect} />)
      await user.click(dayButton(/January 6th, 2025/))
      const range: DateRange = onSelect.mock.calls[0][0]
      expect(range.from?.getDate()).toBe(6)
    })

    it("reports both ends of a range", async () => {
      const user = userEvent.setup()
      const onSelect = vi.fn()
      render(
        <Calendar
          defaultMonth={january}
          mode="range"
          selected={{ from: new Date(2025, 0, 6), to: undefined }}
          onSelect={onSelect}
        />
      )
      await user.click(dayButton(/January 9th, 2025/))
      const range: DateRange = onSelect.mock.calls[0][0]
      expect(range.from?.getDate()).toBe(6)
      expect(range.to?.getDate()).toBe(9)
    })
  })

  describe("navigation", () => {
    it("goes to the next and previous month with the navigation buttons", async () => {
      const user = userEvent.setup()
      render(<Calendar defaultMonth={january} />)
      await user.click(screen.getByRole("button", { name: /next month/i }))
      expect(screen.getByText("February 2025")).toBeInTheDocument()
      await user.click(screen.getByRole("button", { name: /previous month/i }))
      await user.click(screen.getByRole("button", { name: /previous month/i }))
      expect(screen.getByText("December 2024")).toBeInTheDocument()
    })

    it("reports the visible month through onMonthChange", async () => {
      const user = userEvent.setup()
      const onMonthChange = vi.fn()
      render(<Calendar defaultMonth={january} onMonthChange={onMonthChange} />)
      await user.click(screen.getByRole("button", { name: /next month/i }))
      expect(onMonthChange).toHaveBeenCalledTimes(1)
      expect(onMonthChange.mock.calls[0][0].getMonth()).toBe(1)
    })

    it("follows a controlled month", () => {
      const { rerender } = render(<Calendar month={january} />)
      expect(screen.getByText("January 2025")).toBeInTheDocument()
      rerender(<Calendar month={new Date(2025, 5, 1)} />)
      expect(screen.getByText("June 2025")).toBeInTheDocument()
    })
  })

  describe("disabled", () => {
    it("disables every day when disabled is true", async () => {
      const user = userEvent.setup()
      const onSelect = vi.fn()
      render(<Calendar defaultMonth={january} mode="single" disabled onSelect={onSelect} />)
      const buttons = within(screen.getByRole("grid")).getAllByRole("button")
      buttons.forEach((button) => expect(button).toBeDisabled())
      await user.click(buttons[10])
      expect(onSelect).not.toHaveBeenCalled()
    })

    it("dims the root and blocks pointer events when disabled", () => {
      const { container } = render(<Calendar defaultMonth={january} disabled />)
      expect(root(container)).toHaveClass("opacity-50", "pointer-events-none")
    })

    it("keeps the days enabled by default", () => {
      const { container } = render(<Calendar defaultMonth={january} mode="single" />)
      expect(dayButton(/January 15th, 2025/)).toBeEnabled()
      expect(root(container)).not.toHaveClass("pointer-events-none")
    })
  })

  describe("exports", () => {
    it("re-exports the date-fns locales for consumers", () => {
      expect(ptBR.code).toBe("pt-BR")
      expect(enUS.code).toBe("en-US")
    })
  })
})
