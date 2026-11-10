import { render, screen, waitFor } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { describe, expect, it, vi } from "vitest"
import { Popover, popoverStyles } from "./index"

const renderPopover = (props: Partial<Parameters<typeof Popover>[0]> = {}) =>
  render(
    <Popover trigger={<span>Open popover</span>} {...props}>
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
          <Popover trigger={<span>Open popover</span>}>
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
        <Popover trigger={<span>Open popover</span>}>
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
})
