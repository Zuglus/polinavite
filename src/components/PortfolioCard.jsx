import React from 'react';
import { CARD_STYLES } from '@constants/styles';

const PortfolioCard = ({ project, onClick }) => {
  const handleClick = () => {
    onClick(project.id);
  };

  return (
    <button
      type="button"
      className={CARD_STYLES.CONTAINER}
      onClick={handleClick}
      aria-label={`Открыть проект: ${project.alt}`}
    >
      <img 
        src={project.image} 
        alt={project.alt} 
        className={CARD_STYLES.IMAGE} 
      />
    </button>
  );
};

export default React.memo(PortfolioCard);