// system-design-study-app/src/styles/themeTokens.js

const colors = {
  primary: {
    light: '#4791db',
    DEFAULT: '#1976D2',
    dark: '#135ea7',
  },
  secondary: {
    light: '#fbbf24',
    DEFAULT: '#f59e0b',
    dark: '#d97706',
  },
  accent: {
    light: '#67e8f9',
    DEFAULT: '#06b6d4',
    dark: '#0e7490',
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
    dark: '#d92626',
  },
  warning: '#f97316',
};

const fontFamily = {
  sans: ['Inter', 'Roboto', 'Helvetica', 'Arial', 'sans-serif'],
};

const fontSize = {
  'caption': ['0.75rem', { lineHeight: '1rem' }],
  'body': ['1rem', { lineHeight: '1.5rem' }],
  'h3': ['1.5rem', { lineHeight: '2rem' }],
  'h2': ['1.875rem', { lineHeight: '2.25rem' }],
  'h1': ['2.25rem', { lineHeight: '2.5rem' }],
};

const spacing = {
  'spacing-0': '0px',
  'spacing-1': '0.25rem',
  'spacing-2': '0.5rem',
  'spacing-3': '0.75rem',
  'spacing-4': '1rem',
  'spacing-5': '1.25rem',
  'spacing-6': '1.5rem',
  'spacing-7': '1.75rem',
  'spacing-8': '2rem',
  'spacing-9': '2.25rem',
  'spacing-10': '2.5rem',
  'spacing-11': '2.75rem',
  'spacing-12': '3rem',
  'spacing-14': '3.5rem',
  'spacing-16': '4rem',
  'spacing-20': '5rem',
  'spacing-24': '6rem',
  '1.5': '0.375rem',
};

const allThemeTokens = {
  colors,
  fontFamily,
  fontSize,
  spacing,
};

export default allThemeTokens;
