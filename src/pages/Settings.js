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
    // Discount Modal
    discountModal: false,
    discountConditionCreatedSuccess: false,
    discountConditionUpdatedSuccess: false,
    discountConditionDeleteConfirm: false,
    discountConditionDeletedSuccess: false,
    
    // Shipping Charges Modal
    shippingChargesModal: false,
    shippingChargeCreatedSuccess: false,
    shippingChargeUpdatedSuccess: false,
    shippingChargeDeleteConfirm: false,
    shippingChargeDeletedSuccess: false,
    
    // HSN Code Modal
    hsnCodeModal: false,
    hsnCodeCreatedModal: false,
    hsnCodeUpdatedModal: false,
    hsnCodeDeletedModal: false,
    deleteHsnCodeModal: false,
    
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

  // Discount form state
  const [discountForm, setDiscountForm] = useState({
    category: '',
    subCategory: '',
    items: '',
    specified: '',
    discountType: '',
    startDate: '',
    endDate: '',
    minimumOrderValue: '',
    maxUsers: ''
  });
  const [discountConditions, setDiscountConditions] = useState([]);

  // Edit state for discount conditions
  const [editingCondition, setEditingCondition] = useState(null);
  const [editParameter, setEditParameter] = useState('');
  const [deletingConditionId, setDeletingConditionId] = useState(null);

  // Shipping charges form state
  const [shippingForm, setShippingForm] = useState({
    country: '',
    region: '',
    deliveryCharge: '',
    returnCharge: '',
    estimatedDays: ''
  });
  const [shippingCharges, setShippingCharges] = useState([]);

  // Edit state for shipping charges
  const [editingShippingCharge, setEditingShippingCharge] = useState(null);
  const [deletingShippingChargeId, setDeletingShippingChargeId] = useState(null);

  // HSN codes form state
  const [hsnCodeForm, setHsnCodeForm] = useState({
    code: ''
  });
  const [hsnCodes, setHsnCodes] = useState([]);

  // Edit state for HSN codes
  const [editingHsnCode, setEditingHsnCode] = useState(null);
  const [deletingHsnCodeId, setDeletingHsnCodeId] = useState(null);

  // Discount modal handlers
  const handleOpenDiscountModal = () => {
    setModals(prev => ({ ...prev, discountModal: true }));
  };

  const handleCloseDiscountModal = () => {
    setModals(prev => ({ ...prev, discountModal: false }));
    setEditingCondition(null);
    setEditParameter('');
    setDeletingConditionId(null);
    // Reset form
    setDiscountForm({
      category: '',
      subCategory: '',
      items: '',
      specified: '',
      discountType: '',
      startDate: '',
      endDate: '',
      minimumOrderValue: '',
      maxUsers: ''
    });
  };

  const handleDiscountFormChange = (field, value) => {
    setDiscountForm(prev => ({ ...prev, [field]: value }));
  };

  const handleCreateCondition = () => {
    const newCondition = { ...discountForm, id: Date.now() };
    setDiscountConditions(prev => [...prev, newCondition]);
    // Reset form for next condition
    setDiscountForm({
      category: '',
      subCategory: '',
      items: '',
      specified: '',
      discountType: '',
      startDate: '',
      endDate: '',
      minimumOrderValue: '',
      maxUsers: ''
    });
    // Show success modal
    setModals(prev => ({ ...prev, discountConditionCreatedSuccess: true }));
  };

  const handleEditCondition = (id) => {
    const condition = discountConditions.find(c => c.id === id);
    if (condition) {
      setEditingCondition(condition);
      setDiscountForm(condition);
      setEditParameter('');
      // Don't remove from list yet - only remove when saved
    }
  };

  const handleDeleteCondition = (id) => {
    setDeletingConditionId(id);
    setModals(prev => ({ ...prev, discountConditionDeleteConfirm: true }));
  };

  const handleSaveEditedCondition = () => {
    if (editingCondition) {
      // Update the condition in the list
      setDiscountConditions(prev => 
        prev.map(c => c.id === editingCondition.id ? { ...discountForm, id: editingCondition.id } : c)
      );
      // Reset edit state
      setEditingCondition(null);
      setEditParameter('');
      setDiscountForm({
        category: '',
        subCategory: '',
        items: '',
        specified: '',
        discountType: '',
        startDate: '',
        endDate: '',
        minimumOrderValue: '',
        maxUsers: ''
      });
      // Show success modal
      setModals(prev => ({ ...prev, discountConditionUpdatedSuccess: true }));
    }
  };

  const handleCancelEdit = () => {
    setEditingCondition(null);
    setEditParameter('');
    // Reset form
    setDiscountForm({
      category: '',
      subCategory: '',
      items: '',
      specified: '',
      discountType: '',
      startDate: '',
      endDate: '',
      minimumOrderValue: '',
      maxUsers: ''
    });
  };

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

  // Discount success modal handlers
  const handleDiscountCreatedSuccessDone = () => {
    setModals(prev => ({ ...prev, discountConditionCreatedSuccess: false }));
  };

  const handleDiscountUpdatedSuccessDone = () => {
    setModals(prev => ({ ...prev, discountConditionUpdatedSuccess: false }));
  };

  // Discount delete modal handlers
  const handleConfirmDeleteCondition = () => {
    if (deletingConditionId) {
      setDiscountConditions(prev => prev.filter(c => c.id !== deletingConditionId));
      setModals(prev => ({ 
        ...prev, 
        discountConditionDeleteConfirm: false,
        discountConditionDeletedSuccess: true 
      }));
      setDeletingConditionId(null);
    }
  };

  const handleCancelDeleteCondition = () => {
    setModals(prev => ({ ...prev, discountConditionDeleteConfirm: false }));
    setDeletingConditionId(null);
  };

  const handleDiscountDeletedSuccessDone = () => {
    setModals(prev => ({ ...prev, discountConditionDeletedSuccess: false }));
  };

  // Shipping charges modal handlers
  const handleOpenShippingModal = () => {
    setModals(prev => ({ ...prev, shippingChargesModal: true }));
  };

  const handleCloseShippingModal = () => {
    setModals(prev => ({ ...prev, shippingChargesModal: false }));
    setEditingShippingCharge(null);
    setDeletingShippingChargeId(null);
    // Reset form
    setShippingForm({
      country: '',
      region: '',
      deliveryCharge: '',
      returnCharge: '',
      estimatedDays: ''
    });
  };

  const handleShippingFormChange = (field, value) => {
    setShippingForm(prev => ({ ...prev, [field]: value }));
  };

  const handleCreateShippingCharge = () => {
    const newCharge = { ...shippingForm, id: Date.now() };
    setShippingCharges(prev => [...prev, newCharge]);
    // Reset form for next charge
    setShippingForm({
      country: '',
      region: '',
      deliveryCharge: '',
      returnCharge: '',
      estimatedDays: ''
    });
    // Show success modal
    setModals(prev => ({ ...prev, shippingChargeCreatedSuccess: true }));
  };

  const handleEditShippingCharge = (id) => {
    const charge = shippingCharges.find(c => c.id === id);
    if (charge) {
      setEditingShippingCharge(charge);
      setShippingForm(charge);
    }
  };

  const handleSaveEditedShippingCharge = () => {
    if (editingShippingCharge) {
      setShippingCharges(prev => 
        prev.map(c => c.id === editingShippingCharge.id ? { ...shippingForm, id: editingShippingCharge.id } : c)
      );
      setEditingShippingCharge(null);
      setShippingForm({
        country: '',
        region: '',
        deliveryCharge: '',
        returnCharge: '',
        estimatedDays: ''
      });
      setModals(prev => ({ ...prev, shippingChargeUpdatedSuccess: true }));
    }
  };

  const handleCancelEditShippingCharge = () => {
    setEditingShippingCharge(null);
    setShippingForm({
      country: '',
      region: '',
      deliveryCharge: '',
      returnCharge: '',
      estimatedDays: ''
    });
  };

  const handleDeleteShippingCharge = (id) => {
    setDeletingShippingChargeId(id);
    setModals(prev => ({ ...prev, shippingChargeDeleteConfirm: true }));
  };

  const handleConfirmDeleteShippingCharge = () => {
    if (deletingShippingChargeId) {
      setShippingCharges(prev => prev.filter(c => c.id !== deletingShippingChargeId));
      setModals(prev => ({ 
        ...prev, 
        shippingChargeDeleteConfirm: false,
        shippingChargeDeletedSuccess: true 
      }));
      setDeletingShippingChargeId(null);
    }
  };

  const handleCancelDeleteShippingCharge = () => {
    setModals(prev => ({ ...prev, shippingChargeDeleteConfirm: false }));
    setDeletingShippingChargeId(null);
  };

  // Shipping charges success modal handlers
  const handleShippingChargeCreatedSuccessDone = () => {
    setModals(prev => ({ ...prev, shippingChargeCreatedSuccess: false }));
  };

  const handleShippingChargeUpdatedSuccessDone = () => {
    setModals(prev => ({ ...prev, shippingChargeUpdatedSuccess: false }));
  };

  const handleShippingChargeDeletedSuccessDone = () => {
    setModals(prev => ({ ...prev, shippingChargeDeletedSuccess: false }));
  };

  // HSN code modal handlers
  const handleOpenHsnCodeModal = () => {
    setModals(prev => ({ ...prev, hsnCodeModal: true }));
  };

  const handleCloseHsnCodeModal = () => {
    setModals(prev => ({ ...prev, hsnCodeModal: false }));
    setEditingHsnCode(null);
    setDeletingHsnCodeId(null);
    // Reset form
    setHsnCodeForm({
      code: ''
    });
  };

  const handleHsnCodeFormChange = (field, value) => {
    setHsnCodeForm(prev => ({ ...prev, [field]: value }));
  };

  const handleCreateHsnCode = () => {
    const newCode = { ...hsnCodeForm, id: Date.now(), isDefault: false, isAlternate: false };
    setHsnCodes(prev => [...prev, newCode]);
    // Reset form for next code
    setHsnCodeForm({
      code: ''
    });
    // Show success modal
    setModals(prev => ({ ...prev, hsnCodeCreatedModal: true }));
  };

  const handleEditHsnCode = (id) => {
    const code = hsnCodes.find(c => c.id === id);
    if (code) {
      setEditingHsnCode(code);
      setHsnCodeForm(code);
    }
  };

  const handleSaveEditedHsnCode = () => {
    if (editingHsnCode) {
      setHsnCodes(prev => 
        prev.map(c => c.id === editingHsnCode.id ? { ...hsnCodeForm, id: editingHsnCode.id } : c)
      );
      setEditingHsnCode(null);
      setHsnCodeForm({
        code: ''
      });
      setModals(prev => ({ ...prev, hsnCodeUpdatedModal: true }));
    }
  };

  const handleCancelEditHsnCode = () => {
    setEditingHsnCode(null);
    setHsnCodeForm({
      code: ''
    });
  };

  const handleDeleteHsnCode = (id) => {
    setDeletingHsnCodeId(id);
    setModals(prev => ({ ...prev, deleteHsnCodeModal: true }));
  };

  const handleConfirmDeleteHsnCode = () => {
    if (deletingHsnCodeId) {
      setHsnCodes(prev => prev.filter(c => c.id !== deletingHsnCodeId));
      setModals(prev => ({ 
        ...prev, 
        deleteHsnCodeModal: false,
        hsnCodeDeletedModal: true 
      }));
      setDeletingHsnCodeId(null);
    }
  };

  const handleCancelDeleteHsnCode = () => {
    setModals(prev => ({ ...prev, deleteHsnCodeModal: false }));
    setDeletingHsnCodeId(null);
  };

  const handleSaveAsDefault = (id) => {
    setHsnCodes(prev => prev.map(c => ({ 
      ...c, 
      isDefault: c.id === id,
      isAlternate: c.id === id ? false : c.isAlternate
    })));
  };

  const handleAssignAsAlternate = (id) => {
    setHsnCodes(prev => prev.map(c => ({ 
      ...c, 
      isAlternate: c.id === id,
      isDefault: c.id === id ? false : c.isDefault
    })));
  };

  // HSN code success modal handlers
  const handleHsnCodeCreatedSuccessDone = () => {
    setModals(prev => ({ ...prev, hsnCodeCreatedModal: false, hsnCodeModal: false }));
  };

  const handleHsnCodeUpdatedSuccessDone = () => {
    setModals(prev => ({ ...prev, hsnCodeUpdatedModal: false, hsnCodeModal: false }));
  };

  const handleHsnCodeDeletedSuccessDone = () => {
    setModals(prev => ({ ...prev, hsnCodeDeletedModal: false, hsnCodeModal: false }));
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

  const ViewSettingsButton = ({ onClick }) => (
    <button 
      onClick={onClick}
      className="bg-[#ef3826] hover:bg-[#d63420] text-white px-8 py-3 rounded-full font-medium text-[16px] transition-colors border border-black min-w-[200px]"
    >
      View settings
    </button>
  );

  const SettingItem = ({ title, description, hasInput = false, inputValue, onInputChange, inputKey, centered = true, onViewSettings }) => (
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
            <ViewSettingsButton onClick={onViewSettings} />
          </div>
        )}
      </div>
      {centered && (
        <div className="flex justify-start mt-3">
          <ViewSettingsButton onClick={onViewSettings} />
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
        <ViewSettingsButton onClick={handleOpenDiscountModal} />
      </div>

      {/* Shipping Charges Setting */}
      <div className="py-6">
        <h3 className="font-bold text-[#000000] text-[20px] font-montserrat mb-4">
          Set shipping and time estimates charges by region and country
        </h3>
        <ViewSettingsButton onClick={handleOpenShippingModal} />
      </div>

      {/* HSN Code Setting */}
      <div className="py-6">
        <h3 className="font-bold text-[#000000] text-[20px] font-montserrat mb-4">
          hsn code setting
        </h3>
        <ViewSettingsButton onClick={handleOpenHsnCodeModal} />
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
      {/* Discount Modal */}
      {modals.discountModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-[0px_4px_120px_2px_rgba(0,0,0,0.25)] relative w-full max-w-7xl mx-4 overflow-clip max-h-[90vh] overflow-y-auto">
            <button 
              onClick={handleCloseDiscountModal}
              className="absolute right-[33px] top-[33px] w-6 h-6 text-gray-500 hover:text-gray-700 z-10"
            >
              <svg className="w-full h-full" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            
            <div className="p-8">
              <h2 className="text-center font-bold text-black text-[24px] mb-8 font-montserrat">
                Set the percentage of discount to implement if paying online
              </h2>
              
              {/* Edit Condition Modal View */}
              {editingCondition && (
                <div className="mb-8 p-6 border border-gray-200 rounded-xl bg-gray-50">
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-center font-normal text-black text-[24px] font-montserrat tracking-[-0.6px]">
                      Edit condition
                    </h3>
                    <button 
                      onClick={handleCancelEdit}
                      className="w-6 h-6 text-gray-500 hover:text-gray-700"
                    >
                      <svg className="w-full h-full" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </div>
                  
                  {/* Current condition details */}
                  <div className="grid grid-cols-5 gap-4 mb-6">
                    <div>
                      <label className="block font-medium text-[#111111] text-[21px] font-montserrat mb-2">Discount Type</label>
                      <input
                        type="text"
                        value={discountForm.discountType}
                        onChange={(e) => handleDiscountFormChange('discountType', e.target.value)}
                        className="w-full px-4 py-3 border-2 border-black rounded-xl text-[15px] font-montserrat focus:outline-none focus:border-blue-500"
                      />
                    </div>
                    <div>
                      <label className="block font-medium text-[#111111] text-[21px] font-montserrat mb-2">Start date</label>
                      <div className="relative">
                        <input
                          type="date"
                          value={discountForm.startDate}
                          onChange={(e) => handleDiscountFormChange('startDate', e.target.value)}
                          className="w-full px-4 py-3 border-2 border-black rounded-xl text-[15px] font-montserrat focus:outline-none focus:border-blue-500"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block font-medium text-[#111111] text-[21px] font-montserrat mb-2">End date</label>
                      <div className="relative">
                        <input
                          type="date"
                          value={discountForm.endDate}
                          onChange={(e) => handleDiscountFormChange('endDate', e.target.value)}
                          className="w-full px-4 py-3 border-2 border-black rounded-xl text-[15px] font-montserrat focus:outline-none focus:border-blue-500"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block font-medium text-[#111111] text-[21px] font-montserrat mb-2">minimum order value</label>
                      <input
                        type="number"
                        value={discountForm.minimumOrderValue}
                        onChange={(e) => handleDiscountFormChange('minimumOrderValue', e.target.value)}
                        className="w-full px-4 py-3 border-2 border-black rounded-xl text-[15px] font-montserrat focus:outline-none focus:border-blue-500"
                        placeholder="0"
                      />
                    </div>
                    <div>
                      <label className="block font-medium text-[#111111] text-[21px] font-montserrat mb-2">max users</label>
                      <input
                        type="number"
                        value={discountForm.maxUsers}
                        onChange={(e) => handleDiscountFormChange('maxUsers', e.target.value)}
                        className="w-full px-4 py-3 border-2 border-black rounded-xl text-[15px] font-montserrat focus:outline-none focus:border-blue-500"
                        placeholder="0"
                      />
                    </div>
                  </div>

                  {/* Edit parameter input */}
                  <div className="mb-6">
                    <h4 className="text-center font-normal text-black text-[24px] font-montserrat tracking-[-0.6px] mb-4">
                      type new parameter
                    </h4>
                    <input
                      type="text"
                      value={editParameter}
                      onChange={(e) => setEditParameter(e.target.value)}
                      className="w-full px-4 py-3 border-2 border-black rounded-xl text-[15px] font-montserrat focus:outline-none focus:border-blue-500 max-w-2xl mx-auto block"
                      placeholder="Enter new parameter..."
                    />
                  </div>

                  {/* Edit action buttons */}
                  <div className="flex gap-4 justify-center">
                    <button
                      onClick={handleSaveEditedCondition}
                      className="bg-black text-white px-16 py-4 rounded-full font-medium text-[16px] font-montserrat border border-black hover:bg-gray-800 transition-colors"
                    >
                      save
                    </button>
                    <button
                      onClick={handleCancelEdit}
                      className="border border-[#e4e4e4] text-black px-16 py-4 rounded-full font-medium text-[16px] font-montserrat hover:bg-gray-50 transition-colors"
                    >
                      go back
                    </button>
                  </div>
                </div>
              )}
              
              {/* Create New Condition Form - only show when not editing */}
              {!editingCondition && (
                <>
                  {/* Applicable On Section */}
                  <div className="mb-8">
                    <h3 className="font-bold text-[#111111] text-[21px] font-montserrat mb-4">applicable on</h3>
                    <div className="grid grid-cols-4 gap-4">
                      <div>
                        <select
                          value={discountForm.category}
                          onChange={(e) => handleDiscountFormChange('category', e.target.value)}
                          className="w-full px-4 py-3 border border-[#979797] rounded-xl text-[15px] font-montserrat focus:outline-none focus:border-blue-500"
                        >
                          <option value="">Category</option>
                          <option value="electronics">Electronics</option>
                          <option value="clothing">Clothing</option>
                          <option value="books">Books</option>
                          <option value="home">Home & Garden</option>
                        </select>
                      </div>
                      <div>
                        <select
                          value={discountForm.subCategory}
                          onChange={(e) => handleDiscountFormChange('subCategory', e.target.value)}
                          className="w-full px-4 py-3 border border-[#979797] rounded-xl text-[15px] font-montserrat focus:outline-none focus:border-blue-500"
                        >
                          <option value="">sub category</option>
                          <option value="smartphones">Smartphones</option>
                          <option value="laptops">Laptops</option>
                          <option value="accessories">Accessories</option>
                        </select>
                      </div>
                      <div>
                        <select
                          value={discountForm.items}
                          onChange={(e) => handleDiscountFormChange('items', e.target.value)}
                          className="w-full px-4 py-3 border border-[#979797] rounded-xl text-[15px] font-montserrat focus:outline-none focus:border-blue-500"
                        >
                          <option value="">Items</option>
                          <option value="all">All Items</option>
                          <option value="featured">Featured Items</option>
                          <option value="new">New Arrivals</option>
                        </select>
                      </div>
                      <div>
                        <select
                          value={discountForm.specified}
                          onChange={(e) => handleDiscountFormChange('specified', e.target.value)}
                          className="w-full px-4 py-3 border border-[#979797] rounded-xl text-[15px] font-montserrat focus:outline-none focus:border-blue-500"
                        >
                          <option value="">specified</option>
                          <option value="brand">By Brand</option>
                          <option value="price-range">By Price Range</option>
                          <option value="rating">By Rating</option>
                        </select>
                      </div>
                    </div>
                  </div>

                  {/* Discount Configuration */}
                  <div className="mb-8">
                    <div className="grid grid-cols-2 gap-8">
                      <div className="space-y-4">
                        <div>
                          <label className="block font-medium text-[#111111] text-[21px] font-montserrat mb-2">Discount Type</label>
                          <input
                            type="text"
                            value={discountForm.discountType}
                            onChange={(e) => handleDiscountFormChange('discountType', e.target.value)}
                            className="w-full px-4 py-3 border-2 border-black rounded-xl text-[15px] font-montserrat focus:outline-none focus:border-blue-500"
                            placeholder="e.g., Percentage, Fixed Amount"
                          />
                        </div>
                        <div>
                          <label className="block font-medium text-[#111111] text-[21px] font-montserrat mb-2">Start date</label>
                          <input
                            type="date"
                            value={discountForm.startDate}
                            onChange={(e) => handleDiscountFormChange('startDate', e.target.value)}
                            className="w-full px-4 py-3 border-2 border-black rounded-xl text-[15px] font-montserrat focus:outline-none focus:border-blue-500"
                          />
                        </div>
                        <div>
                          <label className="block font-medium text-[#111111] text-[21px] font-montserrat mb-2">minimum order value</label>
                          <input
                            type="number"
                            value={discountForm.minimumOrderValue}
                            onChange={(e) => handleDiscountFormChange('minimumOrderValue', e.target.value)}
                            className="w-full px-4 py-3 border-2 border-black rounded-xl text-[15px] font-montserrat focus:outline-none focus:border-blue-500"
                            placeholder="0"
                          />
                        </div>
                      </div>
                      <div className="space-y-4">
                        <div>
                          <label className="block font-medium text-[#111111] text-[21px] font-montserrat mb-2">End date</label>
                          <input
                            type="date"
                            value={discountForm.endDate}
                            onChange={(e) => handleDiscountFormChange('endDate', e.target.value)}
                            className="w-full px-4 py-3 border-2 border-black rounded-xl text-[15px] font-montserrat focus:outline-none focus:border-blue-500"
                          />
                        </div>
                        <div>
                          <label className="block font-medium text-[#111111] text-[21px] font-montserrat mb-2">max users</label>
                          <input
                            type="number"
                            value={discountForm.maxUsers}
                            onChange={(e) => handleDiscountFormChange('maxUsers', e.target.value)}
                            className="w-full px-4 py-3 border-2 border-black rounded-xl text-[15px] font-montserrat focus:outline-none focus:border-blue-500"
                            placeholder="0"
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-4 mb-8">
                    <button
                      onClick={handleCreateCondition}
                      className="bg-[#202224] text-white px-16 py-4 rounded-full font-medium text-[16px] font-montserrat border border-black hover:bg-gray-800 transition-colors"
                    >
                      Create condition
                    </button>
                    <button
                      onClick={handleCloseDiscountModal}
                      className="border border-[#e4e4e4] text-black px-16 py-4 rounded-full font-medium text-[16px] font-montserrat hover:bg-gray-50 transition-colors"
                    >
                      go back
                    </button>
                  </div>
                </>
              )}

              {/* Conditions Section */}
              {discountConditions.length > 0 && !editingCondition && (
                <div>
                  <h3 className="font-bold text-[#111111] text-[21px] font-montserrat mb-4">conditions</h3>
                  <div className="space-y-4">
                    {discountConditions.map((condition) => (
                      <div key={condition.id} className="border border-gray-200 rounded-lg p-4">
                        <div className="grid grid-cols-6 gap-4 items-center text-sm">
                          <div>
                            <span className="font-medium">Discount Type:</span>
                            <div>{condition.discountType || 'N/A'}</div>
                          </div>
                          <div>
                            <span className="font-medium">Start date:</span>
                            <div>{condition.startDate || 'N/A'}</div>
                          </div>
                          <div>
                            <span className="font-medium">End date:</span>
                            <div>{condition.endDate || 'N/A'}</div>
                          </div>
                          <div>
                            <span className="font-medium">Min Order:</span>
                            <div>{condition.minimumOrderValue || 'N/A'}</div>
                          </div>
                          <div>
                            <span className="font-medium">Max Users:</span>
                            <div>{condition.maxUsers || 'N/A'}</div>
                          </div>
                          <div className="flex gap-2">
                            <button
                              onClick={() => handleEditCondition(condition.id)}
                              className="p-2 text-gray-600 hover:text-blue-600 transition-colors"
                              title="Edit"
                            >
                              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                              </svg>
                            </button>
                            <button
                              onClick={() => handleDeleteCondition(condition.id)}
                              className="p-2 text-gray-600 hover:text-red-600 transition-colors"
                              title="Delete"
                            >
                              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                              </svg>
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Shipping Charges Modal */}
      {modals.shippingChargesModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-[0px_4px_120px_2px_rgba(0,0,0,0.25)] relative w-full max-w-7xl mx-4 overflow-clip max-h-[90vh] overflow-y-auto">
            <button 
              onClick={handleCloseShippingModal}
              className="absolute right-[33px] top-[33px] w-6 h-6 text-gray-500 hover:text-gray-700 z-10"
            >
              <svg className="w-full h-full" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            
            <div className="p-8">
              <h2 className="text-center font-bold text-black text-[24px] mb-8 font-montserrat">
                Set shipping charges by region and country screen
              </h2>

              {/* Edit Shipping Charge Modal View */}
              {editingShippingCharge && (
                <div className="mb-8 p-6 border border-gray-200 rounded-xl bg-gray-50">
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-center font-normal text-black text-[24px] font-montserrat tracking-[-0.6px]">
                      Edit shipping charge
                    </h3>
                    <button 
                      onClick={handleCancelEditShippingCharge}
                      className="w-6 h-6 text-gray-500 hover:text-gray-700"
                    >
                      <svg className="w-full h-full" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </div>
                  
                  {/* Edit shipping charge details */}
                  <div className="grid grid-cols-5 gap-4 mb-6">
                    <div>
                      <label className="block font-medium text-[#111111] text-[21px] font-montserrat mb-2">Country</label>
                      <select
                        value={shippingForm.country}
                        onChange={(e) => handleShippingFormChange('country', e.target.value)}
                        className="w-full px-4 py-3 border-2 border-black rounded-xl text-[15px] font-montserrat focus:outline-none focus:border-blue-500"
                      >
                        <option value="">country</option>
                        <option value="USA">USA</option>
                        <option value="Canada">Canada</option>
                        <option value="UK">UK</option>
                        <option value="India">India</option>
                        <option value="Australia">Australia</option>
                      </select>
                    </div>
                    <div>
                      <label className="block font-medium text-[#111111] text-[21px] font-montserrat mb-2">Region</label>
                      <select
                        value={shippingForm.region}
                        onChange={(e) => handleShippingFormChange('region', e.target.value)}
                        className="w-full px-4 py-3 border-2 border-black rounded-xl text-[15px] font-montserrat focus:outline-none focus:border-blue-500"
                      >
                        <option value="">region</option>
                        <option value="North">North</option>
                        <option value="South">South</option>
                        <option value="East">East</option>
                        <option value="West">West</option>
                        <option value="Central">Central</option>
                      </select>
                    </div>
                    <div>
                      <label className="block font-medium text-[#111111] text-[21px] font-montserrat mb-2">Delivery Charge</label>
                      <input
                        type="text"
                        value={shippingForm.deliveryCharge}
                        onChange={(e) => handleShippingFormChange('deliveryCharge', e.target.value)}
                        className="w-full px-4 py-3 border-2 border-black rounded-xl text-[15px] font-montserrat focus:outline-none focus:border-blue-500"
                        placeholder="charge value"
                      />
                    </div>
                    <div>
                      <label className="block font-medium text-[#111111] text-[21px] font-montserrat mb-2">Return Charge</label>
                      <input
                        type="text"
                        value={shippingForm.returnCharge}
                        onChange={(e) => handleShippingFormChange('returnCharge', e.target.value)}
                        className="w-full px-4 py-3 border-2 border-black rounded-xl text-[15px] font-montserrat focus:outline-none focus:border-blue-500"
                        placeholder="charge value"
                      />
                    </div>
                    <div>
                      <label className="block font-medium text-[#111111] text-[21px] font-montserrat mb-2">Estimated Time in Days</label>
                      <input
                        type="text"
                        value={shippingForm.estimatedDays}
                        onChange={(e) => handleShippingFormChange('estimatedDays', e.target.value)}
                        className="w-full px-4 py-3 border-2 border-black rounded-xl text-[15px] font-montserrat focus:outline-none focus:border-blue-500"
                        placeholder="days"
                      />
                    </div>
                  </div>

                  {/* Edit action buttons */}
                  <div className="flex gap-4 justify-center">
                    <button
                      onClick={handleSaveEditedShippingCharge}
                      className="bg-black text-white px-16 py-4 rounded-full font-medium text-[16px] font-montserrat border border-black hover:bg-gray-800 transition-colors"
                    >
                      save
                    </button>
                    <button
                      onClick={handleCancelEditShippingCharge}
                      className="border border-[#e4e4e4] text-black px-16 py-4 rounded-full font-medium text-[16px] font-montserrat hover:bg-gray-50 transition-colors"
                    >
                      go back
                    </button>
                  </div>
                </div>
              )}
              
              {/* Create New Shipping Charge Form - only show when not editing */}
              {!editingShippingCharge && (
                <>
                  {/* Applicable On Section */}
                  <div className="mb-8">
                    <h3 className="font-bold text-[#111111] text-[21px] font-montserrat mb-4">applicable on</h3>
                    <div className="grid grid-cols-2 gap-4 mb-6">
                      <div>
                        <select
                          value={shippingForm.country}
                          onChange={(e) => handleShippingFormChange('country', e.target.value)}
                          className="w-full px-4 py-3 border-2 border-black rounded-xl text-[15px] font-montserrat focus:outline-none focus:border-blue-500"
                        >
                          <option value="">country</option>
                          <option value="USA">USA</option>
                          <option value="Canada">Canada</option>
                          <option value="UK">UK</option>
                          <option value="India">India</option>
                          <option value="Australia">Australia</option>
                        </select>
                      </div>
                      <div>
                        <select
                          value={shippingForm.region}
                          onChange={(e) => handleShippingFormChange('region', e.target.value)}
                          className="w-full px-4 py-3 border-2 border-black rounded-xl text-[15px] font-montserrat focus:outline-none focus:border-blue-500"
                        >
                          <option value="">region</option>
                          <option value="North">North</option>
                          <option value="South">South</option>
                          <option value="East">East</option>
                          <option value="West">West</option>
                          <option value="Central">Central</option>
                        </select>
                      </div>
                    </div>
                  </div>

                  {/* Charges Section */}
                  <div className="mb-8">
                    <div className="grid grid-cols-3 gap-4">
                      <div>
                        <label className="block font-medium text-[#111111] text-[21px] font-montserrat mb-2">delivery charge</label>
                        <input
                          type="text"
                          value={shippingForm.deliveryCharge}
                          onChange={(e) => handleShippingFormChange('deliveryCharge', e.target.value)}
                          className="w-full px-4 py-3 border-2 border-black rounded-xl text-[15px] font-montserrat focus:outline-none focus:border-blue-500"
                          placeholder="charge value"
                        />
                      </div>
                      <div>
                        <label className="block font-medium text-[#111111] text-[21px] font-montserrat mb-2">return charge</label>
                        <input
                          type="text"
                          value={shippingForm.returnCharge}
                          onChange={(e) => handleShippingFormChange('returnCharge', e.target.value)}
                          className="w-full px-4 py-3 border-2 border-black rounded-xl text-[15px] font-montserrat focus:outline-none focus:border-blue-500"
                          placeholder="charge value"
                        />
                      </div>
                      <div>
                        <label className="block font-medium text-[#111111] text-[21px] font-montserrat mb-2">estimated time in days</label>
                        <input
                          type="text"
                          value={shippingForm.estimatedDays}
                          onChange={(e) => handleShippingFormChange('estimatedDays', e.target.value)}
                          className="w-full px-4 py-3 border-2 border-black rounded-xl text-[15px] font-montserrat focus:outline-none focus:border-blue-500"
                          placeholder="days"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-4 mb-8">
                    <button
                      onClick={handleCreateShippingCharge}
                      className="bg-[#202224] text-white px-16 py-4 rounded-full font-medium text-[16px] font-montserrat border border-black hover:bg-gray-800 transition-colors"
                    >
                      Create charge
                    </button>
                    <button
                      onClick={handleCloseShippingModal}
                      className="border border-[#e4e4e4] text-black px-16 py-4 rounded-full font-medium text-[16px] font-montserrat hover:bg-gray-50 transition-colors"
                    >
                      go back
                    </button>
                  </div>
                </>
              )}

              {/* Shipping Charges List Section */}
              {shippingCharges.length > 0 && !editingShippingCharge && (
                <div>
                  <div className="grid grid-cols-5 gap-4 mb-4 font-bold text-[16px] font-montserrat text-[#111111] border-b border-gray-300 pb-2">
                    <div>countries</div>
                    <div>delivery charge</div>
                    <div>return charge</div>
                    <div>estimated time in days</div>
                    <div>edit</div>
                  </div>
                  <div className="space-y-4">
                    {shippingCharges.map((charge) => (
                      <div key={charge.id} className="grid grid-cols-5 gap-4 items-center text-[16px] font-montserrat py-2 border-b border-gray-100">
                        <div>{charge.country || 'N/A'} - {charge.region || 'N/A'}</div>
                        <div>{charge.deliveryCharge || 'N/A'}</div>
                        <div>{charge.returnCharge || 'N/A'}</div>
                        <div>{charge.estimatedDays || 'N/A'}</div>
                        <div className="flex gap-2">
                          <button
                            onClick={() => handleEditShippingCharge(charge.id)}
                            className="p-2 text-gray-600 hover:text-blue-600 transition-colors"
                            title="Edit"
                          >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                            </svg>
                          </button>
                          <button
                            onClick={() => handleDeleteShippingCharge(charge.id)}
                            className="p-2 text-gray-600 hover:text-red-600 transition-colors"
                            title="Delete"
                          >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                            </svg>
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* HSN Code Modal */}
      {modals.hsnCodeModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-[0px_4px_120px_2px_rgba(0,0,0,0.25)] relative w-full max-w-4xl mx-4 overflow-clip max-h-[90vh] overflow-y-auto">
            <button 
              onClick={handleCloseHsnCodeModal}
              className="absolute right-[33px] top-[33px] w-6 h-6 text-gray-500 hover:text-gray-700 z-10"
            >
              <svg className="w-full h-full" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            
            <div className="p-8">
              <h2 className="font-bold text-black text-[24px] mb-8 font-montserrat">
                hsn code setting
              </h2>

              {/* Edit HSN Code Modal View */}
              {editingHsnCode && (
                <div className="mb-8 p-6 border border-gray-200 rounded-xl bg-gray-50">
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="font-normal text-black text-[24px] font-montserrat tracking-[-0.6px]">
                      Edit HSN code
                    </h3>
                    <button 
                      onClick={handleCancelEditHsnCode}
                      className="w-6 h-6 text-gray-500 hover:text-gray-700"
                    >
                      <svg className="w-full h-full" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </div>
                  
                  {/* Edit HSN code input */}
                  <div className="mb-6">
                    <input
                      type="text"
                      value={hsnCodeForm.code}
                      onChange={(e) => handleHsnCodeFormChange('code', e.target.value)}
                      className="w-full px-4 py-3 border-2 border-black rounded-xl text-[15px] font-montserrat focus:outline-none focus:border-blue-500"
                      placeholder="Enter HSN code"
                    />
                  </div>

                  {/* Edit action buttons */}
                  <div className="flex gap-4 justify-center">
                    <button
                      onClick={handleSaveEditedHsnCode}
                      className="bg-black text-white px-16 py-4 rounded-full font-medium text-[16px] font-montserrat border border-black hover:bg-gray-800 transition-colors"
                    >
                      save
                    </button>
                    <button
                      onClick={handleCancelEditHsnCode}
                      className="border border-[#e4e4e4] text-black px-16 py-4 rounded-full font-medium text-[16px] font-montserrat hover:bg-gray-50 transition-colors"
                    >
                      go back
                    </button>
                  </div>
                </div>
              )}
              
              {/* Create New HSN Code Form - only show when not editing */}
              {!editingHsnCode && (
                <>
                  {/* Create New Code Section */}
                  <div className="mb-8">
                    <h3 className="font-medium text-[#111111] text-[18px] font-montserrat mb-4">create new code</h3>
                    <div className="mb-6">
                      <input
                        type="text"
                        value={hsnCodeForm.code}
                        onChange={(e) => handleHsnCodeFormChange('code', e.target.value)}
                        className="w-full max-w-md px-4 py-3 border-2 border-gray-300 rounded-xl text-[15px] font-montserrat focus:outline-none focus:border-blue-500"
                        placeholder="Enter HSN code"
                      />
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-4 mb-8">
                    <button
                      onClick={handleCreateHsnCode}
                      className="bg-[#202224] text-white px-16 py-4 rounded-full font-medium text-[16px] font-montserrat border border-black hover:bg-gray-800 transition-colors"
                    >
                      Create code
                    </button>
                    <button
                      onClick={handleCloseHsnCodeModal}
                      className="border border-[#e4e4e4] text-black px-16 py-4 rounded-full font-medium text-[16px] font-montserrat hover:bg-gray-50 transition-colors"
                    >
                      go back
                    </button>
                  </div>
                </>
              )}

              {/* HSN Codes List Section */}
              {hsnCodes.length > 0 && !editingHsnCode && (
                <div>
                  <div className="grid grid-cols-3 gap-4 mb-4 font-bold text-[16px] font-montserrat text-[#111111] border-b border-gray-300 pb-2">
                    <div>codes available</div>
                    <div>action</div>
                    <div>edit</div>
                  </div>
                  <div className="space-y-4">
                    {hsnCodes.map((code) => (
                      <div key={code.id} className="grid grid-cols-3 gap-4 items-center text-[16px] font-montserrat py-2 border-b border-gray-100">
                        <div>{code.code || 'N/A'}</div>
                        <div className="flex gap-2">
                          <button
                            onClick={() => handleSaveAsDefault(code.id)}
                            className={`px-4 py-2 rounded-full text-[14px] font-medium transition-colors ${
                              code.isDefault 
                                ? 'bg-blue-600 text-white' 
                                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                            }`}
                          >
                            save as default
                          </button>
                          <button
                            onClick={() => handleAssignAsAlternate(code.id)}
                            className={`px-4 py-2 rounded-full text-[14px] font-medium transition-colors ${
                              code.isAlternate 
                                ? 'bg-red-600 text-white' 
                                : 'bg-red-100 text-red-700 hover:bg-red-200'
                            }`}
                          >
                            Assign as alternate
                          </button>
                        </div>
                        <div className="flex gap-2">
                          <button
                            onClick={() => handleEditHsnCode(code.id)}
                            className="p-2 text-gray-600 hover:text-blue-600 transition-colors"
                            title="Edit"
                          >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                            </svg>
                          </button>
                          <button
                            onClick={() => handleDeleteHsnCode(code.id)}
                            className="p-2 text-gray-600 hover:text-red-600 transition-colors"
                            title="Delete"
                          >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                            </svg>
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {renderModalsForSetting('profileVisibility', 'Profile Visibility Data Collection')}
      {renderModalsForSetting('locationData', 'Location Data Collection')}
      {renderModalsForSetting('communicationPrefs', 'Communication Preferences Collection')}
      {renderModalsForSetting('autoInvoicing', 'Auto Invoice Mailing')}
      {renderModalsForSetting('huggingFaceAPI', 'Hugging Face API')}

      {/* Discount Condition Created Success Modal */}
      {modals.discountConditionCreatedSuccess && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-[0px_4px_120px_2px_rgba(0,0,0,0.25)] relative w-full max-w-md mx-4 overflow-clip">
            <button 
              onClick={handleDiscountCreatedSuccessDone}
              className="absolute right-[33px] top-[33px] w-6 h-6 text-gray-500 hover:text-gray-700"
            >
              <svg className="w-full h-full" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            <div className="p-8 text-center">
              <h3 className="font-bold text-black text-[18px] mb-6 font-montserrat">
                condition created successfully!
              </h3>
              <button
                onClick={handleDiscountCreatedSuccessDone}
                className="bg-black text-white px-16 py-3 rounded-full font-medium text-[16px] font-montserrat hover:bg-gray-800 transition-colors"
              >
                Done
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Discount Condition Updated Success Modal */}
      {modals.discountConditionUpdatedSuccess && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-[0px_4px_120px_2px_rgba(0,0,0,0.25)] relative w-full max-w-md mx-4 overflow-clip">
            <button 
              onClick={handleDiscountUpdatedSuccessDone}
              className="absolute right-[33px] top-[33px] w-6 h-6 text-gray-500 hover:text-gray-700"
            >
              <svg className="w-full h-full" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            <div className="p-8 text-center">
              <h3 className="font-bold text-black text-[18px] mb-6 font-montserrat">
                condition updated successfully!
              </h3>
              <button
                onClick={handleDiscountUpdatedSuccessDone}
                className="bg-black text-white px-16 py-3 rounded-full font-medium text-[16px] font-montserrat hover:bg-gray-800 transition-colors"
              >
                Done
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Discount Condition Delete Confirmation Modal */}
      {modals.discountConditionDeleteConfirm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-[0px_4px_120px_2px_rgba(0,0,0,0.25)] relative w-full max-w-md mx-4 overflow-clip">
            <button 
              onClick={handleCancelDeleteCondition}
              className="absolute right-[33px] top-[33px] w-6 h-6 text-gray-500 hover:text-gray-700"
            >
              <svg className="w-full h-full" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            <div className="p-8 text-center">
              <h3 className="font-bold text-black text-[18px] mb-6 font-montserrat">
                Are you sure you want to turn delete this condition
              </h3>
              <div className="flex gap-4 justify-center">
                <button
                  onClick={handleConfirmDeleteCondition}
                  className="bg-black text-white px-8 py-3 rounded-full font-medium text-[16px] font-montserrat hover:bg-gray-800 transition-colors"
                >
                  yes
                </button>
                <button
                  onClick={handleCancelDeleteCondition}
                  className="border border-[#e4e4e4] text-black px-8 py-3 rounded-full font-medium text-[16px] font-montserrat hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Discount Condition Deleted Success Modal */}
      {modals.discountConditionDeletedSuccess && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-[0px_4px_120px_2px_rgba(0,0,0,0.25)] relative w-full max-w-md mx-4 overflow-clip">
            <button 
              onClick={handleDiscountDeletedSuccessDone}
              className="absolute right-[33px] top-[33px] w-6 h-6 text-gray-500 hover:text-gray-700"
            >
              <svg className="w-full h-full" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            <div className="p-8 text-center">
              <h3 className="font-bold text-black text-[18px] mb-6 font-montserrat">
                condition deleted successfully!
              </h3>
              <button
                onClick={handleDiscountDeletedSuccessDone}
                className="bg-black text-white px-16 py-3 rounded-full font-medium text-[16px] font-montserrat hover:bg-gray-800 transition-colors"
              >
                Done
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Shipping Charge Created Success Modal */}
      {modals.shippingChargeCreatedSuccess && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-[0px_4px_120px_2px_rgba(0,0,0,0.25)] relative w-full max-w-md mx-4 overflow-clip">
            <button 
              onClick={handleShippingChargeCreatedSuccessDone}
              className="absolute right-[33px] top-[33px] w-6 h-6 text-gray-500 hover:text-gray-700"
            >
              <svg className="w-full h-full" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            <div className="p-8 text-center">
              <h3 className="font-bold text-black text-[18px] mb-6 font-montserrat">
                shipping charge created successfully!
              </h3>
              <button
                onClick={handleShippingChargeCreatedSuccessDone}
                className="bg-black text-white px-16 py-3 rounded-full font-medium text-[16px] font-montserrat hover:bg-gray-800 transition-colors"
              >
                Done
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Shipping Charge Updated Success Modal */}
      {modals.shippingChargeUpdatedSuccess && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-[0px_4px_120px_2px_rgba(0,0,0,0.25)] relative w-full max-w-md mx-4 overflow-clip">
            <button 
              onClick={handleShippingChargeUpdatedSuccessDone}
              className="absolute right-[33px] top-[33px] w-6 h-6 text-gray-500 hover:text-gray-700"
            >
              <svg className="w-full h-full" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            <div className="p-8 text-center">
              <h3 className="font-bold text-black text-[18px] mb-6 font-montserrat">
                shipping charge updated successfully!
              </h3>
              <button
                onClick={handleShippingChargeUpdatedSuccessDone}
                className="bg-black text-white px-16 py-3 rounded-full font-medium text-[16px] font-montserrat hover:bg-gray-800 transition-colors"
              >
                Done
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Shipping Charge Delete Confirmation Modal */}
      {modals.shippingChargeDeleteConfirm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-[0px_4px_120px_2px_rgba(0,0,0,0.25)] relative w-full max-w-md mx-4 overflow-clip">
            <button 
              onClick={handleCancelDeleteShippingCharge}
              className="absolute right-[33px] top-[33px] w-6 h-6 text-gray-500 hover:text-gray-700"
            >
              <svg className="w-full h-full" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            <div className="p-8 text-center">
              <h3 className="font-bold text-black text-[18px] mb-6 font-montserrat">
                Are you sure you want to turn delete this shipping charge
              </h3>
              <div className="flex gap-4 justify-center">
                <button
                  onClick={handleConfirmDeleteShippingCharge}
                  className="bg-black text-white px-8 py-3 rounded-full font-medium text-[16px] font-montserrat hover:bg-gray-800 transition-colors"
                >
                  yes
                </button>
                <button
                  onClick={handleCancelDeleteShippingCharge}
                  className="border border-[#e4e4e4] text-black px-8 py-3 rounded-full font-medium text-[16px] font-montserrat hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Shipping Charge Deleted Success Modal */}
      {modals.shippingChargeDeletedSuccess && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-[0px_4px_120px_2px_rgba(0,0,0,0.25)] relative w-full max-w-md mx-4 overflow-clip">
            <button 
              onClick={handleShippingChargeDeletedSuccessDone}
              className="absolute right-[33px] top-[33px] w-6 h-6 text-gray-500 hover:text-gray-700"
            >
              <svg className="w-full h-full" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            <div className="p-8 text-center">
              <h3 className="font-bold text-black text-[18px] mb-6 font-montserrat">
                shipping charge deleted successfully!
              </h3>
              <button
                onClick={handleShippingChargeDeletedSuccessDone}
                className="bg-black text-white px-16 py-3 rounded-full font-medium text-[16px] font-montserrat hover:bg-gray-800 transition-colors"
              >
                Done
              </button>
            </div>
          </div>
        </div>
      )}

      {/* HSN Code Success Modal - Created */}
      {modals.hsnCodeCreatedModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-[0px_4px_120px_2px_rgba(0,0,0,0.25)] relative w-full max-w-md mx-4 overflow-clip">
            <button 
              onClick={handleHsnCodeCreatedSuccessDone}
              className="absolute right-[33px] top-[33px] w-6 h-6 text-gray-500 hover:text-gray-700"
            >
              <svg className="w-full h-full" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            <div className="p-8 text-center">
              <h3 className="font-bold text-black text-[18px] mb-6 font-montserrat">
                hsn code added successfully!
              </h3>
              <button
                onClick={handleHsnCodeCreatedSuccessDone}
                className="bg-black text-white px-16 py-3 rounded-full font-medium text-[16px] font-montserrat hover:bg-gray-800 transition-colors"
              >
                Done
              </button>
            </div>
          </div>
        </div>
      )}

      {/* HSN Code Success Modal - Updated */}
      {modals.hsnCodeUpdatedModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-[0px_4px_120px_2px_rgba(0,0,0,0.25)] relative w-full max-w-md mx-4 overflow-clip">
            <button 
              onClick={handleHsnCodeUpdatedSuccessDone}
              className="absolute right-[33px] top-[33px] w-6 h-6 text-gray-500 hover:text-gray-700"
            >
              <svg className="w-full h-full" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            <div className="p-8 text-center">
              <h3 className="font-bold text-black text-[18px] mb-6 font-montserrat">
                hsn code updated successfully!
              </h3>
              <button
                onClick={handleHsnCodeUpdatedSuccessDone}
                className="bg-black text-white px-16 py-3 rounded-full font-medium text-[16px] font-montserrat hover:bg-gray-800 transition-colors"
              >
                Done
              </button>
            </div>
          </div>
        </div>
      )}

      {/* HSN Code Success Modal - Deleted */}
      {modals.hsnCodeDeletedModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-[0px_4px_120px_2px_rgba(0,0,0,0.25)] relative w-full max-w-md mx-4 overflow-clip">
            <button 
              onClick={handleHsnCodeDeletedSuccessDone}
              className="absolute right-[33px] top-[33px] w-6 h-6 text-gray-500 hover:text-gray-700"
            >
              <svg className="w-full h-full" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            <div className="p-8 text-center">
              <h3 className="font-bold text-black text-[18px] mb-6 font-montserrat">
                hsn code deleted successfully!
              </h3>
              <button
                onClick={handleHsnCodeDeletedSuccessDone}
                className="bg-black text-white px-16 py-3 rounded-full font-medium text-[16px] font-montserrat hover:bg-gray-800 transition-colors"
              >
                Done
              </button>
            </div>
          </div>
        </div>
      )}

      {/* HSN Code Delete Confirmation Modal */}
      {modals.deleteHsnCodeModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-[0px_4px_120px_2px_rgba(0,0,0,0.25)] relative w-full max-w-md mx-4 overflow-clip">
            <button 
              onClick={() => setModals(prev => ({ ...prev, deleteHsnCodeModal: false }))}
              className="absolute right-[33px] top-[33px] w-6 h-6 text-gray-500 hover:text-gray-700"
            >
              <svg className="w-full h-full" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            <div className="p-8 text-center">
              <h3 className="font-bold text-black text-[18px] mb-6 font-montserrat">
                Are you sure you want to delete this hsn code?
              </h3>
              <div className="flex gap-4 justify-center">
                <button
                  onClick={handleConfirmDeleteHsnCode}
                  className="bg-black text-white px-8 py-3 rounded-full font-medium text-[16px] font-montserrat hover:bg-gray-800 transition-colors"
                >
                  yes
                </button>
                <button
                  onClick={() => setModals(prev => ({ ...prev, deleteHsnCodeModal: false }))}
                  className="border border-[#e4e4e4] text-black px-8 py-3 rounded-full font-medium text-[16px] font-montserrat hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Settings;
