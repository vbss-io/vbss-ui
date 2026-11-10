import { screen, within } from "@testing-library/react"
import { renderWithTheme } from "@/test-support/render-with-theme"
import { afterEach, describe, expect, it, vi } from "vitest"

import { components } from "@/presentation/consts/components"

import { Sidebar } from "."

vi.mock("@/presentation/consts/components", async (importOriginal) => {
  const actual = await importOriginal<typeof import("@/presentation/consts/components")>()
  return {
    components: [
      ...actual.components,
      { name: "Beta", path: "/beta", dev: true },
      { name: "Zed", path: "/zed" },
      { name: "Fresh", path: "/fresh", releaseDate: "2099-01-01" },
    ],
  }
})

const renderAt = (path: string, isMobile?: boolean) => {
  window.history.pushState({}, "", path)
  return renderWithTheme(<Sidebar isMobile={isMobile} />)
}

describe("Sidebar", () => {
  afterEach(() => {
    window.history.pushState({}, "", "/")
  })

  it("does not reorder the shared components list while rendering", () => {
    const before = components.map((component) => component.name)
    renderAt("/")
    expect(components.map((component) => component.name)).toEqual(before)
  })

  it("lists the getting started pages, the tools and every component with its link", () => {
    renderAt("/")
    expect(screen.getByText("Getting Started")).toBeInTheDocument()
    expect(screen.getByRole("link", { name: "Introduction", hidden: true })).toHaveAttribute("href", "/introduction")
    expect(screen.getByRole("link", { name: "Installation", hidden: true })).toHaveAttribute("href", "/installation")
    expect(screen.getByRole("link", { name: "Colors", hidden: true })).toHaveAttribute("href", "/colors")
    expect(screen.getByRole("link", { name: "Support", hidden: true })).toHaveAttribute("href", "/support")
    expect(screen.getByRole("link", { name: "VBSS Translator", hidden: true })).toHaveAttribute("href", "/tools/vbss-translator")
    expect(screen.getByRole("link", { name: "Button", hidden: true })).toHaveAttribute("href", "/button")
    expect(screen.getByRole("link", { name: "Dropdown", hidden: true })).toHaveAttribute("href", "/dropdown-menu")
  })

  it("sorts components alphabetically with the dev ones last", () => {
    renderAt("/")
    const section = screen.getByText("Components").parentElement!
    const names = within(section)
      .getAllByRole("link", { hidden: true })
      .map((link) => link.textContent)
    const plain = names.filter((name) => !name!.startsWith("Beta"))
    expect(plain).toEqual([...plain].sort((a, b) => a!.localeCompare(b!)))
    expect(names.at(-1)).toBe("BetaDev")
  })

  it("marks the dev component and the freshly released one", () => {
    renderAt("/")
    expect(screen.getByText("Dev")).toBeInTheDocument()
    expect(screen.getByRole("link", { name: "FreshNew", hidden: true })).toBeInTheDocument()
    expect(screen.getAllByText("New")).toHaveLength(1)
    expect(screen.getByRole("link", { name: "Calendar", hidden: true })).toBeInTheDocument()
  })

  it.each([
    ["/introduction", "Introduction"],
    ["/installation", "Installation"],
    ["/colors", "Colors"],
    ["/support", "Support"],
    ["/tools/vbss-translator", "VBSS Translator"],
    ["/button", "Button"],
  ])("flags only the current page at %s as active", (path, name) => {
    renderAt(path)
    const active = document.querySelectorAll("[data-active='true']")
    expect(active).toHaveLength(1)
    expect(within(active[0] as HTMLElement).getByRole("link", { name, hidden: true })).toBeInTheDocument()
  })

  it("flags the mobile variant on its container", () => {
    const { container } = renderAt("/", true)
    expect(container.firstElementChild).toHaveAttribute("data-mobile", "true")
  })

  it("is not mobile by default", () => {
    const { container } = renderAt("/")
    expect(container.firstElementChild).toHaveAttribute("data-mobile", "false")
  })
})
