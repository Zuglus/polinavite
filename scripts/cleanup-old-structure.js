// scripts/cleanup-old-structure.js
import fs from 'fs';
import path from 'path';
import { promisify } from 'util';
import { fileURLToPath } from 'url';

const readdir = promisify(fs.readdir);
const stat = promisify(fs.stat);
const rm = promisify(fs.rm);

// Получаем текущую директорию
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.resolve(__dirname, '..');
const componentsDir = path.resolve(rootDir, 'src/components');

/**
 * Удаляет старую структуру директорий с компонентами
 */
async function cleanupOldStructure() {
  try {
    console.log('🧹 Начинаем очистку старой структуры компонентов...');
    
    // Проверяем, существует ли директория components
    if (!fs.existsSync(componentsDir)) {
      console.log('✅ Директория components уже удалена.');
      return;
    }
    
    // Получаем список директорий для удаления
    const dirs = await readdir(componentsDir);
    
    for (const dir of dirs) {
      const dirPath = path.join(componentsDir, dir);
      const dirStat = await stat(dirPath);
      
      if (dirStat.isDirectory()) {
        console.log(`🗑️ Удаляем директорию: ${dirPath}`);
        await rm(dirPath, { recursive: true });
      } else {
        console.log(`🗑️ Удаляем файл: ${dirPath}`);
        await rm(dirPath);
      }
    }
    
    // Удаляем саму директорию components
    console.log(`🗑️ Удаляем основную директорию: ${componentsDir}`);
    await rm(componentsDir, { recursive: true });
    
    console.log('✅ Очистка старой структуры успешно завершена!');
  } catch (error) {
    console.error('❌ Ошибка при очистке старой структуры:', error);
    process.exit(1);
  }
}

// Запрашиваем подтверждение перед удалением
console.log('⚠️ ВНИМАНИЕ: Эта операция удалит все компоненты из директории src/components');
console.log('Убедитесь, что все компоненты были успешно мигрированы в новую структуру FSD.');
console.log('\nДля продолжения введите "yes":');

process.stdin.once('data', (data) => {
  const input = data.toString().trim().toLowerCase();
  
  if (input === 'yes') {
    cleanupOldStructure();
  } else {
    console.log('❌ Операция отменена.');
    process.exit(0);
  }
});