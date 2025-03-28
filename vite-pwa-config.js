// vite-pwa-config.js
import { VitePWA } from 'vite-plugin-pwa';

/**
 * Конфигурация PWA для проекта
 * @returns {import('vite-plugin-pwa').VitePWAOptions} Конфигурация
 */
export function getPwaConfig() {
  return {
    registerType: 'autoUpdate',
    includeAssets: [
      'favicon.ico',
      'apple-touch-icon.png',
      'android-chrome-192x192.png',
      'android-chrome-512x512.png',
      'fonts/*.{ttf,otf}',
      'images/*.{jpg,png,svg}'
    ],
    manifest: {
      name: 'Полина Мигранова | Графический дизайнер',
      short_name: 'Портфолио',
      description: 'Портфолио графического дизайнера Полины Миграновой',
      theme_color: '#04061B',
      background_color: '#04061B',
      display: 'standalone',
      icons: [
        {
          src: '/android-chrome-192x192.png',
          sizes: '192x192',
          type: 'image/png'
        },
        {
          src: '/android-chrome-512x512.png',
          sizes: '512x512',
          type: 'image/png'
        },
        {
          src: '/android-chrome-512x512.png',
          sizes: '512x512',
          type: 'image/png',
          purpose: 'maskable'
        }
      ],
      orientation: 'portrait'
    },
    workbox: {
      // Стратегия кеширования
      runtimeCaching: [
        {
          // Кеширование страниц
          urlPattern: /^https:\/\/[\w-]+(\.[\w-]+)+([\w.,@?^=%&:/~+#-]*[\w@?^=%&/~+#-])?/,
          handler: 'NetworkFirst',
          options: {
            cacheName: 'pages-cache',
            expiration: {
              maxEntries: 50,
              maxAgeSeconds: 30 * 24 * 60 * 60 // 30 дней
            }
          }
        },
        {
          // Кеширование шрифтов
          urlPattern: /^https:\/\/[\w-]+(\.[\w-]+)+([\w.,@?^=%&:/~+#-]*\.(woff2?|ttf|otf))/,
          handler: 'CacheFirst',
          options: {
            cacheName: 'fonts-cache',
            expiration: {
              maxEntries: 10,
              maxAgeSeconds: 365 * 24 * 60 * 60 // 1 год
            }
          }
        },
        {
          // Кеширование изображений
          urlPattern: /^https:\/\/[\w-]+(\.[\w-]+)+([\w.,@?^=%&:/~+#-]*\.(png|jpg|jpeg|webp|avif|svg))/,
          handler: 'CacheFirst',
          options: {
            cacheName: 'images-cache',
            expiration: {
              maxEntries: 100,
              maxAgeSeconds: 30 * 24 * 60 * 60 // 30 дней
            }
          }
        },
        {
          // Кеширование стилей и скриптов
          urlPattern: /^https:\/\/[\w-]+(\.[\w-]+)+([\w.,@?^=%&:/~+#-]*\.(css|js))/,
          handler: 'StaleWhileRevalidate',
          options: {
            cacheName: 'assets-cache',
            expiration: {
              maxEntries: 50,
              maxAgeSeconds: 7 * 24 * 60 * 60 // 7 дней
            }
          }
        }
      ],
      // Продакшн сборка
      globPatterns: [
        '**/*.{js,css,html,ico,png,svg,jpg,jpeg,webp,avif,woff,woff2,ttf,otf}'
      ],
      // Дополнительные настройки
      navigateFallback: 'index.html',
      navigateFallbackDenylist: [/^\/api\//],
      // Пропускаем URL, которые не хотим кешировать
      skipWaiting: true,
      clientsClaim: true
    },
    // Настройки DevTools
    devOptions: {
      enabled: true,
      type: 'module',
      navigateFallback: 'index.html'
    }
  };
}

// Дополнительные настройки для интеграции в Vite
export function configureVitePWA() {
  return VitePWA(getPwaConfig());
}