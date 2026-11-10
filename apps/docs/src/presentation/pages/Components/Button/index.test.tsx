import { screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { describe, expect, it, vi } from "vitest"

import { renderWithTheme } from "@/test-support/render-with-theme"

import { ButtonDocs } from "."

describe("ButtonDocs", () => {
  it("submits the demo form without navigating", async () => {
    const log = vi.spyOn(console, "log").mockImplementation(() => {})
    renderWithTheme(<ButtonDocs />)
    await userEvent.click(screen.getByRole("button", { name: "Submit Form" }))
    expect(log).toHaveBeenCalledWith("Form submitted!")
  })

  it("documents every variant and size of the button", () => {
    renderWithTheme(<ButtonDocs />)
    for (const name of ["Primary", "Secondary", "Outline", "Outline Solid", "Ghost", "xs", "xl"]) {
      expect(screen.getAllByRole("button", { name }).length).toBeGreaterThan(0)
    }
    expect(
      screen.getAllByRole("button", { name: "Button", hidden: true }).some((button) => button.hasAttribute("disabled"))
    ).toBe(true)
  })
})
