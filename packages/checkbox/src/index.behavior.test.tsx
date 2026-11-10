import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { createRef } from "react"
import { describe, expect, it, vi } from "vitest"
import { Checkbox, CheckboxComponent, checkboxLabelStyles, checkboxStyles, SwitchComponent } from "./index"

const classesOf = (styles: string) => styles.split(" ").filter(Boolean)

describe("Checkbox behavior", () => {
  describe("label association", () => {
    it("names the checkbox by its label", () => {
      render(<Checkbox label="Accept terms" />)
      expect(screen.getByRole("checkbox", { name: "Accept terms" })).toBeInTheDocument()
    })

    it("toggles when the label text is clicked", async () => {
      const user = userEvent.setup()
      const onChangeChecked = vi.fn()
      render(<Checkbox label="Newsletter" onChangeChecked={onChangeChecked} />)
      await user.click(screen.getByText("Newsletter"))
      expect(onChangeChecked).toHaveBeenCalledWith(true)
      expect(screen.getByRole("checkbox")).toBeChecked()
    })

    it("uses the given id for the checkbox and links the label to it", () => {
      render(<Checkbox id="terms" label="Terms" />)
      expect(screen.getByRole("checkbox")).toHaveAttribute("id", "terms")
      expect(screen.getByText("Terms")).toHaveAttribute("for", "terms")
    })

    it("does not render a label element without label", () => {
      render(<Checkbox aria-label="Standalone" />)
      expect(document.querySelector("label")).not.toBeInTheDocument()
      expect(screen.getByRole("checkbox", { name: "Standalone" })).toBeInTheDocument()
    })

    it.each(["xs", "sm", "md", "lg", "xl"] as const)("applies the label fontSize %s", (fontSize) => {
      render(<Checkbox label="Label" fontSize={fontSize} />)
      expect(screen.getByText("Label")).toHaveClass(...classesOf(checkboxLabelStyles({ fontSize })))
    })

    it.each(["thin", "light", "normal", "medium", "bold", "extrabold"] as const)(
      "applies the label fontWeight %s",
      (fontWeight) => {
        render(<Checkbox label="Label" fontWeight={fontWeight} />)
        expect(screen.getByText("Label")).toHaveClass(`font-${fontWeight}`)
      }
    )
  })

  describe("uncontrolled and keyboard", () => {
    it("starts checked with defaultChecked and toggles on click", async () => {
      const user = userEvent.setup()
      render(<Checkbox defaultChecked />)
      const checkbox = screen.getByRole("checkbox")
      expect(checkbox).toBeChecked()
      await user.click(checkbox)
      expect(checkbox).not.toBeChecked()
    })

    it("toggles with the Space key when focused", async () => {
      const user = userEvent.setup()
      const onChangeChecked = vi.fn()
      render(<Checkbox onChangeChecked={onChangeChecked} />)
      await user.tab()
      expect(screen.getByRole("checkbox")).toHaveFocus()
      await user.keyboard(" ")
      expect(onChangeChecked).toHaveBeenLastCalledWith(true)
      await user.keyboard(" ")
      expect(onChangeChecked).toHaveBeenLastCalledWith(false)
    })

    it("skips a disabled checkbox when tabbing", async () => {
      const user = userEvent.setup()
      render(<Checkbox disabled label="Off" />)
      await user.tab()
      expect(screen.getByRole("checkbox")).not.toHaveFocus()
      expect(screen.getByRole("checkbox")).toBeDisabled()
      expect(screen.getByRole("checkbox")).toHaveClass("disabled:opacity-50")
    })

    it("keeps a controlled checkbox unchanged until the parent updates", async () => {
      const user = userEvent.setup()
      const onChangeChecked = vi.fn()
      render(<Checkbox checked={false} onChangeChecked={onChangeChecked} />)
      await user.click(screen.getByRole("checkbox"))
      expect(onChangeChecked).toHaveBeenCalledWith(true)
      expect(screen.getByRole("checkbox")).not.toBeChecked()
    })

    it("reports the indeterminate state as aria-checked mixed", () => {
      render(<Checkbox checked="indeterminate" />)
      expect(screen.getByRole("checkbox")).toHaveAttribute("aria-checked", "mixed")
    })

    it("passes the raw CheckedState to the deprecated onCheckedChange", async () => {
      const user = userEvent.setup()
      const onCheckedChange = vi.fn()
      render(<Checkbox onCheckedChange={onCheckedChange} />)
      await user.click(screen.getByRole("checkbox"))
      expect(onCheckedChange).toHaveBeenCalledWith(true)
    })
  })

  describe("indicator", () => {
    it("renders the default check icon only while checked", async () => {
      const user = userEvent.setup()
      render(<Checkbox />)
      const checkbox = screen.getByRole("checkbox")
      expect(checkbox.querySelector("svg")).not.toBeInTheDocument()
      await user.click(checkbox)
      expect(checkbox.querySelector("svg")).toBeInTheDocument()
    })

    it("renders a custom icon instead of the default one when checked", () => {
      render(<Checkbox defaultChecked icon={<span data-testid="custom-icon">x</span>} />)
      const checkbox = screen.getByRole("checkbox")
      expect(checkbox).toContainElement(screen.getByTestId("custom-icon"))
      expect(checkbox.querySelector("svg")).not.toBeInTheDocument()
    })
  })

  describe("form integration and styling", () => {
    it("forwards name, value and required to the checkbox", () => {
      render(<Checkbox name="plan" value="pro" required />)
      const checkbox = screen.getByRole("checkbox")
      expect(checkbox).toBeRequired()
      expect(checkbox).toHaveAttribute("value", "pro")
    })

    it("submits its value with the form when checked", async () => {
      const user = userEvent.setup()
      render(
        <form data-testid="form">
          <Checkbox name="plan" value="pro" label="Pro" />
        </form>
      )
      await user.click(screen.getByRole("checkbox"))
      const data = new FormData(screen.getByTestId("form") as HTMLFormElement)
      expect(data.get("plan")).toBe("pro")
    })

    it.each(["primary", "secondary", "outline", "ghost"] as const)("applies the %s variant classes", (variant) => {
      render(<Checkbox variant={variant} />)
      expect(screen.getByRole("checkbox")).toHaveClass(...classesOf(checkboxStyles({ variant })))
    })

    it.each(["xs", "sm", "md", "lg", "xl"] as const)("applies the %s size classes", (size) => {
      render(<Checkbox size={size} />)
      expect(screen.getByRole("checkbox")).toHaveClass(...classesOf(checkboxStyles({ size })))
    })

    it.each(["none", "sm", "md", "lg", "full"] as const)("applies the rounded %s class", (rounded) => {
      render(<Checkbox rounded={rounded} />)
      expect(screen.getByRole("checkbox")).toHaveClass(`rounded-${rounded}`)
    })

    it("appends the consumer className on the checkbox", () => {
      render(<Checkbox className="mine" />)
      expect(screen.getByRole("checkbox")).toHaveClass("checkboxRoot", "mine")
    })

    it("forwards the ref to the checkbox button", () => {
      let received: unknown = null
      render(<Checkbox ref={(node: unknown) => (received = node)} />)
      expect(received).toBe(screen.getByRole("checkbox"))
    })

    it("exposes its displayName", () => {
      expect(Checkbox.displayName).toBe("Checkbox")
    })
  })

  describe("generated id", () => {
    it("keeps the generated id between rerenders and links the label", () => {
      const { rerender } = render(<Checkbox label="Stable" />)
      const first = screen.getByRole("checkbox").id
      rerender(<Checkbox label="Stable" />)
      rerender(<Checkbox label="Stable" />)
      expect(first).not.toBe("")
      expect(screen.getByRole("checkbox").id).toBe(first)
      expect(screen.getByLabelText("Stable")).toBe(screen.getByRole("checkbox"))
    })

    it("gives two checkboxes distinct generated ids", () => {
      render(
        <>
          <Checkbox label="One" />
          <Checkbox label="Two" />
        </>
      )
      expect(screen.getByLabelText("One").id).not.toBe(screen.getByLabelText("Two").id)
    })
  })

  describe("label classes", () => {
    it("does not add a text-undefined class when size is omitted", () => {
      render(<Checkbox label="Plain" />)
      const classes = Array.from(screen.getByText("Plain").classList)
      expect(classes.filter((name) => name.startsWith("text-undefined"))).toEqual([])
    })

    it.each(["xs", "sm", "md", "lg", "xl"] as const)("keeps the label text size only from fontSize when size is %s", (size) => {
      const fontSize = size === "xl" ? "xs" : "xl"
      render(<Checkbox label="Sized" size={size} fontSize={fontSize} />)
      const label = screen.getByText("Sized")
      expect(label).toHaveClass(`text-${fontSize}`)
      expect(label).not.toHaveClass(`text-${size}`)
    })

    it("uses the default fontSize class on the label", () => {
      render(<Checkbox label="Default" size="md" />)
      const label = screen.getByText("Default")
      expect(label).toHaveClass("text-base")
      expect(label).not.toHaveClass("text-md")
    })
  })

  describe("ref typing", () => {
    it("accepts a ref object typed as the rendered button", () => {
      const ref = createRef<HTMLButtonElement>()
      render(<Checkbox ref={ref} aria-label="Typed" />)
      expect(ref.current).toBe(screen.getByRole("checkbox"))
    })

    it("rejects a ref typed for another element at compile time", () => {
      const ref = createRef<HTMLDivElement>()
      // @ts-expect-error a div ref does not fit a button
      render(<Checkbox ref={ref} aria-label="Wrong" />)
      expect(screen.getByRole("checkbox")).toBeInTheDocument()
    })

    it("keeps SwitchComponent as an alias of CheckboxComponent", () => {
      const alias: SwitchComponent = Checkbox
      const named: CheckboxComponent = alias
      expect(named).toBe(Checkbox)
    })
  })
})
