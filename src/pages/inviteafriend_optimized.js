import React, { useState, useCallback, useMemo, useReducer } from 'react';

// Modal state management using useReducer for better performance
const initialModalState = {
  // Edit flow
  showEditModal: false,
  showEdit2FAModal: false,
  showEditSuccessModal: false,
  
  // Delete flow
  showDeleteConfirmationModal: false,
  showDeleteSuccessModal: false,
  showDelete2FAModal: false,
  showDeleteFinalSuccessModal: false,
  
  // Toggle flow
  showConfirmationModal: false,
  showOffConfirmationModal: false,
  show2FAModal: false,
  showOff2FAModal: false,
  showSuccessModal: false,
  showOffSuccessModal: false,
  showFinalSuccessModal: false,
  showOffFinalSuccessModal: false,
  
  // Issue flow
  showIssue2FAModal: false,
  showIssueSuccessModal: false,
  showIssueFinalSuccessModal: false,
};

const modalReducer = (state, action) => {
  switch (action.type) {
    case 'SHOW_MODAL':
      return { ...state, [action.modal]: true };
    case 'HIDE_MODAL':
      return { ...state, [action.modal]: false };
    case 'RESET_MODALS':
      return initialModalState;
    default:
      return state;
  }
};

// Form state management
const initialFormState = {
  userName: '',
  codeToIssue: '',
  codeLimit: '',
  codeValue: '',
  editUserName: '',
  editCodeToIssue: '',
  otpCode: ['', '', '', ''],
  verificationPassword: '',
  defaultPassword: '',
  showVerificationPassword: false,
  showDefaultPassword: false,
};

const formReducer = (state, action) => {
  switch (action.type) {
    case 'SET_FIELD':
      return { ...state, [action.field]: action.value };
    case 'RESET_FORM':
      return initialFormState;
    case 'RESET_2FA':
      return {
        ...state,
        otpCode: ['', '', '', ''],
        verificationPassword: '',
        defaultPassword: '',
      };
    case 'RESET_EDIT':
      return {
        ...state,
        editUserName: '',
        editCodeToIssue: '',
      };
    default:
      return state;
  }
};

