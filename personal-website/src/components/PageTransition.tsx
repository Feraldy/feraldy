import React from 'react';
import { motion } from 'framer-motion';

interface PageTransitionProps {
  children: React.ReactNode;
  className?: string;
}

const PageTransition: React.FC<PageTransitionProps> = ({ children, className = '' }) => {
  const pageVariants = {
    initial: {
      opacity: 0,
      scale: 0.95,
      filter: 'blur(4px)'
    },
    in: {
      opacity: 1,
      scale: 1,
      filter: 'blur(0px)'
    },
    out: {
      opacity: 0,
      scale: 1.05,
      filter: 'blur(4px)'
    }
  };

  const pageTransition = {
    type: 'tween' as const,
    ease: [0.23, 1, 0.32, 1] as const,
    duration: 0.6
  };

  return (
    <motion.div
      initial="initial"
      animate="in"
      exit="out"
      variants={pageVariants}
      transition={pageTransition}
      className={className}
    >
      {children}
    </motion.div>
  );
};

export default PageTransition;