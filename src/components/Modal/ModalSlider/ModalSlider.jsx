import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useImageDimensions, useDeviceDetection, useImageRotation } from './hooks';
import { SliderImage, NavigationButtons, FullscreenImage } from './components';

function ModalSlider({ slides, sliderControls }) {
  const { currentIndex, onPrev, onNext } = sliderControls;
  const currentSlide = slides[currentIndex];
  const [isFullscreen, setIsFullscreen] = useState(false);
  
  const isTouchDevice = useDeviceDetection();
  const { naturalDimensions, calculateOptimalDimensions, loadImageDimensions } = useImageDimensions();
  const { rotation, setRotation, determineOptimalRotation } = useImageRotation(isTouchDevice);

  const handleImageClick = (e) => {
    e.stopPropagation();
    setIsFullscreen(true);
    loadImageDimensions(currentSlide.image);
  };

  const handleClose = () => {
    setIsFullscreen(false);
    setRotation(0);
  };

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
            <SliderImage
              src={currentSlide.image}
              index={currentIndex}
              onClick={handleImageClick}
              isTouchDevice={isTouchDevice}
            />
            <NavigationButtons onPrev={onPrev} onNext={onNext} />

            <div className="font-onest text-[3.28125rem] md:text-[1.25rem] space-y-4">
              <p>
                <span className="font-semibold">Задача:</span>{' '}
                <span className="opacity-80">{currentSlide.task}</span>
              </p>
              <p>
                <span className="font-semibold">Решение:</span>{' '}
                <span className="opacity-80">{currentSlide.solution}</span>
              </p>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>

      <AnimatePresence>
        {isFullscreen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] bg-black/90 flex items-center justify-center"
            onClick={handleClose}
          >
            <motion.div
              className="relative flex items-center justify-center"
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
              onClick={(e) => e.stopPropagation()}
            >
              <FullscreenImage
                src={currentSlide.image}
                alt={`Slide ${currentIndex + 1}`}
                isTouchDevice={isTouchDevice}
                dimensions={calculateOptimalDimensions()}
                rotation={rotation}
                onClose={handleClose}
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default ModalSlider;