import React, { useState, useCallback, useMemo, memo } from 'react';
import { Upload, Eye, Edit, Trash2, Send, Save, Plus, X } from 'lucide-react';

/**
 * Send Notification In App Component
 * 
 * A comprehensive admin interface for sending in-app notifications.
 * Based on the Figma design, this component provides:
 * - Create and send immediate notifications
 * - Upload optional notification images
 * - Configure deep links for navigation
 * - Target specific platforms (Android/iOS)
 * - Preview notifications before sending
 * - Stack notifications for later delivery
 * - Manage saved notification templates
 * 
 * Performance Optimizations:
 * - Memoized callbacks to prevent unnecessary re-renders
 * - Optimized state structure
 * - Efficient component updates
 */
const SendNotificationInApp = memo(() => {
  // Notification form state
  const [notificationForm, setNotificationForm] = useState({
    title: '',
    message: '',
    image: null,
    imagePreview: null,
    deepLink: '',
    targetPlatform: 'android/ios'
  });

  // Stacked notifications for later sending
  const [stackedNotifications, setStackedNotifications] = useState([
    {
      id: 1,
      title: 'Account Services',
      message: 'Manage account and services linked to your Yoraa account',
      targetPlatform: 'android/ios',
      createdAt: new Date().toISOString(),
      status: 'pending'
    },
    {
      id: 2,
      title: 'Account Services',
      message: 'Manage account and services linked to your Yoraa account',
      targetPlatform: 'android/ios',
      createdAt: new Date().toISOString(),
      status: 'pending'
    },
    {
      id: 3,
      title: 'Account Services',
      message: 'Manage account and services linked to your Yoraa account',
      targetPlatform: 'android/ios',
      createdAt: new Date().toISOString(),
      status: 'pending'
    },
    {
      id: 4,
      title: 'Account Services',
      message: 'Manage account and services linked to your Yoraa account',
      targetPlatform: 'android/ios',
      createdAt: new Date().toISOString(),
      status: 'pending'
    }
  ]);

  // Modal states
  const [modalStates, setModalStates] = useState({
    isPreviewOpen: false,
    isEditModalOpen: false,
    selectedNotification: null
  });

  // Handle form input changes
  const handleInputChange = useCallback((field, value) => {
    setNotificationForm(prev => ({
      ...prev,
      [field]: value
    }));
  }, []);

  // Handle image upload
  const handleImageUpload = useCallback((event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setNotificationForm(prev => ({
          ...prev,
          image: file,
          imagePreview: e.target.result
        }));
      };
      reader.readAsDataURL(file);
    }
  }, []);

  // Handle remove image
  const handleRemoveImage = useCallback(() => {
    setNotificationForm(prev => ({
      ...prev,
      image: null,
      imagePreview: null
    }));
  }, []);

  // Handle save for later
  const handleSaveForLater = useCallback(() => {
    if (!notificationForm.message) {
      alert('Please fill in the message field');
      return;
    }

    const newNotification = {
      id: Date.now(),
      title: notificationForm.title,
      message: notificationForm.message,
      image: notificationForm.image,
      imagePreview: notificationForm.imagePreview,
      deepLink: notificationForm.deepLink,
      targetPlatform: notificationForm.targetPlatform,
      createdAt: new Date().toISOString(),
      status: 'pending'
    };

    setStackedNotifications(prev => [...prev, newNotification]);
    
    // Reset form
    setNotificationForm({
      title: '',
      message: '',
      image: null,
      imagePreview: null,
      deepLink: '',
      targetPlatform: 'android/ios'
    });

    alert('Notification saved for later!');
  }, [notificationForm]);

  // Handle send now
  const handleSendNow = useCallback(() => {
    if (!notificationForm.message) {
      alert('Please fill in the message field');
      return;
    }

    console.log('Sending notification now:', notificationForm);
    alert('Notification sent successfully!');
    
    // Reset form
    setNotificationForm({
      title: '',
      message: '',
      image: null,
      imagePreview: null,
      deepLink: '',
      targetPlatform: 'android/ios'
    });
  }, [notificationForm]);

  // Handle send stacked notification
  const handleSendStackedNotification = useCallback((notificationId) => {
    const notification = stackedNotifications.find(n => n.id === notificationId);
    if (notification) {
      console.log('Sending stacked notification:', notification);
      setStackedNotifications(prev => 
        prev.map(n => 
          n.id === notificationId 
            ? { ...n, status: 'sent', sentAt: new Date().toISOString() }
            : n
        )
      );
      alert('Notification sent successfully!');
    }
  }, [stackedNotifications]);

  // Handle edit stacked notification
  const handleEditStackedNotification = useCallback((notification) => {
    setNotificationForm({
      title: notification.title,
      message: notification.message,
      image: notification.image,
      imagePreview: notification.imagePreview,
      deepLink: notification.deepLink || '',
      targetPlatform: notification.targetPlatform
    });
    
    // Remove from stacked notifications
    setStackedNotifications(prev => prev.filter(n => n.id !== notification.id));
  }, []);

  // Handle delete stacked notification
  const handleDeleteStackedNotification = useCallback((notificationId) => {
    setStackedNotifications(prev => prev.filter(n => n.id !== notificationId));
  }, []);

  // Handle preview
  const handlePreview = useCallback(() => {
    setModalStates(prev => ({ ...prev, isPreviewOpen: true }));
  }, []);

  const closePreview = useCallback(() => {
    setModalStates(prev => ({ ...prev, isPreviewOpen: false }));
  }, []);

  // Check if form is valid
  const isFormValid = useMemo(() => {
    return notificationForm.message.trim();
  }, [notificationForm.message]);

  return (
    <div className="min-h-screen bg-white p-6">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Notification Form (2/3 width) */}
          <div className="lg:col-span-2 space-y-6">
            {/* Notification Form */}
            <div className="space-y-6">
              <div>
                <h2 className="text-lg font-semibold text-gray-900 mb-4">Notification</h2>
                
                {/* Message Input */}
                <div className="mb-4">
                  <textarea
                    value={notificationForm.message}
                    onChange={(e) => handleInputChange('message', e.target.value)}
                    rows={4}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                    placeholder="Your title"
                  />
                </div>
              </div>

              {/* Notification Image Upload */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Notification image(optional)
                </label>
                
                {notificationForm.imagePreview ? (
                  <div className="relative">
                    <img
                      src={notificationForm.imagePreview}
                      alt="Notification preview"
                      className="w-full h-32 object-cover rounded-lg border"
                    />
                    <button
                      onClick={handleRemoveImage}
                      className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  </div>
                ) : (
                  <div className="space-y-3">
                    <div className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2 w-fit">
                      <label className="cursor-pointer flex items-center gap-2">
                        <Upload className="h-4 w-4" />
                        Upload Image
                        <input
                          type="file"
                          accept="image/*"
                          onChange={handleImageUpload}
                          className="hidden"
                        />
                      </label>
                    </div>
                    <div className="border border-gray-200 rounded p-4 bg-gray-50 w-16 h-12">
                      <div className="w-8 h-6 border-2 border-gray-300 rounded mx-auto"></div>
                    </div>
                  </div>
                )}
              </div>

              {/* Deep Link */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Deeplink(optional) eg yoraa/product/123
                </label>
                <input
                  type="text"
                  value={notificationForm.deepLink}
                  onChange={(e) => handleInputChange('deepLink', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                  placeholder="enter Deeplink eg yoraa/product/123"
                />
              </div>

              {/* Target Platform */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Target platform
                </label>
                <input
                  type="text"
                  value={notificationForm.targetPlatform}
                  onChange={(e) => handleInputChange('targetPlatform', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                  placeholder="android/ios"
                />
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3 pt-4">
                <button
                  onClick={handleSaveForLater}
                  disabled={!isFormValid}
                  className="bg-gray-200 text-gray-800 px-6 py-2 rounded-lg hover:bg-gray-300 transition-colors disabled:opacity-50 disabled:cursor-not-allowed text-sm"
                >
                  save for later
                </button>
                <button
                  onClick={handleSendNow}
                  disabled={!isFormValid}
                  className="bg-black text-white px-8 py-2 rounded-lg hover:bg-gray-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed text-sm"
                >
                  send Now
                </button>
              </div>
            </div>

            {/* Stacked Notifications */}
            <div className="mt-8">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Stack notification for later</h2>
              
              <div className="space-y-3">
                {stackedNotifications.map((notification) => (
                  <div key={notification.id} className="flex items-center justify-between p-3 border rounded-lg bg-gray-50">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-black text-white rounded-full flex items-center justify-center text-sm font-semibold">
                        i
                      </div>
                      <div>
                        <p className="text-sm text-gray-700">{notification.message}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => handleSendStackedNotification(notification.id)}
                        disabled={notification.status === 'sent'}
                        className={`px-4 py-1 rounded text-sm transition-colors ${
                          notification.status === 'sent'
                            ? 'bg-green-100 text-green-800 cursor-not-allowed'
                            : 'bg-black text-white hover:bg-gray-800'
                        }`}
                      >
                        {notification.status === 'sent' ? 'Sent' : 'send Now'}
                      </button>
                      <button
                        onClick={() => handleEditStackedNotification(notification)}
                        className="text-gray-600 hover:text-blue-600 p-1"
                      >
                        <Edit className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => handleDeleteStackedNotification(notification.id)}
                        className="text-gray-600 hover:text-red-600 p-1"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column - Preview (1/3 width) */}
          <div className="lg:col-span-1">
            <div className="sticky top-6">
              <div className="bg-white rounded-lg border p-6">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-lg font-semibold text-gray-900">Preview</h2>
                  <button
                    onClick={handlePreview}
                    className="bg-black text-white px-3 py-1 rounded-full text-sm flex items-center gap-1"
                  >
                    <Eye className="h-3 w-3" />
                    1
                  </button>
                </div>
                
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center min-h-[300px] flex items-center justify-center">
                  {notificationForm.imagePreview ? (
                    <div className="space-y-4">
                      <img
                        src={notificationForm.imagePreview}
                        alt="Preview"
                        className="max-w-full h-32 object-contain mx-auto"
                      />
                      {notificationForm.message && (
                        <p className="text-gray-600 text-sm">{notificationForm.message}</p>
                      )}
                    </div>
                  ) : (
                    <div className="space-y-4">
                      <div className="w-16 h-16 border-2 border-blue-600 rounded-lg mx-auto flex items-center justify-center">
                        <div className="w-8 h-6 border-2 border-blue-600 rounded"></div>
                      </div>
                      {notificationForm.message && (
                        <p className="text-gray-600 text-sm">{notificationForm.message}</p>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Preview Modal */}
      {modalStates.isPreviewOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-md w-full">
            <div className="flex items-center justify-between p-4 border-b">
              <h3 className="text-lg font-semibold text-gray-900">Notification Preview</h3>
              <button
                onClick={closePreview}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="h-6 w-6" />
              </button>
            </div>
            
            <div className="p-6">
              <div className="bg-gray-100 rounded-lg p-4 space-y-3">
                {notificationForm.imagePreview && (
                  <img
                    src={notificationForm.imagePreview}
                    alt="Notification"
                    className="w-full h-32 object-cover rounded"
                  />
                )}
                <div>
                  <p className="text-gray-600 text-sm mt-1">{notificationForm.message || 'Notification message will appear here'}</p>
                </div>
                {notificationForm.deepLink && (
                  <div className="text-xs text-blue-600 bg-blue-50 p-2 rounded">
                    Deep Link: {notificationForm.deepLink}
                  </div>
                )}
                <div className="text-xs text-gray-500">
                  Platform: {notificationForm.targetPlatform}
                </div>
              </div>
            </div>
            
            <div className="flex justify-end gap-3 p-4 border-t">
              <button
                onClick={closePreview}
                className="px-4 py-2 text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
});

SendNotificationInApp.displayName = 'SendNotificationInApp';

export default SendNotificationInApp;
