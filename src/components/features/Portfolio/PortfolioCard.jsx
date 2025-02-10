// src/components/features/Portfolio/PortfolioCard.jsx
import React, { useCallback } from 'react';
import { CARD_STYLES } from '@constants/styles';

/**
 * Компонент карточки портфолио
 * @param {Object} props - Свойства компонента
 * @param {Object} props.project - Данные проекта
 * @param {string} props.project.id - Уникальный идентификатор проекта
 * @param {string} props.project.image - Импортированное изображение проекта
 * @param {string} props.project.alt - Альтернативный текст для изображения
 * @param {Function} props.onClick - Обработчик клика по карточке
 */
const PortfolioCard = ({ project, onClick }) => {
  // Мемоизируем обработчик клика для предотвращения лишних ререндеров
  const handleClick = useCallback(() => {
    onClick(project.id);
  }, [onClick, project.id]);

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
        loading="lazy" // Добавляем ленивую загрузку
        decoding="async" // Асинхронное декодирование
      />
    </button>
  );
};

// Оптимизируем через React.memo с кастомной функцией сравнения
export default React.memo(PortfolioCard, (prevProps, nextProps) => {
  return prevProps.project.id === nextProps.project.id && 
         prevProps.project.image === nextProps.project.image;
});