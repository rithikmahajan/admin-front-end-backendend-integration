import React, { useState, useMemo, useCallback, memo } from 'react';
import { Search, Filter, RotateCcw, Calendar, Edit2, Trash2, Download, Info, Check, X } from 'lucide-react';

/**
 * Database Component - Performance Optimized
 * 
 * A comprehensive inventory management interface that displays:
 * - Product data with images, categories, and details
 * - Advanced filtering capabilities
 * - Size, quantity, and pricing information
 * - Product status tracking
 * - Bulk actions and export functionality
 * 
 * Performance Optimizations:
 * - Memoized components to prevent unnecessary re-renders
 * - useCallback for stable function references
 * - Optimized filtering with proper dependency arrays
 * - Extracted sub-components for better code splitting
 * - Reduced object creation in render cycles
 */

// Constants moved outside component to prevent recreation
const FILTER_OPTIONS = {
  categories: ['Profile', 'inventory list', 'Order statistics'],
  subcategories: [
    'Name', 'EMAIL', 'PHONE', 'Date of Birth', 'ADDRESS', 
    'delete account record', 'user details', 'app reviews', 
    'GENDER', 'password details', 'points', 'PG rent receipt – Duly stamped'
  ],
  filterBy: ['category', 'status'],
  dates: ['today', 'week']
};

