import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  AlertCircle, 
  ChevronRight, 
  X, 
  CheckCircle, 
  Clock,
  TrendingUp
} from 'lucide-react';

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
    if (onboardingProgress < 25) return 'from-red-500 to-orange-500';
    if (onboardingProgress < 50) return 'from-yellow-500 to-orange-500';
    if (onboardingProgress < 75) return 'from-blue-500 to-cyan-500';
    return 'from-green-500 to-blue-500';
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: -20, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: -20, scale: 0.95 }}
        transition={{ 
          duration: 0.5,
          type: 'spring',
          stiffness: 200,
          damping: 20
        }}
        className="mb-6 relative overflow-hidden"
      >
        <div className={`
          relative bg-gradient-to-r ${getProgressColor()} rounded-2xl p-1
          shadow-lg hover:shadow-xl transition-all duration-300
        `}>
          {/* Animated background gradient */}
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
            initial={{ x: '-100%' }}
            animate={{ x: '100%' }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: 'linear'
            }}
          />
          
          <div className="relative bg-white dark:bg-gray-900 rounded-xl p-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="relative">
                  <motion.div
                    animate={{ 
                      rotate: 360,
                      scale: [1, 1.1, 1]
                    }}
                    transition={{
                      rotate: { duration: 20, repeat: Infinity, ease: 'linear' },
                      scale: { duration: 2, repeat: Infinity, ease: 'easeInOut' }
                    }}
                    className={`
                      w-12 h-12 rounded-full flex items-center justify-center
                      bg-gradient-to-r ${getProgressColor()}
                    `}
                  >
                    {onboardingProgress === 0 ? (
                      <AlertCircle className="w-6 h-6 text-white" />
                    ) : onboardingProgress < 100 ? (
                      <Clock className="w-6 h-6 text-white" />
                    ) : (
                      <CheckCircle className="w-6 h-6 text-white" />
                    )}
                  </motion.div>
                  
                  {/* Progress ring */}
                  <svg
                    className="absolute -inset-2 w-16 h-16 transform -rotate-90"
                    viewBox="0 0 64 64"
                  >
                    <circle
                      cx="32"
                      cy="32"
                      r="28"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="3"
                      className="text-gray-300 dark:text-gray-600"
                    />
                    <motion.circle
                      cx="32"
                      cy="32"
                      r="28"
                      fill="none"
                      stroke="url(#progress-gradient)"
                      strokeWidth="3"
                      strokeLinecap="round"
                      strokeDasharray={`${2 * Math.PI * 28}`}
                      initial={{ strokeDashoffset: 2 * Math.PI * 28 }}
                      animate={{ 
                        strokeDashoffset: 2 * Math.PI * 28 * (1 - onboardingProgress / 100)
                      }}
                      transition={{ duration: 1, ease: 'easeInOut' }}
                    />
                    <defs>
                      <linearGradient id="progress-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor={onboardingProgress < 50 ? '#f59e0b' : '#10b981'} />
                        <stop offset="100%" stopColor={onboardingProgress < 50 ? '#ef4444' : '#3b82f6'} />
                      </linearGradient>
                    </defs>
                  </svg>
                </div>
                
                <div>
                  <div className="flex items-center space-x-2 mb-1">
                    <h3 className="text-lg font-bold text-gray-900 dark:text-white">
                      Complete Your Setup
                    </h3>
                    <div className="flex items-center space-x-1">
                      <TrendingUp className="w-4 h-4 text-green-500" />
                      <span className="text-sm font-medium text-green-600 dark:text-green-400">
                        {onboardingProgress}% Complete
                      </span>
                    </div>
                  </div>
                  <p className="text-gray-600 dark:text-gray-400">
                    {getProgressMessage()}
                  </p>
                  
                  {onboardingProgress > 0 && (
                    <div className="mt-2 flex items-center space-x-4">
                      <div className="flex-1 bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                        <motion.div
                          className={`h-2 rounded-full bg-gradient-to-r ${getProgressColor()}`}
                          initial={{ width: 0 }}
                          animate={{ width: `${onboardingProgress}%` }}
                          transition={{ duration: 1, ease: 'easeInOut' }}
                        />
                      </div>
                      <span className="text-xs text-gray-500 dark:text-gray-400">
                        {Math.round(onboardingProgress)}%
                      </span>
                    </div>
                  )}
                </div>
              </div>
              
              <div className="flex items-center space-x-2">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={onStartOnboarding}
                  className={`
                    px-6 py-3 rounded-xl font-semibold flex items-center space-x-2
                    bg-gradient-to-r ${getProgressColor()} text-white
                    hover:shadow-lg transition-all duration-200
                    focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2
                  `}
                >
                  <span>
                    {onboardingProgress === 0 ? 'Get Started' : 'Continue Setup'}
                  </span>
                  <ChevronRight className="w-4 h-4" />
                </motion.button>
                
                <button
                  onClick={() => setIsDismissed(true)}
                  className="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default OnboardingNudge;