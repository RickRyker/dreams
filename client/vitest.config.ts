// client/vitest.config.ts

import {defineConfig} from 'vitest/config';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: [],
    alias: {
      '@shared': path.resolve(__dirname, '../shared'),
    },
    typecheck: {
      tsconfig: './tsconfig.vitest.json'
    }
  }
});
