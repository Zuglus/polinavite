// src/stores/navigationStore.js
import { observable } from '@legendapp/state';
import { enableReactTracking } from "@legendapp/state/config/enableReactTracking";

enableReactTracking({
  auto: true,
});

const state = observable({
  currentSlideIndex: 0,
  totalSlides: 0,
  direction: 'none' // 'left' или 'right'
});

const navigationActions = {
  setTotalSlides: (total) => {
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
  }
};

const navigationSelectors = {
  useCurrentSlide: () => state.currentSlideIndex.get(),
  useTotalSlides: () => state.totalSlides.get(),
  useDirection: () => state.direction.get(),
};

export const navigationStore = {
  ...navigationActions,
  ...navigationSelectors
};