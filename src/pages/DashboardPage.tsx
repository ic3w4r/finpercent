import { useEffect, useState } from 'react';
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
    // Badge animation sequence - shorter duration
    const timer = setTimeout(() => {
      setShowBadgeAnimation(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  const handleStartOnboarding = () => {
    setShowOnboardingFlow(true);
  };

  const handleOnboardingComplete = () => {
    setOnboardingComplete(true);
    setShowOnboardingFlow(false);
  };

  const handleCloseOnboarding = () => {
    setShowOnboardingFlow(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 via-beige-50 to-primary-100 p-6 pb-20">
      <div className="max-w-7xl mx-auto">
        {/* Onboarding Nudge - Always visible when not complete */}
        <OnboardingNudge
          isOnboardingComplete={isOnboardingComplete}
          onboardingProgress={onboardingProgress}
          onStartOnboarding={handleStartOnboarding}
        />

        {/* Badge Animation - Only show briefly */}
        {showBadgeAnimation && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            className="text-center mb-8 fixed inset-0 flex items-center justify-center bg-gradient-to-br from-primary-50 via-beige-50 to-primary-100 z-40"
          >
            <div className="relative inline-flex items-center justify-center">
              {/* Initial Gold Badge */}
              <motion.div
                initial={{ opacity: 1, scale: 1, rotate: 0 }}
                animate={{ 
                  opacity: [1, 1, 0],
                  scale: [1, 1.1, 0.8],
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
                  times: [0, 0.6, 0.8, 1],
                  delay: 1
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
              {[...Array(6)].map((_, i) => (
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
                    x: [0, (Math.random() - 0.5) * 300],
                    y: [0, (Math.random() - 0.5) * 300]
                  }}
                  transition={{
                    duration: 2,
                    delay: 1 + i * 0.1,
                    ease: "easeOut"
                  }}
                  className="absolute w-2 h-2 bg-yellow-400 rounded-full"
                />
              ))}
            </div>
          </motion.div>
        )}

        {/* Main Dashboard Content - Always show after brief delay */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: showBadgeAnimation ? 3.2 : 0, duration: 0.6 }}
        >
          {/* Dashboard Header */}
          <div className="text-center mb-8">
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: showBadgeAnimation ? 3.4 : 0.2 }}
              className="flex flex-col items-center space-y-2"
            >
              <div className="neo-button glass-action w-12 h-12 flex items-center justify-center bg-white/25 dark:bg-gray-800/40 backdrop-blur-sm border border-white/10 dark:border-gray-700/30 shadow-inner shadow-md">
                <div className="text-primary-600 text-lg font-bold">
                  <div className="flex items-center">
                    <div className="w-2 h-2 bg-primary-600 rounded-full mr-1"></div>
                    <div className="text-xl">%</div>
                    <div className="w-2 h-2 bg-primary-600 rounded-full ml-1"></div>
                  </div>
                </div>
              </div>
              <h1 className="text-3xl font-bold text-primary-900 dark:text-primary-100 font-['Manrope']">
                Financial Dashboard
              </h1>
              <p className="text-primary-700 dark:text-gray-400 font-['Manrope']">
                Comprehensive overview of your financial metrics and insights
              </p>
            </motion.div>
          </div>

          {/* Quick Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            {[
              { title: 'Total Revenue', value: '₹25,00,000', change: '+12%', color: 'text-green-600' },
              { title: 'Monthly Profit', value: '₹3,50,000', change: '+8%', color: 'text-blue-600' },
              { title: 'Active Investments', value: '₹12,75,000', change: '+15%', color: 'text-purple-600' },
              { title: 'Growth Rate', value: '18.5%', change: '+5%', color: 'text-orange-600' }
            ].map((stat, index) => (
              <motion.div
                key={stat.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: (showBadgeAnimation ? 3.6 : 0.4) + index * 0.1 }}
                className="neo-card p-6 text-center bg-white/20 dark:bg-gray-800/30 backdrop-blur-sm border border-white/10 dark:border-gray-700/30 shadow-lg hover:shadow-2xl transition-shadow duration-200"
              >
                <h3 className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-2 font-['Manrope']">
                  {stat.title}
                </h3>
                <div className="flex items-center justify-center space-x-2">
                  <span className="text-2xl font-bold text-gray-900 dark:text-white font-['Manrope']">
                    {stat.value}
                  </span>
                  <span className={`text-sm font-medium ${stat.color} font-['Manrope']`}>
                    {stat.change}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Sankey Diagram */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: showBadgeAnimation ? 4 : 0.8, duration: 0.8 }}
            className="neo-card p-6 mb-8 bg-white/16 dark:bg-gray-800/24 backdrop-blur-md border border-white/8 dark:border-gray-700/20 shadow-2xl rounded-2xl"
          >
            <div className="mb-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-2xl font-bold text-primary-700 dark:text-primary-400 font-['Manrope']">
                  Financial Flow Analysis
                </h2>
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                  <span className="text-sm text-gray-600 dark:text-gray-400 font-['Manrope']">LIVE DATA</span>
                </div>
              </div>
              <p className="text-primary-600 dark:text-gray-400 font-['Manrope']">
                Interactive visualization showing revenue flows and expense breakdown
              </p>
            </div>
            
            <SankeyDiagram 
              data={{
                nodes: [
                  { name: "Products", value: 1200000 },
                  { name: "Services", value: 800000 },
                  { name: "Total Revenue", value: 2000000 },
                  { name: "Product Cost", value: 440000 },
                  { name: "Service Cost", value: 320000 },
                  { name: "Operating", value: 450000 },
                  { name: "R&D", value: 200000 },
                  { name: "SG&A", value: 350000 },
                  { name: "Tax", value: 40000 },
                  { name: "Net Profit", value: 280000 }
                ],
                links: [
                  { source: 0, target: 2, value: 1200000 },
                  { source: 1, target: 2, value: 800000 },
                  { source: 2, target: 3, value: 440000 },
                  { source: 2, target: 4, value: 320000 },
                  { source: 2, target: 5, value: 450000 },
                  { source: 2, target: 6, value: 200000 },
                  { source: 2, target: 7, value: 350000 },
                  { source: 2, target: 8, value: 40000 },
                  { source: 2, target: 9, value: 280000 }
                ]
              }}
              width={800}
              height={400}
            />
          </motion.div>

          {/* Additional Dashboard Metrics */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: showBadgeAnimation ? 4.2 : 1 }}
              className="neo-card p-6 bg-white/18 dark:bg-gray-800/28 backdrop-blur-sm border border-white/8 dark:border-gray-700/20 shadow-lg rounded-xl"
            >
              <h3 className="text-lg font-bold text-primary-800 dark:text-primary-300 mb-4 font-['Manrope']">
                Recent Activity
              </h3>
              <div className="space-y-3">
                {[
                  { action: 'Investment Portfolio Updated', time: '2 hours ago', amount: '+₹50,000' },
                  { action: 'Monthly Report Generated', time: '1 day ago', amount: null },
                  { action: 'New Revenue Stream Added', time: '3 days ago', amount: '+₹1,25,000' }
                ].map((activity, index) => (
                  <div key={index} className="flex items-center justify-between py-2 border-b border-gray-200 dark:border-gray-700 last:border-0">
                    <div>
                      <p className="font-medium text-gray-900 dark:text-white font-['Manrope']">{activity.action}</p>
                      <p className="text-sm text-gray-600 dark:text-gray-400 font-['Manrope']">{activity.time}</p>
                    </div>
                    {activity.amount && (
                      <span className="text-green-600 font-medium font-['Manrope']">{activity.amount}</span>
                    )}
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: showBadgeAnimation ? 4.4 : 1.2 }}
              className="neo-card p-6 bg-white/18 dark:bg-gray-800/28 backdrop-blur-sm border border-white/8 dark:border-gray-700/20 shadow-lg rounded-xl"
            >
              <h3 className="text-lg font-bold text-primary-800 dark:text-primary-300 mb-4 font-['Manrope']">
                Quick Actions
              </h3>
              <div className="grid grid-cols-1 gap-3">
                {[
                  { title: 'Generate Report', desc: 'Create monthly financial summary' },
                  { title: 'Update Portfolio', desc: 'Modify investment allocations' },
                  { title: 'Set Goals', desc: 'Define financial objectives' }
                ].map((action, index) => (
                  <button
                    key={index}
                    className="neo-button glass-action p-4 text-left rounded-lg transition-all focus:outline-none relative overflow-hidden"
                  >
                    <div className="relative">
                      <h4 className="font-medium text-gray-900 dark:text-white font-['Manrope']">{action.title}</h4>
                      <p className="text-sm text-gray-600 dark:text-gray-300 font-['Manrope']">{action.desc}</p>
                    </div>
                  </button>
                ))}
              </div>
            </motion.div>
          </div>
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