import React, { useState, useMemo, useCallback } from 'react';
import { Search, Edit2, Trash2, ChevronDown, Upload, Plus, X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const ManageItems = React.memo(() => {
  const navigate = useNavigate();
  
  // State management
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All categories');
  const [selectedSubCategory, setSelectedSubCategory] = useState('All subcategories');
  const [selectedItems, setSelectedItems] = useState([]);
  
  // Modal state management
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [newDetails, setNewDetails] = useState('');
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);

  // Bulk action states
  const [moveToSale, setMoveToSale] = useState(false);
  const [keepCopyAndMove, setKeepCopyAndMove] = useState(false);
  const [moveToEyx, setMoveToEyx] = useState(false);

  // Sample items data
  const items = useMemo(() => [
    {
      id: 1,
      image: '/api/placeholder/120/116',
      productName: 'T shirt',
      category: 'T shirt',
      subCategories: 'T shirt',
      hsn: 'HSN123',
      size: ['small', 'medium', 'large'],
      quantity: 5,
      price: 4566,
      salePrice: 4566,
      platforms: {
        myntra: { enabled: true, price: 4566 },
        amazon: { enabled: true, price: 4566 },
        flipkart: { enabled: true, price: 4566 },
        nykaa: { enabled: true, price: 4566 }
      },
      sku: 'blk/m/inso123',
      barcodeNo: '45600000000000',
      status: 'draft',
      metaData: 'they meta data'
    },
    {
      id: 2,
      image: '/api/placeholder/120/116',
      productName: 'T shirt',
      category: 'T shirt',
      subCategories: 'T shirt',
      hsn: 'HSN124',
      size: ['large'],
      quantity: 10,
      price: 4566,
      salePrice: 4566,
      platforms: {
        myntra: { enabled: true, price: 4566 },
        amazon: { enabled: false, price: 4566 },
        flipkart: { enabled: true, price: 4566 },
        nykaa: { enabled: false, price: 4566 }
      },
      sku: 'blk/m/inso123',
      barcodeNo: '45600000000000',
      status: 'live',
      metaData: 'they meta data'
    },
    {
      id: 3,
      image: '/api/placeholder/120/116',
      productName: 'T shirt',
      category: 'T shirt',
      subCategories: 'T shirt',
      hsn: 'HSN125',
      size: ['medium', 'large'],
      quantity: 8,
      price: 4566,
      salePrice: 4566,
      platforms: {
        myntra: { enabled: false, price: 4566 },
        amazon: { enabled: true, price: 4566 },
        flipkart: { enabled: false, price: 4566 },
        nykaa: { enabled: true, price: 4566 }
      },
      sku: 'blk/m/inso123',
      barcodeNo: '45600000000000',
      status: 'scheduled',
      metaData: 'they meta data'
    }
  ], []);

  const categoryOptions = [
    'All categories',
    'T shirt',
    'Clothing',
    'Accessories'
  ];

  const subCategoryOptions = [
    'All subcategories',
    'T shirt',
    'Casual wear',
    'Formal wear'
  ];

  // Filtered items
  const filteredItems = useMemo(() => {
    return items.filter(item => {
      const matchesSearch = item.productName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           item.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           item.subCategories.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesCategory = selectedCategory === 'All categories' || 
                             item.category === selectedCategory;
      
      const matchesSubCategory = selectedSubCategory === 'All subcategories' || 
                                item.subCategories === selectedSubCategory;
      
      return matchesSearch && matchesCategory && matchesSubCategory;
    });
  }, [items, searchTerm, selectedCategory, selectedSubCategory]);

  // Handlers
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

  const handleBulkUpload = useCallback(() => {
    console.log('Bulk upload');
  }, []);

  const handleUploadSingleProduct = useCallback(() => {
    navigate('/single-product-upload');
  }, [navigate]);

  const handleEdit = useCallback((itemId) => {
    const itemToEdit = items.find(item => item.id === itemId);
    setEditingItem(itemToEdit);
    setNewDetails('');
    setIsEditModalOpen(true);
  }, [items]);

  const handleSaveEdit = useCallback(() => {
    console.log('Saving edit for item:', editingItem.id, 'New details:', newDetails);
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
  }, []);

  const getSizeDisplay = useCallback((sizes) => {
    return sizes.join(', ');
  }, []);

  const getStatusStyle = useCallback((status) => {
    const styles = {
      'live': 'text-[#00b69b]',
      'draft': 'text-[#ef3826]',
      'scheduled': 'text-[#ffd56d]'
    };
    return styles[status.toLowerCase()] || styles.draft;
  }, []);

  const handleViewMetaData = useCallback((item) => {
    console.log('View meta data for:', item);
  }, []);

  return (
    <div className="bg-white min-h-screen">
      {/* Main Content Container */}
      <div className="max-w-full mx-auto bg-white rounded-xl shadow-[0px_4px_120px_2px_rgba(0,0,0,0.25)] overflow-hidden">
        
        {/* Header Section */}
        <div className="p-6 border-b border-gray-200">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-[24px] font-bold text-[#111111] font-['Montserrat']">Manage Items</h1>
            <div className="flex gap-3">
              <button 
                onClick={handleBulkUpload}
                className="flex items-center gap-2 bg-[#000aff] hover:bg-blue-700 text-white font-['Montserrat'] font-normal py-2.5 px-4 rounded-lg transition-colors shadow-[0px_1px_2px_0px_rgba(16,24,40,0.05)] border border-[#7280ff] text-[14px]"
              >
                <Plus className="h-5 w-5" />
                <span className="leading-[20px]">Bulk Upload</span>
              </button>
              <button 
                onClick={handleUploadSingleProduct}
                className="flex items-center gap-2 bg-[#000aff] hover:bg-blue-700 text-white font-['Montserrat'] font-normal py-2.5 px-4 rounded-lg transition-colors shadow-[0px_1px_2px_0px_rgba(16,24,40,0.05)] border border-[#7280ff] text-[14px]"
              >
                <Plus className="h-5 w-5" />
                <span className="leading-[20px]">Upload single product</span>
              </button>
            </div>
          </div>
          
          {/* Search and Filter Controls */}
          <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center">
            
            {/* Search Bar */}
            <div className="relative flex-1 max-w-sm">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-[#667085]" />
              </div>
              <input
                type="text"
                placeholder="Search"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="block w-full pl-10 pr-3 py-2.5 border border-[#d0d5dd] rounded-lg bg-white placeholder-[#667085] focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 shadow-[0px_1px_2px_0px_rgba(16,24,40,0.05)] font-['Montserrat'] text-[16px] leading-[24px]"
              />
            </div>

            {/* Category Dropdown */}
            <div className="relative">
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="appearance-none bg-white border-2 border-black rounded-xl px-4 py-3 pr-8 text-black focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 min-w-[153px] h-[47px] font-['Montserrat'] text-[14px] text-center leading-[16px]"
              >
                {categoryOptions.map((option, index) => (
                  <option key={index} value={option}>{option}</option>
                ))}
              </select>
              <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                <ChevronDown className="h-4 w-4 text-black" />
              </div>
            </div>

            {/* Sub Category Dropdown */}
            <div className="relative">
              <select
                value={selectedSubCategory}
                onChange={(e) => setSelectedSubCategory(e.target.value)}
                className="appearance-none bg-white border-2 border-black rounded-xl px-4 py-3 pr-8 text-black focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 min-w-[153px] h-[47px] font-['Montserrat'] text-[14px] text-center leading-[16px]"
              >
                {subCategoryOptions.map((option, index) => (
                  <option key={index} value={option}>{option}</option>
                ))}
              </select>
              <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                <ChevronDown className="h-4 w-4 text-black" />
              </div>
            </div>
          </div>
        </div>

        {/* Table Section */}
        <div className="p-6">
          
          {/* Table Container */}
          <div className="bg-white border border-[#d5d5d5] rounded-lg overflow-hidden">
            {/* Table Header */}
            <div className="bg-[#ffffff] border-b border-[#d5d5d5]">
              <div className="grid grid-cols-[50px_140px_120px_100px_120px_60px_80px_80px_80px_80px_160px_120px_80px_80px_120px_80px] gap-1 p-3 text-[15px] font-normal text-black font-['Montserrat']">
                <div className="flex items-center justify-center">
                  <input
                    type="checkbox"
                    checked={selectedItems.length === filteredItems.length && filteredItems.length > 0}
                    onChange={handleSelectAll}
                    className="w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  />
                </div>
                <div className="text-left">Image</div>
                <div className="text-left">Product Name</div>
                <div className="text-left">Category</div>
                <div className="text-center">sub categories</div>
                <div className="text-center">Hsn</div>
                <div className="text-center">size</div>
                <div className="text-center">quantity</div>
                <div className="text-center">Price</div>
                <div className="text-center">sale price</div>
                <div className="text-center">al price</div>
                <div className="text-center">SKU</div>
                <div className="text-center">barcode no.</div>
                <div className="text-center">status</div>
                <div className="text-center">meta data</div>
                <div className="text-center">Action</div>
              </div>
            </div>

            {/* Platform Headers Row */}
            <div className="bg-[#ffffff] border-b border-[#d5d5d5]">
              <div className="grid grid-cols-[50px_140px_120px_100px_120px_60px_80px_80px_80px_80px_160px_120px_80px_80px_120px_80px] gap-1 p-3">
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div className="flex items-center justify-center gap-3 text-[10px] font-['Montserrat']">
                  <div className="flex items-center gap-1">
                    <span className="text-green-600">✓</span>
                    <span>myntra</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <span className="text-green-600">✓</span>
                    <span>amazon</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <span className="text-green-600">✓</span>
                    <span>flipkart</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <span className="text-green-600">✓</span>
                    <span>nykaa</span>
                  </div>
                </div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
              </div>
            </div>

            {/* Table Rows */}
            <div className="divide-y divide-gray-100">
              {filteredItems.map((item, index) => (
                <div key={item.id} className="grid grid-cols-[50px_140px_120px_100px_120px_60px_80px_80px_80px_80px_160px_120px_80px_80px_120px_80px] gap-1 p-3 items-center hover:bg-gray-50 transition-colors">
                  
                  {/* Checkbox */}
                  <div className="flex justify-center">
                    <input
                      type="checkbox"
                      checked={selectedItems.includes(item.id)}
                      onChange={() => handleSelectItem(item.id)}
                      className="w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                    />
                  </div>

                  {/* Product Image */}
                  <div className="flex justify-center">
                    <div className="w-[120px] h-[116px] bg-gray-200 rounded overflow-hidden">
                      <img
                        src={item.image}
                        alt={item.productName}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>

                  {/* Product Name */}
                  <div className="text-[#111111] text-[14px] font-medium font-['Montserrat'] text-left">
                    {item.productName}
                  </div>

                  {/* Category */}
                  <div className="text-[#111111] text-[14px] font-medium font-['Montserrat'] text-left">
                    {item.category}
                  </div>

                  {/* Sub Categories */}
                  <div className="text-[#111111] text-[14px] font-medium font-['Montserrat'] text-center">
                    {item.subCategories}
                  </div>

                  {/* HSN */}
                  <div className="text-[#010101] text-[10px] font-['Montserrat'] text-center">
                    {item.hsn}
                  </div>

                  {/* Size */}
                  <div className="flex flex-col gap-1 text-[14px] font-medium text-[#010101] font-['Montserrat'] text-center">
                    {item.size.map((size, idx) => (
                      <div key={idx}>{size}</div>
                    ))}
                  </div>

                  {/* Quantity */}
                  <div className="text-[#010101] text-[14px] font-medium font-['Montserrat'] text-center">
                    {item.quantity}
                  </div>

                  {/* Price */}
                  <div className="text-[#111111] text-[11px] font-medium font-['Montserrat'] text-center">
                    {item.price}
                  </div>

                  {/* Sale Price */}
                  <div className="text-[#111111] text-[11px] font-medium font-['Montserrat'] text-center">
                    {item.salePrice}
                  </div>

                  {/* Platform Prices */}
                  <div className="flex items-center justify-center">
                    <div className="grid grid-cols-4 gap-3 text-center">
                      <div className="text-[11px] font-medium text-[#111111] font-['Montserrat']">
                        {item.platforms.myntra.enabled ? item.platforms.myntra.price : '-'}
                      </div>
                      <div className="text-[11px] font-medium text-[#111111] font-['Montserrat']">
                        {item.platforms.amazon.enabled ? item.platforms.amazon.price : '-'}
                      </div>
                      <div className="text-[11px] font-medium text-[#111111] font-['Montserrat']">
                        {item.platforms.flipkart.enabled ? item.platforms.flipkart.price : '-'}
                      </div>
                      <div className="text-[11px] font-medium text-[#111111] font-['Montserrat']">
                        {item.platforms.nykaa.enabled ? item.platforms.nykaa.price : '-'}
                      </div>
                    </div>
                  </div>

                  {/* SKU */}
                  <div className="text-[#111111] text-[11px] font-medium font-['Montserrat'] text-center">
                    {item.sku}
                  </div>

                  {/* Barcode */}
                  <div className="text-[#111111] text-[11px] font-medium font-['Montserrat'] text-center">
                    {item.barcodeNo}
                  </div>

                  {/* Status */}
                  <div className="text-center">
                    <span className={`${getStatusStyle(item.status)} text-[15px] font-['Montserrat']`}>
                      {item.status}
                    </span>
                  </div>

                  {/* Meta Data */}
                  <div className="flex justify-center">
                    <button
                      onClick={() => handleViewMetaData(item)}
                      className="bg-[#000aff] text-white text-[14px] font-['Montserrat'] px-4 py-1 rounded-lg hover:bg-blue-700 transition-colors"
                    >
                      view meta data
                    </button>
                  </div>

                  {/* Action */}
                  <div className="flex justify-center gap-1">
                    <button
                      onClick={() => handleEdit(item.id)}
                      className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded transition-colors"
                    >
                      <Edit2 className="h-4 w-4" />
                    </button>
                    <button
                      onClick={() => handleDelete(item.id)}
                      className="p-2 text-gray-500 hover:text-red-600 hover:bg-red-50 rounded transition-colors"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Empty State */}
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
            <div className="mt-6 p-4 bg-gray-50 rounded-lg border border-gray-200">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-8">
                  <div className="flex items-center gap-2 text-[15px] font-['Montserrat']">
                    <input 
                      type="checkbox" 
                      id="move-to-sale" 
                      checked={moveToSale}
                      onChange={(e) => setMoveToSale(e.target.checked)}
                      className="w-5 h-5 rounded-[3px] border-[#bcbcbc]" 
                    />
                    <label htmlFor="move-to-sale" className="text-black">move to sale</label>
                  </div>
                  <div className="flex items-center gap-2 text-[15px] font-['Montserrat']">
                    <input 
                      type="checkbox" 
                      id="keep-copy" 
                      checked={keepCopyAndMove}
                      onChange={(e) => setKeepCopyAndMove(e.target.checked)}
                      className="w-5 h-5 rounded-[3px] border-[#bcbcbc]" 
                    />
                    <label htmlFor="keep-copy" className="text-black">keep a copy and move</label>
                  </div>
                  <div className="flex items-center gap-2 text-[15px] font-['Montserrat']">
                    <input 
                      type="checkbox" 
                      id="move-to-eyx" 
                      checked={moveToEyx}
                      onChange={(e) => setMoveToEyx(e.target.checked)}
                      className="w-5 h-5 rounded-[3px] border-[#bcbcbc]" 
                    />
                    <label htmlFor="move-to-eyx" className="text-black">move to eyx</label>
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
          <div className="bg-white rounded-xl shadow-2xl max-w-6xl w-full mx-4 overflow-hidden max-h-screen overflow-y-auto">
            
            {/* Modal Header */}
            <div className="relative p-6 border-b border-gray-200">
              <h2 className="text-xl font-bold text-gray-900 font-['Montserrat']">Edit now</h2>
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
                <table className="w-full border border-gray-300 rounded-lg font-['Montserrat']">
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
                        <span className={`${getStatusStyle(editingItem.status)} text-[15px] font-['Montserrat']`}>
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
                <label className="block text-lg font-bold text-gray-900 mb-4 font-['Montserrat']">
                  Type new details
                </label>
                <textarea
                  value={newDetails}
                  onChange={(e) => setNewDetails(e.target.value)}
                  className="w-full h-32 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none font-['Montserrat']"
                  placeholder="Enter new details..."
                />
              </div>

              {/* Action Buttons */}
              <div className="flex gap-4 justify-center">
                <button
                  onClick={handleSaveEdit}
                  className="bg-black hover:bg-gray-800 text-white font-['Montserrat'] font-medium py-3 px-8 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
                >
                  save
                </button>
                <button
                  onClick={handleCloseEdit}
                  className="bg-gray-100 hover:bg-gray-200 text-gray-700 font-['Montserrat'] font-medium py-3 px-8 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-gray-300 focus:ring-offset-2"
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
              <h2 className="text-lg font-bold text-black mb-8 leading-tight font-['Montserrat']">
                Item Details updated successfully!
              </h2>

              {/* Done Button */}
              <button
                onClick={handleCloseSuccess}
                className="bg-black hover:bg-gray-800 text-white font-['Montserrat'] font-semibold py-3 px-8 rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 min-w-[120px]"
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

ManageItems.displayName = 'ManageItems';

export default ManageItems;
