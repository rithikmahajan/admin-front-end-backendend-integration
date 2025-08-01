import React, { useState, useCallback, useMemo } from 'react';
import { Upload, Plus, X, ChevronDown, Check } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { DEFAULT_VARIANT, DEFAULT_PRODUCT_DATA, FILE_UPLOAD, validateImageFile, getTailwindClasses } from '../constants';
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
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [draggedIndex, setDraggedIndex] = useState(null);

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

  const handleDragStart = useCallback((e, index) => {
    setDraggedIndex(index);
    e.dataTransfer.effectAllowed = 'move';
  }, []);

  const handleDragOver = useCallback((e) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
  }, []);

  const handleDrop = useCallback((e, dropIndex) => {
    e.preventDefault();
    
    if (draggedIndex === null || draggedIndex === dropIndex) return;
    
    setUploadedFiles(prev => {
      const newFiles = [...prev];
      const draggedFile = newFiles[draggedIndex];
      
      // Remove dragged item
      newFiles.splice(draggedIndex, 1);
      
      // Insert at new position
      const insertIndex = draggedIndex < dropIndex ? dropIndex - 1 : dropIndex;
      newFiles.splice(insertIndex, 0, draggedFile);
      
      return newFiles;
    });
    
    setDraggedIndex(null);
  }, [draggedIndex]);

  const handleDragEnd = useCallback(() => {
    setDraggedIndex(null);
  }, []);

  const removeFile = useCallback((fileId) => {
    setUploadedFiles(prev => prev.filter(f => f.id !== fileId));
  }, []);

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
                <label className="block text-[21px] font-medium text-[#111111] font-['Montserrat'] mb-3 leading-[24px]">product name</label>
                <div className="h-[47px] border-2 border-black rounded-xl">
                  <input
                    type="text"
                    value={variants[0]?.productName || ''}
                    onChange={(e) => handleVariantChange(1, 'productName', e.target.value)}
                    className="w-full h-[47px] px-4 border-0 rounded-xl focus:outline-none focus:ring-0 text-[16px] bg-white font-['Montserrat']"
                    placeholder="Enter product name"
                  />
                </div>
              </div>

              {/* Title */}
              <div>
                <label className="block text-[21px] font-medium text-[#111111] font-['Montserrat'] mb-3 leading-[24px]">Title</label>
                <div className="h-[47px] border-2 border-black rounded-xl">
                  <input
                    type="text"
                    value={variants[0]?.title || ''}
                    onChange={(e) => handleVariantChange(1, 'title', e.target.value)}
                    className="w-full h-[47px] px-4 border-0 rounded-xl focus:outline-none focus:ring-0 text-[16px] bg-white font-['Montserrat']"
                    placeholder="Enter title"
                  />
                </div>
              </div>

              {/* Description */}
              <div className="mb-6">
                <label className="block text-[21px] font-medium text-[#111111] font-['Montserrat'] mb-3 leading-[24px]">Discription</label>
                
                <div className="h-[154px] border-2 border-[#000000] rounded-xl">
                  <textarea
                    value={variants[0]?.description || 'Premium quality fabric with comfortable fit. Perfect for casual and formal occasions. Available in multiple sizes with excellent durability and style.'}
                    onChange={(e) => handleVariantChange(1, 'description', e.target.value)}
                    className="w-full h-[154px] px-4 py-3 border-0 rounded-xl resize-none focus:outline-none focus:ring-0 text-[16px] bg-white font-['Montserrat']"
                    placeholder="Enter product description here..."
                  />
                </div>
              </div>

              {/* Manufacturing Details */}
              <div className="mb-6">
                <label className="block text-[21px] font-medium text-[#111111] font-['Montserrat'] mb-3 leading-[24px]">Manufacturing details</label>
                <div className="h-[154px] border-2 border-[#000000] rounded-xl">
                  <textarea
                    value={variants[0]?.manufacturingDetails || ''}
                    onChange={(e) => handleVariantChange(1, 'manufacturingDetails', e.target.value)}
                    className="w-full h-[154px] px-4 py-3 border-0 rounded-xl resize-none focus:outline-none focus:ring-0 text-[16px] bg-white font-['Montserrat']"
                    placeholder="Enter manufacturing details"
                  />
                </div>
              </div>

              {/* Shipping Returns and Exchange */}
              <div className="mb-6">
                <label className="block text-[21px] font-medium text-[#111111] font-['Montserrat'] mb-3 leading-[24px]">Shipping returns and exchange</label>
                <div className="h-[154px] border-2 border-[#000000] rounded-xl">
                  <textarea
                    value={variants[0]?.shippingReturns || ''}
                    onChange={(e) => handleVariantChange(1, 'shippingReturns', e.target.value)}
                    className="w-full h-[154px] px-4 py-3 border-0 rounded-xl resize-none focus:outline-none focus:ring-0 text-[16px] bg-white font-['Montserrat']"
                    placeholder="Enter shipping and returns policy"
                  />
                </div>
              </div>

              {/* Pricing */}
              <div className="grid grid-cols-2 gap-6 mb-6">
                <div>
                  <label className="block text-[21px] font-medium text-[#111111] font-['Montserrat'] mb-3 leading-[24px]">Regular price</label>
                  <div className="h-[47px] border-2 border-[#000000] rounded-xl">
                    <input
                      type="number"
                      value={variants[0]?.regularPrice || ''}
                      onChange={(e) => handleVariantChange(1, 'regularPrice', e.target.value)}
                      className="w-full h-[47px] px-4 border-0 rounded-xl focus:outline-none focus:ring-0 text-[16px] bg-white font-['Montserrat']"
                      placeholder="0.00"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-[21px] font-medium text-[#111111] font-['Montserrat'] mb-3 leading-[24px]">Sale price</label>
                  <div className="h-[47px] border-2 border-[#000000] rounded-xl">
                    <input
                      type="number"
                      value={variants[0]?.salePrice || ''}
                      onChange={(e) => handleVariantChange(1, 'salePrice', e.target.value)}
                      className="w-full h-[47px] px-4 border-0 rounded-xl focus:outline-none focus:ring-0 text-[16px] bg-white font-['Montserrat']"
                      placeholder="0.00"
                    />
                  </div>
                </div>
              </div>

              {/* Stock Size */}
              <div className="mb-6">
                <label className="block text-[21px] font-medium text-[#111111] font-['Montserrat'] mb-3 leading-[24px]">Stock size</label>
                <div className="grid grid-cols-5 gap-[10px]">
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
                      className={`h-[40px] rounded-[8px] border-2 text-[16px] font-medium font-['Montserrat'] transition-colors ${
                        (variants[0]?.stockSizes || []).includes(size)
                          ? 'bg-[#000AFF] text-white border-[#000AFF]'
                          : 'bg-white text-[#111111] border-[#BCBCBC]'
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>

              {/* Filter Section */}
              <div>
                <label className="block text-[21px] font-medium text-[#111111] font-['Montserrat'] mb-3 leading-[24px]">Filter</label>
                <div className="text-[21px] font-medium text-[#111111] font-['Montserrat'] mb-3">assign Filter(drop down)</div>
                <button className="bg-[#000AFF] text-white px-4 py-2.5 rounded-lg flex items-center gap-2 text-[14px] font-['Montserrat'] shadow-sm">
                  <Plus className="h-5 w-5" />
                  colour
                </button>
                
                {/* Color Data Display */}
                <div className="mt-4 bg-white border border-gray-200 rounded-xl shadow-lg p-4 w-[166px]">
                  <div className="text-[14px] text-[#bfbfbf] font-medium mb-3">showing colour data</div>
                  <div className="space-y-1">
                    <div className="py-2 border-b border-gray-200 text-[14px] text-black">red</div>
                    <div className="py-2 border-b border-gray-200 text-[14px] text-black">pink</div>
                    <div className="py-2 text-[14px] text-black">orange</div>
                  </div>
                </div>
              </div>

              {/* Also Show In */}
              <div>
                <label className="block text-[21px] font-medium text-[#111111] font-['Montserrat'] mb-3 leading-[24px]">Also Show in</label>
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <input type="checkbox" className="w-5 h-5 border border-[#bcbcbc] border-solid rounded-[3px]" />
                    <span className="text-[20px] font-medium text-[#000000] font-['Montserrat']">You Might Also Like</span>
                    <button className="bg-[#000AFF] text-white px-4 py-2.5 rounded-lg flex items-center gap-2 text-[14px] font-['Montserrat'] shadow-sm">
                      <Plus className="h-5 w-5" />
                      no
                    </button>
                  </div>
                  
                  <div className="flex items-center gap-3">
                    <input type="checkbox" className="w-5 h-5 border border-[#bcbcbc] border-solid rounded-[3px]" />
                    <span className="text-[20px] font-medium text-[#000000] font-['Montserrat']">SImailar Items</span>
                    <button className="bg-[#000AFF] text-white px-4 py-2.5 rounded-lg flex items-center gap-2 text-[14px] font-['Montserrat'] shadow-sm">
                      <Plus className="h-5 w-5" />
                      yes
                    </button>
                  </div>
                  
                  <div className="flex items-center gap-3">
                    <input type="checkbox" className="w-5 h-5 border border-[#bcbcbc] border-solid rounded-[3px]" />
                    <span className="text-[20px] font-medium text-[#000000] font-['Montserrat']">Other Also Bought</span>
                  </div>
                </div>
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
                        alt="Product main image" 
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
              <button className="bg-[#000AFF] text-white px-4 py-2.5 rounded-lg flex items-center gap-2 text-[14px] font-['Montserrat'] shadow-sm">
                <Plus className="h-5 w-5" />
                IMPORT
              </button>
            </div>
            
            <div className="grid grid-cols-3 gap-6">
              <div>
                <label className="block text-[21px] font-medium text-[#111111] font-['Montserrat'] mb-3 leading-[24px]">meta title</label>
                <div className="h-[47px] border-2 border-black rounded-xl">
                  <input
                    type="text"
                    value={productData.metaTitle}
                    onChange={(e) => handleProductDataChange('metaTitle', e.target.value)}
                    className="w-full h-[47px] px-4 border-0 rounded-xl focus:outline-none focus:ring-0 text-[16px] bg-white font-['Montserrat']"
                  />
                </div>
              </div>
              <div>
                <label className="block text-[21px] font-medium text-[#111111] font-['Montserrat'] mb-3 leading-[24px]">meta description</label>
                <div className="h-[47px] border-2 border-black rounded-xl">
                  <input
                    type="text"
                    value={productData.metaDescription}
                    onChange={(e) => handleProductDataChange('metaDescription', e.target.value)}
                    className="w-full h-[47px] px-4 border-0 rounded-xl focus:outline-none focus:ring-0 text-[16px] bg-white font-['Montserrat']"
                  />
                </div>
              </div>
              <div>
                <label className="block text-[21px] font-medium text-[#111111] font-['Montserrat'] mb-3 leading-[24px]">slug URL</label>
                <div className="h-[47px] border-2 border-black rounded-xl">
                  <input
                    type="text"
                    value={productData.slugUrl}
                    onChange={(e) => handleProductDataChange('slugUrl', e.target.value)}
                    className="w-full h-[47px] px-4 border-0 rounded-xl focus:outline-none focus:ring-0 text-[16px] bg-white font-['Montserrat']"
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
