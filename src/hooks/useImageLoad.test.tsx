// src/hooks/useImageLoad.test.tsx
import React from 'react';
import { render, act, renderHook } from '@testing-library/react';
import { vi, describe, it, expect, beforeEach } from 'vitest';
import { useImageLoad } from './useImageLoad';

// Мокаем imageService
vi.mock('@/services', () => ({
  imageService: {
    status$: {
      get: vi.fn().mockReturnValue('init'),
      set: vi.fn()
    },
    retryCount$: {
      get: vi.fn().mockReturnValue(0),
      set: vi.fn()
    },
    loadImage: vi.fn().mockResolvedValue({})
  }
}));

// Функция для создания пользовательского хука
function renderUseImageLoadHook(src = 'test.jpg', priority = false) {
  // Создаем компонент-обертку для хука
  const TestComponent = () => {
    const result = useImageLoad(src, priority);
    return (
      <div data-testid="hook-result" data-status={result.status} data-retrycount={result.retryCount}>
        Hook rendered
      </div>
    );
  };

  const utils = render(<TestComponent />);
  
  // Возвращаем результат хука через data-атрибуты DOM-элемента
  return {
    ...utils,
    result: {
      get current() {
        const element = utils.getByTestId('hook-result');
        return {
          status: element.getAttribute('data-status'),
          retryCount: Number(element.getAttribute('data-retrycount')),
          reload: vi.fn().mockResolvedValue({})
        };
      }
    }
  };
}

describe('useImageLoad', () => {
  const imageService = vi.mocked(require('@/services').imageService);
  
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should initialize with default values from imageService', () => {
    imageService.status$.get.mockReturnValue('init');
    imageService.retryCount$.get.mockReturnValue(0);
    
    const { result } = renderUseImageLoadHook();
    
    expect(result.current.status).toBe('init');
    expect(result.current.retryCount).toBe(0);
  });

  it('should call imageService.loadImage when mounted with src', () => {
    renderUseImageLoadHook('test.jpg');
    
    expect(imageService.loadImage).toHaveBeenCalledWith('test.jpg', false);
  });

  it('should not call imageService.loadImage when src is empty', () => {
    renderUseImageLoadHook('');
    
    expect(imageService.loadImage).not.toHaveBeenCalled();
  });

  it('should use priority when specified', () => {
    renderUseImageLoadHook('test.jpg', true);
    
    expect(imageService.loadImage).toHaveBeenCalledWith('test.jpg', true);
  });
});