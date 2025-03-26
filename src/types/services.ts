// src/types/services.ts
import { Observable, ImageLoadStatus } from './index';

/**
 * Категории ошибок
 */
export enum ErrorCategory {
  NETWORK = 'network',
  IMAGE = 'image',
  UI = 'ui',
  STATE = 'state',
  UNKNOWN = 'unknown'
}

/**
 * Запись об ошибке
 */
export interface ErrorRecord {
  error: Error;
  context: Record<string, any>;
  timestamp: Date;
  category: ErrorCategory | string;
}

/**
 * Интерфейс для сервиса обработки ошибок
 */
export interface IErrorService {
  registerHandler(handler: (error: Error, context: Record<string, any>, category: string) => void): () => void;
  handleError(error: Error, context?: Record<string, any>): void;
  getErrorLogs(): ErrorRecord[];
  getErrorsByCategory(category: string): ErrorRecord[];
  clearErrorLogs(): void;
  categorizeError(error: Error, context?: Record<string, any>): string;
}

/**
 * Опции предзагрузки изображений
 */
export interface PreloadOptions {
  concurrency?: number;
  priority?: boolean;
}

/**
 * Метрики производительности загрузки изображений
 */
export interface ImageMetrics {
  loadedImages: number;
  loadErrors: number;
  totalLoadTime: number;
  cachedLoads: number;
  cacheMisses: number;
  averageLoadTime?: number;
  cacheHitRate?: number;
  cacheStats?: Record<string, any>;
  cacheSize?: number;
  cacheCapacity?: number;
}

/**
 * Интерфейс для сервиса изображений
 */
export interface IImageService {
  status$: {
    get(): ImageLoadStatus;
    set(value: ImageLoadStatus): void;
  };
  retryCount$: {
    get(): number;
    set(value: number | ((prev: number) => number)): void;
  };
  loadImage(src: string, priority?: boolean): Promise<HTMLImageElement>;
  preloadImages(sources: string[], options?: PreloadOptions): Promise<HTMLImageElement[]>;
  clearCache(preserveCritical?: boolean): void;
  getOptimalImageUrl(src: string): string;
  getMetrics(): ImageMetrics;
  resetMetrics(): void;
  resizeCache(newSize: number): void;
}

/**
 * Интерфейс для сервиса навигации
 */
export interface INavigationService {
  setTotalSlides(total: number): void;
  nextSlide(): void;
  prevSlide(): void;
  reset(): void;
  useCurrentSlide(): number;
  useTotalSlides(): number;
  useDirection(): 'left' | 'right' | 'none';
}