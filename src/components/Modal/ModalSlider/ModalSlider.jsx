import React, { useState, useMemo, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  useImageDimensions,
  useDeviceDetection,
  useImageRotation
} from '../../../hooks';
import { SliderImage, NavigationButtons, FullscreenImage } from './components';

function ModalSlider({ slides, sliderControls }) {
  const { currentIndex, onPrev, onNext } = sliderControls;
  const currentSlide = slides[currentIndex] || {};
  const [isFullscreen, setIsFullscreen] = useState(false);

  const isTouchDevice = useDeviceDetection();
  const { naturalDimensions, calculateOptimalDimensions, loadImageDimensions } = useImageDimensions();
  const { rotation, setRotation, determineOptimalRotation } = useImageRotation(isTouchDevice);

  useEffect(() => {
    if (currentSlide?.image) {
      loadImageDimensions(currentSlide.image);
    }
  }, [currentSlide?.image]);

  const handleImageClick = (e) => {
    e.stopPropagation();
    setIsFullscreen(true);
  };

  const handleClose = () => {
    setIsFullscreen(false);
    setRotation(0);
  };

  const optimizedDimensions = useMemo(() =>
    calculateOptimalDimensions(),
    [naturalDimensions]
  );

  return (
    <div className="slider w-full max-w-[93.75rem] mx-auto overflow-hidden group">
      <AnimatePresence mode="wait">
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
              dimensions={optimizedDimensions}
            />

            <NavigationButtons onPrev={onPrev} onNext={onNext} />

            <div className="font-onest text-[3.28125rem] md:text-[1.25rem] space-y-4">
              <p>
                <span className="font-semibold">Задача:</span>
                <span className="opacity-80">{currentSlide.task}</span>
              </p>
              <p>
                <span className="font-semibold">Решение:</span>
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
            className="fixed inset-0 z-[60] flex items-center justify-center"
            onClick={handleClose}
          >
            <FullscreenImage
              src={currentSlide.image}
              alt={`Slide ${currentIndex + 1}`}
              dimensions={naturalDimensions}
              rotation={rotation}
              onClose={handleClose}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default ModalSlider;