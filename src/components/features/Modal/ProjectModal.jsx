// src/components/features/Modal/ProjectModal.jsx
import React, { useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ModalHeader } from '@features/Modal';
import { ModalSlider } from '@features/Modal';
import { modalStore } from '@stores';

const ANIMATION_VARIANTS = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: { 
    opacity: 1, 
    scale: 1,
    transition: { duration: 0.2, ease: 'easeOut' }
  },
  exit: { 
    opacity: 0, 
    scale: 0.9,
    transition: { duration: 0.15, ease: 'easeIn' }
  }
};

const ProjectModal = ({ project, onClose }) => {
  // Обработчики
  const handleClose = useCallback(() => {
    onClose();
  }, [onClose]);

  const handleKeyDown = useCallback((e) => {
    if (e.key === 'Escape') {
      handleClose();
    } else if (e.key === 'ArrowRight') {
      modalStore.nextSlide();
    } else if (e.key === 'ArrowLeft') {
      modalStore.prevSlide();
    }
  }, [handleClose]);

  // Эффекты
  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [handleKeyDown]);

  if (!project?.slides?.length) return null;

  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm"
      initial="hidden"
      animate="visible"
      exit="exit"
      variants={ANIMATION_VARIANTS}
      onClick={handleClose}
    >
      <motion.div
        className="relative w-full max-w-7xl mx-auto my-4 bg-primary border border-white/10 rounded-[1.875rem] md:rounded-[1.25rem] shadow-xl overflow-hidden"
        onClick={e => e.stopPropagation()}
        layoutId={`project-${project.id}`}
      >
        <div className="h-[90vh] overflow-y-auto modal-scrollbar">
          <div className="p-[3.75rem] md:p-[2.5rem]">
            <ModalHeader project={project} />
            <ModalSlider slides={project.slides} />
          </div>
        </div>

        {/* Кнопка закрытия */}
        <button
          onClick={handleClose}
          className="absolute top-6 right-6 p-2 rounded-full bg-white/5 hover:bg-white/10 transition-colors"
          aria-label="Закрыть"
        >
          <svg
            className="w-6 h-6 text-white"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
      </motion.div>
    </motion.div>
  );
};

export default React.memo(ProjectModal);