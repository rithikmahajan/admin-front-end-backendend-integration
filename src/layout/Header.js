import React, { useCallback } from 'react';
import { Search, MessageSquare, Bell, User, Menu, X } from 'lucide-react';

/**
 * Header Component
 * 
 * Top navigation bar for the admin dashboard providing:
 * - Brand logo/title
 * - Global search functionality
 * - Quick action buttons (messages, notifications, profile)
 * - Responsive design with mobile sidebar toggle
 * 
 * Performance Optimizations:
 * - React.memo to prevent unnecessary re-renders
 * - useCallback for event handlers
 * - Optimized icon rendering
 * - Proper accessibility attributes
 */
const Header = React.memo(({ setSidebarOpen, onToggleSidebarVisibility, sidebarHidden }) => {
  // Handle search functionality
  const handleSearch = useCallback((e) => {
    e.preventDefault();
    const searchTerm = e.target.search.value;
    console.log('Searching for:', searchTerm);
    // TODO: Implement global search functionality
  }, []);

  // Handle quick action clicks
  const handleMessageClick = useCallback(() => {
    console.log('Opening messages');
    // TODO: Navigate to messages or open message modal
  }, []);

  const handleNotificationClick = useCallback(() => {
    console.log('Opening notifications');
    // TODO: Show notifications dropdown or modal
  }, []);

  const handleProfileClick = useCallback(() => {
    console.log('Opening profile');
    // TODO: Navigate to profile or show profile dropdown
  }, []);

  // Handle sidebar visibility toggle
  const handleSidebarVisibilityToggle = useCallback(() => {
    onToggleSidebarVisibility();
  }, [onToggleSidebarVisibility]);

  return (
    <header className="bg-white h-[60px] w-full max-w-[1920px] relative shadow-sm">
      <div className="flex items-center justify-between h-full px-16">
        
        {/* Left side - Brand Logo and Sidebar Toggle */}
        <div className="flex items-center space-x-4">
          {/* Sidebar Toggle Button */}
          <button
            onClick={handleSidebarVisibilityToggle}
            className="w-[40px] h-[40px] bg-gray-100 hover:bg-gray-200 rounded-lg flex items-center justify-center transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
            aria-label={sidebarHidden ? "Show sidebar" : "Hide sidebar"}
            title={sidebarHidden ? "Show sidebar" : "Hide sidebar"}
          >
            {sidebarHidden ? (
              <Menu className="w-5 h-5 text-gray-600" />
            ) : (
              <X className="w-5 h-5 text-gray-600" />
            )}
          </button>
          
          {/* Brand Logo */}
          <div className="text-2xl font-bold text-black tracking-wide">
            YORAA
          </div>
        </div>

        {/* Center - Global Search Form */}
        <div className="absolute left-1/2 transform -translate-x-1/2">
          <form onSubmit={handleSearch} className="relative w-40">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-[26px] w-[26px] text-gray-400" />
            </div>
            <input
              type="text"
              name="search"
              placeholder="Search..."
              className="block w-full pl-12 pr-3 py-3 border border-gray-300 rounded-3xl leading-5 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm transition-all duration-200"
              aria-label="Global search"
            />
          </form>
        </div>

        {/* Right side - Action Icons */}
        <div className="flex items-center space-x-4">
          
          {/* Messages/Chat Button */}
          <button 
            onClick={handleMessageClick}
            className="w-[33px] h-[33px] bg-gray-100 hover:bg-gray-200 rounded-[30px] flex items-center justify-center transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
            aria-label="Open messages"
            title="Messages"
          >
            <MessageSquare className="w-4 h-4 text-gray-600" />
          </button>

          {/* Secondary Message/SMS Icon */}
          <button 
            onClick={handleMessageClick}
            className="w-6 h-6 text-gray-500 hover:text-gray-700 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 rounded"
            aria-label="SMS messages"
            title="SMS Messages"
          >
            <MessageSquare className="w-full h-full" />
          </button>

          {/* Profile/User Icon */}
          <button 
            onClick={handleProfileClick}
            className="w-[21.85px] h-[22px] text-gray-500 hover:text-gray-700 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 rounded"
            aria-label="User profile"
            title="Profile"
          >
            <User className="w-full h-full" />
          </button>
        </div>
      </div>
    </header>
  );
});

// Set display name for debugging
Header.displayName = 'Header';

export default Header;
