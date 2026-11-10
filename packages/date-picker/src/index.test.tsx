import { fireEvent, render, screen, waitFor, within } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { createRef } from "react"
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest"
import { ptBR } from "date-fns/locale"
import { DatePicker, datePickerLabelStyles } from "./index"

const today = new Date(2024, 0, 10, 12)

const input = () => screen.getByRole("textbox") as HTMLInputElement

const calendar = () => document.querySelector<HTMLElement>(".calendar")

const day = (name: RegExp | string) => screen.getByRole("button", { name })

const openCalendar = async (user: ReturnType<typeof userEvent.setup>) => {
  await user.click(input())
  await waitFor(() => expect(calendar()).toBeInTheDocument())
}

const expectClosed = () => waitFor(() => expect(calendar()).not.toBeInTheDocument())

const dayOf = (date: Date | null | undefined) => (date ? [date.getFullYear(), date.getMonth(), date.getDate()] : date)

beforeEach(() => {
  vi.useFakeTimers({ toFake: ["Date"] })
  vi.setSystemTime(today)
})

afterEach(() => {
  vi.useRealTimers()
})

describe("DatePicker", () => {
  describe("rendering", () => {
    it("renders an empty text input with the default placeholder and a calendar icon", () => {
      const { container } = render(<DatePicker />)
      expect(input()).toHaveValue("")
      expect(input()).toHaveAttribute("placeholder", "Select date...")
      expect(container.querySelector(".datePickerIcon svg")).toBeInTheDocument()
      expect(calendar()).not.toBeInTheDocument()
    })

    it("uses the given placeholder", () => {
      render(<DatePicker placeholder="Pick a date" />)
      expect(screen.getByPlaceholderText("Pick a date")).toBe(input())
    })

    it("renders a string label and uses it as the accessible name", () => {
      render(<DatePicker label="Birth date" />)
      expect(screen.getByText("Birth date")).toBeInTheDocument()
      expect(screen.getByRole("textbox", { name: "Birth date" })).toBeInTheDocument()
    })

    it("renders a ReactNode label and falls back to a generic accessible name", () => {
      render(<DatePicker label={<span data-testid="custom-label">Custom</span>} />)
      expect(screen.getByTestId("custom-label")).toBeInTheDocument()
      expect(screen.getByRole("textbox", { name: "Select date" })).toBeInTheDocument()
    })

    it("prefers an explicit aria-label over the label text", () => {
      render(<DatePicker label="Birth date" aria-label="Date of birth" />)
      expect(screen.getByRole("textbox", { name: "Date of birth" })).toBeInTheDocument()
    })

    it("links the description through aria-describedby", () => {
      render(
        <>
          <DatePicker aria-describedby="hint" />
          <p id="hint">Use your legal birth date</p>
        </>
      )
      expect(input()).toHaveAccessibleDescription("Use your legal birth date")
    })

    it("renders the error message", () => {
      render(<DatePicker error="Invalid date" />)
      expect(screen.getByText("Invalid date")).toBeInTheDocument()
    })

    it("appends the className on the root element", () => {
      const { container } = render(<DatePicker className="my-picker" />)
      expect(container.firstElementChild).toHaveClass("datePickerRoot", "my-picker")
    })

    it.each(["xs", "sm", "md", "lg", "xl"] as const)("applies the label fontSize %s", (fontSize) => {
      render(<DatePicker label="Label" fontSize={fontSize} />)
      expect(screen.getByText("Label")).toHaveClass(...datePickerLabelStyles({ fontSize }).split(" "))
    })

    it.each(["thin", "light", "normal", "medium", "bold", "extrabold"] as const)(
      "applies the label fontWeight %s",
      (fontWeight) => {
        render(<DatePicker label="Label" fontWeight={fontWeight} />)
        expect(screen.getByText("Label")).toHaveClass(`font-${fontWeight}`)
      }
    )

    it("forwards the ref to the input element", () => {
      let received: unknown = null
      render(<DatePicker ref={(node: unknown) => (received = node)} />)
      expect(received).toBe(input())
    })

    it("exposes its displayName", () => {
      expect(DatePicker.displayName).toBe("DatePicker")
    })
  })

  describe("native input props", () => {
    it("forwards id, name, required, autoComplete and data attributes to the input", () => {
      render(<DatePicker id="dob" name="birth" required autoComplete="bday" data-testid="dob-input" />)
      expect(input()).toHaveAttribute("id", "dob")
      expect(input()).toHaveAttribute("name", "birth")
      expect(input()).toBeRequired()
      expect(input()).toHaveAttribute("autocomplete", "bday")
      expect(screen.getByTestId("dob-input")).toBe(input())
    })

    it("calls the consumer onBlur", async () => {
      const user = userEvent.setup()
      const onBlur = vi.fn()
      render(<DatePicker onBlur={onBlur} />)
      await user.click(input())
      await user.tab()
      expect(onBlur).toHaveBeenCalled()
    })

    it("calls the consumer onFocus and still opens the calendar", async () => {
      const user = userEvent.setup()
      const onFocus = vi.fn()
      render(<DatePicker onFocus={onFocus} />)
      await user.click(input())
      expect(onFocus).toHaveBeenCalledTimes(1)
      await waitFor(() => expect(calendar()).toBeInTheDocument())
    })

    it("calls the consumer onClick", async () => {
      const user = userEvent.setup()
      const onClick = vi.fn()
      render(<DatePicker onClick={onClick} />)
      await user.click(input())
      expect(onClick).toHaveBeenCalledTimes(1)
    })

    it("does not let native props override the value or the type", () => {
      render(<DatePicker value={new Date(2024, 0, 15)} format="yyyy-MM-dd" type="number" />)
      expect(input()).toHaveAttribute("type", "text")
      expect(input()).toHaveValue("2024-01-15")
    })

    it("types the ref by the input element", () => {
      const ref = createRef<HTMLInputElement>()
      render(<DatePicker ref={ref} />)
      expect(ref.current).toBe(input())
      const wrong = createRef<HTMLDivElement>()
      // @ts-expect-error a div ref does not fit the rendered input
      render(<DatePicker ref={wrong} />)
      expect(wrong.current).not.toBeNull()
    })
  })

  describe("label", () => {
    it("is linked to the input by a generated id", async () => {
      const user = userEvent.setup()
      render(<DatePicker label="Birth date" />)
      const label = screen.getByText("Birth date")
      expect(label).toHaveAttribute("for", input().id)
      expect(input().id).not.toBe("")
      await user.click(label)
      expect(input()).toHaveFocus()
    })

    it("is linked to the input by the id given by the consumer", () => {
      render(<DatePicker label="Birth date" id="dob" />)
      expect(screen.getByText("Birth date")).toHaveAttribute("for", "dob")
      expect(input()).toHaveAttribute("id", "dob")
    })
  })

  describe("input styling", () => {
    it("applies variant, height and rounded to the input", () => {
      render(<DatePicker variant="outline" height="lg" rounded="full" />)
      expect(input()).toHaveClass("border-primary", "h-14", "rounded-full")
    })

    it("defaults to a medium height and rounded input", () => {
      render(<DatePicker />)
      expect(input()).toHaveClass("h-9", "rounded-md")
    })

    it("reserves room for the icon and for the clear button", () => {
      const { rerender } = render(<DatePicker value={today} />)
      expect(input()).toHaveClass("datePickerTrigger", "pr-10")
      rerender(<DatePicker value={today} allowClear />)
      expect(input()).toHaveClass("pr-16")
    })
  })

  describe("formatting", () => {
    it("formats with the default PP format", () => {
      render(<DatePicker value={new Date(2024, 0, 15)} />)
      expect(input()).toHaveValue("Jan 15, 2024")
    })

    it("formats with a custom format string", () => {
      render(<DatePicker value={new Date(2024, 0, 15)} format="yyyy-MM-dd" />)
      expect(input()).toHaveValue("2024-01-15")
    })

    it("formats with the given locale", () => {
      render(<DatePicker value={new Date(2024, 0, 15)} locale={ptBR} format="PPP" />)
      expect(input()).toHaveValue("15 de janeiro de 2024")
    })

    it("shows nothing for an invalid date", () => {
      render(<DatePicker value={new Date("invalid")} />)
      expect(input()).toHaveValue("")
    })

    it("reformats when the format changes", () => {
      const { rerender } = render(<DatePicker value={new Date(2024, 0, 15)} format="yyyy-MM-dd" />)
      rerender(<DatePicker value={new Date(2024, 0, 15)} format="dd/MM/yyyy" />)
      expect(input()).toHaveValue("15/01/2024")
    })
  })

  describe("controlled mode", () => {
    it("shows the value and follows the parent", () => {
      const { rerender } = render(<DatePicker value={new Date(2024, 0, 15)} format="yyyy-MM-dd" />)
      expect(input()).toHaveValue("2024-01-15")
      rerender(<DatePicker value={new Date(2024, 4, 2)} format="yyyy-MM-dd" />)
      expect(input()).toHaveValue("2024-05-02")
      rerender(<DatePicker value={null} format="yyyy-MM-dd" />)
      expect(input()).toHaveValue("")
    })

    it("reports a calendar selection as a day-normalized Date and leaves the display to the parent", async () => {
      const user = userEvent.setup()
      const onChange = vi.fn()
      render(<DatePicker value={null} onChange={onChange} />)
      await openCalendar(user)
      await user.click(day(/January 15th, 2024/))
      expect(onChange).toHaveBeenCalledTimes(1)
      const [selected] = onChange.mock.calls[0]
      expect(dayOf(selected)).toEqual([2024, 0, 15])
      expect(selected.getHours()).toBe(0)
      expect(selected.getMinutes()).toBe(0)
      expect(input()).toHaveValue("")
    })

    it("works without an onChange handler", async () => {
      const user = userEvent.setup()
      render(<DatePicker value={null} />)
      await openCalendar(user)
      await user.click(day(/January 15th, 2024/))
      await expectClosed()
    })

    it("marks the current value as selected in the calendar", async () => {
      const user = userEvent.setup()
      render(<DatePicker value={new Date(2024, 0, 15)} />)
      await openCalendar(user)
      expect(day(/January 15th, 2024/).closest("td")).toHaveAttribute("aria-selected", "true")
    })
  })

  describe("uncontrolled mode", () => {
    it("reports a calendar selection and keeps it in its own state", async () => {
      const user = userEvent.setup()
      const onChange = vi.fn()
      render(<DatePicker defaultValue={new Date(2024, 0, 5)} onChange={onChange} format="yyyy-MM-dd" />)
      await openCalendar(user)
      await user.click(day(/January 15th, 2024/))
      expect(onChange).toHaveBeenCalledTimes(1)
      expect(dayOf(onChange.mock.calls[0][0])).toEqual([2024, 0, 15])
      expect(input()).toHaveValue("2024-01-15")
    })

    it("reports a typed date", () => {
      const onChange = vi.fn()
      render(<DatePicker defaultValue={new Date(2024, 0, 5)} onChange={onChange} format="MM/dd/yyyy" />)
      fireEvent.change(input(), { target: { value: "03/04/2024" } })
      expect(onChange).toHaveBeenCalledTimes(1)
      expect(dayOf(onChange.mock.calls[0][0])).toEqual([2024, 2, 4])
    })

    it("reports null when the text is erased", async () => {
      const user = userEvent.setup()
      const onChange = vi.fn()
      render(<DatePicker defaultValue={new Date(2024, 0, 15)} onChange={onChange} format="MM/dd/yyyy" />)
      await user.clear(input())
      expect(onChange).toHaveBeenCalledWith(null)
      expect(input()).toHaveValue("")
    })

    it("reports null from the clear button", async () => {
      const user = userEvent.setup()
      const onChange = vi.fn()
      render(<DatePicker defaultValue={new Date(2024, 0, 15)} onChange={onChange} allowClear />)
      await user.click(screen.getByRole("button", { name: "Clear date" }))
      expect(onChange).toHaveBeenCalledTimes(1)
      expect(onChange).toHaveBeenCalledWith(null)
      expect(input()).toHaveValue("")
    })

    it("starts from defaultValue", () => {
      render(<DatePicker defaultValue={new Date(2024, 0, 15)} format="yyyy-MM-dd" />)
      expect(input()).toHaveValue("2024-01-15")
    })

    it("keeps the selection in its own state and shows it", async () => {
      const user = userEvent.setup()
      render(<DatePicker format="yyyy-MM-dd" />)
      await openCalendar(user)
      await user.click(day(/January 15th, 2024/))
      expect(input()).toHaveValue("2024-01-15")
    })

    it("selects with the keyboard from the calendar", async () => {
      const user = userEvent.setup()
      render(<DatePicker format="yyyy-MM-dd" />)
      await openCalendar(user)
      day(/January 20th, 2024/).focus()
      await user.keyboard("{Enter}")
      expect(input()).toHaveValue("2024-01-20")
    })
  })

  describe("popover", () => {
    it("starts closed and opens when the input is clicked", async () => {
      const user = userEvent.setup()
      render(<DatePicker />)
      expect(calendar()).not.toBeInTheDocument()
      await openCalendar(user)
      expect(screen.getByRole("grid")).toBeInTheDocument()
    })

    it("closes after a date is picked", async () => {
      const user = userEvent.setup()
      render(<DatePicker />)
      await openCalendar(user)
      await user.click(day(/January 15th, 2024/))
      await expectClosed()
    })

    it("closes with Escape", async () => {
      const user = userEvent.setup()
      render(<DatePicker />)
      await openCalendar(user)
      await user.keyboard("{Escape}")
      await expectClosed()
    })

    it("closes when clicking outside", async () => {
      const user = userEvent.setup()
      render(
        <>
          <button>Outside</button>
          <DatePicker />
        </>
      )
      await openCalendar(user)
      await user.click(screen.getByRole("button", { name: "Outside" }))
      await expectClosed()
    })

    it("stays open when the input is clicked again", async () => {
      const user = userEvent.setup()
      render(<DatePicker />)
      await openCalendar(user)
      await user.click(input())
      await user.click(input())
      expect(calendar()).toBeInTheDocument()
      expect(input()).toHaveAttribute("aria-expanded", "true")
    })

    it("opens when the input receives focus from the keyboard", async () => {
      const user = userEvent.setup()
      render(<DatePicker />)
      await user.tab()
      expect(input()).toHaveFocus()
      await waitFor(() => expect(calendar()).toBeInTheDocument())
      expect(input()).toHaveFocus()
    })

    it("keeps the typing focus on the input after the calendar opens", async () => {
      const user = userEvent.setup()
      render(<DatePicker format="MM/dd/yyyy" />)
      await openCalendar(user)
      await user.type(input(), "01/15/2024")
      expect(input()).toHaveValue("01/15/2024")
    })

    it("opens and closes from the calendar button", async () => {
      const user = userEvent.setup()
      render(<DatePicker />)
      await user.click(screen.getByRole("button", { name: "Open calendar" }))
      await waitFor(() => expect(calendar()).toBeInTheDocument())
      await user.click(screen.getByRole("button", { name: "Open calendar" }))
      await expectClosed()
    })

    it("does not open from a disabled calendar button", async () => {
      const user = userEvent.setup()
      render(<DatePicker disabled />)
      const button = screen.getByRole("button", { name: "Open calendar" })
      expect(button).toBeDisabled()
      await user.click(button)
      expect(calendar()).not.toBeInTheDocument()
    })

    it("closes when clicking outside after being opened by the calendar button", async () => {
      const user = userEvent.setup()
      render(
        <>
          <button>Outside</button>
          <DatePicker />
        </>
      )
      await user.click(screen.getByRole("button", { name: "Open calendar" }))
      await waitFor(() => expect(calendar()).toBeInTheDocument())
      await user.click(screen.getByRole("button", { name: "Outside" }))
      await expectClosed()
    })

    it("puts the popup semantics on the input and not on its container", async () => {
      const user = userEvent.setup()
      const { container } = render(<DatePicker />)
      expect(input()).toHaveAttribute("aria-haspopup", "dialog")
      expect(input()).toHaveAttribute("aria-expanded", "false")
      await openCalendar(user)
      expect(input()).toHaveAttribute("aria-expanded", "true")
      expect(screen.getByRole("dialog")).toHaveAttribute("id", input().getAttribute("aria-controls"))
      const wrapper = container.querySelector(".datePickerTriggerContainer")!
      expect(wrapper).not.toHaveAttribute("aria-haspopup")
      expect(wrapper).not.toHaveAttribute("aria-expanded")
      expect(wrapper).not.toHaveAttribute("type")
    })

    it("renders the calendar button as a non-submitting named button", () => {
      render(<DatePicker />)
      const button = screen.getByRole("button", { name: "Open calendar" })
      expect(button).toHaveAttribute("type", "button")
      expect(button).toHaveClass("datePickerIcon")
    })

    it("opens the calendar on the month of the current value", async () => {
      const user = userEvent.setup()
      render(<DatePicker value={new Date(2023, 5, 15)} />)
      await openCalendar(user)
      expect(within(calendar()!).getByText(/June 2023/)).toBeInTheDocument()
    })

    it("opens the calendar on the month of the default value", async () => {
      const user = userEvent.setup()
      render(<DatePicker defaultValue={new Date(2023, 5, 15)} />)
      await openCalendar(user)
      expect(within(calendar()!).getByText(/June 2023/)).toBeInTheDocument()
    })

    it("opens the calendar on the current month when there is no value", async () => {
      const user = userEvent.setup()
      render(<DatePicker />)
      await openCalendar(user)
      expect(within(calendar()!).getByText(/January 2024/)).toBeInTheDocument()
    })

    it("renders the calendar in a portal by default", async () => {
      const user = userEvent.setup()
      const { container } = render(<DatePicker />)
      await openCalendar(user)
      expect(container).not.toContainElement(calendar())
    })

    it("renders the calendar next to the input when withPortal is false", async () => {
      const user = userEvent.setup()
      const { container } = render(<DatePicker withPortal={false} format="yyyy-MM-dd" />)
      await openCalendar(user)
      expect(container).toContainElement(calendar())
      await user.click(day(/January 15th, 2024/))
      expect(input()).toHaveValue("2024-01-15")
      await expectClosed()
    })

    it("passes the calendar variant and radius to the calendar", async () => {
      const user = userEvent.setup()
      render(<DatePicker calendarVariant="ghost" calendarRounded="lg" />)
      await openCalendar(user)
      expect(calendar()).toHaveClass("bg-transparent", "border-transparent", "rounded-xl")
    })

    it("uses the given locale in the calendar", async () => {
      const user = userEvent.setup()
      render(<DatePicker locale={ptBR} />)
      await openCalendar(user)
      expect(within(calendar()!).getByText(/janeiro 2024/i)).toBeInTheDocument()
    })
  })

  describe("validation", () => {
    it("disables days before minDate and keeps the others selectable", async () => {
      const user = userEvent.setup()
      render(<DatePicker minDate={new Date(2024, 0, 10)} />)
      await openCalendar(user)
      expect(day(/January 9th, 2024/)).toBeDisabled()
      expect(day(/January 10th, 2024/)).toBeEnabled()
      expect(day(/January 11th, 2024/)).toBeEnabled()
    })

    it("disables days after maxDate and keeps the others selectable", async () => {
      const user = userEvent.setup()
      render(<DatePicker maxDate={new Date(2024, 0, 20)} />)
      await openCalendar(user)
      expect(day(/January 20th, 2024/)).toBeEnabled()
      expect(day(/January 21st, 2024/)).toBeDisabled()
    })

    it("disables the listed dates", async () => {
      const user = userEvent.setup()
      render(<DatePicker disabledDates={[new Date(2024, 0, 10), new Date(2024, 0, 15)]} />)
      await openCalendar(user)
      expect(day(/January 10th, 2024/)).toBeDisabled()
      expect(day(/January 15th, 2024/)).toBeDisabled()
      expect(day(/January 11th, 2024/)).toBeEnabled()
    })

    it("disables the dates matched by a predicate", async () => {
      const user = userEvent.setup()
      render(<DatePicker disabledDates={(date) => date.getDay() === 0 || date.getDay() === 6} />)
      await openCalendar(user)
      expect(day(/Saturday, January 13th, 2024/)).toBeDisabled()
      expect(day(/Sunday, January 14th, 2024/)).toBeDisabled()
      expect(day(/Monday, January 15th, 2024/)).toBeEnabled()
    })

    it("combines the range and the disabled dates", async () => {
      const user = userEvent.setup()
      render(
        <DatePicker minDate={new Date(2024, 0, 5)} maxDate={new Date(2024, 0, 25)} disabledDates={[new Date(2024, 0, 15)]} />
      )
      await openCalendar(user)
      expect(day(/January 4th, 2024/)).toBeDisabled()
      expect(day(/January 26th, 2024/)).toBeDisabled()
      expect(day(/January 15th, 2024/)).toBeDisabled()
      expect(day(/January 16th, 2024/)).toBeEnabled()
    })

    it("does not report a click on a disabled day", async () => {
      const user = userEvent.setup()
      const onChange = vi.fn()
      render(<DatePicker value={null} onChange={onChange} minDate={new Date(2024, 0, 10)} />)
      await openCalendar(user)
      await user.click(day(/January 9th, 2024/))
      expect(onChange).not.toHaveBeenCalled()
      expect(calendar()).toBeInTheDocument()
    })
  })

  describe("manual input", () => {
    it("reports a typed date that matches the format", () => {
      const onChange = vi.fn()
      render(<DatePicker value={null} onChange={onChange} format="MM/dd/yyyy" />)
      fireEvent.change(input(), { target: { value: "01/15/2024" } })
      expect(onChange).toHaveBeenCalledTimes(1)
      expect(dayOf(onChange.mock.calls[0][0])).toEqual([2024, 0, 15])
    })

    it("keeps the typed text visible while the parent has not updated", () => {
      render(<DatePicker value={null} format="MM/dd/yyyy" />)
      fireEvent.change(input(), { target: { value: "01/15/2024" } })
      expect(input()).toHaveValue("01/15/2024")
    })

    it("accepts a typed date in uncontrolled mode", () => {
      render(<DatePicker format="MM/dd/yyyy" />)
      fireEvent.change(input(), { target: { value: "03/04/2024" } })
      expect(input()).toHaveValue("03/04/2024")
    })

    it("does not report text that is not a date", async () => {
      const user = userEvent.setup()
      const onChange = vi.fn()
      render(<DatePicker value={null} onChange={onChange} format="MM/dd/yyyy" />)
      await user.type(input(), "invalid")
      expect(onChange).not.toHaveBeenCalled()
      expect(input()).toHaveValue("invalid")
    })

    it("does not report a typed date that is disabled", () => {
      const onChange = vi.fn()
      render(<DatePicker value={null} onChange={onChange} format="MM/dd/yyyy" minDate={new Date(2024, 0, 10)} />)
      fireEvent.change(input(), { target: { value: "01/05/2024" } })
      expect(onChange).not.toHaveBeenCalled()
    })

    it("reports null when the text is erased in controlled mode", () => {
      const onChange = vi.fn()
      render(<DatePicker value={new Date(2024, 0, 15)} onChange={onChange} format="MM/dd/yyyy" />)
      fireEvent.change(input(), { target: { value: "" } })
      expect(onChange).toHaveBeenCalledWith(null)
    })

    it("reports a single day while a full date is typed key by key in controlled mode", async () => {
      const user = userEvent.setup()
      const onChange = vi.fn()
      render(<DatePicker value={null} onChange={onChange} format="MM/dd/yyyy" />)
      await user.type(input(), "01/15/2024")
      expect(onChange).toHaveBeenCalledTimes(1)
      expect(dayOf(onChange.mock.calls[0][0])).toEqual([2024, 0, 15])
      expect(input()).toHaveValue("01/15/2024")
    })

    it("does not reformat the text while a full date is typed key by key in uncontrolled mode", async () => {
      const user = userEvent.setup()
      const onChange = vi.fn()
      render(<DatePicker onChange={onChange} format="MM/dd/yyyy" />)
      await user.type(input(), "01/15/2024")
      expect(input()).toHaveValue("01/15/2024")
      expect(onChange).toHaveBeenCalledTimes(1)
      expect(dayOf(onChange.mock.calls[0][0])).toEqual([2024, 0, 15])
    })

    it("ignores text that parses but is not written exactly in the format", () => {
      const onChange = vi.fn()
      render(<DatePicker value={null} onChange={onChange} format="MM/dd/yyyy" />)
      fireEvent.change(input(), { target: { value: "1/5/2024" } })
      expect(onChange).not.toHaveBeenCalled()
      expect(input()).toHaveValue("1/5/2024")
    })

    it("clears the date when the text is erased in uncontrolled mode", async () => {
      const user = userEvent.setup()
      render(<DatePicker defaultValue={new Date(2024, 0, 15)} format="MM/dd/yyyy" allowClear />)
      await user.clear(input())
      expect(input()).toHaveValue("")
      expect(screen.queryByRole("button", { name: "Clear date" })).not.toBeInTheDocument()
    })

    it("parses with the locale", () => {
      const onChange = vi.fn()
      render(<DatePicker value={null} onChange={onChange} format="PPP" locale={ptBR} />)
      fireEvent.change(input(), { target: { value: "15 de janeiro de 2024" } })
      expect(dayOf(onChange.mock.calls.at(-1)?.[0])).toEqual([2024, 0, 15])
    })
  })

  describe("clear button", () => {
    it("is hidden unless allowClear is set and there is a date", () => {
      const { rerender } = render(<DatePicker value={today} />)
      expect(screen.queryByRole("button", { name: "Clear date" })).not.toBeInTheDocument()
      rerender(<DatePicker value={null} allowClear />)
      expect(screen.queryByRole("button", { name: "Clear date" })).not.toBeInTheDocument()
      rerender(<DatePicker value={today} allowClear />)
      expect(screen.getByRole("button", { name: "Clear date" })).toBeInTheDocument()
    })

    it("replaces the calendar icon while visible", () => {
      const { container } = render(<DatePicker value={today} allowClear />)
      expect(container.querySelector(".datePickerIcon")).not.toBeInTheDocument()
    })

    it("reports null in controlled mode without opening the calendar", async () => {
      const user = userEvent.setup()
      const onChange = vi.fn()
      render(<DatePicker value={new Date(2024, 0, 15)} onChange={onChange} allowClear />)
      await user.click(screen.getByRole("button", { name: "Clear date" }))
      expect(onChange).toHaveBeenCalledWith(null)
      expect(onChange).toHaveBeenCalledTimes(1)
      expect(calendar()).not.toBeInTheDocument()
    })

    it("empties the input in uncontrolled mode and brings the icon back", async () => {
      const user = userEvent.setup()
      const { container } = render(<DatePicker defaultValue={new Date(2024, 0, 15)} allowClear />)
      expect(input()).toHaveValue("Jan 15, 2024")
      await user.click(screen.getByRole("button", { name: "Clear date" }))
      expect(input()).toHaveValue("")
      expect(container.querySelector(".datePickerIcon")).toBeInTheDocument()
    })

    it("is not part of the tab order", () => {
      render(<DatePicker value={today} allowClear />)
      expect(screen.getByRole("button", { name: "Clear date" })).toHaveAttribute("tabindex", "-1")
    })
  })

  describe("disabled", () => {
    it("disables the input and does not open the calendar", async () => {
      const user = userEvent.setup()
      render(<DatePicker disabled />)
      expect(input()).toBeDisabled()
      await user.click(input())
      expect(calendar()).not.toBeInTheDocument()
    })

    it("hides the clear button even with a date and allowClear", () => {
      render(<DatePicker disabled value={today} allowClear />)
      expect(screen.queryByRole("button", { name: "Clear date" })).not.toBeInTheDocument()
      expect(input()).toHaveValue("Jan 10, 2024")
    })

    it("is skipped when tabbing", async () => {
      const user = userEvent.setup()
      render(<DatePicker disabled />)
      await user.tab()
      expect(input()).not.toHaveFocus()
    })
  })
})
