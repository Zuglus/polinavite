// src/hooks/useIntersectionObserver.test.tsx
import React, { useRef } from 'react';
import { render, screen, act } from '@testing-library/react';
import { describe, it, expect, beforeEach, vi } from 'vitest';
import { useIntersectionObserver, useLazyImage } from './useIntersectionObserver';

// Создаём компонент для тестирования useIntersectionObserver
function TestIntersectionComponent({ options = {} }) {
  const ref = useRef(null);
  const { isIntersecting, wasIntersected } = useIntersectionObserver(ref, options);
  
  return (
    <div ref={ref} data-testid="observed-element">
      <div data-testid="intersection-status">
        {isIntersecting ? 'Intersecting' : 'Not intersecting'}
      </div>
      <div data-testid="was-intersected-status">
        {wasIntersected ? 'Was intersected' : 'Never intersected'}
      </div>
    </div>
  );
}

// Создаём компонент для тестирования useLazyImage
function TestLazyImageComponent({ options = {} }) {
  const ref = useRef(null);
  const { isIntersecting, wasIntersected } = useLazyImage(ref, options);
  
  return (
    <div ref={ref} data-testid="lazy-image-container">
      <div data-testid="lazy-image-status">
        {isIntersecting ? 'Visible' : 'Not visible'}
      </div>
      <div data-testid="lazy-image-was-visible">
        {wasIntersected ? 'Was visible' : 'Never visible'}
      </div>
    </div>
  );
}

describe('useIntersectionObserver', () => {
  // Мок для IntersectionObserver
  let mockObserve: any;
  let mockDisconnect: any;
  let mockCallback: any;
  
  beforeEach(() => {
    mockObserve = vi.fn();
    mockDisconnect = vi.fn();
    
    // Создаем мок для IntersectionObserver
    window.IntersectionObserver = vi.fn(function(callback) {
      mockCallback = callback;
      return {
        observe: mockObserve,
        disconnect: mockDisconnect,
        unobserve: vi.fn(),
        takeRecords: vi.fn(),
        root: null,
        rootMargin: '',
        thresholds: []
      };
    }) as any;
  });

  it('should initialize with non-intersecting state', () => {
    render(<TestIntersectionComponent />);
    
    expect(screen.getByTestId('intersection-status').textContent).toBe('Not intersecting');
    expect(screen.getByTestId('was-intersected-status').textContent).toBe('Never intersected');
    expect(mockObserve).toHaveBeenCalledWith(expect.any(Element));
  });

  it('should update state when intersection is detected', () => {
    render(<TestIntersectionComponent />);
    
    // Имитируем пересечение
    act(() => {
      mockCallback([{
        isIntersecting: true,
        intersectionRatio: 1,
        boundingClientRect: {} as DOMRectReadOnly,
        intersectionRect: {} as DOMRectReadOnly,
        rootBounds: null,
        target: screen.getByTestId('observed-element'),
        time: Date.now()
      }]);
    });
    
    // Проверяем обновление состояния
    expect(screen.getByTestId('intersection-status').textContent).toBe('Intersecting');
    expect(screen.getByTestId('was-intersected-status').textContent).toBe('Was intersected');
  });

  it('should disconnect observer when component unmounts', () => {
    const { unmount } = render(<TestIntersectionComponent />);
    
    unmount();
    
    expect(mockDisconnect).toHaveBeenCalled();
  });
});

describe('useLazyImage', () => {
  it('should return { isIntersecting: true, wasIntersected: true } when IntersectionObserver is not supported', () => {
    // Временно удаляем IntersectionObserver
    const originalIntersectionObserver = window.IntersectionObserver;
    window.IntersectionObserver = undefined as any;
    
    render(<TestLazyImageComponent options={{ fallbackToEager: true }} />);
    
    expect(screen.getByTestId('lazy-image-status').textContent).toBe('Visible');
    expect(screen.getByTestId('lazy-image-was-visible').textContent).toBe('Was visible');
    
    // Восстанавливаем IntersectionObserver
    window.IntersectionObserver = originalIntersectionObserver;
  });
});