import React, { useEffect, useState, useRef, useCallback, useMemo } from 'react';
import { motion, useAnimate, useMotionValue } from 'framer-motion';

const FullscreenImage = ({ src, alt, isTouchDevice, dimensions, rotation, onClose }) => {
  const [isLoading, setIsLoading] = useState(true);
  const imageRef = useRef(null);
  const [scope, animate] = useAnimate();
  const scale = useMotionValue(1);

  // 1. Защита от некорректных dimensions
  const safeDimensions = useMemo(() => ({
    width: Math.max(dimensions?.width || 0, 1),
    height: Math.max(dimensions?.height || 0, 1)
  }), [dimensions]);

  // 2. Вычисление размеров изображения
  const calculateImageDimensions = useCallback(() => {
    const containerWidth = window.innerWidth;
    const containerHeight = window.innerHeight;
    
    // Защита от деления на ноль
    if (safeDimensions.height < 1 || safeDimensions.width < 1) {
      return { width: 0, height: 0 };
    }

    const imageRatio = safeDimensions.width / safeDimensions.height;
    const containerRatio = containerWidth / containerHeight;

    let finalWidth = containerWidth;
    let finalHeight = containerHeight;

    if (rotation === 90 || rotation === 270) {
      if (imageRatio > 1) {
        finalHeight = Math.min(containerWidth, safeDimensions.width);
        finalWidth = finalHeight * imageRatio;
      } else {
        finalWidth = Math.min(containerHeight, safeDimensions.height);
        finalHeight = finalWidth / imageRatio;
      }
    } else {
      if (imageRatio > containerRatio) {
        finalHeight = containerWidth / imageRatio;
      } else {
        finalWidth = containerHeight * imageRatio;
      }
    }

    // Ограничение минимального размера
    return {
      width: Math.max(finalWidth, 50),
      height: Math.max(finalHeight, 50)
    };
  }, [safeDimensions, rotation]);

  // 3. Вычисление максимального масштаба
  const calculateMaxScale = useCallback(() => {
    const { width, height } = calculateImageDimensions();
    
    if (width < 50 || height < 50) return 1;

    const containerWidth = window.innerWidth;
    const containerHeight = window.innerHeight;

    const scaleX = containerWidth / width;
    const scaleY = containerHeight / height;

    return Math.min(scaleX, scaleY, 5); // Максимум 5x
  }, [calculateImageDimensions]);

  // 4. Оптимизированный расчет стилей
  const imageStyles = useMemo(() => {
    const { width, height } = calculateImageDimensions();
    return {
      width: Number.isFinite(width) ? width : 'auto',
      height: Number.isFinite(height) ? height : 'auto',
      objectFit: 'contain',
      display: isLoading ? 'none' : 'block',
      userSelect: 'none',
      position: 'relative',
      zIndex: 70,
    };
  }, [calculateImageDimensions, isLoading]);

  // 5. Обработчик клика для масштабирования
  const handleImageClick = useCallback(async () => {
    try {
      const currentScale = scale.get();
      const targetScale = currentScale === 1 ? calculateMaxScale() : 1;
      
      await animate(scale, targetScale, {
        duration: 0.3,
        ease: targetScale > 1 ? 'easeOut' : 'easeIn',
      });
    } catch (error) {
      console.error('Animation error:', error);
    }
  }, [scale, animate, calculateMaxScale]);

  // 6. Обработчики касаний
  const handleTouchStart = (e) => {
    if (e.touches.length === 2) e.preventDefault();
  };

  const handleTouchEnd = (e) => {
    if (e.touches.length === 0) handleImageClick();
  };

  // 7. Эффект для обработки изменений размеров
  useEffect(() => {
    const handleResize = () => {
      if (scale.get() !== 1) {
        animate(scale, 1, { duration: 0.2 });
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [scale, animate]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center" ref={scope}>
      <div className="absolute inset-0" onClick={onClose} style={{ zIndex: 60 }} />
      
      <motion.img
        ref={imageRef}
        src={src}
        alt={alt}
        onLoad={() => setIsLoading(false)}
        onClick={handleImageClick}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
        style={imageStyles}
        animate={{
          rotate: rotation,
          scale: scale.get()
        }}
        transition={{
          type: 'spring',
          stiffness: 260,
          damping: 20
        }}
      />

      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-12 h-12 border-4 border-white border-t-transparent rounded-full animate-spin" />
        </div>
      )}
    </div>
  );
};

export default FullscreenImage;