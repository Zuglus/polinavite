/**
 * Скрипт для очистки устаревших каталогов и файлов после миграции на FSD
 * Запускать после успешного тестирования новой структуры
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Получаем текущую директорию
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.resolve(__dirname, '..');

// Список устаревших каталогов, которые следует удалить
const obsoleteDirs = [
  'src/components',
  // Добавляем остальные по мере необходимости
];

// Список пустых файлов для обратной совместимости, которые следует оставить
const compatibilityFiles = [
  'src/services/index.ts',
  'src/utils/index.ts',
];

/**
 * Удаляет файл или каталог рекурсивно
 * @param {string} targetPath - Путь к файлу или каталогу
 * @param {boolean} isDryRun - Режим симуляции (без удаления)
 */
function removePath(targetPath, isDryRun = false) {
  const fullPath = path.resolve(rootDir, targetPath);
  
  // Проверяем, существует ли путь
  if (!fs.existsSync(fullPath)) {
    console.log(`Путь не существует: ${targetPath}`);
    return;
  }
  
  // Проверяем, не является ли путь файлом совместимости
  if (compatibilityFiles.includes(targetPath)) {
    console.log(`Оставляем файл совместимости: ${targetPath}`);
    return;
  }
  
  const stats = fs.statSync(fullPath);
  
  if (stats.isDirectory()) {
    if (isDryRun) {
      console.log(`[СИМУЛЯЦИЯ] Удаление каталога: ${targetPath}`);
    } else {
      console.log(`Удаление каталога: ${targetPath}`);
      fs.rmSync(fullPath, { recursive: true, force: true });
    }
  } else {
    if (isDryRun) {
      console.log(`[СИМУЛЯЦИЯ] Удаление файла: ${targetPath}`);
    } else {
      console.log(`Удаление файла: ${targetPath}`);
      fs.unlinkSync(fullPath);
    }
  }
}

/**
 * Основная функция очистки
 * @param {boolean} isDryRun - Режим симуляции (без удаления)
 */
function cleanup(isDryRun = true) {
  console.log(`${isDryRun ? '[СИМУЛЯЦИЯ]' : ''} Начинаем очистку устаревших файлов и каталогов...`);
  
  // Обрабатываем каждый устаревший каталог
  for (const dir of obsoleteDirs) {
    removePath(dir, isDryRun);
  }
  
  console.log(`${isDryRun ? '[СИМУЛЯЦИЯ]' : ''} Очистка завершена.`);
}

// Проверяем аргументы командной строки
const args = process.argv.slice(2);
const isDryRun = !args.includes('--force');

if (isDryRun) {
  console.log('Запуск в режиме симуляции. Для реального удаления добавьте флаг --force');
}

// Запускаем очистку
cleanup(isDryRun);