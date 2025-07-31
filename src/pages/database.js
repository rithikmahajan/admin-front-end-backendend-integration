import React, { useState, useMemo } from 'react';
import { Search, Filter, RotateCcw, ChevronDown, Calendar, Edit2, Trash2, Download, Eye, Printer } from 'lucide-react';

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
      <div className="bg-white border-b border-gray-200 p-4">
        <h1 className="text-2xl font-bold text-center text-black">database</h1>
      </div>

      {/* Search Bar */}
      <div className="px-6 py-4">
        <div className="relative max-w-md">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type="text"
            placeholder="Search"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="block w-full pl-10 pr-3 py-2.5 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 shadow-sm"
          />
        </div>
      </div>

      {/* Filter Section */}
      <div className="px-6 py-4">
        <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
          <div className="flex flex-wrap items-center gap-4">
            {/* Filter Icon */}
            <Filter className="h-5 w-5 text-gray-600" />
            
            {/* Filter By */}
            <div className="flex flex-col">
              <label className="text-sm font-bold text-gray-800 mb-1">Filter By</label>
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  value={filters.filterBy}
                  onChange={(e) => handleFilterChange('filterBy', e.target.value)}
                  className="border-b border-gray-300 bg-transparent text-sm focus:outline-none focus:border-blue-500"
                />
                <ChevronDown className="h-4 w-4 text-gray-400" />
              </div>
            </div>

            {/* Date Filter */}
            <div className="flex flex-col">
              <label className="text-sm font-bold text-gray-800 mb-1">Date</label>
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  value={filters.date}
                  onChange={(e) => handleFilterChange('date', e.target.value)}
                  className="border-b border-gray-300 bg-transparent text-sm focus:outline-none focus:border-blue-500"
                />
                <ChevronDown className="h-4 w-4 text-gray-400" />
              </div>
            </div>

            {/* Category Filter */}
            <div className="flex flex-col">
              <label className="text-sm font-bold text-gray-800 mb-1">choose db category</label>
              <div className="flex items-center gap-2">
                <select
                  value={filters.category}
                  onChange={(e) => handleFilterChange('category', e.target.value)}
                  className="border-b border-gray-300 bg-transparent text-sm focus:outline-none focus:border-blue-500"
                >
                  <option value="">All Categories</option>
                  <option value="T shirt">T shirt</option>
                  <option value="Jeans">Jeans</option>
                  <option value="Shoes">Shoes</option>
                </select>
                <ChevronDown className="h-4 w-4 text-gray-400" />
              </div>
            </div>

            {/* Subcategory Filter */}
            <div className="flex flex-col">
              <label className="text-sm font-bold text-gray-800 mb-1">choose sub category</label>
              <div className="flex items-center gap-2">
                <select
                  value={filters.subcategory}
                  onChange={(e) => handleFilterChange('subcategory', e.target.value)}
                  className="border-b border-gray-300 bg-transparent text-sm focus:outline-none focus:border-blue-500"
                >
                  <option value="">All Subcategories</option>
                  <option value="T shirt">T shirt</option>
                  <option value="Polo">Polo</option>
                  <option value="Tank Top">Tank Top</option>
                </select>
                <ChevronDown className="h-4 w-4 text-gray-400" />
              </div>
            </div>

            {/* Reset Filter */}
            <button
              onClick={resetFilters}
              className="flex items-center gap-2 text-red-500 hover:text-red-600 transition-colors"
            >
              <RotateCcw className="h-4 w-4" />
              <span className="text-sm font-semibold">Reset Filter</span>
            </button>
          </div>

          {/* Date Range */}
          <div className="flex items-center gap-2 mt-4 justify-end">
            <span className="text-sm text-gray-600">06/05/1999 - 06/05/1999</span>
            <Calendar className="h-5 w-5 text-gray-400" />
          </div>

          {/* Apply Button */}
          <div className="flex justify-center mt-4">
            <button className="bg-black text-white px-6 py-2 rounded-full font-semibold hover:bg-gray-800 transition-colors">
              Apply
            </button>
          </div>
        </div>
      </div>

      {/* Content Area */}
      <div className="px-6 py-4">
        <h2 className="text-xl font-bold text-center text-black mb-6 tracking-tight">
          showing inventory data
        </h2>

        {/* Table Header */}
        <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Image</th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Product Name</th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Category</th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">sub categories</th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Price</th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">size</th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">quantity</th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">sale price</th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">actual price</th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">SKU</th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">barcode no.</th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Description</th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Manufacturing details</th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Shipping returns and exchange</th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">meta title</th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">meta description</th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">slug URL</th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">photos</th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">size chart</th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Action</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredProducts.map((product) => (
                  <React.Fragment key={product.id}>
                    {product.sizes.map((sizeInfo, sizeIndex) => (
                      <tr key={`${product.id}-${sizeIndex}`} className="hover:bg-gray-50">
                        {/* Product Image - only show on first size row */}
                        {sizeIndex === 0 && (
                          <td rowSpan={product.sizes.length} className="px-4 py-4 align-top">
                            <div className="w-20 h-24 bg-gray-200 rounded-lg overflow-hidden">
                              <img
                                src={product.image}
                                alt={product.productName}
                                className="w-full h-full object-cover"
                              />
                            </div>
                            {/* Additional small images */}
                            <div className="flex gap-1 mt-2">
                              {[1, 2, 3, 4].map((i) => (
                                <div key={i} className="w-6 h-6 bg-gray-200 rounded"></div>
                              ))}
                            </div>
                          </td>
                        )}
                        
                        {/* Product Name - only show on first size row */}
                        {sizeIndex === 0 && (
                          <td rowSpan={product.sizes.length} className="px-4 py-4 align-top">
                            <div className="font-medium text-gray-900">{product.productName}</div>
                            <div className="flex items-center gap-1 mt-1">
                              <span className="w-2 h-2 bg-gray-400 rounded-full"></span>
                              <span className="w-2 h-2 bg-gray-400 rounded-full"></span>
                            </div>
                          </td>
                        )}
                        
                        {/* Category - only show on first size row */}
                        {sizeIndex === 0 && (
                          <td rowSpan={product.sizes.length} className="px-4 py-4 align-top">
                            <span className="text-gray-900 font-medium">{product.category}</span>
                          </td>
                        )}
                        
                        {/* Subcategory - only show on first size row */}
                        {sizeIndex === 0 && (
                          <td rowSpan={product.sizes.length} className="px-4 py-4 align-top">
                            <span className="text-gray-900 font-medium">{product.subcategory}</span>
                            <div className="text-sm text-gray-500 mt-1">{product.returnable}</div>
                          </td>
                        )}
                        
                        {/* Prices */}
                        <td className="px-4 py-2">
                          <div className="space-y-1">
                            <div className="text-xs text-gray-600">myntra</div>
                            <div className="text-xs text-gray-600">amazon</div>
                            <div className="text-xs text-gray-600">flipkart</div>
                            <div className="text-xs text-gray-600">nykaa</div>
                          </div>
                        </td>
                        
                        {/* Size */}
                        <td className="px-4 py-2">
                          <span className="text-sm font-medium text-black">{sizeInfo.size}</span>
                        </td>
                        
                        {/* Quantity */}
                        <td className="px-4 py-2">
                          <span className="text-sm font-medium text-black">{sizeInfo.quantity}</span>
                        </td>
                        
                        {/* Sale Price */}
                        <td className="px-4 py-2">
                          <div className="space-y-1">
                            <div className="text-xs text-gray-600">{sizeInfo.myntraPrice}</div>
                            <div className="text-xs text-gray-600">{sizeInfo.amazonPrice}</div>
                            <div className="text-xs text-gray-600">{sizeInfo.flipkartPrice}</div>
                            <div className="text-xs text-gray-600">{sizeInfo.nykaPrice}</div>
                          </div>
                        </td>
                        
                        {/* Actual Price */}
                        <td className="px-4 py-2">
                          <div className="space-y-1">
                            <div className="text-xs text-gray-600">{sizeInfo.actualPrice}</div>
                            <div className="text-xs text-gray-600">{sizeInfo.actualPrice}</div>
                            <div className="text-xs text-gray-600">{sizeInfo.actualPrice}</div>
                            <div className="text-xs text-gray-600">{sizeInfo.actualPrice}</div>
                          </div>
                        </td>
                        
                        {/* SKU - only show on first size row */}
                        {sizeIndex === 0 && (
                          <td rowSpan={product.sizes.length} className="px-4 py-4 align-top">
                            <span className="text-xs text-gray-600">{product.sku}</span>
                          </td>
                        )}
                        
                        {/* Barcode - only show on first size row */}
                        {sizeIndex === 0 && (
                          <td rowSpan={product.sizes.length} className="px-4 py-4 align-top">
                            <span className="text-xs text-gray-600">{product.barcode}</span>
                          </td>
                        )}
                        
                        {/* Description - only show on first size row */}
                        {sizeIndex === 0 && (
                          <td rowSpan={product.sizes.length} className="px-4 py-4 align-top">
                            <span className="text-sm text-gray-900">{product.description}</span>
                          </td>
                        )}
                        
                        {/* Manufacturing Details - only show on first size row */}
                        {sizeIndex === 0 && (
                          <td rowSpan={product.sizes.length} className="px-4 py-4 align-top">
                            <span className="text-sm text-gray-900">{product.manufacturingDetails}</span>
                          </td>
                        )}
                        
                        {/* Shipping Returns - only show on first size row */}
                        {sizeIndex === 0 && (
                          <td rowSpan={product.sizes.length} className="px-4 py-4 align-top">
                            <span className="text-sm text-gray-900">{product.shippingReturns}</span>
                          </td>
                        )}
                        
                        {/* Meta Title - only show on first size row */}
                        {sizeIndex === 0 && (
                          <td rowSpan={product.sizes.length} className="px-4 py-4 align-top">
                            <span className="text-sm text-gray-900">{product.metaTitle}</span>
                          </td>
                        )}
                        
                        {/* Meta Description - only show on first size row */}
                        {sizeIndex === 0 && (
                          <td rowSpan={product.sizes.length} className="px-4 py-4 align-top">
                            <span className="text-sm text-gray-900">{product.metaDescription}</span>
                          </td>
                        )}
                        
                        {/* Slug URL - only show on first size row */}
                        {sizeIndex === 0 && (
                          <td rowSpan={product.sizes.length} className="px-4 py-4 align-top">
                            <span className="text-sm text-gray-900">{product.slugUrl}</span>
                          </td>
                        )}
                        
                        {/* Photos - only show on first size row */}
                        {sizeIndex === 0 && (
                          <td rowSpan={product.sizes.length} className="px-4 py-4 align-top">
                            <div className="flex items-center gap-2">
                              <span className={`w-3 h-3 rounded-full ${product.photos ? 'bg-green-500' : 'bg-red-500'}`}></span>
                            </div>
                          </td>
                        )}
                        
                        {/* Size Chart - only show on first size row */}
                        {sizeIndex === 0 && (
                          <td rowSpan={product.sizes.length} className="px-4 py-4 align-top">
                            <div className="flex items-center gap-2">
                              <span className={`w-3 h-3 rounded-full ${product.sizeChart ? 'bg-green-500' : 'bg-red-500'}`}></span>
                            </div>
                          </td>
                        )}
                        
                        {/* Actions - only show on first size row */}
                        {sizeIndex === 0 && (
                          <td rowSpan={product.sizes.length} className="px-4 py-4 align-top">
                            <div className="flex flex-col gap-2">
                              <div className={`px-3 py-1 rounded text-xs font-bold ${getStatusColor(product.status)}`}>
                                {product.status}
                              </div>
                              <div className="flex gap-2">
                                <button className="p-2 bg-gray-100 rounded hover:bg-gray-200 transition-colors">
                                  <Edit2 className="h-4 w-4 text-gray-600" />
                                </button>
                                <button className="p-2 bg-gray-100 rounded hover:bg-gray-200 transition-colors">
                                  <Trash2 className="h-4 w-4 text-gray-600" />
                                </button>
                              </div>
                              <div className="flex flex-col gap-2">
                                <button className="p-2 bg-gray-100 rounded hover:bg-gray-200 transition-colors">
                                  <Printer className="h-4 w-4 text-gray-600" />
                                </button>
                                <button className="p-2 bg-gray-100 rounded hover:bg-gray-200 transition-colors">
                                  <Eye className="h-4 w-4 text-gray-600" />
                                </button>
                                <button className="p-2 bg-gray-100 rounded hover:bg-gray-200 transition-colors">
                                  <Download className="h-4 w-4 text-gray-600" />
                                </button>
                              </div>
                            </div>
                          </td>
                        )}
                      </tr>
                    ))}
                  </React.Fragment>
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
