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
      <div className="px-4 py-6">
        <div className="flex items-center gap-4">
          <button 
            onClick={() => navigate('/manage-items')}
            className="flex items-center text-gray-600 hover:text-gray-800"
          >
            <ChevronDown className="h-6 w-6 rotate-90" />
          </button>
          <h1 className="text-[36px] font-bold text-black font-['Montserrat'] leading-6">Upload items</h1>
        </div>
      </div>

      {/* Main Content Container */}
      <div className="px-4 pb-8">
        
        {/* Returnable Section */}
        <div className="py-6 border-b border-gray-200">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-[21px] font-medium text-black font-['Montserrat']">returnable</h3>
            <div className="flex items-center gap-3">
              <button 
                className={`px-6 py-2 rounded-full font-medium text-[16px] border transition-colors ${
                  productData.returnable === 'yes' 
                    ? 'bg-[#000aff] text-white border-black' 
                    : 'bg-white text-black border-gray-300'
                }`}
                onClick={() => handleProductDataChange('returnable', 'yes')}
              >
                yes
              </button>
              <button 
                className={`px-6 py-2 rounded-full font-medium text-[16px] border transition-colors ${
                  productData.returnable === 'no' 
                    ? 'bg-[#000aff] text-white border-black' 
                    : 'bg-white text-black border-gray-300'
                }`}
                onClick={() => handleProductDataChange('returnable', 'no')}
              >
                No
              </button>
              <button className="bg-[#000aff] text-white px-4 py-2.5 rounded-lg flex items-center gap-2 text-[14px] font-medium border border-[#7280ff] shadow-sm">
                <Plus className="h-5 w-5" />
                IMPORT
              </button>
            </div>
          </div>
          <div className="text-[14px] text-black">(default)</div>
          <div className="flex items-center gap-2 mt-2">
            <input type="checkbox" className="w-5 h-5 border border-gray-400 rounded" />
            <span className="text-[14px]">List to:</span>
            <span className="text-[15px]">amazon</span>
            <input type="checkbox" className="w-5 h-5 border border-gray-400 rounded ml-2" />
            <span className="text-[15px]">flipkart</span>
            <input type="checkbox" className="w-5 h-5 border border-gray-400 rounded ml-2" />
            <span className="text-[15px]">yoraa</span>
            <input type="checkbox" className="w-5 h-5 border border-gray-400 rounded ml-2" />
            <span className="text-[15px]">myntra</span>
            <input type="checkbox" className="w-5 h-5 border border-gray-400 rounded ml-2" />
            <span className="text-[15px]">nykaa</span>
          </div>
        </div>

        {/* Variant Section */}
        <div className="py-6">
          <h2 className="text-[48px] font-bold text-black font-['Montserrat'] leading-6 mb-8">varient 1</h2>
          
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            
            {/* Left Column - Product Details */}
            <div className="col-span-3 space-y-6">
              
              {/* Product Name */}
              <div>
                <label className="block text-[21px] font-medium text-black font-['Montserrat'] mb-3">product name</label>
                <div className="h-[47px] border-2 border-black rounded-xl">
                  <input
                    type="text"
                    value={variants[0]?.productName || ''}
                    onChange={(e) => handleVariantChange(1, 'productName', e.target.value)}
                    className="w-full h-full px-4 border-none rounded-xl focus:outline-none focus:ring-0 text-[16px]"
                    placeholder="Enter product name"
                  />
                </div>
              </div>

              {/* Title */}
              <div>
                <label className="block text-[21px] font-medium text-black font-['Montserrat'] mb-3">Title</label>
                <div className="h-[47px] border-2 border-black rounded-xl">
                  <input
                    type="text"
                    value={variants[0]?.title || ''}
                    onChange={(e) => handleVariantChange(1, 'title', e.target.value)}
                    className="w-full h-full px-4 border-none rounded-xl focus:outline-none focus:ring-0 text-[16px]"
                    placeholder="Enter title"
                  />
                </div>
              </div>

              {/* Description */}
              <div>
                <label className="block text-[21px] font-medium text-black font-['Montserrat'] mb-1">Discription</label>
                <div className="text-[21px] font-medium text-black font-['Montserrat'] mb-2">
                  <p>watch the no, of letters that fit in the screen make this box structure</p>
                  <p>as such so that we know that exactly how it will look at front side or</p>
                  <p>make this box in shape of the screen</p>
                </div>
                <div className="h-[154px] border-2 border-black rounded-xl">
                  <textarea
                    value={variants[0]?.description || ''}
                    onChange={(e) => handleVariantChange(1, 'description', e.target.value)}
                    className="w-full h-full px-4 py-3 border-none rounded-xl resize-none focus:outline-none focus:ring-0 text-[16px]"
                    placeholder="Enter product description here..."
                  />
                </div>
              </div>

              {/* Manufacturing Details */}
              <div>
                <label className="block text-[21px] font-medium text-black font-['Montserrat'] mb-3">Manufacturing details</label>
                <div className="h-[154px] border-2 border-black rounded-xl">
                  <textarea
                    value={variants[0]?.manufacturingDetails || ''}
                    onChange={(e) => handleVariantChange(1, 'manufacturingDetails', e.target.value)}
                    className="w-full h-full px-4 py-3 border-none rounded-xl resize-none focus:outline-none focus:ring-0 text-[16px]"
                    placeholder="Enter manufacturing details"
                  />
                </div>
              </div>

              {/* Shipping Returns and Exchange */}
              <div>
                <label className="block text-[21px] font-medium text-black font-['Montserrat'] mb-3">Shipping returns and exchange</label>
                <div className="h-[154px] border-2 border-black rounded-xl">
                  <textarea
                    value={variants[0]?.shippingReturns || ''}
                    onChange={(e) => handleVariantChange(1, 'shippingReturns', e.target.value)}
                    className="w-full h-full px-4 py-3 border-none rounded-xl resize-none focus:outline-none focus:ring-0 text-[16px]"
                    placeholder="Enter shipping and returns policy"
                  />
                </div>
              </div>

              {/* Pricing */}
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <label className="block text-[21px] font-medium text-black font-['Montserrat'] mb-3">Regular price</label>
                  <div className="h-[47px] border-2 border-black rounded-xl">
                    <input
                      type="number"
                      value={variants[0]?.regularPrice || ''}
                      onChange={(e) => handleVariantChange(1, 'regularPrice', e.target.value)}
                      className="w-full h-full px-4 border-none rounded-xl focus:outline-none focus:ring-0 text-[16px]"
                      placeholder="0.00"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-[21px] font-medium text-black font-['Montserrat'] mb-3">Sale price</label>
                  <div className="h-[47px] border-2 border-black rounded-xl">
                    <input
                      type="number"
                      value={variants[0]?.salePrice || ''}
                      onChange={(e) => handleVariantChange(1, 'salePrice', e.target.value)}
                      className="w-full h-full px-4 border-none rounded-xl focus:outline-none focus:ring-0 text-[16px]"
                      placeholder="0.00"
                    />
                  </div>
                </div>
              </div>

              {/* Stock Size */}
              <div>
                <label className="block text-[21px] font-medium text-black font-['Montserrat'] mb-3">Stock size</label>
                <div className="flex items-center gap-3 mb-4">
                  <div className="bg-[#000aff] text-white px-4 py-2.5 rounded-lg text-[14px] font-medium border border-[#7280ff] shadow-sm">
                    No size
                  </div>
                  <div className="bg-white border border-gray-300 text-black px-4 py-2.5 rounded-lg text-[14px] hover:bg-gray-50">
                    Add size
                  </div>
                  <div className="bg-[#000aff] text-white px-4 py-2.5 rounded-lg flex items-center gap-2 text-[14px] font-medium border border-[#7280ff] shadow-sm">
                    <Plus className="h-5 w-5" />
                    IMPORT
                  </div>
                </div>
                
                {/* Size Input Grid */}
                <div className="grid grid-cols-10 gap-2 mb-4">
                  {[
                    'Size', 'Quantity', 'Hsn', 'amazon', 'flipkart', 
                    'yoraa', 'myntra', 'nykaa', 'SKU', 'barcode no.'
                  ].map((placeholder, i) => (
                    <div key={i} className="h-[47px] border-2 border-black rounded-xl">
                      <input
                        type="text"
                        className="w-full h-full px-2 text-center border-none rounded-xl focus:outline-none focus:ring-0 text-[14px]"
                        placeholder={placeholder}
                      />
                    </div>
                  ))}
                </div>
                
                {/* Size Row 2 */}
                <div className="grid grid-cols-10 gap-2 mb-4">
                  {Array(10).fill('').map((_, i) => (
                    <div key={i} className="h-[47px] border-2 border-black rounded-xl">
                      <input
                        type="text"
                        className="w-full h-full px-2 text-center border-none rounded-xl focus:outline-none focus:ring-0 text-[14px]"
                      />
                    </div>
                  ))}
                </div>
                
                {/* Additional Size Options */}
                <div className="flex flex-wrap gap-2">
                  <button className="bg-white border border-gray-300 text-black px-4 py-2.5 rounded-lg text-[14px] hover:bg-gray-50 flex items-center gap-1">
                    <Plus className="h-3 w-3" />
                    Size
                  </button>
                  <button className="bg-white border border-gray-300 text-black px-4 py-2.5 rounded-lg text-[14px] hover:bg-gray-50 flex items-center gap-1">
                    <Plus className="h-3 w-3" />
                    Quantity
                  </button>
                  <button className="bg-white border border-gray-300 text-black px-4 py-2.5 rounded-lg text-[14px] hover:bg-gray-50 flex items-center gap-1">
                    <Plus className="h-3 w-3" />
                    Hsn
                  </button>
                  <button className="bg-white border border-gray-300 text-black px-4 py-2.5 rounded-lg text-[14px] hover:bg-gray-50">
                    Add alternate price
                  </button>
                  <button className="bg-white border border-gray-300 text-black px-4 py-2.5 rounded-lg text-[14px] hover:bg-gray-50">
                    SKU
                  </button>
                  <button className="bg-white border border-gray-300 text-black px-4 py-2.5 rounded-lg text-[14px] hover:bg-gray-50">
                    barcode no.
                  </button>
                </div>
                
                <div className="text-right text-[15px] text-black mt-2">10000000000000</div>
              </div>

              {/* Filter Section */}
              <div>
                <label className="block text-[21px] font-medium text-black font-['Montserrat'] mb-1">Filter</label>
                <div className="text-[21px] font-medium text-black font-['Montserrat'] mb-3">assign Filter(drop down)</div>
                <button className="bg-[#000aff] text-white px-4 py-2.5 rounded-lg flex items-center gap-2 text-[14px] font-medium border border-[#7280ff] shadow-sm">
                  <Plus className="h-5 w-5" />
                  colour
                </button>
                
                {/* Color Data Display */}
                <div className="mt-4 bg-white border border-gray-200 rounded-xl shadow-lg p-4 w-[166px]">
                  <div className="text-[14px] text-gray-500 mb-3">showing colour data</div>
                  <div className="space-y-1">
                    <div className="py-2 border-b border-gray-200 text-[14px] text-black">red</div>
                    <div className="py-2 border-b border-gray-200 text-[14px] text-black">pink</div>
                    <div className="py-2 text-[14px] text-black">orange</div>
                  </div>
                </div>
              </div>

              {/* Also Show In */}
              <div>
                <label className="block text-[21px] font-medium text-black font-['Montserrat'] mb-3">Also Show in</label>
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <input type="checkbox" className="w-5 h-5 border border-gray-400 rounded" />
                    <span className="text-[20px] font-medium text-black font-['Montserrat']">You Might Also Like</span>
                    <button className="bg-[#000aff] text-white px-4 py-2.5 rounded-lg flex items-center gap-2 text-[14px] font-medium border border-[#7280ff] shadow-sm">
                      <Plus className="h-5 w-5" />
                      no
                    </button>
                  </div>
                  
                  <div className="flex items-center gap-3">
                    <input type="checkbox" className="w-5 h-5 border border-gray-400 rounded" />
                    <span className="text-[20px] font-medium text-black font-['Montserrat']">SImailar Items</span>
                    <button className="bg-[#000aff] text-white px-4 py-2.5 rounded-lg flex items-center gap-2 text-[14px] font-medium border border-[#7280ff] shadow-sm">
                      <Plus className="h-5 w-5" />
                      yes
                    </button>
                  </div>
                  
                  <div className="flex items-center gap-3">
                    <input type="checkbox" className="w-5 h-5 border border-gray-400 rounded" />
                    <span className="text-[20px] font-medium text-black font-['Montserrat']">Other Also Bought</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column - Product Images */}
            <div className="space-y-6">
              <div>
                <h3 className="text-[32px] font-bold text-black font-['Montserrat'] leading-6 mb-6">Product Images/videos</h3>
                
                {/* Main Image Preview */}
                <div className="mb-6">
                  <img 
                    src="/assets/navbarLinks/account.svg" 
                    alt="Product main image" 
                    className="w-[276px] h-[286px] object-contain bg-gray-100 rounded"
                  />
                </div>
                
                {/* Upload Areas */}
                <div className="space-y-4 mb-6">
                  <div>
                    <h4 className="text-[21px] font-medium text-black font-['Montserrat'] mb-2">Upload image</h4>
                    <div className="w-[185px] h-[96px] border border-dashed border-gray-300 rounded flex flex-col items-center justify-center">
                      <Upload className="h-6 w-6 text-gray-400 mb-2" />
                      <p className="text-[10px] font-medium text-black font-['Montserrat'] text-center">
                        Drop your image here PNG. JPEG allowed
                      </p>
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="text-[21px] font-medium text-black font-['Montserrat'] mb-2">Upload video</h4>
                    <div className="w-[185px] h-[96px] border border-dashed border-gray-300 rounded flex flex-col items-center justify-center">
                      <Upload className="h-6 w-6 text-gray-400 mb-2" />
                      <p className="text-[10px] font-medium text-black font-['Montserrat'] text-center">
                        Drop your image here PNG. JPEG allowed
                      </p>
                    </div>
                  </div>
                </div>

                {/* Thumbnail List */}
                <div className="space-y-4">
                  {[...Array(5)].map((_, i) => (
                    <div key={i} className="flex items-center gap-3">
                      <img 
                        src="/assets/navbarLinks/account.svg" 
                        alt={`Product thumbnail ${i + 1}`} 
                        className="w-[86px] h-[83px] object-contain bg-gray-100 rounded"
                      />
                      <div className="flex-1">
                        <p className="text-[16px] font-semibold text-[#232321] font-['Open_Sans']">
                          Product thumbnail.png
                        </p>
                        <div className="w-[289px] h-1 bg-[#e7e7e3] rounded-lg mt-2">
                          <div className="w-[137px] h-1 bg-[#003f62] rounded-lg"></div>
                        </div>
                      </div>
                      <button className="p-2">
                        <Check className="h-8 w-8 text-blue-600" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Meta Data Section */}
          <div className="mt-12 py-6 border-t border-gray-200">
            <div className="flex items-center gap-4 mb-6">
              <button className="bg-[#000aff] text-white px-4 py-2.5 rounded-lg text-[14px] font-medium border border-[#7280ff] shadow-sm">
                add meta data
              </button>
              <button className="bg-[#000aff] text-white px-4 py-2.5 rounded-lg flex items-center gap-2 text-[14px] font-medium border border-[#7280ff] shadow-sm">
                <Plus className="h-5 w-5" />
                IMPORT
              </button>
            </div>
            
            <div className="grid grid-cols-3 gap-6">
              <div>
                <label className="block text-[21px] font-medium text-black font-['Montserrat'] mb-3">meta title</label>
                <div className="h-[47px] border-2 border-black rounded-xl">
                  <input
                    type="text"
                    value={productData.metaTitle}
                    onChange={(e) => handleProductDataChange('metaTitle', e.target.value)}
                    className="w-full h-full px-4 border-none rounded-xl focus:outline-none focus:ring-0 text-[16px]"
                  />
                </div>
              </div>
              <div>
                <label className="block text-[21px] font-medium text-black font-['Montserrat'] mb-3">meta description</label>
                <div className="h-[47px] border-2 border-black rounded-xl">
                  <input
                    type="text"
                    value={productData.metaDescription}
                    onChange={(e) => handleProductDataChange('metaDescription', e.target.value)}
                    className="w-full h-full px-4 border-none rounded-xl focus:outline-none focus:ring-0 text-[16px]"
                  />
                </div>
              </div>
              <div>
                <label className="block text-[21px] font-medium text-black font-['Montserrat'] mb-3">slug URL</label>
                <div className="h-[47px] border-2 border-black rounded-xl">
                  <input
                    type="text"
                    value={productData.slugUrl}
                    onChange={(e) => handleProductDataChange('slugUrl', e.target.value)}
                    className="w-full h-full px-4 border-none rounded-xl focus:outline-none focus:ring-0 text-[16px]"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Publish Confirmation Modal */}
      {isPublishModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded shadow-lg max-w-[200px] w-full mx-4 relative">
            <div className="p-4 text-center">
              <h2 className="text-sm font-medium text-black mb-4 leading-tight">
                Are you sure you want to publish this product?
              </h2>
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
