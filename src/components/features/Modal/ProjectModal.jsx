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

        <button
          onClick={handleClose}
          className="absolute top-6 right-6 p-4 md:p-2 rounded-full 
                     bg-black/40 backdrop-blur-sm 
                     hover:bg-black/60 
                     focus:outline-none focus:ring-2 focus:ring-white/50
                     z-50 group
                     transition-all duration-300 ease-in-out
                     shadow-lg"
          aria-label="Закрыть"
        >
          <svg
            className="w-12 h-12 md:w-6 md:h-6 text-white/80 group-hover:text-white
                       transition-colors duration-300 ease-in-out"
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