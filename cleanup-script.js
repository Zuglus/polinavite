#!/usr/bin/env node
/**
 * Скрипт для удаления старых .js/.jsx файлов,
 * которые были заменены их TS-эквивалентами
 */

import { promises as fs } from 'fs';
import fs_sync from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Получаем текущую директорию для ES модулей
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const SRC_DIR = path.join(__dirname, 'src');

// Функция для рекурсивного обхода директорий
async function walkDirectory(dir) {
  let results = [];
  const list = await fs.readdir(dir);
  
  for (const file of list) {
    const fullPath = path.join(dir, file);
    const stat = await fs.stat(fullPath);
    
    if (stat && stat.isDirectory()) {
      // Рекурсивно обходим поддиректории
      const subResults = await walkDirectory(fullPath);
      results = results.concat(subResults);
    } else {
      // Добавляем только файлы
      results.push(fullPath);
    }
  }
  
  return results;
}

// Основная функция
async function main() {
  try {
    // Находим все файлы в src
    const allFiles = await walkDirectory(SRC_DIR);

    // Создаем Map для поиска дубликатов
    const fileMap = new Map();

    // Группируем файлы по их базовому имени (без расширения)
    allFiles.forEach(file => {
      const extname = path.extname(file);
      const basename = path.basename(file, extname);
      const dirpath = path.dirname(file);
      const key = path.join(dirpath, basename);
      
      if (!fileMap.has(key)) {
        fileMap.set(key, []);
      }
      
      fileMap.get(key).push({
        path: file,
        ext: extname
      });
    });

    // Находим файлы для удаления
    const filesToDelete = [];

    fileMap.forEach((files, key) => {
      // Если у нас есть несколько версий одного файла
      if (files.length > 1) {
        // Проверяем приоритет: .tsx > .ts > .jsx > .js
        const hasTsx = files.some(f => f.ext === '.tsx');
        const hasTs = files.some(f => f.ext === '.ts');
        
        // Удаляем .jsx, если есть .tsx
        if (hasTsx) {
          const jsxFiles = files.filter(f => f.ext === '.jsx');
          filesToDelete.push(...jsxFiles.map(f => f.path));
        }
        
        // Удаляем .js, если есть .ts
        if (hasTs) {
          const jsFiles = files.filter(f => f.ext === '.js');
          filesToDelete.push(...jsFiles.map(f => f.path));
        }
      }
    });

    // Удаляем файлы
    if (filesToDelete.length > 0) {
      console.log(`Найдено ${filesToDelete.length} файлов для удаления:`);
      
      for (const file of filesToDelete) {
        console.log(`- ${file}`);
        try {
          await fs.unlink(file);
          console.log(`  ✅ Удален`);
        } catch (err) {
          console.error(`  ❌ Ошибка при удалении: ${err.message}`);
        }
      }
    } else {
      console.log('Файлы для удаления не найдены');
    }

    // Также удаляем .jsx.bak и .js.bak файлы, которые мы создавали ранее
    const backupFiles = allFiles.filter(file => 
      file.endsWith('.jsx.bak') || file.endsWith('.js.bak')
    );

    if (backupFiles.length > 0) {
      console.log(`\nНайдено ${backupFiles.length} резервных копий для удаления:`);
      
      for (const file of backupFiles) {
        console.log(`- ${file}`);
        try {
          await fs.unlink(file);
          console.log(`  ✅ Удален`);
        } catch (err) {
          console.error(`  ❌ Ошибка при удалении: ${err.message}`);
        }
      }
    } else {
      console.log('\nРезервные копии не найдены');
    }

    console.log('\nПроцесс очистки завершен!');
  } catch (error) {
    console.error('Произошла ошибка:', error);
  }
}

// Запускаем основную функцию
main();