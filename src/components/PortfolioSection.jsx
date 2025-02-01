import React from 'react';
import PortfolioCard from './PortfolioCard';
import rings from '@images/rings_with_circle.svg';
import { SECTION_STYLES } from '@constants/styles';

import nitiImage from '@images/threads.png';
import codeImage from '@images/code.png';
import dayImage from '@images/day.png';
import presentationImage from '@images/presentation.png';

const projectsData = [
  { id: 'project1', image: nitiImage, alt: "НИТИ" },
  { id: 'project2', image: codeImage, alt: "КОДИИМ" },
  { id: 'project3', image: dayImage, alt: "День физики" },
  { id: 'project4', image: presentationImage, alt: "Дизайн презентаций" },
];

const PortfolioSection = ({ onCardClick }) => {

  const handleCardClick = (id) => {
    onCardClick?.(id);
  };

  return (
    <section className={SECTION_STYLES.CONTAINER}>
      <div className={SECTION_STYLES.HEADER_WRAPPER}>
        <div className={SECTION_STYLES.DECORATION}>
          <img 
            src={rings} 
            alt="Декоративные кольца" 
            className={SECTION_STYLES.DECORATION_IMAGE} 
          />
        </div>
        <h2 className={SECTION_STYLES.TITLE}>Портфолио</h2>
      </div>

      <div className={SECTION_STYLES.GRID}>
        {projectsData.map((project) => (
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