/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
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
        neutral: {
          50: '#f8fafc',  // slate-50
          100: '#f1f5f9', // slate-100
          200: '#e2e8f0', // slate-200
          300: '#cbd5e1', // slate-300
          400: '#94a3b8', // slate-400
          500: '#64748b', // slate-500
          600: '#475569', // slate-600
          700: '#334155', // slate-700
          800: '#1e293b', // slate-800
          900: '#0f172a', // slate-900
        },
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
