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
    case 'HIDE_ALL_MODALS':
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
      const newOtp = [...otpCode];
      newOtp[index] = value;
      setOtpCode(newOtp);
      
      // Auto-focus next input
      if (value && index < 3) {
        let nextInputId;
        if (showOff2FAModal) {
          nextInputId = `otp-off-${index + 1}`;
        } else if (showEdit2FAModal) {
          nextInputId = `edit-otp-${index + 1}`;
        } else if (showDelete2FAModal) {
          nextInputId = `delete-otp-${index + 1}`;
        } else if (showIssue2FAModal) {
          nextInputId = `issue-otp-${index + 1}`;
        } else {
          nextInputId = `otp-${index + 1}`;
        }
        const nextInput = document.getElementById(nextInputId);
        if (nextInput) nextInput.focus();
      }
    }
  };

  const handleOtpKeyDown = (index, e) => {
    if (e.key === 'Backspace' && !otpCode[index] && index > 0) {
      let prevInputId;
      if (showOff2FAModal) {
        prevInputId = `otp-off-${index - 1}`;
      } else if (showEdit2FAModal) {
        prevInputId = `edit-otp-${index - 1}`;
      } else if (showDelete2FAModal) {
        prevInputId = `delete-otp-${index - 1}`;
      } else if (showIssue2FAModal) {
        prevInputId = `issue-otp-${index - 1}`;
      } else {
        prevInputId = `otp-${index - 1}`;
      }
      const prevInput = document.getElementById(prevInputId);
      if (prevInput) prevInput.focus();
    }
  };

  // Issue code 2FA flow handlers
  const handleIssue2FASubmit = () => {
    const otpString = otpCode.join('');
    if (otpString.length === 4 && verificationPassword && defaultPassword) {
      setShowIssue2FAModal(false);
      // Reset 2FA form
      setOtpCode(['', '', '', '']);
      setVerificationPassword('');
      setDefaultPassword('');
      // Show success modal
      setShowIssueSuccessModal(true);
    } else {
      alert('Please fill in all fields');
    }
  };

  const handleCancelIssue2FA = () => {
    setShowIssue2FAModal(false);
    // Reset 2FA form
    setOtpCode(['', '', '', '']);
    setVerificationPassword('');
    setDefaultPassword('');
  };

  const handleIssueSuccessModalDone = () => {
    setShowIssueSuccessModal(false);
    setShowIssueFinalSuccessModal(true);
  };

  const handleIssueFinalSuccessModalDone = () => {
    setShowIssueFinalSuccessModal(false);
    
    // Actually create the code now
    const newCode = {
      id: issuedCodes.length + 1,
      username: userName,
      code: codeToIssue.toUpperCase(),
      description: 'Invite a friend and get additional 10% off on your 1st purchase'
    };
    setIssuedCodes([...issuedCodes, newCode]);
    
    // Reset form
    setUserName('');
    setCodeToIssue('');
    setCodeLimit('');
    setCodeValue('');
  };

  const handleCloseIssueSuccessModal = () => {
    setShowIssueSuccessModal(false);
  };

  const handleCloseIssueFinalSuccessModal = () => {
    setShowIssueFinalSuccessModal(false);
  };

  // Delete code 2FA flow handlers
  const handleDelete2FASubmit = () => {
    const otpString = otpCode.join('');
    if (otpString.length === 4 && verificationPassword && defaultPassword) {
      setShowDelete2FAModal(false);
      // Reset 2FA form
      setOtpCode(['', '', '', '']);
      setVerificationPassword('');
      setDefaultPassword('');
      // Show success modal
      setShowDeleteSuccessModal(true);
    } else {
      alert('Please fill in all fields');
    }
  };

  const handleCancelDelete2FA = () => {
    setShowDelete2FAModal(false);
    // Reset 2FA form
    setOtpCode(['', '', '', '']);
    setVerificationPassword('');
    setDefaultPassword('');
    // Reset delete state
    setDeletingCode(null);
  };

  const handleDeleteSuccessModalDone = () => {
    setShowDeleteSuccessModal(false);
    setShowDeleteFinalSuccessModal(true);
  };

  const handleDeleteFinalSuccessModalDone = () => {
    setShowDeleteFinalSuccessModal(false);
    
    // Actually delete the code now
    if (deletingCode) {
      setIssuedCodes(issuedCodes.filter(code => code.id !== deletingCode.id));
      setDeletingCode(null);
    }
  };

  const handleCloseDeleteSuccessModal = () => {
    setShowDeleteSuccessModal(false);
    setDeletingCode(null);
  };

  const handleCloseDeleteFinalSuccessModal = () => {
    setShowDeleteFinalSuccessModal(false);
    setDeletingCode(null);
  };

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
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
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
            value={codeToIssue}
            onChange={(e) => setCodeToIssue(e.target.value)}
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
            value={codeLimit}
            onChange={(e) => setCodeLimit(e.target.value)}
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
            type="text"
            value={codeValue}
            onChange={(e) => setCodeValue(e.target.value)}
            className="w-full px-4 py-3 border-2 border-black rounded-xl focus:outline-none focus:border-blue-600"
            placeholder="Enter value"
          />
        </div>

        {/* Issue code button */}
        <button
          onClick={handleIssueCode}
          className="w-full bg-gray-800 text-white py-3 rounded-full font-medium hover:bg-gray-700 transition-colors"
        >
          Issue code
        </button>
      </div>

      {/* Issued codes section */}
      <div className="max-w-md mt-12">
        <h2 className="text-xl font-bold text-black mb-6">Issued codes</h2>
        
        <div className="space-y-4">
          {issuedCodes.map((code) => (
            <div key={code.id} className="border border-gray-300 rounded-lg p-4 bg-white shadow-sm">
              {/* Code header */}
              <div className="flex justify-between items-start mb-3">
                <h3 className="text-lg font-semibold text-gray-800">
                  {code.username}
                </h3>
                <div className="flex gap-2">
                  <button
                    onClick={() => handleEditCode(code)}
                    className="p-2 text-gray-600 hover:text-gray-800"
                    title="Edit"
                  >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="m18 2 4 4-14 14H4v-4L18 2z"/>
                      <path d="m14.5 5.5 4 4"/>
                    </svg>
                  </button>
                  <button
                    onClick={() => handleDeleteCode(code)}
                    className="p-2 text-gray-600 hover:text-red-600"
                    title="Delete"
                  >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <polyline points="3,6 5,6 21,6"/>
                      <path d="m19,6v14a2,2 0 0,1-2,2H7a2,2 0 0,1-2-2V6m3,0V4a2,2 0 0,1,2-2h4a2,2 0 0,1,2,2v2"/>
                    </svg>
                  </button>
                </div>
              </div>

              {/* Divider line */}
              <hr className="border-gray-300 mb-3" />

              {/* Code section */}
              <div className="flex items-center gap-2 mb-3">
                <button
                  onClick={() => handleCopyCode(code.code)}
                  className="p-1 text-gray-600 hover:text-gray-800"
                  title="Copy code"
                >
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <rect x="9" y="9" width="13" height="13" rx="2" ry="2"/>
                    <path d="m5,15H4a2,2 0 0,1-2-2V4a2,2 0 0,1,2-2h9a2,2 0 0,1,2,2v1"/>
                  </svg>
                </button>
                <span className="text-sm text-gray-600 uppercase">{code.code}</span>
              </div>

              {/* Description */}
              <p className="text-xs text-gray-600">
                {code.description}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Confirmation Modal for turning ON */}
      {showConfirmationModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-[0px_4px_120px_2px_rgba(0,0,0,0.25)] relative w-full max-w-md mx-4 overflow-clip">
            {/* Close button - positioned exactly as in Figma */}
            <button 
              onClick={handleCancelToggle}
              className="absolute right-[33px] top-[33px] w-6 h-6 text-gray-500 hover:text-gray-700"
            >
              <div className="absolute bottom-[17.18%] left-[17.18%] right-[17.18%] top-[17.17%]">
                <svg className="w-full h-full" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </div>
            </button>
            
            {/* Modal content - positioned exactly as in Figma */}
            <div className="absolute top-[60px] left-1/2 transform -translate-x-1/2 w-[180px] text-center">
              <p className="font-bold text-black text-[18px] leading-[22px] tracking-[-0.41px] font-['Montserrat']">
                Are you sure you want to turn on invite a friend feature
              </p>
            </div>
            
            {/* Button Container - positioned exactly as in Figma */}
            <div className="absolute top-[189px] left-1/2 transform -translate-x-1/2 flex gap-4">
              {/* Yes Button */}
              <button
                onClick={handleConfirmToggleOn}
                className="bg-black text-white rounded-3xl w-[149px] h-12 font-semibold text-[16px] leading-[22px] font-['Montserrat'] hover:bg-gray-800 transition-colors"
              >
                yes
              </button>
              
              {/* Cancel Button */}
              <button
                onClick={handleCancelToggle}
                className="border border-[#e4e4e4] text-black rounded-[100px] w-[209px] h-16 font-medium text-[16px] leading-[19.2px] font-['Montserrat'] hover:bg-gray-50 transition-colors flex items-center justify-center"
              >
                Cancel
              </button>
            </div>
            
            {/* Modal height spacer to ensure proper modal size */}
            <div className="h-[280px]"></div>
          </div>
        </div>
      )}

      {/* Confirmation Modal for turning OFF */}
      {showOffConfirmationModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-[0px_4px_120px_2px_rgba(0,0,0,0.25)] relative w-full max-w-md mx-4 overflow-clip">
            {/* Close button - positioned exactly as in Figma */}
            <button 
              onClick={handleCancelOffToggle}
              className="absolute right-[33px] top-[33px] w-6 h-6 text-gray-500 hover:text-gray-700"
            >
              <div className="absolute bottom-[17.18%] left-[17.18%] right-[17.18%] top-[17.17%]">
                <svg className="w-full h-full" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </div>
            </button>
            
            {/* Modal content - positioned exactly as in Figma */}
            <div className="absolute top-[60px] left-1/2 transform -translate-x-1/2 w-[180px] text-center">
              <p className="font-bold text-black text-[18px] leading-[22px] tracking-[-0.41px] font-['Montserrat']">
                Are you sure you want to turn off invite a friend feature
              </p>
            </div>
            
            {/* Button Container - positioned exactly as in Figma */}
            <div className="absolute top-[189px] left-1/2 transform -translate-x-1/2 flex gap-4">
              {/* Yes Button */}
              <button
                onClick={handleConfirmToggleOff}
                className="bg-black text-white rounded-3xl w-[149px] h-12 font-semibold text-[16px] leading-[22px] font-['Montserrat'] hover:bg-gray-800 transition-colors"
              >
                yes
              </button>
              
              {/* Cancel Button */}
              <button
                onClick={handleCancelOffToggle}
                className="border border-[#e4e4e4] text-black rounded-[100px] w-[209px] h-16 font-medium text-[16px] leading-[19.2px] font-['Montserrat'] hover:bg-gray-50 transition-colors flex items-center justify-center"
              >
                Cancel
              </button>
            </div>
            
            {/* Modal height spacer to ensure proper modal size */}
            <div className="h-[280px]"></div>
          </div>
        </div>
      )}

      {/* 2FA Modal for turning ON */}
      {show2FAModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div
            className="bg-white rounded-[32px] shadow-[0px_4px_120px_2px_rgba(0,0,0,0.25)] relative"
            style={{ width: '600px', minHeight: '600px', padding: '48px 56px' }}
          >
            {/* Close button */}
            <button 
              onClick={handleCancel2FA}
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            
            {/* Header text */}
            <div className="text-center mb-6">
              <p className="text-lg font-bold text-black mb-4 tracking-[-0.41px] leading-[22px]">
                If you want to change or access these settings please enter the OTP send to your registered mobile no. and the password
              </p>
            </div>

            {/* Verification Code Section */}
            <div className="mb-6">
              <h3 className="text-2xl font-bold text-black mb-2 tracking-[0.72px]">
                Verification code
              </h3>
              <p className="text-sm text-black mb-4">
                Please enter the verification code we sent to your phone number
              </p>
              
              {/* OTP Input Circles */}
              <div className="flex justify-center gap-4 mb-4">
                {otpCode.map((digit, index) => (
                  <input
                    key={index}
                    id={`otp-${index}`}
                    type="text"
                    value={digit}
                    onChange={(e) => handleOtpChange(index, e.target.value)}
                    onKeyDown={(e) => handleOtpKeyDown(index, e)}
                    className="w-12 h-12 border-2 border-gray-300 rounded-full text-center text-lg font-semibold focus:border-blue-500 focus:outline-none"
                    maxLength={1}
                  />
                ))}
              </div>
            </div>

            {/* Email verification text */}
            <p className="text-sm text-black mb-4 text-center">
              Please enter the verification code we sent to your email address
            </p>

            {/* Verification Password Input */}
            <div className="mb-4 relative">
              <input
                type={showVerificationPassword ? "text" : "password"}
                value={verificationPassword}
                onChange={(e) => setVerificationPassword(e.target.value)}
                placeholder="Password"
                className="w-full border-b border-gray-300 pb-2 text-base focus:border-blue-500 focus:outline-none bg-transparent"
              />
              <button
                type="button"
                onClick={() => setShowVerificationPassword(!showVerificationPassword)}
                className="absolute right-0 top-0 text-gray-400 hover:text-gray-600"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  {showVerificationPassword ? (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  ) : (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L3 3m6.878 6.878L21 21" />
                  )}
                </svg>
              </button>
            </div>

            {/* Default code text */}
            <p className="text-sm text-black mb-4">
              Please enter the default code.
            </p>

            {/* Default Password Input */}
            <div className="mb-6 relative">
              <input
                type={showDefaultPassword ? "text" : "password"}
                value={defaultPassword}
                onChange={(e) => setDefaultPassword(e.target.value)}
                placeholder="Password"
                className="w-full border-b border-gray-300 pb-2 text-base focus:border-blue-500 focus:outline-none bg-transparent"
              />
              <button
                type="button"
                onClick={() => setShowDefaultPassword(!showDefaultPassword)}
                className="absolute right-0 top-0 text-gray-400 hover:text-gray-600"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  {showDefaultPassword ? (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  ) : (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L3 3m6.878 6.878L21 21" />
                  )}
                </svg>
              </button>
            </div>

            {/* Submit Button */}
            <button
              onClick={handle2FASubmit}
              className="w-full bg-black text-white py-3 rounded-[26.5px] font-bold text-base uppercase hover:bg-gray-800 transition-colors"
            >
              SUBMIT
            </button>
          </div>
        </div>
      )}

      {/* 2FA Modal for turning OFF */}
      {showOff2FAModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div
            className="bg-white rounded-[32px] shadow-[0px_4px_120px_2px_rgba(0,0,0,0.25)] relative"
            style={{ width: '600px', minHeight: '600px', padding: '48px 56px' }}
          >
            {/* Close button */}
            <button 
              onClick={handleCancelOff2FA}
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            
            {/* Header text */}
            <div className="text-center mb-6">
              <p className="text-lg font-bold text-black mb-4 tracking-[-0.41px] leading-[22px]">
                If you want to change or access these settings please enter the OTP send to your registered mobile no. and the password
              </p>
            </div>

            {/* Verification Code Section */}
            <div className="mb-6">
              <h3 className="text-2xl font-bold text-black mb-2 tracking-[0.72px]">
                Verification code
              </h3>
              <p className="text-sm text-black mb-4">
                Please enter the verification code we sent to your phone number
              </p>
              
              {/* OTP Input Circles */}
              <div className="flex justify-center gap-4 mb-4">
                {otpCode.map((digit, index) => (
                  <input
                    key={index}
                    id={`otp-off-${index}`}
                    type="text"
                    value={digit}
                    onChange={(e) => handleOtpChange(index, e.target.value)}
                    onKeyDown={(e) => handleOtpKeyDown(index, e)}
                    className="w-12 h-12 border-2 border-gray-300 rounded-full text-center text-lg font-semibold focus:border-blue-500 focus:outline-none"
                    maxLength={1}
                  />
                ))}
              </div>
            </div>

            {/* Email verification text */}
            <p className="text-sm text-black mb-4 text-center">
              Please enter the verification code we sent to your email address
            </p>

            {/* Verification Password Input */}
            <div className="mb-4 relative">
              <input
                type={showVerificationPassword ? "text" : "password"}
                value={verificationPassword}
                onChange={(e) => setVerificationPassword(e.target.value)}
                placeholder="Password"
                className="w-full border-b border-gray-300 pb-2 text-base focus:border-blue-500 focus:outline-none bg-transparent"
              />
              <button
                type="button"
                onClick={() => setShowVerificationPassword(!showVerificationPassword)}
                className="absolute right-0 top-0 text-gray-400 hover:text-gray-600"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  {showVerificationPassword ? (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  ) : (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L3 3m6.878 6.878L21 21" />
                  )}
                </svg>
              </button>
            </div>

            {/* Default code text */}
            <p className="text-sm text-black mb-4">
              Please enter the default code.
            </p>

            {/* Default Password Input */}
            <div className="mb-6 relative">
              <input
                type={showDefaultPassword ? "text" : "password"}
                value={defaultPassword}
                onChange={(e) => setDefaultPassword(e.target.value)}
                placeholder="Password"
                className="w-full border-b border-gray-300 pb-2 text-base focus:border-blue-500 focus:outline-none bg-transparent"
              />
              <button
                type="button"
                onClick={() => setShowDefaultPassword(!showDefaultPassword)}
                className="absolute right-0 top-0 text-gray-400 hover:text-gray-600"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  {showDefaultPassword ? (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  ) : (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L3 3m6.878 6.878L21 21" />
                  )}
                </svg>
              </button>
            </div>

            {/* Submit Button */}
            <button
              onClick={handleOff2FASubmit}
              className="w-full bg-black text-white py-3 rounded-[26.5px] font-bold text-base uppercase hover:bg-gray-800 transition-colors"
            >
              SUBMIT
            </button>
          </div>
        </div>
      )}

      {/* Success Modal for turning ON */}
      {showSuccessModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-[0px_4px_120px_2px_rgba(0,0,0,0.25)] relative w-full max-w-md mx-4 overflow-clip">
            {/* Close button - positioned exactly as in Figma */}
            <button 
              onClick={handleCloseSuccessModal}
              className="absolute right-[33px] top-[33px] w-6 h-6 text-gray-500 hover:text-gray-700"
            >
              <div className="absolute bottom-[17.18%] left-[17.18%] right-[17.18%] top-[17.17%]">
                <svg className="w-full h-full" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </div>
            </button>
            
            {/* Modal content - positioned exactly as in Figma */}
            <div className="absolute top-[61px] left-1/2 transform -translate-x-1/2 w-[242px] text-center">
              <p className="font-bold text-black text-[18px] leading-[22px] tracking-[-0.41px] font-['Montserrat']">
                id verified successfully!
              </p>
            </div>
            
            {/* Done Button Container - positioned exactly as in Figma */}
            <div className="absolute top-[155px] left-1/2 transform" style={{ transform: 'translateX(calc(-50% + 7px))' }}>
              <button
                onClick={handleSuccessModalDone}
                className="bg-black text-white rounded-3xl w-[270px] h-12 font-semibold text-[16px] leading-[22px] font-['Montserrat'] hover:bg-gray-800 transition-colors"
              >
                Done
              </button>
            </div>
            
            {/* Modal height spacer to ensure proper modal size */}
            <div className="h-[240px]"></div>
          </div>
        </div>
      )}

      {/* Success Modal for turning OFF */}
      {showOffSuccessModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-[0px_4px_120px_2px_rgba(0,0,0,0.25)] relative w-full max-w-md mx-4 overflow-clip">
            {/* Close button - positioned exactly as in Figma */}
            <button 
              onClick={handleCloseOffSuccessModal}
              className="absolute right-[33px] top-[33px] w-6 h-6 text-gray-500 hover:text-gray-700"
            >
              <div className="absolute bottom-[17.18%] left-[17.18%] right-[17.18%] top-[17.17%]">
                <svg className="w-full h-full" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </div>
            </button>
            
            {/* Modal content - positioned exactly as in Figma */}
            <div className="absolute top-[61px] left-1/2 transform -translate-x-1/2 w-[242px] text-center">
              <p className="font-bold text-black text-[18px] leading-[22px] tracking-[-0.41px] font-['Montserrat']">
                id verified successfully!
              </p>
            </div>
            
            {/* Done Button Container - positioned exactly as in Figma */}
            <div className="absolute top-[155px] left-1/2 transform" style={{ transform: 'translateX(calc(-50% + 7px))' }}>
              <button
                onClick={handleOffSuccessModalDone}
                className="bg-black text-white rounded-3xl w-[270px] h-12 font-semibold text-[16px] leading-[22px] font-['Montserrat'] hover:bg-gray-800 transition-colors"
              >
                Done
              </button>
            </div>
            
            {/* Modal height spacer to ensure proper modal size */}
            <div className="h-[240px]"></div>
          </div>
        </div>
      )}

      {/* Final Success Modal for turning ON */}
      {showFinalSuccessModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-[0px_4px_120px_2px_rgba(0,0,0,0.25)] relative w-full max-w-md mx-4 overflow-clip">
            {/* Close button - positioned exactly as in Figma */}
            <button 
              onClick={handleCloseFinalSuccessModal}
              className="absolute right-[33px] top-[33px] w-6 h-6 text-gray-500 hover:text-gray-700"
            >
              <div className="absolute bottom-[17.18%] left-[17.18%] right-[17.18%] top-[17.17%]">
                <svg className="w-full h-full" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </div>
            </button>
            
            {/* Modal content - positioned exactly as in Figma */}
            <div className="absolute top-[61px] left-1/2 transform -translate-x-1/2 w-[242px] text-center">
              <p className="font-bold text-black text-[18px] leading-[22px] tracking-[-0.41px] font-['Montserrat']">
                invite a friend feature turned on successfully !
              </p>
            </div>
            
            {/* Done Button Container - positioned exactly as in Figma */}
            <div className="absolute top-[155px] left-1/2 transform" style={{ transform: 'translateX(calc(-50% + 7px))' }}>
              <button
                onClick={handleFinalSuccessModalDone}
                className="bg-black text-white rounded-3xl w-[270px] h-12 font-semibold text-[16px] leading-[22px] font-['Montserrat'] hover:bg-gray-800 transition-colors"
              >
                Done
              </button>
            </div>
            
            {/* Modal height spacer to ensure proper modal size */}
            <div className="h-[240px]"></div>
          </div>
        </div>
      )}

      {/* Final Success Modal for turning OFF */}
      {showOffFinalSuccessModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-[0px_4px_120px_2px_rgba(0,0,0,0.25)] relative w-full max-w-md mx-4 overflow-clip">
            {/* Close button - positioned exactly as in Figma */}
            <button 
              onClick={handleCloseOffFinalSuccessModal}
              className="absolute right-[33px] top-[33px] w-6 h-6 text-gray-500 hover:text-gray-700"
            >
              <div className="absolute bottom-[17.18%] left-[17.18%] right-[17.18%] top-[17.17%]">
                <svg className="w-full h-full" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </div>
            </button>
            
            {/* Modal content - positioned exactly as in Figma */}
            <div className="absolute top-[61px] left-1/2 transform -translate-x-1/2 w-[242px] text-center">
              <p className="font-bold text-black text-[18px] leading-[22px] tracking-[-0.41px] font-['Montserrat']">
                invite a friend feature turned off successfully !
              </p>
            </div>
            
            {/* Done Button Container - positioned exactly as in Figma */}
            <div className="absolute top-[155px] left-1/2 transform" style={{ transform: 'translateX(calc(-50% + 7px))' }}>
              <button
                onClick={handleOffFinalSuccessModalDone}
                className="bg-black text-white rounded-3xl w-[270px] h-12 font-semibold text-[16px] leading-[22px] font-['Montserrat'] hover:bg-gray-800 transition-colors"
              >
                Done
              </button>
            </div>
            
            {/* Modal height spacer to ensure proper modal size */}
            <div className="h-[240px]"></div>
          </div>
        </div>
      )}

      {/* Edit Modal */}
      {showEditModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div
            className="bg-white rounded-xl shadow-[0px_4px_120px_2px_rgba(0,0,0,0.25)] relative"
            style={{ width: '1540px', height: '387px' }}
          >
            {/* Close button */}
            <button 
              onClick={handleCancelEdit}
              className="absolute right-6 top-6 w-6 h-6 text-gray-500 hover:text-gray-700"
            >
              <svg className="w-full h-full" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            
            {/* Title */}
            <div className="absolute left-1/2 top-[36px] transform -translate-x-1/2 -translate-y-1/2">
              <h2 className="font-['Montserrat'] text-2xl font-bold text-black text-center">
                Edit code
              </h2>
            </div>

            {/* Generate referral code user name */}
            <div className="absolute left-[446px] top-[82px]">
              <label className="block text-xl font-bold text-black mb-2">
                Generate referral code user name
              </label>
              <div className="h-[41px] w-[687px] border-2 border-black rounded-xl">
                <input
                  type="text"
                  value={editUserName}
                  onChange={(e) => setEditUserName(e.target.value)}
                  className="w-full h-full px-4 text-black border-none outline-none bg-transparent rounded-xl"
                />
              </div>
            </div>

            {/* Code to issue */}
            <div className="absolute left-[446px] top-[184px]">
              <label className="block text-xl font-bold text-black mb-2">
                code to issue
              </label>
              <div className="h-[51px] w-[677px] border-2 border-black rounded-xl">
                <input
                  type="text"
                  value={editCodeToIssue}
                  onChange={(e) => setEditCodeToIssue(e.target.value)}
                  className="w-full h-full px-4 text-black border-none outline-none bg-transparent rounded-xl"
                />
              </div>
            </div>

            {/* Buttons */}
            <div className="absolute bottom-[60px] left-1/2 transform -translate-x-1/2 flex gap-[50px]">
              {/* Save button */}
              <button
                onClick={handleSaveEditedCode}
                className="bg-black rounded-[100px] w-[284px] h-[47px] flex items-center justify-center hover:bg-gray-800 transition-colors"
              >
                <span className="font-['Montserrat'] font-medium text-white text-[16px]">
                  save
                </span>
              </button>

              {/* Go back button */}
              <button
                onClick={handleCancelEdit}
                className="rounded-[100px] w-[284px] h-[47px] border border-[#e4e4e4] flex items-center justify-center hover:bg-gray-50 transition-colors"
              >
                <span className="font-['Montserrat'] font-medium text-black text-[16px]">
                  go back
                </span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Edit 2FA Modal */}
      {showEdit2FAModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div
            className="bg-white rounded-[32px] shadow-[0px_4px_120px_2px_rgba(0,0,0,0.25)] relative"
            style={{ width: '600px', minHeight: '600px', padding: '48px 56px' }}
          >
            {/* Close button */}
            <button 
              onClick={handleCancelEdit2FA}
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            
            {/* Header text */}
            <div className="text-center mb-6">
              <p className="text-lg font-bold text-black mb-4 tracking-[-0.41px] leading-[22px]">
                If you want to change or access these settings please enter the OTP send to your registered mobile no. and the password
              </p>
            </div>

            {/* Verification Code Section */}
            <div className="mb-6">
              <h3 className="text-2xl font-bold text-black mb-2 tracking-[0.72px]">
                Verification code
              </h3>
              <p className="text-sm text-black mb-4">
                Please enter the verification code we sent to your phone number
              </p>
              
              {/* OTP Input Circles */}
              <div className="flex justify-center gap-4 mb-4">
                {otpCode.map((digit, index) => (
                  <input
                    key={index}
                    id={`edit-otp-${index}`}
                    type="text"
                    value={digit}
                    onChange={(e) => handleOtpChange(index, e.target.value)}
                    onKeyDown={(e) => handleOtpKeyDown(index, e)}
                    className="w-12 h-12 border-2 border-gray-300 rounded-full text-center text-lg font-semibold focus:border-blue-500 focus:outline-none"
                    maxLength={1}
                  />
                ))}
              </div>
            </div>

            {/* Email verification text */}
            <p className="text-sm text-black mb-4 text-center">
              Please enter the verification code we sent to your email address
            </p>

            {/* Verification Password Input */}
            <div className="mb-4 relative">
              <input
                type={showVerificationPassword ? "text" : "password"}
                value={verificationPassword}
                onChange={(e) => setVerificationPassword(e.target.value)}
                placeholder="Password"
                className="w-full border-b border-gray-300 pb-2 text-base focus:border-blue-500 focus:outline-none bg-transparent"
              />
              <button
                type="button"
                onClick={() => setShowVerificationPassword(!showVerificationPassword)}
                className="absolute right-0 top-0 text-gray-400 hover:text-gray-600"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  {showVerificationPassword ? (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  ) : (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L3 3m6.878 6.878L21 21" />
                  )}
                </svg>
              </button>
            </div>

            {/* Default code text */}
            <p className="text-sm text-black mb-4">
              Please enter the default code.
            </p>

            {/* Default Password Input */}
            <div className="mb-6 relative">
              <input
                type={showDefaultPassword ? "text" : "password"}
                value={defaultPassword}
                onChange={(e) => setDefaultPassword(e.target.value)}
                placeholder="Password"
                className="w-full border-b border-gray-300 pb-2 text-base focus:border-blue-500 focus:outline-none bg-transparent"
              />
              <button
                type="button"
                onClick={() => setShowDefaultPassword(!showDefaultPassword)}
                className="absolute right-0 top-0 text-gray-400 hover:text-gray-600"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  {showDefaultPassword ? (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  ) : (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L3 3m6.878 6.878L21 21" />
                  )}
                </svg>
              </button>
            </div>

            {/* Submit Button */}
            <button
              onClick={handleEdit2FASubmit}
              className="w-full bg-black text-white py-3 rounded-[26.5px] font-bold text-base uppercase hover:bg-gray-800 transition-colors"
            >
              SUBMIT
            </button>
          </div>
        </div>
      )}

      {/* Edit Success Modal */}
      {showEditSuccessModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-[0px_4px_120px_2px_rgba(0,0,0,0.25)] relative w-full max-w-md mx-4 overflow-clip">
            {/* Close button - positioned exactly as in Figma */}
            <button 
              onClick={handleCloseEditSuccessModal}
              className="absolute right-[33px] top-[33px] w-6 h-6 text-gray-500 hover:text-gray-700"
            >
              <div className="absolute bottom-[17.18%] left-[17.18%] right-[17.18%] top-[17.17%]">
                <svg className="w-full h-full" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </div>
            </button>
            
            {/* Modal content - positioned exactly as in Figma */}
            <div className="absolute top-[61px] left-1/2 transform -translate-x-1/2 w-[242px] text-center">
              <p className="font-bold text-black text-[18px] leading-[22px] tracking-[-0.41px] font-['Montserrat']">
                referral code updated successfully !
              </p>
            </div>
            
            {/* Done Button Container - positioned exactly as in Figma */}
            <div className="absolute top-[155px] left-1/2 transform" style={{ transform: 'translateX(calc(-50% + 7px))' }}>
              <button
                onClick={handleEditSuccessDone}
                className="bg-black text-white rounded-3xl w-[270px] h-12 font-semibold text-[16px] leading-[22px] font-['Montserrat'] hover:bg-gray-800 transition-colors"
              >
                Done
              </button>
            </div>
            
            {/* Modal height spacer to ensure proper modal size */}
            <div className="h-[240px]"></div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {showDeleteConfirmationModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-[0px_4px_120px_2px_rgba(0,0,0,0.25)] relative w-full max-w-md mx-4 overflow-clip">
            {/* Close button - positioned exactly as in Figma */}
            <button 
              onClick={handleCancelDelete}
              className="absolute right-[33px] top-[33px] w-6 h-6 text-gray-500 hover:text-gray-700"
            >
              <div className="absolute bottom-[17.18%] left-[17.18%] right-[17.18%] top-[17.17%]">
                <svg className="w-full h-full" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </div>
            </button>
            
            {/* Modal content - positioned exactly as in Figma */}
            <div className="absolute top-[60px] left-1/2 transform -translate-x-1/2 w-[165px] text-center">
              <p className="font-bold text-black text-[18px] leading-[22px] tracking-[-0.41px] font-['Montserrat']">
                Are you sure you want to delete this code
              </p>
            </div>
            
            {/* Button Container - positioned exactly as in Figma */}
            <div className="absolute top-[189px] left-1/2 transform -translate-x-1/2 flex gap-4">
              {/* Yes Button */}
              <button
                onClick={handleConfirmDelete}
                className="bg-black text-white rounded-3xl w-[149px] h-12 font-semibold text-[16px] leading-[22px] font-['Montserrat'] hover:bg-gray-800 transition-colors"
              >
                yes
              </button>
              
              {/* Cancel Button */}
              <button
                onClick={handleCancelDelete}
                className="border border-[#e4e4e4] text-black rounded-[100px] w-[209px] h-16 font-medium text-[16px] leading-[19.2px] font-['Montserrat'] hover:bg-gray-50 transition-colors flex items-center justify-center"
              >
                Cancel
              </button>
            </div>
            
            {/* Modal height spacer to ensure proper modal size */}
            <div className="h-[280px]"></div>
          </div>
        </div>
      )}

      {/* Delete Success Modal */}
      {showDeleteSuccessModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-[0px_4px_120px_2px_rgba(0,0,0,0.25)] relative w-full max-w-md mx-4 overflow-clip">
            {/* Close button - positioned exactly as in Figma */}
            <button 
              onClick={handleDeleteSuccessDone}
              className="absolute right-[33px] top-[33px] w-6 h-6 text-gray-500 hover:text-gray-700"
            >
              <div className="absolute bottom-[17.18%] left-[17.18%] right-[17.18%] top-[17.17%]">
                <svg className="w-full h-full" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </div>
            </button>
            
            {/* Modal content - positioned exactly as in Figma */}
            <div className="absolute top-[61px] left-1/2 transform -translate-x-1/2 w-[242px] text-center">
              <p className="font-bold text-black text-[18px] leading-[22px] tracking-[-0.41px] font-['Montserrat']">
                referral code deleted successfully !
              </p>
            </div>
            
            {/* Done Button Container - positioned exactly as in Figma */}
            <div className="absolute top-[155px] left-1/2 transform" style={{ transform: 'translateX(calc(-50% + 7px))' }}>
              <button
                onClick={handleDeleteSuccessDone}
                className="bg-black text-white rounded-3xl w-[270px] h-12 font-semibold text-[16px] leading-[22px] font-['Montserrat'] hover:bg-gray-800 transition-colors"
              >
                Done
              </button>
            </div>
            
            {/* Modal height spacer to ensure proper modal size */}
            <div className="h-[240px]"></div>
          </div>
        </div>
      )}

      {/* Issue Code 2FA Modal */}
      {showIssue2FAModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div
            className="bg-white rounded-[32px] shadow-[0px_4px_120px_2px_rgba(0,0,0,0.25)] relative"
            style={{ width: '600px', minHeight: '600px', padding: '48px 56px' }}
          >
            {/* Close button */}
            <button 
              onClick={handleCancelIssue2FA}
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            
            {/* Header text */}
            <div className="text-center mb-6">
              <p className="text-lg font-bold text-black mb-4 tracking-[-0.41px] leading-[22px]">
                If you want to change or access these settings please enter the OTP send to your registered mobile no. and the password
              </p>
            </div>

            {/* Verification Code Section */}
            <div className="mb-6">
              <h3 className="text-2xl font-bold text-black mb-2 tracking-[0.72px]">
                Verification code
              </h3>
              <p className="text-sm text-black mb-4">
                Please enter the verification code we sent to your phone number
              </p>
              
              {/* OTP Input Circles */}
              <div className="flex justify-center gap-4 mb-4">
                {otpCode.map((digit, index) => (
                  <input
                    key={index}
                    id={`issue-otp-${index}`}
                    type="text"
                    value={digit}
                    onChange={(e) => handleOtpChange(index, e.target.value)}
                    onKeyDown={(e) => handleOtpKeyDown(index, e)}
                    className="w-12 h-12 border-2 border-gray-300 rounded-full text-center text-lg font-semibold focus:border-blue-500 focus:outline-none"
                    maxLength={1}
                  />
                ))}
              </div>
            </div>

            {/* Email verification text */}
            <p className="text-sm text-black mb-4 text-center">
              Please enter the verification code we sent to your email address
            </p>

            {/* Verification Password Input */}
            <div className="mb-4 relative">
              <input
                type={showVerificationPassword ? "text" : "password"}
                value={verificationPassword}
                onChange={(e) => setVerificationPassword(e.target.value)}
                placeholder="Password"
                className="w-full border-b border-gray-300 pb-2 text-base focus:border-blue-500 focus:outline-none bg-transparent"
              />
              <button
                type="button"
                onClick={() => setShowVerificationPassword(!showVerificationPassword)}
                className="absolute right-0 top-0 text-gray-400 hover:text-gray-600"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  {showVerificationPassword ? (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  ) : (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L3 3m6.878 6.878L21 21" />
                  )}
                </svg>
              </button>
            </div>

            {/* Default code text */}
            <p className="text-sm text-black mb-4">
              Please enter the default code.
            </p>

            {/* Default Password Input */}
            <div className="mb-6 relative">
              <input
                type={showDefaultPassword ? "text" : "password"}
                value={defaultPassword}
                onChange={(e) => setDefaultPassword(e.target.value)}
                placeholder="Password"
                className="w-full border-b border-gray-300 pb-2 text-base focus:border-blue-500 focus:outline-none bg-transparent"
              />
              <button
                type="button"
                onClick={() => setShowDefaultPassword(!showDefaultPassword)}
                className="absolute right-0 top-0 text-gray-400 hover:text-gray-600"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  {showDefaultPassword ? (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  ) : (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L3 3m6.878 6.878L21 21" />
                  )}
                </svg>
              </button>
            </div>

            {/* Submit Button */}
            <button
              onClick={handleIssue2FASubmit}
              className="w-full bg-black text-white py-3 rounded-[26.5px] font-bold text-base uppercase hover:bg-gray-800 transition-colors"
            >
              SUBMIT
            </button>
          </div>
        </div>
      )}

      {/* Issue Success Modal */}
      {showIssueSuccessModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-[0px_4px_120px_2px_rgba(0,0,0,0.25)] relative w-full max-w-md mx-4 overflow-clip">
            {/* Close button - positioned exactly as in Figma */}
            <button 
              onClick={handleCloseIssueSuccessModal}
              className="absolute right-[33px] top-[33px] w-6 h-6 text-gray-500 hover:text-gray-700"
            >
              <div className="absolute bottom-[17.18%] left-[17.18%] right-[17.18%] top-[17.17%]">
                <svg className="w-full h-full" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </div>
            </button>
            
            {/* Modal content - positioned exactly as in Figma */}
            <div className="absolute top-[61px] left-1/2 transform -translate-x-1/2 w-[242px] text-center">
              <p className="font-bold text-black text-[18px] leading-[22px] tracking-[-0.41px] font-['Montserrat']">
                id verified successfully!
              </p>
            </div>
            
            {/* Done Button Container - positioned exactly as in Figma */}
            <div className="absolute top-[155px] left-1/2 transform" style={{ transform: 'translateX(calc(-50% + 7px))' }}>
              <button
                onClick={handleIssueSuccessModalDone}
                className="bg-black text-white rounded-3xl w-[270px] h-12 font-semibold text-[16px] leading-[22px] font-['Montserrat'] hover:bg-gray-800 transition-colors"
              >
                Done
              </button>
            </div>
            
            {/* Modal height spacer to ensure proper modal size */}
            <div className="h-[240px]"></div>
          </div>
        </div>
      )}

      {/* Issue Final Success Modal */}
      {showIssueFinalSuccessModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-[0px_4px_120px_2px_rgba(0,0,0,0.25)] relative w-full max-w-md mx-4 overflow-clip">
            {/* Close button - positioned exactly as in Figma */}
            <button 
              onClick={handleCloseIssueFinalSuccessModal}
              className="absolute right-[33px] top-[33px] w-6 h-6 text-gray-500 hover:text-gray-700"
            >
              <div className="absolute bottom-[17.18%] left-[17.18%] right-[17.18%] top-[17.17%]">
                <svg className="w-full h-full" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </div>
            </button>
            
            {/* Modal content - positioned exactly as in Figma */}
            <div className="absolute top-[61px] left-1/2 transform -translate-x-1/2 w-[242px] text-center">
              <p className="font-bold text-black text-[18px] leading-[22px] tracking-[-0.41px] font-['Montserrat']">
                promo issued successfully!
              </p>
            </div>
            
            {/* Done Button Container - positioned exactly as in Figma */}
            <div className="absolute top-[155px] left-1/2 transform" style={{ transform: 'translateX(calc(-50% + 7px))' }}>
              <button
                onClick={handleIssueFinalSuccessModalDone}
                className="bg-black text-white rounded-3xl w-[270px] h-12 font-semibold text-[16px] leading-[22px] font-['Montserrat'] hover:bg-gray-800 transition-colors"
              >
                Done
              </button>
            </div>
            
            {/* Modal height spacer to ensure proper modal size */}
            <div className="h-[240px]"></div>
          </div>
        </div>
      )}

      {/* Delete 2FA Modal - Based on first Figma design */}
      {showDelete2FAModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white overflow-clip relative rounded-xl shadow-[0px_4px_120px_2px_rgba(0,0,0,0.25)] w-full max-w-[430px] mx-4">
            {/* Close button */}
            <button 
              onClick={handleCancelDelete2FA}
              className="absolute right-[33px] top-[33px] w-6 h-6 text-gray-500 hover:text-gray-700 z-10"
            >
              <div className="absolute bottom-[17.18%] left-[17.18%] right-[17.18%] top-[17.17%]">
                <svg className="w-full h-full" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </div>
            </button>
            
            {/* Main content text */}
            <div className="absolute left-1/2 top-[23px] transform -translate-x-1/2 w-[303px] text-center">
              <p className="font-bold text-black text-[18px] leading-[22px] tracking-[-0.41px] font-['Montserrat']">
                if you want to change or access these settings please enter the OPT send to your registered mobile no. and the password
              </p>
            </div>
            
            {/* Verification Code Section */}
            <div className="absolute left-16 top-[127px] flex flex-col gap-2">
              <div className="grid-cols-[max-content] grid-rows-[max-content] inline-grid place-items-start relative">
                <div className="grid-cols-[max-content] grid-rows-[max-content] inline-grid leading-[0] place-items-start relative">
                  <div className="font-bold text-black text-[24px] leading-[48px] tracking-[0.72px] font-['Montserrat'] h-[42px] w-[225px]">
                    <p>Verification code</p>
                  </div>
                </div>
              </div>
              <div className="font-normal text-black text-[14px] leading-[24px] font-['Montserrat'] w-[308px]">
                <p>Please enter the verification code we sent to your phone number</p>
              </div>
            </div>
            
            {/* OTP Input Circles */}
            <div className="absolute left-[79px] top-[241px] w-[268px] h-[58px] flex gap-4 justify-center items-center">
              {otpCode.map((digit, index) => (
                <div key={index} className="w-[58px] h-[58px] rounded-full border-2 border-gray-300 flex items-center justify-center">
                  <input
                    id={`delete-otp-${index}`}
                    type="text"
                    value={digit}
                    onChange={(e) => handleOtpChange(index, e.target.value)}
                    onKeyDown={(e) => handleOtpKeyDown(index, e)}
                    className="w-8 h-8 text-center text-xl font-semibold bg-transparent border-none outline-none"
                    maxLength="1"
                  />
                </div>
              ))}
            </div>
            
            {/* Verification Code Input Container */}
            <div className="absolute left-16 top-[373px] flex flex-col gap-5">
              <div className="relative w-[310px] h-[50px]">
                <input
                  type={showVerificationPassword ? "text" : "password"}
                  value={verificationPassword}
                  onChange={(e) => setVerificationPassword(e.target.value)}
                  className="w-full h-full border-b border-gray-300 bg-transparent text-[16px] font-normal font-['Mulish'] tracking-[0.32px] text-[#bdbcbc] outline-none focus:border-black"
                  placeholder="Password"
                />
                <button
                  onClick={() => setShowVerificationPassword(!showVerificationPassword)}
                  className="absolute right-3 top-3.5 w-6 h-6 text-gray-400"
                >
                  <svg className="w-full h-full" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d={showVerificationPassword ? "M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L8.464 8.464m1.414 1.414L12 12m-1.122-2.122L8.464 8.464m0 0L7.05 7.05M21 12a9 9 0 11-18 0 9 9 0 0118 0z" : "M15 12a3 3 0 11-6 0 3 3 0 016 0z M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"} />
                  </svg>
                </button>
              </div>
            </div>
            
            {/* Email verification text */}
            <div className="absolute left-[68px] top-[calc(50%+1px)] transform -translate-y-1/2 w-[308px]">
              <p className="font-normal text-black text-[14px] leading-[24px] font-['Montserrat']">
                Please enter the verification code we sent to your email address
              </p>
            </div>
            
            {/* Password Input Container */}
            <div className="absolute left-16 top-[471px] flex flex-col gap-5">
              <div className="relative w-[310px] h-[50px]">
                <input
                  type={showDefaultPassword ? "text" : "password"}
                  value={defaultPassword}
                  onChange={(e) => setDefaultPassword(e.target.value)}
                  className="w-full h-full border-b border-gray-300 bg-transparent text-[16px] font-normal font-['Mulish'] tracking-[0.32px] text-[#bdbcbc] outline-none focus:border-black"
                  placeholder="Password"
                />
                <button
                  onClick={() => setShowDefaultPassword(!showDefaultPassword)}
                  className="absolute right-3 top-3.5 w-6 h-6 text-gray-400"
                >
                  <svg className="w-full h-full" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d={showDefaultPassword ? "M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L8.464 8.464m1.414 1.414L12 12m-1.122-2.122L8.464 8.464m0 0L7.05 7.05M21 12a9 9 0 11-18 0 9 9 0 0118 0z" : "M15 12a3 3 0 11-6 0 3 3 0 016 0z M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"} />
                  </svg>
                </button>
              </div>
            </div>
            
            {/* Default code text */}
            <div className="absolute left-[65px] top-[calc(50%+111px)] transform -translate-y-1/2 w-[308px]">
              <p className="font-normal text-black text-[14px] leading-[24px] font-['Montserrat']">
                Please enter the default code.
              </p>
            </div>
            
            {/* Submit Button */}
            <div className="absolute left-[58px] top-[569px] w-[310px] h-[51px]">
              <button
                onClick={handleDelete2FASubmit}
                className="w-full h-full bg-black rounded-[26.5px] text-white font-bold text-[16px] leading-[24px] font-['Montserrat'] uppercase hover:bg-gray-800 transition-colors"
              >
                Submit
              </button>
            </div>
            
            {/* Modal height spacer */}
            <div className="h-[650px]"></div>
          </div>
        </div>
      )}

      {/* Delete Final Success Modal - Based on second Figma design */}
      {showDeleteFinalSuccessModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white overflow-clip relative rounded-xl shadow-[0px_4px_120px_2px_rgba(0,0,0,0.25)] w-full max-w-md mx-4">
            {/* Close button */}
            <button 
              onClick={handleCloseDeleteFinalSuccessModal}
              className="absolute right-[33px] top-[33px] w-6 h-6 text-gray-500 hover:text-gray-700 z-10"
            >
              <div className="absolute bottom-[17.18%] left-[17.18%] right-[17.18%] top-[17.17%]">
                <svg className="w-full h-full" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </div>
            </button>
            
            {/* Check icon */}
            <div className="absolute left-1/2 top-[60px] transform -translate-x-1/2 w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
              <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            
            {/* Success message */}
            <div className="absolute left-1/2 top-[115px] transform -translate-x-1/2 w-[242px] text-center">
              <p className="font-bold text-black text-[18px] leading-[22px] tracking-[-0.41px] font-['Montserrat']">
                id verified successfully!
              </p>
            </div>
            
            {/* Done Button Container */}
            <div className="absolute top-[209px] left-1/2 transform" style={{ transform: 'translateX(calc(-50% + 7px))' }}>
              <button
                onClick={handleDeleteFinalSuccessModalDone}
                className="bg-black text-white rounded-3xl w-[270px] h-12 font-semibold text-[16px] leading-[1.406] font-['Montserrat'] hover:bg-gray-800 transition-colors"
              >
                Done
              </button>
            </div>
            
            {/* Modal height spacer */}
            <div className="h-[280px]"></div>
          </div>
        </div>
      )}
    </div>
  );
};

export default InviteAFriend;
