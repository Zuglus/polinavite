import React from 'react';
import { useSelector } from '@legendapp/state/react';
import ImageSkeleton from '@components/Skeleton';
import { IMAGE_STYLES } from '@constants/styles';
import { imageService } from '@services/image.service';

const SliderImage = ({ src, alt, priority = false }) => {
  const status = useSelector(() => imageService.status$.get());
  const retryCount = useSelector(() => imageService.retryCount$.get());

  React.useEffect(() => {
    if (src) {
      imageService.loadImage(src);
      imageService.status$.onChange(({value}) => {
        console.log('Статус загрузки:', value)
    });
    }
  }, [src]);

  return (
    <div className={IMAGE_STYLES.CONTAINER}>
      {status === 'loading' && <ImageSkeleton />}

      {status === 'error' && (
        <div className={IMAGE_STYLES.ERROR}>
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
        />
      )}
    </div>
  );
};

export default React.memo(SliderImage);