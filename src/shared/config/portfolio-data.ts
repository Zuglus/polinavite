import { PortfolioItem } from '@shared/model/types';

// Импортируем изображения обложек
import nitiImage from '@app/assets/images/threads.png';
import codeImage from '@app/assets/images/code.png';
import fizicsImage from '@app/assets/images/day.png';
import presentationImage from '@app/assets/images/presentation.png';

/**
 * Данные для отображения карточек портфолио
 */
export const portfolioData: PortfolioItem[] = [
  { id: 'project1', image: nitiImage, alt: "НИТИ" },
  { id: 'project2', image: codeImage, alt: "КОДИИМ" },
  { id: 'project3', image: fizicsImage, alt: "День физики" },
  { id: 'project4', image: presentationImage, alt: "Дизайн презентаций" },
];