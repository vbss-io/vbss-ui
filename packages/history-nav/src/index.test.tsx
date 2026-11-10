import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
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
