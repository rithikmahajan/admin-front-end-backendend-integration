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
                onClick={() => setCodeStatus('on')}
                className={`px-4 py-1 text-sm rounded-full ${
                  codeStatus === 'on' ? 'bg-blue-700 text-white' : 'bg-gray-200 text-gray-700'
                }`}
              >
                On
              </button>
              <button
                onClick={() => setCodeStatus('off')}
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
    </div>
  );
};

export default PromoCodeManagement;