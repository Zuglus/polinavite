// src/components/ui/ProgressiveImage.jsx
/**
 * Компонент для постепенной загрузки изображений с поддержкой анимации и состояний загрузки
 * @component
 * @param {Object} props - Свойства компонента
 * @param {string} props.src - URL изображения для загрузки
 * @param {string} props.alt - Альтернативный текст для изображения
 * @param {string} [props.className] - Дополнительные CSS классы
 * @param {boolean} [props.priority=false] - Флаг приоритетной загрузки
 * @param {boolean} [props.lazy=true] - Использовать ли ленивую загрузку
 * @param {string} [props.placeholderSrc] - URL для заглушки низкого качества
 * @returns {React.ReactElement} Компонент с изображением и состояниями загрузки
 */

import React, { useRef, useState, useEffect } from 'react';
import { observer } from '@legendapp/state/react';
import { motion, AnimatePresence } from 'framer-motion';
import { Skeleton } from '@ui';
import { imageService } from '@services';
import { useLazyImage } from '@hooks/useIntersectionObserver';
import { errorService } from '@services/error.service';

// Создаем компонент с поддержкой React.memo для оптимизации рендеринга
const ProgressiveImage = observer(({ 
  src, 
  alt, 
  className = '', 
  priority = false,
  lazy = true,
  placeholderSrc = '',
  style = {},
  ...rest
}) => {
  // Создаем ref для элемента и используем хук для ленивой загрузки
  const imageRef = useRef(null);
  const shouldLoad = useLazyImage(imageRef, {
    rootMargin: '200px', // Предзагрузка при приближении к области видимости
    triggerOnce: true,    // Загружать только один раз
    fallbackToEager: true // Использовать eager загрузку, если IntersectionObserver не поддерживается
  });

  // Состояние для отслеживания статуса загрузки
  const status = imageService.status$.get();
  const retryCount = imageService.retryCount$.get();

  // Состояние для fade-in эффекта
  const [isLoaded, setIsLoaded] = useState(false);
  const [showPlaceholder, setShowPlaceholder] = useState(!!placeholderSrc);

  // Функция для расчета размеров контейнера в соответствии с aspect ratio
  const calculateAspectRatio = () => {
    if (style.aspectRatio) {
      return { aspectRatio: style.aspectRatio };
    }
    
    if (style.width && style.height) {
      return { aspectRatio: `${style.width}/${style.height}` };
    }
    
    return {};
  };

  // Обработчик успешной загрузки
  const handleLoad = () => {
    setIsLoaded(true);
    setShowPlaceholder(false);
  };

  // Обработчик ошибки загрузки
  const handleError = (error) => {
    console.error('Image load error:', error);
    setShowPlaceholder(false);
    
    errorService.handleError(error || new Error('Image load failed'), {
      component: 'ProgressiveImage',
      src,
      alt
    });
  };

  // Эффект для загрузки изображения
  useEffect(() => {
    // Если lazy=true и изображение не должно загружаться, выходим
    if (lazy && !shouldLoad && !priority) {
      return;
    }

    if (src) {
      imageService.loadImage(src, priority)
        .catch(handleError);
    }
  }, [src, priority, lazy, shouldLoad]);

  // Аспект для контейнера
  const aspectStyles = calculateAspectRatio();

  return (
    <div 
      ref={imageRef}
      className="relative w-full h-full overflow-hidden isolate"
      style={{...aspectStyles, ...style}}
    >
      <AnimatePresence mode="wait">
        {/* Skeleton при загрузке */}
        {(status === 'loading' || status === 'retrying') && (
          <motion.div
            key="skeleton"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0"
            data-testid="skeleton"
          >
            <Skeleton 
              animation="pulse" 
              className="w-full h-full"
            />
          </motion.div>
        )}

        {/* Заглушка низкого качества (LQIP) */}
        {showPlaceholder && placeholderSrc && (
          <motion.div
            key="placeholder"
            initial={{ opacity: 1 }}
            animate={{ opacity: isLoaded ? 0 : 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="absolute inset-0"
          >
            <img 
              src={placeholderSrc}
              alt=""
              className="w-full h-full object-cover filter blur-md"
              aria-hidden="true"
            />
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
            <div className="bg-red-500/10 backdrop-blur-sm rounded-lg p-4 text-red-500 text-center">
              <p>Ошибка загрузки</p>
              <p className="text-sm">(попыток: {retryCount})</p>
              <button 
                onClick={() => {
                  imageService.retryCount$.set(0);
                  imageService.status$.set('loading');
                  imageService.loadImage(src, true);
                }}
                className="mt-2 px-3 py-1 bg-red-500/20 hover:bg-red-500/30 rounded text-xs"
              >
                Попробовать снова
              </button>
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
              onError={handleError}
              {...rest}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
});

// Экспортируем мемоизированный компонент
export default React.memo(ProgressiveImage);