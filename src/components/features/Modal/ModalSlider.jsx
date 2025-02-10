// src/components/features/Modal/ModalSlider.jsx
import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useObservable } from '@legendapp/state/react';
import { navigationService } from '@services';
import { SliderImage, NavigationButtons } from './components';

const ModalSlider = ({ slides }) => {
  const state = useObservable({ currentIndex: 0 });
  const [direction, setDirection] = useState(1);

  const [isAnimating, setIsAnimating] = useState(false);

  const handleNavigation = (direction) => {
    if (!isAnimating) {
      setIsAnimating(true);
      direction === 'next'
        ? navigationService.goNext()
        : navigationService.goPrev();
      setTimeout(() => setIsAnimating(false), 300);
    }
  };

  useEffect(() => {
    const sub = navigationService.state$.subscribe(({ currentIndex }) => {
      setDirection(currentIndex > state.currentIndex.get() ? 1 : -1);
      state.currentIndex.set(currentIndex);
    });
    return () => sub.unsubscribe();
  }, []);

  useEffect(() => {
    if (slides?.length > 0) {
      navigationService.setTotalSlides(slides.length);
    }
  }, [slides]);

  const currentSlide = slides?.[state.currentIndex.get()] || {};

  const variants = {
    enter: (dir) => ({
      x: dir > 0 ? '100%' : '-100%',
      opacity: 0.5,
      transition: { duration: 0.3 }
    }),
    center: {
      x: 0,
      opacity: 1,
      transition: { duration: 0.3 }
    },
    exit: (dir) => ({
      x: dir < 0 ? '100%' : '-100%',
      opacity: 0.5,
      transition: { duration: 0.3 }
    })
  };

  if (!slides?.length) return null;

  return (
    <div className="slider w-full max-w-[93.75rem] mx-auto overflow-visible group relative">
      {slides?.length > 0 && (
        <AnimatePresence initial={false} custom={direction}>
          <motion.div
            key={state.currentIndex.get()}
            custom={direction}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            layout // Добавляем автоматическую анимацию макета
            className="relative w-full"
          >
            {/* Контейнер для изображения */}
            <motion.div
              layout
              className="overflow-hidden"
            >
              <SliderImage
                src={currentSlide.image}
                index={state.currentIndex.get()}
              />
            </motion.div>

            {/* Контент для прокрутки */}
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
      )}
    </div>
  );
};

export default ModalSlider;