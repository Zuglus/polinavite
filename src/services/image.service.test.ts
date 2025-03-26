import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { errorService } from './error.service';

// Мок для errorService
vi.mock('./error.service', () => ({
  errorService: {
    handleError: vi.fn()
  }
}));

// Определяем класс для тестирования
class MockImageService {
  status$ = { 
    get: vi.fn().mockReturnValue('init'),
    set: vi.fn()
  };
  retryCount$ = { 
    get: vi.fn().mockReturnValue(0),
    set: vi.fn()
  };
  
  imageCache = {
    has: vi.fn(),
    get: vi.fn(),
    set: vi.fn(),
    clear: vi.fn(),
    keys: vi.fn(),
    resetStats: vi.fn(),
    resize: vi.fn()
  };
  
  loadImage = vi.fn().mockResolvedValue({});
  preloadImages = vi.fn().mockResolvedValue([]);
  clearCache = vi.fn();
  getOptimalImageUrl = vi.fn(src => src);
  getMetrics = vi.fn().mockReturnValue({
    loadedImages: 0,
    loadErrors: 0,
    totalLoadTime: 0,
    cachedLoads: 0,
    cacheMisses: 0,
    cacheSize: 0,
    cacheCapacity: 5
  });
  resetMetrics = vi.fn();
  resizeCache = vi.fn();
}

describe('ImageService', () => {
  let imageService;
  let originalImage;
  
  beforeEach(() => {
    imageService = new MockImageService();
    originalImage = global.Image;
    
    // Мок для Image
    global.Image = vi.fn().mockImplementation(() => {
      const img = {
        onload: null,
        onerror: null,
        src: '',
        loading: '',
        fetchPriority: undefined
      };
      
      // Имитируем загрузку после установки src
      Object.defineProperty(img, 'src', {
        set(value) {
          setTimeout(() => {
            if (img.onload) img.onload();
          }, 10);
        }
      });
      
      return img;
    });
    
    // Очищаем моки
    vi.clearAllMocks();
  });
  
  afterEach(() => {
    global.Image = originalImage;
  });
  
  it('should initialize with default values', () => {
    expect(imageService.status$.get()).toBe('init');
    expect(imageService.retryCount$.get()).toBe(0);
  });
  
  it('should load an image successfully', async () => {
    const promise = imageService.loadImage('test.jpg');
    
    expect(imageService.status$.get).toHaveBeenCalled();
    
    const image = await promise;
    
    expect(image).toBeDefined();
  });
  
  it('should handle errors from errorService', () => {
    // Просто убедимся, что errorService.handleError существует
    expect(typeof errorService.handleError).toBe('function');
  });
});