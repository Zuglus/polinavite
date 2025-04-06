import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';

export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './src/test/setup.ts',
    include: ['src/**/*.test.{ts,tsx}'],
    coverage: {
      reporter: ['text', 'json', 'html'],
      include: ['src/**/*.{ts,tsx}'],
      exclude: [
        'src/**/*.d.ts',
        'src/**/*.test.{ts,tsx}',
        'src/test/**/*'
      ]
    }
  },
  resolve: {
    alias: {
      // Feature Sliced Design слои
      '@app': resolve(__dirname, './src/app'),
      '@pages': resolve(__dirname, './src/pages'),
      '@widgets': resolve(__dirname, './src/widgets'),
      '@features': resolve(__dirname, './src/features'),
      '@entities': resolve(__dirname, './src/entities'),
      '@shared': resolve(__dirname, './src/shared'),

      // Детализация для shared слоя
      '@shared-ui': resolve(__dirname, './src/shared/ui'),
      '@shared-lib': resolve(__dirname, './src/shared/lib'),
      '@shared-api': resolve(__dirname, './src/shared/api'),
      '@shared-config': resolve(__dirname, './src/shared/config'),
      '@shared-model': resolve(__dirname, './src/shared/model'),

      // Доступ к ресурсам приложения
      '@app-assets': resolve(__dirname, './src/app/assets'),
      '@images': resolve(__dirname, './src/app/assets/images'),
      '@fonts': resolve(__dirname, './src/app/assets/fonts'),
    }
  }
});