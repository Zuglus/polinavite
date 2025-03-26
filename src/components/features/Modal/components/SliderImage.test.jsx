import React from 'react';
import { render, screen } from '@testing-library/react';
import { vi, describe, it, expect, beforeEach } from 'vitest';
import SliderImage from './SliderImage';

// Мок для imageService
vi.mock('@services', () => ({
  imageService: {
    status$: {
      get: vi.fn(),
      subscribe: vi.fn().mockReturnValue({ unsubscribe: vi.fn() })
    },
    retryCount$: {
      get: vi.fn(),
      subscribe: vi.fn().mockReturnValue({ unsubscribe: vi.fn() })
    },
    loadImage: vi.fn()
  }
}));

describe('SliderImage', () => {
  // Получаем доступ к моку
  const imageService = vi.mocked(require('@services').imageService);

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should call loadImage when mounted with src', () => {
    // Устанавливаем статус загрузки
    imageService.status$.get.mockReturnValue('loading');
    
    render(<SliderImage src="test.jpg" alt="test" />);
    
    // Проверяем вызов метода загрузки
    expect(imageService.loadImage).toHaveBeenCalledWith('test.jpg');
  });
  
  it('should not call loadImage when src is empty', () => {
    // Устанавливаем статус загрузки
    imageService.status$.get.mockReturnValue('loading');
    
    render(<SliderImage src="" alt="test" />);
    
    // Проверяем, что метод загрузки не вызывался
    expect(imageService.loadImage).not.toHaveBeenCalled();
  });
});