// src/services/navigation.service.ts
/**
 * Сервис для управления навигацией по слайдам
 * @namespace
 */
import { observable, ObservableObject } from '@legendapp/state';
import { enableReactTracking } from "@legendapp/state/config/enableReactTracking";
import { INavigationService } from '@/types/services';

// Включаем отслеживание для React
enableReactTracking({
  auto: true,
});

interface NavigationState {
  currentSlideIndex: number;
  totalSlides: number;
}

class NavigationService implements INavigationService {
  private state: ObservableObject<NavigationState>;

  constructor() {
    this.state = observable<NavigationState>({
      currentSlideIndex: 0,
      totalSlides: 0
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
   * @throws {Error} Если достигнут последний слайд
   */
  nextSlide(): void {
    const currentIndex = this.state.currentSlideIndex.get();
    const totalSlides = this.state.totalSlides.get();
    if (currentIndex < totalSlides - 1) {
      this.state.currentSlideIndex.set(currentIndex + 1);
    }
  }

  /**
   * Переключает на предыдущий слайд
   * @throws {Error} Если достигнут первый слайд
   */
  prevSlide(): void {
    const currentIndex = this.state.currentSlideIndex.get();
    if (currentIndex > 0) {
      this.state.currentSlideIndex.set(currentIndex - 1);
    }
  }

  /**
   * Сбрасывает навигацию в начальное состояние
   */
  reset(): void {
    this.state.currentSlideIndex.set(0);
    this.state.totalSlides.set(0);
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
}

export const navigationService = new NavigationService();