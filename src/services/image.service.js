// src/services/image.service.js
/**
 * Сервис для управления загрузкой и кешированием изображений
 * @class
 */

import { observable } from "@legendapp/state";
import { from } from 'rxjs';
import { mergeMap } from 'rxjs/operators';
import { LRUCache } from '@/utils/LRUCache';
import { errorService } from '@/services/error.service';

export class ImageService {
  /**
   * Создает экземпляр сервиса
   * @constructor
   * @param {number} cacheSize - Размер LRU-кеша для изображений
   */
  constructor(cacheSize = 50) {
    this.status$ = observable('init');
    this.retryCount$ = observable(0);
    
    // Заменяем Map на LRUCache для оптимального кеширования
    this.imageCache = new LRUCache(cacheSize, (key, value) => {
      console.log(`Image evicted from cache: ${key}`);
    });
    
    this.preloadQueue = new Set();
    this.loadingPromises = new Map();
    
    // Флаги поддержки форматов изображений
    this.webpSupported = false;
    this.avifSupported = false;
    
    // Проверка поддержки форматов
    this.checkModernFormatsSupport();
    
    // Метрики производительности
    this.metrics = {
      loadedImages: 0,
      loadErrors: 0,
      totalLoadTime: 0,
      cachedLoads: 0,
      cacheMisses: 0
    };
  }

  /**
   * Проверяет поддержку современных форматов изображений
   * @private
   */
  checkModernFormatsSupport() {
    if (typeof window === 'undefined') return;
    
    // Проверка поддержки WebP
    const webpTest = new Image();
    webpTest.onload = () => {
      this.webpSupported = true;
      console.log('WebP support detected');
    };
    webpTest.onerror = () => {
      this.webpSupported = false;
      console.log('WebP not supported');
    };
    webpTest.src = 'data:image/webp;base64,UklGRiQAAABXRUJQVlA4IBgAAAAwAQCdASoBAAEAAwA0JaQAA3AA/vz0AAA=';

    // Проверка поддержки AVIF
    const avifTest = new Image();
    avifTest.onload = () => {
      this.avifSupported = true;
      console.log('AVIF support detected');
    };
    avifTest.onerror = () => {
      this.avifSupported = false;
      console.log('AVIF not supported');
    };
    avifTest.src = 'data:image/avif;base64,AAAAIGZ0eXBhdmlmAAAAAGF2aWZtaWYxbWlhZk1BMUIAAADybWV0YQAAAAAAAAAoaGRscgAAAAAAAAAAcGljdAAAAAAAAAAAAAAAAGxpYmF2aWYAAAAADnBpdG0AAAAAAAEAAAAeaWxvYwAAAABEAAABAAEAAAABAAABGgAAAB0AAAAoaWluZgAAAAAAAQAAABppbmZlAgAAAAABAABhdjAxQ29sb3IAAAAAamlwcnAAAABLaXBjbwAAABRpc3BlAAAAAAAAAAIAAAACAAAAEHBpeGkAAAAAAwgICAAAAAxhdjFDgQ0MAAAAABNjb2xybmNseAACAAIAAYAAAAAXaXBtYQAAAAAAAAABAAEEAQKDBAAAACVtZGF0EgAKCBgANogQEAwgMg8f8D///8WfhwB8+ErK42A=';
  }

  /**
   * Возвращает оптимальный URL изображения с учетом поддержки форматов
   * @param {string} src - Исходный URL изображения
   * @returns {string} Оптимизированный URL
   */
  getOptimalImageUrl(src) {
    // Проверяем, является ли src URL или Base64
    if (!src || src.startsWith('data:')) {
      return src;
    }

    const extension = src.split('.').pop()?.toLowerCase();
    
    if (this.avifSupported && (extension === 'jpg' || extension === 'jpeg' || extension === 'png')) {
      const avifUrl = src.replace(/\.(jpg|jpeg|png)$/i, '.avif');
      // Проверяем, есть ли у нас уже AVIF версия в кеше
      if (this.imageCache.has(avifUrl)) {
        return avifUrl;
      }
      // Иначе пробуем WebP, либо оригинал
    }
    
    if (this.webpSupported && (extension === 'jpg' || extension === 'jpeg' || extension === 'png')) {
      const webpUrl = src.replace(/\.(jpg|jpeg|png)$/i, '.webp');
      // Проверяем, есть ли у нас уже WebP версия в кеше
      if (this.imageCache.has(webpUrl)) {
        return webpUrl;
      }
      // Иначе возвращаем оригинальный URL
    }
    
    return src;
  }

