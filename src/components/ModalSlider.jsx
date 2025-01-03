import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

function ModalSlider({ slides, currentIndex, onPrev, onNext }) {
  const currentSlide = slides[currentIndex];

  return (
    <div className="slider w-full max-w-[93.75rem] mx-auto overflow-hidden group">
      <AnimatePresence initial={false} mode="wait">
        <motion.div
          key={currentIndex}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          <div>
            {/* --- Изображение --- */}
            <div className="rounded-[1.25rem] mb-4">
              <img
                src={currentSlide.image}
                alt={`Slide ${currentIndex + 1}`}
                className="w-full object-cover rounded-[1.25rem]"
              />
            </div>

            {/* --- Кнопки переключения (сразу под изображением) --- */}
            <div className="flex justify-center space-x-6 mb-6 text-white font-onest font-thin text-[3.28125rem] md:text-[2.1875rem]">
              <button
                onClick={onPrev}
                className="border border-white/10 text-9xl md:text-4xl hover:bg-white hover:text-[#3624A6] hover:font-normal rounded-full w-[10rem] md:w-[2.5rem] h-[10rem] md:h-[2.5rem] flex items-center justify-center transition-colors duration-300"
              >
                &larr;
              </button>
              <button
                onClick={onNext}
                className="border border-white/10 text-9xl md:text-4xl hover:bg-white hover:text-[#3624A6] hover:font-normal rounded-full w-[10rem] md:w-[2.5rem] h-[10rem] md:h-[2.5rem] flex items-center justify-center transition-colors duration-300"
              >
                &rarr;
              </button>
            </div>

            {/* --- Текст «Задача»/«Решение» --- */}
            <div className="font-onest text-[3.28125rem] md:text-[1.25rem] text-white/80 space-y-4">
              <p>
                <span className="font-semibold text-white">Задача:</span>{' '}
                {currentSlide.task}
              </p>
              <p>
                <span className="font-semibold text-white">Решение:</span>{' '}
                {currentSlide.solution}
              </p>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

export default ModalSlider;