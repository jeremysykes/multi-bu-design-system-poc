import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@multi-bu/ui': resolve(__dirname, '../../packages/ui/src'),
      '@multi-bu/themes': resolve(__dirname, '../../packages/themes/src'),
      '@theme-engine': resolve(__dirname, '../../theme-engine/src'),
    },
  },
  server: {
    port: 3000,
  },
});

