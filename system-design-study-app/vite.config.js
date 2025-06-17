/// <reference types="vitest" />
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
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
