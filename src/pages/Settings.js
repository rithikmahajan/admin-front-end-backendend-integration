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

  // Language, Country, Region form state
  const [locationSettings, setLocationSettings] = useState({
    searchTerm: '',
    selectedCountry: '',
    selectedLanguage: '',
    selectedCurrency: '',
    countries: [],
    languages: [],
    currencies: []
  });

  // Modal states for location settings
  const [locationModals, setLocationModals] = useState({
    languageCountryModal: false,
    editOrderModal: false,
    ordersSavedSuccess: false,
    countryCreatedSuccess: false,
    languageCreatedSuccess: false,
    currencyCreatedSuccess: false,
    deleteCountryConfirm: false,
    deleteLanguageConfirm: false,
    deleteCurrencyConfirm: false,
    countryDeletedSuccess: false,
    languageDeletedSuccess: false,
    currencyDeletedSuccess: false
  });

  // Auto notification state
  const [autoNotificationSettings, setAutoNotificationSettings] = useState({
    criteria: '',
    conditions: []
  });

  // Modal states for auto notification
  const [autoNotificationModals, setAutoNotificationModals] = useState({
    autoNotificationModal: false,
    conditionCreatedSuccess: false,
    conditionUpdatedSuccess: false,
    conditionDeleteConfirm: false,
    conditionDeletedSuccess: false
  });

  // Edit states for location settings
  const [editingCountry, setEditingCountry] = useState(null);
  const [editingLanguage, setEditingLanguage] = useState(null);
  const [editingCurrency, setEditingCurrency] = useState(null);
  const [deletingCountryId, setDeletingCountryId] = useState(null);
  const [deletingLanguageId, setDeletingLanguageId] = useState(null);
  const [deletingCurrencyId, setDeletingCurrencyId] = useState(null);

  // Order editing states
  const [editingOrders, setEditingOrders] = useState({
    countries: {},
    languages: {},
    currencies: {}
  });
  const [newOrderInput, setNewOrderInput] = useState('');

  // Auto notification editing state
  const [editingNotificationCondition, setEditingNotificationCondition] = useState(null);
  const [deletingNotificationConditionId, setDeletingNotificationConditionId] = useState(null);

  // Dynamic pricing state
  const [dynamicPricingSettings, setDynamicPricingSettings] = useState({
    criteria: '',
    conditions: []
  });

  // Modal states for dynamic pricing
  const [dynamicPricingModals, setDynamicPricingModals] = useState({
    dynamicPricingModal: false,
    conditionCreatedSuccess: false,
    conditionUpdatedSuccess: false,
    conditionDeleteConfirm: false,
    conditionDeletedSuccess: false
  });

  // Dynamic pricing form state
  const [dynamicPricingForm, setDynamicPricingForm] = useState({
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

  // Edit state for dynamic pricing conditions
  const [editingDynamicPricingCondition, setEditingDynamicPricingCondition] = useState(null);
  const [deletingDynamicPricingConditionId, setDeletingDynamicPricingConditionId] = useState(null);

  // Webhook management state
  const [webhookSettings, setWebhookSettings] = useState({
    webhooks: [],
    apiKeys: [],
    apiPermissions: {
      orders: true,
      products: true,
      customers: true,
      payments: true
    },
    webhookLogs: []
  });

  // Webhook form state
  const [webhookForm, setWebhookForm] = useState({
    event: '',
    webhookUrl: '',
    secretKey: ''
  });

  // Modal states for webhook management
  const [webhookModals, setWebhookModals] = useState({
    webhookModal: false,
    webhookCreatedSuccess: false,
    webhookUpdatedSuccess: false,
    webhookDeleteConfirm: false,
    webhookDeletedSuccess: false,
    apiKeyModal: false,
    apiKeyCreatedSuccess: false
  });

  // Edit state for webhooks
  const [editingWebhook, setEditingWebhook] = useState(null);
  const [deletingWebhookId, setDeletingWebhookId] = useState(null);

  // Predefined options
  const countryOptions = [
    'United States', 'Canada', 'United Kingdom', 'Germany', 'France', 'Spain', 'Italy', 
    'Netherlands', 'Sweden', 'Norway', 'Denmark', 'Australia', 'New Zealand', 'Japan', 
    'South Korea', 'Singapore', 'India', 'China', 'Brazil', 'Mexico'
  ];

  const languageOptions = [
    'English', 'Spanish', 'French', 'German', 'Italian', 'Portuguese', 'Dutch', 
    'Swedish', 'Norwegian', 'Danish', 'Japanese', 'Korean', 'Chinese (Simplified)', 
    'Chinese (Traditional)', 'Hindi', 'Arabic', 'Russian', 'Polish'
  ];

  const currencyOptions = [
    'USD - US Dollar', 'EUR - Euro', 'GBP - British Pound', 'JPY - Japanese Yen', 
    'CAD - Canadian Dollar', 'AUD - Australian Dollar', 'CHF - Swiss Franc', 
    'CNY - Chinese Yuan', 'INR - Indian Rupee', 'KRW - South Korean Won',
    'SEK - Swedish Krona', 'NOK - Norwegian Krone', 'DKK - Danish Krone'
  ];

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

  // Language, Country, Region handlers
  const handleOpenLanguageCountryModal = () => {
    setLocationModals(prev => ({ ...prev, languageCountryModal: true }));
  };

  const handleCloseLanguageCountryModal = () => {
    setLocationModals(prev => ({ ...prev, languageCountryModal: false }));
    setLocationSettings(prev => ({
      ...prev,
      searchTerm: '',
      selectedCountry: '',
      selectedLanguage: '',
      selectedCurrency: ''
    }));
    setEditingCountry(null);
    setEditingLanguage(null);
    setEditingCurrency(null);
  };

  const handleLocationSettingChange = (field, value) => {
    setLocationSettings(prev => ({ ...prev, [field]: value }));
  };

  const handleAddCountry = () => {
    if (locationSettings.selectedCountry) {
      const newCountry = {
        id: Date.now(),
        name: locationSettings.selectedCountry,
        order: locationSettings.countries.length + 1
      };
      setLocationSettings(prev => ({
        ...prev,
        countries: [...prev.countries, newCountry],
        selectedCountry: ''
      }));
      setLocationModals(prev => ({ ...prev, countryCreatedSuccess: true }));
    }
  };

  const handleAddLanguage = () => {
    if (locationSettings.selectedLanguage) {
      const newLanguage = {
        id: Date.now(),
        name: locationSettings.selectedLanguage,
        order: locationSettings.languages.length + 1
      };
      setLocationSettings(prev => ({
        ...prev,
        languages: [...prev.languages, newLanguage],
        selectedLanguage: ''
      }));
      setLocationModals(prev => ({ ...prev, languageCreatedSuccess: true }));
    }
  };

  const handleAddCurrency = () => {
    if (locationSettings.selectedCurrency) {
      const newCurrency = {
        id: Date.now(),
        name: locationSettings.selectedCurrency,
        order: locationSettings.currencies.length + 1
      };
      setLocationSettings(prev => ({
        ...prev,
        currencies: [...prev.currencies, newCurrency],
        selectedCurrency: ''
      }));
      setLocationModals(prev => ({ ...prev, currencyCreatedSuccess: true }));
    }
  };

  const handleEditCountry = (id) => {
    const country = locationSettings.countries.find(c => c.id === id);
    if (country) {
      setEditingCountry(country);
      setLocationSettings(prev => ({ ...prev, selectedCountry: country.name }));
    }
  };

  const handleEditLanguage = (id) => {
    const language = locationSettings.languages.find(l => l.id === id);
    if (language) {
      setEditingLanguage(language);
      setLocationSettings(prev => ({ ...prev, selectedLanguage: language.name }));
    }
  };

  const handleEditCurrency = (id) => {
    const currency = locationSettings.currencies.find(c => c.id === id);
    if (currency) {
      setEditingCurrency(currency);
      setLocationSettings(prev => ({ ...prev, selectedCurrency: currency.name }));
    }
  };

  const handleSaveEditedCountry = () => {
    if (editingCountry && locationSettings.selectedCountry) {
      setLocationSettings(prev => ({
        ...prev,
        countries: prev.countries.map(c => 
          c.id === editingCountry.id 
            ? { ...c, name: locationSettings.selectedCountry }
            : c
        ),
        selectedCountry: ''
      }));
      setEditingCountry(null);
    }
  };

  const handleSaveEditedLanguage = () => {
    if (editingLanguage && locationSettings.selectedLanguage) {
      setLocationSettings(prev => ({
        ...prev,
        languages: prev.languages.map(l => 
          l.id === editingLanguage.id 
            ? { ...l, name: locationSettings.selectedLanguage }
            : l
        ),
        selectedLanguage: ''
      }));
      setEditingLanguage(null);
    }
  };

  const handleSaveEditedCurrency = () => {
    if (editingCurrency && locationSettings.selectedCurrency) {
      setLocationSettings(prev => ({
        ...prev,
        currencies: prev.currencies.map(c => 
          c.id === editingCurrency.id 
            ? { ...c, name: locationSettings.selectedCurrency }
            : c
        ),
        selectedCurrency: ''
      }));
      setEditingCurrency(null);
    }
  };

  const handleDeleteCountry = (id) => {
    setDeletingCountryId(id);
    setLocationModals(prev => ({ ...prev, deleteCountryConfirm: true }));
  };

  const handleDeleteLanguage = (id) => {
    setDeletingLanguageId(id);
    setLocationModals(prev => ({ ...prev, deleteLanguageConfirm: true }));
  };

  const handleDeleteCurrency = (id) => {
    setDeletingCurrencyId(id);
    setLocationModals(prev => ({ ...prev, deleteCurrencyConfirm: true }));
  };

  const handleConfirmDeleteCountry = () => {
    if (deletingCountryId) {
      setLocationSettings(prev => ({
        ...prev,
        countries: prev.countries.filter(c => c.id !== deletingCountryId)
      }));
      setLocationModals(prev => ({
        ...prev,
        deleteCountryConfirm: false,
        countryDeletedSuccess: true
      }));
      setDeletingCountryId(null);
    }
  };

  const handleConfirmDeleteLanguage = () => {
    if (deletingLanguageId) {
      setLocationSettings(prev => ({
        ...prev,
        languages: prev.languages.filter(l => l.id !== deletingLanguageId)
      }));
      setLocationModals(prev => ({
        ...prev,
        deleteLanguageConfirm: false,
        languageDeletedSuccess: true
      }));
      setDeletingLanguageId(null);
    }
  };

  const handleConfirmDeleteCurrency = () => {
    if (deletingCurrencyId) {
      setLocationSettings(prev => ({
        ...prev,
        currencies: prev.currencies.filter(c => c.id !== deletingCurrencyId)
      }));
      setLocationModals(prev => ({
        ...prev,
        deleteCurrencyConfirm: false,
        currencyDeletedSuccess: true
      }));
      setDeletingCurrencyId(null);
    }
  };

  const handleCancelDeleteCountry = () => {
    setLocationModals(prev => ({ ...prev, deleteCountryConfirm: false }));
    setDeletingCountryId(null);
  };

  const handleCancelDeleteLanguage = () => {
    setLocationModals(prev => ({ ...prev, deleteLanguageConfirm: false }));
    setDeletingLanguageId(null);
  };

  const handleCancelDeleteCurrency = () => {
    setLocationModals(prev => ({ ...prev, deleteCurrencyConfirm: false }));
    setDeletingCurrencyId(null);
  };

  // Location success modal handlers
  const handleLocationSuccessDone = (type) => {
    setLocationModals(prev => ({ ...prev, [`${type}CreatedSuccess`]: false }));
  };

  const handleLocationDeletedSuccessDone = (type) => {
    setLocationModals(prev => ({ ...prev, [`${type}DeletedSuccess`]: false }));
  };

  // Order editing handlers
  const handleOpenEditOrderModal = () => {
    setLocationModals(prev => ({ ...prev, editOrderModal: true }));
    // Initialize editing orders with current values
    const currentOrders = {
      countries: {},
      languages: {},
      currencies: {}
    };
    locationSettings.countries.forEach(country => {
      currentOrders.countries[country.id] = country.order;
    });
    locationSettings.languages.forEach(language => {
      currentOrders.languages[language.id] = language.order;
    });
    locationSettings.currencies.forEach(currency => {
      currentOrders.currencies[currency.id] = currency.order;
    });
    setEditingOrders(currentOrders);
  };

  const handleCloseEditOrderModal = () => {
    setLocationModals(prev => ({ ...prev, editOrderModal: false }));
    setEditingOrders({ countries: {}, languages: {}, currencies: {} });
    setNewOrderInput('');
  };

  const handleOrderChange = (type, id, newOrder) => {
    setEditingOrders(prev => ({
      ...prev,
      [type]: {
        ...prev[type],
        [id]: parseInt(newOrder) || 1
      }
    }));
  };

  const handleSaveOrders = () => {
    // Update countries
    setLocationSettings(prev => ({
      ...prev,
      countries: prev.countries.map(country => ({
        ...country,
        order: editingOrders.countries[country.id] || country.order
      })).sort((a, b) => a.order - b.order),
      languages: prev.languages.map(language => ({
        ...language,
        order: editingOrders.languages[language.id] || language.order
      })).sort((a, b) => a.order - b.order),
      currencies: prev.currencies.map(currency => ({
        ...currency,
        order: editingOrders.currencies[currency.id] || currency.order
      })).sort((a, b) => a.order - b.order)
    }));
    
    handleCloseEditOrderModal();
    setLocationModals(prev => ({ ...prev, ordersSavedSuccess: true }));
  };

  const handleBulkOrderChange = () => {
    if (!newOrderInput.trim()) return;
    
    const newOrder = parseInt(newOrderInput);
    if (!newOrder || newOrder <= 0) return;
    
    // Find the next available order number
    const allOrders = [
      ...Object.values(editingOrders.countries),
      ...Object.values(editingOrders.languages),
      ...Object.values(editingOrders.currencies)
    ];
    const maxOrder = Math.max(...allOrders, 0);
    
    // You can implement bulk order logic here
    setNewOrderInput('');
  };

  // Auto notification handlers
  const handleOpenAutoNotificationModal = () => {
    setAutoNotificationModals(prev => ({ ...prev, autoNotificationModal: true }));
  };

  const handleCloseAutoNotificationModal = () => {
    setAutoNotificationModals(prev => ({ ...prev, autoNotificationModal: false }));
    setEditingNotificationCondition(null);
    setDeletingNotificationConditionId(null);
    setAutoNotificationSettings(prev => ({ ...prev, criteria: '' }));
  };

  const handleAutoNotificationChange = (field, value) => {
    setAutoNotificationSettings(prev => ({ ...prev, [field]: value }));
  };

  const handleCreateNotificationCondition = () => {
    if (autoNotificationSettings.criteria.trim()) {
      const newCondition = {
        id: Date.now(),
        criteria: autoNotificationSettings.criteria,
        type: 'Price Drop & Restock',
        createdAt: new Date().toLocaleDateString()
      };
      setAutoNotificationSettings(prev => ({
        ...prev,
        conditions: [...prev.conditions, newCondition],
        criteria: ''
      }));
      setAutoNotificationModals(prev => ({ ...prev, conditionCreatedSuccess: true }));
    }
  };

  const handleEditNotificationCondition = (id) => {
    const condition = autoNotificationSettings.conditions.find(c => c.id === id);
    if (condition) {
      setEditingNotificationCondition(condition);
      setAutoNotificationSettings(prev => ({ ...prev, criteria: condition.criteria }));
    }
  };

  const handleSaveEditedNotificationCondition = () => {
    if (editingNotificationCondition && autoNotificationSettings.criteria.trim()) {
      setAutoNotificationSettings(prev => ({
        ...prev,
        conditions: prev.conditions.map(c => 
          c.id === editingNotificationCondition.id 
            ? { ...c, criteria: autoNotificationSettings.criteria }
            : c
        ),
        criteria: ''
      }));
      setEditingNotificationCondition(null);
      setAutoNotificationModals(prev => ({ ...prev, conditionUpdatedSuccess: true }));
    }
  };

  const handleCancelEditNotificationCondition = () => {
    setEditingNotificationCondition(null);
    setAutoNotificationSettings(prev => ({ ...prev, criteria: '' }));
  };

  const handleDeleteNotificationCondition = (id) => {
    setDeletingNotificationConditionId(id);
    setAutoNotificationModals(prev => ({ ...prev, conditionDeleteConfirm: true }));
  };

  const handleConfirmDeleteNotificationCondition = () => {
    if (deletingNotificationConditionId) {
      setAutoNotificationSettings(prev => ({
        ...prev,
        conditions: prev.conditions.filter(c => c.id !== deletingNotificationConditionId)
      }));
      setAutoNotificationModals(prev => ({
        ...prev,
        conditionDeleteConfirm: false,
        conditionDeletedSuccess: true
      }));
      setDeletingNotificationConditionId(null);
    }
  };

  const handleCancelDeleteNotificationCondition = () => {
    setAutoNotificationModals(prev => ({ ...prev, conditionDeleteConfirm: false }));
    setDeletingNotificationConditionId(null);
  };

  // Auto notification success modal handlers
  const handleNotificationConditionCreatedSuccessDone = () => {
    setAutoNotificationModals(prev => ({ ...prev, conditionCreatedSuccess: false }));
  };

  const handleNotificationConditionUpdatedSuccessDone = () => {
    setAutoNotificationModals(prev => ({ ...prev, conditionUpdatedSuccess: false }));
  };

  const handleNotificationConditionDeletedSuccessDone = () => {
    setAutoNotificationModals(prev => ({ ...prev, conditionDeletedSuccess: false }));
  };

  // Dynamic pricing handlers
  const handleOpenDynamicPricingModal = () => {
    setDynamicPricingModals(prev => ({ ...prev, dynamicPricingModal: true }));
  };

  const handleCloseDynamicPricingModal = () => {
    setDynamicPricingModals(prev => ({ ...prev, dynamicPricingModal: false }));
    setEditingDynamicPricingCondition(null);
    setDeletingDynamicPricingConditionId(null);
    // Reset form
    setDynamicPricingForm({
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
    setDynamicPricingSettings(prev => ({ ...prev, criteria: '' }));
  };

  const handleDynamicPricingFormChange = (field, value) => {
    setDynamicPricingForm(prev => ({ ...prev, [field]: value }));
  };

  const handleDynamicPricingCriteriaChange = (value) => {
    setDynamicPricingSettings(prev => ({ ...prev, criteria: value }));
  };

  const handleCreateDynamicPricingCondition = () => {
    const newCondition = { 
      ...dynamicPricingForm, 
      id: Date.now(),
      criteria: dynamicPricingSettings.criteria,
      type: 'Dynamic Pricing',
      createdAt: new Date().toLocaleDateString()
    };
    setDynamicPricingSettings(prev => ({
      ...prev,
      conditions: [...prev.conditions, newCondition],
      criteria: ''
    }));
    // Reset form for next condition
    setDynamicPricingForm({
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
    setDynamicPricingModals(prev => ({ ...prev, conditionCreatedSuccess: true }));
  };

  const handleEditDynamicPricingCondition = (id) => {
    const condition = dynamicPricingSettings.conditions.find(c => c.id === id);
    if (condition) {
      setEditingDynamicPricingCondition(condition);
      setDynamicPricingForm(condition);
      setDynamicPricingSettings(prev => ({ ...prev, criteria: condition.criteria || '' }));
    }
  };

  const handleSaveEditedDynamicPricingCondition = () => {
    if (editingDynamicPricingCondition) {
      setDynamicPricingSettings(prev => ({
        ...prev,
        conditions: prev.conditions.map(c => 
          c.id === editingDynamicPricingCondition.id 
            ? { ...dynamicPricingForm, id: editingDynamicPricingCondition.id, criteria: prev.criteria }
            : c
        ),
        criteria: ''
      }));
      setEditingDynamicPricingCondition(null);
      setDynamicPricingForm({
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
      setDynamicPricingModals(prev => ({ ...prev, conditionUpdatedSuccess: true }));
    }
  };

  const handleCancelEditDynamicPricingCondition = () => {
    setEditingDynamicPricingCondition(null);
    setDynamicPricingForm({
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
    setDynamicPricingSettings(prev => ({ ...prev, criteria: '' }));
  };

  const handleDeleteDynamicPricingCondition = (id) => {
    setDeletingDynamicPricingConditionId(id);
    setDynamicPricingModals(prev => ({ ...prev, conditionDeleteConfirm: true }));
  };

  const handleConfirmDeleteDynamicPricingCondition = () => {
    if (deletingDynamicPricingConditionId) {
      setDynamicPricingSettings(prev => ({
        ...prev,
        conditions: prev.conditions.filter(c => c.id !== deletingDynamicPricingConditionId)
      }));
      setDynamicPricingModals(prev => ({
        ...prev,
        conditionDeleteConfirm: false,
        conditionDeletedSuccess: true
      }));
      setDeletingDynamicPricingConditionId(null);
    }
  };

  const handleCancelDeleteDynamicPricingCondition = () => {
    setDynamicPricingModals(prev => ({ ...prev, conditionDeleteConfirm: false }));
    setDeletingDynamicPricingConditionId(null);
  };

  // Dynamic pricing success modal handlers
  const handleDynamicPricingConditionCreatedSuccessDone = () => {
    setDynamicPricingModals(prev => ({ ...prev, conditionCreatedSuccess: false }));
  };

  const handleDynamicPricingConditionUpdatedSuccessDone = () => {
    setDynamicPricingModals(prev => ({ ...prev, conditionUpdatedSuccess: false }));
  };

  const handleDynamicPricingConditionDeletedSuccessDone = () => {
    setDynamicPricingModals(prev => ({ ...prev, conditionDeletedSuccess: false }));
  };

  // Webhook management handlers
  const handleOpenWebhookModal = () => {
    setWebhookModals(prev => ({ ...prev, webhookModal: true }));
  };

  const handleCloseWebhookModal = () => {
    setWebhookModals(prev => ({ ...prev, webhookModal: false }));
    setEditingWebhook(null);
    setDeletingWebhookId(null);
    // Reset form
    setWebhookForm({
      event: '',
      webhookUrl: '',
      secretKey: ''
    });
  };

  const handleWebhookFormChange = (field, value) => {
    setWebhookForm(prev => ({ ...prev, [field]: value }));
  };

  const handleCreateWebhook = () => {
    const newWebhook = {
      ...webhookForm,
      id: Date.now(),
      status: 'active',
      lastTriggered: null,
      createdAt: new Date().toLocaleDateString(),
      responseSize: '0kb'
    };
    setWebhookSettings(prev => ({
      ...prev,
      webhooks: [...prev.webhooks, newWebhook]
    }));
    // Reset form for next webhook
    setWebhookForm({
      event: '',
      webhookUrl: '',
      secretKey: ''
    });
    // Show success modal
    setWebhookModals(prev => ({ ...prev, webhookCreatedSuccess: true }));
  };

  const handleEditWebhook = (id) => {
    const webhook = webhookSettings.webhooks.find(w => w.id === id);
    if (webhook) {
      setEditingWebhook(webhook);
      setWebhookForm({
        event: webhook.event,
        webhookUrl: webhook.webhookUrl,
        secretKey: webhook.secretKey
      });
    }
  };

  const handleSaveEditedWebhook = () => {
    if (editingWebhook) {
      setWebhookSettings(prev => ({
        ...prev,
        webhooks: prev.webhooks.map(w =>
          w.id === editingWebhook.id
            ? { ...w, ...webhookForm }
            : w
        )
      }));
      setEditingWebhook(null);
      setWebhookForm({
        event: '',
        webhookUrl: '',
        secretKey: ''
      });
      setWebhookModals(prev => ({ ...prev, webhookUpdatedSuccess: true }));
    }
  };

  const handleCancelEditWebhook = () => {
    setEditingWebhook(null);
    setWebhookForm({
      event: '',
      webhookUrl: '',
      secretKey: ''
    });
  };

  const handleDeleteWebhook = (id) => {
    setDeletingWebhookId(id);
    setWebhookModals(prev => ({ ...prev, webhookDeleteConfirm: true }));
  };

  const handleConfirmDeleteWebhook = () => {
    if (deletingWebhookId) {
      setWebhookSettings(prev => ({
        ...prev,
        webhooks: prev.webhooks.filter(w => w.id !== deletingWebhookId)
      }));
      setWebhookModals(prev => ({
        ...prev,
        webhookDeleteConfirm: false,
        webhookDeletedSuccess: true
      }));
      setDeletingWebhookId(null);
    }
  };

  const handleCancelDeleteWebhook = () => {
    setWebhookModals(prev => ({ ...prev, webhookDeleteConfirm: false }));
    setDeletingWebhookId(null);
  };

  const handleToggleApiPermission = (permission) => {
    setWebhookSettings(prev => ({
      ...prev,
      apiPermissions: {
        ...prev.apiPermissions,
        [permission]: !prev.apiPermissions[permission]
      }
    }));
  };

  // Webhook success modal handlers
  const handleWebhookCreatedSuccessDone = () => {
    setWebhookModals(prev => ({ ...prev, webhookCreatedSuccess: false }));
  };

  const handleWebhookUpdatedSuccessDone = () => {
    setWebhookModals(prev => ({ ...prev, webhookUpdatedSuccess: false }));
  };

  const handleWebhookDeletedSuccessDone = () => {
    setWebhookModals(prev => ({ ...prev, webhookDeletedSuccess: false }));
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

  // Filter options based on search term
  const getFilteredOptions = (options, searchTerm) => {
    if (!searchTerm) return options;
    return options.filter(option => 
      option.toLowerCase().includes(searchTerm.toLowerCase())
    );
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

  // Language, Country, Currency Management Component
  const LanguageCountryRegionModal = () => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl shadow-[0px_4px_120px_2px_rgba(0,0,0,0.25)] relative w-full max-w-6xl mx-4 max-h-[90vh] overflow-auto">
        <button 
          onClick={handleCloseLanguageCountryModal}
          className="absolute right-8 top-8 w-6 h-6 text-gray-500 hover:text-gray-700 z-10"
        >
          <svg className="w-full h-full" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        <div className="p-8">
          <h2 className="text-center font-bold text-[24px] mb-8 font-montserrat">Add Country and Language</h2>
          
          {/* Applicable On Section */}
          <div className="mb-8">
            <h3 className="font-bold text-[21px] mb-4 font-montserrat">Applicable On</h3>
            
            {/* Search Input */}
            <div className="mb-6">
              <div className="relative max-w-sm">
                <div className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5">
                  <svg className="w-full h-full text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
                <input
                  type="text"
                  placeholder="Search"
                  value={locationSettings.searchTerm}
                  onChange={(e) => handleLocationSettingChange('searchTerm', e.target.value)}
                  className="w-full pl-12 pr-4 py-3 border border-[#d0d5dd] rounded-lg focus:border-blue-500 focus:outline-none shadow-sm"
                />
              </div>
            </div>

            {/* Dropdown Selectors */}
            <div className="grid grid-cols-3 gap-6 mb-6">
              {/* Country Selector */}
              <div>
                <select
                  value={locationSettings.selectedCountry}
                  onChange={(e) => handleLocationSettingChange('selectedCountry', e.target.value)}
                  className="w-full px-4 py-3 border border-[#979797] rounded-xl focus:border-blue-500 focus:outline-none text-[15px] font-montserrat"
                >
                  <option value="">country</option>
                  {getFilteredOptions(countryOptions, locationSettings.searchTerm).map(country => (
                    <option key={country} value={country}>{country}</option>
                  ))}
                </select>
              </div>

              {/* Language Selector */}
              <div>
                <select
                  value={locationSettings.selectedLanguage}
                  onChange={(e) => handleLocationSettingChange('selectedLanguage', e.target.value)}
                  className="w-full px-4 py-3 border border-[#979797] rounded-xl focus:border-blue-500 focus:outline-none text-[15px] font-montserrat"
                >
                  <option value="">language</option>
                  {getFilteredOptions(languageOptions, locationSettings.searchTerm).map(language => (
                    <option key={language} value={language}>{language}</option>
                  ))}
                </select>
              </div>

              {/* Currency Selector */}
              <div>
                <select
                  value={locationSettings.selectedCurrency}
                  onChange={(e) => handleLocationSettingChange('selectedCurrency', e.target.value)}
                  className="w-full px-4 py-3 border border-[#979797] rounded-xl focus:border-blue-500 focus:outline-none text-[15px] font-montserrat"
                >
                  <option value="">currency</option>
                  {getFilteredOptions(currencyOptions, locationSettings.searchTerm).map(currency => (
                      <option key={currency} value={currency}>{currency}</option>
                    ))
                  }
                </select>
              </div>
            </div>

            {/* Add Buttons */}
            <div className="grid grid-cols-3 gap-6 mb-8">
              <button
                onClick={handleAddCountry}
                disabled={!locationSettings.selectedCountry}
                className="bg-[#202224] text-white px-12 py-3 rounded-full font-medium text-[16px] hover:bg-gray-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed border border-black font-montserrat"
              >
                add country
              </button>
              <button
                onClick={handleAddLanguage}
                disabled={!locationSettings.selectedLanguage}
                className="bg-[#202224] text-white px-12 py-3 rounded-full font-medium text-[16px] hover:bg-gray-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed border border-black font-montserrat"
              >
                add language
              </button>
              <button
                onClick={handleAddCurrency}
                disabled={!locationSettings.selectedCurrency}
                className="bg-[#202224] text-white px-12 py-3 rounded-full font-medium text-[16px] hover:bg-gray-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed border border-black font-montserrat"
              >
                add currency
              </button>
            </div>
          </div>

          {/* Lists Section */}
          <div className="grid grid-cols-3 gap-8">
            {/* Countries List */}
            <div>
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-bold text-[21px] font-montserrat">countries</h3>
                <div className="flex items-center gap-4">
                  <span className="font-bold text-[21px] font-montserrat">Order</span>
                  <span className="font-bold text-[21px] font-montserrat">edit</span>
                </div>
              </div>
              <div className="space-y-2">
                {locationSettings.countries.map((country) => (
                  <div key={country.id} className="flex items-center justify-between p-3 border-2 border-black rounded-xl">
                    <span className="font-medium text-[16px] font-montserrat">{country.name}</span>
                    <div className="flex items-center gap-2">
                      <input
                        type="number"
                        value={country.order}
                        readOnly
                        className="w-12 h-12 text-center border-2 border-black rounded-xl"
                      />
                      <button
                        onClick={() => handleEditCountry(country.id)}
                        className="p-2 hover:bg-gray-100 rounded-lg"
                      >
                        <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                        </svg>
                      </button>
                      <button
                        onClick={() => handleDeleteCountry(country.id)}
                        className="p-2 hover:bg-gray-100 rounded-lg"
                      >
                        <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Languages List */}
            <div>
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-bold text-[21px] font-montserrat">language</h3>
                <div className="flex items-center gap-4">
                  <span className="font-bold text-[21px] font-montserrat">Order</span>
                  <span className="font-bold text-[21px] font-montserrat">edit</span>
                </div>
              </div>
              <div className="space-y-2">
                {locationSettings.languages.map((language) => (
                  <div key={language.id} className="flex items-center justify-between p-3 border-2 border-black rounded-xl">
                    <span className="font-medium text-[16px] font-montserrat">{language.name}</span>
                    <div className="flex items-center gap-2">
                      <input
                        type="number"
                        value={language.order}
                        readOnly
                        className="w-12 h-12 text-center border-2 border-black rounded-xl"
                      />
                      <button
                        onClick={() => handleEditLanguage(language.id)}
                        className="p-2 hover:bg-gray-100 rounded-lg"
                      >
                        <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                        </svg>
                      </button>
                      <button
                        onClick={() => handleDeleteLanguage(language.id)}
                        className="p-2 hover:bg-gray-100 rounded-lg"
                      >
                        <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Currencies List */}
            <div>
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-bold text-[21px] font-montserrat">currency</h3>
                <div className="flex items-center gap-4">
                  <span className="font-bold text-[21px] font-montserrat">Order</span>
                  <span className="font-bold text-[21px] font-montserrat">edit</span>
                </div>
              </div>
              <div className="space-y-2">
                {locationSettings.currencies.map((currency) => (
                  <div key={currency.id} className="flex items-center justify-between p-3 border-2 border-black rounded-xl">
                    <span className="font-medium text-[16px] font-montserrat">{currency.name}</span>
                    <div className="flex items-center gap-2">
                      <input
                        type="number"
                        value={currency.order}
                        readOnly
                        className="w-12 h-12 text-center border-2 border-black rounded-xl"
                      />
                      <button
                        onClick={() => handleEditCurrency(currency.id)}
                        className="p-2 hover:bg-gray-100 rounded-lg"
                      >
                        <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                        </svg>
                      </button>
                      <button
                        onClick={() => handleDeleteCurrency(currency.id)}
                        className="p-2 hover:bg-gray-100 rounded-lg"
                      >
                        <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-end gap-4 mt-8">
            <button
              onClick={handleOpenEditOrderModal}
              className="bg-blue-600 text-white px-6 py-2 rounded-full font-medium hover:bg-blue-700 transition-colors"
            >
              Edit Orders
            </button>
            {editingCountry && (
              <button
                onClick={handleSaveEditedCountry}
                className="bg-green-600 text-white px-6 py-2 rounded-full font-medium hover:bg-green-700 transition-colors"
              >
                Save Country
              </button>
            )}
            {editingLanguage && (
              <button
                onClick={handleSaveEditedLanguage}
                className="bg-green-600 text-white px-6 py-2 rounded-full font-medium hover:bg-green-700 transition-colors"
              >
                Save Language
              </button>
            )}
            {editingCurrency && (
              <button
                onClick={handleSaveEditedCurrency}
                className="bg-green-600 text-white px-6 py-2 rounded-full font-medium hover:bg-green-700 transition-colors"
              >
                Save Currency
              </button>
            )}
            <button
              onClick={handleCloseLanguageCountryModal}
              className="border border-gray-300 text-black px-6 py-2 rounded-full font-medium hover:bg-gray-50 transition-colors"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  // Edit Order Modal Component
  const EditOrderModal = () => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl shadow-[0px_4px_120px_2px_rgba(0,0,0,0.25)] relative w-full max-w-6xl mx-4 max-h-[90vh] overflow-auto">
        <button 
          onClick={handleCloseEditOrderModal}
          className="absolute right-8 top-8 w-6 h-6 text-gray-500 hover:text-gray-700 z-10"
        >
          <svg className="w-full h-full" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        <div className="p-8">
          <h2 className="text-center font-regular text-[24px] mb-8 font-montserrat tracking-[-0.6px]">
            Edit country language region
          </h2>
          
          {/* Three Column Layout for Order Editing */}
          <div className="grid grid-cols-3 gap-8 mb-8">
            {/* Countries Column */}
            <div>
              <div className="mb-4">
                <h3 className="font-bold text-[21px] font-montserrat mb-2">countries</h3>
                <div className="text-center">
                  <span className="font-bold text-[21px] font-montserrat">Order</span>
                </div>
              </div>
              <div className="space-y-3">
                {locationSettings.countries.map((country) => (
                  <div key={country.id} className="flex items-center justify-between">
                    <span className="font-medium text-[16px] font-montserrat flex-1 text-left">{country.name}</span>
                    <input
                      type="number"
                      min="1"
                      value={editingOrders.countries[country.id] || country.order}
                      onChange={(e) => handleOrderChange('countries', country.id, e.target.value)}
                      className="w-16 h-12 text-center border-2 border-black rounded-xl focus:outline-none focus:border-blue-500"
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* Languages Column */}
            <div>
              <div className="mb-4">
                <h3 className="font-bold text-[21px] font-montserrat mb-2">language</h3>
                <div className="text-center">
                  <span className="font-bold text-[21px] font-montserrat">Order</span>
                </div>
              </div>
              <div className="space-y-3">
                {locationSettings.languages.map((language) => (
                  <div key={language.id} className="flex items-center justify-between">
                    <span className="font-medium text-[16px] font-montserrat flex-1 text-left">{language.name}</span>
                    <input
                      type="number"
                      min="1"
                      value={editingOrders.languages[language.id] || language.order}
                      onChange={(e) => handleOrderChange('languages', language.id, e.target.value)}
                      className="w-16 h-12 text-center border-2 border-black rounded-xl focus:outline-none focus:border-blue-500"
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* Currencies Column */}
            <div>
              <div className="mb-4">
                <h3 className="font-bold text-[21px] font-montserrat mb-2">currency</h3>
                <div className="text-center">
                  <span className="font-bold text-[21px] font-montserrat">Order</span>
                </div>
              </div>
              <div className="space-y-3">
                {locationSettings.currencies.map((currency) => (
                  <div key={currency.id} className="flex items-center justify-between">
                    <span className="font-medium text-[16px] font-montserrat flex-1 text-left">{currency.name}</span>
                    <input
                      type="number"
                      min="1"
                      value={editingOrders.currencies[currency.id] || currency.order}
                      onChange={(e) => handleOrderChange('currencies', currency.id, e.target.value)}
                      className="w-16 h-12 text-center border-2 border-black rounded-xl focus:outline-none focus:border-blue-500"
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Bulk Order Input Section */}
          <div className="mb-8">
            <h3 className="text-center font-regular text-[24px] mb-4 font-montserrat tracking-[-0.6px]">
              type new order
            </h3>
            <div className="flex justify-center">
              <input
                type="number"
                min="1"
                value={newOrderInput}
                onChange={(e) => setNewOrderInput(e.target.value)}
                placeholder="Enter new order number"
                className="w-80 h-12 px-4 text-center border-2 border-black rounded-xl focus:outline-none focus:border-blue-500 font-montserrat"
              />
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-center gap-6">
            <button
              onClick={handleSaveOrders}
              className="bg-black text-white px-12 py-4 rounded-full font-medium text-[16px] hover:bg-gray-800 transition-colors border border-black font-montserrat"
            >
              save
            </button>
            <button
              onClick={handleCloseEditOrderModal}
              className="border border-[#e4e4e4] text-black px-12 py-4 rounded-full font-medium text-[16px] hover:bg-gray-50 transition-colors font-montserrat"
            >
              go back
            </button>
          </div>
        </div>
      </div>
    </div>
  );

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
        
        {/* Language, Country & Region Setting */}
        <div className="py-6">
          <h3 className="font-bold text-[#000000] text-[20px] font-montserrat mb-4">
            Add Language, Country and Region
          </h3>
          <ViewSettingsButton onClick={handleOpenLanguageCountryModal} />
        </div>

        {/* Auto Notify Customers Setting */}
        <div className="py-6">
          <h3 className="font-bold text-[#000000] text-[20px] font-montserrat mb-4">
            Auto notify customers about price drops or restock
          </h3>
          <ViewSettingsButton onClick={handleOpenAutoNotificationModal} />
        </div>

        {/* Dynamic Pricing Setting */}
        <div className="py-6">
          <h3 className="font-bold text-[#000000] text-[20px] font-montserrat mb-4">
            Automatically change prices based on demand, time, user segment
          </h3>
          <ViewSettingsButton onClick={handleOpenDynamicPricingModal} />
        </div>
        
        {/* Webhooks for order/payment updates */}
        <div className="py-6">
          <h3 className="font-bold text-[#000000] text-[24px] font-montserrat mb-6">
            Webhooks for order/payment updates
          </h3>
          <ViewSettingsButton onClick={handleOpenWebhookModal} />
          
          {/* Webhook Management Content */}
          {webhookSettings.webhooks.length > 0 && (
            <div className="mt-6 space-y-4">
              <div className="bg-gray-50 rounded-lg p-4">
                <h4 className="font-bold text-[#111111] text-[18px] mb-4">Active Webhooks</h4>
                <div className="space-y-3">
                  {webhookSettings.webhooks.map((webhook) => (
                    <div key={webhook.id} className="bg-white rounded-lg p-4 border border-gray-200">
                      <div className="flex justify-between items-start">
                        <div className="flex-1">
                          <div className="grid grid-cols-4 gap-4 text-sm">
                            <div>
                              <span className="font-semibold text-gray-600">Event:</span>
                              <p className="text-gray-800">{webhook.event}</p>
                            </div>
                            <div>
                              <span className="font-semibold text-gray-600">URL:</span>
                              <p className="text-gray-800 truncate">{webhook.webhookUrl}</p>
                            </div>
                            <div>
                              <span className="font-semibold text-gray-600">Last Triggered:</span>
                              <p className="text-gray-800">{webhook.lastTriggered || 'Never'}</p>
                            </div>
                            <div>
                              <span className="font-semibold text-gray-600">Status:</span>
                              <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                                webhook.status === 'active' 
                                  ? 'bg-green-100 text-green-800' 
                                  : 'bg-red-100 text-red-800'
                              }`}>
                                {webhook.status}
                              </span>
                            </div>
                          </div>
                        </div>
                        <div className="flex gap-2 ml-4">
                          <button
                            onClick={() => handleEditWebhook(webhook.id)}
                            className="text-blue-600 hover:text-blue-800 text-sm font-medium"
                          >
                            Edit
                          </button>
                          <button
                            onClick={() => handleDeleteWebhook(webhook.id)}
                            className="text-red-600 hover:text-red-800 text-sm font-medium"
                          >
                            Delete
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
        
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

      {/* Language, Country, Region Modal */}
      {locationModals.languageCountryModal && <LanguageCountryRegionModal />}

      {/* Edit Order Modal */}
      {locationModals.editOrderModal && <EditOrderModal />}

      {/* Auto Notification Modal */}
      {autoNotificationModals.autoNotificationModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-[0px_4px_120px_2px_rgba(0,0,0,0.25)] relative w-full max-w-4xl mx-4 max-h-[90vh] overflow-auto">
            <button 
              onClick={handleCloseAutoNotificationModal}
              className="absolute right-8 top-8 w-6 h-6 text-gray-500 hover:text-gray-700 z-10"
            >
              <svg className="w-full h-full" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            <div className="p-8">
              <h2 className="text-center font-bold text-black text-[24px] mb-8 font-montserrat">
                Auto notify customers about price drops or restock
              </h2>

              {/* Edit Condition View */}
              {editingNotificationCondition && (
                <div className="mb-8 p-6 border border-gray-200 rounded-xl bg-gray-50">
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-center font-normal text-black text-[24px] font-montserrat tracking-[-0.6px]">
                      Edit condition
                    </h3>
                    <button 
                      onClick={handleCancelEditNotificationCondition}
                      className="w-6 h-6 text-gray-500 hover:text-gray-700"
                    >
                      <svg className="w-full h-full" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </div>

                  <div className="mb-6">
                    <label className="block font-medium text-[#111111] text-[21px] font-montserrat mb-2">
                      Discount is increased by
                    </label>
                    <input
                      type="text"
                      value={autoNotificationSettings.criteria}
                      onChange={(e) => handleAutoNotificationChange('criteria', e.target.value)}
                      className="w-full px-4 py-3 border-2 border-black rounded-xl text-[16px] font-montserrat focus:outline-none focus:border-blue-500"
                      placeholder="Enter notification criteria..."
                    />
                  </div>

                  <div className="flex gap-4 justify-center">
                    <button
                      onClick={handleSaveEditedNotificationCondition}
                      className="bg-black text-white px-16 py-4 rounded-full font-medium text-[16px] font-montserrat border border-black hover:bg-gray-800 transition-colors"
                    >
                      save
                    </button>
                    <button
                      onClick={handleCancelEditNotificationCondition}
                      className="border border-[#e4e4e4] text-black px-16 py-4 rounded-full font-medium text-[16px] font-montserrat hover:bg-gray-50 transition-colors"
                    >
                      go back
                    </button>
                  </div>
                </div>
              )}

              {/* Create New Condition Form - only show when not editing */}
              {!editingNotificationCondition && (
                <>
                  {/* Criteria Section */}
                  <div className="mb-8">
                    <h3 className="font-bold text-[#111111] text-[24px] font-montserrat mb-6 text-center">criteria</h3>
                    
                    <div className="mb-6">
                      <label className="block font-medium text-[#111111] text-[21px] font-montserrat mb-4">
                        Discount is increased by
                      </label>
                      <input
                        type="text"
                        value={autoNotificationSettings.criteria}
                        onChange={(e) => handleAutoNotificationChange('criteria', e.target.value)}
                        className="w-full px-4 py-3 border-2 border-black rounded-xl text-[16px] font-montserrat focus:outline-none focus:border-blue-500 max-w-md"
                        placeholder="Enter criteria..."
                      />
                    </div>

                    <div className="flex justify-center">
                      <button
                        onClick={handleCreateNotificationCondition}
                        className="bg-[#202224] text-white px-12 py-4 rounded-full font-medium text-[16px] font-montserrat hover:bg-gray-800 transition-colors border border-black"
                      >
                        Create condition
                      </button>
                    </div>
                  </div>

                  {/* Active Conditions Section */}
                  <div className="mb-8">
                    <h3 className="font-bold text-[#111111] text-[24px] font-montserrat mb-6 text-center">active condition</h3>
                    
                    {autoNotificationSettings.conditions.length === 0 ? (
                      <div className="text-center text-gray-500 py-8">
                        <p className="font-montserrat text-[16px]">No active conditions yet</p>
                        <p className="font-montserrat text-[14px] text-gray-400 mt-2">Create your first notification condition above</p>
                      </div>
                    ) : (
                      <div className="space-y-4">
                        {autoNotificationSettings.conditions.map((condition) => (
                          <div key={condition.id} className="bg-gray-50 p-4 rounded-xl border border-gray-200">
                            <div className="flex items-center justify-between">
                              <div className="flex-1">
                                <h4 className="font-semibold text-[18px] font-montserrat text-black">{condition.type}</h4>
                                <p className="font-medium text-[16px] font-montserrat text-gray-700 mt-1">{condition.criteria}</p>
                                <p className="font-normal text-[14px] font-montserrat text-gray-500 mt-2">Created: {condition.createdAt}</p>
                              </div>
                              <div className="flex items-center gap-2 ml-4">
                                <button
                                  onClick={() => handleEditNotificationCondition(condition.id)}
                                  className="p-2 hover:bg-gray-200 rounded-lg transition-colors"
                                  title="Edit condition"
                                >
                                  <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                  </svg>
                                </button>
                                <button
                                  onClick={() => handleDeleteNotificationCondition(condition.id)}
                                  className="p-2 hover:bg-gray-200 rounded-lg transition-colors"
                                  title="Delete condition"
                                >
                                  <svg className="w-5 h-5 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                  </svg>
                                </button>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </>
              )}

              {/* Close Button */}
              <div className="flex justify-center">
                <button
                  onClick={handleCloseAutoNotificationModal}
                  className="border border-[#e4e4e4] text-black px-12 py-3 rounded-full font-medium text-[16px] font-montserrat hover:bg-gray-50 transition-colors"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Dynamic Pricing Modal */}
      {dynamicPricingModals.dynamicPricingModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-[0px_4px_120px_2px_rgba(0,0,0,0.25)] relative w-full max-w-6xl mx-4 max-h-[90vh] overflow-auto">
            <button 
              onClick={handleCloseDynamicPricingModal}
              className="absolute right-8 top-8 w-6 h-6 text-gray-500 hover:text-gray-700 z-10"
            >
              <svg className="w-full h-full" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            <div className="p-8">
              <h2 className="text-center font-bold text-black text-[24px] mb-8 font-montserrat">
                Automatically change prices based on demand, time, user segment
              </h2>

              {/* Edit Condition View */}
              {editingDynamicPricingCondition && (
                <div className="mb-8 p-6 border border-gray-200 rounded-xl bg-gray-50">
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-center font-normal text-black text-[24px] font-montserrat tracking-[-0.6px]">
                      Edit pricing condition
                    </h3>
                    <button 
                      onClick={handleCancelEditDynamicPricingCondition}
                      className="w-6 h-6 text-gray-500 hover:text-gray-700"
                    >
                      <svg className="w-full h-full" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </div>

                  {/* Edit Form Fields */}
                  <div className="grid grid-cols-4 gap-4 mb-6">
                    <div>
                      <label className="block font-medium text-[#111111] text-[15px] font-montserrat mb-2">Category</label>
                      <select
                        value={dynamicPricingForm.category}
                        onChange={(e) => handleDynamicPricingFormChange('category', e.target.value)}
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
                      <label className="block font-medium text-[#111111] text-[15px] font-montserrat mb-2">Sub Category</label>
                      <select
                        value={dynamicPricingForm.subCategory}
                        onChange={(e) => handleDynamicPricingFormChange('subCategory', e.target.value)}
                        className="w-full px-4 py-3 border border-[#979797] rounded-xl text-[15px] font-montserrat focus:outline-none focus:border-blue-500"
                      >
                        <option value="">sub category</option>
                        <option value="smartphones">Smartphones</option>
                        <option value="laptops">Laptops</option>
                        <option value="tablets">Tablets</option>
                      </select>
                    </div>
                    <div>
                      <label className="block font-medium text-[#111111] text-[15px] font-montserrat mb-2">Items</label>
                      <select
                        value={dynamicPricingForm.items}
                        onChange={(e) => handleDynamicPricingFormChange('items', e.target.value)}
                        className="w-full px-4 py-3 border border-[#979797] rounded-xl text-[15px] font-montserrat focus:outline-none focus:border-blue-500"
                      >
                        <option value="">Items</option>
                        <option value="all">All Items</option>
                        <option value="popular">Popular Items</option>
                        <option value="new">New Items</option>
                      </select>
                    </div>
                    <div>
                      <label className="block font-medium text-[#111111] text-[15px] font-montserrat mb-2">Specified</label>
                      <select
                        value={dynamicPricingForm.specified}
                        onChange={(e) => handleDynamicPricingFormChange('specified', e.target.value)}
                        className="w-full px-4 py-3 border border-[#979797] rounded-xl text-[15px] font-montserrat focus:outline-none focus:border-blue-500"
                      >
                        <option value="">specified</option>
                        <option value="high-demand">High Demand</option>
                        <option value="low-demand">Low Demand</option>
                        <option value="peak-hours">Peak Hours</option>
                        <option value="off-hours">Off Hours</option>
                      </select>
                    </div>
                  </div>

                  <div className="mb-6">
                    <label className="block font-medium text-[#111111] text-[21px] font-montserrat mb-2">
                      give criteria
                    </label>
                    <input
                      type="text"
                      value={dynamicPricingSettings.criteria}
                      onChange={(e) => handleDynamicPricingCriteriaChange(e.target.value)}
                      className="w-full px-4 py-3 border-2 border-black rounded-xl text-[16px] font-montserrat focus:outline-none focus:border-blue-500"
                      placeholder="Enter pricing criteria..."
                    />
                  </div>

                  <div className="grid grid-cols-3 gap-4 mb-6">
                    <div>
                      <label className="block font-medium text-[#111111] text-[21px] font-montserrat mb-2">Discount Type</label>
                      <input
                        type="text"
                        value={dynamicPricingForm.discountType}
                        onChange={(e) => handleDynamicPricingFormChange('discountType', e.target.value)}
                        className="w-full px-4 py-3 border-2 border-black rounded-xl text-[16px] font-montserrat focus:outline-none focus:border-blue-500"
                        placeholder="Enter discount type"
                      />
                    </div>
                    <div>
                      <label className="block font-medium text-[#111111] text-[21px] font-montserrat mb-2">minimum order value</label>
                      <input
                        type="text"
                        value={dynamicPricingForm.minimumOrderValue}
                        onChange={(e) => handleDynamicPricingFormChange('minimumOrderValue', e.target.value)}
                        className="w-full px-4 py-3 border-2 border-black rounded-xl text-[16px] font-montserrat focus:outline-none focus:border-blue-500"
                        placeholder="Minimum order value"
                      />
                    </div>
                    <div>
                      <label className="block font-medium text-[#111111] text-[21px] font-montserrat mb-2">max users</label>
                      <input
                        type="text"
                        value={dynamicPricingForm.maxUsers}
                        onChange={(e) => handleDynamicPricingFormChange('maxUsers', e.target.value)}
                        className="w-full px-4 py-3 border-2 border-black rounded-xl text-[16px] font-montserrat focus:outline-none focus:border-blue-500"
                        placeholder="Max users"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4 mb-6">
                    <div>
                      <label className="block font-medium text-[#111111] text-[21px] font-montserrat mb-2">Start date</label>
                      <div className="relative">
                        <input
                          type="date"
                          value={dynamicPricingForm.startDate}
                          onChange={(e) => handleDynamicPricingFormChange('startDate', e.target.value)}
                          className="w-full px-4 py-3 border-2 border-black rounded-xl text-[16px] font-montserrat focus:outline-none focus:border-blue-500 pr-12"
                        />
                        <svg className="absolute right-4 top-1/2 transform -translate-y-1/2 w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                      </div>
                    </div>
                    <div>
                      <label className="block font-medium text-[#111111] text-[21px] font-montserrat mb-2">End date</label>
                      <div className="relative">
                        <input
                          type="date"
                          value={dynamicPricingForm.endDate}
                          onChange={(e) => handleDynamicPricingFormChange('endDate', e.target.value)}
                          className="w-full px-4 py-3 border-2 border-black rounded-xl text-[16px] font-montserrat focus:outline-none focus:border-blue-500 pr-12"
                        />
                        <svg className="absolute right-4 top-1/2 transform -translate-y-1/2 w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                      </div>
                    </div>
                  </div>

                  <div className="flex gap-4 justify-center">
                    <button
                      onClick={handleSaveEditedDynamicPricingCondition}
                      className="bg-black text-white px-16 py-4 rounded-full font-medium text-[16px] font-montserrat border border-black hover:bg-gray-800 transition-colors"
                    >
                      save
                    </button>
                    <button
                      onClick={handleCancelEditDynamicPricingCondition}
                      className="border border-[#e4e4e4] text-black px-16 py-4 rounded-full font-medium text-[16px] font-montserrat hover:bg-gray-50 transition-colors"
                    >
                      go back
                    </button>
                  </div>
                </div>
              )}

              {/* Create New Condition Form - only show when not editing */}
              {!editingDynamicPricingCondition && (
                <>
                  {/* Applicable On Section */}
                  <div className="mb-8">
                    <h3 className="font-bold text-[#111111] text-[21px] font-montserrat mb-6">applicable on</h3>
                    
                    <div className="grid grid-cols-4 gap-4 mb-6">
                      <div>
                        <select
                          value={dynamicPricingForm.category}
                          onChange={(e) => handleDynamicPricingFormChange('category', e.target.value)}
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
                          value={dynamicPricingForm.subCategory}
                          onChange={(e) => handleDynamicPricingFormChange('subCategory', e.target.value)}
                          className="w-full px-4 py-3 border border-[#979797] rounded-xl text-[15px] font-montserrat focus:outline-none focus:border-blue-500"
                        >
                          <option value="">sub category</option>
                          <option value="smartphones">Smartphones</option>
                          <option value="laptops">Laptops</option>
                          <option value="tablets">Tablets</option>
                        </select>
                      </div>
                      <div>
                        <select
                          value={dynamicPricingForm.items}
                          onChange={(e) => handleDynamicPricingFormChange('items', e.target.value)}
                          className="w-full px-4 py-3 border border-[#979797] rounded-xl text-[15px] font-montserrat focus:outline-none focus:border-blue-500"
                        >
                          <option value="">Items</option>
                          <option value="all">All Items</option>
                          <option value="popular">Popular Items</option>
                          <option value="new">New Items</option>
                        </select>
                      </div>
                      <div>
                        <select
                          value={dynamicPricingForm.specified}
                          onChange={(e) => handleDynamicPricingFormChange('specified', e.target.value)}
                          className="w-full px-4 py-3 border border-[#979797] rounded-xl text-[15px] font-montserrat focus:outline-none focus:border-blue-500"
                        >
                          <option value="">specified</option>
                          <option value="high-demand">High Demand</option>
                          <option value="low-demand">Low Demand</option>
                          <option value="peak-hours">Peak Hours</option>
                          <option value="off-hours">Off Hours</option>
                        </select>
                      </div>
                    </div>

                    <div className="mb-6">
                      <input
                        type="text"
                        value={dynamicPricingSettings.criteria}
                        onChange={(e) => handleDynamicPricingCriteriaChange(e.target.value)}
                        className="w-full px-4 py-3 border-2 border-black rounded-xl text-[16px] font-montserrat focus:outline-none focus:border-blue-500 max-w-md"
                        placeholder="give criteria"
                      />
                    </div>

                    <div className="grid grid-cols-3 gap-4 mb-6">
                      <div>
                        <label className="block font-medium text-[#111111] text-[21px] font-montserrat mb-2 text-left">Discount Type</label>
                        <input
                          type="text"
                          value={dynamicPricingForm.discountType}
                          onChange={(e) => handleDynamicPricingFormChange('discountType', e.target.value)}
                          className="w-full px-4 py-3 border-2 border-black rounded-xl text-[16px] font-montserrat focus:outline-none focus:border-blue-500"
                          placeholder="Enter discount type"
                        />
                      </div>
                      <div>
                        <label className="block font-medium text-[#111111] text-[21px] font-montserrat mb-2 text-left">minimum order value</label>
                        <input
                          type="text"
                          value={dynamicPricingForm.minimumOrderValue}
                          onChange={(e) => handleDynamicPricingFormChange('minimumOrderValue', e.target.value)}
                          className="w-full px-4 py-3 border-2 border-black rounded-xl text-[16px] font-montserrat focus:outline-none focus:border-blue-500"
                          placeholder="Minimum order value"
                        />
                      </div>
                      <div>
                        <label className="block font-medium text-[#111111] text-[21px] font-montserrat mb-2 text-left">max users</label>
                        <input
                          type="text"
                          value={dynamicPricingForm.maxUsers}
                          onChange={(e) => handleDynamicPricingFormChange('maxUsers', e.target.value)}
                          className="w-full px-4 py-3 border-2 border-black rounded-xl text-[16px] font-montserrat focus:outline-none focus:border-blue-500"
                          placeholder="Max users"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4 mb-6">
                      <div>
                        <label className="block font-medium text-[#111111] text-[21px] font-montserrat mb-2 text-left">Start date</label>
                        <div className="relative">
                          <input
                            type="date"
                            value={dynamicPricingForm.startDate}
                            onChange={(e) => handleDynamicPricingFormChange('startDate', e.target.value)}
                            className="w-full px-4 py-3 border-2 border-black rounded-xl text-[16px] font-montserrat focus:outline-none focus:border-blue-500 pr-12"
                          />
                          <svg className="absolute right-4 top-1/2 transform -translate-y-1/2 w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                          </svg>
                        </div>
                      </div>
                      <div>
                        <label className="block font-medium text-[#111111] text-[21px] font-montserrat mb-2 text-left">End date</label>
                        <div className="relative">
                          <input
                            type="date"
                            value={dynamicPricingForm.endDate}
                            onChange={(e) => handleDynamicPricingFormChange('endDate', e.target.value)}
                            className="w-full px-4 py-3 border-2 border-black rounded-xl text-[16px] font-montserrat focus:outline-none focus:border-blue-500 pr-12"
                          />
                          <svg className="absolute right-4 top-1/2 transform -translate-y-1/2 w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                          </svg>
                        </div>
                      </div>
                    </div>

                    <div className="flex justify-center">
                      <button
                        onClick={handleCreateDynamicPricingCondition}
                        className="bg-[#202224] text-white px-12 py-4 rounded-full font-medium text-[16px] font-montserrat hover:bg-gray-800 transition-colors border border-black"
                      >
                        Create condition
                      </button>
                    </div>
                  </div>

                  {/* Active Conditions Section */}
                  <div className="mb-8">
                    <h3 className="font-bold text-[#111111] text-[21px] font-montserrat mb-6">conditions</h3>
                    
                    {dynamicPricingSettings.conditions.length === 0 ? (
                      <div className="text-center text-gray-500 py-8">
                        <p className="font-montserrat text-[16px]">No pricing conditions yet</p>
                        <p className="font-montserrat text-[14px] text-gray-400 mt-2">Create your first dynamic pricing condition above</p>
                      </div>
                    ) : (
                      <div className="space-y-4">
                        {dynamicPricingSettings.conditions.map((condition) => (
                          <div key={condition.id} className="bg-gray-50 p-4 rounded-xl border border-gray-200">
                            <div className="grid grid-cols-6 gap-4 items-center">
                              <div className="text-center">
                                <p className="font-medium text-[21px] font-montserrat text-black">{condition.discountType || 'Discount Type'}</p>
                              </div>
                              <div className="text-center">
                                <p className="font-medium text-[21px] font-montserrat text-black">{condition.startDate || 'Start date'}</p>
                                <svg className="w-6 h-6 text-gray-400 mx-auto mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                </svg>
                              </div>
                              <div className="text-center">
                                <p className="font-medium text-[21px] font-montserrat text-black">{condition.endDate || 'End date'}</p>
                                <svg className="w-6 h-6 text-gray-400 mx-auto mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                </svg>
                              </div>
                              <div className="text-center">
                                <p className="font-medium text-[21px] font-montserrat text-black">{condition.minimumOrderValue || 'minimum order value'}</p>
                              </div>
                              <div className="text-center">
                                <p className="font-medium text-[21px] font-montserrat text-black">{condition.maxUsers || 'max users'}</p>
                              </div>
                              <div className="flex items-center justify-center gap-2">
                                <button
                                  onClick={() => handleEditDynamicPricingCondition(condition.id)}
                                  className="p-2 hover:bg-gray-200 rounded-lg transition-colors"
                                  title="Edit condition"
                                >
                                  <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                  </svg>
                                </button>
                                <button
                                  onClick={() => handleDeleteDynamicPricingCondition(condition.id)}
                                  className="p-2 hover:bg-gray-200 rounded-lg transition-colors"
                                  title="Delete condition"
                                >
                                  <svg className="w-5 h-5 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                  </svg>
                                </button>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </>
              )}

              {/* Close Button */}
              <div className="flex justify-center">
                <button
                  onClick={handleCloseDynamicPricingModal}
                  className="border border-[#e4e4e4] text-black px-12 py-3 rounded-full font-medium text-[16px] font-montserrat hover:bg-gray-50 transition-colors"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Location Success Modals */}
      {locationModals.countryCreatedSuccess && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-lg p-8 text-center max-w-md mx-4">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h3 className="font-bold text-lg mb-2">Country Added Successfully</h3>
            <p className="text-gray-600 mb-6">The country has been added to your settings.</p>
            <button
              onClick={() => handleLocationSuccessDone('country')}
              className="bg-black text-white px-6 py-2 rounded-full font-medium hover:bg-gray-800 transition-colors"
            >
              Done
            </button>
          </div>
        </div>
      )}

      {locationModals.languageCreatedSuccess && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-lg p-8 text-center max-w-md mx-4">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h3 className="font-bold text-lg mb-2">Language Added Successfully</h3>
            <p className="text-gray-600 mb-6">The language has been added to your settings.</p>
            <button
              onClick={() => handleLocationSuccessDone('language')}
              className="bg-black text-white px-6 py-2 rounded-full font-medium hover:bg-gray-800 transition-colors"
            >
              Done
            </button>
          </div>
        </div>
      )}

      {locationModals.currencyCreatedSuccess && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-lg p-8 text-center max-w-md mx-4">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h3 className="font-bold text-lg mb-2">Currency Added Successfully</h3>
            <p className="text-gray-600 mb-6">The currency has been added to your settings.</p>
            <button
              onClick={() => handleLocationSuccessDone('currency')}
              className="bg-black text-white px-6 py-2 rounded-full font-medium hover:bg-gray-800 transition-colors"
            >
              Done
            </button>
          </div>
        </div>
      )}

      {/* Orders Saved Success Modal */}
      {locationModals.ordersSavedSuccess && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-lg p-8 text-center max-w-md mx-4">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h3 className="font-bold text-lg mb-2">Orders Updated Successfully</h3>
            <p className="text-gray-600 mb-6">The order sequence has been updated for all items.</p>
            <button
              onClick={() => setLocationModals(prev => ({ ...prev, ordersSavedSuccess: false }))}
              className="bg-black text-white px-6 py-2 rounded-full font-medium hover:bg-gray-800 transition-colors"
            >
              Done
            </button>
          </div>
        </div>
      )}

      {/* Auto Notification Success Modals */}
      {autoNotificationModals.conditionCreatedSuccess && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-[0px_4px_120px_2px_rgba(0,0,0,0.25)] relative w-full max-w-md mx-4 overflow-clip">
            <button 
              onClick={handleNotificationConditionCreatedSuccessDone}
              className="absolute right-[33px] top-[33px] w-6 h-6 text-gray-500 hover:text-gray-700"
            >
              <svg className="w-full h-full" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            <div className="p-8 text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h3 className="font-bold text-black text-[18px] mb-2 font-montserrat">
                Notification condition created successfully!
              </h3>
              <p className="text-gray-600 mb-6">The auto notification condition has been added.</p>
              <button
                onClick={handleNotificationConditionCreatedSuccessDone}
                className="bg-black text-white px-16 py-3 rounded-full font-medium text-[16px] font-montserrat hover:bg-gray-800 transition-colors"
              >
                Done
              </button>
            </div>
          </div>
        </div>
      )}

      {autoNotificationModals.conditionUpdatedSuccess && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-[0px_4px_120px_2px_rgba(0,0,0,0.25)] relative w-full max-w-md mx-4 overflow-clip">
            <button 
              onClick={handleNotificationConditionUpdatedSuccessDone}
              className="absolute right-[33px] top-[33px] w-6 h-6 text-gray-500 hover:text-gray-700"
            >
              <svg className="w-full h-full" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            <div className="p-8 text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                </svg>
              </div>
              <h3 className="font-bold text-black text-[18px] mb-2 font-montserrat">
                Notification condition updated successfully!
              </h3>
              <p className="text-gray-600 mb-6">The auto notification condition has been updated.</p>
              <button
                onClick={handleNotificationConditionUpdatedSuccessDone}
                className="bg-black text-white px-16 py-3 rounded-full font-medium text-[16px] font-montserrat hover:bg-gray-800 transition-colors"
              >
                Done
              </button>
            </div>
          </div>
        </div>
      )}

      {autoNotificationModals.conditionDeletedSuccess && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-[0px_4px_120px_2px_rgba(0,0,0,0.25)] relative w-full max-w-md mx-4 overflow-clip">
            <button 
              onClick={handleNotificationConditionDeletedSuccessDone}
              className="absolute right-[33px] top-[33px] w-6 h-6 text-gray-500 hover:text-gray-700"
            >
              <svg className="w-full h-full" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            <div className="p-8 text-center">
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
              </div>
              <h3 className="font-bold text-black text-[18px] mb-2 font-montserrat">
                Notification condition deleted successfully!
              </h3>
              <p className="text-gray-600 mb-6">The auto notification condition has been removed.</p>
              <button
                onClick={handleNotificationConditionDeletedSuccessDone}
                className="bg-black text-white px-16 py-3 rounded-full font-medium text-[16px] font-montserrat hover:bg-gray-800 transition-colors"
              >
                Done
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Auto Notification Delete Confirmation Modal */}
      {autoNotificationModals.conditionDeleteConfirm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-[0px_4px_120px_2px_rgba(0,0,0,0.25)] relative w-full max-w-md mx-4 overflow-clip">
            <button 
              onClick={handleCancelDeleteNotificationCondition}
              className="absolute right-[33px] top-[33px] w-6 h-6 text-gray-500 hover:text-gray-700"
            >
              <svg className="w-full h-full" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            <div className="p-8 text-center">
              <h3 className="font-bold text-black text-[18px] mb-6 font-montserrat">
                Are you sure you want to delete this notification condition?
              </h3>
              <div className="flex gap-4 justify-center">
                <button
                  onClick={handleConfirmDeleteNotificationCondition}
                  className="bg-black text-white px-8 py-3 rounded-full font-medium text-[16px] font-montserrat hover:bg-gray-800 transition-colors"
                >
                  yes
                </button>
                <button
                  onClick={handleCancelDeleteNotificationCondition}
                  className="border border-[#e4e4e4] text-black px-8 py-3 rounded-full font-medium text-[16px] font-montserrat hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Dynamic Pricing Success Modals */}
      {dynamicPricingModals.conditionCreatedSuccess && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-[0px_4px_120px_2px_rgba(0,0,0,0.25)] relative w-full max-w-md mx-4 overflow-clip">
            <button 
              onClick={handleDynamicPricingConditionCreatedSuccessDone}
              className="absolute right-[33px] top-[33px] w-6 h-6 text-gray-500 hover:text-gray-700"
            >
              <svg className="w-full h-full" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            <div className="p-8 text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h3 className="font-bold text-black text-[18px] mb-2 font-montserrat">
                Dynamic pricing condition created successfully!
              </h3>
              <p className="text-gray-600 mb-6">The pricing condition has been added to your settings.</p>
              <button
                onClick={handleDynamicPricingConditionCreatedSuccessDone}
                className="bg-black text-white px-16 py-3 rounded-full font-medium text-[16px] font-montserrat hover:bg-gray-800 transition-colors"
              >
                Done
              </button>
            </div>
          </div>
        </div>
      )}

      {dynamicPricingModals.conditionUpdatedSuccess && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-[0px_4px_120px_2px_rgba(0,0,0,0.25)] relative w-full max-w-md mx-4 overflow-clip">
            <button 
              onClick={handleDynamicPricingConditionUpdatedSuccessDone}
              className="absolute right-[33px] top-[33px] w-6 h-6 text-gray-500 hover:text-gray-700"
            >
              <svg className="w-full h-full" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            <div className="p-8 text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                </svg>
              </div>
              <h3 className="font-bold text-black text-[18px] mb-2 font-montserrat">
                Dynamic pricing condition updated successfully!
              </h3>
              <p className="text-gray-600 mb-6">The pricing condition has been updated.</p>
              <button
                onClick={handleDynamicPricingConditionUpdatedSuccessDone}
                className="bg-black text-white px-16 py-3 rounded-full font-medium text-[16px] font-montserrat hover:bg-gray-800 transition-colors"
              >
                Done
              </button>
            </div>
          </div>
        </div>
      )}

      {dynamicPricingModals.conditionDeletedSuccess && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-[0px_4px_120px_2px_rgba(0,0,0,0.25)] relative w-full max-w-md mx-4 overflow-clip">
            <button 
              onClick={handleDynamicPricingConditionDeletedSuccessDone}
              className="absolute right-[33px] top-[33px] w-6 h-6 text-gray-500 hover:text-gray-700"
            >
              <svg className="w-full h-full" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            <div className="p-8 text-center">
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
              </div>
              <h3 className="font-bold text-black text-[18px] mb-2 font-montserrat">
                Dynamic pricing condition deleted successfully!
              </h3>
              <p className="text-gray-600 mb-6">The pricing condition has been removed from your settings.</p>
              <button
                onClick={handleDynamicPricingConditionDeletedSuccessDone}
                className="bg-black text-white px-16 py-3 rounded-full font-medium text-[16px] font-montserrat hover:bg-gray-800 transition-colors"
              >
                Done
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Dynamic Pricing Delete Confirmation Modal */}
      {dynamicPricingModals.conditionDeleteConfirm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-[0px_4px_120px_2px_rgba(0,0,0,0.25)] relative w-full max-w-md mx-4 overflow-clip">
            <button 
              onClick={handleCancelDeleteDynamicPricingCondition}
              className="absolute right-[33px] top-[33px] w-6 h-6 text-gray-500 hover:text-gray-700"
            >
              <svg className="w-full h-full" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            <div className="p-8 text-center">
              <h3 className="font-bold text-black text-[18px] mb-6 font-montserrat">
                Are you sure you want to delete this pricing condition?
              </h3>
              <div className="flex gap-4 justify-center">
                <button
                  onClick={handleConfirmDeleteDynamicPricingCondition}
                  className="bg-black text-white px-8 py-3 rounded-full font-medium text-[16px] font-montserrat hover:bg-gray-800 transition-colors"
                >
                  yes
                </button>
                <button
                  onClick={handleCancelDeleteDynamicPricingCondition}
                  className="border border-[#e4e4e4] text-black px-8 py-3 rounded-full font-medium text-[16px] font-montserrat hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modals */}
      {locationModals.deleteCountryConfirm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-lg p-8 text-center max-w-md mx-4">
            <h3 className="font-bold text-lg mb-4">Delete Country</h3>
            <p className="text-gray-600 mb-6">Are you sure you want to delete this country? This action cannot be undone.</p>
            <div className="flex gap-4 justify-center">
              <button
                onClick={handleConfirmDeleteCountry}
                className="bg-red-600 text-white px-6 py-2 rounded-full font-medium hover:bg-red-700 transition-colors"
              >
                Delete
              </button>
              <button
                onClick={handleCancelDeleteCountry}
                className="border border-gray-300 text-black px-6 py-2 rounded-full font-medium hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {locationModals.deleteLanguageConfirm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-lg p-8 text-center max-w-md mx-4">
            <h3 className="font-bold text-lg mb-4">Delete Language</h3>
            <p className="text-gray-600 mb-6">Are you sure you want to delete this language? This action cannot be undone.</p>
            <div className="flex gap-4 justify-center">
              <button
                onClick={handleConfirmDeleteLanguage}
                className="bg-red-600 text-white px-6 py-2 rounded-full font-medium hover:bg-red-700 transition-colors"
              >
                Delete
              </button>
              <button
                onClick={handleCancelDeleteLanguage}
                className="border border-gray-300 text-black px-6 py-2 rounded-full font-medium hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {locationModals.deleteCurrencyConfirm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-lg p-8 text-center max-w-md mx-4">
            <h3 className="font-bold text-lg mb-4">Delete Currency</h3>
            <p className="text-gray-600 mb-6">Are you sure you want to delete this currency? This action cannot be undone.</p>
            <div className="flex gap-4 justify-center">
              <button
                onClick={handleConfirmDeleteCurrency}
                className="bg-red-600 text-white px-6 py-2 rounded-full font-medium hover:bg-red-700 transition-colors"
              >
                Delete
              </button>
              <button
                onClick={handleCancelDeleteCurrency}
                className="border border-gray-300 text-black px-6 py-2 rounded-full font-medium hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Webhook Management Modal */}
      {webhookModals.webhookModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-[0px_4px_120px_2px_rgba(0,0,0,0.25)] relative w-full max-w-7xl mx-4 overflow-clip max-h-[95vh] overflow-y-auto">
            <button 
              onClick={handleCloseWebhookModal}
              className="absolute right-[33px] top-[33px] w-6 h-6 text-gray-500 hover:text-gray-700 z-10"
            >
              <svg className="w-full h-full" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            <div className="p-8">
              <div className="grid grid-cols-3 gap-12">
                {/* API Access and Integration */}
                <div className="space-y-6">
                  <h3 className="font-bold text-[#111111] text-[24px] mb-6 font-montserrat">API Access and Integration</h3>
                  
                  <div className="space-y-6">
                    <div>
                      <h4 className="font-bold text-[#202224] text-[24px] mb-4 font-montserrat">API Keys</h4>
                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <span className="text-[#202224] text-[20px] font-bold font-montserrat">API Key</span>
                          <span className="text-[#202224] text-[20px] font-montserrat">•••••••••••••</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-[#202224] text-[20px] font-bold font-montserrat">Auth Method</span>
                          <span className="text-[#202224] text-[20px] font-montserrat">OAuth</span>
                        </div>
                        <button className="text-[#202224] text-[20px] font-bold font-montserrat hover:underline">
                          Reauthenticate
                        </button>
                      </div>
                    </div>

                    <div>
                      <h4 className="font-bold text-[#202224] text-[24px] mb-4 font-montserrat">API Permission</h4>
                      <div className="space-y-3">
                        {Object.entries(webhookSettings.apiPermissions).map(([permission, enabled]) => (
                          <label key={permission} className="flex items-center gap-3">
                            <input
                              type="checkbox"
                              checked={enabled}
                              onChange={() => handleToggleApiPermission(permission)}
                              className="w-5 h-5 border border-[#bcbcbc] rounded"
                            />
                            <span className="text-[#111111] text-[15px] capitalize font-montserrat">{permission}</span>
                          </label>
                        ))}
                      </div>
                    </div>

                    <div>
                      <h4 className="font-bold text-[#202224] text-[24px] mb-4 font-montserrat">API Call Logs</h4>
                      <div className="grid grid-cols-3 gap-4 text-[#202224] text-[20px] font-bold mb-3 font-montserrat">
                        <span>Date</span>
                        <span>Export</span>
                        <span>IP Address</span>
                      </div>
                      <div className="text-[#202224] text-[14px] tracking-wide font-montserrat">
                        Nov 11, 2025
                      </div>
                    </div>
                  </div>
                </div>

                {/* Webhook Management */}
                <div className="space-y-6">
                  <h3 className="font-bold text-[#111111] text-[24px] mb-6 font-montserrat">Webhook Management</h3>
                  
                  <div className="space-y-4">
                    <div>
                      <label className="block text-[#202224] text-[24px] font-bold mb-2 font-montserrat">Event</label>
                      <select
                        value={webhookForm.event}
                        onChange={(e) => handleWebhookFormChange('event', e.target.value)}
                        className="w-full px-4 py-3 border border-[#979797] rounded-xl text-[#202224] text-[20px] focus:outline-none focus:border-blue-500 font-montserrat"
                      >
                        <option value="">Order placed</option>
                        <option value="order placed">Order Placed</option>
                        <option value="payment successful">Payment Successful</option>
                        <option value="payment failed">Payment Failed</option>
                        <option value="order shipped">Order Shipped</option>
                        <option value="order delivered">Order Delivered</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-[#202224] text-[20px] font-bold mb-2 font-montserrat">URL</label>
                      <input
                        type="url"
                        value={webhookForm.webhookUrl}
                        onChange={(e) => handleWebhookFormChange('webhookUrl', e.target.value)}
                        placeholder="webhook URL"
                        className="w-full px-4 py-3 border border-[#979797] rounded-xl text-[#202224] text-[20px] focus:outline-none focus:border-blue-500 font-montserrat"
                      />
                    </div>

                    <div>
                      <label className="block text-[#202224] text-[20px] font-bold mb-2 font-montserrat">Last Triggered</label>
                      <input
                        type="password"
                        value={webhookForm.secretKey}
                        onChange={(e) => handleWebhookFormChange('secretKey', e.target.value)}
                        placeholder="secret key(mandatory)"
                        className="w-full px-4 py-3 border border-[#979797] rounded-xl text-[#202224] text-[20px] focus:outline-none focus:border-blue-500 font-montserrat"
                      />
                    </div>

                    <button
                      onClick={editingWebhook ? handleSaveEditedWebhook : handleCreateWebhook}
                      disabled={!webhookForm.event || !webhookForm.webhookUrl || !webhookForm.secretKey}
                      className="w-full bg-[#202224] text-white py-4 px-12 rounded-full font-medium text-[16px] hover:bg-gray-800 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed font-montserrat"
                    >
                      {editingWebhook ? 'Update webhook' : 'Add webhook'}
                    </button>

                    {editingWebhook && (
                      <button
                        onClick={handleCancelEditWebhook}
                        className="w-full border border-gray-300 text-black py-4 px-12 rounded-full font-medium text-[16px] hover:bg-gray-50 transition-colors font-montserrat"
                      >
                        Cancel
                      </button>
                    )}
                  </div>

                  {/* Webhook Management Table Headers */}
                  <div className="mt-8">
                    <div className="grid grid-cols-6 gap-3 text-[#202224] text-[20px] font-bold mb-4 font-montserrat">
                      <span>Event</span>
                      <span>URL</span>
                      <span>Last Triggered</span>
                      <span>Status</span>
                      <span>Response</span>
                      <span>Actions</span>
                    </div>
                    
                    {/* Sample webhook entries matching Figma design */}
                    <div className="space-y-3">
                      <div className="grid grid-cols-6 gap-3 items-center text-[#202224] text-[20px] font-montserrat">
                        <span>order placed</span>
                        <span className="truncate">http//hdddhdhd</span>
                        <span>2 am</span>
                        <span className="flex items-center">
                          <svg className="w-4 h-4 text-green-500 mr-1" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                        </span>
                        <span>300kb</span>
                        <div className="flex gap-2">
                          <button 
                            onClick={() => handleEditWebhook(1)}
                            className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
                          >
                            <svg className="w-5 h-5 text-[#667085]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                            </svg>
                          </button>
                          <button 
                            onClick={() => handleDeleteWebhook(1)}
                            className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
                          >
                            <svg className="w-5 h-5 text-[#667085]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                            </svg>
                          </button>
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-6 gap-3 items-center text-[#202224] text-[20px] font-montserrat">
                        <span>payment successful</span>
                        <span className="truncate">http//hdddhdhd</span>
                        <span>Nov 11,2025</span>
                        <span className="flex items-center">
                          <svg className="w-4 h-4 text-red-500 mr-1" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                          </svg>
                        </span>
                        <span>300kb</span>
                        <div className="flex gap-2">
                          <button 
                            onClick={() => handleEditWebhook(2)}
                            className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
                          >
                            <svg className="w-5 h-5 text-[#667085]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                            </svg>
                          </button>
                          <button 
                            onClick={() => handleDeleteWebhook(2)}
                            className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
                          >
                            <svg className="w-5 h-5 text-[#667085]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                            </svg>
                          </button>
                        </div>
                      </div>

                      <div className="grid grid-cols-6 gap-3 items-center text-[#202224] text-[20px] font-montserrat">
                        <span>payment failed</span>
                        <span className="truncate">http//hdddhdhd</span>
                        <span>Nov 11,2025</span>
                        <span className="flex items-center">
                          <svg className="w-4 h-4 text-red-500 mr-1" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                          </svg>
                        </span>
                        <span>300kb</span>
                        <div className="flex gap-2">
                          <button 
                            onClick={() => handleEditWebhook(3)}
                            className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
                          >
                            <svg className="w-5 h-5 text-[#667085]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                            </svg>
                          </button>
                          <button 
                            onClick={() => handleDeleteWebhook(3)}
                            className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
                          >
                            <svg className="w-5 h-5 text-[#667085]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                            </svg>
                          </button>
                        </div>
                      </div>

                      {/* Dynamic webhook entries from state */}
                      {webhookSettings.webhooks.map((webhook) => (
                        <div key={webhook.id} className="grid grid-cols-6 gap-3 items-center text-[#202224] text-[20px] font-montserrat">
                          <span>{webhook.event}</span>
                          <span className="truncate">{webhook.webhookUrl}</span>
                          <span>{webhook.lastTriggered || 'Never'}</span>
                          <span className="flex items-center">
                            <div className={`w-3 h-3 rounded-full mr-2 ${
                              webhook.status === 'active' ? 'bg-green-500' : 'bg-red-500'
                            }`}></div>
                          </span>
                          <span>{webhook.responseSize}</span>
                          <div className="flex gap-2">
                            <button 
                              onClick={() => handleEditWebhook(webhook.id)}
                              className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
                            >
                              <svg className="w-5 h-5 text-[#667085]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                              </svg>
                            </button>
                            <button 
                              onClick={() => handleDeleteWebhook(webhook.id)}
                              className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
                            >
                              <svg className="w-5 h-5 text-[#667085]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                              </svg>
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Webhook Logs */}
                <div className="space-y-6">
                  <h3 className="font-bold text-[#111111] text-[24px] mb-6 font-montserrat">Webhook Logs</h3>
                  
                  <div className="space-y-4">
                    <div className="flex items-center gap-4">
                      <select className="flex-1 px-4 py-3 border border-[#979797] rounded-xl text-[#202224] text-[20px] focus:outline-none focus:border-blue-500 font-montserrat">
                        <option>All Events</option>
                        <option>Order Placed</option>
                        <option>Payment Successful</option>
                        <option>Payment Failed</option>
                      </select>
                      <div className="flex items-center gap-2 text-[#202224] text-[14px] tracking-wide font-montserrat">
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                        Nov 11, 2025 - Nov 27, 2025
                      </div>
                    </div>

                    <div className="mt-6 space-y-2">
                      <div className="text-[#202224] text-[20px] font-montserrat">Frequency</div>
                      <div className="text-[#202224] text-[20px] font-montserrat">Response</div>
                    </div>

                    {/* Log Entries */}
                    <div className="space-y-4 mt-6">
                      <div className="grid grid-cols-4 gap-4 text-[#202224] text-[20px] font-bold font-montserrat">
                        <span>Date</span>
                        <span>Event</span>
                        <span>Status</span>
                        <span>Response</span>
                      </div>
                      
                      {/* Sample log entries */}
                      <div className="space-y-3 text-[#202224] text-[14px] tracking-wide font-montserrat">
                        <div className="grid grid-cols-4 gap-4 py-2">
                          <span>Nov 11, 2025</span>
                          <span>order placed</span>
                          <span className="flex items-center">
                            <svg className="w-4 h-4 text-green-500 mr-1" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                            </svg>
                            300kb
                          </span>
                          <span>300kb</span>
                        </div>
                        <div className="grid grid-cols-4 gap-4 py-2">
                          <span>Nov 11, 2025</span>
                          <span>payment success</span>
                          <span className="flex items-center">
                            <svg className="w-4 h-4 text-green-500 mr-1" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                            </svg>
                            300kb
                          </span>
                          <span>300kb</span>
                        </div>
                        <div className="grid grid-cols-4 gap-4 py-2">
                          <span>Nov 11, 2025</span>
                          <span>payment failed</span>
                          <span className="flex items-center">
                            <svg className="w-4 h-4 text-red-500 mr-1" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                            </svg>
                            Failed
                          </span>
                          <span>300kb</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Webhook Success Modals */}
      {webhookModals.webhookCreatedSuccess && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-[0px_4px_120px_2px_rgba(0,0,0,0.25)] relative w-full max-w-md mx-4 overflow-clip">
            <button 
              onClick={handleWebhookCreatedSuccessDone}
              className="absolute right-[33px] top-[33px] w-6 h-6 text-gray-500 hover:text-gray-700"
            >
              <svg className="w-full h-full" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            <div className="p-8 text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h3 className="font-bold text-black text-[18px] mb-2 font-montserrat">
                Webhook created successfully!
              </h3>
              <p className="text-gray-600 mb-6">Your webhook has been configured and is now active.</p>
              <button
                onClick={handleWebhookCreatedSuccessDone}
                className="bg-black text-white px-16 py-3 rounded-full font-medium text-[16px] font-montserrat hover:bg-gray-800 transition-colors"
              >
                Done
              </button>
            </div>
          </div>
        </div>
      )}

      {webhookModals.webhookUpdatedSuccess && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-[0px_4px_120px_2px_rgba(0,0,0,0.25)] relative w-full max-w-md mx-4 overflow-clip">
            <button 
              onClick={handleWebhookUpdatedSuccessDone}
              className="absolute right-[33px] top-[33px] w-6 h-6 text-gray-500 hover:text-gray-700"
            >
              <svg className="w-full h-full" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            <div className="p-8 text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                </svg>
              </div>
              <h3 className="font-bold text-black text-[18px] mb-2 font-montserrat">
                Webhook updated successfully!
              </h3>
              <p className="text-gray-600 mb-6">Your webhook configuration has been updated.</p>
              <button
                onClick={handleWebhookUpdatedSuccessDone}
                className="bg-black text-white px-16 py-3 rounded-full font-medium text-[16px] font-montserrat hover:bg-gray-800 transition-colors"
              >
                Done
              </button>
            </div>
          </div>
        </div>
      )}

      {webhookModals.webhookDeletedSuccess && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-[0px_4px_120px_2px_rgba(0,0,0,0.25)] relative w-full max-w-md mx-4 overflow-clip">
            <button 
              onClick={handleWebhookDeletedSuccessDone}
              className="absolute right-[33px] top-[33px] w-6 h-6 text-gray-500 hover:text-gray-700"
            >
              <svg className="w-full h-full" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            <div className="p-8 text-center">
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
              </div>
              <h3 className="font-bold text-black text-[18px] mb-2 font-montserrat">
                Webhook deleted successfully!
              </h3>
              <p className="text-gray-600 mb-6">The webhook has been removed from your configuration.</p>
              <button
                onClick={handleWebhookDeletedSuccessDone}
                className="bg-black text-white px-16 py-3 rounded-full font-medium text-[16px] font-montserrat hover:bg-gray-800 transition-colors"
              >
                Done
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Webhook Delete Confirmation Modal */}
      {webhookModals.webhookDeleteConfirm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-[0px_4px_120px_2px_rgba(0,0,0,0.25)] relative w-full max-w-md mx-4 overflow-clip">
            <button 
              onClick={handleCancelDeleteWebhook}
              className="absolute right-[33px] top-[33px] w-6 h-6 text-gray-500 hover:text-gray-700"
            >
              <svg className="w-full h-full" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            <div className="p-8 text-center">
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16c-.77.833.192 2.5 1.732 2.5z" />
                </svg>
              </div>
              <h3 className="font-bold text-black text-[18px] mb-2 font-montserrat">Delete Webhook</h3>
              <p className="text-gray-600 mb-6">Are you sure you want to delete this webhook? This action cannot be undone.</p>
              <div className="flex gap-4 justify-center">
                <button
                  onClick={handleConfirmDeleteWebhook}
                  className="bg-red-600 text-white px-6 py-2 rounded-full font-medium hover:bg-red-700 transition-colors"
                >
                  Delete
                </button>
                <button
                  onClick={handleCancelDeleteWebhook}
                  className="border border-gray-300 text-black px-6 py-2 rounded-full font-medium hover:bg-gray-50 transition-colors"
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
