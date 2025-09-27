import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import SankeyDiagram from '../components/charts/SankeyDiagram';
import OnboardingNudge from '../components/dashboard/OnboardingNudge';
import OnboardingFlow from '../components/onboarding/OnboardingFlow';
import { useOnboarding } from '../contexts/OnboardingContext';

export default function DashboardPage() {
  const [showBadgeAnimation, setShowBadgeAnimation] = useState(true);
  const [showOnboardingFlow, setShowOnboardingFlow] = useState(false);
  const { isOnboardingComplete, onboardingProgress, setOnboardingComplete } = useOnboarding();

  useEffect(() => {
    // Badge animation sequence
    const timer = setTimeout(() => {
      setShowBadgeAnimation(false);
    }, 4000);

    return () => clearTimeout(timer);
  }, []);

  const handleStartOnboarding = () => {
    setShowOnboardingFlow(true);
  };

  const handleOnboardingComplete = () => {
    setOnboardingComplete(true);
    setShowOnboardingFlow(false);
    // You could add celebration animation here
  };

  const handleCloseOnboarding = () => {
    setShowOnboardingFlow(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 via-beige-50 to-primary-100 p-6 pb-20">
      <div className="max-w-7xl mx-auto">
        {/* Onboarding Nudge */}
        <OnboardingNudge
          isOnboardingComplete={isOnboardingComplete}
          onboardingProgress={onboardingProgress}
          onStartOnboarding={handleStartOnboarding}
        />

        {/* Badge Animation */}
        {showBadgeAnimation && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            className="text-center mb-8"
          >
            <div className="relative inline-flex items-center justify-center">
              {/* Initial Gold Badge */}
              <motion.div
                initial={{ opacity: 1, scale: 1, rotate: 0 }}
                animate={{ 
                  opacity: [1, 1, 0],
                  scale: [1, 1.2, 0.8],
                  rotate: [0, 180, 360]
                }}
                transition={{ 
                  duration: 2,
                  times: [0, 0.7, 1],
                  ease: "easeInOut"
                }}
                className="absolute"
              >
                <img 
                  src="/badges/gold-badge.svg" 
                  alt="Gold Badge" 
                  className="w-32 h-40 object-contain drop-shadow-2xl"
                />
              </motion.div>

              {/* Morphing FinPercent Logo */}
              <motion.div
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ 
                  opacity: [0, 0, 1, 1],
                  scale: [0.5, 0.5, 1, 1]
                }}
                transition={{ 
                  duration: 2,
                  times: [0, 0.7, 0.8, 1],
                  delay: 1.5
                }}
                className="flex flex-col items-center"
              >
                <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-lg mb-4">
                  <div className="text-green-600 text-2xl font-bold">
                    <div className="flex items-center">
                      <div className="w-3 h-3 bg-green-600 rounded-full mr-1"></div>
                      <div className="text-3xl">%</div>
                      <div className="w-3 h-3 bg-green-600 rounded-full ml-1"></div>
                    </div>
                  </div>
                </div>
                <div className="text-2xl font-bold text-green-600">finpercent</div>
              </motion.div>

              {/* Particle Effects */}
              {[...Array(8)].map((_, i) => (
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
                    y: [0, (Math.random() - 0.5) * 400]
                  }}
                  transition={{
                    duration: 3,
                    delay: 1 + i * 0.1,
                    ease: "easeOut"
                  }}
                  className="absolute w-2 h-2 bg-yellow-400 rounded-full"
                />
              ))}
            </div>
          </motion.div>
        )}

        {/* Main Dashboard Content */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ 
            opacity: showBadgeAnimation ? 0 : 1,
            y: showBadgeAnimation ? 20 : 0
          }}
          transition={{ delay: showBadgeAnimation ? 0 : 4, duration: 0.8 }}
        >
          {/* Dashboard Header */}
          <div className="text-center mb-8">
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: showBadgeAnimation ? 0 : 4.2 }}
              className="flex flex-col items-center space-y-2"
            >
              <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-lg">
                <div className="text-green-600 text-lg font-bold">
                  <div className="flex items-center">
                    <div className="w-2 h-2 bg-green-600 rounded-full mr-1"></div>
                    <div className="text-xl">%</div>
                    <div className="w-2 h-2 bg-green-600 rounded-full ml-1"></div>
                  </div>
                </div>
              </div>
              <h1 className="text-3xl font-bold text-primary-900 dark:text-primary-100">
                Financial Dashboard
              </h1>
              <p className="text-gray-600 dark:text-gray-400">
                Comprehensive overview of your financial metrics and insights
              </p>
            </motion.div>
          </div>

          {/* Sankey Diagram */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: showBadgeAnimation ? 0 : 4.5, duration: 0.8 }}
            className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6"
          >
            <div className="mb-6">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold text-green-600 dark:text-green-400">
                  Financial Flow Analysis
                </h2>
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  <span className="text-sm text-gray-600 dark:text-gray-400">LIVE DATA</span>
                </div>
              </div>
              <p className="text-gray-600 dark:text-gray-400">
                Interactive visualization showing revenue flows and expense breakdown
              </p>
            </div>
            
            <SankeyDiagram />
          </motion.div>

          {/* Additional Dashboard Components can be added here */}
        </motion.div>

        {/* Onboarding Flow Modal */}
        <OnboardingFlow
          isOpen={showOnboardingFlow}
          onClose={handleCloseOnboarding}
          onComplete={handleOnboardingComplete}
        />
      </div>
    </div>
  );
}