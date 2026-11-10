import { screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { describe, expect, it } from "vitest"

import { renderWithTheme } from "@/test-support/render-with-theme"

import { PopoverDocs } from "."

describe("PopoverDocs", () => {
  it("opens and closes the controlled popover from the page state", async () => {
    renderWithTheme(<PopoverDocs />)
    expect(screen.getByText("The popover is closed")).toBeInTheDocument()
    await userEvent.click(screen.getByRole("button", { name: "Controlled popover" }))
    expect(screen.getByText("The popover is open")).toBeInTheDocument()
    await userEvent.click(await screen.findByRole("button", { name: "Close popover" }))
    expect(screen.getByText("The popover is closed")).toBeInTheDocument()
    expect(screen.queryByRole("button", { name: "Close popover" })).not.toBeInTheDocument()
  })

  it("documents the migration of the trigger", () => {
    renderWithTheme(<PopoverDocs />)
    expect(screen.getByRole("heading", { name: "Migration" })).toBeInTheDocument()
    expect(screen.getByText(/it becomes the trigger itself and must be focusable: use a/)).toBeInTheDocument()
  })
})
