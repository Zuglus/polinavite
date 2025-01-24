import { BehaviorSubject } from 'rxjs';

class ImageService {
  constructor() {
    this.loading$ = new BehaviorSubject(false);
    this.error$ = new BehaviorSubject(false);
  }

  loadImage(src) {
    this.loading$.next(true);
    this.error$.next(false);

    return new Promise((resolve, reject) => {
      const img = new Image();
      img.src = src;
      img.onload = () => resolve(src);
      img.onerror = reject; // Исправлено: удалена лишняя скобка
    })
      .then(() => this.error$.next(false))
      .catch(() => this.error$.next(true))
      .finally(() => this.loading$.next(false));
  }
}

export const imageService = new ImageService();