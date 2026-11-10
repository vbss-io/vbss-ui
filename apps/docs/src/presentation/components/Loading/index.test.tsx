import { renderWithTheme } from "@/test-support/render-with-theme"
import { describe, expect, it } from "vitest"

import { LoadingFallback } from "."

describe("LoadingFallback", () => {
  it("renders the spinner inside its container", () => {
    const { container } = renderWithTheme(<LoadingFallback />)
    const wrapper = container.firstElementChild
    expect(wrapper).toBeInTheDocument()
    expect(wrapper?.children).toHaveLength(1)
    expect(wrapper?.firstElementChild).toBeEmptyDOMElement()
  })
})
