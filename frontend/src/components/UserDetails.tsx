import React from 'react';
import { Mail, Phone, MapPin, Building2, Award } from 'lucide-react';

interface UserDetailsProps {
  user: {
    name: string;
    email: string;
    phone: string;
    location: string;
    company: string;
    role: string;
    memberSince: string;
    ranking: 'Gold' | 'Silver' | 'Bronze';
  };
}

const rankingColors = {
  Gold: 'text-yellow-500',
  Silver: 'text-gray-400',
  Bronze: 'text-amber-600'
};

export default function UserDetails({ user }: UserDetailsProps) {
  return (
    <div className="glass-card rounded-xl p-6 space-y-6">
      <div className="flex items-center space-x-4">
        <div className="w-20 h-20 rounded-full bg-gradient-to-br from-primary-100 to-beige-100 flex items-center justify-center">
          <span className="text-2xl font-bold text-primary-600">
            {user.name.charAt(0)}
          </span>
        </div>
        <div>
          <h2 className="text-xl font-bold">{user.name}</h2>
          <div className="flex items-center space-x-2 mt-1">
            <Award className={`w-4 h-4 ${rankingColors[user.ranking]}`} />
            <span className={`text-sm ${rankingColors[user.ranking]}`}>
              {user.ranking} Member
            </span>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <div className="flex items-center space-x-3">
          <Mail className="w-5 h-5 text-gray-400" />
          <span>{user.email}</span>
        </div>
        <div className="flex items-center space-x-3">
          <Phone className="w-5 h-5 text-gray-400" />
          <span>{user.phone}</span>
        </div>
        <div className="flex items-center space-x-3">
          <MapPin className="w-5 h-5 text-gray-400" />
          <span>{user.location}</span>
        </div>
        <div className="flex items-center space-x-3">
          <Building2 className="w-5 h-5 text-gray-400" />
          <div>
            <span className="block">{user.company}</span>
            <span className="text-sm text-gray-500">{user.role}</span>
          </div>
        </div>
      </div>

      <div className="pt-4 border-t border-gray-100">
        <span className="text-sm text-gray-500">
          Member since {user.memberSince}
        </span>
      </div>
    </div>
  );
}
