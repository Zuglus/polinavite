// src/shared/api/navigation/navigation.service.ts
/**
 * Сервис для управления навигацией по слайдам
 * @namespace
 */
import { observable, ObservableObject } from '@legendapp/state';
import { enableReactTracking } from "@legendapp/state/config/enableReactTracking";
import { INavigationService } from '@shared/model/service-types';

// Включаем отслеживание для React
enableReactTracking({
  auto: true,
});

interface NavigationState {
  currentSlideIndex: number;
  totalSlides: number;
  direction: 'left' | 'right' | 'none';
}

export class NavigationService implements INavigationService {
  private state: ObservableObject<NavigationState>;

  constructor() {
    this.state = observable<NavigationState>({
      currentSlideIndex: 0,
      totalSlides: 0,
      direction: 'none'
    });
  }

  /**
   * Устанавливает общее количество слайдов
   * @param {number} total - Количество слайдов
   */
  setTotalSlides(total: number): void {
    this.state.totalSlides.set(total);
  }

  /**
   * Переключает на следующий слайд
   */
  nextSlide(): void {
    const currentIndex = this.state.currentSlideIndex.get();
    const totalSlides = this.state.totalSlides.get();
    
    this.state.direction.set('right');
    
    if (currentIndex < totalSlides - 1) {
      this.state.currentSlideIndex.set(currentIndex + 1);
    } else {
      // Циклический переход к первому слайду
      this.state.currentSlideIndex.set(0);
    }
  }

  /**
   * Переключает на предыдущий слайд
   */
  prevSlide(): void {
    const currentIndex = this.state.currentSlideIndex.get();
    const totalSlides = this.state.totalSlides.get();
    
    this.state.direction.set('left');
    
    if (currentIndex > 0) {
      this.state.currentSlideIndex.set(currentIndex - 1);
    } else {
      // Циклический переход к последнему слайду
      this.state.currentSlideIndex.set(totalSlides - 1);
    }
  }

  /**
   * Сбрасывает навигацию в начальное состояние
   */
  reset(): void {
    this.state.currentSlideIndex.set(0);
    this.state.totalSlides.set(0);
    this.state.direction.set('none');
  }

  /**
   * Получает текущий индекс слайда
   * @returns {number} Индекс текущего слайда
   */
  useCurrentSlide(): number {
    return this.state.currentSlideIndex.get();
  }

  /**
   * Получает общее количество слайдов
   * @returns {number} Общее количество слайдов
   */
  useTotalSlides(): number {
    return this.state.totalSlides.get();
  }

  /**
   * Получает текущее направление навигации
   * @returns {string} Направление навигации ('left', 'right', 'none')
   */
  useDirection(): 'left' | 'right' | 'none' {
    return this.state.direction.get();
  }
}

export const navigationService = new NavigationService();