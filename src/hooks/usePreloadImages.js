// src/hooks/usePreloadImages.js
/**
 * Хук для предварительной загрузки набора изображений
 * @param {string[]} images - Массив URL изображений для загрузки
 * @param {number} [concurrency=3] - Количество параллельных загрузок
 * @returns {Object} Объект с информацией о статусе загрузки
 * @property {number} progress - Прогресс загрузки (0-100)
 * @property {boolean} isComplete - Флаг завершения загрузки
 * @property {Error|null} error - Ошибка загрузки, если есть
 * @example
 * const Component = () => {
 *   const { progress, isComplete } = usePreloadImages(['img1.jpg', 'img2.jpg']);
 *   return isComplete ? <Content /> : <Loading progress={progress} />;
 * };
 */

import { observable } from '@legendapp/state';
import { imageService } from '@services';

const preloadState = observable({
  progress: 0,
  isComplete: false,
  error: null
});

export const usePreloadImages = (images, concurrency = 3) => {
  React.useEffect(() => {
    if (!images?.length) return;

    const totalImages = images.length;
    let loadedImages = 0;

    preloadState.set({
      progress: 0,
      isComplete: false,
      error: null
    });

    imageService.preloadImages(images, concurrency)
      .then(() => {
        preloadState.set({
          progress: 100,
          isComplete: true,
          error: null
        });
      })
      .catch(error => {
        preloadState.error.set(error);
      });

    return () => {
      preloadState.set({
        progress: 0,
        isComplete: false,
        error: null
      });
    };
  }, [images, concurrency]);

  return {
    progress: preloadState.progress.get(),
    isComplete: preloadState.isComplete.get(),
    error: preloadState.error.get()
  };
};