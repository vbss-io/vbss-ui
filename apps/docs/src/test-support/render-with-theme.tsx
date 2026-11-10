import { render, type RenderOptions } from "@testing-library/react"
import type { ReactElement, ReactNode } from "react"
import { ThemeProvider } from "styled-components"

import { darkTheme, lightTheme } from "@/presentation/config/styledComponents"

export const renderWithTheme = (ui: ReactElement, options: Omit<RenderOptions, "wrapper"> & { dark?: boolean } = {}) => {
  const { dark = false, ...rest } = options
  const Wrapper = ({ children }: { children: ReactNode }) => (
    <ThemeProvider theme={dark ? darkTheme : lightTheme}>{children}</ThemeProvider>
  )
  return render(ui, { wrapper: Wrapper, ...rest })
}
