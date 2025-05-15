// Settings.js
import React, { useState } from 'react';
import { useSector } from '../contexts/SectorContext';
import { Settings as SettingsIcon, User, Bell, Lock, Download, Globe, HelpCircle, Smartphone, Shield, ChevronRight, Edit } from 'lucide-react';

/**
 * Settings Page
 * User settings and preferences for the application
 */
const Settings = () => {
  const { selectedSector } = useSector();
  const [notifications, setNotifications] = useState({
    marketUpdates: true,
    weatherAlerts: true,
    events: true,
    newsUpdates: false
  });

  // Toggle notification setting
  const toggleNotification = (key) => {
    setNotifications(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  return (
    <div className="p-4 space-y-4">
      <h2 className="text-lg font-semibold text-gray-700 flex items-center">
        <SettingsIcon size={20} className="mr-2" />
        Settings
      </h2>

      <div className="bg-white rounded-lg shadow">
        <div className="p-4 border-b">
          <h3 className="font-medium mb-3 flex items-center">
            <User size={18} className="mr-2 text-blue-500" />
            Account Settings
          </h3>

          <div className="flex items-center justify-between py-2">
            <div className="flex-1">
              <div className="text-sm font-medium">James Wilson</div>
              <div className="text-xs text-gray-500">james.wilson@example.com</div>
            </div>
            <button className="text-blue-500">
              <Edit size={16} />
            </button>
          </div>

          <div className="flex items-center justify-between py-2">
            <div className="flex-1">
              <div className="text-sm font-medium">Farm Details</div>
              <div className="text-xs text-gray-500">Wilson Family Farm, Yorkshire</div>
            </div>
            <button className="text-blue-500">
              <Edit size={16} />
            </button>
          </div>

          <div className="flex items-center justify-between py-2">
            <div className="flex-1">
              <div className="text-sm font-medium">Main Enterprise</div>
              <div className="text-xs text-gray-500">
                {selectedSector === 'cereals' ? 'Arable' :
                 selectedSector === 'dairy' ? 'Dairy' :
                 selectedSector === 'beef' ? 'Beef & Sheep' :
                 'Pig Production'}
              </div>
            </div>
            <button className="text-blue-500">
              <Edit size={16} />
            </button>
          </div>
        </div>

        <div className="p-4 border-b">
          <h3 className="font-medium mb-3 flex items-center">
            <Bell size={18} className="mr-2 text-green-600" />
            Notification Preferences
          </h3>

          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-sm font-medium">Market Updates</div>
                <div className="text-xs text-gray-500">Receive price alerts and market intelligence</div>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  className="sr-only peer"
                  checked={notifications.marketUpdates}
                  onChange={() => toggleNotification('marketUpdates')}
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-500"></div>
              </label>
            </div>

            <div className="flex items-center justify-between">
              <div>
                <div className="text-sm font-medium">Weather Alerts</div>
                <div className="text-xs text-gray-500">Receive alerts for extreme weather conditions</div>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  className="sr-only peer"
                  checked={notifications.weatherAlerts}
                  onChange={() => toggleNotification('weatherAlerts')}
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-500"></div>
              </label>
            </div>

            <div className="flex items-center justify-between">
              <div>
                <div className="text-sm font-medium">Events Reminders</div>
                <div className="text-xs text-gray-500">Receive reminders for upcoming AHDB events</div>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  className="sr-only peer"
                  checked={notifications.events}
                  onChange={() => toggleNotification('events')}
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-500"></div>
              </label>
            </div>

            <div className="flex items-center justify-between">
              <div>
                <div className="text-sm font-medium">News Updates</div>
                <div className="text-xs text-gray-500">Receive AHDB industry news and updates</div>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  className="sr-only peer"
                  checked={notifications.newsUpdates}
                  onChange={() => toggleNotification('newsUpdates')}
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-500"></div>
              </label>
            </div>
          </div>
        </div>

        <div className="p-4 border-b">
          <h3 className="font-medium mb-3 flex items-center">
            <Globe size={18} className="mr-2 text-purple-600" />
            App Settings
          </h3>

          <div className="space-y-2">
            <div className="flex items-center justify-between py-2">
              <div className="text-sm">Language</div>
              <div className="text-sm text-gray-500 flex items-center">
                English (UK)
                <ChevronRight size={16} className="ml-1" />
              </div>
            </div>

            <div className="flex items-center justify-between py-2">
              <div className="text-sm">Units</div>
              <div className="text-sm text-gray-500 flex items-center">
                Metric
                <ChevronRight size={16} className="ml-1" />
              </div>
            </div>

            <div className="flex items-center justify-between py-2">
              <div className="text-sm">Default Home Screen</div>
              <div className="text-sm text-gray-500 flex items-center">
                Dashboard
                <ChevronRight size={16} className="ml-1" />
              </div>
            </div>
          </div>
        </div>

        <div className="p-4">
          <h3 className="font-medium mb-3 flex items-center">
            <Download size={18} className="mr-2 text-amber-600" />
            Data Management
          </h3>

          <div className="space-y-2">
            <div className="flex items-center justify-between py-2">
              <div>
                <div className="text-sm font-medium">Export Farm Data</div>
                <div className="text-xs text-gray-500">Download your farm records</div>
              </div>
              <button className="text-blue-500 text-sm">
                Export
              </button>
            </div>

            <div className="flex items-center justify-between py-2">
              <div>
                <div className="text-sm font-medium">Clear App Cache</div>
                <div className="text-xs text-gray-500">Free up device storage</div>
              </div>
              <button className="text-blue-500 text-sm">
                Clear
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow p-4 space-y-3">
        <button className="w-full text-left flex items-center justify-between p-2 hover:bg-gray-50 rounded">
          <div className="flex items-center">
            <Lock size={18} className="mr-2 text-blue-500" />
            <span className="text-sm">Change Password</span>
          </div>
          <ChevronRight size={16} className="text-gray-400" />
        </button>

        <button className="w-full text-left flex items-center justify-between p-2 hover:bg-gray-50 rounded">
          <div className="flex items-center">
            <Shield size={18} className="mr-2 text-green-600" />
            <span className="text-sm">Privacy Settings</span>
          </div>
          <ChevronRight size={16} className="text-gray-400" />
        </button>

        <button className="w-full text-left flex items-center justify-between p-2 hover:bg-gray-50 rounded">
          <div className="flex items-center">
            <HelpCircle size={18} className="mr-2 text-purple-600" />
            <span className="text-sm">Help & Support</span>
          </div>
          <ChevronRight size={16} className="text-gray-400" />
        </button>

        <button className="w-full text-left flex items-center justify-between p-2 hover:bg-gray-50 rounded">
          <div className="flex items-center">
            <Smartphone size={18} className="mr-2 text-amber-600" />
            <span className="text-sm">About AHDB FarmAssist</span>
          </div>
          <ChevronRight size={16} className="text-gray-400" />
        </button>
      </div>

      <div className="text-center p-3">
        <button className="text-sm text-red-500">
          Sign Out
        </button>
        <div className="text-xs text-gray-400 mt-2">
          App version 1.0.0
        </div>
      </div>
    </div>
  );
};

export default Settings;