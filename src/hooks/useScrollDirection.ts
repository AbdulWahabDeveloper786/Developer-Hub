'use client';

import { useState, useEffect } from 'react';

export const useScrollDirection = () => {
  const [scrollDirection, setScrollDirection] = useState<'up' | 'down' | null>(null);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const updateScrollDirection = () => {
      const currentScrollY = window.scrollY;
      const direction = currentScrollY > lastScrollY ? 'down' : 'up';
      
      if (direction !== scrollDirection && (currentScrollY - lastScrollY > 10 || currentScrollY - lastScrollY < -10)) {
        setScrollDirection(direction);
      }
      
      setLastScrollY(currentScrollY > 0 ? currentScrollY : 0);
      setScrollY(currentScrollY);
    };

    const handleScroll = () => {
      requestAnimationFrame(updateScrollDirection);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [scrollDirection, lastScrollY]);

  return { scrollDirection, scrollY };
};

export default useScrollDirection;