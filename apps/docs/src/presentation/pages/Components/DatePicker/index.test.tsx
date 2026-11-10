import { screen, within } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest"

import { DatePickerDocs } from "."
import { freezeToday, pickDay } from "@/test-support/calendar"
import { renderWithTheme } from "@/test-support/render-with-theme"

const selectedBox = (input: HTMLElement) => input.closest(".datePickerRoot")!.parentElement as HTMLElement

describe("DatePickerDocs", () => {
  beforeEach(() => {
    freezeToday()
  })

  afterEach(() => {
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
    expect(selectedBox(input)).toHaveTextContent(`Selected: ${new Date(2026, 10, 9).toLocaleDateString()}`)
    await userEvent.clear(input)
    expect(selectedBox(input)).not.toHaveTextContent("Selected:")
    await userEvent.type(input, "Dec 25, 2026")
    expect(selectedBox(input)).toHaveTextContent(`Selected: ${new Date(2026, 11, 25).toLocaleDateString()}`)
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
    expect(selectedBox(input)).toHaveTextContent(`Selected: ${new Date(2026, 10, 20).toLocaleDateString()}`)
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
})
