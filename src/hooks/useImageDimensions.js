import { useState, useCallback, useMemo } from 'react';

export const useImageDimensions = () => {
  const [naturalDimensions, setNaturalDimensions] = useState({ 
    width: 0, 
    height: 0 
  });

  const calculateOptimalDimensions = useCallback(() => {
    const { width, height } = naturalDimensions;
    
    if (width === 0 || height === 0) {
      return { 
        width: '100%', 
        height: 'auto' 
      };
    }

    const aspectRatio = width / height;
    const viewportWidth = window.innerWidth * 0.9;
    const viewportHeight = window.innerHeight * 0.9;

    return aspectRatio > 1
      ? { width: viewportWidth, height: viewportWidth / aspectRatio }
      : { width: viewportHeight * aspectRatio, height: viewportHeight };
  }, [naturalDimensions]);

  const loadImageDimensions = useCallback((imageSrc) => {
    const img = new Image();
    
    img.onload = () => {
      setNaturalDimensions({
        width: img.naturalWidth,
        height: img.naturalHeight
      });
    };
    
    img.onerror = () => {
      console.error('Image load error');
      setNaturalDimensions({ width: 0, height: 0 });
    };
    
    img.src = imageSrc;
  }, []);

  return {
    naturalDimensions,
    calculateOptimalDimensions,
    loadImageDimensions
  };
};