import React, { useState, useEffect } from 'react';

const SliderImage = ({ src }) => {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const img = new Image();
    img.src = src;
    img.onload = () => setIsLoaded(true);
    img.onerror = () => setIsLoaded(false);
  }, [src]);

  return (
    <div className="image-container">
      {!isLoaded && <div className="skeleton-loader" />}
      <img 
        src={src} 
        className={`slide-image ${isLoaded ? 'visible' : 'hidden'}`}
        alt="" 
      />
    </div>
  );
};

export default SliderImage;