import { useState, useEffect } from 'react';
import { imageService } from '@services';
import { from } from 'rxjs';
import { mergeMap, tap } from 'rxjs/operators';

export const usePreloadImages = (images, concurrency = 3) => {
  const [progress, setProgress] = useState(0);
  const [isComplete, setIsComplete] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!images?.length) return;

    const totalImages = images.length;
    let loadedImages = 0;

    const subscription = from(images).pipe(
      // Загружаем несколько изображений параллельно
      mergeMap(src => 
        from(imageService.loadImage(src)).pipe(
          tap(() => {
            loadedImages++;
            setProgress((loadedImages / totalImages) * 100);
          })
        ),
        concurrency // Количество параллельных загрузок
      )
    ).subscribe({
      complete: () => setIsComplete(true),
      error: (err) => setError(err)
    });

    return () => subscription.unsubscribe();
  }, [images, concurrency]);

  return { progress, isComplete, error };
};