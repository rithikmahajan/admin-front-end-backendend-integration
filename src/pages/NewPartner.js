import React, { useState } from 'react';
import { X } from 'lucide-react';

const NewPartner = () => {
  const [formData, setFormData] = useState({
    name: '',
    newId: '',
    password: '',
    confirmPassword: ''
  });

  // Modal states
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [selectedVendorId, setSelectedVendorId] = useState(null);

  const [vendors, setVendors] = useState([
    {
      id: 1,
      vendorName: 'Item id',
      vendorId: 'Item id',
      password: '************',
      editPassword: '************',
      status: 'active'
    },
    {
      id: 2,
      vendorName: 'Item id',
      vendorId: 'Item id',
      password: '************',
      editPassword: '************',
      status: 'active'
    },
    {
      id: 3,
      vendorName: 'Item id',
      vendorId: 'Item id',
      password: '************',
      editPassword: '************',
      status: 'active'
    },
    {
      id: 4,
      vendorName: 'Item id',
      vendorId: 'Item id',
      password: '************',
      editPassword: '************',
      status: 'active'
    }
  ]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      alert('Passwords do not match!');
      return;
    }
    
    // Add logic to create new partner
    console.log('Creating new partner:', formData);
    alert('New partner created successfully!');
    
    // Reset form
    setFormData({
      name: '',
      newId: '',
      password: '',
      confirmPassword: ''
    });
  };

  const handleBlockVendor = (vendorId) => {
    setSelectedVendorId(vendorId);
    setShowConfirmModal(true);
  };

  const confirmBlockVendor = () => {
    setVendors(prev => 
      prev.map(vendor => 
        vendor.id === selectedVendorId 
          ? { ...vendor, status: vendor.status === 'active' ? 'blocked' : 'active' }
          : vendor
      )
    );
    setShowConfirmModal(false);
    setShowSuccessModal(true);
    setSelectedVendorId(null);
  };

  const cancelBlockVendor = () => {
    setShowConfirmModal(false);
    setSelectedVendorId(null);
  };

  const closeSuccessModal = () => {
    setShowSuccessModal(false);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="text-2xl font-bold text-gray-900">
            New Partner
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex">
        {/* Main Panel */}
        <div className="flex-1 p-6">
          <div className="bg-white rounded-xl shadow-sm p-8 max-w-4xl mx-auto">
            
            {/* Form Section */}
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
                New Partner
              </h2>
              
              <form onSubmit={handleSubmit} className="space-y-6 max-w-md mx-auto">
                {/* Name Field */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border-2 border-black rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Enter partner name"
                  />
                </div>

                {/* Make new id Field */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Make new id
                  </label>
                  <input
                    type="text"
                    name="newId"
                    value={formData.newId}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border-2 border-black rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Enter new ID"
                  />
                </div>

                {/* Password Field */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Password
                  </label>
                  <input
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border-2 border-black rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Enter password"
                  />
                </div>

                {/* Confirm Password Field */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Confirm password
                  </label>
                  <input
                    type="password"
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border-2 border-black rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Confirm password"
                  />
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  className="w-full bg-blue-600 text-white py-3 px-4 rounded-xl hover:bg-blue-700 transition-colors duration-200 font-medium"
                >
                  Create Partner
                </button>
              </form>
            </div>

            {/* Vendors Table Section */}
            <div className="mt-12">
              <h3 className="text-xl font-bold text-gray-900 mb-6">Existing Partners</h3>
              
              <div className="overflow-x-auto">
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="border-b border-gray-200">
                      <th className="text-left py-4 px-4 font-medium text-gray-700">Vendor Name</th>
                      <th className="text-left py-4 px-4 font-medium text-gray-700">Vendor ID</th>
                      <th className="text-left py-4 px-4 font-medium text-gray-700">Password</th>
                      <th className="text-left py-4 px-4 font-medium text-gray-700">Edit Password</th>
                      <th className="text-left py-4 px-4 font-medium text-gray-700">Status</th>
                      <th className="text-left py-4 px-4 font-medium text-gray-700">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {vendors.map((vendor) => (
                      <tr key={vendor.id} className="border-b border-gray-100 hover:bg-gray-50">
                        <td className="py-4 px-4 text-gray-900">{vendor.vendorName}</td>
                        <td className="py-4 px-4 text-gray-900">{vendor.vendorId}</td>
                        <td className="py-4 px-4 text-gray-500">{vendor.password}</td>
                        <td className="py-4 px-4 text-gray-500">{vendor.editPassword}</td>
                        <td className="py-4 px-4">
                          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                            vendor.status === 'active' 
                              ? 'bg-green-100 text-green-800' 
                              : 'bg-red-100 text-red-800'
                          }`}>
                            {vendor.status}
                          </span>
                        </td>
                        <td className="py-4 px-4">
                          <button
                            onClick={() => handleBlockVendor(vendor.id)}
                            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                              vendor.status === 'active'
                                ? 'bg-red-600 text-white hover:bg-red-700'
                                : 'bg-green-600 text-white hover:bg-green-700'
                            }`}
                          >
                            {vendor.status === 'active' ? 'Block' : 'Unblock'}
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Confirmation Modal */}
      {showConfirmModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-lg p-8 max-w-md w-full mx-4 relative">
            {/* Close button */}
            <button
              onClick={cancelBlockVendor}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
            >
              <X className="h-6 w-6" />
            </button>

            {/* Modal content */}
            <div className="text-center">
              <h2 className="text-lg font-bold text-black mb-8 leading-6">
                are you sure you want to block
              </h2>
              
              <div className="flex justify-center space-x-4">
                {/* Yes button */}
                <button
                  onClick={confirmBlockVendor}
                  className="bg-black text-white px-6 py-3 rounded-full font-semibold hover:bg-gray-800 transition-colors min-w-[120px]"
                >
                  yes
                </button>
                
                {/* Cancel button */}
                <button
                  onClick={cancelBlockVendor}
                  className="border border-gray-300 text-black px-6 py-3 rounded-full font-medium hover:bg-gray-50 transition-colors min-w-[120px]"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Success Modal */}
      {showSuccessModal && (
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
              
              <h2 className="text-lg font-bold text-black mb-6">
                Vendor blocked successfully
              </h2>
              
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
    </div>
  );
};

export default NewPartner;
