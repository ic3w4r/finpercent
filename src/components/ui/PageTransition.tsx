import { motion, AnimatePresence } from 'framer-motion';
import { ReactNode } from 'react';
import { useLocation } from 'react-router-dom';
import { pageTransitionVariants, animationConstants } from '../../utils/animations';

interface PageTransitionProps {
  children: ReactNode;
}

export default function PageTransition({ children }: PageTransitionProps) {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={location.pathname}
        variants={pageTransitionVariants}
        initial="initial"
        animate="animate"
        exit="exit"
        transition={animationConstants.springQuick}
        style={{ position: 'relative', overflow: 'hidden' }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}
