// src/hooks/useImageLoad.js
import { useState, useEffect } from 'react';
import { imageService } from '@/services';

/**
 * Хук для загрузки и отслеживания состояния изображения
 * @param {string} src - URL изображения
 * @param {boolean} [priority=false] - Приоритет загрузки
 * @returns {Object} Состояние загрузки изображения
 * @property {string} status - Статус загрузки ('init', 'loading', 'loaded', 'error')
 * @property {number} retryCount - Количество попыток загрузки
 * @property {Function} reload - Функция для повторной загрузки изображения
 */
export const useImageLoad = (src, priority = false) => {
  const [status, setStatus] = useState(imageService.status$.get());
  const [retryCount, setRetryCount] = useState(imageService.retryCount$.get());

  useEffect(() => {
    if (!src) return;

    // Подписываемся на изменения состояния
    const statusSubscription = imageService.status$.subscribe(newStatus => {
      setStatus(newStatus);
    });

    const retrySubscription = imageService.retryCount$.subscribe(count => {
      setRetryCount(count);
    });

    // Загружаем изображение
    imageService.loadImage(src, priority).catch(error => {
      console.error('Error loading image:', error);
    });

    // Очистка подписок при размонтировании
    return () => {
      statusSubscription.unsubscribe();
      retrySubscription.unsubscribe();
    };
  }, [src, priority]);

  // Метод для повторной загрузки изображения
  const reload = () => {
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