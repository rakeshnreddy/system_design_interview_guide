import React, { createContext, useContext, useState, useEffect, useMemo } from 'react';

/**
 * @typedef {'light' | 'dark'} ThemeMode
 */

/**
 * @typedef {object} ThemeContextType
 * @property {ThemeMode} themeMode - The current theme mode ('light' or 'dark').
 * @property {Function} toggleTheme - Function to toggle the theme mode.
 */

/**
 * @type {React.Context<ThemeContextType|undefined>}
 */
const ThemeContext = createContext(undefined);

/**
 * Custom hook to use the ThemeContext.
 * @returns {ThemeContextType} The theme context.
 * @throws {Error} If used outside of a CustomThemeProvider.
 */
export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a CustomThemeProvider');
  }
  return context;
}

/**
 * Provides theme context to its children components.
 * Manages the current theme mode (light/dark), persists it to localStorage,
 * and applies both the `dark` class and `data-theme` attribute to the
 * documentElement for Tailwind CSS and custom variables.
 * @param {object} props - The component props.
 * @param {React.ReactNode} props.children - The child components to be wrapped by the provider.
 */
export function CustomThemeProvider({ children }) {
  const [themeMode, setThemeMode] = useState(() => {
    const storedTheme = localStorage.getItem('themeMode');
    if (storedTheme) {
      return /** @type {ThemeMode} */ (storedTheme);
    }
    // If no stored theme, check system preference
    // return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    // Defaulting to 'light' if system preference is not used or not available for simplicity here.
    return 'light';
  });

  useEffect(() => {
    const root = window.document.documentElement;
    if (themeMode === 'dark') {
      root.classList.add('dark');
      root.setAttribute('data-theme', 'dark');
    } else {
      root.classList.remove('dark');
      root.setAttribute('data-theme', 'light');
    }
    localStorage.setItem('themeMode', themeMode);
  }, [themeMode]);

  const toggleTheme = () => {
    setThemeMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
  };

  // useMemo to prevent unnecessary re-renders of consumers if value object hasn't changed
  const value = useMemo(() => ({ themeMode, toggleTheme }), [themeMode]);

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}
