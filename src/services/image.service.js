import { observable } from "@legendapp/state";

export class ImageService {
  constructor() {
    this.status$ = observable('init');
    this.retryCount$ = observable(0);
  }

  loadImage(src) {
    return new Promise((resolve, reject) => {
      this.status$.set('loading');

      const img = new Image();
      img.onload = () => {
        this.status$.set('loaded');
        resolve(img);
      };
      img.onerror = (err) => {
        this.retry();
        reject(err);
      };
      img.src = src;
    });
  }

  retry() {
    if (this.retryCount$.get() < 3) {
      this.retryCount$.set(prev => prev + 1);
      this.status$.set('retrying');
    } else {
      this.status$.set('error');
    }
  }
}

export const imageService = new ImageService();