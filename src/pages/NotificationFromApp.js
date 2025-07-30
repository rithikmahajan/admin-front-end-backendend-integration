import React, { useState } from 'react';
import { X, Check, ArrowLeft } from 'lucide-react';

const NotificationFromApp = () => {
  const [viewMode, setViewMode] = useState('summary'); // 'summary' or 'full'
  
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      title: 'Manage',
      price: 'rs 170',
      status: 'sold',
      date: 'Nov 7 2025',
      time: '10:50 pm',
      image: '/api/placeholder/61/65',
      isRead: false
    },
    {
      id: 2,
      title: 'Manage',
      price: 'rs 170',
      status: 'ordered',
      date: 'Nov 7 2025',
      time: '10:50 pm',
      image: '/api/placeholder/61/65',
      isRead: false
    },
    {
      id: 3,
      title: 'Manage',
      price: 'rs 170',
      status: 'shipped',
      date: 'Nov 7 2025',
      time: '10:50 pm',
      image: '/api/placeholder/61/65',
      isRead: false
    },
    {
      id: 4,
      title: 'Manage',
      price: 'rs 170',
      status: 'sold',
      date: 'Nov 7 2025',
      time: '9:30 pm',
      image: '/api/placeholder/61/65',
      isRead: false
    },
    {
      id: 5,
      title: 'Manage',
      price: 'rs 170',
      status: 'ordered',
      date: 'Nov 7 2025',
      time: '8:15 pm',
      image: '/api/placeholder/61/65',
      isRead: false
    },
    {
      id: 6,
      title: 'Manage',
      price: 'rs 170',
      status: 'shipped',
      date: 'Nov 7 2025',
      time: '7:45 pm',
      image: '/api/placeholder/61/65',
      isRead: false
    }
  ]);

  const handleViewAllNotifications = () => {
    setViewMode('full');
  };

  const handleGoBack = () => {
    setViewMode('summary');
  };

  const handleMarkAsRead = (notificationId) => {
    setNotifications(prev => 
      prev.map(notification => 
        notification.id === notificationId 
          ? { ...notification, isRead: true }
          : notification
      )
    );
  };

  const handleMarkAllAsRead = () => {
    setNotifications(prev => 
      prev.map(notification => ({ ...notification, isRead: true }))
    );
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'sold':
        return 'bg-black text-white';
      case 'ordered':
        return 'bg-black text-white';
      case 'shipped':
        return 'bg-black text-white';
      default:
        return 'bg-gray-500 text-white';
    }
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      {viewMode === 'summary' ? (
        // Summary View (Original notification popup)
        <div className="max-w-7xl mx-auto bg-white rounded-xl shadow-lg overflow-hidden">
          {/* Header */}
          <div className="p-6 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <h1 className="text-2xl font-bold text-gray-900">notifications from app</h1>
              <button
                onClick={handleMarkAllAsRead}
                className="text-gray-600 hover:text-gray-800 font-medium text-lg transition-colors"
              >
                Mark As Read
              </button>
            </div>
          </div>

          {/* Notifications Container */}
          <div className="p-6">
            <div className="bg-white rounded-2xl p-4 shadow-lg max-w-lg mx-auto">
              
              {/* Notifications Header */}
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-gray-900">notifications</h2>
                <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                  <X className="h-5 w-5 text-gray-600" />
                </button>
              </div>

              {/* Notifications List */}
              <div className="space-y-3">
                {notifications.slice(0, 3).map((notification) => (
                  <div 
                    key={notification.id}
                    className="bg-white rounded-xl shadow-md p-4 relative border border-gray-100"
                  >
                    {/* Mark as read checkbox */}
                    <div className="absolute top-4 right-4">
                      <button
                        onClick={() => handleMarkAsRead(notification.id)}
                        className={`w-5 h-5 rounded border-2 border-gray-300 flex items-center justify-center transition-colors ${
                          notification.isRead 
                            ? 'bg-green-500 border-green-500' 
                            : 'bg-white hover:bg-gray-50'
                        }`}
                      >
                        {notification.isRead && (
                          <Check className="h-3 w-3 text-white" />
                        )}
                      </button>
                    </div>

                    <div className="flex items-start space-x-4">
                      {/* Product Image */}
                      <div className="w-16 h-16 bg-gray-200 rounded-lg overflow-hidden flex-shrink-0">
                        <img
                          src={notification.image}
                          alt="Product"
                          className="w-full h-full object-cover"
                        />
                      </div>

                      {/* Notification Content */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <h3 className="text-base font-medium text-gray-900 mb-1">
                              {notification.title}
                            </h3>
                            <p className="text-base text-gray-900 mb-2">
                              {notification.price}
                            </p>
                            <p className="text-sm text-gray-500">
                              {notification.date}
                            </p>
                          </div>

                          {/* Status Badge */}
                          <div className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(notification.status)}`}>
                            {notification.status}
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Time */}
                    <div className="absolute bottom-4 right-16">
                      <span className="text-xs text-gray-400">
                        {notification.time}
                      </span>
                    </div>
                  </div>
                ))}
              </div>

              {/* View All Notifications Link */}
              <div className="mt-6 text-center">
                <button 
                  onClick={handleViewAllNotifications}
                  className="text-red-500 font-bold text-lg hover:text-red-600 transition-colors"
                >
                  View All notifications
                </button>
              </div>
            </div>
          </div>
        </div>
      ) : (
        // Full View (All notifications screen as per Figma)
        <div className="max-w-7xl mx-auto bg-white min-h-screen">
          {/* Header */}
          <div className="p-6 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <button
                  onClick={handleGoBack}
                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <ArrowLeft className="h-5 w-5 text-gray-600" />
                </button>
                <div>
                  <span className="text-red-500 font-medium">All notifications</span>
                  <button
                    onClick={handleGoBack}
                    className="ml-8 text-gray-600 hover:text-gray-800 transition-colors"
                  >
                    go back
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Full Notifications List */}
          <div className="p-6">
            <h1 className="text-2xl font-bold text-gray-900 mb-6">notifications</h1>
            
            <div className="space-y-3 max-w-2xl">
              {notifications.map((notification) => (
                <div 
                  key={notification.id}
                  className="bg-white rounded-lg p-4 border border-gray-200 hover:shadow-sm transition-shadow"
                >
                  <div className="flex items-center space-x-4">
                    {/* Product Image */}
                    <div className="w-16 h-16 bg-gray-200 rounded-lg overflow-hidden flex-shrink-0">
                      <img
                        src={notification.image}
                        alt="Product"
                        className="w-full h-full object-cover"
                      />
                    </div>

                    {/* Notification Content */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <div className="flex-1">
                          <h3 className="text-base font-medium text-gray-900">
                            {notification.title}
                          </h3>
                          <p className="text-base text-gray-900">
                            {notification.price}
                          </p>
                          <p className="text-sm text-gray-500">
                            {notification.date}
                          </p>
                        </div>

                        {/* Status Badge */}
                        <div className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(notification.status)}`}>
                          {notification.status}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default NotificationFromApp;
