import { render, screen, waitFor, within } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { createRef, useState } from "react"
import { describe, expect, it, vi } from "vitest"
import { RadioGroup, radioGroupFontStyle, radioGroupStyles } from "./index"

const values = [
  { value: "small", label: "Small" },
  { value: "medium", label: "Medium" },
  { value: "large", label: "Large" },
]

describe("RadioGroup", () => {
  describe("rendering", () => {
    it("renders a radiogroup without options by default", () => {
      render(<RadioGroup />)
      expect(screen.getByRole("radiogroup")).toBeInTheDocument()
      expect(screen.queryByRole("radio")).toBeNull()
    })

    it("renders one radio per value with its label", () => {
      render(<RadioGroup values={values} />)
      expect(screen.getAllByRole("radio")).toHaveLength(3)
      expect(screen.getByRole("radio", { name: "Small" })).toHaveAttribute("value", "small")
      expect(screen.getByRole("radio", { name: "Medium" })).toHaveAttribute("value", "medium")
      expect(screen.getByRole("radio", { name: "Large" })).toHaveAttribute("value", "large")
    })

    it("starts with nothing selected", () => {
      render(<RadioGroup values={values} />)
      screen.getAllByRole("radio").forEach((radio) => expect(radio).toHaveAttribute("aria-checked", "false"))
    })

    it("renders the group label", () => {
      render(<RadioGroup label="Size" values={values} />)
      expect(screen.getByText("Size")).toHaveClass("radioGroupLabel")
    })

    it("does not render a group label by default", () => {
      const { container } = render(<RadioGroup values={values} />)
      expect(container.querySelector(".radioGroupLabel")).toBeNull()
    })

    it("uses the provided id on the group and names the group by its label", () => {
      render(<RadioGroup id="sizes" label="Size" values={values} />)
      const group = screen.getByRole("radiogroup", { name: "Size" })
      expect(group).toHaveAttribute("id", "sizes")
      expect(group).toHaveAttribute("aria-labelledby", screen.getByText("Size").id)
      expect(screen.getByText("Size").id).not.toBe("sizes")
    })

    it("names the group by its label when no id is given", () => {
      render(<RadioGroup label="Plan" values={values} />)
      expect(screen.getByRole("radiogroup", { name: "Plan" })).toBeInTheDocument()
      expect(screen.getByText("Plan").tagName).not.toBe("LABEL")
    })

    it("does not set aria-labelledby without a label", () => {
      render(<RadioGroup values={values} />)
      expect(screen.getByRole("radiogroup")).not.toHaveAttribute("aria-labelledby")
    })

    it("keeps the generated ids between rerenders and links each item label", () => {
      const { rerender } = render(<RadioGroup label="Size" values={values} />)
      const groupId = screen.getByRole("radiogroup").id
      const itemIds = screen.getAllByRole("radio").map((radio) => radio.id)
      rerender(<RadioGroup label="Size" values={values} />)
      rerender(<RadioGroup label="Size" values={values} />)
      expect(groupId).not.toBe("")
      expect(screen.getByRole("radiogroup").id).toBe(groupId)
      expect(screen.getAllByRole("radio").map((radio) => radio.id)).toEqual(itemIds)
      expect(new Set(itemIds).size).toBe(3)
      expect(screen.getByLabelText("Medium")).toBe(screen.getByRole("radio", { name: "Medium" }))
    })

    it("derives distinct item ids per group even when the values repeat", async () => {
      const user = userEvent.setup()
      render(
        <>
          <RadioGroup id="first" label="First" values={values} />
          <RadioGroup id="second" label="Second" values={values} />
        </>
      )
      const first = within(screen.getByRole("radiogroup", { name: "First" }))
      const second = within(screen.getByRole("radiogroup", { name: "Second" }))
      expect(first.getByRole("radio", { name: "Small" }).id).not.toBe(second.getByRole("radio", { name: "Small" }).id)
      const ids = screen.getAllByRole("radio").map((radio) => radio.id)
      expect(new Set(ids).size).toBe(6)
      await user.click(second.getByText("Large"))
      expect(second.getByRole("radio", { name: "Large" })).toHaveAttribute("aria-checked", "true")
      expect(first.getByRole("radio", { name: "Large" })).toHaveAttribute("aria-checked", "false")
    })

    it("does not use the item value as the radio id", () => {
      render(<RadioGroup values={values} />)
      expect(screen.getByRole("radio", { name: "Small" }).id).not.toBe("small")
    })

    it("accepts a ref object typed as the rendered div", () => {
      const ref = createRef<HTMLDivElement>()
      render(<RadioGroup ref={ref} values={values} />)
      expect(ref.current).toBe(screen.getByRole("radiogroup"))
    })

    it("rejects a ref typed for another element at compile time", () => {
      const ref = createRef<HTMLButtonElement>()
      // @ts-expect-error a button ref does not fit a div
      render(<RadioGroup ref={ref} values={values} />)
      expect(screen.getByRole("radiogroup")).toBeInTheDocument()
    })

    it("renders the default check icon inside the selected radio only", () => {
      render(<RadioGroup values={values} defaultValue="medium" />)
      expect(screen.getByRole("radio", { name: "Medium" }).querySelector("svg")).not.toBeNull()
      expect(screen.getByRole("radio", { name: "Small" }).querySelector("svg")).toBeNull()
    })

    it("renders a custom icon in the selected radio", () => {
      render(<RadioGroup values={values} defaultValue="large" icon={<i data-testid="dot" />} />)
      expect(screen.getByTestId("dot")).toBeInTheDocument()
      expect(screen.getByRole("radio", { name: "Large" })).toContainElement(screen.getByTestId("dot"))
    })

    it("lays out in a column by default and in a row on request", () => {
      const { rerender } = render(<RadioGroup values={values} />)
      expect(screen.getByRole("radiogroup")).toHaveClass("flex-col")
      rerender(<RadioGroup values={values} direction="row" />)
      expect(screen.getByRole("radiogroup")).toHaveClass("flex-row")
    })

    it("exposes the display name", () => {
      expect(RadioGroup.displayName).toBe("RadioGroup")
    })

    it("forwards the ref to the group element", () => {
      let received: unknown = null
      render(
        <RadioGroup
          values={values}
          ref={(node: unknown) => {
            received = node
          }}
        />
      )
      expect(received).toBe(screen.getByRole("radiogroup"))
    })
  })

  describe("variants", () => {
    it.each([
      ["primary", "border-primary"],
      ["secondary", "border-secondary"],
      ["outline", "border-primary"],
      ["ghost", "border-black"],
    ] as const)("applies the %s variant classes to the radios", (variant, expected) => {
      render(<RadioGroup values={values} variant={variant} />)
      screen.getAllByRole("radio").forEach((radio) => expect(radio).toHaveClass("radioGroupItem", expected))
    })

    it("defaults to primary, small size and medium rounding", () => {
      render(<RadioGroup values={values} />)
      expect(screen.getByRole("radio", { name: "Small" })).toHaveClass("border-primary", "rounded-md", "h-4", "w-4")
    })

    it("applies size and rounded to the radios", () => {
      render(<RadioGroup values={values} size="xl" rounded="full" />)
      expect(screen.getByRole("radio", { name: "Small" })).toHaveClass("rounded-full", "h-7", "w-7")
    })

    it("applies the custom className to the radios", () => {
      render(<RadioGroup values={values} className="custom-radio" />)
      screen.getAllByRole("radio").forEach((radio) => expect(radio).toHaveClass("custom-radio"))
    })

    it("applies font settings to the labels and the radios", () => {
      render(<RadioGroup label="Group" values={values} fontSize="lg" fontWeight="bold" />)
      expect(screen.getByText("Group")).toHaveClass("text-lg", "font-bold")
      expect(screen.getByText("Small")).toHaveClass("text-lg", "font-bold")
    })

    it("passes itemProps to every radio", () => {
      render(<RadioGroup values={values} itemProps={{ "data-custom": "yes" } as never} />)
      screen.getAllByRole("radio").forEach((radio) => expect(radio).toHaveAttribute("data-custom", "yes"))
    })

    it("exposes the style helpers", () => {
      expect(radioGroupStyles({ variant: "secondary" })).toContain("border-secondary")
      expect(radioGroupFontStyle({ fontSize: "xl" })).toContain("text-xl")
      expect(radioGroupFontStyle({ disabled: true })).toContain("cursor-not-allowed")
    })
  })

  describe("interaction", () => {
    it("selects an option on click and reports its value", async () => {
      const user = userEvent.setup()
      const onValueChange = vi.fn()
      render(<RadioGroup values={values} onValueChange={onValueChange} />)
      await user.click(screen.getByRole("radio", { name: "Medium" }))
      expect(onValueChange).toHaveBeenCalledWith("medium")
      expect(screen.getByRole("radio", { name: "Medium" })).toHaveAttribute("aria-checked", "true")
      expect(screen.getByRole("radio", { name: "Small" })).toHaveAttribute("aria-checked", "false")
    })

    it("selects an option by clicking its label", async () => {
      const user = userEvent.setup()
      const onValueChange = vi.fn()
      render(<RadioGroup values={values} onValueChange={onValueChange} />)
      await user.click(screen.getByText("Large"))
      expect(onValueChange).toHaveBeenCalledWith("large")
      expect(screen.getByRole("radio", { name: "Large" })).toHaveAttribute("aria-checked", "true")
    })

    it("moves the selection with the arrow keys", async () => {
      const user = userEvent.setup()
      const onValueChange = vi.fn()
      render(<RadioGroup values={values} defaultValue="small" onValueChange={onValueChange} />)
      screen.getByRole("radio", { name: "Small" }).focus()
      await user.keyboard("{ArrowDown>}")
      await waitFor(() => expect(onValueChange).toHaveBeenLastCalledWith("medium"))
      await user.keyboard("{/ArrowDown}")
      expect(screen.getByRole("radio", { name: "Medium" })).toHaveAttribute("aria-checked", "true")
      await user.keyboard("{ArrowUp>}")
      await waitFor(() => expect(onValueChange).toHaveBeenLastCalledWith("small"))
      await user.keyboard("{/ArrowUp}")
      expect(screen.getByRole("radio", { name: "Small" })).toHaveAttribute("aria-checked", "true")
    })

    it("selects the focused radio with Space", async () => {
      const user = userEvent.setup()
      render(<RadioGroup values={values} />)
      await user.tab()
      await user.keyboard(" ")
      expect(screen.getByRole("radio", { name: "Small" })).toHaveAttribute("aria-checked", "true")
    })

    it("honors defaultValue", () => {
      render(<RadioGroup values={values} defaultValue="large" />)
      expect(screen.getByRole("radio", { name: "Large" })).toHaveAttribute("aria-checked", "true")
    })

    it("follows the controlled value", async () => {
      const Controlled = () => {
        const [value, setValue] = useState("small")
        return (
          <>
            <RadioGroup values={values} value={value} onValueChange={setValue} />
            <button onClick={() => setValue("large")}>pick large</button>
          </>
        )
      }
      const user = userEvent.setup()
      render(<Controlled />)
      expect(screen.getByRole("radio", { name: "Small" })).toHaveAttribute("aria-checked", "true")
      await user.click(screen.getByRole("radio", { name: "Medium" }))
      expect(screen.getByRole("radio", { name: "Medium" })).toHaveAttribute("aria-checked", "true")
      await user.click(screen.getByText("pick large"))
      expect(screen.getByRole("radio", { name: "Large" })).toHaveAttribute("aria-checked", "true")
    })

    it("does not select anything when disabled", async () => {
      const user = userEvent.setup()
      const onValueChange = vi.fn()
      render(<RadioGroup values={values} disabled onValueChange={onValueChange} />)
      screen.getAllByRole("radio").forEach((radio) => expect(radio).toBeDisabled())
      await user.click(screen.getByRole("radio", { name: "Medium" }))
      await user.click(screen.getByText("Large"))
      expect(onValueChange).not.toHaveBeenCalled()
    })

    it("styles the labels and radios as disabled", () => {
      render(<RadioGroup values={values} disabled />)
      expect(screen.getByText("Small")).toHaveClass("cursor-not-allowed", "opacity-70")
      expect(screen.getByRole("radio", { name: "Small" })).toHaveClass("cursor-not-allowed")
    })

    it("lets itemProps disable the options", async () => {
      const user = userEvent.setup()
      const onValueChange = vi.fn()
      render(<RadioGroup values={values} itemProps={{ disabled: true }} onValueChange={onValueChange} />)
      await user.click(screen.getByRole("radio", { name: "Small" }))
      expect(onValueChange).not.toHaveBeenCalled()
    })

    it("marks the group as required", () => {
      render(<RadioGroup values={values} required defaultValue="small" />)
      expect(screen.getByRole("radiogroup")).toHaveAttribute("aria-required", "true")
    })
  })
})
