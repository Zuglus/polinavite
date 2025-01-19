import { useState, useCallback } from 'react';

export const useImageDimensions = () => {
  const [naturalDimensions, setNaturalDimensions] = useState({ width: 0, height: 0 });

  const calculateOptimalDimensions = useCallback(() => {
    const screenWidth = window.innerWidth;
    const screenHeight = window.innerHeight;
    const availableWidth = screenWidth * 0.95;
    const availableHeight = screenHeight * 0.95;
    
    if (!naturalDimensions.width || !naturalDimensions.height) {
      return { maxWidth: '95vw', maxHeight: '95vh' };
    }

    const imageRatio = naturalDimensions.width / naturalDimensions.height;
    const screenRatio = availableWidth / availableHeight;

    let finalWidth, finalHeight;

    if (imageRatio > screenRatio) {
      finalWidth = availableWidth;
      finalHeight = availableWidth / imageRatio;
    } else {
      finalHeight = availableHeight;
      finalWidth = availableHeight * imageRatio;
    }

    return {
      maxWidth: `${Math.min(finalWidth, naturalDimensions.width)}px`,
      maxHeight: `${Math.min(finalHeight, naturalDimensions.height)}px`
    };
  }, [naturalDimensions]);

  const loadImageDimensions = useCallback((imageSrc) => {
    const img = new Image();
    img.src = imageSrc;
    img.onload = () => {
      setNaturalDimensions({ 
        width: img.naturalWidth, 
        height: img.naturalHeight 
      });
    };
  }, []);

  return {
    naturalDimensions,
    calculateOptimalDimensions,
    loadImageDimensions
  };
};