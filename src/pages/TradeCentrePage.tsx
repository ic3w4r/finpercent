import React, { useState } from 'react';
import { ShoppingBag, Video, ChevronLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import ManufacturerReels from '../components/trade/ManufacturerReels';
import LiveSession from '../components/trade/LiveSession';
import ProductCatalogue from '../components/trade/ProductCatalogue';

export default function TradeCentrePage() {
  const [activeTab, setActiveTab] = useState<'reels' | 'live' | 'catalogue'>('reels');

  // Dynamic padding based on active tab to ensure immersive experiences for reels/live
  const getMainContentPadding = () => {
    switch (activeTab) {
      case 'reels':
        return 'max-w-5xl px-0 sm:px-4 py-4 sm:py-6'; // Tighter on mobile for reels
      case 'live':
        return 'max-w-7xl px-4 sm:px-6 lg:px-8 py-6';
      case 'catalogue':
        return 'max-w-7xl px-4 sm:px-6 lg:px-8 py-8';
      default:
        return 'max-w-7xl px-4 sm:px-6 lg:px-8 py-6';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pb-20">
      {/* Header - Glassmorphism & Fixed */}
      <div className="sticky top-0 z-40 bg-white/80 dark:bg-gray-900/80 backdrop-blur-md border-b border-gray-200 dark:border-gray-800 transition-all duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row justify-between items-center h-auto sm:h-16 py-3 sm:py-0 space-y-3 sm:space-y-0">

            {/* Logo & Back */}
            <div className="flex items-center self-start sm:self-auto w-full sm:w-auto">
              <Link to="/explore" className="mr-3 p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-500 dark:text-gray-400 transition-colors">
                <ChevronLeft className="w-5 h-5" />
              </Link>
              <div>
                <h1 className="text-xl sm:text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-400 dark:to-indigo-400">
                  Trade Centre
                </h1>
                <p className="hidden sm:block text-xs text-gray-500 dark:text-gray-400">Manufacturer Showcase & Live Trade</p>
              </div>
            </div>

            {/* Tab Navigation */}
            <div className="flex p-1 bg-gray-100 dark:bg-gray-800 rounded-xl w-full sm:w-auto justify-between sm:justify-start">
              <button
                onClick={() => setActiveTab('reels')}
                className={`flex-1 sm:flex-none px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-200 ease-in-out ${activeTab === 'reels'
                  ? 'bg-white dark:bg-gray-700 text-blue-600 dark:text-blue-300 shadow-sm scale-[1.02]'
                  : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 hover:bg-gray-200/50 dark:hover:bg-gray-700/50'
                  }`}
              >
                <div className="flex items-center justify-center space-x-2">
                  <Video className="w-4 h-4" />
                  <span>Reels</span>
                </div>
              </button>

              <button
                onClick={() => setActiveTab('live')}
                className={`flex-1 sm:flex-none px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-200 ease-in-out ${activeTab === 'live'
                  ? 'bg-white dark:bg-gray-700 text-red-600 dark:text-red-300 shadow-sm scale-[1.02]'
                  : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 hover:bg-gray-200/50 dark:hover:bg-gray-700/50'
                  }`}
              >
                <div className="flex items-center justify-center space-x-2">
                  <div className="relative flex items-center justify-center">
                    <span className={`absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75 ${activeTab === 'live' ? 'animate-ping' : ''}`}></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
                  </div>
                  <span>Live</span>
                </div>
              </button>

              <button
                onClick={() => setActiveTab('catalogue')}
                className={`flex-1 sm:flex-none px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-200 ease-in-out ${activeTab === 'catalogue'
                  ? 'bg-white dark:bg-gray-700 text-purple-600 dark:text-purple-300 shadow-sm scale-[1.02]'
                  : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 hover:bg-gray-200/50 dark:hover:bg-gray-700/50'
                  }`}
              >
                <div className="flex items-center justify-center space-x-2">
                  <ShoppingBag className="w-4 h-4" />
                  <span>Market</span>
                </div>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className={`mx-auto w-full transition-all duration-300 ${getMainContentPadding()}`}>
        {/* Render active component with subtle fade-in animation key */}
        <div key={activeTab} className="animate-fade-in">
          {activeTab === 'reels' && <ManufacturerReels />}
          {activeTab === 'live' && <LiveSession />}
          {activeTab === 'catalogue' && <ProductCatalogue />}
        </div>
      </div>
    </div>
  );
}
