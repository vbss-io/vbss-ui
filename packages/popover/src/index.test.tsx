import { render, screen, waitFor } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { Button } from "@vbss-ui/button"
import { createRef, useState } from "react"
import { describe, expect, it, vi } from "vitest"
import { Popover, PopoverProps, popoverStyles } from "./index"

const renderPopover = (props: Partial<PopoverProps> = {}) =>
  render(
    <Popover trigger="Open popover" {...props}>
      <p>Popover body</p>
    </Popover>
  )

const openPopover = async (user: ReturnType<typeof userEvent.setup>) => {
  await user.click(screen.getByText("Open popover"))
  return screen.findByRole("dialog")
}

describe("Popover", () => {
  describe("rendering", () => {
    it("renders only the trigger while closed", () => {
      renderPopover()
      const trigger = screen.getByRole("button")
      expect(trigger).toHaveClass("popoverTrigger")
      expect(trigger).toHaveAttribute("aria-haspopup", "dialog")
      expect(trigger).toHaveAttribute("aria-expanded", "false")
      expect(screen.queryByRole("dialog")).toBeNull()
      expect(screen.queryByText("Popover body")).toBeNull()
    })

    it("renders the trigger content inside the trigger button", () => {
      renderPopover()
      expect(screen.getByRole("button")).toContainElement(screen.getByText("Open popover"))
    })

    it("renders a default empty trigger when none is given", () => {
      render(<Popover>Body</Popover>)
      expect(screen.getByRole("button").querySelector("div")).not.toBeNull()
    })

    it("exposes the display name", () => {
      expect(Popover.displayName).toBe("Popover")
    })
  })

  describe("opening and closing", () => {
    it("opens on click and shows the children", async () => {
      const user = userEvent.setup()
      renderPopover()
      const dialog = await openPopover(user)
      expect(dialog).toHaveClass("popoverContent")
      expect(dialog).toContainElement(screen.getByText("Popover body"))
      expect(screen.getByText("Open popover").closest("button")).toHaveAttribute("aria-expanded", "true")
    })

    it("toggles closed when the trigger is clicked again", async () => {
      const user = userEvent.setup()
      renderPopover()
      await openPopover(user)
      await user.click(screen.getByText("Open popover"))
      await waitFor(() => expect(screen.queryByRole("dialog")).toBeNull())
    })

    it("opens from the keyboard with Enter and with Space", async () => {
      const user = userEvent.setup()
      renderPopover()
      await user.tab()
      await user.keyboard("{Enter}")
      expect(await screen.findByRole("dialog")).toBeInTheDocument()
      await user.keyboard("{Escape}")
      await waitFor(() => expect(screen.queryByRole("dialog")).toBeNull())
      await user.keyboard(" ")
      expect(await screen.findByRole("dialog")).toBeInTheDocument()
    })

    it("closes on Escape and returns focus to the trigger", async () => {
      const user = userEvent.setup()
      renderPopover()
      await openPopover(user)
      await user.keyboard("{Escape}")
      await waitFor(() => expect(screen.queryByRole("dialog")).toBeNull())
      expect(screen.getByRole("button")).toHaveFocus()
    })

    it("closes when clicking outside", async () => {
      const user = userEvent.setup()
      render(
        <>
          <Popover trigger="Open popover">
            <p>Popover body</p>
          </Popover>
          <p>outside</p>
        </>
      )
      await openPopover(user)
      await user.click(screen.getByText("outside"))
      await waitFor(() => expect(screen.queryByRole("dialog")).toBeNull())
    })

    it("keeps interactive children usable inside the popover", async () => {
      const user = userEvent.setup()
      const onClick = vi.fn()
      render(
        <Popover trigger="Open popover">
          <button onClick={onClick}>Confirm</button>
        </Popover>
      )
      await openPopover(user)
      await user.click(screen.getByRole("button", { name: "Confirm" }))
      expect(onClick).toHaveBeenCalledTimes(1)
      expect(screen.getByRole("dialog")).toBeInTheDocument()
    })

    it("lets the consumer react to Escape through onEscapeKeyDown", async () => {
      const user = userEvent.setup()
      const onEscapeKeyDown = vi.fn()
      renderPopover({ onEscapeKeyDown })
      await openPopover(user)
      await user.keyboard("{Escape}")
      expect(onEscapeKeyDown).toHaveBeenCalledTimes(1)
    })
  })

  describe("positioning and props", () => {
    it("aligns to the center by default", async () => {
      const user = userEvent.setup()
      renderPopover()
      const dialog = await openPopover(user)
      expect(dialog).toHaveAttribute("data-align", "center")
    })

    it("places the content on the requested side and align", async () => {
      const user = userEvent.setup()
      renderPopover({ side: "left", align: "start" })
      const dialog = await openPopover(user)
      expect(dialog).toHaveAttribute("data-side", "left")
      expect(dialog).toHaveAttribute("data-align", "start")
    })

    it("forwards the ref to the content element", async () => {
      const user = userEvent.setup()
      let received: unknown = null
      renderPopover({
        ref: (node: unknown) => {
          received = node
        },
      } as never)
      const dialog = await openPopover(user)
      expect(received).toBe(dialog)
    })

    it("passes content props through", async () => {
      const user = userEvent.setup()
      renderPopover({ id: "pop", "aria-label": "Details" } as never)
      const dialog = await openPopover(user)
      expect(dialog).toHaveAttribute("id", "pop")
      expect(dialog).toHaveAttribute("aria-label", "Details")
    })
  })

  describe("variants", () => {
    it.each([
      ["primary", "bg-primary", "text-white"],
      ["secondary", "bg-secondary", "text-white"],
      ["outline", "border-primary", "text-primary"],
    ] as const)("applies the %s variant classes", async (variant, first, second) => {
      const user = userEvent.setup()
      renderPopover({ variant })
      expect(await openPopover(user)).toHaveClass(first, second)
    })

    it("uses the primary variant with medium defaults", async () => {
      const user = userEvent.setup()
      renderPopover()
      expect(await openPopover(user)).toHaveClass("bg-primary", "px-3", "py-1", "rounded-md", "text-base", "font-normal")
    })

    it("applies size, rounded, fontSize, fontWeight and className", async () => {
      const user = userEvent.setup()
      renderPopover({ size: "xl", rounded: "full", fontSize: "lg", fontWeight: "bold", className: "custom-popover" })
      expect(await openPopover(user)).toHaveClass("px-6", "py-3", "rounded-full", "text-lg", "font-bold", "custom-popover")
    })

    it("exposes the style helper", () => {
      expect(popoverStyles({ variant: "outline" })).toContain("border-primary")
      expect(popoverStyles({ size: "xs" })).toContain("px-2")
    })
  })

  describe("trigger", () => {
    it("uses an element trigger as the trigger itself without nesting buttons", async () => {
      const user = userEvent.setup()
      const consoleError = vi.spyOn(console, "error").mockImplementation(() => undefined)
      render(
        <Popover trigger={<Button>Open popover</Button>}>
          <p>Popover body</p>
        </Popover>
      )
      expect(screen.getAllByRole("button")).toHaveLength(1)
      const trigger = screen.getByRole("button", { name: "Open popover" })
      expect(trigger).toHaveClass("popoverTrigger", "button")
      expect(trigger).toHaveAttribute("aria-haspopup", "dialog")
      expect(trigger.querySelector("button")).toBeNull()
      await user.click(trigger)
      expect(await screen.findByRole("dialog")).toBeInTheDocument()
      expect(consoleError.mock.calls.some((call) => String(call[0]).includes("validateDOMNesting"))).toBe(false)
    })

    it("does not open when the element trigger is disabled", async () => {
      const user = userEvent.setup()
      render(
        <Popover trigger={<Button disabled>Open popover</Button>}>
          <p>Popover body</p>
        </Popover>
      )
      expect(screen.getAllByRole("button")).toHaveLength(1)
      await user.click(screen.getByRole("button", { name: "Open popover" }))
      expect(screen.queryByRole("dialog")).toBeNull()
    })

    it("keeps a string trigger inside the Radix trigger button", () => {
      renderPopover()
      const trigger = screen.getByRole("button", { name: "Open popover" })
      expect(trigger).toHaveClass("popoverTrigger")
      expect(trigger.tagName).toBe("BUTTON")
    })
  })

  describe("open state", () => {
    it("shows the content when open is true and reports the trigger click through onOpenChange", async () => {
      const user = userEvent.setup()
      const onOpenChange = vi.fn()
      renderPopover({ open: true, onOpenChange })
      expect(await screen.findByRole("dialog")).toBeInTheDocument()
      await user.click(screen.getByRole("button", { name: "Open popover" }))
      expect(onOpenChange).toHaveBeenCalledWith(false)
      expect(screen.getByRole("dialog")).toBeInTheDocument()
    })

    it("stays closed when open is false and reports the request to open", async () => {
      const user = userEvent.setup()
      const onOpenChange = vi.fn()
      renderPopover({ open: false, onOpenChange })
      await user.click(screen.getByRole("button", { name: "Open popover" }))
      expect(onOpenChange).toHaveBeenCalledWith(true)
      expect(screen.queryByRole("dialog")).toBeNull()
    })

    it("follows a parent that owns the state", async () => {
      const user = userEvent.setup()
      const Harness = () => {
        const [open, setOpen] = useState(false)
        return (
          <>
            <button onClick={() => setOpen(true)}>External</button>
            <Popover open={open} onOpenChange={setOpen} trigger="Open popover">
              <p>Popover body</p>
            </Popover>
          </>
        )
      }
      render(<Harness />)
      expect(screen.queryByRole("dialog")).toBeNull()
      await user.click(screen.getByRole("button", { name: "External" }))
      expect(await screen.findByRole("dialog")).toBeInTheDocument()
      await user.keyboard("{Escape}")
      await waitFor(() => expect(screen.queryByRole("dialog")).toBeNull())
    })

    it("starts open with defaultOpen and still closes by itself", async () => {
      const user = userEvent.setup()
      const onOpenChange = vi.fn()
      renderPopover({ defaultOpen: true, onOpenChange })
      expect(await screen.findByRole("dialog")).toBeInTheDocument()
      await user.click(screen.getByRole("button", { name: "Open popover" }))
      await waitFor(() => expect(screen.queryByRole("dialog")).toBeNull())
      expect(onOpenChange).toHaveBeenCalledWith(false)
    })

    it("does not leak the state props to the content as attributes", async () => {
      renderPopover({ open: true, defaultOpen: true, modal: true, onOpenChange: vi.fn() })
      const dialog = await screen.findByRole("dialog")
      expect(dialog).not.toHaveAttribute("open")
      expect(dialog).not.toHaveAttribute("defaultopen")
      expect(dialog).not.toHaveAttribute("modal")
    })

    it("hides the content from the rest of the page when modal", async () => {
      const user = userEvent.setup()
      render(
        <>
          <p>outside</p>
          <Popover modal trigger="Open popover">
            <p>Popover body</p>
          </Popover>
        </>
      )
      await user.click(screen.getByRole("button", { name: "Open popover" }))
      await screen.findByRole("dialog")
      expect(screen.getByText("outside").closest("[aria-hidden='true']")).not.toBeNull()
    })

    it("keeps the rest of the page available when not modal", async () => {
      const user = userEvent.setup()
      render(
        <>
          <p>outside</p>
          <Popover trigger="Open popover">
            <p>Popover body</p>
          </Popover>
        </>
      )
      await user.click(screen.getByRole("button", { name: "Open popover" }))
      await screen.findByRole("dialog")
      expect(screen.getByText("outside").closest("[aria-hidden='true']")).toBeNull()
    })
  })

  describe("classes", () => {
    it("separates overflow-hidden and animate-in", async () => {
      const user = userEvent.setup()
      renderPopover()
      const dialog = await openPopover(user)
      expect(dialog).toHaveClass("overflow-hidden", "animate-in")
      expect(dialog.className).not.toContain("overflow-hiddenanimate-in")
    })

    it("does not repeat the primary background class", () => {
      const classes = popoverStyles({ variant: "primary" }).split(" ")
      expect(classes.filter((name) => name === "bg-primary")).toHaveLength(1)
    })
  })

  describe("types", () => {
    it("accepts a ref object typed as the rendered content", async () => {
      const user = userEvent.setup()
      const ref = createRef<HTMLDivElement>()
      render(
        <Popover ref={ref} trigger="Open popover">
          <p>Popover body</p>
        </Popover>
      )
      const dialog = await openPopover(user)
      expect(ref.current).toBe(dialog)
    })

    it("rejects a ref object typed as another element", () => {
      const ref = createRef<HTMLButtonElement>()
      render(
        // @ts-expect-error a button ref does not match the div content
        <Popover ref={ref} trigger="Open popover">
          <p>Popover body</p>
        </Popover>
      )
      expect(ref.current).toBeNull()
    })
  })
})
