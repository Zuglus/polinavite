// src/components/features/Modal/ProjectModal.container.jsx
import React, { useEffect, useCallback } from 'react';
import ProjectModalView from './ProjectModal.view';
import { modalStore } from '@stores';

/**
 * Контейнерный компонент для модального окна проекта
 * Отвечает за логику работы с данными и обработку событий
 * @param {Object} props - Свойства компонента
 * @param {Object} props.project - Данные проекта
 * @param {Function} props.onClose - Функция закрытия модального окна
 */
const ProjectModalContainer = ({ project, onClose }) => {
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
    <ProjectModalView 
      project={project} 
      onClose={handleClose}
    />
  );
};

export default React.memo(ProjectModalContainer);