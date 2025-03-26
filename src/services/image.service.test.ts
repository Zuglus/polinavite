// src/services/image.service.test.ts
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { ImageService } from './image.service';
import { errorService } from './error.service';

// Мок для errorService
vi.mock('./error.service', () => ({
  errorService: {
    handleError: vi.fn()
  }
}));

describe('ImageService', () => {
  let imageService: ImageService;
  let originalImage: typeof global.Image;
  let mockImage: any;
  
  beforeEach(() => {
    // Сбрасываем моки
    vi.clearAllMocks();
    
    // Сохраняем оригинальный Image конструктор
    originalImage = global.Image;
    
    // Создаем мок для Image
    mockImage = {
      onload: null,
      onerror: null,
      src: ''
    };
    
    global.Image = vi.fn(() => mockImage) as any;
    
    // Инициализируем сервис с новым экземпляром
    imageService = new ImageService(10);
  });
  
  afterEach(() => {
    // Восстанавливаем оригинальный Image
    global.Image = originalImage;
  });
  
  it('should initialize with default values', () => {
    expect(imageService.status$.get()).toBe('init');
    expect(imageService.retryCount$.get()).toBe(0);
  });
  
  it('should check for WebP and AVIF support on creation', () => {
    // Проверяем, что были созданы тестовые изображения
    expect(global.Image).toHaveBeenCalledTimes(2);
  });

  it('should mark image as loaded and update status when load is successful', async () => {
    // Устанавливаем Promise, чтобы мы могли дождаться загрузки
    const loadPromise = imageService.loadImage('test.jpg');
    
    // Имитируем успешную загрузку
    mockImage.onload();
    
    // Ждем завершения загрузки
    await loadPromise;
    
    // Проверяем статус
    expect(imageService.status$.get()).toBe('loaded');
    expect(imageService.retryCount$.get()).toBe(0);
  });
  
  it('should retry loading when image load fails', async () => {
    // Переопределяем setTimeout для тестов
    const originalSetTimeout = global.setTimeout;
    const mockSetTimeout = vi.fn((callback) => {
      callback();
      return 1 as unknown as NodeJS.Timeout;
    });
    global.setTimeout = mockSetTimeout as any;
    
    // Создаем Promise, который, как предполагается, должен быть отклонен
    const loadPromise = imageService.loadImage('failing-image.jpg');
    
    // Имитируем несколько ошибок загрузки
    mockImage.onerror(new Error('Failed to load'));
    
    // Должен быть одна попытка
    expect(imageService.retryCount$.get()).toBe(1);
    expect(imageService.status$.get()).toBe('retrying');
    
    // Имитируем вторую ошибку
    mockImage.onerror(new Error('Failed to load'));
    
    // Должно быть две попытки
    expect(imageService.retryCount$.get()).toBe(2);
    
    // Имитируем третью ошибку
    try {
      mockImage.onerror(new Error('Failed to load'));
      await loadPromise;
    } catch (error) {
      // Должно быть три попытки и статус ошибки
      expect(imageService.retryCount$.get()).toBe(3);
      expect(imageService.status$.get()).toBe('error');
      
      // Должен быть вызов errorService
      expect(errorService.handleError).toHaveBeenCalled();
    }
    
    // Восстанавливаем setTimeout
    global.setTimeout = originalSetTimeout;
  });
  
  it('should cache loaded images', async () => {
    // Первая загрузка
    const firstLoadPromise = imageService.loadImage('test.jpg');
    
    // Имитируем успешную загрузку
    mockImage.onload();
    
    // Ждем завершения загрузки
    await firstLoadPromise;
    
    // Сбрасываем счетчик создания изображений
    vi.mocked(global.Image).mockClear();
    
    // Вторая загрузка того же изображения
    const secondLoadPromise = imageService.loadImage('test.jpg');
    
    // Ждем завершения загрузки
    await secondLoadPromise;
    
    // Image конструктор не должен быть вызван снова
    expect(global.Image).not.toHaveBeenCalled();
  });
  
  it('should preload multiple images concurrently', async () => {
    // Мокаем rxjs
    vi.mock('rxjs', () => ({
      from: (array: any[]) => ({
        pipe: () => ({
          subscribe: (callbacks: any) => {
            // Вызываем complete для завершения операции
            if (callbacks.complete) {
              callbacks.complete();
            }
            return { unsubscribe: vi.fn() };
          }
        })
      })
    }));
    
    // Создаем шпион для loadImage
    const loadImageSpy = vi.spyOn(imageService, 'loadImage').mockResolvedValue({} as HTMLImageElement);
    
    // Вызываем preloadImages
    await imageService.preloadImages(['image1.jpg', 'image2.jpg', 'image3.jpg'], { concurrency: 2 });
    
    // Восстанавливаем мок
    vi.restoreAllMocks();
  });
  
  it('should clear cache', () => {
    // Создаем шпион для метода clear в кеше
    const cacheClearSpy = vi.spyOn(imageService['imageCache'], 'clear');
    
    // Вызываем clearCache
    imageService.clearCache(false);
    
    // Проверяем, что clear был вызван
    expect(cacheClearSpy).toHaveBeenCalledTimes(1);
    
    // Проверяем, что статус был сброшен
    expect(imageService.status$.get()).toBe('init');
    expect(imageService.retryCount$.get()).toBe(0);
  });
  
  it('should return metrics', () => {
    // Вызываем getMetrics
    const metrics = imageService.getMetrics();
    
    // Проверяем, что возвращаются правильные поля
    expect(metrics).toHaveProperty('loadedImages');
    expect(metrics).toHaveProperty('loadErrors');
    expect(metrics).toHaveProperty('totalLoadTime');
    expect(metrics).toHaveProperty('cacheSize');
    expect(metrics).toHaveProperty('cacheCapacity');
  });
  
  it('should reset metrics', () => {
    // Устанавливаем некоторые метрики
    imageService['metrics'].loadedImages = 5;
    imageService['metrics'].loadErrors = 2;
    
    // Создаем шпион для resetStats
    const resetStatsSpy = vi.spyOn(imageService['imageCache'], 'resetStats');
    
    // Вызываем resetMetrics
    imageService.resetMetrics();
    
    // Проверяем, что метрики были сброшены
    expect(imageService['metrics'].loadedImages).toBe(0);
    expect(imageService['metrics'].loadErrors).toBe(0);
    expect(resetStatsSpy).toHaveBeenCalled();
  });
  
  it('should resize cache', () => {
    // Создаем шпион для resize
    const resizeSpy = vi.spyOn(imageService['imageCache'], 'resize');
    
    // Вызываем resizeCache
    imageService.resizeCache(20);
    
    // Проверяем, что resize был вызван с правильным аргументом
    expect(resizeSpy).toHaveBeenCalledWith(20);
  });
  
  it('should return optimized URL based on browser support', () => {
    // Тестируем когда WebP поддерживается
    imageService['webpSupported'] = true;
    imageService['avifSupported'] = false;
    
    // Проверяем оптимизацию для JPEG
    expect(imageService.getOptimalImageUrl('test.jpg')).toBe('test.jpg');
    
    // Для Base64 не должно быть оптимизации
    const base64 = 'data:image/png;base64,iVBORw0KG';
    expect(imageService.getOptimalImageUrl(base64)).toBe(base64);
    
    // Тестируем когда AVIF поддерживается
    imageService['webpSupported'] = false;
    imageService['avifSupported'] = true;
    
    // И AVIF и WebP не должны применяться, так как нет кешированных версий
    expect(imageService.getOptimalImageUrl('test.jpg')).toBe('test.jpg');
  });
});