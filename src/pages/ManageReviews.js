import React, { useState, useEffect } from 'react';
import { Search, ChevronDown, Star } from 'lucide-react';

const ManageReviews = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All categories');
  const [selectedSubcategory, setSelectedSubcategory] = useState('sub categories');
  const [categoryDropdownOpen, setCategoryDropdownOpen] = useState(false);
  const [subcategoryDropdownOpen, setSubcategoryDropdownOpen] = useState(false);
  
  // Mock data for products with reviews
  const [products] = useState([
    {
      id: 1,
      name: 'Tshirt',
      image: 'http://localhost:3845/assets/fcfe140894624215171c88f4e69e22948fa65f2b.png',
      rating: 4,
      sizeRating: 3, // 1-5 scale (too small to too big)
      comfortRating: 4,
      durabilityRating: 4,
      category: 'category',
      subcategory: 'subcategory',
      reviewsEnabled: true
    },
    {
      id: 2,
      name: 'manage reviews',
      image: 'http://localhost:3845/assets/fcfe140894624215171c88f4e69e22948fa65f2b.png',
      rating: 4,
      sizeRating: 3,
      comfortRating: 3,
      durabilityRating: 4,
      category: 'category',
      subcategory: 'subcategory',
      reviewsEnabled: true
    }
  ]);

  const categories = ['All categories', 'clothing', 'accessories', 'footwear'];
  const subcategories = ['sub categories', 'tshirts', 'pants', 'shoes'];

  const renderStars = (rating) => {
    return [...Array(5)].map((_, index) => (
      <Star
        key={index}
        className={`w-4 h-4 ${
          index < rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'
        }`}
      />
    ));
  };

  const renderRatingScale = (rating, label) => {
    return (
      <div className="flex flex-col items-start space-y-2 mb-4">
        <div className="text-xs font-semibold text-gray-700">
          How was the {label}?
        </div>
        <div className="flex items-center space-x-1">
          {[1, 2, 3, 4, 5].map((value) => (
            <React.Fragment key={value}>
              <div
                className={`w-3 h-3 rounded-full border border-black ${
                  value === rating ? 'bg-black' : 'bg-white'
                }`}
              />
              {value < 5 && <div className="w-4 h-px bg-black" />}
            </React.Fragment>
          ))}
        </div>
      </div>
    );
  };

  const toggleReviews = (productId) => {
    // In a real app, this would make an API call
    console.log(`Toggle reviews for product ${productId}`);
  };

  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="bg-white min-h-screen p-6">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-6">Manage reviews</h1>
        
        {/* Search and Filter Bar */}
        <div className="flex gap-4 mb-6">
          {/* Search Input */}
          <div className="flex-1 max-w-md">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
              />
            </div>
          </div>

          {/* Category Dropdown */}
          <div className="relative">
            <button
              onClick={() => setCategoryDropdownOpen(!categoryDropdownOpen)}
              className="flex items-center justify-between px-4 py-2.5 border-2 border-black rounded-xl w-40 text-sm font-medium"
            >
              {selectedCategory}
              <ChevronDown className="w-4 h-4 ml-2" />
            </button>
            {categoryDropdownOpen && (
              <div className="absolute top-full mt-1 w-full bg-white border border-gray-300 rounded-lg shadow-lg z-10">
                {categories.map((category) => (
                  <button
                    key={category}
                    onClick={() => {
                      setSelectedCategory(category);
                      setCategoryDropdownOpen(false);
                    }}
                    className="block w-full text-left px-4 py-2 hover:bg-gray-100 first:rounded-t-lg last:rounded-b-lg"
                  >
                    {category}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Subcategory Dropdown */}
          <div className="relative">
            <button
              onClick={() => setSubcategoryDropdownOpen(!subcategoryDropdownOpen)}
              className="flex items-center justify-between px-4 py-2.5 border-2 border-black rounded-xl w-40 text-sm font-medium"
            >
              {selectedSubcategory}
              <ChevronDown className="w-4 h-4 ml-2" />
            </button>
            {subcategoryDropdownOpen && (
              <div className="absolute top-full mt-1 w-full bg-white border border-gray-300 rounded-lg shadow-lg z-10">
                {subcategories.map((subcategory) => (
                  <button
                    key={subcategory}
                    onClick={() => {
                      setSelectedSubcategory(subcategory);
                      setSubcategoryDropdownOpen(false);
                    }}
                    className="block w-full text-left px-4 py-2 hover:bg-gray-100 first:rounded-t-lg last:rounded-b-lg"
                  >
                    {subcategory}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Products Table */}
      <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
        {/* Table Header */}
        <div className="bg-white border-b border-gray-200 px-6 py-4">
          <div className="grid grid-cols-12 gap-4 items-center">
            <div className="col-span-1 text-sm font-bold text-gray-900">Image</div>
            <div className="col-span-2 text-sm font-bold text-gray-900">item</div>
            <div className="col-span-1 text-sm font-bold text-gray-900">rating</div>
            <div className="col-span-2 text-sm font-bold text-gray-900">size and fit</div>
            <div className="col-span-1 text-sm font-bold text-gray-900">category</div>
            <div className="col-span-1 text-sm font-bold text-gray-900">subcategory</div>
            <div className="col-span-2 text-sm font-bold text-gray-900">Action</div>
            <div className="col-span-2 text-sm font-bold text-gray-900">Turn review on/off for this item</div>
          </div>
        </div>

        {/* Table Body */}
        <div className="divide-y divide-gray-200">
          {filteredProducts.map((product) => (
            <div key={product.id} className="px-6 py-6">
              <div className="grid grid-cols-12 gap-4 items-start">
                {/* Product Image */}
                <div className="col-span-1">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-16 h-20 object-cover rounded-md"
                  />
                </div>

                {/* Product Name */}
                <div className="col-span-2">
                  <h3 className="text-lg font-medium text-gray-900">{product.name}</h3>
                </div>

                {/* Rating */}
                <div className="col-span-1">
                  <div className="flex space-x-1">{renderStars(product.rating)}</div>
                </div>

                {/* Size and Fit Ratings */}
                <div className="col-span-2">
                  {renderRatingScale(product.sizeRating, 'size')}
                  {renderRatingScale(product.comfortRating, 'comfort')}
                  {renderRatingScale(product.durabilityRating, 'durability')}
                </div>

                {/* Category */}
                <div className="col-span-1">
                  <span className="text-sm text-gray-700">{product.category}</span>
                </div>

                {/* Subcategory */}
                <div className="col-span-1">
                  <span className="text-sm text-gray-700">{product.subcategory}</span>
                </div>

                {/* Action Button */}
                <div className="col-span-2">
                  <button className="px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors">
                    view reviews
                  </button>
                </div>

                {/* Toggle Reviews */}
                <div className="col-span-2">
                  <div className="flex space-x-2">
                    <button
                      onClick={() => toggleReviews(product.id)}
                      className={`px-4 py-2 rounded-full text-sm font-medium transition-colors border ${
                        product.reviewsEnabled
                          ? 'bg-blue-600 text-white border-black'
                          : 'bg-white text-black border-gray-300'
                      }`}
                    >
                      On
                    </button>
                    <button
                      onClick={() => toggleReviews(product.id)}
                      className={`px-4 py-2 rounded-full text-sm font-medium transition-colors border ${
                        !product.reviewsEnabled
                          ? 'bg-blue-600 text-white border-black'
                          : 'bg-white text-black border-gray-300'
                      }`}
                    >
                      Off
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Empty State */}
      {filteredProducts.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg">No products found matching your search criteria.</p>
        </div>
      )}
    </div>
  );
};

export default ManageReviews;