import React, { useState, useCallback, useMemo, memo } from 'react';
import { Filter, Download, Mail, Eye, Trash2, Users } from 'lucide-react';

/**
 * Send Promo Notification Component
 * 
 * A comprehensive admin interface for sending promotional notifications to users.
 * Based on the Figma design, this component provides:
 * - View users with empty carts for targeted promotions
 * - Filter by date range, user type, and country/region
 * - Send bulk emails and SMS promotions
 * - Export data for analysis
 * - Individual user promotional actions
 * 
 * Performance Optimizations:
 * - Memoized callbacks to prevent unnecessary re-renders
 * - Optimized state structure
 * - Efficient component updates
 */
const SendPromoNotification = memo(() => {
  // Filter states
  const [filters, setFilters] = useState({
    dateRange: 'last 7 days',
    userType: 'all',
    countryRegion: 'all',
    sortBy: 'last active'
  });

  // Modal states
  const [modalStates, setModalStates] = useState({
    isComposeModalOpen: false,
    isBulkModalOpen: false,
    selectedUsers: []
  });

  // Sample users data for promotional targeting
  const [users, setUsers] = useState([
    {
      id: 1,
      userId: 'rithikmahaj',
      email: 'rithikmahajan27@gmail.com',
      mobile: '9001146595',
      userName: 'rithikmahaj',
      userType: 'guest',
      dob: '06/05/1999',
      gender: 'M',
      lastActive: '09/05/1999',
      avgVisitTime: '8hours',
      abandonedCart: 'yes',
      status: 'registered',
      isSelected: false
    },
    {
      id: 2,
      userId: 'user123',
      email: 'user123@example.com',
      mobile: '9876543210',
      userName: 'user123',
      userType: 'registered',
      dob: '15/03/1995',
      gender: 'F',
      lastActive: '15/07/1999',
      avgVisitTime: '5hours',
      abandonedCart: 'no',
      status: 'active',
      isSelected: false
    }
  ]);

  // Promo notification form state
  const [promoForm, setPromoForm] = useState({
    title: '',
    message: '',
    discountCode: '',
    discountPercent: '',
    expiryDate: '',
    targetAudience: 'all',
    notificationType: 'both' // email, sms, both
  });

  // Statistics
  const stats = {
    emptyCartStatus: 2000,
    registeredUsers: 2000,
    guests: 2000,
    avgVisitTime: '1 min'
  };

  // Handle filter changes
  const handleFilterChange = useCallback((field, value) => {
    setFilters(prev => ({
      ...prev,
      [field]: value
    }));
  }, []);

  // Handle user selection
  const handleUserSelect = useCallback((userId) => {
    setUsers(prev => prev.map(user => 
      user.id === userId 
        ? { ...user, isSelected: !user.isSelected }
        : user
    ));
  }, []);

  // Handle select all users
  const handleSelectAll = useCallback(() => {
    const allSelected = users.every(user => user.isSelected);
    setUsers(prev => prev.map(user => ({ ...user, isSelected: !allSelected })));
  }, [users]);

  // Handle bulk promotional actions
  const handleBulkPromoEmail = useCallback(() => {
    const selectedUsers = users.filter(user => user.isSelected);
    console.log('Sending promotional email to:', selectedUsers.length, 'users');
    setModalStates(prev => ({ ...prev, isBulkModalOpen: true }));
  }, [users]);

  const handleBulkPromoSMS = useCallback(() => {
    const selectedUsers = users.filter(user => user.isSelected);
    console.log('Sending promotional SMS to:', selectedUsers.length, 'users');
    setModalStates(prev => ({ ...prev, isBulkModalOpen: true }));
  }, [users]);

  const handleExportCSV = useCallback(() => {
    console.log('Exporting promotional target data to CSV');
  }, []);

  // Handle promo form changes
  const handlePromoFormChange = useCallback((field, value) => {
    setPromoForm(prev => ({
      ...prev,
      [field]: value
    }));
  }, []);

  // Handle individual user promotional actions
  const handleSendPromoEmail = useCallback((userId) => {
    console.log('Sending promotional email to user:', userId);
    setModalStates(prev => ({ ...prev, isComposeModalOpen: true }));
  }, []);

  const handleViewProfile = useCallback((userId) => {
    console.log('Viewing profile for promotional targeting user:', userId);
  }, []);

  const handleDeleteUser = useCallback((userId) => {
    setUsers(prev => prev.filter(user => user.id !== userId));
  }, []);

  // Handle modal actions
  const closeComposeModal = useCallback(() => {
    setModalStates(prev => ({ ...prev, isComposeModalOpen: false }));
  }, []);

  const closeBulkModal = useCallback(() => {
    setModalStates(prev => ({ ...prev, isBulkModalOpen: false }));
  }, []);

  const handleSendPromo = useCallback(() => {
    console.log('Sending promotional notification:', promoForm);
    setPromoForm({
      title: '',
      message: '',
      discountCode: '',
      discountPercent: '',
      expiryDate: '',
      targetAudience: 'all',
      notificationType: 'both'
    });
    closeComposeModal();
    closeBulkModal();
  }, [promoForm, closeComposeModal, closeBulkModal]);

  // Calculate selected users count
  const selectedUsersCount = useMemo(() => {
    return users.filter(user => user.isSelected).length;
  }, [users]);

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Send Promo Notifications</h1>
        <p className="text-gray-600">Target users with promotional offers and notifications</p>
        
        {/* Action Buttons */}
        <div className="flex gap-3 mb-6 mt-4">
          <button
            onClick={handleBulkPromoEmail}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2 text-sm"
            disabled={selectedUsersCount === 0}
          >
            <Mail className="h-4 w-4" />
            Bulk Promo Email ({selectedUsersCount})
          </button>
          <button
            onClick={handleBulkPromoSMS}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors text-sm"
            disabled={selectedUsersCount === 0}
          >
            + Bulk Promo SMS ({selectedUsersCount})
          </button>
          <button
            onClick={handleExportCSV}
            className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors flex items-center gap-2 text-sm"
          >
            <Download className="h-4 w-4" />
            Export Target Users
          </button>
        </div>

        {/* Statistics Cards */}
        <div className="grid grid-cols-4 gap-6 mb-6">
          <div className="text-center">
            <p className="text-sm text-gray-600 mb-1">total users</p>
            <p className="text-xl font-bold text-gray-900">{stats.emptyCartStatus}</p>
          </div>
          <div className="text-center">
            <p className="text-sm text-gray-600 mb-1">registered users</p>
            <p className="text-xl font-bold text-gray-900">{stats.registeredUsers}</p>
          </div>
          <div className="text-center">
            <p className="text-sm text-gray-600 mb-1">guests</p>
            <p className="text-xl font-bold text-gray-900">{stats.guests}</p>
          </div>
          <div className="text-center">
            <p className="text-sm text-gray-600 mb-1">avg engagement</p>
            <p className="text-xl font-bold text-gray-900">{stats.avgVisitTime}</p>
          </div>
        </div>

        {/* Filters */}
        <div className="grid grid-cols-4 gap-4 mb-6">
          <div>
            <label className="block text-sm text-gray-600 mb-1">date range</label>
            <select
              value={filters.dateRange}
              onChange={(e) => handleFilterChange('dateRange', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
            >
              <option value="last 7 days">last 7 days</option>
              <option value="last 30 days">last 30 days</option>
              <option value="last 90 days">last 90 days</option>
            </select>
          </div>
          <div>
            <label className="block text-sm text-gray-600 mb-1">user type</label>
            <select
              value={filters.userType}
              onChange={(e) => handleFilterChange('userType', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
            >
              <option value="all">all</option>
              <option value="registered">registered</option>
              <option value="guest">guest</option>
            </select>
          </div>
          <div>
            <label className="block text-sm text-gray-600 mb-1">country/region</label>
            <select
              value={filters.countryRegion}
              onChange={(e) => handleFilterChange('countryRegion', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
            >
              <option value="all">all</option>
              <option value="US">United States</option>
              <option value="IN">India</option>
            </select>
          </div>
          <div>
            <label className="block text-sm text-gray-600 mb-1">sort by</label>
            <select
              value={filters.sortBy}
              onChange={(e) => handleFilterChange('sortBy', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
            >
              <option value="last active">last active</option>
              <option value="name">name</option>
              <option value="email">email</option>
            </select>
          </div>
        </div>
      </div>

      {/* User Details Table */}
      <div className="bg-white rounded-lg shadow-sm border overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
          <div className="flex items-center gap-4">
            <h2 className="text-lg font-semibold text-gray-900">Target Users</h2>
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={users.length > 0 && users.every(user => user.isSelected)}
                onChange={handleSelectAll}
                className="rounded border-gray-300"
              />
              <span className="text-sm text-gray-600">Select All</span>
            </label>
          </div>
          <div className="flex items-center gap-3">
            <button className="flex items-center gap-2 text-sm text-gray-600 hover:text-gray-900">
              <Filter className="h-4 w-4" />
              Filters
            </button>
            <button className="bg-pink-500 text-white px-4 py-2 rounded-lg hover:bg-pink-600 transition-colors text-sm">
              + Sort and Export CSV
            </button>
          </div>
        </div>
        
        <div className="overflow-x-auto">
          <table className="min-w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Select
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  user id
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  email
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  mobile
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  user name
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  user type
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  last active
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  status
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  action
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {users.map((user) => (
                <tr key={user.id} className={`hover:bg-gray-50 ${user.isSelected ? 'bg-blue-50' : ''}`}>
                  <td className="px-4 py-4 whitespace-nowrap">
                    <input
                      type="checkbox"
                      checked={user.isSelected}
                      onChange={() => handleUserSelect(user.id)}
                      className="rounded border-gray-300"
                    />
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900">
                    {user.userId}
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900">
                    {user.email}
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900">
                    {user.mobile}
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900">
                    {user.userName}
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900">
                    {user.userType}
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900">
                    {user.lastActive}
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                      user.status === 'active' || user.status === 'registered'
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-red-100 text-red-800'
                    }`}>
                      {user.status}
                    </span>
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap">
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleViewProfile(user.id)}
                        className="bg-green-100 text-green-800 px-3 py-1 text-xs rounded hover:bg-green-200 flex items-center gap-1"
                      >
                        <Eye className="h-3 w-3" />
                        view profile
                      </button>
                      <button
                        onClick={() => handleSendPromoEmail(user.id)}
                        className="bg-blue-600 text-white px-3 py-1 text-xs rounded hover:bg-blue-700 flex items-center gap-1"
                      >
                        <Mail className="h-3 w-3" />
                        send promo
                      </button>
                      <button
                        onClick={() => handleDeleteUser(user.id)}
                        className="bg-red-600 text-white px-3 py-1 text-xs rounded hover:bg-red-700 flex items-center gap-1"
                      >
                        <Trash2 className="h-3 w-3" />
                        remove
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Compose Promo Modal */}
      {modalStates.isComposeModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between p-6 border-b">
              <h2 className="text-xl font-semibold text-gray-900">Compose Promotional Notification</h2>
              <button
                onClick={closeComposeModal}
                className="text-gray-400 hover:text-gray-600"
              >
                ×
              </button>
            </div>

            <div className="p-6 space-y-6">
              {/* Notification Title */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Notification Title
                </label>
                <input
                  type="text"
                  value={promoForm.title}
                  onChange={(e) => handlePromoFormChange('title', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Special Offer Just For You!"
                />
              </div>

              {/* Message */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Promotional Message
                </label>
                <textarea
                  value={promoForm.message}
                  onChange={(e) => handlePromoFormChange('message', e.target.value)}
                  rows={4}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Don't miss out on our exclusive offer..."
                />
              </div>

              {/* Discount Details */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Discount Code
                  </label>
                  <input
                    type="text"
                    value={promoForm.discountCode}
                    onChange={(e) => handlePromoFormChange('discountCode', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="SAVE20"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Discount Percentage
                  </label>
                  <input
                    type="number"
                    value={promoForm.discountPercent}
                    onChange={(e) => handlePromoFormChange('discountPercent', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="20"
                    min="0"
                    max="100"
                  />
                </div>
              </div>

              {/* Expiry Date */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Offer Expiry Date
                </label>
                <input
                  type="date"
                  value={promoForm.expiryDate}
                  onChange={(e) => handlePromoFormChange('expiryDate', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              {/* Notification Type */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Send Via
                </label>
                <select
                  value={promoForm.notificationType}
                  onChange={(e) => handlePromoFormChange('notificationType', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="both">Email & SMS</option>
                  <option value="email">Email Only</option>
                  <option value="sms">SMS Only</option>
                </select>
              </div>
            </div>

            <div className="flex justify-end space-x-3 p-6 border-t">
              <button
                onClick={closeComposeModal}
                className="px-4 py-2 text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={handleSendPromo}
                disabled={!promoForm.title || !promoForm.message}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Send Promotional Notification
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Bulk Promo Modal */}
      {modalStates.isBulkModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between p-6 border-b">
              <h2 className="text-xl font-semibold text-gray-900">
                Bulk Promotional Notification ({selectedUsersCount} users)
              </h2>
              <button
                onClick={closeBulkModal}
                className="text-gray-400 hover:text-gray-600"
              >
                ×
              </button>
            </div>

            <div className="p-6 space-y-6">
              {/* Same form as compose modal */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Notification Title
                </label>
                <input
                  type="text"
                  value={promoForm.title}
                  onChange={(e) => handlePromoFormChange('title', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Special Bulk Offer!"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Promotional Message
                </label>
                <textarea
                  value={promoForm.message}
                  onChange={(e) => handlePromoFormChange('message', e.target.value)}
                  rows={4}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Exclusive offer for our valued customers..."
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Discount Code
                  </label>
                  <input
                    type="text"
                    value={promoForm.discountCode}
                    onChange={(e) => handlePromoFormChange('discountCode', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="BULK25"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Discount Percentage
                  </label>
                  <input
                    type="number"
                    value={promoForm.discountPercent}
                    onChange={(e) => handlePromoFormChange('discountPercent', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="25"
                    min="0"
                    max="100"
                  />
                </div>
              </div>
            </div>

            <div className="flex justify-end space-x-3 p-6 border-t">
              <button
                onClick={closeBulkModal}
                className="px-4 py-2 text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={handleSendPromo}
                disabled={!promoForm.title || !promoForm.message}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Send to {selectedUsersCount} Users
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
});

SendPromoNotification.displayName = 'SendPromoNotification';

export default SendPromoNotification;
