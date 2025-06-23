import { createTheme } from '@mui/material/styles';
// import themeTokens from './themeTokens.js'; // Commented out for local definitions

const colors = {
  primary: {
    light: '#4791db',
    DEFAULT: '#1976D2',
    dark: '#135ea7',
  },
  secondary: {
    light: '#fbbf24',
    DEFAULT: '#f59e0b',
    dark: '#d97706',
  },
  accent: {
    light: '#67e8f9',
    DEFAULT: '#06b6d4',
    dark: '#0e7490',
  },
  neutral: {
    50: '#f8fafc',
    100: '#f1f5f9',
    200: '#e2e8f0',
    300: '#cbd5e1',
    400: '#94a3b8',
    500: '#64748b',
    600: '#475569',
    700: '#334155',
    800: '#1e293b',
    900: '#0f172a',
  },
  success: '#22c55e',
  error: {
    DEFAULT: '#ef4444',
    dark: '#d92626',
  },
  warning: '#f97316',
};

const fontFamily = {
  sans: ['Inter', 'Roboto', 'Helvetica', 'Arial', 'sans-serif'],
};

// Common typography and component overrides
const commonThemeOptions = {
  typography: {
    fontFamily: fontFamily?.sans?.join(',') || '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
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
      main: colors?.primary?.DEFAULT || '#FF00FF', // Bright magenta fallback for testing
      light: colors?.primary?.light || '#4791db',
      dark: colors?.primary?.dark || '#135ea7',
    },
    secondary: {
      main: colors?.secondary?.DEFAULT || '#f59e0b',
      light: colors?.secondary?.light || '#fbbf24',
      dark: colors?.secondary?.dark || '#d97706',
    },
    error: {
      main: colors?.error?.DEFAULT || '#ef4444',
    },
    warning: {
      main: colors?.warning || '#f97316',
    },
    success: {
      main: colors?.success || '#22c55e',
    },
    background: {
      default: colors?.neutral?.[100] || '#f3f4f6',
      paper: colors?.neutral?.[50] || '#ffffff',
    },
    text: {
      primary: colors?.neutral?.[800] || '#1f2937',
      secondary: colors?.neutral?.[600] || '#4b5563',
    },
  },
});

// Dark Theme
export const darkTheme = createTheme({
  ...commonThemeOptions,
  palette: {
    mode: 'dark',
    primary: {
      main: colors?.primary?.light || '#4791db',
      light: colors?.accent?.light || '#73abdf',
      dark: colors?.primary?.DEFAULT || '#1976D2',
    },
    secondary: {
      main: colors?.secondary?.light || '#fbbf24',
      light: colors?.secondary?.DEFAULT || '#fcd34d',
      dark: colors?.secondary?.DEFAULT || '#f59e0b',
    },
    error: {
      main: colors?.error?.DEFAULT || '#ef4444',
    },
    warning: {
      main: colors?.warning || '#f97316',
    },
    success: {
      main: colors?.success || '#22c55e',
    },
    background: {
      default: colors?.neutral?.[900] || '#111827',
      paper: colors?.neutral?.[800] || '#1f2937',
    },
    text: {
      primary: colors?.neutral?.[100] || '#f3f4f6',
      secondary: colors?.neutral?.[300] || '#d1d5db',
    },
  },
});
