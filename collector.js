import { promises as fs } from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Для ES модулей нужно получить путь текущего файла
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Конфигурация
const config = {
  // Директории, которые нужно игнорировать
  ignoreDirs: [
    'node_modules',
    '.git',
    'dist',
    'build',
    'coverage',
    '.idea',
    '.vscode',
    '.next',
    '.nuxt'
  ],
  // Расширения файлов, которые нужно игнорировать
  ignoreExtensions: [
    '.log',
    '.lock',
    '.map',
    '.min.js',
    '.min.css'
  ],
  // Файлы, которые нужно игнорировать
  ignoreFiles: [
    'package-lock.json',
    'yarn.lock',
    '.DS_Store',
    'Thumbs.db'
  ],
  // Расширения текстовых файлов (которые будут включены как текст)
  textExtensions: [
    '.js', '.jsx', '.cjs', '.ts', '.tsx',
    '.html', '.css', '.scss', '.sass', '.less',
    '.json', '.md', '.txt', '.xml', '.svg',
    '.vue', '.php', '.py', '.rb', '.java',
    '.c', '.cpp', '.h', '.cs', '.go',
    '.sh', '.bat', '.ps1', '.yml', '.yaml',
    '.toml', '.ini', '.env', '.gitignore',
    '.eslintrc', '.babelrc', '.prettierrc',
    '.editorconfig'
  ],
  // Максимальный размер текстового файла (в байтах)
  maxTextFileSize: 1024 * 1024 // 1MB
};

// Основная функция
async function collectProjectFiles(sourceDir, outputFile, scriptPath) {
  try {
    // Нормализация путей
    sourceDir = path.resolve(sourceDir);
    outputFile = path.resolve(outputFile);
    scriptPath = path.resolve(scriptPath);
    
    // Проверка наличия выходного файла и его удаление
    try {
      await fs.access(outputFile);
      console.log(`Существующий файл ${outputFile} будет перезаписан`);
      await fs.unlink(outputFile);
    } catch (fileError) {
      // Файл не существует, это нормально
      console.log(`Создание нового файла: ${outputFile}`);
    }
    
    // Создание нового выходного файла
    await fs.writeFile(outputFile, '', 'utf-8');
    
    // Запись заголовка
    await appendToFile(outputFile, `# Сборка файлов проекта\n`);
    await appendToFile(outputFile, `# Создано: ${new Date().toISOString()}\n`);
    await appendToFile(outputFile, `# Исходная директория: ${sourceDir}\n\n`);
    
    // Начинаем обход директории
    await traverseDirectory(sourceDir, outputFile, scriptPath);
    
    console.log(`Файлы проекта успешно собраны в ${outputFile}`);
  } catch (error) {
    console.error('Ошибка:', error);
  }
}

// Функция для добавления содержимого в выходной файл
async function appendToFile(file, content) {
  await fs.appendFile(file, content, 'utf-8');
}

// Функция для проверки, является ли файл бинарным
async function isBinaryFile(filePath, fileSize) {
  // Если файл слишком большой, считаем его бинарным
  if (fileSize > config.maxTextFileSize) {
    return true;
  }
  
  try {
    // Читаем первый фрагмент файла (4КБ должно быть достаточно для определения бинарного содержимого)
    const buffer = Buffer.alloc(4096);
    const fileHandle = await fs.open(filePath, 'r');
    const { bytesRead } = await fileHandle.read(buffer, 0, 4096, 0);
    await fileHandle.close();
    
    // Проверяем наличие NULL-байтов или других управляющих символов (кроме обычных, как переводы строк)
    for (let i = 0; i < bytesRead; i++) {
      const byte = buffer[i];
      // NULL-байты или управляющие символы (кроме 9 (табуляция), 10 (LF), 13 (CR))
      if (byte === 0 || (byte < 32 && byte !== 9 && byte !== 10 && byte !== 13)) {
        return true;
      }
    }
    
    return false;
  } catch (error) {
    console.error(`Ошибка при проверке файла на бинарность: ${error.message}`);
    // Если есть сомнения, считаем файл бинарным
    return true;
  }
}

