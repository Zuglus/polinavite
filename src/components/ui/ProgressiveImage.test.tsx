// src/components/ui/ProgressiveImage.test.tsx
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { vi, describe, it, expect, beforeEach } from 'vitest';
import ProgressiveImage from './ProgressiveImage';

// Мокаем imageService
vi.mock('@services', () => ({
  imageService: {
    status$: {
      get: vi.fn().mockReturnValue('loading'),
      set: vi.fn()
    },
    retryCount$: {
      get: vi.fn().mockReturnValue(0),
      set: vi.fn()
    },
    loadImage: vi.fn().mockResolvedValue({})
  }
}));

// Мокаем errorService
vi.mock('@services/error.service', () => ({
  errorService: {
    handleError: vi.fn()
  }
}));

// Мокаем useLazyImage
vi.mock('@hooks/useIntersectionObserver', () => ({
  useLazyImage: vi.fn().mockReturnValue({
    isIntersecting: true,
    wasIntersected: true
  })
}));

describe('ProgressiveImage', () => {
  const imageService = vi.mocked(require('@services').imageService);

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should render skeleton while loading', () => {
    imageService.status$.get.mockReturnValue('loading');
    
    render(<ProgressiveImage src="test.jpg" alt="Test" />);
    
    expect(screen.getByTestId('skeleton')).toBeInTheDocument();
    expect(imageService.loadImage).toHaveBeenCalledWith('test.jpg', false);
  });

  it('should render error message when loading fails', () => {
    imageService.status$.get.mockReturnValue('error');
    imageService.retryCount$.get.mockReturnValue(3);
    
    render(<ProgressiveImage src="test.jpg" alt="Test" />);
    
    expect(screen.getByTestId('error-message')).toBeInTheDocument();
    expect(screen.getByText('Ошибка загрузки')).toBeInTheDocument();
    expect(screen.getByText('(попыток: 3)')).toBeInTheDocument();
  });

  it('should render image when loaded', () => {
    imageService.status$.get.mockReturnValue('loaded');
    
    render(<ProgressiveImage src="test.jpg" alt="Test" />);
    
    expect(screen.getByTestId('loaded-image')).toBeInTheDocument();
    expect(screen.getByAltText('Test')).toBeInTheDocument();
  });

  it('should retry loading when retry button is clicked', () => {
    imageService.status$.get.mockReturnValue('error');
    
    render(<ProgressiveImage src="test.jpg" alt="Test" />);
    
    const retryButton = screen.getByText('Попробовать снова');
    fireEvent.click(retryButton);
    
    expect(imageService.retryCount$.set).toHaveBeenCalledWith(0);
    expect(imageService.status$.set).toHaveBeenCalledWith('loading');
    expect(imageService.loadImage).toHaveBeenCalledWith('test.jpg', true);
  });

  it('should use priority loading when specified', () => {
    imageService.status$.get.mockReturnValue('loading');
    
    render(<ProgressiveImage src="test.jpg" alt="Test" priority={true} />);
    
    expect(imageService.loadImage).toHaveBeenCalledWith('test.jpg', true);
  });
});