import { createTheme } from '@mui/material/styles';
// import tailwindConfigRaw from '../../tailwind.config.js'; // Removed
import { colors, fontFamily } from './themeTokens.js'; // Added fontSize, spacing if needed later

// Defensively define twTheme // Removed
// const twTheme = tailwindConfigRaw && tailwindConfigRaw.theme ? tailwindConfigRaw.theme : {};

// Common typography and component overrides
const commonThemeOptions = {
  typography: {
    fontFamily: (fontFamily && fontFamily.sans ? fontFamily.sans.join(',') : '"Inter", "Roboto", "Helvetica", "Arial", sans-serif'),
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
      main: (colors && colors.primary && colors.primary.DEFAULT ? colors.primary.DEFAULT : '#1976D2'),
      light: (colors && colors.primary && colors.primary.light ? colors.primary.light : '#4791db'),
      dark: (colors && colors.primary && colors.primary.dark ? colors.primary.dark : '#135ea7'),
    },
    secondary: {
      main: (colors && colors.secondary && colors.secondary.DEFAULT ? colors.secondary.DEFAULT : '#f59e0b'),
      light: (colors && colors.secondary && colors.secondary.light ? colors.secondary.light : '#fbbf24'),
      dark: (colors && colors.secondary && colors.secondary.dark ? colors.secondary.dark : '#d97706'),
    },
    error: {
      main: (colors && colors.error && colors.error.DEFAULT ? colors.error.DEFAULT : '#ef4444'),
    },
    warning: {
      main: (colors && colors.warning ? colors.warning : '#f97316'),
    },
    success: {
      main: (colors && colors.success ? colors.success : '#22c55e'),
    },
    background: {
      default: (colors && colors.neutral && colors.neutral[100] ? colors.neutral[100] : '#f3f4f6'),
      paper: (colors && colors.neutral && colors.neutral[50] ? colors.neutral[50] : '#ffffff'),
    },
    text: {
      primary: (colors && colors.neutral && colors.neutral[800] ? colors.neutral[800] : '#1f2937'),
      secondary: (colors && colors.neutral && colors.neutral[600] ? colors.neutral[600] : '#4b5563'),
    },
  },
});

// Dark Theme
export const darkTheme = createTheme({
  ...commonThemeOptions,
  palette: {
    mode: 'dark',
    primary: {
      main: (colors && colors.primary && colors.primary.light ? colors.primary.light : '#4791db'),
      light: (colors && colors.accent && colors.accent.light ? colors.accent.light : '#73abdf'),
      dark: (colors && colors.primary && colors.primary.DEFAULT ? colors.primary.DEFAULT : '#1976D2'),
    },
    secondary: {
      main: (colors && colors.secondary && colors.secondary.light ? colors.secondary.light : '#fbbf24'),
      light: (colors && colors.secondary && colors.secondary.DEFAULT ? colors.secondary.DEFAULT : '#fcd34d'),
      dark: (colors && colors.secondary && colors.secondary.DEFAULT ? colors.secondary.DEFAULT : '#f59e0b'),
    },
    error: {
      main: (colors && colors.error && colors.error.DEFAULT ? colors.error.DEFAULT : '#ef4444'),
    },
    warning: {
      main: (colors && colors.warning ? colors.warning : '#f97316'),
    },
    success: {
      main: (colors && colors.success ? colors.success : '#22c55e'),
    },
    background: {
      default: (colors && colors.neutral && colors.neutral[900] ? colors.neutral[900] : '#111827'),
      paper: (colors && colors.neutral && colors.neutral[800] ? colors.neutral[800] : '#1f2937'),
    },
    text: {
      primary: (colors && colors.neutral && colors.neutral[100] ? colors.neutral[100] : '#f3f4f6'),
      secondary: (colors && colors.neutral && colors.neutral[300] ? colors.neutral[300] : '#d1d5db'),
    },
  },
});
