import { Button } from "@vbss-ui/button"
import { act, render, screen, waitFor } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { createRef } from "react"
import { describe, expect, it, vi } from "vitest"
import { Tooltip, TooltipProvider, tooltipStyles } from "./index"

const renderTooltip = (props: Partial<Parameters<typeof Tooltip>[0]> = {}) =>
  render(
    <Tooltip trigger={<button type="button">Hover me</button>} {...props}>
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

    it("renders a string trigger inside the trigger button", () => {
      renderTooltip({ trigger: "Hover me" })
      const trigger = screen.getByRole("button")
      expect(trigger).toHaveClass("tooltipTrigger")
      expect(trigger).toHaveTextContent("Hover me")
    })

    it("uses a React element trigger as the trigger itself", () => {
      renderTooltip()
      const trigger = screen.getByRole("button", { name: "Hover me" })
      expect(trigger).toHaveClass("tooltipTrigger")
      expect(trigger).toHaveAttribute("data-state", "closed")
      expect(screen.getAllByRole("button")).toHaveLength(1)
    })

    it("does not nest buttons when the trigger is a disabled Button", () => {
      const error = vi.spyOn(console, "error").mockImplementation(() => undefined)
      renderTooltip({ trigger: <Button disabled>X</Button> })
      const buttons = screen.getAllByRole("button")
      expect(buttons).toHaveLength(1)
      expect(buttons[0]).toBeDisabled()
      expect(buttons[0]).toHaveClass("tooltipTrigger")
      expect(error.mock.calls.flat().join(" ")).not.toContain("validateDOMNesting")
    })

    it("renders a default empty trigger when none is given", () => {
      render(<Tooltip>Text</Tooltip>)
      expect(screen.getByRole("button").querySelector("div")).not.toBeNull()
    })

    it("renders an empty trigger button when trigger is null", () => {
      render(<Tooltip trigger={null}>Text</Tooltip>)
      expect(screen.getByRole("button")).toBeEmptyDOMElement()
    })

    it("exposes the display name", () => {
      expect(Tooltip.displayName).toBe("Tooltip")
    })
  })

  describe("provider and open state", () => {
    it("opens without waiting when delayDuration is 0", async () => {
      const user = userEvent.setup()
      renderTooltip({ delayDuration: 0 })
      await user.hover(screen.getByText("Hover me"))
      expect(await screen.findByRole("tooltip", {}, { timeout: 300 })).toHaveTextContent("Helpful text")
    })

    it("keeps the default delay when delayDuration is not given", async () => {
      vi.useFakeTimers({ shouldAdvanceTime: true })
      try {
        const user = userEvent.setup({ advanceTimers: vi.advanceTimersByTime })
        renderTooltip()
        await user.hover(screen.getByText("Hover me"))
        expect(screen.queryByRole("tooltip")).toBeNull()
        await act(async () => {
          await vi.advanceTimersByTimeAsync(800)
        })
        expect(screen.getByRole("tooltip")).toHaveTextContent("Helpful text")
      } finally {
        vi.useRealTimers()
      }
    })

    it("is controlled by open and reports changes through onOpenChange", async () => {
      const user = userEvent.setup()
      const onOpenChange = vi.fn()
      const { rerender } = renderTooltip({ open: false, onOpenChange })
      await user.tab()
      expect(onOpenChange).toHaveBeenCalledWith(true)
      expect(screen.queryByRole("tooltip")).toBeNull()
      rerender(
        <Tooltip trigger={<button type="button">Hover me</button>} open onOpenChange={onOpenChange}>
          Helpful text
        </Tooltip>
      )
      expect(await screen.findByRole("tooltip")).toHaveTextContent("Helpful text")
    })

    it("starts open with defaultOpen", async () => {
      renderTooltip({ defaultOpen: true })
      expect(await screen.findByRole("tooltip")).toHaveTextContent("Helpful text")
    })

    it("does not leak root props to the content element", async () => {
      renderTooltip({ open: true, delayDuration: 0, skipDelayDuration: 0, defaultOpen: true, onOpenChange: vi.fn() })
      await screen.findByRole("tooltip")
      const content = visibleContent() as HTMLElement
      ;["open", "delayduration", "skipdelayduration", "defaultopen", "provider"].forEach((name) =>
        expect(content).not.toHaveAttribute(name)
      )
    })

    it("uses the surrounding provider when provider is false", async () => {
      const user = userEvent.setup()
      render(
        <TooltipProvider delayDuration={0}>
          <Tooltip trigger={<button type="button">Hover me</button>} provider={false}>
            Helpful text
          </Tooltip>
        </TooltipProvider>
      )
      await user.hover(screen.getByText("Hover me"))
      expect(await screen.findByRole("tooltip", {}, { timeout: 300 })).toHaveTextContent("Helpful text")
    })

    it("passes skipDelayDuration to its own provider", async () => {
      vi.useFakeTimers({ shouldAdvanceTime: true })
      try {
        const user = userEvent.setup({ advanceTimers: vi.advanceTimersByTime })
        renderTooltip({ delayDuration: 500, skipDelayDuration: 0 })
        const trigger = screen.getByText("Hover me")
        await user.hover(trigger)
        await act(async () => {
          await vi.advanceTimersByTimeAsync(600)
        })
        expect(screen.getByRole("tooltip")).toBeInTheDocument()
        await user.keyboard("{Escape}")
        expect(trigger).toHaveAttribute("data-state", "closed")
        await user.unhover(trigger)
        await act(async () => {
          await vi.advanceTimersByTimeAsync(10)
        })
        await user.hover(trigger)
        expect(trigger).toHaveAttribute("data-state", "closed")
        await act(async () => {
          await vi.advanceTimersByTimeAsync(600)
        })
        expect(trigger).toHaveAttribute("data-state", "delayed-open")
      } finally {
        vi.useRealTimers()
      }
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

    it("accepts a ref object typed as the content element", async () => {
      const user = userEvent.setup()
      const ref = createRef<HTMLDivElement>()
      render(
        <Tooltip ref={ref} trigger={<button type="button">Hover me</button>}>
          Helpful text
        </Tooltip>
      )
      await openByFocus(user)
      expect(ref.current).toBe(visibleContent())
    })

    it("rejects a ref typed for another element at compile time", async () => {
      const user = userEvent.setup()
      const ref = createRef<HTMLButtonElement>()
      render(
        // @ts-expect-error a button ref does not fit the div content
        <Tooltip ref={ref} trigger={<button type="button">Hover me</button>}>
          Helpful text
        </Tooltip>
      )
      await openByFocus(user)
      expect(ref.current).toBe(visibleContent())
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