const InviteAFriend = React.memo(() => {
  // Core application state
  const [isToggleOn, setIsToggleOn] = useState(true);
  const [toggleAction, setToggleAction] = useState('');
  const [editingCode, setEditingCode] = useState(null);
  const [deletingCode, setDeletingCode] = useState(null);
  
  // Reducers for complex state management
  const [modalState, dispatchModal] = useReducer(modalReducer, initialModalState);
  const [formState, dispatchForm] = useReducer(formReducer, initialFormState);
  
  const [issuedCodes, setIssuedCodes] = useState([
    {
      id: 1,
      username: 'Rithik',
      code: 'RITHIK27',
      description: 'Invite a friend and get additional 10% off on your 1st purchase'
    },
    {
      id: 2,
      username: 'Rithik',
      code: 'RITHIK27',
      description: 'Invite a friend and get additional 10% off on your 1st purchase'
    }
  ]);

  // Memoized validation functions
  const validateFormFields = useCallback(() => {
    return formState.userName && formState.codeToIssue && formState.codeLimit && formState.codeValue;
  }, [formState.userName, formState.codeToIssue, formState.codeLimit, formState.codeValue]);

  const validate2FAFields = useCallback(() => {
    const otpString = formState.otpCode.join('');
    return otpString.length === 4 && formState.verificationPassword && formState.defaultPassword;
  }, [formState.otpCode, formState.verificationPassword, formState.defaultPassword]);

  // Generic modal handlers
  const showModal = useCallback((modal) => {
    dispatchModal({ type: 'SHOW_MODAL', modal });
  }, []);

  const hideModal = useCallback((modal) => {
    dispatchModal({ type: 'HIDE_MODAL', modal });
  }, []);

  const resetForm = useCallback(() => {
    dispatchForm({ type: 'RESET_FORM' });
  }, []);

  const reset2FA = useCallback(() => {
    dispatchForm({ type: 'RESET_2FA' });
  }, []);

  // Optimized handlers using useCallback
  const handleIssueCode = useCallback(() => {
    if (validateFormFields()) {
      showModal('showIssue2FAModal');
    } else {
      alert('Please fill in all fields');
    }
  }, [validateFormFields, showModal]);

  const handleToggleInviteSystem = useCallback((status) => {
    setToggleAction(status);
    if (status === 'on' && !isToggleOn) {
      showModal('showConfirmationModal');
    } else if (status === 'off' && isToggleOn) {
      showModal('showOffConfirmationModal');
    }
  }, [isToggleOn, showModal]);

  // Generic 2FA handler
  const handle2FASubmit = useCallback((nextModal) => {
    if (validate2FAFields()) {
      hideModal('show2FAModal');
      hideModal('showOff2FAModal');
      hideModal('showEdit2FAModal');
      hideModal('showIssue2FAModal');
      hideModal('showDelete2FAModal');
      showModal(nextModal);
      reset2FA();
    } else {
      alert('Please fill in all fields');
    }
  }, [validate2FAFields, hideModal, showModal, reset2FA]);

  // Specific 2FA handlers
  const handleToggle2FASubmit = useCallback(() => {
    handle2FASubmit('showSuccessModal');
  }, [handle2FASubmit]);

  const handleToggleOff2FASubmit = useCallback(() => {
    handle2FASubmit('showOffSuccessModal');
  }, [handle2FASubmit]);

  const handleEdit2FASubmit = useCallback(() => {
    handle2FASubmit('showEditSuccessModal');
  }, [handle2FASubmit]);

  const handleIssue2FASubmit = useCallback(() => {
    handle2FASubmit('showIssueSuccessModal');
  }, [handle2FASubmit]);

  const handleDelete2FASubmit = useCallback(() => {
    handle2FASubmit('showDeleteSuccessModal');
  }, [handle2FASubmit]);

  // Confirmation handlers
  const handleConfirmToggleOn = useCallback(() => {
    hideModal('showConfirmationModal');
    showModal('show2FAModal');
  }, [hideModal, showModal]);

  const handleConfirmToggleOff = useCallback(() => {
    hideModal('showOffConfirmationModal');
    showModal('showOff2FAModal');
  }, [hideModal, showModal]);

  // Cancel handlers
  const handleCancelToggle = useCallback(() => {
    hideModal('showConfirmationModal');
  }, [hideModal]);

  const handleCancelOffToggle = useCallback(() => {
    hideModal('showOffConfirmationModal');
  }, [hideModal]);

  const handleCancel2FA = useCallback(() => {
    hideModal('show2FAModal');
    hideModal('showOff2FAModal');
    hideModal('showEdit2FAModal'); 
    hideModal('showIssue2FAModal');
    hideModal('showDelete2FAModal');
    reset2FA();
  }, [hideModal, reset2FA]);

  // Success modal handlers
  const handleSuccessModalDone = useCallback((currentModal, nextModal) => {
    hideModal(currentModal);
    showModal(nextModal);
  }, [hideModal, showModal]);

  const handleFinalSuccessModalDone = useCallback((modal, toggleState) => {
    hideModal(modal);
    setIsToggleOn(toggleState);
  }, [hideModal]);

  // Code management handlers
  const handleCopyCode = useCallback((code) => {
    navigator.clipboard.writeText(code);
  }, []);

  const handleEditCode = useCallback((code) => {
    setEditingCode(code);
    dispatchForm({ type: 'SET_FIELD', field: 'editUserName', value: code.username });
    dispatchForm({ type: 'SET_FIELD', field: 'editCodeToIssue', value: code.code });
    showModal('showEditModal');
  }, [showModal]);

  const handleDeleteCode = useCallback((code) => {
    setDeletingCode(code);
    showModal('showDeleteConfirmationModal');
  }, [showModal]);

  const handleSaveEditedCode = useCallback(() => {
    if (formState.editUserName.trim() && formState.editCodeToIssue.trim()) {
      hideModal('showEditModal');
      showModal('showEdit2FAModal');
    } else {
      alert('Please fill in all fields');
    }
  }, [formState.editUserName, formState.editCodeToIssue, hideModal, showModal]);

  const handleCancelEdit = useCallback(() => {
    hideModal('showEditModal');
    setEditingCode(null);
    dispatchForm({ type: 'RESET_EDIT' });
  }, [hideModal]);

  const handleEditSuccessDone = useCallback(() => {
    if (editingCode && formState.editUserName.trim() && formState.editCodeToIssue.trim()) {
      setIssuedCodes(prevCodes => prevCodes.map(code => 
        code.id === editingCode.id 
          ? { 
              ...code, 
              username: formState.editUserName.trim(),
              code: formState.editCodeToIssue.toUpperCase().trim()
            }
          : code
      ));
      setEditingCode(null);
      dispatchForm({ type: 'RESET_EDIT' });
    }
    hideModal('showEditSuccessModal');
  }, [editingCode, formState.editUserName, formState.editCodeToIssue, hideModal]);

  const handleConfirmDelete = useCallback(() => {
    hideModal('showDeleteConfirmationModal');
    showModal('showDelete2FAModal');
  }, [hideModal, showModal]);

  const handleCancelDelete = useCallback(() => {
    hideModal('showDeleteConfirmationModal');
    setDeletingCode(null);
  }, [hideModal]);

  const handleDeleteFinalSuccessModalDone = useCallback(() => {
    hideModal('showDeleteFinalSuccessModal');
    
    // Actually delete the code now
    if (deletingCode) {
      setIssuedCodes(prevCodes => prevCodes.filter(code => code.id !== deletingCode.id));
      setDeletingCode(null);
    }
  }, [deletingCode, hideModal]);

  // OTP handling
  const handleOtpChange = useCallback((index, value) => {
    if (value.length <= 1 && /^\d*$/.test(value)) {
      const newOtp = [...formState.otpCode];
      newOtp[index] = value;
      dispatchForm({ type: 'SET_FIELD', field: 'otpCode', value: newOtp });
      
      // Auto-focus next input
      if (value && index < 3) {
        const nextInput = document.querySelector(`input[data-otp-index="${index + 1}"]`);
        if (nextInput) nextInput.focus();
      }
    }
  }, [formState.otpCode]);

  const handleOtpKeyDown = useCallback((index, e) => {
    if (e.key === 'Backspace' && !formState.otpCode[index] && index > 0) {
      const prevInput = document.querySelector(`input[data-otp-index="${index - 1}"]`);
      if (prevInput) prevInput.focus();
    }
  }, [formState.otpCode]);

  // Memoized form field handlers
  const handleFieldChange = useCallback((field, value) => {
    dispatchForm({ type: 'SET_FIELD', field, value });
  }, []);

  const togglePasswordVisibility = useCallback((field) => {
    dispatchForm({ type: 'SET_FIELD', field, value: !formState[field] });
  }, [formState]);

  // Memoized computed values
  const memoizedIssuedCodes = useMemo(() => issuedCodes, [issuedCodes]);

  return (
    <div className="bg-white min-h-screen p-6">
      {/* Main Title */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-black mb-4">
          Invite a friend with a referral code
        </h1>
        
        {/* Toggle Section */}
        <div className="flex items-center gap-4 mb-8">
          <span className="text-2xl font-bold text-black">
            Invite a friend with a referral code
          </span>
          <div className="flex gap-2">
            <button
              onClick={() => handleToggleInviteSystem('on')}
              className={`px-4 py-2 rounded-full text-sm font-medium border ${
                isToggleOn
                  ? 'bg-blue-600 text-white border-black'
                  : 'bg-white text-black border-gray-300'
              }`}
            >
              On
            </button>
            <button
              onClick={() => handleToggleInviteSystem('off')}
              className={`px-4 py-2 rounded-full text-sm font-medium border ${
                !isToggleOn
                  ? 'bg-blue-600 text-white border-black'
                  : 'bg-white text-black border-gray-300'
              }`}
            >
              Off
            </button>
          </div>
        </div>
      </div>

      {/* Form Section */}
      <div className="max-w-md space-y-6">
        {/* Generate referral code user name */}
        <div>
          <label className="block text-xl font-bold text-black mb-2">
            Generate referral code user name
          </label>
          <input
            type="text"
            value={formState.userName}
            onChange={(e) => handleFieldChange('userName', e.target.value)}
            className="w-full px-4 py-3 border-2 border-black rounded-xl focus:outline-none focus:border-blue-600"
            placeholder="Enter username"
          />
        </div>

        {/* Code to issue */}
        <div>
          <label className="block text-xl font-bold text-black mb-2">
            code to issue
          </label>
          <input
            type="text"
            value={formState.codeToIssue}
            onChange={(e) => handleFieldChange('codeToIssue', e.target.value)}
            className="w-full px-4 py-3 border-2 border-black rounded-xl focus:outline-none focus:border-blue-600"
            placeholder="Enter code"
          />
        </div>

        {/* Code limit */}
        <div>
          <label className="block text-xl font-bold text-black mb-2">
            code limit
          </label>
          <input
            type="number"
            value={formState.codeLimit}
            onChange={(e) => handleFieldChange('codeLimit', e.target.value)}
            className="w-full px-4 py-3 border-2 border-black rounded-xl focus:outline-none focus:border-blue-600"
            placeholder="Enter limit"
          />
        </div>

        {/* Code value */}
        <div>
          <label className="block text-xl font-bold text-black mb-2">
            code value
          </label>
          <input
            type="number"
            value={formState.codeValue}
            onChange={(e) => handleFieldChange('codeValue', e.target.value)}
            className="w-full px-4 py-3 border-2 border-black rounded-xl focus:outline-none focus:border-blue-600"
            placeholder="Enter value (%)"
          />
        </div>

        {/* Issue Code Button */}
        <button
          onClick={handleIssueCode}
          className="w-full bg-black text-white py-3 rounded-xl font-semibold hover:bg-gray-800 transition-colors"
        >
          Issue Code
        </button>
      </div>

      {/* Issued Codes Section */}
      <div className="mt-12">
        <h2 className="text-xl font-bold text-black mb-6">Issued Codes</h2>
        <div className="space-y-4">
          {memoizedIssuedCodes.map((code) => (
            <div key={code.id} className="bg-gray-50 p-4 rounded-lg border">
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <div className="font-semibold text-lg">{code.username}</div>
                  <div className="text-blue-600 font-mono text-lg">{code.code}</div>
                  <div className="text-gray-600 text-sm mt-1">{code.description}</div>
                </div>
                <div className="flex gap-2 ml-4">
                  <button
                    onClick={() => handleCopyCode(code.code)}
                    className="px-3 py-1 bg-gray-200 hover:bg-gray-300 rounded text-sm"
                  >
                    Copy
                  </button>
                  <button
                    onClick={() => handleEditCode(code)}
                    className="px-3 py-1 bg-blue-500 hover:bg-blue-600 text-white rounded text-sm"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDeleteCode(code)}
                    className="px-3 py-1 bg-red-500 hover:bg-red-600 text-white rounded text-sm"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Add all the modal components here with optimized state management */}
      {/* This is just a simplified example - you would include all the modal JSX here */}
      {modalState.showEditModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg max-w-md w-full mx-4">
            <h3 className="text-lg font-bold mb-4">Edit Code</h3>
            <div className="space-y-4">
              <input
                type="text"
                value={formState.editUserName}
                onChange={(e) => handleFieldChange('editUserName', e.target.value)}
                placeholder="Username"
                className="w-full p-2 border rounded"
              />
              <input
                type="text"
                value={formState.editCodeToIssue}
                onChange={(e) => handleFieldChange('editCodeToIssue', e.target.value)}
                placeholder="Code"
                className="w-full p-2 border rounded"
              />
            </div>
            <div className="flex gap-2 mt-4">
              <button
                onClick={handleSaveEditedCode}
                className="flex-1 bg-black text-white py-2 rounded"
              >
                Save
              </button>
              <button
                onClick={handleCancelEdit}
                className="flex-1 bg-gray-300 py-2 rounded"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
      
      {/* Add other modals similarly... */}
    </div>
  );
});

InviteAFriend.displayName = 'InviteAFriend';

export default InviteAFriend;
