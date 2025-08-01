import React, { useState } from 'react';
import { Search, Edit2, Trash2, ChevronDown, X, Upload, Image as ImageIcon } from 'lucide-react';

const SubCategory = () => {
  const [selectedCategory, setSelectedCategory] = useState('Category');
  const [selectedSubCategory, setSelectedSubCategory] = useState('sub category');
  const [searchTerm, setSearchTerm] = useState('');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editingSubCategory, setEditingSubCategory] = useState(null);
  const [newSubCategoryName, setNewSubCategoryName] = useState('');
  const [uploadedImage, setUploadedImage] = useState(null);
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);
  const [isDeleteSuccessModalOpen, setIsDeleteSuccessModalOpen] = useState(false);
  const [deleteConfirmation, setDeleteConfirmation] = useState(null);

  // Sample subcategory data - matches the Figma design
  const subCategories = [
    {
      id: 1,
      category: 'men',
      subCategory: 'jacket',
      image: '/api/placeholder/208/208'
    },
    {
      id: 2,
      category: 'women',
      subCategory: 'shirt',
      image: '/api/placeholder/208/208'
    },
    {
      id: 3,
      category: 'Kids',
      subCategory: 'top',
      image: '/api/placeholder/208/208'
    }
  ];

  const categoryOptions = [
    'men',
    'women',
    'kids'
  ];

  const subCategoryOptions = [
    'jacket',
    'shirt',
    'top',
    'jeans',
    'shorts'
  ];

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setUploadedImage(e.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleEdit = (subCategoryId) => {
    const subCategoryToEdit = subCategories.find(subCat => subCat.id === subCategoryId);
    setEditingSubCategory(subCategoryToEdit);
    setNewSubCategoryName(subCategoryToEdit.subCategory);
    setUploadedImage(subCategoryToEdit.image);
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
    setUploadedImage(null);
  };

  const handleCloseSuccess = () => {
    setIsSuccessModalOpen(false);
    setEditingSubCategory(null);
    setNewSubCategoryName('');
    setUploadedImage(null);
  };

  const handleDelete = (subCategoryId) => {
    const subCategoryToDelete = subCategories.find(subCat => subCat.id === subCategoryId);
    setDeleteConfirmation(subCategoryToDelete);
  };

  const confirmDelete = () => {
    console.log('Deleting subcategory:', deleteConfirmation.id);
    // Here you would typically remove the subcategory from your state or make an API call
    
    // Close delete modal and show delete success modal
    setDeleteConfirmation(null);
    setIsDeleteSuccessModalOpen(true);
  };

  const handleCloseDeleteSuccess = () => {
    setIsDeleteSuccessModalOpen(false);
  };

  const handleAddNewSubCategory = () => {
    setNewSubCategoryName('');
    setUploadedImage(null);
    setIsAddModalOpen(true);
  };

  const handleSaveNewSubCategory = () => {
    console.log('Adding new subcategory:', newSubCategoryName, 'Image:', uploadedImage);
    // Here you would typically add the subcategory to your state or make an API call
    
    // Close add modal and show success modal
    setIsAddModalOpen(false);
    setIsSuccessModalOpen(true);
  };

  const handleCloseAddModal = () => {
    setIsAddModalOpen(false);
    setNewSubCategoryName('');
    setUploadedImage(null);
  };

  const filteredSubCategories = subCategories.filter(subCategory =>
    subCategory.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
    subCategory.subCategory.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="bg-white min-h-screen">
      {/* Main Content Container */}
      <div className="mx-6 bg-white">
        
        {/* Header */}
        <div className="py-8 px-6">
          <h1 className="text-2xl font-bold text-gray-900 mb-8">Create Subcategory</h1>
          
          {/* Controls Section */}
          <div className="flex items-center gap-6 justify-between">
            
            {/* Left side controls */}
            <div className="flex items-center gap-6">
              {/* Search Bar */}
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Search className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="text"
                  placeholder="Search"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="block w-80 pl-10 pr-3 py-2.5 border border-gray-300 rounded-lg bg-white placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>

              {/* Category Dropdown */}
              <div className="relative">
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="appearance-none bg-white border border-gray-300 rounded-lg px-4 py-3 pr-8 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 w-48"
                >
                  <option value="Category" disabled>Category</option>
                  {categoryOptions.map((option, index) => (
                    <option key={index} value={option}>{option}</option>
                  ))}
                </select>
                <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                  <ChevronDown className="h-4 w-4 text-gray-400" />
                </div>
              </div>

              {/* Sub Category Dropdown */}
              <div className="relative">
                <select
                  value={selectedSubCategory}
                  onChange={(e) => setSelectedSubCategory(e.target.value)}
                  className="appearance-none bg-white border border-gray-300 rounded-lg px-4 py-3 pr-8 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 w-48"
                >
                  <option value="sub category" disabled>sub category</option>
                  {subCategoryOptions.map((option, index) => (
                    <option key={index} value={option}>{option}</option>
                  ))}
                </select>
                <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                  <ChevronDown className="h-4 w-4 text-gray-400" />
                </div>
              </div>
            </div>

            {/* Add SubCategory Button */}
            <button 
              onClick={handleAddNewSubCategory}
              className="bg-black hover:bg-gray-800 text-white font-medium py-2.5 px-6 rounded-lg transition-colors duration-150 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 flex items-center gap-2"
            >
              + Add subcategory
            </button>
          </div>
        </div>

        {/* SubCategories Grid */}
        <div className="px-6 pb-6">
          
          {/* Table Header */}
          <div className="bg-white border border-gray-200 rounded-t-lg">
            <div className="grid grid-cols-12 gap-6 p-4 bg-gray-50 border-b border-gray-200 rounded-t-lg">
              <div className="col-span-2">
                <h3 className="text-sm font-semibold text-gray-800">Image</h3>
              </div>
              <div className="col-span-4">
                <h3 className="text-sm font-semibold text-gray-800">Category</h3>
              </div>
              <div className="col-span-4">
                <h3 className="text-sm font-semibold text-gray-800">sub category</h3>
              </div>
              <div className="col-span-2">
                <h3 className="text-sm font-semibold text-gray-800">Action</h3>
              </div>
            </div>

            {/* SubCategory Rows */}
            <div className="divide-y divide-gray-100">
              {filteredSubCategories.map((subCategory) => (
                <div key={subCategory.id} className="grid grid-cols-12 gap-6 p-4 items-center hover:bg-gray-50 transition-colors duration-150">
                  
                  {/* Image Column */}
                  <div className="col-span-2">
                    <div className="w-16 h-16 bg-gray-100 rounded-lg overflow-hidden">
                      <img
                        src={subCategory.image}
                        alt={subCategory.subCategory}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>

                  {/* Category Column */}
                  <div className="col-span-4">
                    <p className="text-base font-medium text-gray-900">
                      {subCategory.category}
                    </p>
                  </div>

                  {/* SubCategory Column */}
                  <div className="col-span-4">
                    <p className="text-base font-medium text-gray-900">
                      {subCategory.subCategory}
                    </p>
                  </div>

                  {/* Action Column */}
                  <div className="col-span-2">
                    <div className="flex space-x-2">
                      <button
                        onClick={() => handleEdit(subCategory.id)}
                        className="p-2 text-gray-500 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors duration-150"
                        title="Edit SubCategory"
                      >
                        <Edit2 className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => handleDelete(subCategory.id)}
                        className="p-2 text-gray-500 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors duration-150"
                        title="Delete SubCategory"
                      >
                        <Trash2 className="h-4 w-4" />
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
        </div>
      </div>

      {/* Add SubCategory Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl shadow-xl max-w-4xl w-full mx-4 overflow-hidden">
            
            {/* Modal Header */}
            <div className="relative p-6 border-b border-gray-200">
              <h2 className="text-xl font-semibold text-gray-900 text-center">
                Add subcategory
              </h2>
              <button
                onClick={handleCloseAddModal}
                className="absolute top-4 right-4 p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-full transition-colors"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Modal Content */}
            <div className="p-8">
              <div className="grid grid-cols-2 gap-12">
                
                {/* Left Column - Upload Image */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-6">Upload image</h3>
                  
                  {/* Image Upload Area */}
                  <div className="border-2 border-dashed border-gray-300 rounded-xl p-8 text-center bg-gray-50">
                    {uploadedImage ? (
                      <div className="space-y-4">
                        <img
                          src={uploadedImage}
                          alt="Uploaded subcategory"
                          className="mx-auto w-32 h-32 object-cover rounded-lg"
                        />
                        <button
                          onClick={() => setUploadedImage(null)}
                          className="text-sm text-gray-500 hover:text-gray-700"
                        >
                          Remove image
                        </button>
                      </div>
                    ) : (
                      <div className="space-y-4">
                        <div className="mx-auto w-16 h-16 bg-gray-200 rounded-lg flex items-center justify-center">
                          <ImageIcon className="h-8 w-8 text-gray-400" />
                        </div>
                        <div className="space-y-2">
                          <p className="text-sm text-gray-600">Drop your image</p>
                          <p className="text-xs text-gray-500">here PNG, JPEG allowed</p>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Upload Button */}
                  <div className="mt-6">
                    <label className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-6 rounded-lg transition-colors cursor-pointer inline-flex items-center gap-2">
                      <Upload className="h-4 w-4" />
                      Upload image
                      <input
                        type="file"
                        className="hidden"
                        accept="image/*"
                        onChange={handleImageUpload}
                      />
                    </label>
                  </div>
                </div>

                {/* Right Column - Type new subcategory */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-6">Type new subcategory</h3>
                  
                  <input
                    type="text"
                    value={newSubCategoryName}
                    onChange={(e) => setNewSubCategoryName(e.target.value)}
                    className="w-full px-4 py-4 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-base"
                    placeholder="Enter subcategory name"
                  />
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex justify-center gap-4 mt-12">
                <button
                  onClick={handleSaveNewSubCategory}
                  className="bg-black hover:bg-gray-800 text-white font-medium py-3 px-12 rounded-xl transition-colors focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
                >
                  save
                </button>
                <button
                  onClick={handleCloseAddModal}
                  className="text-gray-600 hover:text-gray-800 font-medium py-3 px-12 transition-colors focus:outline-none"
                >
                  go back
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Edit SubCategory Modal */}
      {isEditModalOpen && editingSubCategory && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl shadow-xl max-w-4xl w-full mx-4 overflow-hidden">
            
            {/* Modal Header */}
            <div className="relative p-6 border-b border-gray-200">
              <h2 className="text-xl font-semibold text-gray-900 text-center">
                Edit SubCategory
              </h2>
              <button
                onClick={handleCloseEdit}
                className="absolute top-4 right-4 p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-full transition-colors"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Modal Content */}
            <div className="p-8">
              <div className="grid grid-cols-2 gap-12">
                
                {/* Left Column - Upload Image */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-6">Upload image</h3>
                  
                  {/* Image Upload Area */}
                  <div className="border-2 border-dashed border-gray-300 rounded-xl p-8 text-center bg-gray-50">
                    {uploadedImage ? (
                      <div className="space-y-4">
                        <img
                          src={uploadedImage}
                          alt="SubCategory"
                          className="mx-auto w-32 h-32 object-cover rounded-lg"
                        />
                        <button
                          onClick={() => setUploadedImage(null)}
                          className="text-sm text-gray-500 hover:text-gray-700"
                        >
                          Remove image
                        </button>
                      </div>
                    ) : (
                      <div className="space-y-4">
                        <div className="mx-auto w-16 h-16 bg-gray-200 rounded-lg flex items-center justify-center">
                          <ImageIcon className="h-8 w-8 text-gray-400" />
                        </div>
                        <div className="space-y-2">
                          <p className="text-sm text-gray-600">Drop your image</p>
                          <p className="text-xs text-gray-500">here PNG, JPEG allowed</p>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Upload Button */}
                  <div className="mt-6">
                    <label className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-6 rounded-lg transition-colors cursor-pointer inline-flex items-center gap-2">
                      <Upload className="h-4 w-4" />
                      Upload image
                      <input
                        type="file"
                        className="hidden"
                        accept="image/*"
                        onChange={handleImageUpload}
                      />
                    </label>
                  </div>
                </div>

                {/* Right Column - Edit subcategory name */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-6">Edit subcategory name</h3>
                  
                  <input
                    type="text"
                    value={newSubCategoryName}
                    onChange={(e) => setNewSubCategoryName(e.target.value)}
                    className="w-full px-4 py-4 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-base"
                    placeholder="Enter subcategory name"
                  />
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex justify-center gap-4 mt-12">
                <button
                  onClick={handleSaveEdit}
                  className="bg-black hover:bg-gray-800 text-white font-medium py-3 px-12 rounded-xl transition-colors focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
                >
                  save
                </button>
                <button
                  onClick={handleCloseEdit}
                  className="text-gray-600 hover:text-gray-800 font-medium py-3 px-12 transition-colors focus:outline-none"
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
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl shadow-xl max-w-sm w-full mx-4 overflow-hidden">
            
            {/* Modal Content */}
            <div className="p-8 text-center">
              
              {/* Success Icon */}
              <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"></path>
                </svg>
              </div>

              {/* Success Message */}
              <div className="mb-8">
                <h2 className="text-lg font-semibold text-gray-900 leading-tight">
                  subcategory updated<br />successfully!
                </h2>
              </div>

              {/* Done Button */}
              <button
                onClick={handleCloseSuccess}
                className="w-full bg-black hover:bg-gray-800 text-white font-medium py-3 px-6 rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
              >
                Done
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Success Modal */}
      {isDeleteSuccessModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl shadow-xl max-w-sm w-full mx-4 overflow-hidden">
            
            {/* Modal Content */}
            <div className="p-8 text-center">
              
              {/* Success Icon */}
              <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"></path>
                </svg>
              </div>

              {/* Delete Success Message */}
              <div className="mb-8">
                <h2 className="text-lg font-semibold text-gray-900 leading-tight">
                  Subcategory deleted<br />successfully!
                </h2>
              </div>

              {/* Done Button */}
              <button
                onClick={handleCloseDeleteSuccess}
                className="w-full bg-black hover:bg-gray-800 text-white font-medium py-3 px-6 rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
              >
                Done
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {deleteConfirmation && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl shadow-xl max-w-sm w-full mx-4 overflow-hidden">
            
            {/* Modal Content */}
            <div className="p-8 text-center">
              
              {/* Delete Confirmation Message */}
              <div className="mb-8">
                <h2 className="text-lg font-semibold text-gray-900 leading-tight">
                  Are you sure you<br />want to delete this<br />subcategory
                </h2>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3">
                <button
                  onClick={confirmDelete}
                  className="flex-1 bg-black hover:bg-gray-800 text-white font-medium py-3 px-6 rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
                >
                  yes
                </button>
                <button
                  onClick={() => setDeleteConfirmation(null)}
                  className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium py-3 px-6 rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SubCategory;
