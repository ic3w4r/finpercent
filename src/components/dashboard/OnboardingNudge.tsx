import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  AlertCircle, 
  ChevronRight, 
  X, 
  CheckCircle, 
  Clock,
  TrendingUp,
  Sparkles
} from 'lucide-react';
import '../../styles/neomorphic.css';

interface OnboardingNudgeProps {
  isOnboardingComplete: boolean;
  onboardingProgress: number;
  onStartOnboarding: () => void;
}

const OnboardingNudge: React.FC<OnboardingNudgeProps> = ({
  isOnboardingComplete,
  onboardingProgress,
  onStartOnboarding
}) => {
  const [isDismissed, setIsDismissed] = useState(false);

  if (isOnboardingComplete || isDismissed) return null;

  const getProgressMessage = () => {
    if (onboardingProgress === 0) {
      return "Get started with your financial journey";
    } else if (onboardingProgress < 50) {
      return "Continue your setup process";
    } else {
      return "You're almost done! Complete your profile";
    }
  };

  const getProgressColor = () => {
    if (onboardingProgress < 25) return 'from-orange-500 to-red-500';
    if (onboardingProgress < 50) return 'from-yellow-500 to-orange-500';
    if (onboardingProgress < 75) return 'from-primary-500 to-blue-500';
    return 'from-green-500 to-primary-600';
  };

  const getBadgeIcon = () => {
    if (onboardingProgress === 0) return AlertCircle;
    if (onboardingProgress < 100) return Clock;
    return CheckCircle;
  };

  const BadgeIcon = getBadgeIcon();

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: -20, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: -20, scale: 0.95 }}
        transition={{ 
          duration: 0.6,
          type: 'spring',
          stiffness: 200,
          damping: 20
        }}
        className="mb-6 relative overflow-hidden font-['Manrope']"
      >
        {/* Clean card without borders */}
        <div className="relative bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border-0">
          {/* Animated background shimmer */}
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-transparent via-primary-100/30 to-transparent opacity-40 rounded-2xl"
            initial={{ x: '-100%' }}
            animate={{ x: '100%' }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: 'linear'
            }}
          />
          
          <div className="relative flex items-center justify-between">
            <div className="flex items-center space-x-6">
              <div className="relative">
                {/* Clean main progress indicator without borders */}
                <div className={`
                  w-16 h-16 rounded-full flex items-center justify-center shadow-lg
                  bg-gradient-to-r ${getProgressColor()} text-white
                `}>
                  <motion.div
                    animate={{ 
                      scale: [1, 1.05, 1],
                      rotate: onboardingProgress === 0 ? [0, 3, -3, 0] : 0
                    }}
                    transition={{
                      scale: { duration: 2, repeat: Infinity, ease: 'easeInOut' },
                      rotate: { duration: 2, repeat: Infinity, ease: 'easeInOut' }
                    }}
                  >
                    <BadgeIcon className="w-7 h-7" />
                  </motion.div>
                </div>
                
                {/* Floating sparkles for active state */}
                {onboardingProgress > 0 && (
                  <>
                    {[...Array(3)].map((_, i) => (
                      <motion.div
                        key={i}
                        className="absolute w-2 h-2 bg-yellow-400 rounded-full"
                        style={{
                          left: `${20 + i * 15}px`,
                          top: `${10 + i * 8}px`
                        }}
                        animate={{
                          scale: [0, 1, 0],
                          rotate: [0, 180, 360],
                          opacity: [0, 1, 0]
                        }}
                        transition={{
                          duration: 2,
                          delay: i * 0.3,
                          repeat: Infinity,
                          ease: 'easeInOut'
                        }}
                      />
                    ))}
                  </>
                )}

                {/* Clean progress ring without borders */}
                <svg
                  className="absolute -inset-2 w-20 h-20 transform -rotate-90"
                  viewBox="0 0 80 80"
                >
                  <circle
                    cx="40"
                    cy="40"
                    r="32"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    className="text-gray-200"
                  />
                  <motion.circle
                    cx="40"
                    cy="40"
                    r="32"
                    fill="none"
                    stroke="url(#progress-gradient)"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeDasharray={`${2 * Math.PI * 32}`}
                    initial={{ strokeDashoffset: 2 * Math.PI * 32 }}
                    animate={{ 
                      strokeDashoffset: 2 * Math.PI * 32 * (1 - onboardingProgress / 100)
                    }}
                    transition={{ duration: 1.5, ease: 'easeInOut' }}
                  />
                  <defs>
                    <linearGradient id="progress-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor={onboardingProgress < 50 ? '#f59e0b' : '#10b981'} />
                      <stop offset="100%" stopColor={onboardingProgress < 50 ? '#ef4444' : '#22c55e'} />
                    </linearGradient>
                  </defs>
                </svg>
              </div>
              
              <div>
                <div className="flex items-center space-x-3 mb-2">
                  <h3 className="text-xl font-bold text-primary-900 dark:text-white">
                    Complete Your Setup
                  </h3>
                  <div className="flex items-center space-x-2">
                    <div className="px-3 py-1 bg-gradient-to-r from-green-100 to-primary-100 rounded-full flex items-center space-x-1 shadow-sm">
                      <TrendingUp className="w-4 h-4 text-green-600" />
                      <span className="text-sm font-bold text-green-700">
                        {onboardingProgress}% Complete
                      </span>
                    </div>
                    {onboardingProgress > 50 && (
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
                      >
                        <Sparkles className="w-5 h-5 text-yellow-500" />
                      </motion.div>
                    )}
                  </div>
                </div>
                <p className="text-primary-700 dark:text-gray-400 mb-3 font-medium">
                  {getProgressMessage()}
                </p>
                
                {onboardingProgress > 0 && (
                  <div className="flex items-center space-x-4">
                    <div className="flex-1 bg-gray-100 rounded-full p-1 max-w-xs shadow-inner">
                      <motion.div
                        className={`h-2 rounded-full bg-gradient-to-r ${getProgressColor()} relative overflow-hidden shadow-sm`}
                        initial={{ width: 0 }}
                        animate={{ width: `${onboardingProgress}%` }}
                        transition={{ duration: 1.2, ease: 'easeInOut' }}
                      >
                        {/* Animated shine effect */}
                        <motion.div
                          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/50 to-transparent"
                          initial={{ x: '-100%' }}
                          animate={{ x: '100%' }}
                          transition={{
                            duration: 2,
                            repeat: Infinity,
                            ease: 'linear'
                          }}
                        />
                      </motion.div>
                    </div>
                    <span className="text-sm font-bold text-primary-600 dark:text-primary-400">
                      {Math.round(onboardingProgress)}%
                    </span>
                  </div>
                )}
              </div>
            </div>
            
            <div className="flex items-center space-x-3">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={onStartOnboarding}
                className={`
                  px-8 py-4 rounded-xl font-bold flex items-center space-x-3 text-white shadow-lg
                  bg-gradient-to-r ${getProgressColor()} hover:shadow-xl transition-all duration-300
                  focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 border-0
                `}
              >
                <span className="text-lg">
                  {onboardingProgress === 0 ? 'Get Started' : 'Continue Setup'}
                </span>
                <motion.div
                  animate={{ x: [0, 5, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
                >
                  <ChevronRight className="w-5 h-5" />
                </motion.div>
              </motion.button>
              
              <button
                onClick={() => setIsDismissed(true)}
                className="p-3 rounded-full text-gray-500 hover:text-red-500 hover:bg-red-50 transition-all shadow-sm border-0 bg-gray-50"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default OnboardingNudge;