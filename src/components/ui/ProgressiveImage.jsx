// src/components/ui/ProgressiveImage.jsx
import React, { useState } from 'react';
import { useSelector } from '@legendapp/state/react';
import { motion, AnimatePresence } from 'framer-motion';
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
  const [isLoaded, setIsLoaded] = useState(false);

  // Обработчик успешной загрузки
  const handleLoad = () => {
    setIsLoaded(true);
  };

  React.useEffect(() => {
    if (src) {
      imageService.loadImage(src);
    }
    return () => {
      setIsLoaded(false);
    };
  }, [src]);

  return (
    <div className="relative w-full h-full overflow-hidden">
      <AnimatePresence mode="wait">
        {/* Skeleton при загрузке */}
        {(status === 'loading' || status === 'retrying') && (
          <motion.div
            key="skeleton"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0"
          >
            <Skeleton animation="pulse" />
          </motion.div>
        )}

        {/* Сообщение об ошибке */}
        {status === 'error' && (
          <motion.div
            key="error"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 flex items-center justify-center"
          >
            <div className="bg-red-500/10 backdrop-blur-sm rounded-lg p-4 text-red-500">
              Ошибка загрузки (попыток: {retryCount})
            </div>
          </motion.div>
        )}

        {/* Изображение */}
        {status === 'loaded' && (
          <motion.div
            key="image"
            initial={{ opacity: 0, filter: 'blur(10px)' }}
            animate={{ 
              opacity: isLoaded ? 1 : 0,
              filter: isLoaded ? 'blur(0px)' : 'blur(10px)'
            }}
            transition={{ duration: 0.3 }}
            className="w-full h-full"
          >
            <img 
              src={src}
              alt={alt}
              className={`w-full h-full transition-opacity duration-300 ${className}`}
              loading={priority ? "eager" : "lazy"}
              decoding="async"
              onLoad={handleLoad}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default React.memo(ProgressiveImage);