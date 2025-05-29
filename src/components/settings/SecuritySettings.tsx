import React from 'react';
import { Shield, Key, Smartphone } from 'lucide-react';

export default function SecuritySettings() {
  return (
    <div className="space-y-6">
      <h2 className="text-xl font-bold">Security Settings</h2>
      
      <div className="space-y-4">
        <div className="glass-card rounded-xl p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-primary-50 rounded-full">
                <Key className="w-5 h-5 text-primary-600" />
              </div>
              <div>
                <h3 className="font-medium">Password</h3>
                <p className="text-sm text-gray-600">Last changed 30 days ago</p>
              </div>
            </div>
            <button className="text-primary-600 text-sm font-medium">
              Change
            </button>
          </div>
        </div>

        <div className="glass-card rounded-xl p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-primary-50 rounded-full">
                <Smartphone className="w-5 h-5 text-primary-600" />
              </div>
              <div>
                <h3 className="font-medium">Two-Factor Authentication</h3>
                <p className="text-sm text-gray-600">Enhanced account security</p>
              </div>
            </div>
            <button className="px-4 py-2 bg-primary-600 text-white rounded-lg text-sm">
              Enable
            </button>
          </div>
        </div>

        <div className="glass-card rounded-xl p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-primary-50 rounded-full">
                <Shield className="w-5 h-5 text-primary-600" />
              </div>
              <div>
                <h3 className="font-medium">Recovery Options</h3>
                <p className="text-sm text-gray-600">Backup email and phone</p>
              </div>
            </div>
            <button className="text-primary-600 text-sm font-medium">
              Manage
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
