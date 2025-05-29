export const animationConstants = {
  // Spring animations for interactive elements
  springStiff: {
    type: "spring",
    damping: 15,
    stiffness: 120,
    mass: 0.5
  },
  springQuick: {
    type: "spring", 
    damping: 20,
    stiffness: 300,
    mass: 0.3
  },
  springGentle: {
    type: "spring",
    damping: 25,
    stiffness: 200,
    mass: 0.4
  },

  // Fade animations
  fadeIn: {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0 },
    transition: { duration: 0.2 }
  },
  fadeInUp: {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 },
    transition: { duration: 0.3 }
  },
  fadeInScale: {
    initial: { opacity: 0, scale: 0.95 },
    animate: { opacity: 1, scale: 1 },
    exit: { opacity: 0, scale: 0.95 },
    transition: { duration: 0.2 }
  },

  // Slide animations
  slideInRight: {
    initial: { x: 50, opacity: 0 },
    animate: { x: 0, opacity: 1 },
    exit: { x: -50, opacity: 0 },
    transition: { duration: 0.3 }
  },
  slideInLeft: {
    initial: { x: -50, opacity: 0 },
    animate: { x: 0, opacity: 1 },
    exit: { x: 50, opacity: 0 },
    transition: { duration: 0.3 }
  },

  // Card animations
  cardHover: {
    scale: 1.02,
    transition: { duration: 0.2 }
  },
  cardTap: {
    scale: 0.98,
    transition: { duration: 0.1 }
  }
};

// Component-specific presets
export const accordionPreset = {
  type: "spring",
  stiffness: 400,
  damping: 30
};

export const staggerPreset = (delayChildren = 0.1) => ({
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren
    }
  }
});

// Layout change animations
export const layoutTransition = {
  type: "spring",
  stiffness: 300,
  damping: 30,
  layout: true
};

// Page transition variants
export const pageTransitionVariants = {
  initial: { opacity: 0, x: 50 },
  animate: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: -50 }
};

// List item animations
export const listItemVariants = {
  hidden: { opacity: 0, x: -20 },
  visible: { opacity: 1, x: 0 },
  hover: { scale: 1.02, transition: { duration: 0.2 } }
};
