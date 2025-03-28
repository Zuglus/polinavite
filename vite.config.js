import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import { visualizer } from 'rollup-plugin-visualizer';

// Плагин для генерации статического HTML
import { createHtmlPlugin } from 'vite-plugin-html';

export default defineConfig({
  plugins: [
    react(),
    // Плагин для статического HTML с возможностью добавления метаданных для SEO
    createHtmlPlugin({
      minify: true,
      pages: [
        {
          entry: 'src/app/main.tsx',
          filename: 'index.html',
          template: 'index.html',
          injectOptions: {
            data: {
              title: 'Полина Мигранова | Графический дизайнер',
              description: 'Портфолио графического дизайнера Полины Миграновой. Создание современного дизайна, брендинг, иллюстрации и веб-дизайн.',
              keywords: 'графический дизайнер, дизайн, брендинг, логотипы, веб-дизайн, Полина Мигранова',
            },
          },
        },
      ],
    }),
    // Добавляем анализатор размера бандла
    visualizer({
      open: false,
      gzipSize: true,
      brotliSize: true,
      filename: 'stats.html',
    }),
  ],
  resolve: {
    alias: {
      // Feature Sliced Design слои
      '@': path.resolve(__dirname, './src'),
      '@app': path.resolve(__dirname, './src/app'),
      '@pages': path.resolve(__dirname, './src/pages'),
      '@widgets': path.resolve(__dirname, './src/widgets'),
      '@features': path.resolve(__dirname, './src/features'),
      '@entities': path.resolve(__dirname, './src/entities'),
      '@shared': path.resolve(__dirname, './src/shared'),
      
      // Детализация для shared слоя
      '@shared-ui': path.resolve(__dirname, './src/shared/ui'),
      '@shared-lib': path.resolve(__dirname, './src/shared/lib'),
      '@shared-api': path.resolve(__dirname, './src/shared/api'),
      '@shared-config': path.resolve(__dirname, './src/shared/config'),
      '@shared-model': path.resolve(__dirname, './src/shared/model'),
      
      // Обратная совместимость с прежними путями
      '@assets': path.resolve(__dirname, './src/app/assets'),
      '@images': path.resolve(__dirname, './src/app/assets/images'),
      '@fonts': path.resolve(__dirname, './src/app/assets/fonts'),
    }
  },
  build: {
    // Оптимизация сборки
    target: 'es2018',
    outDir: 'dist',
    assetsDir: 'assets',
    cssCodeSplit: true,
    sourcemap: false,
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true,
      },
    },
    rollupOptions: {
      output: {
        // Стратегия разделения кода
        manualChunks: {
          'react-vendor': ['react', 'react-dom'],
          'framer-motion': ['framer-motion'],
          'state-vendor': ['@legendapp/state', 'rxjs'],
          'ui-vendor': ['@shared/ui'],
        }
      }
    }
  },
  // Оптимизация для предварительной загрузки
  optimizeDeps: {
    include: ['react', 'react-dom', '@legendapp/state', 'framer-motion', 'rxjs']
  },
  // Настройки сервера разработки
  server: {
    port: 3000,
    strictPort: true,
    open: true
  },
  // Добавляем поддержку SSG (Static Site Generation)
  ssgOptions: {
    script: 'async',
    formatting: 'minify',
    crittersOptions: {
      preload: 'swap',
    },
  },
});