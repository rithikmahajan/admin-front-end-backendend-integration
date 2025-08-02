import React, { useState, useCallback, useMemo } from 'react';
import { Upload, Plus, ChevronDown } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { DEFAULT_VARIANT, DEFAULT_PRODUCT_DATA, validateImageFile } from '../constants';

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
  const [isPublishModalOpen, setIsPublishModalOpen] = useState(false);
  const [uploadedFiles, setUploadedFiles] = useState([]);
  
  // New state for additional functionality
  const [stockSizeOption, setStockSizeOption] = useState('sizes'); // 'noSize', 'sizes', 'import'
  const [customSizes, setCustomSizes] = useState([]);
  const [alsoShowInOptions, setAlsoShowInOptions] = useState({
    youMightAlsoLike: { enabled: false, value: 'no' },
    similarItems: { enabled: false, value: 'no' },
    othersAlsoBought: { enabled: false, value: 'no' }
  });
  const [showVariant2, setShowVariant2] = useState(false);
  const [commonSizeChart, setCommonSizeChart] = useState({
    cmChart: null,
    inchChart: null,
    measurementGuide: null
  });

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
      // Add files to uploaded files list with progress simulation
      const newFiles = validFiles.map(file => ({
        id: Date.now() + Math.random(),
        file,
        name: file.name,
        progress: 0,
        completed: false,
        type: file.type.startsWith('image/') ? 'image' : 'video',
        url: URL.createObjectURL(file)
      }));
      
      setUploadedFiles(prev => [...prev, ...newFiles]);
      
      // Simulate upload progress
      newFiles.forEach(fileData => {
        const interval = setInterval(() => {
          setUploadedFiles(prev => prev.map(f => {
            if (f.id === fileData.id) {
              const newProgress = Math.min(f.progress + Math.random() * 20, 100);
              return {
                ...f,
                progress: newProgress,
                completed: newProgress >= 100
              };
            }
            return f;
          }));
        }, 200);
        
        // Clear interval when complete
        setTimeout(() => clearInterval(interval), 2000);
      });
      
      console.log('Uploading valid images for variant:', variantId, validFiles);
      // TODO: Implement actual file upload logic
    }
  }, []);

  const handleSizeChartUpload = useCallback((type, file) => {
    setSizeChart(prev => ({
      ...prev,
      [type]: file
    }));
    // TODO: Implement actual file upload for size charts
  }, []);

  // New handlers for additional functionality
  const handleStockSizeOptionChange = useCallback((option) => {
    setStockSizeOption(option);
  }, []);

  const handleCustomSizeAdd = useCallback(() => {
    const newSize = {
      size: '',
      quantity: '',
      hsn: '',
      sku: '',
      barcode: '',
      prices: {
        amazon: '',
        flipkart: '',
        myntra: '',
        nykaa: '',
        yoraa: ''
      }
    };
    setCustomSizes(prev => [...prev, newSize]);
  }, []);

  const handleCustomSizeChange = useCallback((index, field, value) => {
    setCustomSizes(prev => prev.map((size, i) => 
      i === index ? { ...size, [field]: value } : size
    ));
  }, []);

  const handleAlsoShowInChange = useCallback((option, field, value) => {
    setAlsoShowInOptions(prev => ({
      ...prev,
      [option]: { ...prev[option], [field]: value }
    }));
  }, []);

  const handleImportExcel = useCallback((type) => {
    // TODO: Implement Excel import functionality
    console.log(`Importing ${type} from Excel`);
  }, []);

  const handleCommonSizeChartUpload = useCallback((type, file) => {
    setCommonSizeChart(prev => ({
      ...prev,
      [type]: file
    }));
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

  // File upload handlers
  const handleFileUpload = useCallback((files, type = 'image') => {
    handleImageUpload(1, files);
  }, [handleImageUpload]);

  // Drag and drop for upload areas
  const handleUploadDragOver = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
  }, []);

  const handleUploadDragEnter = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
  }, []);

  const handleUploadDragLeave = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
  }, []);

  const handleUploadDrop = useCallback((e, type = 'image') => {
    e.preventDefault();
    e.stopPropagation();
    
    const files = e.dataTransfer.files;
    if (files.length > 0) {
      handleFileUpload(files, type);
    }
  }, [handleFileUpload]);

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
        <div className="flex items-center gap-2.5">
          <button 
            onClick={() => navigate('/manage-items')}
            className="flex items-center text-gray-600 hover:text-gray-800 w-[68px]"
          >
            <ChevronDown className="h-6 w-6 rotate-90" />
          </button>
          <h1 className="text-[36px] font-bold text-[#111111] font-['Montserrat'] leading-[24px]">Upload items</h1>
        </div>
      </div>

      {/* Main Content Container */}
      <div className="px-4 pb-8">
        
        {/* Returnable Section */}
        <div className="py-6 border-b border-gray-200">
          <div className="flex items-center gap-6 mb-6">
            <h3 className="text-[21px] font-medium text-[#111111] font-['Montserrat'] leading-[24px]">returnable</h3>
            <div className="flex items-center gap-3">
              <button 
                className={`h-[34px] w-[69px] rounded-[100px] border flex items-center justify-center ${
                  productData.returnable === 'yes' 
                    ? 'bg-[#000AFF] text-white border-[#000000]'
                    : 'bg-white text-[#000000] border-[#E4E4E4]'
                }`}
                onClick={() => handleProductDataChange('returnable', 'yes')}
              >
                <span className="text-[16px] font-medium font-['Montserrat'] leading-[1.2]">yes</span>
              </button>
              <button 
                className={`h-[34px] w-[69px] rounded-[100px] border flex items-center justify-center ${
                  productData.returnable === 'no' 
                    ? 'bg-[#000AFF] text-white border-[#000000]'
                    : 'bg-white text-[#000000] border-[#E4E4E4]'
                }`}
                onClick={() => handleProductDataChange('returnable', 'no')}
              >
                <span className="text-[16px] font-medium font-['Montserrat'] leading-[1.2]">No</span>
              </button>
            </div>
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                className="w-5 h-5 border border-[#bcbcbc] rounded-[3px]"
              />
              <span className="text-[14px] font-['Montserrat'] text-[#000000] leading-[20px]">(default)</span>
            </div>
            <button className="bg-[#000AFF] text-white px-4 py-2.5 rounded-lg flex items-center gap-2 font-['Montserrat'] text-[14px] font-normal leading-[20px] shadow-[0px_1px_2px_0px_rgba(16,24,40,0.05)] border border-[#7280FF] w-[150px] justify-center">
              <Plus className="h-5 w-5" />
              IMPORT
            </button>
          </div>
        </div>

        {/* List To Section */}
        <div className="py-6 border-b border-gray-200">
          <div className="flex items-center gap-4">
            <input type="checkbox" className="w-5 h-5 border border-[#bcbcbc] border-solid rounded-[3px]" />
            <span className="text-[14px] font-['Montserrat'] text-[#000000] leading-[20px]">List to:</span>
            <div className="flex items-center gap-1">
              <input type="checkbox" className="w-5 h-5 border border-[#bcbcbc] border-solid rounded-[3px]" />
              <span className="text-[15px] text-black font-['Montserrat'] leading-[16.9px]">amazon</span>
            </div>
            <div className="flex items-center gap-1">
              <input type="checkbox" className="w-5 h-5 border border-[#bcbcbc] border-solid rounded-[3px]" />
              <span className="text-[15px] text-black font-['Montserrat'] leading-[16.9px]">flipkart</span>
            </div>
            <div className="flex items-center gap-1">
              <input type="checkbox" className="w-5 h-5 border border-[#bcbcbc] border-solid rounded-[3px]" />
              <span className="text-[15px] text-black font-['Montserrat'] leading-[16.9px]">yoraa</span>
            </div>
            <div className="flex items-center gap-1">
              <input type="checkbox" className="w-5 h-5 border border-[#bcbcbc] border-solid rounded-[3px]" />
              <span className="text-[15px] text-black font-['Montserrat'] leading-[16.9px]">myntra</span>
            </div>
            <div className="flex items-center gap-1">
              <input type="checkbox" className="w-5 h-5 border border-[#bcbcbc] border-solid rounded-[3px]" />
              <span className="text-[15px] text-black font-['Montserrat'] leading-[16.9px]">nykaa</span>
            </div>
          </div>
        </div>

        {/* Variant Section */}
        <div className="py-6">
          <h2 className="text-[48px] font-bold text-[#111111] font-['Montserrat'] leading-[24px] mb-8">varient 1</h2>
          
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            
            {/* Left Column - Product Details */}
            <div className="col-span-3 space-y-6">
              
              {/* Product Name */}
              <div>
                <label className="block text-[14px] font-medium text-[#111111] font-['Montserrat'] mb-2">product name</label>
                <div className="w-full max-w-[400px]">
                  <input
                    type="text"
                    value={variants[0]?.productName || ''}
                    onChange={(e) => handleVariantChange(1, 'productName', e.target.value)}
                    className="w-full h-[40px] px-3 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 text-[14px] bg-white font-['Montserrat']"
                    placeholder="Enter product name"
                  />
                </div>
              </div>

              {/* Title */}
              <div>
                <label className="block text-[14px] font-medium text-[#111111] font-['Montserrat'] mb-2">Title</label>
                <div className="w-full max-w-[400px]">
                  <input
                    type="text"
                    value={variants[0]?.title || ''}
                    onChange={(e) => handleVariantChange(1, 'title', e.target.value)}
                    className="w-full h-[40px] px-3 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 text-[14px] bg-white font-['Montserrat']"
                    placeholder="Enter title"
                  />
                </div>
              </div>

              {/* Description */}
              <div className="mb-6">
                <label className="block text-[14px] font-medium text-[#111111] font-['Montserrat'] mb-2">Description</label>
                <div className="w-full max-w-[500px]">
                  <textarea
                    value={variants[0]?.description || 'Premium quality fabric with comfortable fit. Perfect for casual and formal occasions. Available in multiple sizes with excellent durability and style.'}
                    onChange={(e) => handleVariantChange(1, 'description', e.target.value)}
                    className="w-full h-[100px] px-3 py-2 border border-gray-300 rounded-md resize-none focus:outline-none focus:ring-1 focus:ring-blue-500 text-[14px] bg-white font-['Montserrat']"
                    placeholder="Enter product description here..."
                  />
                </div>
              </div>

              {/* Manufacturing Details */}
              <div className="mb-6">
                <label className="block text-[14px] font-medium text-[#111111] font-['Montserrat'] mb-2">Manufacturing details</label>
                <div className="w-full max-w-[500px]">
                  <textarea
                    value={variants[0]?.manufacturingDetails || ''}
                    onChange={(e) => handleVariantChange(1, 'manufacturingDetails', e.target.value)}
                    className="w-full h-[100px] px-3 py-2 border border-gray-300 rounded-md resize-none focus:outline-none focus:ring-1 focus:ring-blue-500 text-[14px] bg-white font-['Montserrat']"
                    placeholder="Enter manufacturing details"
                  />
                </div>
              </div>

              {/* Shipping Returns and Exchange */}
              <div className="mb-6">
                <label className="block text-[14px] font-medium text-[#111111] font-['Montserrat'] mb-2">Shipping returns and exchange</label>
                <div className="w-full max-w-[500px]">
                  <textarea
                    value={variants[0]?.shippingReturns || ''}
                    onChange={(e) => handleVariantChange(1, 'shippingReturns', e.target.value)}
                    className="w-full h-[100px] px-3 py-2 border border-gray-300 rounded-md resize-none focus:outline-none focus:ring-1 focus:ring-blue-500 text-[14px] bg-white font-['Montserrat']"
                    placeholder="Enter shipping and returns policy"
                  />
                </div>
              </div>

              {/* Pricing */}
              <div className="grid grid-cols-2 gap-6 mb-6 max-w-[400px]">
                <div>
                  <label className="block text-[14px] font-medium text-[#111111] font-['Montserrat'] mb-2">Regular price</label>
                  <input
                    type="number"
                    value={variants[0]?.regularPrice || ''}
                    onChange={(e) => handleVariantChange(1, 'regularPrice', e.target.value)}
                    className="w-full h-[40px] px-3 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 text-[14px] bg-white font-['Montserrat']"
                    placeholder="0.00"
                  />
                </div>
                <div>
                  <label className="block text-[14px] font-medium text-[#111111] font-['Montserrat'] mb-2">Sale price</label>
                  <input
                    type="number"
                    value={variants[0]?.salePrice || ''}
                    onChange={(e) => handleVariantChange(1, 'salePrice', e.target.value)}
                    className="w-full h-[40px] px-3 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 text-[14px] bg-white font-['Montserrat']"
                    placeholder="0.00"
                  />
                </div>
              </div>

              {/* Stock Size */}
              <div className="mb-6">
                <label className="block text-[14px] font-medium text-[#111111] font-['Montserrat'] mb-2">Stock size</label>
                
                {/* Size Options */}
                <div className="flex items-center gap-4 mb-4">
                  <button
                    type="button"
                    onClick={() => handleStockSizeOptionChange('noSize')}
                    className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                      stockSizeOption === 'noSize'
                        ? 'bg-blue-600 text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    No Size
                  </button>
                  <button
                    type="button"
                    onClick={() => handleStockSizeOptionChange('sizes')}
                    className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                      stockSizeOption === 'sizes'
                        ? 'bg-blue-600 text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    Add Size
                  </button>
                  <button
                    type="button"
                    onClick={() => handleImportExcel('sizes')}
                    className="px-4 py-2 rounded-md text-sm font-medium bg-green-600 text-white hover:bg-green-700 transition-colors"
                  >
                    Import Excel
                  </button>
                </div>

                {stockSizeOption === 'sizes' && (
                  <>
                    {/* Standard Sizes */}
                    <div className="grid grid-cols-5 gap-[10px] mb-4 max-w-[400px]">
                      {['XS', 'S', 'M', 'L', 'XL'].map((size) => (
                        <button
                          key={size}
                          type="button"
                          onClick={() => {
                            const currentSizes = variants[0]?.stockSizes || [];
                            const newSizes = currentSizes.includes(size)
                              ? currentSizes.filter(s => s !== size)
                              : [...currentSizes, size];
                            handleVariantChange(1, 'stockSizes', newSizes);
                          }}
                          className={`h-[40px] rounded-[8px] border-2 text-[14px] font-medium font-['Montserrat'] transition-colors ${
                            (variants[0]?.stockSizes || []).includes(size)
                              ? 'bg-[#000AFF] text-white border-[#000AFF]'
                              : 'bg-white text-[#111111] border-[#BCBCBC]'
                          }`}
                        >
                          {size}
                        </button>
                      ))}
                    </div>

                    {/* Add Custom Size Button */}
                    <button
                      type="button"
                      onClick={handleCustomSizeAdd}
                      className="mb-4 px-4 py-2 bg-blue-600 text-white rounded-md text-sm font-medium hover:bg-blue-700 transition-colors"
                    >
                      Add Custom Size
                    </button>

                    {/* Custom Sizes Table */}
                    {customSizes.length > 0 && (
                      <div className="overflow-x-auto mb-4">
                        <table className="min-w-full border border-gray-300 rounded-lg">
                          <thead className="bg-gray-50">
                            <tr>
                              <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase">Size</th>
                              <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase">Quantity</th>
                              <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase">HSN</th>
                              <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase">SKU</th>
                              <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase">Barcode</th>
                              <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase">Amazon</th>
                              <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase">Flipkart</th>
                              <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase">Myntra</th>
                              <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase">Nykaa</th>
                              <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase">Yoraa</th>
                            </tr>
                          </thead>
                          <tbody className="bg-white divide-y divide-gray-200">
                            {customSizes.map((sizeData, index) => (
                              <tr key={index}>
                                <td className="px-3 py-2">
                                  <input
                                    type="text"
                                    value={sizeData.size}
                                    onChange={(e) => handleCustomSizeChange(index, 'size', e.target.value)}
                                    className="w-16 px-2 py-1 border border-gray-300 rounded text-sm"
                                    placeholder="Size"
                                  />
                                </td>
                                <td className="px-3 py-2">
                                  <input
                                    type="number"
                                    value={sizeData.quantity}
                                    onChange={(e) => handleCustomSizeChange(index, 'quantity', e.target.value)}
                                    className="w-20 px-2 py-1 border border-gray-300 rounded text-sm"
                                    placeholder="Qty"
                                  />
                                </td>
                                <td className="px-3 py-2">
                                  <input
                                    type="text"
                                    value={sizeData.hsn}
                                    onChange={(e) => handleCustomSizeChange(index, 'hsn', e.target.value)}
                                    className="w-24 px-2 py-1 border border-gray-300 rounded text-sm"
                                    placeholder="HSN"
                                  />
                                </td>
                                <td className="px-3 py-2">
                                  <input
                                    type="text"
                                    value={sizeData.sku}
                                    onChange={(e) => handleCustomSizeChange(index, 'sku', e.target.value)}
                                    className="w-24 px-2 py-1 border border-gray-300 rounded text-sm"
                                    placeholder="SKU"
                                  />
                                </td>
                                <td className="px-3 py-2">
                                  <input
                                    type="text"
                                    value={sizeData.barcode}
                                    onChange={(e) => handleCustomSizeChange(index, 'barcode', e.target.value)}
                                    className="w-32 px-2 py-1 border border-gray-300 rounded text-sm"
                                    placeholder="Barcode"
                                  />
                                </td>
                                <td className="px-3 py-2">
                                  <input
                                    type="number"
                                    value={sizeData.prices.amazon}
                                    onChange={(e) => handleCustomSizeChange(index, 'prices', {...sizeData.prices, amazon: e.target.value})}
                                    className="w-20 px-2 py-1 border border-gray-300 rounded text-sm"
                                    placeholder="Price"
                                  />
                                </td>
                                <td className="px-3 py-2">
                                  <input
                                    type="number"
                                    value={sizeData.prices.flipkart}
                                    onChange={(e) => handleCustomSizeChange(index, 'prices', {...sizeData.prices, flipkart: e.target.value})}
                                    className="w-20 px-2 py-1 border border-gray-300 rounded text-sm"
                                    placeholder="Price"
                                  />
                                </td>
                                <td className="px-3 py-2">
                                  <input
                                    type="number"
                                    value={sizeData.prices.myntra}
                                    onChange={(e) => handleCustomSizeChange(index, 'prices', {...sizeData.prices, myntra: e.target.value})}
                                    className="w-20 px-2 py-1 border border-gray-300 rounded text-sm"
                                    placeholder="Price"
                                  />
                                </td>
                                <td className="px-3 py-2">
                                  <input
                                    type="number"
                                    value={sizeData.prices.nykaa}
                                    onChange={(e) => handleCustomSizeChange(index, 'prices', {...sizeData.prices, nykaa: e.target.value})}
                                    className="w-20 px-2 py-1 border border-gray-300 rounded text-sm"
                                    placeholder="Price"
                                  />
                                </td>
                                <td className="px-3 py-2">
                                  <input
                                    type="number"
                                    value={sizeData.prices.yoraa}
                                    onChange={(e) => handleCustomSizeChange(index, 'prices', {...sizeData.prices, yoraa: e.target.value})}
                                    className="w-20 px-2 py-1 border border-gray-300 rounded text-sm"
                                    placeholder="Price"
                                  />
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    )}
                  </>
                )}
              </div>

              {/* Also Show In */}
              <div>
                <label className="block text-[14px] font-medium text-[#111111] font-['Montserrat'] mb-3">Also Show in</label>
                <div className="space-y-4">
                  <div className="flex items-center gap-4">
                    <span className="text-[14px] font-medium text-[#000000] font-['Montserrat'] w-48">You Might Also Like</span>
                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() => handleAlsoShowInChange('youMightAlsoLike', 'value', 'yes')}
                        className={`px-4 py-1 rounded-md text-sm font-medium transition-colors ${
                          alsoShowInOptions.youMightAlsoLike.value === 'yes'
                            ? 'bg-blue-600 text-white'
                            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                        }`}
                      >
                        Yes
                      </button>
                      <button
                        type="button"
                        onClick={() => handleAlsoShowInChange('youMightAlsoLike', 'value', 'no')}
                        className={`px-4 py-1 rounded-md text-sm font-medium transition-colors ${
                          alsoShowInOptions.youMightAlsoLike.value === 'no'
                            ? 'bg-blue-600 text-white'
                            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                        }`}
                      >
                        No
                      </button>
                    </div>
                    {alsoShowInOptions.youMightAlsoLike.value === 'yes' && (
                      <div className="flex items-center gap-2">
                        <input 
                          type="checkbox" 
                          checked={alsoShowInOptions.youMightAlsoLike.enabled}
                          onChange={(e) => handleAlsoShowInChange('youMightAlsoLike', 'enabled', e.target.checked)}
                          className="w-4 h-4 border border-gray-300 rounded"
                        />
                        <span className="text-sm text-gray-600">Enable</span>
                      </div>
                    )}
                  </div>
                  
                  <div className="flex items-center gap-4">
                    <span className="text-[14px] font-medium text-[#000000] font-['Montserrat'] w-48">Similar Items</span>
                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() => handleAlsoShowInChange('similarItems', 'value', 'yes')}
                        className={`px-4 py-1 rounded-md text-sm font-medium transition-colors ${
                          alsoShowInOptions.similarItems.value === 'yes'
                            ? 'bg-blue-600 text-white'
                            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                        }`}
                      >
                        Yes
                      </button>
                      <button
                        type="button"
                        onClick={() => handleAlsoShowInChange('similarItems', 'value', 'no')}
                        className={`px-4 py-1 rounded-md text-sm font-medium transition-colors ${
                          alsoShowInOptions.similarItems.value === 'no'
                            ? 'bg-blue-600 text-white'
                            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                        }`}
                      >
                        No
                      </button>
                    </div>
                    {alsoShowInOptions.similarItems.value === 'yes' && (
                      <div className="flex items-center gap-2">
                        <input 
                          type="checkbox" 
                          checked={alsoShowInOptions.similarItems.enabled}
                          onChange={(e) => handleAlsoShowInChange('similarItems', 'enabled', e.target.checked)}
                          className="w-4 h-4 border border-gray-300 rounded"
                        />
                        <span className="text-sm text-gray-600">Enable</span>
                      </div>
                    )}
                  </div>
                  
                  <div className="flex items-center gap-4">
                    <span className="text-[14px] font-medium text-[#000000] font-['Montserrat'] w-48">Others Also Bought</span>
                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() => handleAlsoShowInChange('othersAlsoBought', 'value', 'yes')}
                        className={`px-4 py-1 rounded-md text-sm font-medium transition-colors ${
                          alsoShowInOptions.othersAlsoBought.value === 'yes'
                            ? 'bg-blue-600 text-white'
                            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                        }`}
                      >
                        Yes
                      </button>
                      <button
                        type="button"
                        onClick={() => handleAlsoShowInChange('othersAlsoBought', 'value', 'no')}
                        className={`px-4 py-1 rounded-md text-sm font-medium transition-colors ${
                          alsoShowInOptions.othersAlsoBought.value === 'no'
                            ? 'bg-blue-600 text-white'
                            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                        }`}
                      >
                        No
                      </button>
                    </div>
                    {alsoShowInOptions.othersAlsoBought.value === 'yes' && (
                      <div className="flex items-center gap-2">
                        <input 
                          type="checkbox" 
                          checked={alsoShowInOptions.othersAlsoBought.enabled}
                          onChange={(e) => handleAlsoShowInChange('othersAlsoBought', 'enabled', e.target.checked)}
                          className="w-4 h-4 border border-gray-300 rounded"
                        />
                        <span className="text-sm text-gray-600">Enable</span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Add Variant 2 Button */}
                {(alsoShowInOptions.youMightAlsoLike.enabled || 
                  alsoShowInOptions.similarItems.enabled || 
                  alsoShowInOptions.othersAlsoBought.enabled) && (
                  <div className="mt-4">
                    <button
                      type="button"
                      onClick={() => setShowVariant2(true)}
                      className="px-6 py-2 bg-green-600 text-white rounded-md text-sm font-medium hover:bg-green-700 transition-colors"
                    >
                      Add Variant 2
                    </button>
                  </div>
                )}
              </div>
            </div>

            {/* Right Column - Product Images */}
            <div className="space-y-6">
              <div>
                <h3 className="text-[32px] font-bold text-[#111111] font-['Montserrat'] leading-[24px] mb-6">Product Images/videos</h3>
                
                {/* Main Image Preview */}
                <div className="mb-6">
                  <div className="w-[276px] h-[286px] bg-gray-100 rounded border overflow-hidden">
                    {uploadedFiles.length > 0 && uploadedFiles[0].type === 'image' ? (
                      <img 
                        src={uploadedFiles[0].url} 
                        alt="Product preview" 
                        className="w-full h-full object-cover"
                      />
                    ) : uploadedFiles.length > 0 && uploadedFiles[0].type === 'video' ? (
                      <video 
                        src={uploadedFiles[0].url} 
                        className="w-full h-full object-cover"
                        controls={false}
                        muted
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center bg-gray-50">
                        <span className="text-gray-400 text-sm font-['Montserrat']">Main Product Image</span>
                      </div>
                    )}
                  </div>
                </div>
                
                {/* 5 Image Preview Thumbnails - Horizontal Row */}
                <div className="mb-6">
                  <div className="flex gap-2">
                    {[...Array(5)].map((_, index) => (
                      <div 
                        key={index} 
                        className={`w-[86px] h-[83px] bg-gray-100 rounded border-2 overflow-hidden cursor-pointer transition-all ${
                          uploadedFiles[index] ? 'border-blue-500' : 'border-gray-200'
                        }`}
                        onClick={() => {
                          if (uploadedFiles[index]) {
                            // Move clicked image to main preview by reordering array
                            const newFiles = [...uploadedFiles];
                            const clickedFile = newFiles.splice(index, 1)[0];
                            newFiles.unshift(clickedFile);
                            setUploadedFiles(newFiles);
                          }
                        }}
                      >
                        {uploadedFiles[index] ? (
                          uploadedFiles[index].type === 'image' ? (
                            <img 
                              src={uploadedFiles[index].url} 
                              alt={`Thumbnail ${index + 1}`}
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center bg-gray-200">
                              <span className="text-xs text-gray-600 font-['Montserrat']">VIDEO</span>
                            </div>
                          )
                        ) : (
                          <div className="w-full h-full flex items-center justify-center bg-gray-50">
                            <div className="w-6 h-6 border-2 border-dashed border-gray-300 rounded flex items-center justify-center">
                              <Plus className="w-3 h-3 text-gray-400" />
                            </div>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
                
                {/* Upload Areas */}
                <div className="space-y-4 mb-6">
                  <div>
                    <h4 className="text-[21px] font-medium text-[#111111] font-['Montserrat'] mb-3">Upload image</h4>
                    <label className="cursor-pointer">
                      <input 
                        type="file" 
                        multiple 
                        accept="image/*" 
                        className="hidden" 
                        onChange={(e) => handleFileUpload(e.target.files, 'image')}
                      />
                      <div 
                        className="w-[185px] h-[96px] border border-dashed border-gray-300 rounded flex flex-col items-center justify-center hover:border-gray-400 transition-colors"
                        onDragOver={handleUploadDragOver}
                        onDragEnter={handleUploadDragEnter}
                        onDragLeave={handleUploadDragLeave}
                        onDrop={(e) => handleUploadDrop(e, 'image')}
                      >
                        <Upload className="h-6 w-6 text-gray-400 mb-2" />
                        <p className="text-[10px] font-medium text-[#111111] font-['Montserrat'] text-center px-2">
                          Drop your image here PNG. JPEG allowed
                        </p>
                      </div>
                    </label>
                  </div>
                  
                  <div>
                    <h4 className="text-[21px] font-medium text-[#111111] font-['Montserrat'] mb-3">Upload video</h4>
                    <label className="cursor-pointer">
                      <input 
                        type="file" 
                        multiple 
                        accept="video/*" 
                        className="hidden" 
                        onChange={(e) => handleFileUpload(e.target.files, 'video')}
                      />
                      <div 
                        className="w-[185px] h-[96px] border border-dashed border-gray-300 rounded flex flex-col items-center justify-center hover:border-gray-400 transition-colors"
                        onDragOver={handleUploadDragOver}
                        onDragEnter={handleUploadDragEnter}
                        onDragLeave={handleUploadDragLeave}
                        onDrop={(e) => handleUploadDrop(e, 'video')}
                      >
                        <Upload className="h-6 w-6 text-gray-400 mb-2" />
                        <p className="text-[10px] font-medium text-[#111111] font-['Montserrat'] text-center px-2">
                          Drop your video here MP4. MOV allowed
                        </p>
                      </div>
                    </label>
                  </div>
                </div>

                {/* Size Chart Upload Section - 3 vertical thumbnails */}
                <div className="space-y-4">
                  <h4 className="text-[21px] font-medium text-[#111111] font-['Montserrat'] mb-3">Size Charts</h4>
                  <div className="space-y-3">
                    {/* Inch Chart */}
                    <div className="flex items-center gap-3">
                      <div className="w-[86px] h-[83px] bg-gray-100 rounded border overflow-hidden">
                        {sizeChart.inchChart ? (
                          <img 
                            src={URL.createObjectURL(sizeChart.inchChart)} 
                            alt="Inch chart"
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center">
                            <span className="text-xs text-gray-500 font-['Montserrat']">Inch</span>
                          </div>
                        )}
                      </div>
                      <div className="flex-1">
                        <label className="cursor-pointer">
                          <input 
                            type="file" 
                            accept="image/*" 
                            className="hidden" 
                            onChange={(e) => handleSizeChartUpload('inchChart', e.target.files[0])}
                          />
                          <span className="text-sm text-blue-600 hover:text-blue-700 font-['Montserrat']">
                            Upload Inch Chart
                          </span>
                        </label>
                      </div>
                    </div>

                    {/* CM Chart */}
                    <div className="flex items-center gap-3">
                      <div className="w-[86px] h-[83px] bg-gray-100 rounded border overflow-hidden">
                        {sizeChart.cmChart ? (
                          <img 
                            src={URL.createObjectURL(sizeChart.cmChart)} 
                            alt="CM chart"
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center">
                            <span className="text-xs text-gray-500 font-['Montserrat']">CM</span>
                          </div>
                        )}
                      </div>
                      <div className="flex-1">
                        <label className="cursor-pointer">
                          <input 
                            type="file" 
                            accept="image/*" 
                            className="hidden" 
                            onChange={(e) => handleSizeChartUpload('cmChart', e.target.files[0])}
                          />
                          <span className="text-sm text-blue-600 hover:text-blue-700 font-['Montserrat']">
                            Upload CM Chart
                          </span>
                        </label>
                      </div>
                    </div>

                    {/* Measurement Image */}
                    <div className="flex items-center gap-3">
                      <div className="w-[86px] h-[83px] bg-gray-100 rounded border overflow-hidden">
                        {sizeChart.measurementImage ? (
                          <img 
                            src={URL.createObjectURL(sizeChart.measurementImage)} 
                            alt="Measurement guide"
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center">
                            <span className="text-xs text-gray-500 font-['Montserrat']">Guide</span>
                          </div>
                        )}
                      </div>
                      <div className="flex-1">
                        <label className="cursor-pointer">
                          <input 
                            type="file" 
                            accept="image/*" 
                            className="hidden" 
                            onChange={(e) => handleSizeChartUpload('measurementImage', e.target.files[0])}
                          />
                          <span className="text-sm text-blue-600 hover:text-blue-700 font-['Montserrat']">
                            Upload Measurement Guide
                          </span>
                        </label>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Meta Data Section */}
          <div className="mt-12 py-6 border-t border-gray-200">
            <div className="flex items-center gap-4 mb-6">
              <button className="bg-[#000AFF] text-white px-4 py-2.5 rounded-lg text-[14px] font-['Montserrat'] shadow-sm">
                add meta data
              </button>
              <button 
                onClick={() => handleImportExcel('metadata')}
                className="bg-[#000AFF] text-white px-4 py-2.5 rounded-lg flex items-center gap-2 text-[14px] font-['Montserrat'] shadow-sm"
              >
                <Plus className="h-5 w-5" />
                IMPORT EXCEL
              </button>
            </div>
            
            <div className="grid grid-cols-3 gap-6">
              <div>
                <label className="block text-[14px] font-medium text-[#111111] font-['Montserrat'] mb-2">meta title</label>
                <input
                  type="text"
                  value={productData.metaTitle}
                  onChange={(e) => handleProductDataChange('metaTitle', e.target.value)}
                  className="w-full h-[40px] px-3 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 text-[14px] bg-white font-['Montserrat']"
                />
              </div>
              <div>
                <label className="block text-[14px] font-medium text-[#111111] font-['Montserrat'] mb-2">meta description</label>
                <input
                  type="text"
                  value={productData.metaDescription}
                  onChange={(e) => handleProductDataChange('metaDescription', e.target.value)}
                  className="w-full h-[40px] px-3 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 text-[14px] bg-white font-['Montserrat']"
                />
              </div>
              <div>
                <label className="block text-[14px] font-medium text-[#111111] font-['Montserrat'] mb-2">slug URL</label>
                <input
                  type="text"
                  value={productData.slugUrl}
                  onChange={(e) => handleProductDataChange('slugUrl', e.target.value)}
                  className="w-full h-[40px] px-3 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 text-[14px] bg-white font-['Montserrat']"
                />
              </div>
            </div>
          </div>

          {/* Variant 2 Section */}
          {showVariant2 && (
            <div className="mt-12 py-6 border-t border-gray-200">
              <h2 className="text-[32px] font-bold text-[#111111] font-['Montserrat'] leading-[24px] mb-8">Variant 2</h2>
              
              <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
                {/* Left Column - Variant 2 Details */}
                <div className="col-span-3 space-y-6">
                  {/* Title */}
                  <div>
                    <label className="block text-[14px] font-medium text-[#111111] font-['Montserrat'] mb-2">Title</label>
                    <div className="w-full max-w-[400px]">
                      <input
                        type="text"
                        value={variants[1]?.title || ''}
                        onChange={(e) => {
                          if (variants.length < 2) {
                            setVariants(prev => [...prev, { ...DEFAULT_VARIANT, id: 2, name: 'Variant 2', title: e.target.value }]);
                          } else {
                            handleVariantChange(2, 'title', e.target.value);
                          }
                        }}
                        className="w-full h-[40px] px-3 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 text-[14px] bg-white font-['Montserrat']"
                        placeholder="Enter variant 2 title"
                      />
                    </div>
                  </div>

                  {/* Manufacturing Details */}
                  <div>
                    <label className="block text-[14px] font-medium text-[#111111] font-['Montserrat'] mb-2">Manufacturing details</label>
                    <div className="w-full max-w-[500px]">
                      <textarea
                        value={variants[1]?.manufacturingDetails || ''}
                        onChange={(e) => handleVariantChange(2, 'manufacturingDetails', e.target.value)}
                        className="w-full h-[100px] px-3 py-2 border border-gray-300 rounded-md resize-none focus:outline-none focus:ring-1 focus:ring-blue-500 text-[14px] bg-white font-['Montserrat']"
                        placeholder="Enter manufacturing details for variant 2"
                      />
                    </div>
                  </div>

                  {/* Description */}
                  <div>
                    <label className="block text-[14px] font-medium text-[#111111] font-['Montserrat'] mb-2">Description</label>
                    <div className="w-full max-w-[500px]">
                      <textarea
                        value={variants[1]?.description || ''}
                        onChange={(e) => handleVariantChange(2, 'description', e.target.value)}
                        className="w-full h-[100px] px-3 py-2 border border-gray-300 rounded-md resize-none focus:outline-none focus:ring-1 focus:ring-blue-500 text-[14px] bg-white font-['Montserrat']"
                        placeholder="Enter description for variant 2"
                      />
                    </div>
                  </div>

                  {/* Pricing for Variant 2 */}
                  <div className="grid grid-cols-2 gap-6 mb-6 max-w-[400px]">
                    <div>
                      <label className="block text-[14px] font-medium text-[#111111] font-['Montserrat'] mb-2">Regular price</label>
                      <input
                        type="number"
                        value={variants[1]?.regularPrice || ''}
                        onChange={(e) => handleVariantChange(2, 'regularPrice', e.target.value)}
                        className="w-full h-[40px] px-3 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 text-[14px] bg-white font-['Montserrat']"
                        placeholder="0.00"
                      />
                    </div>
                    <div>
                      <label className="block text-[14px] font-medium text-[#111111] font-['Montserrat'] mb-2">Sale price</label>
                      <input
                        type="number"
                        value={variants[1]?.salePrice || ''}
                        onChange={(e) => handleVariantChange(2, 'salePrice', e.target.value)}
                        className="w-full h-[40px] px-3 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 text-[14px] bg-white font-['Montserrat']"
                        placeholder="0.00"
                      />
                    </div>
                  </div>
                </div>

                {/* Right Column - Variant 2 Images */}
                <div className="space-y-6">
                  <h3 className="text-[24px] font-bold text-[#111111] font-['Montserrat']">Variant 2 Images</h3>
                  {/* Similar image upload structure as variant 1 */}
                  <div className="space-y-4">
                    <div>
                      <h4 className="text-[14px] font-medium text-[#111111] font-['Montserrat'] mb-3">Upload image</h4>
                      <label className="cursor-pointer">
                        <input 
                          type="file" 
                          multiple 
                          accept="image/*" 
                          className="hidden" 
                          onChange={(e) => handleImageUpload(2, e.target.files)}
                        />
                        <div className="w-[185px] h-[96px] border border-dashed border-gray-300 rounded flex flex-col items-center justify-center hover:border-gray-400 transition-colors">
                          <Upload className="h-6 w-6 text-gray-400 mb-2" />
                          <p className="text-[10px] font-medium text-[#111111] font-['Montserrat'] text-center px-2">
                            Drop your image here PNG. JPEG allowed
                          </p>
                        </div>
                      </label>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Common Size Chart Section */}
          <div className="mt-12 py-6 border-t border-gray-200">
            <h3 className="text-[18px] font-bold text-[#111111] font-['Montserrat'] mb-6">Common Size Chart</h3>
            <div className="grid grid-cols-3 gap-6">
              {/* CM Chart */}
              <div>
                <label className="block text-[14px] font-medium text-[#111111] font-['Montserrat'] mb-3">Size Chart (CM)</label>
                <div className="w-[150px] h-[120px] bg-gray-100 rounded border overflow-hidden mb-3">
                  {commonSizeChart.cmChart ? (
                    <img 
                      src={URL.createObjectURL(commonSizeChart.cmChart)} 
                      alt="CM chart"
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <span className="text-sm text-gray-500 font-['Montserrat']">CM Chart</span>
                    </div>
                  )}
                </div>
                <label className="cursor-pointer">
                  <input 
                    type="file" 
                    accept="image/*" 
                    className="hidden" 
                    onChange={(e) => handleCommonSizeChartUpload('cmChart', e.target.files[0])}
                  />
                  <span className="text-sm text-blue-600 hover:text-blue-700 font-['Montserrat']">
                    Upload CM Chart
                  </span>
                </label>
              </div>

              {/* Inch Chart */}
              <div>
                <label className="block text-[14px] font-medium text-[#111111] font-['Montserrat'] mb-3">Size Chart (Inches)</label>
                <div className="w-[150px] h-[120px] bg-gray-100 rounded border overflow-hidden mb-3">
                  {commonSizeChart.inchChart ? (
                    <img 
                      src={URL.createObjectURL(commonSizeChart.inchChart)} 
                      alt="Inch chart"
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <span className="text-sm text-gray-500 font-['Montserrat']">Inch Chart</span>
                    </div>
                  )}
                </div>
                <label className="cursor-pointer">
                  <input 
                    type="file" 
                    accept="image/*" 
                    className="hidden" 
                    onChange={(e) => handleCommonSizeChartUpload('inchChart', e.target.files[0])}
                  />
                  <span className="text-sm text-blue-600 hover:text-blue-700 font-['Montserrat']">
                    Upload Inch Chart
                  </span>
                </label>
              </div>

              {/* Measurement Guide */}
              <div>
                <label className="block text-[14px] font-medium text-[#111111] font-['Montserrat'] mb-3">How to Measure Guide</label>
                <div className="w-[150px] h-[120px] bg-gray-100 rounded border overflow-hidden mb-3">
                  {commonSizeChart.measurementGuide ? (
                    <img 
                      src={URL.createObjectURL(commonSizeChart.measurementGuide)} 
                      alt="Measurement guide"
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <span className="text-sm text-gray-500 font-['Montserrat']">Guide</span>
                    </div>
                  )}
                </div>
                <label className="cursor-pointer">
                  <input 
                    type="file" 
                    accept="image/*" 
                    className="hidden" 
                    onChange={(e) => handleCommonSizeChartUpload('measurementGuide', e.target.files[0])}
                  />
                  <span className="text-sm text-blue-600 hover:text-blue-700 font-['Montserrat']">
                    Upload Guide
                  </span>
                </label>
              </div>
            </div>
          </div>

          {/* Category Assignment Section */}
          <div className="mt-12 py-6 border-t border-gray-200">
            <h3 className="text-[18px] font-bold text-[#111111] font-['Montserrat'] mb-6">Category Assignment</h3>
            <div className="grid grid-cols-2 gap-6 max-w-[600px]">
              <div>
                <label className="block text-[14px] font-medium text-[#111111] font-['Montserrat'] mb-2">Category</label>
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="w-full h-[40px] px-3 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 text-[14px] bg-white font-['Montserrat']"
                >
                  <option value="">Select Category</option>
                  <option value="men">Men</option>
                  <option value="women">Women</option>
                  <option value="kids">Kids</option>
                  <option value="accessories">Accessories</option>
                </select>
              </div>
              <div>
                <label className="block text-[14px] font-medium text-[#111111] font-['Montserrat'] mb-2">Subcategory</label>
                <select
                  value={selectedSubCategory}
                  onChange={(e) => setSelectedSubCategory(e.target.value)}
                  className="w-full h-[40px] px-3 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 text-[14px] bg-white font-['Montserrat']"
                >
                  <option value="">Select Subcategory</option>
                  {selectedCategory === 'men' && (
                    <>
                      <option value="jacket">Jacket</option>
                      <option value="shirt">Shirt</option>
                      <option value="pants">Pants</option>
                      <option value="shoes">Shoes</option>
                    </>
                  )}
                  {selectedCategory === 'women' && (
                    <>
                      <option value="dress">Dress</option>
                      <option value="top">Top</option>
                      <option value="skirt">Skirt</option>
                      <option value="shoes">Shoes</option>
                    </>
                  )}
                  {selectedCategory === 'kids' && (
                    <>
                      <option value="clothing">Clothing</option>
                      <option value="shoes">Shoes</option>
                      <option value="toys">Toys</option>
                    </>
                  )}
                </select>
              </div>
            </div>
            {selectedCategory && selectedSubCategory && (
              <div className="mt-4 p-3 bg-blue-50 rounded-md">
                <p className="text-sm text-blue-800 font-['Montserrat']">
                  Category Path: {selectedCategory} → {selectedSubCategory}
                </p>
              </div>
            )}
          </div>

          {/* Action Buttons */}
          <div className="mt-12 flex justify-center gap-4">
            <button
              onClick={handleSaveAsDraft}
              className="px-6 py-3 bg-gray-500 text-white rounded-lg text-[16px] font-medium font-['Montserrat'] hover:bg-gray-600 transition-colors"
            >
              Save as Draft
            </button>
            <button
              onClick={handleRecheckDetails}
              className="px-6 py-3 bg-yellow-500 text-white rounded-lg text-[16px] font-medium font-['Montserrat'] hover:bg-yellow-600 transition-colors"
            >
              Recheck Details
            </button>
            <button
              onClick={handlePublishProduct}
              disabled={!isFormValid}
              className={`px-6 py-3 rounded-lg text-[16px] font-medium font-['Montserrat'] transition-colors ${
                isFormValid
                  ? 'bg-green-600 text-white hover:bg-green-700'
                  : 'bg-gray-300 text-gray-500 cursor-not-allowed'
              }`}
            >
              Publish Product
            </button>
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
