import React, { useEffect, useState } from 'react';
import { X } from 'lucide-react';

const FullscreenImage = ({ 
    src, 
    alt, 
    isTouchDevice, 
    dimensions, 
    rotation, 
    onClose 
}) => {
  const [containerDimensions, setContainerDimensions] = useState({
    width: window.innerWidth,
    height: window.innerHeight
  });

  useEffect(() => {
    const handleResize = () => {
      setContainerDimensions({
        width: window.innerWidth,
        height: window.innerHeight
      });
    };

    const handleOrientation = () => {
      setTimeout(handleResize, 100); // Delay to ensure new dimensions are available
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
      // For rotated view
      if (imageRatio > 1) {
        finalHeight = Math.min(containerWidth, dimensions.width);
        finalWidth = finalHeight * imageRatio;
      } else {
        finalWidth = Math.min(containerHeight, dimensions.height);
        finalHeight = finalWidth / imageRatio;
      }
    } else {
      // For normal view
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
      maxHeight: '100%'
    };
  };

  const CloseButton = () => (
    <button
      onClick={onClose}
      className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-md flex items-center justify-center transition-colors duration-300"
      aria-label="Закрыть"
    >
      <X className="w-5 h-5 text-white" />
    </button>
  );

  if (!isTouchDevice) {
    return (
      <div className="relative">
        <img 
          src={src} 
          alt={alt} 
          style={calculateImageDimensions()}
          className="object-contain transition-all duration-300 ease-in-out cursor-zoom-out" 
        />
        <CloseButton />
      </div>
    );
  }

  return (
    <div className="w-screen h-screen flex items-center justify-center">
      <div 
        className="relative flex items-center justify-center w-full h-full"
        style={{
          transform: `rotate(${rotation}deg)`,
          transition: 'transform 0.3s ease-in-out'
        }}
      >
        <img 
          src={src} 
          alt={alt}
          style={calculateImageDimensions()}
          className="object-contain transition-all duration-300 ease-in-out" 
        />
        <div
          className="absolute w-full h-full"
          style={{
            transform: `rotate(-${rotation}deg)`,
            transformOrigin: 'center center'
          }}
        >
          <CloseButton />
        </div>
      </div>
    </div>
  );
};

export default FullscreenImage;