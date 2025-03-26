// src/hooks/useIntersectionObserver.js
/**
 * Хук для отслеживания пересечения элемента с областью видимости (Intersection Observer API)
 * @param {React.RefObject} ref - Ссылка на DOM-элемент для наблюдения
 * @param {Object} options - Опции IntersectionObserver
 * @param {Element|Document} [options.root=null] - Элемент, относительно которого проверяется видимость целевого элемента
 * @param {string} [options.rootMargin='0px'] - Отступы вокруг корневого элемента
 * @param {number|number[]} [options.threshold=0] - Порог(и) пересечения
 * @returns {boolean} Флаг видимости элемента
 * @example
 * const MyComponent = () => {
 *   const ref = useRef(null);
 *   const isVisible = useIntersectionObserver(ref, { rootMargin: '200px' });
 *   
 *   return (
 *     <div ref={ref}>
 *       {isVisible ? 'Element is visible' : 'Element is not visible'}
 *     </div>
 *   );
 * };
 */

import { useState, useEffect, useRef } from 'react';

export const useIntersectionObserver = (ref, {
  root = null,
  rootMargin = '0px',
  threshold = 0,
} = {}) => {
  const [isIntersecting, setIsIntersecting] = useState(false);
  const [wasIntersected, setWasIntersected] = useState(false);
  const observerRef = useRef(null);

  useEffect(() => {
    if (!ref?.current) return;

    // Сначала отключаем предыдущий Observer, если он есть
    if (observerRef.current) {
      observerRef.current.disconnect();
    }

    // Создаем новый Observer
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsIntersecting(entry.isIntersecting);
        
        // Если элемент хотя бы раз пересек область видимости, запоминаем это
        if (entry.isIntersecting) {
          setWasIntersected(true);
        }
      },
      { root, rootMargin, threshold }
    );

    // Начинаем наблюдение
    observer.observe(ref.current);
    observerRef.current = observer;

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, [ref, root, rootMargin, threshold]);

  return { isIntersecting, wasIntersected };
};

/**
 * Хук для ленивой загрузки изображений
 * @param {React.RefObject} ref - Ссылка на DOM-элемент для наблюдения
 * @param {Object} options - Опции IntersectionObserver и загрузки
 * @param {string} [options.rootMargin='200px'] - Отступы вокруг корневого элемента
 * @param {boolean} [options.triggerOnce=true] - Срабатывать только один раз при первом пересечении
 * @param {boolean} [options.fallbackToEager=true] - Использовать eager загрузку, если IntersectionObserver не поддерживается
 * @returns {boolean} Должно ли изображение быть загружено
 */
export const useLazyImage = (ref, {
  rootMargin = '200px',
  triggerOnce = true,
  fallbackToEager = true
} = {}) => {
  const [shouldLoad, setShouldLoad] = useState(false);

  // Проверяем поддержку IntersectionObserver
  const isIntersectionObserverSupported = typeof window !== 'undefined' && 'IntersectionObserver' in window;

  // Если IntersectionObserver не поддерживается, используем eager загрузку
  if (!isIntersectionObserverSupported && fallbackToEager) {
    return true;
  }

  // Используем IntersectionObserver, если он поддерживается
  const { isIntersecting, wasIntersected } = useIntersectionObserver(ref, { rootMargin });

  useEffect(() => {
    if (isIntersecting || (triggerOnce && wasIntersected)) {
      setShouldLoad(true);
    }
  }, [isIntersecting, wasIntersected, triggerOnce]);

  return shouldLoad;
};

export default useIntersectionObserver;