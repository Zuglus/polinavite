// src/components/features/Modal/components/SliderImage.test.tsx
import React from 'react';
import { render, screen } from '@testing-library/react';
import { vi, describe, it, expect, beforeEach } from 'vitest';
import SliderImage from './SliderImage';

// Мок для Skeleton компонента
vi.mock('@ui', () => ({
  Skeleton: () => <div data-testid="skeleton-mock">Loading Skeleton</div>
}));

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

// Мок для констант стилей
vi.mock('@constants/styles', () => ({
  IMAGE_STYLES: {
    CONTAINER: 'container-class',
    ERROR: 'error-class',
    IMAGE: 'image-class'
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

  it('should render Skeleton when status is loading', () => {
    // Устанавливаем статус загрузки
    imageService.status$.get.mockReturnValue('loading');
    
    render(<SliderImage src="test.jpg" alt="test" />);
    
    // Проверяем, что отображается скелетон
    expect(screen.getByTestId('slider-loading')).toBeInTheDocument();
    expect(screen.getByTestId('skeleton-mock')).toBeInTheDocument();
  });

  it('should render error message when status is error', () => {
    // Устанавливаем статус ошибки и количество повторов
    imageService.status$.get.mockReturnValue('error');
    imageService.retryCount$.get.mockReturnValue(3);
    
    render(<SliderImage src="test.jpg" alt="test" />);
    
    // Проверяем, что отображается сообщение об ошибке
    expect(screen.getByTestId('slider-error')).toBeInTheDocument();
    expect(screen.getByText('Ошибка загрузки (попыток: 3)')).toBeInTheDocument();
  });

  it('should render image when status is loaded', () => {
    // Устанавливаем статус загрузки
    imageService.status$.get.mockReturnValue('loaded');
    
    render(<SliderImage src="test.jpg" alt="test" />);
    
    // Проверяем, что отображается изображение
    expect(screen.getByTestId('slider-image-loaded')).toBeInTheDocument();
    expect(screen.getByAltText('test')).toBeInTheDocument();
    expect(screen.getByAltText('test')).toHaveAttribute('src', 'test.jpg');
  });

  it('should set loading priority based on props', () => {
    // Устанавливаем статус загрузки
    imageService.status$.get.mockReturnValue('loaded');
    
    render(<SliderImage src="test.jpg" alt="test" priority={true} />);
    
    // Проверяем, что установлен eager loading
    expect(screen.getByTestId('slider-image-loaded')).toHaveAttribute('loading', 'eager');
  });
});