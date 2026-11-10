import { act, screen, within } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { beforeEach, describe, expect, it } from "vitest"

import { router } from "@/presentation/router"
import { renderDocsAt } from "@/test-support/render-docs"

describe("App", () => {
  beforeEach(() => {
    window.localStorage.clear()
  })

  it("renders the header, the sidebar and the routed page together", async () => {
    await renderDocsAt("/button")
    expect(await screen.findByRole("heading", { level: 1, name: "Button" })).toBeInTheDocument()
    expect(screen.getByText("vbss/ui")).toBeInTheDocument()
    const sidebarLinks = screen.getAllByRole("link", { name: "Introduction", hidden: true })
    expect(sidebarLinks[0]).toHaveAttribute("href", "/introduction")
  })

  it("swaps the page when the router navigates", async () => {
    await renderDocsAt("/button")
    await screen.findByRole("heading", { level: 1, name: "Button" })
    await act(async () => {
      await router.navigate("/installation")
    })
    expect(await screen.findByRole("heading", { level: 1, name: "Installation" })).toBeInTheDocument()
    expect(screen.queryByRole("heading", { level: 1, name: "Button" })).not.toBeInTheDocument()
    expect(router.state.location.pathname).toBe("/installation")
  })

  it("keeps the routed page while the dark mode switch is toggled", async () => {
    await renderDocsAt("/colors")
    const main = await screen.findByRole("main")
    await userEvent.click(screen.getByRole("switch"))
    expect(window.localStorage.getItem("darkMode")).toBe("true")
    expect(within(main).getByRole("heading", { level: 1, name: "Colors" })).toBeInTheDocument()
  })
})
