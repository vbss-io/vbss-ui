import { screen, within } from "@testing-library/react"
import { describe, expect, it, vi } from "vitest"

import { renderWithTheme } from "@/test-support/render-with-theme"

import { Introduction } from "."

vi.mock("@/presentation/consts/components", () => ({
  components: [
    { name: "Button", path: "/button" },
    { name: "Dropdown", path: "/dropdown-menu" },
    { name: "Beta", path: "/beta", dev: true },
  ],
}))

describe("Introduction", () => {
  it("lists every component with links to its documentation and npm package", () => {
    renderWithTheme(<Introduction />)
    const row = (name: string) => screen.getByRole("cell", { name }).closest("tr") as HTMLElement
    expect(within(row("Button")).getByRole("link", { name: "View Documentation" })).toHaveAttribute("href", "/button")
    expect(within(row("Button")).getByRole("link", { name: "View Package" })).toHaveAttribute(
      "href",
      "https://www.npmjs.com/package/@vbss-ui/button"
    )
    expect(within(row("Dropdown")).getByRole("link", { name: "View Package" })).toHaveAttribute(
      "href",
      "https://www.npmjs.com/package/@vbss-ui/dropdownmenu"
    )
  })

  it("marks components in development as coming soon without links", () => {
    renderWithTheme(<Introduction />)
    const row = screen.getByRole("cell", { name: "Beta" }).closest("tr") as HTMLElement
    expect(within(row).getAllByText("Coming Soon")).toHaveLength(2)
    expect(within(row).queryByRole("link")).not.toBeInTheDocument()
  })
})
