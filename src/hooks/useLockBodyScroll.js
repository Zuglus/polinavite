import { useEffect } from 'react';

export const useLockBodyScroll = (isLocked) => {
  useEffect(() => {
    if (!isLocked) return;

    const scrollY = window.scrollY;
    const originalStyle = {
      position: document.body.style.position,
      width: document.body.style.width,
      overflowY: document.body.style.overflowY,
      top: document.body.style.top
    };

    document.body.style.position = 'fixed';
    document.body.style.width = '100%';
    document.body.style.overflowY = 'hidden';
    document.body.style.top = `-${scrollY}px`;

    return () => {
      Object.assign(document.body.style, originalStyle);
      window.scrollTo(0, scrollY);
    };
  }, [isLocked]);
};