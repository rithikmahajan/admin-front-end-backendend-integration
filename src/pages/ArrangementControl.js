import React, { useState, useEffect } from 'react';
import { ChevronDown, Move, GripVertical, Eye, RotateCcw } from 'lucide-react';

const ArrangementControl = () => {
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedSubcategory, setSelectedSubcategory] = useState('');
  const [selectedItem, setSelectedItem] = useState('');
  const [viewMode, setViewMode] = useState('grid'); // 'grid', 'list', 'tile'
  const [activeTab, setActiveTab] = useState('My');
  const [currentView, setCurrentView] = useState('View 1'); // 'View 1', 'View 2', 'View 3'

  // Sample data structure for categories and items
  const categories = [
    { id: 1, name: 'Category', subcategories: ['sub category', 'Sports Apparel', 'Footwear'] },
    { id: 2, name: 'Sports', subcategories: ['Running', 'Soccer', 'Tennis', 'Golf'] },
    { id: 3, name: 'Accessories', subcategories: ['Bags', 'Watches', 'Equipment'] }
  ];

  const [arrangementItems, setArrangementItems] = useState([
    {
      id: 1,
      title: 'Manage account and services linked to your Yoraa account',
      image: '/api/placeholder/65/65',
      category: 'Sports',
      subcategory: 'Running',
      order: 1
    },
    {
      id: 2,
      title: 'Manage account and services linked to your Yoraa account',
      image: '/api/placeholder/65/65',
      category: 'Sports',
      subcategory: 'Soccer',
      order: 2
    },
    {
      id: 3,
      title: 'Manage account and services linked to your Yoraa account',
      image: '/api/placeholder/65/65',
      category: 'Sports',
      subcategory: 'Tennis',
      order: 3
    },
    {
      id: 4,
      title: 'Manage account and services linked to your Yoraa account',
      image: '/api/placeholder/65/65',
      category: 'Sports',
      subcategory: 'Golf',
      order: 4
    },
    {
      id: 5,
      title: 'Manage account and services linked to your Yoraa account',
      image: '/api/placeholder/65/65',
      category: 'Sports',
      subcategory: 'Running',
      order: 5
    },
    {
      id: 6,
      title: 'Manage account and services linked to your Yoraa account',
      image: '/api/placeholder/65/65',
      category: 'Sports',
      subcategory: 'Soccer',
      order: 6
    }
  ]);

  // Sample sport categories for the preview section
  const sportCategories = [
    { id: 'running', name: 'Running', image: '/api/placeholder/70/70' },
    { id: 'soccer', name: 'Soccer', image: '/api/placeholder/70/70' },
    { id: 'tennis', name: 'Tennis', image: '/api/placeholder/70/70' },
    { id: 'golf', name: 'Golf', image: '/api/placeholder/70/70' }
  ];

  // Sample products for the product grid
  const products = [
    {
      id: 1,
      name: 'Nike Everyday Plus Cushioned',
      description: 'Training Crew Socks (3 Pairs)',
      price: 'US$22',
      image: '/api/placeholder/184/184'
    },
    {
      id: 2,
      name: 'Nike Everyday Plus Cushioned',
      description: 'Training Crew Socks (6 Pairs)',
      price: 'US$28',
      image: '/api/placeholder/184/184'
    }
  ];

  // Fashion grid images for View 2
  const fashionGridImages = [
    [
      { id: 1, image: '/api/placeholder/125/158' },
      { id: 2, image: '/api/placeholder/125/158' },
      { id: 3, image: '/api/placeholder/125/158' }
    ],
    [
      { id: 4, image: '/api/placeholder/125/158' },
      { id: 5, image: '/api/placeholder/125/158' },
      { id: 6, image: '/api/placeholder/125/158' }
    ]
  ];

  // Fashion grid images for View 3 (2x2 layout)
  const view3GridImages = [
    [
      { id: 1, image: '/api/placeholder/168/250' },
      { id: 2, image: '/api/placeholder/154/228' }
    ],
    [
      { id: 3, image: '/api/placeholder/162/244' },
      { id: 4, image: '/api/placeholder/154/230' }
    ]
  ];

  const handleDragStart = (e, itemId) => {
    e.dataTransfer.setData('text/plain', itemId);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = (e, targetIndex) => {
    e.preventDefault();
    const draggedItemId = parseInt(e.dataTransfer.getData('text/plain'));
    const draggedItem = arrangementItems.find(item => item.id === draggedItemId);
    const filteredItems = arrangementItems.filter(item => item.id !== draggedItemId);
    
    const newItems = [
      ...filteredItems.slice(0, targetIndex),
      draggedItem,
      ...filteredItems.slice(targetIndex)
    ];
    
    setArrangementItems(newItems);
  };

  const resetArrangement = () => {
    // Reset to original order
    const resetItems = [...arrangementItems].sort((a, b) => a.id - b.id);
    setArrangementItems(resetItems);
  };

  const saveArrangement = () => {
    // Handle save logic here
    console.log('Saving arrangement:', arrangementItems);
    alert('Arrangement saved successfully!');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="text-2xl font-bold text-gray-900">
            Arrangement control screen for items(category sub category items and variants)
          </div>
          <div className="flex items-center space-x-4">
            <button className="p-2 text-gray-600 hover:text-gray-900">
              <Eye className="h-5 w-5" />
            </button>
            <button className="p-2 text-gray-600 hover:text-gray-900">
              <RotateCcw className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex">
        {/* Main Panel */}
        <div className="flex-1 p-6">
          <div className="bg-white rounded-xl shadow-sm p-8 max-w-7xl mx-auto">
            
            {/* Selection Area */}
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
                choose a thing to rearrange
              </h2>
              
              <div className="flex justify-center space-x-6 mb-8">
                {/* Category Dropdown */}
                <div className="relative">
                  <select
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    className="appearance-none bg-white border border-gray-300 rounded-xl px-4 py-3 pr-10 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 w-80"
                  >
                    <option value="">Category</option>
                    {categories.map((category) => (
                      <option key={category.id} value={category.name}>
                        {category.name}
                      </option>
                    ))}
                  </select>
                  <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400 pointer-events-none" />
                </div>

                {/* Subcategory Dropdown */}
                <div className="relative">
                  <select
                    value={selectedSubcategory}
                    onChange={(e) => setSelectedSubcategory(e.target.value)}
                    className="appearance-none bg-white border border-gray-300 rounded-xl px-4 py-3 pr-10 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 w-80"
                    disabled={!selectedCategory}
                  >
                    <option value="">sub category</option>
                    {selectedCategory && categories.find(cat => cat.name === selectedCategory)?.subcategories.map((sub, index) => (
                      <option key={index} value={sub}>
                        {sub}
                      </option>
                    ))}
                  </select>
                  <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400 pointer-events-none" />
                </div>

                {/* Item Dropdown */}
                <div className="relative">
                  <select
                    value={selectedItem}
                    onChange={(e) => setSelectedItem(e.target.value)}
                    className="appearance-none bg-white border border-gray-300 rounded-xl px-4 py-3 pr-10 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 w-80"
                    disabled={!selectedSubcategory}
                  >
                    <option value="">Item</option>
                    <option value="item1">Item 1</option>
                    <option value="item2">Item 2</option>
                    <option value="item3">Item 3</option>
                  </select>
                  <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400 pointer-events-none" />
                </div>
              </div>
            </div>

            {/* Arrangement Grid */}
            <div className="grid grid-cols-3 gap-6 mb-8">
              {arrangementItems.map((item, index) => (
                <div
                  key={item.id}
                  draggable
                  onDragStart={(e) => handleDragStart(e, item.id)}
                  onDragOver={handleDragOver}
                  onDrop={(e) => handleDrop(e, index)}
                  className="bg-white rounded-xl shadow-sm p-4 cursor-move hover:shadow-md transition-shadow duration-200 border border-gray-200"
                >
                  <div className="flex items-start space-x-4">
                    <div className="flex-shrink-0">
                      <img
                        src={item.image}
                        alt="Product"
                        className="w-16 h-16 rounded-lg object-cover"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm text-gray-900 line-clamp-3">
                        {item.title}
                      </p>
                    </div>
                    <div className="flex-shrink-0">
                      <GripVertical className="h-5 w-5 text-gray-400" />
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Action Buttons */}
            <div className="flex justify-center space-x-4">
              <button
                onClick={resetArrangement}
                className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors duration-200"
              >
                Reset Order
              </button>
              <button
                onClick={saveArrangement}
                className="px-6 py-2 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors duration-200"
              >
                Save Arrangement
              </button>
            </div>
          </div>
        </div>

        {/* Preview Panel */}
        <div className="w-1/3 bg-white border-l border-gray-200 p-6">
          <div className="space-y-6">
            {/* Preview Header */}
            <div className="text-center">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Preview</h3>
              
              {/* View Selector */}
              <div className="flex justify-center items-center space-x-4 mb-4">
                <button
                  onClick={() => setCurrentView('View 1')}
                  className={`px-6 py-2 rounded-lg font-bold transition-colors ${
                    currentView === 'View 1' 
                      ? 'bg-black text-white' 
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  View 1
                </button>
                <button
                  onClick={() => setCurrentView('View 2')}
                  className={`px-6 py-2 rounded-lg font-bold transition-colors ${
                    currentView === 'View 2' 
                      ? 'bg-black text-white' 
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  View 2
                </button>
                <button
                  onClick={() => setCurrentView('View 3')}
                  className={`px-6 py-2 rounded-lg font-bold transition-colors ${
                    currentView === 'View 3' 
                      ? 'bg-black text-white' 
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  View 3
                </button>
              </div>
              
              {/* View Toggle - only show for View 1 */}
              {currentView === 'View 1' && (
                <div className="flex justify-center items-center space-x-2 mb-6">
                  <span className="text-sm font-medium text-gray-700">{currentView}</span>
                  <div className="flex bg-gray-100 rounded-lg p-1">
                    <button
                      onClick={() => setViewMode('list')}
                      className={`p-2 rounded ${viewMode === 'list' ? 'bg-white shadow-sm' : ''}`}
                    >
                      <div className="grid grid-cols-1 gap-1 w-4 h-4">
                        <div className="bg-gray-400 h-1 rounded"></div>
                        <div className="bg-gray-400 h-1 rounded"></div>
                        <div className="bg-gray-400 h-1 rounded"></div>
                      </div>
                    </button>
                    <button
                      onClick={() => setViewMode('grid')}
                      className={`p-2 rounded ${viewMode === 'grid' ? 'bg-white shadow-sm' : ''}`}
                    >
                      <div className="grid grid-cols-3 gap-1 w-4 h-4">
                        {[...Array(9)].map((_, i) => (
                          <div key={i} className="bg-gray-400 h-1 rounded"></div>
                        ))}
                      </div>
                    </button>
                    <button
                      onClick={() => setViewMode('tile')}
                      className={`p-2 rounded ${viewMode === 'tile' ? 'bg-black text-white' : ''}`}
                    >
                      <div className="grid grid-cols-2 gap-1 w-4 h-4">
                        {[...Array(6)].map((_, i) => (
                          <div key={i} className={`h-1 rounded ${viewMode === 'tile' ? 'bg-white' : 'bg-gray-400'}`}></div>
                        ))}
                      </div>
                    </button>
                  </div>
                </div>
              )}

              {/* View 2 header */}
              {currentView === 'View 2' && (
                <div className="flex justify-center items-center space-x-2 mb-6">
                  <span className="text-sm font-medium text-gray-700">{currentView}</span>
                  <div className="flex bg-gray-100 rounded-lg p-1">
                    <button className="p-2 rounded">
                      <div className="grid grid-cols-1 gap-1 w-4 h-4">
                        <div className="bg-gray-400 h-1 rounded"></div>
                        <div className="bg-gray-400 h-1 rounded"></div>
                        <div className="bg-gray-400 h-1 rounded"></div>
                      </div>
                    </button>
                    <button className="p-2 rounded bg-white shadow-sm">
                      <div className="grid grid-cols-3 gap-1 w-4 h-4">
                        {[...Array(9)].map((_, i) => (
                          <div key={i} className="bg-gray-400 h-1 rounded"></div>
                        ))}
                      </div>
                    </button>
                    <button className="p-2 rounded bg-black text-white">
                      <div className="grid grid-cols-2 gap-1 w-4 h-4">
                        {[...Array(6)].map((_, i) => (
                          <div key={i} className="bg-white h-1 rounded"></div>
                        ))}
                      </div>
                    </button>
                  </div>
                </div>
              )}

              {/* View 3 header */}
              {currentView === 'View 3' && (
                <div className="flex justify-center items-center space-x-2 mb-6">
                  <span className="text-sm font-medium text-gray-700">{currentView}</span>
                  <div className="flex bg-gray-100 rounded-lg p-1 border border-black">
                    <button className="p-2 rounded">
                      <div className="grid grid-cols-1 gap-1 w-4 h-4">
                        <div className="bg-black h-1 rounded"></div>
                        <div className="bg-black h-1 rounded"></div>
                        <div className="bg-black h-1 rounded"></div>
                      </div>
                    </button>
                    <button className="p-2 rounded">
                      <div className="grid grid-cols-3 gap-1 w-4 h-4">
                        {[...Array(9)].map((_, i) => (
                          <div key={i} className="bg-black h-1 rounded"></div>
                        ))}
                      </div>
                    </button>
                    <button className="p-2 rounded bg-black text-white">
                      <div className="grid grid-cols-2 gap-1 w-4 h-4">
                        {[...Array(6)].map((_, i) => (
                          <div key={i} className="bg-white h-1 rounded"></div>
                        ))}
                      </div>
                    </button>
                  </div>
                </div>
              )}
            </div>
            
            {/* Tab Navigation */}
            <div className="border-b border-gray-200">
              <div className="flex space-x-8">
                {['My', 'Men', 'Women', 'Kids'].map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`py-3 px-1 border-b-2 font-medium text-sm ${
                      activeTab === tab
                        ? 'border-black text-black'
                        : 'border-transparent text-gray-500 hover:text-gray-700'
                    }`}
                  >
                    {tab}
                  </button>
                ))}
              </div>
            </div>

            {/* Conditional content based on current view */}
            {currentView === 'View 1' ? (
              <>
                {/* Sport Categories for View 1 */}
                <div className="space-y-4">
                  {sportCategories.map((sport) => (
                    <div key={sport.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                      <div className="flex items-center space-x-4">
                        <img
                          src={sport.image}
                          alt={sport.name}
                          className="w-16 h-16 rounded-lg object-cover"
                        />
                        <span className="text-sm font-medium text-gray-900">{sport.name}</span>
                      </div>
                      <ChevronDown className="h-5 w-5 text-gray-400 rotate-270" />
                    </div>
                  ))}
                </div>

                {/* Product Grid for View 1 */}
                <div className="grid grid-cols-2 gap-4 mt-6">
                  {products.map((product) => (
                    <div key={product.id} className="space-y-3">
                      <div className="aspect-square bg-gray-100 rounded-lg overflow-hidden">
                        <img
                          src={product.image}
                          alt={product.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="space-y-1">
                        <h4 className="text-sm font-medium text-gray-900 line-clamp-2">
                          {product.name}
                        </h4>
                        <p className="text-xs text-gray-600 line-clamp-1">
                          {product.description}
                        </p>
                        <p className="text-sm font-medium text-gray-900">
                          {product.price}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </>
            ) : currentView === 'View 2' ? (
              <>
                {/* Sport Categories for View 2 */}
                <div className="space-y-4">
                  {sportCategories.map((sport) => (
                    <div key={sport.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                      <div className="flex items-center space-x-4">
                        <img
                          src={sport.image}
                          alt={sport.name}
                          className="w-16 h-16 rounded-lg object-cover"
                        />
                        <span className="text-sm font-medium text-gray-900">{sport.name}</span>
                      </div>
                      <ChevronDown className="h-5 w-5 text-gray-400 rotate-270" />
                    </div>
                  ))}
                </div>

                {/* Fashion Grid for View 2 */}
                <div className="space-y-0.5 mt-6">
                  {fashionGridImages.map((row, rowIndex) => (
                    <div key={rowIndex} className="flex gap-0.5">
                      {row.map((item) => (
                        <div key={item.id} className="flex-1 bg-gray-100 h-[158px] rounded-sm overflow-hidden">
                          <img
                            src={item.image}
                            alt={`Fashion item ${item.id}`}
                            className="w-full h-full object-cover"
                          />
                        </div>
                      ))}
                    </div>
                  ))}
                </div>
              </>
            ) : (
              <>
                {/* Sport Categories for View 3 */}
                <div className="space-y-4">
                  {sportCategories.map((sport) => (
                    <div key={sport.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                      <div className="flex items-center space-x-4">
                        <img
                          src={sport.image}
                          alt={sport.name}
                          className="w-16 h-16 rounded-lg object-cover"
                        />
                        <span className="text-sm font-medium text-gray-900">{sport.name}</span>
                      </div>
                      <ChevronDown className="h-5 w-5 text-gray-400 rotate-270" />
                    </div>
                  ))}
                </div>

                {/* Fashion Grid for View 3 (2x2 layout) */}
                <div className="space-y-0.5 mt-6">
                  {view3GridImages.map((row, rowIndex) => (
                    <div key={rowIndex} className="flex gap-0.5">
                      {row.map((item) => (
                        <div key={item.id} className="flex-1 bg-gray-100 overflow-hidden rounded-sm">
                          <img
                            src={item.image}
                            alt={`Fashion item ${item.id}`}
                            className="w-full h-full object-cover"
                            style={{ 
                              height: rowIndex === 0 
                                ? (item.id === 1 ? '250px' : '228px')
                                : (item.id === 3 ? '244px' : '230px')
                            }}
                          />
                        </div>
                      ))}
                    </div>
                  ))}
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ArrangementControl;
