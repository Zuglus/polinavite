// src/hooks/useDeviceDetection.js
/**
 * Хук для определения типа устройства пользователя
 * @returns {boolean} true для сенсорных устройств
 * @example
 * const Component = () => {
 *   const isTouchDevice = useDeviceDetection();
 *   return isTouchDevice ? <TouchUI /> : <DesktopUI />;
 * };
 */

import { useState, useEffect } from 'react';

export const useDeviceDetection = () => {
  const [isTouchDevice, setIsTouchDevice] = useState(false);

  useEffect(() => {
    setIsTouchDevice(
      'ontouchstart' in window ||
      navigator.maxTouchPoints > 0 ||
      navigator.msMaxTouchPoints > 0
    );
  }, []);

  return isTouchDevice;
};