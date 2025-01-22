import { observer } from 'mobx-react-lite';
import { useCallback, useEffect } from 'react';
import { ZoomIn } from 'lucide-react';
import { imageStore } from '@stores/image.store';
import ImageSkeleton from '@components/Skeleton';

const SliderImage = observer(({ src, index, onClick, isTouchDevice }) => {
  // Реактивное состояние из хранилища
  const { isLoading, loadImage } = imageStore;

  // Загрузка изображения
  useEffect(() => {
    loadImage(src);
  }, [src, loadImage]);

  // Оптимизированный обработчик клика
  const handleClick = useCallback(
    (e) => {
      e.stopPropagation();
      onClick();
    },
    [onClick]
  );

  // Динамические классы для иконки
  const zoomIconClasses = useCallback(
    () => 
      `${isTouchDevice 
        ? 'w-32 h-32 md:w-24 md:h-24 opacity-30' 
        : 'w-16 h-16 opacity-0 group-hover/image:opacity-30'}`,
    [isTouchDevice]
  );

  return (
    <div
      onClick={handleClick}
      className={`relative rounded-[1.25rem] mb-4 group/image ${
        !isTouchDevice ? 'cursor-zoom-in' : ''
      }`}
    >
      {isLoading ? (
        <ImageSkeleton width="100%" height="300px" />
      ) : (
        <img
          src={src}
          alt={`Slide ${index + 1}`}
          className="w-full object-cover rounded-[1.25rem]"
          onError={() => imageStore.setError(true)}
        />
      )}

      <div className="absolute inset-0 flex items-center justify-center transition-opacity duration-300">
        <ZoomIn className={zoomIconClasses()} strokeWidth={1} />
      </div>
    </div>
  );
});

export default SliderImage;