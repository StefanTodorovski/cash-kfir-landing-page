import { useInView } from 'framer-motion';
import { useRef } from 'react';

/**
 * Custom hook for managing scroll-triggered animations
 */
export const useScrollAnimation = (options = {}) => {
  const ref = useRef(null);
  const isInView = useInView(ref, {
    once: true,
    margin: '-100px',
    ...options,
  });

  return { ref, isInView };
};

/**
 * Custom hook for staggered animations
 */
export const useStaggerAnimation = (delay = 0.1) => {
  return {
    container: {
      hidden: { opacity: 0 },
      visible: {
        opacity: 1,
        transition: {
          staggerChildren: delay,
        },
      },
    },
    item: {
      hidden: { opacity: 0, y: 20 },
      visible: {
        opacity: 1,
        y: 0,
        transition: {
          duration: 0.6,
          ease: 'easeOut',
        },
      },
    },
  };
};
