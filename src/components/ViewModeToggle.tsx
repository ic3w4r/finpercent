import React from 'react';
import { LineChart, LayoutDashboard } from 'lucide-react';

interface ViewModeToggleProps {
  viewMode: 'classic' | 'stockMarket';
  onToggle: (mode: 'classic' | 'stockMarket') => void;
  className?: string;
}

const ViewModeToggle: React.FC<ViewModeToggleProps> = ({ viewMode, onToggle, className = '' }) => {
  return (
    <div className={`flex items-center space-x-2 ${className}`}>
      <button
        onClick={() => onToggle('classic')}
        className={`flex items-center space-x-2 px-3 py-2 rounded-lg transition-all duration-200 ${
          viewMode === 'classic'
            ? 'bg-primary-100 dark:bg-primary-900 text-primary-900 dark:text-primary-100'
            : 'hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-600 dark:text-gray-400'
        }`}
      >
        <LayoutDashboard className="w-5 h-5" />
        <span className="hidden lg:inline">Classic</span>
      </button>
      <button
        onClick={() => onToggle('stockMarket')}
        className={`flex items-center space-x-2 px-3 py-2 rounded-lg transition-all duration-200 ${
          viewMode === 'stockMarket'
            ? 'bg-primary-100 dark:bg-primary-900 text-primary-900 dark:text-primary-100'
            : 'hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-600 dark:text-gray-400'
        }`}
      >
        <LineChart className="w-5 h-5" />
        <span className="hidden lg:inline">Stock Market</span>
      </button>
    </div>
  );
};

export default ViewModeToggle; 