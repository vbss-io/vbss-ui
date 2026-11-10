import { render, screen, within } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { afterEach, beforeEach, describe, expect, it } from "vitest"

import { DarkModeProvider } from "@/presentation/contexts/dark-mode-context"

import { Header } from "."

const renderHeaderAt = (path: string) => {
  window.history.pushState({}, "", path)
  return render(
    <DarkModeProvider>
      <Header />
    </DarkModeProvider>
  )
}

describe("Header", () => {
  beforeEach(() => {
    window.localStorage.clear()
  })

  afterEach(() => {
    window.history.pushState({}, "", "/")
  })

  it("shows the brand and links to the documentation and support pages", () => {
    renderHeaderAt("/")
    expect(screen.getByText("vbss/ui")).toBeInTheDocument()
    expect(screen.getByRole("link", { name: "Documentation", hidden: true })).toHaveAttribute("href", "/introduction")
    expect(screen.getByRole("link", { name: "Support", hidden: true })).toHaveAttribute("href", "/support")
  })

  it.each([
    ["/", "Documentation", "Support"],
    ["/introduction", "Documentation", "Support"],
    ["/support", "Support", "Documentation"],
  ])("at %s the %s link is the active one and %s is outlined", (path, active, inactive) => {
    renderHeaderAt(path)
    const activeClass = screen.getByRole("link", { name: active, hidden: true }).className
    const inactiveClass = screen.getByRole("link", { name: inactive, hidden: true }).className
    expect(activeClass).not.toBe(inactiveClass)
    expect(activeClass).toContain("primary")
    expect(inactiveClass).toContain("outline")
  })

  it("toggles the dark mode switch and persists the choice", async () => {
    renderHeaderAt("/")
    const toggle = screen.getByRole("switch")
    expect(toggle).not.toBeChecked()
    await userEvent.click(toggle)
    expect(toggle).toBeChecked()
    expect(window.localStorage.getItem("darkMode")).toBe("true")
    await userEvent.click(toggle)
    expect(toggle).not.toBeChecked()
    expect(window.localStorage.getItem("darkMode")).toBe("false")
  })

  it("restores the saved dark mode on load", () => {
    window.localStorage.setItem("darkMode", "true")
    renderHeaderAt("/")
    expect(screen.getByRole("switch")).toBeChecked()
  })

  it("opens the mobile menu, locks the page scroll and closes it again", async () => {
    renderHeaderAt("/support")
    const menuButton = document.querySelector<HTMLButtonElement>("button.menu")!
    expect(document.body.style.overflow).toBe("")
    await userEvent.click(menuButton)
    expect(document.body.style.overflow).toBe("hidden")
    const closeButton = document.querySelector<HTMLButtonElement>("button.close-menu")!
    expect(closeButton).toBeInTheDocument()
    expect(screen.getAllByRole("link", { name: "Support", hidden: true })).toHaveLength(3)
    expect(screen.getByText("Getting Started")).toBeInTheDocument()
    await userEvent.click(closeButton)
    expect(document.querySelector("button.close-menu")).not.toBeInTheDocument()
    expect(document.body.style.overflow).toBe("")
  })

  it("marks the home page link as active inside the mobile menu", async () => {
    renderHeaderAt("/")
    await userEvent.click(document.querySelector<HTMLButtonElement>("button.menu")!)
    const mobile = document.querySelector<HTMLElement>("button.close-menu")!.parentElement!
    const docs = within(mobile).getAllByRole("link", { name: "Documentation", hidden: true })[0]
    const support = within(mobile).getAllByRole("link", { name: "Support", hidden: true })[0]
    expect(docs.className).toContain("primary")
    expect(support.className).toContain("outline")
  })

  it("releases the scroll lock when unmounted while the menu is open", async () => {
    const { unmount } = renderHeaderAt("/")
    await userEvent.click(document.querySelector<HTMLButtonElement>("button.menu")!)
    expect(document.body.style.overflow).toBe("hidden")
    unmount()
    expect(document.body.style.overflow).toBe("")
  })
})
