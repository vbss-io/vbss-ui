import { screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { describe, expect, it, vi } from "vitest"

import { renderWithTheme } from "@/test-support/render-with-theme"

import { DropdownMenuDocs } from "."

describe("DropdownMenuDocs", () => {
  it("runs the edit and delete actions from the real usage menu", async () => {
    const log = vi.spyOn(console, "log").mockImplementation(() => {})
    renderWithTheme(<DropdownMenuDocs />)
    await userEvent.click(screen.getAllByText("More Actions")[0])
    await userEvent.click(await screen.findByRole("button", { name: "Edit Profile" }))
    expect(log).toHaveBeenCalledWith("Edit action")
    await userEvent.click(screen.getAllByText("More Actions")[0])
    await userEvent.click(await screen.findByRole("button", { name: "Delete Account" }))
    expect(log).toHaveBeenCalledWith("Delete action")
  })

  it("runs onSelect, blocks the disabled item and renders the link item as the menu item", async () => {
    renderWithTheme(<DropdownMenuDocs />)
    expect(screen.getByText("Last action: none")).toBeInTheDocument()
    await userEvent.click(screen.getByRole("button", { name: "Item actions" }))
    expect(await screen.findByRole("menuitem", { name: "Export" })).toHaveAttribute("aria-disabled", "true")
    const link = screen.getByRole("menuitem", { name: "Open on npm" })
    expect(link.tagName).toBe("A")
    expect(link).toHaveAttribute("href", "https://www.npmjs.com/package/@vbss-ui/dropdown-menu")
    await userEvent.click(screen.getByRole("menuitem", { name: "Save" }))
    expect(screen.getByText("Last action: Saved")).toBeInTheDocument()
  })

  it("documents the migration of the trigger", () => {
    renderWithTheme(<DropdownMenuDocs />)
    expect(screen.getByRole("heading", { name: "Migration" })).toBeInTheDocument()
    expect(screen.getByText(/it becomes the trigger itself and must be focusable: use a/)).toBeInTheDocument()
  })
})
