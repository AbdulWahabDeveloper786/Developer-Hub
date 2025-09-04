'use client';

import { useEffect, useRef, useCallback } from 'react';
import useMobile from '@/hooks/useMobile';

const CustomCursor = () => {

  const isMobile = useMobile();
  const cursorRef = useRef<HTMLDivElement>(null);
  const rafRef = useRef<number | null>(null);
  const lastUpdateTime = useRef<number>(0);

  // Highly optimized mouse position update using direct DOM manipulation
  const updateMousePosition = useCallback((e: MouseEvent) => {
    const now = performance.now();
    // Throttle to 60fps max
    if (now - lastUpdateTime.current < 16) return;
    
    if (rafRef.current) {
      cancelAnimationFrame(rafRef.current);
    }
    
    rafRef.current = requestAnimationFrame(() => {
      if (cursorRef.current) {
        // Use CSS transform for better performance
        cursorRef.current.style.transform = `translate3d(${e.clientX - 8}px, ${e.clientY - 8}px, 0)`;
        lastUpdateTime.current = now;
      }
    });
  }, []);

  useEffect(() => {
    // Don't initialize cursor on mobile devices
    if (isMobile) return;

    const handleMouseDown = () => {
      if (cursorRef.current) {
        cursorRef.current.style.transform += ' scale(0.8)';
      }
    };
    
    const handleMouseUp = () => {
      if (cursorRef.current) {
        cursorRef.current.style.transform = cursorRef.current.style.transform.replace(' scale(0.8)', '');
      }
    };

    // Simplified hover detection with better performance
    const handleMouseOver = (e: Event) => {
      const target = e.target as Element;
      if (target.closest('a, button, [role="button"], .cursor-pointer, input, textarea, select')) {
        if (cursorRef.current) {
          cursorRef.current.style.transform += ' scale(1.5)';
        }
      }
    };

    const handleMouseOut = (e: Event) => {
      const target = e.target as Element;
      if (target.closest('a, button, [role="button"], .cursor-pointer, input, textarea, select')) {
        if (cursorRef.current) {
          cursorRef.current.style.transform = cursorRef.current.style.transform.replace(' scale(1.5)', '');
        }
      }
    };

    // Add event listeners with passive option for better performance
    document.addEventListener('mousemove', updateMousePosition, { passive: true });
    document.addEventListener('mousedown', handleMouseDown);
    document.addEventListener('mouseup', handleMouseUp);
    document.addEventListener('mouseover', handleMouseOver, { passive: true });
    document.addEventListener('mouseout', handleMouseOut, { passive: true });

    // Hide default cursor with less aggressive approach
    document.documentElement.style.cursor = 'none';
    document.body.style.cursor = 'none';
    
    // Apply cursor hiding with targeted approach but allow pointer events
    const style = document.createElement('style');
    style.textContent = `
      body, html {
        cursor: none !important;
      }
      * {
        cursor: none !important;
      }
      a, button, [role="button"], .cursor-pointer {
        pointer-events: auto !important;
      }
    `;
    document.head.appendChild(style);

    return () => {
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }
      
      document.removeEventListener('mousemove', updateMousePosition);
      document.removeEventListener('mousedown', handleMouseDown);
      document.removeEventListener('mouseup', handleMouseUp);
      document.removeEventListener('mouseover', handleMouseOver);
      document.removeEventListener('mouseout', handleMouseOut);
      
      document.documentElement.style.cursor = 'auto';
      document.body.style.cursor = 'auto';
      
      // Remove the style element
      if (style.parentNode) {
        style.parentNode.removeChild(style);
      }
    };
  }, [isMobile, updateMousePosition]);

  // Don't render cursor on mobile devices
  if (isMobile) {
    return null;
  }

  return (
    <div
      ref={cursorRef}
      className="fixed top-0 left-0 w-4 h-4 bg-[#08f9ff] rounded-full pointer-events-none z-[10002]"
      style={{
        transform: 'translate3d(-8px, -8px, 0)',
        transition: 'transform 0.1s ease-out',
        willChange: 'transform'
      }}
    />
  );
};

export default CustomCursor;