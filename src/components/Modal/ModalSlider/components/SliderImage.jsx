// components/Modal/SliderImage.jsx
import React, { useState, useEffect } from 'react';
import ImageSkeleton from '@components/Skeleton';
import { imageService } from '@services/image.service';

const SliderImage = ({ src, alt, priority = false }) => {
  const [status, setStatus] = useState('loading');
  const imgRef = React.useRef();

  useEffect(() => {
    if (!src) {
      setStatus('error');
      return;
    }

    const img = new Image();
    img.src = src;
    if (priority) img.loading = 'eager';
    
    img.onload = () => {
      setStatus('loaded');
      imageService.cacheImage(src); // Кэширование
    };
    
    img.onerror = () => {
      setStatus('error');
      imageService.retryLoad(src); // Повторная попытка
    };

    return () => img.onload = null;
  }, [src, priority]);

  return (
    <div className="image-container relative">
      {status === 'loading' && (
        <ImageSkeleton 
          width="100%" 
          height="400px" 
          className="rounded-[1.25rem]"
        />
      )}
      
      {status === 'error' && (
        <div className="error-placeholder bg-gray-800/50 flex items-center justify-center rounded-[1.25rem] h-[400px]">
          <span className="text-white/50">Не удалось загрузить изображение</span>
        </div>
      )}

      <img
        ref={imgRef}
        src={src}
        alt={alt}
        className={`w-full object-cover rounded-[1.25rem] transition-opacity duration-300 ${
          status === 'loaded' ? 'opacity-100' : 'opacity-0'
        }`}
        loading={priority ? "eager" : "lazy"}
        decoding="async"
      />
    </div>
  );
};

export default React.memo(SliderImage);