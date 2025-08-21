'use client';

import { motion } from 'framer-motion';
import { useScrollDirection } from '@/hooks/useScrollDirection';
import { useEffect, useState } from 'react';

interface FloatingElement {
  id: number;
  x: number;
  y: number;
  size: number;
  color: string;
  shape: 'circle' | 'square' | 'triangle';
  speed: number;
}

const FloatingElements = () => {
  const { scrollDirection, scrollY } = useScrollDirection();
  const [elements, setElements] = useState<FloatingElement[]>([]);
  const [isVisible, setIsVisible] = useState(false);
  const [animationTime, setAnimationTime] = useState(0);

  useEffect(() => {
    // Generate floating elements
    const generateElements = () => {
      const newElements: FloatingElement[] = [];
      for (let i = 0; i < 15; i++) {
        newElements.push({
          id: i,
          x: Math.random() * window.innerWidth,
          y: Math.random() * window.innerHeight,
          size: Math.random() * 20 + 10,
          color: ['#08f9ff', '#0066cc', '#00ffff', '#4dd0e1', '#26c6da'][Math.floor(Math.random() * 5)],
          shape: ['circle', 'square', 'triangle'][Math.floor(Math.random() * 3)] as 'circle' | 'square' | 'triangle',
          speed: Math.random() * 2 + 1
        });
      }
      setElements(newElements);
    };

    generateElements();
    window.addEventListener('resize', generateElements);
    return () => window.removeEventListener('resize', generateElements);
  }, []);

  useEffect(() => {
    // Always show elements in background
    setIsVisible(true);
  }, []);

  useEffect(() => {
    // Animation loop for smooth floating motion
    let animationId: number;
    const animate = () => {
      setAnimationTime(Date.now() * 0.001);
      animationId = requestAnimationFrame(animate);
    };
    animate();
    return () => cancelAnimationFrame(animationId);
  }, []);

  const getShapeComponent = (element: FloatingElement) => {
    const baseProps = {
      style: {
        width: element.size,
        height: element.size,
        backgroundColor: element.color,
      }
    };

    switch (element.shape) {
      case 'circle':
        return <div {...baseProps} className="rounded-full" />;
      case 'square':
        return <div {...baseProps} className="rounded-lg" />;
      case 'triangle':
        return (
          <div
            style={{
              width: 0,
              height: 0,
              borderLeft: `${element.size / 2}px solid transparent`,
              borderRight: `${element.size / 2}px solid transparent`,
              borderBottom: `${element.size}px solid ${element.color}`,
            }}
          />
        );
      default:
        return <div {...baseProps} className="rounded-full" />;
    }
  };

  return (
    <div className="fixed inset-0 pointer-events-none z-[1] overflow-hidden">
      {elements.map((element) => (
        <motion.div
          key={element.id}
          className="absolute"
          initial={{
            x: element.x,
            y: element.y,
            opacity: 0,
            scale: 0,
            rotate: 0
          }}
          animate={{
            x: isVisible ? [
               element.x,
               element.x + Math.sin(element.id) * 25,
               element.x - Math.sin(element.id) * 20,
               element.x
             ] : element.x,
             y: isVisible ? [
               element.y,
               element.y + Math.cos(element.id) * 20,
               element.y - Math.cos(element.id) * 15,
               element.y
             ] : element.y,
            opacity: isVisible ? 0.4 : 0,
            scale: isVisible ? 1 : 0,
            rotate: isVisible ? [0, 360] : 0
          }}
          transition={
            isVisible
              ? {
                  duration: 8,
                  ease: 'easeInOut',
                  repeat: Infinity,
                  repeatType: 'reverse',
                  rotate: { 
                    duration: 120, 
                    repeat: Infinity, 
                    ease: 'linear' 
                  }
                }
              : { duration: 2, ease: 'easeIn' }
          }
          style={{
            filter: 'blur(0.5px)',
            boxShadow: `0 0 20px ${element.color}40`
          }}
        >
          {getShapeComponent(element)}
        </motion.div>
      ))}
    </div>
  );
};

export default FloatingElements;