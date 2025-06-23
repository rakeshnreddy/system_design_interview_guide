import { createTheme } from '@mui/material/styles';
import themeTokens from './themeTokens.js'; // Changed to default import

// Common typography and component overrides
const commonThemeOptions = {
  typography: {
    fontFamily: themeTokens?.fontFamily?.sans?.join(',') || '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
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
      main: themeTokens?.colors?.primary?.DEFAULT || '#1976D2',
      light: themeTokens?.colors?.primary?.light || '#4791db',
      dark: themeTokens?.colors?.primary?.dark || '#135ea7',
    },
    secondary: {
      main: themeTokens?.colors?.secondary?.DEFAULT || '#f59e0b',
      light: themeTokens?.colors?.secondary?.light || '#fbbf24',
      dark: themeTokens?.colors?.secondary?.dark || '#d97706',
    },
    error: {
      main: themeTokens?.colors?.error?.DEFAULT || '#ef4444',
    },
    warning: {
      main: themeTokens?.colors?.warning || '#f97316',
    },
    success: {
      main: themeTokens?.colors?.success || '#22c55e',
    },
    background: {
      default: themeTokens?.colors?.neutral?.[100] || '#f3f4f6',
      paper: themeTokens?.colors?.neutral?.[50] || '#ffffff',
    },
    text: {
      primary: themeTokens?.colors?.neutral?.[800] || '#1f2937',
      secondary: themeTokens?.colors?.neutral?.[600] || '#4b5563',
    },
  },
});

// Dark Theme
export const darkTheme = createTheme({
  ...commonThemeOptions,
  palette: {
    mode: 'dark',
    primary: {
      main: themeTokens?.colors?.primary?.light || '#4791db',
      light: themeTokens?.colors?.accent?.light || '#73abdf',
      dark: themeTokens?.colors?.primary?.DEFAULT || '#1976D2',
    },
    secondary: {
      main: themeTokens?.colors?.secondary?.light || '#fbbf24',
      light: themeTokens?.colors?.secondary?.DEFAULT || '#fcd34d',
      dark: themeTokens?.colors?.secondary?.DEFAULT || '#f59e0b',
    },
    error: {
      main: themeTokens?.colors?.error?.DEFAULT || '#ef4444',
    },
    warning: {
      main: themeTokens?.colors?.warning || '#f97316',
    },
    success: {
      main: themeTokens?.colors?.success || '#22c55e',
    },
    background: {
      default: themeTokens?.colors?.neutral?.[900] || '#111827',
      paper: themeTokens?.colors?.neutral?.[800] || '#1f2937',
    },
    text: {
      primary: themeTokens?.colors?.neutral?.[100] || '#f3f4f6',
      secondary: themeTokens?.colors?.neutral?.[300] || '#d1d5db',
    },
  },
});
