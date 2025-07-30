import React from 'react';
import { Mail, Phone, MapPin, Building2, Award, Edit, Shield } from 'lucide-react';
import { motion } from 'framer-motion';

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

export default function UserDetails({ user }: UserDetailsProps) {
  const rankingStyle = rankingStyles[user.ranking];

  const contactDetails = [
    {
      icon: Mail,
      label: 'Email',
      value: user.email,
      type: 'email',
      status: 'Verified'
    },
    {
      icon: Phone,
      label: 'Phone',
      value: user.phone,
      type: 'phone',
      status: 'Verified'
    },
    {
      icon: MapPin,
      label: 'Location',
      value: user.location,
      type: 'location',
      status: 'Current'
    },
    {
      icon: Building2,
      label: 'Company',
      value: `${user.company} • ${user.role}`,
      type: 'work',
      status: 'Active'
    }
  ];

  return (
    <div className="neo-card p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold text-primary-900 dark:text-primary-100">
          Personal Information
        </h2>
        <button className="neo-button px-4 py-2 text-primary-600 dark:text-primary-400 hover:shadow-lg transition-all duration-300">
          <Edit className="w-4 h-4 mr-2" />
          Edit Profile
        </button>
      </div>

      {/* Profile Summary */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="neo-card p-4 mb-6"
      >
        <div className="flex items-center space-x-4">
          <div className="w-16 h-16 rounded-full bg-gradient-to-br from-primary-100 to-beige-100 flex items-center justify-center">
            <span className="text-2xl font-bold text-primary-600">
              {user.name.charAt(0)}
            </span>
          </div>
          <div className="flex-1">
            <h3 className="text-xl font-bold text-primary-900 dark:text-primary-100">
              {user.name}
            </h3>
            <div className="flex items-center space-x-3 mt-2">
              <div className={`neo-button px-3 py-1 ${rankingStyle.bg} ${rankingStyle.border} border`}>
                <div className="flex items-center space-x-2">
                  <Award className={`w-4 h-4 ${rankingStyle.color}`} />
                  <span className={`text-sm font-medium ${rankingStyle.color}`}>
                    {user.ranking} Member
                  </span>
                </div>
              </div>
              <div className="flex items-center space-x-1">
                <Shield className="w-4 h-4 text-green-600" />
                <span className="text-sm text-green-600">Verified</span>
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Contact Details */}
      <div className="space-y-4 mb-6">
        {contactDetails.map((detail, index) => {
          const Icon = detail.icon;
          return (
            <motion.div
              key={detail.label}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className="neo-card p-4 hover:shadow-lg transition-all duration-300"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="neo-button p-3 text-gray-600 dark:text-gray-400">
                    <Icon className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-medium text-primary-900 dark:text-primary-100">
                      {detail.label}
                    </h4>
                    <p className="text-gray-600 dark:text-gray-400">
                      {detail.value}
                    </p>
                  </div>
                </div>
                <span className={`text-xs font-semibold px-2 py-1 rounded-full border border-current ${
                  detail.status === 'Verified' ? 'text-green-600 bg-green-50 dark:bg-green-900/30' :
                  detail.status === 'Active' ? 'text-blue-600 bg-blue-50 dark:bg-blue-900/30' :
                  'text-gray-600 bg-gray-50 dark:bg-gray-900/30'
                }`}>
                  {detail.status}
                </span>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Member Since */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="pt-6 border-t border-gray-200 dark:border-gray-700"
      >
        <div className="flex items-center justify-between">
          <div>
            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
              Member Since
            </span>
            <p className="text-lg font-bold text-primary-900 dark:text-primary-100">
              {user.memberSince}
            </p>
          </div>
          <div className="text-right">
            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
              Account Status
            </span>
            <p className="text-lg font-bold text-green-600">
              Premium
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
