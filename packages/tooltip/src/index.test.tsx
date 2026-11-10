import { render, screen, waitFor } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { describe, expect, it, vi } from "vitest"
import { Tooltip, tooltipStyles } from "./index"

const renderTooltip = (props: Partial<Parameters<typeof Tooltip>[0]> = {}) =>
  render(
    <Tooltip trigger={<span>Hover me</span>} {...props}>
      Helpful text
    </Tooltip>
  )

const visibleContent = () => document.querySelector(".tooltipContent") as HTMLElement | null

const openByFocus = async (user: ReturnType<typeof userEvent.setup>) => {
  await user.tab()
  return screen.findByRole("tooltip")
}

describe("Tooltip", () => {
  describe("rendering", () => {
    it("renders only the trigger while closed", () => {
      renderTooltip()
      const trigger = screen.getByRole("button")
      expect(trigger).toHaveClass("tooltipTrigger")
      expect(trigger).toHaveAttribute("data-state", "closed")
      expect(screen.queryByRole("tooltip")).toBeNull()
      expect(visibleContent()).toBeNull()
    })

    it("renders the trigger content inside the trigger button", () => {
      renderTooltip()
      expect(screen.getByRole("button")).toContainElement(screen.getByText("Hover me"))
    })

    it("renders a default empty trigger when none is given", () => {
      render(<Tooltip>Text</Tooltip>)
      expect(screen.getByRole("button").querySelector("div")).not.toBeNull()
    })

    it("exposes the display name", () => {
      expect(Tooltip.displayName).toBe("Tooltip")
    })
  })

  describe("opening and closing", () => {
    it("opens on keyboard focus and exposes the text as a tooltip", async () => {
      const user = userEvent.setup()
      renderTooltip()
      const tooltip = await openByFocus(user)
      expect(tooltip).toHaveTextContent("Helpful text")
      expect(visibleContent()).toHaveTextContent("Helpful text")
      expect(screen.getByRole("button")).toHaveAttribute("data-state", "instant-open")
    })

    it("links the trigger to the tooltip for assistive technology", async () => {
      const user = userEvent.setup()
      renderTooltip()
      const tooltip = await openByFocus(user)
      expect(screen.getByRole("button")).toHaveAttribute("aria-describedby", tooltip.id)
    })

    it("opens on hover after the delay", async () => {
      const user = userEvent.setup()
      renderTooltip()
      await user.hover(screen.getByText("Hover me"))
      expect(await screen.findByRole("tooltip", {}, { timeout: 2000 })).toHaveTextContent("Helpful text")
    })

    it("closes when the pointer leaves", async () => {
      const user = userEvent.setup()
      renderTooltip()
      await user.hover(screen.getByText("Hover me"))
      await screen.findByRole("tooltip", {}, { timeout: 2000 })
      await user.unhover(screen.getByText("Hover me"))
      await user.pointer({ target: document.body, coords: { clientX: 900, clientY: 900 } })
      await waitFor(() => expect(screen.queryByRole("tooltip")).toBeNull())
    })

    it("closes on Escape", async () => {
      const user = userEvent.setup()
      renderTooltip()
      await openByFocus(user)
      await user.keyboard("{Escape}")
      await waitFor(() => expect(screen.queryByRole("tooltip")).toBeNull())
    })

    it("closes when the trigger is blurred", async () => {
      const user = userEvent.setup()
      renderTooltip()
      await openByFocus(user)
      await user.tab()
      await waitFor(() => expect(screen.queryByRole("tooltip")).toBeNull())
    })

    it("lets the consumer react to Escape through onEscapeKeyDown", async () => {
      const user = userEvent.setup()
      const onEscapeKeyDown = vi.fn()
      renderTooltip({ onEscapeKeyDown })
      await openByFocus(user)
      await user.keyboard("{Escape}")
      expect(onEscapeKeyDown).toHaveBeenCalledTimes(1)
    })
  })

  describe("positioning and props", () => {
    it("places the content on the requested side", async () => {
      const user = userEvent.setup()
      renderTooltip({ side: "bottom" })
      await openByFocus(user)
      expect(visibleContent()).toHaveAttribute("data-side", "bottom")
    })

    it("forwards the ref to the content element", async () => {
      const user = userEvent.setup()
      let received: unknown = null
      renderTooltip({
        ref: (node: unknown) => {
          received = node
        },
      } as never)
      await openByFocus(user)
      expect(received).toBe(visibleContent())
    })

    it("passes content props through", async () => {
      const user = userEvent.setup()
      renderTooltip({ id: "tip", "data-custom": "yes" } as never)
      await openByFocus(user)
      expect(visibleContent()).toHaveAttribute("id", "tip")
      expect(visibleContent()).toHaveAttribute("data-custom", "yes")
    })
  })

  describe("variants", () => {
    it.each([
      ["primary", "bg-primary", "text-white"],
      ["secondary", "bg-secondary", "text-white"],
      ["outline", "border-primary", "text-primary"],
    ] as const)("applies the %s variant classes", async (variant, first, second) => {
      const user = userEvent.setup()
      renderTooltip({ variant })
      await openByFocus(user)
      expect(visibleContent()).toHaveClass(first, second)
    })

    it("uses the primary variant with medium defaults", async () => {
      const user = userEvent.setup()
      renderTooltip()
      await openByFocus(user)
      expect(visibleContent()).toHaveClass("bg-primary", "px-3", "py-1", "rounded-md", "text-base", "font-normal")
    })

    it("applies size, rounded, fontSize, fontWeight and className", async () => {
      const user = userEvent.setup()
      renderTooltip({ size: "xl", rounded: "full", fontSize: "lg", fontWeight: "bold", className: "custom-tooltip" })
      await openByFocus(user)
      expect(visibleContent()).toHaveClass("px-5", "py-3", "rounded-full", "text-lg", "font-bold", "custom-tooltip")
    })

    it("exposes the style helper", () => {
      expect(tooltipStyles({ variant: "outline" })).toContain("border-primary")
      expect(tooltipStyles({ size: "xs" })).toContain("px-2")
    })
  })
})
