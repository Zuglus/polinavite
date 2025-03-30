import { observable } from '@legendapp/state';
import { enableReactTracking } from "@legendapp/state/config/enableReactTracking";
import { Project } from '@shared/model/types';

// Включаем отслеживание для React
enableReactTracking({
  auto: true,
});

// Состояние модального окна
interface ModalState {
  modalId: string | null;
  currentProject: Project | null;
  currentSlideIndex: number;
}

// Создаем базовый стейт
const state = observable<ModalState>({
  modalId: null,
  currentProject: null,
  currentSlideIndex: 0
});

/**
 * Хранилище для управления модальными окнами
 */
export const modalStore = {
  // Действия с модальными окнами
  openModal: (id: string, project: Project) => {
    state.modalId.set(id);
    state.currentProject.set(project);
    state.currentSlideIndex.set(0);
  },

  closeModal: () => {
    state.modalId.set(null);
    state.currentProject.set(null);
    state.currentSlideIndex.set(0);
  },

  setSlide: (index: number) => {
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
  },

  // Селекторы
  useIsOpen: () => state.modalId.get() !== null,
  useCurrentProject: () => state.currentProject.get(),
  useCurrentSlide: () => state.currentSlideIndex.get(),
};