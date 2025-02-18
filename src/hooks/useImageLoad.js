// src/hooks/useImageLoad.js
import { useEffect } from 'react';
import { imageService } from '@/services';
import { observable } from '@legendapp/state';

// Создаем observable для статуса
const loadStatus = observable('init');

export const useImageLoad = (src) => {
  useEffect(() => {
    if (!src) return;

    const subscription = imageService.status$
      .subscribe(newStatus => loadStatus.set(newStatus));

    imageService.loadImage(src).catch(console.error);

    return () => subscription.unsubscribe();
  }, [src]);

  return loadStatus.get();
};