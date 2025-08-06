import React, { useState, useMemo, useCallback } from 'react';
import { Eye, EyeOff, Check } from 'lucide-react';

// Modal types enum for better type safety
const MODAL_TYPES = {
  NONE: 'none',
  BLOCK_CONFIRM: 'block_confirm',
  UNBLOCK_CONFIRM: 'unblock_confirm',
  BLOCK_SUCCESS: 'block_success',
  UNBLOCK_SUCCESS: 'unblock_success'
};

// Table headers configuration - Updated to match Figma design
const TABLE_HEADERS = [
  { key: 'name', label: 'Name' },
  { key: 'email', label: 'Email' },
  { key: 'phone', label: 'Phone' },
  { key: 'dateOfBirth', label: 'Date of Birth' },
  { key: 'address', label: 'Address' },
  { key: 'deleteAccountRecord', label: 'Delete account record' },
  { key: 'userName', label: 'user name' },
  { key: 'appReviews', label: 'App reviews' },
  { key: 'gender', label: 'Gender' },
  { key: 'passwordDetails', label: 'Password details' },
  { key: 'pointBalance', label: 'Point balance' },
  { key: 'blockOption', label: 'Block option' },
  { key: 'accountStatus', label: 'Account status' }
];

// Page content constants
const PAGE_CONTENT = {
  title: 'Block user',
  subtitle: 'Block user system'
};

/**
 * BlockUser Component - Manages user blocking/unblocking functionality
 * Features:
 * - Display users in a comprehensive table format matching Figma design
 * - Block/Unblock users with confirmation modals
 * - Real-time account status updates
 * - Password visibility toggle
 * - Comprehensive user data management
 */
