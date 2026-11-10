import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { createRef } from "react"
import { describe, expect, it, vi } from "vitest"
import { HistoryNav, historyNavStyles } from "./index"

describe("HistoryNav", () => {
  describe("rendering", () => {
    it("renders a container with two buttons", () => {
      const { container } = render(<HistoryNav />)
      expect(container.firstElementChild).toHaveClass("historyNavContainer", "flex")
      expect(screen.getAllByRole("button")).toHaveLength(2)
    })

    it("renders the default arrow icons in each button", () => {
      render(<HistoryNav />)
      screen.getAllByRole("button").forEach((button) => expect(button.querySelector("svg")).not.toBeNull())
    })

    it("renders custom icons instead of the defaults", () => {
      render(<HistoryNav leftIcon={<i data-testid="left" />} rightIcon={<i data-testid="right" />} />)
      const [first, second] = screen.getAllByRole("button")
      expect(first).toContainElement(screen.getByTestId("left"))
      expect(second).toContainElement(screen.getByTestId("right"))
      screen.getAllByRole("button").forEach((button) => expect(button.querySelector("svg")).toBeNull())
    })

    it("falls back to the default icon for the side without a custom icon", () => {
      render(<HistoryNav leftIcon={<i data-testid="left" />} />)
      const [first, second] = screen.getAllByRole("button")
      expect(first.querySelector("svg")).toBeNull()
      expect(second.querySelector("svg")).not.toBeNull()
    })

    it("renders as the requested element", () => {
      const { container } = render(<HistoryNav as="nav" aria-label="History" />)
      expect(container.firstElementChild?.tagName).toBe("NAV")
      expect(screen.getByRole("navigation", { name: "History" })).toBeInTheDocument()
    })

    it("renders a div by default", () => {
      const { container } = render(<HistoryNav />)
      expect(container.firstElementChild?.tagName).toBe("DIV")
    })

    it("forwards the ref to the container", () => {
      let received: unknown = null
      const { container } = render(
        <HistoryNav
          ref={(node: unknown) => {
            received = node
          }}
        />
      )
      expect(received).toBe(container.firstElementChild)
    })

    it("passes native attributes and className to the container", () => {
      const { container } = render(<HistoryNav id="nav" className="custom-nav" data-custom="yes" />)
      expect(container.firstElementChild).toHaveAttribute("id", "nav")
      expect(container.firstElementChild).toHaveAttribute("data-custom", "yes")
      expect(container.firstElementChild).toHaveClass("custom-nav", "historyNavContainer")
    })

    it("exposes the display name", () => {
      expect(HistoryNav.displayName).toBe("HistoryNav")
    })
  })

  describe("accessible names and per-button props", () => {
    it("names the buttons Go back and Go forward by default", () => {
      render(<HistoryNav />)
      const back = screen.getByRole("button", { name: "Go back" })
      const forward = screen.getByRole("button", { name: "Go forward" })
      expect(back).not.toBe(forward)
      expect(screen.getAllByRole("button")[0]).toBe(back)
      expect(screen.getAllByRole("button")[1]).toBe(forward)
    })

    it("lets buttonsProps override both names", () => {
      render(<HistoryNav buttonsProps={{ "aria-label": "step" }} />)
      expect(screen.getAllByRole("button", { name: "step" })).toHaveLength(2)
    })

    it("applies leftButtonProps only to the left button", () => {
      render(<HistoryNav leftButtonProps={{ "aria-label": "Previous", variant: "secondary", disabled: true }} />)
      const left = screen.getByRole("button", { name: "Previous" })
      expect(left).toBeDisabled()
      expect(left).toHaveClass("bg-secondary")
      const right = screen.getByRole("button", { name: "Go forward" })
      expect(right).toBeEnabled()
      expect(right).not.toHaveClass("bg-secondary")
    })

    it("applies rightButtonProps only to the right button", () => {
      render(<HistoryNav rightButtonProps={{ "aria-label": "Next", rounded: "full" }} />)
      expect(screen.getByRole("button", { name: "Next" })).toHaveClass("rounded-full")
      expect(screen.getByRole("button", { name: "Go back" })).not.toHaveClass("rounded-full")
    })

    it("lets leftButtonProps and rightButtonProps override buttonsProps", () => {
      render(
        <HistoryNav
          buttonsProps={{ "aria-label": "shared", variant: "outline" }}
          leftButtonProps={{ "aria-label": "left", variant: "secondary" }}
          rightButtonProps={{ "aria-label": "right" }}
        />
      )
      expect(screen.getByRole("button", { name: "left" })).toHaveClass("bg-secondary")
      expect(screen.getByRole("button", { name: "right" })).toHaveClass("text-primary")
      expect(screen.queryByRole("button", { name: "shared" })).toBeNull()
    })

    it("lets the per-button size override the buttonsProps size", () => {
      render(<HistoryNav buttonsProps={{ size: "icon-sm" }} rightButtonProps={{ size: "icon-lg" }} />)
      expect(screen.getByRole("button", { name: "Go back" })).toHaveClass("h-8", "w-8")
      expect(screen.getByRole("button", { name: "Go forward" })).toHaveClass("h-10", "w-10")
    })
  })

  describe("polymorphic ref", () => {
    it("accepts a ref object typed as the default div", () => {
      const ref = createRef<HTMLDivElement>()
      const { container } = render(<HistoryNav ref={ref} />)
      expect(ref.current).toBe(container.firstElementChild)
    })

    it("accepts a ref object typed as the element given in as", () => {
      const ref = createRef<HTMLElement>()
      const { container } = render(<HistoryNav as="nav" ref={ref} />)
      expect(ref.current).toBe(container.firstElementChild)
    })

    it("rejects a ref typed for another element at compile time", () => {
      const ref = createRef<HTMLButtonElement>()
      // @ts-expect-error a button ref does not fit a div
      const { container } = render(<HistoryNav ref={ref} />)
      expect(ref.current).toBe(container.firstElementChild)
    })
  })

  describe("interaction", () => {
    it("calls leftOnClick only for the first button", async () => {
      const user = userEvent.setup()
      const leftOnClick = vi.fn()
      const rightOnClick = vi.fn()
      render(<HistoryNav leftOnClick={leftOnClick} rightOnClick={rightOnClick} />)
      await user.click(screen.getAllByRole("button")[0])
      expect(leftOnClick).toHaveBeenCalledTimes(1)
      expect(rightOnClick).not.toHaveBeenCalled()
    })

    it("calls rightOnClick only for the second button", async () => {
      const user = userEvent.setup()
      const leftOnClick = vi.fn()
      const rightOnClick = vi.fn()
      render(<HistoryNav leftOnClick={leftOnClick} rightOnClick={rightOnClick} />)
      await user.click(screen.getAllByRole("button")[1])
      expect(rightOnClick).toHaveBeenCalledTimes(1)
      expect(leftOnClick).not.toHaveBeenCalled()
    })

    it("activates the focused button with the keyboard", async () => {
      const user = userEvent.setup()
      const leftOnClick = vi.fn()
      const rightOnClick = vi.fn()
      render(<HistoryNav leftOnClick={leftOnClick} rightOnClick={rightOnClick} />)
      await user.tab()
      await user.keyboard("{Enter}")
      await user.tab()
      await user.keyboard(" ")
      expect(leftOnClick).toHaveBeenCalledTimes(1)
      expect(rightOnClick).toHaveBeenCalledTimes(1)
    })

    it("does not fail when clicked without handlers", async () => {
      const user = userEvent.setup()
      render(<HistoryNav />)
      await user.click(screen.getAllByRole("button")[0])
      await user.click(screen.getAllByRole("button")[1])
      expect(screen.getAllByRole("button")).toHaveLength(2)
    })

    it("disables both buttons through buttonsProps", async () => {
      const user = userEvent.setup()
      const leftOnClick = vi.fn()
      const rightOnClick = vi.fn()
      render(<HistoryNav buttonsProps={{ disabled: true }} leftOnClick={leftOnClick} rightOnClick={rightOnClick} />)
      screen.getAllByRole("button").forEach((button) => expect(button).toBeDisabled())
      await user.click(screen.getAllByRole("button")[0])
      await user.click(screen.getAllByRole("button")[1])
      expect(leftOnClick).not.toHaveBeenCalled()
      expect(rightOnClick).not.toHaveBeenCalled()
    })
  })

  describe("variants", () => {
    it("uses the icon medium button size by default", () => {
      render(<HistoryNav />)
      screen.getAllByRole("button").forEach((button) => expect(button).toHaveClass("h-9", "w-9"))
    })

    it.each([
      ["icon-sm", "h-8", "w-8"],
      ["icon-md", "h-9", "w-9"],
      ["icon-lg", "h-10", "w-10"],
    ] as const)("applies the %s button size", (size, height, width) => {
      render(<HistoryNav buttonsProps={{ size }} />)
      screen.getAllByRole("button").forEach((button) => expect(button).toHaveClass(height, width))
    })

    it("passes button style props to both buttons", () => {
      render(<HistoryNav buttonsProps={{ variant: "secondary", rounded: "full", "aria-label": "navigate" }} />)
      screen
        .getAllByRole("button", { name: "navigate" })
        .forEach((button) => expect(button).toHaveClass("bg-secondary", "rounded-full"))
      expect(screen.getAllByRole("button", { name: "navigate" })).toHaveLength(2)
    })

    it("uses the medium gap by default", () => {
      const { container } = render(<HistoryNav />)
      expect(container.firstElementChild).toHaveClass("gap-3")
    })

    it.each([
      ["xs", "gap-1"],
      ["sm", "gap-2"],
      ["md", "gap-3"],
      ["lg", "gap-4"],
      ["xl", "gap-5"],
    ] as const)("applies the %s gap", (gap, expected) => {
      const { container } = render(<HistoryNav gap={gap} />)
      expect(container.firstElementChild).toHaveClass(expected)
    })

    it("exposes the style helper", () => {
      expect(historyNavStyles({ gap: "xl" })).toContain("gap-5")
      expect(historyNavStyles({})).toContain("gap-3")
    })
  })
})
