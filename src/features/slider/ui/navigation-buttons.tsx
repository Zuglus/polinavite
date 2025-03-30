import React from 'react';

export interface NavigationButtonsProps {
  /**
   * Функция навигации между слайдами
   * @param direction Направление навигации ('next' или 'prev')
   */
  onNavigate: (direction: 'next' | 'prev') => void;
  
  /**
   * Флаг блокировки кнопок (например, во время загрузки)
   */
  disabled?: boolean;
}

/**
 * Компонент с кнопками навигации для слайдера
 */
const NavigationButtons: React.FC<NavigationButtonsProps> = ({ 
  onNavigate, 
  disabled = false 
}) => {
  // Базовые стили для кнопок
  const baseButtonStyle = `
    border transition-all duration-300 rounded-full 
    flex items-center justify-center 
    text-7xl w-[5rem] h-[5rem] 
    border-white/20 
    md:w-[3rem] md:h-[3rem] md:text-5xl
  `;

  // Стили в зависимости от состояния
  const enabledStyles = "hover:bg-white hover:text-[#3624A6] cursor-pointer active:scale-95 transform";
  const disabledStyles = "opacity-50 cursor-not-allowed";

  // Итоговые стили
  const buttonStyle = `${baseButtonStyle} ${disabled ? disabledStyles : enabledStyles}`;

  return (
    <div className="flex justify-center space-x-6 my-6">
      {/* Кнопка "Предыдущий" */}
      <button
        onClick={() => !disabled && onNavigate('prev')}
        className={buttonStyle}
        aria-label="Предыдущий слайд"
        disabled={disabled}
        data-testid="prev-slide-button"
      >
        &larr;
      </button>

      {/* Кнопка "Следующий" */}
      <button
        onClick={() => !disabled && onNavigate('next')}
        className={buttonStyle}
        aria-label="Следующий слайд"
        disabled={disabled}
        data-testid="next-slide-button"
      >
        &rarr;
      </button>
    </div>
  );
};

export default React.memo(NavigationButtons);