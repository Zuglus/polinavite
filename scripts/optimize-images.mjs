// scripts/optimize-images.mjs
import fs from 'fs/promises';
import path from 'path';
import sharp from 'sharp';
import { cpus } from 'os';
import { fileURLToPath } from 'url';
import { createPool } from 'workerpool';

// Получаем текущую директорию
const __dirname = path.dirname(fileURLToPath(import.meta.url));

// Конфигурация для оптимизации
const config = {
  // Директория с исходными изображениями
  inputDir: path.resolve(__dirname, '../public/images'),
  // Директория для оптимизированных изображений
  outputDir: path.resolve(__dirname, '../public/images/optimized'),
  // Размеры для адаптивных изображений
  sizes: [320, 640, 960, 1280, 1920],
  // Форматы для конвертации
  formats: ['webp', 'avif'],
  // Настройки сжатия для разных форматов
  compressionOptions: {
    png: { quality: 80 },
    jpg: { quality: 80, mozjpeg: true },
    webp: { quality: 75 },
    avif: { quality: 65 },
  },
  // Метаданные для отчета
  metadata: {
    originalSize: 0,
    optimizedSize: 0,
    images: [],
  },
};

/**
 * Создает директории для оптимизированных изображений
 */
async function createDirectories() {
  try {
    // Создаем основную директорию для оптимизированных изображений
    await fs.mkdir(config.outputDir, { recursive: true });
    
    // Создаем директории для разных форматов
    for (const format of config.formats) {
      await fs.mkdir(path.join(config.outputDir, format), { recursive: true });
    }
    
    console.log('✅ Директории созданы');
  } catch (error) {
    console.error('❌ Ошибка при создании директорий:', error);
    throw error;
  }
}

/**
 * Обрабатывает одно изображение
 */
async function processImage(imagePath) {
  const filename = path.basename(imagePath);
  const ext = path.extname(filename).toLowerCase().slice(1);
  
  try {
    // Проверяем, поддерживается ли формат
    if (!['jpg', 'jpeg', 'png', 'webp'].includes(ext)) {
      console.log(`⚠️ Пропуск неподдерживаемого формата: ${filename}`);
      return;
    }
    
    // Читаем изображение
    const originalBuffer = await fs.readFile(imagePath);
    const originalSize = originalBuffer.length;
    
    // Создаем обработчик изображения
    const image = sharp(originalBuffer);
    const metadata = await image.metadata();
    
    // Оптимизируем оригинальный формат
    const originalOptions = config.compressionOptions[ext] || config.compressionOptions.jpg;
    await image
      .toFile(path.join(config.outputDir, filename));
    
    // Конвертируем в другие форматы
    let optimizedSize = 0;
    const conversions = [];
    
    for (const format of config.formats) {
      const formatOptions = config.compressionOptions[format];
      const formatFilename = filename.replace(/\.[^.]+$/, `.${format}`);
      
      // Для небольших изображений создаем просто оптимизированную версию
      if (metadata.width <= 960) {
        conversions.push(
          image
            .toFormat(format, formatOptions)
            .toFile(path.join(config.outputDir, format, formatFilename))
        );
      } else {
        // Для больших изображений создаем разные размеры
        for (const size of config.sizes) {
          // Пропускаем размеры больше оригинала
          if (size >= metadata.width) continue;
          
          const resizeFilename = formatFilename.replace(/\.[^.]+$/, `-${size}.${format}`);
          
          conversions.push(
            image
              .resize(size)
              .toFormat(format, formatOptions)
              .toFile(path.join(config.outputDir, format, resizeFilename))
          );
        }
      }
    }
    
    // Ждем завершения всех конвертаций
    const results = await Promise.all(conversions);
    
    // Вычисляем размер всех оптимизированных версий
    optimizedSize = results.reduce((sum, result) => sum + result.size, 0);
    
    // Возвращаем статистику
    return {
      filename,
      originalSize,
      optimizedSize,
      savings: originalSize - optimizedSize,
      savingsPercent: ((originalSize - optimizedSize) / originalSize * 100).toFixed(2),
    };
  } catch (error) {
    console.error(`❌ Ошибка при обработке ${filename}:`, error);
    return {
      filename,
      error: error.message,
    };
  }
}

/**
 * Запускает оптимизацию всех изображений
 */
async function optimizeImages() {
  try {
    console.log('🚀 Начинаем оптимизацию изображений...');
    
    // Создаем необходимые директории
    await createDirectories();
    
    // Получаем список всех файлов
    const files = await fs.readdir(config.inputDir);
    
    // Фильтруем только изображения
    const imageFiles = files.filter(file => 
      /\.(jpe?g|png|webp)$/i.test(file)
    );
    
    console.log(`🖼️ Найдено ${imageFiles.length} изображений для оптимизации`);
    
    // Создаем пул обработчиков для параллельной обработки
    const numCPUs = cpus().length;
    const pool = createPool({ maxWorkers: numCPUs - 1 });
    
    // Запускаем параллельную обработку
    const tasks = imageFiles.map(file => {
      const imagePath = path.join(config.inputDir, file);
      return pool.exec(processImage, [imagePath]);
    });
    
    // Ждем завершения всех задач
    const results = await Promise.all(tasks);
    
    // Собираем статистику
    const successfulResults = results.filter(result => result && !result.error);
    const failedResults = results.filter(result => result && result.error);
    
    const totalOriginalSize = successfulResults.reduce((sum, result) => sum + result.originalSize, 0);
    const totalOptimizedSize = successfulResults.reduce((sum, result) => sum + result.optimizedSize, 0);
    const totalSavings = totalOriginalSize - totalOptimizedSize;
    const totalSavingsPercent = ((totalSavings / totalOriginalSize) * 100).toFixed(2);
    
    // Выводим статистику
    console.log('\n📊 Статистика оптимизации:');
    console.log(`✅ Успешно оптимизировано: ${successfulResults.length} изображений`);
    console.log(`❌ Не удалось оптимизировать: ${failedResults.length} изображений`);
    console.log(`📦 Общий размер до оптимизации: ${(totalOriginalSize / 1024 / 1024).toFixed(2)} МБ`);
    console.log(`📦 Общий размер после оптимизации: ${(totalOptimizedSize / 1024 / 1024).toFixed(2)} МБ`);
    console.log(`💰 Общая экономия: ${(totalSavings / 1024 / 1024).toFixed(2)} МБ (${totalSavingsPercent}%)`);
    
    // Закрываем пул
    await pool.terminate();
    
    console.log('\n🎉 Оптимизация изображений успешно завершена!');
    
    // Создаем файл с отчетом
    const report = {
      date: new Date().toISOString(),
      totalImages: imageFiles.length,
      successfulImages: successfulResults.length,
      failedImages: failedResults.length,
      totalOriginalSize,
      totalOptimizedSize,
      totalSavings,
      totalSavingsPercent,
      images: successfulResults,
      failed: failedResults,
    };
    
    await fs.writeFile(
      path.join(config.outputDir, 'optimization-report.json'),
      JSON.stringify(report, null, 2)
    );
    
    console.log('📝 Отчет об оптимизации сохранен в optimization-report.json');
  } catch (error) {
    console.error('❌ Ошибка при оптимизации изображений:', error);
    process.exit(1);
  }
}

// Запускаем оптимизацию
optimizeImages();