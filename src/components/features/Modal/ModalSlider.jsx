// src/components/features/Modal/ModalSlider.jsx
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { observer } from '@legendapp/state/react';
import { navigationStore } from '@/stores/navigationStore';
import { SliderImage, NavigationButtons } from './components';
import { imageService } from '@/services';

const ModalSlider = observer(({ slides }) => {
  const currentIndex = navigationStore.useCurrentSlide();
  const direction = navigationStore.useDirection();
  const [isLoading, setIsLoading] = useState(true);

  // Предзагрузка всех изображений при монтировании компонента
  React.useEffect(() => {
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

  const variants = {
    enter: (direction) => ({
      x: direction === 'right' ? 1000 : -1000,
      opacity: 0
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1
    },
    exit: (direction) => ({
      zIndex: 0,
      x: direction === 'right' ? -1000 : 1000,
      opacity: 0
    })
  };

  const currentSlide = slides[currentIndex] || {};

  return (
    <div className="slider w-full max-w-[93.75rem] mx-auto overflow-hidden group relative">
      {isLoading && (
        <div className="absolute inset-0 z-50 flex items-center justify-center bg-primary/80">
          <div className="text-white/80 text-xl">Загрузка изображений...</div>
        </div>
      )}
      
      <AnimatePresence 
        initial={false} 
        mode="wait" 
        custom={direction}
      >
        <motion.div
          key={currentIndex}
          custom={direction}
          variants={variants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{
            x: { type: "spring", stiffness: 300, damping: 30 },
            opacity: { duration: 0.2 }
          }}
          className="relative w-full"
        >
          {/* Контейнер для изображения */}
          <div className="overflow-hidden">
            <SliderImage
              src={currentSlide.image}
              index={currentIndex}
              priority={true}
            />
          </div>

          {/* Контент */}
          <div className="px-8 pb-8">
            <NavigationButtons 
              onNavigate={handleNavigation}
              disabled={isLoading}
            />

            <div className="font-onest text-[3.28125rem] md:text-[1.25rem] space-y-4">
              {currentSlide.task && (
                <p>
                  <span className="font-semibold">Задача: </span>
                  <span className="opacity-80">{currentSlide.task}</span>
                </p>
              )}
              {currentSlide.solution && (
                <p>
                  <span className="font-semibold">Решение: </span>
                  <span className="opacity-80">{currentSlide.solution}</span>
                </p>
              )}
            </div>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
});

export default ModalSlider;