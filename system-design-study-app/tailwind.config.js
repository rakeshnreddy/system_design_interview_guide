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
          light: '#4791db', // Lighter shade of #1976D2
          DEFAULT: '#1976D2', // Core primary color
          dark: '#135ea7',  // Darker shade of #1976D2
        },
        secondary: {
          light: '#fbbf24', // amber-400
          DEFAULT: '#f59e0b', // amber-500
          dark: '#d97706',  // amber-600
        },
        accent: {
          light: '#67e8f9', // Lighter teal/cyan
          DEFAULT: '#06b6d4', // Teal/cyan
          dark: '#0e7490',  // Darker teal/cyan
        },
        neutral: {
          50: '#f8fafc',
          100: '#f1f5f9',
          200: '#e2e8f0',
          300: '#cbd5e1',
          400: '#94a3b8',
          500: '#64748b',
          600: '#475569',
          700: '#334155',
          800: '#1e293b',
          900: '#0f172a',
        },
        success: '#22c55e',
        error: {
          DEFAULT: '#ef4444',
          dark: '#d92626', // For hover states, darker shade
        },
        warning: '#f97316',
      },
      fontFamily: {
        sans: ['Inter', 'Roboto', 'Helvetica', 'Arial', 'sans-serif'],
      },
      fontSize: {
        // Tailwind's existing xs, sm, base, lg, xl will be inherited
        // We are adding new ones and explicitly defining some that might overlap
        // but with specific line heights as per the design.
        'caption': ['0.75rem', { lineHeight: '1rem' }], // 12px
        'body': ['1rem', { lineHeight: '1.5rem' }],    // 16px (same as base)
        'h3': ['1.5rem', { lineHeight: '2rem' }],      // 24px (Tailwind's 2xl)
        'h2': ['1.875rem', { lineHeight: '2.25rem' }],// 30px (Tailwind's 3xl)
        'h1': ['2.25rem', { lineHeight: '2.5rem' }],  // 36px (Tailwind's 4xl)
      },
      spacing: {
        'spacing-0': '0px',
        'spacing-1': '0.25rem',    // 4px
        'spacing-2': '0.5rem',     // 8px
        'spacing-3': '0.75rem',    // 12px
        'spacing-4': '1rem',       // 16px
        'spacing-5': '1.25rem',    // 20px
        'spacing-6': '1.5rem',     // 24px
        'spacing-7': '1.75rem',    // 28px
        'spacing-8': '2rem',       // 32px
        'spacing-9': '2.25rem',    // 36px
        'spacing-10': '2.5rem',    // 40px
        'spacing-11': '2.75rem',   // 44px
        'spacing-12': '3rem',      // 48px
        'spacing-14': '3.5rem',    // 56px
        'spacing-16': '4rem',      // 64px
        'spacing-20': '5rem',      // 80px
        'spacing-24': '6rem',      // 96px
        '1.5': '0.375rem',         // 6px (for py-1.5)
      },
    },
  },
  // plugins: [
  //   require('@tailwindcss/typography'), // Recommended for prose styling
  //   // Add other plugins if you have them
  // ],
}
