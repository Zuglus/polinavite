// src/components/features/Portfolio/PortfolioSection.view.jsx
import React from 'react';
import { PortfolioCard } from '@features/Portfolio';
import { SECTION_STYLES } from '@constants/styles';

// Импортируем изображения
import rings from '@images/rings_with_circle.svg';

/**
 * Презентационный компонент для секции портфолио
 * Отвечает только за отображение данных
 * @param {Object} props - Свойства компонента 
 * @param {Array} props.portfolioData - Данные проектов для отображения
 * @param {Function} props.onCardClick - Обработчик клика по карточке
 */
const PortfolioSectionView = ({ portfolioData, onCardClick }) => {
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
            onClick={onCardClick}
          />
        ))}
      </div>
    </section>
  );
};

export default React.memo(PortfolioSectionView);