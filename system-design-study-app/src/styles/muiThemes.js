import { createTheme } from '@mui/material/styles';
// import tailwindConfigRaw from '../../tailwind.config.js';

// Defensively define twTheme
// const twTheme = tailwindConfigRaw && tailwindConfigRaw.theme ? tailwindConfigRaw.theme : {};

// Common typography and component overrides
const commonThemeOptions = {
  typography: {
    fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif', // Hardcoded Inter stack
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
      main: '#1976D2',
      light: '#4791db',
      dark: '#135ea7',
    },
    secondary: {
      main: '#f59e0b',
      light: '#fbbf24',
      dark: '#d97706',
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
      default: '#f3f4f6',
      paper: '#ffffff',
    },
    text: {
      primary: '#1f2937',
      secondary: '#4b5563',
    },
  },
});

// Dark Theme
export const darkTheme = createTheme({
  ...commonThemeOptions,
  palette: {
    mode: 'dark',
    primary: {
      main: '#4791db',    // Lighter blue for dark mode
      light: '#73abdf',
      dark: '#1976D2',
    },
    secondary: {
      main: '#fbbf24',    // Lighter amber for dark mode
      light: '#fcd34d',
      dark: '#f59e0b',
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
      default: '#111827',
      paper: '#1f2937',
    },
    text: {
      primary: '#f3f4f6',
      secondary: '#d1d5db',
    },
  },
});