// Memoized Status Badge Component
const StatusBadge = memo(({ status }) => {
  const getStatusColor = useCallback((status) => {
    switch (status) {
      case 'good to go':
        return 'bg-green-100 text-green-600';
      case 'low':
        return 'bg-purple-100 text-purple-600';
      case 'finished':
        return 'bg-red-100 text-red-600';
      default:
        return 'bg-gray-100 text-gray-600';
    }
  }, []);

  return (
    <div className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(status)}`}>
      {status}
    </div>
  );
});

StatusBadge.displayName = 'StatusBadge';

// Memoized Action Buttons Component
const ActionButtons = memo(({ productId, onEdit, onDelete, onDownload }) => (
  <div className="flex gap-1">
    <button 
      className="p-1.5 bg-gray-100 rounded hover:bg-gray-200"
      onClick={() => onEdit(productId)}
      aria-label="Edit product"
    >
      <Edit2 className="h-3 w-3 text-gray-600" />
    </button>
    <button 
      className="p-1.5 bg-gray-100 rounded hover:bg-gray-200"
      onClick={() => onDelete(productId)}
      aria-label="Delete product"
    >
      <Trash2 className="h-3 w-3 text-gray-600" />
    </button>
    <button 
      className="p-1.5 bg-gray-100 rounded hover:bg-gray-200"
      onClick={() => onDownload(productId)}
      aria-label="Download product data"
    >
      <Download className="h-3 w-3 text-gray-600" />
    </button>
  </div>
));

ActionButtons.displayName = 'ActionButtons';

// Memoized Availability Button Component
const AvailabilityButton = memo(({ available, label }) => (
  <div className="flex items-center justify-center">
    <button 
      className={`w-6 h-6 rounded-full flex items-center justify-center text-white text-xs font-bold ${
        available ? 'bg-green-500 hover:bg-green-600' : 'bg-red-500 hover:bg-red-600'
      } transition-colors cursor-pointer`}
      title={available ? `${label} available` : `No ${label.toLowerCase()}`}
    >
      {available ? <Check className="h-3 w-3" /> : <X className="h-3 w-3" />}
    </button>
  </div>
));

AvailabilityButton.displayName = 'AvailabilityButton';

// Memoized Product Image Component
const ProductImage = memo(({ image, productName }) => (
  <div className="flex items-center gap-2">
    <div className="w-12 h-14 bg-gray-200 rounded overflow-hidden">
      <img
        src={image}
        alt={productName}
        className="w-full h-full object-cover"
        loading="lazy"
      />
    </div>
    <div className="flex gap-1">
      {[1, 2, 3, 4].map((i) => (
        <div key={i} className="w-3 h-3 bg-gray-300 rounded"></div>
      ))}
    </div>
  </div>
));

ProductImage.displayName = 'ProductImage';

// Memoized Size Data Component
const SizeData = memo(({ sizes, dataType }) => (
  <div className="space-y-1">
    {sizes.map((size) => (
      <div key={`${size.size}-${dataType}`} className="text-xs text-gray-900">
        {dataType === 'size' ? size.size : size[dataType]}
      </div>
    ))}
  </div>
));

SizeData.displayName = 'SizeData';

// Memoized Product Row Component for better performance
const ProductRow = memo(({ product, onEdit, onDelete, onDownload }) => (
  <tr className="hover:bg-gray-50">
    {/* Product Images */}
    <td className="px-4 py-4">
      <ProductImage image={product.image} productName={product.productName} />
    </td>
    
    {/* Product Name */}
    <td className="px-4 py-4">
      <div className="font-medium text-gray-900 text-sm">{product.productName}</div>
      <div className="flex items-center gap-1 mt-1">
        <span className="w-2 h-2 bg-black rounded-full"></span>
        <span className="w-2 h-2 bg-gray-400 rounded-full"></span>
      </div>
    </td>
    
    {/* Category */}
    <td className="px-4 py-4">
      <span className="text-sm text-gray-900">{product.category}</span>
    </td>
    
    {/* Subcategory */}
    <td className="px-4 py-4">
      <span className="text-sm text-gray-900">{product.subcategory}</span>
      <div className="text-xs text-gray-500 mt-1">{product.returnable}</div>
    </td>
    
    {/* Price */}
    <td className="px-4 py-4">
      <div className="space-y-1">
        <div className="text-xs text-gray-600">myntra</div>
        <div className="text-xs text-gray-600">amazon</div>
        <div className="text-xs text-gray-600">flipkart</div>
        <div className="text-xs text-gray-600">nykaa</div>
      </div>
    </td>
    
    {/* Size */}
    <td className="px-4 py-4">
      <SizeData sizes={product.sizes} dataType="size" />
    </td>
    
    {/* Quantity */}
    <td className="px-4 py-4">
      <SizeData sizes={product.sizes} dataType="quantity" />
    </td>
    
    {/* Sale Price */}
    <td className="px-4 py-4">
      <SizeData sizes={product.sizes} dataType="salePrice" />
    </td>
    
    {/* Actual Price */}
    <td className="px-4 py-4">
      <SizeData sizes={product.sizes} dataType="actualPrice" />
    </td>
    
    {/* SKU */}
    <td className="px-4 py-4">
      <span className="text-xs text-gray-600">{product.sku}</span>
    </td>
    
    {/* Barcode */}
    <td className="px-4 py-4">
      <span className="text-xs text-gray-600">{product.barcode}</span>
    </td>
    
    {/* Description */}
    <td className="px-4 py-4">
      <span className="text-xs text-gray-900 truncate max-w-xs">{product.description}</span>
    </td>
    
    {/* Manufacturing Details */}
    <td className="px-4 py-4">
      <span className="text-xs text-gray-900 truncate max-w-xs">{product.manufacturingDetails}</span>
    </td>
    
    {/* Shipping Returns */}
    <td className="px-4 py-4">
      <span className="text-xs text-gray-900">{product.shippingReturns}</span>
    </td>
    
    {/* Meta Title */}
    <td className="px-4 py-4">
      <span className="text-xs text-gray-900 truncate max-w-xs">{product.metaTitle}</span>
    </td>
    
    {/* Meta Description */}
    <td className="px-4 py-4">
      <span className="text-xs text-gray-900 truncate max-w-xs">{product.metaDescription}</span>
    </td>
    
    {/* Slug URL */}
    <td className="px-4 py-4">
      <span className="text-xs text-gray-900 truncate max-w-xs">{product.slugUrl}</span>
    </td>
    
    {/* Photos */}
    <td className="px-4 py-4">
      <AvailabilityButton available={product.photos} label="Photos" />
    </td>
    
    {/* Size Chart */}
    <td className="px-4 py-4">
      <AvailabilityButton available={product.sizeChart} label="Size chart" />
    </td>
    
    {/* Actions */}
    <td className="px-4 py-4">
      <div className="flex flex-col items-center gap-2">
        <StatusBadge status={product.status} />
        <ActionButtons 
          productId={product.id}
          onEdit={onEdit}
          onDelete={onDelete}
          onDownload={onDownload}
        />
      </div>
    </td>
  </tr>
));

ProductRow.displayName = 'ProductRow';

const Database = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState({
    category: '',
    subcategory: '',
    date: '',
    filterBy: ''
  });

  // Sample product data - memoized to prevent recreation
  const sampleProducts = useMemo(() => [
    {
      id: 1,
      image: '/api/placeholder/120/140',
      productName: 'T shirt',
      category: 'T shirt',
      subcategory: 'T shirt',
      returnable: 'returnable',
      sizes: [
        { size: 'small', quantity: 5, myntraPrice: 4566, amazonPrice: 4566, flipkartPrice: 4566, nykaPrice: 4566, salePrice: 4566, actualPrice: 4566 },
        { size: 'medium', quantity: 10, myntraPrice: 4566, amazonPrice: 4566, flipkartPrice: 4566, nykaPrice: 4566, salePrice: 4566, actualPrice: 4566 },
        { size: 'large', quantity: 15, myntraPrice: 4566, amazonPrice: 4566, flipkartPrice: 4566, nykaPrice: 4566, salePrice: 4566, actualPrice: 4566 }
      ],
      sku: 'blk/m/inso123',
      barcode: '45660000000000',
      description: 'this is a shirt',
      manufacturingDetails: 'mfd by apparels pvt ltd',
      shippingReturns: '7 day return',
      metaTitle: 'dhdhd/dhdhdh',
      metaDescription: 'ths/ isnsn/s',
      slugUrl: 'ths/ isnsn/s',
      photos: true,
      sizeChart: true,
      status: 'good to go'
    },
    {
      id: 2,
      image: '/api/placeholder/120/140',
      productName: 'T shirt',
      category: 'T shirt',
      subcategory: 'T shirt',
      returnable: 'returnable',
      sizes: [
        { size: 'small', quantity: 3, myntraPrice: 3999, amazonPrice: 3999, flipkartPrice: 3999, nykaPrice: 3999, salePrice: 3999, actualPrice: 3999 },
        { size: 'medium', quantity: 8, myntraPrice: 3999, amazonPrice: 3999, flipkartPrice: 3999, nykaPrice: 3999, salePrice: 3999, actualPrice: 3999 },
        { size: 'large', quantity: 12, myntraPrice: 3999, amazonPrice: 3999, flipkartPrice: 3999, nykaPrice: 3999, salePrice: 3999, actualPrice: 3999 }
      ],
      sku: 'red/l/inso124',
      barcode: '45660000000001',
      description: 'red cotton shirt',
      manufacturingDetails: 'mfd by textile mills',
      shippingReturns: '7 day return',
      metaTitle: 'red-shirt-cotton',
      metaDescription: 'comfortable red shirt',
      slugUrl: 'red-cotton-shirt',
      photos: true,
      sizeChart: true,
      status: 'low'
    },
    {
      id: 3,
      image: '/api/placeholder/120/140',
      productName: 'T shirt',
      category: 'T shirt',
      subcategory: 'T shirt',
      returnable: 'returnable',
      sizes: [
        { size: 'small', quantity: 0, myntraPrice: 2999, amazonPrice: 2999, flipkartPrice: 2999, nykaPrice: 2999, salePrice: 2999, actualPrice: 2999 },
        { size: 'medium', quantity: 2, myntraPrice: 2999, amazonPrice: 2999, flipkartPrice: 2999, nykaPrice: 2999, salePrice: 2999, actualPrice: 2999 },
        { size: 'large', quantity: 5, myntraPrice: 2999, amazonPrice: 2999, flipkartPrice: 2999, nykaPrice: 2999, salePrice: 2999, actualPrice: 2999 }
      ],
      sku: 'blu/xl/inso125',
      barcode: '45660000000002',
      description: 'blue formal shirt',
      manufacturingDetails: 'mfd by fashion house',
      shippingReturns: '7 day return',
      metaTitle: 'blue-formal-shirt',
      metaDescription: 'professional blue shirt',
      slugUrl: 'blue-formal-shirt',
      photos: true,
      sizeChart: false,
      status: 'finished'
    }
  ], []);

  // Optimized filter function with proper memoization
  const filteredProducts = useMemo(() => {
    return sampleProducts.filter(product => {
      const matchesSearch = !searchTerm || 
        product.productName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.sku.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesCategory = !filters.category || product.category === filters.category;
      const matchesSubcategory = !filters.subcategory || product.subcategory === filters.subcategory;
      
      return matchesSearch && matchesCategory && matchesSubcategory;
    });
  }, [sampleProducts, searchTerm, filters.category, filters.subcategory]);

  // Memoized event handlers to prevent unnecessary re-renders
  const handleFilterChange = useCallback((key, value) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  }, []);

  const handleSearchChange = useCallback((e) => {
    setSearchTerm(e.target.value);
  }, []);

  const resetFilters = useCallback(() => {
    setFilters({
      category: '',
      subcategory: '',
      date: '',
      filterBy: ''
    });
    setSearchTerm('');
  }, []);

  // Action handlers with useCallback for performance
  const handleEdit = useCallback((productId) => {
    console.log('Edit product:', productId);
    // Add edit functionality here
  }, []);

  const handleDelete = useCallback((productId) => {
    console.log('Delete product:', productId);
    // Add delete functionality here
  }, []);

  const handleDownload = useCallback((productId) => {
    console.log('Download product:', productId);
    // Add download functionality here
  }, []);

  return (
    <div className="bg-white min-h-screen">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-6 py-6">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold text-black">database</h1>
          <div className="flex items-center gap-4 text-sm text-gray-600">
            <span>06/05/1999 - 06/05/1999</span>
            <Calendar className="h-5 w-5" />
          </div>
        </div>
      </div>

      {/* Search and Filter Bar */}
      <div className="px-6 py-4 bg-gray-50 border-b">
        <div className="flex items-center gap-4">
          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search"
              value={searchTerm}
              onChange={handleSearchChange}
              className="pl-10 pr-4 py-2 border border-gray-300 rounded-md text-sm focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          {/* Filter Icon */}
          <Filter className="h-5 w-5 text-gray-600" />

          {/* Filter Controls */}
          <select
            value={filters.filterBy}
            onChange={(e) => handleFilterChange('filterBy', e.target.value)}
            className="border border-gray-300 rounded-md px-3 py-2 text-sm focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="">Filter By</option>
            {FILTER_OPTIONS.filterBy.map(option => (
              <option key={option} value={option}>{option}</option>
            ))}
          </select>

          <select
            value={filters.date}
            onChange={(e) => handleFilterChange('date', e.target.value)}
            className="border border-gray-300 rounded-md px-3 py-2 text-sm focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="">Date</option>
            {FILTER_OPTIONS.dates.map(option => (
              <option key={option} value={option}>
                {option === 'today' ? 'Today' : 'This Week'}
              </option>
            ))}
          </select>

          <select
            value={filters.category}
            onChange={(e) => handleFilterChange('category', e.target.value)}
            className="border border-gray-300 rounded-md px-3 py-2 text-sm focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="">Choose category</option>
            {FILTER_OPTIONS.categories.map(option => (
              <option key={option} value={option}>{option}</option>
            ))}
          </select>

          <select
            value={filters.subcategory}
            onChange={(e) => handleFilterChange('subcategory', e.target.value)}
            className="border border-gray-300 rounded-md px-3 py-2 text-sm focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="">choose sub category</option>
            {FILTER_OPTIONS.subcategories.map(option => (
              <option key={option} value={option}>{option}</option>
            ))}
          </select>

          <button
            onClick={resetFilters}
            className="text-red-500 hover:text-red-600 text-sm font-medium flex items-center gap-1"
          >
            <RotateCcw className="h-4 w-4" />
            Reset Filter
          </button>

          <button className="bg-black text-white px-6 py-2 rounded-md text-sm font-medium hover:bg-gray-800">
            Apply
          </button>
        </div>
      </div>

      {/* Content Area */}
      <div className="px-6 py-4">
        <h2 className="text-lg font-semibold text-black mb-4">
          showing inventory data ({filteredProducts.length} items)
        </h2>

        {/* Optimized Table */}
        <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full">
              <thead className="bg-gray-50 border-b">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">Image</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">Product Name</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">Category</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">sub categories</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">Price</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">size</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">quantity</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">sale price</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">actual price</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">SKU</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">barcode no.</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">Description</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">Manufacturing details</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">Shipping returns and exchange</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">meta title</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">meta description</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">slug URL</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">photos</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">size chart</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">Action</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredProducts.map((product) => (
                  <ProductRow 
                    key={product.id} 
                    product={product} 
                    onEdit={handleEdit}
                    onDelete={handleDelete}
                    onDownload={handleDownload}
                  />
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Database;
