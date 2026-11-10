import { screen, within } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { describe, expect, it } from "vitest"

import { renderWithTheme } from "@/test-support/render-with-theme"

import { DataTableDocs } from "."

const mainTable = () => screen.getByRole("heading", { name: "Users" }).parentElement?.parentElement as HTMLElement

const firstColumn = (scope: HTMLElement) =>
  within(scope)
    .getAllByRole("row")
    .slice(1)
    .map((row) => within(row).getAllByRole("cell")[0].textContent)

describe("DataTableDocs", () => {
  it("shows the first page of users in insertion order", () => {
    renderWithTheme(<DataTableDocs />)
    expect(firstColumn(mainTable())).toEqual(["John Doe", "Jane Smith", "Bob Johnson"])
  })

  it("sorts by name ascending then descending", async () => {
    renderWithTheme(<DataTableDocs />)
    await userEvent.click(within(mainTable()).getByRole("button", { name: "Name: Activate to sort" }))
    expect(firstColumn(mainTable())).toEqual(["Alice Williams", "Bob Johnson", "Charlie Brown"])
    await userEvent.click(within(mainTable()).getByRole("button", { name: /^Name:/ }))
    expect(firstColumn(mainTable())).toEqual(["John Doe", "Jane Smith", "Charlie Brown"])
  })

  it("sorts by the custom sort accessors of email and join date", async () => {
    renderWithTheme(<DataTableDocs />)
    await userEvent.click(within(mainTable()).getByRole("button", { name: "Email: Activate to sort" }))
    expect(firstColumn(mainTable())).toEqual(["Alice Williams", "Bob Johnson", "Charlie Brown"])
    await userEvent.click(within(mainTable()).getByRole("button", { name: "Join Date: Activate to sort" }))
    expect(firstColumn(mainTable())).toEqual(["John Doe", "Jane Smith", "Bob Johnson"])
    await userEvent.click(within(mainTable()).getByRole("button", { name: /^Join Date:/ }))
    expect(firstColumn(mainTable())).toEqual(["Charlie Brown", "Alice Williams", "Bob Johnson"])
  })

  it("sorts by the role column falling back to its accessor", async () => {
    renderWithTheme(<DataTableDocs />)
    await userEvent.click(within(mainTable()).getByRole("button", { name: "Role: Activate to sort" }))
    const roles = within(mainTable())
      .getAllByRole("row")
      .slice(1)
      .map((row) => within(row).getAllByRole("cell")[2].textContent)
    expect(roles).toEqual(["Admin", "Admin", "User"])
  })

  it("shows the empty state of the empty example", () => {
    renderWithTheme(<DataTableDocs />)
    expect(screen.getAllByText("No data available").length).toBeGreaterThan(0)
  })

  it("moves through the pages with the controlled page demo and returns to page 1 when sorting", async () => {
    renderWithTheme(<DataTableDocs />)
    expect(screen.getByRole("button", { name: "Previous page" })).toBeDisabled()
    await userEvent.click(screen.getByRole("button", { name: "Next page" }))
    expect(firstColumn(mainTable())).toEqual(["Alice Williams", "Charlie Brown"])
    expect(screen.getByText("Page 2 of 2")).toBeInTheDocument()
    expect(screen.getByRole("button", { name: "Next page" })).toBeDisabled()
    await userEvent.click(within(mainTable()).getByRole("button", { name: "Name: Activate to sort" }))
    expect(screen.getByText("Page 1 of 2")).toBeInTheDocument()
    expect(firstColumn(mainTable())).toEqual(["Alice Williams", "Bob Johnson", "Charlie Brown"])
  })

  it("documents which columns can be sorted and the headerLabel field", () => {
    renderWithTheme(<DataTableDocs />)
    const rules = screen.getByText("Which columns can be sorted:").parentElement
    expect(rules).toHaveTextContent(
      "A column whose accessor returns JSX needs a sortAccessor; without it the column loses the sort control"
    )
    expect(rules).toHaveTextContent("Any sort change, controlled or not, goes back to page 1")
    expect(screen.getByText(/Text used in the accessible name of the sort control/)).toBeInTheDocument()
  })
})
