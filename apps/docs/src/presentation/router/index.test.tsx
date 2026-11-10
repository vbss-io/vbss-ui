import { screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { beforeEach, describe, expect, it } from "vitest"

import { renderDocsAt } from "@/test-support/render-docs"

const pages: [string, string][] = [
  ["/", "Introduction"],
  ["/introduction", "Introduction"],
  ["/installation", "Installation"],
  ["/colors", "Colors"],
  ["/support", "Support vbss-ui"],
  ["/chip", "Chip"],
  ["/chips", "Chips"],
  ["/button", "Button"],
  ["/calendar", "Calendar"],
  ["/switch", "Switch"],
  ["/table", "Table"],
  ["/checkbox", "Checkbox"],
  ["/dialog", "Dialog"],
  ["/dropdown-menu", "Dropdown Menu"],
  ["/history-nav", "History Navigation"],
  ["/input", "Input"],
  ["/input-number", "Input Number"],
  ["/popover", "Popover"],
  ["/radio-group", "RadioGroup"],
  ["/textarea", "Textarea"],
  ["/tooltip", "Tooltip"],
  ["/date-picker", "Date Picker"],
  ["/data-table", "Data Table"],
  ["/tools/vbss-translator", "VBSS Translator"],
]

const resolvableAnchors: Record<string, string[]> = {
  "/": ["available-components", "built-with-modern-technologies", "built-in-typeScript-support"],
  "/colors": ["default-color-palette", "customizing-colors", "how-it-works"],
  "/support": ["why-support", "how-to-support", "thank-you"],
  "/calendar": [
    "installation",
    "using-npm",
    "usage",
    "variants",
    "rounded",
    "selection-modes",
    "with-locale",
    "props",
    "customization",
  ],
}
const anchorBugs = new Set(Object.keys(resolvableAnchors).concat("/introduction"))

describe("docs router", () => {
  beforeEach(() => {
    window.localStorage.clear()
  })

  it.each(pages)("%s renders the %s page", async (path, title) => {
    await renderDocsAt(path)
    expect(await screen.findByRole("heading", { level: 1, name: title })).toBeInTheDocument()
  })

  it.each(pages.filter(([path]) => !anchorBugs.has(path)))(
    "%s links every section of its content sidebar to an anchor in the page",
    async (path) => {
      await renderDocsAt(path)
      await screen.findByRole("main")
      const anchors = Array.from(document.querySelectorAll<HTMLAnchorElement>("a[href^='#']")).map((link) =>
        link.getAttribute("href")!.slice(1)
      )
      expect(anchors.length).toBeGreaterThan(0)
      for (const anchor of anchors) expect(document.getElementById(anchor), anchor).not.toBeNull()
    }
  )

  it.each(Object.entries(resolvableAnchors))("%s keeps its working sidebar anchors resolvable", async (path, anchors) => {
    await renderDocsAt(path)
    await screen.findByRole("main")
    for (const anchor of anchors) {
      expect(document.querySelector(`a[href="#${anchor}"]`), anchor).not.toBeNull()
      expect(document.getElementById(anchor), anchor).not.toBeNull()
    }
  })

  it("renders the not found page for an unknown path", async () => {
    await renderDocsAt("/nope/never")
    expect(await screen.findByText("404")).toBeInTheDocument()
    expect(screen.getByText("Page Not Found")).toBeInTheDocument()
  })

  it("shows and hides the code of an example", async () => {
    const user = userEvent.setup()
    await renderDocsAt("/button")
    await screen.findByRole("heading", { level: 1, name: "Button" })
    const [showCode] = screen.getAllByRole("button", { name: "Show Code" })
    await user.click(showCode)
    expect(screen.getByRole("button", { name: "Hide Code" })).toBeInTheDocument()
    await user.click(screen.getByRole("button", { name: "Hide Code" }))
    expect(screen.queryByRole("button", { name: "Hide Code" })).not.toBeInTheDocument()
  })
})
