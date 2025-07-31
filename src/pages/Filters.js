import React, { useState, useCallback, useMemo } from 'react';
import { Search, Plus, Edit2, Trash2, X } from 'lucide-react';

// Performance-optimized Filters component matching Figma design
const Filters = () => {
  // Initial filters data matching Figma design
  const initialFilters = useMemo(() => [
    {
      id: 1,
      name: 'category',
      type: 'category',
      options: [
        { name: 'colour', priority: 1, value: 'red' },
        { name: 'size', priority: 2, value: 'medium' }
      ]
    },
    {
      id: 2,
      name: 'category colour value',
      type: 'colour',
      options: [
        { name: 'red', priority: 1, value: 'red' },
        { name: 'green', priority: 2, value: 'green' }
      ]
    },
    {
      id: 3,
      name: 'category size value',
      type: 'size',
      options: [
        { name: 'small', priority: 1, value: 'small' },
        { name: 'medium', priority: 2, value: 'medium' }
      ]
    },
    {
      id: 4,
      name: 'category size value waist',
      type: 'size_waist',
      options: [
        { name: '28', priority: 1, value: '28' },
        { name: '30', priority: 1, value: '30' }
      ]
    },
    {
      id: 5,
      name: 'category price value',
      type: 'price',
      options: [
        { name: 'upper limit', value: '1000' },
        { name: 'lower limit', value: '100' }
      ]
    }
  ], []);

  const [filters, setFilters] = useState(initialFilters);
  
  // Form state
  const initialFormState = useMemo(() => ({
    filterKey: '',
    filterValue: '',
    colourCode: '',
    priceRange: '',
    minimum: '',
    maximum: ''
  }), []);

  const [newFilter, setNewFilter] = useState(initialFormState);
  const [arrangementPriority, setArrangementPriority] = useState('');
  const [showCreateForm, setShowCreateForm] = useState(true); // Show by default to match Figma

  // Memoized event handlers to prevent function recreation on every render
  // This improves performance by avoiding unnecessary child component re-renders
  const handleCreateFilter = useCallback(() => {
    if (newFilter.filterKey) {
      const filter = {
        id: Date.now(), // Using timestamp for unique ID generation
        name: newFilter.filterKey,
        type: 'custom',
        options: []
      };
      
      // Optimized option creation with conditional logic
      if (newFilter.filterValue) {
        filter.options.push({
          name: newFilter.filterValue,
          priority: parseInt(arrangementPriority) || 1,
          value: newFilter.filterValue
        });
      }
      
      // Using functional update to ensure latest state
      setFilters(prevFilters => [...prevFilters, filter]);
      
      // Reset form state efficiently
      setNewFilter(initialFormState);
      setArrangementPriority('');
      setShowCreateForm(false);
    }
  }, [newFilter, arrangementPriority, initialFormState]); // Optimized dependencies

  // Memoized delete function to prevent recreation and improve performance
  const deleteFilter = useCallback((filterId) => {
    setFilters(prevFilters => prevFilters.filter(filter => filter.id !== filterId));
  }, []); // No dependencies needed as filterId is passed as parameter

  // Optimized filter option deletion with memoization
  const deleteFilterOption = useCallback((filterId, optionIndex) => {
    setFilters(prevFilters => prevFilters.map(filter => {
      if (filter.id === filterId) {
        return {
          ...filter,
          options: filter.options.filter((_, index) => index !== optionIndex)
        };
      }
      return filter; // Return original filter if not matching
    }));
  }, []); // No dependencies needed as parameters are passed

  // Memoized form toggle handlers for better performance
  const handleShowCreateForm = useCallback(() => setShowCreateForm(true), []);
  const handleHideCreateForm = useCallback(() => setShowCreateForm(false), []);

  // Memoized input change handlers to prevent function recreation
  const handleFilterKeyChange = useCallback((e) => {
    setNewFilter(prev => ({ ...prev, filterKey: e.target.value }));
  }, []);

  const handleFilterValueChange = useCallback((e) => {
    setNewFilter(prev => ({ ...prev, filterValue: e.target.value }));
  }, []);

  const handleColourCodeChange = useCallback((e) => {
    setNewFilter(prev => ({ ...prev, colourCode: e.target.value }));
  }, []);

  const handlePriceRangeChange = useCallback((e) => {
    setNewFilter(prev => ({ ...prev, priceRange: e.target.value }));
  }, []);

  const handleMinimumChange = useCallback((e) => {
    setNewFilter(prev => ({ ...prev, minimum: e.target.value }));
  }, []);

  const handleMaximumChange = useCallback((e) => {
    setNewFilter(prev => ({ ...prev, maximum: e.target.value }));
  }, []);

  const handlePriorityChange = useCallback((e) => {
    setArrangementPriority(e.target.value);
  }, []);

  // Memoized filter categorization for performance optimization
  // These calculations only run when filters array changes
  const categorizedFilters = useMemo(() => ({
    category: filters.filter(f => f.type === 'category'),
    price: filters.filter(f => f.type === 'price'),
    size: filters.filter(f => f.type.includes('size'))
  }), [filters]);

  return (
    <div className="bg-white min-h-screen p-6">
      {/* Create Filters Form - Always visible to match Figma */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-black mb-8">Create filters</h1>
        
        {/* Form Grid Layout matching Figma */}
        <div className="space-y-6">
          {/* First Row */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Filter Key Input */}
            <div>
              <input
                type="text"
                placeholder="filter key ( eg:colour, size)"
                value={newFilter.filterKey}
                onChange={handleFilterKeyChange}
                className="w-full px-4 py-3 border-2 border-black rounded-xl focus:outline-none focus:border-blue-600"
              />
            </div>

            {/* Arrangement Priority Section */}
            <div className="flex items-center gap-4">
              <span className="text-xl font-medium text-black">Arrangement priority</span>
              <input
                type="number"
                placeholder=""
                value={arrangementPriority}
                onChange={handlePriorityChange}
                className="px-3 py-3 border-2 border-black rounded-xl w-20 focus:outline-none focus:border-blue-600"
              />
              <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 text-sm">
                + Add
              </button>
            </div>
          </div>

          {/* Second Row */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Value Name Input */}
            <div>
              <input
                type="text"
                placeholder="value name(red , xl)"
                value={newFilter.filterValue}
                onChange={handleFilterValueChange}
                className="w-full px-4 py-3 border-2 border-black rounded-xl focus:outline-none focus:border-blue-600"
              />
            </div>

            {/* Colour Code Input */}
            <div>
              <input
                type="text"
                placeholder="colour code (optional)"
                value={newFilter.colourCode}
                onChange={handleColourCodeChange}
                className="w-full px-4 py-3 border-2 border-black rounded-xl focus:outline-none focus:border-blue-600"
              />
            </div>
          </div>

          {/* Third Row - Price Range */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Price Range Input */}
            <div>
              <input
                type="text"
                placeholder="Add price range"
                value={newFilter.priceRange}
                onChange={handlePriceRangeChange}
                className="w-full px-4 py-3 border-2 border-black rounded-xl focus:outline-none focus:border-blue-600"
              />
            </div>

            {/* Minimum Input */}
            <div>
              <input
                type="number"
                placeholder="minimum"
                value={newFilter.minimum}
                onChange={handleMinimumChange}
                className="w-full px-4 py-3 border-2 border-black rounded-xl focus:outline-none focus:border-blue-600"
              />
            </div>

            {/* Maximum Input */}
            <div>
              <input
                type="number"
                placeholder="minimum"
                value={newFilter.maximum}
                onChange={handleMaximumChange}
                className="w-full px-4 py-3 border-2 border-black rounded-xl focus:outline-none focus:border-blue-600"
              />
            </div>
          </div>

          {/* Create Filter Button */}
          <div className="flex justify-start">
            <button 
              onClick={handleCreateFilter}
              className="bg-black text-white px-16 py-3 rounded-full font-medium hover:bg-gray-800"
            >
              Create filter
            </button>
          </div>
        </div>
      </div>

      {/* All Filters Section matching Figma table layout */}
      <div>
        <h2 className="text-xl font-bold text-black mb-6">All filters</h2>
        
        {/* Table Header */}
        <div className="grid grid-cols-12 gap-4 mb-4">
          <div className="col-span-2">
            <h3 className="text-xl font-bold text-black">category</h3>
          </div>
          <div className="col-span-2">
            <h3 className="text-xl font-bold text-black">category colour value</h3>
          </div>
          <div className="col-span-2 text-center">
            <h3 className="text-xl font-bold text-black">category value</h3>
          </div>
          <div className="col-span-2">
            <h3 className="text-xl font-bold text-black">category size value</h3>
          </div>
          <div className="col-span-2">
            <h3 className="text-xl font-bold text-black">category size value waist</h3>
          </div>
          <div className="col-span-2">
            <h3 className="text-xl font-bold text-black">category price value</h3>
          </div>
        </div>

        {/* Filter Values */}
        <div className="space-y-4">
          {/* Category Column Values */}
          <div className="grid grid-cols-12 gap-4 items-start">
            <div className="col-span-2 space-y-2">
              <div className="bg-white rounded-xl shadow-md p-3 border">
                <p className="text-lg text-black font-medium">colour (priority 1)</p>
              </div>
              <div className="bg-white rounded-xl shadow-md p-3 border">
                <p className="text-lg text-black font-medium">size(priority 2)</p>
              </div>
            </div>

            {/* Category Colour Value Column */}
            <div className="col-span-2 space-y-2">
              <div className="bg-white rounded-xl shadow-md p-3 border">
                <p className="text-sm text-gray-600">red (priority 1)</p>
              </div>
              <div className="bg-white rounded-xl shadow-md p-3 border">
                <p className="text-sm text-gray-600">green (priority 2)</p>
              </div>
            </div>

            {/* Category Size Value Column */}
            <div className="col-span-2 space-y-2">
              <div className="bg-white rounded-xl shadow-md p-3 border">
                <p className="text-sm text-gray-600">small (priority 1)</p>
              </div>
              <div className="bg-white rounded-xl shadow-md p-3 border">
                <p className="text-sm text-gray-600">medium (priority 2)</p>
              </div>
            </div>

            {/* Category Size Value Waist Column */}
            <div className="col-span-2 space-y-2">
              <div className="bg-white rounded-xl shadow-md p-3 border flex justify-between items-center">
                <p className="text-sm text-black font-medium">28</p>
                <div className="flex gap-1">
                  <button className="p-1 text-gray-500 hover:text-gray-700">
                    <Edit2 className="h-4 w-4" />
                  </button>
                  <button className="p-1 text-gray-500 hover:text-red-600">
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>
              <div className="bg-white rounded-xl shadow-md p-3 border">
                <p className="text-sm text-black font-medium">30</p>
              </div>
            </div>

            {/* Category Price Value Column */}
            <div className="col-span-2 space-y-2">
              <div className="bg-white rounded-xl shadow-md p-3 border flex justify-between items-center">
                <p className="text-sm text-black font-medium">upper limit</p>
                <div className="flex gap-1">
                  <button className="p-1 text-gray-500 hover:text-gray-700">
                    <Edit2 className="h-4 w-4" />
                  </button>
                  <button className="p-1 text-gray-500 hover:text-red-600">
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>
              <div className="bg-white rounded-xl shadow-md p-3 border">
                <p className="text-sm text-black font-medium">lower limit</p>
              </div>
            </div>

            {/* Price Category (Full Width) */}
            <div className="col-span-12 mt-6">
              <div className="bg-white rounded-xl shadow-md p-4 border">
                <p className="text-lg text-black font-medium">price</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Filters;
