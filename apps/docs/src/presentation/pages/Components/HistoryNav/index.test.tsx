import { screen } from "@testing-library/react"
import { describe, expect, it } from "vitest"

import { renderWithTheme } from "@/test-support/render-with-theme"

import { HistoryNavDocs } from "."

describe("HistoryNavDocs", () => {
  it("names the buttons from the side props in the accessible names demo", () => {
    renderWithTheme(<HistoryNavDocs />)
    expect(screen.getByRole("button", { name: "Previous page" })).toBeInTheDocument()
    expect(screen.getByRole("button", { name: "Next page" })).toBeInTheDocument()
  })

  it("keeps the default names in the other demos", () => {
    renderWithTheme(<HistoryNavDocs />)
    expect(screen.getAllByRole("button", { name: "Go back" }).length).toBeGreaterThan(0)
    expect(screen.getAllByRole("button", { name: "Go forward" }).length).toBeGreaterThan(0)
  })
})
