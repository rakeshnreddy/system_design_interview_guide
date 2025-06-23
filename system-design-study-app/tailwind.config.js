/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html", // Path to your main HTML file
    "./src/**/*.{js,ts,jsx,tsx,vue}", // Path to all relevant source files
  ],
  darkMode: 'class', // Ensure dark mode is class-based
  theme: {
    extend: {
      colors: {
        primary: {
          light: '#60a5fa', // Existing blue-400
          DEFAULT: '#1976D2', // Defined primary blue
          dark: '#2563eb',  // Existing blue-600
        },
        secondary: {
          light: '#fbbf24', // Existing amber-400
          DEFAULT: '#f59e0b', // Existing amber-500
          dark: '#d97706',  // Existing amber-600
        },
        neutral: {
          100: '#f3f4f6', // gray-100
          300: '#d1d5db', // gray-300
          600: '#4b5563', // gray-600
          800: '#1f2937', // gray-800
          900: '#111827', // gray-900
        },
        white: '#ffffff',
        black: '#000000',
        // Colors from App.css - consider giving them semantic names if used consistently
        accent1: '#646cffaa',
        accent2: '#61dafbaa',
        textMuted: '#888888', // from .read-the-docs
      },
      fontFamily: {
        sans: ['Inter', 'Roboto', 'Helvetica', 'Arial', 'sans-serif'],
      },
      fontSize: {
        'caption': ['0.75rem', { lineHeight: '1rem' }],    // 12px
        'body': ['1rem', { lineHeight: '1.5rem' }],        // 16px
        'h3': ['1.25rem', { lineHeight: '1.75rem' }],   // 20px
        'h2': ['1.5rem', { lineHeight: '2rem' }],      // 24px
        'h1': ['2.25rem', { lineHeight: '2.5rem' }],    // 36px
        // Example additional sizes if needed
        'xs': ['0.75rem', { lineHeight: '1rem' }],
        'sm': ['0.875rem', { lineHeight: '1.25rem' }],
        'base': ['1rem', { lineHeight: '1.5rem' }],
        'lg': ['1.125rem', { lineHeight: '1.75rem' }],
        'xl': ['1.25rem', { lineHeight: '1.75rem' }],
        '2xl': ['1.5rem', { lineHeight: '2rem' }],
        '3xl': ['1.875rem', { lineHeight: '2.25rem' }],
        '4xl': ['2.25rem', { lineHeight: '2.5rem' }],
        '5xl': ['3rem', { lineHeight: '1' }],
        '6xl': ['3.75rem', { lineHeight: '1' }],
      },
      lineHeight: {
        'caption': '1rem',    // 16px
        'body': '1.5rem',     // 24px
        'h3': '1.75rem',    // 28px
        'h2': '2rem',       // 32px
        'h1': '2.5rem',     // 40px
      },
      spacing: {
        // 4px base unit scale
        '0': '0px',
        '1': '4px',
        '2': '8px',
        '3': '12px',
        '4': '16px',
        '5': '20px',
        '6': '24px',
        '7': '28px',
        '8': '32px',
        '9': '36px',
        '10': '40px',
        '11': '44px',
        '12': '48px',
        '14': '56px',
        '16': '64px',
        '20': '80px',
        '24': '96px',
        '28': '112px',
        '32': '128px',
        '36': '144px',
        '40': '160px',
        '44': '176px',
        '48': '192px',
        '52': '208px',
        '56': '224px',
        '60': '240px',
        '64': '256px',
        '72': '288px',
        '80': '320px',
        '96': '384px',
        // Spacing values from App.css (converted to 4px scale where possible or kept as is)
        'app-root-padding': '2rem', // 32px, maps to spacing-8
        'logo-padding': '1.5em',    // This is relative, may need to be hardcoded or re-evaluated
        'card-padding': '2em',      // This is relative, may need to be hardcoded or re-evaluated
      },
      borderRadius: {
        'DEFAULT': '8px', // from muiThemes.js
        'sm': '4px',
        'md': '8px', // Default
        'lg': '12px',
        'xl': '16px',
        '2xl': '24px',
        'full': '9999px',
      },
      // Extend other properties like boxShadow, etc., if needed
      boxShadow: {
        'DEFAULT': '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)', // Example default shadow
        'md': '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
        'lg': '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
        'xl': '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
        '2xl': '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
        'inner': 'inset 0 2px 4px 0 rgba(0, 0, 0, 0.06)',
        'none': 'none',
      }
    },
  },
  plugins: [
    require('@tailwindcss/typography'), // Recommended for prose styling
    // Add other plugins if you have them
  ],
}
