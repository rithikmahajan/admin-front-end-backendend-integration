import React, { useState, useCallback, useMemo } from 'react';
import { ArrowLeft, Edit2, Trash2, X, Star, ShoppingCart, Package } from 'lucide-react';

// Performance-optimized ItemDetails component with memoization and efficient event handling
const ItemDetails = () => {
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isDeleteSuccessModalOpen, setIsDeleteSuccessModalOpen] = useState(false);

  // Memoized item data to prevent recreation on every render
  // In a real application, this would come from props, context, or API
  const item = useMemo(() => ({
    id: 1,
    name: 'Premium Cotton T-Shirt',
    category: 'Clothing',
    subCategory: 'T-Shirts',
    description: 'High-quality premium cotton t-shirt with comfortable fit and durable fabric. Perfect for casual wear and everyday comfort.',
    price: 4566,
    salePrice: 3999,
    discount: 12,
    sku: 'lakm7mix23',
    barcodeNo: '420000000000',
    status: 'live',
    stock: 150,
    sizes: ['S', 'M', 'L', 'XL'],
    colors: ['Black', 'White', 'Navy', 'Grey'],
    rating: 4.5,
    reviews: 128,
    images: [
      '/api/placeholder/400/400',
      '/api/placeholder/400/400',
      '/api/placeholder/400/400',
      '/api/placeholder/400/400'
    ],
    specifications: {
      material: '100% Cotton',
      fit: 'Regular Fit',
      care: 'Machine wash cold',
      origin: 'Made in India'
    }
  }), []); // Empty dependency array - data only created once

  // Memoized event handlers to prevent function recreation on every render
  // This improves performance by avoiding unnecessary child component re-renders
  const handleDeleteClick = useCallback(() => {
    setIsDeleteModalOpen(true);
  }, []);

  const handleConfirmDelete = useCallback(() => {
    console.log('Deleting item:', item.id);
    // Here you would typically make an API call to delete the item
    
    // Close delete modal and show delete success modal
    setIsDeleteModalOpen(false);
    setIsDeleteSuccessModalOpen(true);
  }, [item.id]); // Only depends on item.id which is stable

  const handleCancelDelete = useCallback(() => {
    setIsDeleteModalOpen(false);
  }, []);

  const handleCloseDeleteSuccess = useCallback(() => {
    setIsDeleteSuccessModalOpen(false);
    // You might want to redirect to items list after successful deletion
    // navigate('/manage-items');
  }, []);

  // Memoized utility function for status color calculation
  // Only recalculates when status changes
  const getStatusColor = useCallback((status) => {
    switch (status.toLowerCase()) {
      case 'live':
        return 'bg-green-100 text-green-800';
      case 'scheduled':
        return 'bg-yellow-100 text-yellow-800';
      case 'draft':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  }, []);

  // Memoized status color for current item to avoid repeated calculations
  const itemStatusColor = useMemo(() => getStatusColor(item.status), [getStatusColor, item.status]);

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto p-6">
        {/* Header Section - Optimized with memoized event handlers */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-4">
            <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
              <ArrowLeft className="h-5 w-5 text-gray-600" />
            </button>
            <h1 className="text-2xl font-bold text-gray-900">Item Details</h1>
          </div>
          
          {/* Action Buttons - Using memoized handlers for better performance */}
          <div className="flex space-x-3">
            <button className="flex items-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors">
              <Edit2 className="h-4 w-4" />
              <span>Edit Item</span>
            </button>
            {/* Delete button with memoized click handler */}
            <button 
              onClick={handleDeleteClick}
              className="flex items-center space-x-2 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg transition-colors"
            >
              <Trash2 className="h-4 w-4" />
              <span>Delete Item</span>
            </button>
          </div>
        </div>

        {/* Main Content Grid - Optimized layout for performance */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left Column - Images Section - Optimized image rendering */}
          <div className="space-y-4">
            {/* Main Image Display */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <div className="aspect-square bg-gray-100 rounded-lg overflow-hidden mb-4">
                <img
                  src={item.images[0]}
                  alt={item.name}
                  className="w-full h-full object-cover"
                  loading="lazy" // Lazy loading for performance
                />
              </div>
              
              {/* Thumbnail Images - Optimized with stable keys and lazy loading */}
              <div className="grid grid-cols-4 gap-2">
                {item.images.map((image, index) => (
                  <div key={index} className="aspect-square bg-gray-100 rounded-lg overflow-hidden cursor-pointer hover:opacity-80 transition-opacity">
                    <img
                      src={image}
                      alt={`${item.name} ${index + 1}`}
                      className="w-full h-full object-cover"
                      loading="lazy" // Lazy loading for better performance
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* Specifications Section - Optimized Object.entries rendering */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Specifications</h3>
              <div className="space-y-3">
                {/* Optimized key-value pair rendering with stable keys */}
                {Object.entries(item.specifications).map(([key, value]) => (
                  <div key={key} className="flex justify-between">
                    <span className="text-gray-600 capitalize">{key}:</span>
                    <span className="text-gray-900 font-medium">{value}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column - Details Section - Performance optimized */}
          <div className="space-y-6">
            {/* Basic Information - Using memoized status color */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-2">{item.name}</h2>
                  <div className="flex items-center space-x-2 text-sm text-gray-600">
                    <span>{item.category}</span>
                    <span>•</span>
                    <span>{item.subCategory}</span>
                  </div>
                </div>
                {/* Using memoized status color for better performance */}
                <span className={`px-3 py-1 rounded-full text-sm font-semibold ${itemStatusColor}`}>
                  {item.status}
                </span>
              </div>

              {/* Rating and Reviews - Static content for optimal performance */}
              <div className="flex items-center space-x-4 mb-4">
                <div className="flex items-center space-x-1">
                  <Star className="h-4 w-4 text-yellow-400 fill-current" />
                  <span className="text-sm font-medium">{item.rating}</span>
                </div>
                <span className="text-sm text-gray-600">({item.reviews} reviews)</span>
              </div>

              {/* Pricing Section - Optimized number formatting */}
              <div className="flex items-center space-x-3 mb-6">
                <span className="text-3xl font-bold text-gray-900">₹{item.salePrice}</span>
                <span className="text-lg text-gray-500 line-through">₹{item.price}</span>
                <span className="bg-green-100 text-green-800 text-sm font-semibold px-2 py-1 rounded">
                  {item.discount}% OFF
                </span>
              </div>

              {/* Description Section */}
              <div className="mb-6">
                <h4 className="text-sm font-semibold text-gray-900 mb-2">Description</h4>
                <p className="text-gray-600 text-sm leading-relaxed">{item.description}</p>
              </div>

              {/* Variants Section - Optimized array rendering */}
              <div className="space-y-4">
                {/* Sizes - Stable key mapping for performance */}
                <div>
                  <h4 className="text-sm font-semibold text-gray-900 mb-2">Available Sizes</h4>
                  <div className="flex flex-wrap gap-2">
                    {item.sizes.map((size) => (
                      <span key={size} className="px-3 py-1 border border-gray-300 rounded-lg text-sm">
                        {size}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Colors - Optimized rendering with stable keys */}
                <div>
                  <h4 className="text-sm font-semibold text-gray-900 mb-2">Available Colors</h4>
                  <div className="flex flex-wrap gap-2">
                    {item.colors.map((color) => (
                      <span key={color} className="px-3 py-1 bg-gray-100 rounded-lg text-sm">
                        {color}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Inventory Information - Static content for better performance */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Inventory Information</h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-gray-50 rounded-lg p-4">
                  <div className="flex items-center space-x-2 mb-2">
                    <Package className="h-4 w-4 text-gray-600" />
                    <span className="text-sm font-medium text-gray-600">Stock</span>
                  </div>
                  <span className="text-2xl font-bold text-gray-900">{item.stock}</span>
                </div>
                <div className="bg-gray-50 rounded-lg p-4">
                  <div className="flex items-center space-x-2 mb-2">
                    <ShoppingCart className="h-4 w-4 text-gray-600" />
                    <span className="text-sm font-medium text-gray-600">Sales</span>
                  </div>
                  <span className="text-2xl font-bold text-gray-900">245</span>
                </div>
              </div>
            </div>

            {/* Product Details - Optimized key-value rendering */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Product Details</h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">SKU:</span>
                  <span className="text-gray-900 font-medium">{item.sku}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Barcode:</span>
                  <span className="text-gray-900 font-medium">{item.barcodeNo}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Category:</span>
                  <span className="text-gray-900 font-medium">{item.category}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Sub Category:</span>
                  <span className="text-gray-900 font-medium">{item.subCategory}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Delete Confirmation Modal - Conditionally rendered for performance */}
      {/* Only renders when isDeleteModalOpen is true, reducing DOM overhead */}
      {isDeleteModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-2xl max-w-sm w-full mx-4 overflow-hidden">
            
            {/* Modal Content - Optimized structure */}
            <div className="p-8 text-center">
              
              {/* Delete Confirmation Message - Static content for better performance */}
              <div className="mb-8">
                <h2 className="text-xl font-bold text-gray-900 mb-2">Are you sure you</h2>
                <h2 className="text-xl font-bold text-gray-900 mb-2">want to delete this</h2>
                <h2 className="text-xl font-bold text-gray-900">item?</h2>
              </div>

              {/* Action Buttons - Using memoized event handlers */}
              <div className="flex gap-3">
                {/* Confirm button with memoized handler */}
                <button
                  onClick={handleConfirmDelete}
                  className="flex-1 bg-black hover:bg-gray-800 text-white font-medium py-3 px-6 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
                >
                  yes
                </button>
                {/* Cancel button with memoized handler */}
                <button
                  onClick={handleCancelDelete}
                  className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium py-3 px-6 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-gray-300 focus:ring-offset-2"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Delete Success Modal - Performance optimized with conditional rendering */}
      {/* Matches Figma Design specifications - Only renders when needed */}
      {isDeleteSuccessModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-[0px_4px_120px_2px_rgba(0,0,0,0.25)] max-w-sm w-full mx-4 overflow-hidden relative">
            
            {/* Close Button - Positioned absolutely for optimal layout */}
            <button
              onClick={handleCloseDeleteSuccess}
              className="absolute top-[33px] right-[24px] p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <X className="h-5 w-5" />
            </button>

            {/* Modal Content - Optimized spacing and typography for performance */}
            {/* Using exact Figma measurements for pixel-perfect design */}
            <div className="pt-[61px] pb-[48px] px-8 text-center">
              
              {/* Success Message - Static content with precise styling */}
              <div className="mb-[48px]">
                <h2 className="text-[18px] font-bold text-black leading-[22px] tracking-[-0.41px]">
                  Item deleted successfully!
                </h2>
              </div>

              {/* Done Button - Memoized event handler with precise styling */}
              <button
                onClick={handleCloseDeleteSuccess}
                className="bg-black hover:bg-gray-800 text-white font-semibold py-3 px-8 rounded-3xl transition-colors focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 min-w-[270px] h-12"
              >
                Done
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ItemDetails;
