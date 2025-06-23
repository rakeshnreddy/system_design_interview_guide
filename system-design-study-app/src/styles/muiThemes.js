import { createTheme } from '@mui/material/styles';
// Removed: import resolveConfig from 'tailwindcss/resolveConfig';
import tailwindConfigRaw from '../../tailwind.config.js'; // Adjusted path

// Use the 'extend' part of the Tailwind config directly
// const fullConfig = resolveConfig(tailwindConfigRaw); // Removed
const twTheme = tailwindConfigRaw.theme.extend; // Changed to access extend directly

// Common typography and component overrides can be defined here
const commonThemeOptions = {
  typography: {
    fontFamily: twTheme.fontFamily.sans.join(','), // Use sans-serif stack from Tailwind extend
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
      main: twTheme.colors.primary.DEFAULT,
      light: twTheme.colors.primary.light,
      dark: twTheme.colors.primary.dark,
    },
    secondary: {
      main: twTheme.colors.secondary.DEFAULT,
      light: twTheme.colors.secondary.light,
      dark: twTheme.colors.secondary.dark,
    },
    error: {
      main: twTheme.colors.error.DEFAULT, // Adjusted path for error color
    },
    warning: {
      main: twTheme.colors.warning, // Assuming warning is still a direct value
    },
    success: {
      main: twTheme.colors.success, // Assuming success is still a direct value
    },
    background: {
      default: twTheme.colors.neutral[100],
      paper: twTheme.colors.neutral[50],
    },
    text: {
      primary: twTheme.colors.neutral[800],
      secondary: twTheme.colors.neutral[600],
    },
  },
});

// Dark Theme
export const darkTheme = createTheme({
  ...commonThemeOptions,
  palette: {
    mode: 'dark',
    primary: {
      main: twTheme.colors.primary.light,
      light: twTheme.colors.accent.light,
      dark: twTheme.colors.primary.DEFAULT,
    },
    secondary: {
      main: twTheme.colors.secondary.light,
      light: twTheme.colors.secondary.DEFAULT,
      dark: twTheme.colors.secondary.DEFAULT,
    },
    error: {
      main: twTheme.colors.error.DEFAULT, // Adjusted path for error color
    },
    warning: {
      main: twTheme.colors.warning, // Assuming warning is still a direct value
    },
    success: {
      main: twTheme.colors.success, // Assuming success is still a direct value
    },
    background: {
      default: twTheme.colors.neutral[900],
      paper: twTheme.colors.neutral[800],
    },
    text: {
      primary: twTheme.colors.neutral[100],
      secondary: twTheme.colors.neutral[300],
    },
  },
});
