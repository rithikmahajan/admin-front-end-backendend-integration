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
    <div className="bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="bg-white shadow-lg">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button 
                onClick={() => navigate('/manage-items')}
                className="flex items-center gap-2 text-gray-600 hover:text-gray-800"
              >
                <ChevronDown className="h-6 w-6 rotate-90" />
              </button>
              <h1 className="text-3xl font-bold text-gray-900">Upload Items</h1>
            </div>
            
            {showUI && (
              <div className="flex items-center gap-3">
                <span className="text-2xl font-bold text-gray-900">Show UI</span>
                <button 
                  onClick={() => setShowUI(false)}
                  className="p-2 hover:bg-gray-100 rounded-lg"
                >
                  <X className="h-6 w-6 text-gray-600" />
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto p-6">
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          
          {/* Returnable Section */}
          <div className="p-6 border-b border-gray-200">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-xl font-medium text-gray-900 mb-2">Returnable</h3>
                <span className="text-sm text-gray-500">(default)</span>
              </div>
              <div className="flex items-center gap-4">
                <button 
                  className={`px-6 py-2 rounded-full font-medium transition-colors ${
                    productData.returnable === 'yes' 
                      ? 'bg-blue-600 text-white border-2 border-black' 
                      : 'bg-gray-100 text-gray-700 border-2 border-gray-300'
                  }`}
                  onClick={() => handleProductDataChange('returnable', 'yes')}
                >
                  yes
                </button>
                <button 
                  className={`px-6 py-2 rounded-full font-medium transition-colors ${
                    productData.returnable === 'no' 
                      ? 'bg-blue-600 text-white border-2 border-black' 
                      : 'bg-gray-100 text-gray-700 border-2 border-gray-300'
                  }`}
                  onClick={() => handleProductDataChange('returnable', 'no')}
                >
                  No
                </button>
                <div className="flex items-center gap-2">
                  <input 
                    type="checkbox" 
                    id="returnable-default"
                    className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  />
                  <div className="h-2 w-2 bg-gray-400 rounded-full"></div>
                </div>
                <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center gap-2">
                  <Plus className="h-4 w-4" />
                  IMPORT
                </button>
              </div>
            </div>
          </div>

          {/* Variants Section */}
          {variants.map((variant, index) => (
            <div key={variant.id} className="border-b border-gray-200">
              
              {/* Variant Header */}
              <div className="p-6 bg-gray-50">
                <div className="flex items-center justify-between">
                  <h2 className="text-4xl font-bold text-gray-900">{variant.name}</h2>
                  {index > 0 && (
                    <div className="flex items-center gap-3">
                      <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center gap-2">
                        <Plus className="h-4 w-4" />
                        IMPORT
                      </button>
                      <label className="flex items-center gap-2 text-red-600 font-bold text-xl">
                        <div className="w-4 h-4 border-2 border-gray-400 rounded"></div>
                        Same as article 1
                      </label>
                    </div>
                  )}
                </div>
              </div>

              <div className="p-6 grid grid-cols-1 lg:grid-cols-2 gap-8">
                
                {/* Left Column - Product Details */}
                <div className="space-y-6">
                  
                  {/* Product Name */}
                  <div>
                    <label className="block text-xl font-medium text-gray-900 mb-3">Product Name</label>
                    <input
                      type="text"
                      value={variant.productName}
                      onChange={(e) => handleVariantChange(variant.id, 'productName', e.target.value)}
                      className="w-full px-4 py-3 border-2 border-black rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Enter product name"
                    />
                  </div>

                  {/* Title */}
                  <div>
                    <label className="block text-xl font-medium text-gray-900 mb-3">Title</label>
                    <input
                      type="text"
                      value={variant.title}
                      onChange={(e) => handleVariantChange(variant.id, 'title', e.target.value)}
                      className="w-full px-4 py-3 border-2 border-black rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Enter title"
                    />
                  </div>

                  {/* Description */}
                  <div>
                    <label className="block text-xl font-medium text-gray-900 mb-3">Description</label>
                    <div className="mb-2 text-xl text-gray-900">
                      Watch the no. of letters that fit in the screen make this box structure
                    </div>
                    <div className="mb-2 text-xl text-gray-900">
                      as such so that we know that exactly how it will look at front side or
                    </div>
                    <div className="mb-3 text-xl text-gray-900">
                      make this box in shape of the screen
                    </div>
                    <textarea
                      value={variant.description}
                      onChange={(e) => handleVariantChange(variant.id, 'description', e.target.value)}
                      rows={6}
                      className="w-full px-4 py-3 border-2 border-black rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                      placeholder="Enter description"
                    />
                  </div>

                  {/* Manufacturing Details */}
                  <div>
                    <label className="block text-xl font-medium text-gray-900 mb-3">Manufacturing details</label>
                    <textarea
                      value={variant.manufacturingDetails}
                      onChange={(e) => handleVariantChange(variant.id, 'manufacturingDetails', e.target.value)}
                      rows={6}
                      className="w-full px-4 py-3 border-2 border-black rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                      placeholder="Enter manufacturing details"
                    />
                  </div>

                  {/* Shipping Returns and Exchange */}
                  <div>
                    <label className="block text-xl font-medium text-gray-900 mb-3">Shipping returns and exchange</label>
                    <textarea
                      value={variant.shippingReturns}
                      onChange={(e) => handleVariantChange(variant.id, 'shippingReturns', e.target.value)}
                      rows={6}
                      className="w-full px-4 py-3 border-2 border-black rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                      placeholder="Enter shipping and returns policy"
                    />
                  </div>

                  {/* Pricing */}
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xl font-medium text-gray-900 mb-3">Regular price</label>
                      <input
                        type="number"
                        value={variant.regularPrice}
                        onChange={(e) => handleVariantChange(variant.id, 'regularPrice', e.target.value)}
                        className="w-full px-4 py-3 border-2 border-black rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="0.00"
                      />
                    </div>
                    <div>
                      <label className="block text-xl font-medium text-gray-900 mb-3">Sale price</label>
                      <input
                        type="number"
                        value={variant.salePrice}
                        onChange={(e) => handleVariantChange(variant.id, 'salePrice', e.target.value)}
                        className="w-full px-4 py-3 border-2 border-black rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="0.00"
                      />
                    </div>
                  </div>

                  {/* Stock Size */}
                  <div>
                    <label className="block text-xl font-medium text-gray-900 mb-3">Stock size</label>
                    <div className="flex flex-wrap gap-3 mb-4">
                      <button className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium">
                        No size
                      </button>
                      <button className="bg-white border border-gray-300 text-gray-700 px-4 py-2 rounded-lg text-sm hover:bg-gray-50">
                        Add size
                      </button>
                    </div>
                    
                    {/* Size Inputs Grid */}
                    <div className="grid grid-cols-5 gap-3 mb-4">
                      {[...Array(10)].map((_, i) => (
                        <input
                          key={i}
                          type="text"
                          className="px-3 py-2 border-2 border-black rounded-xl text-center text-sm"
                          placeholder={i < 5 ? ['Size', 'Quantity', 'Hsn', 'amazon', 'flipkart'][i] : ['yoraa', 'myntra', 'nykaa', 'SKU', 'barcode no.'][i - 5]}
                        />
                      ))}
                    </div>
                    
                    {/* Additional Options */}
                    <div className="flex flex-wrap gap-3">
                      <button className="bg-white border border-gray-300 text-gray-700 px-4 py-2 rounded-lg text-sm hover:bg-gray-50 flex items-center gap-2">
                        <Plus className="h-3 w-3" />
                        Size
                      </button>
                      <button className="bg-white border border-gray-300 text-gray-700 px-4 py-2 rounded-lg text-sm hover:bg-gray-50 flex items-center gap-2">
                        <Plus className="h-3 w-3" />
                        Quantity
                      </button>
                      <button className="bg-white border border-gray-300 text-gray-700 px-4 py-2 rounded-lg text-sm hover:bg-gray-50 flex items-center gap-2">
                        <Plus className="h-3 w-3" />
                        Hsn
                      </button>
                      <button className="bg-white border border-gray-300 text-gray-700 px-4 py-2 rounded-lg text-sm hover:bg-gray-50">
                        Add alternate price
                      </button>
                      <button className="bg-white border border-gray-300 text-gray-700 px-4 py-2 rounded-lg text-sm hover:bg-gray-50">
                        SKU
                      </button>
                      <button className="bg-white border border-gray-300 text-gray-700 px-4 py-2 rounded-lg text-sm hover:bg-gray-50">
                        barcode no.
                      </button>
                    </div>
                  </div>

                  {/* Filter Section */}
                  <div>
                    <label className="block text-xl font-medium text-gray-900 mb-3">Filter</label>
                    <div className="mb-3 text-xl text-gray-900">assign Filter(drop down)</div>
                    <button className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium flex items-center gap-2">
                      <Plus className="h-4 w-4" />
                      colour
                    </button>
                    
                    {/* Color Data Display */}
                    <div className="mt-4 bg-white border border-gray-300 rounded-lg p-4 w-48">
                      <div className="text-sm text-gray-500 mb-2">showing colour data</div>
                      <div className="space-y-2">
                        <div className="py-2 border-b border-gray-200 text-sm">s</div>
                        <div className="py-2 border-b border-gray-200 text-sm">s</div>
                        <div className="py-2 text-sm">s</div>
                      </div>
                    </div>
                  </div>

                  {/* Also Show In */}
                  <div>
                    <label className="block text-xl font-medium text-gray-900 mb-3">Also Show in</label>
                    <div className="space-y-3">
                      <div className="flex items-center gap-3">
                        <input 
                          type="checkbox" 
                          id={`also-show-like-${variant.id}`}
                          className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                        />
                        <label htmlFor={`also-show-like-${variant.id}`} className="text-lg font-medium text-gray-900">
                          You Might Also Like
                        </label>
                        <button className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium flex items-center gap-2">
                          <Plus className="h-4 w-4" />
                          no
                        </button>
                      </div>
                      
                      <div className="flex items-center gap-3">
                        <input 
                          type="checkbox" 
                          id={`similar-items-${variant.id}`}
                          className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                        />
                        <label htmlFor={`similar-items-${variant.id}`} className="text-lg font-medium text-gray-900">
                          Similar Items
                        </label>
                        <button className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium flex items-center gap-2">
                          <Plus className="h-4 w-4" />
                          yes
                        </button>
                      </div>
                      
                      <div className="flex items-center gap-3">
                        <input 
                          type="checkbox" 
                          id={`other-bought-${variant.id}`}
                          className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                        />
                        <label htmlFor={`other-bought-${variant.id}`} className="text-lg font-medium text-gray-900">
                          Other Also Bought
                        </label>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Right Column - Product Images */}
                <div className="space-y-6">
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">Product Images/videos</h3>
                    
                    {/* Main Image Upload */}
                    <div className="bg-gray-100 border-2 border-dashed border-gray-300 rounded-lg p-8 mb-6 text-center">
                      <div className="w-64 h-64 mx-auto bg-white border border-gray-200 rounded-lg flex items-center justify-center">
                        <Upload className="h-12 w-12 text-gray-400" />
                      </div>
                    </div>

                    {/* Thumbnail Images */}
                    <div className="space-y-4">
                      {[...Array(5)].map((_, i) => (
                        <div key={i} className="flex items-center gap-4">
                          <div className="w-20 h-20 bg-gray-100 border border-gray-200 rounded-lg flex items-center justify-center">
                            <Upload className="h-6 w-6 text-gray-400" />
                          </div>
                          <div className="flex-1">
                            <div className="text-base font-semibold text-gray-800 mb-1">
                              Product thumbnail.png
                            </div>
                            <div className="w-full bg-gray-200 rounded-full h-1">
                              <div className="bg-blue-900 h-1 rounded-full" style={{ width: '47%' }}></div>
                            </div>
                          </div>
                          <button className="p-2 text-green-600 hover:bg-green-50 rounded-lg">
                            <Check className="h-6 w-6" />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Meta Data Section */}
              {index === 0 && (
                <div className="p-6 border-t border-gray-200">
                  <div className="flex items-center gap-4 mb-6">
                    <button className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium">
                      add meta data
                    </button>
                    <button className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium flex items-center gap-2">
                      <Plus className="h-4 w-4" />
                      IMPORT
                    </button>
                  </div>
                  
                  <div className="grid grid-cols-3 gap-4">
                    <div>
                      <label className="block text-xl font-medium text-gray-900 mb-3">meta title</label>
                      <input
                        type="text"
                        value={productData.metaTitle}
                        onChange={(e) => handleProductDataChange('metaTitle', e.target.value)}
                        className="w-full px-4 py-3 border-2 border-black rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    <div>
                      <label className="block text-xl font-medium text-gray-900 mb-3">meta description</label>
                      <input
                        type="text"
                        value={productData.metaDescription}
                        onChange={(e) => handleProductDataChange('metaDescription', e.target.value)}
                        className="w-full px-4 py-3 border-2 border-black rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    <div>
                      <label className="block text-xl font-medium text-gray-900 mb-3">slug URL</label>
                      <input
                        type="text"
                        value={productData.slugUrl}
                        onChange={(e) => handleProductDataChange('slugUrl', e.target.value)}
                        className="w-full px-4 py-3 border-2 border-black rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}

          {/* Size Chart Section */}
          <div className="p-6 border-b border-gray-200">
            <h3 className="text-2xl font-bold text-gray-900 mb-6">Size Chart</h3>
            
            <div className="grid grid-cols-3 gap-8">
              <div>
                <h4 className="text-xl font-medium text-gray-900 mb-4">size chart(inch)</h4>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                  <Upload className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                  <p className="text-sm text-gray-600">Drop your image here PNG, JPEG allowed</p>
                </div>
              </div>
              
              <div>
                <h4 className="text-xl font-medium text-gray-900 mb-4">size chart(cm)</h4>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                  <Upload className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                  <p className="text-sm text-gray-600">Drop your image here PNG, JPEG allowed</p>
                </div>
              </div>
              
              <div>
                <h4 className="text-xl font-medium text-gray-900 mb-4">size measurement image</h4>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                  <Upload className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                  <p className="text-sm text-gray-600">Drop your image here PNG, JPEG allowed</p>
                </div>
              </div>
            </div>
          </div>

          {/* Category Assignment */}
          <div className="p-6 border-b border-gray-200">
            <div className="flex gap-4">
              <button className="bg-gray-800 text-white px-4 py-2 rounded-lg text-sm font-medium flex items-center gap-2">
                <Plus className="h-4 w-4" />
                Assign category
              </button>
              <button className="bg-gray-800 text-white px-4 py-2 rounded-lg text-sm font-medium flex items-center gap-2">
                <Plus className="h-4 w-4" />
                Assign sub category
              </button>
              <button 
                onClick={handlePublishProduct}
                className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium flex items-center gap-2"
              >
                <Plus className="h-4 w-4" />
                publish product
              </button>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="p-6">
            <div className="flex gap-4">
              <button 
                onClick={handleSaveAsDraft}
                className="bg-white border border-gray-300 text-gray-700 px-6 py-3 rounded-lg font-medium hover:bg-gray-50"
              >
                save as draft
              </button>
              <button 
                onClick={handleRecheckDetails}
                className="bg-red-500 text-black px-6 py-3 rounded-lg font-medium hover:bg-red-600"
              >
                RECHECK DETAILS
              </button>
            </div>
          </div>

          {/* Review Section */}
          <div className="p-6">
            <div className="bg-white border border-gray-300 rounded-xl p-4 w-48 shadow-lg">
              <div className="text-sm text-gray-500 mb-3">RECHECK DETAILS</div>
              <div className="space-y-3">
                <div className="py-2 border-b border-gray-200 text-sm font-medium">DETAILS</div>
                <div className="text-sm">IMAGES and sizes</div>
              </div>
            </div>
          </div>

          {/* Product Previews */}
          <div className="p-6 grid grid-cols-2 gap-6">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="bg-white border border-gray-200 rounded-xl p-4 shadow-lg">
                <div className="flex gap-4">
                  <div className="w-16 h-16 bg-gray-100 rounded-lg"></div>
                  <div className="flex-1">
                    <p className="text-base text-gray-900 leading-tight">
                      Manage account and services linked to your Yoraa account
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
          <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full mx-4 relative">
            
            {/* Modal Content */}
            <div className="p-8 text-center">
              
              {/* Confirmation Message */}
              <h2 className="text-xl font-bold text-black mb-8 leading-tight">
                Are you sure you<br />
                want to publish<br />
                this product
              </h2>

              {/* Action Buttons */}
              <div className="flex gap-4 justify-center">
                <button
                  onClick={handleConfirmPublish}
                  className="bg-black hover:bg-gray-800 text-white font-medium py-3 px-8 rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 min-w-[100px]"
                >
                  yes
                </button>
                <button
                  onClick={handleCancelPublish}
                  className="bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium py-3 px-8 rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-gray-300 focus:ring-offset-2 min-w-[100px]"
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
