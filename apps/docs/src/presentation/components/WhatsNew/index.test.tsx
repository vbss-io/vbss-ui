import { screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { renderWithTheme } from "@/test-support/render-with-theme"
import { describe, expect, it } from "vitest"

import { WhatsNew } from "."

const entries = [
  { version: "2.0.0", date: "2025-02-01", changes: ["Added dark mode", "Fixed focus ring"] },
  { version: "1.0.0", date: "2025-01-01", changes: ["First release"] },
]

describe("WhatsNew", () => {
  it("renders nothing without entries", () => {
    const { container } = renderWithTheme(<WhatsNew />)
    expect(container).toBeEmptyDOMElement()
  })

  it("shows the title with the latest version and opens the changelog dialog", async () => {
    renderWithTheme(<WhatsNew title="Recent" entries={entries} />)
    expect(screen.getByText("Recent")).toBeInTheDocument()
    expect(screen.getByText("v2.0.0")).toBeInTheDocument()
    expect(screen.queryByText("First release")).not.toBeInTheDocument()
    await userEvent.click(screen.getByText("Recent"))
    expect(await screen.findByText("Added dark mode")).toBeInTheDocument()
    expect(screen.getByText("Fixed focus ring")).toBeInTheDocument()
    expect(screen.getByText("First release")).toBeInTheDocument()
    expect(screen.getByText("2025-01-01")).toBeInTheDocument()
    expect(screen.getByText("Recent updates and improvements")).toBeInTheDocument()
  })

  it("uses the default title", () => {
    renderWithTheme(<WhatsNew entries={entries} />)
    expect(screen.getByText("What's new")).toBeInTheDocument()
  })

  it("is a real button that Tab reaches and Enter activates to open the dialog", async () => {
    renderWithTheme(<WhatsNew title="Recent" entries={entries} />)
    await userEvent.tab()
    const trigger = screen.getByRole("button", { name: /Recent/ })
    expect(trigger.tagName).toBe("BUTTON")
    expect(trigger).toHaveFocus()
    await userEvent.keyboard("{Enter}")
    expect(await screen.findByRole("dialog")).toBeInTheDocument()
    expect(screen.getByText("Added dark mode")).toBeInTheDocument()
  })
})
