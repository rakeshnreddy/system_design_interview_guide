// system-design-study-app/src/styles/muiThemes.js
import { createTheme } from '@mui/material/styles';

// Remove all local 'colors', 'fontFamily' consts and imports from 'themeTokens.js'

const lightThemeObj = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#00FF00', // Bright Green
    },
    secondary: {
      main: '#FF00FF', // Bright Magenta (for secondary test)
    },
    background: {
      default: '#CCCCCC', // Light Gray
      paper: '#DDDDDD',   // Lighter Gray
    },
    text: {
      primary: '#111111', // Dark Gray / Off-black
      secondary: '#444444', // Medium Gray
    }
  },
  typography: { // Add minimal typography to avoid potential errors if not present
    fontFamily: '"Arial", "Helvetica", sans-serif',
  },
  shape: { // Keep basic shape
    borderRadius: 8,
  }
});
console.log('muiThemes.js: lightTheme object:', lightThemeObj);
export const lightTheme = lightThemeObj;

const darkThemeObj = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#FFFF00', // Bright Yellow
    },
    secondary: {
      main: '#00FFFF', // Bright Cyan (for secondary test)
    },
    background: {
      default: '#222222', // Dark Gray
      paper: '#333333',   // Medium-Dark Gray
    },
    text: {
      primary: '#EEEEEE', // Off-white
      secondary: '#BBBBBB', // Light Gray
    }
  },
  typography: {
    fontFamily: '"Arial", "Helvetica", sans-serif',
  },
  shape: {
    borderRadius: 8,
  }
});
console.log('muiThemes.js: darkTheme object:', darkThemeObj);
export const darkTheme = darkThemeObj;
