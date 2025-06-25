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
          light: '#00A0A0', // Lighter teal
          DEFAULT: '#008080', // Deep teal
          dark: '#006060',  // Darker teal
        },
        secondary: {
          light: '#FFB733', // Lighter orange
          DEFAULT: '#FFA500', // Vibrant orange
          dark: '#CC8400',  // Darker orange
        },
        neutral: {
          100: '#F5F5F5', // Light gray
          300: '#D3D3D3', // Medium-light gray
          600: '#A9A9A9', // Medium gray
          800: '#666666', // Dark gray
          900: '#333333', // Very dark gray
        },
        white: '#ffffff',
        black: '#000000',
        // Colors from App.css - consider giving them semantic names if used consistently
        accent1: '#646cffaa', // Will be overridden or removed if not part of new theme
        accent2: '#61dafbaa', // Will be overridden or removed if not part of new theme
        textMuted: '#A9A9A9', // neutral-600, use with dark:text-neutral-300 for dark mode
      },
      fontFamily: {
        sans: ['Montserrat', 'sans-serif'],
        serif: ['Playfair Display', 'serif'], // Added for headings
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
    // Replaced require with import for ES Module compatibility with Vite
    // Note: For this to work directly, @tailwindcss/typography would need to be imported at the top.
    // However, Tailwind typically resolves plugin strings or direct plugin objects.
    // A common pattern is to import it at the top and then use the variable.
    // Let's try a direct string first, as Tailwind often handles this.
    // If not, we'll import it at the top.
    '@tailwindcss/typography',
    // Add other plugins if you have them
  ],
}

// If the string doesn't work, the alternative is:
// import typographyPlugin from '@tailwindcss/typography';
// ...
// plugins: [typographyPlugin],
// ...
