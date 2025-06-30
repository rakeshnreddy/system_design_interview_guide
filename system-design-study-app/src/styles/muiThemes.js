import { createTheme } from '@mui/material/styles';

// Common typography and component overrides can be defined here
const commonThemeOptions = {
  typography: {
    fontFamily: 'Roboto, sans-serif', // from :root --font-body
    // Example: Define h1-h6 styles if needed, or keep MUI defaults
    // h1: { fontSize: '2.5rem', fontWeight: 700 },
  },
  shape: {
    borderRadius: 8, // Slightly more rounded than default MUI
  },
  // You can override component defaults here too
  // components: {
  //   MuiButton: {
  //     styleOverrides: {
  //       root: {
  //         textTransform: 'none', // Example: disable uppercase buttons
  //       },
  //     },
  //   },
  // },
};

// Light Theme
export const lightTheme = createTheme({
  ...commonThemeOptions,
  palette: {
    mode: 'light',
    primary: {
      main: '#4FD1C5', // --accent-primary
      light: '#67e8f9', // --color-primary-light (from @theme, a reasonable guess)
      dark: '#0e7490', // --color-primary-dark (from @theme, a reasonable guess)
    },
    secondary: {
      main: '#8b5cf6', // --color-secondary
      light: '#ede9fe', // --color-secondary-light
      dark: '#6d28d9', // --color-secondary-dark
    },
    error: {
      main: '#ef4444', // --color-error
    },
    warning: {
      main: '#f97316', // --color-warning
    },
    success: {
      main: '#22c55e', // --color-success
    },
    background: {
      default: '#ffffff', // --background
      paper: '#f7fafc',   // --surface-bg
    },
    text: {
      primary: '#1a202c',   // --text-primary
      secondary: '#4a5568', // --text-secondary
    },
  },
});

// Dark Theme
export const darkTheme = createTheme({
  ...commonThemeOptions,
  palette: {
    mode: 'dark',
    primary: {
      main: '#4FD1C5', // --accent-primary
      light: '#67e8f9', // Lighter shade for dark mode
      dark: '#06b6d4', // A darker shade
    },
    secondary: {
      main: '#8b5cf6',
      light: '#ede9fe',
      dark: '#6d28d9',
    },
    error: {
      main: '#ef4444',
    },
    warning: {
      main: '#f97316',
    },
    success: {
      main: '#22c55e',
    },
    background: {
      default: '#1a202c', // --background
      paper: '#2d3748',   // --surface-bg
    },
    text: {
      primary: '#edf2f7',   // --text-primary
      secondary: '#e2e8f0', // --text-secondary (Increased contrast)
    },
  },
});
