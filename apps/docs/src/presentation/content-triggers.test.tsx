import { cleanup, screen } from "@testing-library/react"
import { afterEach, describe, expect, it } from "vitest"

import { renderDocsAt } from "@/test-support/render-docs"

const triggerClasses = [".dialogTrigger", ".popoverTrigger", ".tooltipTrigger", ".dropdownMenuTrigger"].join(", ")

describe("overlay triggers in the docs", () => {
  afterEach(() => {
    cleanup()
    window.history.pushState({}, "", "/")
  })

  it.each(["/dialog", "/popover", "/tooltip", "/dropdown-menu"])(
    "%s renders every trigger as a focusable button",
    async (path) => {
      const { container } = await renderDocsAt(path)
      await screen.findAllByRole("heading", { level: 1 })
      const triggers = Array.from(container.querySelectorAll<HTMLElement>(triggerClasses))
      expect(triggers.length).toBeGreaterThan(5)
      expect(triggers.filter((trigger) => trigger.tagName !== "BUTTON").map((trigger) => trigger.outerHTML.slice(0, 80))).toEqual(
        []
      )
    }
  )
})
