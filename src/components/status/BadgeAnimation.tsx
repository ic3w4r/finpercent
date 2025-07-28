import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface BadgeAnimationProps {
  show: boolean;
  ranking: 'Gold' | 'Silver' | 'Bronze';
  companyName?: string;
}

const badgeImages = {
  Gold: '/badges/gold-badge.svg', // Your gold badge data
  Silver: '/badges/gold-badge.svg', // Your silver badge data  
  Bronze: '/badges/gold-badge.svg' // Your bronze badge data
};

const badgeAnimationSettings = {
  Gold: {
    glowColor: 'rgba(255, 215, 0, 0.6)',
    starCount: 3,
    particleCount: 15,
    specialEffects: true
  },
  Silver: {
    glowColor: 'rgba(192, 192, 192, 0.6)',
    starCount: 0,
    particleCount: 8,
    specialEffects: false
  },
  Bronze: {
    glowColor: 'rgba(205, 127, 50, 0.6)',
    starCount: 0,
    particleCount: 5,
    specialEffects: false
  }
};

export default function BadgeAnimation({ show, ranking, companyName = "Tech Innovations Inc." }: BadgeAnimationProps) {
  const [animationPhase, setAnimationPhase] = useState(0);
  const [showStars, setShowStars] = useState(false);
  const [showParticles, setShowParticles] = useState(false);
  
  const settings = badgeAnimationSettings[ranking];

  useEffect(() => {
    if (show) {
      const phases = [
        { delay: 500, phase: 1 },   // Initial scale and reveal
        { delay: 1000, phase: 2 },  // Company name appears
        { delay: 1500, phase: 3 },  // Stars appear (if Gold)
        { delay: 2000, phase: 4 }   // Particles start (if applicable)
      ];

      phases.forEach(({ delay, phase }) => {
        setTimeout(() => setAnimationPhase(phase), delay);
      });

      if (settings.starCount > 0) {
        setTimeout(() => setShowStars(true), 1800);
      }

      if (settings.particleCount > 0) {
        setTimeout(() => setShowParticles(true), 2200);
      }
    }
  }, [show, ranking, settings]);

  const renderStars = () => {
    if (!showStars || settings.starCount === 0) return null;
    
    return (
      <div className="absolute -top-16 left-1/2 transform -translate-x-1/2 flex space-x-2">
        {[...Array(settings.starCount)].map((_, i) => (
          <motion.div
            key={i}
            initial={{ scale: 0, rotate: 0, opacity: 0 }}
            animate={{ 
              scale: [0, 1.5, 1], 
              rotate: [0, 360, 720], 
              opacity: [0, 1, 1] 
            }}
            transition={{
              duration: 1.2,
              delay: i * 0.15,
              type: "spring",
              stiffness: 200
            }}
            className="relative"
          >
            <motion.div
              animate={{ 
                rotate: 360,
                scale: [1, 1.2, 1]
              }}
              transition={{
                rotate: { duration: 5, repeat: Infinity, ease: "linear" },
                scale: { duration: 3, repeat: Infinity, ease: "easeInOut" }
              }}
              className="w-8 h-8 bg-yellow-400"
              style={{
                clipPath: 'polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%)',
                filter: `drop-shadow(0 0 8px ${settings.glowColor})`,
                background: 'linear-gradient(145deg, #FFD700, #FFA500)'
              }}
            />
          </motion.div>
        ))}
      </div>
    );
  };

  const renderParticles = () => {
    if (!showParticles || settings.particleCount === 0) return null;

    return (
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {[...Array(settings.particleCount)].map((_, i) => (
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
              x: [0, (Math.random() - 0.5) * 600],
              y: [0, (Math.random() - 0.5) * 600],
              rotate: [0, 360]
            }}
            transition={{
              duration: 4,
              delay: i * 0.3,
              repeat: Infinity,
              repeatDelay: 3
            }}
            className={`absolute w-3 h-3 rounded-full`}
            style={{
              left: '50%',
              top: '50%',
              background: ranking === 'Gold' ? 'linear-gradient(45deg, #FFD700, #FFA500)' :
                         ranking === 'Silver' ? 'linear-gradient(45deg, #E8E8E8, #C0C0C0)' :
                         'linear-gradient(45deg, #CD7F32, #B87333)',
              filter: `drop-shadow(0 0 6px ${settings.glowColor})`
            }}
          />
        ))}
      </div>
    );
  };

  return (
    <div className="relative flex flex-col items-center justify-center min-h-[600px] p-8">
      <AnimatePresence>
        {show && (
          <motion.div
            initial={{ opacity: 0, scale: 0.3, rotateY: -90 }}
            animate={{ 
              opacity: 1, 
              scale: 1, 
              rotateY: 0 
            }}
            transition={{
              duration: 1,
              type: "spring",
              stiffness: 120,
              damping: 20
            }}
            className="relative"
          >
            {/* Stars for Gold */}
            {renderStars()}

            {/* Main Badge Container */}
            <motion.div
              className="relative"
              animate={{
                boxShadow: [
                  `0 20px 40px ${settings.glowColor}`,
                  `0 30px 60px ${settings.glowColor}`,
                  `0 20px 40px ${settings.glowColor}`
                ]
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            >
              {/* Badge Image */}
              <motion.img
                src={badgeImages[ranking]}
                alt={`${ranking} Badge`}
                className="w-80 h-96 object-contain drop-shadow-2xl"
                initial={{ filter: 'brightness(0.8)' }}
                animate={{ 
                  filter: [
                    'brightness(0.8)',
                    'brightness(1.1)',
                    'brightness(0.8)'
                  ]
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              />

              {/* Company Name Overlay */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ 
                  opacity: animationPhase >= 2 ? 1 : 0, 
                  y: animationPhase >= 2 ? 0 : 20 
                }}
                transition={{ duration: 0.8, delay: 0.3 }}
                className="absolute bottom-8 left-1/2 transform -translate-x-1/2 w-full px-8"
              >
                <div className="bg-black/30 backdrop-blur-md rounded-lg p-4 border border-white/20">
                  <div 
                    className="text-white text-lg font-bold text-center tracking-wide"
                    style={{
                      textShadow: '2px 2px 4px rgba(0,0,0,0.8)',
                      fontFamily: 'serif'
                    }}
                  >
                    {companyName}
                  </div>
                </div>
              </motion.div>

              {/* Animated Light Sweep */}
              <motion.div
                className="absolute inset-0 opacity-30 pointer-events-none"
                animate={{
                  background: [
                    'linear-gradient(45deg, transparent 30%, rgba(255,255,255,0.6) 50%, transparent 70%)',
                    'linear-gradient(225deg, transparent 30%, rgba(255,255,255,0.6) 50%, transparent 70%)',
                    'linear-gradient(45deg, transparent 30%, rgba(255,255,255,0.6) 50%, transparent 70%)'
                  ]
                }}
                transition={{
                  duration: 6,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
                style={{
                  borderRadius: '24px'
                }}
              />
            </motion.div>

            {/* Floating Particles */}
            {renderParticles()}

            {/* Pulsing Ring Effect for Gold */}
            {ranking === 'Gold' && animationPhase >= 3 && (
              <motion.div
                className="absolute inset-0"
                initial={{ scale: 1, opacity: 0 }}
                animate={{ 
                  scale: [1, 1.3, 1],
                  opacity: [0, 0.4, 0]
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeOut"
                }}
              >
                <div 
                  className="w-full h-full border-4 border-yellow-400 rounded-3xl"
                  style={{
                    filter: 'drop-shadow(0 0 20px rgba(255, 215, 0, 0.8))'
                  }}
                />
              </motion.div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
