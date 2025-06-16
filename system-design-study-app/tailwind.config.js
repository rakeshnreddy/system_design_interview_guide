/** @type {import('tailwindcss').Config} */
export default {
  presets: [
    require('@tailwindcss/theme-preset-v3')
  ],
  darkMode: 'class',
  content: [
    "./index.html", // Path to your main HTML file
    "./src/**/*.{js,ts,jsx,tsx,vue}", // Path to all relevant source files
    // Add any other paths where you use Tailwind classes
    // For example, if you have components outside src:
    // "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          light: '#67e8f9', // cyan-300
          DEFAULT: '#06b6d4', // cyan-500
          dark: '#0e7490', // cyan-700
        },
        secondary: {
          light: '#ede9fe', // violet-100
          DEFAULT: '#8b5cf6', // violet-500
          dark: '#6d28d9', // violet-700
        },
        accent: {
          light: '#fde047', // yellow-300
          DEFAULT: '#facc15', // yellow-400
          dark: '#eab308', // yellow-500
        },
        // Neutral colors will now primarily come from the v3 preset.
        // The custom neutral palette has been removed to allow v3 neutrals.
        success: '#22c55e', // green-500
        error: '#ef4444',   // red-500
        warning: '#f97316', // orange-500
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'], // Example: Using Inter font
      },
    },
  },
  plugins: [],
}
