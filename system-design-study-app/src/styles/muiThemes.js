import { createTheme } from '@mui/material/styles';

import { alpha } from '@mui/material/styles';

import { alpha } from '@mui/material/styles';

// Fallback color values (from your CSS variables)
const FALLBACK_ACCENT_PRIMARY = '#4FD1C5';
// Light theme fallbacks
const FALLBACK_BACKGROUND_LIGHT = '#ffffff';
const FALLBACK_TEXT_PRIMARY_LIGHT = '#1a202c';
const FALLBACK_TEXT_SECONDARY_LIGHT = '#4a5568';
const FALLBACK_SURFACE_BG_LIGHT = '#f7fafc';
const FALLBACK_BORDER_COLOR_LIGHT = '#e2e8f0';
// Dark theme fallbacks
const FALLBACK_BACKGROUND_DARK = '#1a202c';
const FALLBACK_TEXT_PRIMARY_DARK = '#edf2f7';
const FALLBACK_TEXT_SECONDARY_DARK = '#a0aec0';
const FALLBACK_SURFACE_BG_DARK = '#2d3748';
const FALLBACK_BORDER_COLOR_DARK = '#4a5568';

const FALLBACK_SECONDARY_ACCENT_LIGHT = FALLBACK_TEXT_SECONDARY_LIGHT; // Example, adjust if needed
const FALLBACK_SECONDARY_ACCENT_DARK = FALLBACK_TEXT_SECONDARY_DARK; // Example, adjust if needed


const commonThemeOptions = {
  typography: {
    fontFamily: 'var(--font-body)',
    h1: { fontFamily: 'var(--font-heading)' },
    h2: { fontFamily: 'var(--font-heading)' },
    h3: { fontFamily: 'var(--font-heading)' },
    h4: { fontFamily: 'var(--font-heading)' },
    h5: { fontFamily: 'var(--font-heading)' },
    h6: { fontFamily: 'var(--font-heading)' },
  },
  shape: {
    borderRadius: 4,
  },
  spacing: (factor) => `${factor * 8}px`,

  components: {
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: 'var(--surface-bg)',
          color: 'var(--text-primary)',
          boxShadow: '0 2px 4px -1px var(--border-color)',
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          backgroundColor: 'var(--surface-bg)',
          border: '1px solid var(--border-color)',
          color: 'var(--text-primary)',
        },
      },
    },
    // MuiButton is overridden per-theme (light/dark) below to set correct contrastText
  },
};

// Light Theme
export const lightTheme = createTheme({
  ...commonThemeOptions,
  palette: {
    mode: 'light',
    primary: {
      main: FALLBACK_ACCENT_PRIMARY,
      light: alpha(FALLBACK_ACCENT_PRIMARY, 0.8),
      dark: alpha(FALLBACK_ACCENT_PRIMARY, 0.7), // Darken more for better contrast potential
      contrastText: FALLBACK_TEXT_PRIMARY_LIGHT, // Text that contrasts with main
    },
    secondary: {
      main: FALLBACK_SECONDARY_ACCENT_LIGHT,
      contrastText: FALLBACK_TEXT_PRIMARY_LIGHT,
    },
    background: {
      default: FALLBACK_BACKGROUND_LIGHT, // Fallback for MUI internals
      paper: FALLBACK_SURFACE_BG_LIGHT,   // Fallback for MUI internals
    },
    text: {
      primary: FALLBACK_TEXT_PRIMARY_LIGHT, // Fallback for MUI internals
      secondary: FALLBACK_TEXT_SECONDARY_LIGHT, // Fallback for MUI internals
    },
    divider: FALLBACK_BORDER_COLOR_LIGHT, // Fallback for MUI internals
  },
  components: {
    ...commonThemeOptions.components,
    MuiButton: {
      styleOverrides: {
        containedPrimary: {
          backgroundColor: 'var(--accent-primary)',
          color: FALLBACK_TEXT_PRIMARY_LIGHT, // Ensure this contrasts with --accent-primary
          '&:hover': {
            backgroundColor: 'var(--accent-primary)', // CSS var for runtime
            filter: 'brightness(90%)',
          },
        },
        textPrimary: {
          color: 'var(--accent-primary)', // CSS var for runtime
          '&:hover': {
            backgroundColor: alpha(FALLBACK_ACCENT_PRIMARY, 0.08),
          },
        },
      },
    },
    MuiLink: {
      styleOverrides: {
        root: {
          color: 'var(--accent-primary)', // CSS var for runtime
          '&:hover': {
            color: 'var(--accent-primary)', // CSS var for runtime
            filter: 'brightness(80%)',
          }
        }
      }
    }
  }
});

// Dark Theme
export const darkTheme = createTheme({
  ...commonThemeOptions,
  palette: {
    mode: 'dark',
    primary: {
      main: FALLBACK_ACCENT_PRIMARY,
      light: alpha(FALLBACK_ACCENT_PRIMARY, 0.8), // May need adjustment for dark theme
      dark: alpha(FALLBACK_ACCENT_PRIMARY, 0.7),  // May need adjustment for dark theme
      contrastText: FALLBACK_TEXT_PRIMARY_DARK, // Text that contrasts with main on dark background
    },
    secondary: {
      main: FALLBACK_SECONDARY_ACCENT_DARK,
      contrastText: FALLBACK_TEXT_PRIMARY_DARK,
    },
    background: {
      default: FALLBACK_BACKGROUND_DARK, // Fallback for MUI internals
      paper: FALLBACK_SURFACE_BG_DARK,   // Fallback for MUI internals
    },
    text: {
      primary: FALLBACK_TEXT_PRIMARY_DARK,   // Fallback for MUI internals
      secondary: FALLBACK_TEXT_SECONDARY_DARK, // Fallback for MUI internals
    },
    divider: FALLBACK_BORDER_COLOR_DARK, // Fallback for MUI internals
  },
  components: {
    ...commonThemeOptions.components,
    MuiButton: {
      styleOverrides: {
        containedPrimary: {
          backgroundColor: 'var(--accent-primary)', // CSS var for runtime
          color: FALLBACK_TEXT_PRIMARY_DARK, // Ensure this contrasts
          '&:hover': {
            backgroundColor: 'var(--accent-primary)', // CSS var for runtime
            filter: 'brightness(110%)',
          },
        },
        textPrimary: {
          color: 'var(--accent-primary)', // CSS var for runtime
          '&:hover': {
            backgroundColor: alpha(FALLBACK_ACCENT_PRIMARY, 0.12),
          },
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: 'var(--surface-bg)', // CSS var for runtime (dark)
          color: 'var(--text-primary)',       // CSS var for runtime (dark)
          boxShadow: '0 2px 4px -1px var(--border-color)', // CSS var for runtime (dark)
        },
      },
    },
    MuiLink: {
      styleOverrides: {
        root: {
          color: 'var(--accent-primary)', // CSS var for runtime
          '&:hover': {
            color: 'var(--accent-primary)', // CSS var for runtime
            filter: 'brightness(120%)',
          }
        }
      }
    }
  },
});
