import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { useState } from "react"
import { describe, expect, it, vi } from "vitest"
import { Input, inputErrorStyles, inputIconStyles, inputLabelStyles, inputStyles } from "./index"

describe("Input", () => {
  describe("rendering", () => {
    it("renders a text input by default", () => {
      render(<Input />)
      expect(screen.getByRole("textbox")).toHaveAttribute("type", "text")
    })

    it("renders the placeholder", () => {
      render(<Input placeholder="Type" />)
      expect(screen.getByPlaceholderText("Type")).toBe(screen.getByRole("textbox"))
    })

    it("associates the label with the input", async () => {
      const user = userEvent.setup()
      render(<Input label="Name" />)
      expect(screen.getByLabelText("Name")).toBe(screen.getByRole("textbox"))
      await user.click(screen.getByText("Name"))
      expect(screen.getByRole("textbox")).toHaveFocus()
    })

    it("does not render label nor error by default", () => {
      const { container } = render(<Input />)
      expect(container.querySelector("label")).toBeNull()
      expect(container.querySelector(".inputError")).toBeNull()
    })

    it("renders the error message", () => {
      render(<Input error="Invalid value" />)
      expect(screen.getByText("Invalid value")).toHaveClass("inputError", "text-red-500")
    })

    it("uses the provided id on input and label", () => {
      render(<Input id="email" label="Email" />)
      expect(screen.getByRole("textbox")).toHaveAttribute("id", "email")
      expect(screen.getByText("Email")).toHaveAttribute("for", "email")
    })

    it("renders the number type", () => {
      render(<Input type="number" />)
      expect(screen.getByRole("spinbutton")).toHaveAttribute("type", "number")
    })

    it("forwards the ref to the input element", () => {
      let received: unknown = null
      render(
        <Input
          ref={(node: unknown) => {
            received = node
          }}
        />
      )
      expect(received).toBe(screen.getByRole("textbox"))
    })

    it("passes native attributes through", () => {
      render(<Input name="user" maxLength={10} aria-label="User" />)
      const input = screen.getByRole("textbox", { name: "User" })
      expect(input).toHaveAttribute("name", "user")
      expect(input).toHaveAttribute("maxlength", "10")
    })

    it("exposes the display name", () => {
      expect(Input.displayName).toBe("Input")
    })
  })

  describe("variants", () => {
    it.each([
      ["primary", "focus-visible:border-primary"],
      ["secondary", "focus-visible:border-secondary"],
      ["outline", "border-primary"],
      ["ghost", "focus-visible:ring-0"],
    ] as const)("applies the %s variant classes", (variant, expected) => {
      render(<Input variant={variant} />)
      expect(screen.getByRole("textbox")).toHaveClass("input", expected)
    })

    it("defaults to primary, medium height and rounding", () => {
      render(<Input />)
      expect(screen.getByRole("textbox")).toHaveClass("focus-visible:border-primary", "rounded-md", "text-base", "font-normal")
    })

    it("applies height, rounded, fontSize and fontWeight", () => {
      render(<Input height="xl" rounded="full" fontSize="lg" fontWeight="bold" />)
      expect(screen.getByRole("textbox")).toHaveClass("rounded-full", "text-lg", "font-bold")
    })

    it("applies the custom className", () => {
      render(<Input className="custom-input" />)
      expect(screen.getByRole("textbox")).toHaveClass("custom-input")
    })

    it("applies font settings to label and error", () => {
      render(<Input label="L" error="E" fontSize="xl" fontWeight="extrabold" />)
      expect(screen.getByText("L")).toHaveClass("text-xl", "font-extrabold")
      expect(screen.getByText("E")).toHaveClass("text-sm", "font-extrabold")
    })

    it("exposes the style helpers", () => {
      expect(inputStyles({ variant: "secondary" })).toContain("focus-visible:border-secondary")
      expect(inputIconStyles({ height: "md" })).toContain("opacity-50")
      expect(inputLabelStyles({ fontSize: "lg" })).toContain("text-lg")
      expect(inputErrorStyles({ fontWeight: "thin" })).toContain("font-thin")
    })
  })

  describe("interaction", () => {
    it("types and calls onChange", async () => {
      const user = userEvent.setup()
      const onChange = vi.fn()
      render(<Input onChange={onChange} />)
      await user.type(screen.getByRole("textbox"), "abc")
      expect(onChange).toHaveBeenCalledTimes(3)
      expect(screen.getByRole("textbox")).toHaveValue("abc")
    })

    it("shows a controlled value", async () => {
      const Controlled = () => {
        const [value, setValue] = useState("a")
        return <Input value={value} onChange={(e) => setValue(e.target.value + "|")} />
      }
      const user = userEvent.setup()
      render(<Controlled />)
      expect(screen.getByRole("textbox")).toHaveValue("a")
      await user.type(screen.getByRole("textbox"), "b")
      expect(screen.getByRole("textbox")).toHaveValue("ab|")
    })

    it("blocks typing when disabled", async () => {
      const user = userEvent.setup()
      const onChange = vi.fn()
      render(<Input disabled onChange={onChange} />)
      expect(screen.getByRole("textbox")).toBeDisabled()
      await user.type(screen.getByRole("textbox"), "abc")
      expect(onChange).not.toHaveBeenCalled()
    })

    it("calls focus and blur handlers", async () => {
      const user = userEvent.setup()
      const onFocus = vi.fn()
      const onBlur = vi.fn()
      render(<Input onFocus={onFocus} onBlur={onBlur} />)
      await user.click(screen.getByRole("textbox"))
      expect(onFocus).toHaveBeenCalledTimes(1)
      await user.tab()
      expect(onBlur).toHaveBeenCalledTimes(1)
    })
  })

  describe("password", () => {
    it("renders a password field without a toggle by default", () => {
      const { container } = render(<Input type="password" defaultValue="secret" />)
      expect(container.querySelector("input")).toHaveAttribute("type", "password")
      expect(container.querySelector(".inputIconOnContainer")).toBeNull()
      expect(container.querySelector(".inputIconOffContainer")).toBeNull()
    })

    it("toggles visibility with the default icons", async () => {
      const user = userEvent.setup()
      const { container } = render(<Input type="password" showPasswordSwitch defaultValue="secret" />)
      const input = container.querySelector("input") as HTMLInputElement
      expect(input).toHaveAttribute("type", "password")
      await user.click(container.querySelector(".inputIconOnContainer") as HTMLElement)
      expect(input).toHaveAttribute("type", "text")
      expect(container.querySelector(".inputIconOnContainer")).toBeNull()
      await user.click(container.querySelector(".inputIconOffContainer") as HTMLElement)
      expect(input).toHaveAttribute("type", "password")
      expect(container.querySelector(".inputIconOffContainer")).toBeNull()
    })

    it("keeps the typed value while toggling", async () => {
      const user = userEvent.setup()
      const { container } = render(<Input type="password" showPasswordSwitch />)
      const input = container.querySelector("input") as HTMLInputElement
      await user.type(input, "hunter2")
      await user.click(container.querySelector(".inputIconOnContainer") as HTMLElement)
      expect(input).toHaveValue("hunter2")
    })

    it("renders custom icons for the on and off states", async () => {
      const user = userEvent.setup()
      render(
        <Input
          type="password"
          showPasswordSwitch
          iconOn={<i data-testid="custom-on" />}
          iconOff={<i data-testid="custom-off" />}
        />
      )
      expect(screen.getByTestId("custom-on")).toBeInTheDocument()
      expect(screen.queryByTestId("custom-off")).toBeNull()
      await user.click(screen.getByTestId("custom-on"))
      expect(screen.getByTestId("custom-off")).toBeInTheDocument()
      expect(screen.queryByTestId("custom-on")).toBeNull()
    })

    it("marks the toggle as non-interactive when disabled", () => {
      const { container } = render(<Input type="password" showPasswordSwitch disabled />)
      expect(container.querySelector(".inputIconOnContainer")).toHaveClass("pointer-events-none")
    })

    it("marks the toggle as clickable when enabled", () => {
      const { container } = render(<Input type="password" showPasswordSwitch />)
      expect(container.querySelector(".inputIconOnContainer")).toHaveClass("cursor-pointer")
    })

    it("marks the off-state toggle as non-interactive when disabled", async () => {
      const user = userEvent.setup()
      const { container, rerender } = render(<Input type="password" showPasswordSwitch />)
      await user.click(container.querySelector(".inputIconOnContainer") as HTMLElement)
      rerender(<Input type="password" showPasswordSwitch disabled />)
      expect(container.querySelector(".inputIconOffContainer")).toHaveClass("pointer-events-none")
    })

    it("reserves right padding when a toggle icon is present", () => {
      render(<Input type="password" showPasswordSwitch />)
      expect(document.querySelector("input")).toHaveClass("pr-8")
    })
  })

  describe("button", () => {
    it("renders no button without buttonProps", () => {
      render(<Input />)
      expect(screen.queryByRole("button")).toBeNull()
    })

    it("renders an attached button and fires its onClick", async () => {
      const user = userEvent.setup()
      const onClick = vi.fn()
      render(<Input buttonProps={{ children: "Go", onClick }} />)
      const button = screen.getByRole("button", { name: "Go" })
      expect(screen.getByRole("textbox")).toHaveClass("!rounded-e-none")
      expect(button).toHaveClass("rounded-s-none")
      await user.click(button)
      expect(onClick).toHaveBeenCalledTimes(1)
    })

    it("disables the attached button together with the input", () => {
      render(<Input disabled buttonProps={{ children: "Go" }} />)
      expect(screen.getByRole("button", { name: "Go" })).toBeDisabled()
    })

    it("lets buttonProps override the button defaults", () => {
      render(<Input disabled buttonProps={{ children: "Go", disabled: false, variant: "secondary" }} />)
      const button = screen.getByRole("button", { name: "Go" })
      expect(button).toBeEnabled()
      expect(button).toHaveClass("bg-secondary")
    })

    it("sizes the button after the input height", () => {
      render(<Input height="xl" buttonProps={{ children: "Go" }} />)
      expect(screen.getByRole("button", { name: "Go" })).toHaveClass("h-12")
    })
  })
})
