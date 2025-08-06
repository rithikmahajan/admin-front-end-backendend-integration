import React, { useState, useCallback, useMemo } from 'react';
import { X } from 'lucide-react';
import TwoFactorAuth from '../components/TwoFactorAuth';
import SuccessModal from '../components/SuccessModal';

// Image constants from Figma design
const imgProgressBar = "http://localhost:3845/assets/910f1120d3bdc0f6938634d6aef7d55a7bec572e.svg";
const imgProgressBar1 = "http://localhost:3845/assets/34772e9eec583c7c3b05d958ac9b0f08ea0df778.svg";
const imgProgressBar2 = "http://localhost:3845/assets/03d7a9eb0b3a258f8463991e4d3604bb169d1d1f.svg";
const imgProgressBar3 = "http://localhost:3845/assets/f3f85ecfe751f814840dadb647864a547b36ca15.svg";

const NewPartner = () => {
  // Consolidated form state
  const [formData, setFormData] = useState({
    name: '',
    newId: '',
    password: '',
    confirmPassword: ''
  });

  // Consolidated modal states
  const [modalStates, setModalStates] = useState({
    showConfirmModal: false,
    showSuccessModal: false,
    show2FAModal: false,
    showVerificationSuccessModal: false,
    showPartnerCreatedSuccessModal: false,
    showBlockConfirmModal: false,
    showBlock2FAModal: false,
    showBlockSuccessModal: false
  });

  // Consolidated action states
  const [actionStates, setActionStates] = useState({
    selectedVendorId: null,
    blockAction: '',
    pendingPartnerData: null,
    pendingBlockData: null
  });

  const [vendors, setVendors] = useState([
    {
      id: 1,
      vendorName: 'rithik',
      vendorId: 'rithik09/28/1998',
      password: '************',
      editPassword: '************',
      status: 'active'
    },
    {
      id: 2,
      vendorName: 'pearl',
      vendorId: 'rithik09/28/1998',
      password: '************',
      editPassword: '************',
      status: 'blocked'
    },
    {
      id: 3,
      vendorName: 'saksham',
      vendorId: 'rithik09/28/1998',
      password: '************',
      editPassword: '************',
      status: 'active'
    },
    {
      id: 4,
      vendorName: 'meetu',
      vendorId: 'rithik09/28/1998',
      password: '************',
      editPassword: '************',
      status: 'active'
    }
  ]);

  const [editingPassword, setEditingPassword] = useState({});
  const [editingEditPassword, setEditingEditPassword] = useState({});

  // Memoized helper functions
  const updateModalState = useCallback((key, value) => {
    setModalStates(prev => ({ ...prev, [key]: value }));
  }, []);

  const updateActionState = useCallback((key, value) => {
    setActionStates(prev => ({ ...prev, [key]: value }));
  }, []);

  const resetForm = useCallback(() => {
    setFormData({
      name: '',
      newId: '',
      password: '',
      confirmPassword: ''
    });
  }, []);

  // Memoized event handlers
  const handleInputChange = useCallback((e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  }, []);

  const handleSubmit = useCallback((e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      alert('Passwords do not match!');
      return;
    }
    
    // Store the form data and show 2FA modal
    const newPartnerData = {
      id: Date.now(), // Simple ID generation
      vendorName: formData.name,
      vendorId: formData.newId,
      password: '************',
      editPassword: '************',
      status: 'active'
    };
    
    updateActionState('pendingPartnerData', newPartnerData);
    updateModalState('show2FAModal', true);
  }, [formData.password, formData.confirmPassword, formData.name, formData.newId, updateActionState, updateModalState]);

  const handleBlockVendor = useCallback((vendorId, action) => {
    const blockData = { vendorId, action };
    updateActionState('selectedVendorId', vendorId);
    updateActionState('blockAction', action);
    updateActionState('pendingBlockData', blockData);
    updateModalState('showBlockConfirmModal', true);
  }, [updateActionState, updateModalState]);

  const confirmBlockVendor = useCallback(() => {
    updateModalState('showBlockConfirmModal', false);
    updateModalState('showBlock2FAModal', true);
  }, [updateModalState]);

  const cancelBlockVendor = useCallback(() => {
    updateModalState('showConfirmModal', false);
    updateActionState('selectedVendorId', null);
  }, [updateModalState, updateActionState]);

  const closeSuccessModal = useCallback(() => {
    updateModalState('showSuccessModal', false);
  }, [updateModalState]);

  // Block/Unblock 2FA Flow handlers
  const handleBlock2FASubmit = useCallback((data) => {
    console.log('Block 2FA Authentication Data:', data);
    updateModalState('showBlock2FAModal', false);
    
    // Update vendor status
    if (actionStates.pendingBlockData) {
      setVendors(prev => 
        prev.map(vendor => 
          vendor.id === actionStates.pendingBlockData.vendorId 
            ? { ...vendor, status: actionStates.pendingBlockData.action === 'block' ? 'blocked' : 'active' }
            : vendor
        )
      );
    }
    
    updateModalState('showBlockSuccessModal', true);
  }, [actionStates.pendingBlockData, updateModalState]);

  const handleCancelBlock2FA = useCallback(() => {
    updateModalState('showBlock2FAModal', false);
    updateActionState('pendingBlockData', null);
    updateActionState('selectedVendorId', null);
  }, [updateModalState, updateActionState]);

  const handleBlockSuccessDone = useCallback(() => {
    updateModalState('showBlockSuccessModal', false);
    updateActionState('pendingBlockData', null);
    updateActionState('selectedVendorId', null);
  }, [updateModalState, updateActionState]);

  const handleCancelBlockConfirm = useCallback(() => {
    updateModalState('showBlockConfirmModal', false);
    updateActionState('pendingBlockData', null);
    updateActionState('selectedVendorId', null);
  }, [updateModalState, updateActionState]);

  // 2FA Flow handlers
  const handle2FASubmit = useCallback((data) => {
    console.log('2FA Authentication Data:', data);
    updateModalState('show2FAModal', false);
    updateModalState('showVerificationSuccessModal', true);
  }, [updateModalState]);

  const handleCancel2FA = useCallback(() => {
    updateModalState('show2FAModal', false);
    updateActionState('pendingPartnerData', null);
  }, [updateModalState, updateActionState]);

  const handleVerificationSuccessDone = useCallback(() => {
    updateModalState('showVerificationSuccessModal', false);
    updateModalState('showPartnerCreatedSuccessModal', true);
  }, [updateModalState]);

  const handlePartnerCreatedSuccessDone = useCallback(() => {
    updateModalState('showPartnerCreatedSuccessModal', false);
    
    // Now create the vendor and reset form
    if (actionStates.pendingPartnerData) {
      setVendors(prev => [...prev, actionStates.pendingPartnerData]);
      updateActionState('pendingPartnerData', null);
      resetForm();
    }
  }, [actionStates.pendingPartnerData, updateModalState, updateActionState, resetForm]);

  const handlePasswordEdit = useCallback((vendorId, field, value) => {
    if (field === 'password') {
      setEditingPassword(prev => ({
        ...prev,
        [vendorId]: value
      }));
    } else if (field === 'editPassword') {
      setEditingEditPassword(prev => ({
        ...prev,
        [vendorId]: value
      }));
    }
  }, []);

  const savePassword = useCallback((vendorId, field) => {
    const newValue = field === 'password' ? editingPassword[vendorId] : editingEditPassword[vendorId];
    if (newValue) {
      setVendors(prev => 
        prev.map(vendor => 
          vendor.id === vendorId 
            ? { ...vendor, [field]: newValue }
            : vendor
        )
      );
      
      // Clear editing state
      if (field === 'password') {
        setEditingPassword(prev => {
          const updated = { ...prev };
          delete updated[vendorId];
          return updated;
        });
      } else {
        setEditingEditPassword(prev => {
          const updated = { ...prev };
          delete updated[vendorId];
          return updated;
        });
      }
    }
  }, [editingPassword, editingEditPassword]);

  // Memoized computed values
  const selectedVendor = useMemo(() => 
    vendors.find(v => v.id === actionStates.selectedVendorId),
    [vendors, actionStates.selectedVendorId]
  );

  const blockSuccessTitle = useMemo(() => 
    actionStates.pendingBlockData?.action === 'block' 
      ? 'partner blocked successfully!' 
      : 'partner unblocked successfully!',
    [actionStates.pendingBlockData?.action]
  );

  return (
    <div className="bg-[#ffffff] relative min-h-screen w-full">
      {/* Header */}
      <div className="text-left pt-10 pb-8 px-8">
        <h1 className="font-bold text-[#000000] text-[24px] leading-[22px]">New Partner</h1>
      </div>

      {/* Form Section */}
      <div className="max-w-sm ml-8 px-0">
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Name Field */}
          <div>
            <label className="block text-[#000000] text-[20px] text-left mb-2 tracking-[-0.5px]">
              Name
            </label>
            <div className="relative">
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                required
                className="w-full h-[47px] px-4 border-2 border-[#000000] rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder=""
              />
            </div>
          </div>

          {/* Make new id Field */}
          <div>
            <label className="block text-[#000000] text-[20px] text-left mb-2 tracking-[-0.5px]">
              Make new id
            </label>
            <div className="relative">
              <input
                type="text"
                name="newId"
                value={formData.newId}
                onChange={handleInputChange}
                required
                className="w-full h-[47px] px-4 border-2 border-[#000000] rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder=""
              />
            </div>
          </div>

          {/* Password Field */}
          <div>
            <label className="block text-[#000000] text-[20px] text-left mb-2 tracking-[-0.5px]">
              Password
            </label>
            <div className="relative">
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                required
                className="w-full h-[47px] px-4 border-2 border-[#000000] rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder=""
              />
            </div>
          </div>

          {/* Confirm Password Field */}
          <div>
            <label className="block text-[#000000] text-[20px] text-left mb-2 tracking-[-0.5px]">
              Confirm password
            </label>
            <div className="relative">
              <input
                type="password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleInputChange}
                required
                className="w-full h-[47px] px-4 border-2 border-[#000000] rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder=""
              />
            </div>
          </div>

          {/* Create Partner Button */}
          <div className="pt-4">
            <button
              type="submit"
              className="bg-[#000000] text-[#ffffff] text-[14px] font-medium px-8 py-3 rounded-full hover:bg-gray-800 transition-colors"
            >
              create partner
            </button>
          </div>
        </form>
      </div>

      {/* Vendors Table Section */}
      <div className="mt-16 px-8">
        {vendors.length > 0 ? (
          <div className="max-w-6xl">
            {/* Table Headers */}
            <div className="grid grid-cols-5 gap-8 mb-4">
              <div className="text-[#000000] text-[20px] text-left tracking-[-0.5px]">vendor name</div>
              <div className="text-[#000000] text-[20px] text-left tracking-[-0.5px]">vendor id</div>
              <div className="text-[#000000] text-[20px] text-center tracking-[-0.5px]">password</div>
              <div className="text-[#000000] text-[20px] text-center tracking-[-0.5px]">edit password</div>
              <div className="text-[#000000] text-[20px] text-center tracking-[-0.5px]">status</div>
            </div>

            {/* Table Rows */}
            {vendors.map((vendor, index) => (
              <div key={vendor.id} className="grid grid-cols-5 gap-8 items-center py-4">
                <div className="text-[#202224] text-[14px] font-bold">{vendor.vendorName}</div>
                <div className="text-[#202224] text-[14px] font-bold">{vendor.vendorId}</div>
                <div className="flex items-center justify-center">
                  {/* Editable Password Field */}
                  {editingPassword[vendor.id] !== undefined ? (
                    <input
                      type="text"
                      value={editingPassword[vendor.id]}
                      onChange={(e) => handlePasswordEdit(vendor.id, 'password', e.target.value)}
                      onBlur={() => savePassword(vendor.id, 'password')}
                      onKeyPress={(e) => e.key === 'Enter' && savePassword(vendor.id, 'password')}
                      className="w-32 px-2 py-1 border border-gray-300 rounded text-sm text-center"
                      autoFocus
                    />
                  ) : (
                    <span 
                      className="text-[#000000] text-[20px] tracking-[-0.5px] cursor-pointer hover:bg-gray-100 px-2 py-1 rounded"
                      onClick={() => handlePasswordEdit(vendor.id, 'password', vendor.password)}
                    >
                      {vendor.password}
                    </span>
                  )}
                </div>
                <div className="flex items-center justify-center">
                  {/* Editable Edit Password Field */}
                  {editingEditPassword[vendor.id] !== undefined ? (
                    <input
                      type="text"
                      value={editingEditPassword[vendor.id]}
                      onChange={(e) => handlePasswordEdit(vendor.id, 'editPassword', e.target.value)}
                      onBlur={() => savePassword(vendor.id, 'editPassword')}
                      onKeyPress={(e) => e.key === 'Enter' && savePassword(vendor.id, 'editPassword')}
                      className="w-32 px-2 py-1 border border-gray-300 rounded text-sm text-center"
                      autoFocus
                    />
                  ) : (
                    <span 
                      className="text-[#000000] text-[20px] tracking-[-0.5px] cursor-pointer hover:bg-gray-100 px-2 py-1 rounded"
                      onClick={() => handlePasswordEdit(vendor.id, 'editPassword', vendor.editPassword)}
                    >
                      {vendor.editPassword}
                    </span>
                  )}
                </div>
                <div className="flex justify-center">
                  {/* Toggle Button */}
                  <button
                    onClick={() => handleBlockVendor(vendor.id, vendor.status === 'active' ? 'block' : 'unblock')}
                    className={`text-[#ffffff] text-[14px] font-normal px-6 py-2.5 rounded-lg border shadow-[0px_1px_2px_0px_rgba(16,24,40,0.05)] transition-colors ${
                      vendor.status === 'active'
                        ? 'bg-[#dc2626] border-[#dc2626] hover:bg-red-700 cursor-pointer'
                        : 'bg-[#16a34a] border-[#16a34a] hover:bg-green-700 cursor-pointer'
                    }`}
                  >
                    {vendor.status === 'active' ? 'Block' : 'Unblock'}
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          // Empty State
          <div className="max-w-6xl">
            <div className="text-center py-16">
              <div className="text-gray-400 text-6xl mb-4">👥</div>
              <h3 className="text-xl font-medium text-gray-600 mb-2">No vendors yet</h3>
              <p className="text-gray-500">Create your first vendor to get started</p>
            </div>
          </div>
        )}
      </div>

      {/* Block Confirmation Modal */}
      {modalStates.showBlockConfirmModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-[0px_4px_120px_2px_rgba(0,0,0,0.25)] p-8 max-w-md w-full mx-4 relative">
            {/* Close button */}
            <button
              onClick={handleCancelBlockConfirm}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
            >
              <X className="h-6 w-6" />
            </button>

            {/* Modal content */}
            <div className="text-center">
              {/* Warning Icon */}
              <div className="flex justify-center mb-6">
                <div className="w-16 h-16 bg-orange-500 rounded-full flex items-center justify-center">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16c-.77.833.192 2.5 1.732 2.5z" />
                  </svg>
                </div>
              </div>

              <h2 className="font-montserrat font-bold text-[18px] text-black mb-8 leading-[22px] tracking-[-0.41px]">
                are you sure you want to {actionStates.pendingBlockData?.action} this partner
              </h2>
              
              <div className="flex justify-center space-x-4">
                {/* Yes button */}
                <button
                  onClick={confirmBlockVendor}
                  className="bg-black text-white px-12 py-4 rounded-full font-medium text-[16px] font-montserrat hover:bg-gray-800 transition-colors"
                >
                  Yes
                </button>
                
                {/* Cancel button */}
                <button
                  onClick={handleCancelBlockConfirm}
                  className="border border-[#e4e4e4] text-black px-12 py-4 rounded-full font-medium text-[16px] font-montserrat hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Success Modal */}
      {modalStates.showSuccessModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-lg p-8 max-w-md w-full mx-4 relative">
            {/* Close button */}
            <button
              onClick={closeSuccessModal}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
            >
              <X className="h-6 w-6" />
            </button>

            {/* Modal content */}
            <div className="text-center">
              <div className="mb-6">
                {/* Success icon */}
                <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
                  <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
              </div>
              
              {(() => {
                const wasBlocked = selectedVendor?.status === 'blocked';
                return (
                  <h2 className="text-lg font-bold text-black mb-6">
                    Vendor {wasBlocked ? 'blocked' : 'unblocked'} successfully
                  </h2>
                );
              })()}
              
              <button
                onClick={closeSuccessModal}
                className="bg-black text-white px-8 py-3 rounded-full font-semibold hover:bg-gray-800 transition-colors"
              >
                OK
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 2FA Modal for Partner Creation */}
      {modalStates.show2FAModal && (
        <TwoFactorAuth
          onSubmit={handle2FASubmit}
          onClose={handleCancel2FA}
          phoneNumber="+91 9876543210"
          emailAddress="admin@yoraa.in"
        />
      )}

      {/* 2FA Modal for Blocking/Unblocking */}
      {modalStates.showBlock2FAModal && (
        <TwoFactorAuth
          onSubmit={handleBlock2FASubmit}
          onClose={handleCancelBlock2FA}
          phoneNumber="+91 9876543210"
          emailAddress="admin@yoraa.in"
        />
      )}

      {/* Verification Success Modal */}
      <SuccessModal
        isOpen={modalStates.showVerificationSuccessModal}
        onClose={handleVerificationSuccessDone}
        title="id verified successfully!"
        buttonText="Done"
      />

      {/* Partner Created Success Modal */}
      <SuccessModal
        isOpen={modalStates.showPartnerCreatedSuccessModal}
        onClose={handlePartnerCreatedSuccessDone}
        title="New Partner created successfully!"
        buttonText="Done"
      />

      {/* Block Success Modal */}
      <SuccessModal
        isOpen={modalStates.showBlockSuccessModal}
        onClose={handleBlockSuccessDone}
        title={blockSuccessTitle}
        buttonText="Done"
      />
    </div>
  );
};

export default NewPartner;
