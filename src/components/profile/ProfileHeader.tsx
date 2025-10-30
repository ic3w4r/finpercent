import React from 'react';
import { Camera, Award, Star } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

interface ProfileHeaderProps {
  name: string;
  role: string;
  ranking: 'Gold' | 'Silver' | 'Bronze';
  imageUrl?: string;
  onImageUpload: (file: File) => void;
}

const rankingStyles = {
  Gold: {
    color: 'text-yellow-600',
    bg: 'bg-yellow-50 dark:bg-yellow-900/30',
    border: 'border-yellow-200 dark:border-yellow-700'
  },
  Silver: {
    color: 'text-gray-600',
    bg: 'bg-gray-50 dark:bg-gray-900/30',
    border: 'border-gray-200 dark:border-gray-700'
  },
  Bronze: {
    color: 'text-amber-600',
    bg: 'bg-amber-50 dark:bg-amber-900/30',
    border: 'border-amber-200 dark:border-amber-700'
  }
};

export default function ProfileHeader({ name, role, ranking, imageUrl, onImageUpload }: ProfileHeaderProps) {
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      onImageUpload(file);
    }
  };

  const rankingStyle = rankingStyles[ranking];

  return (
    <div className="neo-card p-6">
      <div className="flex flex-col md:flex-row items-center md:items-start space-y-6 md:space-y-0 md:space-x-8">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.1 }}
          className="relative"
        >
          <div className="w-32 h-32 rounded-full bg-gradient-to-br from-primary-100 to-beige-100 overflow-hidden shadow-lg">
            {imageUrl ? (
              <img
                src={imageUrl}
                alt={name}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center">
                <span className="text-4xl font-bold text-primary-600">
                  {name.charAt(0)}
                </span>
              </div>
            )}
            <label className="absolute bottom-2 right-2 neo-button glass-action p-3 cursor-pointer hover:shadow-lg transition-all duration-300">
              <Camera className="w-4 h-4 text-primary-600" />
              <input
                type="file"
                className="hidden"
                accept="image/*"
                onChange={handleImageChange}
              />
            </label>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="flex-1 text-center md:text-left"
        >
          <h1 className="text-3xl font-bold text-primary-900 dark:text-primary-100 mb-2">
            {name}
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400 mb-6">
            {role}
          </p>
          
          <Link 
            to="/company-status"
            className="inline-flex items-center space-x-3 group"
          >
            <div className={`neo-button glass-action px-4 py-2 ${rankingStyle.bg} ${rankingStyle.border} border transition-all duration-300 group-hover:shadow-lg`}>
              <div className="flex items-center space-x-2">
                <Award className={`w-5 h-5 ${rankingStyle.color} transition-transform group-hover:scale-110`} />
                <span className={`font-semibold ${rankingStyle.color}`}>
                  {ranking} Ranking
                </span>
                <div className="flex space-x-1">
                  {[...Array(ranking === 'Gold' ? 5 : ranking === 'Silver' ? 4 : 3)].map((_, i) => (
                    <Star key={i} className={`w-3 h-3 ${rankingStyle.color} fill-current`} />
                  ))}
                </div>
              </div>
            </div>
          </Link>

          {/* Profile Completion */}
          <div className="mt-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                Profile Completion
              </span>
              <span className="text-sm font-bold text-primary-600">85%</span>
            </div>
            <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
              <motion.div 
                className="bg-gradient-to-r from-primary-500 to-primary-600 h-2 rounded-full"
                initial={{ width: 0 }}
                animate={{ width: '85%' }}
                transition={{ delay: 0.5, duration: 1 }}
              />
            </div>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
              Add more details to reach 100%
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
