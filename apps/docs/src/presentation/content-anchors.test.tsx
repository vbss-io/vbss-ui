import { cleanup, screen } from "@testing-library/react"
import { afterEach, describe, expect, it } from "vitest"

import { components } from "@/presentation/consts/components"
import { tools } from "@/presentation/consts/tools"
import { renderDocsAt } from "@/test-support/render-docs"

const pages = [
  "/introduction",
  "/installation",
  "/colors",
  "/support",
  ...tools.map((tool) => tool.path),
  ...components.filter((component) => !("dev" in component)).map((component) => component.path),
]

describe("content sidebar anchors", () => {
  afterEach(() => {
    cleanup()
    window.history.pushState({}, "", "/")
  })

  it.each(pages)("%s links only to ids present on the page and has no empty link", async (path) => {
    const { container } = await renderDocsAt(path)
    await screen.findAllByRole("heading", { level: 1 })
    const links = Array.from(container.querySelectorAll<HTMLAnchorElement>("aside a[href^='#']"))
    expect(links.length).toBeGreaterThan(0)
    const empty = links.filter((link) => (link.textContent ?? "").trim() === "").map((link) => link.getAttribute("href"))
    expect(empty).toEqual([])
    const missing = links
      .map((link) => link.getAttribute("href")!.slice(1))
      .filter((id) => container.querySelector(`[id="${id}"]`) === null)
    expect(missing).toEqual([])
  })
})
