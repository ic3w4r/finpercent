import React, { useEffect, useState } from 'react';
import { Award, Star, Crown } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface BadgeAnimationProps {
  show: boolean;
  ranking: 'Gold' | 'Silver' | 'Bronze';
  companyName?: string;
}

const rankingColors = {
  Gold: 'text-yellow-500 border-yellow-500',
  Silver: 'text-gray-400 border-gray-400',
  Bronze: 'text-amber-600 border-amber-600'
};

const rankingGradients = {
  Gold: 'from-yellow-200 via-yellow-300 to-yellow-500',
  Silver: 'from-gray-200 via-gray-300 to-gray-500',
  Bronze: 'from-amber-200 via-amber-300 to-amber-600'
};

const medalShadows = {
  Gold: 'shadow-[0_0_40px_rgba(234,179,8,0.25)]',
  Silver: 'shadow-[0_0_40px_rgba(156,163,175,0.25)]',
  Bronze: 'shadow-[0_0_40px_rgba(180,83,9,0.25)]'
};

const etchedTextStyle = {
  textShadow: '1px 1px 1px rgba(255,255,255,0.3), -1px -1px 1px rgba(0,0,0,0.2)'
};

export default function BadgeAnimation({ show, ranking, companyName = "Tech Innovations Inc." }: BadgeAnimationProps) {
  const [isLogoAnimationComplete, setLogoAnimationComplete] = useState(false);
  const [showRibbon, setShowRibbon] = useState(false);

  useEffect(() => {
    if (show) {
      const timer = setTimeout(() => {
        setLogoAnimationComplete(true);
      }, 2000);
      const ribbonTimer = setTimeout(() => {
        setShowRibbon(true);
      }, 2500);
      return () => {
        clearTimeout(timer);
        clearTimeout(ribbonTimer);
      };
    }
  }, [show]);

  return (
    <div className="relative flex flex-col items-center justify-center min-h-[400px]">
      <AnimatePresence>
        {show && (
          <>
            {/* Initial Logo Animation */}
            <motion.div
              initial={{ opacity: 0, scale: 0, y: -100 }}
              animate={{ 
                opacity: [0, 1, 1, 0],
                scale: [0, 1, 1.2, 0],
                y: [-100, 0, 0, -50],
                rotate: [0, 360, 720, 1080]
              }}
              transition={{ 
                duration: 2,
                times: [0, 0.3, 0.7, 1],
                type: "spring",
                stiffness: 200
              }}
              className="absolute"
            >
              <img
                src="/logo.svg"
                alt="Finpercent Logo"
                className="w-40 h-40 object-contain"
              />
            </motion.div>

            {/* Medal Reveal */}
            {isLogoAnimationComplete && (
              <motion.div
                initial={{ opacity: 0, scale: 0, rotateY: 180 }}
                animate={{ opacity: 1, scale: 1, rotateY: 0 }}
                transition={{ 
                  duration: 0.8,
                  type: "spring",
                  stiffness: 300,
                  damping: 20
                }}
                className="relative z-10"
              >
                <div className="relative inline-block">
                  {/* Medal ribbon */}
                  {showRibbon && (
                    <motion.div
                      initial={{ height: 0 }}
                      animate={{ height: 120 }}
                      transition={{ duration: 0.5 }}
                      className="absolute left-1/2 -translate-x-1/2 -top-28 overflow-hidden"
                    >
                      <div className="relative w-24">
                        <div className={`w-full h-full bg-gradient-to-b ${rankingGradients[ranking]} opacity-80 
                                      transform -skew-x-12`} />
                        <div className={`absolute top-0 right-0 w-full h-full bg-gradient-to-b ${rankingGradients[ranking]} 
                                      opacity-80 transform skew-x-12`} />
                      </div>
                    </motion.div>
                  )}

                  {/* Medal outer ring */}
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: [1, 1.02, 1] }}
                    transition={{ 
                      duration: 3,
                      repeat: Infinity,
                      repeatType: "reverse"
                    }}
                    className={`absolute inset-0 border-[8px] ${rankingColors[ranking]} rounded-full opacity-20`}
                  />
                  
                  {/* Medal body */}
                  <motion.div
                    className={`relative z-10 p-14 border-[8px] ${rankingColors[ranking]} rounded-full 
                               bg-gradient-to-br ${rankingGradients[ranking]} bg-opacity-10 
                               backdrop-blur-sm ${medalShadows[ranking]}`}
                    initial={{ rotateY: 180 }}
                    animate={{ rotateY: 0 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                  >
                    <div className="relative flex flex-col items-center">
                      {/* Finpercent Logo Circle */}
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4, duration: 0.5 }}
                        className={`absolute -top-8 left-1/2 transform -translate-x-1/2 w-20 h-20 
                                  bg-white rounded-full p-3 border-2 border-opacity-20 ${rankingColors[ranking]}`}
                      >
                        <img
                          src="/logo.svg"
                          alt="Finpercent Logo"
                          className="w-full h-full object-contain"
                          style={{
                            filter: 'contrast(1.1) brightness(1.05)'
                          }}
                        />
                      </motion.div>

                      {/* Company Name */}
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.6 }}
                        className="mb-6 text-center"
                        style={etchedTextStyle}
                      >
                        <div className="text-base font-bold uppercase tracking-widest text-gray-800">
                          {companyName}
                        </div>
                      </motion.div>

                      {/* Award Icon */}
                      <Award className={`w-28 h-28 ${rankingColors[ranking]}`} />

                      {/* Decorative Stars */}
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
                        className="absolute inset-0 pointer-events-none"
                      >
                        {[...Array(8)].map((_, i) => (
                          <Star
                            key={i}
                            className={`w-3 h-3 absolute ${rankingColors[ranking]}`}
                            style={{
                              transform: `rotate(${i * 45}deg) translateY(-65px)`
                            }}
                          />
                        ))}
                      </motion.div>
                    </div>
                  </motion.div>

                  {/* Ranking text with crown */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.7 }}
                    className="mt-10 text-center"
                  >
                    <motion.div
                      initial={{ y: -20, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ delay: 1 }}
                      className="flex justify-center mb-3"
                    >
                      <Crown className={`w-10 h-10 ${rankingColors[ranking]}`} />
                    </motion.div>
                    <div className={`text-3xl font-bold bg-gradient-to-r ${rankingGradients[ranking]} 
                                   bg-clip-text text-transparent tracking-wider`}>
                      {ranking} Ranking
                    </div>
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 1.2 }}
                      className="text-lg text-gray-600 mt-2 font-medium"
                    >
                      Achievement Unlocked
                    </motion.div>
                  </motion.div>
                </div>
              </motion.div>
            )}

            {/* Subtle particle effects */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 2 }}
              className="absolute inset-0 pointer-events-none"
            >
              {[...Array(10)].map((_, i) => (
                <motion.div
                  key={i}
                  initial={{ 
                    x: 0, 
                    y: 0, 
                    scale: 0,
                    opacity: 0,
                    rotate: 0
                  }}
                  animate={{ 
                    x: Math.random() * 300 - 150,
                    y: Math.random() * 300 - 150,
                    scale: [0, 1, 0],
                    opacity: [0, 0.4, 0],
                    rotate: Math.random() * 360
                  }}
                  transition={{
                    duration: 2,
                    delay: 2 + (i * 0.1),
                    repeat: Infinity,
                    repeatDelay: 1
                  }}
                  className={`absolute w-2 h-2 ${i % 2 === 0 ? 'star-shape' : 'rounded-full'} 
                             bg-gradient-to-r ${rankingGradients[ranking]}`}
                  style={{
                    clipPath: i % 2 === 0 ? 'polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%)' : ''
                  }}
                />
              ))}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
