import { screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { describe, expect, it } from "vitest"

import { renderWithTheme } from "@/test-support/render-with-theme"

import { SwitchDocs } from "."

describe("SwitchDocs", () => {
  it("flips the theme preview with the theme switch", async () => {
    renderWithTheme(<SwitchDocs />)
    expect(screen.getByText("Current theme: Light")).toBeInTheDocument()
    await userEvent.click(screen.getByRole("switch", { name: "Theme Settings" }))
    expect(screen.getByText("Current theme: Dark")).toBeInTheDocument()
    await userEvent.click(screen.getByRole("switch", { name: "Theme Settings" }))
    expect(screen.getByText("Current theme: Light")).toBeInTheDocument()
  })

  it("controls the feature switch from state", async () => {
    renderWithTheme(<SwitchDocs />)
    expect(screen.getByText("Switch value:", { exact: false })).toHaveTextContent("Off")
    await userEvent.click(screen.getByRole("switch", { name: "Enable Feature" }))
    expect(screen.getByText("Switch value:", { exact: false })).toHaveTextContent("On")
    expect(screen.getByRole("switch", { name: "Enable Feature" })).toBeChecked()
  })
})
