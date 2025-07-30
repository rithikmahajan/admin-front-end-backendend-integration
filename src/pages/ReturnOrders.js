import React, { useState } from 'react';
import { Info, Send } from 'lucide-react';

const ReturnOrders = () => {
  const [selectedReason, setSelectedReason] = useState('');
  const [status, setStatus] = useState('');
  const [giveReason, setGiveReason] = useState('');
  const [explanation, setExplanation] = useState('');

  // Return reasons from Figma design
  const returnReasons = [
    { id: 1, text: 'Size/fit issue (the knowledge on the product)', checked: true },
    { id: 2, text: 'Product not as expected', checked: false },
    { id: 3, text: 'Wrong item received', checked: false },
    { id: 4, text: 'Damaged/defective product', checked: false },
    { id: 5, text: 'Late delivery', checked: false },
    { id: 6, text: 'Quality not as expected', checked: false }
  ];

  const [reasons, setReasons] = useState(returnReasons);

  const handleReasonChange = (id) => {
    setReasons(reasons.map(reason => 
      reason.id === id ? { ...reason, checked: !reason.checked } : reason
    ));
  };

  const handleStatusChange = (newStatus) => {
    setStatus(newStatus);
  };

  const handleSendResponse = () => {
    // Handle send response logic
    console.log('Sending response with:', {
      selectedReasons: reasons.filter(r => r.checked),
      status,
      giveReason,
      explanation
    });
  };

  // Product images array for the preview section
  const productImages = [
    { id: 1, src: '/api/placeholder/80/80', isMain: true },
    { id: 2, src: '/api/placeholder/60/60', isMain: false },
    { id: 3, src: '/api/placeholder/60/60', isMain: false },
    { id: 4, src: '/api/placeholder/60/60', isMain: false },
    { id: 5, src: '/api/placeholder/60/60', isMain: false }
  ];

  return (
    <div className="space-y-8 bg-gray-50 min-h-screen p-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Return window screen</h1>
      </div>

      {/* Main Content */}
      <div className="bg-white rounded-xl shadow-sm p-8">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
          
          {/* Image Preview Section */}
          <div className="lg:col-span-1">
            <div className="flex items-center space-x-2 mb-4">
              <h3 className="text-lg font-semibold text-gray-900">Image Preview</h3>
              <div className="flex items-center justify-center w-6 h-6 bg-gray-800 text-white rounded-full text-sm font-bold">
                i
              </div>
            </div>
            
            {/* Main Product Image */}
            <div className="mb-4">
              <div className="w-full h-64 bg-gray-200 rounded-lg flex items-center justify-center overflow-hidden">
                <img 
                  src="/api/placeholder/200/250" 
                  alt="Product main view"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            {/* Thumbnail Images */}
            <div className="flex space-x-2">
              {productImages.slice(1).map((image) => (
                <div key={image.id} className="w-12 h-12 bg-gray-200 rounded border-2 border-gray-300 overflow-hidden">
                  <img 
                    src={image.src} 
                    alt={`Product view ${image.id}`}
                    className="w-full h-full object-cover"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Reason of Return Section */}
          <div className="lg:col-span-2">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Reason of return</h3>
            <div className="space-y-3">
              {reasons.map((reason) => (
                <label key={reason.id} className="flex items-start space-x-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={reason.checked}
                    onChange={() => handleReasonChange(reason.id)}
                    className="mt-1 w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                  />
                  <span className="text-sm text-gray-700 leading-relaxed">{reason.text}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Status Section */}
          <div className="lg:col-span-1">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">status</h3>
            <div className="space-y-3">
              <button
                onClick={() => handleStatusChange('accept')}
                className={`w-full px-4 py-2 rounded-full text-sm font-semibold transition-colors ${
                  status === 'accept' 
                    ? 'bg-green-500 text-white' 
                    : 'bg-green-100 text-green-700 hover:bg-green-200'
                }`}
              >
                accept
              </button>
              <button
                onClick={() => handleStatusChange('no')}
                className={`w-full px-4 py-2 rounded-full text-sm font-semibold transition-colors ${
                  status === 'no' 
                    ? 'bg-blue-500 text-white' 
                    : 'bg-blue-100 text-blue-700 hover:bg-blue-200'
                }`}
              >
                no
              </button>
              <button
                onClick={() => handleStatusChange('yes')}
                className={`w-full px-4 py-2 rounded-full text-sm font-semibold transition-colors ${
                  status === 'yes' 
                    ? 'bg-red-500 text-white' 
                    : 'bg-red-100 text-red-700 hover:bg-red-200'
                }`}
              >
                yes
              </button>
              <button
                onClick={() => handleStatusChange('reject')}
                className={`w-full px-6 py-2 rounded-full text-sm font-semibold transition-colors ${
                  status === 'reject' 
                    ? 'bg-red-600 text-white' 
                    : 'bg-red-500 text-white hover:bg-red-600'
                }`}
              >
                reject
              </button>
            </div>
          </div>

          {/* Give Reason & Explanation Section */}
          <div className="lg:col-span-1">
            <div className="space-y-6">
              {/* Give Reason */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">give reason</h3>
                <textarea
                  value={giveReason}
                  onChange={(e) => setGiveReason(e.target.value)}
                  placeholder="Enter reason..."
                  className="w-full h-20 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none text-sm"
                />
              </div>

              {/* Give Explanation */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">give explanation</h3>
                <textarea
                  value={explanation}
                  onChange={(e) => setExplanation(e.target.value)}
                  placeholder="Enter explanation..."
                  className="w-full h-32 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none text-sm"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Send Response Button */}
        <div className="mt-8 flex justify-center">
          <button
            onClick={handleSendResponse}
            className="bg-black text-white px-8 py-3 rounded-full font-semibold hover:bg-gray-800 transition-colors flex items-center space-x-2"
          >
            <span>send response</span>
            <Send className="h-4 w-4" />
          </button>
        </div>
      </div>

      {/* Return Summary Section */}
      <div className="bg-white rounded-xl shadow-sm p-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Return Summary</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Return Status Overview */}
          <div className="bg-gray-50 rounded-lg p-4">
            <h3 className="text-lg font-semibold text-gray-900 mb-3">Status Overview</h3>
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Pending Returns</span>
                <span className="text-sm font-semibold text-orange-600">12</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Approved Returns</span>
                <span className="text-sm font-semibold text-green-600">8</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Rejected Returns</span>
                <span className="text-sm font-semibold text-red-600">3</span>
              </div>
            </div>
          </div>

          {/* Recent Return Reasons */}
          <div className="bg-gray-50 rounded-lg p-4">
            <h3 className="text-lg font-semibold text-gray-900 mb-3">Top Return Reasons</h3>
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Size/Fit Issues</span>
                <span className="text-sm font-semibold text-gray-900">45%</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Quality Issues</span>
                <span className="text-sm font-semibold text-gray-900">28%</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Wrong Item</span>
                <span className="text-sm font-semibold text-gray-900">18%</span>
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="bg-gray-50 rounded-lg p-4">
            <h3 className="text-lg font-semibold text-gray-900 mb-3">Quick Actions</h3>
            <div className="space-y-2">
              <button className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg text-sm hover:bg-blue-600 transition-colors">
                View All Returns
              </button>
              <button className="w-full bg-green-500 text-white py-2 px-4 rounded-lg text-sm hover:bg-green-600 transition-colors">
                Bulk Approve
              </button>
              <button className="w-full bg-gray-500 text-white py-2 px-4 rounded-lg text-sm hover:bg-gray-600 transition-colors">
                Export Report
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReturnOrders;
