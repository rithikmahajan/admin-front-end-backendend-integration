import React, { useState } from 'react';

/**
 * ManageBannersOnRewards Component
 * 
 * Features:
 * - Image upload functionality for banner creation
 * - Title and detail input fields
 * - Priority management for banners
 * - Preview section showing existing banners
 * - Post to rewards functionality
 * 
 * Performance Optimizations:
 * - useState hooks for local state management
 * - Responsive design with Tailwind CSS
 * - Form validation and error handling
 */
const ManageBannersOnRewards = () => {
  const [title, setTitle] = useState('');
  const [detail, setDetail] = useState('');
  const [selectedImage, setSelectedImage] = useState(null);
  const [showScreenView, setShowScreenView] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showSaveSuccessModal, setShowSaveSuccessModal] = useState(false);
  const [editingBanner, setEditingBanner] = useState(null);
  const [editTitle, setEditTitle] = useState('');
  const [editDetail, setEditDetail] = useState('');
  const [editImage, setEditImage] = useState(null);
  const [banners, setBanners] = useState([
    {
      id: 1,
      title: 'Welcome reward',
      detail: 'Enjoy a welcome reward to spend in your first month.',
      priority: 1,
      image: '/api/placeholder/400/300'
    },
    {
      id: 2,
      title: 'Welcome reward',
      detail: 'Enjoy a welcome reward to spend in your first month.',
      priority: 2,
      image: '/api/placeholder/400/300'
    }
  ]);

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setSelectedImage(e.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handlePostToRewards = () => {
    if (!title || !detail) {
      alert('Please fill in both title and detail fields');
      return;
    }

    const newBanner = {
      id: banners.length + 1,
      title,
      detail,
      priority: banners.length + 1,
      image: selectedImage || '/api/placeholder/400/300'
    };

    setBanners([...banners, newBanner]);
    setTitle('');
    setDetail('');
    setSelectedImage(null);
  };

  const handleDeleteBanner = (bannerId) => {
    setBanners(banners.filter(banner => banner.id !== bannerId));
  };

  const handlePriorityChange = (bannerId, newPriority) => {
    setBanners(banners.map(banner => 
      banner.id === bannerId 
        ? { ...banner, priority: parseInt(newPriority) }
        : banner
    ));
  };

  const handleViewScreenView = () => {
    setShowScreenView(true);
  };

  const handleCloseScreenView = () => {
    setShowScreenView(false);
  };

  const handleEditBanner = (banner) => {
    setEditingBanner(banner);
    setEditTitle(banner.title);
    setEditDetail(banner.detail);
    setEditImage(banner.image);
    setShowEditModal(true);
  };

  const handleSaveEdit = () => {
    if (editingBanner) {
      setBanners(banners.map(banner => 
        banner.id === editingBanner.id 
          ? { 
              ...banner, 
              title: editTitle,
              detail: editDetail,
              image: editImage
            }
          : banner
      ));
      handleCloseEdit();
      setShowSaveSuccessModal(true);
    }
  };

  const handleCloseEdit = () => {
    setShowEditModal(false);
    setEditingBanner(null);
    setEditTitle('');
    setEditDetail('');
    setEditImage(null);
  };

  const handleEditImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setEditImage(e.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleCloseSaveSuccessModal = () => {
    setShowSaveSuccessModal(false);
  };

  return (
    <div className="p-6 bg-white min-h-screen">
      {/* Page Title */}
      <div className="text-center mb-8">
        <h1 className="text-2xl font-bold text-black">manage banner on rewards</h1>
      </div>

      <div className="flex gap-8">
        {/* Left Section - Create Banner */}
        <div className="flex-1 max-w-md">
          {/* Add Image Section */}
          <div className="mb-6">
            <h2 className="text-xl font-bold text-black mb-4 text-center">Add image</h2>
            
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center mb-4">
              {selectedImage ? (
                <img 
                  src={selectedImage} 
                  alt="Uploaded preview" 
                  className="max-w-full max-h-32 mx-auto rounded"
                />
              ) : (
                <div className="text-gray-400">
                  <div className="text-4xl mb-2">📧</div>
                  <p>Click to upload image</p>
                </div>
              )}
            </div>

            <label className="bg-blue-600 text-white px-4 py-2 rounded-lg cursor-pointer inline-flex items-center gap-2 hover:bg-blue-700 transition-colors">
              <span className="text-xl">+</span>
              <span>upload image</span>
              <input
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="hidden"
              />
            </label>
          </div>

          {/* Create Title */}
          <div className="mb-6">
            <label className="block text-lg font-bold text-black mb-2">Create title</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full p-3 border-2 border-black rounded-xl focus:outline-none focus:border-blue-500"
              placeholder="Enter banner title"
            />
          </div>

          {/* Create Detail */}
          <div className="mb-6">
            <label className="block text-lg font-bold text-black mb-2">Create detail</label>
            <textarea
              value={detail}
              onChange={(e) => setDetail(e.target.value)}
              rows={6}
              className="w-full p-3 border-2 border-black rounded-xl resize-none focus:outline-none focus:border-blue-500"
              placeholder="Enter banner details"
            />
          </div>

          {/* Action Buttons */}
          <div className="flex gap-4">
            <button
              onClick={handlePostToRewards}
              className="bg-gray-800 text-white px-12 py-3 rounded-full font-medium hover:bg-gray-700 transition-colors"
            >
              Post to rewards
            </button>
            <button 
              onClick={handleViewScreenView}
              className="bg-red-500 text-white px-12 py-3 rounded-full font-medium hover:bg-red-600 transition-colors"
            >
              View screen view
            </button>
          </div>
        </div>

        {/* Right Section - Preview and Manage */}
        <div className="flex-1">
          {/* Preview Section */}
          <div className="mb-8">
            <h2 className="text-lg font-bold text-black mb-4">Preview and arrange here</h2>
            <div className="bg-gray-100 rounded-lg p-4 h-96 flex items-center justify-center">
              {selectedImage ? (
                <img 
                  src={selectedImage} 
                  alt="Banner preview" 
                  className="max-w-full max-h-full object-contain rounded"
                />
              ) : (
                <div className="text-gray-400 text-center">
                  <p>Preview will appear here</p>
                </div>
              )}
            </div>
          </div>

          {/* All Posting Section */}
          <div>
            <h2 className="text-lg font-bold text-black mb-4">All posting</h2>
            
            {banners.map((banner) => (
              <div key={banner.id} className="mb-6">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-lg font-bold text-black">posting {banner.id}</h3>
                  <div className="flex items-center gap-2">
                    <label className="text-lg font-bold text-black">priority {banner.id}</label>
                    <input
                      type="number"
                      value={banner.priority}
                      onChange={(e) => handlePriorityChange(banner.id, e.target.value)}
                      className="w-20 p-2 border-2 border-black rounded-xl text-center"
                      min="1"
                    />
                  </div>
                </div>
                
                <div className="flex gap-4">
                  {/* Banner Preview */}
                  <div className="w-48 h-32 bg-gray-100 rounded-lg overflow-hidden">
                    <img 
                      src={banner.image} 
                      alt={`Banner ${banner.id}`}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  
                  {/* Banner Details */}
                  <div className="flex-1">
                    <h4 className="font-medium text-black mb-1">{banner.title}</h4>
                    <p className="text-gray-600 text-sm mb-2">{banner.detail}</p>
                    <div className="text-sm text-gray-600">
                      <p>Birthday reward</p>
                      <p>Celebrate your birthday month with a special discount</p>
                      <p className="mt-1">Private members' sale</p>
                      <p>Unlocked after your first order</p>
                    </div>
                  </div>
                  
                  {/* Action Buttons */}
                  <div className="flex flex-col gap-2">
                    <button 
                      onClick={() => handleEditBanner(banner)}
                      className="p-2 text-gray-500 hover:text-blue-500 transition-colors"
                    >
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
                        <path d="m18.5 2.5 3 3L12 15l-4 1 1-4 9.5-9.5z" />
                      </svg>
                    </button>
                    <button 
                      onClick={() => handleDeleteBanner(banner.id)}
                      className="p-2 text-gray-500 hover:text-red-500 transition-colors"
                    >
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <polyline points="3,6 5,6 21,6" />
                        <path d="m19,6v14a2,2 0 0 1-2,2H7a2,2 0 0 1-2-2V6m3,0V4a2,2 0 0 1 2-2h4a2,2 0 0 1 2,2v2" />
                        <line x1="10" y1="11" x2="10" y2="17" />
                        <line x1="14" y1="11" x2="14" y2="17" />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Screen View Modal */}
      {showScreenView && (
        <ScreenViewModal 
          banners={banners}
          onClose={handleCloseScreenView}
        />
      )}

      {/* Edit Banner Modal */}
      {showEditModal && (
        <EditBannerModal
          banner={editingBanner}
          title={editTitle}
          detail={editDetail}
          image={editImage}
          onTitleChange={setEditTitle}
          onDetailChange={setEditDetail}
          onImageChange={handleEditImageUpload}
          onSave={handleSaveEdit}
          onClose={handleCloseEdit}
        />
      )}

      {/* Save Success Modal */}
      {showSaveSuccessModal && (
        <SaveSuccessModal onClose={handleCloseSaveSuccessModal} />
      )}
    </div>
  );
};

/**
 * Screen View Modal Component - Shows mobile app preview with banners
 * Matches the Figma design exactly
 */
const ScreenViewModal = ({ banners, onClose }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-[0px_4px_120px_2px_rgba(0,0,0,0.25)] w-full max-w-7xl max-h-[90vh] overflow-y-auto relative">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div className="flex items-center space-x-4">
            {/* Screen View Button */}
            <div className="bg-red-500 text-white px-12 py-3 rounded-full font-medium">
              screen view
            </div>
            
            {/* Go Back Button */}
            <button
              onClick={onClose}
              className="border border-gray-300 text-black px-12 py-3 rounded-full font-medium hover:bg-gray-50 transition-colors"
            >
              go back
            </button>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex h-[800px]">
          {/* Sidebar Navigation */}
          <div className="w-80 bg-white border-r border-gray-200 p-6 overflow-y-auto">
            <div className="space-y-2">
              {/* Dashboard Section */}
              <div className="mb-6">
                <h3 className="text-2xl font-bold text-black mb-4">Dashboard</h3>
                <div className="space-y-2 text-sm">
                  <div className="text-gray-700">Dashboard</div>
                </div>
              </div>

              {/* App order area */}
              <div className="mb-6">
                <h3 className="text-2xl font-bold text-black mb-4">App order area</h3>
                <div className="space-y-2 text-sm">
                  <div className="text-gray-700">orders</div>
                  <div className="text-gray-700">return requests</div>
                  <div className="text-gray-700">Inbox</div>
                  <div className="text-gray-700">vendor messages</div>
                  <div className="text-gray-700">Users</div>
                </div>
              </div>

              {/* App uploading area */}
              <div className="mb-6">
                <h3 className="text-2xl font-bold text-black mb-4">App uploading area</h3>
                <div className="space-y-2 text-sm">
                  <div className="text-gray-700">Category</div>
                  <div className="text-gray-700">Subcategory</div>
                  <div className="text-gray-700">Items</div>
                  <div className="text-gray-700">Item details</div>
                </div>
              </div>

              {/* App functional area */}
              <div className="mb-6">
                <h3 className="text-2xl font-bold text-black mb-4">App functional area</h3>
                <div className="space-y-2 text-sm">
                  <div className="text-gray-700">Filters</div>
                  <div className="text-gray-700">Promocode</div>
                  <div className="text-gray-700">Points</div>
                  <div className="text-gray-700">Add Faq</div>
                  <div className="text-gray-700">Manage banners rewards</div>
                  <div className="text-gray-700">join us control screen</div>
                  <div className="text-gray-700">Invite a friend</div>
                  <div className="text-gray-700">new admin</div>
                  <div className="text-gray-700">Arrangement control</div>
                  <div className="text-gray-700">product bundling</div>
                </div>
              </div>
            </div>
          </div>

          {/* Mobile Preview */}
          <div className="flex-1 flex items-center justify-center bg-gray-50 p-8">
            <div className="w-96 h-[700px] bg-white rounded-3xl shadow-2xl overflow-hidden border-8 border-gray-800">
              {/* Phone Screen Content */}
              <div className="h-full flex flex-col">
                {/* Status Bar */}
                <div className="bg-black h-8 flex items-center justify-center">
                  <div className="w-16 h-1 bg-white rounded-full"></div>
                </div>

                {/* Content Area */}
                <div className="flex-1 overflow-y-auto">
                  {banners
                    .sort((a, b) => a.priority - b.priority)
                    .map((banner, index) => (
                      <div key={banner.id} className="relative">
                        {/* First Banner - Black with 10% OFF */}
                        {index === 0 && (
                          <div className="bg-black text-white p-8 text-center min-h-[250px] flex flex-col justify-center">
                            <div className="text-xs mb-2">WANT</div>
                            <div className="text-5xl font-bold mb-2">10% OFF</div>
                            <div className="text-lg mb-4">YOUR NEXT PURCHASE?</div>
                            <div className="text-xs mb-1">PLUS REWARD GIVEAWAY AND MORE!</div>
                            <div className="text-xs mt-4">What are you waiting for?</div>
                            <div className="text-xs">Become aRewards member today!</div>
                          </div>
                        )}

                        {/* Second Banner - Yellow Concert Giveaway */}
                        {index === 1 && (
                          <div className="bg-yellow-300 text-black p-6 min-h-[200px]">
                            <div className="text-xs text-center mb-4">Expires in 8 days</div>
                            <div className="text-sm font-bold text-center mb-6">YORAA Concert Giveaways</div>
                            
                            {/* Banner content area */}
                            <div className="flex-1 flex items-center justify-center mb-4">
                              <div className="text-center">
                                <div className="text-2xl font-bold mb-2">{banner.title}</div>
                                <div className="text-sm">{banner.detail}</div>
                              </div>
                            </div>

                            {/* Members Exclusive Label */}
                            <div className="absolute bottom-4 left-4">
                              <div className="border border-black px-4 py-1 text-xs">
                                MEMBERS EXCLUSIVE
                              </div>
                            </div>
                          </div>
                        )}

                        {/* Additional banners */}
                        {index > 1 && (
                          <div className="p-4 border-b border-gray-200">
                            {banner.image && (
                              <img 
                                src={banner.image} 
                                alt={banner.title}
                                className="w-full h-32 object-cover rounded mb-2"
                              />
                            )}
                            <h4 className="font-medium text-sm mb-1">{banner.title}</h4>
                            <p className="text-xs text-gray-600">{banner.detail}</p>
                          </div>
                        )}
                      </div>
                    ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

/**
 * Edit Banner Modal Component - Modal for editing existing banners
 * Matches the Figma design exactly
 */
const EditBannerModal = ({ 
  banner, 
  title, 
  detail, 
  image, 
  onTitleChange, 
  onDetailChange, 
  onImageChange, 
  onSave, 
  onClose 
}) => {
  const detailText = `Welcome reward
Enjoy a welcome reward to spend in your first month.
Birthday reward
Celebrate your birthday month with a special discount
Private members' sale
Unlocked after your first order`;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-[0px_4px_120px_2px_rgba(0,0,0,0.25)] w-full max-w-6xl max-h-[90vh] overflow-y-auto relative">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 hover:bg-gray-100 rounded-lg transition-colors z-10"
          aria-label="Close modal"
        >
          <svg className="h-6 w-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {/* Header */}
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-2xl font-bold text-black text-center">Edit banner on rewards</h2>
        </div>

        {/* Main Content */}
        <div className="flex h-[600px]">
          {/* Left Side - Form */}
          <div className="w-1/2 p-6 space-y-6">
            <div>
              <label className="block text-lg font-bold text-black mb-3">
                Type here
              </label>
              <textarea
                value={detailText}
                onChange={(e) => onDetailChange(e.target.value)}
                rows={12}
                className="w-full px-4 py-3 border-2 border-black rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors text-sm resize-none"
                placeholder="Enter banner details..."
              />
            </div>

            {/* Action Buttons */}
            <div className="flex justify-center space-x-4 pt-4">
              <button
                onClick={onSave}
                className="bg-black text-white font-semibold text-base px-12 py-3 rounded-full hover:bg-gray-800 transition-colors"
                aria-label="Save banner changes"
              >
                save
              </button>
              
              <button
                onClick={onClose}
                className="bg-white text-black font-semibold text-base px-12 py-3 rounded-full border border-gray-300 hover:bg-gray-50 transition-colors"
                aria-label="Cancel editing"
              >
                go back
              </button>
            </div>
          </div>

          {/* Right Side - Preview */}
          <div className="w-1/2 p-6 bg-gray-50">
            <div className="mb-4">
              <h3 className="text-lg font-bold text-black mb-2">Preview and arrange here</h3>
            </div>
            
            <div className="bg-white rounded-lg p-4 h-96 flex items-center justify-center border">
              {image ? (
                <img 
                  src={image} 
                  alt="Banner preview" 
                  className="max-w-full max-h-full object-contain rounded"
                />
              ) : (
                <div className="text-gray-400 text-center">
                  <p>Preview will appear here</p>
                </div>
              )}
            </div>

            {/* Banner Details Preview */}
            <div className="mt-4 p-4 bg-white rounded-lg border">
              <h4 className="font-medium text-black mb-1">{banner?.title || 'Banner Title'}</h4>
              <div className="text-sm text-gray-600 space-y-1">
                <p>Welcome reward</p>
                <p className="text-xs">Enjoy a welcome reward to spend in your first month.</p>
                <p>Birthday reward</p>
                <p className="text-xs">Celebrate your birthday month with a special discount</p>
                <p>Private members' sale</p>
                <p className="text-xs">Unlocked after your first order</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

/**
 * Save Success Modal Component - Shows "posting updated successfully!" notification
 * Matches the Figma design exactly
 */
const SaveSuccessModal = ({ onClose }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-[0px_4px_120px_2px_rgba(0,0,0,0.25)] w-full max-w-md relative p-8">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 hover:bg-gray-100 rounded-lg transition-colors"
          aria-label="Close popup"
        >
          <svg className="h-6 w-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {/* Success Message */}
        <div className="text-center mb-8 mt-4">
          <h2 className="font-['Montserrat'] text-lg font-bold text-black tracking-[-0.41px] leading-[22px]">
            posting updated successfully!
          </h2>
        </div>

        {/* Done Button */}
        <div className="flex justify-center">
          <button
            onClick={onClose}
            className="bg-black text-white font-['Montserrat'] font-semibold text-base px-12 py-3 rounded-full hover:bg-gray-800 transition-colors"
            aria-label="Close success popup"
            style={{ width: '270px', height: '48px' }}
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
};

export default ManageBannersOnRewards;
