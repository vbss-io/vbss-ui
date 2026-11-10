import { screen } from "@testing-library/react"
import { renderWithTheme } from "@/test-support/render-with-theme"
import { describe, expect, it } from "vitest"

import { ContentSidebar } from "."

describe("ContentSidebar", () => {
  it("links sections and indents subsections", () => {
    renderWithTheme(
      <ContentSidebar
        title="Button"
        sections={[
          { title: "Usage", anchor: "usage", subsections: [{ title: "Variant", anchor: "variants" }] },
          { title: "Props", anchor: "props" },
        ]}
      />
    )
    expect(screen.getByText("Button")).toBeInTheDocument()
    expect(screen.getByRole("link", { name: "Usage", hidden: true })).toHaveAttribute("href", "#usage")
    expect(screen.getByRole("link", { name: "Props", hidden: true })).toHaveAttribute("href", "#props")
    const sub = screen.getByRole("link", { name: "Variant", hidden: true })
    expect(sub).toHaveAttribute("href", "#variants")
    expect(sub).toHaveAttribute("data-indented", "true")
    expect(screen.getByRole("link", { name: "Usage", hidden: true })).not.toHaveAttribute("data-indented")
  })
})
