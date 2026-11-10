import { screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { renderWithTheme } from "@/test-support/render-with-theme"
import { afterEach, describe, expect, it, vi } from "vitest"

import { CodeSnippet } from "."

const stubClipboard = (writeText: (text: string) => Promise<void>) => {
  Object.defineProperty(navigator, "clipboard", { value: { writeText }, configurable: true })
}

describe("CodeSnippet", () => {
  afterEach(() => {
    Reflect.deleteProperty(navigator, "clipboard")
  })

  it("shows the code and the default tsx language label", () => {
    renderWithTheme(<CodeSnippet code={"const answer = 42"} />)
    expect(screen.getByText("tsx")).toBeInTheDocument()
    expect(document.body).toHaveTextContent("const answer = 42")
  })

  it("shows the requested language label", () => {
    renderWithTheme(<CodeSnippet code="npm install @vbss-ui/button" language="sh" />)
    expect(screen.getByText("sh")).toBeInTheDocument()
  })

  it("copies the code to the clipboard", async () => {
    const writeText = vi.fn().mockResolvedValue(undefined)
    stubClipboard(writeText)
    renderWithTheme(<CodeSnippet code="yarn add @vbss-ui/button" language="sh" />)
    await userEvent.click(screen.getByRole("button", { name: "Copy" }))
    expect(writeText).toHaveBeenCalledWith("yarn add @vbss-ui/button")
  })

  it("logs the failure when the clipboard rejects", async () => {
    const failure = new Error("denied")
    stubClipboard(vi.fn().mockRejectedValue(failure))
    const error = vi.spyOn(console, "error").mockImplementation(() => {})
    renderWithTheme(<CodeSnippet code="x" />)
    await userEvent.click(screen.getByRole("button", { name: "Copy" }))
    expect(error).toHaveBeenCalledWith("Failed to copy code", failure)
  })
})
