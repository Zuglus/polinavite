import { observable } from '@legendapp/state';
import { enableReactTracking } from "@legendapp/state/config/enableReactTracking";

// Включаем отслеживание для React
enableReactTracking({
  auto: true,
});

// Состояние навигации
interface NavigationState {
  currentSlideIndex: number;
  totalSlides: number;
  direction: 'left' | 'right' | 'none';
}

// Базовый стейт
const state = observable<NavigationState>({
  currentSlideIndex: 0,
  totalSlides: 0,
  direction: 'none'
});

/**
 * Хранилище для управления навигацией по слайдам
 */
export const navigationStore = {
  // Действия
  setTotalSlides: (total: number) => {
    state.totalSlides.set(total);
  },

  nextSlide: () => {
    state.direction.set('right');
    const currentIndex = state.currentSlideIndex.get();
    const totalSlides = state.totalSlides.get();
    state.currentSlideIndex.set(
      currentIndex === totalSlides - 1 ? 0 : currentIndex + 1
    );
  },

  prevSlide: () => {
    state.direction.set('left');
    const currentIndex = state.currentSlideIndex.get();
    const totalSlides = state.totalSlides.get();
    state.currentSlideIndex.set(
      currentIndex === 0 ? totalSlides - 1 : currentIndex - 1
    );
  },

  reset: () => {
    state.currentSlideIndex.set(0);
    state.totalSlides.set(0);
    state.direction.set('none');
  },

  // Селекторы
  useCurrentSlide: () => state.currentSlideIndex.get(),
  useTotalSlides: () => state.totalSlides.get(),
  useDirection: () => state.direction.get(),
};