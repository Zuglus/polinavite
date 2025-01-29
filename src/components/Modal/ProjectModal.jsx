import React, { useRef, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import ModalSlider from '@components/Modal/ModalSlider';
import ModalHeader from '@components/Modal/ModalHeader';
import { navigationService } from '@stores/navigation.service';

// Константы для стилей
const MODAL_STYLES = {
  OVERLAY: 'fixed inset-0 z-50 flex items-center justify-center bg-[#04061B]/90',
  CONTENT: 'relative inline-block w-full max-w-[93.75rem] md:max-w-[62.5rem] my-4 bg-[#04061B] border border-white/10 rounded-[1.875rem] md:rounded-[1.25rem] shadow-xl transform transition-all duration-300 h-[90vh]',
  CLOSE_BUTTON: 'flex justify-center items-center border border-white/10 hover:border-white/20 rounded-full w-[3rem] h-[3rem] transition-all hover:rotate-90 duration-300 outline-none',
  SCROLLBAR: `
    /* Стилизация скроллбара */
    ::-webkit-scrollbar {
      width: 8px;
    }
    ::-webkit-scrollbar-track {
      background: #3624A6;
    }
    ::-webkit-scrollbar-thumb {
      background: #4A5568;
      border-radius: 4px;
    }
    ::-webkit-scrollbar-thumb:hover {
      background: #718096;
    }
  `
};

const ProjectModal = ({ project, onClose }) => {
  const modalRef = useRef(null);

  // Обработчик закрытия модалки
  const handleClose = useCallback(() => {
    onClose();
  }, [onClose]);

  // Обработчик клавиатуры
  const handleKeyDown = useCallback((e) => {
    if (e.key === 'Escape') handleClose();
  }, [handleClose]);

  // Эффекты
  useEffect(() => {
    if (project?.slides) {
      navigationService.setTotalSlides(project.slides.length);
    }

    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      navigationService.reset();
    };
  }, [project, handleKeyDown]);

  if (!project?.slides?.length) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className={MODAL_STYLES.OVERLAY}
      onClick={handleClose}
      role="dialog"
      aria-modal="true"
    >
      <div
        ref={modalRef}
        className={MODAL_STYLES.CONTENT}
        onClick={(e) => e.stopPropagation()}
        tabIndex={-1}
      >
        {/* Кнопка закрытия */}
        <div className="absolute top-[1.875rem] md:top-[1.25rem] right-[1.875rem] md:right-[1.25rem] z-50">
          <div className="bg-white/2 backdrop-blur-md rounded-full p-1">
            <button
              onClick={handleClose}
              aria-label="Закрыть модальное окно"
              className={MODAL_STYLES.CLOSE_BUTTON}
            >
              <svg
                width="21"
                height="21"
                viewBox="0 0 14 14"
                fill="none"
                className="scale-75 md:scale-100"
              >
                <path
                  d="M1 1L13 13M1 13L13 1"
                  stroke="white"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                />
              </svg>
            </button>
          </div>
        </div>

        {/* Контент */}
        <div className="h-full overflow-y-auto p-[3.75rem] md:p-[2.5rem]"
          style={{
            cssText: MODAL_STYLES.SCROLLBAR,
            scrollbarWidth: 'thin',
            scrollbarColor: '#3624A6 transparent'
          }}>
          <ModalHeader project={project} />
          <ModalSlider slides={project.slides.filter(slide => slide.image)} />
        </div>
      </div>
    </motion.div>
  );
};

export default React.memo(ProjectModal);