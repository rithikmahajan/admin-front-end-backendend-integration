import React, { useState } from 'react';
import { Flag, MessageCircle } from 'lucide-react';

const BlockUser = () => {
  const [message, setMessage] = useState('');
  const [users, setUsers] = useState([
    {
      id: 1,
      name: 'Cora Cayetto',
      channel: 'WhatsApp',
      userId: '20231042366',
      phoneNumber: '+629797624012',
      address: '5567 Richmond View Suite 961 Burnaby, 93546-8616',
      isBlocked: false
    }
  ]);

  // Modal states
  const [showBlockConfirm, setShowBlockConfirm] = useState(false);
  const [showUnblockConfirm, setShowUnblockConfirm] = useState(false);
  const [showBlockSuccess, setShowBlockSuccess] = useState(false);
  const [showUnblockSuccess, setShowUnblockSuccess] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  const handleBlockUser = (userId) => {
    const user = users.find(u => u.id === userId);
    setSelectedUser(user);
    
    if (user.isBlocked) {
      setShowUnblockConfirm(true);
    } else {
      setShowBlockConfirm(true);
    }
  };

  const confirmBlockUser = () => {
    setUsers(prev => 
      prev.map(user => 
        user.id === selectedUser.id 
          ? { ...user, isBlocked: true }
          : user
      )
    );
    setShowBlockConfirm(false);
    setShowBlockSuccess(true);
  };

  const confirmUnblockUser = () => {
    setUsers(prev => 
      prev.map(user => 
        user.id === selectedUser.id 
          ? { ...user, isBlocked: false }
          : user
      )
    );
    setShowUnblockConfirm(false);
    setShowUnblockSuccess(true);
  };

  const closeAllModals = () => {
    setShowBlockConfirm(false);
    setShowUnblockConfirm(false);
    setShowBlockSuccess(false);
    setShowUnblockSuccess(false);
    setSelectedUser(null);
  };

  const handleSendMessage = () => {
    if (message.trim()) {
      console.log('Sending message:', message);
      alert('Message sent successfully!');
      setMessage('');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
     
          <div className="text-2xl font-bold text-gray-900">
            block user
          </div>
        

      {/* Main Content */}
      
        <div className="max-w-7xl m-0 p-6">
          
          {/* Page Title */}
          <div className="mb-8">
            <h1 className="text-2xl font-bold text-gray-900 mb-2">block user</h1>
            <p className="text-lg text-gray-700">bioack user system</p>
          </div>

          {/* Users Table */}
          <div className="mb-8">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="text-left py-4 px-4 font-medium text-gray-700 text-base">name</th>
                    <th className="text-left py-4 px-4 font-medium text-gray-700 text-base">Channel</th>
                    <th className="text-left py-4 px-4 font-medium text-gray-700 text-base">ID</th>
                    <th className="text-left py-4 px-4 font-medium text-gray-700 text-base">Phone number</th>
                    <th className="text-left py-4 px-4 font-medium text-gray-700 text-base">Address</th>
                    <th className="text-left py-4 px-4 font-medium text-gray-700 text-base">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map((user) => (
                    <tr key={user.id} className="border-b border-gray-100 hover:bg-gray-50">
                      <td className="py-4 px-4 text-gray-900 font-medium">{user.name}</td>
                      <td className="py-4 px-4">
                        <span className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-green-100 text-green-800">
                          {user.channel}
                        </span>
                      </td>
                      <td className="py-4 px-4 text-gray-900">{user.userId}</td>
                      <td className="py-4 px-4 text-gray-900">{user.phoneNumber}</td>
                      <td className="py-4 px-4 text-gray-700 max-w-xs">
                        <div className="truncate" title={user.address}>
                          {user.address}
                        </div>
                      </td>
                      <td className="py-4 px-4">
                        <div className="flex items-center space-x-2">
                          {/* Flag Button */}
                          <button className="p-2 rounded-lg bg-blue-100 hover:bg-blue-200 transition-colors">
                            <Flag className="h-4 w-4 text-blue-600" />
                          </button>
                          
                          {/* Upgrade Button */}
                          <button className="px-3 py-1 rounded-full text-xs font-medium bg-orange-100 text-orange-600 hover:bg-orange-200 transition-colors">
                            upgrade
                          </button>
                          
                          {/* Block/Unblock Button */}
                          <button
                            onClick={() => handleBlockUser(user.id)}
                            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                              user.isBlocked
                                ? 'bg-green-600 text-white hover:bg-green-700'
                                : 'bg-blue-600 text-white hover:bg-blue-700'
                            }`}
                          >
                            {user.isBlocked ? 'Unblock' : 'Block Now'}
                          </button>
                          
                          {/* Message Limit Button */}
                          <button className="px-3 py-2 rounded-lg bg-black text-white text-sm font-medium hover:bg-gray-800 transition-colors">
                            message limit
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Write a Message Section */}
          <div className="mt-12">
            <h2 className="text-xl font-bold text-gray-900 mb-4">write a message</h2>
            
            <div className="space-y-4">
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Type your message here..."
                className="w-full h-32 px-4 py-3 border-2 border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none"
              />
              
              <div className="flex justify-end">
                <button
                  onClick={handleSendMessage}
                  className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium flex items-center space-x-2"
                >
                  <MessageCircle className="h-4 w-4" />
                  <span>Send Message</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      

      {/* Block User Confirmation Modal */}
      {showBlockConfirm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl p-8 max-w-md w-full mx-4 shadow-2xl">
            <div className="text-center">
              <h3 className="text-xl font-bold text-gray-900 mb-6">
                Are you sure you want to block this user
              </h3>
              <div className="flex space-x-4">
                <button
                  onClick={confirmBlockUser}
                  className="flex-1 bg-black text-white py-3 px-6 rounded-full font-medium hover:bg-gray-800 transition-colors"
                >
                  yes
                </button>
                <button
                  onClick={closeAllModals}
                  className="flex-1 bg-gray-100 text-gray-700 py-3 px-6 rounded-full font-medium hover:bg-gray-200 transition-colors"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Block User Success Modal */}
      {showBlockSuccess && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl p-8 max-w-md w-full mx-4 shadow-2xl">
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-6">
                user blocked successfully
              </h3>
              <button
                onClick={closeAllModals}
                className="w-full bg-black text-white py-3 px-6 rounded-full font-medium hover:bg-gray-800 transition-colors"
              >
                OK
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Unblock User Confirmation Modal */}
      {showUnblockConfirm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl p-8 max-w-md w-full mx-4 shadow-2xl">
            <div className="text-center">
              <h3 className="text-xl font-bold text-gray-900 mb-6">
                Are you sure you want to unblock this user
              </h3>
              <div className="flex space-x-4">
                <button
                  onClick={confirmUnblockUser}
                  className="flex-1 bg-black text-white py-3 px-6 rounded-full font-medium hover:bg-gray-800 transition-colors"
                >
                  yes
                </button>
                <button
                  onClick={closeAllModals}
                  className="flex-1 bg-gray-100 text-gray-700 py-3 px-6 rounded-full font-medium hover:bg-gray-200 transition-colors"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Unblock User Success Modal */}
      {showUnblockSuccess && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl p-8 max-w-md w-full mx-4 shadow-2xl">
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-6">
                user unblocked successfully
              </h3>
              <button
                onClick={closeAllModals}
                className="w-full bg-black text-white py-3 px-6 rounded-full font-medium hover:bg-gray-800 transition-colors"
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

export default BlockUser;
