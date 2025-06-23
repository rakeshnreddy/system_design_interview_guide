import { createTheme } from '@mui/material/styles';
import tailwindConfigRaw from '../../tailwind.config.js'; // Uncommented

// Defensively define twTheme
const twTheme = tailwindConfigRaw && tailwindConfigRaw.theme ? tailwindConfigRaw.theme : {}; // Uncommented

// Common typography and component overrides
const commonThemeOptions = {
  typography: {
    fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif', // Kept Hardcoded
  },
  shape: {
    borderRadius: 8,
  },
};

// Light Theme
export const lightTheme = createTheme({
  ...commonThemeOptions,
  palette: {
    mode: 'light',
    primary: {
      main: '#1976D2',       // Kept Hardcoded
      light: '#4791db',      // Kept Hardcoded
      dark: '#135ea7',       // Kept Hardcoded
    },
    secondary: {
      main: '#f59e0b',       // Kept Hardcoded
      light: '#fbbf24',      // Kept Hardcoded
      dark: '#d97706',       // Kept Hardcoded
    },
    error: {
      main: '#ef4444',       // Kept Hardcoded
    },
    warning: {
      main: '#f97316',       // Kept Hardcoded
    },
    success: {
      main: '#22c55e',       // Kept Hardcoded
    },
    background: {
      default: '#f3f4f6',    // Kept Hardcoded
      paper: '#ffffff',       // Kept Hardcoded
    },
    text: {
      primary: '#1f2937',   // Kept Hardcoded
      secondary: '#4b5563',  // Kept Hardcoded
    },
  },
});

// Dark Theme
export const darkTheme = createTheme({
  ...commonThemeOptions,
  palette: {
    mode: 'dark',
    primary: {
      main: '#4791db',       // Kept Hardcoded
      light: '#73abdf',      // Kept Hardcoded
      dark: '#1976D2',       // Kept Hardcoded
    },
    secondary: {
      main: '#fbbf24',       // Kept Hardcoded
      light: '#fcd34d',      // Kept Hardcoded
      dark: '#f59e0b',       // Kept Hardcoded
    },
    error: {
      main: '#ef4444',       // Kept Hardcoded
    },
    warning: {
      main: '#f97316',       // Kept Hardcoded
    },
    success: {
      main: '#22c55e',       // Kept Hardcoded
    },
    background: {
      default: '#111827',    // Kept Hardcoded
      paper: '#1f2937',       // Kept Hardcoded
    },
    text: {
      primary: '#f3f4f6',   // Kept Hardcoded
      secondary: '#d1d5db',  // Kept Hardcoded
    },
  },
});
