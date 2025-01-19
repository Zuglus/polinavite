import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ZoomIn } from 'lucide-react';

function ModalSlider({ slides, sliderControls }) {
  const { currentIndex, onPrev, onNext } = sliderControls;
  const currentSlide = slides[currentIndex];
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isTouchDevice, setIsTouchDevice] = useState(false);
  const [rotation, setRotation] = useState(0);
  const [naturalDimensions, setNaturalDimensions] = useState({ width: 0, height: 0 });
  const imageRef = useRef(null);

  useEffect(() => {
    const checkIfTouchDevice = () => {
      const isTouchEnabled = 'ontouchstart' in window || 
        navigator.maxTouchPoints > 0 ||
        navigator.msMaxTouchPoints > 0;
      setIsTouchDevice(isTouchEnabled);
    };

    checkIfTouchDevice();
  }, []);

  const determineOptimalRotation = (naturalWidth, naturalHeight) => {
    if (!isTouchDevice) return; // Поворачиваем только на тачскринах

    const screenWidth = window.innerWidth;
    const screenHeight = window.innerHeight;
    
    // Для вертикальных изображений не поворачиваем
    if (naturalHeight > naturalWidth) {
      setRotation(0);
      return;
    }

    // Для горизонтальных изображений на вертикальном экране - поворачиваем
    if (naturalWidth > naturalHeight && screenHeight > screenWidth) {
      setRotation(90);
    } else {
      setRotation(0);
    }
  };

  const handleImageClick = async (e) => {
    e.stopPropagation();
    if (isTouchDevice) {
      setIsFullscreen(true);
      
      const img = new Image();
      img.src = currentSlide.image;
      img.onload = () => {
        setNaturalDimensions({ width: img.naturalWidth, height: img.naturalHeight });
        determineOptimalRotation(img.naturalWidth, img.naturalHeight);
      };
    }
  };

  const handleClose = () => {
    setIsFullscreen(false);
    setRotation(0);
  };

  const getOptimalDimensions = () => {
    const bodyWidth = document.body.clientWidth;
    const bodyHeight = document.body.clientHeight;
    
    // Учитываем небольшой отступ от краев
    const availableWidth = bodyWidth - 40; // 20px с каждой стороны
    const availableHeight = bodyHeight - 40;

    let maxWidth, maxHeight;

    if (rotation === 90) {
      // При повороте меняем местами ширину и высоту
      const effectiveNaturalWidth = naturalDimensions.height;
      const effectiveNaturalHeight = naturalDimensions.width;

      // Пробуем подогнать по ширине (которая при повороте стала высотой)
      let scale = availableHeight / effectiveNaturalWidth;
      maxWidth = `${Math.min(availableHeight, effectiveNaturalWidth)}px`;
      maxHeight = `${Math.min(availableWidth, effectiveNaturalHeight)}px`;
    } else {
      // Пробуем подогнать по ширине
      let scale = availableWidth / naturalDimensions.width;
      maxWidth = `${availableWidth}px`;
      let scaledHeight = naturalDimensions.height * scale;
      
      // Если высота после масштабирования больше доступной, подгоняем по высоте
      if (scaledHeight > availableHeight) {
        scale = availableHeight / naturalDimensions.height;
        scaledHeight = availableHeight;
        maxWidth = `${naturalDimensions.width * scale}px`;
      }
      
      maxHeight = `${scaledHeight}px`;
    }

    return { maxWidth, maxHeight };
  };

  const SliderImage = () => (
    <div 
      onClick={handleImageClick}
      className={`relative rounded-[1.25rem] mb-4 group/image ${
        !isTouchDevice ? 'cursor-zoom-in' : ''
      }`}
    >
      <img
        ref={imageRef}
        src={currentSlide.image}
        alt={`Slide ${currentIndex + 1}`}
        className="w-full object-cover rounded-[1.25rem]"
      />
      <div className={`absolute inset-0 flex items-center justify-center
        ${isTouchDevice ? 'opacity-30' : 'opacity-0 group-hover/image:opacity-30'} 
        transition-opacity duration-300`}>
        <ZoomIn className={`${isTouchDevice ? 'w-32 h-32 md:w-24 md:h-24' : 'w-16 h-16'} text-white`} strokeWidth={1} />
      </div>
    </div>
  );

  const NavigationButtons = () => (
    <div className="flex justify-center space-x-6 mb-6 text-white font-onest font-thin text-[3.28125rem] md:text-[2.1875rem]">
      <button
        onClick={onPrev}
        aria-label="Предыдущий слайд"
        className="border border-white/10 text-9xl md:text-4xl hover:bg-white hover:text-[#3624A6] hover:font-normal rounded-full w-[10rem] md:w-[2.5rem] h-[10rem] md:h-[2.5rem] flex items-center justify-center transition-colors duration-300"
      >
        &larr;
      </button>
      <button
        onClick={onNext}
        aria-label="Следующий слайд"
        className="border border-white/10 text-9xl md:text-4xl hover:bg-white hover:text-[#3624A6] hover:font-normal rounded-full w-[10rem] md:w-[2.5rem] h-[10rem] md:h-[2.5rem] flex items-center justify-center transition-colors duration-300"
      >
        &rarr;
      </button>
    </div>
  );

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
            <SliderImage />
            <NavigationButtons />

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
              {!isTouchDevice ? (
                // Версия для десктопа
                <div>
                  <img
                    src={currentSlide.image}
                    alt={`Slide ${currentIndex + 1}`}
                    className="max-w-[90vw] max-h-[90vh] object-contain hover:scale-150 transition-transform duration-300"
                  />
                  <button
                    onClick={handleClose}
                    className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-md flex items-center justify-center transition-colors duration-300"
                    aria-label="Закрыть"
                  >
                    <X className="w-5 h-5 text-white" />
                  </button>
                </div>
              ) : (
                // Версия для мобильных
                <div className="w-screen h-screen flex items-center justify-center">
                  <div 
                    className="relative flex items-center justify-center w-full h-full"
                    style={{
                      transform: `rotate(${rotation}deg)`,
                      width: rotation === 90 ? '100vh' : '100vw',
                      height: rotation === 90 ? '100vw' : '100vh',
                      transition: 'transform 0.3s ease-in-out'
                    }}
                  >
                    <img
                      src={currentSlide.image}
                      alt={`Slide ${currentIndex + 1}`}
                      className="w-full h-full object-contain"
                    />
                    <div
                      className="absolute w-full h-full"
                      style={{
                        transform: `rotate(-${rotation}deg)`,
                        transformOrigin: 'center center'
                      }}
                    >
                      <button
                        onClick={handleClose}
                        className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-md flex items-center justify-center transition-colors duration-300"
                        aria-label="Закрыть"
                      >
                        <X className="w-5 h-5 text-white" />
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default ModalSlider;