import React from 'react';
import Skeleton from 'react-loading-skeleton';

const ImageSkeleton = ({ width, height }) => {
  return (
    <Skeleton 
      width={width} 
      height={height} 
      baseColor="#f0f0f0" 
      highlightColor="#e0e0e0" 
    />
  );
};

export default ImageSkeleton;