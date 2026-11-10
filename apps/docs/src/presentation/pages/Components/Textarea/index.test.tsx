import { screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { describe, expect, it } from "vitest"

import { renderWithTheme } from "@/test-support/render-with-theme"

import { TextareaDocs } from "."

describe("TextareaDocs", () => {
  it("echoes the controlled textarea value", async () => {
    renderWithTheme(<TextareaDocs />)
    expect(screen.getByText("Empty")).toBeInTheDocument()
    const textarea = screen.getAllByPlaceholderText("Type something...")[0]
    await userEvent.type(textarea, "hello docs")
    expect(screen.getByText("Textarea value: hello docs")).toBeInTheDocument()
    await userEvent.clear(textarea)
    expect(screen.getByText("Empty")).toBeInTheDocument()
  })
})
