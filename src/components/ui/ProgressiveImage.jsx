// src/components/ui/ProgressiveImage.jsx
/**
 * Компонент для постепенной загрузки изображений с поддержкой анимации и состояний загрузки
 * @component
 * @param {Object} props - Свойства компонента
 * @param {string} props.src - URL изображения для загрузки
 * @param {string} props.alt - Альтернативный текст для изображения
 * @param {string} [props.className] - Дополнительные CSS классы
 * @param {boolean} [props.priority=false] - Флаг приоритетной загрузки
 * @returns {React.ReactElement} Компонент с изображением и состояниями загрузки
 */

import React from 'react';
import { observable } from '@legendapp/state';
import { observer } from '@legendapp/state/react';
import { motion, AnimatePresence } from 'framer-motion';
import { Skeleton } from '@ui';
import { imageService } from '@services';

// Создаем observable состояние
const imageState = observable({ isLoaded: false });

const ProgressiveImage = observer(({ 
  src, 
  alt, 
  className = '', 
  priority = false 
}) => {
  const status = imageService.status$.get();
  const retryCount = imageService.retryCount$.get();

  // Обработчик успешной загрузки
  const handleLoad = () => {
    imageState.isLoaded.set(true);
  };

  React.useEffect(() => {
    if (src) {
      imageService.loadImage(src);
    }
    return () => {
      imageState.isLoaded.set(false);
    };
  }, [src]);

  return (
    <div className="relative w-full h-full overflow-hidden isolate">
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
              opacity: imageState.isLoaded.get() ? 1 : 0,
              filter: imageState.isLoaded.get() ? 'blur(0px)' : 'blur(10px)'
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
});

export default React.memo(ProgressiveImage);