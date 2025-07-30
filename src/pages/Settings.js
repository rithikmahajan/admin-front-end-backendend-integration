import React, { useState } from 'react';
import { Toggle, Eye, EyeOff, Save } from 'lucide-react';

const Settings = () => {
  // State for various settings
  const [settings, setSettings] = useState({
    profileVisibility: true,
    locationData: true,
    communicationPrefs: true,
    autoInvoicing: true,
    huggingFaceAPI: true,
    onlineDiscount: 5,
    userLimit: 100
  });

  const handleToggle = (key) => {
    setSettings(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  const handleInputChange = (key, value) => {
    setSettings(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const ToggleSwitch = ({ enabled, onToggle, label }) => (
    <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
      <span className="font-medium text-gray-900">{label}</span>
      <div className="flex items-center space-x-3">
        <button
          onClick={() => onToggle(false)}
          className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
            !enabled 
              ? 'bg-blue-600 text-white' 
              : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
          }`}
        >
          Off
        </button>
        <button
          onClick={() => onToggle(true)}
          className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
            enabled 
              ? 'bg-blue-600 text-white' 
              : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
          }`}
        >
          On
        </button>
      </div>
    </div>
  );

  const ViewSettingsButton = () => (
    <button className="bg-red-500 hover:bg-red-600 text-white px-6 py-2 rounded-full font-medium transition-colors">
      View Settings
    </button>
  );

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Settings</h1>
        <p className="text-gray-600">Configure system settings and preferences</p>
      </div>

      {/* Data Collection Settings */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <h2 className="text-xl font-bold text-gray-900 mb-6">Data Collection Settings</h2>
        <div className="space-y-4">
          <ToggleSwitch 
            enabled={settings.profileVisibility}
            onToggle={(value) => handleToggle('profileVisibility')}
            label="Collect Profile Visibility Data"
          />
          <ToggleSwitch 
            enabled={settings.locationData}
            onToggle={(value) => handleToggle('locationData')}
            label="Collect Location Data"
          />
          <ToggleSwitch 
            enabled={settings.communicationPrefs}
            onToggle={(value) => handleToggle('communicationPrefs')}
            label="Collect Communication Preferences"
          />
          <ToggleSwitch 
            enabled={settings.autoInvoicing}
            onToggle={(value) => handleToggle('autoInvoicing')}
            label="Get Auto Invoice Mailing"
          />
          <ToggleSwitch 
            enabled={settings.huggingFaceAPI}
            onToggle={(value) => handleToggle('huggingFaceAPI')}
            label="Hugging Face API Open/Close"
          />
        </div>
      </div>

      {/* Payment & Discount Settings */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <h2 className="text-xl font-bold text-gray-900 mb-6">Payment & Discount Settings</h2>
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-medium text-gray-900">Online Payment Discount</h3>
              <p className="text-sm text-gray-600">Set percentage discount for online payments</p>
            </div>
            <div className="flex items-center space-x-4">
              <input
                type="number"
                value={settings.onlineDiscount}
                onChange={(e) => handleInputChange('onlineDiscount', parseInt(e.target.value))}
                className="w-20 px-3 py-2 border border-gray-300 rounded-lg text-center"
                min="0"
                max="100"
              />
              <span className="text-gray-500">%</span>
              <ViewSettingsButton />
            </div>
          </div>
          
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-medium text-gray-900">User Limit</h3>
              <p className="text-sm text-gray-600">Set limit per user</p>
            </div>
            <div className="flex items-center space-x-4">
              <input
                type="number"
                value={settings.userLimit}
                onChange={(e) => handleInputChange('userLimit', parseInt(e.target.value))}
                className="w-24 px-3 py-2 border border-gray-300 rounded-lg text-center"
                min="1"
              />
              <ViewSettingsButton />
            </div>
          </div>
        </div>
      </div>

      {/* System Configuration */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <h2 className="text-xl font-bold text-gray-900 mb-6">System Configuration</h2>
        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
            <div>
              <h3 className="font-medium text-gray-900">HSN Code Setting</h3>
              <p className="text-sm text-gray-500">Configure HSN codes for products</p>
            </div>
            <ViewSettingsButton />
          </div>
          
          <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
            <div>
              <h3 className="font-medium text-gray-900">Shipping & Time Estimates</h3>
              <p className="text-sm text-gray-500">Set shipping charges by region and country</p>
            </div>
            <ViewSettingsButton />
          </div>
          
          <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
            <div>
              <h3 className="font-medium text-gray-900">Dynamic Pricing</h3>
              <p className="text-sm text-gray-500">Automatically change prices based on demand, time, user segment</p>
            </div>
            <ViewSettingsButton />
          </div>
          
          <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
            <div>
              <h3 className="font-medium text-gray-900">Language, Country & Region</h3>
              <p className="text-sm text-gray-500">Add language country and region settings</p>
            </div>
            <ViewSettingsButton />
          </div>
        </div>
      </div>

      {/* API Integration */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <h2 className="text-xl font-bold text-gray-900 mb-6">API Integration</h2>
        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
            <div>
              <h3 className="font-medium text-gray-900">Webhooks</h3>
              <p className="text-sm text-gray-500">Webhooks for order/payment updates</p>
            </div>
            <ViewSettingsButton />
          </div>
          
          <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
            <div>
              <h3 className="font-medium text-gray-900">Email & SMS Templates</h3>
              <p className="text-sm text-gray-500">Email and SMS template management screen</p>
            </div>
            <ViewSettingsButton />
          </div>
          
          <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
            <div>
              <h3 className="font-medium text-gray-900">Google Analytics Integration</h3>
              <p className="text-sm text-gray-500">Configure Google Analytics API keys</p>
            </div>
            <ViewSettingsButton />
          </div>
          
          <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
            <div>
              <h3 className="font-medium text-gray-900">SMS Providers</h3>
              <p className="text-sm text-gray-500">SMS providers (Twilio, MSG91)</p>
            </div>
            <ViewSettingsButton />
          </div>
          
          <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
            <div>
              <h3 className="font-medium text-gray-900">WhatsApp Business API</h3>
              <p className="text-sm text-gray-500">Configure WhatsApp Business integration</p>
            </div>
            <ViewSettingsButton />
          </div>
        </div>
      </div>

      {/* Marketplace Integration */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <h2 className="text-xl font-bold text-gray-900 mb-6">Marketplace Integration</h2>
        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
            <div>
              <h3 className="font-medium text-gray-900">Flipkart Integration</h3>
              <p className="text-sm text-gray-500">Configure Flipkart marketplace API</p>
            </div>
            <ViewSettingsButton />
          </div>
          
          <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
            <div>
              <h3 className="font-medium text-gray-900">Logistics & Shipping</h3>
              <p className="text-sm text-gray-500">Auto-group items for efficient packing</p>
            </div>
            <ViewSettingsButton />
          </div>
          
          <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
            <div>
              <h3 className="font-medium text-gray-900">Error Tracking</h3>
              <p className="text-sm text-gray-500">Logs and error tracking integration, staging environment toggle</p>
            </div>
            <ViewSettingsButton />
          </div>
        </div>
      </div>

      {/* Save Changes */}
      <div className="flex justify-end">
        <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium flex items-center space-x-2 transition-colors">
          <Save size={20} />
          <span>Save All Settings</span>
        </button>
      </div>
    </div>
  );
};

export default Settings;
