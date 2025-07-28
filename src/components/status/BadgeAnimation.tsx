import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface BadgeAnimationProps {
  show: boolean;
  ranking: 'Gold' | 'Silver' | 'Bronze';
  companyName?: string;
}

const rankingStyles = {
  Gold: {
    background: 'linear-gradient(135deg, #FFD700, #FFA500, #FFD700)',
    textColor: 'text-yellow-900',
    shadowColor: 'rgba(255, 215, 0, 0.4)',
    metallic: 'linear-gradient(145deg, #FFD700 0%, #FFA500 25%, #FFD700 50%, #FF8C00 75%, #FFD700 100%)',
    woodGrain: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100' height='100' viewBox='0 0 100 100'%3E%3Cpath d='M0 0h100v100H0z' fill='%23FFD700'/%3E%3Cpath d='M0 10c20-5 40 0 60-5s40 10 40 10v10c-20 5-40 0-60 5S0 25 0 25V10zm0 20c20-5 40 0 60-5s40 10 40 10v10c-20 5-40 0-60 5S0 45 0 45V30zm0 20c20-5 40 0 60-5s40 10 40 10v10c-20 5-40 0-60 5S0 65 0 65V50zm0 20c20-5 40 0 60-5s40 10 40 10v10c-20 5-40 0-60 5S0 85 0 85V70z' fill='%23FFA500' opacity='0.3'/%3E%3C/svg%3E")`,
  },
  Silver: {
    background: 'linear-gradient(135deg, #E8E8E8, #C0C0C0, #E8E8E8)',
    textColor: 'text-gray-700',
    shadowColor: 'rgba(192, 192, 192, 0.4)',
    metallic: 'linear-gradient(145deg, #E8E8E8 0%, #C0C0C0 25%, #E8E8E8 50%, #A8A8A8 75%, #E8E8E8 100%)',
    woodGrain: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100' height='100' viewBox='0 0 100 100'%3E%3Cpath d='M0 0h100v100H0z' fill='%23E8E8E8'/%3E%3Cpath d='M0 10c20-5 40 0 60-5s40 10 40 10v10c-20 5-40 0-60 5S0 25 0 25V10zm0 20c20-5 40 0 60-5s40 10 40 10v10c-20 5-40 0-60 5S0 45 0 45V30zm0 20c20-5 40 0 60-5s40 10 40 10v10c-20 5-40 0-60 5S0 65 0 65V50zm0 20c20-5 40 0 60-5s40 10 40 10v10c-20 5-40 0-60 5S0 85 0 85V70z' fill='%23C0C0C0' opacity='0.3'/%3E%3C/svg%3E")`,
  },
  Bronze: {
    background: 'linear-gradient(135deg, #CD7F32, #B87333, #CD7F32)',
    textColor: 'text-amber-900',
    shadowColor: 'rgba(205, 127, 50, 0.4)',
    metallic: 'linear-gradient(145deg, #CD7F32 0%, #B87333 25%, #CD7F32 50%, #A0522D 75%, #CD7F32 100%)',
    woodGrain: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100' height='100' viewBox='0 0 100 100'%3E%3Cpath d='M0 0h100v100H0z' fill='%23CD7F32'/%3E%3Cpath d='M0 10c20-5 40 0 60-5s40 10 40 10v10c-20 5-40 0-60 5S0 25 0 25V10zm0 20c20-5 40 0 60-5s40 10 40 10v10c-20 5-40 0-60 5S0 45 0 45V30zm0 20c20-5 40 0 60-5s40 10 40 10v10c-20 5-40 0-60 5S0 65 0 65V50zm0 20c20-5 40 0 60-5s40 10 40 10v10c-20 5-40 0-60 5S0 85 0 85V70z' fill='%23B87333' opacity='0.3'/%3E%3C/svg%3E")`,
  }
};

