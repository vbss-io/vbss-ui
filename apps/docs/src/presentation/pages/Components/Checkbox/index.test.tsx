import { screen, within } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { describe, expect, it } from "vitest"

import { renderWithTheme } from "@/test-support/render-with-theme"

import { CheckboxDocs } from "."

describe("CheckboxDocs", () => {
  it("shares the checked state between the subscription demo and the controlled demo", async () => {
    renderWithTheme(<CheckboxDocs />)
    const controlled = () =>
      within(screen.getByText(/^Checkbox state:/).parentElement as HTMLElement).getByRole("checkbox", { name: "Accept terms" })
    expect(screen.getByText("Not subscribed")).toBeInTheDocument()
    expect(screen.getByText("Checkbox state: Unchecked")).toBeInTheDocument()
    await userEvent.click(screen.getByRole("checkbox", { name: "Subscribe to newsletter" }))
    expect(screen.getByText("Subscribed")).toBeInTheDocument()
    expect(screen.getByText("Checkbox state: Checked")).toBeInTheDocument()
    expect(controlled()).toBeChecked()
    await userEvent.click(controlled())
    expect(screen.getByText("Not subscribed")).toBeInTheDocument()
    expect(screen.getByText("Checkbox state: Unchecked")).toBeInTheDocument()
  })
})
