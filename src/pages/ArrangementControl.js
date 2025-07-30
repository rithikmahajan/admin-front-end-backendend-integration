import React, { useState, useEffect } from 'react';
import { ChevronDown, Move, GripVertical, Eye, RotateCcw } from 'lucide-react';

const ArrangementControl = () => {
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedSubcategory, setSelectedSubcategory] = useState('');
  const [selectedItem, setSelectedItem] = useState('');
  const [viewMode, setViewMode] = useState('grid'); // 'grid', 'list', 'tile'
  const [activeTab, setActiveTab] = useState('My');
  const [currentView, setCurrentView] = useState('View 1'); // 'View 1', 'View 2', 'View 3'
  const [draggedItem, setDraggedItem] = useState(null);
  const [dragOverIndex, setDragOverIndex] = useState(null);

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
    },
    {
      id: 7,
      title: 'Manage account and services linked to your Yoraa account',
      image: '/api/placeholder/65/65',
      category: 'Sports',
      subcategory: 'Tennis',
      order: 7
    },
    {
      id: 8,
      title: 'Manage account and services linked to your Yoraa account',
      image: '/api/placeholder/65/65',
      category: 'Sports',
      subcategory: 'Golf',
      order: 8
    },
    {
      id: 9,
      title: 'Manage account and services linked to your Yoraa account',
      image: '/api/placeholder/65/65',
      category: 'Sports',
      subcategory: 'Running',
      order: 9
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

  // Enhanced drag and drop handlers
  const handleDragStart = (e, item, index) => {
    setDraggedItem({ item, index });
    e.dataTransfer.effectAllowed = 'move';
    // Add drag image styling
    e.dataTransfer.setData('text/html', e.target.outerHTML);
    e.target.style.opacity = '0.5';
  };

  const handleDragEnd = (e) => {
    e.target.style.opacity = '1';
    setDraggedItem(null);
    setDragOverIndex(null);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
  };

  const handleDragEnter = (e, index) => {
    e.preventDefault();
    setDragOverIndex(index);
  };

  const handleDragLeave = (e) => {
    // Only reset if leaving the container, not child elements
    if (!e.currentTarget.contains(e.relatedTarget)) {
      setDragOverIndex(null);
    }
  };

  const handleDrop = (e, targetIndex) => {
    e.preventDefault();
    
    if (!draggedItem || draggedItem.index === targetIndex) {
      setDragOverIndex(null);
      return;
    }

    const newItems = [...arrangementItems];
    const draggedItemData = newItems[draggedItem.index];
    
    // Remove the dragged item from its original position
    newItems.splice(draggedItem.index, 1);
    
    // Insert the dragged item at the target position
    newItems.splice(targetIndex, 0, draggedItemData);
    
    setArrangementItems(newItems);
    setDraggedItem(null);
    setDragOverIndex(null);
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
    <div className="min-h-screen bg-gray-50 font-montserrat">
      <style jsx>{`
        .dragging {
          opacity: 0.5;
          transform: rotate(5deg);
        }
        .drag-over {
          transform: scale(1.05);
          border-color: #3b82f6;
          background-color: #eff6ff;
        }
        .line-clamp-3 {
          display: -webkit-box;
          -webkit-line-clamp: 3;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
        .line-clamp-1 {
          display: -webkit-box;
          -webkit-line-clamp: 1;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style>
      {/* Header - No Background */}
      <div className="px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="text-2xl font-bold text-black text-center w-full font-montserrat">
            Arrangement control screen for items(category sub category items and variants)
          </div>
          <div className="flex items-center space-x-4">
            <button className="p-2 text-gray-600 hover:text-gray-900">
              <Eye className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="p-6">
        {/* Main Panel */}
        <div className="bg-white rounded-xl shadow-sm p-8 max-w-7xl mx-auto mb-8">
          
          {/* Selection Area */}
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-black mb-6 text-center font-montserrat leading-[22px]">
              choose a thing to rearrange
            </h2>
            
            <div className="flex justify-center space-x-6 mb-8">
              {/* Category Dropdown */}
              <div className="relative">
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="appearance-none bg-white border border-[#979797] rounded-xl px-4 py-3 pr-10 text-black text-[15px] font-montserrat focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 w-80 h-[47px]"
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
                  className="appearance-none bg-white border border-[#979797] rounded-xl px-4 py-3 pr-10 text-black text-[15px] font-montserrat focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 w-80 h-[47px] tracking-[-0.375px]"
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
                  className="appearance-none bg-white border border-[#979797] rounded-xl px-4 py-3 pr-10 text-black text-[15px] font-montserrat focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 w-80 h-[47px] tracking-[-0.375px]"
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

          {/* Enhanced Drag & Drop Arrangement Grid */}
          <div className="grid grid-cols-3 gap-6 mb-8 relative">
            {arrangementItems.map((item, index) => (
              <div
                key={item.id}
                draggable
                onDragStart={(e) => handleDragStart(e, item, index)}
                onDragEnd={handleDragEnd}
                onDragOver={handleDragOver}
                onDragEnter={(e) => handleDragEnter(e, index)}
                onDragLeave={handleDragLeave}
                onDrop={(e) => handleDrop(e, index)}
                className={`
                  bg-white rounded-xl shadow-lg p-4 cursor-move transition-all duration-200 border-2 transform
                  ${dragOverIndex === index && draggedItem?.index !== index 
                    ? 'border-blue-500 bg-blue-50 scale-105 shadow-2xl' 
                    : 'border-gray-200 hover:shadow-xl hover:scale-105'
                  }
                  ${draggedItem?.index === index ? 'opacity-30 scale-95 rotate-2' : ''}
                  ${draggedItem && draggedItem.index !== index ? 'hover:border-blue-300' : ''}
                `}
                style={{
                  zIndex: draggedItem?.index === index ? 1000 : 1
                }}
              >
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0">
                    <img
                      src={item.image}
                      alt="Product"
                      className="w-16 h-16 rounded-lg object-cover"
                      draggable={false}
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-[16px] text-black line-clamp-3 leading-[1.2] font-montserrat">
                      {item.title}
                    </p>
                  </div>
                  <div className="flex-shrink-0">
                    <GripVertical className={`h-5 w-5 transition-colors ${
                      draggedItem ? 'text-blue-500' : 'text-gray-400 hover:text-gray-600'
                    }`} />
                  </div>
                </div>
                
                {/* Drop indicator */}
                {dragOverIndex === index && draggedItem?.index !== index && (
                  <div className="absolute inset-0 border-2 border-dashed border-blue-400 rounded-xl bg-blue-100 bg-opacity-50 flex items-center justify-center">
                    <span className="text-blue-600 font-semibold">Drop here</span>
                  </div>
                )}
              </div>
            ))}
            
            {/* Global drag indicator */}
            {draggedItem && (
              <div className="absolute top-0 left-0 right-0 bottom-0 pointer-events-none">
                <div className="text-center text-blue-600 font-semibold mt-4">
                  Drag to rearrange items
                </div>
              </div>
            )}
          </div>

          {/* Action Buttons */}
          <div className="flex justify-center space-x-4">
            <button
              onClick={saveArrangement}
              className="px-6 py-2 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors duration-200"
            >
              Save Arrangement
            </button>
          </div>
        </div>

        {/* Preview Panel - Now Below Main Content */}
        <div className="bg-white rounded-xl shadow-sm p-8 max-w-7xl mx-auto">
          <div className="space-y-6">
            {/* Preview Header */}
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-2xl font-bold text-black font-montserrat leading-[22px]">Preview</h3>
              <div className="flex items-center space-x-4">
                <span className="text-2xl font-bold text-black font-montserrat leading-[22px]">View 1</span>
                <div className="flex bg-gray-100 rounded-lg p-1 border border-black">
                  <button
                    onClick={() => setViewMode('list')}
                    className={`p-2 rounded ${viewMode === 'list' ? 'bg-white shadow-sm' : ''}`}
                  >
                    <div className="grid grid-cols-1 gap-1 w-4 h-4">
                      <div className="bg-black h-1 rounded"></div>
                      <div className="bg-black h-1 rounded"></div>
                      <div className="bg-black h-1 rounded"></div>
                    </div>
                  </button>
                  <button
                    onClick={() => setViewMode('grid')}
                    className={`p-2 rounded ${viewMode === 'grid' ? 'bg-white shadow-sm' : ''}`}
                  >
                    <div className="grid grid-cols-3 gap-1 w-4 h-4">
                      {[...Array(9)].map((_, i) => (
                        <div key={i} className="bg-black h-1 rounded"></div>
                      ))}
                    </div>
                  </button>
                  <button
                    onClick={() => setViewMode('tile')}
                    className={`p-2 rounded ${viewMode === 'tile' ? 'bg-black text-white' : ''}`}
                  >
                    <div className="grid grid-cols-2 gap-1 w-4 h-4">
                      {[...Array(6)].map((_, i) => (
                        <div key={i} className={`h-1 rounded ${viewMode === 'tile' ? 'bg-white' : 'bg-black'}`}></div>
                      ))}
                    </div>
                  </button>
                </div>
              </div>
            </div>
            
            {/* Tab Navigation */}
            <div className="border-b border-[#cdcdcd]">
              <div className="flex space-x-8">
                {['My', 'Men', 'Women', 'Kids'].map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`py-3 px-1 border-b-2 font-medium text-[16px] font-montserrat tracking-[-0.4px] ${
                      activeTab === tab
                        ? 'border-black text-black'
                        : 'border-transparent text-[#767676] hover:text-gray-700'
                    }`}
                  >
                    {tab}
                  </button>
                ))}
              </div>
            </div>

            {/* Content Grid */}
            <div className="grid grid-cols-2 gap-8">
              {/* Left Column - Sport Categories */}
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

              {/* Right Column - Product Grid */}
              <div className="grid grid-cols-2 gap-4">
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
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ArrangementControl;
