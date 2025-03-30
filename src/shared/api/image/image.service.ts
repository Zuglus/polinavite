// src/shared/api/image/image.service.ts
/**
 * Сервис для управления загрузкой и кешированием изображений
 * @class
 */

import { observable } from "@legendapp/state";
import { from } from "rxjs";
import { mergeMap } from "rxjs/operators";
import { LRUCache } from "@shared/lib/cache";
import { errorService } from "@shared/api/error/error.service";
import { ImageLoadStatus, ImageMetrics, PreloadOptions } from "@shared/model/service-types";

export class ImageService {
  status$: {
    get(): ImageLoadStatus;
    set(value: ImageLoadStatus): void;
  };
  retryCount$: {
    get(): number;
    set(value: number | ((prev: number) => number)): void;
  };
  private imageCache: LRUCache<string, HTMLImageElement>;
  private preloadQueue: Set<string>;
  private loadingPromises: Map<string, Promise<HTMLImageElement>>;
  private webpSupported: boolean = false;
  private avifSupported: boolean = false;
  private metrics: {
    loadedImages: number;
    loadErrors: number;
    totalLoadTime: number;
    cachedLoads: number;
    cacheMisses: number;
  };

  /**
   * Создает экземпляр сервиса
   * @constructor
   * @param {number} cacheSize - Размер LRU-кеша для изображений
   */
  constructor(cacheSize: number = 50) {
    this.status$ = observable<ImageLoadStatus>('init');
    this.retryCount$ = observable<number>(0);
    
    // Заменяем Map на LRUCache для оптимального кеширования
    this.imageCache = new LRUCache<string, HTMLImageElement>(cacheSize, (key, value) => {
      console.log(`Image evicted from cache: ${key}`);
    });
    
    this.preloadQueue = new Set<string>();
    this.loadingPromises = new Map<string, Promise<HTMLImageElement>>();
    
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
  private checkModernFormatsSupport(): void {
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
  getOptimalImageUrl(src: string): string {
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
  loadImage(src: string, priority: boolean = false): Promise<HTMLImageElement> {
    if (!src) {
      return Promise.reject(new Error('Image source is required'));
    }
    
    const startTime = performance.now();
    const optimizedSrc = this.getOptimalImageUrl(src);
    
    // Если изображение уже в кеше, возвращаем его
    if (this.imageCache.has(optimizedSrc)) {
      this.metrics.cachedLoads++;
      this.status$.set('loaded');
      return Promise.resolve(this.imageCache.get(optimizedSrc)!);
    }
    
    this.metrics.cacheMisses++;

    // Если изображение уже загружается, возвращаем существующий промис
    if (this.loadingPromises.has(optimizedSrc)) {
      return this.loadingPromises.get(optimizedSrc)!;
    }

    // Создаем новый промис для загрузки
    const loadPromise = new Promise<HTMLImageElement>((resolve, reject) => {
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
          (img as any).fetchPriority = 'high';
        } else {
          // Для браузеров без поддержки fetchPriority
          (img as any).loading = 'eager';
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
  preloadImages(sources: string[], { concurrency = 3, priority = false }: PreloadOptions = {}): Promise<HTMLImageElement[]> {
    if (!sources?.length) return Promise.resolve([]);

    // Фильтруем уже загруженные или загружающиеся изображения
    const newSources = sources.filter(src =>
      !this.imageCache.has(this.getOptimalImageUrl(src)) &&
      !this.preloadQueue.has(src)
    );

    // Добавляем новые источники в очередь
    newSources.forEach(src => this.preloadQueue.add(src));

    return new Promise<HTMLImageElement[]>((resolve) => {
      from(newSources).pipe(
        mergeMap(src => {
          return from(this.loadImage(src, priority)
            .catch(error => {
              console.warn(`Failed to preload image: ${src}`, error);
              return null; // Возвращаем null вместо ошибки, чтобы продолжить загрузку других изображений
            }));
        }, concurrency)
      ).subscribe({
        complete: () => {
          // Очищаем очередь после загрузки
          newSources.forEach(src => this.preloadQueue.delete(src));
          resolve([]);
        }
      });
    });
  }

  /**
   * Очищает кеш изображений
   * @param {boolean} [preserveCritical=true] - Сохранять ли критические изображения
   */
  clearCache(preserveCritical: boolean = true): void {
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
      const criticalImages = new Map<string, HTMLImageElement>();
      criticalKeys.forEach(key => {
        const image = this.imageCache.get(key);
        if (image) {
          criticalImages.set(key, image);
        }
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
   * @returns {ImageMetrics} Объект с метриками
   */
  getMetrics(): ImageMetrics {
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
  resetMetrics(): void {
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
  resizeCache(newSize: number): void {
    this.imageCache.resize(newSize);
  }
}

export const imageService = new ImageService();