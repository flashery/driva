import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      '@driva/schema': path.resolve(__dirname, '../../lib/schema'),
      '@driva/utils': path.resolve(__dirname, '../../lib/utils'),
      '@driva/types': path.resolve(__dirname, '../../lib/types'),
    },
  },
});
