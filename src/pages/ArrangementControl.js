/**
 * ArrangementControl Component
 * 
 * REFACTORED VERSION - Key improvements:
 * 
 * 1. **Performance Optimizations:**
 *    - Wrapped event handlers with useCallback to prevent unnecessary re-renders
 *    - Used useMemo for static data arrays (categories, products, fashionGridImages)
 *    - Memoized expensive computations like availableSubcategories
 * 
 * 2. **Code Organization:**
 *    - Created custom useDragAndDrop hook for drag-and-drop logic
 *    - Extracted reusable components (CategoryDropdown, ViewModeToggle, DraggableItem)
 *    - Added constants for better maintainability (VIEW_MODES, TABS, VIEWS)
 * 
 * 3. **Type Safety:**
 *    - Added PropTypes for component props validation
 *    - Better error handling and code documentation
 * 
 * 4. **Maintainability:**
 *    - Separated concerns into smaller, focused components
 *    - Reduced code duplication
 *    - Improved readability with consistent naming conventions
 */

import React, { useState, useEffect, useCallback, useMemo } from 'react';
import PropTypes from 'prop-types';
import { ChevronDown, Move, GripVertical, Eye, RotateCcw } from 'lucide-react';

// Constants
const VIEW_MODES = {
  GRID: 'grid',
  LIST: 'list',
  TILE: 'tile'
};

const TABS = ['My', 'Men', 'Women', 'Kids'];

const VIEWS = {
  VIEW_1: 'View 1',
  VIEW_2: 'View 2',
  VIEW_3: 'View 3'
};

// Custom hook for drag and drop functionality
const useDragAndDrop = (initialItems) => {
  const [items, setItems] = useState(initialItems);
  const [draggedItem, setDraggedItem] = useState(null);
  const [dragOverIndex, setDragOverIndex] = useState(null);

  const handleDragStart = useCallback((e, item, index) => {
    setDraggedItem({ item, index });
    e.dataTransfer.effectAllowed = 'move';
    e.dataTransfer.setData('text/html', e.target.outerHTML);
    e.target.style.opacity = '0.5';
  }, []);

  const handleDragEnd = useCallback((e) => {
    e.target.style.opacity = '1';
    setDraggedItem(null);
    setDragOverIndex(null);
  }, []);

  const handleDragOver = useCallback((e) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
  }, []);

  const handleDragEnter = useCallback((e, index) => {
    e.preventDefault();
    setDragOverIndex(index);
  }, []);

  const handleDragLeave = useCallback((e) => {
    if (!e.currentTarget.contains(e.relatedTarget)) {
      setDragOverIndex(null);
    }
  }, []);

  const handleDrop = useCallback((e, targetIndex) => {
    e.preventDefault();
    
    if (!draggedItem || draggedItem.index === targetIndex) {
      setDragOverIndex(null);
      return;
    }

    const newItems = [...items];
    const draggedItemData = newItems[draggedItem.index];
    
    newItems.splice(draggedItem.index, 1);
    newItems.splice(targetIndex, 0, draggedItemData);
    
    setItems(newItems);
    setDraggedItem(null);
    setDragOverIndex(null);
  }, [draggedItem, items]);

  const resetItems = useCallback(() => {
    const resetItems = [...items].sort((a, b) => a.id - b.id);
    setItems(resetItems);
  }, [items]);

  return {
    items,
    setItems,
    draggedItem,
    dragOverIndex,
    handleDragStart,
    handleDragEnd,
    handleDragOver,
    handleDragEnter,
    handleDragLeave,
    handleDrop,
    resetItems
  };
};

