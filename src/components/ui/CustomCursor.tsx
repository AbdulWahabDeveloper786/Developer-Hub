'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const CustomCursor = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const [isClicking, setIsClicking] = useState(false);

  useEffect(() => {
    const updateMousePosition = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    const handleMouseEnter = () => setIsHovering(true);
    const handleMouseLeave = () => setIsHovering(false);
    const handleMouseDown = () => setIsClicking(true);
    const handleMouseUp = () => setIsClicking(false);

    // Add event listeners
    document.addEventListener('mousemove', updateMousePosition);
    document.addEventListener('mousedown', handleMouseDown);
    document.addEventListener('mouseup', handleMouseUp);

    // Function to add hover listeners to interactive elements
    const addHoverListeners = () => {
      const interactiveElements = document.querySelectorAll('a, button, [role="button"], .cursor-pointer, input, textarea, select, nav a, .nav-link, [data-scroll-to], .scroll-to-top');
      interactiveElements.forEach(el => {
        el.addEventListener('mouseenter', handleMouseEnter);
        el.addEventListener('mouseleave', handleMouseLeave);
      });
      return interactiveElements;
    };

    // Initial setup
    let interactiveElements = addHoverListeners();

    // Observer to watch for new elements
    const observer = new MutationObserver(() => {
      // Remove old listeners
      interactiveElements.forEach(el => {
        el.removeEventListener('mouseenter', handleMouseEnter);
        el.removeEventListener('mouseleave', handleMouseLeave);
      });
      // Add new listeners
      interactiveElements = addHoverListeners();
    });

    // Start observing
    observer.observe(document.body, {
      childList: true,
      subtree: true
    });

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
      document.removeEventListener('mousemove', updateMousePosition);
      document.removeEventListener('mousedown', handleMouseDown);
      document.removeEventListener('mouseup', handleMouseUp);
      
      interactiveElements.forEach(el => {
        el.removeEventListener('mouseenter', handleMouseEnter);
        el.removeEventListener('mouseleave', handleMouseLeave);
      });
      
      observer.disconnect();
      document.documentElement.style.cursor = 'auto';
      document.body.style.cursor = 'auto';
      
      // Remove the style element
      if (style.parentNode) {
        style.parentNode.removeChild(style);
      }
    };
  }, []);

  return (
    <div style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', pointerEvents: 'none', zIndex: 50 }}>
      {/* Main Cursor */}
      <motion.div
        className="fixed top-0 left-0 w-4 h-4 bg-[#08f9ff] rounded-full pointer-events-none"
        style={{ zIndex: 53, position: 'fixed' }}
        animate={{
          x: mousePosition.x - 8,
          y: mousePosition.y - 8,
          scale: isClicking ? 0.8 : isHovering ? 1.5 : 1,
        }}
        transition={{
          type: "spring",
          stiffness: 500,
          damping: 28,
          mass: 0.5
        }}
      />

      {/* Secondary Cursor (Larger, slower) */}
      <motion.div
        className="fixed top-0 left-0 w-8 h-8 border-2 border-[#08f9ff] rounded-full pointer-events-none opacity-50"
        style={{ zIndex: 52, position: 'fixed' }}
        animate={{
          x: mousePosition.x - 16,
          y: mousePosition.y - 16,
          scale: isClicking ? 0.5 : isHovering ? 2 : 1,
        }}
        transition={{
          type: "spring",
          stiffness: 150,
          damping: 15,
          mass: 0.8
        }}
      />

      {/* Third Cursor (Largest, slowest) */}
      <motion.div
        className="fixed top-0 left-0 w-12 h-12 border border-[#08f9ff] rounded-full pointer-events-none opacity-20"
        style={{ zIndex: 51, position: 'fixed' }}
        animate={{
          x: mousePosition.x - 24,
          y: mousePosition.y - 24,
          scale: isClicking ? 0.3 : isHovering ? 2.5 : 1,
        }}
        transition={{
          type: "spring" as const,
          stiffness: 50,
          damping: 10,
          mass: 1.2
        }}
      />

      {/* Click Effect */}
      {isClicking && (
        <motion.div
          className="fixed top-0 left-0 w-6 h-6 border-2 border-[#08f9ff] rounded-full pointer-events-none"
          style={{ zIndex: 54, position: 'fixed' }}
          initial={{
            x: mousePosition.x - 12,
            y: mousePosition.y - 12,
            scale: 0,
            opacity: 1
          }}
          animate={{
            scale: 3,
            opacity: 0
          }}
          transition={{
            duration: 0.3,
            ease: "easeOut"
          }}
        />
      )}
    </div>
  );
};

export default CustomCursor;