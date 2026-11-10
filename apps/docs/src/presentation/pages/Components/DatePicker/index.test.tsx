import { act, screen, within } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest"

import { DatePickerDocs } from "."
import { freezeToday, pickDay } from "@/test-support/calendar"
import { renderWithTheme } from "@/test-support/render-with-theme"

const selectedBox = (input: HTMLElement) => input.closest(".datePickerRoot")!.parentElement as HTMLElement

describe("DatePickerDocs", () => {
  beforeEach(() => {
    const original = Date.prototype.toLocaleDateString
    vi.spyOn(Date.prototype, "toLocaleDateString").mockImplementation(function (this: Date, locales, options) {
      return original.call(this, locales ?? "en-US", options)
    })
    freezeToday()
  })

  afterEach(() => {
    vi.restoreAllMocks()
    vi.useRealTimers()
  })

  it("selects a date from the calendar popup, shows it and clears it", async () => {
    renderWithTheme(<DatePickerDocs />)
    const input = screen.getByRole("textbox", { name: "Data de Nascimento" })
    expect(selectedBox(input)).not.toHaveTextContent("Selected:")
    await userEvent.click(input)
    await pickDay(document.body, "2026-11-20")
    expect(selectedBox(input)).toHaveTextContent("Selected: 20/11/2026")
    expect(input).toHaveValue("20 nov 2026")
    await userEvent.click(screen.getAllByRole("button", { name: "Clear date" })[0])
    expect(selectedBox(input)).not.toHaveTextContent("Selected:")
    expect(input).toHaveValue("")
  })

  it("starts the controlled picker on today and follows typed dates and emptiness", async () => {
    renderWithTheme(<DatePickerDocs />)
    const input = screen.getAllByRole("textbox", { name: "Select Date" })[0]
    expect(selectedBox(input)).toHaveTextContent("Selected: 09/11/2026")
    await userEvent.clear(input)
    expect(selectedBox(input)).not.toHaveTextContent("Selected:")
    await userEvent.type(input, "Dec 25, 2026")
    expect(selectedBox(input)).toHaveTextContent("Selected: 25/12/2026")
  })

  it("parses typed dates in the pt-BR locale picker", async () => {
    renderWithTheme(<DatePickerDocs />)
    const input = screen.getByRole("textbox", { name: "Selecione uma data" })
    await userEvent.type(input, "5 dez 2026")
    expect(selectedBox(input)).toHaveTextContent("Selected: 05/12/2026")
  })

  it("only accepts dates inside the validation window", async () => {
    renderWithTheme(<DatePickerDocs />)
    const input = screen.getByRole("textbox", { name: "Select Date (next 7-30 days)" })
    await userEvent.type(input, "Jan 1, 2020")
    expect(selectedBox(input)).not.toHaveTextContent("Selected:")
    await userEvent.clear(input)
    await userEvent.type(input, "Nov 20, 2026")
    expect(selectedBox(input)).toHaveTextContent("Selected: 20/11/2026")
  })

  it("keeps the fixed demos usable by typing a date into each of them", async () => {
    renderWithTheme(<DatePickerDocs />)
    const names = [
      "Small height",
      "Medium height",
      "Large height",
      "Select appointment date",
      "Custom styled date picker",
      "Custom styled",
    ]
    const inputs = [
      ...names.map((name) => screen.getByRole("textbox", { name })),
      ...screen.getAllByRole("textbox", { name: "Select date" }),
    ]
    for (const input of inputs) {
      await userEvent.type(input, "Dec 1, 2026")
      expect(input).toHaveValue("Dec 1, 2026")
    }
  })

  it("rewrites the interactive example code when a variant is picked", async () => {
    renderWithTheme(<DatePickerDocs />)
    const code = () => document.body.textContent ?? ""
    expect(code()).toContain("variant='primary'")
    const container = screen.getAllByRole("button", { name: "ghost" })[0].parentElement as HTMLElement
    await userEvent.click(within(container).getByRole("button", { name: "ghost" }))
    expect(code()).toContain("variant='ghost'")
    expect(code()).toContain("calendarVariant='primary'")
    await userEvent.click(screen.getAllByRole("button", { name: "outline" })[1])
    expect(code()).toContain("calendarVariant='outline'")
  })

  it("opens the calendar by click, ArrowDown or the icon button but not by focus, as documented", async () => {
    renderWithTheme(<DatePickerDocs />)
    const input = screen.getByRole("textbox", { name: "Data de Nascimento" })
    act(() => input.focus())
    expect(screen.queryByRole("grid")).not.toBeInTheDocument()
    await userEvent.keyboard("{ArrowDown}")
    expect(await screen.findByRole("grid")).toBeInTheDocument()
    expect(document.activeElement?.closest("td")).not.toBeNull()
    await userEvent.keyboard("{Escape}")
    expect(screen.queryByRole("grid")).not.toBeInTheDocument()
    expect(input).toHaveFocus()
    await userEvent.click(input)
    expect(await screen.findByRole("grid")).toBeInTheDocument()
    expect(input).toHaveFocus()
    await userEvent.click(input)
    expect(screen.getByRole("grid")).toBeInTheDocument()
    await userEvent.keyboard("{Escape}")
    const iconButton = within(input.closest(".datePickerTriggerContainer") as HTMLElement).getByRole("button", {
      name: "Open calendar",
    })
    await userEvent.click(iconButton)
    expect(await screen.findByRole("grid")).toBeInTheDocument()
    await userEvent.click(iconButton)
    expect(screen.queryByRole("grid")).not.toBeInTheDocument()
  })

  it("links the label to the input and exposes the popup state in the demo", async () => {
    renderWithTheme(<DatePickerDocs />)
    const input = screen.getByRole("textbox", { name: "Data de Nascimento" })
    expect(input).toHaveAttribute("aria-haspopup", "dialog")
    expect(input).toHaveAttribute("aria-expanded", "false")
    const label = document.querySelector<HTMLElement>(`label[for="${input.id}"]`)!
    expect(label).toHaveTextContent("Data de Nascimento")
    await userEvent.click(label)
    expect(input).toHaveFocus()
  })

  it("documents opening, typing and the uncontrolled onChange", () => {
    renderWithTheme(<DatePickerDocs />)
    expect(screen.getByRole("heading", { name: "Opening and Typing" })).toBeInTheDocument()
    expect(screen.getByText(/It does not open on focus, so/)).toHaveTextContent("opens when you click the input")
    expect(screen.getByText(/four digit/, { selector: "p" })).toBeInTheDocument()
    expect(screen.getByText(/is also called in/)).toHaveTextContent("uncontrolled mode")
  })
})
