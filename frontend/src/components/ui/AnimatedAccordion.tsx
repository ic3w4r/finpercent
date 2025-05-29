import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import { useState } from 'react';
import { accordionPreset } from '../../utils/animations';

interface AnimatedAccordionProps {
  title: string;
  children: React.ReactNode;
  defaultOpen?: boolean;
}

export const AnimatedAccordion = ({
  title,
  children,
  defaultOpen = false
}: AnimatedAccordionProps) => {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <motion.div 
      className="rounded-lg border bg-background/50 p-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={accordionPreset}
    >
      <motion.button
        className="flex w-full items-center justify-between"
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
        whileHover={{ scale: 1.01 }}
        whileTap={{ scale: 0.99 }}
      >
        <h3 className="text-lg font-semibold">{title}</h3>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={accordionPreset}
        >
          <ChevronDown className="h-5 w-5" />
        </motion.div>
      </motion.button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{
              height: 'auto',
              opacity: 1,
              transition: accordionPreset
            }}
            exit={{
              height: 0,
              opacity: 0,
              transition: { duration: 0.2 }
            }}
            className="overflow-hidden"
          >
            <motion.div 
              className="pt-4"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
            >
              {children}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};
