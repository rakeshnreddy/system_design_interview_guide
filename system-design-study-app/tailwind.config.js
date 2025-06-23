/** @type {import('tailwindcss').Config} */
import themeTokens from './src/styles/themeTokens.js'; // Changed to default import

export default {
  content: [
    "./index.html", // Path to your main HTML file
    "./src/**/*.{js,ts,jsx,tsx,vue}", // Path to all relevant source files
  ],
  darkMode: 'class', // Ensure dark mode is class-based
  prefix: 'tw-', // Added Tailwind prefix
  theme: {
    extend: {
      colors: themeTokens.colors,
      fontFamily: themeTokens.fontFamily,
      fontSize: themeTokens.fontSize,
      spacing: themeTokens.spacing,
    }
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
}
