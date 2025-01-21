import React, { useState, useEffect } from 'react';
import ImageSkeleton from '../../../Skeleton';
import { ZoomIn } from 'lucide-react';

const SliderImage = ({ src, index, onClick, isTouchDevice }) => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const img = new Image();
    img.src = src;
    img.onload = () => setIsLoading(false);
  }, [src]);

  return (
    <div
      onClick={onClick}
      className={`relative rounded-[1.25rem] mb-4 group/image ${!isTouchDevice ? 'cursor-zoom-in' : ''
        }`}
    >
      {isLoading ? (
        <ImageSkeleton width="100%" height="300px" />
      ) : (
        <img
          src={src}
          alt={`Slide ${index + 1}`}
          className="w-full object-cover rounded-[1.25rem]"
        />
      )}
      <div
        className={`absolute inset-0 flex items-center justify-center
      ${isTouchDevice ? 'opacity-30' : 'opacity-0 group-hover/image:opacity-30'} 
      transition-opacity 
[chunk 183] duration-300`}
      >
        <ZoomIn
          className={`${isTouchDevice ? 'w-32 h-32 md:w-24 md:h-24' : 'w-16 h-16'
            } text-white`}
          strokeWidth={1}
        />
      </div>
    </div>
  );
};

export default SliderImage;