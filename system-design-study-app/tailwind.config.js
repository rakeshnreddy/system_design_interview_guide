/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html", // Path to your main HTML file
    "./src/**/*.{js,ts,jsx,tsx,vue}", // Path to all relevant source files
  ],
  darkMode: 'class', // Ensure dark mode is class-based
  theme: {
    extend: {
      // You can extend your theme here if needed
      // For example, define primary, secondary colors that might be used by Tailwind classes
      colors: {
        primary: {
          light: '#60a5fa', // blue-400 example
          DEFAULT: '#3b82f6', // blue-500 example
          dark: '#2563eb',  // blue-600 example
        },
        secondary: {
          light: '#fbbf24', // amber-400 example
          DEFAULT: '#f59e0b', // amber-500 example
          dark: '#d97706',  // amber-600 example
        },
        // Add other custom colors if needed
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'), // Recommended for prose styling
    // Add other plugins if you have them
  ],
}
