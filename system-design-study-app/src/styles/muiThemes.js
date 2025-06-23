import { createTheme } from '@mui/material/styles';
import tailwindConfigRaw from '../../tailwind.config.js';

// Defensively define twTheme
const twTheme = tailwindConfigRaw && tailwindConfigRaw.theme ? tailwindConfigRaw.theme : {};

// Common typography and component overrides
const commonThemeOptions = {
  typography: {
    fontFamily: (twTheme.fontFamily && twTheme.fontFamily.sans ? twTheme.fontFamily.sans.join(',') : 'Arial, sans-serif'),
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
      main: (twTheme.colors && twTheme.colors.primary && twTheme.colors.primary.DEFAULT ? twTheme.colors.primary.DEFAULT : '#1976D2'),
      light: (twTheme.colors && twTheme.colors.primary && twTheme.colors.primary.light ? twTheme.colors.primary.light : '#4791db'),
      dark: (twTheme.colors && twTheme.colors.primary && twTheme.colors.primary.dark ? twTheme.colors.primary.dark : '#135ea7'),
    },
    secondary: {
      main: (twTheme.colors && twTheme.colors.secondary && twTheme.colors.secondary.DEFAULT ? twTheme.colors.secondary.DEFAULT : '#f59e0b'),
      light: (twTheme.colors && twTheme.colors.secondary && twTheme.colors.secondary.light ? twTheme.colors.secondary.light : '#fbbf24'),
      dark: (twTheme.colors && twTheme.colors.secondary && twTheme.colors.secondary.dark ? twTheme.colors.secondary.dark : '#d97706'),
    },
    error: {
      main: (twTheme.colors && twTheme.colors.error && twTheme.colors.error.DEFAULT ? twTheme.colors.error.DEFAULT : '#ef4444'),
    },
    warning: { // Assuming warning is a direct value, not an object with DEFAULT
      main: (twTheme.colors && twTheme.colors.warning ? twTheme.colors.warning : '#f97316'),
    },
    success: { // Assuming success is a direct value
      main: (twTheme.colors && twTheme.colors.success ? twTheme.colors.success : '#22c55e'),
    },
    background: {
      default: (twTheme.colors && twTheme.colors.neutral && twTheme.colors.neutral[100] ? twTheme.colors.neutral[100] : '#f3f4f6'),
      paper: (twTheme.colors && twTheme.colors.neutral && twTheme.colors.neutral[50] ? twTheme.colors.neutral[50] : '#ffffff'),
    },
    text: {
      primary: (twTheme.colors && twTheme.colors.neutral && twTheme.colors.neutral[800] ? twTheme.colors.neutral[800] : '#1f2937'),
      secondary: (twTheme.colors && twTheme.colors.neutral && twTheme.colors.neutral[600] ? twTheme.colors.neutral[600] : '#4b5563'),
    },
  },
});

// Dark Theme
export const darkTheme = createTheme({
  ...commonThemeOptions,
  palette: {
    mode: 'dark',
    primary: {
      main: (twTheme.colors && twTheme.colors.primary && twTheme.colors.primary.light ? twTheme.colors.primary.light : '#4791db'),
      light: (twTheme.colors && twTheme.colors.accent && twTheme.colors.accent.light ? twTheme.colors.accent.light : '#73abdf'), // Fallback if accent isn't there either
      dark: (twTheme.colors && twTheme.colors.primary && twTheme.colors.primary.DEFAULT ? twTheme.colors.primary.DEFAULT : '#1976D2'),
    },
    secondary: {
      main: (twTheme.colors && twTheme.colors.secondary && twTheme.colors.secondary.light ? twTheme.colors.secondary.light : '#fbbf24'),
      light: (twTheme.colors && twTheme.colors.secondary && twTheme.colors.secondary.DEFAULT ? twTheme.colors.secondary.DEFAULT : '#fcd34d'), // original fallback for dark.secondary.light was amber-300
      dark: (twTheme.colors && twTheme.colors.secondary && twTheme.colors.secondary.DEFAULT ? twTheme.colors.secondary.DEFAULT : '#f59e0b'), // original fallback for dark.secondary.dark was amber-500
    },
    error: {
      main: (twTheme.colors && twTheme.colors.error && twTheme.colors.error.DEFAULT ? twTheme.colors.error.DEFAULT : '#ef4444'),
    },
    warning: { // Assuming warning is a direct value
      main: (twTheme.colors && twTheme.colors.warning ? twTheme.colors.warning : '#f97316'),
    },
    success: { // Assuming success is a direct value
      main: (twTheme.colors && twTheme.colors.success ? twTheme.colors.success : '#22c55e'),
    },
    background: {
      default: (twTheme.colors && twTheme.colors.neutral && twTheme.colors.neutral[900] ? twTheme.colors.neutral[900] : '#111827'),
      paper: (twTheme.colors && twTheme.colors.neutral && twTheme.colors.neutral[800] ? twTheme.colors.neutral[800] : '#1f2937'),
    },
    text: {
      primary: (twTheme.colors && twTheme.colors.neutral && twTheme.colors.neutral[100] ? twTheme.colors.neutral[100] : '#f3f4f6'),
      secondary: (twTheme.colors && twTheme.colors.neutral && twTheme.colors.neutral[300] ? twTheme.colors.neutral[300] : '#d1d5db'),
    },
  },
});
