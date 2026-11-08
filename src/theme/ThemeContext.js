import { createContext, useContext } from 'react';
import { DARK_COLORS, LIGHT_COLORS } from './colors';

const ThemeContext = createContext(LIGHT_COLORS);
const ThemeModeContext = createContext({ themeMode: 'light', setThemeMode: () => {} });

export function ThemeProvider({ scheme, themeMode, setThemeMode, children }) {
  return (
    <ThemeContext.Provider value={scheme === 'dark' ? DARK_COLORS : LIGHT_COLORS}>
      <ThemeModeContext.Provider value={{ themeMode, setThemeMode }}>
        {children}
      </ThemeModeContext.Provider>
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  return useContext(ThemeContext);
}

export function useThemeMode() {
  return useContext(ThemeModeContext);
}
