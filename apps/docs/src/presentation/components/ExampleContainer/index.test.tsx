import { screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { renderWithTheme } from "@/test-support/render-with-theme"
import { describe, expect, it } from "vitest"

import { ExampleContainer } from "."

describe("ExampleContainer", () => {
  it("renders the demo without a code toggle when no code is given", () => {
    renderWithTheme(<ExampleContainer>demo</ExampleContainer>)
    expect(screen.getByText("demo")).toBeInTheDocument()
    expect(screen.queryByRole("button")).not.toBeInTheDocument()
  })

  it("toggles the code sample", async () => {
    renderWithTheme(<ExampleContainer code="const a = 1">demo</ExampleContainer>)
    expect(document.body).not.toHaveTextContent("const a = 1")
    await userEvent.click(screen.getByRole("button", { name: "Show Code" }))
    expect(document.body).toHaveTextContent("const a = 1")
    await userEvent.click(screen.getByRole("button", { name: "Hide Code" }))
    expect(document.body).not.toHaveTextContent("const a = 1")
  })
})
