// src/services/image.service.js
/**
 * Сервис для управления загрузкой и кешированием изображений
 * @class
 */

import { observable } from "@legendapp/state";
import { from } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

export class ImageService {

  /**
   * Создает экземпляр сервиса
   * @constructor
   */
  constructor() {
    this.status$ = observable('init');
    this.retryCount$ = observable(0);
    this.imageCache = new Map();
    this.preloadQueue = new Set();
    this.loadingPromises = new Map();
  }

  /**
     * Загружает изображение с возможностью приоритизации
     * @param {string} src - URL изображения
     * @param {boolean} [priority=false] - Флаг приоритетной загрузки
     * @returns {Promise<HTMLImageElement>} Промис с загруженным изображением
     * @throws {Error} Ошибка при неудачной загрузке
     */
  loadImage(src, priority = false) {
    // Если изображение уже в кеше, возвращаем его
    if (this.imageCache.has(src)) {
      this.status$.set('loaded');
      return Promise.resolve(this.imageCache.get(src));
    }

    // Если изображение уже загружается, возвращаем существующий промис
    if (this.loadingPromises.has(src)) {
      return this.loadingPromises.get(src);
    }

    // Создаем новый промис для загрузки
    const loadPromise = new Promise((resolve, reject) => {
      this.status$.set('loading');

      const img = new Image();

      img.onload = () => {
        this.imageCache.set(src, img);
        this.status$.set('loaded');
        this.retryCount$.set(0);
        this.loadingPromises.delete(src);
        resolve(img);
      };

      img.onerror = () => {
        if (this.retryCount$.get() < 3) {
          setTimeout(() => {
            this.retryCount$.set(prev => prev + 1);
            this.status$.set('retrying');
            img.src = src;
          }, 1000 * this.retryCount$.get());
        } else {
          this.status$.set('error');
          this.loadingPromises.delete(src);
          reject(new Error('Failed to load image'));
        }
      };

      if (priority) {
        img.fetchPriority = 'high';
      }

      img.src = src;
    });

    this.loadingPromises.set(src, loadPromise);
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
      !this.imageCache.has(src) &&
      !this.preloadQueue.has(src)
    );

    // Добавляем новые источники в очередь
    newSources.forEach(src => this.preloadQueue.add(src));

    return from(newSources).pipe(
      mergeMap(src => from(this.loadImage(src, priority)), concurrency)
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
      const criticalImages = Array.from(this.imageCache.keys())
        .filter(key => key.includes('slide0') || key.includes('cover'));

      this.imageCache.clear();

      // Восстанавливаем критические изображения
      criticalImages.forEach(key => {
        if (this.imageCache.has(key)) {
          const img = this.imageCache.get(key);
          this.imageCache.set(key, img);
        }
      });
    }

    this.status$.set('init');
    this.retryCount$.set(0);
  }
}

export const imageService = new ImageService();