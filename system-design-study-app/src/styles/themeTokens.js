// system-design-study-app/src/styles/themeTokens.js
const allThemeTokens = {
  colors: {
    primary: {
      DEFAULT: '#0000FF', // Test blue
      light: '#6666FF',
      dark: '#000099',
    },
    secondary: { // Minimal secondary for structure
      DEFAULT: '#FF8800', // Test orange
    },
    neutral: { // Essential for body background via Tailwind
      50: '#FAFAFA',
      100: '#F0F0F0', // For bg-neutral-100
      // Add other neutral shades if specifically tested by @apply in index.css body
      800: '#333333', // For text-neutral-800
      900: '#1E1E1E', // For dark:bg-neutral-900
    },
    error: { DEFAULT: '#FF0000' }, // Test red
  },
  fontFamily: {
    sans: ['Arial', 'Helvetica', 'sans-serif'], // Minimal font stack
  },
  fontSize: { // Minimal
    'base': '1rem',
  },
  spacing: { // Minimal
    '1': '0.25rem',
    '8': '2rem', // For p-8 in App.css #root if that's restored
  }
};
export default allThemeTokens;