const BlockUser = () => {
  const [users, setUsers] = useState([
    {
      id: 1,
      name: 'Rithik mahajan',
      email: 'Rithikmahajan27@gmail.com',
      phone: '+91 7006114695',
      dateOfBirth: '28/august/1998',
      address: 'House NO. 19, new kaleeth nagar, Upper gummat bazar, jammu,180001',
      deleteAccountRecord: 'present',
      userName: 'Rithik27',
      appReviews: { rating: 5, text: 'It is a good app' },
      gender: 'Male',
      passwordDetails: 'Password123',
      pointBalance: 200,
      isBlocked: true,
      accountStatus: 'blocked',
      showPassword: false
    },
    {
      id: 2,
      name: 'Rithik mahajan',
      email: 'Rithikmahajan27@gmail.com',
      phone: '+91 7006114695',
      dateOfBirth: '28/august/1998',
      address: 'House NO. 19, new kaleeth nagar, Upper gummat bazar, jammu,180001',
      deleteAccountRecord: 'present',
      userName: 'Rithik27',
      appReviews: { rating: 5, text: 'It is a good app' },
      gender: 'Male',
      passwordDetails: 'Password123',
      pointBalance: 200,
      isBlocked: false,
      accountStatus: 'Active',
      showPassword: false
    }
  ]);

  // Simplified modal state management
  const [currentModal, setCurrentModal] = useState(MODAL_TYPES.NONE);
  const [selectedUser, setSelectedUser] = useState(null);

  // Memoized helper functions to prevent recreation on every render
  const renderStars = useMemo(() => (rating) => {
    return '★'.repeat(rating) + '☆'.repeat(5 - rating);
  }, []);

  const maskPassword = useMemo(() => (password) => {
    return '•'.repeat(password.length);
  }, []);

  // Memoized handler functions to prevent child re-renders
  const handleBlockUser = useCallback((userId) => {
    const user = users.find(u => u.id === userId);
    setSelectedUser(user);
    
    if (user.isBlocked) {
      setCurrentModal(MODAL_TYPES.UNBLOCK_CONFIRM);
    } else {
      setCurrentModal(MODAL_TYPES.BLOCK_CONFIRM);
    }
  }, [users]);

  const confirmBlockUser = useCallback(() => {
    updateUserBlockStatus(selectedUser.id, true, 'blocked');
    setCurrentModal(MODAL_TYPES.BLOCK_SUCCESS);
  }, [selectedUser]);

  const confirmUnblockUser = useCallback(() => {
    updateUserBlockStatus(selectedUser.id, false, 'Active');
    setCurrentModal(MODAL_TYPES.UNBLOCK_SUCCESS);
  }, [selectedUser]);

  const updateUserBlockStatus = useCallback((userId, isBlocked, accountStatus) => {
    setUsers(prev => 
      prev.map(user => 
        user.id === userId 
          ? { ...user, isBlocked, accountStatus }
          : user
      )
    );
  }, []);

  const togglePasswordVisibility = useCallback((userId) => {
    setUsers(prev => 
      prev.map(user => 
        user.id === userId 
          ? { ...user, showPassword: !user.showPassword }
          : user
      )
    );
  }, []);

  const closeAllModals = useCallback(() => {
    setCurrentModal(MODAL_TYPES.NONE);
    setSelectedUser(null);
  }, []);

  // Reusable components - Memoized for performance
  /**
   * ActionButton - Reusable button component with predefined variants
   * @param {Function} onClick - Click handler
   * @param {string} variant - Button style variant (primary, success, secondary, dark, icon)
   * @param {ReactNode} children - Button content
   * @param {string} className - Additional CSS classes
   */
  const ActionButton = React.memo(({ onClick, variant, children, className = '' }) => {
    const baseClasses = "px-4 py-2 rounded-lg font-medium transition-colors";
    const variantClasses = useMemo(() => ({
      primary: "bg-blue-600 text-white hover:bg-blue-700",
      success: "bg-green-600 text-white hover:bg-green-700",
      secondary: "bg-orange-100 text-orange-600 hover:bg-orange-200",
      dark: "bg-black text-white hover:bg-gray-800",
      icon: "p-2 rounded-lg bg-blue-100 hover:bg-blue-200"
    }), []);
    
    return (
      <button
        onClick={onClick}
        className={`${baseClasses} ${variantClasses[variant]} ${className}`}
      >
        {children}
      </button>
    );
  });

  /**
   * Modal - Reusable modal component
   * @param {boolean} isOpen - Whether modal is open
   * @param {Function} onClose - Close handler (optional)
   * @param {string} title - Modal title
   * @param {ReactNode} children - Modal content
   * @param {Array} actions - Array of action buttons
   */
  const Modal = React.memo(({ isOpen, onClose, title, children, actions }) => {
    if (!isOpen) return null;

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white rounded-2xl p-8 max-w-md w-full mx-4 shadow-2xl">
          <div className="text-center">
            {title && (
              <h3 className="text-xl font-bold text-gray-900 mb-6">
                {title}
              </h3>
            )}
            {children}
            {actions && (
              <div className="flex space-x-4 mt-6">
                {actions}
              </div>
            )}
          </div>
        </div>
      </div>
    );
  });

  /**
   * SuccessIcon - Reusable success icon component
   */
  const SuccessIcon = React.memo(() => (
    <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
      <Check className="w-8 h-8 text-green-600" />
    </div>
  ));

  /**
   * UserRow - Individual user row component with comprehensive user data
   * @param {Object} user - User object with all required fields
   */
  const UserRow = React.memo(({ user }) => (
    <tr key={user.id} className="border-b border-gray-100 hover:bg-gray-50">
      <td className="py-4 px-4 text-gray-900 font-medium text-center tracking-[-0.4px]">{user.name}</td>
      <td className="py-4 px-4 text-gray-900 text-center tracking-[-0.4px]">{user.email}</td>
      <td className="py-4 px-4 text-gray-900 text-center tracking-[-0.4px] uppercase">{user.phone}</td>
      <td className="py-4 px-4 text-gray-900 text-center">{user.dateOfBirth}</td>
      <td className="py-4 px-4 text-gray-900 text-left leading-[1.2]">
        <div className="max-w-[200px]">
          {user.address}
        </div>
      </td>
      <td className="py-4 px-4 text-gray-900 text-center tracking-[-0.4px] uppercase">{user.deleteAccountRecord}</td>
      <td className="py-4 px-4 text-gray-900 font-medium">{user.userName}</td>
      <td className="py-4 px-4 text-gray-900">
        <div className="max-w-[127px]">
          <div className="text-yellow-500 mb-1">{renderStars(user.appReviews.rating)}</div>
          <div className="text-sm leading-[1.2]">{user.appReviews.text}</div>
        </div>
      </td>
      <td className="py-4 px-4 text-gray-900 font-medium">{user.gender}</td>
      <td className="py-4 px-4 text-gray-900">
        <div className="flex items-center space-x-2">
          <span className="font-medium">
            {user.showPassword ? user.passwordDetails : maskPassword(user.passwordDetails)}
          </span>
          <button
            onClick={() => togglePasswordVisibility(user.id)}
            className="p-1 hover:bg-gray-100 rounded"
          >
            {user.showPassword ? (
              <EyeOff className="h-4 w-4 text-gray-600" />
            ) : (
              <Eye className="h-4 w-4 text-gray-600" />
            )}
          </button>
        </div>
      </td>
      <td className="py-4 px-4 text-gray-900 font-medium">{user.pointBalance}</td>
      <td className="py-4 px-4">
        <button
          onClick={() => handleBlockUser(user.id)}
          className={`px-4 py-2 rounded-lg font-medium text-black text-[14px] leading-[20px] transition-colors shadow-[0px_1px_2px_0px_rgba(16,24,40,0.05)] border border-[#d0d5dd] ${
            user.isBlocked 
              ? 'bg-[#00b69b] hover:bg-[#009688]' 
              : 'bg-[#ef3826] hover:bg-[#d32f2f]'
          }`}
        >
          {user.isBlocked ? 'Unblock' : 'Block now'}
        </button>
      </td>
      <td className="py-4 px-4 text-gray-900 font-medium">
        <span className={`${
          user.accountStatus === 'blocked' 
            ? 'text-red-600' 
            : 'text-green-600'
        }`}>
          {user.accountStatus}
        </span>
      </td>
    </tr>
  ));

  return (
    <div className="min-h-screen w-full bg-white">
      {/* Page Title - positioned exactly like Figma */}
      <div className="absolute left-[65px] top-[87px] transform -translate-y-1/2">
        <h1 className="text-[24px] font-bold text-black font-['Montserrat:Bold',_sans-serif] leading-[22px]">
          Block user
        </h1>
      </div>

      {/* Main Content - Full screen table */}
      <div className="pt-[120px] w-full">
        
        {/* Users Table - Full width */}
        <div className="w-full">
          <div className="overflow-x-auto">
            <table className="w-full min-w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  {TABLE_HEADERS.map(header => (
                    <th key={header.key} className="text-left py-4 px-4 font-bold text-[#010101] text-[16px] font-['Montserrat:Bold',_sans-serif]">
                      {header.label}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {users.map((user) => (
                  <UserRow key={user.id} user={user} />
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      {/* Modals */}
      <Modal
        isOpen={currentModal === MODAL_TYPES.BLOCK_CONFIRM}
        title="Are you sure you want to block this user"
        actions={[
          <ActionButton
            key="confirm"
            variant="dark"
            onClick={confirmBlockUser}
            className="flex-1 rounded-full"
          >
            yes
          </ActionButton>,
          <ActionButton
            key="cancel"
            variant="secondary"
            onClick={closeAllModals}
            className="flex-1 bg-gray-100 text-gray-700 hover:bg-gray-200 rounded-full"
          >
            Cancel
          </ActionButton>
        ]}
      />

      <Modal
        isOpen={currentModal === MODAL_TYPES.BLOCK_SUCCESS}
        title="user blocked successfully"
        actions={[
          <ActionButton
            key="ok"
            variant="dark"
            onClick={closeAllModals}
            className="w-full rounded-full"
          >
            OK
          </ActionButton>
        ]}
      >
        <SuccessIcon />
      </Modal>

      <Modal
        isOpen={currentModal === MODAL_TYPES.UNBLOCK_CONFIRM}
        title="Are you sure you want to unblock this user"
        actions={[
          <ActionButton
            key="confirm"
            variant="dark"
            onClick={confirmUnblockUser}
            className="flex-1 rounded-full"
          >
            yes
          </ActionButton>,
          <ActionButton
            key="cancel"
            variant="secondary"
            onClick={closeAllModals}
            className="flex-1 bg-gray-100 text-gray-700 hover:bg-gray-200 rounded-full"
          >
            Cancel
          </ActionButton>
        ]}
      />

      <Modal
        isOpen={currentModal === MODAL_TYPES.UNBLOCK_SUCCESS}
        title="user unblocked successfully"
        actions={[
          <ActionButton
            key="ok"
            variant="dark"
            onClick={closeAllModals}
            className="w-full rounded-full"
          >
            OK
          </ActionButton>
        ]}
      >
        <SuccessIcon />
      </Modal>
    </div>
  );
};

export default BlockUser;
