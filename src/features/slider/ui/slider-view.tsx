import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { SliderImage, NavigationButtons } from '@features/slider';
import { Slide } from '@shared/model/types';

interface SliderViewProps {
  /**
   * Текущий слайд
   */
  currentSlide: Slide;
  
  /**
   * Индекс текущего слайда
   */
  currentIndex: number;
  
  /**
   * Направление анимации
   */
  direction: 'left' | 'right' | 'none';
  
  /**
   * Флаг загрузки
   */
  isLoading: boolean;
  
  /**
   * Обработчик навигации
   */
  onNavigate: (direction: 'next' | 'prev') => void;
}

/**
 * Презентационный компонент для слайдера
 */
const SliderView: React.FC<SliderViewProps> = ({ 
  currentSlide, 
  currentIndex, 
  direction,
  isLoading,
  onNavigate
}) => {
  const variants = {
    enter: (direction: string) => ({
      x: direction === 'right' ? 1000 : -1000,
      opacity: 0
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1
    },
    exit: (direction: string) => ({
      zIndex: 0,
      x: direction === 'right' ? -1000 : 1000,
      opacity: 0
    })
  };

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
              onNavigate={onNavigate}
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
};

export default React.memo(SliderView);