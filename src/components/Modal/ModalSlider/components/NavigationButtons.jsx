import React from 'react';
import {navigationService} from '@stores/navigation.service';

const NavigationButtons = ({ onNavigate }) => {
  const buttonStyle = `border transition-colors duration-300 rounded-full flex items-center justify-center 
    text-8xl md:text-4xl w-[7rem] md:w-[2.5rem] h-[7rem] md:h-[2.5rem] 
    border-white/20 hover:bg-white hover:text-[#3624A6] cursor-pointer
    active:scale-95 transform transition-transform`;

  return (
    <div className="flex justify-center space-x-6 my-6">
      <button
        onClick={() => onNavigate('prev')}
        className={buttonStyle}
        aria-label="Предыдущий слайд"
      >
        &larr;
      </button>

      <button
        onClick={() => onNavigate('next')}
        className={buttonStyle}
        aria-label="Следующий слайд"
      >
        &rarr;
      </button>
    </div>
  );
};

export default NavigationButtons;