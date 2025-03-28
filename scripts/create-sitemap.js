// scripts/create-sitemap.js
import fs from 'fs';
import path from 'path';

/**
 * Создает sitemap.xml для улучшения SEO
 */
export async function createSitemap() {
  const baseUrl = 'https://migranova.pro'; // Замените на реальный URL сайта
  
  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>${baseUrl}/</loc>
    <lastmod>${new Date().toISOString()}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>1.0</priority>
  </url>
</urlset>`;
  
  fs.writeFileSync(path.resolve(__dirname, '../dist/sitemap.xml'), xml);
}