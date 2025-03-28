// src/stores/modalStore.js
import { observable, computed } from '@legendapp/state';
import { enableReactTracking } from "@legendapp/state/config/enableReactTracking";

// Включаем отслеживание для React
enableReactTracking({
  auto: true,
});

// Создаем базовый стейт
const state = observable({
  modalId: null,
  currentProject: null,
  currentSlideIndex: 0
});

// Действия с модальными окнами
const modalActions = {
  openModal: (id, project) => {
    state.modalId.set(id);
    state.currentProject.set(project);
    state.currentSlideIndex.set(0);
  },

  closeModal: () => {
    state.modalId.set(null);
    state.currentProject.set(null);
    state.currentSlideIndex.set(0);
  },

  setSlide: (index) => {
    state.currentSlideIndex.set(index);
  },

  nextSlide: () => {
    const currentIndex = state.currentSlideIndex.get();
    const totalSlides = state.currentProject.get()?.slides?.length || 0;
    if (currentIndex < totalSlides - 1) {
      state.currentSlideIndex.set(currentIndex + 1);
    }
  },

  prevSlide: () => {
    const currentIndex = state.currentSlideIndex.get();
    if (currentIndex > 0) {
      state.currentSlideIndex.set(currentIndex - 1);
    }
  }
};

// Селекторы
const modalSelectors = {
  useIsOpen: () => state.modalId.get() !== null,
  useCurrentProject: () => state.currentProject.get(),
  useCurrentSlide: () => state.currentSlideIndex.get(),
};

export const modalStore = {
  ...modalActions,
  ...modalSelectors
};