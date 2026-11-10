import { fireEvent, render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { createRef } from "react"
import { describe, expect, it, vi } from "vitest"
import { Switch, switchLabelStyles, switchStyles, switchThumbStyles } from "./index"

describe("Switch", () => {
  describe("rendering", () => {
    it("renders an unchecked switch by default", () => {
      render(<Switch />)
      const control = screen.getByRole("switch")
      expect(control).toHaveAttribute("aria-checked", "false")
      expect(control).toHaveAttribute("data-state", "unchecked")
    })

    it("renders the label bound to the control", async () => {
      const user = userEvent.setup()
      render(<Switch label="Notifications" />)
      expect(screen.getByLabelText("Notifications")).toBe(screen.getByRole("switch"))
      await user.click(screen.getByText("Notifications"))
      expect(screen.getByRole("switch")).toHaveAttribute("aria-checked", "true")
    })

    it("does not render a label element without label", () => {
      const { container } = render(<Switch />)
      expect(container.querySelector("label")).toBeNull()
    })

    it("uses the provided id for the control and the label", () => {
      render(<Switch id="custom" label="Mode" />)
      expect(screen.getByRole("switch")).toHaveAttribute("id", "custom")
      expect(screen.getByText("Mode")).toHaveAttribute("for", "custom")
    })

    it("renders the on and off icons only when provided", () => {
      const { container, rerender } = render(<Switch />)
      expect(container.querySelector(".switchIconOnContainer")).toBeNull()
      expect(container.querySelector(".switchIconOffContainer")).toBeNull()
      rerender(<Switch iconOn={<i data-testid="on" />} iconOff={<i data-testid="off" />} />)
      expect(screen.getByTestId("on").closest(".switchIconOnContainer")).not.toBeNull()
      expect(screen.getByTestId("off").closest(".switchIconOffContainer")).not.toBeNull()
    })

    it("reverses the row when inverted", () => {
      const { container, rerender } = render(<Switch inverted />)
      expect(container.querySelector(".switchContainer")).toHaveClass("flex-row-reverse")
      rerender(<Switch inverted={false} />)
      expect(container.querySelector(".switchContainer")).not.toHaveClass("flex-row-reverse")
    })

    it("never emits undefined or false classes on the container", () => {
      const { container, rerender } = render(<Switch />)
      expect(container.querySelector(".switchContainer")?.className).not.toMatch(/undefined|false/)
      rerender(<Switch inverted={false} />)
      expect(container.querySelector(".switchContainer")?.className).not.toMatch(/undefined|false/)
      rerender(<Switch inverted />)
      expect(container.querySelector(".switchContainer")?.className).not.toMatch(/undefined|false/)
      expect(container.querySelector(".switchContainer")).toHaveClass(
        "switchContainer",
        "flex",
        "flex-row-reverse",
        "gap-2",
        "items-center"
      )
    })

    it("accepts a ref object typed as the rendered button", () => {
      const ref = createRef<HTMLButtonElement>()
      render(<Switch ref={ref} />)
      expect(ref.current).toBe(screen.getByRole("switch"))
    })

    it("rejects a ref typed for another element at compile time", () => {
      const ref = createRef<HTMLDivElement>()
      // @ts-expect-error a div ref does not fit a button
      render(<Switch ref={ref} />)
      expect(ref.current).toBe(screen.getByRole("switch"))
    })

    it("keeps the generated id stable across rerenders and linked to the label", () => {
      const { rerender } = render(<Switch label="Mode" />)
      const firstId = screen.getByRole("switch").getAttribute("id")
      expect(firstId).toBeTruthy()
      rerender(<Switch label="Mode" />)
      rerender(<Switch label="Mode" />)
      expect(screen.getByRole("switch")).toHaveAttribute("id", firstId as string)
      expect(screen.getByText("Mode")).toHaveAttribute("for", firstId as string)
      expect(screen.getByLabelText("Mode")).toBe(screen.getByRole("switch"))
    })

    it("gives each instance its own generated id", () => {
      render(
        <>
          <Switch />
          <Switch />
        </>
      )
      const [first, second] = screen.getAllByRole("switch")
      expect(first.id).not.toBe(second.id)
    })

    it("merges className into the switch root and keeps the base class", () => {
      render(<Switch className="extra-class" />)
      expect(screen.getByRole("switch")).toHaveClass("switchRoot", "extra-class")
    })

    it("exposes the display name", () => {
      expect(Switch.displayName).toBe("Switch")
    })
  })

  describe("variants", () => {
    it.each([
      ["primary", "data-[state=checked]:bg-primary"],
      ["secondary", "data-[state=checked]:bg-secondary"],
      ["outline", "border-primary"],
      ["ghost", "data-[state=checked]:bg-primary/50"],
    ] as const)("applies the %s variant classes", (variant, expected) => {
      render(<Switch variant={variant} />)
      expect(screen.getByRole("switch")).toHaveClass(expected)
    })

    it("applies the primary variant and full rounding by default", () => {
      render(<Switch />)
      expect(screen.getByRole("switch")).toHaveClass("data-[state=checked]:bg-primary", "rounded-full")
    })

    it("applies rounded to the root and to the thumb", () => {
      render(<Switch rounded="sm" />)
      expect(screen.getByRole("switch")).toHaveClass("rounded-sm")
      expect(screen.getByRole("switch").querySelector(".switchThumb")).toHaveClass("rounded-sm")
    })

    it("applies label font size and weight", () => {
      render(<Switch label="Text" fontSize="lg" fontWeight="bold" />)
      expect(screen.getByText("Text")).toHaveClass("text-lg", "font-bold")
    })

    it("uses small normal label typography by default", () => {
      render(<Switch label="Text" />)
      expect(screen.getByText("Text")).toHaveClass("text-sm", "font-normal")
    })

    it("exposes the style helpers", () => {
      expect(switchStyles({ variant: "secondary" })).toContain("data-[state=checked]:bg-secondary")
      expect(switchThumbStyles({ rounded: "none" })).toContain("rounded-none")
      expect(switchLabelStyles({ fontSize: "xl" })).toContain("text-xl")
    })
  })

  describe("interaction", () => {
    it("toggles on click and calls onCheckedChange with the new value", async () => {
      const user = userEvent.setup()
      const onCheckedChange = vi.fn()
      render(<Switch onCheckedChange={onCheckedChange} />)
      await user.click(screen.getByRole("switch"))
      expect(onCheckedChange).toHaveBeenLastCalledWith(true)
      expect(screen.getByRole("switch")).toHaveAttribute("data-state", "checked")
      await user.click(screen.getByRole("switch"))
      expect(onCheckedChange).toHaveBeenLastCalledWith(false)
      expect(onCheckedChange).toHaveBeenCalledTimes(2)
    })

    it("calls onChange with the new checked value", async () => {
      const user = userEvent.setup()
      const onChange = vi.fn()
      render(<Switch onChange={onChange as never} />)
      await user.click(screen.getByRole("switch"))
      expect(onChange).toHaveBeenCalledWith(true)
    })

    it("calls both onChange and onCheckedChange once with the new checked value", async () => {
      const user = userEvent.setup()
      const onChange = vi.fn()
      const onCheckedChange = vi.fn()
      render(<Switch onChange={onChange as never} onCheckedChange={onCheckedChange} />)
      await user.click(screen.getByRole("switch"))
      expect(onChange).toHaveBeenCalledTimes(1)
      expect(onChange).toHaveBeenCalledWith(true)
      expect(onCheckedChange).toHaveBeenCalledTimes(1)
      expect(onCheckedChange).toHaveBeenCalledWith(true)
      await user.click(screen.getByRole("switch"))
      expect(onChange).toHaveBeenLastCalledWith(false)
      expect(onCheckedChange).toHaveBeenLastCalledWith(false)
    })

    it("toggles with Space and with Enter from the keyboard", async () => {
      const user = userEvent.setup()
      render(<Switch />)
      await user.tab()
      expect(screen.getByRole("switch")).toHaveFocus()
      await user.keyboard(" ")
      expect(screen.getByRole("switch")).toHaveAttribute("aria-checked", "true")
      await user.keyboard("{Enter}")
      expect(screen.getByRole("switch")).toHaveAttribute("aria-checked", "false")
    })

    it("starts checked with defaultChecked", () => {
      render(<Switch defaultChecked />)
      expect(screen.getByRole("switch")).toHaveAttribute("aria-checked", "true")
    })

    it("follows the controlled checked prop", async () => {
      const user = userEvent.setup()
      const onCheckedChange = vi.fn()
      const { rerender } = render(<Switch checked={false} onCheckedChange={onCheckedChange} />)
      await user.click(screen.getByRole("switch"))
      expect(onCheckedChange).toHaveBeenCalledWith(true)
      expect(screen.getByRole("switch")).toHaveAttribute("aria-checked", "false")
      rerender(<Switch checked onCheckedChange={onCheckedChange} />)
      expect(screen.getByRole("switch")).toHaveAttribute("aria-checked", "true")
    })

    it("does not toggle nor call callbacks when disabled", async () => {
      const user = userEvent.setup()
      const onCheckedChange = vi.fn()
      render(<Switch disabled label="Off" onCheckedChange={onCheckedChange} />)
      const control = screen.getByRole("switch")
      expect(control).toBeDisabled()
      await user.click(control)
      fireEvent.click(screen.getByText("Off"))
      expect(onCheckedChange).not.toHaveBeenCalled()
      expect(control).toHaveAttribute("aria-checked", "false")
    })

    it("passes through aria attributes", () => {
      render(<Switch aria-label="Dark mode" required name="dark" value="yes" />)
      const control = screen.getByRole("switch", { name: "Dark mode" })
      expect(control).toHaveAttribute("aria-required", "true")
    })
  })
})
