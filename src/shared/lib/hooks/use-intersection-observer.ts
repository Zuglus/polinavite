// src/hooks/useIntersectionObserver.ts
/**
 * Хук для отслеживания пересечения элемента с областью видимости (Intersection Observer API)
 */

import { useState, useEffect, useRef, RefObject } from 'react';

export interface IntersectionObserverOptions {
  root?: Element | Document | null;
  rootMargin?: string;
  threshold?: number | number[];
  triggerOnce?: boolean;
  fallbackToEager?: boolean;
}

export interface IntersectionResult {
  isIntersecting: boolean;
  wasIntersected: boolean;
}

export const useIntersectionObserver = (
  ref: RefObject<Element>,
  {
    root = null,
    rootMargin = '0px',
    threshold = 0,
    triggerOnce = false
  }: IntersectionObserverOptions = {}
): IntersectionResult => {
  const [isIntersecting, setIsIntersecting] = useState<boolean>(false);
  const [wasIntersected, setWasIntersected] = useState<boolean>(false);
  const observerRef = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    // Проверка поддержки IntersectionObserver
    if (!('IntersectionObserver' in window) || !ref?.current) {
      // Если не поддерживается или нет элемента, считаем что элемент всегда виден
      setIsIntersecting(true);
      setWasIntersected(true);
      return;
    }

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
          
          // Если нужно отслеживать только первое пересечение, отключаем Observer
          if (triggerOnce) {
            observer.disconnect();
          }
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
  }, [ref, root, rootMargin, threshold, triggerOnce]);

  return { isIntersecting, wasIntersected };
};

/**
 * Хук для ленивой загрузки изображений
 */
export interface LazyImageOptions extends IntersectionObserverOptions {
  rootMargin?: string;
  triggerOnce?: boolean;
  fallbackToEager?: boolean;
}

export const useLazyImage = (
  ref: RefObject<Element>,
  {
    rootMargin = '200px',
    triggerOnce = true,
    fallbackToEager = true,
    ...options
  }: LazyImageOptions = {}
): IntersectionResult => {
  // Проверяем поддержку IntersectionObserver
  const isIntersectionObserverSupported = 
    typeof window !== 'undefined' && 'IntersectionObserver' in window;

  // Если IntersectionObserver не поддерживается, используем eager загрузку
  if (!isIntersectionObserverSupported && fallbackToEager) {
    return { isIntersecting: true, wasIntersected: true };
  }

  // Используем IntersectionObserver, если он поддерживается
  return useIntersectionObserver(ref, { 
    rootMargin, 
    triggerOnce,
    ...options 
  });
};

export default useIntersectionObserver;