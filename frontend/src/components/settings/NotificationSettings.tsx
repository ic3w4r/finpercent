import React from 'react';
import { Bell, Mail, MessageSquare, Smartphone } from 'lucide-react';

interface NotificationOption {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  enabled: boolean;
}

export default function NotificationSettings() {
  const [notifications, setNotifications] = React.useState<NotificationOption[]>([
    {
      id: 'email',
      title: 'Email Notifications',
      description: 'Updates about your investments',
      icon: <Mail className="w-5 h-5" />,
      enabled: true
    },
    {
      id: 'push',
      title: 'Push Notifications',
      description: 'Instant alerts on your device',
      icon: <Bell className="w-5 h-5" />,
      enabled: true
    },
    {
      id: 'sms',
      title: 'SMS Alerts',
      description: 'Text messages for important updates',
      icon: <Smartphone className="w-5 h-5" />,
      enabled: false
    },
    {
      id: 'chat',
      title: 'In-App Messages',
      description: 'Chat and support notifications',
      icon: <MessageSquare className="w-5 h-5" />,
      enabled: true
    }
  ]);

  const toggleNotification = (id: string) => {
    setNotifications(notifications.map(notification =>
      notification.id === id
        ? { ...notification, enabled: !notification.enabled }
        : notification
    ));
  };

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-bold">Notification Preferences</h2>
      
      <div className="space-y-4">
        {notifications.map(notification => (
          <div key={notification.id} className="glass-card rounded-xl p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-primary-50 rounded-full">
                  {notification.icon}
                </div>
                <div>
                  <h3 className="font-medium">{notification.title}</h3>
                  <p className="text-sm text-gray-600">{notification.description}</p>
                </div>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  className="sr-only peer"
                  checked={notification.enabled}
                  onChange={() => toggleNotification(notification.id)}
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-600"></div>
              </label>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
