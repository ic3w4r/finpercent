import React from 'react';

interface ProgressBarProps {
  percentage: number;
  color?: string;
}

const ProgressBar: React.FC<ProgressBarProps> = ({ percentage, color = 'bg-primary-500' }) => (
  <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
    <div
      className={`h-2 rounded-full ${color}`}
      style={{ width: `${percentage}%` }}
    />
  </div>
);

export default ProgressBar;