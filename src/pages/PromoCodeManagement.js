import React, { useState } from 'react';

/**
 * PromoCodeManagement Component
 * 
 * Allows admin to create and manage promo codes
 * - Toggle promo code status
 * - Set discount value and type
 * - Configure date range and usage limits
 * - Apply to specific categories, subcategories, items, or sales
 * - View and manage existing promo codes
 */
const PromoCodeManagement = () => {
  // State for form fields
  const [codeStatus, setCodeStatus] = useState('on');
  const [discountValue, setDiscountValue] = useState('');
  const [discountType, setDiscountType] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [minOrderValue, setMinOrderValue] = useState('');
  const [maxUsers, setMaxUsers] = useState('');
  const [category, setCategory] = useState('');
  const [subcategory, setSubcategory] = useState('');
  const [item, setItem] = useState('');
  const [sale, setSale] = useState('');
  const [showConfirmationModal, setShowConfirmationModal] = useState(false);
  const [show2FAModal, setShow2FAModal] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [showFinalSuccessModal, setShowFinalSuccessModal] = useState(false);
  const [otpCode, setOtpCode] = useState(['', '', '', '']);
  const [verificationPassword, setVerificationPassword] = useState('');
  const [defaultPassword, setDefaultPassword] = useState('');
  const [showVerificationPassword, setShowVerificationPassword] = useState(false);
  const [showDefaultPassword, setShowDefaultPassword] = useState(false);
  const [promoList, setPromoList] = useState([
    {
      id: 1,
      code: 'promo1',
      discount: '30% OFF',
      dateRange: '10/07/2023 - 12/08/2023',
      couponId: 'COUPON01'
    }
  ]);

  // Sample discount types
  const discountTypes = ['Percentage', 'Fixed Amount', 'Free Shipping'];
  
  // Sample categories
  const categories = ['Clothing', 'Accessories', 'Home Decor', 'Electronics'];
  const subcategories = ['T-shirts', 'Jeans', 'Dresses', 'Shoes'];
  const items = ['Item 1', 'Item 2', 'Item 3', 'Item 4'];
  const sales = ['Summer Sale', 'Winter Sale', 'Flash Sale', 'Holiday Sale'];

  const handleCreatePromo = () => {
    // Logic to create a new promo code would go here
    alert('Promo code created successfully!');
  };

  const handleToggleCodeStatus = (status) => {
    if (status === 'on') {
      setShowConfirmationModal(true);
    } else {
      setCodeStatus(status);
    }
  };

  const handleConfirmToggleOn = () => {
    setShowConfirmationModal(false);
    setShow2FAModal(true);
  };

  const handleCancelToggle = () => {
    setShowConfirmationModal(false);
  };

  const handle2FASubmit = () => {
    // Validate OTP and passwords here
    const otpString = otpCode.join('');
    if (otpString.length === 4 && verificationPassword && defaultPassword) {
      setShow2FAModal(false);
      setShowSuccessModal(true);
      // Reset 2FA form
      setOtpCode(['', '', '', '']);
      setVerificationPassword('');
      setDefaultPassword('');
    } else {
      alert('Please fill in all fields');
    }
  };

  const handleSuccessModalDone = () => {
    setShowSuccessModal(false);
    setShowFinalSuccessModal(true);
  };

  const handleFinalSuccessModalDone = () => {
    setShowFinalSuccessModal(false);
    setCodeStatus('on');
  };

  const handleCancel2FA = () => {
    setShow2FAModal(false);
    // Reset 2FA form
    setOtpCode(['', '', '', '']);
    setVerificationPassword('');
    setDefaultPassword('');
  };

  const handleCloseSuccessModal = () => {
    setShowSuccessModal(false);
    setCodeStatus('on');
  };

  const handleCloseFinalSuccessModal = () => {
    setShowFinalSuccessModal(false);
    setCodeStatus('on');
  };

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

  const handleOtpKeyDown = (index, e) => {
    if (e.key === 'Backspace' && !otpCode[index] && index > 0) {
      const prevInput = document.getElementById(`otp-${index - 1}`);
      if (prevInput) prevInput.focus();
    }
  };

  return (
    <div className="p-6 bg-white min-h-screen">
      <h1 className="text-2xl font-bold text-black mb-8 text-center">Promo code management</h1>
      
      {/* Promo Code Form */}
      <div className="max-w-4xl ml-0">
        <div className="mb-6">
          <div className="flex items-center mb-2">
            <span className="mr-4 font-medium">Code status</span>
            <div className="flex items-center space-x-2">
              <button
                onClick={() => handleToggleCodeStatus('on')}
                className={`px-4 py-1 text-sm rounded-full ${
                  codeStatus === 'on' ? 'bg-blue-700 text-white' : 'bg-gray-200 text-gray-700'
                }`}
              >
                On
              </button>
              <button
                onClick={() => handleToggleCodeStatus('off')}
                className={`px-4 py-1 text-sm rounded-full ${
                  codeStatus === 'off' ? 'bg-blue-700 text-white' : 'bg-gray-200 text-gray-700'
                }`}
              >
                Off
              </button>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-6 mb-6">
          <div>
            <label className="block text-sm font-medium mb-1">Discount value</label>
            <input
              type="text"
              value={discountValue}
              onChange={(e) => setDiscountValue(e.target.value)}
              className="w-full border border-gray-300 rounded-md px-3 py-2"
              placeholder="Enter discount value"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Discount Type</label>
            <select
              value={discountType}
              onChange={(e) => setDiscountType(e.target.value)}
              className="w-full border border-gray-300 rounded-md px-3 py-2 appearance-none"
            >
              <option value="">Select discount type</option>
              {discountTypes.map((type, index) => (
                <option key={index} value={type}>{type}</option>
              ))}
            </select>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-6 mb-6">
          <div>
            <label className="block text-sm font-medium mb-1">Start date</label>
            <input
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              className="w-full border border-gray-300 rounded-md px-3 py-2"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">End date</label>
            <input
              type="date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              className="w-full border border-gray-300 rounded-md px-3 py-2"
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-6 mb-6">
          <div>
            <label className="block text-sm font-medium mb-1">minimum order value</label>
            <input
              type="text"
              value={minOrderValue}
              onChange={(e) => setMinOrderValue(e.target.value)}
              className="w-full border border-gray-300 rounded-md px-3 py-2"
              placeholder="Enter minimum order value"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">max users</label>
            <input
              type="text"
              value={maxUsers}
              onChange={(e) => setMaxUsers(e.target.value)}
              className="w-full border border-gray-300 rounded-md px-3 py-2"
              placeholder="Enter maximum users"
            />
          </div>
        </div>

        <div className="mb-6">
          <label className="block text-sm font-medium mb-1">applicable on</label>
          <div className="grid grid-cols-4 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">category</label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full border border-gray-300 rounded-md px-3 py-2 appearance-none"
              >
                <option value="">Select</option>
                {categories.map((cat, index) => (
                  <option key={index} value={cat}>{cat}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">subcategory</label>
              <select
                value={subcategory}
                onChange={(e) => setSubcategory(e.target.value)}
                className="w-full border border-gray-300 rounded-md px-3 py-2 appearance-none"
              >
                <option value="">Select</option>
                {subcategories.map((sub, index) => (
                  <option key={index} value={sub}>{sub}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">item</label>
              <select
                value={item}
                onChange={(e) => setItem(e.target.value)}
                className="w-full border border-gray-300 rounded-md px-3 py-2 appearance-none"
              >
                <option value="">Select</option>
                {items.map((it, index) => (
                  <option key={index} value={it}>{it}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">sale</label>
              <select
                value={sale}
                onChange={(e) => setSale(e.target.value)}
                className="w-full border border-gray-300 rounded-md px-3 py-2 appearance-none"
              >
                <option value="">Select</option>
                {sales.map((s, index) => (
                  <option key={index} value={s}>{s}</option>
                ))}
              </select>
            </div>
          </div>
        </div>

        <button
          onClick={handleCreatePromo}
          className="w-full bg-gray-800 text-white py-2 rounded-md mb-8 hover:bg-gray-700 transition-colors"
        >
          Create promo code
        </button>

        {/* Existing Promo Codes */}
        <div className="mt-8">
          <h2 className="text-xl font-bold mb-4">Existing promo codes</h2>
          
          {promoList.length === 0 ? (
            <div className="text-left">
              <p>No promo found</p>
              <p>promo1</p>
            </div>
          ) : (
            <div className="max-w-md">
              {promoList.map(promo => (
                <div key={promo.id} className="border border-dashed border-gray-300 p-4 rounded-md mb-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-lg font-bold">{promo.discount}</h3>
                      <p className="text-sm text-gray-500">{promo.dateRange}</p>
                      <p className="text-xs text-gray-400">{promo.couponId}</p>
                    </div>
                    <div className="flex space-x-2">
                      <button className="text-blue-500 hover:text-blue-700">
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
                          <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
                        </svg>
                      </button>
                      <button className="text-red-500 hover:text-red-700">
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <polyline points="3 6 5 6 21 6"></polyline>
                          <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                        </svg>
                      </button>
                    </div>
                  </div>
                  <button className="mt-3 px-4 py-1 bg-transparent border border-blue-500 text-blue-500 text-sm rounded-md hover:bg-blue-500 hover:text-white transition-colors">
                    Apply
                  </button>
                </div>
              ))}
            </div>
          )}
          
          {/* Yes/No options as shown in the Figma design */}
          <div className="absolute right-36 top-[300px] bg-white shadow-md rounded-md">
            <div className="py-2 px-4 flex items-center cursor-pointer hover:bg-gray-50">
              <span className="mr-2">yes</span>
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="20 6 9 17 4 12"></polyline>
              </svg>
            </div>
            <div className="py-2 px-4 hover:bg-gray-50 cursor-pointer">
              No
            </div>
          </div>
        </div>
      </div>

      {/* Confirmation Modal */}
      {showConfirmationModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-[0px_4px_120px_2px_rgba(0,0,0,0.25)] p-8 max-w-md w-full mx-4 text-center relative">
            {/* Close button */}
            <button 
              onClick={handleCancelToggle}
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            
            {/* Modal content */}
            <h2 className="text-lg font-bold text-black mb-8 tracking-[-0.41px]">
              Are you sure you want to turn promo code on
            </h2>
            
            {/* Buttons */}
            <div className="flex gap-4 justify-center">
              <button
                onClick={handleConfirmToggleOn}
                className="bg-black text-white px-8 py-3 rounded-full font-semibold hover:bg-gray-800 transition-colors"
              >
                yes
              </button>
              <button
                onClick={handleCancelToggle}
                className="border border-gray-300 text-black px-8 py-3 rounded-full font-medium hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 2FA Modal */}
      {show2FAModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-[0px_4px_120px_2px_rgba(0,0,0,0.25)] p-8 max-w-md w-full mx-4 relative">
            {/* Close button */}
            <button 
              onClick={handleCancel2FA}
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            
            {/* Header text */}
            <div className="text-center mb-6">
              <p className="text-lg font-bold text-black mb-4 tracking-[-0.41px] leading-[22px]">
                If you want to change or access these settings please enter the OTP send to your registered mobile no. and the password
              </p>
            </div>

            {/* Verification Code Section */}
            <div className="mb-6">
              <h3 className="text-2xl font-bold text-black mb-2 tracking-[0.72px]">
                Verification code
              </h3>
              <p className="text-sm text-black mb-4">
                Please enter the verification code we sent to your phone number
              </p>
              
              {/* OTP Input Circles */}
              <div className="flex justify-center gap-4 mb-4">
                {otpCode.map((digit, index) => (
                  <input
                    key={index}
                    id={`otp-${index}`}
                    type="text"
                    value={digit}
                    onChange={(e) => handleOtpChange(index, e.target.value)}
                    onKeyDown={(e) => handleOtpKeyDown(index, e)}
                    className="w-12 h-12 border-2 border-gray-300 rounded-full text-center text-lg font-semibold focus:border-blue-500 focus:outline-none"
                    maxLength={1}
                  />
                ))}
              </div>
            </div>

            {/* Email verification text */}
            <p className="text-sm text-black mb-4 text-center">
              Please enter the verification code we sent to your email address
            </p>

            {/* Verification Password Input */}
            <div className="mb-4 relative">
              <input
                type={showVerificationPassword ? "text" : "password"}
                value={verificationPassword}
                onChange={(e) => setVerificationPassword(e.target.value)}
                placeholder="Password"
                className="w-full border-b border-gray-300 pb-2 text-base focus:border-blue-500 focus:outline-none bg-transparent"
              />
              <button
                type="button"
                onClick={() => setShowVerificationPassword(!showVerificationPassword)}
                className="absolute right-0 top-0 text-gray-400 hover:text-gray-600"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  {showVerificationPassword ? (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  ) : (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L3 3m6.878 6.878L21 21" />
                  )}
                </svg>
              </button>
            </div>

            {/* Default code text */}
            <p className="text-sm text-black mb-4">
              Please enter the default code.
            </p>

            {/* Default Password Input */}
            <div className="mb-6 relative">
              <input
                type={showDefaultPassword ? "text" : "password"}
                value={defaultPassword}
                onChange={(e) => setDefaultPassword(e.target.value)}
                placeholder="Password"
                className="w-full border-b border-gray-300 pb-2 text-base focus:border-blue-500 focus:outline-none bg-transparent"
              />
              <button
                type="button"
                onClick={() => setShowDefaultPassword(!showDefaultPassword)}
                className="absolute right-0 top-0 text-gray-400 hover:text-gray-600"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  {showDefaultPassword ? (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  ) : (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L3 3m6.878 6.878L21 21" />
                  )}
                </svg>
              </button>
            </div>

            {/* Submit Button */}
            <button
              onClick={handle2FASubmit}
              className="w-full bg-black text-white py-3 rounded-[26.5px] font-bold text-base uppercase hover:bg-gray-800 transition-colors"
            >
              SUBMIT
            </button>
          </div>
        </div>
      )}

      {/* Success Modal */}
      {showSuccessModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-[0px_4px_120px_2px_rgba(0,0,0,0.25)] p-8 max-w-md w-full mx-4 text-center relative">
            {/* Close button */}
            <button 
              onClick={handleCloseSuccessModal}
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            
            {/* Success message */}
            <div className="mb-8 mt-4">
              <h2 className="text-lg font-bold text-black tracking-[-0.41px] leading-[22px]">
                id verified successfully!
              </h2>
            </div>

            {/* Done Button */}
            <button
              onClick={handleSuccessModalDone}
              className="bg-black text-white px-12 py-3 rounded-3xl font-semibold text-base hover:bg-gray-800 transition-colors"
            >
              Done
            </button>
          </div>
        </div>
      )}

      {/* Final Success Modal */}
      {showFinalSuccessModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-[0px_4px_120px_2px_rgba(0,0,0,0.25)] p-8 max-w-md w-full mx-4 text-center relative">
            {/* Close button */}
            <button 
              onClick={handleCloseFinalSuccessModal}
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            
            {/* Success message */}
            <div className="mb-8 mt-4">
              <h2 className="text-lg font-bold text-black tracking-[-0.41px] leading-[22px]">
                promocode turned on successfully!
              </h2>
            </div>

            {/* Done Button */}
            <button
              onClick={handleFinalSuccessModalDone}
              className="bg-black text-white px-12 py-3 rounded-3xl font-semibold text-base hover:bg-gray-800 transition-colors"
            >
              Done
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default PromoCodeManagement;