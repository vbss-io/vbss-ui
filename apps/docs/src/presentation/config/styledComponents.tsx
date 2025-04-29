import { createGlobalStyle } from "styled-components"

const sizes = {
  media: {
    xsm: "(min-width: 480px)",
    sm: "(min-width: 640px)",
    md: "(min-width: 768px)",
    lg: "(min-width: 1024px)",
    xlg: "(min-width: 1280px)",
  },
}

export const lightTheme = {
  ...sizes,
  colors: {
    background: "hsl(0, 0%, 100%)",
    foreground: "hsl(240, 10%, 10%)",
    primary: "hsl(248, 39%, 39%)",
    secondary: "hsl(248, 53%, 58%)",
    muted: "hsl(240, 10%, 60%)",
    accent: "hsl(248, 55%, 70%)",
    shadow: "hsl(248, 30%, 20%)",
  },
}

export const darkTheme = {
  ...sizes,
  colors: {
    background: "hsl(240, 10%, 10%)",
    foreground: "hsl(0, 0%, 95%)",
    primary: "hsl(248, 53%, 58%)",
    secondary: "hsl(248, 39%, 39%)",
    muted: "hsl(240, 10%, 60%)",
    accent: "hsl(248, 45%, 50%)",
    shadow: "hsl(248, 30%, 10%)",
  },
}

export const GlobalStyles = createGlobalStyle`
  html {
    background-color: ${({ theme }) => theme.colors.background};
    min-height: 100vh;
  }

  body {
    margin: 0;
    padding: 0;
    border: 0;
    font-family: Inter;
    position: relative;
  }

  &::-webkit-scrollbar {
    width: 0.25rem;
  }

  ::-webkit-scrollbar-track {
    background-color: ${({ theme }) => theme.colors.primary};
  }

  ::-webkit-scrollbar-thumb {
    background-color: ${({ theme }) => theme.colors.secondary};
    border-radius: 20rem;

    &:hover {
      background-color: ${({ theme }) => theme.colors.primary};
      border-radius: 10rem;
      cursor: grab;
    }
  }
`
