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
   */
  export interface Observable<T> {
    get(): T;
    set(value: T): void;
    subscribe(callback: (value: T) => void): Subscription;
  }
  
  /**
   * Интерфейс для подписки на observable
   */
  export interface Subscription {
    unsubscribe(): void;
  }
  
  /**
   * Интерфейс для сервиса изображений
   */
  export interface ImageService {
    status$: Observable<ImageLoadStatus>;
    retryCount$: Observable<number>;
    loadImage(src: string, priority?: boolean): Promise<HTMLImageElement>;
    preloadImages(
      sources: string[], 
      options?: { concurrency?: number; priority?: boolean }
    ): Promise<HTMLImageElement[]>;
    clearCache(preserveCritical?: boolean): void;
  }
  
  /**
   * Интерфейс для хранилища навигации
   */
  export interface NavigationStore {
    useCurrentSlide(): number;
    useTotalSlides(): number;
    useDirection(): string;
    setTotalSlides(total: number): void;
    nextSlide(): void;
    prevSlide(): void;
    reset(): void;
  }
  
  /**
   * Интерфейс для хранилища модального окна
   */
  export interface ModalStore {
    useIsOpen(): boolean;
    useCurrentProject(): Project | null;
    useCurrentSlide(): number;
    openModal(id: string, project: Project): void;
    closeModal(): void;
    setSlide(index: number): void;
    nextSlide(): void;
    prevSlide(): void;
  }