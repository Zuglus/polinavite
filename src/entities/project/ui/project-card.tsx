import React, { useCallback } from 'react';
import { CARD_STYLES } from '@shared/config/styles';
import { ProgressiveImage } from '@shared/ui';
import { PortfolioItem } from '@shared/model/types';

interface ProjectCardProps {
  /**
   * Данные проекта
   */
  project: PortfolioItem;
  
  /**
   * Обработчик клика по карточке
   */
  onClick: (id: string) => void;
}

/**
 * Компонент карточки проекта в портфолио
 */
const ProjectCard: React.FC<ProjectCardProps> = ({ project, onClick }) => {
  const handleClick = useCallback(() => {
    onClick(project.id);
  }, [onClick, project.id]);

  return (
    <button
      type="button"
      className={CARD_STYLES.CONTAINER}
      onClick={handleClick}
      aria-label={`Открыть проект: ${project.alt}`}
      data-testid="portfolio-card"
    >
      <ProgressiveImage 
        src={project.image} 
        alt={project.alt} 
        className={CARD_STYLES.IMAGE}
      />
    </button>
  );
};

export default React.memo(ProjectCard, (prevProps, nextProps) => {
  return prevProps.project.id === nextProps.project.id && 
         prevProps.project.image === nextProps.project.image;
});