// Функция для форматирования размера файла
function formatFileSize(bytes) {
  if (bytes < 1024) return bytes + ' байт';
  else if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(2) + ' КБ';
  else if (bytes < 1024 * 1024 * 1024) return (bytes / (1024 * 1024)).toFixed(2) + ' МБ';
  else return (bytes / (1024 * 1024 * 1024)).toFixed(2) + ' ГБ';
}

// Функция для рекурсивного обхода директорий
async function traverseDirectory(currentDir, outputFile, scriptPath) {
  try {
    // Читаем содержимое директории
    const files = await fs.readdir(currentDir);
    
    // Обрабатываем каждый файл или директорию
    for (const file of files) {
      const filePath = path.join(currentDir, file);
      const stats = await fs.stat(filePath);
      
      // Пропускаем скрипт и выходной файл
      if (filePath === scriptPath || filePath === outputFile) {
        continue;
      }
      
      // Если это директория
      if (stats.isDirectory()) {
        // Пропускаем игнорируемые директории
        if (config.ignoreDirs.includes(file)) {
          continue;
        }
        
        // Записываем информацию о директории
        await appendToFile(outputFile, `\n## Директория: ${filePath}\n\n`);
        
        // Рекурсивно обрабатываем директорию
        await traverseDirectory(filePath, outputFile, scriptPath);
      } 
      // Если это файл
      else if (stats.isFile()) {
        // Пропускаем игнорируемые файлы
        const fileName = path.basename(file);
        const fileExt = path.extname(file).toLowerCase();
        
        if (
          config.ignoreFiles.includes(fileName) ||
          config.ignoreExtensions.some(ext => fileName.endsWith(ext))
        ) {
          continue;
        }
        
        // Записываем информацию о файле с размером
        const fileSize = stats.size;
        const formattedSize = formatFileSize(fileSize);
        await appendToFile(outputFile, `\n### Файл: ${filePath} (${formattedSize})\n`);
        
        // Проверяем, является ли файл текстовым
        const isTextFile = config.textExtensions.includes(fileExt) && 
                           !(await isBinaryFile(filePath, fileSize));
        
        if (isTextFile) {
          try {
            // Читаем и записываем содержимое файла
            const content = await fs.readFile(filePath, 'utf-8');
            await appendToFile(outputFile, '```' + (fileExt.substring(1) || 'text') + '\n');
            await appendToFile(outputFile, content);
            await appendToFile(outputFile, '\n```\n');
          } catch (readError) {
            // Если не можем прочитать как текст, просто отмечаем это
            await appendToFile(outputFile, `[Ошибка чтения файла: ${readError.message}]\n`);
          }
        } else {
          // Для бинарных файлов просто отмечаем путь и размер
          await appendToFile(outputFile, `[Бинарный файл: ${filePath} (${formattedSize})]\n`);
        }
      }
    }
  } catch (error) {
    console.error(`Ошибка при обработке директории ${currentDir}:`, error);
    await appendToFile(outputFile, `[Ошибка при обработке директории ${currentDir}: ${error.message}]\n`);
  }
}

// Проверка аргументов командной строки
function main() {
  const args = process.argv.slice(2);
  
  // Используем текущую директорию, если не указана другая
  const sourceDir = args[0] || process.cwd();
  // Используем имя по умолчанию, если не указано другое
  const outputFile = args[1] || path.join(process.cwd(), 'project-files-for-ai.md');
  const scriptPath = fileURLToPath(import.meta.url);
  
  console.log(`Исходная директория: ${sourceDir}`);
  console.log(`Выходной файл: ${outputFile}`);
  
  collectProjectFiles(sourceDir, outputFile, scriptPath);
}

// Запуск скрипта
main();