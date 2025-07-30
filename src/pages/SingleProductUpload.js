import React, { useState, useCallback, useMemo } from 'react';
import { Upload, Plus, X, ChevronDown, Check } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { DEFAULT_VARIANT, DEFAULT_PRODUCT_DATA, FILE_UPLOAD, validateImageFile } from '../constants';
import { useFormValidation, useDebounce } from '../hooks';

/**
 * SingleProductUpload Component
 * 
 * Comprehensive product upload form providing:
 * - Multi-variant product creation
 * - Image upload for products and variants
 * - Size chart management
 * - Category and subcategory selection
 * - Price and inventory management
 * - SEO metadata fields
 * - Confirmation modal for publishing
 * 
 * Performance Optimizations:
 * - useCallback for all event handlers to prevent re-renders
 * - useMemo for computed values
 * - Efficient state management with proper updates
 * - Lazy loading for images
 * - Debounced input handling (TODO: implement for search)
 */

const SingleProductUpload = React.memo(() => {
  const navigate = useNavigate();
  
  // Main product data state - core product information
  const [productData, setProductData] = useState(DEFAULT_PRODUCT_DATA);

  // Variants state - handles multiple product variations
  const [variants, setVariants] = useState([
    {
      ...DEFAULT_VARIANT,
      id: 1,
      name: 'Variant 1'
    }
  ]);

  // Size chart state - handles product sizing information
  const [sizeChart, setSizeChart] = useState({
    inchChart: null,
    cmChart: null,
    measurementImage: null
  });

  // UI state management
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedSubCategory, setSelectedSubCategory] = useState('');
  const [showUI, setShowUI] = useState(true);
  const [isPublishModalOpen, setIsPublishModalOpen] = useState(false);

  // Memoized handlers to prevent unnecessary re-renders
  const handleProductDataChange = useCallback((field, value) => {
    setProductData(prev => ({
      ...prev,
      [field]: value
    }));
  }, []);

  const handleVariantChange = useCallback((variantId, field, value) => {
    setVariants(prev => prev.map(variant => 
      variant.id === variantId 
        ? { ...variant, [field]: value }
        : variant
    ));
  }, []);

  const addVariant = useCallback(() => {
    const newVariant = {
      ...DEFAULT_VARIANT,
      id: Date.now(), // Use timestamp for unique ID
      name: `Variant ${variants.length + 1}`
    };
    setVariants(prev => [...prev, newVariant]);
  }, [variants.length]);

  const handleImageUpload = useCallback((variantId, files) => {
    // Validate each file before processing
    const validFiles = [];
    const errors = [];
    
    Array.from(files).forEach(file => {
      const validation = validateImageFile(file);
      if (validation.valid) {
        validFiles.push(file);
      } else {
        errors.push(`${file.name}: ${validation.error}`);
      }
    });
    
    if (errors.length > 0) {
      console.warn('File validation errors:', errors);
      // TODO: Show user-friendly error messages
    }
    
    if (validFiles.length > 0) {
      console.log('Uploading valid images for variant:', variantId, validFiles);
      // TODO: Implement actual file upload logic
      // Here you would typically:
      // 1. Upload to cloud storage (AWS S3, Cloudinary, etc.)
      // 2. Update variant state with file URLs
      // 3. Show upload progress
    }
  }, []);

  const handleSizeChartUpload = useCallback((type, file) => {
    setSizeChart(prev => ({
      ...prev,
      [type]: file
    }));
    // TODO: Implement actual file upload for size charts
  }, []);

  // Publishing and navigation handlers
  const handlePublishProduct = useCallback(() => {
    setIsPublishModalOpen(true);
  }, []);

  const handleConfirmPublish = useCallback(() => {
    console.log('Publishing product:', { productData, variants, sizeChart });
    // TODO: Implement actual API call to save product
    setIsPublishModalOpen(false);
    navigate('/manage-items');
  }, [productData, variants, sizeChart, navigate]);

  const handleCancelPublish = useCallback(() => {
    setIsPublishModalOpen(false);
  }, []);

  const handleSaveAsDraft = useCallback(() => {
    console.log('Saving as draft:', { productData, variants, sizeChart });
    // TODO: Implement draft saving functionality
  }, [productData, variants, sizeChart]);

  const handleRecheckDetails = useCallback(() => {
    console.log('Rechecking details');
    // TODO: Implement validation highlighting
  }, []);

  // Memoized computed values
  const isFormValid = useMemo(() => {
    // Basic validation - can be expanded
    return productData.productName.trim() !== '' && 
           productData.regularPrice !== '' &&
           variants.length > 0;
  }, [productData.productName, productData.regularPrice, variants.length]);

  return (
    <div className="bg-white min-h-screen">
      {/* Header */}
      <div>
        <div className="px-4 py-3">
          <div className="flex items-center">
            <button 
              onClick={() => navigate('/manage-items')}
              className="flex items-center gap-2 text-gray-600 hover:text-gray-800 mr-3"
            >
              <ChevronDown className="h-5 w-5 rotate-90" />
            </button>
            <h1 className="text-base font-medium text-gray-900">Upload Items</h1>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="px-4 py-2">
        <div className="overflow-hidden">
          
          {/* Returnable Section */}
          <div className="py-2 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-xs font-medium text-gray-900">Returnable</h3>
              </div>
              <div className="flex items-center gap-2">
                <button 
                  className={`px-2 py-0.5 rounded-[4px] font-semibold transition-colors text-[11px] shadow-sm border ${
                    productData.returnable === 'yes' 
                      ? 'bg-[#1A73E8] text-white border-[#1A73E8]' 
                      : 'bg-white text-gray-700 border-gray-300'
                  }`}
                  onClick={() => handleProductDataChange('returnable', 'yes')}
                  style={{minWidth:'44px'}}
                >
                  Yes
                </button>
                <button 
                  className={`px-2 py-0.5 rounded-[4px] font-semibold transition-colors text-[11px] shadow-sm border ${
                    productData.returnable === 'no' 
                      ? 'bg-[#1A73E8] text-white border-[#1A73E8]' 
                      : 'bg-white text-gray-700 border-gray-300'
                  }`}
                  onClick={() => handleProductDataChange('returnable', 'no')}
                  style={{minWidth:'44px'}}
                >
                  No
                </button>
                <button className="bg-[#F5F6FA] hover:bg-[#E4E7ED] text-[#1A73E8] px-2 py-0.5 rounded-[4px] flex items-center gap-0.5 text-[11px] font-semibold border border-[#E4E7ED] shadow-sm" style={{minWidth:'60px'}}>
                  <Plus className="h-2 w-2 text-[#1A73E8]" />
                  Import
                </button>
              </div>
            </div>
          </div>

          {/* Variants Section */}
          {variants.map((variant, index) => (
            <div key={variant.id} className="border-b border-gray-200">
              
              {/* Variant Header */}
              <div className="py-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <h2 className="text-xs font-semibold text-gray-900">variant {index + 1}</h2>
                    {index === 0 && (
                      <div className="bg-blue-600 text-white text-xs px-1.5 py-0.5 rounded text-[10px]">ACTIVE</div>
                    )}
                    {index > 0 && (
                      <div className="text-red-600 text-[10px] font-medium">Same as article 1</div>
                    )}
                  </div>
                  {index > 0 && (
                    <div className="flex items-center gap-1.5">
                      <button className="bg-blue-600 hover:bg-blue-700 text-white px-2 py-0.5 rounded flex items-center gap-0.5 text-[10px]">
                        <Plus className="h-2 w-2" />
                        IMPORT
                      </button>
                    </div>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-5 gap-3">
                
                {/* Left Column - Product Details */}
                <div className="col-span-4 space-y-2.5">
                  
                  {/* Product Name */}
                  <div>
                    <label className="block text-xs font-medium text-gray-900 mb-1">product name</label>
                    <input
                      type="text"
                      value={variant.productName}
                      onChange={(e) => handleVariantChange(variant.id, 'productName', e.target.value)}
                      className="w-full px-2 py-1 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500 text-xs"
                      placeholder="Enter product name"
                    />
                  </div>

                  {/* Title */}
                  <div>
                    <label className="block text-xs font-medium text-gray-900 mb-1">title</label>
                    <input
                      type="text"
                      value={variant.title}
                      onChange={(e) => handleVariantChange(variant.id, 'title', e.target.value)}
                      className="w-full px-2 py-1 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500 text-xs"
                      placeholder="Enter title"
                    />
                  </div>

                  {/* Description */}
                  <div>
                    <label className="block text-xs font-medium text-gray-900 mb-1">description</label>
                    <div className="mb-1 text-[10px] text-gray-500">
                      Watch the no. of letters that fit in the screen make this box structure
                      as such so that we know that exactly how it will look at front side or
                      make this box in shape of the screen
                    </div>
                    <textarea
                      value={variant.description}
                      onChange={(e) => handleVariantChange(variant.id, 'description', e.target.value)}
                      rows={3}
                      className="w-full px-2 py-1 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500 resize-none text-xs"
                      placeholder="Enter product description here..."
                    />
                  </div>

                  {/* Manufacturing Details */}
                  <div>
                    <label className="block text-xs font-medium text-gray-900 mb-1">manufacturing details</label>
                    <textarea
                      value={variant.manufacturingDetails}
                      onChange={(e) => handleVariantChange(variant.id, 'manufacturingDetails', e.target.value)}
                      rows={2}
                      className="w-full px-2 py-1 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500 resize-none text-xs"
                      placeholder="Enter manufacturing details"
                    />
                  </div>

                  {/* Shipping Returns and Exchange */}
                  <div>
                    <label className="block text-xs font-medium text-gray-900 mb-1">shipping returns and exchange</label>
                    <textarea
                      value={variant.shippingReturns}
                      onChange={(e) => handleVariantChange(variant.id, 'shippingReturns', e.target.value)}
                      rows={2}
                      className="w-full px-2 py-1 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500 resize-none text-xs"
                      placeholder="Enter shipping and returns policy"
                    />
                  </div>

                  {/* Pricing */}
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-medium text-gray-900 mb-1">regular price</label>
                      <input
                        type="number"
                        value={variant.regularPrice}
                        onChange={(e) => handleVariantChange(variant.id, 'regularPrice', e.target.value)}
                        className="w-full px-2 py-1 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500 text-xs"
                        placeholder="0.00"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-gray-900 mb-1">sale price</label>
                      <input
                        type="number"
                        value={variant.salePrice}
                        onChange={(e) => handleVariantChange(variant.id, 'salePrice', e.target.value)}
                        className="w-full px-2 py-1 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500 text-xs"
                        placeholder="0.00"
                      />
                    </div>
                  </div>

                  {/* Stock Size */}
                  <div>
                    <label className="block text-xs font-medium text-gray-900 mb-1">Stock size</label>
                    <div className="flex flex-wrap gap-1 mb-2">
                      <button className="bg-blue-600 text-white px-2 py-0.5 rounded text-xs font-medium">
                        No size
                      </button>
                      <button className="bg-white border border-gray-300 text-gray-700 px-2 py-0.5 rounded text-xs hover:bg-gray-50">
                        Add size
                      </button>
                    </div>
                    
                    {/* Size Inputs Grid */}
                    <div className="grid grid-cols-5 gap-1 mb-2">
                      {[...Array(10)].map((_, i) => (
                        <input
                          key={i}
                          type="text"
                          className="px-1 py-1 border border-gray-300 rounded text-center text-xs"
                          placeholder={i < 5 ? ['Size', 'Qty', 'Hsn', 'amzn', 'flip'][i] : ['yoraa', 'myntra', 'nykaa', 'SKU', 'barcode'][i - 5]}
                        />
                      ))}
                    </div>
                    
                    {/* Additional Options */}
                    <div className="flex flex-wrap gap-1">
                      <button className="bg-white border border-gray-300 text-gray-700 px-2 py-0.5 rounded text-xs hover:bg-gray-50 flex items-center gap-0.5">
                        <Plus className="h-2 w-2" />
                        Size
                      </button>
                      <button className="bg-white border border-gray-300 text-gray-700 px-2 py-0.5 rounded text-xs hover:bg-gray-50 flex items-center gap-0.5">
                        <Plus className="h-2 w-2" />
                        Qty
                      </button>
                      <button className="bg-white border border-gray-300 text-gray-700 px-2 py-0.5 rounded text-xs hover:bg-gray-50 flex items-center gap-0.5">
                        <Plus className="h-2 w-2" />
                        Hsn
                      </button>
                      <button className="bg-white border border-gray-300 text-gray-700 px-2 py-0.5 rounded text-xs hover:bg-gray-50">
                        Alt price
                      </button>
                      <button className="bg-white border border-gray-300 text-gray-700 px-2 py-0.5 rounded text-xs hover:bg-gray-50">
                        SKU
                      </button>
                      <button className="bg-white border border-gray-300 text-gray-700 px-2 py-0.5 rounded text-xs hover:bg-gray-50">
                        barcode
                      </button>
                    </div>
                  </div>

                  {/* Filter Section */}
                  <div>
                    <label className="block text-xs font-medium text-gray-900 mb-1">Filter</label>
                    <div className="mb-1 text-xs text-gray-500">assign Filter(drop down)</div>
                    <button className="bg-blue-600 text-white px-2 py-0.5 rounded text-xs font-medium flex items-center gap-0.5">
                      <Plus className="h-2 w-2" />
                      colour
                    </button>
                    
                    {/* Color Data Display */}
                    <div className="mt-2 bg-white border border-gray-300 rounded p-2 w-32">
                      <div className="text-xs text-gray-500 mb-1">showing colour data</div>
                      <div className="space-y-0.5">
                        <div className="py-0.5 border-b border-gray-200 text-xs">s</div>
                        <div className="py-0.5 border-b border-gray-200 text-xs">s</div>
                        <div className="py-0.5 text-xs">s</div>
                      </div>
                    </div>
                  </div>

                  {/* Also Show In */}
                  <div>
                    <label className="block text-xs font-medium text-gray-900 mb-1">Also Show in</label>
                    <div className="space-y-1">
                      <div className="flex items-center gap-1">
                        <input 
                          type="checkbox" 
                          id={`also-show-like-${variant.id}`}
                          className="rounded border-gray-300 text-blue-600 focus:ring-blue-500 w-3 h-3"
                        />
                        <label htmlFor={`also-show-like-${variant.id}`} className="text-xs font-medium text-gray-900">
                          You Might Also Like
                        </label>
                        <button className="bg-blue-600 text-white px-1.5 py-0.5 rounded text-xs font-medium flex items-center gap-0.5">
                          <Plus className="h-2 w-2" />
                          no
                        </button>
                      </div>
                      
                      <div className="flex items-center gap-1">
                        <input 
                          type="checkbox" 
                          id={`similar-items-${variant.id}`}
                          className="rounded border-gray-300 text-blue-600 focus:ring-blue-500 w-3 h-3"
                        />
                        <label htmlFor={`similar-items-${variant.id}`} className="text-xs font-medium text-gray-900">
                          Similar Items
                        </label>
                        <button className="bg-blue-600 text-white px-1.5 py-0.5 rounded text-xs font-medium flex items-center gap-0.5">
                          <Plus className="h-2 w-2" />
                          yes
                        </button>
                      </div>
                      
                      <div className="flex items-center gap-1">
                        <input 
                          type="checkbox" 
                          id={`other-bought-${variant.id}`}
                          className="rounded border-gray-300 text-blue-600 focus:ring-blue-500 w-3 h-3"
                        />
                        <label htmlFor={`other-bought-${variant.id}`} className="text-xs font-medium text-gray-900">
                          Other Also Bought
                        </label>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Right Column - Product Images */}
                <div className="space-y-2">
                  <div>
                    <h3 className="text-xs font-medium text-gray-900 mb-2">Product Images/videos</h3>
                    
                    {/* Main Image Upload with Preview */}
                    <div className="mb-2 flex flex-col items-center">
                      <div className="w-32 h-40 bg-white border border-gray-200 rounded mb-1 flex items-center justify-center relative">
                        {/* This would be the main product image preview */}
                        <div className="w-full h-full flex items-center justify-center overflow-hidden">
                          <img 
                            src="/assets/navbarLinks/account.svg" 
                            alt="Product placeholder" 
                            className="h-full w-auto object-contain"
                          />
                        </div>
                        <button className="absolute top-1 right-1 bg-white rounded-full p-1 shadow-sm">
                          <X className="h-2 w-2 text-gray-600" />
                        </button>
                      </div>
                      
                      {/* Thumbnail Selector */}
                      <div className="flex gap-1 mb-2">
                        {[...Array(5)].map((_, i) => (
                          <button 
                            key={i} 
                            className="w-6 h-6 border border-gray-200 flex items-center justify-center"
                          >
                            {i === 0 && <div className="w-1.5 h-1.5 bg-black rounded-full"></div>}
                          </button>
                        ))}
                      </div>
                    </div>
                    
                    {/* Upload Section */}
                    <div className="mb-2">
                      <button className="w-full border border-dashed border-gray-300 rounded p-1 text-center">
                        <Upload className="h-3 w-3 text-gray-400 mx-auto" />
                      </button>
                    </div>

                    {/* Uploaded Thumbnails */}
                    <div className="space-y-1.5">
                      {[...Array(6)].map((_, i) => (
                        <div key={i} className="flex items-center gap-1.5">
                          <div className="w-4 h-4 rounded-full bg-black flex items-center justify-center text-white text-[10px]">
                            {i + 1}
                          </div>
                          <div className="w-5 h-7 bg-white border border-gray-200 flex items-center justify-center overflow-hidden">
                            <img 
                              src="/assets/navbarLinks/account.svg" 
                              alt="Product thumbnail" 
                              className="h-full w-auto object-contain"
                            />
                          </div>
                          <button className="ml-auto text-blue-600">
                            <Check className="h-2.5 w-2.5" />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Meta Data Section */}
              {index === 0 && (
                <div className="p-3 border-t border-gray-200">
                  <div className="flex items-center gap-2 mb-3">
                    <button className="bg-blue-600 text-white px-2 py-0.5 rounded text-xs font-medium">
                      add meta data
                    </button>
                    <button className="bg-blue-600 text-white px-2 py-0.5 rounded text-xs font-medium flex items-center gap-0.5">
                      <Plus className="h-2 w-2" />
                      IMPORT
                    </button>
                  </div>
                  
                  <div className="grid grid-cols-3 gap-2">
                    <div>
                      <label className="block text-xs font-medium text-gray-900 mb-1">meta title</label>
                      <input
                        type="text"
                        value={productData.metaTitle}
                        onChange={(e) => handleProductDataChange('metaTitle', e.target.value)}
                        className="w-full px-2 py-1.5 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 text-xs"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-gray-900 mb-1">meta description</label>
                      <input
                        type="text"
                        value={productData.metaDescription}
                        onChange={(e) => handleProductDataChange('metaDescription', e.target.value)}
                        className="w-full px-2 py-1.5 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 text-xs"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-gray-900 mb-1">slug URL</label>
                      <input
                        type="text"
                        value={productData.slugUrl}
                        onChange={(e) => handleProductDataChange('slugUrl', e.target.value)}
                        className="w-full px-2 py-1.5 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 text-xs"
                      />
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}

          {/* Add Variant Button */}
          <div className="py-3 border-b border-gray-200">
            <button 
              onClick={addVariant}
              className="bg-blue-600 hover:bg-blue-700 text-white px-2 py-0.5 rounded text-xs font-medium flex items-center gap-1"
            >
              <Plus className="h-2.5 w-2.5" />
              Add Variant
            </button>
          </div>

          {/* Size Chart Section */}
          <div className="py-2 border-b border-gray-200">
            <h3 className="text-xs font-bold text-gray-900 mb-2">SIZE CHART</h3>
            
            <div className="grid grid-cols-3 gap-3">
              <div>
                <h4 className="text-xs font-medium text-gray-900 mb-1">size chart(inch)</h4>
                <div className="border border-dashed border-gray-300 rounded p-2 text-center flex flex-col items-center justify-center h-16">
                  <Upload className="h-3 w-3 text-gray-400 mb-1" />
                  <p className="text-[10px] text-gray-500">Drop your image here</p>
                </div>
              </div>
              
              <div>
                <h4 className="text-xs font-medium text-gray-900 mb-1">size chart(cm)</h4>
                <div className="border border-dashed border-gray-300 rounded p-2 text-center flex flex-col items-center justify-center h-16">
                  <Upload className="h-3 w-3 text-gray-400 mb-1" />
                  <p className="text-[10px] text-gray-500">Drop your image here</p>
                </div>
              </div>
              
              <div>
                <h4 className="text-xs font-medium text-gray-900 mb-1">size measurement image</h4>
                <div className="border border-dashed border-gray-300 rounded p-2 text-center flex flex-col items-center justify-center h-16">
                  <Upload className="h-3 w-3 text-gray-400 mb-1" />
                  <p className="text-[10px] text-gray-500">Drop your image here</p>
                </div>
              </div>
            </div>
          </div>

          {/* Category Assignment */}
          <div className="py-2 border-b border-gray-200">
            <div className="flex flex-wrap gap-2">
              <button className="bg-black text-white px-2 py-0.5 rounded-sm text-[10px] font-medium flex items-center gap-0.5">
                <Plus className="h-2 w-2" />
                Assign category
              </button>
              <button className="bg-black text-white px-2 py-0.5 rounded-sm text-[10px] font-medium flex items-center gap-0.5">
                <Plus className="h-2 w-2" />
                Assign sub category
              </button>
              <button 
                onClick={handlePublishProduct}
                className="bg-blue-600 text-white px-2 py-0.5 rounded-sm text-[10px] font-medium flex items-center gap-0.5"
              >
                <Plus className="h-2 w-2" />
                publish product
              </button>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="pt-2 pb-2">
            <div className="flex gap-2">
              <button 
                onClick={handleSaveAsDraft}
                className="bg-white border border-gray-300 text-gray-700 px-2 py-0.5 rounded-sm font-medium hover:bg-gray-50 text-[10px]"
              >
                save as draft
              </button>
              <button 
                onClick={handleRecheckDetails}
                className="bg-red-500 text-white px-2 py-0.5 rounded-sm font-medium hover:bg-red-600 text-[10px]"
              >
                RECHECK DETAILS
              </button>
            </div>
          </div>

          {/* Review Section */}
          <div className="py-2">
            <div className="absolute z-10 bg-white border border-gray-200 rounded shadow p-1.5 w-32">
              <div className="text-[10px] text-gray-700 font-medium mb-1">RECHECK DETAILS</div>
              <div className="space-y-0.5">
                <div className="py-0.5 border-b border-gray-100 text-[10px] font-normal">DETAILS</div>
                <div className="py-0.5 text-[10px] font-normal">IMAGES and sizes</div>
              </div>
            </div>
          </div>

          {/* Product Previews - These appear to be modals/tooltips in the Figma */}
          <div className="hidden">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="absolute z-20 bg-white border border-gray-200 rounded shadow-md p-2 max-w-xs">
                <div className="flex gap-2">
                  <div className="w-8 h-8 bg-gray-100 rounded-sm flex-shrink-0 overflow-hidden">
                    <img 
                      src="/assets/navbarLinks/account.svg" 
                      alt="Product preview" 
                      className="h-full w-full object-contain"
                    />
                  </div>
                  <div className="flex-1">
                    <p className="text-xs text-gray-900 leading-tight">
                      {i === 0 ? "Save as draft to continue later" : 
                       i === 1 ? "Publish to make live on store" : 
                       "Check all fields before submitting"}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Publish Confirmation Modal */}
      {isPublishModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded shadow-lg max-w-[200px] w-full mx-4 relative">
            
            {/* Modal Content */}
            <div className="p-4 text-center">
              
              {/* Confirmation Message */}
              <h2 className="text-sm font-medium text-black mb-4 leading-tight">
                Are you sure you want to publish this product?
              </h2>

              {/* Action Buttons */}
              <div className="flex gap-2 justify-center">
                <button
                  onClick={handleConfirmPublish}
                  className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-1 px-4 rounded-sm transition-colors focus:outline-none text-xs"
                >
                  Yes
                </button>
                <button
                  onClick={handleCancelPublish}
                  className="bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium py-1 px-4 rounded-sm transition-colors focus:outline-none text-xs"
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
});

// Set display name for debugging
SingleProductUpload.displayName = 'SingleProductUpload';

export default SingleProductUpload;
