import { render, renderHook, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { ThemeContext } from "styled-components"
import { useContext } from "react"
import { beforeEach, describe, expect, it } from "vitest"

import { darkTheme, lightTheme } from "@/presentation/config/styledComponents"
import { useDarkMode } from "@/presentation/hooks/use-dark-mode"

import { DarkModeProvider } from "./dark-mode-context"

const Probe = () => {
  const { darkMode, setDarkMode } = useDarkMode()
  const theme = useContext(ThemeContext)
  return (
    <>
      <output data-testid="mode">{String(darkMode)}</output>
      <output data-testid="background">{theme?.colors.background}</output>
      <button onClick={() => setDarkMode(!darkMode)}>flip</button>
    </>
  )
}

const wrapper = ({ children }: { children: React.ReactNode }) => <DarkModeProvider>{children}</DarkModeProvider>

describe("DarkModeProvider", () => {
  beforeEach(() => {
    window.localStorage.clear()
  })

  it("starts in light mode with the light theme and saves it", () => {
    render(<Probe />, { wrapper })
    expect(screen.getByTestId("mode")).toHaveTextContent("false")
    expect(screen.getByTestId("background")).toHaveTextContent(lightTheme.colors.background)
    expect(window.localStorage.getItem("darkMode")).toBe("false")
  })

  it("starts in dark mode when it was saved", () => {
    window.localStorage.setItem("darkMode", "true")
    render(<Probe />, { wrapper })
    expect(screen.getByTestId("mode")).toHaveTextContent("true")
    expect(screen.getByTestId("background")).toHaveTextContent(darkTheme.colors.background)
  })

  it("switches the theme and persists each change", async () => {
    render(<Probe />, { wrapper })
    await userEvent.click(screen.getByRole("button", { name: "flip" }))
    expect(screen.getByTestId("background")).toHaveTextContent(darkTheme.colors.background)
    expect(window.localStorage.getItem("darkMode")).toBe("true")
    await userEvent.click(screen.getByRole("button", { name: "flip" }))
    expect(screen.getByTestId("background")).toHaveTextContent(lightTheme.colors.background)
    expect(window.localStorage.getItem("darkMode")).toBe("false")
  })

  it("injects the global styles with the active theme colors", () => {
    window.localStorage.setItem("darkMode", "true")
    render(<Probe />, { wrapper })
    const css = Array.from(document.styleSheets)
      .flatMap((sheet) => Array.from(sheet.cssRules).map((rule) => rule.cssText))
      .concat(Array.from(document.querySelectorAll("style")).map((style) => style.textContent ?? ""))
      .join("\n")
    expect(css).toContain(darkTheme.colors.background)
  })
})

describe("useDarkMode", () => {
  it("returns an empty context outside the provider", () => {
    const { result } = renderHook(() => useDarkMode())
    expect(result.current).toEqual({})
  })
})
