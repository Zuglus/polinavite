// src/constants/portfolioData.ts
import { PortfolioItem } from '../types';

// Импортируем изображения обложек
import nitiImage from '@images/threads.png';
import codeImage from '@images/code.png';
import fizicsImage from '@images/day.png';
import presentationImage from '@images/presentation.png';

export const portfolioData: PortfolioItem[] = [
  { id: 'project1', image: nitiImage, alt: "НИТИ" },
  { id: 'project2', image: codeImage, alt: "КОДИИМ" },
  { id: 'project3', image: fizicsImage, alt: "День физики" },
  { id: 'project4', image: presentationImage, alt: "Дизайн презентаций" },
];