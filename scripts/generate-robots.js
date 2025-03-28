// scripts/generate-robots.js
import fs from 'fs';
import path from 'path';

/**
 * Генерирует файл robots.txt для поисковых систем
 * @param {Object} options - Опции для генерации
 * @param {string} options.siteUrl - URL сайта
 * @param {boolean} options.allowAll - Разрешить индексацию всего сайта
 * @param {Array<string>} options.disallowPaths - Пути, которые нужно исключить
 * @param {string} options.outputDir - Директория для сохранения файла
 */
function generateRobots({
  siteUrl = 'https://migranova.pro',
  allowAll = true,
  disallowPaths = [],
  outputDir = './dist'
} = {}) {
  // Создаем базовое содержимое robots.txt
  let content = 'User-agent: *\n';
  
  // Добавляем правила в зависимости от настроек
  if (allowAll) {
    content += 'Allow: /\n';
  } else {
    content += 'Disallow: /\n';
  }
  
  // Добавляем исключения
  disallowPaths.forEach(path => {
    content += `Disallow: ${path}\n`;
  });
  
  // Добавляем ссылку на Sitemap
  content += `\nSitemap: ${siteUrl}/sitemap.xml\n`;
  
  // Добавляем Host для Яндекса (для русскоязычных сайтов)
  content += `\nHost: ${siteUrl.replace(/^https?:\/\//, '')}\n`;
  
  // Записываем файл
  const filePath = path.join(outputDir, 'robots.txt');
  fs.writeFileSync(filePath, content);
  
  console.log(`✅ Файл robots.txt успешно создан: ${filePath}`);
  console.log(content);
}

// Запускаем генерацию с настройками по умолчанию
generateRobots({
  siteUrl: 'https://migranova.pro', // Замените на реальный URL
  allowAll: true,
  disallowPaths: [
    '/admin',
    '/private',
    '/temp',
    '/*.pdf'
  ],
  outputDir: './dist'
});

// Экспортируем функцию для возможного использования из других скриптов
export default generateRobots;