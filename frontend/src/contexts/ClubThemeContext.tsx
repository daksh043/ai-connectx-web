import { createContext, useContext, useEffect, useState, type ReactNode } from "react";

type ThemeMode = "light" | "dark";

interface ClubThemeContextType {
  theme: ThemeMode;
  isDark: boolean;
  toggleTheme: () => void;
  setTheme: (theme: ThemeMode) => void;
}

const ClubThemeContext = createContext<ClubThemeContextType | undefined>(undefined);

export function ClubThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setThemeState] = useState<ThemeMode>(() => {
    if (typeof window !== "undefined") {
      const urlParams = new URLSearchParams(window.location.search);
      const urlTheme = urlParams.get("theme");
      if (urlTheme === "dark" || urlTheme === "light") {
        return urlTheme;
      }
    }
    const saved = localStorage.getItem("club_theme");
    return saved === "dark" ? "dark" : "light"; // default to light theme
  });

  useEffect(() => {
    localStorage.setItem("club_theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setThemeState((prev) => (prev === "light" ? "dark" : "light"));
  };

  const setTheme = (newTheme: ThemeMode) => {
    setThemeState(newTheme);
  };

  const isDark = theme === "dark";

  return (
    <ClubThemeContext.Provider value={{ theme, isDark, toggleTheme, setTheme }}>
      {children}
    </ClubThemeContext.Provider>
  );
}

export function useClubTheme() {
  const context = useContext(ClubThemeContext);
  if (!context) {
    throw new Error("useClubTheme must be used within a ClubThemeProvider");
  }
  return context;
}
