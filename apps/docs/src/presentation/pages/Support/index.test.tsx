import { screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { afterEach, describe, expect, it, vi } from "vitest"

import { renderWithTheme } from "@/test-support/render-with-theme"

import { SupportDocs } from "."

const setNavigator = (props: Record<string, unknown>) => {
  for (const [key, value] of Object.entries(props)) Object.defineProperty(navigator, key, { value, configurable: true })
}

describe("SupportDocs", () => {
  afterEach(() => {
    Reflect.deleteProperty(navigator, "share")
    Reflect.deleteProperty(navigator, "clipboard")
  })

  it("links to the donation, sponsorship and repository pages", () => {
    renderWithTheme(<SupportDocs />)
    expect(screen.getByRole("link", { name: "Buy me a coffee" })).toHaveAttribute("href", "https://www.buymeacoffee.com/vbss.io")
    expect(screen.getByRole("link", { name: "Sponsor" })).toHaveAttribute("href", "https://github.com/sponsors/vbss-io")
    expect(screen.getByRole("link", { name: "Star Project" })).toHaveAttribute("href", "https://github.com/vbss-io/vbss-ui")
    expect(screen.getByRole("link", { name: "Open PR" })).toHaveAttribute("href", "https://github.com/vbss-io/vbss-ui")
  })

  const shareStatus = () => screen.getByRole("status")

  it("shares the site with the native share sheet when available", async () => {
    const share = vi.fn().mockResolvedValue(undefined)
    const alert = vi.spyOn(window, "alert").mockImplementation(() => {})
    setNavigator({ share })
    renderWithTheme(<SupportDocs />)
    await userEvent.click(screen.getByRole("button", { name: "Share" }))
    expect(share).toHaveBeenCalledWith({
      title: "vbss-ui - Modern React Component Library",
      text: "Check out this amazing React component library!",
      url: "https://ui.vbss.io",
    })
    expect(shareStatus()).toBeEmptyDOMElement()
    expect(alert).not.toHaveBeenCalled()
  })

  it("stays silent when the share sheet is dismissed", async () => {
    const share = vi.fn().mockRejectedValue(new DOMException("dismissed", "AbortError"))
    setNavigator({ share })
    renderWithTheme(<SupportDocs />)
    await userEvent.click(screen.getByRole("button", { name: "Share" }))
    expect(share).toHaveBeenCalledTimes(1)
    expect(shareStatus()).toBeEmptyDOMElement()
  })

  it("reports a share failure on the page", async () => {
    setNavigator({ share: vi.fn().mockRejectedValue(new Error("boom")) })
    renderWithTheme(<SupportDocs />)
    await userEvent.click(screen.getByRole("button", { name: "Share" }))
    expect(shareStatus()).toHaveTextContent("Could not share the link")
  })

  it("copies the link and confirms it on the page when sharing is not available", async () => {
    const writeText = vi.fn().mockResolvedValue(undefined)
    const alert = vi.spyOn(window, "alert").mockImplementation(() => {})
    setNavigator({ clipboard: { writeText } })
    renderWithTheme(<SupportDocs />)
    await userEvent.click(screen.getByRole("button", { name: "Share" }))
    expect(writeText).toHaveBeenCalledWith("https://ui.vbss.io")
    expect(shareStatus()).toHaveTextContent("Link copied")
    expect(alert).not.toHaveBeenCalled()
  })

  it("reports a denied clipboard on the page", async () => {
    setNavigator({ clipboard: { writeText: vi.fn().mockRejectedValue(new Error("denied")) } })
    renderWithTheme(<SupportDocs />)
    await userEvent.click(screen.getByRole("button", { name: "Share" }))
    expect(shareStatus()).toHaveTextContent("Could not share the link")
  })

  it("reports when neither sharing nor the clipboard exist", async () => {
    renderWithTheme(<SupportDocs />)
    await userEvent.click(screen.getByRole("button", { name: "Share" }))
    expect(shareStatus()).toHaveTextContent("Could not share the link")
  })
})
