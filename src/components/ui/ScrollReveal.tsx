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
  duration = 0.2, // Further reduced for better performance
  distance = 20, // Further reduced for smoother animations
  className = '',
  triggerOnce = true, // Default to true for better performance
  scrollUpOnly = false
}: ScrollRevealProps) => {
  const ref = useRef(null);
  const isMobile = useMobile();
  const isInView = useInView(ref, {
    once: triggerOnce,
    margin: '-30px 0px -30px 0px', // Reduced margin for earlier trigger
    amount: 0.1 // Trigger when 10% is visible
  });
  const { scrollDirection } = useScrollDirection();

  // Disable complex animations on mobile for better performance
  if (isMobile) {
    return (
      <motion.div 
        className={className}
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : { opacity: 0 }}
        transition={{ duration: 0.15, type: 'tween' }}
      >
        {children}
      </motion.div>
    );
  }

  // Only animate when scrolling up if scrollUpOnly is true
  const shouldAnimate = scrollUpOnly 
    ? isInView && scrollDirection === 'up'
    : isInView;

  // Simplified animation variants
  const getVariants = () => {
    const baseTransition = {
      duration: Math.min(duration, 0.3),
      delay,
      type: 'tween' as const,
      ease: 'easeOut' as const
    };

    switch (direction) {
      case 'up':
        return {
          hidden: { opacity: 0, y: distance },
          visible: { opacity: 1, y: 0, transition: baseTransition }
        };
      case 'down':
        return {
          hidden: { opacity: 0, y: -distance },
          visible: { opacity: 1, y: 0, transition: baseTransition }
        };
      case 'left':
        return {
          hidden: { opacity: 0, x: distance },
          visible: { opacity: 1, x: 0, transition: baseTransition }
        };
      case 'right':
        return {
          hidden: { opacity: 0, x: -distance },
          visible: { opacity: 1, x: 0, transition: baseTransition }
        };
      case 'scale':
        return {
          hidden: { opacity: 0, scale: 0.9 },
          visible: { opacity: 1, scale: 1, transition: baseTransition }
        };
      case 'rotate':
        return {
          hidden: { opacity: 0, rotate: -5, scale: 0.95 },
          visible: { opacity: 1, rotate: 0, scale: 1, transition: baseTransition }
        };
      default:
        return {
          hidden: { opacity: 0, y: distance },
          visible: { opacity: 1, y: 0, transition: baseTransition }
        };
    }
  };

  const variants = getVariants();

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