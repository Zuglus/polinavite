import React from 'react';
import { CARD_STYLES } from '@constants/styles';

const PortfolioCard = ({ project, onClick }) => {
  return (
    <button
      type="button"
      className={CARD_STYLES.CONTAINER}
      onClick={onClick}
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