import { screen, within } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { describe, expect, it } from "vitest"

import { renderWithTheme } from "@/test-support/render-with-theme"

import { DialogDocs } from "."

const deleteBody = "This will permanently delete your account and all associated data."
const controlledBody = /state is controlled externally/

describe("DialogDocs", () => {
  it("cancels the delete dialog", async () => {
    renderWithTheme(<DialogDocs />)
    await userEvent.click(screen.getAllByText("Delete Account")[0])
    expect(await screen.findByText(deleteBody)).toBeInTheDocument()
    await userEvent.click(screen.getByRole("button", { name: "Cancel" }))
    expect(screen.queryByText(deleteBody)).not.toBeInTheDocument()
  })

  it("confirms the delete dialog", async () => {
    renderWithTheme(<DialogDocs />)
    await userEvent.click(screen.getAllByText("Delete Account")[0])
    await userEvent.click(await screen.findByRole("button", { name: "Delete" }))
    expect(screen.queryByText(deleteBody)).not.toBeInTheDocument()
  })

  it("closes the controlled dialog from its footer button", async () => {
    renderWithTheme(<DialogDocs />)
    await userEvent.click(screen.getAllByText("Controlled Dialog")[0])
    const dialog = await screen.findByRole("dialog")
    expect(within(dialog).getByText(controlledBody)).toBeInTheDocument()
    await userEvent.click(within(dialog).getByRole("button", { name: "Close" }))
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument()
  })
})
