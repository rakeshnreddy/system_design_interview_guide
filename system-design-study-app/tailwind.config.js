/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html", // Path to your main HTML file
    "./src/**/*.{js,ts,jsx,tsx,vue}", // Path to all relevant source files
  ],
  darkMode: ['attr', '[data-theme="dark"]'], // Enable dark mode using a data attribute
  theme: {
    extend: {
      colors: {
        // New theme palette using CSS variables
        background: 'var(--background)',
        'text-primary': 'var(--text-primary)',
        'text-secondary': 'var(--text-secondary)',
        'accent-primary': 'var(--accent-primary)',
        'surface-bg': 'var(--surface-bg)',
        'border-color': 'var(--border-color)',

        // Keeping existing semantic color names if they are still used
        // or if they should map to the new CSS variables.
        // For example, if 'primary.DEFAULT' should now be 'accent-primary':
        primary: {
          light: 'var(--accent-primary)', // Or a lighter shade if defined
          DEFAULT: 'var(--accent-primary)',
          dark: 'var(--accent-primary)', // Or a darker shade if defined
        },
        secondary: { // Example: if secondary is still needed and maps to something
          light: 'var(--text-secondary)', // Just an example, map as needed
          DEFAULT: 'var(--text-secondary)',
          dark: 'var(--text-secondary)',
        },
        neutral: { // You might map these to your new text/surface colors
          100: 'var(--surface-bg)', // Example: light surface
          300: 'var(--border-color)', // Example: border/divider
          600: 'var(--text-secondary)',
          800: 'var(--text-primary)',
          900: 'var(--text-primary)', // Example: dark surface might be text-primary on a very dark bg
        },
        white: '#ffffff', // Keep if needed, or use CSS var if white is part of theme
        black: '#000000', // Keep if needed, or use CSS var
      },
      fontFamily: {
        // Update to use new CSS variable based font families
        sans: ['var(--font-body)'], // Default sans-serif font
        serif: ['var(--font-heading)'], // Default serif/heading font
        // Specific named families if needed, also using CSS vars
        heading: ['var(--font-heading)'],
        body: ['var(--font-body)'],
      },
      // Font sizes, line heights, spacing, etc., can remain as they are if they
      // don't need to change based on the new theme variables directly.
      // If they do, they could also be defined using CSS variables if necessary,
      // though it's less common for these to be in CSS vars unless highly dynamic.
      fontSize: {
        'caption': ['0.75rem', { lineHeight: '1rem' }],
        'body': ['1rem', { lineHeight: '1.5rem' }],
        'h3': ['1.25rem', { lineHeight: '1.75rem' }],
        'h2': ['1.5rem', { lineHeight: '2rem' }],
        'h1': ['2.25rem', { lineHeight: '2.5rem' }],
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
        'caption': '1rem',
        'body': '1.5rem',
        'h3': '1.75rem',
        'h2': '2rem',
        'h1': '2.5rem',
      },
      spacing: {
        '0': '0px', '1': '4px', '2': '8px', '3': '12px', '4': '16px',
        '5': '20px', '6': '24px', '7': '28px', '8': '32px', '9': '36px',
        '10': '40px', '11': '44px', '12': '48px', '14': '56px', '16': '64px',
        '20': '80px', '24': '96px', '28': '112px', '32': '128px', '36': '144px',
        '40': '160px', '44': '176px', '48': '192px', '52': '208px', '56': '224px',
        '60': '240px', '64': '256px', '72': '288px', '80': '320px', '96': '384px',
        'app-root-padding': '2rem',
        'logo-padding': '1.5em',
        'card-padding': '2em',
      },
      borderRadius: {
        'DEFAULT': '8px', 'sm': '4px', 'md': '8px', 'lg': '12px',
        'xl': '16px', '2xl': '24px', 'full': '9999px',
      },
      boxShadow: {
        'DEFAULT': '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
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
    '@tailwindcss/typography',
  ],
}
