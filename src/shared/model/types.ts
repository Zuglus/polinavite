// src/types/index.ts
/**
 * Интерфейс проекта
 */
export interface Project {
  id: string;
  title: string;
  description: string;
  audience: string;
  slides: Slide[];
}

/**
 * Интерфейс слайда в проекте
 */
export interface Slide {
  image: string;
  task?: string;
  solution?: string;
}

/**
 * Интерфейс элемента портфолио
 */
export interface PortfolioItem {
  id: string;
  image: string;
  alt: string;
}

/**
 * Интерфейс опыта работы
 */
export interface Experience {
  year: string;
  company: string;
  position: string;
  duties: string[];
  circleImage?: string;
}

/**
 * Статус загрузки изображения
 */
export type ImageLoadStatus = 'init' | 'loading' | 'retrying' | 'loaded' | 'error';

/**
 * Интерфейс для observable значения
 * Подстраиваем под реализацию @legendapp/state
 */
export interface Observable<T> {
  get(): T;
  set(value: T | ((prev: T) => T)): void;
}

/**
 * Интерфейс для подписки на observable
 */
export interface Subscription {
  unsubscribe(): void;
}

/**
 * Направление навигации для анимаций
 */
export type NavigationDirection = 'left' | 'right' | 'none';

/**
 * Интерфейс для свойств слайдера
 */
export interface SliderProps {
  slides: Slide[];
  onNavigate?: (direction: 'next' | 'prev') => void;
  autoplay?: boolean;
  autoplayInterval?: number;
  loop?: boolean;
}

/**
 * Интерфейс для свойств модального окна проекта
 */
export interface ProjectModalProps {
  project: Project;
  onClose: () => void;
}

/**
 * Интерфейс для компонента заголовка модального окна
 */
export interface ModalHeaderProps {
  project: Project;
}

/**
 * Интерфейс для кнопок навигации
 */
export interface NavigationButtonsProps {
  onNavigate: (direction: 'next' | 'prev') => void;
  disabled?: boolean;
}

/**
 * Интерфейс для компонента карточки портфолио
 */
export interface PortfolioCardProps {
  project: PortfolioItem;
  onClick: (id: string) => void;
}

/**
 * Интерфейс для ошибок
 */
export interface ErrorInfo {
  componentStack: string;
}

/**
 * Варианты анимации компонентов
 */
export type AnimationVariant = {
  [key: string]: object;
};