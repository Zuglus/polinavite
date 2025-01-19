import { useState, useCallback } from 'react';

export const useImageRotation = (isTouchDevice) => {
  const [rotation, setRotation] = useState(0);

  const determineOptimalRotation = useCallback((naturalWidth, naturalHeight) => {
    if (!isTouchDevice) return;

    const screenWidth = window.innerWidth;
    const screenHeight = window.innerHeight;
    
    if (naturalHeight > naturalWidth) {
      setRotation(0);
      return;
    }

    setRotation(naturalWidth > naturalHeight && screenHeight > screenWidth ? 90 : 0);
  }, [isTouchDevice]);

  return {
    rotation,
    setRotation,
    determineOptimalRotation
  };
};