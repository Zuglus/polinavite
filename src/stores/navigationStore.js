// src/stores/navigationStore.js
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
  setTotalSlides: (total) => {
    state.totalSlides.set(total);
  },

  nextSlide: () => {
    const currentIndex = state.currentSlideIndex.get();
    const totalSlides = state.totalSlides.get();
    if (currentIndex < totalSlides - 1) {
      state.currentSlideIndex.set(currentIndex + 1);
    }
  },

  prevSlide: () => {
    const currentIndex = state.currentSlideIndex.get();
    if (currentIndex > 0) {
      state.currentSlideIndex.set(currentIndex - 1);
    }
  },

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

export const navigationStore = {
  ...navigationActions,
  ...navigationSelectors
};