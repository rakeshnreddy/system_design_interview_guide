/** @type {import('tailwindcss').Config} */
import { colors, fontFamily, fontSize, spacing } from './src/styles/themeTokens.js';

export default {
  content: [
    "./index.html", // Path to your main HTML file
    "./src/**/*.{js,ts,jsx,tsx,vue}", // Path to all relevant source files
  ],
  darkMode: 'class', // Ensure dark mode is class-based
  theme: {
    extend: {
      colors: colors,
      fontFamily: fontFamily,
      fontSize: fontSize,
      spacing: spacing,
    }
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
}
