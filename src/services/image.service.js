// src/services/image.service.js
import { BehaviorSubject } from 'rxjs';

export class ImageService {
  constructor() {
    this.loadQueue$ = new BehaviorSubject(null);
    this.cache = new Map();
  }

  loadImage(src) {
    if (!this.cache.has(src)) {
      const img = new Image();
      img.src = src;
      this.cache.set(src, img);
    }
    return this.cache.get(src);
  }
}

export const imageService = new ImageService();