import { screen } from "@testing-library/react"
import { describe, expect, it } from "vitest"

import { renderWithTheme } from "@/test-support/render-with-theme"

import { RadioGroupDocs } from "."

describe("RadioGroupDocs", () => {
  it("names the labelled group demo with its label", () => {
    renderWithTheme(<RadioGroupDocs />)
    const groups = screen.getAllByRole("radiogroup", { name: "Select an Option:" })
    expect(groups.length).toBeGreaterThan(0)
    groups.forEach((group) => expect(group).toHaveAttribute("aria-labelledby"))
  })

  it("documents that the label gives the group its accessible name", () => {
    renderWithTheme(<RadioGroupDocs />)
    expect(screen.getByText(/The label also gives the group its accessible name/)).toBeInTheDocument()
  })
})
