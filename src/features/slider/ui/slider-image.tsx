import React, { useEffect } from 'react';
import { useSelector } from '@legendapp/state/react';
import { Skeleton } from '@shared/ui';
import { IMAGE_STYLES } from '@shared/config/styles';
import { imageService } from '@shared/api/image/image.service';
import { ImageLoadStatus } from '@shared/model/types';

export interface SliderImageProps {
  /**
   * URL изображения
   */
  src: string;
  
  /**
   * Альтернативный текст для изображения
   */
  alt?: string;
  
  /**
   * Флаг приоритетной загрузки
   */
  priority?: boolean;
  
  /**
   * Индекс слайда (для оптимизации перерендера)
   */
  index?: number;
}

/**
 * Компонент для отображения изображения в слайдере с состояниями загрузки
 */
const SliderImage: React.FC<SliderImageProps> = ({ 
  src, 
  alt = 'Slide image', 
  priority = false,
  index
}) => {
  // Используем реактивные переменные из сервиса изображений
  const status = useSelector(() => imageService.status$.get()) as ImageLoadStatus;
  const retryCount = useSelector(() => imageService.retryCount$.get());

  // Загружаем изображение при монтировании компонента
  useEffect(() => {
    if (src) {
      imageService.loadImage(src, priority);
    }
  }, [src, priority]);

  return (
    <div className={IMAGE_STYLES.CONTAINER} data-testid="slider-image-container">
      {/* Скелетон при загрузке */}
      {(status === 'loading' || status === 'retrying') && (
        <div data-testid="slider-loading">
          <Skeleton />
        </div>
      )}

      {/* Сообщение об ошибке */}
      {status === 'error' && (
        <div className={IMAGE_STYLES.ERROR} data-testid="slider-error">
          Ошибка загрузки (попыток: {retryCount})
        </div>
      )}

      {/* Загруженное изображение */}
      {status === 'loaded' && (
        <img
          src={src}
          alt={alt}
          className={IMAGE_STYLES.IMAGE}
          loading={priority ? "eager" : "lazy"}
          decoding="async"
          data-testid="slider-image-loaded"
        />
      )}
    </div>
  );
};

export default React.memo(SliderImage);