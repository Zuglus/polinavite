import React, { useCallback } from 'react';
import { portfolioData } from '@shared/config/portfolio-data';
import { projects } from '@shared/config/projects-data';
import { modalStore } from '@shared/model/stores/modal-store';
import PortfolioSectionView from './portfolio-section-view';

interface PortfolioSectionProps {
  onCardClick?: (id: string) => void;
}

/**
 * Контейнерный компонент для секции портфолио
 */
const PortfolioSection: React.FC<PortfolioSectionProps> = ({ onCardClick }) => {
  // Обработчик клика по карточке проекта
  const handleCardClick = useCallback((id: string) => {
    if (onCardClick) {
      onCardClick(id);
    } else {
      const project = projects.find(p => p.id === id);
      if (project) {
        modalStore.openModal(id, project);
      }
    }
  }, [onCardClick]);

  return (
    <PortfolioSectionView 
      portfolioData={portfolioData}
      onCardClick={handleCardClick}
    />
  );
};

export default React.memo(PortfolioSection);