import { createTheme } from '@mui/material/styles';
import resolveConfig from 'tailwindcss/resolveConfig';
import tailwindConfigRaw from '../../tailwind.config.js'; // Adjusted path

// Resolve the full Tailwind CSS configuration to access theme values
const fullConfig = resolveConfig(tailwindConfigRaw);
const twTheme = fullConfig.theme;

// Common typography and component overrides can be defined here
const commonThemeOptions = {
  typography: {
    fontFamily: twTheme.fontFamily.sans.join(','), // Use sans-serif stack from Tailwind
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
      main: twTheme.colors.error, // Use error token from Tailwind
    },
    warning: {
      main: twTheme.colors.warning, // Use warning token
    },
    success: {
      main: twTheme.colors.success, // Use success token
    },
    background: {
      default: twTheme.colors.neutral[100], // e.g., neutral-100
      paper: twTheme.colors.neutral[50],   // e.g., neutral-50 (instead of direct white)
    },
    text: {
      primary: twTheme.colors.neutral[800],   // e.g., neutral-800
      secondary: twTheme.colors.neutral[600], // e.g., neutral-600
    },
  },
});

// Dark Theme
export const darkTheme = createTheme({
  ...commonThemeOptions,
  palette: {
    mode: 'dark',
    primary: {
      // Using lighter primary shades for dark mode main for better contrast
      main: twTheme.colors.primary.light,
      // Using accent.light as a placeholder for an even lighter primary variant
      // This should be refined with a dedicated 'primary.lighter' token if the color isn't suitable
      light: twTheme.colors.accent.light,
      dark: twTheme.colors.primary.DEFAULT,
    },
    secondary: {
      // Using lighter secondary shades for dark mode main
      main: twTheme.colors.secondary.light,
      light: twTheme.colors.secondary.DEFAULT, // This makes it lighter than 'main' here
      dark: twTheme.colors.secondary.DEFAULT,
    },
    error: {
      main: twTheme.colors.error,
    },
    warning: {
      main: twTheme.colors.warning,
    },
    success: {
      main: twTheme.colors.success,
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
