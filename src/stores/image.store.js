import { makeAutoObservable } from 'mobx';

class ImageStore {
  isLoading = true;
  error = false;

  constructor() {
    makeAutoObservable(this);
  }

  loadImage = (src) => {
    this.isLoading = true;
    this.error = false;
    
    const img = new Image();
    img.src = src;
    img.onload = () => this.setLoaded();
    img.onerror = () => this.setError();
  };

  setLoaded = () => {
    this.isLoading = false;
  };

  setError = () => {
    this.error = true;
    this.isLoading = false;
  };
}

export const imageStore = new ImageStore();