import React, { useEffect, useCallback } from 'react';
import ProjectModalView from './project-modal-view';
import { modalStore } from '@shared/model/stores';
import { Project } from '@shared/model/types';

interface ProjectModalProps {
  /**
   * Проект для отображения в модальном окне
   */
  project: Project;
  
  /**
   * Обработчик закрытия модального окна
   */
  onClose: () => void;
}

/**
 * Контейнерный компонент для модального окна проекта
 * Отвечает за логику работы с данными и обработку событий
 */
const ProjectModal: React.FC<ProjectModalProps> = ({ project, onClose }) => {
  const handleClose = useCallback(() => {
    onClose();
  }, [onClose]);

  const handleKeyDown = useCallback((e: KeyboardEvent) => {
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

export default React.memo(ProjectModal);