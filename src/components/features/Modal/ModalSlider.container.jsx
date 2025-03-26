// src/components/features/Modal/ModalSlider.container.jsx
import React, { useState, useEffect } from 'react';
import { observer } from '@legendapp/state/react';
import { navigationStore } from '@/stores/navigationStore';
import ModalSliderView from './ModalSlider.view';
import { imageService } from '@/services';

/**
 * Контейнерный компонент для слайдера в модальном окне
 * Отвечает за логику работы с данными и обработку событий
 * @param {Object} props - Свойства компонента
 * @param {Array} props.slides - Данные слайдов
 */
const ModalSliderContainer = observer(({ slides }) => {
  const currentIndex = navigationStore.useCurrentSlide();
  const direction = navigationStore.useDirection();
  const [isLoading, setIsLoading] = useState(true);

  // Предзагрузка всех изображений при монтировании компонента
  useEffect(() => {
    if (slides?.length > 0) {
      navigationStore.setTotalSlides(slides.length);
      
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
      navigationStore.reset();
    };
  }, [slides]);

  const handleNavigation = (direction) => {
    if (!isLoading) {
      direction === 'next' 
        ? navigationStore.nextSlide()
        : navigationStore.prevSlide();
    }
  };

  if (!slides?.length) return null;

  const currentSlide = slides[currentIndex] || {};

  return (
    <ModalSliderView 
      currentSlide={currentSlide}
      currentIndex={currentIndex}
      direction={direction}
      isLoading={isLoading}
      onNavigate={handleNavigation}
    />
  );
});

export default ModalSliderContainer;