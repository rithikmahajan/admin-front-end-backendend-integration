import React, { useState, useCallback, memo } from 'react';
import { Download, Share2, Plus, Upload, ArrowLeft, X, Edit2, Trash2, Calendar } from 'lucide-react';

/**
 * Bulk SMS Component
 * 
 * A comprehensive SMS/email management interface for bulk messaging.
 * Based on the Figma design, this component provides:
 * - Send SMS with customizable settings
 * - Send email functionality
 * - Reports and analytics
 * - Blacklist number management
 * - Message scheduling and draft saving
 * 
 * Features:
 * - Tab-based navigation (Send SMS, Send email, reports, black list numbers)
 * - Form validation and character counting  
 * - CSV upload for bulk operations
 * - Message previewing
 * - Campaign management
 */
const BulkSMS = memo(({ onClose }) => {
  // Tab state
  const [activeTab, setActiveTab] = useState('sms');
  const [activeReportTab, setActiveReportTab] = useState('delivery');
  
  // Modal states
  const [showScheduleModal, setShowScheduleModal] = useState(false);
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);
  const [successMessage, setSuccessMessage] = useState({ title: '', description: '' });
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [showEditReportModal, setShowEditReportModal] = useState(false);
  const [showDeleteReportConfirm, setShowDeleteReportConfirm] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [editingReport, setEditingReport] = useState(null);
  const [deleteItemId, setDeleteItemId] = useState(null);
  const [deleteReportId, setDeleteReportId] = useState(null);
  const [scheduleData, setScheduleData] = useState({
    date: 'nov 11,2025',
    time: '8:45 pm'
  });

  // Blacklist data
  const [blacklistData, setBlacklistData] = useState([
    {
      id: 1,
      number: '7828501124',
      email: 'rithikmahajan27@gmail.com'
    }
  ]);

  // Reports data
  const [reportsData, setReportsData] = useState([
    {
      id: 1,
      date: 'nov 7 2025',
      name: 'by admin',
      senderId: 'transactional',
      message: 'hey cutie',
      interface: ['http', 'sms', 'email'],
      channel: 'promotional',
      creditUsed: 10
    }
  ]);

  // Campaign reports data
  const [campaignReportsData, setCampaignReportsData] = useState([
    {
      id: 1,
      date: 'nov 7 2025',
      name: 'by admin',
      senderId: 'transactional',
      number: '7006114695',
      sms: 'private',
      status: 'delivered',
      channel: 'transactional',
      deliveryDate: 'nov 7 2025',
      smsType: 'normal',
      interface: 'http',
      cost: 10,
      message: 'hey cutie',
      dataCoding: 'Trans',
      scheduleDate: 'nov 7 2025',
      error: 'none'
    },
    {
      id: 2,
      date: 'nov 8 2025',
      name: 'by admin',
      senderId: 'promotional',
      number: '7006114696',
      sms: 'public',
      status: 'delivered',
      channel: 'marketing',
      deliveryDate: 'nov 8 2025',
      smsType: 'priority',
      interface: 'http',
      cost: 15,
      message: 'special offer',
      dataCoding: 'Promo',
      scheduleDate: 'nov 8 2025',
      error: 'none'
    },
    {
      id: 3,
      date: 'nov 9 2025',
      name: 'by admin',
      senderId: 'transactional',
      number: '7006114697',
      sms: 'private',
      status: 'pending',
      channel: 'transactional',
      deliveryDate: 'pending',
      smsType: 'normal',
      interface: 'http',
      cost: 8,
      message: 'order update',
      dataCoding: 'Trans',
      scheduleDate: 'nov 9 2025',
      error: 'none'
    }
  ]);

  // Scheduled reports data
  const [scheduledReportsData, setScheduledReportsData] = useState([
    {
      id: 1,
      date: 'nov 7 2025',
      name: 'by admin',
      senderId: 'transactional',
      message: 'hey cutie',
      interface: ['http', 'sms', 'email'],
      channel: 'promotional',
      creditUsed: 10
    },
    {
      id: 2,
      date: 'nov 8 2025',
      name: 'by admin',
      senderId: 'promotional',
      message: 'special offer',
      interface: ['sms', 'email'],
      channel: 'marketing',
      creditUsed: 15
    },
    {
      id: 3,
      date: 'nov 9 2025',
      name: 'by admin',
      senderId: 'transactional',
      message: 'order update',
      interface: ['http', 'sms'],
      channel: 'transactional',
      creditUsed: 8
    }
  ]);

  // Archived reports filter state
  const [archivedFilters, setArchivedFilters] = useState({
    fromDate: '',
    toDate: '',
    monthYear: ''
  });
  
  // Form state
  const [smsForm, setSmsForm] = useState({
    messageChannel: 'Transactional',
    messageRoute: 'Select Gateway',
    senderId: 'Select sender id',
    campaignName: 'afd641645gefe',
    numbers: '',
    messageTitle: '',
    messageText: '',
    characterCount: 0
  });

  // Email form state
  const [emailForm, setEmailForm] = useState({
    messageChannel: 'Transactional',
    messageRoute: 'Select Gateway',
    senderId: 'Select sender id',
    campaignName: 'afd641645gefe',
    emails: '',
    messageTitle: '',
    messageText: '',
    characterCount: 0
  });

  // Drafts state
  const [drafts, setDrafts] = useState([
    {
      id: 1,
      name: 'draft 1',
      type: 'sms',
      data: {
        messageChannel: 'Transactional',
        messageRoute: 'Select Gateway',
        senderId: 'transactional',
        campaignName: 'campaign_001',
        numbers: '7006114695,7006114696',
        messageTitle: 'Welcome Message',
        messageText: 'Welcome to our service!',
        characterCount: 25
      },
      createdAt: 'nov 7 2025',
      updatedAt: 'nov 7 2025'
    },
    {
      id: 2,
      name: 'draft 2',
      type: 'email',
      data: {
        messageChannel: 'Promotional',
        messageRoute: 'SMTP',
        senderId: 'promotional',
        campaignName: 'email_campaign_001',
        emails: 'user1@example.com,user2@example.com',
        messageTitle: 'Special Offer',
        messageText: 'Limited time offer just for you!',
        characterCount: 35
      },
      createdAt: 'nov 8 2025',
      updatedAt: 'nov 8 2025'
    }
  ]);
  
  // Draft modal states
  const [showDraftsModal, setShowDraftsModal] = useState(false);
  const [showDraftDeleteConfirm, setShowDraftDeleteConfirm] = useState(false);
  const [deleteDraftId, setDeleteDraftId] = useState(null);
  const [editingDraft, setEditingDraft] = useState(null);
  
  // Send confirmation modal state
  const [showSendConfirm, setShowSendConfirm] = useState(false);

  // Handle form changes
  const handleFormChange = useCallback((field, value) => {
    setSmsForm(prev => {
      const updated = { ...prev, [field]: value };
      
      // Update character count for message text
      if (field === 'messageText') {
        updated.characterCount = value.length;
      }
      
      return updated;
    });
  }, []);

  // Handle email form changes
  const handleEmailFormChange = useCallback((field, value) => {
    setEmailForm(prev => {
      const updated = { ...prev, [field]: value };
      
      // Update character count for message text
      if (field === 'messageText') {
        updated.characterCount = value.length;
      }
      
      return updated;
    });
  }, []);

  // Handle tab changes
  const handleTabChange = useCallback((tab) => {
    setActiveTab(tab);
  }, []);

  // Handle actions
  const handleCreateCampaign = useCallback(() => {
    console.log('Creating new campaign');
  }, []);

  const handleDownload = useCallback(() => {
    console.log('Downloading data');
  }, []);

  const handleShare = useCallback(() => {
    console.log('Sharing data');
  }, []);

  const handleUploadCSV = useCallback(() => {
    console.log('Uploading CSV file');
  }, []);

  const handleSendFromExcel = useCallback(() => {
    console.log('Sending SMS from Excel file');
  }, []);

  const handleSendEmailFromExcel = useCallback(() => {
    console.log('Sending emails from Excel file');
  }, []);

  const handleSaveDraft = useCallback(() => {
    const currentForm = activeTab === 'sms' ? smsForm : emailForm;
    const draftName = `draft ${drafts.length + 1}`;
    
    const newDraft = {
      id: Date.now(),
      name: draftName,
      type: activeTab,
      data: { ...currentForm },
      createdAt: new Date().toLocaleDateString('en-US', { 
        year: 'numeric', 
        month: 'short', 
        day: 'numeric' 
      }).toLowerCase(),
      updatedAt: new Date().toLocaleDateString('en-US', { 
        year: 'numeric', 
        month: 'short', 
        day: 'numeric' 
      }).toLowerCase()
    };
    
    setDrafts(prev => [...prev, newDraft]);
    console.log('Draft saved:', newDraft);
    
    // Show success message
    setSuccessMessage({
      title: 'Draft Saved Successfully!',
      description: `Your ${activeTab === 'sms' ? 'SMS' : 'email'} draft "${draftName}" has been saved.`
    });
    setShowSuccessPopup(true);
    setTimeout(() => setShowSuccessPopup(false), 3000);
  }, [activeTab, smsForm, emailForm, drafts.length]);

  // Draft management functions
  const handleViewDrafts = useCallback(() => {
    setShowDraftsModal(true);
  }, []);

  const handleLoadDraft = useCallback((draft) => {
    if (draft.type === 'sms') {
      setSmsForm(draft.data);
      setActiveTab('sms');
    } else if (draft.type === 'email') {
      setEmailForm(draft.data);
      setActiveTab('email');
    }
    setShowDraftsModal(false);
    console.log('Draft loaded:', draft);
  }, []);

  const handleEditDraft = useCallback((draft) => {
    setEditingDraft({ ...draft });
  }, []);

  const handleSaveDraftEdit = useCallback(() => {
    if (editingDraft) {
      setDrafts(prev => 
        prev.map(draft => 
          draft.id === editingDraft.id 
            ? { ...editingDraft, updatedAt: new Date().toLocaleDateString('en-US', { 
                year: 'numeric', 
                month: 'short', 
                day: 'numeric' 
              }).toLowerCase() }
            : draft
        )
      );
      setEditingDraft(null);
      console.log('Draft updated:', editingDraft);
    }
  }, [editingDraft]);

  const handleCancelDraftEdit = useCallback(() => {
    setEditingDraft(null);
  }, []);

  const handleDeleteDraft = useCallback((id) => {
    setDeleteDraftId(id);
    setShowDraftDeleteConfirm(true);
  }, []);

  const handleConfirmDeleteDraft = useCallback(() => {
    if (deleteDraftId) {
      setDrafts(prev => prev.filter(draft => draft.id !== deleteDraftId));
      console.log('Draft deleted:', deleteDraftId);
    }
    setShowDraftDeleteConfirm(false);
    setDeleteDraftId(null);
  }, [deleteDraftId]);

  const handleCancelDeleteDraft = useCallback(() => {
    setShowDraftDeleteConfirm(false);
    setDeleteDraftId(null);
  }, []);

  const handleScheduleLater = useCallback(() => {
    setShowScheduleModal(true);
  }, []);

  const handleScheduleNow = useCallback(() => {
    setShowScheduleModal(false);
    
    // Set success message for scheduling
    setSuccessMessage({
      title: `${activeTab === 'sms' ? 'SMS' : 'Email'} Scheduled Successfully!`,
      description: `Your ${activeTab === 'sms' ? 'SMS' : 'email'} has been scheduled for ${scheduleData.date} at ${scheduleData.time}`
    });
    setShowSuccessPopup(true);
    console.log('Scheduling message for:', scheduleData);
    
    // Auto-hide success popup after 3 seconds
    setTimeout(() => {
      setShowSuccessPopup(false);
    }, 3000);
  }, [activeTab, scheduleData]);

  const handleCloseScheduleModal = useCallback(() => {
    setShowScheduleModal(false);
  }, []);

  const handleScheduleDataChange = useCallback((field, value) => {
    setScheduleData(prev => ({
      ...prev,
      [field]: value
    }));
  }, []);

  const handleSendNow = useCallback(() => {
    setShowSendConfirm(true);
  }, []);

  const handleConfirmSend = useCallback(() => {
    setShowSendConfirm(false);
    
    // Set success message for sending
    setSuccessMessage({
      title: `${activeTab === 'sms' ? 'SMS' : 'Email'} Sent Successfully!`,
      description: `Your ${activeTab === 'sms' ? 'SMS' : 'email'} has been sent successfully.`
    });
    setShowSuccessPopup(true);
    console.log(`Sending ${activeTab} now`);
    
    // Auto-hide success popup after 3 seconds
    setTimeout(() => {
      setShowSuccessPopup(false);
    }, 3000);
  }, [activeTab]);

  const handleCancelSend = useCallback(() => {
    setShowSendConfirm(false);
  }, []);

  const handlePreview = useCallback(() => {
    console.log('Previewing message');
  }, []);

  // Blacklist handlers
  const handleEditBlacklistItem = useCallback((id) => {
    const item = blacklistData.find(item => item.id === id);
    if (item) {
      setEditingItem({ ...item });
      setShowEditModal(true);
    }
  }, [blacklistData]);

  const handleDeleteBlacklistItem = useCallback((id) => {
    setDeleteItemId(id);
    setShowDeleteConfirm(true);
  }, []);

  const handleConfirmDelete = useCallback(() => {
    if (deleteItemId) {
      setBlacklistData(prev => prev.filter(item => item.id !== deleteItemId));
      console.log('Deleted blacklist item:', deleteItemId);
    }
    setShowDeleteConfirm(false);
    setDeleteItemId(null);
  }, [deleteItemId]);

  const handleCancelDelete = useCallback(() => {
    setShowDeleteConfirm(false);
    setDeleteItemId(null);
  }, []);

  const handleSaveEdit = useCallback(() => {
    if (editingItem) {
      setBlacklistData(prev => 
        prev.map(item => 
          item.id === editingItem.id ? editingItem : item
        )
      );
      console.log('Updated blacklist item:', editingItem);
    }
    setShowEditModal(false);
    setEditingItem(null);
  }, [editingItem]);

  const handleCancelEdit = useCallback(() => {
    setShowEditModal(false);
    setEditingItem(null);
  }, []);

  const handleEditItemChange = useCallback((field, value) => {
    setEditingItem(prev => prev ? { ...prev, [field]: value } : null);
  }, []);

  // Reports handlers
  const handleReportTabChange = useCallback((tab) => {
    setActiveReportTab(tab);
  }, []);

  const handleEditReport = useCallback((id) => {
    let data;
    if (activeReportTab === 'campaign') {
      data = campaignReportsData;
    } else if (activeReportTab === 'schedule') {
      data = scheduledReportsData;
    } else {
      data = reportsData;
    }
    
    const report = data.find(item => item.id === id);
    if (report) {
      setEditingReport({ ...report });
      setShowEditReportModal(true);
    }
  }, [activeReportTab, campaignReportsData, scheduledReportsData, reportsData]);

  const handleDeleteReport = useCallback((id) => {
    setDeleteReportId(id);
    setShowDeleteReportConfirm(true);
  }, []);

  const handleConfirmDeleteReport = useCallback(() => {
    if (deleteReportId) {
      if (activeReportTab === 'campaign') {
        setCampaignReportsData(prev => prev.filter(item => item.id !== deleteReportId));
      } else if (activeReportTab === 'schedule') {
        setScheduledReportsData(prev => prev.filter(item => item.id !== deleteReportId));
      } else {
        setReportsData(prev => prev.filter(item => item.id !== deleteReportId));
      }
      console.log('Deleted report:', deleteReportId);
    }
    setShowDeleteReportConfirm(false);
    setDeleteReportId(null);
  }, [deleteReportId, activeReportTab]);

  const handleCancelDeleteReport = useCallback(() => {
    setShowDeleteReportConfirm(false);
    setDeleteReportId(null);
  }, []);

  const handleSaveReportEdit = useCallback(() => {
    if (editingReport) {
      if (activeReportTab === 'campaign') {
        setCampaignReportsData(prev => 
          prev.map(item => 
            item.id === editingReport.id ? editingReport : item
          )
        );
      } else if (activeReportTab === 'schedule') {
        setScheduledReportsData(prev => 
          prev.map(item => 
            item.id === editingReport.id ? editingReport : item
          )
        );
      } else {
        setReportsData(prev => 
          prev.map(item => 
            item.id === editingReport.id ? editingReport : item
          )
        );
      }
      console.log('Updated report:', editingReport);
    }
    setShowEditReportModal(false);
    setEditingReport(null);
  }, [editingReport, activeReportTab]);

  const handleCancelReportEdit = useCallback(() => {
    setShowEditReportModal(false);
    setEditingReport(null);
  }, []);

  const handleEditReportChange = useCallback((field, value) => {
    setEditingReport(prev => prev ? { ...prev, [field]: value } : null);
  }, []);

  // Archived reports handlers
  const handleArchivedFilterChange = useCallback((field, value) => {
    setArchivedFilters(prev => ({
      ...prev,
      [field]: value
    }));
  }, []);

  const handleExportCSV = useCallback(() => {
    console.log('Exporting archived reports as CSV');
  }, []);

  const tabs = [
    { id: 'sms', label: 'Send SMS' },
    { id: 'email', label: 'Send email' },
    { id: 'reports', label: 'reports' },
    { id: 'blacklist', label: 'Blacklist Numbers/Email' }
  ];

  return (
    <div className="min-h-screen bg-white p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-4">
          {/* Back Button */}
          {onClose && (
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors flex items-center gap-2 text-[#252c32]"
            >
              <ArrowLeft className="w-5 h-5" />
              <span className="text-sm">Back</span>
            </button>
          )}
          
          <h1 className="text-[28px] font-bold text-[#252c32] font-montserrat tracking-[-0.616px] leading-[48px]">
            SMS/email
          </h1>
        </div>
        
        <div className="flex items-center gap-3">
          {/* Create Campaign Button */}
          <button
            onClick={handleCreateCampaign}
            className="bg-[#000000] text-[#f6f8f9] px-3 py-1 rounded-md flex items-center gap-2 text-[14px] font-semibold font-inter tracking-[-0.084px] leading-[24px]"
          >
            <Plus className="w-6 h-6" />
            Create Campaign
          </button>

          {/* Download Button */}
          <button
            onClick={handleDownload}
            className="bg-white border border-[#dde2e4] text-[#252c32] px-3 py-1 rounded-md flex items-center gap-[5px] text-[14px] font-normal font-inter tracking-[-0.084px] leading-[24px]"
          >
            <Download className="w-6 h-6" />
            Download
          </button>

          {/* Share Button */}
          <button
            onClick={handleShare}
            className="bg-white border border-[#dde2e4] text-[#252c32] px-3 py-1 rounded-md flex items-center gap-[5px] text-[14px] font-normal font-inter tracking-[-0.084px] leading-[24px]"
          >
            <Share2 className="w-6 h-6" />
            Share
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-8 mb-8 border-b border-gray-200">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => handleTabChange(tab.id)}
            className={`pb-2 text-[14px] font-semibold font-inter tracking-[-0.084px] leading-[24px] ${
              activeTab === tab.id
                ? 'text-[#101316] border-b-2 border-[#101316]'
                : 'text-[#101316] hover:text-gray-700'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* SMS Form Content */}
      {activeTab === 'sms' && (
        <div className="grid grid-cols-2 gap-8">
          {/* Left Column */}
          <div className="space-y-6">
            {/* Message Channel */}
            <div>
              <label className="block text-[14px] font-semibold text-[#344054] mb-1.5 font-inter leading-[20px]">
                Message Channel
              </label>
              <div className="bg-white border border-[#d0d5dd] rounded-[5px] px-4 py-3 shadow-[0px_1px_2px_0px_rgba(16,24,40,0.05)]">
                <span className="text-[14px] text-[#667085] font-inter leading-[24px]">
                  {smsForm.messageChannel}
                </span>
              </div>
            </div>

            {/* Sender Id */}
            <div>
              <label className="block text-[14px] font-semibold text-[#344054] mb-1.5 font-inter leading-[20px]">
                Sender Id
              </label>
              <div className="bg-white border border-[#d0d5dd] rounded-[5px] px-4 py-3 shadow-[0px_1px_2px_0px_rgba(16,24,40,0.05)]">
                <span className="text-[14px] text-[#667085] font-inter leading-[24px]">
                  {smsForm.senderId}
                </span>
              </div>
            </div>

            {/* Numbers */}
            <div>
              <label className="block text-[14px] font-semibold text-[#344054] mb-1.5 font-inter leading-[20px]">
                Numbers
              </label>
              <div className="relative">
                <textarea
                  value={smsForm.numbers}
                  onChange={(e) => handleFormChange('numbers', e.target.value)}
                  placeholder="Enter recipient numbers in comma separated :"
                  className="w-full h-[94px] bg-white border border-[#d0d5dd] rounded-[5px] px-4 py-3 text-[14px] text-[#667085] font-inter leading-[24px] resize-none shadow-[0px_1px_2px_0px_rgba(16,24,40,0.05)] focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button
                  onClick={handleUploadCSV}
                  className="absolute top-3 right-3 bg-[#12b76a] text-white px-4 py-2.5 rounded-lg flex items-center gap-2 text-[14px] font-normal font-montserrat leading-[20px]"
                >
                  <Plus className="w-5 h-5" />
                  upload from csv
                </button>
              </div>
            </div>

            {/* Message Text */}
            <div>
              <label className="block text-[14px] font-semibold text-[#344054] mb-1.5 font-inter leading-[20px]">
                Message Text
              </label>
              <div className="space-y-0">
                {/* Title Input */}
                <input
                  type="text"
                  value={smsForm.messageTitle}
                  onChange={(e) => handleFormChange('messageTitle', e.target.value)}
                  placeholder="Title"
                  className="w-full bg-white border border-[#d0d5dd] rounded-t-[8px] px-4 py-3 text-[14px] text-[#667085] font-inter leading-[24px] shadow-[0px_1px_2px_0px_rgba(16,24,40,0.05)] focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                {/* Message Textarea */}
                <textarea
                  value={smsForm.messageText}
                  onChange={(e) => handleFormChange('messageText', e.target.value)}
                  placeholder="Enter sub message"
                  className="w-full h-[94px] bg-white border border-[#d0d5dd] rounded-b-[8px] px-4 py-3 text-[14px] text-[#667085] font-inter leading-[24px] resize-none shadow-[0px_1px_2px_0px_rgba(16,24,40,0.05)] focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              {/* Character Count */}
              <div className="flex justify-between mt-2">
                <span className="text-[14px] font-medium text-[#344054] font-montserrat leading-[20px]">
                  {smsForm.characterCount} Characters Used
                </span>
                <span className="text-[14px] font-medium text-[#344054] font-montserrat leading-[20px]">
                  Count 200
                </span>
              </div>
            </div>

            {/* Send SMS from Excel Button */}
            <button
              onClick={handleSendFromExcel}
              className="w-[292px] bg-[#12b76a] text-white px-4 py-2.5 rounded-lg flex items-center justify-center gap-2 text-[14px] font-medium font-inter leading-[24px]"
            >
              <Plus className="w-5 h-5" />
              Send SMS from excel file
            </button>
          </div>

          {/* Right Column */}
          <div className="space-y-6">
            {/* Message Route */}
            <div>
              <label className="block text-[14px] font-semibold text-[#344054] mb-1.5 font-inter leading-[20px]">
                Message Route
              </label>
              <div className="bg-white border border-[#d0d5dd] rounded-[5px] px-4 py-3 shadow-[0px_1px_2px_0px_rgba(16,24,40,0.05)]">
                <span className="text-[14px] text-[#667085] font-inter leading-[24px]">
                  {smsForm.messageRoute}
                </span>
              </div>
            </div>

            {/* Campaign Name */}
            <div>
              <label className="block text-[14px] font-semibold text-[#344054] mb-1.5 font-inter leading-[20px]">
                Campaign Name
              </label>
              <div className="bg-white border border-[#d0d5dd] rounded-[5px] px-4 py-3 shadow-[0px_1px_2px_0px_rgba(16,24,40,0.05)]">
                <span className="text-[14px] text-[#667085] font-inter leading-[24px]">
                  {smsForm.campaignName}
                </span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Other tab contents */}
      {activeTab === 'email' && (
        <div className="grid grid-cols-2 gap-8">
          {/* Left Column */}
          <div className="space-y-6">
            {/* Message Channel */}
            <div>
              <label className="block text-[14px] font-semibold text-[#344054] mb-1.5 font-inter leading-[20px]">
                Message Channel
              </label>
              <div className="bg-white border border-[#d0d5dd] rounded-[5px] px-4 py-3 shadow-[0px_1px_2px_0px_rgba(16,24,40,0.05)]">
                <span className="text-[14px] text-[#667085] font-inter leading-[24px]">
                  {emailForm.messageChannel}
                </span>
              </div>
            </div>

            {/* Sender Id */}
            <div>
              <label className="block text-[14px] font-semibold text-[#344054] mb-1.5 font-inter leading-[20px]">
                Sender Id
              </label>
              <div className="bg-white border border-[#d0d5dd] rounded-[5px] px-4 py-3 shadow-[0px_1px_2px_0px_rgba(16,24,40,0.05)]">
                <span className="text-[14px] text-[#667085] font-inter leading-[24px]">
                  {emailForm.senderId}
                </span>
              </div>
            </div>

            {/* Emails */}
            <div>
              <label className="block text-[14px] font-semibold text-[#344054] mb-1.5 font-inter leading-[20px]">
                emails
              </label>
              <div className="relative">
                <textarea
                  value={emailForm.emails}
                  onChange={(e) => handleEmailFormChange('emails', e.target.value)}
                  placeholder="Enter recipient emails comma separated :"
                  className="w-full h-[94px] bg-white border border-[#d0d5dd] rounded-[5px] px-4 py-3 text-[14px] text-[#667085] font-inter leading-[24px] resize-none shadow-[0px_1px_2px_0px_rgba(16,24,40,0.05)] focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button
                  onClick={handleUploadCSV}
                  className="absolute top-3 right-3 bg-[#12b76a] text-white px-4 py-2.5 rounded-lg flex items-center gap-2 text-[14px] font-normal font-montserrat leading-[20px]"
                >
                  <Plus className="w-5 h-5" />
                  upload from csv
                </button>
              </div>
            </div>

            {/* Message Text */}
            <div>
              <label className="block text-[14px] font-semibold text-[#344054] mb-1.5 font-inter leading-[20px]">
                Message Text
              </label>
              <div className="space-y-0">
                {/* Title Input */}
                <input
                  type="text"
                  value={emailForm.messageTitle}
                  onChange={(e) => handleEmailFormChange('messageTitle', e.target.value)}
                  placeholder="Title"
                  className="w-full bg-white border border-[#d0d5dd] rounded-t-[8px] px-4 py-3 text-[14px] text-[#667085] font-inter leading-[24px] shadow-[0px_1px_2px_0px_rgba(16,24,40,0.05)] focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                {/* Message Textarea */}
                <textarea
                  value={emailForm.messageText}
                  onChange={(e) => handleEmailFormChange('messageText', e.target.value)}
                  placeholder="Enter sub message"
                  className="w-full h-[94px] bg-white border border-[#d0d5dd] rounded-b-[8px] px-4 py-3 text-[14px] text-[#667085] font-inter leading-[24px] resize-none shadow-[0px_1px_2px_0px_rgba(16,24,40,0.05)] focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              {/* Character Count */}
              <div className="flex justify-between mt-2">
                <span className="text-[14px] font-medium text-[#344054] font-montserrat leading-[20px]">
                  {emailForm.characterCount} Characters Used
                </span>
                <span className="text-[14px] font-medium text-[#344054] font-montserrat leading-[20px]">
                  Count 200
                </span>
              </div>
            </div>

            {/* Send Emails from Excel Button */}
            <button
              onClick={handleSendEmailFromExcel}
              className="w-[292px] bg-[#12b76a] text-white px-4 py-2.5 rounded-lg flex items-center justify-center gap-2 text-[14px] font-medium font-inter leading-[24px]"
            >
              <Plus className="w-5 h-5" />
              Send emils from excel file
            </button>
          </div>

          {/* Right Column */}
          <div className="space-y-6">
            {/* Message Route */}
            <div>
              <label className="block text-[14px] font-semibold text-[#344054] mb-1.5 font-inter leading-[20px]">
                Message Route
              </label>
              <div className="bg-white border border-[#d0d5dd] rounded-[5px] px-4 py-3 shadow-[0px_1px_2px_0px_rgba(16,24,40,0.05)]">
                <span className="text-[14px] text-[#667085] font-inter leading-[24px]">
                  {emailForm.messageRoute}
                </span>
              </div>
            </div>

            {/* Campaign Name */}
            <div>
              <label className="block text-[14px] font-semibold text-[#344054] mb-1.5 font-inter leading-[20px]">
                Campaign Name
              </label>
              <div className="bg-white border border-[#d0d5dd] rounded-[5px] px-4 py-3 shadow-[0px_1px_2px_0px_rgba(16,24,40,0.05)]">
                <span className="text-[14px] text-[#667085] font-inter leading-[24px]">
                  {emailForm.campaignName}
                </span>
              </div>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'reports' && (
        <div className="space-y-6">
          {/* Reports Title */}
          <h2 className="text-[28px] font-bold text-[#252c32] font-montserrat tracking-[-0.616px] leading-[48px]">
            Reports
          </h2>

          {/* Report Tabs */}
          <div className="border-b border-[#e5e9eb]">
            <div className="flex items-center gap-8">
              {[
                { id: 'campaign', label: 'Campaign Report' },
                { id: 'delivery', label: 'Delivery Report' },
                { id: 'schedule', label: 'Schedule Report' },
                { id: 'archived', label: 'Archived Report' },
                { id: 'credit', label: 'Credit History' }
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => handleReportTabChange(tab.id)}
                  className={`pb-2 text-[14px] font-medium font-montserrat tracking-[-0.084px] leading-[24px] ${
                    activeReportTab === tab.id
                      ? tab.id === 'delivery'
                        ? 'text-[#101316] underline decoration-solid decoration-from-font'
                        : tab.id === 'archived'
                        ? 'text-[#101316] font-semibold underline decoration-solid decoration-from-font'
                        : tab.id === 'schedule'
                        ? 'text-[#101316] underline decoration-solid decoration-from-font'
                        : tab.id === 'campaign'
                        ? 'text-[#101316] underline decoration-solid decoration-from-font'
                        : 'text-[#101316] border-b-2 border-[#101316]'
                      : 'text-[#101316] hover:text-gray-700'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          {/* Reports Table */}
          <div className="bg-white rounded-xl shadow-[0px_4px_120px_2px_rgba(0,0,0,0.25)] overflow-hidden">
            {/* Archived Report Filters */}
            {activeReportTab === 'archived' && (
              <div className="bg-white border-b border-[#e5e9eb] px-6 py-6">
                <div className="grid grid-cols-2 gap-8">
                  {/* Left Column */}
                  <div className="space-y-6">
                    {/* From Date */}
                    <div>
                      <label className="block text-[14px] font-semibold text-[#344054] mb-1.5 font-montserrat leading-[20px]">
                        From Date
                      </label>
                      <div className="relative">
                        <input
                          type="date"
                          value={archivedFilters.fromDate}
                          onChange={(e) => handleArchivedFilterChange('fromDate', e.target.value)}
                          className="w-full bg-white border border-[#d0d5dd] rounded-[5px] px-4 py-3 pr-12 text-[14px] text-[#667085] font-inter leading-[24px] shadow-[0px_1px_2px_0px_rgba(16,24,40,0.05)] focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        <Calendar className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-[#667085] pointer-events-none" />
                      </div>
                    </div>

                    {/* Month & Year */}
                    <div>
                      <label className="block text-[14px] font-semibold text-[#344054] mb-1.5 font-montserrat leading-[20px]">
                        Month & Year
                      </label>
                      <div className="relative">
                        <input
                          type="month"
                          value={archivedFilters.monthYear}
                          onChange={(e) => handleArchivedFilterChange('monthYear', e.target.value)}
                          className="w-full bg-white border border-[#d0d5dd] rounded-[5px] px-4 py-3 pr-12 text-[14px] text-[#667085] font-inter leading-[24px] shadow-[0px_1px_2px_0px_rgba(16,24,40,0.05)] focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        <Calendar className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-[#667085] pointer-events-none" />
                      </div>
                    </div>
                  </div>

                  {/* Right Column */}
                  <div className="space-y-6">
                    {/* To Date */}
                    <div>
                      <label className="block text-[14px] font-semibold text-[#344054] mb-1.5 font-inter leading-[20px]">
                        To Date
                      </label>
                      <div className="relative">
                        <input
                          type="date"
                          value={archivedFilters.toDate}
                          onChange={(e) => handleArchivedFilterChange('toDate', e.target.value)}
                          className="w-full bg-white border border-[#d0d5dd] rounded-[5px] px-4 py-3 pr-12 text-[14px] text-[#667085] font-inter leading-[24px] shadow-[0px_1px_2px_0px_rgba(16,24,40,0.05)] focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        <Calendar className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-[#667085] pointer-events-none" />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex items-center justify-center gap-4 mt-8">
                  {/* Export CSV Button */}
                  <button
                    onClick={handleExportCSV}
                    className="bg-black text-white px-4 py-3 rounded-3xl w-[270px] h-12 text-[14px] font-semibold font-montserrat text-center"
                  >
                    export as csv
                  </button>

                  {/* Download Button */}
                  <button
                    onClick={handleDownload}
                    className="bg-white border border-[#dde2e4] text-[#252c32] px-3 py-1 rounded-md flex items-center gap-[5px] text-[14px] font-normal font-inter tracking-[-0.084px] leading-[24px]"
                  >
                    <Download className="w-6 h-6" />
                    Download
                  </button>

                  {/* Share Button */}
                  <button
                    onClick={handleShare}
                    className="bg-white border border-[#dde2e4] text-[#252c32] px-3 py-1 rounded-md flex items-center gap-[5px] text-[14px] font-normal font-inter tracking-[-0.084px] leading-[24px]"
                  >
                    <Share2 className="w-6 h-6" />
                    Share
                  </button>
                </div>
              </div>
            )}

            {/* Show Table for other report types */}
            {activeReportTab !== 'archived' && (
              <>
                {/* Table Header */}
                <div className={`grid ${activeReportTab === 'campaign' ? 'grid-cols-10' : 'grid-cols-8'} gap-4 bg-white border-b border-[#e5e9eb] px-6 py-4`}>
                  <div className="text-[14px] font-medium text-[#101316] font-montserrat tracking-[-0.084px] leading-[24px]">
                    Date
                  </div>
                  
                  {/* Campaign Report Headers */}
                  {activeReportTab === 'campaign' ? (
                    <>
                      <div className="text-[14px] font-medium text-[#101316] font-montserrat tracking-[-0.084px] leading-[24px]">
                        sender ID
                      </div>
                      <div className="text-[14px] font-medium text-[#101316] font-montserrat tracking-[-0.084px] leading-[24px]">
                        Number
                      </div>
                      <div className="text-[14px] font-medium text-[#101316] font-montserrat tracking-[-0.084px] leading-[24px]">
                        sms
                      </div>
                      <div className="text-[14px] font-medium text-[#101316] font-montserrat tracking-[-0.084px] leading-[24px]">
                        status
                      </div>
                      <div className="text-[14px] font-medium text-[#101316] font-montserrat tracking-[-0.084px] leading-[24px]">
                        channel
                      </div>
                      <div className="text-[14px] font-medium text-[#101316] font-montserrat tracking-[-0.084px] leading-[24px]">
                        delivery Date
                      </div>
                      <div className="text-[14px] font-medium text-[#101316] font-montserrat tracking-[-0.084px] leading-[24px]">
                        sms type
                      </div>
                      <div className="text-[14px] font-medium text-[#101316] font-montserrat tracking-[-0.084px] leading-[24px]">
                        Interface
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="text-[14px] font-medium text-[#101316] font-montserrat tracking-[-0.084px] leading-[24px]">
                        Name
                      </div>
                      <div className="text-[14px] font-medium text-[#101316] font-montserrat tracking-[-0.084px] leading-[24px]">
                        sender ID
                      </div>
                      <div className="text-[14px] font-medium text-[#101316] font-montserrat tracking-[-0.084px] leading-[24px]">
                        Message
                      </div>
                      <div className="text-[14px] font-medium text-[#101316] font-montserrat tracking-[-0.084px] leading-[24px]">
                        Interface
                      </div>
                      <div className="text-[14px] font-medium text-[#101316] font-montserrat tracking-[-0.084px] leading-[24px]">
                        channel
                      </div>
                      <div className="text-[14px] font-medium text-[#101316] font-montserrat tracking-[-0.084px] leading-[24px]">
                        credit used
                      </div>
                    </>
                  )}
                  
                  <div className="text-[14px] font-medium text-[#101316] font-montserrat tracking-[-0.084px] leading-[24px] text-center">
                    action
                  </div>
                </div>

                {/* Table Rows */}
                {(() => {
                  let data;
                  if (activeReportTab === 'campaign') {
                    data = campaignReportsData;
                  } else if (activeReportTab === 'schedule') {
                    data = scheduledReportsData;
                  } else {
                    data = reportsData;
                  }
                  
                  return data.map((item) => (
                    <div key={item.id} className={`grid ${activeReportTab === 'campaign' ? 'grid-cols-10' : 'grid-cols-8'} gap-4 border-b border-[#f0f0f0] hover:bg-gray-50 transition-colors px-6 py-4`}>
                      {/* Date */}
                      <div className="text-[14px] font-medium text-[#757575] font-montserrat tracking-[-0.084px] leading-[24px]">
                        {item.date}
                      </div>
                      
                      {/* Campaign Reports Extended Structure */}
                      {activeReportTab === 'campaign' ? (
                        <>
                          {/* Sender ID */}
                          <div className="text-[14px] font-medium text-[#757575] font-montserrat tracking-[-0.084px] leading-[24px]">
                            {item.senderId}
                          </div>
                          
                          {/* Number */}
                          <div className="text-[14px] font-medium text-[#757575] font-montserrat tracking-[-0.084px] leading-[24px]">
                            {item.number}
                          </div>
                          
                          {/* SMS */}
                          <div className="text-[14px] font-medium text-[#757575] font-montserrat tracking-[-0.084px] leading-[24px]">
                            {item.sms}
                          </div>
                          
                          {/* Status */}
                          <div className="text-[14px] font-medium text-[#757575] font-montserrat tracking-[-0.084px] leading-[24px]">
                            <span className={`px-2 py-1 rounded-full text-xs ${
                              item.status === 'Delivered' ? 'bg-green-100 text-green-800' :
                              item.status === 'Failed' ? 'bg-red-100 text-red-800' :
                              'bg-yellow-100 text-yellow-800'
                            }`}>
                              {item.status}
                            </span>
                          </div>
                          
                          {/* Channel */}
                          <div className="text-[14px] font-medium text-[#757575] font-montserrat tracking-[-0.084px] leading-[24px]">
                            {item.channel}
                          </div>
                          
                          {/* Delivery Date */}
                          <div className="text-[14px] font-medium text-[#757575] font-montserrat tracking-[-0.084px] leading-[24px]">
                            {item.deliveryDate}
                          </div>
                          
                          {/* SMS Type */}
                          <div className="text-[14px] font-medium text-[#757575] font-montserrat tracking-[-0.084px] leading-[24px]">
                            {item.smsType}
                          </div>
                          
                          {/* Interface */}
                          <div className="text-[14px] font-medium text-[#757575] font-montserrat tracking-[-0.084px] leading-[24px]">
                            {item.interface}
                          </div>
                        </>
                      ) : (
                        <>
                          {/* Name */}
                          <div className="text-[14px] font-medium text-[#757575] font-montserrat tracking-[-0.084px] leading-[24px]">
                            {item.name}
                          </div>
                          
                          {/* Sender ID */}
                          <div className="text-[14px] font-medium text-[#757575] font-montserrat tracking-[-0.084px] leading-[24px]">
                            {item.senderId}
                          </div>
                          
                          {/* Message */}
                          <div className="text-[14px] font-medium text-[#757575] font-montserrat tracking-[-0.084px] leading-[24px]">
                            {item.message}
                          </div>
                          
                          {/* Interface */}
                          <div className="text-[14px] font-medium text-[#757575] font-montserrat tracking-[-0.084px] leading-[24px]">
                            <div className="space-y-1">
                              {Array.isArray(item.interface) ? item.interface.map((type, index) => (
                                <div key={index}>{type}</div>
                              )) : item.interface}
                            </div>
                          </div>
                          
                          {/* Channel */}
                          <div className="text-[14px] font-medium text-[#757575] font-montserrat tracking-[-0.084px] leading-[24px]">
                            {item.channel}
                          </div>
                          
                          {/* Credit Used */}
                          <div className="text-[14px] font-medium text-[#757575] font-montserrat tracking-[-0.084px] leading-[24px]">
                            {item.creditUsed}
                          </div>
                        </>
                      )}
                      
                      {/* Actions */}
                      <div className="flex items-center justify-center gap-1">
                        {/* Edit Button */}
                        <button
                          onClick={() => handleEditReport(item.id)}
                          className="w-[26px] h-[27px] flex items-center justify-center rounded-lg hover:bg-gray-100 transition-colors p-[5px]"
                          title="Edit report"
                        >
                          <Edit2 className="w-4 h-4 text-[#667085]" />
                        </button>
                        
                        {/* Delete Button */}
                        <button
                          onClick={() => handleDeleteReport(item.id)}
                          className="w-[26px] h-[27px] flex items-center justify-center rounded-lg hover:bg-gray-100 transition-colors p-[5px]"
                          title="Delete report"
                        >
                          <Trash2 className="w-4 h-4 text-[#667085]" />
                        </button>
                      </div>
                    </div>
                  ));
                })()}

                {/* Empty State */}
                {(() => {
                  let data;
                  if (activeReportTab === 'campaign') {
                    data = campaignReportsData;
                  } else if (activeReportTab === 'schedule') {
                    data = scheduledReportsData;
                  } else {
                    data = reportsData;
                  }
                  
                  return data.length === 0 && (
                    <div className="text-center py-12">
                      <p className="text-gray-500">No reports found</p>
                    </div>
                  );
                })()}
              </>
            )}
          </div>
        </div>
      )}

      {activeTab === 'blacklist' && (
        <div className="space-y-6">
          {/* Blacklist Table */}
          <div className="bg-white rounded-xl shadow-[0px_4px_120px_2px_rgba(0,0,0,0.25)] overflow-hidden">
            {/* Table Header */}
            <div className="grid grid-cols-3 gap-4 bg-white border-b border-[#e5e9eb]">
              {/* Numbers Header */}
              <div className="h-10 flex items-center px-6">
                <span className="text-[14px] font-semibold text-[#101316] font-montserrat tracking-[-0.084px] leading-[24px]">
                  Numbers
                </span>
              </div>
              
              {/* Emails Header */}
              <div className="h-10 flex items-center px-6">
                <span className="text-[14px] font-semibold text-[#101316] font-montserrat tracking-[-0.084px] leading-[24px]">
                  Emails
                </span>
              </div>
              
              {/* Actions Header */}
              <div className="h-10 flex items-center justify-center px-6">
                <span className="text-[12px] font-semibold text-[#84919a] font-inter tracking-[0.216px] leading-[16px] uppercase">
                  Actions
                </span>
              </div>
            </div>

            {/* Table Rows */}
            {blacklistData.map((item) => (
              <div key={item.id} className="grid grid-cols-3 gap-4 border-b border-[#f0f0f0] hover:bg-gray-50 transition-colors">
                {/* Number Cell */}
                <div className="flex items-center px-6 py-4">
                  <span className="text-[14px] font-normal text-[#252c32] font-inter tracking-[-0.084px] leading-[24px]">
                    {item.number}
                  </span>
                </div>
                
                {/* Email Cell */}
                <div className="flex items-center px-6 py-4">
                  <span className="text-[14px] font-normal text-[#252c32] font-inter tracking-[-0.084px] leading-[24px]">
                    {item.email}
                  </span>
                </div>
                
                {/* Actions Cell */}
                <div className="flex items-center justify-center gap-1 px-6 py-4">
                  {/* Edit Button */}
                  <button
                    onClick={() => handleEditBlacklistItem(item.id)}
                    className="w-[26px] h-[27px] flex items-center justify-center rounded-lg hover:bg-gray-100 transition-colors p-[5px]"
                    title="Edit item"
                  >
                    <Edit2 className="w-4 h-4 text-[#667085]" />
                  </button>
                  
                  {/* Delete Button */}
                  <button
                    onClick={() => handleDeleteBlacklistItem(item.id)}
                    className="w-[26px] h-[27px] flex items-center justify-center rounded-lg hover:bg-gray-100 transition-colors p-[5px]"
                    title="Delete item"
                  >
                    <Trash2 className="w-4 h-4 text-[#667085]" />
                  </button>
                </div>
              </div>
            ))}

            {/* Empty State */}
            {blacklistData.length === 0 && (
              <div className="text-center py-12">
                <p className="text-gray-500">No blacklisted numbers or emails found</p>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Action Buttons */}
      {(activeTab === 'sms' || activeTab === 'email') && (
        <div className="flex items-center justify-center gap-4 mt-12">
          {/* Save as Draft */}
          <button
            onClick={handleSaveDraft}
            className="bg-white border border-[#d0d5dd] text-black px-4 py-2.5 rounded-lg text-[14px] font-normal font-montserrat leading-[20px] shadow-[0px_1px_2px_0px_rgba(16,24,40,0.05)]"
          >
            save as draft
          </button>

          {/* View Drafts */}
          <button
            onClick={handleViewDrafts}
            className="bg-white border border-[#d0d5dd] text-black px-4 py-2.5 rounded-lg text-[14px] font-normal font-montserrat leading-[20px] shadow-[0px_1px_2px_0px_rgba(16,24,40,0.05)] flex items-center gap-2"
          >
            <Edit2 className="w-4 h-4" />
            view drafts ({drafts.length})
          </button>

          {/* Schedule for Later */}
          <button
            onClick={handleScheduleLater}
            className="bg-[#000aff] text-white px-4 py-2.5 rounded-lg flex items-center gap-2 text-[14px] font-normal font-montserrat leading-[20px] shadow-[0px_1px_2px_0px_rgba(16,24,40,0.05)]"
          >
            <Plus className="w-5 h-5" />
            schedule for later
          </button>

          {/* Send Now */}
          <button
            onClick={handleSendNow}
            className="bg-[#ef3826] text-black px-4 py-2.5 rounded-lg text-[14px] font-normal font-montserrat leading-[20px] shadow-[0px_1px_2px_0px_rgba(16,24,40,0.05)]"
          >
            send now
          </button>

          {/* Preview */}
          <button
            onClick={handlePreview}
            className="bg-black text-white px-4 py-3 rounded-3xl w-[270px] h-12 text-[16px] font-semibold font-montserrat text-center"
          >
            preview
          </button>
        </div>
      )}

      {/* Schedule Modal */}
      {showScheduleModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-[10px] shadow-[0px_4px_55px_-18px_rgba(0,0,0,0.4)] relative w-[900px] p-10">
            {/* Close Button */}
            <button
              onClick={handleCloseScheduleModal}
              className="absolute right-6 top-6 w-6 h-6 text-gray-500 hover:text-gray-700"
            >
              <X className="w-full h-full" />
            </button>

            {/* Title */}
            <h2 className="text-[28px] font-bold text-[#252c32] font-inter tracking-[-0.616px] leading-[48px] mb-8">
              Schedule {activeTab === 'sms' ? 'SMS' : 'Email'} Later
            </h2>

            {/* Date and Time Inputs */}
            <div className="flex gap-8 mb-8">
              {/* Date Input */}
              <div className="w-[285px]">
                <input
                  type="text"
                  value={scheduleData.date}
                  onChange={(e) => handleScheduleDataChange('date', e.target.value)}
                  className="w-full bg-white border border-[#d0d5dd] rounded-lg px-4 py-3 text-[16px] text-[#111111] font-montserrat font-semibold text-center shadow-[0px_1px_2px_0px_rgba(16,24,40,0.05)] focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="nov 11,2025"
                />
              </div>

              {/* Time Input */}
              <div className="w-[285px]">
                <input
                  type="text"
                  value={scheduleData.time}
                  onChange={(e) => handleScheduleDataChange('time', e.target.value)}
                  className="w-full bg-white border border-[#d0d5dd] rounded-lg px-4 py-3 text-[16px] text-[#111111] font-montserrat font-semibold text-center shadow-[0px_1px_2px_0px_rgba(16,24,40,0.05)] focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="8:45 pm"
                />
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center justify-center gap-4">
              {/* Schedule Now Button */}
              <button
                onClick={handleScheduleNow}
                className="bg-black text-white px-4 py-3 rounded-3xl w-[270px] h-12 text-[16px] font-semibold font-montserrat text-center"
              >
                schedule now
              </button>

              {/* Cancel Button */}
              <button
                onClick={handleCloseScheduleModal}
                className="bg-white border border-[#e4e4e4] text-black px-[51px] py-4 rounded-[100px] w-[209px] text-[16px] font-medium font-montserrat text-center"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Success Popup */}
      {showSuccessPopup && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg p-8 max-w-md mx-4">
            <div className="text-center">
              {/* Success Icon */}
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              
              {/* Success Message */}
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                {successMessage.title}
              </h3>
              
              <p className="text-gray-600 mb-4">
                {successMessage.description}
              </p>

              {/* Close Button */}
              <button
                onClick={() => setShowSuccessPopup(false)}
                className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition-colors"
              >
                OK
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Edit Blacklist Modal */}
      {showEditModal && editingItem && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg p-8 max-w-md mx-4 w-full">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-semibold text-gray-900">Edit Blacklist Item</h3>
              <button
                onClick={handleCancelEdit}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
            
            <div className="space-y-4">
              {/* Number Input */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Phone Number
                </label>
                <input
                  type="text"
                  value={editingItem.number}
                  onChange={(e) => handleEditItemChange('number', e.target.value)}
                  className="w-full bg-white border border-[#d0d5dd] rounded-lg px-4 py-3 text-[14px] text-[#667085] font-inter focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter phone number"
                />
              </div>

              {/* Email Input */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  value={editingItem.email}
                  onChange={(e) => handleEditItemChange('email', e.target.value)}
                  className="w-full bg-white border border-[#d0d5dd] rounded-lg px-4 py-3 text-[14px] text-[#667085] font-inter focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter email address"
                />
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center justify-end gap-4 mt-6">
              <button
                onClick={handleCancelEdit}
                className="bg-white border border-gray-300 text-gray-700 px-6 py-2 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleSaveEdit}
                className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {showDeleteConfirm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg p-8 max-w-md mx-4">
            <div className="text-center">
              {/* Warning Icon */}
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
                </svg>
              </div>
              
              {/* Confirmation Message */}
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Delete Blacklist Item
              </h3>
              
              <p className="text-gray-600 mb-6">
                Are you sure you want to delete this item from the blacklist? This action cannot be undone.
              </p>

              {/* Action Buttons */}
              <div className="flex items-center justify-center gap-4">
                <button
                  onClick={handleCancelDelete}
                  className="bg-white border border-gray-300 text-gray-700 px-6 py-2 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleConfirmDelete}
                  className="bg-red-600 text-white px-6 py-2 rounded-lg hover:bg-red-700 transition-colors"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Edit Report Modal */}
      {showEditReportModal && editingReport && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg p-8 max-w-2xl mx-4 w-full">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-semibold text-gray-900">Edit Report</h3>
              <button
                onClick={handleCancelReportEdit}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
            
            <div className="grid grid-cols-2 gap-6">
              {/* Left Column */}
              <div className="space-y-4">
                {/* Date Input */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Date
                  </label>
                  <input
                    type="text"
                    value={editingReport.date}
                    onChange={(e) => handleEditReportChange('date', e.target.value)}
                    className="w-full bg-white border border-[#d0d5dd] rounded-lg px-4 py-3 text-[14px] text-[#667085] font-inter focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter date"
                  />
                </div>

                {/* Name Input */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Name
                  </label>
                  <input
                    type="text"
                    value={editingReport.name}
                    onChange={(e) => handleEditReportChange('name', e.target.value)}
                    className="w-full bg-white border border-[#d0d5dd] rounded-lg px-4 py-3 text-[14px] text-[#667085] font-inter focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter name"
                  />
                </div>

                {/* Sender ID Input */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Sender ID
                  </label>
                  <input
                    type="text"
                    value={editingReport.senderId}
                    onChange={(e) => handleEditReportChange('senderId', e.target.value)}
                    className="w-full bg-white border border-[#d0d5dd] rounded-lg px-4 py-3 text-[14px] text-[#667085] font-inter focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter sender ID"
                  />
                </div>
              </div>

              {/* Right Column */}
              <div className="space-y-4">
                {/* Message Input */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Message
                  </label>
                  <input
                    type="text"
                    value={editingReport.message}
                    onChange={(e) => handleEditReportChange('message', e.target.value)}
                    className="w-full bg-white border border-[#d0d5dd] rounded-lg px-4 py-3 text-[14px] text-[#667085] font-inter focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter message"
                  />
                </div>

                {/* Channel Input */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Channel
                  </label>
                  <input
                    type="text"
                    value={editingReport.channel}
                    onChange={(e) => handleEditReportChange('channel', e.target.value)}
                    className="w-full bg-white border border-[#d0d5dd] rounded-lg px-4 py-3 text-[14px] text-[#667085] font-inter focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter channel"
                  />
                </div>

                {/* Credit Used Input */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Credit Used
                  </label>
                  <input
                    type="number"
                    value={editingReport.creditUsed}
                    onChange={(e) => handleEditReportChange('creditUsed', parseInt(e.target.value) || 0)}
                    className="w-full bg-white border border-[#d0d5dd] rounded-lg px-4 py-3 text-[14px] text-[#667085] font-inter focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter credit used"
                  />
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center justify-end gap-4 mt-6">
              <button
                onClick={handleCancelReportEdit}
                className="bg-white border border-gray-300 text-gray-700 px-6 py-2 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleSaveReportEdit}
                className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Report Confirmation Modal */}
      {showDeleteReportConfirm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg p-8 max-w-md mx-4">
            <div className="text-center">
              {/* Warning Icon */}
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
                </svg>
              </div>
              
              {/* Confirmation Message */}
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Delete Report
              </h3>
              
              <p className="text-gray-600 mb-6">
                Are you sure you want to delete this report? This action cannot be undone.
              </p>

              {/* Action Buttons */}
              <div className="flex items-center justify-center gap-4">
                <button
                  onClick={handleCancelDeleteReport}
                  className="bg-white border border-gray-300 text-gray-700 px-6 py-2 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleConfirmDeleteReport}
                  className="bg-red-600 text-white px-6 py-2 rounded-lg hover:bg-red-700 transition-colors"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Drafts Modal */}
      {showDraftsModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-xl w-[90%] max-w-4xl max-h-[80vh] overflow-y-auto">
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b">
              <h2 className="text-[20px] font-bold font-montserrat text-[#252C32]">
                SMS/email Drafts
              </h2>
              <button
                onClick={() => setShowDraftsModal(false)}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Drafts List */}
            <div className="p-6">
              {drafts.length === 0 ? (
                <div className="text-center py-12">
                  <p className="text-gray-500 text-[16px] font-montserrat">No drafts found</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {drafts.map((draft) => (
                    <div
                      key={draft.id}
                      className="border border-[#e5e9eb] rounded-lg p-4 hover:bg-gray-50 transition-colors"
                    >
                      {/* Draft Header */}
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-3">
                          <h3 className="text-[20px] font-bold font-montserrat text-[#252C32]">
                            {draft.name}
                          </h3>
                          <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full font-medium">
                            {draft.type.toUpperCase()}
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          {/* Edit Draft Button */}
                          <button
                            onClick={() => handleEditDraft(draft)}
                            className="w-[26px] h-[27px] flex items-center justify-center rounded-lg hover:bg-gray-100 transition-colors p-[5px]"
                            title="Edit draft"
                          >
                            <Edit2 className="w-4 h-4 text-[#667085]" />
                          </button>
                          
                          {/* Delete Draft Button */}
                          <button
                            onClick={() => handleDeleteDraft(draft.id)}
                            className="w-[26px] h-[27px] flex items-center justify-center rounded-lg hover:bg-gray-100 transition-colors p-[5px]"
                            title="Delete draft"
                          >
                            <Trash2 className="w-4 h-4 text-[#667085]" />
                          </button>
                        </div>
                      </div>

                      {/* Draft Details */}
                      <div className="grid grid-cols-2 gap-4 mb-3">
                        <div>
                          <p className="text-[14px] font-semibold font-inter text-[#344054] mb-1">
                            Campaign Name
                          </p>
                          <p className="text-[14px] font-inter text-[#667085]">
                            {draft.data.campaignName}
                          </p>
                        </div>
                        <div>
                          <p className="text-[14px] font-semibold font-inter text-[#344054] mb-1">
                            Channel
                          </p>
                          <p className="text-[14px] font-inter text-[#667085]">
                            {draft.data.messageChannel}
                          </p>
                        </div>
                        <div>
                          <p className="text-[14px] font-semibold font-inter text-[#344054] mb-1">
                            {draft.type === 'sms' ? 'Numbers' : 'Emails'}
                          </p>
                          <p className="text-[14px] font-inter text-[#667085] truncate">
                            {draft.type === 'sms' ? draft.data.numbers : draft.data.emails}
                          </p>
                        </div>
                        <div>
                          <p className="text-[14px] font-semibold font-inter text-[#344054] mb-1">
                            Last Updated
                          </p>
                          <p className="text-[14px] font-inter text-[#667085]">
                            {draft.updatedAt}
                          </p>
                        </div>
                      </div>

                      {/* Message Preview */}
                      {draft.data.messageText && (
                        <div className="mb-3">
                          <p className="text-[14px] font-semibold font-inter text-[#344054] mb-1">
                            Message Preview
                          </p>
                          <p className="text-[14px] font-inter text-[#667085] bg-gray-50 p-2 rounded border">
                            {draft.data.messageText.length > 100 
                              ? draft.data.messageText.substring(0, 100) + '...' 
                              : draft.data.messageText}
                          </p>
                        </div>
                      )}

                      {/* Character Count */}
                      <div className="flex items-center justify-between">
                        <p className="text-[14px] font-medium font-montserrat text-[#344054]">
                          {draft.data.characterCount} Characters Used
                        </p>
                        
                        {/* Load Draft Button */}
                        <button
                          onClick={() => handleLoadDraft(draft)}
                          className="bg-[#ef3826] text-black px-4 py-2 rounded-lg text-[14px] font-montserrat hover:bg-[#d32f20] transition-colors"
                        >
                          Load Draft
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Draft Delete Confirmation Modal */}
      {showDraftDeleteConfirm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-xl p-6 w-[400px]">
            {/* Header */}
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">Confirm Delete</h3>
              <button
                onClick={handleCancelDeleteDraft}
                className="p-1 hover:bg-gray-100 rounded"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Content */}
            <div className="space-y-4">
              <p className="text-gray-600">
                Are you sure you want to delete this draft? This action cannot be undone.
              </p>

              {/* Action Buttons */}
              <div className="flex items-center justify-center gap-4">
                <button
                  onClick={handleCancelDeleteDraft}
                  className="bg-white border border-gray-300 text-gray-700 px-6 py-2 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleConfirmDeleteDraft}
                  className="bg-red-600 text-white px-6 py-2 rounded-lg hover:bg-red-700 transition-colors"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Draft Edit Modal */}
      {editingDraft && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-xl w-[90%] max-w-2xl max-h-[80vh] overflow-y-auto">
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b">
              <h2 className="text-[18px] font-semibold font-montserrat text-[#252C32]">
                Edit Draft: {editingDraft.name}
              </h2>
              <button
                onClick={handleCancelDraftEdit}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Edit Form */}
            <div className="p-6 space-y-4">
              {/* Draft Name */}
              <div>
                <label className="block text-[14px] font-semibold font-inter text-[#344054] mb-1">
                  Draft Name
                </label>
                <input
                  type="text"
                  value={editingDraft.name}
                  onChange={(e) => setEditingDraft(prev => ({ ...prev, name: e.target.value }))}
                  className="w-full px-3 py-2 border border-[#d0d5dd] rounded-[5px] text-[14px] font-inter focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              {/* Campaign Name */}
              <div>
                <label className="block text-[14px] font-semibold font-inter text-[#344054] mb-1">
                  Campaign Name
                </label>
                <input
                  type="text"
                  value={editingDraft.data.campaignName}
                  onChange={(e) => setEditingDraft(prev => ({ 
                    ...prev, 
                    data: { ...prev.data, campaignName: e.target.value }
                  }))}
                  className="w-full px-3 py-2 border border-[#d0d5dd] rounded-[5px] text-[14px] font-inter focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              {/* Message Text */}
              <div>
                <label className="block text-[14px] font-semibold font-inter text-[#344054] mb-1">
                  Message Text
                </label>
                <textarea
                  value={editingDraft.data.messageText}
                  onChange={(e) => setEditingDraft(prev => ({ 
                    ...prev, 
                    data: { 
                      ...prev.data, 
                      messageText: e.target.value,
                      characterCount: e.target.value.length
                    }
                  }))}
                  rows={4}
                  className="w-full px-3 py-2 border border-[#d0d5dd] rounded-[5px] text-[14px] font-inter focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                />
                <p className="text-[12px] text-gray-500 mt-1">
                  {editingDraft.data.characterCount} characters
                </p>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center justify-end gap-4 pt-4">
                <button
                  onClick={handleCancelDraftEdit}
                  className="bg-white border border-gray-300 text-gray-700 px-6 py-2 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSaveDraftEdit}
                  className="bg-[#ef3826] text-black px-6 py-2 rounded-lg hover:bg-[#d32f20] transition-colors"
                >
                  Save Changes
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Send Confirmation Modal */}
      {showSendConfirm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-[0px_4px_120px_2px_rgba(0,0,0,0.25)] w-[420px] relative">
            {/* Close Button */}
            <button
              onClick={handleCancelSend}
              className="absolute top-[33px] right-[33px] w-6 h-6 flex items-center justify-center hover:bg-gray-100 rounded transition-colors z-10"
            >
              <X className="w-4 h-4 text-gray-600" />
            </button>

            {/* Content */}
            <div className="p-8 text-center">
              {/* Confirmation Message */}
              <h3 className="text-[18px] font-bold font-montserrat text-black leading-[22px] tracking-[-0.41px] mb-8">
                are you sure you want to send this {activeTab === 'sms' ? 'SMS' : 'email'}
              </h3>

              {/* Action Buttons */}
              <div className="flex items-center justify-center gap-4">
                {/* Yes Button */}
                <button
                  onClick={handleConfirmSend}
                  className="bg-black text-white px-[51px] py-4 rounded-3xl h-12 text-[16px] font-semibold font-montserrat min-w-[149px] hover:bg-gray-800 transition-colors"
                >
                  yes
                </button>

                {/* Cancel Button */}
                <button
                  onClick={handleCancelSend}
                  className="bg-white border border-[#e4e4e4] text-black px-[51px] py-4 rounded-[100px] text-[16px] font-medium font-montserrat min-w-[149px] hover:bg-gray-50 transition-colors"
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
});

BulkSMS.displayName = 'BulkSMS';

export default BulkSMS;
