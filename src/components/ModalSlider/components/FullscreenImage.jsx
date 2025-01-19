import React from 'react';
import { X } from 'lucide-react';

const FullscreenImage = ({ 
    src, 
    alt, 
    isTouchDevice, 
    dimensions, 
    rotation, 
    onClose 
  }) => {
    const commonImageProps = {
      src,
      alt,
      className: "object-contain transition-all duration-300 ease-in-out",
      style: dimensions
    };
  
    const CloseButton = () => (
      <button
        onClick={onClose}
        className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-md flex items-center justify-center transition-colors duration-300"
        aria-label="Закрыть"
      >
        <X className="w-5 h-5 text-white" />
      </button>
    );
  
    if (!isTouchDevice) {
      return (
        <div className="relative">
          <img {...commonImageProps} className={`${commonImageProps.className} cursor-zoom-out`} />
          <CloseButton />
        </div>
      );
    }
  
    return (
      <div className="w-screen h-screen flex items-center justify-center">
        <div 
          className="relative flex items-center justify-center w-full h-full"
          style={{
            transform: `rotate(${rotation}deg)`,
            width: rotation === 90 ? '100vh' : '100vw',
            height: rotation === 90 ? '100vw' : '100vh',
            transition: 'transform 0.3s ease-in-out'
          }}
        >
          <img {...commonImageProps} className={`${commonImageProps.className} w-full h-full`} />
          <div
            className="absolute w-full h-full"
            style={{
              transform: `rotate(-${rotation}deg)`,
              transformOrigin: 'center center'
            }}
          >
            <CloseButton />
          </div>
        </div>
      </div>
    );
  };

  export default FullscreenImage;