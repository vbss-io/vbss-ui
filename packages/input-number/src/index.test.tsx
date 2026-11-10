import { fireEvent, render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { ChangeEvent, createRef, useState } from "react"
import { describe, expect, it, vi } from "vitest"
import { InputNumber, inputNumberErrorStyles, inputNumberLabelStyles, inputNumberStyles } from "./index"

const leftControl = (container: HTMLElement) => container.querySelector(".inputNumberLeftControl") as HTMLButtonElement
const rightControl = (container: HTMLElement) => container.querySelector(".inputNumberRightControl") as HTMLButtonElement

const lastChange = (handler: ReturnType<typeof vi.fn>) =>
  handler.mock.calls[handler.mock.calls.length - 1][0] as ChangeEvent<HTMLInputElement>

describe("InputNumber", () => {
  describe("rendering", () => {
    it("renders a numeric spin button by default", () => {
      render(<InputNumber />)
      expect(screen.getByRole("spinbutton")).toHaveAttribute("type", "number")
    })

    it("renders a text input in float mode", () => {
      render(<InputNumber isFloat />)
      expect(screen.getByRole("textbox")).toHaveAttribute("type", "text")
    })

    it("renders the placeholder", () => {
      render(<InputNumber placeholder="0" />)
      expect(screen.getByPlaceholderText("0")).toBe(screen.getByRole("spinbutton"))
    })

    it("associates the label with the input", async () => {
      const user = userEvent.setup()
      render(<InputNumber label="Quantity" />)
      expect(screen.getByLabelText("Quantity")).toBe(screen.getByRole("spinbutton"))
      await user.click(screen.getByText("Quantity"))
      expect(screen.getByRole("spinbutton")).toHaveFocus()
    })

    it("does not render label nor error by default", () => {
      const { container } = render(<InputNumber />)
      expect(container.querySelector("label")).toBeNull()
      expect(container.querySelector(".inputNumberError")).toBeNull()
    })

    it("renders the error message", () => {
      render(<InputNumber error="Too many" />)
      expect(screen.getByText("Too many")).toHaveClass("inputNumberError", "text-red-500")
    })

    it("uses the provided id on input and label", () => {
      render(<InputNumber id="qty" label="Qty" />)
      expect(screen.getByRole("spinbutton")).toHaveAttribute("id", "qty")
      expect(screen.getByText("Qty")).toHaveAttribute("for", "qty")
    })

    it("forwards the ref to the input element", () => {
      let received: unknown = null
      render(
        <InputNumber
          ref={(node: unknown) => {
            received = node
          }}
        />
      )
      expect(received).toBe(screen.getByRole("spinbutton"))
    })

    it("accepts a ref object typed as the rendered input", () => {
      const ref = createRef<HTMLInputElement>()
      render(<InputNumber ref={ref} />)
      expect(ref.current).toBe(screen.getByRole("spinbutton"))
    })

    it("rejects a ref typed for another element at compile time", () => {
      const ref = createRef<HTMLDivElement>()
      // @ts-expect-error a div ref does not fit an input
      render(<InputNumber ref={ref} />)
      expect(ref.current).toBe(screen.getByRole("spinbutton"))
    })

    it("keeps the generated id stable across rerenders and linked to the label", () => {
      const { rerender } = render(<InputNumber label="Qty" />)
      const firstId = screen.getByRole("spinbutton").getAttribute("id")
      expect(firstId).toBeTruthy()
      rerender(<InputNumber label="Qty" />)
      rerender(<InputNumber label="Qty" />)
      expect(screen.getByRole("spinbutton")).toHaveAttribute("id", firstId as string)
      expect(screen.getByText("Qty")).toHaveAttribute("for", firstId as string)
      expect(screen.getByLabelText("Qty")).toBe(screen.getByRole("spinbutton"))
    })

    it("gives each instance its own generated id", () => {
      render(
        <>
          <InputNumber />
          <InputNumber />
        </>
      )
      const [first, second] = screen.getAllByRole("spinbutton")
      expect(first.id).not.toBe(second.id)
    })

    it("renders both controls by default and hides them with disableControls", () => {
      const { container, rerender } = render(<InputNumber />)
      expect(screen.getAllByRole("button")).toHaveLength(2)
      rerender(<InputNumber disableControls />)
      expect(container.querySelector(".inputNumberLeftControl")).toBeNull()
      expect(container.querySelector(".inputNumberRightControl")).toBeNull()
      expect(screen.queryByRole("button")).toBeNull()
    })

    it("renders custom plus and minus icons", () => {
      render(<InputNumber plusIcon={<i data-testid="plus" />} minusIcon={<i data-testid="minus" />} />)
      expect(screen.getByTestId("plus").closest("button")).toHaveClass("inputNumberRightControl")
      expect(screen.getByTestId("minus").closest("button")).toHaveClass("inputNumberLeftControl")
    })

    it("applies the icon paddings only for custom icons", () => {
      const { rerender } = render(<InputNumber />)
      expect(screen.getByRole("spinbutton")).not.toHaveClass("pl-8", "pr-8")
      rerender(<InputNumber plusIcon={<i />} minusIcon={<i />} />)
      expect(screen.getByRole("spinbutton")).toHaveClass("pl-8", "pr-8")
    })

    it("never emits undefined or false classes", () => {
      const { rerender } = render(<InputNumber />)
      expect(screen.getByRole("spinbutton").className).not.toMatch(/undefined|false/)
      rerender(<InputNumber minusIcon={<i />} />)
      expect(screen.getByRole("spinbutton").className).not.toMatch(/undefined|false/)
      expect(screen.getByRole("spinbutton")).toHaveClass("pl-8")
      expect(screen.getByRole("spinbutton")).not.toHaveClass("pr-8")
      rerender(<InputNumber plusIcon={<i />} />)
      expect(screen.getByRole("spinbutton").className).not.toMatch(/undefined|false/)
      expect(screen.getByRole("spinbutton")).toHaveClass("pr-8")
      expect(screen.getByRole("spinbutton")).not.toHaveClass("pl-8")
    })

    it("applies the disabled classes only when disabled", () => {
      const { rerender } = render(<InputNumber />)
      expect(screen.getByRole("spinbutton")).not.toHaveClass("cursor-not-allowed")
      rerender(<InputNumber disabled />)
      expect(screen.getByRole("spinbutton")).toHaveClass(
        "cursor-not-allowed",
        "disabled:pointer-events-none",
        "disabled:opacity-50"
      )
    })

    it("sets step and min attributes by mode", () => {
      const { rerender } = render(<InputNumber step={5} />)
      expect(screen.getByRole("spinbutton")).toHaveAttribute("step", "1")
      expect(screen.getByRole("spinbutton")).not.toHaveAttribute("min")
      rerender(<InputNumber isFloat step={0.5} denyNegative />)
      expect(screen.getByRole("textbox")).toHaveAttribute("step", "0.5")
      expect(screen.getByRole("textbox")).toHaveAttribute("min", "0")
    })

    it("exposes the display name", () => {
      expect(InputNumber.displayName).toBe("InputNumber")
    })
  })

  describe("variants", () => {
    it.each([
      ["primary", "focus-visible:border-primary"],
      ["secondary", "focus-visible:border-secondary"],
      ["outline", "border-primary"],
      ["ghost", "focus-visible:ring-0"],
    ] as const)("applies the %s variant classes to the input", (variant, expected) => {
      render(<InputNumber variant={variant} />)
      expect(screen.getByRole("spinbutton")).toHaveClass("inputNumber", expected)
    })

    it("defaults to primary, medium height and rounding", () => {
      render(<InputNumber />)
      expect(screen.getByRole("spinbutton")).toHaveClass("focus-visible:border-primary", "rounded-md", "text-base", "font-normal")
    })

    it("applies rounded, fontSize, fontWeight and className", () => {
      render(<InputNumber rounded="full" fontSize="lg" fontWeight="bold" className="custom-number" />)
      expect(screen.getByRole("spinbutton")).toHaveClass("rounded-full", "text-lg", "font-bold", "custom-number")
    })

    it("applies font settings to label and error", () => {
      render(<InputNumber label="L" error="E" fontSize="xl" fontWeight="extrabold" />)
      expect(screen.getByText("L")).toHaveClass("text-xl", "font-extrabold")
      expect(screen.getByText("E")).toHaveClass("text-sm", "font-extrabold")
    })

    it("propagates variant and rounded to the controls", () => {
      const { container } = render(<InputNumber variant="secondary" rounded="full" />)
      expect(leftControl(container)).toHaveClass("bg-secondary", "rounded-full")
      expect(rightControl(container)).toHaveClass("bg-secondary", "rounded-full")
    })

    it("lets controlsProps override the controls variant", () => {
      const { container } = render(<InputNumber variant="secondary" controlsProps={{ variant: "outline" }} />)
      expect(leftControl(container)).toHaveClass("text-primary")
      expect(rightControl(container)).toHaveClass("text-primary")
    })

    it("exposes the style helpers", () => {
      expect(inputNumberStyles({ variant: "secondary" })).toContain("focus-visible:border-secondary")
      expect(inputNumberLabelStyles({ fontSize: "lg" })).toContain("text-lg")
      expect(inputNumberErrorStyles({ fontWeight: "thin" })).toContain("font-thin")
    })
  })

  describe("typing", () => {
    it("types digits and calls onChange for each", async () => {
      const user = userEvent.setup()
      const onChange = vi.fn()
      render(<InputNumber onChange={onChange} />)
      await user.type(screen.getByRole("spinbutton"), "123")
      expect(onChange).toHaveBeenCalledTimes(3)
      expect(screen.getByRole("spinbutton")).toHaveValue(123)
    })

    it("rounds fractional input in integer mode", () => {
      const onChange = vi.fn()
      render(<InputNumber onChange={onChange} />)
      fireEvent.change(screen.getByRole("spinbutton"), { target: { value: "1.5" } })
      expect(onChange).toHaveBeenCalledTimes(1)
      expect(lastChange(onChange).target.value).toBe("2")
      expect(screen.getByRole("spinbutton")).toHaveValue(2)
    })

    it("keeps decimals in float mode", async () => {
      const user = userEvent.setup()
      const onChange = vi.fn()
      render(<InputNumber isFloat onChange={onChange} />)
      await user.type(screen.getByRole("textbox"), "1.25")
      expect(onChange).toHaveBeenCalledTimes(4)
      expect(screen.getByRole("textbox")).toHaveValue("1.25")
    })

    it("accepts lone sign and dot while typing in float mode", async () => {
      const user = userEvent.setup()
      const onChange = vi.fn()
      render(<InputNumber isFloat onChange={onChange} />)
      await user.type(screen.getByRole("textbox"), "-.")
      expect(onChange).toHaveBeenCalledTimes(2)
      expect(lastChange(onChange).target.value).toBe("-.")
    })

    it("ignores values that are not numbers in float mode", () => {
      const onChange = vi.fn()
      render(<InputNumber isFloat onChange={onChange} />)
      fireEvent.change(screen.getByRole("textbox"), { target: { value: "abc" } })
      fireEvent.change(screen.getByRole("textbox"), { target: { value: "1.2.3" } })
      expect(onChange).not.toHaveBeenCalled()
    })

    it("clamps negative typed values to zero when denyNegative without onChange", () => {
      render(<InputNumber denyNegative />)
      fireEvent.change(screen.getByRole("spinbutton"), { target: { value: "-5" } })
      expect(screen.getByRole("spinbutton")).toHaveValue(0)
    })

    it("rounds fractional typed values in integer mode without onChange", () => {
      render(<InputNumber />)
      fireEvent.change(screen.getByRole("spinbutton"), { target: { value: "1.5" } })
      expect(screen.getByRole("spinbutton")).toHaveValue(2)
    })

    it("keeps the last valid value when float input is rejected without onChange", () => {
      render(<InputNumber isFloat />)
      const field = screen.getByRole("textbox")
      fireEvent.change(field, { target: { value: "1.5" } })
      expect(field).toHaveValue("1.5")
      fireEvent.change(field, { target: { value: "1.5a" } })
      expect(field).toHaveValue("1.5")
      fireEvent.change(field, { target: { value: "1.2.3" } })
      expect(field).toHaveValue("1.5")
    })

    it("falls back to the default value when the first float input is rejected", () => {
      render(<InputNumber isFloat defaultValue="2" />)
      fireEvent.change(screen.getByRole("textbox"), { target: { value: "x" } })
      expect(screen.getByRole("textbox")).toHaveValue("2")
    })

    it("restores the controlled value when float input is rejected", () => {
      const Controlled = () => {
        const [value, setValue] = useState("3")
        return <InputNumber isFloat value={value} onChange={(e) => setValue(e.target.value)} />
      }
      render(<Controlled />)
      fireEvent.change(screen.getByRole("textbox"), { target: { value: "3x" } })
      expect(screen.getByRole("textbox")).toHaveValue("3")
    })

    it("accepts an emptied field without onChange", async () => {
      const user = userEvent.setup()
      render(<InputNumber defaultValue={5} />)
      await user.clear(screen.getByRole("spinbutton"))
      expect(screen.getByRole("spinbutton")).toHaveValue(null)
    })

    it("forwards an emptied field to onChange", async () => {
      const user = userEvent.setup()
      const onChange = vi.fn()
      render(<InputNumber defaultValue={5} onChange={onChange} />)
      await user.clear(screen.getByRole("spinbutton"))
      expect(onChange).toHaveBeenCalledTimes(1)
      expect(lastChange(onChange).target.value).toBe("")
    })

    it("clamps negative typed values to zero when denyNegative", () => {
      const onChange = vi.fn()
      render(<InputNumber denyNegative onChange={onChange} />)
      fireEvent.change(screen.getByRole("spinbutton"), { target: { value: "-5" } })
      expect(lastChange(onChange).target.value).toBe("0")
      expect(screen.getByRole("spinbutton")).toHaveValue(0)
    })

    it("accepts negative typed values by default", () => {
      const onChange = vi.fn()
      render(<InputNumber onChange={onChange} />)
      fireEvent.change(screen.getByRole("spinbutton"), { target: { value: "-5" } })
      expect(lastChange(onChange).target.value).toBe("-5")
    })

    it("works without an onChange handler", async () => {
      const user = userEvent.setup()
      render(<InputNumber />)
      await user.type(screen.getByRole("spinbutton"), "42")
      expect(screen.getByRole("spinbutton")).toHaveValue(42)
    })

    it("blocks typing when disabled", async () => {
      const user = userEvent.setup()
      const onChange = vi.fn()
      render(<InputNumber disabled onChange={onChange} />)
      expect(screen.getByRole("spinbutton")).toBeDisabled()
      await user.type(screen.getByRole("spinbutton"), "1")
      expect(onChange).not.toHaveBeenCalled()
    })
  })

  describe("controls", () => {
    it("increments by one from an empty field", async () => {
      const user = userEvent.setup()
      const onChange = vi.fn()
      const { container } = render(<InputNumber onChange={onChange} />)
      await user.click(rightControl(container))
      expect(lastChange(onChange).target.value).toBe("1")
      expect(screen.getByRole("spinbutton")).toHaveValue(1)
    })

    it("decrements by one from an empty field", async () => {
      const user = userEvent.setup()
      const onChange = vi.fn()
      const { container } = render(<InputNumber onChange={onChange} />)
      await user.click(leftControl(container))
      expect(lastChange(onChange).target.value).toBe("-1")
      expect(screen.getByRole("spinbutton")).toHaveValue(-1)
    })

    it("steps by the configured step", async () => {
      const user = userEvent.setup()
      const onChange = vi.fn()
      const { container } = render(<InputNumber step={5} defaultValue={10} onChange={onChange} />)
      await user.click(rightControl(container))
      expect(screen.getByRole("spinbutton")).toHaveValue(15)
      await user.click(leftControl(container))
      await user.click(leftControl(container))
      expect(screen.getByRole("spinbutton")).toHaveValue(5)
      expect(onChange).toHaveBeenCalledTimes(3)
    })

    it("updates the field even without an onChange handler", async () => {
      const user = userEvent.setup()
      const { container } = render(<InputNumber defaultValue={3} />)
      await user.click(rightControl(container))
      expect(screen.getByRole("spinbutton")).toHaveValue(4)
    })

    it("steps by decimals in float mode without floating point drift", async () => {
      const user = userEvent.setup()
      const onChange = vi.fn()
      const { container } = render(<InputNumber isFloat step={0.1} defaultValue="0.2" onChange={onChange} />)
      await user.click(rightControl(container))
      expect(lastChange(onChange).target.value).toBe("0.3")
      expect(screen.getByRole("textbox")).toHaveValue("0.3")
    })

    it("rounds the result in integer mode when step is fractional", async () => {
      const user = userEvent.setup()
      const { container } = render(<InputNumber step={0.4} defaultValue={1} />)
      await user.click(rightControl(container))
      expect(screen.getByRole("spinbutton")).toHaveValue(1)
    })

    it("does not step below zero when denyNegative", async () => {
      const user = userEvent.setup()
      const onChange = vi.fn()
      const { container } = render(<InputNumber denyNegative defaultValue={0} onChange={onChange} />)
      await user.click(leftControl(container))
      expect(onChange).not.toHaveBeenCalled()
      expect(screen.getByRole("spinbutton")).toHaveValue(0)
    })

    it("steps down to zero when denyNegative", async () => {
      const user = userEvent.setup()
      const { container } = render(<InputNumber denyNegative defaultValue={1} />)
      await user.click(leftControl(container))
      expect(screen.getByRole("spinbutton")).toHaveValue(0)
    })

    it("hands a real change event to onChange when a control is clicked", async () => {
      const user = userEvent.setup()
      let currentTarget: EventTarget | null = null
      const onChange = vi.fn((e: ChangeEvent<HTMLInputElement>) => {
        currentTarget = e.currentTarget
      })
      const { container } = render(<InputNumber name="qty" id="qty-id" onChange={onChange} />)
      await user.click(rightControl(container))
      const event = lastChange(onChange)
      const input = screen.getByRole("spinbutton")
      expect(event.target).toBe(input)
      expect(event.target).toBeInstanceOf(HTMLInputElement)
      expect(event.target.name).toBe("qty")
      expect(event.target.id).toBe("qty-id")
      expect(currentTarget).toBe(input)
      expect(typeof event.preventDefault).toBe("function")
      expect(event.target.value).toBe("1")
    })

    it("calls onChange once per control click", async () => {
      const user = userEvent.setup()
      const onChange = vi.fn()
      const { container } = render(<InputNumber defaultValue={1} onChange={onChange} />)
      await user.click(rightControl(container))
      await user.click(leftControl(container))
      expect(onChange).toHaveBeenCalledTimes(2)
    })

    it("keeps an object ref working when a control is clicked", async () => {
      const user = userEvent.setup()
      const ref = createRef<HTMLInputElement>()
      const { container } = render(<InputNumber ref={ref} defaultValue={4} />)
      await user.click(rightControl(container))
      expect(ref.current).toBe(screen.getByRole("spinbutton"))
      expect(ref.current?.value).toBe("5")
    })

    it("keeps a callback ref working when a control is clicked", async () => {
      const user = userEvent.setup()
      const received: Array<HTMLInputElement | null> = []
      const { container } = render(<InputNumber ref={(node: HTMLInputElement | null) => received.push(node)} defaultValue={4} />)
      await user.click(rightControl(container))
      expect(received[0]).toBe(screen.getByRole("spinbutton"))
      expect(screen.getByRole("spinbutton")).toHaveValue(5)
    })

    it("disables the minus control for a numeric zero value with denyNegative", () => {
      const { container } = render(<InputNumber denyNegative value={0} onChange={() => {}} />)
      expect(leftControl(container)).toBeDisabled()
      expect(rightControl(container)).toBeEnabled()
    })

    it("keeps the minus control enabled for an empty or missing value with denyNegative", () => {
      const { container, rerender } = render(<InputNumber denyNegative value="" onChange={() => {}} />)
      expect(leftControl(container)).toBeEnabled()
      rerender(<InputNumber denyNegative />)
      expect(leftControl(container)).toBeEnabled()
    })

    it("disables the minus control for a numeric value below the step with denyNegative", () => {
      const { container } = render(<InputNumber denyNegative step={2} value={1} onChange={() => {}} />)
      expect(leftControl(container)).toBeDisabled()
    })

    it("disables the minus control when a controlled value cannot go lower", () => {
      const { container } = render(<InputNumber denyNegative value="0" onChange={() => {}} />)
      expect(leftControl(container)).toBeDisabled()
      expect(rightControl(container)).toBeEnabled()
    })

    it("keeps the minus control enabled while the controlled value can go lower", () => {
      const { container } = render(<InputNumber denyNegative step={2} value="2" onChange={() => {}} />)
      expect(leftControl(container)).toBeEnabled()
    })

    it("works with a controlled parent", async () => {
      const Controlled = () => {
        const [value, setValue] = useState("5")
        return <InputNumber value={value} onChange={(e) => setValue(e.target.value)} />
      }
      const user = userEvent.setup()
      const { container } = render(<Controlled />)
      await user.click(rightControl(container))
      await user.click(rightControl(container))
      expect(screen.getByRole("spinbutton")).toHaveValue(7)
      await user.click(leftControl(container))
      expect(screen.getByRole("spinbutton")).toHaveValue(6)
    })

    it("disables both controls when the input is disabled", async () => {
      const user = userEvent.setup()
      const onChange = vi.fn()
      const { container } = render(<InputNumber disabled defaultValue={1} onChange={onChange} />)
      expect(leftControl(container)).toBeDisabled()
      expect(rightControl(container)).toBeDisabled()
      await user.click(rightControl(container))
      expect(onChange).not.toHaveBeenCalled()
    })

    it("merges the controlsProps className with the base control classes", () => {
      const { container } = render(<InputNumber controlsProps={{ className: "ctl" }} />)
      expect(leftControl(container)).toHaveClass("inputNumberLeftControl", "ctl")
      expect(rightControl(container)).toHaveClass("inputNumberRightControl", "ctl")
    })

    it("keeps the component handlers and disabled state over controlsProps", async () => {
      const user = userEvent.setup()
      const onChange = vi.fn()
      const { container, rerender } = render(
        <InputNumber defaultValue={1} onChange={onChange} controlsProps={{ className: "ctl" }} />
      )
      await user.click(rightControl(container))
      expect(onChange).toHaveBeenCalledTimes(1)
      rerender(<InputNumber disabled controlsProps={{ className: "ctl" }} />)
      expect(leftControl(container)).toBeDisabled()
      expect(rightControl(container)).toBeDisabled()
    })

    it("passes controlsProps to both controls", () => {
      render(<InputNumber controlsProps={{ "aria-label": "adjust" }} />)
      expect(screen.getAllByRole("button", { name: "adjust" })).toHaveLength(2)
    })
  })
})
