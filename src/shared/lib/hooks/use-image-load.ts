// src/shared/lib/hooks/use-image-load.ts
import { useState, useEffect } from 'react';
import { imageService } from '@shared/api/image/image.service';
import { ImageLoadStatus } from '@shared/model/types';

/**
 * Результат работы хука useImageLoad
 */
export interface ImageLoadResult {
  /** Статус загрузки изображения */
  status: ImageLoadStatus;
  /** Количество попыток загрузки */
  retryCount: number;
  /** Функция для повторной загрузки изображения */
  reload: () => Promise<HTMLImageElement>;
}

/**
 * Хук для загрузки и отслеживания состояния изображения
 * @param src - URL изображения
 * @param priority - Приоритет загрузки
 * @returns Состояние загрузки изображения и функция перезагрузки
 */
export const useImageLoad = (src: string, priority: boolean = false): ImageLoadResult => {
  const [status, setStatus] = useState<ImageLoadStatus>(imageService.status$.get() as ImageLoadStatus);
  const [retryCount, setRetryCount] = useState<number>(imageService.retryCount$.get());

  useEffect(() => {
    if (!src) return;

    // Создаем наблюдатель для изменения статуса
    const intervalId = setInterval(() => {
      const newStatus = imageService.status$.get();
      if (newStatus !== status) {
        setStatus(newStatus as ImageLoadStatus);
      }
      
      const newRetryCount = imageService.retryCount$.get();
      if (newRetryCount !== retryCount) {
        setRetryCount(newRetryCount);
      }
    }, 100);

    // Загружаем изображение
    imageService.loadImage(src, priority).catch(error => {
      console.error('Error loading image:', error);
    });

    // Очистка при размонтировании
    return () => {
      clearInterval(intervalId);
    };
  }, [src, priority]);

  // Метод для повторной загрузки изображения
  const reload = (): Promise<HTMLImageElement> => {
    imageService.retryCount$.set(0);
    imageService.status$.set('loading');
    return imageService.loadImage(src, true);
  };

  return {
    status,
    retryCount,
    reload
  };
};

export default useImageLoad;