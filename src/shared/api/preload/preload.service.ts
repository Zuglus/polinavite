// src/shared/api/preload/preload.service.ts
import { imageService } from '../image/image.service';
import { errorService } from '../error/error.service';

/**
 * Интерфейс для опций предзагрузки
 */
interface PreloadOptions {
  /** Приоритет загрузки */
  priority?: boolean;
  /** Включить загрузку шрифтов */
  fonts?: boolean;
  /** Включить загрузку изображений */
  images?: boolean;
  /** Включить загрузку данных */
  data?: boolean;
}

/**
 * Сервис для предварительной загрузки критических ресурсов
 */
class PreloadService {
  /**
   * Предзагружает шрифты
   */
  preloadFonts(): Promise<boolean> {
    return new Promise((resolve) => {
      try {
        const fontUrls = [
          '/assets/fonts/MV-SKIFER.otf',
          '/assets/fonts/Onest-Regular.ttf',
          '/assets/fonts/Onest-Medium.ttf',
          '/assets/fonts/Onest-Light.ttf',
        ];
        
        // Используем FontFace API для предзагрузки шрифтов
        const fontPromises = fontUrls.map(url => {
          // Извлекаем имя шрифта из URL
          const fontName = url.split('/').pop()?.split('.')[0] || 'Font';
          
          // Создаем экземпляр FontFace
          const font = new FontFace(fontName, `url(${url})`);
          
          // Загружаем шрифт и добавляем его в document.fonts
          return font.load().then(loadedFont => {
            document.fonts.add(loadedFont);
            return loadedFont;
          });
        });
        
        // Ждем завершения загрузки всех шрифтов
        Promise.all(fontPromises)
          .then(() => resolve(true))
          .catch(error => {
            errorService.handleError(error, { source: 'PreloadService', operation: 'preloadFonts' });
            resolve(false);
          });
      } catch (error) {
        errorService.handleError(error as Error, { source: 'PreloadService', operation: 'preloadFonts' });
        resolve(false);
      }
    });
  }
  
  /**
   * Предзагружает ключевые изображения
   */
  preloadImages(imageUrls: string[], priority: boolean = false): Promise<boolean> {
    return new Promise((resolve) => {
      try {
        // Используем существующий imageService для предзагрузки
        imageService.preloadImages(imageUrls, { priority, concurrency: 3 })
          .then(() => resolve(true))
          .catch(error => {
            errorService.handleError(error, { source: 'PreloadService', operation: 'preloadImages' });
            resolve(false);
          });
      } catch (error) {
        errorService.handleError(error as Error, { source: 'PreloadService', operation: 'preloadImages' });
        resolve(false);
      }
    });
  }
  
  /**
   * Предзагружает JSON данные
   */
  preloadData(dataUrls: string[]): Promise<Record<string, any>> {
    return new Promise((resolve) => {
      try {
        const dataPromises = dataUrls.map(url => 
          fetch(url)
            .then(response => response.json())
            .catch(error => {
              errorService.handleError(error, { source: 'PreloadService', operation: 'preloadData', url });
              return null;
            })
        );
        
        // Объединяем результаты с именами файлов как ключами
        Promise.all(dataPromises)
          .then(results => {
            const dataMap: Record<string, any> = {};
            
            dataUrls.forEach((url, index) => {
              const key = url.split('/').pop()?.split('.')[0] || `data${index}`;
              dataMap[key] = results[index];
            });
            
            resolve(dataMap);
          })
          .catch(error => {
            errorService.handleError(error, { source: 'PreloadService', operation: 'preloadData' });
            resolve({});
          });
      } catch (error) {
        errorService.handleError(error as Error, { source: 'PreloadService', operation: 'preloadData' });
        resolve({});
      }
    });
  }
  
  /**
   * Предзагружает все критические ресурсы
   */
  preloadCriticalResources(options: PreloadOptions = {}): Promise<boolean> {
    const {
      priority = true,
      fonts = true,
      images = true,
      data = false,
    } = options;
    
    return new Promise((resolve) => {
      const promises: Promise<any>[] = [];
      
      // Добавляем загрузку шрифтов, если требуется
      if (fonts) {
        promises.push(this.preloadFonts());
      }
      
      // Добавляем загрузку ключевых изображений, если требуется
      if (images) {
        const criticalImages = [
          '/assets/images/logo.svg',
          '/assets/images/rings_with_circle.svg',
          '/assets/images/threads.png',
          '/assets/images/code.png',
          '/assets/images/day.png',
          '/assets/images/presentation.png',
        ];
        
        promises.push(this.preloadImages(criticalImages, priority));
      }
      
      // Добавляем загрузку данных, если требуется
      if (data) {
        const dataUrls: string[] = [
          // Здесь могли бы быть URL к JSON файлам с данными
        ];
        
        if (dataUrls.length > 0) {
          promises.push(this.preloadData(dataUrls));
        }
      }
      
      // Ждем завершения всех операций предзагрузки
      Promise.all(promises)
        .then(() => resolve(true))
        .catch(() => resolve(false));
    });
  }
}

export const preloadService = new PreloadService();