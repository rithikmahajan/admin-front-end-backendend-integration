import React, { useState, useMemo, useCallback, useEffect } from 'react';
import { Search, Edit2, Trash2, ChevronDown, Plus, X, Filter } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const ManageItems = React.memo(() => {
  const navigate = useNavigate();
  
  // State management
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All categories');
  const [selectedSubCategory, setSelectedSubCategory] = useState('All subcategories');
  const [statusFilter, setStatusFilter] = useState('all'); // 'all', 'draft', 'live', 'scheduled'
  const [showDraftsOnly, setShowDraftsOnly] = useState(false);
  const [showLiveOnly, setShowLiveOnly] = useState(false);
  const [showScheduledOnly, setShowScheduledOnly] = useState(false);
  const [draftItems, setDraftItems] = useState([]);
  const [publishedItems, setPublishedItems] = useState([]);
  
  // Filter dropdown state
  const [isFilterDropdownOpen, setIsFilterDropdownOpen] = useState(false);
  
  // Modal state management
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [newDetails, setNewDetails] = useState('');
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);
  const [isMetaDataModalOpen, setIsMetaDataModalOpen] = useState(false);
  const [isMetaDataSuccessModalOpen, setIsMetaDataSuccessModalOpen] = useState(false);
  const [isDeleteConfirmModalOpen, setIsDeleteConfirmModalOpen] = useState(false);
  const [isDeleteSuccessModalOpen, setIsDeleteSuccessModalOpen] = useState(false);
  const [itemToDelete, setItemToDelete] = useState(null);
  const [selectedItemForMeta, setSelectedItemForMeta] = useState(null);
  const [metaFormData, setMetaFormData] = useState({
    metaTitle: '',
    metaDescription: '',
    slugUrl: ''
  });
  
  // Draft management state
  const [isScheduleModalOpen, setIsScheduleModalOpen] = useState(false);
  const [itemToSchedule, setItemToSchedule] = useState(null);
  const [scheduleDate, setScheduleDate] = useState('');
  const [scheduleTime, setScheduleTime] = useState('');
  const [isScheduleSuccessModalOpen, setIsScheduleSuccessModalOpen] = useState(false);
  const [isMakeLiveConfirmModalOpen, setIsMakeLiveConfirmModalOpen] = useState(false);
  const [itemToMakeLive, setItemToMakeLive] = useState(null);
  const [isMakeLiveSuccessModalOpen, setIsMakeLiveSuccessModalOpen] = useState(false);
  
  // Cancel schedule modal state
  const [isCancelScheduleConfirmModalOpen, setIsCancelScheduleConfirmModalOpen] = useState(false);
  const [itemToCancelSchedule, setItemToCancelSchedule] = useState(null);
  const [isCancelScheduleSuccessModalOpen, setIsCancelScheduleSuccessModalOpen] = useState(false);

  // Sample items data - converted to state for better management
  const [sampleItems, setSampleItems] = useState([
    {
      id: 1,
      image: '/api/placeholder/120/116',
      productName: 'Insomniac T shirt',
      category: 'men',
      subCategories: 'T shirt',
      hsn: '44000000',
      size: ['small', 'medium', 'large'],
      quantity: 5,
      price: 4566,
      salePrice: 4566,
      platforms: {
        myntra: { enabled: true, price: 4566 },
        amazon: { enabled: true, price: 4566 },
        flipkart: { enabled: true, price: 4566 },
        nykaa: { enabled: true, price: 4566 }
      },
      skus: {
        'small': 'blk/s/inso123',
        'medium': 'blk/m/inso123', 
        'large': 'blk/l/inso123'
      },
      barcodeNo: '44000000000000',
      status: 'draft',
      metaTitle: 'tshirt white',
      metaDescription: 'tshirt white trending',
      slugUrl: 'tu.beee/hhhhhh/hahahha.com',
      moveToSale: false,
      keepCopyAndMove: false,
      moveToEyx: false
    },
    {
      id: 2,
      image: '/api/placeholder/120/116',
      productName: 'Insomniac T shirt',
      category: 'men',
      subCategories: 'T shirt',
      hsn: '44000000',
      size: ['small', 'medium', 'large'],
      quantity: 10,
      price: 4566,
      salePrice: 4566,
      platforms: {
        myntra: { enabled: true, price: 4566 },
        amazon: { enabled: true, price: 4566 },
        flipkart: { enabled: true, price: 4566 },
        nykaa: { enabled: true, price: 4566 }
      },
      skus: {
        'small': 'blk/s/inso124',
        'medium': 'blk/m/inso124', 
        'large': 'blk/l/inso124'
      },
      barcodeNo: '44000000000000',
      status: 'live',
      metaTitle: 'tshirt white',
      metaDescription: 'tshirt white trending',
      slugUrl: 'tu.beee/hhhhhh/hahahha.com',
      moveToSale: false,
      keepCopyAndMove: false,
      moveToEyx: false
    },
    {
      id: 3,
      image: '/api/placeholder/120/116',
      productName: 'Insomniac T shirt',
      category: 'men',
      subCategories: 'T shirt',
      hsn: '44000000',
      size: ['small', 'medium', 'large'],
      quantity: 8,
      price: 4566,
      salePrice: 4566,
      platforms: {
        myntra: { enabled: false, price: 4566 },
        amazon: { enabled: true, price: 4566 },
        flipkart: { enabled: false, price: 4566 },
        nykaa: { enabled: true, price: 4566 }
      },
      skus: {
        'small': 'blk/s/inso125',
        'medium': 'blk/m/inso125', 
        'large': 'blk/l/inso125'
      },
      barcodeNo: '44000000000000',
      status: 'scheduled',
      scheduledDate: '2025-08-15',
      scheduledTime: '14:30',
      metaTitle: 'tshirt white',
      metaDescription: 'tshirt white trending',
      slugUrl: 'tu.beee/hhhhhh/hahahha.com',
      moveToSale: false,
      keepCopyAndMove: false,
      moveToEyx: false
    }
  ]);

  // Load draft and published items from localStorage on component mount
  useEffect(() => {
    const savedDrafts = localStorage.getItem('yoraa_draft_items');
    if (savedDrafts) {
      try {
        const parsedDrafts = JSON.parse(savedDrafts);
        setDraftItems(parsedDrafts);
      } catch (error) {
        console.error('Error loading draft items:', error);
      }
    }

    const savedPublished = localStorage.getItem('yoraa_published_items');
    if (savedPublished) {
      try {
        const parsedPublished = JSON.parse(savedPublished);
        setPublishedItems(parsedPublished);
      } catch (error) {
        console.error('Error loading published items:', error);
      }
    }
  }, []);

  // Draft management handlers
  const handleViewAllDrafts = useCallback(() => {
    const newStatus = statusFilter === 'draft' ? 'all' : 'draft';
    setStatusFilter(newStatus);
    setShowDraftsOnly(newStatus === 'draft');
    setShowLiveOnly(false);
    setShowScheduledOnly(false);
  }, [statusFilter]);

  const handleViewAllLive = useCallback(() => {
    const newStatus = statusFilter === 'live' ? 'all' : 'live';
    setStatusFilter(newStatus);
    setShowLiveOnly(newStatus === 'live');
    setShowDraftsOnly(false);
    setShowScheduledOnly(false);
  }, [statusFilter]);

  const handleViewAllScheduled = useCallback(() => {
    const newStatus = statusFilter === 'scheduled' ? 'all' : 'scheduled';
    setStatusFilter(newStatus);
    setShowScheduledOnly(newStatus === 'scheduled');
    setShowDraftsOnly(false);
    setShowLiveOnly(false);
  }, [statusFilter]);

  // Filter dropdown handlers
  const toggleFilterDropdown = useCallback(() => {
    setIsFilterDropdownOpen(prev => !prev);
  }, []);

  const handleFilterOption = useCallback((filterType) => {
    switch (filterType) {
      case 'all_drafts':
        handleViewAllDrafts();
        break;
      case 'all_live':
        handleViewAllLive();
        break;
      case 'all_scheduled':
        handleViewAllScheduled();
        break;
      case 'clear_filters':
        setStatusFilter('all');
        setShowDraftsOnly(false);
        setShowLiveOnly(false);
        setShowScheduledOnly(false);
        break;
      default:
        break;
    }
    setIsFilterDropdownOpen(false);
  }, [handleViewAllDrafts, handleViewAllLive, handleViewAllScheduled]);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (isFilterDropdownOpen && !event.target.closest('.filter-dropdown')) {
        setIsFilterDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isFilterDropdownOpen]);

  // Keyboard shortcuts for filter buttons
  useEffect(() => {
    const handleKeyDown = (event) => {
      // Only trigger if not typing in an input field
      if (event.target.tagName === 'INPUT' || event.target.tagName === 'TEXTAREA') {
        return;
      }

      if (event.altKey) {
        switch (event.key) {
          case 'd':
          case 'D':
            event.preventDefault();
            handleViewAllDrafts();
            break;
          case 'l':
          case 'L':
            event.preventDefault();
            handleViewAllLive();
            break;
          case 's':
          case 'S':
            event.preventDefault();
            handleViewAllScheduled();
            break;
          case 'c':
          case 'C':
            event.preventDefault();
            setStatusFilter('all');
            setShowDraftsOnly(false);
            setShowLiveOnly(false);
            setShowScheduledOnly(false);
            break;
        }
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [handleViewAllDrafts, handleViewAllLive, handleViewAllScheduled]);

  // Combined items (sample + drafts + published)
  const allItems = useMemo(() => {
    return [...sampleItems, ...draftItems, ...publishedItems];
  }, [sampleItems, draftItems, publishedItems]);

  const categoryOptions = [
    'All categories',
    'men',
    'women',
    'T shirt',
    'Clothing',
    'Accessories'
  ];

  const subCategoryOptions = [
    'All subcategories',
    'T shirt',
    'Casual wear',
    'Formal wear'
  ];

  // Filtered items
  const filteredItems = useMemo(() => {
    return allItems.filter(item => {
      const matchesSearch = item.productName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           item.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           item.subCategories.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesCategory = selectedCategory === 'All categories' || 
                             item.category === selectedCategory;
      
      const matchesSubCategory = selectedSubCategory === 'All subcategories' || 
                                item.subCategories === selectedSubCategory;
      
      // Status filtering - only apply one filter at a time
      let matchesStatusFilter = true;
      if (showDraftsOnly) {
        matchesStatusFilter = item.status === 'draft';
      } else if (showLiveOnly) {
        matchesStatusFilter = item.status === 'live';
      } else if (showScheduledOnly) {
        matchesStatusFilter = item.status === 'scheduled';
      }
      
      return matchesSearch && matchesCategory && matchesSubCategory && matchesStatusFilter;
    });
  }, [allItems, searchTerm, selectedCategory, selectedSubCategory, showDraftsOnly, showLiveOnly, showScheduledOnly]);

  // Handlers
  const handleBulkUpload = useCallback(() => {
    console.log('Bulk upload');
  }, []);

  const handleUploadSingleProduct = useCallback(() => {
    navigate('/single-product-upload');
  }, [navigate]);

  const handleEdit = useCallback((itemId) => {
    const itemToEdit = allItems.find(item => item.id === itemId);
    setEditingItem(itemToEdit);
    setNewDetails('');
    setIsEditModalOpen(true);
  }, [allItems]);

  const handleSaveEdit = useCallback(() => {
    console.log('Saving edit for item:', editingItem.id, 'New details:', newDetails);
    setIsEditModalOpen(false);
    setEditingItem(null);
    setNewDetails('');
    setIsSuccessModalOpen(true);
  }, [editingItem, newDetails]);

  const handleCloseEdit = useCallback(() => {
    setIsEditModalOpen(false);
    setEditingItem(null);
    setNewDetails('');
  }, []);

  const handleCloseSuccess = useCallback(() => {
    setIsSuccessModalOpen(false);
  }, []);

  const handleDelete = useCallback((itemId) => {
    const itemToDeleteObj = allItems.find(item => item.id === itemId);
    setItemToDelete(itemToDeleteObj);
    setIsDeleteConfirmModalOpen(true);
  }, [allItems]);

  const handleConfirmDelete = useCallback(() => {
    console.log('Deleting item:', itemToDelete.id);
    
    // Check if it's a draft or published item and remove from appropriate localStorage
    if (itemToDelete.status === 'draft') {
      const updatedDrafts = draftItems.filter(item => item.id !== itemToDelete.id);
      setDraftItems(updatedDrafts);
      localStorage.setItem('yoraa_draft_items', JSON.stringify(updatedDrafts));
    } else if (itemToDelete.status === 'live') {
      const updatedPublished = publishedItems.filter(item => item.id !== itemToDelete.id);
      setPublishedItems(updatedPublished);
      localStorage.setItem('yoraa_published_items', JSON.stringify(updatedPublished));
    }
    
    setIsDeleteConfirmModalOpen(false);
    setItemToDelete(null);
    setIsDeleteSuccessModalOpen(true);
  }, [itemToDelete, draftItems, publishedItems]);

  const handleCancelDelete = useCallback(() => {
    setIsDeleteConfirmModalOpen(false);
    setItemToDelete(null);
  }, []);

  const handleCloseDeleteSuccess = useCallback(() => {
    setIsDeleteSuccessModalOpen(false);
  }, []);

  const getSizeDisplay = useCallback((sizes) => {
    return sizes.join(', ');
  }, []);

  const getSkuDisplay = useCallback((skus, sizes) => {
    return sizes.map(size => skus[size]).join(', ');
  }, []);

  const getStatusStyle = useCallback((status) => {
    const styles = {
      'live': 'text-[#00b69b]',
      'draft': 'text-[#ef3826]',
      'scheduled': 'text-[#ffd56d]'
    };
    return styles[status.toLowerCase()] || styles.draft;
  }, []);

  const formatScheduledDateTime = useCallback((date, time) => {
    if (!date || !time) return '';
    
    // Parse the date and format it
    const dateObj = new Date(date);
    const formattedDate = dateObj.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
    
    // Format the time (assuming it's in HH:MM format)
    const [hours, minutes] = time.split(':');
    const timeObj = new Date();
    timeObj.setHours(parseInt(hours), parseInt(minutes));
    const formattedTime = timeObj.toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true
    });
    
    return `${formattedDate} at ${formattedTime}`;
  }, []);

  const handleViewMetaData = useCallback((item) => {
    setSelectedItemForMeta(item);
    setMetaFormData({
      metaTitle: item.metaTitle || '',
      metaDescription: item.metaDescription || '',
      slugUrl: item.slugUrl || ''
    });
    setIsMetaDataModalOpen(true);
  }, []);

  const handleCloseMetaData = useCallback(() => {
    setIsMetaDataModalOpen(false);
    setSelectedItemForMeta(null);
    setMetaFormData({
      metaTitle: '',
      metaDescription: '',
      slugUrl: ''
    });
  }, []);

  const handleSaveMetaData = useCallback(() => {
    console.log('Saving meta data for item:', selectedItemForMeta.id, 'Data:', metaFormData);
    // In a real app, you would update the item in your state management system
    setIsMetaDataModalOpen(false);
    setSelectedItemForMeta(null);
    setMetaFormData({
      metaTitle: '',
      metaDescription: '',
      slugUrl: ''
    });
    setIsMetaDataSuccessModalOpen(true);
  }, [selectedItemForMeta, metaFormData]);

  const handleCloseMetaDataSuccess = useCallback(() => {
    setIsMetaDataSuccessModalOpen(false);
  }, []);

  const handleMetaInputChange = useCallback((field, value) => {
    setMetaFormData(prev => ({
      ...prev,
      [field]: value
    }));
  }, []);

  const handleItemAction = useCallback((itemId, action, value) => {
    console.log(`${action} for item ${itemId}:`, value);
    
    // Check if it's a sample item (ids 1, 2, 3)
    const sampleItemIndex = sampleItems.findIndex(item => item.id === itemId);
    if (sampleItemIndex !== -1) {
      const updatedSampleItems = [...sampleItems];
      updatedSampleItems[sampleItemIndex] = { 
        ...updatedSampleItems[sampleItemIndex], 
        [action]: value 
      };
      setSampleItems(updatedSampleItems);
      return;
    }
    
    // Update draft items
    const draftItemIndex = draftItems.findIndex(item => item.id === itemId);
    if (draftItemIndex !== -1) {
      const updatedDrafts = [...draftItems];
      updatedDrafts[draftItemIndex] = { 
        ...updatedDrafts[draftItemIndex], 
        [action]: value 
      };
      setDraftItems(updatedDrafts);
      localStorage.setItem('yoraa_draft_items', JSON.stringify(updatedDrafts));
      return;
    }
    
    // Update published items
    const publishedItemIndex = publishedItems.findIndex(item => item.id === itemId);
    if (publishedItemIndex !== -1) {
      const updatedPublished = [...publishedItems];
      updatedPublished[publishedItemIndex] = { 
        ...updatedPublished[publishedItemIndex], 
        [action]: value 
      };
      setPublishedItems(updatedPublished);
      localStorage.setItem('yoraa_published_items', JSON.stringify(updatedPublished));
      return;
    }
    
    console.log('Item not found in any collection');
  }, [sampleItems, draftItems, publishedItems]);

  const handleMakeLive = useCallback((item) => {
    setItemToMakeLive(item);
    setIsMakeLiveConfirmModalOpen(true);
  }, []);

  const handleConfirmMakeLive = useCallback(() => {
    if (itemToMakeLive) {
      // Move item from drafts to published items
      const updatedItem = { 
        ...itemToMakeLive, 
        status: 'live',
        publishedAt: new Date().toISOString(),
        id: `pub_${Date.now()}` // Give it a new published ID
      };
      
      // Remove from drafts
      const updatedDrafts = draftItems.filter(item => item.id !== itemToMakeLive.id);
      setDraftItems(updatedDrafts);
      localStorage.setItem('yoraa_draft_items', JSON.stringify(updatedDrafts));
      
      // Add to published items
      const updatedPublished = [...publishedItems, updatedItem];
      setPublishedItems(updatedPublished);
      localStorage.setItem('yoraa_published_items', JSON.stringify(updatedPublished));
      
      console.log('Making item live:', itemToMakeLive.id);
    }
    setIsMakeLiveConfirmModalOpen(false);
    setItemToMakeLive(null);
    setIsMakeLiveSuccessModalOpen(true);
  }, [itemToMakeLive, draftItems, publishedItems]);

  const handleCancelMakeLive = useCallback(() => {
    setIsMakeLiveConfirmModalOpen(false);
    setItemToMakeLive(null);
  }, []);

  const handleCloseMakeLiveSuccess = useCallback(() => {
    setIsMakeLiveSuccessModalOpen(false);
  }, []);

  const handleScheduleItem = useCallback((item) => {
    setItemToSchedule(item);
    setScheduleDate('');
    setScheduleTime('');
    setIsScheduleModalOpen(true);
  }, []);

  const handleConfirmSchedule = useCallback(() => {
    if (itemToSchedule && scheduleDate && scheduleTime) {
      // Update item status to scheduled
      const updatedDrafts = draftItems.map(item => 
        item.id === itemToSchedule.id 
          ? { 
              ...item, 
              status: 'scheduled',
              scheduledDate: scheduleDate,
              scheduledTime: scheduleTime
            } 
          : item
      );
      setDraftItems(updatedDrafts);
      localStorage.setItem('yoraa_draft_items', JSON.stringify(updatedDrafts));
      
      console.log('Scheduling item:', itemToSchedule.id, 'for', scheduleDate, 'at', scheduleTime);
    }
    setIsScheduleModalOpen(false);
    setItemToSchedule(null);
    setScheduleDate('');
    setScheduleTime('');
    setIsScheduleSuccessModalOpen(true);
  }, [itemToSchedule, scheduleDate, scheduleTime, draftItems]);

  const handleCancelSchedule = useCallback(() => {
    setIsScheduleModalOpen(false);
    setItemToSchedule(null);
    setScheduleDate('');
    setScheduleTime('');
  }, []);

  const handleCloseScheduleSuccess = useCallback(() => {
    setIsScheduleSuccessModalOpen(false);
  }, []);

  // Cancel schedule handlers
  const handleCancelScheduleItem = useCallback((item) => {
    setItemToCancelSchedule(item);
    setIsCancelScheduleConfirmModalOpen(true);
  }, []);

  const handleConfirmCancelSchedule = useCallback(() => {
    if (itemToCancelSchedule) {
      // Update item status back to draft and remove schedule data
      const updatedDrafts = draftItems.map(item => 
        item.id === itemToCancelSchedule.id 
          ? { 
              ...item, 
              status: 'draft',
              scheduledDate: undefined,
              scheduledTime: undefined
            } 
          : item
      );
      setDraftItems(updatedDrafts);
      localStorage.setItem('yoraa_draft_items', JSON.stringify(updatedDrafts));
      
      console.log('Cancelling schedule for item:', itemToCancelSchedule.id);
    }
    setIsCancelScheduleConfirmModalOpen(false);
    setItemToCancelSchedule(null);
    setIsCancelScheduleSuccessModalOpen(true);
  }, [itemToCancelSchedule, draftItems]);

  const handleCancelCancelSchedule = useCallback(() => {
    setIsCancelScheduleConfirmModalOpen(false);
    setItemToCancelSchedule(null);
  }, []);

  const handleCloseCancelScheduleSuccess = useCallback(() => {
    setIsCancelScheduleSuccessModalOpen(false);
  }, []);

  return (
    <div className="bg-white min-h-full">
      {/* Main Content Container */}
      <div className="w-full bg-white">
        
        {/* Header Section */}
        <div className="px-6 py-6 border-b border-gray-200">
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4 mb-6">
            <h1 className="text-[24px] font-bold text-[#111111] font-['Montserrat']">Manage Items</h1>
            <div className="flex flex-col sm:flex-row gap-3">
              <button 
                onClick={handleBulkUpload}
                className="flex items-center gap-2 bg-[#000aff] hover:bg-blue-700 text-white font-['Montserrat'] font-normal py-2.5 px-4 rounded-lg transition-colors shadow-[0px_1px_2px_0px_rgba(16,24,40,0.05)] border border-[#7280ff] text-[14px]"
              >
                <Plus className="h-5 w-5" />
                <span className="leading-[20px]">Bulk Upload</span>
              </button>
              <button 
                onClick={handleUploadSingleProduct}
                className="flex items-center gap-2 bg-[#000aff] hover:bg-blue-700 text-white font-['Montserrat'] font-normal py-2.5 px-4 rounded-lg transition-colors shadow-[0px_1px_2px_0px_rgba(16,24,40,0.05)] border border-[#7280ff] text-[14px]"
              >
                <Plus className="h-5 w-5" />
                <span className="leading-[20px]">Upload single product</span>
              </button>
            </div>
          </div>
          
          {/* Search and Filter Controls */}
          <div className="flex flex-col xl:flex-row gap-4 items-start xl:items-center">
            
            {/* Search Bar */}
            <div className="relative flex-1 max-w-sm">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-[#667085]" />
              </div>
              <input
                type="text"
                placeholder="Search"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="block w-full pl-10 pr-3 py-2.5 border border-[#d0d5dd] rounded-lg bg-white placeholder-[#667085] focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 shadow-[0px_1px_2px_0px_rgba(16,24,40,0.05)] font-['Montserrat'] text-[16px] leading-[24px]"
              />
            </div>

            {/* Filter Dropdowns */}
            <div className="flex flex-wrap gap-4">
              {/* Category Dropdown */}
              <div className="relative">
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="appearance-none bg-white border-2 border-black rounded-xl px-4 py-3 pr-8 text-black focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 min-w-[153px] h-[47px] font-['Montserrat'] text-[14px] text-center leading-[16px]"
                >
                  {categoryOptions.map((option, index) => (
                    <option key={index} value={option}>{option}</option>
                  ))}
                </select>
                <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                  <ChevronDown className="h-4 w-4 text-black" />
                </div>
              </div>

              {/* Sub Category Dropdown */}
              <div className="relative">
                <select
                  value={selectedSubCategory}
                  onChange={(e) => setSelectedSubCategory(e.target.value)}
                  className="appearance-none bg-white border-2 border-black rounded-xl px-4 py-3 pr-8 text-black focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 min-w-[153px] h-[47px] font-['Montserrat'] text-[14px] text-center leading-[16px]"
                >
                  {subCategoryOptions.map((option, index) => (
                    <option key={index} value={option}>{option}</option>
                  ))}
                </select>
                <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                  <ChevronDown className="h-4 w-4 text-black" />
                </div>
              </div>

              {/* Items Dropdown */}
              <div className="relative">
                <select
                  className="appearance-none bg-white border-2 border-black rounded-xl px-4 py-3 pr-8 text-black focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 min-w-[153px] h-[47px] font-['Montserrat'] text-[14px] text-center leading-[16px]"
                >
                  <option>Items</option>
                </select>
                <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                  <ChevronDown className="h-4 w-4 text-black" />
                </div>
              </div>

              {/* Filters Button with Dropdown */}
              <div className="relative filter-dropdown">
                <button 
                  onClick={toggleFilterDropdown}
                  className="flex items-center gap-2 bg-white border border-[#d0d5dd] rounded-lg px-4 py-2.5 text-[#344054] focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 h-[40px] font-['Montserrat'] text-[14px] shadow-[0px_1px_2px_0px_rgba(16,24,40,0.05)]"
                >
                  <Filter className="h-5 w-5" />
                  <span className="leading-[20px]">Filters</span>
                </button>

                {/* Dropdown Menu */}
                {isFilterDropdownOpen && (
                  <div className="absolute right-0 top-full mt-1 w-[274px] bg-white rounded-xl shadow-[0px_4px_120px_2px_rgba(0,0,0,0.25)] z-50 overflow-hidden">
                    {/* Choose sort by header */}
                    <div className="px-[27px] py-3 border-b border-gray-200">
                      <p className="text-[14px] font-medium text-[#bfbfbf] font-['Montserrat']">choose sort by</p>
                    </div>
                    
                    {/* Filter Options */}
                    <div className="py-2">
                      <button
                        onClick={() => handleFilterOption('all_live')}
                        className={`w-full px-8 py-2 text-left hover:bg-gray-50 transition-colors ${
                          statusFilter === 'live' ? 'bg-blue-50 text-blue-600' : 'text-[#000000]'
                        }`}
                      >
                        <span className="text-[15px] font-medium font-['Montserrat'] tracking-[-0.375px]">View all live</span>
                      </button>
                      
                      <button
                        onClick={() => handleFilterOption('all_scheduled')}
                        className={`w-full px-8 py-2 text-left hover:bg-gray-50 transition-colors ${
                          statusFilter === 'scheduled' ? 'bg-blue-50 text-blue-600' : 'text-[#010101]'
                        }`}
                      >
                        <span className="text-[14px] font-medium font-['Montserrat']">View all scheduled</span>
                      </button>
                      
                      <button
                        onClick={() => handleFilterOption('all_drafts')}
                        className={`w-full px-8 py-2 text-left hover:bg-gray-50 transition-colors ${
                          statusFilter === 'draft' ? 'bg-blue-50 text-blue-600' : 'text-[#010101]'
                        }`}
                      >
                        <span className="text-[14px] font-medium font-['Montserrat']">View all drafts</span>
                      </button>
                      
                      <div className="border-t border-gray-200 mt-2 pt-2">
                        <button
                          onClick={() => handleFilterOption('clear_filters')}
                          className="w-full px-8 py-2 text-left hover:bg-gray-50 transition-colors text-[#010101]"
                        >
                          <span className="text-[14px] font-medium font-['Montserrat']">Clear all filters</span>
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Table Section */}
        <div className="px-6 py-6">
          
          {/* Filter Summary */}
          <div className="mb-4 p-4 bg-gray-50 rounded-lg">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-4">
                <span className="text-[18px] font-bold text-[#111111] font-['Montserrat']">
                  Showing {filteredItems.length} items
                </span>
                {(showDraftsOnly || showLiveOnly || showScheduledOnly) && (
                  <div className="flex items-center gap-2">
                    <span className="text-[14px] text-[#666666] font-['Montserrat']">
                      Filtered by:
                    </span>
                    {showDraftsOnly && (
                      <span className="bg-[#ef3826] text-white text-[12px] font-medium font-['Montserrat'] px-2 py-1 rounded-full">
                        Draft Items
                      </span>
                    )}
                    {showLiveOnly && (
                      <span className="bg-[#22c55e] text-white text-[12px] font-medium font-['Montserrat'] px-2 py-1 rounded-full">
                        Live Items
                      </span>
                    )}
                    {showScheduledOnly && (
                      <span className="bg-[#eab308] text-white text-[12px] font-medium font-['Montserrat'] px-2 py-1 rounded-full">
                        Scheduled Items
                      </span>
                    )}
                  </div>
                )}
              </div>
              {(showDraftsOnly || showLiveOnly || showScheduledOnly) && (
                <button
                  onClick={() => {
                    setStatusFilter('all');
                    setShowDraftsOnly(false);
                    setShowLiveOnly(false);
                    setShowScheduledOnly(false);
                  }}
                  className="bg-white hover:bg-gray-100 text-[14px] text-[#666666] hover:text-[#111111] font-['Montserrat'] px-3 py-1 rounded-md border transition-colors"
                  title="Alt + C to clear filters"
                >
                  Clear Filter
                </button>
              )}
            </div>
            
            {/* Summary Statistics */}
            <div className="flex items-center gap-6 text-[14px] font-['Montserrat']">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-[#ef3826] rounded-full"></div>
                <span className="text-[#666666]">
                  Drafts: <span className="font-medium text-[#111111]">{allItems.filter(item => item.status === 'draft').length}</span>
                </span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-[#22c55e] rounded-full"></div>
                <span className="text-[#666666]">
                  Live: <span className="font-medium text-[#111111]">{allItems.filter(item => item.status === 'live').length}</span>
                </span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-[#eab308] rounded-full"></div>
                <span className="text-[#666666]">
                  Scheduled: <span className="font-medium text-[#111111]">{allItems.filter(item => item.status === 'scheduled').length}</span>
                </span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-[#6b7280] rounded-full"></div>
                <span className="text-[#666666]">
                  Total: <span className="font-medium text-[#111111]">{allItems.length}</span>
                </span>
              </div>
            </div>
          </div>

          {/* Table Container */}
          <div className="bg-white border border-[#d5d5d5] rounded-lg overflow-x-auto">
            {/* Table Header */}
            <div className="bg-[#ffffff] border-b border-[#d5d5d5] overflow-x-auto">
              <div className="grid grid-cols-[120px_180px_100px_120px_80px_80px_80px_80px_80px_200px_120px_120px_80px_120px_120px] gap-1 p-3 text-[14px] font-medium text-black font-['Montserrat'] min-w-[1350px]">
                <div className="text-center">Image</div>
                <div className="text-center">Product Name</div>
                <div className="text-center">Category</div>
                <div className="text-center">Subcategory</div>
                <div className="text-center">Hsn</div>
                <div className="text-center">size</div>
                <div className="text-center">quantity</div>
                <div className="text-center">Price</div>
                <div className="text-center">sale price</div>
                <div className="text-center">Alternate Price</div>
                <div className="text-center">SKU</div>
                <div className="text-center">Barcode no.</div>
                <div className="text-center">status</div>
                <div className="text-center">meta data</div>
                <div className="text-center">Action</div>
              </div>
            </div>

            {/* Platform Headers Row */}
            <div className="bg-[#ffffff] border-b border-[#d5d5d5] overflow-x-auto">
              <div className="grid grid-cols-[120px_180px_100px_120px_80px_80px_80px_80px_80px_200px_120px_120px_80px_120px_120px] gap-1 p-3 min-w-[1350px]">
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div className="flex items-center justify-center gap-2 text-[10px] font-['Montserrat']">
                  <div className="flex flex-col items-center gap-1">
                    <span className="text-green-600">✓</span>
                    <span>myntra</span>
                  </div>
                  <div className="flex flex-col items-center gap-1">
                    <span className="text-green-600">✓</span>
                    <span>amazon</span>
                  </div>
                  <div className="flex flex-col items-center gap-1">
                    <span className="text-green-600">✓</span>
                    <span>flipkart</span>
                  </div>
                  <div className="flex flex-col items-center gap-1">
                    <span className="text-green-600">✓</span>
                    <span>nykaa</span>
                  </div>
                </div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
              </div>
            </div>

            {/* Table Rows */}
            <div className="divide-y divide-gray-100 overflow-x-auto">
              {filteredItems.map((item, index) => (
                <div key={item.id}>
                  <div className="grid grid-cols-[120px_180px_100px_120px_80px_80px_80px_80px_80px_200px_120px_120px_80px_120px_120px] gap-1 p-3 items-center hover:bg-gray-50 transition-colors min-w-[1350px]">
                    
                    {/* Product Image */}
                    <div className="flex justify-center">
                      <div className="w-[120px] h-[116px] bg-gray-200 rounded overflow-hidden">
                        <img
                          src={item.image}
                          alt={item.productName}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    </div>

                    {/* Product Name */}
                    <div className="text-[#111111] text-[14px] font-medium font-['Montserrat'] text-center px-2">
                      {item.productName}
                    </div>

                    {/* Category */}
                    <div className="text-[#111111] text-[14px] font-medium font-['Montserrat'] text-center">
                      {item.category}
                    </div>

                    {/* Sub Categories */}
                    <div className="text-[#111111] text-[14px] font-medium font-['Montserrat'] text-center">
                      {item.subCategories}
                    </div>

                    {/* HSN */}
                    <div className="text-[#010101] text-[12px] font-['Montserrat'] text-center">
                      {item.hsn}
                    </div>

                    {/* Size */}
                    <div className="flex flex-col gap-1 text-[12px] font-medium text-[#010101] font-['Montserrat'] text-center">
                      {item.size.map((size, idx) => (
                        <div key={idx}>{size}</div>
                      ))}
                    </div>

                    {/* Quantity */}
                    <div className="text-[#010101] text-[14px] font-medium font-['Montserrat'] text-center">
                      {item.quantity}
                    </div>

                    {/* Price */}
                    <div className="text-[#111111] text-[12px] font-medium font-['Montserrat'] text-center">
                      {item.price}
                    </div>

                    {/* Sale Price */}
                    <div className="text-[#111111] text-[12px] font-medium font-['Montserrat'] text-center">
                      {item.salePrice}
                    </div>

                    {/* Platform Prices (Alternate Price) */}
                    <div className="flex items-center justify-center">
                      <div className="grid grid-cols-4 gap-2 text-center text-[10px] font-medium font-['Montserrat']">
                        <div className="flex flex-col items-center">
                          <span className="text-[#111111]">
                            {item.platforms.myntra.enabled ? item.platforms.myntra.price : '-'}
                          </span>
                        </div>
                        <div className="flex flex-col items-center">
                          <span className="text-[#111111]">
                            {item.platforms.amazon.enabled ? item.platforms.amazon.price : '-'}
                          </span>
                        </div>
                        <div className="flex flex-col items-center">
                          <span className="text-[#111111]">
                            {item.platforms.flipkart.enabled ? item.platforms.flipkart.price : '-'}
                          </span>
                        </div>
                        <div className="flex flex-col items-center">
                          <span className="text-[#111111]">
                            {item.platforms.nykaa.enabled ? item.platforms.nykaa.price : '-'}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* SKU */}
                    <div className="text-[#111111] text-[12px] font-medium font-['Montserrat'] text-center">
                      <div className="flex flex-col gap-1">
                        {item.size.map((size, idx) => (
                          <div key={idx} className="text-[10px]">{item.skus[size]}</div>
                        ))}
                      </div>
                    </div>

                    {/* Barcode */}
                    <div className="text-[#111111] text-[12px] font-medium font-['Montserrat'] text-center">
                      {item.barcodeNo}
                    </div>

                    {/* Status */}
                    <div className="text-center">
                      <span className={`${getStatusStyle(item.status)} text-[14px] font-medium font-['Montserrat']`}>
                        {item.status}
                      </span>
                      {item.status === 'scheduled' && item.scheduledDate && item.scheduledTime && (
                        <div className="text-[10px] text-gray-600 mt-1 font-['Montserrat']">
                          {formatScheduledDateTime(item.scheduledDate, item.scheduledTime)}
                        </div>
                      )}
                    </div>

                    {/* Meta Data */}
                    <div className="text-center">
                      <button
                        onClick={() => handleViewMetaData(item)}
                        className="bg-black text-white text-[12px] font-medium font-['Montserrat'] px-3 py-1 rounded hover:bg-gray-800 transition-colors"
                      >
                        View Meta Data
                      </button>
                    </div>

                    {/* Action */}
                    <div className="flex justify-center gap-1">
                      {item.status === 'draft' ? (
                        // Draft item actions
                        <>
                          <button
                            onClick={() => handleMakeLive(item)}
                            className="px-2 py-1 bg-green-500 text-white text-xs font-medium rounded hover:bg-green-600 transition-colors"
                          >
                            Make Live
                          </button>
                          <button
                            onClick={() => handleScheduleItem(item)}
                            className="px-2 py-1 bg-blue-500 text-white text-xs font-medium rounded hover:bg-blue-600 transition-colors"
                          >
                            Schedule
                          </button>
                        </>
                      ) : item.status === 'scheduled' ? (
                        // Scheduled item actions
                        <>
                          <button
                            onClick={() => handleMakeLive(item)}
                            className="px-2 py-1 bg-green-500 text-white text-xs font-medium rounded hover:bg-green-600 transition-colors"
                          >
                            Make Live
                          </button>
                          <button
                            onClick={() => handleCancelScheduleItem(item)}
                            className="px-2 py-1 bg-red-500 text-white text-xs font-medium rounded hover:bg-red-600 transition-colors"
                          >
                            Cancel Schedule
                          </button>
                        </>
                      ) : (
                        // Regular item actions
                        <>
                          <button
                            onClick={() => handleEdit(item.id)}
                            className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded transition-colors"
                          >
                            <Edit2 className="h-4 w-4" />
                          </button>
                          <button
                            onClick={() => handleDelete(item.id)}
                            className="p-2 text-gray-500 hover:text-red-600 hover:bg-red-50 rounded transition-colors"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </>
                      )}
                    </div>
                  </div>

                  {/* Row-level Bulk Actions */}
                  <div className="px-3 py-2 bg-gray-50 text-[12px] font-['Montserrat'] min-w-[1350px]">
                    <div className="flex items-center gap-8">
                      <div className={`flex items-center gap-2 ${item.moveToSale ? 'bg-blue-50 p-2 rounded-md' : ''}`}>
                        <input 
                          type="checkbox" 
                          id={`move-to-sale-${item.id}`}
                          checked={item.moveToSale}
                          onChange={(e) => handleItemAction(item.id, 'moveToSale', e.target.checked)}
                          className="w-4 h-4 rounded-[3px] border-[#bcbcbc] text-blue-600 focus:ring-blue-500 focus:ring-2" 
                        />
                        <label htmlFor={`move-to-sale-${item.id}`} className={`${item.moveToSale ? 'text-blue-700 font-medium' : 'text-black'}`}>move to sale</label>
                      </div>
                      <div className={`flex items-center gap-2 ${item.keepCopyAndMove ? 'bg-green-50 p-2 rounded-md' : ''}`}>
                        <input 
                          type="checkbox" 
                          id={`keep-copy-${item.id}`}
                          checked={item.keepCopyAndMove}
                          onChange={(e) => handleItemAction(item.id, 'keepCopyAndMove', e.target.checked)}
                          className="w-4 h-4 rounded-[3px] border-[#bcbcbc] text-blue-600 focus:ring-blue-500 focus:ring-2" 
                        />
                        <label htmlFor={`keep-copy-${item.id}`} className={`${item.keepCopyAndMove ? 'text-green-700 font-medium' : 'text-black'}`}>make a copy and move to sale</label>
                      </div>
                      <div className={`flex items-center gap-2 ${item.moveToEyx ? 'bg-purple-50 p-2 rounded-md' : ''}`}>
                        <input 
                          type="checkbox" 
                          id={`move-to-eyx-${item.id}`}
                          checked={item.moveToEyx}
                          onChange={(e) => handleItemAction(item.id, 'moveToEyx', e.target.checked)}
                          className="w-4 h-4 rounded-[3px] border-[#bcbcbc] text-blue-600 focus:ring-blue-500 focus:ring-2" 
                        />
                        <label htmlFor={`move-to-eyx-${item.id}`} className={`${item.moveToEyx ? 'text-purple-700 font-medium' : 'text-black'}`}>move to eyx</label>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Empty State */}
            {filteredItems.length === 0 && (
              <div className="p-8 text-center text-gray-500">
                <p className="text-lg font-medium mb-2">No items found</p>
                <p className="text-sm">
                  {searchTerm || selectedCategory !== 'All categories' || selectedSubCategory !== 'All subcategories'
                    ? 'Try adjusting your search or filters'
                    : 'Start by uploading your first product'
                  }
                </p>
              </div>
            )}
          </div>
        </div>

      {/* Edit Item Modal */}
      {isEditModalOpen && editingItem && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-2xl max-w-7xl w-full mx-4 overflow-hidden max-h-screen overflow-y-auto">
            
            {/* Modal Header */}
            <div className="relative px-8 py-6 border-b border-gray-200">
              <h2 className="text-xl font-bold text-gray-900 font-['Montserrat'] text-center">Edit Item</h2>
              <button
                onClick={handleCloseEdit}
                className="absolute top-6 right-6 p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Modal Content */}
            <div className="p-8">
              
              {/* Header Section */}
              <div className="mb-8">
                <h3 className="text-lg font-bold text-gray-900 font-['Montserrat']">
                  Type new details
                </h3>
              </div>

              {/* Main Form Row */}
              <div className="mb-8">
                <div className="flex items-start gap-6">
                  
                  {/* Product Image */}
                  <div className="flex-shrink-0">
                    <div className="text-center mb-2">
                      <span className="text-sm font-medium text-gray-700 font-['Montserrat']">Image</span>
                    </div>
                    <div className="w-24 h-24 bg-gray-200 rounded-lg overflow-hidden border">
                      <img
                        src={editingItem.image}
                        alt={editingItem.productName}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>

                  {/* Product Name */}
                  <div className="flex-shrink-0 w-40">
                    <div className="text-center mb-2">
                      <span className="text-sm font-medium text-gray-700 font-['Montserrat']">Product Name</span>
                    </div>
                    <input
                      type="text"
                      defaultValue={editingItem.productName}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm font-['Montserrat'] focus:outline-none focus:ring-1 focus:ring-blue-500"
                    />
                  </div>

                  {/* Category */}
                  <div className="flex-shrink-0 w-24">
                    <div className="text-center mb-2">
                      <span className="text-sm font-medium text-gray-700 font-['Montserrat']">Category</span>
                    </div>
                    <input
                      type="text"
                      defaultValue={editingItem.category}
                      className="w-full px-2 py-2 border border-gray-300 rounded-md text-sm font-['Montserrat'] focus:outline-none focus:ring-1 focus:ring-blue-500"
                    />
                  </div>

                  {/* Sub Categories */}
                  <div className="flex-shrink-0 w-28">
                    <div className="text-center mb-2">
                      <span className="text-sm font-medium text-gray-700 font-['Montserrat']">sub categories</span>
                    </div>
                    <input
                      type="text"
                      defaultValue={editingItem.subCategories}
                      className="w-full px-2 py-2 border border-gray-300 rounded-md text-sm font-['Montserrat'] focus:outline-none focus:ring-1 focus:ring-blue-500"
                    />
                  </div>

                  {/* HSN */}
                  <div className="flex-shrink-0 w-20">
                    <div className="text-center mb-2">
                      <span className="text-sm font-medium text-gray-700 font-['Montserrat']">Hsn</span>
                    </div>
                    <input
                      type="text"
                      defaultValue={editingItem.hsn}
                      className="w-full px-2 py-2 border border-gray-300 rounded-md text-sm font-['Montserrat'] focus:outline-none focus:ring-1 focus:ring-blue-500"
                    />
                  </div>

                  {/* Size */}
                  <div className="flex-shrink-0 w-20">
                    <div className="text-center mb-2">
                      <span className="text-sm font-medium text-gray-700 font-['Montserrat']">size</span>
                    </div>
                    <div className="space-y-1">
                      <input type="text" defaultValue="small" className="w-full px-1 py-1 border border-gray-300 rounded text-xs font-['Montserrat'] focus:outline-none" />
                      <input type="text" defaultValue="medium" className="w-full px-1 py-1 border border-gray-300 rounded text-xs font-['Montserrat'] focus:outline-none" />
                      <input type="text" defaultValue="large" className="w-full px-1 py-1 border border-gray-300 rounded text-xs font-['Montserrat'] focus:outline-none" />
                    </div>
                  </div>

                  {/* Quantity */}
                  <div className="flex-shrink-0 w-20">
                    <div className="text-center mb-2">
                      <span className="text-sm font-medium text-gray-700 font-['Montserrat']">quantity</span>
                    </div>
                    <div className="space-y-1">
                      <input type="number" defaultValue="5" className="w-full px-1 py-1 border border-gray-300 rounded text-xs font-['Montserrat'] focus:outline-none" />
                      <input type="number" defaultValue="10" className="w-full px-1 py-1 border border-gray-300 rounded text-xs font-['Montserrat'] focus:outline-none" />
                      <input type="number" defaultValue="10" className="w-full px-1 py-1 border border-gray-300 rounded text-xs font-['Montserrat'] focus:outline-none" />
                    </div>
                  </div>

                  {/* Price sale price */}
                  <div className="flex-shrink-0 w-24">
                    <div className="text-center mb-2">
                      <span className="text-sm font-medium text-gray-700 font-['Montserrat']">Price sale price</span>
                    </div>
                    <div className="space-y-1">
                      <input type="number" defaultValue={editingItem.price} className="w-full px-1 py-1 border border-gray-300 rounded text-xs font-['Montserrat'] focus:outline-none" />
                      <input type="number" defaultValue={editingItem.salePrice} className="w-full px-1 py-1 border border-gray-300 rounded text-xs font-['Montserrat'] focus:outline-none" />
                      <input type="number" defaultValue={editingItem.price} className="w-full px-1 py-1 border border-gray-300 rounded text-xs font-['Montserrat'] focus:outline-none" />
                    </div>
                  </div>

                  {/* Alternate Price */}
                  <div className="flex-shrink-0 w-36">
                    <div className="text-center mb-2">
                      <span className="text-sm font-medium text-gray-700 font-['Montserrat']">Alternate price</span>
                    </div>
                    <div className="mb-2">
                      <div className="flex justify-center gap-1 text-[8px] font-['Montserrat'] mb-1">
                        <div className="flex flex-col items-center">
                          <span className="text-green-600">✓</span>
                          <span>myntra</span>
                        </div>
                        <div className="flex flex-col items-center">
                          <span className="text-green-600">✓</span>
                          <span>amazon</span>
                        </div>
                        <div className="flex flex-col items-center">
                          <span className="text-green-600">✓</span>
                          <span>flipkart</span>
                        </div>
                        <div className="flex flex-col items-center">
                          <span className="text-green-600">✓</span>
                          <span>nykaa</span>
                        </div>
                      </div>
                    </div>
                    <div className="space-y-1">
                      <div className="grid grid-cols-4 gap-1">
                        <input type="number" defaultValue={editingItem.platforms.myntra.price} className="px-1 py-1 border border-gray-300 rounded text-[9px] font-['Montserrat'] focus:outline-none" />
                        <input type="number" defaultValue={editingItem.platforms.amazon.price} className="px-1 py-1 border border-gray-300 rounded text-[9px] font-['Montserrat'] focus:outline-none" />
                        <input type="number" defaultValue={editingItem.platforms.flipkart.price} className="px-1 py-1 border border-gray-300 rounded text-[9px] font-['Montserrat'] focus:outline-none" />
                        <input type="number" defaultValue={editingItem.platforms.nykaa.price} className="px-1 py-1 border border-gray-300 rounded text-[9px] font-['Montserrat'] focus:outline-none" />
                      </div>
                      <div className="grid grid-cols-4 gap-1">
                        <input type="number" defaultValue={editingItem.platforms.myntra.price} className="px-1 py-1 border border-gray-300 rounded text-[9px] font-['Montserrat'] focus:outline-none" />
                        <input type="number" defaultValue={editingItem.platforms.amazon.price} className="px-1 py-1 border border-gray-300 rounded text-[9px] font-['Montserrat'] focus:outline-none" />
                        <input type="number" defaultValue={editingItem.platforms.flipkart.price} className="px-1 py-1 border border-gray-300 rounded text-[9px] font-['Montserrat'] focus:outline-none" />
                        <input type="number" defaultValue={editingItem.platforms.nykaa.price} className="px-1 py-1 border border-gray-300 rounded text-[9px] font-['Montserrat'] focus:outline-none" />
                      </div>
                      <div className="grid grid-cols-4 gap-1">
                        <input type="number" defaultValue={editingItem.platforms.myntra.price} className="px-1 py-1 border border-gray-300 rounded text-[9px] font-['Montserrat'] focus:outline-none" />
                        <input type="number" defaultValue={editingItem.platforms.amazon.price} className="px-1 py-1 border border-gray-300 rounded text-[9px] font-['Montserrat'] focus:outline-none" />
                        <input type="number" defaultValue={editingItem.platforms.flipkart.price} className="px-1 py-1 border border-gray-300 rounded text-[9px] font-['Montserrat'] focus:outline-none" />
                        <input type="number" defaultValue={editingItem.platforms.nykaa.price} className="px-1 py-1 border border-gray-300 rounded text-[9px] font-['Montserrat'] focus:outline-none" />
                      </div>
                    </div>
                  </div>

                  {/* SKU */}
                  <div className="flex-shrink-0 w-28">
                    <div className="text-center mb-2">
                      <span className="text-sm font-medium text-gray-700 font-['Montserrat']">SKU</span>
                    </div>
                    <div className="space-y-1">
                      {editingItem.size.map((size, idx) => (
                        <input
                          key={idx}
                          type="text"
                          defaultValue={editingItem.skus[size]}
                          className="w-full px-1 py-1 border border-gray-300 rounded text-xs font-['Montserrat'] focus:outline-none"
                        />
                      ))}
                    </div>
                  </div>

                  {/* Barcode No */}
                  <div className="flex-shrink-0 w-32">
                    <div className="text-center mb-2">
                      <span className="text-sm font-medium text-gray-700 font-['Montserrat']">barcode no.</span>
                    </div>
                    <input
                      type="text"
                      defaultValue={editingItem.barcodeNo}
                      className="w-full px-2 py-2 border border-gray-300 rounded-md text-sm font-['Montserrat'] focus:outline-none focus:ring-1 focus:ring-blue-500"
                    />
                  </div>

                  {/* Meta Title */}
                  <div className="flex-shrink-0 w-24">
                    <div className="text-center mb-2">
                      <span className="text-sm font-medium text-gray-700 font-['Montserrat']">meta title</span>
                    </div>
                    <div className="space-y-1">
                      <input type="text" defaultValue="tshirt black" className="w-full px-1 py-1 border border-gray-300 rounded text-xs font-['Montserrat'] focus:outline-none" />
                      <input type="text" defaultValue="tshirt white" className="w-full px-1 py-1 border border-gray-300 rounded text-xs font-['Montserrat'] focus:outline-none" />
                      <input type="text" defaultValue="tshirt red" className="w-full px-1 py-1 border border-gray-300 rounded text-xs font-['Montserrat'] focus:outline-none" />
                    </div>
                  </div>

                  {/* Meta Data */}
                  <div className="flex-1 min-w-0">
                    <div className="text-center mb-2">
                      <span className="text-sm font-medium text-gray-700 font-['Montserrat']">meta data</span>
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="block text-xs text-gray-600 mb-1 font-['Montserrat']">meta description</label>
                        <div className="space-y-1">
                          <input type="text" defaultValue="tshirt white trending" className="w-full px-2 py-1 border border-gray-300 rounded text-[10px] font-['Montserrat'] focus:outline-none" />
                          <input type="text" defaultValue="tshirt white trending" className="w-full px-2 py-1 border border-gray-300 rounded text-[10px] font-['Montserrat'] focus:outline-none" />
                        </div>
                      </div>
                      <div>
                        <label className="block text-xs text-gray-600 mb-1 font-['Montserrat']">Slug URL</label>
                        <div className="space-y-1">
                          <input type="text" defaultValue="huhh.be/fff/ffff.com" className="w-full px-2 py-1 border border-gray-300 rounded text-[10px] font-['Montserrat'] text-blue-600 focus:outline-none" />
                          <input type="text" defaultValue="/ahahaha/hahahha.com" className="w-full px-2 py-1 border border-gray-300 rounded text-[10px] font-['Montserrat'] text-blue-600 focus:outline-none" />
                        </div>
                      </div>
                    </div>
                  </div>

                </div>
              </div>

              {/* Row-level Bulk Actions */}
              <div className="mb-8 p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center gap-8 text-[14px] font-['Montserrat']">
                  <div className={`flex items-center gap-2 ${editingItem.moveToSale ? 'bg-blue-50 p-2 rounded-md' : ''}`}>
                    <input 
                      type="checkbox" 
                      id="modal-move-to-sale"
                      checked={editingItem.moveToSale}
                      onChange={(e) => handleItemAction(editingItem.id, 'moveToSale', e.target.checked)}
                      className="w-4 h-4 rounded-[3px] border-[#bcbcbc] text-blue-600 focus:ring-blue-500 focus:ring-2" 
                    />
                    <label htmlFor="modal-move-to-sale" className={`${editingItem.moveToSale ? 'text-blue-700 font-medium' : 'text-black'}`}>move to sale</label>
                  </div>
                  <div className={`flex items-center gap-2 ${editingItem.keepCopyAndMove ? 'bg-green-50 p-2 rounded-md' : ''}`}>
                    <input 
                      type="checkbox" 
                      id="modal-keep-copy"
                      checked={editingItem.keepCopyAndMove}
                      onChange={(e) => handleItemAction(editingItem.id, 'keepCopyAndMove', e.target.checked)}
                      className="w-4 h-4 rounded-[3px] border-[#bcbcbc] text-blue-600 focus:ring-blue-500 focus:ring-2" 
                    />
                    <label htmlFor="modal-keep-copy" className={`${editingItem.keepCopyAndMove ? 'text-green-700 font-medium' : 'text-black'}`}>make a copy and move to sale</label>
                  </div>
                  <div className={`flex items-center gap-2 ${editingItem.moveToEyx ? 'bg-purple-50 p-2 rounded-md' : ''}`}>
                    <input 
                      type="checkbox" 
                      id="modal-move-to-eyx"
                      checked={editingItem.moveToEyx}
                      onChange={(e) => handleItemAction(editingItem.id, 'moveToEyx', e.target.checked)}
                      className="w-4 h-4 rounded-[3px] border-[#bcbcbc] text-blue-600 focus:ring-blue-500 focus:ring-2" 
                    />
                    <label htmlFor="modal-move-to-eyx" className={`${editingItem.moveToEyx ? 'text-purple-700 font-medium' : 'text-black'}`}>move to eyx</label>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-4 justify-center">
                <button
                  onClick={handleSaveEdit}
                  className="bg-black hover:bg-gray-800 text-white font-['Montserrat'] font-medium py-3 px-8 rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
                >
                  save
                </button>
                <button
                  onClick={handleCloseEdit}
                  className="bg-gray-100 hover:bg-gray-200 text-gray-700 font-['Montserrat'] font-medium py-3 px-8 rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-gray-300 focus:ring-offset-2"
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
          <div className="bg-white rounded-xl shadow-2xl max-w-sm w-full mx-4 relative">
            
            {/* Close Button */}
            <button
              onClick={handleCloseSuccess}
              className="absolute top-4 right-4 p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <X className="h-5 w-5" />
            </button>

            {/* Modal Content */}
            <div className="p-8 text-center">
              
              {/* Success Message */}
              <h2 className="text-lg font-bold text-black mb-8 leading-tight font-['Montserrat']">
                Item Details updated successfully!
              </h2>

              {/* Done Button */}
              <button
                onClick={handleCloseSuccess}
                className="bg-black hover:bg-gray-800 text-white font-['Montserrat'] font-semibold py-3 px-8 rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 min-w-[120px]"
              >
                Done
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Meta Data Modal */}
      {isMetaDataModalOpen && selectedItemForMeta && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-[0px_4px_120px_2px_rgba(0,0,0,0.25)] max-w-[869px] w-full mx-4 relative">
            
            {/* Close Button */}
            <button
              onClick={handleCloseMetaData}
              className="absolute top-4 right-4 p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors z-10"
            >
              <X className="h-5 w-5" />
            </button>

            {/* Modal Content */}
            <div className="p-8 relative">
              
              {/* Header */}
              <div className="text-center mb-6">
                <p className="font-['Montserrat'] font-medium text-[#bfbfbf] text-[14px] leading-[1.2]">
                  Meta Data
                </p>
              </div>

              {/* Divider Line */}
              <div className="w-full h-px bg-gray-300 mb-6"></div>

              {/* Meta Title */}
              <div className="mb-8">
                <label className="block font-['Montserrat'] font-bold text-[#111111] text-[20px] leading-[24px] mb-4">
                  meta title
                </label>
                <div className="relative">
                  <input
                    type="text"
                    value={metaFormData.metaTitle}
                    onChange={(e) => handleMetaInputChange('metaTitle', e.target.value)}
                    className="w-full h-[41px] px-4 py-2 border-2 border-black rounded-xl font-['Montserrat'] text-[16px] focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Enter meta title"
                  />
                </div>
              </div>

              {/* Meta Description */}
              <div className="mb-8">
                <label className="block font-['Montserrat'] font-bold text-[#111111] text-[20px] leading-[24px] mb-4">
                  meta description
                </label>
                <div className="relative">
                  <textarea
                    value={metaFormData.metaDescription}
                    onChange={(e) => handleMetaInputChange('metaDescription', e.target.value)}
                    rows={3}
                    className="w-full px-4 py-2 border-2 border-black rounded-xl font-['Montserrat'] text-[16px] focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none"
                    placeholder="Enter meta description"
                  />
                </div>
              </div>

              {/* Slug URL */}
              <div className="mb-12">
                <label className="block font-['Montserrat'] font-bold text-[#111111] text-[20px] leading-[24px] mb-4">
                  slug URL
                </label>
                <div className="relative">
                  <input
                    type="text"
                    value={metaFormData.slugUrl}
                    onChange={(e) => handleMetaInputChange('slugUrl', e.target.value)}
                    className="w-full h-[41px] px-4 py-2 border-2 border-black rounded-xl font-['Montserrat'] text-[16px] focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Enter slug URL"
                  />
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-4 justify-center">
                <button
                  onClick={handleSaveMetaData}
                  className="bg-black hover:bg-gray-800 text-white font-['Montserrat'] font-medium py-4 px-[51px] rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 w-[284px] text-[16px] leading-[1.2]"
                >
                  save
                </button>
                <button
                  onClick={handleCloseMetaData}
                  className="bg-white hover:bg-gray-50 text-black font-['Montserrat'] font-medium py-4 px-[51px] rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-gray-300 focus:ring-offset-2 w-[284px] text-[16px] leading-[1.2] border border-[#e4e4e4]"
                >
                  go back
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Meta Data Success Modal */}
      {isMetaDataSuccessModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-[0px_4px_120px_2px_rgba(0,0,0,0.25)] max-w-sm w-full mx-4 relative">
            
            {/* Close Button */}
            <button
              onClick={handleCloseMetaDataSuccess}
              className="absolute top-4 right-4 p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors z-10"
            >
              <X className="h-5 w-5" />
            </button>

            {/* Modal Content */}
            <div className="p-8 text-center relative">
              
              {/* Success Message */}
              <h2 className="text-[18px] font-bold text-black mb-8 leading-[22px] font-['Montserrat'] tracking-[-0.41px] px-4">
                meta data updated successfully!
              </h2>

              {/* Done Button */}
              <button
                onClick={handleCloseMetaDataSuccess}
                className="bg-black hover:bg-gray-800 text-white font-['Montserrat'] font-semibold py-3 px-8 rounded-3xl transition-colors focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 w-[270px] h-12 text-[16px] leading-[1.406]"
              >
                Done
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {isDeleteConfirmModalOpen && itemToDelete && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-[0px_4px_120px_2px_rgba(0,0,0,0.25)] max-w-sm w-full mx-4 relative">
            
            {/* Close Button */}
            <button
              onClick={handleCancelDelete}
              className="absolute top-4 right-4 p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors z-10"
            >
              <X className="h-5 w-5" />
            </button>

            {/* Modal Content */}
            <div className="p-8 text-center relative">
              
              {/* Confirmation Message */}
              <h2 className="text-[18px] font-bold text-black mb-8 leading-[22px] font-['Montserrat'] tracking-[-0.41px] px-4">
                Are you sure you want to delete this item
              </h2>

              {/* Action Buttons */}
              <div className="flex gap-4 justify-center">
                <button
                  onClick={handleConfirmDelete}
                  className="bg-black hover:bg-gray-800 text-white font-['Montserrat'] font-semibold py-3 px-8 rounded-3xl transition-colors focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 w-[149px] h-12 text-[16px] leading-[1.406]"
                >
                  yes
                </button>
                <button
                  onClick={handleCancelDelete}
                  className="bg-white hover:bg-gray-50 text-black font-['Montserrat'] font-medium py-3 px-8 rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-gray-300 focus:ring-offset-2 w-[209px] text-[16px] leading-[1.2] border border-[#e4e4e4]"
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
          <div className="bg-white rounded-xl shadow-[0px_4px_120px_2px_rgba(0,0,0,0.25)] max-w-sm w-full mx-4 relative">
            
            {/* Close Button */}
            <button
              onClick={handleCloseDeleteSuccess}
              className="absolute top-4 right-4 p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors z-10"
            >
              <X className="h-5 w-5" />
            </button>

            {/* Modal Content */}
            <div className="p-8 text-center relative">
              
              {/* Success Icon - Green Checkmark */}
              <div className="flex justify-center mb-6">
                <div className="w-[60px] h-[60px] bg-green-500 rounded-full flex items-center justify-center">
                  <svg 
                    className="w-8 h-8 text-white" 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path 
                      strokeLinecap="round" 
                      strokeLinejoin="round" 
                      strokeWidth={2} 
                      d="M5 13l4 4L19 7" 
                    />
                  </svg>
                </div>
              </div>

              {/* Success Message */}
              <h2 className="text-[18px] font-bold text-black mb-8 leading-[22px] font-['Montserrat'] tracking-[-0.41px] px-4">
                Item deleted successfully!
              </h2>

              {/* Done Button */}
              <button
                onClick={handleCloseDeleteSuccess}
                className="bg-black hover:bg-gray-800 text-white font-['Montserrat'] font-semibold py-3 px-8 rounded-3xl transition-colors focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 w-[270px] h-12 text-[16px] leading-[1.406]"
              >
                Done
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Make Live Confirmation Modal */}
      {isMakeLiveConfirmModalOpen && itemToMakeLive && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-[0px_4px_120px_2px_rgba(0,0,0,0.25)] max-w-sm w-full mx-4 relative">
            
            {/* Close Button */}
            <button
              onClick={handleCancelMakeLive}
              className="absolute top-4 right-4 p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors z-10"
            >
              <X className="h-5 w-5" />
            </button>

            {/* Modal Content */}
            <div className="p-8 text-center relative">
              
              {/* Confirmation Message */}
              <h2 className="text-[18px] font-bold text-black mb-8 leading-[22px] font-['Montserrat'] tracking-[-0.41px] px-4">
                Are you sure you want to make this item live?
              </h2>

              {/* Action Buttons */}
              <div className="flex gap-4 justify-center">
                <button
                  onClick={handleConfirmMakeLive}
                  className="bg-green-600 hover:bg-green-700 text-white font-['Montserrat'] font-semibold py-3 px-8 rounded-3xl transition-colors focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 w-[149px] h-12 text-[16px] leading-[1.406]"
                >
                  Yes
                </button>
                <button
                  onClick={handleCancelMakeLive}
                  className="bg-white hover:bg-gray-50 text-black font-['Montserrat'] font-medium py-3 px-8 rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-gray-300 focus:ring-offset-2 w-[209px] text-[16px] leading-[1.2] border border-[#e4e4e4]"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Make Live Success Modal */}
      {isMakeLiveSuccessModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-[0px_4px_120px_2px_rgba(0,0,0,0.25)] max-w-sm w-full mx-4 relative">
            
            {/* Close Button */}
            <button
              onClick={handleCloseMakeLiveSuccess}
              className="absolute top-4 right-4 p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors z-10"
            >
              <X className="h-5 w-5" />
            </button>

            {/* Modal Content */}
            <div className="p-8 text-center relative">
              
              {/* Success Icon - Green Checkmark */}
              <div className="flex justify-center mb-6">
                <div className="w-[60px] h-[60px] bg-green-500 rounded-full flex items-center justify-center">
                  <svg 
                    className="w-8 h-8 text-white" 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path 
                      strokeLinecap="round" 
                      strokeLinejoin="round" 
                      strokeWidth={2} 
                      d="M5 13l4 4L19 7" 
                    />
                  </svg>
                </div>
              </div>

              {/* Success Message */}
              <h2 className="text-[18px] font-bold text-black mb-8 leading-[22px] font-['Montserrat'] tracking-[-0.41px] px-4">
                Item is now live!
              </h2>

              {/* Done Button */}
              <button
                onClick={handleCloseMakeLiveSuccess}
                className="bg-black hover:bg-gray-800 text-white font-['Montserrat'] font-semibold py-3 px-8 rounded-3xl transition-colors focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 w-[270px] h-12 text-[16px] leading-[1.406]"
              >
                Done
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Schedule Item Modal */}
      {isScheduleModalOpen && itemToSchedule && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-[0px_4px_120px_2px_rgba(0,0,0,0.25)] max-w-md w-full mx-4 relative">
            
            {/* Close Button */}
            <button
              onClick={handleCancelSchedule}
              className="absolute top-4 right-4 p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors z-10"
            >
              <X className="h-5 w-5" />
            </button>

            {/* Modal Content */}
            <div className="p-8 relative">
              
              {/* Header */}
              <h2 className="text-[24px] font-bold text-black mb-8 leading-[29px] font-['Montserrat'] text-center">
                Schedule Item for Later
              </h2>

              {/* Form Fields */}
              <div className="space-y-6 mb-8">
                <div>
                  <input
                    type="date"
                    value={scheduleDate}
                    onChange={(e) => setScheduleDate(e.target.value)}
                    className="w-full h-[50px] px-4 py-3 border border-gray-300 rounded-lg font-['Montserrat'] text-[16px] focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="nov 11,2025"
                  />
                </div>
                <div>
                  <input
                    type="time"
                    value={scheduleTime}
                    onChange={(e) => setScheduleTime(e.target.value)}
                    className="w-full h-[50px] px-4 py-3 border border-gray-300 rounded-lg font-['Montserrat'] text-[16px] focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="8:45 pm"
                  />
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-4 justify-center">
                <button
                  onClick={handleConfirmSchedule}
                  disabled={!scheduleDate || !scheduleTime}
                  className="bg-black hover:bg-gray-800 disabled:bg-gray-400 text-white font-['Montserrat'] font-medium py-4 px-8 rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 text-[16px] leading-[1.2]"
                >
                  schedule now
                </button>
                <button
                  onClick={handleCancelSchedule}
                  className="bg-white hover:bg-gray-50 text-black font-['Montserrat'] font-medium py-4 px-8 rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-gray-300 focus:ring-offset-2 text-[16px] leading-[1.2] border border-[#e4e4e4]"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Schedule Success Modal */}
      {isScheduleSuccessModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-[0px_4px_120px_2px_rgba(0,0,0,0.25)] max-w-sm w-full mx-4 relative">
            
            {/* Close Button */}
            <button
              onClick={handleCloseScheduleSuccess}
              className="absolute top-4 right-4 p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors z-10"
            >
              <X className="h-5 w-5" />
            </button>

            {/* Modal Content */}
            <div className="p-8 text-center relative">
              
              {/* Success Icon - Green Checkmark */}
              <div className="flex justify-center mb-6">
                <div className="w-[60px] h-[60px] bg-green-500 rounded-full flex items-center justify-center">
                  <svg 
                    className="w-8 h-8 text-white" 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path 
                      strokeLinecap="round" 
                      strokeLinejoin="round" 
                      strokeWidth={2} 
                      d="M5 13l4 4L19 7" 
                    />
                  </svg>
                </div>
              </div>

              {/* Success Message */}
              <h2 className="text-[18px] font-bold text-black mb-8 leading-[22px] font-['Montserrat'] tracking-[-0.41px] px-4">
                Item scheduled successfully!
              </h2>

              {/* Done Button */}
              <button
                onClick={handleCloseScheduleSuccess}
                className="bg-black hover:bg-gray-800 text-white font-['Montserrat'] font-semibold py-3 px-8 rounded-3xl transition-colors focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 w-[270px] h-12 text-[16px] leading-[1.406]"
              >
                Done
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Cancel Schedule Confirmation Modal */}
      {isCancelScheduleConfirmModalOpen && itemToCancelSchedule && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-2xl max-w-md w-full mx-4 overflow-hidden">
            
            {/* Modal Content */}
            <div className="p-8 text-center">
              
              {/* Question */}
              <h2 className="text-[18px] font-bold text-black mb-8 leading-[22px] font-['Montserrat'] tracking-[-0.41px]">
                Are you sure you want to cancel this scheduled item
              </h2>

              {/* Action Buttons */}
              <div className="flex gap-4 justify-center">
                <button
                  onClick={handleConfirmCancelSchedule}
                  className="bg-black hover:bg-gray-800 text-white font-['Montserrat'] font-medium py-3 px-6 rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 text-[16px] leading-[1.2]"
                >
                  yes
                </button>
                <button
                  onClick={handleCancelCancelSchedule}
                  className="bg-white hover:bg-gray-50 text-black font-['Montserrat'] font-medium py-3 px-6 rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-gray-300 focus:ring-offset-2 text-[16px] leading-[1.2] border border-[#e4e4e4]"
                >
                  go back
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Cancel Schedule Success Modal */}
      {isCancelScheduleSuccessModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-2xl max-w-md w-full mx-4 overflow-hidden">
            
            {/* Modal Content */}
            <div className="p-8 text-center">
              
              {/* Success Icon */}
              <div className="mb-6 flex justify-center">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
                  <svg 
                    className="w-8 h-8 text-green-600" 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path 
                      strokeLinecap="round" 
                      strokeLinejoin="round" 
                      strokeWidth={2} 
                      d="M5 13l4 4L19 7" 
                    />
                  </svg>
                </div>
              </div>

              {/* Success Message */}
              <h2 className="text-[18px] font-bold text-black mb-8 leading-[22px] font-['Montserrat'] tracking-[-0.41px] px-4">
                item schedule cancelled successfully!
              </h2>

              {/* Done Button */}
              <button
                onClick={handleCloseCancelScheduleSuccess}
                className="bg-black hover:bg-gray-800 text-white font-['Montserrat'] font-semibold py-3 px-8 rounded-3xl transition-colors focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 w-[270px] h-12 text-[16px] leading-[1.406]"
              >
                Done
              </button>
            </div>
          </div>
        </div>
      )}
      </div>
    </div>
  );
});

ManageItems.displayName = 'ManageItems';

export default ManageItems;
