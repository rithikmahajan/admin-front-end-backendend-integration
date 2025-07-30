import React, { useState, useMemo, useCallback } from 'react';
import { Search, Edit2, Trash2, ChevronDown, Upload, Plus, X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { CATEGORY_OPTIONS, SUBCATEGORY_OPTIONS, STATUS_STYLES } from '../constants';
import { useDebounce } from '../hooks';

/**
 * ManageItems Component
 * 
 * Main product management interface providing:
 * - Product listing with search and filtering
 * - Bulk operations and single item actions
 * - Navigation to product upload forms
 * - Edit modal with detailed product information
 * 
 * Performance Optimizations:
 * - useMemo for filtered items to prevent unnecessary recalculations
 * - useCallback for event handlers to prevent child re-renders
 * - Efficient state management with minimal re-renders
 * - Optimized table rendering with proper key props
 */

const ManageItems = React.memo(() => {
  const navigate = useNavigate();
  
  // State management - grouped by functionality for better organization
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All categories');
  const [selectedSubCategory, setSelectedSubCategory] = useState('All subcategories');
  const [selectedItems, setSelectedItems] = useState([]);
  
  // Modal state management
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [newDetails, setNewDetails] = useState('');
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);

  // Debounced search term for performance optimization
  const debouncedSearchTerm = useDebounce(searchTerm, 300);

  // Sample items data - in production, this would come from an API or state management
  // TODO: Replace with actual data fetching logic
  // Memoized to prevent unnecessary re-renders
  const items = useMemo(() => [
    {
      id: 1,
      image: '/api/placeholder/80/80',
      productName: 'T shirt',
      category: 'T shirt',
      subCategories: 't shirt',
      size: ['small', 'medium', 'large'],
      quantity: 5,
      price: 4566,
      salePrice: 4566,
      sku: 'lakm7mix23',
      barcodeNo: '420000000000',
      status: 'live',
      metaData: 'they meta data'
    },
    {
      id: 2,
      image: '/api/placeholder/80/80',
      productName: 'T shirt',
      category: 'T shirt',
      subCategories: 't shirt',
      size: ['large'],
      quantity: 10,
      price: 4566,
      salePrice: 4566,
      sku: 'lakm7mix23',
      barcodeNo: '420000000000',
      status: 'Scheduled',
      metaData: 'they meta data'
    }
  ], []);

  // Memoized filtered items - only recalculates when dependencies change
  // Now using debounced search term for better performance
  const filteredItems = useMemo(() => {
    return items.filter(item => {
      const matchesSearch = item.productName.toLowerCase().includes(debouncedSearchTerm.toLowerCase()) ||
                           item.category.toLowerCase().includes(debouncedSearchTerm.toLowerCase()) ||
                           item.subCategories.toLowerCase().includes(debouncedSearchTerm.toLowerCase());
      
      const matchesCategory = selectedCategory === 'All categories' || 
                             item.category === selectedCategory;
      
      const matchesSubCategory = selectedSubCategory === 'All subcategories' || 
                                item.subCategories === selectedSubCategory;
      
      return matchesSearch && matchesCategory && matchesSubCategory;
    });
  }, [items, debouncedSearchTerm, selectedCategory, selectedSubCategory]);

  // Memoized handlers to prevent unnecessary re-renders
  const handleSelectItem = useCallback((itemId) => {
    setSelectedItems(prev => 
      prev.includes(itemId) 
        ? prev.filter(id => id !== itemId)
        : [...prev, itemId]
    );
  }, []);

  const handleSelectAll = useCallback(() => {
    setSelectedItems(prev => 
      prev.length === filteredItems.length ? [] : filteredItems.map(item => item.id)
    );
  }, [filteredItems]);

  // Navigation handlers
  const handleBulkUpload = useCallback(() => {
    console.log('Bulk upload');
    // TODO: Implement bulk upload functionality
  }, []);

  const handleUploadSingleProduct = useCallback(() => {
    navigate('/single-product-upload');
  }, [navigate]);

  // Edit modal handlers
  const handleEdit = useCallback((itemId) => {
    const itemToEdit = items.find(item => item.id === itemId);
    setEditingItem(itemToEdit);
    setNewDetails('');
    setIsEditModalOpen(true);
  }, [items]);

  const handleSaveEdit = useCallback(() => {
    console.log('Saving edit for item:', editingItem.id, 'New details:', newDetails);
    // TODO: Implement actual save logic with API call
    setIsEditModalOpen(false);
    setEditingItem(null);
    setNewDetails('');
    setIsSuccessModalOpen(true);
  }, [editingItem, newDetails]);

  const handleCloseEdit = useCallback(() => {
    setIsEditModalOpen(false);
    setEditingItem(null);
    setNewDetails('');
  }, []);

  const handleCloseSuccess = useCallback(() => {
    setIsSuccessModalOpen(false);
  }, []);

  const handleDelete = useCallback((itemId) => {
    console.log('Delete item:', itemId);
    // TODO: Implement delete functionality
  }, []);

  // Utility functions
  const getSizeDisplay = useCallback((sizes) => {
    return sizes.join(', ');
  }, []);

  const getStatusStyle = useCallback((status) => {
    return STATUS_STYLES[status] || STATUS_STYLES.draft;
  }, []);

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Main Content Container with shadow and styling */}
      <div className="max-w-full mx-auto bg-white rounded-xl shadow-lg overflow-hidden">
        
        {/* Header Section - Title and Action Buttons */}
        <div className="p-6 border-b border-gray-200">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold text-gray-900">Manage Items</h1>
            {/* Action buttons container */}
            <div className="flex gap-3">
              <button 
                onClick={handleBulkUpload}
                className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                aria-label="Upload multiple products at once"
              >
                <Upload className="h-4 w-4" />
                Bulk Upload
              </button>
              <button 
                onClick={handleUploadSingleProduct}
                className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                aria-label="Upload a single product"
              >
                <Plus className="h-4 w-4" />
                Upload single product
              </button>
            </div>
          </div>
          
          {/* Search and Filter Controls Section */}
          <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center">
            
            {/* Search Bar with icon */}
            <div className="relative flex-1 max-w-sm">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Search products, categories..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="block w-full pl-10 pr-3 py-2.5 border border-gray-300 rounded-lg leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                aria-label="Search products"
              />
            </div>

            {/* Category Filter Dropdown */}
            <div className="relative">
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="appearance-none bg-white border border-gray-400 rounded-xl px-4 py-3 pr-8 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 min-w-[200px]"
                aria-label="Filter by category"
              >
                {CATEGORY_OPTIONS.map((option, index) => (
                  <option key={index} value={option}>{option}</option>
                ))}
              </select>
              <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                <ChevronDown className="h-4 w-4 text-gray-400" />
              </div>
            </div>

            {/* Sub Category Filter Dropdown */}
            <div className="relative">
              <select
                value={selectedSubCategory}
                onChange={(e) => setSelectedSubCategory(e.target.value)}
                className="appearance-none bg-white border border-gray-400 rounded-xl px-4 py-3 pr-8 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 min-w-[200px]"
                aria-label="Filter by subcategory"
              >
                {SUBCATEGORY_OPTIONS.map((option, index) => (
                  <option key={index} value={option}>{option}</option>
                ))}
              </select>
              <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                <ChevronDown className="h-4 w-4 text-gray-400" />
              </div>
            </div>
          </div>
        </div>

        {/* Table Section with Product Data */}
        <div className="p-6">
          
          {/* Responsive Table Container */}
          <div className="bg-white border border-gray-300 rounded-lg overflow-hidden">
            {/* Table Header - Column definitions */}
            <div className="bg-gray-50 border-b border-gray-200">
              <div className="grid grid-cols-12 gap-2 p-4 text-xs font-bold text-gray-700">
                <div className="col-span-1 flex items-center">
                  <input
                    type="checkbox"
                    checked={selectedItems.length === filteredItems.length && filteredItems.length > 0}
                    onChange={handleSelectAll}
                    className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                    aria-label="Select all items"
                  />
                </div>
                <div className="col-span-1">Image</div>
                <div className="col-span-1">Product Name</div>
                <div className="col-span-1">Category</div>
                <div className="col-span-1">sub categories</div>
                <div className="col-span-1">size</div>
                <div className="col-span-1">quantity</div>
                <div className="col-span-1">Price</div>
                <div className="col-span-1">sale price</div>
                <div className="col-span-1">SKU</div>
                <div className="col-span-1">status</div>
                <div className="col-span-1">Action</div>
              </div>
            </div>

            {/* Table Rows - Optimized rendering with proper keys */}
            <div className="divide-y divide-gray-100">
              {filteredItems.map((item) => (
                <div 
                  key={item.id} 
                  className="grid grid-cols-12 gap-2 p-4 items-center hover:bg-gray-50 transition-colors text-sm"
                >
                  
                  {/* Checkbox Column */}
                  <div className="col-span-1">
                    <input
                      type="checkbox"
                      checked={selectedItems.includes(item.id)}
                      onChange={() => handleSelectItem(item.id)}
                      className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                      aria-label={`Select ${item.productName}`}
                    />
                  </div>

                  {/* Product Image Column */}
                  <div className="col-span-1">
                    <div className="w-12 h-12 bg-gray-200 rounded-lg overflow-hidden">
                      <img
                        src={item.image}
                        alt={`${item.productName} product image`}
                        className="w-full h-full object-cover"
                        loading="lazy"
                      />
                    </div>
                  </div>

                  {/* Product Name Column */}
                  <div className="col-span-1">
                    <p className="font-medium text-gray-900 truncate" title={item.productName}>
                      {item.productName}
                    </p>
                  </div>

                  {/* Category Column */}
                  <div className="col-span-1">
                    <p className="text-gray-600 truncate" title={item.category}>
                      {item.category}
                    </p>
                  </div>

                  {/* Sub Categories Column */}
                  <div className="col-span-1">
                    <p className="text-gray-600 truncate" title={item.subCategories}>
                      {item.subCategories}
                    </p>
                  </div>

                  {/* Size Column */}
                  <div className="col-span-1">
                    <p className="text-gray-600 truncate" title={getSizeDisplay(item.size)}>
                      {getSizeDisplay(item.size)}
                    </p>
                  </div>

                  {/* Quantity Column */}
                  <div className="col-span-1">
                    <p className="text-gray-600">{item.quantity}</p>
                  </div>

                  {/* Price Column */}
                  <div className="col-span-1">
                    <p className="text-gray-600">₹{item.price}</p>
                  </div>

                  {/* Sale Price Column */}
                  <div className="col-span-1">
                    <p className="text-gray-600">₹{item.salePrice}</p>
                  </div>

                  {/* SKU Column */}
                  <div className="col-span-1">
                    <p className="text-gray-600 text-xs truncate" title={item.sku}>
                      {item.sku}
                    </p>
                  </div>

                  {/* Status Column with colored badges */}
                  <div className="col-span-1">
                    <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${getStatusStyle(item.status)}`}>
                      {item.status}
                    </span>
                  </div>

                  {/* Action Column with edit and delete buttons */}
                  <div className="col-span-1">
                    <div className="flex space-x-1">
                      <button
                        onClick={() => handleEdit(item.id)}
                        className="p-1.5 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded transition-colors"
                        title={`Edit ${item.productName}`}
                        aria-label={`Edit ${item.productName}`}
                      >
                        <Edit2 className="h-3 w-3" />
                      </button>
                      <button
                        onClick={() => handleDelete(item.id)}
                        className="p-1.5 text-gray-500 hover:text-red-600 hover:bg-red-50 rounded transition-colors"
                        title={`Delete ${item.productName}`}
                        aria-label={`Delete ${item.productName}`}
                      >
                        <Trash2 className="h-3 w-3" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Empty State - shown when no items match filters */}
            {filteredItems.length === 0 && (
              <div className="p-8 text-center text-gray-500">
                <p className="text-lg font-medium mb-2">No items found</p>
                <p className="text-sm">
                  {searchTerm || selectedCategory !== 'All categories' || selectedSubCategory !== 'All subcategories'
                    ? 'Try adjusting your search or filters'
                    : 'Start by uploading your first product'
                  }
                </p>
              </div>
            )}
          </div>

          {/* Bulk Actions */}
          {selectedItems.length > 0 && (
            <div className="mt-4 p-4 bg-blue-50 rounded-lg border border-blue-200">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <p className="text-sm text-blue-800 font-medium">
                    {selectedItems.length} item{selectedItems.length > 1 ? 's' : ''} selected
                  </p>
                  <div className="flex items-center gap-2 text-sm">
                    <input type="checkbox" id="move-to-sale" className="rounded border-gray-300 text-blue-600 focus:ring-blue-500" />
                    <label htmlFor="move-to-sale" className="text-blue-700">move to sale</label>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <input type="checkbox" id="keep-copy" className="rounded border-gray-300 text-blue-600 focus:ring-blue-500" />
                    <label htmlFor="keep-copy" className="text-blue-700">keep a copy and move</label>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <input type="checkbox" id="move-to-eye" className="rounded border-gray-300 text-blue-600 focus:ring-blue-500" />
                    <label htmlFor="move-to-eye" className="text-blue-700">move to eye</label>
                  </div>
                </div>
                <div className="flex gap-2">
                  <button className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-colors">
                    <Edit2 className="h-4 w-4" />
                  </button>
                  <button className="p-2 text-gray-500 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors">
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Edit Item Modal */}
      {isEditModalOpen && editingItem && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-2xl max-w-4xl w-full mx-4 overflow-hidden max-h-screen overflow-y-auto">
            
            {/* Modal Header */}
            <div className="relative p-6 border-b border-gray-200">
              <h2 className="text-xl font-bold text-gray-900">Edit now</h2>
              <button
                onClick={handleCloseEdit}
                className="absolute top-4 right-4 p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Modal Content */}
            <div className="p-6">
              
              {/* Current Item Details Table */}
              <div className="mb-6 overflow-x-auto">
                <table className="w-full border border-gray-300 rounded-lg">
                  <thead className="bg-gray-50">
                    <tr className="text-xs font-bold text-gray-700">
                      <th className="p-3 text-left border-r border-gray-300">Image</th>
                      <th className="p-3 text-left border-r border-gray-300">Product Name</th>
                      <th className="p-3 text-left border-r border-gray-300">Category</th>
                      <th className="p-3 text-left border-r border-gray-300">sub categories</th>
                      <th className="p-3 text-left border-r border-gray-300">size</th>
                      <th className="p-3 text-left border-r border-gray-300">quantity</th>
                      <th className="p-3 text-left border-r border-gray-300">Price</th>
                      <th className="p-3 text-left border-r border-gray-300">sale price</th>
                      <th className="p-3 text-left border-r border-gray-300">SKU</th>
                      <th className="p-3 text-left border-r border-gray-300">barcode no.</th>
                      <th className="p-3 text-left border-r border-gray-300">status</th>
                      <th className="p-3 text-left">meta data</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="text-sm">
                      <td className="p-3 border-r border-gray-200">
                        <img
                          src={editingItem.image}
                          alt={editingItem.productName}
                          className="w-12 h-12 object-cover rounded"
                        />
                      </td>
                      <td className="p-3 border-r border-gray-200">{editingItem.productName}</td>
                      <td className="p-3 border-r border-gray-200">{editingItem.category}</td>
                      <td className="p-3 border-r border-gray-200">{editingItem.subCategories}</td>
                      <td className="p-3 border-r border-gray-200">{getSizeDisplay(editingItem.size)}</td>
                      <td className="p-3 border-r border-gray-200">{editingItem.quantity}</td>
                      <td className="p-3 border-r border-gray-200">₹{editingItem.price}</td>
                      <td className="p-3 border-r border-gray-200">₹{editingItem.salePrice}</td>
                      <td className="p-3 border-r border-gray-200">{editingItem.sku}</td>
                      <td className="p-3 border-r border-gray-200">{editingItem.barcodeNo}</td>
                      <td className="p-3 border-r border-gray-200">
                        <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${getStatusStyle(editingItem.status)}`}>
                          {editingItem.status}
                        </span>
                      </td>
                      <td className="p-3">{editingItem.metaData}</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              {/* Edit Section */}
              <div className="mb-6">
                <label className="block text-lg font-bold text-gray-900 mb-4">
                  Type new details
                </label>
                <textarea
                  value={newDetails}
                  onChange={(e) => setNewDetails(e.target.value)}
                  className="w-full h-32 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none"
                  placeholder="Enter new details..."
                />
              </div>

              {/* Action Buttons */}
              <div className="flex gap-4 justify-center">
                <button
                  onClick={handleSaveEdit}
                  className="bg-black hover:bg-gray-800 text-white font-medium py-3 px-8 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
                >
                  save
                </button>
                <button
                  onClick={handleCloseEdit}
                  className="bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium py-3 px-8 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-gray-300 focus:ring-offset-2"
                >
                  go back
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Success Modal */}
      {isSuccessModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-2xl max-w-sm w-full mx-4 relative">
            
            {/* Close Button */}
            <button
              onClick={handleCloseSuccess}
              className="absolute top-4 right-4 p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <X className="h-5 w-5" />
            </button>

            {/* Modal Content */}
            <div className="p-8 text-center">
              
              {/* Success Message */}
              <h2 className="text-lg font-bold text-black mb-8 leading-tight">
                Item Details updated successfully!
              </h2>

              {/* Done Button */}
              <button
                onClick={handleCloseSuccess}
                className="bg-black hover:bg-gray-800 text-white font-semibold py-3 px-8 rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 min-w-[120px]"
              >
                Done
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
});

// Set display name for debugging
ManageItems.displayName = 'ManageItems';

export default ManageItems;
