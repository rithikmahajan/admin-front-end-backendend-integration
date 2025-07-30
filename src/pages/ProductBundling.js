import React, { useState } from 'react';
import { X, Plus } from 'lucide-react';

/**
 * ProductBundling Component
 * 
 * Manages product bundling functionality allowing admins to:
 * - Select main products and bundle items
 * - Configure product bundles with category/subcategory/item dropdowns
 * - Preview and arrange bundle layouts
 * - Manage product details like size, quantity, price, SKU, and barcode
 * 
 * Features:
 * - Three-tier selection (Category > Subcategory > Item)
 * - Bundle preview with drag-and-drop arrangement
 * - Product details table with editable fields
 * - Bundle with and Bundle list functionality
 */
const ProductBundling = () => {
  const [mainProduct, setMainProduct] = useState({
    category: '',
    subcategory: '',
    item: ''
  });

  const [bundleItems, setBundleItems] = useState([
    { id: 1, category: '', subcategory: '', item: '' },
    { id: 2, category: '', subcategory: '', item: '' }
  ]);

  const [showEditModal, setShowEditModal] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showDeleteSuccessModal, setShowDeleteSuccessModal] = useState(false);

  // Sample product data - replace with real API data
  const sampleProduct = {
    image: '/api/placeholder/158/167',
    productName: 'T shirt',
    category: 'T shirt',
    subcategories: 'small',
    variants: [
      { size: 'small', quantity: 5, price: '4566', salePrice: '4566', sku: 'blk/m/inso123', barcode: '45600000000000' },
      { size: 'small', quantity: 5, price: '4566', salePrice: '4566', sku: 'blk/m/inso123', barcode: '45600000000000' },
      { size: 'small', quantity: 5, price: '4566', salePrice: '4566', sku: 'blk/m/inso123', barcode: '45600000000000' }
    ]
  };

  const handleMainProductChange = (field, value) => {
    setMainProduct(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleBundleItemChange = (id, field, value) => {
    setBundleItems(prev => 
      prev.map(item => 
        item.id === id ? { ...item, [field]: value } : item
      )
    );
  };

  // Edit Bundle Modal Component
  const EditBundleModal = ({ isOpen, onClose }) => {
    if (!isOpen) return null;

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white rounded-xl shadow-lg w-[1600px] h-[950px] relative overflow-hidden">
          {/* Close Button */}
          <button 
            onClick={onClose}
            className="absolute right-6 top-6 w-6 h-6 flex items-center justify-center hover:bg-gray-100 rounded-full"
          >
            <X size={16} className="text-gray-600" />
          </button>

          {/* Modal Header */}
          <div className="text-center pt-12 pb-8">
            <h1 className="text-2xl font-normal text-black tracking-[-0.6px]">Edit bundle</h1>
          </div>

          {/* Top Dropdowns */}
          <div className="px-16 mb-8">
            <div className="grid grid-cols-3 gap-6">
              <div className="relative">
                <select className="w-80 h-12 px-4 border border-gray-400 rounded-xl text-black text-[15px] appearance-none bg-white">
                  <option value="">Category</option>
                  <option value="t-shirt">T-shirt</option>
                </select>
                <div className="absolute right-4 top-1/2 transform -translate-y-1/2 pointer-events-none">
                  <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </div>
              
              <div className="relative">
                <select className="w-80 h-12 px-4 border border-gray-400 rounded-xl text-black text-[15px] appearance-none bg-white">
                  <option value="">sub category</option>
                  <option value="casual">Casual</option>
                </select>
                <div className="absolute right-4 top-1/2 transform -translate-y-1/2 pointer-events-none">
                  <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </div>
              
              <div className="relative">
                <select className="w-80 h-12 px-4 border border-gray-400 rounded-xl text-black text-[15px] appearance-none bg-white">
                  <option value="">Item</option>
                  <option value="blue-tshirt">Blue T-shirt</option>
                </select>
                <div className="absolute right-4 top-1/2 transform -translate-y-1/2 pointer-events-none">
                  <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </div>
            </div>
          </div>

          {/* Product Bundle Section */}
          <div className="px-16 mb-8">
            <div className="grid grid-cols-3 gap-8">
              {/* Main Product */}
              <div className="text-center">
                <h3 className="text-2xl font-bold text-black mb-6">main</h3>
                <div className="w-64 h-64 bg-gray-100 rounded-lg mb-4 mx-auto">
                  <img 
                    src={sampleProduct.image} 
                    alt="Main Product" 
                    className="w-full h-full object-cover rounded-lg"
                  />
                </div>
                <div className="space-y-2 text-[15px] text-left">
                  <div><span className="text-black">Product Name:</span> <span className="font-medium text-gray-900">T shirt</span></div>
                  <div><span className="text-black">Category:</span> <span className="font-medium text-gray-900">T shirt</span></div>
                  <div><span className="text-black">sub categories:</span> <span className="font-medium text-black text-[14px]">small</span></div>
                </div>
                {/* Remove Button */}
                <div className="mt-4">
                  <span className="inline-block bg-red-500 bg-opacity-20 text-red-500 px-4 py-1 rounded text-[12px] font-bold">
                    Remove
                  </span>
                </div>
              </div>

              {/* Item 1 */}
              <div className="text-center">
                <h3 className="text-2xl font-bold text-black mb-6">item 1</h3>
                <div className="w-64 h-64 bg-gray-100 rounded-lg mb-4 mx-auto">
                  <img 
                    src={sampleProduct.image} 
                    alt="Item 1" 
                    className="w-full h-full object-cover rounded-lg"
                  />
                </div>
                <div className="space-y-2 text-[15px] text-left">
                  <div><span className="text-black">Product Name:</span> <span className="font-medium text-gray-900">T shirt</span></div>
                  <div><span className="text-black">Category:</span> <span className="font-medium text-gray-900">T shirt</span></div>
                  <div><span className="text-black">sub categories:</span> <span className="font-medium text-black text-[14px]">small</span></div>
                </div>
                {/* Change Button */}
                <div className="mt-4">
                  <span className="inline-block bg-yellow-500 bg-opacity-20 text-yellow-600 px-4 py-1 rounded text-[12px] font-bold">
                    change
                  </span>
                </div>
              </div>

              {/* Item 2 */}
              <div className="text-center">
                <h3 className="text-2xl font-bold text-black mb-6">Item 2</h3>
                <div className="w-64 h-64 bg-gray-100 rounded-lg mb-4 mx-auto">
                  <img 
                    src={sampleProduct.image} 
                    alt="Item 2" 
                    className="w-full h-full object-cover rounded-lg"
                  />
                </div>
                <div className="space-y-2 text-[15px] text-left">
                  <div><span className="text-black">Product Name:</span> <span className="font-medium text-gray-900">T shirt</span></div>
                  <div><span className="text-black">Category:</span> <span className="font-medium text-gray-900">T shirt</span></div>
                  <div><span className="text-black">sub categories:</span> <span className="font-medium text-black text-[14px]">small</span></div>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Dropdowns */}
          <div className="px-16 mb-8">
            <div className="grid grid-cols-3 gap-8">
              <div className="relative">
                <select className="w-80 h-12 px-4 border border-gray-400 rounded-xl text-black text-[15px] appearance-none bg-white">
                  <option value="">Category</option>
                </select>
                <div className="absolute right-4 top-1/2 transform -translate-y-1/2 pointer-events-none">
                  <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </div>
              
              <div className="relative">
                <select className="w-80 h-12 px-4 border border-gray-400 rounded-xl text-black text-[15px] appearance-none bg-white">
                  <option value="">sub category</option>
                </select>
                <div className="absolute right-4 top-1/2 transform -translate-y-1/2 pointer-events-none">
                  <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </div>
              
              <div className="flex items-center gap-4">
                <div className="relative flex-1">
                  <select className="w-full h-12 px-4 border border-gray-400 rounded-xl text-black text-[15px] appearance-none bg-white">
                    <option value="">Item</option>
                  </select>
                  <div className="absolute right-4 top-1/2 transform -translate-y-1/2 pointer-events-none">
                    <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </div>
                <button className="bg-gray-800 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-gray-700 transition-colors">
                  <Plus size={20} />
                  <span className="text-[14px]">Assign Item</span>
                </button>
              </div>
            </div>
          </div>

          {/* Product Details Table */}
          <div className="px-16 mb-8">
            <div className="flex gap-6">
              {/* Product Image */}
              <div className="w-40 h-42">
                <img 
                  src={sampleProduct.image} 
                  alt="Product" 
                  className="w-full h-full object-cover rounded-lg"
                />
              </div>

              {/* Table */}
              <div className="flex-1">
                {/* Table Headers */}
                <div className="grid grid-cols-9 gap-4 mb-4 text-[15px] text-black">
                  <div>Image</div>
                  <div>Product Name</div>
                  <div>Category</div>
                  <div>sub categories</div>
                  <div>size</div>
                  <div>quantity</div>
                  <div>Price</div>
                  <div>sale price</div>
                  <div>SKU</div>
                  <div>barcode no.</div>
                </div>

                {/* Table Rows */}
                {sampleProduct.variants.map((variant, index) => (
                  <div key={index} className="grid grid-cols-9 gap-4 text-[11px] text-gray-900 mb-2 items-center">
                    <div></div> {/* Image column */}
                    <div className="text-[15px] font-medium">T shirt</div>
                    <div className="text-[15px] font-medium">T shirt</div>
                    <div className="text-[15px]">small</div>
                    <div className="text-[14px] font-medium">{variant.size}</div>
                    <div className="text-[14px] font-medium">{variant.quantity}</div>
                    <div>{variant.price}</div>
                    <div>{variant.salePrice}</div>
                    <div>{variant.sku}</div>
                    <div>{variant.barcode}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="absolute bottom-16 left-0 right-0 flex justify-center gap-8">
            <button 
              onClick={onClose}
              className="bg-white border border-gray-300 text-black px-12 py-4 rounded-full text-[16px] font-medium hover:bg-gray-50 transition-colors"
            >
              go back
            </button>
            <button 
              onClick={() => {
                setShowEditModal(false);
                setShowSuccessModal(true);
              }}
              className="bg-black text-white px-12 py-4 rounded-full text-[16px] font-medium hover:bg-gray-800 transition-colors"
            >
              save
            </button>
          </div>
        </div>
      </div>
    );
  };

  // Success Modal Component
  const SuccessModal = ({ isOpen, onClose }) => {
    if (!isOpen) return null;

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[60]">
        <div className="bg-white rounded-xl shadow-lg w-[600px] h-[300px] relative overflow-hidden">
          {/* Close Button */}
          <button 
            onClick={onClose}
            className="absolute right-8 top-8 w-6 h-6 flex items-center justify-center hover:bg-gray-100 rounded-full"
          >
            <X size={16} className="text-gray-600" />
          </button>

          {/* Success Message */}
          <div className="text-center pt-16 pb-8">
            <h1 className="text-lg font-bold text-black tracking-[-0.41px] mb-8">
              Item assigned successfully!
            </h1>
            
            {/* Done Button */}
            <button 
              onClick={onClose}
              className="bg-black text-white px-8 py-3 rounded-3xl text-[16px] font-semibold hover:bg-gray-800 transition-colors"
            >
              Done
            </button>
          </div>
        </div>
      </div>
    );
  };

  // Delete Confirmation Modal Component
  const DeleteConfirmationModal = ({ isOpen, onClose, onConfirm }) => {
    if (!isOpen) return null;

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[60]">
        <div className="bg-white rounded-xl shadow-lg w-[600px] h-[300px] relative overflow-hidden">
          {/* Close Button */}
          <button 
            onClick={onClose}
            className="absolute right-8 top-8 w-6 h-6 flex items-center justify-center hover:bg-gray-100 rounded-full"
          >
            <X size={16} className="text-gray-600" />
          </button>

          {/* Confirmation Message */}
          <div className="text-center pt-16 pb-8">
            <h1 className="text-lg font-bold text-black tracking-[-0.41px] mb-8">
              Are you sure you want to delete this item
            </h1>
            
            {/* Action Buttons */}
            <div className="flex justify-center gap-4">
              <button 
                onClick={onConfirm}
                className="bg-black text-white px-8 py-3 rounded-3xl text-[16px] font-semibold hover:bg-gray-800 transition-colors"
              >
                yes
              </button>
              <button 
                onClick={onClose}
                className="bg-white border border-gray-300 text-black px-8 py-3 rounded-full text-[16px] font-medium hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  // Delete Success Modal Component
  const DeleteSuccessModal = ({ isOpen, onClose }) => {
    if (!isOpen) return null;

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[60]">
        <div className="bg-white rounded-xl shadow-lg w-[600px] h-[300px] relative overflow-hidden">
          {/* Close Button */}
          <button 
            onClick={onClose}
            className="absolute right-8 top-8 w-6 h-6 flex items-center justify-center hover:bg-gray-100 rounded-full"
          >
            <X size={16} className="text-gray-600" />
          </button>

          {/* Success Message */}
          <div className="text-center pt-16 pb-8">
            <h1 className="text-lg font-bold text-black tracking-[-0.41px] mb-8">
              Item deleted successfully!
            </h1>
            
            {/* Done Button */}
            <button 
              onClick={onClose}
              className="bg-black text-white px-8 py-3 rounded-3xl text-[16px] font-semibold hover:bg-gray-800 transition-colors"
            >
              Done
            </button>
          </div>
        </div>
      </div>
    );
  };

  const ProductSection = ({ title, product, isMain = false, onAssignItem }) => (
    <div className="mb-8">
      <h2 className="text-2xl font-bold text-black text-center mb-6">{title}</h2>
      
      {/* Dropdowns */}
      <div className="grid grid-cols-3 gap-6 mb-6">
        <div className="relative">
          <select className="w-full h-12 px-4 border border-gray-400 rounded-xl text-black text-[15px] appearance-none bg-white">
            <option value="">Category</option>
            <option value="t-shirt">T-shirt</option>
            <option value="pants">Pants</option>
          </select>
          <div className="absolute right-4 top-1/2 transform -translate-y-1/2 pointer-events-none">
            <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </div>
        </div>
        
        <div className="relative">
          <select className="w-full h-12 px-4 border border-gray-400 rounded-xl text-black text-[15px] appearance-none bg-white">
            <option value="">sub category</option>
            <option value="casual">Casual</option>
            <option value="formal">Formal</option>
          </select>
          <div className="absolute right-4 top-1/2 transform -translate-y-1/2 pointer-events-none">
            <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </div>
        </div>
        
        <div className="relative">
          <select className="w-full h-12 px-4 border border-gray-400 rounded-xl text-black text-[15px] appearance-none bg-white">
            <option value="">Item</option>
            <option value="blue-tshirt">Blue T-shirt</option>
            <option value="red-tshirt">Red T-shirt</option>
          </select>
          <div className="absolute right-4 top-1/2 transform -translate-y-1/2 pointer-events-none">
            <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </div>
        </div>
      </div>

      {/* Product Details Section */}
      <div className="flex gap-6">
        {/* Product Image */}
        <div className="w-40 h-42">
          <img 
            src={sampleProduct.image} 
            alt="Product" 
            className="w-full h-full object-cover rounded-lg"
          />
        </div>

        {/* Product Details Table */}
        <div className="flex-1">
          {/* Table Headers */}
          <div className="grid grid-cols-7 gap-4 mb-4 text-[15px] text-black">
            <div>Product Name</div>
            <div>Category</div>
            <div>sub categories</div>
            <div>size</div>
            <div>quantity</div>
            <div>Price</div>
            <div>sale price</div>
            <div>SKU</div>
            <div>barcode no.</div>
          </div>

          {/* Product Info Row */}
          <div className="mb-4">
            <div className="text-[15px] font-medium text-gray-900 mb-2">{sampleProduct.productName}</div>
            <div className="text-[15px] font-medium text-gray-900 mb-2">{sampleProduct.category}</div>
            <div className="text-[15px] font-medium text-gray-900">{sampleProduct.subcategories}</div>
          </div>

          {/* Product Variants */}
          {sampleProduct.variants.map((variant, index) => (
            <div key={index} className="grid grid-cols-6 gap-4 text-[11px] text-gray-900 mb-2">
              <div className="text-[14px]">{variant.size}</div>
              <div className="text-[14px]">{variant.quantity}</div>
              <div>{variant.price}</div>
              <div>{variant.salePrice}</div>
              <div>{variant.sku}</div>
              <div>{variant.barcode}</div>
            </div>
          ))}
        </div>

        {/* Assign Item Button */}
        {onAssignItem && (
          <div className="flex flex-col justify-center">
            <button 
              onClick={onAssignItem}
              className="bg-gray-800 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-gray-700 transition-colors"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
              Assign Item
            </button>
          </div>
        )}
      </div>

      {/* Bundle With Button for Main Product */}
      {isMain && (
        <div className="mt-6">
          <button className="bg-gray-800 text-white px-12 py-3 rounded-full text-[16px] font-medium hover:bg-gray-700 transition-colors">
            Bundle with
          </button>
        </div>
      )}
    </div>
  );

  return (
    <div className="p-6 bg-white min-h-screen">
      {/* Page Title */}
      <div className="text-center mb-8">
        <h1 className="text-2xl font-bold text-black">manage product bundling</h1>
      </div>

      {/* Main Product Section */}
      <ProductSection 
        title="Main" 
        product={mainProduct} 
        isMain={true}
        onAssignItem={() => console.log('Assign item to main product')}
      />

      {/* Bundle Items */}
      {bundleItems.map((item, index) => (
        <ProductSection 
          key={item.id}
          title={`Item ${index + 1}`} 
          product={item}
          onAssignItem={() => console.log(`Assign item to bundle item ${index + 1}`)}
        />
      ))}

      {/* Bundle Preview Section */}
      <div className="mt-12 mb-8">
        <div className="flex items-center gap-4 mb-6">
          <h2 className="text-xl font-bold text-gray-900">Bundle Preview and arrange</h2>
          <div className="w-5 h-5 bg-gray-200 rounded flex items-center justify-center">
            <svg className="w-3 h-3 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 10h16M4 14h16M4 18h16" />
            </svg>
          </div>
        </div>

        {/* Bundle Preview Grid */}
        <div className="space-y-8">
          {/* Row 1 */}
          <div className="grid grid-cols-3 gap-8">
            <div className="text-center">
              <h3 className="text-xl font-bold text-black mb-4">main</h3>
              <div className="w-64 h-64 bg-gray-100 rounded-lg mb-4 mx-auto">
                <img 
                  src={sampleProduct.image} 
                  alt="Main Product" 
                  className="w-full h-full object-cover rounded-lg"
                />
              </div>
              <div className="space-y-1 text-[15px]">
                <div>Product Name: T shirt</div>
                <div>Category: T shirt</div>
                <div>sub categories: small</div>
              </div>
            </div>

            <div className="text-center">
              <h3 className="text-xl font-bold text-black mb-4">Item 1</h3>
              <div className="w-64 h-64 bg-gray-100 rounded-lg mb-4 mx-auto">
                <img 
                  src={sampleProduct.image} 
                  alt="Item 1" 
                  className="w-full h-full object-cover rounded-lg"
                />
              </div>
              <div className="space-y-1 text-[15px]">
                <div>Product Name: T shirt</div>
                <div>Category: T shirt</div>
                <div>sub categories: small</div>
              </div>
            </div>

            <div className="text-center">
              <h3 className="text-xl font-bold text-black mb-4">Item 2</h3>
              <div className="w-64 h-64 bg-gray-100 rounded-lg mb-4 mx-auto">
                <img 
                  src={sampleProduct.image} 
                  alt="Item 2" 
                  className="w-full h-full object-cover rounded-lg"
                />
              </div>
              <div className="space-y-1 text-[15px]">
                <div>Product Name: T shirt</div>
                <div>Category: T shirt</div>
                <div>sub categories: small</div>
                <div className="flex justify-center gap-2 mt-2">
                  <button 
                    onClick={() => setShowEditModal(true)}
                    className="p-2 rounded hover:bg-gray-100"
                  >
                    <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                    </svg>
                  </button>
                  <button 
                    onClick={() => setShowDeleteModal(true)}
                    className="p-2 rounded hover:bg-gray-100"
                  >
                    <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Additional rows would follow the same pattern */}
          
          {/* Bundle List Button */}
          <div className="flex justify-center mt-8">
            <button className="bg-gray-800 text-white px-12 py-3 rounded-full text-[16px] font-medium hover:bg-gray-700 transition-colors">
              Bundle list
            </button>
          </div>
        </div>
      </div>

      {/* Edit Bundle Modal */}
      <EditBundleModal 
        isOpen={showEditModal} 
        onClose={() => setShowEditModal(false)} 
      />

      {/* Success Modal */}
      <SuccessModal 
        isOpen={showSuccessModal} 
        onClose={() => setShowSuccessModal(false)} 
      />

      {/* Delete Confirmation Modal */}
      <DeleteConfirmationModal 
        isOpen={showDeleteModal} 
        onClose={() => setShowDeleteModal(false)}
        onConfirm={() => {
          setShowDeleteModal(false);
          setShowDeleteSuccessModal(true);
        }}
      />

      {/* Delete Success Modal */}
      <DeleteSuccessModal 
        isOpen={showDeleteSuccessModal} 
        onClose={() => setShowDeleteSuccessModal(false)} 
      />
    </div>
  );
};

export default ProductBundling;
