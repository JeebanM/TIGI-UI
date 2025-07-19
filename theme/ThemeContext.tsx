import React, { createContext, useContext, ReactNode } from 'react';
import Colors, { ThemeColors } from './Colors';

type ThemeType = 'dark' | 'light';

interface ThemeContextType {
  theme: ThemeType;
  colors: ThemeColors;
}

const ThemeContext = createContext<ThemeContextType>({
  theme: 'dark',
  colors: Colors.dark,
});

interface ThemeProviderProps {
  children: ReactNode;
  theme?: ThemeType;
}

export const ThemeProvider = ({ children, theme = 'dark' }: ThemeProviderProps) => {
  const selectedColors = theme === 'dark' ? Colors.dark : Colors.light;

  return (
    <ThemeContext.Provider value={{ theme, colors: selectedColors }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = (): ThemeContextType => useContext(ThemeContext);
