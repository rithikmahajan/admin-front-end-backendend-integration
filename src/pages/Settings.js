import React, { useState } from 'react';

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
    <div className="flex items-center justify-between py-4">
      <span className="font-bold text-[#010101] text-[20px] font-montserrat">{label}</span>
      <div className="flex items-center space-x-2">
        <button
          onClick={() => onToggle(true)}
          className={`px-4 py-2 rounded-full text-[16px] font-medium transition-colors min-w-[69px] ${
            enabled 
              ? 'bg-[#000aff] text-white border border-black' 
              : 'bg-transparent text-black border border-[#e4e4e4]'
          }`}
        >
          On
        </button>
        <button
          onClick={() => onToggle(false)}
          className={`px-4 py-2 rounded-full text-[16px] font-medium transition-colors min-w-[76px] ${
            !enabled 
              ? 'bg-[#000aff] text-white border border-black' 
              : 'bg-transparent text-black border border-[#e4e4e4]'
          }`}
        >
          Off
        </button>
      </div>
    </div>
  );

  const ViewSettingsButton = () => (
    <button className="bg-[#ef3826] hover:bg-[#d63420] text-white px-8 py-3 rounded-full font-medium text-[16px] transition-colors border border-black min-w-[200px]">
      View settings
    </button>
  );

  const SettingItem = ({ title, description, hasInput = false, inputValue, onInputChange, inputKey, centered = true }) => (
    <div className="py-6">
      <div className={`${centered ? 'text-left' : 'flex items-center justify-between'}`}>
        <div className={centered ? '' : 'flex-1'}>
          <h3 className="font-bold text-[#000000] text-[22px] font-montserrat mb-1">{title}</h3>
          {description && (
            <p className="font-bold text-[#000000] text-[18px] font-montserrat">{description}</p>
          )}
        </div>
        {!centered && (
          <div className="flex items-center space-x-4">
            {hasInput && (
              <input
                type="number"
                value={inputValue}
                onChange={(e) => onInputChange(inputKey, parseInt(e.target.value))}
                className="w-20 px-3 py-2 border-2 border-black rounded-xl text-center"
                min="0"
              />
            )}
            <ViewSettingsButton />
          </div>
        )}
      </div>
      {centered && (
        <div className="flex justify-start mt-3">
          <ViewSettingsButton />
        </div>
      )}
    </div>
  );

  const APITableRow = ({ service, apiKeys, authMethod, oauth, reauthenticate, action }) => (
    <div className="flex items-center py-1.5 border-b border-dotted border-gray-300">
      <div className="w-1/6 text-left font-montserrat text-[14px]">{service}</div>
      <div className="w-1/6 text-center font-montserrat text-[16px] font-bold">{apiKeys}</div>
      <div className="w-1/6 text-center font-montserrat text-[16px] font-bold">{authMethod}</div>
      <div className="w-1/6 text-center font-montserrat text-[16px] font-bold">{oauth}</div>
      <div className="w-1/6 text-center font-montserrat text-[16px] font-bold">{reauthenticate}</div>
      <div className="w-1/6 text-center font-montserrat text-[16px] font-bold">{action}</div>
    </div>
  );

  const APISection = ({ title, items }) => (
    <div className="py-6">
      <h3 className="font-bold text-[#000000] text-[22px] font-montserrat mb-4">{title}</h3>
      <div className="bg-gray-50 rounded-lg p-3">
        <div className="flex items-center py-2 border-b border-solid border-gray-400 font-bold text-sm">
          <div className="w-1/6 text-left">Service</div>
          <div className="w-1/6 text-center">API Keys</div>
          <div className="w-1/6 text-center">Auth Method</div>
          <div className="w-1/6 text-center">OAuth</div>
          <div className="w-1/6 text-center">Reauthenticate</div>
          <div className="w-1/6 text-center">Action</div>
        </div>
        {items.map((item, index) => (
          <APITableRow key={index} {...item} />
        ))}
      </div>
    </div>
  );

  return (
    <div className="bg-white min-h-screen p-6 font-montserrat max-w-4xl">
      {/* Page Header */}
      <div className="mb-12">
        <h1 className="text-[24px] font-bold text-[#010101] font-montserrat">Settings</h1>
      </div>

      {/* Toggle Settings */}
      <div className="space-y-3 mb-12">
        <ToggleSwitch 
          enabled={settings.profileVisibility}
          onToggle={(value) => setSettings(prev => ({ ...prev, profileVisibility: value }))}
          label="collect Profile visibility data"
        />
        <ToggleSwitch 
          enabled={settings.locationData}
          onToggle={(value) => setSettings(prev => ({ ...prev, locationData: value }))}
          label="collect Location data"
        />
        <ToggleSwitch 
          enabled={settings.communicationPrefs}
          onToggle={(value) => setSettings(prev => ({ ...prev, communicationPrefs: value }))}
          label="Collect communication preferences"
        />
        <ToggleSwitch 
          enabled={settings.autoInvoicing}
          onToggle={(value) => setSettings(prev => ({ ...prev, autoInvoicing: value }))}
          label="get auto invoice mailing"
        />
        <ToggleSwitch 
          enabled={settings.huggingFaceAPI}
          onToggle={(value) => setSettings(prev => ({ ...prev, huggingFaceAPI: value }))}
          label="hugging face api open close"
        />
      </div>

      {/* Discount Setting */}
      <div className="py-6">
        <h3 className="font-bold text-[#000000] text-[20px] font-montserrat mb-4">
          Set the percentage of discount to implement if paying online
        </h3>
        <ViewSettingsButton />
      </div>

      {/* User Limit Setting */}
      <div className="py-6">
        <SettingItem 
          title="set limit per user"
          hasInput={true}
          inputValue={settings.userLimit}
          onInputChange={handleInputChange}
          inputKey="userLimit"
          centered={false}
        />
      </div>

      {/* System Configuration Items */}
      <div className="space-y-3">
        <SettingItem 
          title="hsn code setting"
        />
        
        <SettingItem 
          title="Set shipping and time estimates charges by region and country screen"
        />
        
        <SettingItem 
          title="Automatically change prices based on demand, time, user segment"
        />
        
        <SettingItem 
          title="add language country and region"
        />
        
        <SettingItem 
          title="Webhooks for order/payment updates Reply"
        />
        
        <SettingItem 
          title="Email and sms template mgt screen"
        />
        
        <SettingItem 
          title="Logs and error tracking integration ,, staging environment toggle"
        />

        {/* API Integration Sections */}
        <APISection 
          title="google analytics integration"
          items={[
            {
              service: "Google Analytics",
              apiKeys: "api keys",
              authMethod: "auth method",
              oauth: "Oauth", 
              reauthenticate: "reauthenticate",
              action: "action"
            }
          ]}
        />

        <APISection 
          title="SMS providers (Twilio, MSG91)"
          items={[
            {
              service: "Twilio",
              apiKeys: "api keys",
              authMethod: "auth method", 
              oauth: "Oauth",
              reauthenticate: "reauthenticate",
              action: "action"
            },
            {
              service: "MSG91",
              apiKeys: "api keys",
              authMethod: "auth method",
              oauth: "Oauth", 
              reauthenticate: "reauthenticate",
              action: "action"
            }
          ]}
        />

        <APISection 
          title="WhatsApp Business API"
          items={[
            {
              service: "WhatsApp",
              apiKeys: "api keys",
              authMethod: "auth method",
              oauth: "Oauth",
              reauthenticate: "reauthenticate", 
              action: "action"
            }
          ]}
        />

        <APISection 
          title="market place"
          items={[
            {
              service: "flipkart",
              apiKeys: "api keys",
              authMethod: "auth method",
              oauth: "Oauth",
              reauthenticate: "reauthenticate",
              action: "action"
            }
          ]}
        />
        
        <SettingItem 
          title="Auto-group items for efficient packing	Assign courier based on weight, region, or SLA"
        />
      </div>
    </div>
  );
};

export default Settings;
