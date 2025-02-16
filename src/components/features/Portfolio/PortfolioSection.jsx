// src/components/features/Portfolio/PortfolioSection.jsx
import React, { useCallback } from 'react';
import { PortfolioCard } from '@features/Portfolio';
import { SECTION_STYLES } from '@constants/styles';
import { portfolioData} from '@/constants/portfolioData';

// Импортируем изображения
import rings from '@images/rings_with_circle.svg';

/**
 * Секция портфолио, отображающая сетку проектов
 * @param {Object} props - Свойства компонента
 * @param {Function} props.onCardClick - Обработчик клика по карточке
 */
const PortfolioSection = ({ onCardClick }) => {
  

  // Мемоизируем обработчик клика
  const handleCardClick = useCallback((id) => {
    onCardClick?.(id);
  }, [onCardClick]);

  return (
    <section className={SECTION_STYLES.CONTAINER}>
      <div className={SECTION_STYLES.HEADER_WRAPPER}>
        <div className={SECTION_STYLES.DECORATION}>
          <img 
            src={rings}
            alt="Декоративные кольца" 
            className={SECTION_STYLES.DECORATION_IMAGE}
            loading="eager"
          />
        </div>
        <h2 className={SECTION_STYLES.TITLE}>Портфолио</h2>
      </div>

      <div className={SECTION_STYLES.GRID}>
        {portfolioData.map((project) => (
          <PortfolioCard
            key={project.id}
            project={project}
            onClick={handleCardClick}
          />
        ))}
      </div>
    </section>
  );
};

export default React.memo(PortfolioSection);