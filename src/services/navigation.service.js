// src/services/navigation.service.js
/**
 * Сервис для управления навигацией по слайдам
 * @namespace
 */
import { observable } from '@legendapp/state';
import { enableReactTracking } from "@legendapp/state/config/enableReactTracking";

// Включаем отслеживание для React
enableReactTracking({
  auto: true,
});

const state = observable({
  currentSlideIndex: 0,
  totalSlides: 0
});

// Действия
const navigationActions = {

  /**
   * Устанавливает общее количество слайдов
   * @param {number} total - Количество слайдов
   */
  setTotalSlides: (total) => {
    state.totalSlides.set(total);
  },

  /**
   * Переключает на следующий слайд
   * @throws {Error} Если достигнут последний слайд
   */
  nextSlide: () => {
    const currentIndex = state.currentSlideIndex.get();
    const totalSlides = state.totalSlides.get();
    if (currentIndex < totalSlides - 1) {
      state.currentSlideIndex.set(currentIndex + 1);
    }
  },

  /**
   * Переключает на предыдущий слайд
   * @throws {Error} Если достигнут первый слайд
   */
  prevSlide: () => {
    const currentIndex = state.currentSlideIndex.get();
    if (currentIndex > 0) {
      state.currentSlideIndex.set(currentIndex - 1);
    }
  },

  /**
   * Сбрасывает навигацию в начальное состояние
   */
  reset: () => {
    state.currentSlideIndex.set(0);
    state.totalSlides.set(0);
  }
};

// Селекторы
const navigationSelectors = {
  useCurrentSlide: () => state.currentSlideIndex.get(),
  useTotalSlides: () => state.totalSlides.get(),
};

export const navigationService = {
  ...navigationActions,
  ...navigationSelectors
};