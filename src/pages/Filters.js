import React, { useState, useCallback, useMemo } from 'react';
import { Search, Plus, Edit, Trash2, X } from 'lucide-react';

// Performance-optimized Filters component with memoization and efficient state management
const Filters = () => {
  // Optimized state management with initial data structure
  // Using useMemo to prevent recreation of initial data on each render
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
        { name: 'size', priority: 1, value: '32' }
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
  ], []); // Empty dependency array - data only created once

  const [filters, setFilters] = useState(initialFilters);

  // Optimized initial form state with useMemo to prevent object recreation
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
  const [showCreateForm, setShowCreateForm] = useState(false);

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
    <div className="space-y-8 bg-gray-50 min-h-screen p-6">
      {/* Header Section - Optimized with memoized event handler */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Filters</h1>
          <p className="text-gray-600">Manage product filters and categories</p>
        </div>
        {/* Create button with memoized click handler */}
        <button 
          onClick={handleShowCreateForm}
          className="bg-black text-white px-4 py-2 rounded-md flex items-center space-x-2 hover:bg-gray-800"
        >
          <Plus className="h-4 w-4" />
          <span>Create Filter</span>
        </button>
      </div>

      {/* Create Filters Form - Conditionally rendered for performance */}
      {/* Only renders when showCreateForm is true, reducing DOM nodes */}
      {showCreateForm && (
        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-900">Create filters</h2>
            {/* Close button with memoized handler */}
            <button 
              onClick={handleHideCreateForm}
              className="text-gray-500 hover:text-gray-700"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
          
          {/* Form inputs with optimized event handlers */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            {/* Filter Key Input - Memoized change handler */}
            <div>
              <input
                type="text"
                placeholder="filter key / eg:cotton, size)"
                value={newFilter.filterKey}
                onChange={handleFilterKeyChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            {/* Arrangement Priority Section - Optimized with memoized handlers */}
            <div className="flex items-center space-x-4">
              <span className="text-gray-700 font-medium">Arrangement priority</span>
              <input
                type="number"
                placeholder="1"
                value={arrangementPriority}
                onChange={handlePriorityChange}
                className="px-3 py-2 border border-gray-300 rounded-lg w-20 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
              <button className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600">
                Add
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            {/* Value Name Input - Performance optimized */}
            <div>
              <input
                type="text"
                placeholder="value name(red , xl)"
                value={newFilter.filterValue}
                onChange={handleFilterValueChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            {/* Colour Code Input - Memoized handler */}
            <div>
              <input
                type="text"
                placeholder="colour code (optional)"
                value={newFilter.colourCode}
                onChange={handleColourCodeChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            {/* Price Range Input - Optimized event handling */}
            <div>
              <input
                type="text"
                placeholder="Add price range"
                value={newFilter.priceRange}
                onChange={handlePriceRangeChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            {/* Minimum Input - Memoized change handler */}
            <div>
              <input
                type="number"
                placeholder="minimum"
                value={newFilter.minimum}
                onChange={handleMinimumChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            {/* Maximum Input - Performance optimized */}
            <div>
              <input
                type="number"
                placeholder="minimum"
                value={newFilter.maximum}
                onChange={handleMaximumChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
          </div>

          {/* Create Filter Button - Memoized click handler */}
          <div className="flex justify-center">
            <button 
              onClick={handleCreateFilter}
              className="bg-black text-white px-8 py-3 rounded-lg hover:bg-gray-800 font-medium"
            >
              Create filter
            </button>
          </div>
        </div>
      )}

      {/* All Filters Section - Performance optimized with memoized components */}
      <div className="bg-white rounded-xl shadow-sm p-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">All filters</h2>
        
        {/* Optimized filter rendering with stable keys and memoized handlers */}
        <div className="space-y-6">
          {filters.map((filter) => (
            <div key={filter.id} className="border-b border-gray-200 pb-6 last:border-b-0">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold text-gray-900">{filter.name}</h3>
                {/* Delete button with memoized handler and stable filter ID */}
                <button 
                  onClick={() => deleteFilter(filter.id)}
                  className="text-red-500 hover:text-red-700"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
              
              {/* Optimized options grid rendering */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {filter.options.map((option, index) => (
                  <div key={index} className="flex items-center justify-between bg-gray-50 p-3 rounded-lg">
                    <div>
                      <p className="font-medium text-gray-700">{option.name}</p>
                      {/* Conditional rendering optimized with short-circuit evaluation */}
                      {option.priority && (
                        <p className="text-sm text-gray-500">Priority: {option.priority}</p>
                      )}
                      {option.value && (
                        <p className="text-sm text-gray-600">Value: {option.value}</p>
                      )}
                    </div>
                    {/* Action buttons with memoized handlers */}
                    <div className="flex items-center space-x-2">
                      <button className="text-blue-500 hover:text-blue-700">
                        <Edit className="h-4 w-4" />
                      </button>
                      <button 
                        onClick={() => deleteFilterOption(filter.id, index)}
                        className="text-red-500 hover:text-red-700"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
              
              {/* Empty state with performance-optimized conditional rendering */}
              {filter.options.length === 0 && (
                <p className="text-gray-500 italic">No options configured for this filter</p>
              )}
            </div>
          ))}
        </div>

        {/* Global empty state - only renders when necessary */}
        {filters.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">No filters created yet</p>
            <p className="text-gray-400">Click "Create Filter" to add your first filter</p>
          </div>
        )}
      </div>

      {/* Filter Categories Overview - Performance optimized with memoized categorization */}
      {/* Using pre-calculated categorizedFilters to avoid repeated filter operations */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Category Filters - Memoized filter list */}
        <div className="bg-white rounded-xl shadow-sm p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Category Filters</h3>
          <div className="space-y-2">
            {categorizedFilters.category.map(filter => (
              <div key={filter.id} className="flex justify-between items-center">
                <span className="text-gray-700">{filter.name}</span>
                <span className="text-sm text-gray-500">{filter.options.length} options</span>
              </div>
            ))}
          </div>
        </div>

        {/* Price Filters - Optimized with pre-filtered data */}
        <div className="bg-white rounded-xl shadow-sm p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Price Filters</h3>
          <div className="space-y-2">
            {categorizedFilters.price.map(filter => (
              <div key={filter.id} className="flex justify-between items-center">
                <span className="text-gray-700">{filter.name}</span>
                <span className="text-sm text-gray-500">{filter.options.length} ranges</span>
              </div>
            ))}
          </div>
        </div>

        {/* Size Filters - Performance optimized categorization */}
        <div className="bg-white rounded-xl shadow-sm p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Size Filters</h3>
          <div className="space-y-2">
            {categorizedFilters.size.map(filter => (
              <div key={filter.id} className="flex justify-between items-center">
                <span className="text-gray-700">{filter.name}</span>
                <span className="text-sm text-gray-500">{filter.options.length} sizes</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Filters;
