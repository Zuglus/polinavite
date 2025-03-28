// src/shared/lib/resource-loader/resource-loader.ts
import { errorService } from '@shared/api/error/error.service';

// Типы ресурсов
export enum ResourceType {
  IMAGE = 'image',
  SCRIPT = 'script',
  STYLE = 'style',
  FONT = 'font',
  FETCH = 'fetch'
}

// Приоритеты загрузки
export enum LoadPriority {
  CRITICAL = 'critical',  // Блокирующий ресурс, нужен для первого рендера
  HIGH = 'high',          // Важный ресурс, нужен скоро
  MEDIUM = 'medium',      // Ресурс для улучшения UX
  LOW = 'low',            // Ленивая загрузка, не критичен
  IDLE = 'idle'           // Загрузка в фоне когда браузер свободен
}

// Настройки для конкретного ресурса
export interface ResourceOptions {
  // Базовые опции
  type: ResourceType;
  priority: LoadPriority;
  url: string;
  
  // Опции для конкретных типов
  as?: 'font' | 'image' | 'script' | 'style' | 'fetch';
  crossOrigin?: 'anonymous' | 'use-credentials';
  nonce?: string;
  integrity?: string;
  
  // Коллбэки
  onLoad?: () => void;
  onError?: (error: any) => void;
  
  // Управление кешированием
  cacheKey?: string;
  cacheable?: boolean;
}

// Интерфейс для результата загрузки
export interface LoadResult<T = any> {
  success: boolean;
  resource?: T;
  error?: Error;
  fromCache?: boolean;
}

/**
 * Класс для оптимизированной загрузки ресурсов
 */
class ResourceLoader {
  // Кеш для загруженных ресурсов
  private resourceCache: Map<string, any> = new Map();
  
  // Очереди для разных приоритетов
  private queues: Map<LoadPriority, ResourceOptions[]> = new Map([
    [LoadPriority.CRITICAL, []],
    [LoadPriority.HIGH, []],
    [LoadPriority.MEDIUM, []],
    [LoadPriority.LOW, []],
    [LoadPriority.IDLE, []]
  ]);
  
  // Флаг, показывающий активна ли обработка очереди
  private isProcessing: boolean = false;
  
  // Настройки для одновременной загрузки ресурсов по приоритетам
  private concurrencyLimits: Map<LoadPriority, number> = new Map([
    [LoadPriority.CRITICAL, 4],
    [LoadPriority.HIGH, 3],
    [LoadPriority.MEDIUM, 2],
    [LoadPriority.LOW, 1],
    [LoadPriority.IDLE, 1]
  ]);
  
  // Счетчики активных загрузок по приоритетам
  private activeLoads: Map<LoadPriority, number> = new Map([
    [LoadPriority.CRITICAL, 0],
    [LoadPriority.HIGH, 0],
    [LoadPriority.LOW, 0],
    [LoadPriority.MEDIUM, 0],
    [LoadPriority.IDLE, 0]
  ]);

  /**
   * Загружает ресурс с учетом приоритета
   */
  async load<T = any>(options: ResourceOptions): Promise<LoadResult<T>> {
    const { url, type, priority, cacheable = true, cacheKey = url } = options;
    
    // Проверяем кеш, если ресурс кешируемый
    if (cacheable && this.resourceCache.has(cacheKey)) {
      return {
        success: true,
        resource: this.resourceCache.get(cacheKey) as T,
        fromCache: true
      };
    }
    
    // Если это критический ресурс - загружаем сразу
    if (priority === LoadPriority.CRITICAL) {
      return this.loadResource<T>(options);
    }
    
    // Добавляем в очередь с соответствующим приоритетом
    this.queues.get(priority)?.push(options);
    
    // Запускаем процесс обработки очереди, если он не активен
    if (!this.isProcessing) {
      this.processQueues();
    }
    
    // Возвращаем промис, который будет разрешен когда ресурс загрузится
    return new Promise((resolve) => {
      // Переопределяем колбэки
      const originalOnLoad = options.onLoad;
      const originalOnError = options.onError;
      
      options.onLoad = () => {
        originalOnLoad?.();
        const result = {
          success: true,
          resource: this.resourceCache.get(cacheKey) as T,
          fromCache: false
        };
        resolve(result);
      };
      
      options.onError = (error) => {
        originalOnError?.(error);
        const result = {
          success: false,
          error: error instanceof Error ? error : new Error(String(error))
        };
        resolve(result);
      };
    });
  }
  
