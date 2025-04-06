// static-generation.config.js
import { build } from 'vite';
import fs from 'fs';
import path from 'path';
import * as cheerio from 'cheerio';
import { createSitemap } from './create-sitemap.js';
import { optimizeImages } from './optimize-images.js';
import { compressAssets } from './compress-assets.js';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

/**
 * Функция для статической генерации сайта
 */
async function staticGenerate() {
  try {
    console.log('🚀 Начинаем сборку статического сайта...');
    
    // Запускаем сборку проекта
    await build();
    
    console.log('✅ Базовая сборка завершена');
    
    // Путь к результирующему HTML файлу
    const htmlPath = path.resolve(__dirname, '../dist', 'index.html');
    
    // Читаем и модифицируем HTML
    const html = fs.readFileSync(htmlPath, 'utf-8');
    const $ = cheerio.load(html);
    
    // Добавляем мета-теги для SEO
    $('head').append(`
      <meta name="author" content="Полина Мигранова">
      <meta name="robots" content="index, follow">
      <meta property="og:title" content="Полина Мигранова | Графический дизайнер">
      <meta property="og:description" content="Портфолио графического дизайнера Полины Миграновой. Создание современного дизайна, брендинг, иллюстрации и веб-дизайн.">
      <meta property="og:type" content="website">
      <meta property="og:url" content="https://example.com">
      <meta property="og:image" content="https://example.com/og-image.jpg">
      <link rel="canonical" href="https://example.com">
    `);
    
    // Оптимизация загрузки критических ресурсов
    $('head').append(`
      <link rel="preload" href="/assets/fonts/MV-SKIFER.otf" as="font" type="font/otf" crossorigin>
      <link rel="preload" href="/assets/fonts/Onest-Regular.ttf" as="font" type="font/ttf" crossorigin>
    `);
    
    // Добавляем скрипт для предзагрузки изображений
    $('body').append(`
      <script>
        // Предзагрузка изображений для мобильных устройств
        if (window.innerWidth < 768) {
          const mobilePrefetchUrls = [
            '/assets/images/logo.svg',
            '/assets/images/threads.png',
            '/assets/images/code.png',
            '/assets/images/day.png'
          ];
          
          mobilePrefetchUrls.forEach(url => {
            const link = document.createElement('link');
            link.rel = 'prefetch';
            link.href = url;
            document.head.appendChild(link);
          });
        }
      </script>
    `);
    
    // Записываем измененный HTML
    fs.writeFileSync(htmlPath, $.html());
    
    console.log('✅ HTML оптимизирован для SEO');
    
    // Создаем sitemap.xml
    await createSitemap();
    console.log('✅ Создан sitemap.xml');
    
    // Оптимизируем изображения
    await optimizeImages();
    console.log('✅ Изображения оптимизированы');
    
    // Сжимаем ресурсы для уменьшения размера
    await compressAssets();
    console.log('✅ Ресурсы сжаты');
    
    console.log('🎉 Статическая генерация сайта успешно завершена!');
  } catch (error) {
    console.error('❌ Ошибка при генерации статического сайта:', error);
    process.exit(1);
  }
}

// Запускаем статическую генерацию
staticGenerate();