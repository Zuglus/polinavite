import '@testing-library/jest-dom';
import { vi } from 'vitest';
import React from 'react';

// Мок для window.matchMedia
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: vi.fn().mockImplementation(query => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: vi.fn(),
    removeListener: vi.fn(),
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
  })),
});

// Мок для IntersectionObserver
class IntersectionObserverMock {
  readonly root: Element | null = null;
  readonly rootMargin: string = '';
  readonly thresholds: ReadonlyArray<number> = [];
  
  constructor(
    private callback: IntersectionObserverCallback,
    options?: IntersectionObserverInit
  ) {}
  
  observe = vi.fn();
  unobserve = vi.fn();
  disconnect = vi.fn();
  takeRecords = vi.fn();
}

Object.defineProperty(window, 'IntersectionObserver', {
  writable: true,
  configurable: true,
  value: IntersectionObserverMock,
});

// Мок для performance.now
if (!window.performance) {
  Object.defineProperty(window, 'performance', {
    value: {
      now: vi.fn(() => Date.now()),
    },
  });
}

// Глобальные моки для RxJS
vi.mock('rxjs', async () => {
  const actual = await vi.importActual('rxjs');
  return {
    ...actual,
    from: vi.fn((input: any) => ({
      pipe: vi.fn(() => ({
        subscribe: vi.fn((callbacks: any) => {
          if (callbacks.complete) {
            callbacks.complete();
          }
          return {
            unsubscribe: vi.fn()
          };
        })
      }))
    })),
  };
});

// Подготовка глобальных мок-функций для тестов
global.ResizeObserver = vi.fn().mockImplementation(() => ({
  observe: vi.fn(),
  unobserve: vi.fn(),
  disconnect: vi.fn(),
}));

// Необходимые моки для framer-motion
vi.mock('framer-motion', () => {
  const mockComponent = (name: string) => 
    (props: any) => React.createElement(name, props, props.children);

  return {
    motion: {
      div: mockComponent('div'),
      span: mockComponent('span'),
      button: mockComponent('button'),
      img: mockComponent('img')
    },
    AnimatePresence: (props: any) => React.createElement(React.Fragment, null, props.children),
  };
});

// Мок для событий браузера
beforeEach(() => {
  vi.resetAllMocks();
});