const ArrangementControl = () => {
  // Selection state
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedSubcategory, setSelectedSubcategory] = useState('');
  const [selectedItem, setSelectedItem] = useState('');
  
  // Display state
  const [viewMode, setViewMode] = useState(VIEW_MODES.GRID);
  const [activeTab, setActiveTab] = useState(TABS[0]);
  const [currentView, setCurrentView] = useState(VIEWS.VIEW_1);

  // Initial arrangement items data
  const initialArrangementItems = useMemo(() => [
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
  ], []);

  // Use custom drag and drop hook
  const {
    items: arrangementItems,
    setItems: setArrangementItems,
    draggedItem,
    dragOverIndex,
    handleDragStart,
    handleDragEnd,
    handleDragOver,
    handleDragEnter,
    handleDragLeave,
    handleDrop,
    resetItems: resetArrangement
  } = useDragAndDrop(initialArrangementItems);

  // Sample data - moved to useMemo for performance
  const categories = useMemo(() => [
    { id: 1, name: 'Category', subcategories: ['sub category', 'Sports Apparel', 'Footwear'] },
    { id: 2, name: 'Sports', subcategories: ['Running', 'Soccer', 'Tennis', 'Golf'] },
    { id: 3, name: 'Accessories', subcategories: ['Bags', 'Watches', 'Equipment'] }
  ], []);

  const sportCategories = useMemo(() => [
    { id: 'running', name: 'Running', image: '/api/placeholder/70/70' },
    { id: 'soccer', name: 'Soccer', image: '/api/placeholder/70/70' },
    { id: 'tennis', name: 'Tennis', image: '/api/placeholder/70/70' },
    { id: 'golf', name: 'Golf', image: '/api/placeholder/70/70' }
  ], []);

  const products = useMemo(() => [
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
  ], []);

  // Fashion grid images for View 2
  const fashionGridImages = useMemo(() => [
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
  ], []);

  // Fashion grid images for View 3 (2x2 layout)
  const view3GridImages = useMemo(() => [
    [
      { id: 1, image: '/api/placeholder/168/250' },
      { id: 2, image: '/api/placeholder/154/228' }
    ],
    [
      { id: 3, image: '/api/placeholder/162/244' },
      { id: 4, image: '/api/placeholder/154/230' }
    ]
  ], []);

  const saveArrangement = useCallback(() => {
    // Handle save logic here
    console.log('Saving arrangement:', arrangementItems);
    alert('Arrangement saved successfully!');
  }, [arrangementItems]);

  // Get subcategories for selected category
  const availableSubcategories = useMemo(() => {
    return selectedCategory 
      ? categories.find(cat => cat.name === selectedCategory)?.subcategories || []
      : [];
  }, [selectedCategory, categories]);

  // Component: Category Selection Dropdown
  const CategoryDropdown = ({ value, onChange, options, placeholder, disabled = false }) => (
    <div className="relative">
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="appearance-none bg-white border border-[#979797] rounded-xl px-4 py-3 pr-10 text-black text-[15px] font-montserrat focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 w-80 h-[47px] tracking-[-0.375px]"
        disabled={disabled}
      >
        <option value="">{placeholder}</option>
        {options.map((option, index) => (
          <option key={index} value={option}>
            {option}
          </option>
        ))}
      </select>
      <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400 pointer-events-none" />
    </div>
  );

  CategoryDropdown.propTypes = {
    value: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
    options: PropTypes.arrayOf(PropTypes.string).isRequired,
    placeholder: PropTypes.string.isRequired,
    disabled: PropTypes.bool
  };

  // Component: View Mode Toggle
  const ViewModeToggle = ({ viewMode, setViewMode }) => (
    <div className="flex bg-gray-100 rounded-lg p-1 border border-black">
      <button
        onClick={() => setViewMode(VIEW_MODES.LIST)}
        className={`p-2 rounded ${viewMode === VIEW_MODES.LIST ? 'bg-white shadow-sm' : ''}`}
      >
        <div className="grid grid-cols-1 gap-1 w-4 h-4">
          <div className="bg-black h-1 rounded"></div>
          <div className="bg-black h-1 rounded"></div>
          <div className="bg-black h-1 rounded"></div>
        </div>
      </button>
      <button
        onClick={() => setViewMode(VIEW_MODES.GRID)}
        className={`p-2 rounded ${viewMode === VIEW_MODES.GRID ? 'bg-white shadow-sm' : ''}`}
      >
        <div className="grid grid-cols-3 gap-1 w-4 h-4">
          {[...Array(9)].map((_, i) => (
            <div key={i} className="bg-black h-1 rounded"></div>
          ))}
        </div>
      </button>
      <button
        onClick={() => setViewMode(VIEW_MODES.TILE)}
        className={`p-2 rounded ${viewMode === VIEW_MODES.TILE ? 'bg-black text-white' : ''}`}
      >
        <div className="grid grid-cols-2 gap-1 w-4 h-4">
          {[...Array(6)].map((_, i) => (
            <div key={i} className={`h-1 rounded ${viewMode === VIEW_MODES.TILE ? 'bg-white' : 'bg-black'}`}></div>
          ))}
        </div>
      </button>
    </div>
  );

  ViewModeToggle.propTypes = {
    viewMode: PropTypes.string.isRequired,
    setViewMode: PropTypes.func.isRequired
  };

  // Component: Draggable Item
  const DraggableItem = ({ 
    item, 
    index, 
    draggedItem, 
    dragOverIndex, 
    onDragStart, 
    onDragEnd, 
    onDragOver, 
    onDragEnter, 
    onDragLeave, 
    onDrop 
  }) => (
    <div
      key={item.id}
      draggable
      onDragStart={(e) => onDragStart(e, item, index)}
      onDragEnd={onDragEnd}
      onDragOver={onDragOver}
      onDragEnter={(e) => onDragEnter(e, index)}
      onDragLeave={onDragLeave}
      onDrop={(e) => onDrop(e, index)}
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
  );

  DraggableItem.propTypes = {
    item: PropTypes.shape({
      id: PropTypes.number.isRequired,
      title: PropTypes.string.isRequired,
      image: PropTypes.string.isRequired,
      category: PropTypes.string,
      subcategory: PropTypes.string,
      order: PropTypes.number
    }).isRequired,
    index: PropTypes.number.isRequired,
    draggedItem: PropTypes.object,
    dragOverIndex: PropTypes.number,
    onDragStart: PropTypes.func.isRequired,
    onDragEnd: PropTypes.func.isRequired,
    onDragOver: PropTypes.func.isRequired,
    onDragEnter: PropTypes.func.isRequired,
    onDragLeave: PropTypes.func.isRequired,
    onDrop: PropTypes.func.isRequired
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
        <div className="flex items-center justify-start">
          <div className="text-2xl font-bold text-black font-montserrat">
            Arrangement control screen for items(category sub category items and variants)
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="p-6 pl-6">
        {/* Main Panel */}
        <div className="p-8 max-w-7xl mx-0 mb-8">
          
          {/* Selection Area */}
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-black mb-6 text-left font-montserrat leading-[22px]">
              choose a thing to rearrange
            </h2>
            
            <div className="flex justify-start space-x-6 mb-8">
              {/* Category Dropdown */}
              <CategoryDropdown
                value={selectedCategory}
                onChange={setSelectedCategory}
                options={categories.map(cat => cat.name)}
                placeholder="Category"
              />

              {/* Subcategory Dropdown */}
              <CategoryDropdown
                value={selectedSubcategory}
                onChange={setSelectedSubcategory}
                options={availableSubcategories}
                placeholder="sub category"
                disabled={!selectedCategory}
              />

              {/* Item Dropdown */}
              <CategoryDropdown
                value={selectedItem}
                onChange={setSelectedItem}
                options={['item1', 'item2', 'item3']}
                placeholder="Item"
                disabled={!selectedSubcategory}
              />
            </div>
          </div>

          {/* Enhanced Drag & Drop Arrangement Grid */}
          <div className="grid grid-cols-3 gap-6 mb-8 relative">
            {arrangementItems.map((item, index) => (
              <DraggableItem
                key={item.id}
                item={item}
                index={index}
                draggedItem={draggedItem}
                dragOverIndex={dragOverIndex}
                onDragStart={handleDragStart}
                onDragEnd={handleDragEnd}
                onDragOver={handleDragOver}
                onDragEnter={handleDragEnter}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
              />
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
          <div className="flex justify-start space-x-4">
            <button
              onClick={saveArrangement}
              className="px-6 py-2 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors duration-200"
            >
              Save Arrangement
            </button>
          </div>
        </div>

        {/* Preview Panel - Now Below Main Content */}
        <div className="p-8 max-w-7xl mx-0">
          <div className="space-y-6">
            {/* Preview Header */}
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-2xl font-bold text-black font-montserrat leading-[22px]">Preview</h3>
              <div className="flex items-center space-x-4">
                <span className="text-2xl font-bold text-black font-montserrat leading-[22px]">View 1</span>
                <ViewModeToggle viewMode={viewMode} setViewMode={setViewMode} />
              </div>
            </div>
            
            {/* Tab Navigation */}
            <div className="border-b border-[#cdcdcd]">
              <div className="flex space-x-8">
                {TABS.map((tab) => (
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
