import React, { useState, useCallback, memo } from 'react';
import { Download, Share2, Plus, Upload, ArrowLeft, X } from 'lucide-react';

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
  
  // Modal states
  const [showScheduleModal, setShowScheduleModal] = useState(false);
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);
  const [scheduleData, setScheduleData] = useState({
    date: 'nov 11,2025',
    time: '8:45 pm'
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
    console.log('Saving as draft');
  }, []);

  const handleScheduleLater = useCallback(() => {
    setShowScheduleModal(true);
  }, []);

  const handleScheduleNow = useCallback(() => {
    setShowScheduleModal(false);
    setShowSuccessPopup(true);
    console.log('Scheduling message for:', scheduleData);
    
    // Auto-hide success popup after 3 seconds
    setTimeout(() => {
      setShowSuccessPopup(false);
    }, 3000);
  }, [scheduleData]);

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
    console.log('Sending SMS now');
  }, []);

  const handlePreview = useCallback(() => {
    console.log('Previewing message');
  }, []);

  const tabs = [
    { id: 'sms', label: 'Send SMS' },
    { id: 'email', label: 'Send email' },
    { id: 'reports', label: 'reports' },
    { id: 'blacklist', label: 'black list numbers' }
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
        <div className="text-center py-12">
          <p className="text-gray-500">Reports and analytics will be displayed here</p>
        </div>
      )}

      {activeTab === 'blacklist' && (
        <div className="text-center py-12">
          <p className="text-gray-500">Black list numbers management will be implemented here</p>
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
                {activeTab === 'sms' ? 'SMS' : 'Email'} Scheduled Successfully!
              </h3>
              
              <p className="text-gray-600 mb-4">
                Your {activeTab === 'sms' ? 'SMS' : 'email'} has been scheduled for {scheduleData.date} at {scheduleData.time}
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
    </div>
  );
});

BulkSMS.displayName = 'BulkSMS';

export default BulkSMS;
