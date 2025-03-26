// src/hooks/useDeviceDetection.ts
import { useState, useEffect } from 'react';

/**
 * Хук для определения типа устройства пользователя
 * @returns true для сенсорных устройств
 */
export const useDeviceDetection = (): boolean => {
  const [isTouchDevice, setIsTouchDevice] = useState<boolean>(false);

  useEffect(() => {
    setIsTouchDevice(
      'ontouchstart' in window ||
      navigator.maxTouchPoints > 0 ||
      ('msMaxTouchPoints' in navigator && (navigator as any).msMaxTouchPoints > 0)
    );
  }, []);

  return isTouchDevice;
};

export default useDeviceDetection;