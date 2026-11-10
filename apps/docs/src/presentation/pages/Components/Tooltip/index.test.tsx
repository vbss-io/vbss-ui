import { screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { describe, expect, it } from "vitest"

import { renderWithTheme } from "@/test-support/render-with-theme"

import { TooltipDocs } from "."

describe("TooltipDocs", () => {
  it("opens a tooltip of the provider demo on hover", async () => {
    renderWithTheme(<TooltipDocs />)
    expect(screen.queryByText("First tooltip")).not.toBeInTheDocument()
    await userEvent.hover(screen.getByRole("button", { name: "First" }))
    expect((await screen.findAllByText("First tooltip")).length).toBeGreaterThan(0)
  })

  it("documents the provider and the migration of the trigger", () => {
    renderWithTheme(<TooltipDocs />)
    expect(screen.getByRole("heading", { name: "Delay and Provider" })).toBeInTheDocument()
    expect(screen.getByRole("heading", { name: "Migration" })).toBeInTheDocument()
    expect(screen.getByText(/it becomes the trigger itself and must be focusable: use a/)).toBeInTheDocument()
  })
})
