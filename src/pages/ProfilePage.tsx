import React from 'react';
import { motion } from 'framer-motion';
import '../styles/neomorphic.css';
import ProfileHeader from '../components/profile/ProfileHeader';
import ProfileStats from '../components/profile/ProfileStats';
import UserDetails from '../components/UserDetails';

export default function ProfilePage() {
  const [profileImage, setProfileImage] = React.useState<string | undefined>(
    "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=200"
  );

  const handleImageUpload = (file: File) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      setProfileImage(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  const userDetails = {
    name: "John Doe",
    email: "john.doe@example.com",
    phone: "+1 (555) 123-4567",
    location: "New York, USA",
    company: "Tech Innovations Inc.",
    role: "Business Owner",
    memberSince: "January 2024",
    ranking: "Silver" as const
  };

  const activities = [
    { date: '2024-03-15', action: 'Investment Pool Joined', amount: '$5,000', status: 'success' },
    { date: '2024-03-10', action: 'Dividend Received', amount: '$250', status: 'success' },
    { date: '2024-03-05', action: 'Profile Updated', amount: null, status: 'info' },
    { date: '2024-03-01', action: 'NWS Method Applied', amount: '$1,200', status: 'success' },
    { date: '2024-02-28', action: 'Debt Payment Made', amount: '$800', status: 'success' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 via-beige-50 to-primary-100 p-6 pb-20">
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Page Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <h1 className="text-3xl font-bold text-primary-900 dark:text-primary-100 mb-2">
            Profile Overview
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Manage your personal information and track your financial journey
          </p>
        </motion.div>

        {/* Profile Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <ProfileHeader
            name={userDetails.name}
            role={userDetails.role}
            ranking={userDetails.ranking}
            imageUrl={profileImage}
            onImageUpload={handleImageUpload}
          />
        </motion.div>

        {/* Profile Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <ProfileStats
            totalInvestment={25430}
            investmentChange={12}
            activePools={3}
            pendingInvites={2}
          />
        </motion.div>

        {/* User Details */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <UserDetails user={userDetails} />
        </motion.div>

        {/* Recent Activity */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="neo-card p-6"
        >
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-primary-900 dark:text-primary-100">Recent Activity</h2>
            <span className="text-xs font-semibold px-3 py-1 rounded-full text-green-600 dark:text-green-400 bg-green-50 dark:bg-green-900/30 border border-green-200 dark:border-green-700">
              Active
            </span>
          </div>
          <div className="space-y-4">
            {activities.map((activity, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 * index }}
                className="neo-card p-4 hover:shadow-lg transition-all duration-300"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className={`neo-button w-3 h-3 rounded-full ${
                      activity.status === 'success' ? 'bg-green-500' :
                      activity.status === 'info' ? 'bg-blue-500' : 'bg-gray-500'
                    }`} />
                    <div>
                      <p className="font-medium text-primary-900 dark:text-primary-100">
                        {activity.action}
                      </p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        {activity.date}
                      </p>
                    </div>
                  </div>
                  {activity.amount && (
                    <span className="text-primary-600 dark:text-primary-400 font-medium">
                      {activity.amount}
                    </span>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
          
          {/* Activity Summary */}
          <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="text-center p-4 neo-card">
                <div className="text-2xl font-bold text-primary-900 dark:text-primary-100">
                  12
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400">
                  Activities This Month
                </div>
              </div>
              <div className="text-center p-4 neo-card">
                <div className="text-2xl font-bold text-green-600">
                  $6,250
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400">
                  Total Transactions
                </div>
              </div>
              <div className="text-center p-4 neo-card">
                <div className="text-2xl font-bold text-blue-600">
                  4.8/5
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400">
                  Activity Score
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Quick Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="neo-card p-6"
        >
          <h2 className="text-xl font-bold text-primary-900 dark:text-primary-100 mb-6">Quick Actions</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { title: 'Update Profile', action: 'Edit Details', icon: '✏️' },
              { title: 'Investment Pool', action: 'Join Pool', icon: '💰' },
              { title: 'Financial Plan', action: 'View Plan', icon: '📊' },
              { title: 'Support', action: 'Get Help', icon: '💬' }
            ].map((item, index) => (
              <motion.button
                key={item.title}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.1 * index }}
                className="neo-button p-4 text-left hover:shadow-lg transition-all duration-300"
              >
                <div className="text-2xl mb-2">{item.icon}</div>
                <h3 className="font-semibold text-primary-900 dark:text-primary-100 mb-1">
                  {item.title}
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {item.action}
                </p>
              </motion.button>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
