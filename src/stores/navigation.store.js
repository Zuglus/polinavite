import { makeAutoObservable } from 'mobx';

class NavigationStore {
  currentIndex = 0;
  totalSlides = 0;

  constructor() {
    makeAutoObservable(this);
  }

  get canGoPrev() {
    return this.currentIndex > 0;
  }

  get canGoNext() {
    return this.currentIndex < this.totalSlides - 1;
  }

  setTotalSlides(total) {
    this.totalSlides = total;
  }

  goPrev() {
    if (this.canGoPrev) this.currentIndex--;
  }

  goNext() {
    if (this.canGoNext) this.currentIndex++;
  }

  reset() {
    this.currentIndex = 0;
    this.totalSlides = 0;
  }
}

export const navigationStore = new NavigationStore();