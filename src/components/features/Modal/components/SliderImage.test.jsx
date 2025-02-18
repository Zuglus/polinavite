import React from 'react';
import { render, screen } from '@testing-library/react';
import SliderImage from './SliderImage';
import { imageService } from '@services';

// Мок для imageService
jest.mock('@services', () => ({
  imageService: {
    status$: {
      get: jest.fn()
    },
    retryCount$: {
      get: jest.fn()
    },
    loadImage: jest.fn()
  }
}));

describe('SliderImage', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('показывает Skeleton при загрузке', () => {
    imageService.status$.get.mockReturnValue('loading');
    
    render(<SliderImage src="test.jpg" alt="test" />);
    
    expect(screen.getByTestId('skeleton')).toBeInTheDocument();
  });

  test('показывает сообщение об ошибке при неудачной загрузке', () => {
    imageService.status$.get.mockReturnValue('error');
    imageService.retryCount$.get.mockReturnValue(3);
    
    render(<SliderImage src="test.jpg" alt="test" />);
    
    expect(screen.getByText(/Ошибка загрузки/)).toBeInTheDocument();
    expect(screen.getByText(/попыток: 3/)).toBeInTheDocument();
  });

  test('показывает изображение после успешной загрузки', () => {
    imageService.status$.get.mockReturnValue('loaded');
    
    render(<SliderImage src="test.jpg" alt="test" />);
    
    const img = screen.getByAltText('test');
    expect(img).toBeInTheDocument();
    expect(img).toHaveAttribute('src', 'test.jpg');
    expect(img).toHaveAttribute('loading', 'lazy');
  });

  test('использует eager loading при priority=true', () => {
    imageService.status$.get.mockReturnValue('loaded');
    
    render(<SliderImage src="test.jpg" alt="test" priority={true} />);
    
    const img = screen.getByAltText('test');
    expect(img).toHaveAttribute('loading', 'eager');
  });
});