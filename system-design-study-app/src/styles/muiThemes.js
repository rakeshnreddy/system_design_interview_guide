import { createTheme } from '@mui/material/styles';
import tailwindConfig from '../../tailwind.config.js'; // Adjust path as necessary

// Helper function to parse Tailwind fontSize array [size, {lineHeight}]
const parseFontSize = (fontSizeArray) => {
  if (Array.isArray(fontSizeArray)) {
    return {
      fontSize: fontSizeArray[0],
      lineHeight: fontSizeArray[1]?.lineHeight || 'normal',
    };
  }
  return { fontSize: fontSizeArray, lineHeight: 'normal' };
};

// Extracting tokens from Tailwind config
const twTheme = tailwindConfig.theme.extend;

const commonThemeOptions = {
  typography: {
    fontFamily: twTheme.fontFamily.sans.join(','),
    h1: {
      ...parseFontSize(twTheme.fontSize.h1),
      // fontWeight: 700, // MUI default or specify
    },
    h2: {
      ...parseFontSize(twTheme.fontSize.h2),
      // fontWeight: 700, // MUI default or specify
    },
    h3: {
      ...parseFontSize(twTheme.fontSize.h3),
      // fontWeight: 700, // MUI default or specify
    },
    body1: { // Mapping 'body' to MUI's 'body1'
      ...parseFontSize(twTheme.fontSize.body),
    },
    caption: {
      ...parseFontSize(twTheme.fontSize.caption),
    },
    // Add other MUI typography variants if needed, mapping from your Tailwind scale
    // e.g., h4, h5, h6, subtitle1, subtitle2, body2, button, overline
  },
  shape: {
    borderRadius: parseInt(twTheme.borderRadius.DEFAULT, 10),
  },
  spacing: (factor) => `${factor * 0.25}rem`, // Assuming 1 unit in MUI spacing is 4px (0.25rem) like Tailwind's spacing-1
  // Override component defaults here using Tailwind tokens if needed
  // components: {
  //   MuiButton: {
  //     styleOverrides: {
  //       root: {
  //         // Example: textTransform: 'none',
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
    background: {
      default: twTheme.colors.neutral[100], // gray-100
      paper: twTheme.colors.white,
    },
    text: {
      primary: twTheme.colors.neutral[800],   // gray-800
      secondary: twTheme.colors.neutral[600], // gray-600
      // muted: twTheme.colors.textMuted, // If you added this to Tailwind
    },
    // Add other custom light theme palette colors if needed, referencing twTheme.colors
  },
});

// Dark Theme
// For dark theme, you might want to use different shades or specific dark mode colors from your Tailwind config
// For simplicity, this example inverts some colors or uses darker shades.
// Ideally, your tailwind.config.js would have a more detailed dark mode color palette.
export const darkTheme = createTheme({
  ...commonThemeOptions,
  palette: {
    mode: 'dark',
    primary: {
      // Adjust for dark mode if your primary.DEFAULT is too dark
      main: twTheme.colors.primary.light, // Using light variant for dark mode primary
      light: twTheme.colors.primary.DEFAULT, // Original default as light for dark mode
      dark: twTheme.colors.primary.dark, // Keep dark as is or adjust
    },
    secondary: {
      main: twTheme.colors.secondary.light, // Using light variant for dark mode secondary
      light: twTheme.colors.secondary.DEFAULT,
      dark: twTheme.colors.secondary.dark,
    },
    background: {
      default: twTheme.colors.neutral[900], // gray-900
      paper: twTheme.colors.neutral[800],   // gray-800
    },
    text: {
      primary: twTheme.colors.neutral[100],   // gray-100 (light text on dark background)
      secondary: twTheme.colors.neutral[300], // gray-300
      // muted: lighten(twTheme.colors.textMuted, 0.5), // Example: lighten muted text for dark mode
    },
    // Add other custom dark theme palette colors if needed
  },
});
