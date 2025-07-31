import React, { useState } from 'react';
import { motion } from 'framer-motion';
import '../styles/neomorphic.css';
import SecuritySettings from '../components/settings/SecuritySettings';
import NotificationSettings from '../components/settings/NotificationSettings';
import CurrencySettings from '../components/settings/CurrencySettings';
import { 
  CreditCard, Lock, HelpCircle, Users, Settings as SettingsIcon,
  Shield, Bell, Globe, ChevronRight, Plus, Eye, EyeOff,
  Smartphone, Mail, MessageSquare, AlertTriangle, Trash2
} from 'lucide-react';

export default function SettingsPage() {
  const [activeSection, setActiveSection] = useState<string | null>(null);

  const settingsSections = [
    {
      id: 'payment',
      title: 'Payment Methods',
      description: 'Manage your payment cards and billing information',
      icon: CreditCard,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50 dark:bg-blue-900/30',
      borderColor: 'border-blue-200 dark:border-blue-700',
      status: 'Active',
      items: ['2 Cards Connected', 'Auto-pay Enabled', 'Secure Payments']
    },
    {
      id: 'privacy',
      title: 'Privacy & Security',
      description: 'Control your data visibility and account security',
      icon: Lock,
      color: 'text-green-600',
      bgColor: 'bg-green-50 dark:bg-green-900/30',
      borderColor: 'border-green-200 dark:border-green-700',
      status: 'Secure',
      items: ['2FA Enabled', 'Data Encryption', 'Privacy Controls']
    },
    {
      id: 'accounts',
      title: 'Connected Accounts',
      description: 'Manage linked services and integrations',
      icon: Users,
      color: 'text-purple-600',
      bgColor: 'bg-purple-50 dark:bg-purple-900/30',
      borderColor: 'border-purple-200 dark:border-purple-700',
      status: 'Connected',
      items: ['3 Services Linked', 'Bank Integration', 'Social Accounts']
    },
    {
      id: 'support',
      title: 'Help & Support',
      description: 'Get assistance and manage your support requests',
      icon: HelpCircle,
      color: 'text-amber-600',
      bgColor: 'bg-amber-50 dark:bg-amber-900/30',
      borderColor: 'border-amber-200 dark:border-amber-700',
      status: 'Available',
      items: ['24/7 Support', 'Knowledge Base', 'Live Chat']
    }
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
          <div className="neo-button w-16 h-16 mx-auto mb-4 flex items-center justify-center">
            <SettingsIcon className="w-8 h-8 text-primary-600" />
          </div>
          <h1 className="text-3xl font-bold text-primary-900 dark:text-primary-100 mb-2">
            Settings & Preferences
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Customize your FinPercent experience and manage your account
          </p>
        </motion.div>

        {/* Main Settings Components */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
          >
            <SecuritySettings />
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
          >
            <NotificationSettings />
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <CurrencySettings />
        </motion.div>

        {/* Enhanced Settings Sections */}
        <div className="space-y-6">
          <h2 className="text-2xl font-bold text-primary-900 dark:text-primary-100">
            Account Management
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {settingsSections.map((section, index) => {
              const Icon = section.icon;
              const isExpanded = activeSection === section.id;

              return (
                <motion.div
                  key={section.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 * index }}
                  className={`neo-card p-6 cursor-pointer transition-all duration-300 hover:shadow-xl ${
                    isExpanded ? 'ring-2 ring-primary-500' : ''
                  }`}
                  onClick={() => setActiveSection(isExpanded ? null : section.id)}
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-start space-x-4">
                      <div className={`neo-button p-3 ${section.color}`}>
                        <Icon className="w-6 h-6" />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-lg font-semibold text-primary-900 dark:text-primary-100">
                          {section.title}
                        </h3>
                        <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                          {section.description}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <span className={`text-xs font-semibold px-3 py-1 rounded-full ${section.bgColor} ${section.borderColor} border ${section.color}`}>
                        {section.status}
                      </span>
                      <ChevronRight className={`w-5 h-5 text-gray-400 transition-transform duration-200 ${
                        isExpanded ? 'rotate-90' : ''
                      }`} />
                    </div>
                  </div>

                  {/* Quick Actions */}
                  <div className="flex space-x-2">
                    <button className="neo-button px-4 py-2 text-primary-600 dark:text-primary-400 font-medium text-sm hover:shadow-lg transition-all duration-300">
                      Configure
                    </button>
                    <button className="neo-button p-2 text-gray-600 dark:text-gray-400 hover:shadow-lg transition-all duration-300">
                      <Plus className="w-4 h-4" />
                    </button>
                  </div>

                  {/* Expanded Content */}
                  {isExpanded && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700"
                    >
                      <div className="space-y-3">
                        {section.items.map((item, itemIndex) => (
                          <motion.div
                            key={itemIndex}
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: itemIndex * 0.1 }}
                            className="neo-card p-3 text-sm"
                          >
                            <div className="flex items-center space-x-3">
                              <div className="w-2 h-2 bg-green-500 rounded-full" />
                              <span className="text-primary-900 dark:text-primary-100">
                                {item}
                              </span>
                            </div>
                          </motion.div>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Advanced Settings */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="neo-card p-6"
        >
          <h2 className="text-xl font-bold text-primary-900 dark:text-primary-100 mb-6">
            Advanced Settings
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              { title: 'Data Export', desc: 'Download your account data', icon: '📊', action: 'Export' },
              { title: 'API Access', desc: 'Manage API keys and tokens', icon: '🔑', action: 'Configure' },
              { title: 'Backup Settings', desc: 'Auto-backup preferences', icon: '💾', action: 'Enable' },
              { title: 'Developer Mode', desc: 'Advanced debugging tools', icon: '🛠️', action: 'Toggle' }
            ].map((item, index) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.1 * index }}
                className="neo-card p-4 hover:shadow-lg transition-all duration-300"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <span className="text-2xl">{item.icon}</span>
                    <div>
                      <h3 className="font-medium text-primary-900 dark:text-primary-100">
                        {item.title}
                      </h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        {item.desc}
                      </p>
                    </div>
                  </div>
                  <button className="neo-button px-3 py-1 text-primary-600 dark:text-primary-400 text-sm font-medium">
                    {item.action}
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Danger Zone */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="neo-card p-6 border-l-4 border-red-500"
        >
          <div className="flex items-center space-x-3 mb-4">
            <AlertTriangle className="w-6 h-6 text-red-600" />
            <h2 className="text-xl font-bold text-red-600">Danger Zone</h2>
          </div>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            These actions are permanent and cannot be undone. Please proceed with caution.
          </p>
          <div className="space-y-4">
            <div className="neo-card p-4 bg-red-50 dark:bg-red-900/20">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-medium text-red-900 dark:text-red-100">
                    Deactivate Account
                  </h3>
                  <p className="text-sm text-red-700 dark:text-red-300">
                    Temporarily disable your account
                  </p>
                </div>
                <button className="neo-button px-4 py-2 text-red-600 border border-red-300 hover:bg-red-50 dark:hover:bg-red-900/30 transition-colors">
                  Deactivate
                </button>
              </div>
            </div>
            <div className="neo-card p-4 bg-red-50 dark:bg-red-900/20">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-medium text-red-900 dark:text-red-100">
                    Delete Account
                  </h3>
                  <p className="text-sm text-red-700 dark:text-red-300">
                    Permanently delete your account and all data
                  </p>
                </div>
                <button className="neo-button px-4 py-2 bg-red-600 text-white hover:bg-red-700 transition-colors">
                  <Trash2 className="w-4 h-4 mr-2" />
                  Delete
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
