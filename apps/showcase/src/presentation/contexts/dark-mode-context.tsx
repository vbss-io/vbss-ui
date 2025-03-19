import { createContext, useEffect, useState } from "react";

import { darkTheme, GlobalStyles, lightTheme } from "@/presentation/config/styledComponents"
import { ThemeProvider } from "styled-components";

export const DarkModeContext = createContext({} as {
  darkMode: boolean;
  setDarkMode: (mode: boolean) => void;
});

interface DarkModeProviderProps {
  children: React.ReactNode;
}

const getModeFromLocalStorage = () => {
  const isDark = localStorage.getItem("darkMode");
  return isDark ? JSON.parse(isDark) : false;
}

const saveModeToLocalStorage = (isDark: boolean) => {
  localStorage.setItem("darkMode", JSON.stringify(isDark));
}

export const DarkModeProvider = ({ children }: DarkModeProviderProps) => {
  const [darkMode, setDarkMode] = useState(getModeFromLocalStorage());
  
  useEffect(() => {
    const applyDarkMode = (isDark: boolean) => {
      saveModeToLocalStorage(isDark);
    };

    applyDarkMode(darkMode);
  }, [darkMode])

  return (
    <DarkModeContext.Provider value={{ darkMode, setDarkMode }}>
      <ThemeProvider theme={darkMode ? darkTheme : lightTheme}>
        <GlobalStyles />
        {children}
      </ThemeProvider>
    </DarkModeContext.Provider>
  );
}
