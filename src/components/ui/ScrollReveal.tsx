'use client';

import { motion, useInView } from 'framer-motion';
import { useRef, ReactNode } from 'react';
import { useScrollDirection } from '@/hooks/useScrollDirection';
import useMobile from '@/hooks/useMobile';

interface ScrollRevealProps {
  children: ReactNode;
  direction?: 'up' | 'down' | 'left' | 'right' | 'scale' | 'rotate';
  delay?: number;
  duration?: number;
  distance?: number;
  className?: string;
  triggerOnce?: boolean;
  scrollUpOnly?: boolean;
}

const ScrollReveal = ({
  children,
  direction = 'up',
  delay = 0,
  duration = 0.3, // Reduced default duration
  distance = 30, // Reduced default distance
  className = '',
  triggerOnce = false,
  scrollUpOnly = false
}: ScrollRevealProps) => {
  const ref = useRef(null);
  const isMobile = useMobile();
  const isInView = useInView(ref, { 
    once: triggerOnce, 
    margin: '-50px', // Reduced margin for earlier trigger
    amount: 0.1 // Only need 10% of element visible
  });
  const { scrollDirection } = useScrollDirection();

  // On mobile, return static content without animations
  if (isMobile) {
    return (
      <div ref={ref} className={className}>
        {children}
      </div>
    );
  }

  // If scrollUpOnly is true, only animate when scrolling up
  // Otherwise, animate when element comes into view regardless of scroll direction
  const shouldAnimate = scrollUpOnly ? (isInView && scrollDirection === 'up') : isInView;

  const getInitialState = () => {
    switch (direction) {
      case 'up':
        return { opacity: 0, y: distance };
      case 'down':
        return { opacity: 0, y: -distance };
      case 'left':
        return { opacity: 0, x: distance };
      case 'right':
        return { opacity: 0, x: -distance };
      case 'scale':
        return { opacity: 0, scale: 0.8 };
      case 'rotate':
        return { opacity: 0, rotate: 15, scale: 0.9 };
      default:
        return { opacity: 0, y: distance };
    }
  };

  const getAnimateState = () => {
    switch (direction) {
      case 'up':
      case 'down':
        return { opacity: 1, y: 0 };
      case 'left':
      case 'right':
        return { opacity: 1, x: 0 };
      case 'scale':
        return { opacity: 1, scale: 1 };
      case 'rotate':
        return { opacity: 1, rotate: 0, scale: 1 };
      default:
        return { opacity: 1, y: 0 };
    }
  };

  const variants = {
    hidden: getInitialState(),
    visible: {
      ...getAnimateState(),
      transition: {
        duration: Math.min(duration, 0.4), // Cap duration for better performance
        delay,
        type: 'tween' as const, // Use tween instead of spring for better performance
        ease: [0.25, 0.46, 0.45, 0.94] // Custom easing for smooth animation
      }
    }
  };

  return (
    <motion.div
      ref={ref}
      className={className}
      initial="hidden"
      animate={shouldAnimate ? "visible" : "hidden"}
      variants={variants}
    >
      {children}
    </motion.div>
  );
};

export default ScrollReveal;