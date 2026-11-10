import { screen, within } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { describe, expect, it } from "vitest"

import { renderWithTheme } from "@/test-support/render-with-theme"

import { DialogDocs } from "."

const deleteBody = "This will permanently delete your account and all associated data."
const controlledBody = /state is controlled externally/
const controlledDescription = "Open and close this dialog from the page state."

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

  it("describes the controlled dialog and closes it from its footer button", async () => {
    renderWithTheme(<DialogDocs />)
    await userEvent.click(screen.getAllByRole("button", { name: "Controlled Dialog" })[0])
    const dialog = await screen.findByRole("dialog")
    expect(within(dialog).getByText(controlledBody)).toBeInTheDocument()
    expect(dialog).toHaveAccessibleDescription(controlledDescription)
    const footer = dialog.querySelector<HTMLElement>(".dialogFooter")!
    await userEvent.click(within(footer).getByRole("button", { name: "Close" }))
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument()
  })

  it("closes the controlled dialog from the close icon", async () => {
    renderWithTheme(<DialogDocs />)
    await userEvent.click(screen.getAllByRole("button", { name: "Controlled Dialog" })[0])
    const dialog = await screen.findByRole("dialog")
    const closeIcon = dialog.querySelector<HTMLElement>(".dialogCloseContainer")!
    expect(closeIcon).toHaveAccessibleName("Close")
    await userEvent.click(closeIcon)
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument()
  })

  it("documents the migration of the trigger and the accessible name", () => {
    renderWithTheme(<DialogDocs />)
    expect(screen.getByRole("heading", { name: "Migration" })).toBeInTheDocument()
    expect(screen.getByText(/it becomes the trigger itself and must be focusable: use a/)).toBeInTheDocument()
    expect(screen.getByRole("heading", { name: "Migration" }).closest("section")).toHaveTextContent(
      "pass a title or an aria-label to give the dialog an accessible name"
    )
  })
})
