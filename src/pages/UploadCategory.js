import React, { useState } from 'react';
import { Search, Edit2, Trash2, ChevronDown, X } from 'lucide-react';

const UploadCategory = () => {
  const [selectedCategory, setSelectedCategory] = useState('Category');
  const [selectedSubCategory, setSelectedSubCategory] = useState('sub category');
  const [searchTerm, setSearchTerm] = useState('');
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState(null);
  const [newCategoryName, setNewCategoryName] = useState('');
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [deletingCategory, setDeletingCategory] = useState(null);
  const [isDeleteSuccessModalOpen, setIsDeleteSuccessModalOpen] = useState(false);

  // Sample category data - matches the Figma design
  const categories = [
    {
      id: 1,
      name: 'Category 1',
      image: '/api/placeholder/208/208',
      description: 'What\'s your contact informati'
    },
    {
      id: 2,
      name: 'Category 2',
      image: '/api/placeholder/208/208',
      description: 'What\'s your contact informati'
    }
  ];

  const categoryOptions = [
    'Category',
    'Electronics',
    'Clothing',
    'Home & Garden',
    'Sports',
    'Books',
    'Toys'
  ];

  const subCategoryOptions = [
    'sub category',
    'Smartphones',
    'Laptops',
    'Cameras',
    'Accessories'
  ];

  const handleEdit = (categoryId) => {
    const categoryToEdit = categories.find(cat => cat.id === categoryId);
    setEditingCategory(categoryToEdit);
    setNewCategoryName(categoryToEdit.name);
    setIsEditModalOpen(true);
  };

  const handleSaveEdit = () => {
    console.log('Saving edit for category:', editingCategory.id, 'New name:', newCategoryName);
    // Here you would typically update the category in your state or make an API call
    
    // Close edit modal and show success modal
    setIsEditModalOpen(false);
    setIsSuccessModalOpen(true);
  };

  const handleCloseEdit = () => {
    setIsEditModalOpen(false);
    setEditingCategory(null);
    setNewCategoryName('');
  };

  const handleCloseSuccess = () => {
    setIsSuccessModalOpen(false);
    setEditingCategory(null);
    setNewCategoryName('');
  };

  const handleDelete = (categoryId) => {
    const categoryToDelete = categories.find(cat => cat.id === categoryId);
    setDeletingCategory(categoryToDelete);
    setIsDeleteModalOpen(true);
  };

  const handleConfirmDelete = () => {
    console.log('Deleting category:', deletingCategory.id);
    // Here you would typically remove the category from your state or make an API call
    
    // Close delete modal and show delete success modal
    setIsDeleteModalOpen(false);
    setIsDeleteSuccessModalOpen(true);
  };

  const handleCancelDelete = () => {
    setIsDeleteModalOpen(false);
    setDeletingCategory(null);
  };

  const handleCloseDeleteSuccess = () => {
    setIsDeleteSuccessModalOpen(false);
    setDeletingCategory(null);
  };

  const filteredCategories = categories.filter(category =>
    category.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    category.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900 mb-6">create Category</h1>
        
        {/* Controls Section */}
        <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center mb-6">
          
          {/* Search Bar */}
          <div className="relative flex-1 max-w-sm">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Search"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="block w-full pl-10 pr-3 py-2.5 border border-gray-300 rounded-lg leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-blue-500 focus:border-blue-500 shadow-sm"
            />
          </div>

          {/* Category Dropdown */}
          <div className="relative">
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="appearance-none bg-white border border-gray-400 rounded-xl px-4 py-3 pr-8 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 min-w-[320px] h-[47px]"
            >
              {categoryOptions.map((option, index) => (
                <option key={index} value={option}>{option}</option>
              ))}
            </select>
            <div className="absolute inset-y-0 right-0 flex items-center px-3 pointer-events-none">
              <ChevronDown className="h-4 w-4 text-gray-400" />
            </div>
          </div>

          {/* Sub Category Dropdown */}
          <div className="relative">
            <select
              value={selectedSubCategory}
              onChange={(e) => setSelectedSubCategory(e.target.value)}
              className="appearance-none bg-white border border-gray-400 rounded-xl px-4 py-3 pr-8 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 min-w-[320px] h-[47px]"
            >
              {subCategoryOptions.map((option, index) => (
                <option key={index} value={option}>{option}</option>
              ))}
            </select>
            <div className="absolute inset-y-0 right-0 flex items-center px-3 pointer-events-none">
              <ChevronDown className="h-4 w-4 text-gray-400" />
            </div>
          </div>
        </div>
      </div>

      {/* Table Header */}
      <div className="bg-white border border-gray-300 rounded-t-lg">
        <div className="grid grid-cols-12 gap-4 p-4 border-b border-gray-200 bg-gray-50">
          <div className="col-span-3">
            <span className="text-sm font-bold text-gray-700">Image</span>
          </div>
          <div className="col-span-6">
            <span className="text-sm font-bold text-gray-700">Category</span>
          </div>
          <div className="col-span-3">
            <span className="text-sm font-bold text-gray-700">Action</span>
          </div>
        </div>

        {/* Category Items */}
        <div className="divide-y divide-gray-100">
          {filteredCategories.map((category) => (
            <div key={category.id} className="grid grid-cols-12 gap-4 p-4 items-center hover:bg-gray-50 transition-colors">
              {/* Image */}
              <div className="col-span-3">
                <div className="w-52 h-52 bg-gray-200 rounded-lg overflow-hidden">
                  <img
                    src={category.image}
                    alt={category.name}
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>

              {/* Category Description */}
              <div className="col-span-6">
                <p className="text-lg font-medium text-gray-900">
                  {category.description}
                </p>
              </div>

              {/* Action Buttons */}
              <div className="col-span-3">
                <div className="flex space-x-2">
                  <button
                    onClick={() => handleEdit(category.id)}
                    className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
                    title="Edit"
                  >
                    <Edit2 className="h-5 w-5" />
                  </button>
                  <button
                    onClick={() => handleDelete(category.id)}
                    className="p-2 text-gray-500 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                    title="Delete"
                  >
                    <Trash2 className="h-5 w-5" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {filteredCategories.length === 0 && (
          <div className="p-8 text-center text-gray-500">
            <p>No categories found matching your search.</p>
          </div>
        )}
      </div>

      {/* Add Category Button */}
      <div className="mt-6 flex justify-center">
        <button className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-6 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
          Add New Category
        </button>
      </div>

      {/* Edit Category Modal */}
      {isEditModalOpen && editingCategory && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-2xl max-w-md w-full mx-4 overflow-hidden">
            
            {/* Modal Header */}
            <div className="relative p-6 border-b border-gray-200">
              <h2 className="text-xl font-bold text-gray-900 text-center">Edit category</h2>
              <button
                onClick={handleCloseEdit}
                className="absolute top-4 right-4 p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Modal Content */}
            <div className="p-6">
              
              {/* Image Section */}
              <div className="mb-6">
                <p className="text-sm font-medium text-gray-700 mb-3">Image</p>
                <div className="w-24 h-24 bg-gray-200 rounded-lg overflow-hidden mx-auto">
                  <img
                    src={editingCategory.image}
                    alt={editingCategory.name}
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>

              {/* Category Info */}
              <div className="mb-6">
                <p className="text-sm font-medium text-gray-700 mb-2">Category</p>
                <p className="text-gray-900 mb-4">{editingCategory.description}</p>
                
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  Type new category
                </label>
                <input
                  type="text"
                  value={newCategoryName}
                  onChange={(e) => setNewCategoryName(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Enter new category name"
                />
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col gap-3">
                <button
                  onClick={handleSaveEdit}
                  className="w-full bg-black hover:bg-gray-800 text-white font-medium py-3 px-6 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
                >
                  save
                </button>
                <button
                  onClick={handleCloseEdit}
                  className="w-full bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium py-3 px-6 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-gray-300 focus:ring-offset-2"
                >
                  go back
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Success Modal */}
      {isSuccessModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-2xl max-w-sm w-full mx-4 overflow-hidden">
            
            {/* Modal Content */}
            <div className="p-8 text-center">
              
              {/* Success Message */}
              <div className="mb-8">
                <h2 className="text-xl font-bold text-gray-900 mb-2">category updated</h2>
                <h2 className="text-xl font-bold text-gray-900">successfully!</h2>
              </div>

              {/* Done Button */}
              <button
                onClick={handleCloseSuccess}
                className="w-full bg-black hover:bg-gray-800 text-white font-medium py-3 px-6 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
              >
                Done
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {isDeleteModalOpen && deletingCategory && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-2xl max-w-sm w-full mx-4 overflow-hidden">
            
            {/* Modal Content */}
            <div className="p-8 text-center">
              
              {/* Delete Confirmation Message */}
              <div className="mb-8">
                <h2 className="text-xl font-bold text-gray-900 mb-2">Are you sure you</h2>
                <h2 className="text-xl font-bold text-gray-900 mb-2">want to delete this</h2>
                <h2 className="text-xl font-bold text-gray-900">category</h2>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3">
                <button
                  onClick={handleConfirmDelete}
                  className="flex-1 bg-black hover:bg-gray-800 text-white font-medium py-3 px-6 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
                >
                  yes
                </button>
                <button
                  onClick={handleCancelDelete}
                  className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium py-3 px-6 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-gray-300 focus:ring-offset-2"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Delete Success Modal */}
      {isDeleteSuccessModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-2xl max-w-sm w-full mx-4 overflow-hidden">
            
            {/* Modal Content */}
            <div className="p-8 text-center">
              
              {/* Delete Success Message */}
              <div className="mb-8">
                <h2 className="text-xl font-bold text-gray-900 mb-2">category deleted</h2>
                <h2 className="text-xl font-bold text-gray-900">successfully!</h2>
              </div>

              {/* Done Button */}
              <button
                onClick={handleCloseDeleteSuccess}
                className="w-full bg-black hover:bg-gray-800 text-white font-medium py-3 px-6 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
              >
                Done
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UploadCategory;
