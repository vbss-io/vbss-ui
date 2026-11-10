import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { createRef } from "react"
import { describe, expect, it, vi } from "vitest"
import { Chip, chipStyles } from "./index"

describe("Chip", () => {
  it("renders a div with its content and the base class", () => {
    render(<Chip>Beta</Chip>)
    const chip = screen.getByText("Beta")
    expect(chip.tagName).toBe("DIV")
    expect(chip).toHaveClass("chip")
  })

  it("applies the default variant classes", () => {
    render(<Chip>Default</Chip>)
    expect(screen.getByText("Default")).toHaveClass(...chipStyles().split(" "))
  })

  it.each([
    ["primary", "border-primary"],
    ["secondary", "border-secondary"],
    ["outline", "border-primary"],
  ] as const)("applies the %s variant border (%s)", (variant, expected) => {
    render(<Chip variant={variant}>Tag</Chip>)
    expect(screen.getByText("Tag")).toHaveClass(expected)
  })

  it("keeps the solid variants white on color and the outline variant colored", () => {
    render(
      <>
        <Chip variant="primary">solid</Chip>
        <Chip variant="outline">hollow</Chip>
      </>
    )
    expect(screen.getByText("solid")).toHaveClass("bg-primary", "text-white")
    expect(screen.getByText("hollow")).toHaveClass("text-primary")
    expect(screen.getByText("hollow")).not.toHaveClass("bg-primary")
  })

  it.each([
    ["sm", "px-2.5"],
    ["md", "px-3"],
    ["lg", "px-4"],
  ] as const)("applies the %s size (%s)", (size, expected) => {
    render(<Chip size={size}>Size</Chip>)
    expect(screen.getByText("Size")).toHaveClass(expected)
  })

  it.each(["none", "xs", "sm", "md", "lg", "full"] as const)("applies the rounded %s class", (rounded) => {
    render(<Chip rounded={rounded}>Round</Chip>)
    expect(screen.getByText("Round")).toHaveClass(`rounded-${rounded}`)
  })

  it.each(["thin", "light", "normal", "medium", "bold", "extrabold"] as const)(
    "applies the fontWeight %s class",
    (fontWeight) => {
      render(<Chip fontWeight={fontWeight}>Weight</Chip>)
      expect(screen.getByText("Weight")).toHaveClass(`font-${fontWeight}`)
    }
  )

  it.each([
    ["xs", "text-xs"],
    ["sm", "text-sm"],
    ["md", "text-base"],
    ["lg", "text-lg"],
    ["xl", "text-xl"],
  ] as const)("applies the fontSize %s class", (fontSize, expected) => {
    render(<Chip fontSize={fontSize}>Font</Chip>)
    expect(screen.getByText("Font")).toHaveClass(expected)
  })

  it("appends the consumer className", () => {
    render(<Chip className="extra">Extra</Chip>)
    expect(screen.getByText("Extra")).toHaveClass("chip", "extra")
  })

  it("forwards native attributes and handlers", async () => {
    const user = userEvent.setup()
    const onClick = vi.fn()
    render(
      <Chip onClick={onClick} title="status" data-testid="chip">
        Click
      </Chip>
    )
    await user.click(screen.getByTestId("chip"))
    expect(onClick).toHaveBeenCalledTimes(1)
    expect(screen.getByTestId("chip")).toHaveAttribute("title", "status")
  })

  it("renders another element when as is given", () => {
    render(
      <Chip as="span" role="status">
        Live
      </Chip>
    )
    const chip = screen.getByRole("status")
    expect(chip.tagName).toBe("SPAN")
    expect(chip).toHaveClass("chip")
  })

  it("forwards the ref", () => {
    let received: unknown = null
    render(<Chip ref={(node: unknown) => (received = node)}>Ref</Chip>)
    expect(received).toBe(screen.getByText("Ref"))
  })

  it("accepts a ref object typed as the rendered div", () => {
    const ref = createRef<HTMLDivElement>()
    render(<Chip ref={ref}>Typed</Chip>)
    expect(ref.current).toBe(screen.getByText("Typed"))
  })

  it("accepts a ref object typed as the element given in as", () => {
    const ref = createRef<HTMLSpanElement>()
    render(
      <Chip as="span" ref={ref}>
        Typed span
      </Chip>
    )
    expect(ref.current).toBe(screen.getByText("Typed span"))
  })

  it("rejects a ref typed for another element at compile time", () => {
    const ref = createRef<HTMLButtonElement>()
    // @ts-expect-error a button ref does not fit a div
    render(<Chip ref={ref}>Wrong</Chip>)
    expect(screen.getByText("Wrong")).toBeInTheDocument()
  })

  it("exposes its displayName", () => {
    expect(Chip.displayName).toBe("Chip")
  })
})
