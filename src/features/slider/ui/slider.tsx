import React, { useState, useEffect } from 'react';
import { observer } from '@legendapp/state/react';
import { navigationService } from '@shared/api';
import SliderView from './slider-view';
import { imageService } from '@shared/api';
import { Slide } from '@shared/model/types';

interface SliderProps {
  /**
   * Массив слайдов для отображения
   */
  slides: Slide[];
}

/**
 * Контейнерный компонент для слайдера
 */
const Slider = observer<SliderProps>(({ slides }) => {
  const currentIndex = navigationService.useCurrentSlide();
  const direction = navigationService.useDirection();
  const [isLoading, setIsLoading] = useState(true);

  // Предзагрузка всех изображений при монтировании компонента
  useEffect(() => {
    if (slides?.length > 0) {
      navigationService.setTotalSlides(slides.length);
      
      const imageUrls = slides.map(slide => slide.image);
      
      // Предзагружаем все изображения
      setIsLoading(true);
      imageService.preloadImages(imageUrls, { 
        concurrency: 3, // Загружаем по 3 изображения одновременно
        priority: true 
      })
      .then(() => {
        setIsLoading(false);
      })
      .catch(error => {
        console.error('Failed to preload images:', error);
        setIsLoading(false);
      });
    }

    return () => {
      navigationService.reset();
    };
  }, [slides]);

  const handleNavigation = (direction: 'next' | 'prev') => {
    if (!isLoading) {
      direction === 'next' 
        ? navigationService.nextSlide()
        : navigationService.prevSlide();
    }
  };

  if (!slides?.length) return null;

  const currentSlide = slides[currentIndex] || {};

  return (
    <SliderView 
      currentSlide={currentSlide}
      currentIndex={currentIndex}
      direction={direction}
      isLoading={isLoading}
      onNavigate={handleNavigation}
    />
  );
});

export default Slider;