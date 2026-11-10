import { screen, within } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { describe, expect, it } from "vitest"

import { renderWithTheme } from "@/test-support/render-with-theme"

import { TableDocs } from "."

const demoAfter = (headingName: string) =>
  screen.getByRole("heading", { name: headingName }).nextElementSibling!.nextElementSibling as HTMLElement

describe("TableDocs", () => {
  it("changes the footer colors with the variant of the footer demo", async () => {
    renderWithTheme(<TableDocs />)
    const demo = demoAfter("Footer")
    await userEvent.click(within(demo).getByRole("button", { name: "ghost" }))
    expect(demo.querySelector("tfoot")).toHaveClass("bg-transparent")
    await userEvent.click(within(demo).getByRole("button", { name: "secondary" }))
    expect(demo.querySelector("tfoot")).toHaveClass("bg-secondary")
  })

  it("offers the full rounded option and applies it to the table container", async () => {
    renderWithTheme(<TableDocs />)
    const demo = demoAfter("Rounded")
    await userEvent.click(within(demo).getByRole("button", { name: "full" }))
    expect(demo.querySelector(".tableContainer")).toHaveClass("rounded-3xl")
  })

  it("puts the styled row on the row and not on its cells", () => {
    renderWithTheme(<TableDocs />)
    const demo = demoAfter("Styled Rows")
    const row = demo.querySelector<HTMLElement>("tbody tr")!
    expect(row.style.backgroundColor).toBe("purple")
    expect(Array.from(row.querySelectorAll<HTMLElement>("td")).map((cell) => cell.getAttribute("style"))).toEqual([
      null,
      null,
      null,
    ])
  })

  it("documents the migration of the row className and style", () => {
    renderWithTheme(<TableDocs />)
    expect(screen.getByRole("heading", { name: "Migration" }).closest("section")).toHaveTextContent(
      "The className and style of a row now go to the tr instead of being repeated on every td"
    )
  })
})
