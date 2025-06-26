/// <reference types="vitest" />
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    include: [
      '@mui/material/styles',
      '@mui/material/utils',
      '@mui/material/colors',
      '@mui/material/Button', // Example: include if specific components cause issues
      // You might need to add other specific MUI component paths if issues persist
      // e.g. '@mui/material/AppBar', '@mui/material/Card', etc.
      // or even broader like '@mui/material' if necessary, though more targeted is better.
    ],
  },
  build: {
    rollupOptions: {
      external: ['mermaid'], // Tell Rollup that 'mermaid' is external
      output: {
        globals: {
          mermaid: 'mermaid', // Maps the import 'mermaid' to the global 'mermaid' variable
        },
      },
    },
  },
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './src/setupTests.js', // Path to your setup file
    css: true, // If you want to test CSS or components that import CSS
  },
});
