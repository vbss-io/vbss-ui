import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { describe, expect, it, vi } from "vitest"
import { Button, buttonStyles } from "./index"

const classesOf = (styles: string) => styles.split(" ").filter(Boolean)

describe("Button", () => {
  describe("rendering", () => {
    it("renders a native button with its children and the base class", () => {
      render(<Button>Save</Button>)
      const button = screen.getByRole("button", { name: "Save" })
      expect(button.tagName).toBe("BUTTON")
      expect(button).toHaveClass("button")
    })

    it("applies the documented defaults when no variant is given", () => {
      render(<Button>Save</Button>)
      expect(screen.getByRole("button")).toHaveClass(...classesOf(buttonStyles()))
    })

    it("renders ReactNode children", () => {
      render(
        <Button>
          <span data-testid="icon" />
          Go
        </Button>
      )
      expect(screen.getByRole("button")).toContainElement(screen.getByTestId("icon"))
    })

    it("forwards native attributes", () => {
      render(
        <Button type="submit" aria-label="Send form" data-testid="send">
          Send
        </Button>
      )
      const button = screen.getByTestId("send")
      expect(button).toHaveAttribute("type", "submit")
      expect(button).toHaveAccessibleName("Send form")
    })
  })

  describe("variants", () => {
    it.each(["primary", "secondary", "outline", "outlineSolid", "ghost"] as const)(
      "applies the %s variant classes",
      (variant) => {
        render(<Button variant={variant}>Variant</Button>)
        expect(screen.getByRole("button")).toHaveClass(...classesOf(buttonStyles({ variant })))
      }
    )

    it("gives each variant a different appearance", () => {
      expect(buttonStyles({ variant: "primary" })).not.toBe(buttonStyles({ variant: "ghost" }))
    })

    it.each(["xs", "sm", "md", "lg", "xl", "icon-xs", "icon-sm", "icon-md", "icon-lg", "icon-xl"] as const)(
      "applies the %s size classes",
      (size) => {
        render(<Button size={size}>Size</Button>)
        expect(screen.getByRole("button")).toHaveClass(...classesOf(buttonStyles({ size })))
      }
    )

    it.each(["none", "xs", "sm", "md", "lg", "full"] as const)("applies the rounded %s class", (rounded) => {
      render(<Button rounded={rounded}>Round</Button>)
      expect(screen.getByRole("button")).toHaveClass(`rounded-${rounded}`)
    })

    it.each([
      ["xs", "text-xs"],
      ["sm", "text-sm"],
      ["md", "text-base"],
      ["lg", "text-lg"],
      ["xl", "text-xl"],
    ] as const)("applies the fontSize %s class", (fontSize, expected) => {
      render(<Button fontSize={fontSize}>Text</Button>)
      expect(screen.getByRole("button")).toHaveClass(expected)
    })

    it.each(["thin", "light", "normal", "medium", "bold", "extrabold"] as const)(
      "applies the fontWeight %s class",
      (fontWeight) => {
        render(<Button fontWeight={fontWeight}>Weight</Button>)
        expect(screen.getByRole("button")).toHaveClass(`font-${fontWeight}`)
      }
    )

    it("reverses the content order when inverted", () => {
      render(<Button inverted>Back</Button>)
      expect(screen.getByRole("button")).toHaveClass("flex-row-reverse")
    })

    it("does not reverse the content order by default", () => {
      render(<Button>Back</Button>)
      expect(screen.getByRole("button")).not.toHaveClass("flex-row-reverse")
    })

    it("appends the consumer className after the generated ones", () => {
      render(<Button className="my-custom">Custom</Button>)
      expect(screen.getByRole("button")).toHaveClass("button", "my-custom")
    })
  })

  describe("interaction", () => {
    it("calls onClick with the click event", async () => {
      const user = userEvent.setup()
      const onClick = vi.fn()
      render(<Button onClick={onClick}>Click</Button>)
      await user.click(screen.getByRole("button"))
      expect(onClick).toHaveBeenCalledTimes(1)
      expect(onClick.mock.calls[0][0].type).toBe("click")
    })

    it("activates with Enter and Space from the keyboard", async () => {
      const user = userEvent.setup()
      const onClick = vi.fn()
      render(<Button onClick={onClick}>Key</Button>)
      screen.getByRole("button").focus()
      await user.keyboard("{Enter}")
      await user.keyboard(" ")
      expect(onClick).toHaveBeenCalledTimes(2)
    })

    it("is disabled, unfocusable and silent when disabled", async () => {
      const user = userEvent.setup()
      const onClick = vi.fn()
      render(
        <Button disabled onClick={onClick}>
          Off
        </Button>
      )
      const button = screen.getByRole("button")
      expect(button).toBeDisabled()
      expect(button).toHaveClass("disabled:pointer-events-none", "disabled:opacity-50")
      await user.click(button)
      await user.tab()
      expect(onClick).not.toHaveBeenCalled()
      expect(button).not.toHaveFocus()
    })

    it("stays enabled by default", () => {
      render(<Button>On</Button>)
      expect(screen.getByRole("button")).toBeEnabled()
    })
  })

  describe("polymorphism and refs", () => {
    it("renders another element when as is given and keeps the styles", () => {
      render(
        <Button as="a" href="/home" variant="outline">
          Home
        </Button>
      )
      const link = screen.getByRole("link", { name: "Home" })
      expect(link).toHaveAttribute("href", "/home")
      expect(link).toHaveClass("button", ...classesOf(buttonStyles({ variant: "outline" })))
      expect(screen.queryByRole("button")).not.toBeInTheDocument()
    })

    it("forwards the ref to the rendered element", () => {
      let received: unknown = null
      render(<Button ref={(node: unknown) => (received = node)}>Ref</Button>)
      expect(received).toBe(screen.getByRole("button"))
    })

    it("forwards the ref to the custom element used in as", () => {
      let received: unknown = null
      render(
        <Button as="a" ref={(node: unknown) => (received = node)} href="#x">
          Ref
        </Button>
      )
      expect(received).toBe(screen.getByRole("link"))
    })

    it("exposes its displayName", () => {
      expect(Button.displayName).toBe("Button")
    })
  })
})
