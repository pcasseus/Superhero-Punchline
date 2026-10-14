import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

// Production output goes to "deploy" (required by the assignment) instead of Vite's default "dist".
export default defineConfig({
  plugins: [react(), tailwindcss()],
  build: {
    outDir: 'deploy',
    emptyOutDir: true,
    minify: true,
    cssMinify: true,
    sourcemap: false,
    target: 'es2020',
  },
});
