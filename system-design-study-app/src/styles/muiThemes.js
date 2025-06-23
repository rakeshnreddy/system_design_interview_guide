import { createTheme } from '@mui/material/styles';
// import themeTokens from './themeTokens.js'; // Commented out for local definitions

const colors = {
  primary: {
    DEFAULT: '#0000FF', // Test blue
    light: '#6666FF',
    dark: '#000099',
  },
  secondary: {
    DEFAULT: '#FF8800', // Test orange
  },
  neutral: {
    50: '#FAFAFA',
    100: '#F0F0F0',
    800: '#333333',
    900: '#1E1E1E',
  },
  error: { DEFAULT: '#FF0000' }, // Test red
  accent: { light: '#00FFFF' }, // Minimal test accent
  warning: '#FFA500', // Minimal test warning
  success: '#00FF00', // Minimal test success
};

const fontFamily = {
  sans: ['Arial', 'Helvetica', 'sans-serif'], // Minimal font stack
};

// Common typography and component overrides
const commonThemeOptions = {
  typography: {
    fontFamily: fontFamily?.sans?.join(',') || '"Inter", "Roboto", "Helvetica", "Arial", sans-serif', // Original Inter stack as ultimate fallback
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
      light: colors?.primary?.light || '#4791db', // Original light blue fallback
      dark: colors?.primary?.dark || '#135ea7',   // Original dark blue fallback
    },
    secondary: {
      main: colors?.secondary?.DEFAULT || '#f59e0b', // Original amber fallback
      light: colors?.secondary?.light || '#fbbf24',  // Original light amber fallback (Note: minimal 'colors' has no secondary.light)
      dark: colors?.secondary?.dark || '#d97706',   // Original dark amber fallback (Note: minimal 'colors' has no secondary.dark)
    },
    error: {
      main: colors?.error?.DEFAULT || '#ef4444', // Original red fallback
    },
    warning: {
      main: colors?.warning || '#f97316', // Original orange fallback
    },
    success: {
      main: colors?.success || '#22c55e', // Original green fallback
    },
    background: {
      default: colors?.neutral?.[100] || '#f3f4f6', // Original light gray fallback
      paper: colors?.neutral?.[50] || '#ffffff',     // Original white fallback
    },
    text: {
      primary: colors?.neutral?.[800] || '#1f2937',   // Original dark gray fallback
      secondary: colors?.neutral?.[600] || '#4b5563', // Original medium gray fallback (Note: minimal 'colors' has no neutral.600)
    },
  },
});

// Dark Theme
export const darkTheme = createTheme({
  ...commonThemeOptions,
  palette: {
    mode: 'dark',
    primary: {
      main: colors?.primary?.light || '#4791db',      // Original light blue fallback
      light: colors?.accent?.light || '#73abdf',     // Original lighter blue fallback
      dark: colors?.primary?.DEFAULT || '#1976D2',    // Original default blue fallback
    },
    secondary: {
      main: colors?.secondary?.light || '#fbbf24',  // Original light amber fallback (Note: minimal 'colors' has no secondary.light)
      light: colors?.secondary?.DEFAULT || '#fcd34d', // Original lighter amber fallback
      dark: colors?.secondary?.DEFAULT || '#f59e0b',  // Original default amber fallback
    },
    error: {
      main: colors?.error?.DEFAULT || '#ef4444',     // Original red fallback
    },
    warning: {
      main: colors?.warning || '#f97316',             // Original orange fallback
    },
    success: {
      main: colors?.success || '#22c55e',             // Original green fallback
    },
    background: {
      default: colors?.neutral?.[900] || '#111827',    // Original dark gray fallback
      paper: colors?.neutral?.[800] || '#1f2937',       // Original medium-dark gray fallback
    },
    text: {
      primary: colors?.neutral?.[100] || '#f3f4f6',   // Original light gray fallback
      secondary: colors?.neutral?.[300] || '#d1d5db', // Original lighter gray fallback (Note: minimal 'colors' has no neutral.300)
    },
  },
});
