// src/services/image.service.js
import { observable } from "@legendapp/state";

export class ImageService {
  constructor() {
    this.status$ = observable('init');
    this.retryCount$ = observable(0);
    this.imageCache = new Map();
  }

  loadImage(src) {
    if (this.imageCache.has(src)) {
      this.status$.set('loaded');
      return Promise.resolve(this.imageCache.get(src));
    }

    return new Promise((resolve, reject) => {
      this.status$.set('loading');

      const img = new Image();
      
      img.onload = () => {
        this.imageCache.set(src, img);
        this.status$.set('loaded');
        this.retryCount$.set(0);
        resolve(img);
      };

      img.onerror = () => {
        if (this.retryCount$.get() < 3) {
          setTimeout(() => {
            this.retryCount$.set(prev => prev + 1);
            this.status$.set('retrying');
            img.src = src;
          }, 1000 * this.retryCount$.get()); // Экспоненциальная задержка
        }
      };

      img.src = src;
    });
  }

  preloadImages(sources) {
    return Promise.all(
      sources.map(src => this.loadImage(src))
    );
  }

  clearCache() {
    this.imageCache.clear();
    this.status$.set('init');
    this.retryCount$.set(0);
  }
}

export const imageService = new ImageService();