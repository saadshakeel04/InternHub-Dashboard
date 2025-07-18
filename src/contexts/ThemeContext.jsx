import React, { createContext, useContext, useState, useEffect } from 'react';

// Define the ThemeContextType structure using JSDoc
/**
 * @typedef {object} ThemeContextType
 * @property {boolean} isDark
 * @property {() => void} toggleTheme
 */

// Create the ThemeContext with an undefined default value
const ThemeContext = createContext(undefined);

/**
 * Custom hook to consume the ThemeContext.
 * Throws an error if used outside of a ThemeProvider.
 * @returns {ThemeContextType}
 */
export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

/**
 * Props for the ThemeProvider component.
 * @typedef {object} ThemeProviderProps
 * @property {React.ReactNode} children
 */

/**
 * Provides theme context (dark/light mode) to its children.
 * Manages theme state and persists it in localStorage.
 * @param {ThemeProviderProps} { children }
 * @returns {JSX.Element}
 */
export const ThemeProvider = ({ children }) => {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    // Check for saved theme in localStorage or system preference
    const savedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
      setIsDark(true);
      document.documentElement.classList.add('dark'); // Apply dark class to HTML element
    } else {
      setIsDark(false);
      document.documentElement.classList.remove('dark'); // Remove dark class from HTML element
    }
  }, []); // Empty dependency array means this effect runs once on mount

  /**
   * Toggles the theme between dark and light mode.
   * Updates state, applies/removes 'dark' class to documentElement, and saves to localStorage.
   */
  const toggleTheme = () => {
    const newTheme = !isDark;
    setIsDark(newTheme);
    
    if (newTheme) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  };

  return (
    <ThemeContext.Provider value={{ isDark, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
