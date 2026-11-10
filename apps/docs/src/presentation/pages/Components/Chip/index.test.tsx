import { screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { describe, expect, it } from "vitest"

import { renderWithTheme } from "@/test-support/render-with-theme"

import { ChipDocs } from "."

describe("ChipDocs", () => {
  it("tracks the selected tags in the real usage demo", async () => {
    renderWithTheme(<ChipDocs />)
    expect(screen.getByText("Selected: None")).toBeInTheDocument()
    await userEvent.click(screen.getByText("React"))
    await userEvent.click(screen.getByText("Node.js"))
    expect(screen.getByText("Selected: React, Node.js")).toBeInTheDocument()
    await userEvent.click(screen.getByText("React"))
    expect(screen.getByText("Selected: Node.js")).toBeInTheDocument()
    await userEvent.click(screen.getByText("Node.js"))
    expect(screen.getByText("Selected: None")).toBeInTheDocument()
  })
})
