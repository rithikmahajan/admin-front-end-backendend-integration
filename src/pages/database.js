import React, { useState, useMemo } from 'react';
import { Search, Filter, RotateCcw, Calendar, Edit2, Trash2, Download, Info, Check, X } from 'lucide-react';

/**
 * Database Component
 * 
 * A comprehensive inventory management interface that displays:
 * - Product data with images, categories, and details
 * - Advanced filtering capabilities
 * - Size, quantity, and pricing information
 * - Product status tracking
 * - Bulk actions and export functionality
 * 
 * Features:
 * - Responsive table layout
 * - Advanced filtering options
 * - Real-time search
 * - Export capabilities
 * - Status indicators
 */
const Database = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState({
    category: '',
    subcategory: '',
    date: '',
    filterBy: ''
  });

  // Sample product data
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

  // Filter products based on search term and filters
  const filteredProducts = useMemo(() => {
    return sampleProducts.filter(product => {
      const matchesSearch = product.productName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           product.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           product.sku.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesCategory = !filters.category || product.category === filters.category;
      const matchesSubcategory = !filters.subcategory || product.subcategory === filters.subcategory;
      
      return matchesSearch && matchesCategory && matchesSubcategory;
    });
  }, [sampleProducts, searchTerm, filters]);

  const handleFilterChange = (key, value) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  const resetFilters = () => {
    setFilters({
      category: '',
      subcategory: '',
      date: '',
      filterBy: ''
    });
    setSearchTerm('');
  };

  const getStatusColor = (status) => {
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
  };

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
              onChange={(e) => setSearchTerm(e.target.value)}
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
            <option value="category">Category</option>
            <option value="status">Status</option>
          </select>

          <select
            value={filters.date}
            onChange={(e) => handleFilterChange('date', e.target.value)}
            className="border border-gray-300 rounded-md px-3 py-2 text-sm focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="">Date</option>
            <option value="today">Today</option>
            <option value="week">This Week</option>
          </select>

          <select
            value={filters.category}
            onChange={(e) => handleFilterChange('category', e.target.value)}
            className="border border-gray-300 rounded-md px-3 py-2 text-sm focus:ring-blue-500 focus:border-blue-500"
          >
          
            <option value="Profile">Profile</option>
            <option value="inventory list">inventory list</option>
            <option value="Order statistics">Order statistics</option>
         
          </select>

          <select
            value={filters.subcategory}
            onChange={(e) => handleFilterChange('subcategory', e.target.value)}
            className="border border-gray-300 rounded-md px-3 py-2 text-sm focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="">choose sub category</option>
            <option value="Name">Name</option>
            <option value="EMAIL">EMAIL</option>
            <option value="PHONE">PHONE</option>
            <option value="Date of Birth">Date of Birth</option>
            <option value="ADDRESS">ADDRESS</option>
            <option value="delete account record">delete account record</option>
            <option value="user details">user details</option>
            <option value="app reviews">app reviews</option>
            <option value="GENDER">GENDER</option>
            <option value="password details">password details</option>
            <option value="points">points</option>
            <option value="PG rent receipt – Duly stamped">PG rent receipt – Duly stamped</option>
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
          showing inventory data
        </h2>

        {/* Table */}
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
                  <tr key={product.id} className="hover:bg-gray-50">
                    {/* Product Images */}
                    <td className="px-4 py-4">
                      <div className="flex items-center gap-2">
                        <div className="w-12 h-14 bg-gray-200 rounded overflow-hidden">
                          <img
                            src={product.image}
                            alt={product.productName}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="flex gap-1">
                          {[1, 2, 3, 4].map((i) => (
                            <div key={i} className="w-3 h-3 bg-gray-300 rounded"></div>
                          ))}
                        </div>
                      </div>
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
                      <div className="space-y-1">
                        {product.sizes.map((size) => (
                          <div key={size.size} className="text-xs text-gray-900">{size.size}</div>
                        ))}
                      </div>
                    </td>
                    
                    {/* Quantity */}
                    <td className="px-4 py-4">
                      <div className="space-y-1">
                        {product.sizes.map((size) => (
                          <div key={size.size} className="text-xs text-gray-900">{size.quantity}</div>
                        ))}
                      </div>
                    </td>
                    
                    {/* Sale Price */}
                    <td className="px-4 py-4">
                      <div className="space-y-1">
                        {product.sizes.map((size) => (
                          <div key={size.size} className="text-xs text-gray-600">{size.salePrice}</div>
                        ))}
                      </div>
                    </td>
                    
                    {/* Actual Price */}
                    <td className="px-4 py-4">
                      <div className="space-y-1">
                        {product.sizes.map((size) => (
                          <div key={size.size} className="text-xs text-gray-600">{size.actualPrice}</div>
                        ))}
                      </div>
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
                      <div className="flex items-center justify-center">
                        <button 
                          className={`w-6 h-6 rounded-full flex items-center justify-center text-white text-xs font-bold ${
                            product.photos ? 'bg-green-500 hover:bg-green-600' : 'bg-red-500 hover:bg-red-600'
                          } transition-colors cursor-pointer`}
                          title={product.photos ? 'Photos available' : 'No photos'}
                        >
                          {product.photos ? <Check className="h-3 w-3" /> : <X className="h-3 w-3" />}
                        </button>
                      </div>
                    </td>
                    
                    {/* Size Chart */}
                    <td className="px-4 py-4">
                      <div className="flex items-center justify-center">
                        <button 
                          className={`w-6 h-6 rounded-full flex items-center justify-center text-white text-xs font-bold ${
                            product.sizeChart ? 'bg-green-500 hover:bg-green-600' : 'bg-red-500 hover:bg-red-600'
                          } transition-colors cursor-pointer`}
                          title={product.sizeChart ? 'Size chart available' : 'No size chart'}
                        >
                          {product.sizeChart ? <Check className="h-3 w-3" /> : <X className="h-3 w-3" />}
                        </button>
                      </div>
                    </td>
                    
                    {/* Actions */}
                    <td className="px-4 py-4">
                      <div className="flex flex-col items-center gap-2">
                        <div className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(product.status)}`}>
                          {product.status}
                        </div>
                        <div className="flex gap-1">
                          <button className="p-1.5 bg-gray-100 rounded hover:bg-gray-200">
                            <Edit2 className="h-3 w-3 text-gray-600" />
                          </button>
                          <button className="p-1.5 bg-gray-100 rounded hover:bg-gray-200">
                            <Trash2 className="h-3 w-3 text-gray-600" />
                          </button>
                          <button className="p-1.5 bg-gray-100 rounded hover:bg-gray-200">
                            <Download className="h-3 w-3 text-gray-600" />
                          </button>
                        </div>
                      </div>
                    </td>
                  </tr>
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
