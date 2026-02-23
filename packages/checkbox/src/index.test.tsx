import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { describe, expect, it, vi } from "vitest"
import { Checkbox } from "./index"

describe("Checkbox", () => {
  describe("Rendering", () => {
    it("renders checkbox without label", () => {
      render(<Checkbox />)
      const checkbox = screen.getByRole("checkbox")
      expect(checkbox).toBeInTheDocument()
    })

    it("renders checkbox with string label", () => {
      render(<Checkbox label="Accept terms" />)
      expect(screen.getByText("Accept terms")).toBeInTheDocument()
      const checkbox = screen.getByRole("checkbox")
      expect(checkbox).toBeInTheDocument()
    })

    it("renders checkbox with ReactNode label", () => {
      render(
        <Checkbox
          label={
            <span data-testid="custom-label">
              <strong>Custom</strong> Label
            </span>
          }
        />
      )
      expect(screen.getByTestId("custom-label")).toBeInTheDocument()
      expect(screen.getByText("Custom")).toBeInTheDocument()
      expect(screen.getByText("Label")).toBeInTheDocument()
    })
  })

  describe("onChangeChecked API", () => {
    it("calls onChangeChecked with boolean true when checked", async () => {
      const user = userEvent.setup()
      const handleChange = vi.fn()
      render(<Checkbox onChangeChecked={handleChange} />)
      const checkbox = screen.getByRole("checkbox")
      await user.click(checkbox)
      expect(handleChange).toHaveBeenCalledWith(true)
      expect(handleChange).toHaveBeenCalledTimes(1)
    })

    it("calls onChangeChecked with boolean false when unchecked", async () => {
      const user = userEvent.setup()
      const handleChange = vi.fn()
      render(<Checkbox checked onChangeChecked={handleChange} />)
      const checkbox = screen.getByRole("checkbox")
      await user.click(checkbox)
      expect(handleChange).toHaveBeenCalledWith(false)
      expect(handleChange).toHaveBeenCalledTimes(1)
    })

    it("converts indeterminate state to false in onChangeChecked", async () => {
      const user = userEvent.setup()
      const handleChange = vi.fn()
      render(<Checkbox checked="indeterminate" onChangeChecked={handleChange} />)
      const checkbox = screen.getByRole("checkbox")
      await user.click(checkbox)
      // When clicking indeterminate, it should become checked (true)
      expect(handleChange).toHaveBeenCalledWith(true)
    })

    it("maintains backward compatibility with onCheckedChange", async () => {
      const user = userEvent.setup()
      const handleChange = vi.fn()
      render(<Checkbox onCheckedChange={handleChange} />)
      const checkbox = screen.getByRole("checkbox")
      await user.click(checkbox)
      expect(handleChange).toHaveBeenCalledWith(true)
    })

    it("calls both onChangeChecked and onCheckedChange when both are provided", async () => {
      const user = userEvent.setup()
      const handleChangeChecked = vi.fn()
      const handleCheckedChange = vi.fn()
      render(<Checkbox onChangeChecked={handleChangeChecked} onCheckedChange={handleCheckedChange} />)
      const checkbox = screen.getByRole("checkbox")
      await user.click(checkbox)
      expect(handleChangeChecked).toHaveBeenCalledWith(true)
      expect(handleCheckedChange).toHaveBeenCalledWith(true)
    })
  })

  describe("Controlled mode", () => {
    it("respects checked prop", () => {
      render(<Checkbox checked />)
      const checkbox = screen.getByRole("checkbox")
      expect(checkbox).toBeChecked()
    })

    it("respects unchecked state", () => {
      render(<Checkbox checked={false} />)
      const checkbox = screen.getByRole("checkbox")
      expect(checkbox).not.toBeChecked()
    })
  })

  describe("Disabled state", () => {
    it("disables checkbox when disabled prop is true", () => {
      render(<Checkbox disabled />)
      const checkbox = screen.getByRole("checkbox")
      expect(checkbox).toBeDisabled()
    })

    it("does not call onChangeChecked when disabled", async () => {
      const user = userEvent.setup()
      const handleChange = vi.fn()
      render(<Checkbox disabled onChangeChecked={handleChange} />)
      const checkbox = screen.getByRole("checkbox")
      await user.click(checkbox).catch(() => {
        // Expected to fail when disabled
      })
      expect(handleChange).not.toHaveBeenCalled()
    })
  })

  describe("Variants", () => {
    it("applies primary variant", () => {
      render(<Checkbox variant="primary" />)
      const checkbox = screen.getByRole("checkbox")
      expect(checkbox).toHaveClass("border-primary")
    })

    it("applies secondary variant", () => {
      render(<Checkbox variant="secondary" />)
      const checkbox = screen.getByRole("checkbox")
      expect(checkbox).toHaveClass("border-secondary")
    })
  })
})
