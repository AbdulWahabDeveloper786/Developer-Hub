'use client';

import { useState, useEffect, useRef, useCallback } from 'react';

export const useScrollDirection = () => {
  const [scrollDirection, setScrollDirection] = useState<'up' | 'down' | null>(null);
  const [scrollY, setScrollY] = useState(0);
  const lastScrollY = useRef(0);
  const ticking = useRef(false);

  const updateScrollDirection = useCallback(() => {
    const currentScrollY = window.scrollY;
    const threshold = 10;
    
    // Only update if scroll difference is significant
    if (Math.abs(currentScrollY - lastScrollY.current) > threshold) {
      const direction = currentScrollY > lastScrollY.current ? 'down' : 'up';
      
      setScrollDirection(prev => prev !== direction ? direction : prev);
      setScrollY(currentScrollY);
      lastScrollY.current = currentScrollY > 0 ? currentScrollY : 0;
    }
    
    ticking.current = false;
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (!ticking.current) {
        requestAnimationFrame(updateScrollDirection);
        ticking.current = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [updateScrollDirection]);

  return { scrollDirection, scrollY };
};

export default useScrollDirection;