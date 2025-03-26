// src/components/features/Portfolio/PortfolioSection.container.jsx
import React, { useCallback } from 'react';
import PortfolioSectionView from './PortfolioSection.view';
import { portfolioData } from '@/constants/portfolioData';
import { projects } from '@/constants/projectsData';
import { modalStore } from '@/stores';

/**
 * Контейнерный компонент для секции портфолио
 * Отвечает за логику работы с данными и обработку событий
 */
const PortfolioSectionContainer = () => {
  // Обработчик клика по карточке проекта
  const handleCardClick = useCallback((id) => {
    const project = projects.find(p => p.id === id);
    if (project) {
      modalStore.openModal(id, project);
    }
  }, []);

  return (
    <PortfolioSectionView 
      portfolioData={portfolioData}
      onCardClick={handleCardClick}
    />
  );
};

export default React.memo(PortfolioSectionContainer);