import { screen, within } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { describe, expect, it, vi } from "vitest"

import { renderWithTheme } from "@/test-support/render-with-theme"

import { InputNumberDocs } from "."

describe("InputNumberDocs", () => {
  it("validates the quantity before adding to the cart", async () => {
    const log = vi.spyOn(console, "log").mockImplementation(() => {})
    renderWithTheme(<InputNumberDocs />)
    const quantity = within(
      screen.getByRole("button", { name: "Add to Cart" }).closest("form") as HTMLElement
    ).getByPlaceholderText("Enter quantity")
    await userEvent.click(screen.getByRole("button", { name: "Add to Cart" }))
    expect(screen.getByText("Quantity is required")).toBeInTheDocument()
    await userEvent.type(quantity, "11")
    await userEvent.click(screen.getByRole("button", { name: "Add to Cart" }))
    expect(screen.getByText("Quantity must be between 1 and 10")).toBeInTheDocument()
    await userEvent.clear(quantity)
    await userEvent.type(quantity, "5")
    await userEvent.click(screen.getByRole("button", { name: "Add to Cart" }))
    expect(screen.queryByText(/Quantity (is required|must be)/)).not.toBeInTheDocument()
    expect(log).toHaveBeenCalledWith({ quantity: 5 })
  })

  it("accepts a typed number in the controlled demo", async () => {
    renderWithTheme(<InputNumberDocs />)
    const input = screen.getAllByPlaceholderText("Type a number...")[0]
    await userEvent.type(input, "42")
    expect(input).toHaveValue(42)
  })
})
