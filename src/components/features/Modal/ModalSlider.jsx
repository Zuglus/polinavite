// src/components/features/Modal/ModalSlider.jsx
import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { observer } from '@legendapp/state/react';
import { navigationStore } from '@/stores/navigationStore';
import { SliderImage, NavigationButtons } from './components';

const ModalSlider = observer(({ slides }) => {
  const currentIndex = navigationStore.useCurrentSlide();

  React.useEffect(() => {
    if (slides?.length > 0) {
      navigationStore.setTotalSlides(slides.length);
    }
    return () => navigationStore.reset();
  }, [slides]);

  const handleNavigation = (direction) => {
    direction === 'next' 
      ? navigationStore.nextSlide()
      : navigationStore.prevSlide();
  };

  if (!slides?.length) return null;

  const currentSlide = slides[currentIndex] || {};

  return (
    <div className="slider w-full max-w-[93.75rem] mx-auto overflow-visible group relative">
      <AnimatePresence initial={false} mode="wait">
        <motion.div
          key={currentIndex}
          initial={{ opacity: 0, x: 300 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -300 }}
          className="relative w-full"
        >
          {/* Контейнер для изображения */}
          <motion.div
            layout
            className="overflow-hidden"
          >
            <SliderImage
              src={currentSlide.image}
              index={currentIndex}
            />
          </motion.div>

          {/* Контент */}
          <motion.div
            layout
            className="px-8 pb-8"
          >
            <NavigationButtons onNavigate={handleNavigation} />

            <motion.div
              layout
              className="font-onest text-[3.28125rem] md:text-[1.25rem] space-y-4"
            >
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
            </motion.div>
          </motion.div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
});

export default ModalSlider;