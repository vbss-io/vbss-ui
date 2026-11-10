import { render, screen, within } from "@testing-library/react"
import { createRef } from "react"
import { describe, expect, it } from "vitest"
import { Chips } from "./index"

describe("Chips", () => {
  it("renders the wrapper with the base class and no chip when chips is omitted", () => {
    render(<Chips data-testid="group" />)
    const group = screen.getByTestId("group")
    expect(group).toHaveClass("chips")
    expect(group).toBeEmptyDOMElement()
  })

  it("renders one Chip per entry in order", () => {
    render(<Chips data-testid="group" chips={["React", "Vue", "Svelte"]} />)
    const rendered = Array.from(screen.getByTestId("group").children)
    expect(rendered.map((chip) => chip.textContent)).toEqual(["React", "Vue", "Svelte"])
    rendered.forEach((chip) => expect(chip).toHaveClass("chip"))
  })

  it("renders ReactNode entries", () => {
    render(<Chips data-testid="group" chips={[<b key="a">bold</b>, <i key="b">italic</i>]} />)
    const group = screen.getByTestId("group")
    expect(within(group).getByText("bold").tagName).toBe("B")
    expect(within(group).getByText("italic").tagName).toBe("I")
  })

  it("passes chipsProps to every Chip", () => {
    render(<Chips data-testid="group" chips={["a", "b"]} chipsProps={{ variant: "outline", size: "lg", className: "mine" }} />)
    const rendered = Array.from(screen.getByTestId("group").children)
    expect(rendered).toHaveLength(2)
    rendered.forEach((chip) => {
      expect(chip).toHaveClass("text-primary", "px-4", "mine")
    })
  })

  it.each([
    ["xs", "gap-0"],
    ["sm", "gap-1"],
    ["md", "gap-2"],
    ["lg", "gap-3"],
    ["xl", "gap-4"],
  ] as const)("applies the %s gap (%s)", (gap, expected) => {
    render(<Chips data-testid="group" gap={gap} />)
    expect(screen.getByTestId("group")).toHaveClass(expected)
  })

  it.each([
    ["row", "flex-row"],
    ["col", "flex-col"],
  ] as const)("applies the %s direction (%s)", (flexDirection, expected) => {
    render(<Chips data-testid="group" flexDirection={flexDirection} />)
    expect(screen.getByTestId("group")).toHaveClass(expected)
  })

  it("defaults to a row with medium gap", () => {
    render(<Chips data-testid="group" />)
    expect(screen.getByTestId("group")).toHaveClass("gap-2", "flex-row")
  })

  it("appends the consumer className", () => {
    render(<Chips data-testid="group" className="wrap" />)
    expect(screen.getByTestId("group")).toHaveClass("chips", "wrap")
  })

  it("renders another element when as is given", () => {
    render(<Chips as="ul" chips={["x"]} />)
    expect(screen.getByRole("list").tagName).toBe("UL")
  })

  it("forwards native attributes and the ref", () => {
    let received: unknown = null
    render(<Chips ref={(node: unknown) => (received = node)} aria-label="Skills" role="group" chips={["a"]} />)
    const group = screen.getByRole("group", { name: "Skills" })
    expect(received).toBe(group)
  })

  it("accepts a ref object typed as the rendered div", () => {
    const ref = createRef<HTMLDivElement>()
    render(<Chips ref={ref} data-testid="group" />)
    expect(ref.current).toBe(screen.getByTestId("group"))
  })

  it("accepts a ref object typed as the element given in as", () => {
    const ref = createRef<HTMLUListElement>()
    render(<Chips as="ul" ref={ref} chips={["x"]} />)
    expect(ref.current).toBe(screen.getByRole("list"))
  })

  it("rejects a ref typed for another element at compile time", () => {
    const ref = createRef<HTMLButtonElement>()
    // @ts-expect-error a button ref does not fit a div
    render(<Chips ref={ref} data-testid="group" />)
    expect(screen.getByTestId("group")).toBeInTheDocument()
  })

  it("exposes its displayName", () => {
    expect(Chips.displayName).toBe("Chips")
  })
})
