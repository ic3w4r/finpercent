import React from 'react';
import SecuritySettings from '../components/settings/SecuritySettings';
import NotificationSettings from '../components/settings/NotificationSettings';
import CurrencySettings from '../components/settings/CurrencySettings';
import { CreditCard, Lock, HelpCircle, Users } from 'lucide-react';

export default function SettingsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 via-beige-50 to-primary-100 p-6 pb-20">
      <div className="max-w-3xl mx-auto space-y-8">
        <SecuritySettings />
        <NotificationSettings />
        <CurrencySettings />

        {/* Payment Methods */}
        <div className="space-y-6">
          <h2 className="text-xl font-bold">Payment Methods</h2>
          <div className="glass-card rounded-xl p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-primary-50 rounded-full">
                  <CreditCard className="w-5 h-5 text-primary-600" />
                </div>
                <div>
                  <h3 className="font-medium">Connected Cards</h3>
                  <p className="text-sm text-gray-600">Manage your payment cards</p>
                </div>
              </div>
              <button className="text-primary-600 text-sm font-medium">
                Add New
              </button>
            </div>
          </div>
        </div>

        {/* Privacy Settings */}
        <div className="space-y-6">
          <h2 className="text-xl font-bold">Privacy</h2>
          <div className="glass-card rounded-xl p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-primary-50 rounded-full">
                  <Lock className="w-5 h-5 text-primary-600" />
                </div>
                <div>
                  <h3 className="font-medium">Data Sharing</h3>
                  <p className="text-sm text-gray-600">Control your data visibility</p>
                </div>
              </div>
              <button className="text-primary-600 text-sm font-medium">
                Configure
              </button>
            </div>
          </div>
        </div>

        {/* Connected Accounts */}
        <div className="space-y-6">
          <h2 className="text-xl font-bold">Connected Accounts</h2>
          <div className="glass-card rounded-xl p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-primary-50 rounded-full">
                  <Users className="w-5 h-5 text-primary-600" />
                </div>
                <div>
                  <h3 className="font-medium">Linked Services</h3>
                  <p className="text-sm text-gray-600">Manage connected platforms</p>
                </div>
              </div>
              <button className="text-primary-600 text-sm font-medium">
                View All
              </button>
            </div>
          </div>
        </div>

        {/* Help & Support */}
        <div className="space-y-6">
          <h2 className="text-xl font-bold">Help & Support</h2>
          <div className="glass-card rounded-xl p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-primary-50 rounded-full">
                  <HelpCircle className="w-5 h-5 text-primary-600" />
                </div>
                <div>
                  <h3 className="font-medium">Support Center</h3>
                  <p className="text-sm text-gray-600">Get help with your account</p>
                </div>
              </div>
              <button className="text-primary-600 text-sm font-medium">
                Contact Us
              </button>
            </div>
          </div>
        </div>

        {/* Danger Zone */}
        <div className="glass-card rounded-xl p-6 border border-red-200">
          <h2 className="text-xl font-bold text-red-600">Danger Zone</h2>
          <p className="text-sm text-gray-600 mt-2">Permanent account actions</p>
          <div className="mt-4 space-y-3">
            <button className="w-full p-3 border border-red-300 text-red-600 rounded-lg hover:bg-red-50">
              Deactivate Account
            </button>
            <button className="w-full p-3 bg-red-600 text-white rounded-lg hover:bg-red-700">
              Delete Account
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