export default function BadgeAnimation({ show, ranking, companyName = "Tech Innovations Inc." }: BadgeAnimationProps) {
  const [animationPhase, setAnimationPhase] = useState(0);
  const [showStars, setShowStars] = useState(false);
  
  const style = rankingStyles[ranking];

  useEffect(() => {
    if (show) {
      const phases = [
        { delay: 0, phase: 1 },
        { delay: 1000, phase: 2 },
        { delay: 1500, phase: 3 },
        { delay: 2000, phase: 4 }
      ];

      phases.forEach(({ delay, phase }) => {
        setTimeout(() => setAnimationPhase(phase), delay);
      });

      if (ranking === 'Gold') {
        setTimeout(() => setShowStars(true), 2500);
      }
    }
  }, [show, ranking]);

  const renderStars = () => {
    if (ranking !== 'Gold' || !showStars) return null;
    
    return (
      <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 flex space-x-1">
        {[1, 2, 3].map((star) => (
          <motion.div
            key={star}
            initial={{ scale: 0, rotate: 0, opacity: 0 }}
            animate={{ 
              scale: [0, 1.5, 1], 
              rotate: [0, 180, 360], 
              opacity: [0, 1, 1] 
            }}
            transition={{
              duration: 0.8,
              delay: star * 0.2,
              type: "spring",
              stiffness: 200
            }}
            className="relative"
          >
            <motion.div
              animate={{ 
                rotate: 360,
                scale: [1, 1.1, 1]
              }}
              transition={{
                rotate: { duration: 4, repeat: Infinity, ease: "linear" },
                scale: { duration: 2, repeat: Infinity, ease: "easeInOut" }
              }}
              className="w-6 h-6 text-yellow-400"
              style={{
                clipPath: 'polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%)',
                background: 'linear-gradient(145deg, #FFD700, #FFA500)',
                filter: 'drop-shadow(0 0 6px rgba(255, 215, 0, 0.8))'
              }}
            />
          </motion.div>
        ))}
      </div>
    );
  };

  return (
    <div className="relative flex flex-col items-center justify-center min-h-[500px] p-8">
      <AnimatePresence>
        {show && (
          <motion.div
            initial={{ opacity: 0, scale: 0.5, rotateY: -180 }}
            animate={{ 
              opacity: 1, 
              scale: 1, 
              rotateY: 0 
            }}
            transition={{
              duration: 1.2,
              type: "spring",
              stiffness: 100,
              damping: 15
            }}
            className="relative"
          >
            {/* Badge Container */}
            <motion.div
              className="relative w-80 h-96 rounded-3xl overflow-hidden"
              style={{
                background: style.woodGrain,
                backgroundSize: 'cover',
                boxShadow: `0 20px 40px ${style.shadowColor}, inset 0 1px 0 rgba(255,255,255,0.1)`,
                border: '3px solid rgba(255,255,255,0.2)'
              }}
              animate={{
                boxShadow: [
                  `0 20px 40px ${style.shadowColor}, inset 0 1px 0 rgba(255,255,255,0.1)`,
                  `0 25px 50px ${style.shadowColor}, inset 0 1px 0 rgba(255,255,255,0.2)`,
                  `0 20px 40px ${style.shadowColor}, inset 0 1px 0 rgba(255,255,255,0.1)`
                ]
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            >
              {/* Metallic Overlay */}
              <div 
                className="absolute inset-0 opacity-60"
                style={{
                  background: style.metallic,
                  mixBlendMode: 'overlay'
                }}
              />
              
              {/* Animated Stars for Gold */}
              {renderStars()}

              {/* Badge Content */}
              <div className="relative z-10 flex flex-col items-center justify-center h-full p-8 text-center">
                
                {/* Ranking Title */}
                <motion.h2
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: animationPhase >= 1 ? 1 : 0, y: animationPhase >= 1 ? 0 : -20 }}
                  transition={{ duration: 0.6, delay: 0.3 }}
                  className={`text-4xl font-bold mb-8 ${style.textColor}`}
                  style={{
                    fontFamily: 'serif',
                    textShadow: '2px 2px 4px rgba(0,0,0,0.3)',
                    letterSpacing: '2px'
                  }}
                >
                  {ranking}
                </motion.h2>

                {/* FinPercent Logo */}
                <motion.div
                  initial={{ opacity: 0, scale: 0, rotate: -180 }}
                  animate={{ 
                    opacity: animationPhase >= 2 ? 1 : 0, 
                    scale: animationPhase >= 2 ? 1 : 0,
                    rotate: animationPhase >= 2 ? 0 : -180
                  }}
                  transition={{ duration: 0.8, type: "spring", stiffness: 150 }}
                  className="relative mb-6"
                >
                  <div className="w-24 h-24 rounded-full bg-white/90 p-4 shadow-lg">
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                    >
                      <svg viewBox="0 0 100 100" className="w-full h-full">
                        <defs>
                          <linearGradient id="logoGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                            <stop offset="0%" stopColor="#22c55e" />
                            <stop offset="100%" stopColor="#16a34a" />
                          </linearGradient>
                        </defs>
                        <text
                          x="50"
                          y="60"
                          textAnchor="middle"
                          fontSize="24"
                          fontWeight="bold"
                          fill="url(#logoGradient)"
                          fontFamily="Manrope, sans-serif"
                        >
                          %
                        </text>
                      </svg>
                    </motion.div>
                  </div>
                </motion.div>

                {/* FinPercent Text */}
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: animationPhase >= 3 ? 1 : 0, y: animationPhase >= 3 ? 0 : 10 }}
                  transition={{ duration: 0.6 }}
                  className={`text-xl font-bold mb-6 ${style.textColor}`}
                  style={{
                    textShadow: '1px 1px 2px rgba(0,0,0,0.3)',
                    letterSpacing: '1px'
                  }}
                >
                  finpercent
                </motion.div>

                {/* Company Name */}
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: animationPhase >= 4 ? 1 : 0, y: animationPhase >= 4 ? 0 : 10 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  className="mt-auto"
                >
                  <div 
                    className={`text-lg font-semibold ${style.textColor} px-4 py-2 bg-black/10 rounded-lg backdrop-blur-sm`}
                    style={{
                      textShadow: '1px 1px 2px rgba(0,0,0,0.3)',
                      border: '1px solid rgba(255,255,255,0.2)'
                    }}
                  >
                    {companyName}
                  </div>
                </motion.div>
              </div>

              {/* Animated Light Reflection */}
              <motion.div
                className="absolute inset-0 opacity-20"
                animate={{
                  background: [
                    'linear-gradient(45deg, transparent 30%, rgba(255,255,255,0.5) 50%, transparent 70%)',
                    'linear-gradient(225deg, transparent 30%, rgba(255,255,255,0.5) 50%, transparent 70%)',
                    'linear-gradient(45deg, transparent 30%, rgba(255,255,255,0.5) 50%, transparent 70%)'
                  ]
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              />
            </motion.div>

            {/* Floating Particles for Gold */}
            {ranking === 'Gold' && showStars && (
              <div className="absolute inset-0 pointer-events-none">
                {[...Array(12)].map((_, i) => (
                  <motion.div
                    key={i}
                    initial={{ 
                      opacity: 0,
                      scale: 0,
                      x: 0,
                      y: 0
                    }}
                    animate={{
                      opacity: [0, 1, 0],
                      scale: [0, 1, 0],
                      x: [0, (Math.random() - 0.5) * 400],
                      y: [0, (Math.random() - 0.5) * 400],
                      rotate: [0, 360]
                    }}
                    transition={{
                      duration: 3,
                      delay: i * 0.2,
                      repeat: Infinity,
                      repeatDelay: 2
                    }}
                    className="absolute w-2 h-2 bg-yellow-400 rounded-full"
                    style={{
                      left: '50%',
                      top: '50%',
                      filter: 'drop-shadow(0 0 4px rgba(255, 215, 0, 0.8))'
                    }}
                  />
                ))}
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
