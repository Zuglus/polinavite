// src/components/ui/ProgressiveImage.jsx
import React from 'react';
import { useSelector } from '@legendapp/state/react';
import { Skeleton } from '@ui';
import { imageService } from '@services';

const ProgressiveImage = ({ 
  src, 
  alt, 
  className = '', 
  priority = false
}) => {
  const status = useSelector(() => imageService.status$.get());
  const retryCount = useSelector(() => imageService.retryCount$.get());

  React.useEffect(() => {
    if (src) {
      imageService.loadImage(src);
    }
  }, [src]);

  if (status === 'loading' || status === 'retrying') {
    return <Skeleton />;
  }

  if (status === 'error') {
    return (
      <div className="flex items-center justify-center p-4 bg-red-100 text-red-500 rounded">
        <span>Ошибка загрузки (попыток: {retryCount})</span>
      </div>
    );
  }

  return (
    <img 
      src={src}
      alt={alt}
      className={className}
      loading={priority ? "eager" : "lazy"}
      decoding="async"
    />
  );
};

export default React.memo(ProgressiveImage);