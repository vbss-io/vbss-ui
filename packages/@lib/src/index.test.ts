import { describe, expect, it } from "vitest"
import { clsx, cn, twMerge } from "./index"

describe("twMerge", () => {
  it("joins class lists keeping first-seen order", () => {
    expect(twMerge("flex items-center", "p-4")).toBe("flex items-center p-4")
  })

  it("drops classes repeated across lists", () => {
    expect(twMerge("flex p-4", "p-4 gap-2", "flex")).toBe("flex p-4 gap-2")
  })

  it("collapses runs of whitespace between classes", () => {
    expect(twMerge("a   b\n\tc")).toBe("a b c")
  })

  it("returns an empty string when nothing is given", () => {
    expect(twMerge()).toBe("")
  })
})

describe("clsx", () => {
  it("keeps truthy strings and joins them with a space", () => {
    expect(clsx("a", "b")).toBe("a b")
  })

  it("filters false, null, undefined and empty strings", () => {
    expect(clsx("a", false, null, undefined, "", "b")).toBe("a b")
  })

  it("supports conditional classes", () => {
    const active = true
    const disabled = false
    expect(clsx("btn", active && "btn-active", disabled && "btn-disabled")).toBe("btn btn-active")
  })

  it("returns an empty string when every value is falsy", () => {
    expect(clsx(false, null, undefined)).toBe("")
  })
})

describe("cn", () => {
  it("filters falsy values and removes duplicate classes", () => {
    expect(cn("a b", false, "b c", null, undefined)).toBe("a b c")
  })

  it("returns an empty string for no usable class", () => {
    expect(cn(false, null, undefined)).toBe("")
  })
})
