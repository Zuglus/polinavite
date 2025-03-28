// src/components/features/Modal/components/SliderImage.tsx
import React, { useEffect } from 'react';
import { useSelector } from '@legendapp/state/react';
import Skeleton from '@/components/ui/Skeleton';
import { IMAGE_STYLES } from '@/constants/styles';
import { imageService } from '@/services/image.service';
import { SliderImageProps } from './SliderImage.types';

const SliderImage: React.FC<SliderImageProps> = ({ src, alt = 'Slide image', priority = false }) => {
  const status = useSelector(() => imageService.status$.get());
  const retryCount = useSelector(() => imageService.retryCount$.get());

  useEffect(() => {
    if (src) {
      imageService.loadImage(src);
    }
  }, [src]);

  return (
    <div className={IMAGE_STYLES.CONTAINER} data-testid="slider-image-container">
      {status === 'loading' && (
        <div data-testid="slider-loading">
          <Skeleton />
        </div>
      )}

      {status === 'error' && (
        <div className={IMAGE_STYLES.ERROR} data-testid="slider-error">
          Ошибка загрузки (попыток: {retryCount})
        </div>
      )}

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