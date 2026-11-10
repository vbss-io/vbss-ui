import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { createRef, useState } from "react"
import { describe, expect, it, vi } from "vitest"
import { Textarea, textAreaLabelStyles, textareaErrorStyles, textareaStyles } from "./index"

describe("Textarea", () => {
  describe("rendering", () => {
    it("renders a textbox", () => {
      render(<Textarea />)
      expect(screen.getByRole("textbox").tagName).toBe("TEXTAREA")
    })

    it("renders the placeholder", () => {
      render(<Textarea placeholder="Write here" />)
      expect(screen.getByPlaceholderText("Write here")).toBe(screen.getByRole("textbox"))
    })

    it("associates the label with the textarea", async () => {
      const user = userEvent.setup()
      render(<Textarea label="Bio" />)
      expect(screen.getByLabelText("Bio")).toBe(screen.getByRole("textbox"))
      await user.click(screen.getByText("Bio"))
      expect(screen.getByRole("textbox")).toHaveFocus()
    })

    it("does not render label nor error by default", () => {
      const { container } = render(<Textarea />)
      expect(container.querySelector("label")).toBeNull()
      expect(container.querySelector(".textareaError")).toBeNull()
    })

    it("renders the error message", () => {
      render(<Textarea error="Required field" />)
      expect(screen.getByText("Required field")).toHaveClass("textareaError", "text-red-500")
    })

    it("uses the provided id on the textarea and on the label", () => {
      render(<Textarea id="notes" label="Notes" />)
      expect(screen.getByRole("textbox")).toHaveAttribute("id", "notes")
      expect(screen.getByText("Notes")).toHaveAttribute("for", "notes")
    })

    it("keeps a stable generated id between rerenders and links the label", () => {
      const { rerender } = render(<Textarea label="Bio" />)
      const first = screen.getByLabelText("Bio").getAttribute("id")
      expect(first).toBeTruthy()
      rerender(<Textarea label="Bio" placeholder="again" />)
      rerender(<Textarea label="Bio" placeholder="third" />)
      expect(screen.getByLabelText("Bio")).toHaveAttribute("id", first as string)
      expect(screen.getByText("Bio")).toHaveAttribute("for", first as string)
    })

    it("generates a different id for each textarea", () => {
      render(
        <>
          <Textarea label="A" />
          <Textarea label="B" />
        </>
      )
      expect(screen.getByLabelText("A").id).not.toBe(screen.getByLabelText("B").id)
    })

    it("forwards the ref to the textarea element", () => {
      let received: unknown = null
      render(
        <Textarea
          ref={(node: unknown) => {
            received = node
          }}
        />
      )
      expect(received).toBe(screen.getByRole("textbox"))
    })

    it("passes native attributes through", () => {
      render(<Textarea rows={7} maxLength={20} name="comment" aria-label="Comment" />)
      const area = screen.getByRole("textbox", { name: "Comment" })
      expect(area).toHaveAttribute("rows", "7")
      expect(area).toHaveAttribute("maxlength", "20")
      expect(area).toHaveAttribute("name", "comment")
    })

    it("exposes the display name", () => {
      expect(Textarea.displayName).toBe("Textarea")
    })
  })

  describe("variants", () => {
    it.each([
      ["primary", "focus-visible:border-primary"],
      ["secondary", "focus-visible:border-secondary"],
      ["outline", "border-primary"],
      ["ghost", "focus-visible:ring-0"],
    ] as const)("applies the %s variant classes", (variant, expected) => {
      render(<Textarea variant={variant} />)
      expect(screen.getByRole("textbox")).toHaveClass("textarea", expected)
    })

    it("defaults to the primary variant with medium rounding, size and normal weight", () => {
      render(<Textarea />)
      expect(screen.getByRole("textbox")).toHaveClass("focus-visible:border-primary", "rounded-md", "text-base", "font-normal")
    })

    it("applies rounded, fontSize and fontWeight", () => {
      render(<Textarea rounded="full" fontSize="xl" fontWeight="bold" />)
      expect(screen.getByRole("textbox")).toHaveClass("rounded-full", "text-xl", "font-bold")
    })

    it("applies the custom className", () => {
      render(<Textarea className="custom-area" />)
      expect(screen.getByRole("textbox")).toHaveClass("custom-area", "textarea")
    })

    it("applies the disabled variant classes when disabled", () => {
      render(<Textarea disabled />)
      expect(screen.getByRole("textbox")).toHaveClass("cursor-not-allowed", "disabled:pointer-events-none", "disabled:opacity-50")
    })

    it("does not apply the disabled variant classes when enabled", () => {
      render(<Textarea />)
      expect(screen.getByRole("textbox")).not.toHaveClass("cursor-not-allowed")
    })

    it("applies font settings to the label and font weight to the error", () => {
      render(<Textarea label="Label" error="Oops" fontSize="lg" fontWeight="extrabold" />)
      expect(screen.getByText("Label")).toHaveClass("text-lg", "font-extrabold")
      expect(screen.getByText("Oops")).toHaveClass("text-sm", "font-extrabold")
    })

    it("exposes the style helpers", () => {
      expect(textareaStyles({ variant: "secondary" })).toContain("focus-visible:border-secondary")
      expect(textAreaLabelStyles({ fontSize: "lg" })).toContain("text-lg")
      expect(textareaErrorStyles({ fontWeight: "thin" })).toContain("font-thin")
    })
  })

  describe("polymorphic ref", () => {
    it("accepts a ref object typed as the textarea element", () => {
      const ref = createRef<HTMLTextAreaElement>()
      render(<Textarea ref={ref} />)
      expect(ref.current).toBe(screen.getByRole("textbox"))
    })

    it("rejects a ref typed for another element at compile time", () => {
      const ref = createRef<HTMLDivElement>()
      // @ts-expect-error a div ref does not fit a textarea
      render(<Textarea ref={ref} />)
      expect(ref.current).toBe(screen.getByRole("textbox"))
    })
  })

  describe("interaction", () => {
    it("types into the textarea and calls onChange", async () => {
      const user = userEvent.setup()
      const onChange = vi.fn()
      render(<Textarea onChange={onChange} />)
      await user.type(screen.getByRole("textbox"), "abc")
      expect(onChange).toHaveBeenCalledTimes(3)
      expect(screen.getByRole("textbox")).toHaveValue("abc")
    })

    it("accepts multi-line input", async () => {
      const user = userEvent.setup()
      render(<Textarea />)
      await user.type(screen.getByRole("textbox"), "one{Enter}two")
      expect(screen.getByRole("textbox")).toHaveValue("one\ntwo")
    })

    it("shows a controlled value", async () => {
      const Controlled = () => {
        const [value, setValue] = useState("start")
        return <Textarea value={value} onChange={(e) => setValue(e.target.value.toUpperCase())} />
      }
      const user = userEvent.setup()
      render(<Controlled />)
      expect(screen.getByRole("textbox")).toHaveValue("start")
      await user.type(screen.getByRole("textbox"), "x")
      expect(screen.getByRole("textbox")).toHaveValue("STARTX")
    })

    it("starts with defaultValue", () => {
      render(<Textarea defaultValue="initial" />)
      expect(screen.getByRole("textbox")).toHaveValue("initial")
    })

    it("blocks typing when disabled", async () => {
      const user = userEvent.setup()
      const onChange = vi.fn()
      render(<Textarea disabled onChange={onChange} />)
      expect(screen.getByRole("textbox")).toBeDisabled()
      await user.type(screen.getByRole("textbox"), "abc")
      expect(onChange).not.toHaveBeenCalled()
      expect(screen.getByRole("textbox")).toHaveValue("")
    })

    it("blocks typing when readOnly", async () => {
      const user = userEvent.setup()
      render(<Textarea readOnly defaultValue="fixed" />)
      await user.type(screen.getByRole("textbox"), "abc")
      expect(screen.getByRole("textbox")).toHaveValue("fixed")
    })

    it("calls focus and blur handlers", async () => {
      const user = userEvent.setup()
      const onFocus = vi.fn()
      const onBlur = vi.fn()
      render(<Textarea onFocus={onFocus} onBlur={onBlur} />)
      await user.click(screen.getByRole("textbox"))
      expect(onFocus).toHaveBeenCalledTimes(1)
      await user.tab()
      expect(onBlur).toHaveBeenCalledTimes(1)
    })
  })
})