  /**
   * Загружает изображение с возможностью приоритизации
   * @param {string} src - URL изображения
   * @param {boolean} [priority=false] - Флаг приоритетной загрузки
   * @returns {Promise<HTMLImageElement>} Промис с загруженным изображением
   * @throws {Error} Ошибка при неудачной загрузке
   */
  loadImage(src, priority = false) {
    if (!src) {
      return Promise.reject(new Error('Image source is required'));
    }
    
    const startTime = performance.now();
    const optimizedSrc = this.getOptimalImageUrl(src);
    
    // Если изображение уже в кеше, возвращаем его
    if (this.imageCache.has(optimizedSrc)) {
      this.metrics.cachedLoads++;
      this.status$.set('loaded');
      return Promise.resolve(this.imageCache.get(optimizedSrc));
    }
    
    this.metrics.cacheMisses++;

    // Если изображение уже загружается, возвращаем существующий промис
    if (this.loadingPromises.has(optimizedSrc)) {
      return this.loadingPromises.get(optimizedSrc);
    }

    // Создаем новый промис для загрузки
    const loadPromise = new Promise((resolve, reject) => {
      this.status$.set('loading');

      const img = new Image();

      img.onload = () => {
        // Вычисляем время загрузки
        const loadTime = performance.now() - startTime;
        
        // Обновляем метрики
        this.metrics.loadedImages++;
        this.metrics.totalLoadTime += loadTime;
        
        // Сохраняем в кеш и обновляем статус
        this.imageCache.set(optimizedSrc, img);
        this.status$.set('loaded');
        this.retryCount$.set(0);
        this.loadingPromises.delete(optimizedSrc);
        
        resolve(img);
      };

      img.onerror = () => {
        if (this.retryCount$.get() < 3) {
          setTimeout(() => {
            this.retryCount$.set(prev => prev + 1);
            this.status$.set('retrying');
            img.src = optimizedSrc;
          }, 1000 * this.retryCount$.get());
        } else {
          this.metrics.loadErrors++;
          this.status$.set('error');
          this.loadingPromises.delete(optimizedSrc);
          
          const error = new Error(`Failed to load image: ${optimizedSrc}`);
          
          // Используем errorService для обработки ошибки
          errorService.handleError(error, {
            source: 'imageService',
            operation: 'loadImage',
            src: optimizedSrc,
            retryCount: this.retryCount$.get()
          });
          
          reject(error);
        }
      };

      if (priority) {
        if ('fetchPriority' in img) {
          img.fetchPriority = 'high';
        } else {
          // Для браузеров без поддержки fetchPriority
          img.loading = 'eager';
        }
      }

      img.src = optimizedSrc;
    });

    this.loadingPromises.set(optimizedSrc, loadPromise);
    return loadPromise;
  }

  /**
   * Предзагружает набор изображений с поддержкой параллельной загрузки
   * @param {string[]} sources - Массив URL изображений
   * @param {Object} [options] - Опции загрузки
   * @param {number} [options.concurrency=3] - Количество параллельных загрузок
   * @param {boolean} [options.priority=false] - Приоритет загрузки
   * @returns {Promise<HTMLImageElement[]>} Промис с массивом загруженных изображений
   */
  preloadImages(sources, { concurrency = 3, priority = false } = {}) {
    if (!sources?.length) return Promise.resolve([]);

    // Фильтруем уже загруженные или загружающиеся изображения
    const newSources = sources.filter(src =>
      !this.imageCache.has(this.getOptimalImageUrl(src)) &&
      !this.preloadQueue.has(src)
    );

    // Добавляем новые источники в очередь
    newSources.forEach(src => this.preloadQueue.add(src));

    return from(newSources).pipe(
      mergeMap(src => {
        return from(this.loadImage(src, priority)
          .catch(error => {
            console.warn(`Failed to preload image: ${src}`, error);
            return null; // Возвращаем null вместо ошибки, чтобы продолжить загрузку других изображений
          }));
      }, concurrency)
    ).toPromise()
      .finally(() => {
        // Очищаем очередь после загрузки
        newSources.forEach(src => this.preloadQueue.delete(src));
      });
  }

  /**
   * Очищает кеш изображений
   * @param {boolean} [preserveCritical=true] - Сохранять ли критические изображения
   */
  clearCache(preserveCritical = true) {
    if (!preserveCritical) {
      this.imageCache.clear();
    } else {
      // Находим критические изображения (первые в каждом проекте)
      const allKeys = this.imageCache.keys();
      const criticalKeys = allKeys.filter(key => 
        key.includes('slide0') || 
        key.includes('cover') || 
        key.includes('header') ||
        key.includes('logo')
      );

      // Временно сохраняем критические изображения
      const criticalImages = new Map();
      criticalKeys.forEach(key => {
        criticalImages.set(key, this.imageCache.get(key));
      });

      // Очищаем кеш
      this.imageCache.clear();

      // Восстанавливаем критические изображения
      criticalImages.forEach((img, key) => {
        this.imageCache.set(key, img);
      });
    }

    this.status$.set('init');
    this.retryCount$.set(0);
  }

  /**
   * Получает метрики загрузки изображений
   * @returns {Object} Объект с метриками
   */
  getMetrics() {
    return {
      ...this.metrics,
      averageLoadTime: this.metrics.loadedImages > 0 
        ? this.metrics.totalLoadTime / this.metrics.loadedImages 
        : 0,
      cacheHitRate: (this.metrics.cachedLoads + this.metrics.cacheMisses) > 0
        ? this.metrics.cachedLoads / (this.metrics.cachedLoads + this.metrics.cacheMisses)
        : 0,
      cacheStats: this.imageCache.getStats(),
      cacheSize: this.imageCache.size,
      cacheCapacity: this.imageCache.capacity
    };
  }

  /**
   * Сбрасывает метрики производительности
   */
  resetMetrics() {
    this.metrics = {
      loadedImages: 0,
      loadErrors: 0,
      totalLoadTime: 0,
      cachedLoads: 0,
      cacheMisses: 0
    };
    this.imageCache.resetStats();
  }

  /**
   * Изменяет размер кеша
   * @param {number} newSize - Новый размер кеша
   */
  resizeCache(newSize) {
    this.imageCache.resize(newSize);
  }
}

export const imageService = new ImageService();