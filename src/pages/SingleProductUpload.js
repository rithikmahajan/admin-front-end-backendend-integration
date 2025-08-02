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
  const [stockSizeOption, setStockSizeOption] = useState('sizes'); // 'noSize', 'sizes', 'import' - Default to 'sizes'
  const [customSizes, setCustomSizes] = useState([]);
  const [alsoShowInOptions, setAlsoShowInOptions] = useState({
    youMightAlsoLike: { value: 'no' },
    similarItems: { value: 'no' },
    othersAlsoBought: { value: 'no' }
  });
  const [dynamicAlsoShowInOptions, setDynamicAlsoShowInOptions] = useState([
    { id: 'youMightAlsoLike', label: 'You Might Also Like', value: 'no' },
    { id: 'similarItems', label: 'Similar Items', value: 'no' },
    { id: 'othersAlsoBought', label: 'Others Also Bought', value: 'no' }
  ]);
  const [variantCount, setVariantCount] = useState(1); // Track number of variants
  const [nestingOptions, setNestingOptions] = useState({}); // Track nesting options for each variant
  const [excelFile, setExcelFile] = useState(null); // Track uploaded Excel file
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

  const addMoreVariants = useCallback(() => {
    const newVariantCount = variantCount + 1;
    const newVariant = {
      ...DEFAULT_VARIANT,
      id: Date.now(),
      name: `Variant ${newVariantCount}`
    };
    setVariants(prev => [...prev, newVariant]);
    setVariantCount(newVariantCount);
  }, [variantCount]);

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
    
    // Also update dynamic options array
    setDynamicAlsoShowInOptions(prev => 
      prev.map(item => 
        item.id === option ? { ...item, [field]: value } : item
      )
    );
  }, []);

  // Add new "Also Show in" option
  const addAlsoShowInOption = useCallback(() => {
    const newOptionId = `customOption${Date.now()}`;
    const newOption = {
      id: newOptionId,
      label: `Custom Option ${dynamicAlsoShowInOptions.length + 1}`,
      value: 'no',
      isCustom: true
    };
    
    setDynamicAlsoShowInOptions(prev => [...prev, newOption]);
    setAlsoShowInOptions(prev => ({
      ...prev,
      [newOptionId]: { value: 'no' }
    }));
  }, [dynamicAlsoShowInOptions.length]);

  // Remove custom "Also Show in" option
  const removeAlsoShowInOption = useCallback((optionId) => {
    setDynamicAlsoShowInOptions(prev => prev.filter(item => item.id !== optionId));
    setAlsoShowInOptions(prev => {
      const newOptions = { ...prev };
      delete newOptions[optionId];
      return newOptions;
    });
  }, []);

  // Update custom option label
  const updateAlsoShowInLabel = useCallback((optionId, newLabel) => {
    setDynamicAlsoShowInOptions(prev => 
      prev.map(item => 
        item.id === optionId ? { ...item, label: newLabel } : item
      )
    );
  }, []);

  const handleImportExcel = useCallback((type) => {
    // Create a hidden file input element
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.xlsx,.xls,.csv';
    input.onchange = (e) => {
      const file = e.target.files[0];
      if (file) {
        console.log(`Importing ${type} from Excel:`, file.name);
        
        if (type === 'sizes') {
          // TODO: Parse Excel file and populate size data
          // This would typically involve reading the Excel file and extracting size information
          // For now, we'll simulate importing some sample data
          const sampleSizes = [
            {
              size: 'S',
              quantity: '10',
              hsn: '61091000',
              sku: 'SKU001',
              barcode: '1234567890123',
              prices: {
                amazon: '599',
                flipkart: '579',
                myntra: '589',
                nykaa: '599',
                yoraa: '549'
              }
            },
            {
              size: 'M',
              quantity: '15',
              hsn: '61091000',
              sku: 'SKU002',
              barcode: '1234567890124',
              prices: {
                amazon: '599',
                flipkart: '579',
                myntra: '589',
                nykaa: '599',
                yoraa: '549'
              }
            },
            {
              size: 'L',
              quantity: '12',
              hsn: '61091000',
              sku: 'SKU003',
              barcode: '1234567890125',
              prices: {
                amazon: '599',
                flipkart: '579',
                myntra: '589',
                nykaa: '599',
                yoraa: '549'
              }
            }
          ];
          
          setCustomSizes(sampleSizes);
          setStockSizeOption('sizes');
          alert(`Excel file "${file.name}" imported successfully! ${sampleSizes.length} sizes added.`);
        }
        
        setExcelFile(file);
      }
    };
    input.click();
  }, []);

  const handleCommonSizeChartUpload = useCallback((type, file) => {
    setCommonSizeChart(prev => ({
      ...prev,
      [type]: file
    }));
  }, []);

  // Nesting options handlers
  const handleNestingOptionChange = useCallback((variantId, option) => {
    if (option === 'sameAsArticle1') {
      // Set all options to be copied from variant 1
      const allOptions = ['title', 'description', 'manufacturingDetails', 'shippingReturns', 'regularPrice', 'salePrice', 'stockSize'];
      setNestingOptions(prev => ({
        ...prev,
        [variantId]: allOptions
      }));
      
      // Apply nesting logic - copy all data from first variant
      const firstVariant = variants[0];
      if (firstVariant) {
        handleVariantChange(variantId, 'title', firstVariant?.title || '');
        handleVariantChange(variantId, 'description', firstVariant?.description || '');
        handleVariantChange(variantId, 'manufacturingDetails', firstVariant?.manufacturingDetails || '');
        handleVariantChange(variantId, 'shippingReturns', firstVariant?.shippingReturns || '');
        handleVariantChange(variantId, 'regularPrice', firstVariant?.regularPrice || '');
        handleVariantChange(variantId, 'salePrice', firstVariant?.salePrice || '');
        
        // Copy stock size data
        const variantToUpdate = variants.find(v => v.id === variantId);
        if (variantToUpdate) {
          setVariants(prev => prev.map(variant => 
            variant.id === variantId 
              ? { 
                  ...variant, 
                  stockSizeOption: 'sizes',
                  customSizes: [...(customSizes || [])]
                }
              : variant
          ));
        }
      }
    } else {
      // Clear all options
      setNestingOptions(prev => ({
        ...prev,
        [variantId]: []
      }));
    }
  }, [variants, handleVariantChange, customSizes]);

  // Handle individual nesting options
  const handleIndividualNestingChange = useCallback((variantId, field, isChecked) => {
    setNestingOptions(prev => {
      const currentOptions = prev[variantId] || [];
      let newOptions;
      
      if (isChecked) {
        newOptions = [...currentOptions, field];
      } else {
        newOptions = currentOptions.filter(option => option !== field);
      }
      
      // Apply the specific field copying
      if (isChecked) {
        const firstVariant = variants[0];
        if (firstVariant) {
          switch (field) {
            case 'title':
              handleVariantChange(variantId, 'title', firstVariant?.title || '');
              break;
            case 'description':
              handleVariantChange(variantId, 'description', firstVariant?.description || '');
              break;
            case 'manufacturingDetails':
              handleVariantChange(variantId, 'manufacturingDetails', firstVariant?.manufacturingDetails || '');
              break;  
            case 'shippingReturns':
              handleVariantChange(variantId, 'shippingReturns', firstVariant?.shippingReturns || '');
              break;
            case 'regularPrice':
              handleVariantChange(variantId, 'regularPrice', firstVariant?.regularPrice || '');
              break;
            case 'salePrice':
              handleVariantChange(variantId, 'salePrice', firstVariant?.salePrice || '');
              break;
            case 'stockSize':
              // Copy stock size data
              setVariants(prev => prev.map(variant => 
                variant.id === variantId 
                  ? { 
                      ...variant, 
                      stockSizeOption: 'sizes',
                      customSizes: [...(customSizes || [])]
                    }
                  : variant
              ));
              break;
            default:
              break;
          }
        }
      }
      
      return {
        ...prev,
        [variantId]: newOptions
      };
    });
  }, [variants, handleVariantChange, customSizes]);

  // Variant-specific stock size handlers
  const handleVariantStockSizeOption = useCallback((variantId, option) => {
    setVariants(prev => prev.map(variant => 
      variant.id === variantId 
        ? { ...variant, stockSizeOption: option }
        : variant
    ));
  }, []);

  const handleVariantCustomSizeAdd = useCallback((variantId) => {
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
    
    setVariants(prev => prev.map(variant => 
      variant.id === variantId 
        ? { 
            ...variant, 
            customSizes: [...(variant.customSizes || []), newSize]
          }
        : variant
    ));
  }, []);

  const handleVariantCustomSizeChange = useCallback((variantId, sizeIndex, field, value) => {
    setVariants(prev => prev.map(variant => 
      variant.id === variantId 
        ? {
            ...variant,
            customSizes: (variant.customSizes || []).map((size, i) => 
              i === sizeIndex ? { ...size, [field]: value } : size
            )
          }
        : variant
    ));
  }, []);

  const handleVariantImportExcel = useCallback((variantId, type) => {
    // Create a hidden file input element
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.xlsx,.xls,.csv';
    input.onchange = (e) => {
      const file = e.target.files[0];
      if (file) {
        console.log(`Importing ${type} from Excel for variant ${variantId}:`, file.name);
        
        if (type === 'sizes') {
          // Sample sizes for this variant
          const sampleSizes = [
            {
              size: 'XS',
              quantity: '8',
              hsn: '61091000',
              sku: `SKU${variantId}01`,
              barcode: `123456789${variantId}23`,
              prices: {
                amazon: '599',
                flipkart: '579',
                myntra: '589',
                nykaa: '599',
                yoraa: '549'
              }
            },
            {
              size: 'S',
              quantity: '10',
              hsn: '61091000',
              sku: `SKU${variantId}02`,
              barcode: `123456789${variantId}24`,
              prices: {
                amazon: '599',
                flipkart: '579',
                myntra: '589',
                nykaa: '599',
                yoraa: '549'
              }
            }
          ];
          
          setVariants(prev => prev.map(variant => 
            variant.id === variantId 
              ? { 
                  ...variant, 
                  stockSizeOption: 'sizes',
                  customSizes: sampleSizes
                }
              : variant
          ));
          
          alert(`Excel file "${file.name}" imported successfully for variant! ${sampleSizes.length} sizes added.`);
        }
      }
    };
    input.click();
  }, []);

  // Excel file upload handler
  const handleExcelFileUpload = useCallback((file) => {
    setExcelFile(file);
    console.log('Excel file uploaded:', file.name);
    // TODO: Implement Excel parsing logic
    // You can use libraries like SheetJS (xlsx) to parse Excel files
  }, []);

  // Handle returnable import excel functionality
  const handleReturnableImportExcel = useCallback(() => {
    // Create a hidden file input element
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.xlsx,.xls,.csv';
    input.onchange = (e) => {
      const file = e.target.files[0];
      if (file) {
        console.log('Importing returnable data from Excel:', file.name);
        // TODO: Parse Excel file and populate returnable data
        // This would typically involve reading the Excel file and extracting returnable information
        setExcelFile(file);
        alert(`Excel file "${file.name}" uploaded successfully for returnable data import!`);
      }
    };
    input.click();
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
            <button 
              onClick={handleReturnableImportExcel}
              className="bg-[#000AFF] text-white px-4 py-2.5 rounded-lg flex items-center gap-2 font-['Montserrat'] text-[14px] font-normal leading-[20px] shadow-[0px_1px_2px_0px_rgba(16,24,40,0.05)] border border-[#7280FF] w-[150px] justify-center"
            >
              <Plus className="h-5 w-5" />
              IMPORT
            </button>
          </div>
        </div>

        {/* List To Section */}
        <div className="py-6 border-b border-gray-200">
          <div className="flex items-center gap-4">
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
              <input type="checkbox" className="w-5 h-5 border border-[#bcbcbc] border-solid rounded-[3px]" defaultChecked />
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
              <label className="cursor-pointer">
                <input 
                  type="file" 
                  accept=".xlsx,.xls,.csv" 
                  className="hidden" 
                  onChange={(e) => {
                    const file = e.target.files[0];
                    if (file) {
                      handleExcelFileUpload(file);
                    }
                  }}
                />
                <div className="bg-[#000AFF] text-white px-4 py-2.5 rounded-lg flex items-center gap-2 text-[14px] font-['Montserrat'] shadow-sm hover:bg-blue-700 transition-colors">
                  <Plus className="h-5 w-5" />
                  {excelFile ? `${excelFile.name}` : 'IMPORT EXCEL'}
                </div>
              </label>
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

          {/* Additional Variants Section */}
          {variants.slice(1).map((variant, index) => {
            const variantNumber = index + 2;
            return (
              <div key={variant.id} className="mt-12 py-6 border-t border-gray-200">
                <h2 className="text-[32px] font-bold text-[#111111] font-['Montserrat'] leading-[24px] mb-8">Variant {variantNumber}</h2>
                
                <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
                  {/* Left Column - Variant Details */}
                  <div className="col-span-3 space-y-6">
                    {/* Nesting Options */}
                    <div className="mb-6">
                      <label className="block text-[14px] font-medium text-[#111111] font-['Montserrat'] mb-3">Variant {variantNumber} Options</label>
                      <div className="space-y-2">
                        <div className="flex items-center gap-4 flex-wrap">
                          <label className="flex items-center gap-2 cursor-pointer">
                            <input
                              type="checkbox"
                              checked={nestingOptions[variant.id] === 'sameAsArticle1' || nestingOptions[variant.id]?.includes?.('sameAsArticle1')}
                              onChange={(e) => {
                                if (e.target.checked) {
                                  handleNestingOptionChange(variant.id, 'sameAsArticle1');
                                } else {
                                  handleNestingOptionChange(variant.id, '');
                                }
                              }}
                              className="w-4 h-4 text-blue-600"
                            />
                            <span className="text-[14px] text-[#111111] font-['Montserrat']">Same as article 1</span>
                          </label>
                        </div>
                        <div className="grid grid-cols-2 gap-4 ml-6">
                          <label className="flex items-center gap-2 cursor-pointer">
                            <input
                              type="checkbox"
                              checked={nestingOptions[variant.id]?.includes?.('title') || false}
                              onChange={(e) => handleIndividualNestingChange(variant.id, 'title', e.target.checked)}
                              className="w-4 h-4 text-blue-600"
                            />
                            <span className="text-[14px] text-[#111111] font-['Montserrat']">Title</span>
                          </label>
                          <label className="flex items-center gap-2 cursor-pointer">
                            <input
                              type="checkbox"
                              checked={nestingOptions[variant.id]?.includes?.('description') || false}
                              onChange={(e) => handleIndividualNestingChange(variant.id, 'description', e.target.checked)}
                              className="w-4 h-4 text-blue-600"
                            />
                            <span className="text-[14px] text-[#111111] font-['Montserrat']">Description</span>
                          </label>
                          <label className="flex items-center gap-2 cursor-pointer">
                            <input
                              type="checkbox"
                              checked={nestingOptions[variant.id]?.includes?.('manufacturingDetails') || false}
                              onChange={(e) => handleIndividualNestingChange(variant.id, 'manufacturingDetails', e.target.checked)}
                              className="w-4 h-4 text-blue-600"
                            />
                            <span className="text-[14px] text-[#111111] font-['Montserrat']">Manufacturing details</span>
                          </label>
                          <label className="flex items-center gap-2 cursor-pointer">
                            <input
                              type="checkbox"
                              checked={nestingOptions[variant.id]?.includes?.('shippingReturns') || false}
                              onChange={(e) => handleIndividualNestingChange(variant.id, 'shippingReturns', e.target.checked)}
                              className="w-4 h-4 text-blue-600"
                            />
                            <span className="text-[14px] text-[#111111] font-['Montserrat']">Shipping returns and exchange</span>
                          </label>
                          <label className="flex items-center gap-2 cursor-pointer">
                            <input
                              type="checkbox"
                              checked={nestingOptions[variant.id]?.includes?.('regularPrice') || false}
                              onChange={(e) => handleIndividualNestingChange(variant.id, 'regularPrice', e.target.checked)}
                              className="w-4 h-4 text-blue-600"
                            />
                            <span className="text-[14px] text-[#111111] font-['Montserrat']">Regular price</span>
                          </label>
                          <label className="flex items-center gap-2 cursor-pointer">
                            <input
                              type="checkbox"
                              checked={nestingOptions[variant.id]?.includes?.('salePrice') || false}
                              onChange={(e) => handleIndividualNestingChange(variant.id, 'salePrice', e.target.checked)}
                              className="w-4 h-4 text-blue-600"
                            />
                            <span className="text-[14px] text-[#111111] font-['Montserrat']">Sale price</span>
                          </label>
                          <label className="flex items-center gap-2 cursor-pointer">
                            <input
                              type="checkbox"
                              checked={nestingOptions[variant.id]?.includes?.('stockSize') || false}
                              onChange={(e) => handleIndividualNestingChange(variant.id, 'stockSize', e.target.checked)}
                              className="w-4 h-4 text-blue-600"
                            />
                            <span className="text-[14px] text-[#111111] font-['Montserrat']">Stock size</span>
                          </label>
                        </div>
                      </div>
                    </div>

                    {/* Product Name */}
                    <div>
                      <label className="block text-[14px] font-medium text-[#111111] font-['Montserrat'] mb-2">product name</label>
                      <div className="w-full max-w-[400px]">
                        <input
                          type="text"
                          value={variant.productName || ''}
                          onChange={(e) => handleVariantChange(variant.id, 'productName', e.target.value)}
                          className="w-full h-[40px] px-3 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 text-[14px] bg-white font-['Montserrat']"
                          placeholder={`Enter product name for variant ${variantNumber}`}
                        />
                      </div>
                    </div>

                    {/* Title */}
                    <div>
                      <label className="block text-[14px] font-medium text-[#111111] font-['Montserrat'] mb-2">Title</label>
                      <div className="w-full max-w-[400px]">
                        <input
                          type="text"
                          value={variant.title || ''}
                          onChange={(e) => handleVariantChange(variant.id, 'title', e.target.value)}
                          className="w-full h-[40px] px-3 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 text-[14px] bg-white font-['Montserrat']"
                          placeholder={`Enter title for variant ${variantNumber}`}
                        />
                      </div>
                    </div>

                    {/* Description */}
                    <div>
                      <label className="block text-[14px] font-medium text-[#111111] font-['Montserrat'] mb-2">Description</label>
                      <div className="w-full max-w-[500px]">
                        <textarea
                          value={variant.description || ''}
                          onChange={(e) => handleVariantChange(variant.id, 'description', e.target.value)}
                          className="w-full h-[100px] px-3 py-2 border border-gray-300 rounded-md resize-none focus:outline-none focus:ring-1 focus:ring-blue-500 text-[14px] bg-white font-['Montserrat']"
                          placeholder={`Enter description for variant ${variantNumber}`}
                        />
                      </div>
                    </div>

                    {/* Manufacturing Details */}
                    <div>
                      <label className="block text-[14px] font-medium text-[#111111] font-['Montserrat'] mb-2">Manufacturing details</label>
                      <div className="w-full max-w-[500px]">
                        <textarea
                          value={variant.manufacturingDetails || ''}
                          onChange={(e) => handleVariantChange(variant.id, 'manufacturingDetails', e.target.value)}
                          className="w-full h-[100px] px-3 py-2 border border-gray-300 rounded-md resize-none focus:outline-none focus:ring-1 focus:ring-blue-500 text-[14px] bg-white font-['Montserrat']"
                          placeholder={`Enter manufacturing details for variant ${variantNumber}`}
                        />
                      </div>
                    </div>

                    {/* Shipping Returns */}
                    <div>
                      <label className="block text-[14px] font-medium text-[#111111] font-['Montserrat'] mb-2">Shipping returns and exchange</label>
                      <div className="w-full max-w-[500px]">
                        <textarea
                          value={variant.shippingReturns || ''}
                          onChange={(e) => handleVariantChange(variant.id, 'shippingReturns', e.target.value)}
                          className="w-full h-[100px] px-3 py-2 border border-gray-300 rounded-md resize-none focus:outline-none focus:ring-1 focus:ring-blue-500 text-[14px] bg-white font-['Montserrat']"
                          placeholder={`Enter shipping and returns policy for variant ${variantNumber}`}
                        />
                      </div>
                    </div>

                    {/* Pricing */}
                    <div className="grid grid-cols-2 gap-6 mb-6 max-w-[400px]">
                      <div>
                        <label className="block text-[14px] font-medium text-[#111111] font-['Montserrat'] mb-2">Regular price</label>
                        <input
                          type="number"
                          value={variant.regularPrice || ''}
                          onChange={(e) => handleVariantChange(variant.id, 'regularPrice', e.target.value)}
                          className="w-full h-[40px] px-3 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 text-[14px] bg-white font-['Montserrat']"
                          placeholder="0.00"
                        />
                      </div>
                      <div>
                        <label className="block text-[14px] font-medium text-[#111111] font-['Montserrat'] mb-2">Sale price</label>
                        <input
                          type="number"
                          value={variant.salePrice || ''}
                          onChange={(e) => handleVariantChange(variant.id, 'salePrice', e.target.value)}
                          className="w-full h-[40px] px-3 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 text-[14px] bg-white font-['Montserrat']"
                          placeholder="0.00"
                        />
                      </div>
                    </div>

                    {/* Stock Size Section for Variant */}
                    <div className="mb-6">
                      <label className="block text-[14px] font-medium text-[#111111] font-['Montserrat'] mb-2">Stock size - Variant {variantNumber}</label>
                      
                      {/* Stock Size Options */}
                      <div className="flex items-center gap-4 mb-4">
                        <button
                          type="button"
                          onClick={() => handleVariantStockSizeOption(variant.id, 'noSize')}
                          className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                            (variant.stockSizeOption || 'sizes') === 'noSize'
                              ? 'bg-blue-600 text-white'
                              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                          }`}
                        >
                          No Size
                        </button>
                        <button
                          type="button"
                          onClick={() => handleVariantStockSizeOption(variant.id, 'sizes')}
                          className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                            (variant.stockSizeOption || 'sizes') === 'sizes'
                              ? 'bg-blue-600 text-white'
                              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                          }`}
                        >
                          Add Size
                        </button>
                        <button
                          type="button"
                          onClick={() => handleVariantImportExcel(variant.id, 'sizes')}
                          className="px-4 py-2 rounded-md text-sm font-medium bg-green-600 text-white hover:bg-green-700 transition-colors"
                        >
                          Import Excel
                        </button>
                      </div>

                      {(variant.stockSizeOption || 'sizes') === 'sizes' && (
                        <>
                          {/* Add Custom Size Button */}
                          <button
                            type="button"
                            onClick={() => handleVariantCustomSizeAdd(variant.id)}
                            className="mb-4 px-4 py-2 bg-blue-600 text-white rounded-md text-sm font-medium hover:bg-blue-700 transition-colors"
                          >
                            Add Custom Size
                          </button>

                          {/* Custom Sizes Table */}
                          {(variant.customSizes || []).length > 0 && (
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
                                  {(variant.customSizes || []).map((sizeData, index) => (
                                    <tr key={index}>
                                      <td className="px-3 py-2">
                                        <input
                                          type="text"
                                          value={sizeData.size}
                                          onChange={(e) => handleVariantCustomSizeChange(variant.id, index, 'size', e.target.value)}
                                          className="w-16 px-2 py-1 border border-gray-300 rounded text-sm"
                                          placeholder="Size"
                                        />
                                      </td>
                                      <td className="px-3 py-2">
                                        <input
                                          type="number"
                                          value={sizeData.quantity}
                                          onChange={(e) => handleVariantCustomSizeChange(variant.id, index, 'quantity', e.target.value)}
                                          className="w-20 px-2 py-1 border border-gray-300 rounded text-sm"
                                          placeholder="Qty"
                                        />
                                      </td>
                                      <td className="px-3 py-2">
                                        <input
                                          type="text"
                                          value={sizeData.hsn}
                                          onChange={(e) => handleVariantCustomSizeChange(variant.id, index, 'hsn', e.target.value)}
                                          className="w-24 px-2 py-1 border border-gray-300 rounded text-sm"
                                          placeholder="HSN"
                                        />
                                      </td>
                                      <td className="px-3 py-2">
                                        <input
                                          type="text"
                                          value={sizeData.sku}
                                          onChange={(e) => handleVariantCustomSizeChange(variant.id, index, 'sku', e.target.value)}
                                          className="w-24 px-2 py-1 border border-gray-300 rounded text-sm"
                                          placeholder="SKU"
                                        />
                                      </td>
                                      <td className="px-3 py-2">
                                        <input
                                          type="text"
                                          value={sizeData.barcode}
                                          onChange={(e) => handleVariantCustomSizeChange(variant.id, index, 'barcode', e.target.value)}
                                          className="w-32 px-2 py-1 border border-gray-300 rounded text-sm"
                                          placeholder="Barcode"
                                        />
                                      </td>
                                      <td className="px-3 py-2">
                                        <input
                                          type="number"
                                          value={sizeData.prices.amazon}
                                          onChange={(e) => handleVariantCustomSizeChange(variant.id, index, 'prices', {...sizeData.prices, amazon: e.target.value})}
                                          className="w-20 px-2 py-1 border border-gray-300 rounded text-sm"
                                          placeholder="Price"
                                        />
                                      </td>
                                      <td className="px-3 py-2">
                                        <input
                                          type="number"
                                          value={sizeData.prices.flipkart}
                                          onChange={(e) => handleVariantCustomSizeChange(variant.id, index, 'prices', {...sizeData.prices, flipkart: e.target.value})}
                                          className="w-20 px-2 py-1 border border-gray-300 rounded text-sm"
                                          placeholder="Price"
                                        />
                                      </td>
                                      <td className="px-3 py-2">
                                        <input
                                          type="number"
                                          value={sizeData.prices.myntra}
                                          onChange={(e) => handleVariantCustomSizeChange(variant.id, index, 'prices', {...sizeData.prices, myntra: e.target.value})}
                                          className="w-20 px-2 py-1 border border-gray-300 rounded text-sm"
                                          placeholder="Price"
                                        />
                                      </td>
                                      <td className="px-3 py-2">
                                        <input
                                          type="number"
                                          value={sizeData.prices.nykaa}
                                          onChange={(e) => handleVariantCustomSizeChange(variant.id, index, 'prices', {...sizeData.prices, nykaa: e.target.value})}
                                          className="w-20 px-2 py-1 border border-gray-300 rounded text-sm"
                                          placeholder="Price"
                                        />
                                      </td>
                                      <td className="px-3 py-2">
                                        <input
                                          type="number"
                                          value={sizeData.prices.yoraa}
                                          onChange={(e) => handleVariantCustomSizeChange(variant.id, index, 'prices', {...sizeData.prices, yoraa: e.target.value})}
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
                  </div>

                  {/* Right Column - Variant Images */}
                  <div className="space-y-6">
                    <h3 className="text-[24px] font-bold text-[#111111] font-['Montserrat']">Variant {variantNumber} Images</h3>
                    
                    {/* Main Product Image */}
                    <div className="mb-6">
                      <div className="w-[276px] h-[286px] bg-gray-100 rounded border overflow-hidden">
                        <div className="w-full h-full flex items-center justify-center bg-gray-50">
                          <span className="text-gray-400 text-sm font-['Montserrat']">Variant {variantNumber} Image</span>
                        </div>
                      </div>
                    </div>
                    
                    {/* Upload Section */}
                    <div className="space-y-4">
                      <div>
                        <h4 className="text-[14px] font-medium text-[#111111] font-['Montserrat'] mb-3">Upload image</h4>
                        <label className="cursor-pointer">
                          <input 
                            type="file" 
                            multiple 
                            accept="image/*" 
                            className="hidden" 
                            onChange={(e) => handleImageUpload(variant.id, e.target.files)}
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
            );
          })}

          {/* Dynamic Add More Variants Button - appears after variants and before size charts */}
          <div className="mt-8 py-4 flex justify-center">
            <button
              type="button"
              onClick={addMoreVariants}
              className="px-8 py-3 bg-[#000AFF] text-white rounded-lg text-[16px] font-medium font-['Montserrat'] hover:bg-blue-700 transition-colors flex items-center gap-2"
            >
              <Plus className="h-5 w-5" />
              Add More Variants
            </button>
          </div>

          {/* Also Show In Section - Common for all variants */}
          <div className="mt-12 py-6 border-t border-gray-200">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-[18px] font-bold text-[#111111] font-['Montserrat']">Also Show in</h3>
              <button
                type="button"
                onClick={addAlsoShowInOption}
                className="px-4 py-2 bg-[#000AFF] text-white rounded-lg text-[14px] font-medium font-['Montserrat'] hover:bg-blue-700 transition-colors flex items-center gap-2"
              >
                <Plus className="h-4 w-4" />
                Add Option
              </button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {dynamicAlsoShowInOptions.map((option) => (
                <div key={option.id} className="space-y-4 p-4 border border-gray-200 rounded-lg">
                  <div className="flex items-center justify-between">
                    {option.isCustom ? (
                      <input
                        type="text"
                        value={option.label}
                        onChange={(e) => updateAlsoShowInLabel(option.id, e.target.value)}
                        className="text-[14px] font-medium text-[#000000] font-['Montserrat'] border-b border-gray-300 bg-transparent focus:outline-none focus:border-blue-500 flex-1 mr-2"
                        placeholder="Enter option name"
                      />
                    ) : (
                      <span className="text-[14px] font-medium text-[#000000] font-['Montserrat']">
                        {option.label}
                      </span>
                    )}
                    
                    {option.isCustom && (
                      <button
                        type="button"
                        onClick={() => removeAlsoShowInOption(option.id)}
                        className="text-red-500 hover:text-red-700 ml-2"
                        title="Remove option"
                      >
                        ×
                      </button>
                    )}
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => handleAlsoShowInChange(option.id, 'value', 'yes')}
                      className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                        alsoShowInOptions[option.id]?.value === 'yes'
                          ? 'bg-blue-600 text-white'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      Yes
                    </button>
                    <button
                      type="button"
                      onClick={() => handleAlsoShowInChange(option.id, 'value', 'no')}
                      className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                        alsoShowInOptions[option.id]?.value === 'no'
                          ? 'bg-blue-600 text-white'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      No
                    </button>
                  </div>
                </div>
              ))}
            </div>
            
            {/* Visual indicator when options are selected */}
            {dynamicAlsoShowInOptions.some(option => alsoShowInOptions[option.id]?.value === 'yes') && (
              <div className="mt-6 p-4 bg-blue-50 rounded-md">
                <h4 className="text-sm font-medium text-blue-800 font-['Montserrat'] mb-2">
                  Active Options:
                </h4>
                <div className="flex flex-wrap gap-2">
                  {dynamicAlsoShowInOptions
                    .filter(option => alsoShowInOptions[option.id]?.value === 'yes')
                    .map(option => (
                      <span 
                        key={option.id}
                        className="px-3 py-1 bg-blue-200 text-blue-800 rounded-full text-xs font-['Montserrat']"
                      >
                        {option.label}
                      </span>
                    ))
                  }
                </div>
                <p className="text-sm text-blue-700 font-['Montserrat'] mt-2">
                  These options will be applied to all variants of this product
                </p>
              </div>
            )}
          </div>

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
