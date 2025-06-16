import { createTheme } from '@mui/material/styles';

// Common typography and component overrides can be defined here
const commonThemeOptions = {
  typography: {
    fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
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
      main: '#3b82f6', // Tailwind's blue-500 (example, matches tailwind.config.js)
      light: '#60a5fa', // Tailwind's blue-400
      dark: '#2563eb',  // Tailwind's blue-600
    },
    secondary: {
      main: '#f59e0b', // Tailwind's amber-500
      light: '#fbbf24', // Tailwind's amber-400
      dark: '#d97706',  // Tailwind's amber-600
    },
    background: {
      default: '#f3f4f6', // Tailwind's gray-100
      paper: '#ffffff',   // White
    },
    text: {
      primary: '#1f2937',   // Tailwind's gray-800
      secondary: '#4b5563', // Tailwind's gray-600
    },
    // Add other custom light theme palette colors if needed
  },
});

// Dark Theme
export const darkTheme = createTheme({
  ...commonThemeOptions,
  palette: {
    mode: 'dark',
    primary: {
      main: '#60a5fa', // Tailwind's blue-400 (lighter for dark mode)
      light: '#93c5fd', // Tailwind's blue-300
      dark: '#3b82f6',  // Tailwind's blue-500
    },
    secondary: {
      main: '#fbbf24', // Tailwind's amber-400
      light: '#fcd34d', // Tailwind's amber-300
      dark: '#f59e0b',  // Tailwind's amber-500
    },
    background: {
      default: '#111827', // Tailwind's gray-900
      paper: '#1f2937',   // Tailwind's gray-800
    },
    text: {
      primary: '#f3f4f6',   // Tailwind's gray-100
      secondary: '#d1d5db', // Tailwind's gray-300
    },
    // Add other custom dark theme palette colors if needed
  },
});
