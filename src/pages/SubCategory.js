import React, { useState } from 'react';
import { Search, Edit2, Trash2, ChevronDown, X } from 'lucide-react';

const SubCategory = () => {
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedSubCategory, setSelectedSubCategory] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editingSubCategory, setEditingSubCategory] = useState(null);
  const [newSubCategoryName, setNewSubCategoryName] = useState('');
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [deletingSubCategory, setDeletingSubCategory] = useState(null);
  const [isDeleteSuccessModalOpen, setIsDeleteSuccessModalOpen] = useState(false);

  // Sample subcategory data - matches the Figma design
  const subCategories = [
    {
      id: 1,
      name: 'SubCategory 1',
      image: '/api/placeholder/200/200',
      description: 'What\'s your contact informati'
    },
    {
      id: 2,
      name: 'SubCategory 2',
      image: '/api/placeholder/200/200',
      description: 'What\'s your contact informati'
    }
  ];

  const categoryOptions = [
    'Electronics',
    'Clothing',
    'Home & Garden',
    'Sports',
    'Books',
    'Toys'
  ];

  const subCategoryOptions = [
    'Smartphones',
    'Laptops',
    'Cameras',
    'Accessories'
  ];

  const handleEdit = (subCategoryId) => {
    const subCategoryToEdit = subCategories.find(subCat => subCat.id === subCategoryId);
    setEditingSubCategory(subCategoryToEdit);
    setNewSubCategoryName(subCategoryToEdit.name);
    setIsEditModalOpen(true);
  };

  const handleSaveEdit = () => {
    console.log('Saving edit for subcategory:', editingSubCategory.id, 'New name:', newSubCategoryName);
    // Here you would typically update the subcategory in your state or make an API call
    
    // Close edit modal and show success modal
    setIsEditModalOpen(false);
    setIsSuccessModalOpen(true);
  };

  const handleCloseEdit = () => {
    setIsEditModalOpen(false);
    setEditingSubCategory(null);
    setNewSubCategoryName('');
  };

  const handleCloseSuccess = () => {
    setIsSuccessModalOpen(false);
    setEditingSubCategory(null);
    setNewSubCategoryName('');
  };

  const handleDelete = (subCategoryId) => {
    const subCategoryToDelete = subCategories.find(subCat => subCat.id === subCategoryId);
    setDeletingSubCategory(subCategoryToDelete);
    setIsDeleteModalOpen(true);
  };

  const handleConfirmDelete = () => {
    console.log('Deleting subcategory:', deletingSubCategory.id);
    // Here you would typically remove the subcategory from your state or make an API call
    
    // Close delete modal and show delete success modal
    setIsDeleteModalOpen(false);
    setIsDeleteSuccessModalOpen(true);
  };

  const handleCancelDelete = () => {
    setIsDeleteModalOpen(false);
    setDeletingSubCategory(null);
  };

  const handleCloseDeleteSuccess = () => {
    setIsDeleteSuccessModalOpen(false);
    setDeletingSubCategory(null);
  };

  const handleAddNewSubCategory = () => {
    setEditingSubCategory({ id: null, name: '', image: '', description: '' });
    setNewSubCategoryName('');
    setIsEditModalOpen(true);
  };

  const filteredSubCategories = subCategories.filter(subCategory =>
    subCategory.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    subCategory.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Main Content Container */}
      <div className="ml-4 mr-8 bg-white rounded-xl shadow-lg overflow-hidden">
        
        {/* Header */}
        <div className="p-6 border-b border-gray-200">
          <h1 className="text-2xl font-bold text-gray-900 mb-6">Create SubCategory</h1>
          
          {/* Controls Section */}
          <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center justify-start">
            
            {/* Search Bar */}
            <div className="relative flex-shrink-0 w-80">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Search subcategories..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="block w-full pl-10 pr-3 py-2.5 border border-gray-300 rounded-lg leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            {/* Category Dropdown */}
            <div className="relative flex-shrink-0">
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="appearance-none bg-white border border-gray-400 rounded-xl px-4 py-3 pr-8 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 w-48"
              >
                <option value="">Select Category</option>
                {categoryOptions.map((option, index) => (
                  <option key={index} value={option}>{option}</option>
                ))}
              </select>
              <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                <ChevronDown className="h-4 w-4 text-gray-400" />
              </div>
            </div>

            {/* Sub Category Dropdown */}
            <div className="relative flex-shrink-0">
              <select
                value={selectedSubCategory}
                onChange={(e) => setSelectedSubCategory(e.target.value)}
                className="appearance-none bg-white border border-gray-400 rounded-xl px-4 py-3 pr-8 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 w-48"
              >
                <option value="">Select Sub Category</option>
                {subCategoryOptions.map((option, index) => (
                  <option key={index} value={option}>{option}</option>
                ))}
              </select>
              <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                <ChevronDown className="h-4 w-4 text-gray-400" />
              </div>
            </div>
          </div>
        </div>

        {/* Table Section */}
        <div className="p-6">
          
          {/* Table Header */}
          <div className="bg-white border border-gray-300 rounded-t-lg shadow-sm">
            <div className="grid grid-cols-12 gap-6 p-4 bg-gray-50 border-b border-gray-200 rounded-t-lg">
              <div className="col-span-3">
                <h3 className="text-sm font-semibold text-gray-700 uppercase tracking-wide">Image</h3>
              </div>
              <div className="col-span-6">
                <h3 className="text-sm font-semibold text-gray-700 uppercase tracking-wide">SubCategory Details</h3>
              </div>
              <div className="col-span-3">
                <h3 className="text-sm font-semibold text-gray-700 uppercase tracking-wide">Actions</h3>
              </div>
            </div>

            {/* Table Rows */}
            <div className="divide-y divide-gray-100">
              {filteredSubCategories.map((subCategory) => (
                <div key={subCategory.id} className="grid grid-cols-12 gap-6 p-4 items-center hover:bg-gray-50 transition-colors duration-150">
                  
                  {/* Image Column */}
                  <div className="col-span-3">
                    <div className="w-20 h-20 bg-gray-200 rounded-lg overflow-hidden shadow-sm">
                      <img
                        src={subCategory.image}
                        alt={subCategory.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>

                  {/* SubCategory Column */}
                  <div className="col-span-6">
                    <div className="space-y-1">
                      <p className="text-lg font-medium text-gray-900">
                        {subCategory.name}
                      </p>
                      <p className="text-sm text-gray-500">
                        {subCategory.description}
                      </p>
                    </div>
                  </div>

                  {/* Action Column */}
                  <div className="col-span-3">
                    <div className="flex space-x-2">
                      <button
                        onClick={() => handleEdit(subCategory.id)}
                        className="p-2 text-gray-500 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors duration-150"
                        title="Edit SubCategory"
                      >
                        <Edit2 className="h-5 w-5" />
                      </button>
                      <button
                        onClick={() => handleDelete(subCategory.id)}
                        className="p-2 text-gray-500 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors duration-150"
                        title="Delete SubCategory"
                      >
                        <Trash2 className="h-5 w-5" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Empty State */}
            {filteredSubCategories.length === 0 && (
              <div className="p-12 text-center text-gray-500">
                <p className="text-lg">No subcategories found matching your search criteria.</p>
                <p className="text-sm mt-2">Try adjusting your search terms or add a new subcategory.</p>
              </div>
            )}
          </div>

          {/* Add SubCategory Button */}
          <div className="mt-6 flex justify-start">
            <button 
              onClick={handleAddNewSubCategory}
              className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-8 rounded-lg transition-colors duration-150 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 shadow-sm"
            >
              + Add New SubCategory
            </button>
          </div>
        </div>
      </div>

      {/* Edit SubCategory Modal */}
      {isEditModalOpen && editingSubCategory && (
        <div className="fixed inset-0 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-xl border border-gray-200 max-w-lg w-full mx-4 overflow-hidden">
            
            {/* Modal Header */}
            <div className="relative p-6 bg-gray-50 border-b border-gray-200">
              <h2 className="text-2xl font-bold text-gray-900 text-center">
                {editingSubCategory.id ? 'Edit SubCategory' : 'Add New SubCategory'}
              </h2>
              <button
                onClick={handleCloseEdit}
                className="absolute top-4 right-4 p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-200 rounded-full transition-colors"
              >
                <X className="h-6 w-6" />
              </button>
            </div>

            {/* Modal Content */}
            <div className="p-8">
              
              {/* Image Section */}
              <div className="mb-8 text-center">
                <p className="text-sm font-semibold text-gray-700 mb-4 uppercase tracking-wide">Image Preview</p>
                <div className="w-32 h-32 bg-gray-100 rounded-xl overflow-hidden mx-auto border-2 border-dashed border-gray-300">
                  {editingSubCategory.id ? (
                    <img
                      src={editingSubCategory.image}
                      alt={editingSubCategory.name}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-gray-400">
                      <span className="text-sm font-medium">No Image</span>
                    </div>
                  )}
                </div>
              </div>

              {/* SubCategory Info */}
              <div className="mb-8">
                {editingSubCategory.id && (
                  <div className="mb-6 p-4 bg-gray-50 rounded-lg">
                    <p className="text-sm font-semibold text-gray-700 mb-2 uppercase tracking-wide">Current SubCategory</p>
                    <p className="text-lg font-medium text-gray-900">{editingSubCategory.name}</p>
                    <p className="text-sm text-gray-600 mt-1">{editingSubCategory.description}</p>
                  </div>
                )}
                
                <label className="block text-sm font-semibold text-gray-700 mb-3 uppercase tracking-wide">
                  {editingSubCategory.id ? 'New SubCategory Name' : 'SubCategory Name'}
                </label>
                <input
                  type="text"
                  value={newSubCategoryName}
                  onChange={(e) => setNewSubCategoryName(e.target.value)}
                  className="w-full px-4 py-4 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-lg"
                  placeholder={editingSubCategory.id ? "Enter new name" : "Enter subcategory name"}
                />
              </div>

              {/* Action Buttons */}
              <div className="flex gap-4">
                <button
                  onClick={handleSaveEdit}
                  className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-4 px-6 rounded-xl transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                >
                  {editingSubCategory.id ? 'Update SubCategory' : 'Add SubCategory'}
                </button>
                <button
                  onClick={handleCloseEdit}
                  className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-700 font-semibold py-4 px-6 rounded-xl transition-colors focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Success Modal */}
      {isSuccessModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-xl border border-gray-200 max-w-md w-full mx-4 overflow-hidden">
            
            {/* Modal Content */}
            <div className="p-8 text-center">
              
              {/* Success Icon */}
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                </svg>
              </div>

              {/* Success Message */}
              <div className="mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-2">
                  Success!
                </h2>
                <p className="text-gray-600">
                  SubCategory {editingSubCategory && !editingSubCategory.id ? 'added' : 'updated'} successfully.
                </p>
              </div>

              {/* Done Button */}
              <button
                onClick={handleCloseSuccess}
                className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-6 rounded-xl transition-colors focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
              >
                Done
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {isDeleteModalOpen && deletingSubCategory && (
        <div className="fixed inset-0 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-xl border border-gray-200 max-w-md w-full mx-4 overflow-hidden">
            
            {/* Modal Content */}
            <div className="p-8 text-center">
              
              {/* Warning Icon */}
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.732 15.5c-.77.833.192 2.5 1.732 2.5z"></path>
                </svg>
              </div>

              {/* Delete Confirmation Message */}
              <div className="mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-2">Delete SubCategory</h2>
                <p className="text-gray-600">
                  Are you sure you want to delete this subcategory? This action cannot be undone.
                </p>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-4">
                <button
                  onClick={handleConfirmDelete}
                  className="flex-1 bg-red-600 hover:bg-red-700 text-white font-semibold py-3 px-6 rounded-xl transition-colors focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
                >
                  Delete
                </button>
                <button
                  onClick={handleCancelDelete}
                  className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-700 font-semibold py-3 px-6 rounded-xl transition-colors focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2"
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
        <div className="fixed inset-0 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-xl border border-gray-200 max-w-md w-full mx-4 overflow-hidden">
            
            {/* Modal Content */}
            <div className="p-8 text-center">
              
              {/* Success Icon */}
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                </svg>
              </div>

              {/* Delete Success Message */}
              <div className="mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-2">Deleted Successfully!</h2>
                <p className="text-gray-600">
                  The subcategory has been removed from your list.
                </p>
              </div>

              {/* Done Button */}
              <button
                onClick={handleCloseDeleteSuccess}
                className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-6 rounded-xl transition-colors focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
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

export default SubCategory;
