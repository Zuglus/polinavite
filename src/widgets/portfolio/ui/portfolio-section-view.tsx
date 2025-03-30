import React from 'react';
import { ProjectCard } from '@entities/project';
import { SECTION_STYLES } from '@shared/config/styles';
import { PortfolioItem } from '@shared/model/types';
import ringsImage from '@app/assets/images/rings_with_circle.svg';

interface PortfolioSectionViewProps {
  portfolioData: PortfolioItem[];
  onCardClick: (id: string) => void;
}

/**
 * Презентационный компонент для секции портфолио
 */
const PortfolioSectionView: React.FC<PortfolioSectionViewProps> = ({ 
  portfolioData, 
  onCardClick 
}) => {
  // Используем заглушку для изображения вместо импорта

  return (
    <section className={SECTION_STYLES.CONTAINER}>
      <div className={SECTION_STYLES.HEADER_WRAPPER}>
        <div className={SECTION_STYLES.DECORATION}>
          <img 
            src={ringsImage}
            alt="Декоративные кольца" 
            className={SECTION_STYLES.DECORATION_IMAGE}
            loading="eager"
          />
        </div>
        <h2 className={SECTION_STYLES.TITLE}>Портфолио</h2>
      </div>

      <div className={SECTION_STYLES.GRID}>
        {portfolioData.map((project) => (
          <ProjectCard
            key={project.id}
            project={project}
            onClick={onCardClick}
          />
        ))}
      </div>
    </section>
  );
};

export default React.memo(PortfolioSectionView);