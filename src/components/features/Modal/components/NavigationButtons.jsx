import React from 'react';

const NavigationButtons = ({ onNavigate, disabled = false }) => {
  const baseButtonStyle = `
    border transition-all duration-300 rounded-full 
    flex items-center justify-center 
    text-7xl w-[5rem] h-[5rem] 
    border-white/20 
    md:w-[3rem] md:h-[3rem] md:text-5xl
  `;

  const enabledStyles = "hover:bg-white hover:text-[#3624A6] cursor-pointer active:scale-95 transform";
  const disabledStyles = "opacity-50 cursor-not-allowed";

  const buttonStyle = `${baseButtonStyle} ${disabled ? disabledStyles : enabledStyles}`;

  return (
    <div className="flex justify-center space-x-6 my-6">
      <button
        onClick={() => !disabled && onNavigate('prev')}
        className={buttonStyle}
        aria-label="Предыдущий слайд"
        disabled={disabled}
      >
        &larr;
      </button>

      <button
        onClick={() => !disabled && onNavigate('next')}
        className={buttonStyle}
        aria-label="Следующий слайд"
        disabled={disabled}
      >
        &rarr;
      </button>
    </div>
  );
};

export default NavigationButtons;