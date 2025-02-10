import { observable } from '@legendapp/state';

export const modalStore = observable({
  modalId: null,
  currentProject: null,
  openModal: (id, project) => {
    modalStore.modalId.set(id);
    modalStore.currentProject.set(project);
  },
  closeModal: () => {
    modalStore.modalId.set(null);
    modalStore.currentProject.set(null);
  }
});