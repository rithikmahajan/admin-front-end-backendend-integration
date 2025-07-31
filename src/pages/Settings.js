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

  // Modal states for each setting
  const [modals, setModals] = useState({
    // Profile Visibility
    profileVisibilityConfirmOn: false,
    profileVisibilityConfirmOff: false,
    profileVisibility2FAOn: false,
    profileVisibility2FAOff: false,
    profileVisibilitySuccessOn: false,
    profileVisibilitySuccessOff: false,
    profileVisibilityFinalSuccessOn: false,
    profileVisibilityFinalSuccessOff: false,
    
    // Location Data
    locationDataConfirmOn: false,
    locationDataConfirmOff: false,
    locationData2FAOn: false,
    locationData2FAOff: false,
    locationDataSuccessOn: false,
    locationDataSuccessOff: false,
    locationDataFinalSuccessOn: false,
    locationDataFinalSuccessOff: false,
    
    // Communication Preferences
    communicationPrefsConfirmOn: false,
    communicationPrefsConfirmOff: false,
    communicationPrefs2FAOn: false,
    communicationPrefs2FAOff: false,
    communicationPrefsSuccessOn: false,
    communicationPrefsSuccessOff: false,
    communicationPrefsFinalSuccessOn: false,
    communicationPrefsFinalSuccessOff: false,
    
    // Auto Invoicing
    autoInvoicingConfirmOn: false,
    autoInvoicingConfirmOff: false,
    autoInvoicing2FAOn: false,
    autoInvoicing2FAOff: false,
    autoInvoicingSuccessOn: false,
    autoInvoicingSuccessOff: false,
    autoInvoicingFinalSuccessOn: false,
    autoInvoicingFinalSuccessOff: false,
    
    // Hugging Face API
    huggingFaceAPIConfirmOn: false,
    huggingFaceAPIConfirmOff: false,
    huggingFaceAPI2FAOn: false,
    huggingFaceAPI2FAOff: false,
    huggingFaceAPISuccessOn: false,
    huggingFaceAPISuccessOff: false,
    huggingFaceAPIFinalSuccessOn: false,
    huggingFaceAPIFinalSuccessOff: false,
  });

  // 2FA form state
  const [otpCode, setOtpCode] = useState(['', '', '', '']);
  const [verificationPassword, setVerificationPassword] = useState('');
  const [defaultPassword, setDefaultPassword] = useState('');
  const [showVerificationPassword, setShowVerificationPassword] = useState(false);
  const [showDefaultPassword, setShowDefaultPassword] = useState(false);

  // Generic toggle handler
  const handleToggleSetting = (settingKey, action) => {
    if (action === 'on') {
      setModals(prev => ({ ...prev, [`${settingKey}ConfirmOn`]: true }));
    } else {
      setModals(prev => ({ ...prev, [`${settingKey}ConfirmOff`]: true }));
    }
  };

  // Generic confirmation handlers
  const handleConfirmToggleOn = (settingKey) => {
    setModals(prev => ({ 
      ...prev, 
      [`${settingKey}ConfirmOn`]: false,
      [`${settingKey}2FAOn`]: true 
    }));
  };

  const handleConfirmToggleOff = (settingKey) => {
    setModals(prev => ({ 
      ...prev, 
      [`${settingKey}ConfirmOff`]: false,
      [`${settingKey}2FAOff`]: true 
    }));
  };

  const handleCancelToggle = (settingKey, action) => {
    setModals(prev => ({ ...prev, [`${settingKey}Confirm${action}`]: false }));
  };

  // Generic 2FA handlers
  const handle2FASubmit = (settingKey, action) => {
    const otpString = otpCode.join('');
    if (otpString.length === 4 && verificationPassword && defaultPassword) {
      setModals(prev => ({ 
        ...prev, 
        [`${settingKey}2FA${action}`]: false,
        [`${settingKey}Success${action}`]: true 
      }));
      // Reset 2FA form
      setOtpCode(['', '', '', '']);
      setVerificationPassword('');
      setDefaultPassword('');
    } else {
      alert('Please fill in all fields');
    }
  };

  const handleCancel2FA = (settingKey, action) => {
    setModals(prev => ({ ...prev, [`${settingKey}2FA${action}`]: false }));
    // Reset 2FA form
    setOtpCode(['', '', '', '']);
    setVerificationPassword('');
    setDefaultPassword('');
  };

  // Generic success handlers
  const handleSuccessModalDone = (settingKey, action) => {
    setModals(prev => ({ 
      ...prev, 
      [`${settingKey}Success${action}`]: false,
      [`${settingKey}FinalSuccess${action}`]: true 
    }));
  };

  const handleFinalSuccessModalDone = (settingKey, action) => {
    setModals(prev => ({ ...prev, [`${settingKey}FinalSuccess${action}`]: false }));
    setSettings(prev => ({ 
      ...prev, 
      [settingKey]: action === 'On' ? true : false 
    }));
  };

  const handleCloseSuccessModal = (settingKey, action) => {
    setModals(prev => ({ ...prev, [`${settingKey}Success${action}`]: false }));
    setSettings(prev => ({ 
      ...prev, 
      [settingKey]: action === 'On' ? true : false 
    }));
  };

  const handleCloseFinalSuccessModal = (settingKey, action) => {
    setModals(prev => ({ ...prev, [`${settingKey}FinalSuccess${action}`]: false }));
    setSettings(prev => ({ 
      ...prev, 
      [settingKey]: action === 'On' ? true : false 
    }));
  };

  // OTP input handler
  const handleOtpChange = (index, value) => {
    if (value.length <= 1 && /^\d*$/.test(value)) {
      const newOtp = [...otpCode];
      newOtp[index] = value;
      setOtpCode(newOtp);
      
      // Auto-focus next input
      if (value && index < 3) {
        const nextInput = document.getElementById(`otp-${index + 1}`);
        if (nextInput) nextInput.focus();
      }
    }
  };

  // Render modals for a specific setting
  const renderModalsForSetting = (settingKey, displayName) => {
    return (
      <>
        {/* Confirmation Modal - On */}
        {modals[`${settingKey}ConfirmOn`] && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-xl shadow-[0px_4px_120px_2px_rgba(0,0,0,0.25)] relative w-full max-w-md mx-4 overflow-clip">
              <button 
                onClick={() => handleCancelToggle(settingKey, 'On')}
                className="absolute right-[33px] top-[33px] w-6 h-6 text-gray-500 hover:text-gray-700"
              >
                <svg className="w-full h-full" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
              <div className="absolute top-[60px] left-1/2 transform -translate-x-1/2 w-[165px] text-center">
                <p className="font-bold text-black text-[18px] leading-[22px] tracking-[-0.41px] font-['Montserrat']">
                  Are you sure you want to turn {displayName} on
                </p>
              </div>
              <div className="absolute top-[189px] left-1/2 transform -translate-x-1/2 flex gap-4">
                <button
                  onClick={() => handleConfirmToggleOn(settingKey)}
                  className="bg-black text-white rounded-3xl w-[149px] h-12 font-semibold text-[16px] leading-[22px] font-['Montserrat'] hover:bg-gray-800 transition-colors"
                >
                  yes
                </button>
                <button
                  onClick={() => handleCancelToggle(settingKey, 'On')}
                  className="border border-[#e4e4e4] text-black rounded-[100px] w-[209px] h-16 font-medium text-[16px] leading-[19.2px] font-['Montserrat'] hover:bg-gray-50 transition-colors flex items-center justify-center"
                >
                  Cancel
                </button>
              </div>
              <div className="h-[280px]"></div>
            </div>
          </div>
        )}

        {/* Confirmation Modal - Off */}
        {modals[`${settingKey}ConfirmOff`] && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-xl shadow-[0px_4px_120px_2px_rgba(0,0,0,0.25)] relative w-full max-w-md mx-4 overflow-clip">
              <button 
                onClick={() => handleCancelToggle(settingKey, 'Off')}
                className="absolute right-[33px] top-[33px] w-6 h-6 text-gray-500 hover:text-gray-700"
              >
                <svg className="w-full h-full" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
              <div className="absolute top-[60px] left-1/2 transform -translate-x-1/2 w-[165px] text-center">
                <p className="font-bold text-black text-[18px] leading-[22px] tracking-[-0.41px] font-['Montserrat']">
                  Are you sure you want to turn {displayName} off
                </p>
              </div>
              <div className="absolute top-[189px] left-1/2 transform -translate-x-1/2 flex gap-4">
                <button
                  onClick={() => handleConfirmToggleOff(settingKey)}
                  className="bg-black text-white rounded-3xl w-[149px] h-12 font-semibold text-[16px] leading-[22px] font-['Montserrat'] hover:bg-gray-800 transition-colors"
                >
                  yes
                </button>
                <button
                  onClick={() => handleCancelToggle(settingKey, 'Off')}
                  className="border border-[#e4e4e4] text-black rounded-[100px] w-[209px] h-16 font-medium text-[16px] leading-[19.2px] font-['Montserrat'] hover:bg-gray-50 transition-colors flex items-center justify-center"
                >
                  Cancel
                </button>
              </div>
              <div className="h-[280px]"></div>
            </div>
          </div>
        )}

        {/* 2FA Modal - On */}
        {modals[`${settingKey}2FAOn`] && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-xl shadow-[0px_4px_120px_2px_rgba(0,0,0,0.25)] relative w-full max-w-lg mx-4 overflow-clip">
              <button 
                onClick={() => handleCancel2FA(settingKey, 'On')}
                className="absolute right-[33px] top-[33px] w-6 h-6 text-gray-500 hover:text-gray-700"
              >
                <svg className="w-full h-full" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
              <div className="p-8">
                <h3 className="text-center font-bold text-black text-[18px] mb-6">2-Factor Authentication</h3>
                
                <div className="mb-4">
                  <label className="block text-sm font-medium mb-2">Enter OTP Code</label>
                  <div className="flex gap-2 justify-center">
                    {otpCode.map((digit, index) => (
                      <input
                        key={index}
                        id={`otp-${settingKey}-on-${index}`}
                        type="text"
                        value={digit}
                        onChange={(e) => handleOtpChange(index, e.target.value)}
                        className="w-12 h-12 text-center border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none"
                        maxLength="1"
                      />
                    ))}
                  </div>
                </div>

                <div className="mb-4">
                  <label className="block text-sm font-medium mb-2">Verification Password</label>
                  <div className="relative">
                    <input
                      type={showVerificationPassword ? "text" : "password"}
                      value={verificationPassword}
                      onChange={(e) => setVerificationPassword(e.target.value)}
                      className="w-full px-3 py-2 border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none"
                    />
                    <button
                      type="button"
                      onClick={() => setShowVerificationPassword(!showVerificationPassword)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"
                    >
                      {showVerificationPassword ? "👁️" : "👁️‍🗨️"}
                    </button>
                  </div>
                </div>

                <div className="mb-6">
                  <label className="block text-sm font-medium mb-2">Default Password</label>
                  <div className="relative">
                    <input
                      type={showDefaultPassword ? "text" : "password"}
                      value={defaultPassword}
                      onChange={(e) => setDefaultPassword(e.target.value)}
                      className="w-full px-3 py-2 border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none"
                    />
                    <button
                      type="button"
                      onClick={() => setShowDefaultPassword(!showDefaultPassword)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"
                    >
                      {showDefaultPassword ? "👁️" : "👁️‍🗨️"}
                    </button>
                  </div>
                </div>

                <div className="flex gap-4">
                  <button
                    onClick={() => handle2FASubmit(settingKey, 'On')}
                    className="flex-1 bg-black text-white py-3 rounded-full font-semibold hover:bg-gray-800 transition-colors"
                  >
                    Submit
                  </button>
                  <button
                    onClick={() => handleCancel2FA(settingKey, 'On')}
                    className="flex-1 border border-gray-300 text-black py-3 rounded-full font-medium hover:bg-gray-50 transition-colors"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* 2FA Modal - Off */}
        {modals[`${settingKey}2FAOff`] && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-xl shadow-[0px_4px_120px_2px_rgba(0,0,0,0.25)] relative w-full max-w-lg mx-4 overflow-clip">
              <button 
                onClick={() => handleCancel2FA(settingKey, 'Off')}
                className="absolute right-[33px] top-[33px] w-6 h-6 text-gray-500 hover:text-gray-700"
              >
                <svg className="w-full h-full" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
              <div className="p-8">
                <h3 className="text-center font-bold text-black text-[18px] mb-6">2-Factor Authentication</h3>
                
                <div className="mb-4">
                  <label className="block text-sm font-medium mb-2">Enter OTP Code</label>
                  <div className="flex gap-2 justify-center">
                    {otpCode.map((digit, index) => (
                      <input
                        key={index}
                        id={`otp-${settingKey}-off-${index}`}
                        type="text"
                        value={digit}
                        onChange={(e) => handleOtpChange(index, e.target.value)}
                        className="w-12 h-12 text-center border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none"
                        maxLength="1"
                      />
                    ))}
                  </div>
                </div>

                <div className="mb-4">
                  <label className="block text-sm font-medium mb-2">Verification Password</label>
                  <div className="relative">
                    <input
                      type={showVerificationPassword ? "text" : "password"}
                      value={verificationPassword}
                      onChange={(e) => setVerificationPassword(e.target.value)}
                      className="w-full px-3 py-2 border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none"
                    />
                    <button
                      type="button"
                      onClick={() => setShowVerificationPassword(!showVerificationPassword)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"
                    >
                      {showVerificationPassword ? "👁️" : "👁️‍🗨️"}
                    </button>
                  </div>
                </div>

                <div className="mb-6">
                  <label className="block text-sm font-medium mb-2">Default Password</label>
                  <div className="relative">
                    <input
                      type={showDefaultPassword ? "text" : "password"}
                      value={defaultPassword}
                      onChange={(e) => setDefaultPassword(e.target.value)}
                      className="w-full px-3 py-2 border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none"
                    />
                    <button
                      type="button"
                      onClick={() => setShowDefaultPassword(!showDefaultPassword)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"
                    >
                      {showDefaultPassword ? "👁️" : "👁️‍🗨️"}
                    </button>
                  </div>
                </div>

                <div className="flex gap-4">
                  <button
                    onClick={() => handle2FASubmit(settingKey, 'Off')}
                    className="flex-1 bg-black text-white py-3 rounded-full font-semibold hover:bg-gray-800 transition-colors"
                  >
                    Submit
                  </button>
                  <button
                    onClick={() => handleCancel2FA(settingKey, 'Off')}
                    className="flex-1 border border-gray-300 text-black py-3 rounded-full font-medium hover:bg-gray-50 transition-colors"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Success Modal - On */}
        {modals[`${settingKey}SuccessOn`] && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-xl shadow-[0px_4px_120px_2px_rgba(0,0,0,0.25)] relative w-full max-w-md mx-4 overflow-clip">
              <button 
                onClick={() => handleCloseSuccessModal(settingKey, 'On')}
                className="absolute right-[33px] top-[33px] w-6 h-6 text-gray-500 hover:text-gray-700"
              >
                <svg className="w-full h-full" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
              <div className="p-8 text-center">
                <div className="mb-6">
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <h3 className="font-bold text-black text-[18px] mb-2">{displayName} Turned On</h3>
                  <p className="text-gray-600">The setting has been successfully activated.</p>
                </div>
                <button
                  onClick={() => handleSuccessModalDone(settingKey, 'On')}
                  className="bg-black text-white px-8 py-3 rounded-full font-semibold hover:bg-gray-800 transition-colors"
                >
                  Done
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Success Modal - Off */}
        {modals[`${settingKey}SuccessOff`] && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-xl shadow-[0px_4px_120px_2px_rgba(0,0,0,0.25)] relative w-full max-w-md mx-4 overflow-clip">
              <button 
                onClick={() => handleCloseSuccessModal(settingKey, 'Off')}
                className="absolute right-[33px] top-[33px] w-6 h-6 text-gray-500 hover:text-gray-700"
              >
                <svg className="w-full h-full" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
              <div className="p-8 text-center">
                <div className="mb-6">
                  <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </div>
                  <h3 className="font-bold text-black text-[18px] mb-2">{displayName} Turned Off</h3>
                  <p className="text-gray-600">The setting has been successfully deactivated.</p>
                </div>
                <button
                  onClick={() => handleSuccessModalDone(settingKey, 'Off')}
                  className="bg-black text-white px-8 py-3 rounded-full font-semibold hover:bg-gray-800 transition-colors"
                >
                  Done
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Final Success Modal - On */}
        {modals[`${settingKey}FinalSuccessOn`] && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-xl shadow-[0px_4px_120px_2px_rgba(0,0,0,0.25)] relative w-full max-w-md mx-4 overflow-clip">
              <button 
                onClick={() => handleCloseFinalSuccessModal(settingKey, 'On')}
                className="absolute right-[33px] top-[33px] w-6 h-6 text-gray-500 hover:text-gray-700"
              >
                <svg className="w-full h-full" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
              <div className="p-8 text-center">
                <div className="mb-6">
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <h3 className="font-bold text-black text-[18px] mb-2">Configuration Complete</h3>
                  <p className="text-gray-600">{displayName} is now active and configured.</p>
                </div>
                <button
                  onClick={() => handleFinalSuccessModalDone(settingKey, 'On')}
                  className="bg-black text-white px-8 py-3 rounded-full font-semibold hover:bg-gray-800 transition-colors"
                >
                  Finish
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Final Success Modal - Off */}
        {modals[`${settingKey}FinalSuccessOff`] && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-xl shadow-[0px_4px_120px_2px_rgba(0,0,0,0.25)] relative w-full max-w-md mx-4 overflow-clip">
              <button 
                onClick={() => handleCloseFinalSuccessModal(settingKey, 'Off')}
                className="absolute right-[33px] top-[33px] w-6 h-6 text-gray-500 hover:text-gray-700"
              >
                <svg className="w-full h-full" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
              <div className="p-8 text-center">
                <div className="mb-6">
                  <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </div>
                  <h3 className="font-bold text-black text-[18px] mb-2">Configuration Complete</h3>
                  <p className="text-gray-600">{displayName} has been successfully disabled.</p>
                </div>
                <button
                  onClick={() => handleFinalSuccessModalDone(settingKey, 'Off')}
                  className="bg-black text-white px-8 py-3 rounded-full font-semibold hover:bg-gray-800 transition-colors"
                >
                  Finish
                </button>
              </div>
            </div>
          </div>
        )}
      </>
    );
  };

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

  const ToggleSwitch = ({ enabled, onToggle, label, settingKey }) => (
    <div className="flex items-center justify-between py-4">
      <span className="font-bold text-[#010101] text-[20px] font-montserrat">{label}</span>
      <div className="flex items-center space-x-2">
        <button
          onClick={() => handleToggleSetting(settingKey, 'on')}
          className={`px-4 py-2 rounded-full text-[16px] font-medium transition-colors min-w-[69px] ${
            enabled 
              ? 'bg-[#000aff] text-white border border-black' 
              : 'bg-transparent text-black border border-[#e4e4e4]'
          }`}
        >
          On
        </button>
        <button
          onClick={() => handleToggleSetting(settingKey, 'off')}
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
          label="collect Profile visibility data"
          settingKey="profileVisibility"
        />
        <ToggleSwitch 
          enabled={settings.locationData}
          label="collect Location data"
          settingKey="locationData"
        />
        <ToggleSwitch 
          enabled={settings.communicationPrefs}
          label="Collect communication preferences"
          settingKey="communicationPrefs"
        />
        <ToggleSwitch 
          enabled={settings.autoInvoicing}
          label="get auto invoice mailing"
          settingKey="autoInvoicing"
        />
        <ToggleSwitch 
          enabled={settings.huggingFaceAPI}
          label="hugging face api open close"
          settingKey="huggingFaceAPI"
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

      {/* Render all modals for all settings */}
      {renderModalsForSetting('profileVisibility', 'Profile Visibility Data Collection')}
      {renderModalsForSetting('locationData', 'Location Data Collection')}
      {renderModalsForSetting('communicationPrefs', 'Communication Preferences Collection')}
      {renderModalsForSetting('autoInvoicing', 'Auto Invoice Mailing')}
      {renderModalsForSetting('huggingFaceAPI', 'Hugging Face API')}
    </div>
  );
};

export default Settings;
