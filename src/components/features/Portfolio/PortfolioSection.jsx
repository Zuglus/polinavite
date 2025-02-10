// src/components/features/Portfolio/PortfolioSection.jsx
import React, { useCallback } from 'react';
import { PortfolioCard } from '@features/Portfolio';
import { SECTION_STYLES } from '@constants/styles';
import { useObservable } from '@legendapp/state/react';

// Импортируем изображения
import rings from '@images/rings_with_circle.svg';
import nitiImage from '@images/threads.png';
import codeImage from '@images/code.png';
import fizicsImage from '@images/day.png';
import presentationImage from '@images/presentation.png';

/**
 * Секция портфолио, отображающая сетку проектов
 * @param {Object} props - Свойства компонента
 * @param {Function} props.onCardClick - Обработчик клика по карточке
 */
const PortfolioSection = ({ onCardClick }) => {
  // Используем observable состояние для проектов
  const state = useObservable({
    projects: [
      { id: 'project1', image: nitiImage, alt: "НИТИ" },
      { id: 'project2', image: codeImage, alt: "КОДИИМ" },
      { id: 'project3', image: fizicsImage, alt: "День физики" },
      { id: 'project4', image: presentationImage, alt: "Дизайн презентаций" },
    ]
  });

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
            loading="eager" // Важное изображение загружаем сразу
          />
        </div>
        <h2 className={SECTION_STYLES.TITLE}>Портфолио</h2>
      </div>

      <div className={SECTION_STYLES.GRID}>
        {state.projects.get().map((project) => (
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