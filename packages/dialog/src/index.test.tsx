import { render, screen, waitFor } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { useState } from "react"
import { describe, expect, it, vi } from "vitest"
import { Dialog, dialogBorderStyle, dialogStyles, dialogTextStyle } from "./index"

const closeButton = () => document.querySelector<HTMLButtonElement>(".dialogCloseContainer")

const openDialog = async (user: ReturnType<typeof userEvent.setup>) => {
  await user.click(screen.getByRole("button", { name: "Open" }))
  return screen.findByRole("dialog")
}

describe("Dialog", () => {
  describe("opening and closing", () => {
    it("starts closed and shows nothing but the trigger", () => {
      render(<Dialog trigger="Open" title="Title" />)
      expect(screen.getByRole("button", { name: "Open" })).toBeInTheDocument()
      expect(screen.queryByRole("dialog")).not.toBeInTheDocument()
    })

    it("opens when the trigger is clicked and exposes the title as its accessible name", async () => {
      const user = userEvent.setup()
      render(<Dialog trigger="Open" title="Delete item" />)
      const dialog = await openDialog(user)
      expect(dialog).toHaveAccessibleName("Delete item")
      expect(screen.getByRole("heading", { name: "Delete item" })).toBeInTheDocument()
    })

    it("opens from the keyboard on the trigger", async () => {
      const user = userEvent.setup()
      render(<Dialog trigger="Open" title="Keyboard" />)
      screen.getByRole("button", { name: "Open" }).focus()
      await user.keyboard("{Enter}")
      expect(await screen.findByRole("dialog")).toBeInTheDocument()
    })

    it("closes with Escape and gives the focus back to the trigger", async () => {
      const user = userEvent.setup()
      render(<Dialog trigger="Open" title="Escape" />)
      await openDialog(user)
      await user.keyboard("{Escape}")
      await waitFor(() => expect(screen.queryByRole("dialog")).not.toBeInTheDocument())
      expect(screen.getByRole("button", { name: "Open" })).toHaveFocus()
    })

    it("closes with the close button", async () => {
      const user = userEvent.setup()
      render(<Dialog trigger="Open" title="Close" />)
      await openDialog(user)
      await user.click(closeButton()!)
      await waitFor(() => expect(screen.queryByRole("dialog")).not.toBeInTheDocument())
    })

    it("closes when the overlay is clicked", async () => {
      const user = userEvent.setup()
      render(<Dialog trigger="Open" title="Overlay" />)
      await openDialog(user)
      await user.click(document.querySelector(".dialogOverlay")!)
      await waitFor(() => expect(screen.queryByRole("dialog")).not.toBeInTheDocument())
    })

    it("hides the close button when hideClose is set and still closes with Escape", async () => {
      const user = userEvent.setup()
      render(<Dialog trigger="Open" title="No close" hideClose />)
      await openDialog(user)
      expect(closeButton()).not.toBeInTheDocument()
      await user.keyboard("{Escape}")
      await waitFor(() => expect(screen.queryByRole("dialog")).not.toBeInTheDocument())
    })

    it("shows the close button by default", async () => {
      const user = userEvent.setup()
      render(<Dialog trigger="Open" title="With close" />)
      await openDialog(user)
      expect(closeButton()).toBeInTheDocument()
    })
  })

  describe("controlled mode", () => {
    it("renders open when open is true", async () => {
      render(<Dialog open title="Controlled" trigger="Open" />)
      expect(await screen.findByRole("dialog", { name: "Controlled" })).toBeInTheDocument()
    })

    it("stays closed when open is false even after clicking the trigger, and reports the request", async () => {
      const user = userEvent.setup()
      const onOpenChange = vi.fn()
      render(<Dialog open={false} onOpenChange={onOpenChange} title="Locked" trigger="Open" />)
      await user.click(screen.getByRole("button", { name: "Open" }))
      expect(onOpenChange).toHaveBeenCalledWith(true)
      expect(screen.queryByRole("dialog")).not.toBeInTheDocument()
    })

    it("reports false through onOpenChange on Escape, close button and overlay", async () => {
      const user = userEvent.setup()
      const onOpenChange = vi.fn()
      render(<Dialog open onOpenChange={onOpenChange} title="Report" trigger="Open" />)
      await screen.findByRole("dialog")
      await user.keyboard("{Escape}")
      expect(onOpenChange).toHaveBeenLastCalledWith(false)
      await user.click(closeButton()!)
      expect(onOpenChange).toHaveBeenCalledTimes(2)
      await user.click(document.querySelector(".dialogOverlay")!)
      expect(onOpenChange).toHaveBeenCalledTimes(3)
      expect(onOpenChange.mock.calls.every(([next]) => next === false)).toBe(true)
    })

    it("follows a parent that owns the state", async () => {
      const user = userEvent.setup()
      const Harness = () => {
        const [open, setOpen] = useState(false)
        return (
          <>
            <button onClick={() => setOpen(true)}>External</button>
            <Dialog open={open} onOpenChange={setOpen} title="Owned" />
          </>
        )
      }
      render(<Harness />)
      expect(screen.queryByRole("dialog")).not.toBeInTheDocument()
      await user.click(screen.getByRole("button", { name: "External" }))
      expect(await screen.findByRole("dialog", { name: "Owned" })).toBeInTheDocument()
      await user.keyboard("{Escape}")
      await waitFor(() => expect(screen.queryByRole("dialog")).not.toBeInTheDocument())
    })
  })

  describe("content", () => {
    it("renders the description and links it to the dialog", async () => {
      const user = userEvent.setup()
      render(<Dialog trigger="Open" title="Info" description="This cannot be undone" />)
      const dialog = await openDialog(user)
      expect(screen.getByText("This cannot be undone")).toBeInTheDocument()
      expect(dialog).toHaveAccessibleDescription("This cannot be undone")
    })

    it("omits the description element when none is given", async () => {
      const user = userEvent.setup()
      render(<Dialog trigger="Open" title="Bare" />)
      await openDialog(user)
      expect(document.querySelector(".dialogDescription")).not.toBeInTheDocument()
    })

    it("renders ReactNode description and footer", async () => {
      const user = userEvent.setup()
      render(<Dialog trigger="Open" title="T" description={<span data-testid="d">D</span>} footer={<button>Confirm</button>} />)
      await openDialog(user)
      expect(screen.getByRole("heading", { name: "T" })).toBeInTheDocument()
      expect(screen.getByTestId("d")).toBeInTheDocument()
      expect(screen.getByRole("button", { name: "Confirm" })).toBeInTheDocument()
    })

    it("renders the footer inside the footer area and omits it when absent", async () => {
      const user = userEvent.setup()
      const { unmount } = render(<Dialog trigger="Open" title="Footer" footer={<button>Save</button>} />)
      await openDialog(user)
      expect(document.querySelector(".dialogFooter")).toContainElement(screen.getByRole("button", { name: "Save" }))
      unmount()
      render(<Dialog trigger="Open" title="Footer" />)
      await openDialog(user)
      expect(document.querySelector(".dialogFooter")).not.toBeInTheDocument()
    })

    it("renders children inside the dialog", async () => {
      const user = userEvent.setup()
      render(
        <Dialog trigger="Open" title="Body">
          <p>Body content</p>
        </Dialog>
      )
      const dialog = await openDialog(user)
      expect(dialog).toContainElement(screen.getByText("Body content"))
    })

    it("lets a footer action run without closing the dialog by itself", async () => {
      const user = userEvent.setup()
      const onConfirm = vi.fn()
      render(<Dialog trigger="Open" title="Action" footer={<button onClick={onConfirm}>Confirm</button>} />)
      await openDialog(user)
      await user.click(screen.getByRole("button", { name: "Confirm" }))
      expect(onConfirm).toHaveBeenCalledTimes(1)
      expect(screen.getByRole("dialog")).toBeInTheDocument()
    })

    it("moves focus into the dialog and keeps tabbing inside it", async () => {
      const user = userEvent.setup()
      render(
        <Dialog trigger="Open" title="Focus" footer={<button>First</button>}>
          <input aria-label="Name" />
        </Dialog>
      )
      const dialog = await openDialog(user)
      await waitFor(() => expect(dialog).toContainElement(document.activeElement as HTMLElement))
      for (let i = 0; i < 6; i++) {
        await user.tab()
        expect(dialog).toContainElement(document.activeElement as HTMLElement)
      }
    })
  })

  describe("styling", () => {
    it("applies the default primary variant, medium radius and white text", async () => {
      const user = userEvent.setup()
      render(<Dialog trigger="Open" title="Defaults" />)
      const dialog = await openDialog(user)
      expect(dialog).toHaveClass("dialogContent", "bg-primary", "rounded-md", "text-white")
    })

    it.each(["primary", "secondary", "outline", "ghost"] as const)(
      "applies the %s variant and its text color",
      async (variant) => {
        const user = userEvent.setup()
        render(<Dialog trigger="Open" title="Variant" variant={variant} />)
        const dialog = await openDialog(user)
        expect(dialog).toHaveClass(...dialogStyles({ variant }).split(" "), ...dialogTextStyle[variant].split(" "))
      }
    )

    it("drops the text color when disableTextColor is set", async () => {
      const user = userEvent.setup()
      render(<Dialog trigger="Open" title="No color" variant="ghost" disableTextColor />)
      const dialog = await openDialog(user)
      expect(dialog).not.toHaveClass("text-black")
    })

    it.each(["primary", "secondary", "outline", "ghost"] as const)(
      "applies the %s border when border is set",
      async (variant) => {
        const user = userEvent.setup()
        render(<Dialog trigger="Open" title="Border" variant={variant} border />)
        const dialog = await openDialog(user)
        expect(dialog).toHaveClass(...dialogBorderStyle[variant].split(" "))
      }
    )

    it("applies no extra border classes by default", async () => {
      const user = userEvent.setup()
      render(<Dialog trigger="Open" title="Borderless" variant="primary" />)
      const dialog = await openDialog(user)
      expect(dialog).not.toHaveClass("border-secondary")
    })

    it.each(["none", "sm", "md", "lg", "full"] as const)("applies the rounded %s class", async (rounded) => {
      const user = userEvent.setup()
      render(<Dialog trigger="Open" title="Round" rounded={rounded} />)
      const dialog = await openDialog(user)
      expect(dialog).toHaveClass(`rounded-${rounded}`)
    })

    it("appends the consumer className", async () => {
      const user = userEvent.setup()
      render(<Dialog trigger="Open" title="Class" className="custom" />)
      const dialog = await openDialog(user)
      expect(dialog).toHaveClass("dialogContent", "custom")
    })

    it("uses the overlay opacity as a percentage with 50 as default", async () => {
      const user = userEvent.setup()
      const { unmount } = render(<Dialog trigger="Open" title="Opacity" />)
      await openDialog(user)
      expect(document.querySelector<HTMLElement>(".dialogOverlay")).toHaveStyle({ opacity: "0.5" })
      unmount()
      render(<Dialog trigger="Open" title="Opacity" overlayOpacity={80} />)
      await openDialog(user)
      expect(document.querySelector<HTMLElement>(".dialogOverlay")).toHaveStyle({ opacity: "0.8" })
    })
  })

  describe("forwarded props and ref", () => {
    it("forwards attributes to the dialog content", async () => {
      const user = userEvent.setup()
      render(<Dialog trigger="Open" title="Attrs" data-testid="content" id="my-dialog" />)
      const dialog = await openDialog(user)
      expect(dialog).toHaveAttribute("data-testid", "content")
      expect(dialog).toHaveAttribute("id", "my-dialog")
    })

    it("forwards the ref to the dialog content", async () => {
      const user = userEvent.setup()
      let received: unknown = null
      render(<Dialog ref={(node: unknown) => (received = node)} trigger="Open" title="Ref" />)
      const dialog = await openDialog(user)
      expect(received).toBe(dialog)
    })

    it("exposes its displayName", () => {
      expect(Dialog.displayName).toBe("Dialog")
    })
  })
})
