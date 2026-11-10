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
})