  /**
   * Предзагружает ресурсы для будущего использования
   */
  preload(options: ResourceOptions | ResourceOptions[]): void {
    const optionsList = Array.isArray(options) ? options : [options];
    
    for (const opt of optionsList) {
      // Для предзагрузки используем низкий приоритет
      const priority = opt.priority || LoadPriority.LOW;
      
      // Добавляем в очередь загрузки
      this.queues.get(priority)?.push({
        ...opt,
        priority
      });
    }
    
    // Запускаем обработку очереди, если она еще не запущена
    if (!this.isProcessing) {
      this.processQueues();
    }
  }
  
  /**
   * Очистка кеша ресурсов
   */
  clearCache(filter?: (key: string) => boolean): void {
    if (!filter) {
      this.resourceCache.clear();
      return;
    }
    
    // Удаляем только те ресурсы, которые соответствуют фильтру
    for (const key of this.resourceCache.keys()) {
      if (filter(key)) {
        this.resourceCache.delete(key);
      }
    }
  }
  
  /**
   * Загружает конкретный ресурс
   */
  private async loadResource<T = any>(options: ResourceOptions): Promise<LoadResult<T>> {
    const { type, url, priority, onLoad, onError, cacheable = true, cacheKey = url } = options;
    
    try {
      // Увеличиваем счетчик активных загрузок
      this.incrementActiveLoad(priority);
      
      let resource: any;
      
      // Загружаем ресурс в зависимости от типа
      switch (type) {
        case ResourceType.IMAGE:
          resource = await this.loadImage(options);
          break;
          
        case ResourceType.SCRIPT:
          resource = await this.loadScript(options);
          break;
          
        case ResourceType.STYLE:
          resource = await this.loadStyle(options);
          break;
          
        case ResourceType.FONT:
          resource = await this.loadFont(options);
          break;
          
        case ResourceType.FETCH:
          resource = await this.loadFetch(options);
          break;
          
        default:
          throw new Error(`Unknown resource type: ${type}`);
      }
      
      // Кешируем ресурс, если он кешируемый
      if (cacheable && resource) {
        this.resourceCache.set(cacheKey, resource);
      }
      
      // Вызываем колбэк успешной загрузки
      onLoad?.();
      
      return {
        success: true,
        resource: resource as T,
        fromCache: false
      };
    } catch (error) {
      // Обрабатываем ошибку
      const finalError = error instanceof Error ? error : new Error(`Failed to load ${type} from ${url}`);
      
      // Логируем ошибку через errorService
      errorService.handleError(finalError, {
        source: 'ResourceLoader',
        operation: `load${type.charAt(0).toUpperCase() + type.slice(1)}`,
        url,
        priority
      });
      
      // Вызываем колбэк ошибки
      onError?.(finalError);
      
      return {
        success: false,
        error: finalError
      };
    } finally {
      // Уменьшаем счетчик активных загрузок
      this.decrementActiveLoad(priority);
    }
  }
  
  /**
   * Обработка очередей загрузки с учетом приоритетов
   */
  private async processQueues(): Promise<void> {
    this.isProcessing = true;
    
    // Обрабатываем очереди в порядке приоритета
    const priorities = [
      LoadPriority.CRITICAL,
      LoadPriority.HIGH,
      LoadPriority.MEDIUM,
      LoadPriority.LOW,
      LoadPriority.IDLE
    ];
    
    while (priorities.some(priority => (this.queues.get(priority)?.length || 0) > 0)) {
      // Ищем очередь с наивысшим приоритетом, которая не пуста
      for (const priority of priorities) {
        const queue = this.queues.get(priority) || [];
        const activeLoads = this.activeLoads.get(priority) || 0;
        const concurrencyLimit = this.concurrencyLimits.get(priority) || 1;
        
        // Пропускаем, если очередь пуста или достигнут лимит одновременных загрузок
        if (queue.length === 0 || activeLoads >= concurrencyLimit) {
          continue;
        }
        
        // Извлекаем опции из очереди
        const options = queue.shift()!;
        
        // Загружаем ресурс, не ожидая завершения для параллельной загрузки
        this.loadResource(options).catch(error => {
          console.error('Error loading resource in queue:', error);
        });
        
        // Небольшая пауза для снижения нагрузки
        if (priority !== LoadPriority.CRITICAL) {
          await new Promise(resolve => setTimeout(resolve, 50));
        }
        
        // Прерываем цикл по приоритетам и начинаем заново
        break;
      }
      
      // Если все очереди пусты, завершаем обработку
      if (priorities.every(priority => (this.queues.get(priority)?.length || 0) === 0)) {
        break;
      }
      
      // Небольшая пауза для снижения нагрузки
      await new Promise(resolve => setTimeout(resolve, 10));
    }
    
    this.isProcessing = false;
  }
  
