// src/hooks/useImageLoad.js
import { useEffect, useState } from 'react';
import { imageService } from '@/services';

export const useImageLoad = (src) => {
  const [status, setStatus] = useState('init');

  useEffect(() => {
    if (!src) return;

    const subscription = imageService.status$
      .subscribe(newStatus => setStatus(newStatus));

    imageService.loadImage(src).catch(console.error);

    return () => subscription.unsubscribe();
  }, [src]);

  return status;
};