import React from 'react';
import { Camera, Award } from 'lucide-react';
import { Link } from 'react-router-dom';

interface ProfileHeaderProps {
  name: string;
  role: string;
  ranking: 'Gold' | 'Silver' | 'Bronze';
  imageUrl?: string;
  onImageUpload: (file: File) => void;
}

const rankingColors = {
  Gold: 'text-yellow-500',
  Silver: 'text-gray-400',
  Bronze: 'text-amber-600'
};

export default function ProfileHeader({ name, role, ranking, imageUrl, onImageUpload }: ProfileHeaderProps) {
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      onImageUpload(file);
    }
  };

  return (
    <div className="glass-card rounded-xl p-6">
      <div className="flex items-center space-x-6">
        <div className="relative">
          <div className="w-24 h-24 rounded-full bg-gradient-to-br from-primary-100 to-beige-100 overflow-hidden">
            {imageUrl ? (
              <img
                src={imageUrl}
                alt={name}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center">
                <span className="text-2xl font-bold text-primary-600">
                  {name.charAt(0)}
                </span>
              </div>
            )}
            <label className="absolute bottom-0 right-0 p-2 bg-primary-600 rounded-full text-white cursor-pointer hover:bg-primary-700 transition-colors">
              <Camera className="w-4 h-4" />
              <input
                type="file"
                className="hidden"
                accept="image/*"
                onChange={handleImageChange}
              />
            </label>
          </div>
        </div>
        <div>
          <h1 className="text-2xl font-bold">{name}</h1>
          <p className="text-gray-600">{role}</p>
          <Link 
            to="/company-status"
            className="flex items-center mt-2 space-x-2 group"
          >
            <Award className={`w-5 h-5 ${rankingColors[ranking]} transition-transform group-hover:scale-110`} />
            <span className={`text-sm font-medium ${rankingColors[ranking]} group-hover:underline`}>
              {ranking} Ranking
            </span>
          </Link>
        </div>
      </div>
    </div>
  );
}
