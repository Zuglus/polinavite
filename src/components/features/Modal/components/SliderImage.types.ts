import { ImageLoadStatus } from '@/types';

/**
 * Свойства компонента SliderImage
 */
export interface SliderImageProps {
  src: string;
  alt?: string;
  priority?: boolean;
  index?: number;
}

/**
 * Данные, которые возвращает хук useImageLoad
 */
export interface ImageLoadData {
  status: ImageLoadStatus;
  retryCount: number;
  reload: () => Promise<HTMLImageElement>;
}