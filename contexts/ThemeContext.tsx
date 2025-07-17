import { createContext, ReactNode, useContext, useMemo, useState } from "react";

export type Theme = "light" | "dark";

interface ThemeContextType {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  isDarkMode: boolean;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: ReactNode }) {
  // const colorScheme = Appearance.getColorScheme();
  // const [theme, setTheme] = useState<Theme>(
  //   colorScheme === 'dark' ? 'dark' : 'light'
  // );
  const [theme, setTheme] = useState<Theme>("light");

  const value = useMemo(
    () => ({
      theme,
      setTheme,
      isDarkMode: theme === "dark",
    }),
    [theme]
  );

  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
}
