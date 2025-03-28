// scripts/compress-assets.js
import fs from 'fs';
import path from 'path';
import { gzipSync, brotliCompressSync, constants } from 'node:zlib';

/**
 * Сжимает статические ресурсы для повышения производительности
 */
export async function compressAssets() {
  const distDir = path.resolve(__dirname, '../dist');

  // Находим все JS и CSS файлы
  const files = [];

  function scanDir(dir) {
    const entries = fs.readdirSync(dir, { withFileTypes: true });

    for (const entry of entries) {
      const fullPath = path.join(dir, entry.name);

      if (entry.isDirectory()) {
        scanDir(fullPath);
      } else if (/\.(js|css)$/.test(entry.name)) {
        files.push(fullPath);
      }
    }
  }

  scanDir(distDir);
  console.log(`🔍 Найдено ${files.length} файлов для сжатия`);

  // Сжимаем каждый файл
  for (const file of files) {
    const content = fs.readFileSync(file);

    // Создаем gzip-версию
    const gzipped = gzipSync(content, { level: 9 });
    fs.writeFileSync(`${file}.gz`, gzipped);

    // Создаем brotli-версию (для современных браузеров)
    const brotli = brotliCompressSync(content, {
      params: {
        [constants.BROTLI_PARAM_QUALITY]: 11,
      },
    });
    fs.writeFileSync(`${file}.br`, brotli);

    const originalSize = content.length;
    const gzipSize = gzipped.length;
    const brotliSize = brotli.length;

    console.log(`📦 ${path.basename(file)}: ${originalSize} → ${gzipSize} (gzip), ${brotliSize} (brotli)`);
  }
}