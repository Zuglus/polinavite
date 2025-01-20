import React, { useEffect, useState } from 'react';
import { X } from 'lucide-react';

const FullscreenImage = ({ src, alt, isTouchDevice, dimensions, rotation, onClose }) => {
  const [containerDimensions, setContainerDimensions] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  useEffect(() => {
    const handleResize = () => {
      setContainerDimensions({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    const handleOrientation = () => {
      setTimeout(handleResize, 100);
    };

    window.addEventListener('resize', handleResize);
    window.addEventListener('orientationchange', handleOrientation);

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('orientationchange', handleOrientation);
    };
  }, []);

  const calculateImageDimensions = () => {
    const { width: containerWidth, height: containerHeight } = containerDimensions;
    const imageRatio = dimensions.width / dimensions.height;
    const containerRatio = containerWidth / containerHeight;

    let finalWidth, finalHeight;

    if (rotation === 90 || rotation === 270) {
      if (imageRatio > 1) {
        finalHeight = Math.min(containerWidth, dimensions.width);
        finalWidth = finalHeight * imageRatio;
      } else {
        finalWidth = Math.min(containerHeight, dimensions.height);
        finalHeight = finalWidth / imageRatio;
      }
    } else {
      if (imageRatio > containerRatio) {
        finalWidth = containerWidth;
        finalHeight = containerWidth / imageRatio;
      } else {
        finalHeight = containerHeight;
        finalWidth = containerHeight * imageRatio;
      }
    }

    return {
      width: `${finalWidth}px`,
      height: `${finalHeight}px`,
      maxWidth: '100%',
      maxHeight: '100%',
    };
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-transparent">
      <div
        className="relative"
        style={{
          width: calculateImageDimensions().width,
          transform: `rotate(${rotation}deg)`,
          transition: 'transform 0.3s ease-in-out',
        }}
      >
        {/* Изображение */}
        <img
          src={src}
          alt={alt}
          style={{
            width: '100%',
            height: 'auto',
            objectFit: 'contain',
          }}
          className="transition-all duration-300 ease-in-out"
        />
        {/* Кнопка закрытия в правом верхнем углу изображения */}
        <div
          className="absolute top-0 right-0 z-50 p-4"
          style={{
            transform: `rotate(-${rotation}deg)`,
            transformOrigin: 'top right',
          }}
        >
          <button
            onClick={(e) => {
              e.stopPropagation();
              onClose();
            }}
            className="w-14 h-14 md:w-8 md:h-8 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-md flex items-center justify-center transition-colors duration-300"
            aria-label="Закрыть"
          >
            <X />
          </button>
        </div>
      </div>
    </div>
  );
};

export default FullscreenImage;