  /**
   * Увеличивает счетчик активных загрузок
   */
  private incrementActiveLoad(priority: LoadPriority): void {
    const current = this.activeLoads.get(priority) || 0;
    this.activeLoads.set(priority, current + 1);
  }
  
  /**
   * Уменьшает счетчик активных загрузок
   */
  private decrementActiveLoad(priority: LoadPriority): void {
    const current = this.activeLoads.get(priority) || 0;
    this.activeLoads.set(priority, Math.max(0, current - 1));
  }
  
  /**
   * Загружает изображение
   */
  private loadImage(options: ResourceOptions): Promise<HTMLImageElement> {
    return new Promise((resolve, reject) => {
      const { url, crossOrigin } = options;
      
      const img = new Image();
      
      img.onload = () => resolve(img);
      img.onerror = (error) => reject(error || new Error(`Failed to load image: ${url}`));
      
      if (crossOrigin) {
        img.crossOrigin = crossOrigin;
      }
      
      img.src = url;
    });
  }
  
  /**
   * Загружает скрипт
   */
  private loadScript(options: ResourceOptions): Promise<HTMLScriptElement> {
    return new Promise((resolve, reject) => {
      const { url, crossOrigin, integrity, nonce } = options;
      
      const script = document.createElement('script');
      
      script.onload = () => resolve(script);
      script.onerror = (error) => reject(error || new Error(`Failed to load script: ${url}`));
      
      if (crossOrigin) {
        script.crossOrigin = crossOrigin;
      }
      
      if (integrity) {
        script.integrity = integrity;
      }
      
      if (nonce) {
        script.nonce = nonce;
      }
      
      script.src = url;
      document.head.appendChild(script);
    });
  }
  
  /**
   * Загружает стиль (CSS)
   */
  private loadStyle(options: ResourceOptions): Promise<HTMLLinkElement> {
    return new Promise((resolve, reject) => {
      const { url, crossOrigin, integrity, nonce } = options;
      
      const link = document.createElement('link');
      
      link.rel = 'stylesheet';
      link.onload = () => resolve(link);
      link.onerror = (error) => reject(error || new Error(`Failed to load style: ${url}`));
      
      if (crossOrigin) {
        link.crossOrigin = crossOrigin;
      }
      
      if (integrity) {
        link.integrity = integrity;
      }
      
      if (nonce) {
        link.nonce = nonce;
      }
      
      link.href = url;
      document.head.appendChild(link);
    });
  }
  
  /**
   * Загружает шрифт
   */
  private async loadFont(options: ResourceOptions): Promise<FontFace> {
    const { url } = options;
    
    // Извлекаем имя шрифта из URL
    const fontName = url.split('/').pop()?.split('.')[0] || 'CustomFont';
    
    try {
      // Создаем и загружаем шрифт
      const font = new FontFace(fontName, `url(${url})`);
      const loadedFont = await font.load();
      
      // Добавляем шрифт в document.fonts
      document.fonts.add(loadedFont);
      
      return loadedFont;
    } catch (error) {
      throw error || new Error(`Failed to load font: ${url}`);
    }
  }
  
  /**
   * Загружает данные через fetch
   */
  private async loadFetch(options: ResourceOptions): Promise<any> {
    const { url, crossOrigin } = options;
    
    const init: RequestInit = {};
    
    if (crossOrigin === 'anonymous') {
      init.mode = 'cors';
      init.credentials = 'omit';
    } else if (crossOrigin === 'use-credentials') {
      init.mode = 'cors';
      init.credentials = 'include';
    }
    
    try {
      const response = await fetch(url, init);
      
      if (!response.ok) {
        throw new Error(`HTTP error: ${response.status}`);
      }
      
      // Определяем тип контента по заголовку
      const contentType = response.headers.get('content-type') || '';
      
      if (contentType.includes('application/json')) {
        return await response.json();
      } else if (contentType.includes('text/')) {
        return await response.text();
      } else {
        return await response.blob();
      }
    } catch (error) {
      throw error || new Error(`Failed to fetch: ${url}`);
    }
  }
}

export const resourceLoader = new ResourceLoader();