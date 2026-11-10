import { screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest"

import { CalendarDocs } from "."
import { dayButton, freezeToday, pickDay } from "@/test-support/calendar"
import { renderWithTheme } from "@/test-support/render-with-theme"

const sectionOf = (title: string) => screen.getByText(title).parentElement as HTMLElement

describe("CalendarDocs", () => {
  beforeEach(() => {
    freezeToday()
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  it("starts with today selected and updates the selected date when another day is picked", async () => {
    renderWithTheme(<CalendarDocs />)
    const demo = sectionOf("Select a Date")
    expect(demo).toHaveTextContent("Selected: 09/11/2026")
    await pickDay(demo, "2026-11-20")
    expect(demo).toHaveTextContent("Selected: 20/11/2026")
  })

  it("shares the single selection between the main demo and the selection modes demo", async () => {
    renderWithTheme(<CalendarDocs />)
    await pickDay(sectionOf("Select a Single Date"), "2026-11-12")
    expect(sectionOf("Select a Date")).toHaveTextContent("Selected: 12/11/2026")
  })

  it("collects several dates in multiple mode", async () => {
    renderWithTheme(<CalendarDocs />)
    const demo = sectionOf("Select Multiple Dates")
    expect(demo).not.toHaveTextContent("Selected Dates")
    await pickDay(demo, "2026-11-03")
    await pickDay(demo, "2026-11-04")
    expect(demo).toHaveTextContent("Selected Dates: 2 date(s) - 03/11/2026, 04/11/2026")
    await pickDay(demo, "2026-11-03")
    expect(demo).toHaveTextContent("Selected Dates: 1 date(s) - 04/11/2026")
  })

  it("shows the picked range", async () => {
    renderWithTheme(<CalendarDocs />)
    const demo = sectionOf("Select a Date Range")
    expect(demo).not.toHaveTextContent("Selected Range")
    await pickDay(demo, "2026-11-10")
    expect(demo).toHaveTextContent("Selected Range: 10/11/2026 (select end date)")
    await pickDay(demo, "2026-11-14")
    expect(demo).toHaveTextContent("Selected Range: 10/11/2026 - 14/11/2026")
  })

  it("lets the static demos be clicked without changing their fixed selection", async () => {
    const { container } = renderWithTheme(<CalendarDocs />)
    const grids = Array.from(container.querySelectorAll<HTMLElement>("[role=grid]"))
    const hasTitle = (grid: HTMLElement) => {
      for (let node = grid.parentElement; node && node !== document.body; node = node.parentElement) {
        if (node.querySelector(":scope > h2")?.textContent?.startsWith("Select")) return true
      }
      return false
    }
    const fixed = grids.filter((grid) => !hasTitle(grid))
    expect(fixed.length).toBeGreaterThan(5)
    for (const grid of fixed) {
      if (dayButton(grid, "2026-11-25").disabled) continue
      await userEvent.click(dayButton(grid, "2026-11-25"))
      expect(dayButton(grid, "2026-11-09").closest("td")).toHaveAttribute("aria-selected", "true")
      expect(dayButton(grid, "2026-11-25").closest("td")).not.toHaveAttribute("aria-selected", "true")
    }
  })

  it("switches the variant and rounding of the interactive demos together with their code", async () => {
    renderWithTheme(<CalendarDocs />)
    await userEvent.click(screen.getAllByRole("button", { name: "outline" })[0])
    await userEvent.click(screen.getAllByRole("button", { name: "Show Code" })[0])
    expect(screen.getByRole("button", { name: "Hide Code" })).toBeInTheDocument()
    await userEvent.click(screen.getAllByRole("button", { name: "full" })[0])
    expect(screen.getAllByRole("button", { name: "full" })[0].className).toContain("primary")
  })
})
