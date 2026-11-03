import { createContext, useContext } from 'react';
import { DARK_COLORS, LIGHT_COLORS } from './colors';

const ThemeContext = createContext(LIGHT_COLORS);

export function ThemeProvider({ scheme, children }) {
  return (
    <ThemeContext.Provider value={scheme === 'dark' ? DARK_COLORS : LIGHT_COLORS}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  return useContext(ThemeContext);
}
