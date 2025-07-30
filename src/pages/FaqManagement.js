import React, { useState, useMemo, useCallback } from 'react';
import { Search, MessageSquare, Plus, Minus, Edit, Trash2, X } from 'lucide-react';

/**
 * FAQ Management Component
 * 
 * A comprehensive FAQ management interface that allows administrators to create,
 * edit, delete, and view frequently asked questions.
 * 
 * Features:
 * - Create new FAQs with title and detail
 * - View all existing FAQs
 * - Search and filter FAQs
 * - Edit and delete existing FAQs
 * - Responsive design with Tailwind CSS
 * 
 * Performance Optimizations:
 * - useMemo for expensive computations
 * - useCallback for stable function references
 * - Optimized re-renders with proper dependency arrays
 * - Memoized child components to prevent unnecessary re-renders
 */
const FaqManagement = React.memo(() => {
  // State management for FAQ creation and editing
  const [faqTitle, setFaqTitle] = useState('');
  const [faqDetail, setFaqDetail] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [editingFaq, setEditingFaq] = useState(null);
  const [expandedFaqs, setExpandedFaqs] = useState(new Set());
  const [showEditModal, setShowEditModal] = useState(false);
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showDeleteSuccessPopup, setShowDeleteSuccessPopup] = useState(false);
  const [faqToDelete, setFaqToDelete] = useState(null);

  /**
   * Sample FAQ data - In a real application, this would come from an API
   * Memoized to prevent unnecessary re-creation on each render
   */
  const [faqs, setFaqs] = useState([
    {
      id: 1,
      title: 'WHAT DO I NEED TO KNOW BEFORE SIGNING UP TO THE YORAA MEMBERSHIP?',
      detail: 'All your purchases in store and online are rewarded with points. To collect points in store, always remember to scan your membership ID via the H&M app. You can also earn points by completing your profile, earning you 20 points, by recycling your garments earning you 20 points, by bringing your own bag when you shop in-store earning you 5 points, and by inviting your friends to become members. You\'ll earn 50 points for every new member that completes their first purchase. Your points will be displayed on your membership account which can take up to 24 hours to update.',
      createdAt: '2024-01-15',
      isActive: true
    },
    {
      id: 2,
      title: 'HOW DO I EARN POINTS WITH MY YORAA MEMBERSHIP?',
      detail: 'All your purchases in store and online are rewarded with points. To collect points in store, always remember to scan your membership ID via the H&M app. You can also earn points by completing your profile, earning you 20 points, by recycling your garments earning you 20 points, by bringing your own bag when you shop in-store earning you 5 points, and by inviting your friends to become members. You\'ll earn 50 points for every new member that completes their first purchase. Your points will be displayed on your membership account which can take up to 24 hours to update.',
      createdAt: '2024-01-10',
      isActive: true
    },
    {
      id: 3,
      title: 'HOW LONG DOES SHIPPING TAKE?',
      detail: 'Standard shipping takes 3-5 business days. Express shipping is available for 1-2 business days delivery. Free shipping is available on orders over $50.',
      createdAt: '2024-01-05',
      isActive: true
    }
  ]);

  /**
   * Form validation - check if required fields are filled
   * Memoized to prevent unnecessary recalculations
   */
  const isFormValid = useMemo(() => {
    return faqTitle.trim() !== '' && faqDetail.trim() !== '';
  }, [faqTitle, faqDetail]);

  /**
   * Filtered FAQs based on search term
   * Memoized to prevent unnecessary recalculations
   */
  const filteredFaqs = useMemo(() => {
    if (!searchTerm) return faqs;
    
    return faqs.filter(faq => 
      faq.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      faq.detail.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [faqs, searchTerm]);

  /**
   * Handle creating a new FAQ
   * Optimized with useCallback to prevent unnecessary re-renders
   */
  const handleCreateFaq = useCallback(() => {
    if (!isFormValid) return;

    const newFaq = {
      id: Date.now(), // Simple ID generation - use proper UUID in production
      title: faqTitle,
      detail: faqDetail,
      createdAt: new Date().toISOString().split('T')[0],
      isActive: true
    };

    setFaqs(prevFaqs => [newFaq, ...prevFaqs]);
    
    // Clear form
    setFaqTitle('');
    setFaqDetail('');
  }, [faqTitle, faqDetail, isFormValid]);

  /**
   * Handle editing an existing FAQ
   */
  const handleEditFaq = useCallback((faq) => {
    setEditingFaq(faq);
    setFaqTitle(faq.title);
    setFaqDetail(faq.detail);
    setShowEditModal(true);
  }, []);

  /**
   * Handle updating an existing FAQ
   */
  const handleUpdateFaq = useCallback(() => {
    if (!isFormValid || !editingFaq) return;

    setFaqs(prevFaqs => prevFaqs.map(faq => 
      faq.id === editingFaq.id 
        ? { ...faq, title: faqTitle, detail: faqDetail }
        : faq
    ));

    // Clear form and editing state
    setFaqTitle('');
    setFaqDetail('');
    setEditingFaq(null);
    setShowEditModal(false);
    
    // Show success popup
    setShowSuccessPopup(true);
  }, [faqTitle, faqDetail, isFormValid, editingFaq]);

  /**
   * Handle deleting an FAQ
   */
  const handleDeleteFaq = useCallback((faqId) => {
    const faqToDelete = faqs.find(faq => faq.id === faqId);
    setFaqToDelete(faqToDelete);
    setShowDeleteModal(true);
  }, [faqs]);

  /**
   * Confirm FAQ deletion
   */
  const handleConfirmDelete = useCallback(() => {
    if (faqToDelete) {
      setFaqs(prevFaqs => prevFaqs.filter(faq => faq.id !== faqToDelete.id));
      setShowDeleteModal(false);
      setFaqToDelete(null);
      setShowDeleteSuccessPopup(true);
    }
  }, [faqToDelete]);

  /**
   * Cancel FAQ deletion
   */
  const handleCancelDelete = useCallback(() => {
    setShowDeleteModal(false);
    setFaqToDelete(null);
  }, []);

  /**
   * Handle canceling edit mode
   */
  const handleCancelEdit = useCallback(() => {
    setEditingFaq(null);
    setFaqTitle('');
    setFaqDetail('');
    setShowEditModal(false);
  }, []);

  /**
   * Input change handlers - optimized with useCallback
   */
  const handleTitleChange = useCallback((e) => {
    setFaqTitle(e.target.value);
  }, []);

  const handleDetailChange = useCallback((e) => {
    setFaqDetail(e.target.value);
  }, []);

  const handleSearchChange = useCallback((e) => {
    setSearchTerm(e.target.value);
  }, []);

  /**
   * Handle FAQ expansion/collapse
   */
  const toggleFaqExpansion = useCallback((faqId) => {
    setExpandedFaqs(prev => {
      const newSet = new Set(prev);
      if (newSet.has(faqId)) {
        newSet.delete(faqId);
      } else {
        newSet.add(faqId);
      }
      return newSet;
    });
  }, []);

  /**
   * Handle closing success popup
   */
  const handleCloseSuccessPopup = useCallback(() => {
    setShowSuccessPopup(false);
  }, []);

  /**
   * Handle closing delete success popup
   */
  const handleCloseDeleteSuccessPopup = useCallback(() => {
    setShowDeleteSuccessPopup(false);
  }, []);

  return (
    <div className="space-y-6 bg-gray-50 min-h-screen p-6">
      {/* Header Section */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">FAQ Management</h1>
          <p className="text-gray-600">Manage frequently asked questions for your users</p>
        </div>
      </div>

      {/* Main Content Container */}
      <div className="bg-white rounded-xl shadow-sm p-8">
        {/* FAQ Creation Section */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-6">FAQ Management System</h2>
          
          {/* Create FAQ Title Input */}
          <div className="mb-6">
            <label className="block text-lg font-medium text-gray-900 mb-3">
              {editingFaq ? 'Edit FAQ Title' : 'Create FAQ Title'}
            </label>
            <input
              type="text"
              value={faqTitle}
              onChange={handleTitleChange}
              placeholder="Enter FAQ title..."
              className="w-full max-w-lg px-4 py-3 border-2 border-gray-900 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors text-sm"
              aria-label="FAQ title input"
            />
          </div>

          {/* Create FAQ Detail Textarea */}
          <div className="mb-6">
            <label className="block text-lg font-medium text-gray-900 mb-3">
              {editingFaq ? 'Edit FAQ Detail' : 'Create FAQ Detail'}
            </label>
            <textarea
              value={faqDetail}
              onChange={handleDetailChange}
              placeholder="Enter detailed FAQ answer..."
              rows={4}
              className="w-full max-w-2xl px-4 py-3 border-2 border-gray-900 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors text-sm resize-vertical"
              aria-label="FAQ detail input"
            />
          </div>

          {/* Action Buttons */}
          <div className="flex items-center space-x-4">
            <button
              onClick={editingFaq ? handleUpdateFaq : handleCreateFaq}
              disabled={!isFormValid}
              className={`px-12 py-3 rounded-full font-medium text-white transition-all ${
                isFormValid 
                  ? 'bg-gray-900 hover:bg-gray-800 cursor-pointer' 
                  : 'bg-gray-400 cursor-not-allowed'
              }`}
              aria-label={editingFaq ? 'Update FAQ' : 'Create new FAQ'}
            >
              {editingFaq ? 'Update FAQ' : 'Create FAQ'}
            </button>
            
            {editingFaq && (
              <button
                onClick={handleCancelEdit}
                className="px-8 py-3 rounded-full font-medium text-gray-700 bg-gray-200 hover:bg-gray-300 transition-colors"
                aria-label="Cancel editing"
              >
                Cancel
              </button>
            )}
          </div>
        </div>

        {/* Divider */}
        <div className="border-b border-gray-200 mb-8"></div>

        {/* FAQ List Section */}
        <div>
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-xl font-bold text-gray-900">All FAQ</h3>
            
            {/* Search Input */}
            <div className="relative">
              <input
                type="text"
                value={searchTerm}
                onChange={handleSearchChange}
                placeholder="Search FAQs..."
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                aria-label="Search FAQs"
              />
              <Search className="h-4 w-4 text-gray-400 absolute left-3 top-3" />
            </div>
          </div>

          {/* FAQ Cards */}
          {filteredFaqs.length > 0 ? (
            <div className="space-y-6">
              {filteredFaqs.map((faq) => (
                <FaqCard 
                  key={faq.id}
                  faq={faq}
                  onEdit={handleEditFaq}
                  onDelete={handleDeleteFaq}
                  isExpanded={expandedFaqs.has(faq.id)}
                  onToggleExpand={toggleFaqExpansion}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <MessageSquare className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <p className="text-lg font-medium text-gray-600">
                {searchTerm ? 'No FAQs found matching your search' : 'No FAQ found'}
              </p>
              <p className="text-gray-500 mt-2">
                {searchTerm ? 'Try adjusting your search terms' : 'Create your first FAQ to get started'}
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Edit FAQ Modal */}
      {showEditModal && (
        <EditFaqModal
          faq={editingFaq}
          faqTitle={faqTitle}
          faqDetail={faqDetail}
          onTitleChange={handleTitleChange}
          onDetailChange={handleDetailChange}
          onSave={handleUpdateFaq}
          onCancel={handleCancelEdit}
          isFormValid={isFormValid}
        />
      )}

      {/* Success Popup */}
      {showSuccessPopup && (
        <SuccessPopup onClose={handleCloseSuccessPopup} />
      )}

      {/* Delete Confirmation Modal */}
      {showDeleteModal && (
        <DeleteConfirmationModal
          faq={faqToDelete}
          onConfirm={handleConfirmDelete}
          onCancel={handleCancelDelete}
        />
      )}

      {/* Delete Success Popup */}
      {showDeleteSuccessPopup && (
        <DeleteSuccessPopup onClose={handleCloseDeleteSuccessPopup} />
      )}
    </div>
  );
});

/**
 * Edit FAQ Modal Component - Modal for editing existing FAQs
 * Matches the Figma design exactly
 */
const EditFaqModal = React.memo(({ 
  faq, 
  faqTitle, 
  faqDetail, 
  onTitleChange, 
  onDetailChange, 
  onSave, 
  onCancel, 
  isFormValid 
}) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-[0px_4px_120px_2px_rgba(0,0,0,0.25)] w-full max-w-4xl max-h-[90vh] overflow-y-auto relative">
        {/* Modal Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-2xl font-normal text-black tracking-[-0.6px]">Edit faq</h2>
          <button
            onClick={onCancel}
            className="p-1 hover:bg-gray-100 rounded-lg transition-colors"
            aria-label="Close modal"
          >
            <X className="h-6 w-6 text-gray-600" />
          </button>
        </div>

        {/* Modal Content */}
        <div className="p-8 space-y-6">
          {/* Title Field */}
          <div>
            <label className="block text-2xl font-normal text-black tracking-[-0.6px] mb-4">
              title
            </label>
            <input
              type="text"
              value={faqTitle}
              onChange={onTitleChange}
              className="w-full px-4 py-3 border-2 border-black rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors text-sm font-semibold"
              placeholder="Enter FAQ title..."
              aria-label="FAQ title"
            />
          </div>

          {/* Detail Field */}
          <div>
            <label className="block text-2xl font-normal text-black tracking-[-0.6px] mb-4">
              sub title
            </label>
            <textarea
              value={faqDetail}
              onChange={onDetailChange}
              rows={4}
              className="w-full px-3 py-2 border-2 border-black rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors text-sm font-medium text-gray-600 resize-vertical"
              placeholder="Enter detailed FAQ answer..."
              aria-label="FAQ detail"
            />
          </div>

          {/* Action Buttons */}
          <div className="flex items-center justify-center space-x-4 pt-4">
            <button
              onClick={onSave}
              disabled={!isFormValid}
              className={`px-12 py-4 rounded-full font-medium text-white transition-all ${
                isFormValid 
                  ? 'bg-black hover:bg-gray-800 cursor-pointer' 
                  : 'bg-gray-400 cursor-not-allowed'
              }`}
              aria-label="Save FAQ changes"
            >
              save
            </button>
            
            <button
              onClick={onCancel}
              className="px-12 py-4 rounded-full font-medium text-black bg-white border border-gray-300 hover:bg-gray-50 transition-colors"
              aria-label="Cancel editing"
            >
              go back
            </button>
          </div>
        </div>
      </div>
    </div>
  );
});

/**
 * FAQ Card Component - Displays individual FAQ with expand/collapse functionality
 * Memoized for better performance, matches Figma design
 */
const FaqCard = React.memo(({ faq, onEdit, onDelete, isExpanded, onToggleExpand }) => {
  /**
   * Action handlers - memoized to prevent unnecessary re-renders
   */
  const handleEdit = useCallback(() => {
    onEdit(faq);
  }, [faq, onEdit]);

  const handleDelete = useCallback(() => {
    onDelete(faq.id);
  }, [faq.id, onDelete]);

  const handleToggleExpand = useCallback(() => {
    onToggleExpand(faq.id);
  }, [faq.id, onToggleExpand]);

  return (
    <div className="border-b border-gray-200 pb-6">
      {/* FAQ Header - Title and Expand Button */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center flex-1">
          {/* FAQ Title */}
          <h4 className="text-sm font-semibold text-black leading-tight pr-4 flex-1">
            {faq.title}
          </h4>
          
          {/* Expand/Collapse Button */}
          <button
            onClick={handleToggleExpand}
            className="flex-shrink-0 p-2 hover:bg-gray-50 rounded-lg transition-colors"
            aria-label={isExpanded ? 'Collapse FAQ' : 'Expand FAQ'}
          >
            {isExpanded ? (
              <Minus className="h-4 w-4 text-gray-600" />
            ) : (
              <Plus className="h-4 w-4 text-gray-600" />
            )}
          </button>
        </div>

        {/* Action Buttons - Edit and Delete */}
        <div className="flex items-center space-x-2 ml-4">
          <button
            onClick={handleEdit}
            className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
            aria-label="Edit FAQ"
          >
            <Edit className="h-4 w-4" />
          </button>
          
          <button
            onClick={handleDelete}
            className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
            aria-label="Delete FAQ"
          >
            <Trash2 className="h-4 w-4" />
          </button>
        </div>
      </div>

      {/* FAQ Content - Expandable Detail */}
      {isExpanded && (
        <div className="pl-5 pr-12 mt-4">
          <p className="text-sm font-medium text-gray-600 leading-relaxed">
            {faq.detail}
          </p>
          
          {/* Metadata */}
          <div className="flex items-center space-x-4 text-xs text-gray-400 mt-4">
            <span>Created: {new Date(faq.createdAt).toLocaleDateString()}</span>
            <span className={`px-2 py-1 rounded-full ${
              faq.isActive 
                ? 'bg-green-100 text-green-800' 
                : 'bg-red-100 text-red-800'
            }`}>
              {faq.isActive ? 'Active' : 'Inactive'}
            </span>
          </div>
        </div>
      )}
    </div>
  );
});

/**
 * Success Popup Component - Shows "FAQ updated!" notification
 * Matches the Figma design exactly
 */
const SuccessPopup = React.memo(({ onClose }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-[0px_4px_120px_2px_rgba(0,0,0,0.25)] w-full max-w-md relative p-8">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1 hover:bg-gray-100 rounded-lg transition-colors"
          aria-label="Close popup"
        >
          <X className="h-6 w-6 text-gray-600" />
        </button>

        {/* Success Message */}
        <div className="text-center mb-8 mt-4">
          <h2 className="text-lg font-bold text-black tracking-[-0.41px] leading-[22px]">
            Faq updated!
          </h2>
        </div>

        {/* Done Button */}
        <div className="flex justify-center">
          <button
            onClick={onClose}
            className="bg-black text-white font-semibold text-base px-12 py-3 rounded-full hover:bg-gray-800 transition-colors"
            aria-label="Close success popup"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
});

/**
 * Delete Confirmation Modal Component - Asks for confirmation before deleting FAQ
 */
const DeleteConfirmationModal = React.memo(({ faq, onConfirm, onCancel }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-[0px_4px_120px_2px_rgba(0,0,0,0.25)] w-full max-w-md relative p-8">
        {/* Close Button */}
        <button
          onClick={onCancel}
          className="absolute top-4 right-4 p-1 hover:bg-gray-100 rounded-lg transition-colors"
          aria-label="Close modal"
        >
          <X className="h-6 w-6 text-gray-600" />
        </button>

        {/* Confirmation Message */}
        <div className="text-center mb-8 mt-4">
          <h2 className="text-lg font-bold text-black tracking-[-0.41px] leading-[22px] mb-4">
            Delete FAQ?
          </h2>
          <p className="text-sm text-gray-600 mb-2">
            Are you sure you want to delete this FAQ?
          </p>
          {faq && (
            <p className="text-sm font-medium text-gray-800 bg-gray-50 p-3 rounded-lg">
              "{faq.title}"
            </p>
          )}
        </div>

        {/* Action Buttons */}
        <div className="flex justify-center space-x-4">
          <button
            onClick={onConfirm}
            className="bg-red-600 text-white font-semibold text-sm px-8 py-3 rounded-full hover:bg-red-700 transition-colors"
            aria-label="Confirm delete"
          >
            Delete
          </button>
          <button
            onClick={onCancel}
            className="bg-gray-200 text-gray-800 font-semibold text-sm px-8 py-3 rounded-full hover:bg-gray-300 transition-colors"
            aria-label="Cancel delete"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
});

/**
 * Delete Success Popup Component - Shows "FAQ Deleted!" notification
 * Matches the Figma design exactly
 */
const DeleteSuccessPopup = React.memo(({ onClose }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-[0px_4px_120px_2px_rgba(0,0,0,0.25)] w-full max-w-md relative p-8">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1 hover:bg-gray-100 rounded-lg transition-colors"
          aria-label="Close popup"
        >
          <X className="h-6 w-6 text-gray-600" />
        </button>

        {/* Success Message */}
        <div className="text-center mb-8 mt-4">
          <h2 className="text-lg font-bold text-black tracking-[-0.41px] leading-[22px]">
            Faq Deleted!
          </h2>
        </div>

        {/* Done Button */}
        <div className="flex justify-center">
          <button
            onClick={onClose}
            className="bg-black text-white font-semibold text-base px-12 py-3 rounded-full hover:bg-gray-800 transition-colors"
            aria-label="Close success popup"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
});

// Set display names for debugging
FaqManagement.displayName = 'FaqManagement';
FaqCard.displayName = 'FaqCard';
SuccessPopup.displayName = 'SuccessPopup';
DeleteConfirmationModal.displayName = 'DeleteConfirmationModal';
DeleteSuccessPopup.displayName = 'DeleteSuccessPopup';

export default FaqManagement;
