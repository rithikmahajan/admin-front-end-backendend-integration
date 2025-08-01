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
  const [createDetail, setCreateDetail] = useState('');
  const [selectedImage, setSelectedImage] = useState(null);
  const [showScreenView, setShowScreenView] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showSaveSuccessModal, setShowSaveSuccessModal] = useState(false);
  const [editingBanner, setEditingBanner] = useState(null);
  const [editDetail, setEditDetail] = useState('');
  const [editImage, setEditImage] = useState(null);
  const [textPosition, setTextPosition] = useState({ x: 20, y: 20 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const [banners, setBanners] = useState([
    {
      id: 1,
      detail: 'Welcome reward\nEnjoy a welcome reward to spend in your first month.\nBirthday reward\nCelebrate your birthday month with a special discount\nPrivate members\' sale\nUnlocked after your first order',
      priority: 1,
      image: '/api/placeholder/400/300',
      textPosition: { x: 20, y: 20 }
    },
    {
      id: 2,
      detail: 'Welcome reward\nEnjoy a welcome reward to spend in your first month.\nBirthday reward\nCelebrate your birthday month with a special discount\nPrivate members\' sale\nUnlocked after your first order',
      priority: 2,
      image: '/api/placeholder/400/300',
      textPosition: { x: 20, y: 20 }
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
    if (!createDetail.trim()) {
      alert('Please fill in the detail field');
      return;
    }

    const newBanner = {
      id: banners.length + 1,
      detail: createDetail,
      priority: banners.length + 1,
      image: selectedImage || '/api/placeholder/400/300',
      textPosition: { ...textPosition }
    };

    setBanners([...banners, newBanner]);
    setCreateDetail('');
    setSelectedImage(null);
    setTextPosition({ x: 20, y: 20 });
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

  // Drag and drop functionality for text positioning
  const handleMouseDown = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setIsDragging(true);
    setDragOffset({
      x: e.clientX - rect.left - textPosition.x,
      y: e.clientY - rect.top - textPosition.y
    });
  };

  const handleMouseMove = (e) => {
    if (!isDragging) return;
    
    const rect = e.currentTarget.getBoundingClientRect();
    const newX = e.clientX - rect.left - dragOffset.x;
    const newY = e.clientY - rect.top - dragOffset.y;
    
    // Constrain within preview area bounds
    const maxX = rect.width - 200; // Approximate text width
    const maxY = rect.height - 100; // Approximate text height
    
    setTextPosition({
      x: Math.max(0, Math.min(newX, maxX)),
      y: Math.max(0, Math.min(newY, maxY))
    });
  };

  const handleMouseUp = () => {
    setIsDragging(false);
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
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center mb-4 h-32">
              {selectedImage ? (
                <img 
                  src={selectedImage} 
                  alt="Uploaded preview" 
                  className="max-w-full max-h-full mx-auto rounded object-contain"
                />
              ) : (
                <div className="text-gray-400 flex flex-col items-center justify-center h-full">
                  <div className="text-4xl mb-2">📧</div>
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

          {/* Create Detail */}
          <div className="mb-6">
            <label className="block text-lg font-bold text-black mb-2">Create detail</label>
            <textarea
              value={createDetail}
              onChange={(e) => setCreateDetail(e.target.value)}
              rows={8}
              className="w-full p-3 border-2 border-black rounded-xl resize-none focus:outline-none focus:border-blue-500"
              placeholder="Welcome reward&#10;Enjoy a welcome reward to spend in your first month.&#10;Birthday reward&#10;Celebrate your birthday month with a special discount&#10;Private members' sale&#10;Unlocked after your first order"
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
            <div className="flex items-center gap-2 mb-4">
              <h2 className="text-lg font-bold text-black">Preview and arrange here</h2>
              <div className="bg-black text-white rounded-full w-6 h-6 flex items-center justify-center text-sm">
                i
              </div>
            </div>
            <div 
              className="bg-white border-2 border-gray-200 rounded-lg p-4 w-full h-64 relative overflow-hidden cursor-move"
              style={{ aspectRatio: '16/9', maxWidth: '400px' }}
              onMouseDown={handleMouseDown}
              onMouseMove={handleMouseMove}
              onMouseUp={handleMouseUp}
              onMouseLeave={handleMouseUp}
            >
              {/* Background Image */}
              {selectedImage && (
                <img 
                  src={selectedImage} 
                  alt="Banner preview" 
                  className="w-full h-full object-cover rounded absolute inset-0"
                />
              )}
              
              {/* Text Overlay - Merged into image */}
              {(selectedImage || createDetail) && (
                <div
                  className="absolute cursor-move select-none max-w-xs"
                  style={{
                    left: textPosition.x,
                    top: textPosition.y,
                    transform: isDragging ? 'scale(1.02)' : 'scale(1)',
                    transition: isDragging ? 'none' : 'transform 0.2s ease'
                  }}
                  onMouseDown={handleMouseDown}
                >
                  {createDetail ? (
                    <div className="text-sm leading-tight">
                      {createDetail.split('\n').map((line, index) => (
                        <div 
                          key={index} 
                          className={`${index % 2 === 0 ? 'font-bold text-black text-shadow-sm' : 'text-gray-700 mb-2 text-shadow-sm'}`}
                          style={{
                            textShadow: '1px 1px 2px rgba(255, 255, 255, 0.8), -1px -1px 2px rgba(255, 255, 255, 0.8)'
                          }}
                        >
                          {line}
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div 
                      className="text-sm text-gray-600"
                      style={{
                        textShadow: '1px 1px 2px rgba(255, 255, 255, 0.8)'
                      }}
                    >
                      Add text content to preview
                    </div>
                  )}
                </div>
              )}
              
              {/* Centered message when no content */}
              {!selectedImage && !createDetail && (
                <div className="absolute inset-0 flex items-center justify-center text-gray-400">
                  <p>Upload image and add text to preview</p>
                </div>
              )}
            </div>
          </div>

          {/* All Posting Section */}
          <div>
            <h2 className="text-lg font-bold text-black mb-4">All posting</h2>
            
            {banners.map((banner) => (
              <div key={banner.id} className="mb-6">
                <div className="flex items-start gap-4">
                  {/* Left Column - Details */}
                  <div className="flex-1">
                    <div className="mb-2">
                      <h3 className="text-lg font-bold text-black mb-1">posting {banner.id}</h3>
                      <h4 className="text-sm font-medium text-black mb-2">detail</h4>
                      <div className="text-sm text-gray-600 leading-relaxed">
                        {banner.detail.split('\n').map((line, index) => (
                          <div key={index} className={index % 2 === 0 ? 'font-medium text-black' : 'text-gray-600 mb-1'}>
                            {line}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                  
                  {/* Middle Column - Uploaded Image */}
                  <div className="w-32">
                    <h4 className="text-sm font-medium text-black mb-2 text-center">uploaded image</h4>
                    <div className="w-24 h-16 bg-gray-100 border-2 border-dashed border-gray-300 rounded flex items-center justify-center mx-auto">
                      {banner.image && banner.image !== '/api/placeholder/400/300' ? (
                        <img 
                          src={banner.image} 
                          alt={`Banner ${banner.id}`}
                          className="w-full h-full object-cover rounded"
                        />
                      ) : (
                        <div className="text-gray-400 text-xs">📧</div>
                      )}
                    </div>
                  </div>
                  
                  {/* Priority Column */}
                  <div className="w-20">
                    <h4 className="text-sm font-medium text-black mb-2 text-center">priority</h4>
                    <input
                      type="number"
                      value={banner.priority}
                      onChange={(e) => handlePriorityChange(banner.id, e.target.value)}
                      className="w-12 p-1 border-2 border-black rounded text-center mx-auto block"
                      min="1"
                    />
                  </div>
                  
                  {/* Preview Column */}
                  <div className="w-48">
                    <h4 className="text-sm font-medium text-black mb-2 text-center">Preview and arrange here</h4>
                    <div className="w-44 h-32 bg-gray-100 rounded overflow-hidden relative mx-auto" style={{ aspectRatio: '16/11' }}>
                      {banner.image && (
                        <img 
                          src={banner.image} 
                          alt={`Banner ${banner.id} preview`}
                          className="w-full h-full object-cover"
                        />
                      )}
                      <div className="absolute inset-0 p-2">
                        <div className="text-xs leading-tight">
                          {banner.detail.split('\n').slice(0, 4).map((line, index) => (
                            <div 
                              key={index} 
                              className={index % 2 === 0 ? 'font-bold text-black' : 'text-gray-700'}
                              style={{
                                textShadow: '1px 1px 2px rgba(255, 255, 255, 0.8), -1px -1px 2px rgba(255, 255, 255, 0.8)'
                              }}
                            >
                              {line.length > 20 ? line.substring(0, 20) + '...' : line}
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Action Column */}
                  <div className="w-16">
                    <h4 className="text-sm font-medium text-black mb-2 text-center">Action</h4>
                    <div className="flex flex-col gap-2 items-center">
                      <button 
                        onClick={() => handleEditBanner(banner)}
                        className="p-2 text-gray-500 hover:text-blue-500 transition-colors"
                      >
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
                          <path d="m18.5 2.5 3 3L12 15l-4 1 1-4 9.5-9.5z" />
                        </svg>
                      </button>
                      <button 
                        onClick={() => handleDeleteBanner(banner.id)}
                        className="p-2 text-gray-500 hover:text-red-500 transition-colors"
                      >
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <polyline points="3,6 5,6 21,6" />
                          <path d="m19,6v14a2,2 0 0 1-2,2H7a2,2 0 0 1-2-2V6m3,0V4a2,2 0 0 1 2-2h4a2,2 0 0 1 2,2v2" />
                          <line x1="10" y1="11" x2="10" y2="17" />
                          <line x1="14" y1="11" x2="14" y2="17" />
                        </svg>
                      </button>
                    </div>
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
          detail={editDetail}
          image={editImage}
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
          {/* Mobile Preview - Centered */}
          <div className="flex-1 flex items-center justify-center bg-white p-8">
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
                          <div className="bg-yellow-300 text-black p-6 min-h-[200px] relative">
                            <div className="text-xs text-center mb-4">Expires in 8 days</div>
                            <div className="text-sm font-bold text-center mb-6">YORAA Concert Giveaways</div>
                            
                            {/* Banner content area with text overlay */}
                            <div className="flex-1 flex items-center justify-center mb-4">
                              <div className="text-center">
                                {banner.detail.split('\n').slice(0, 2).map((line, idx) => (
                                  <div key={idx} className={idx === 0 ? 'text-lg font-bold mb-1' : 'text-sm'}>
                                    {line}
                                  </div>
                                ))}
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
                                alt="Banner"
                                className="w-full h-32 object-cover rounded mb-2"
                              />
                            )}
                            <div className="text-sm">
                              {banner.detail.split('\n').map((line, idx) => (
                                <div key={idx} className={idx % 2 === 0 ? 'font-medium text-black mb-1' : 'text-xs text-gray-600 mb-2'}>
                                  {line}
                                </div>
                              ))}
                            </div>
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
  detail, 
  image, 
  onDetailChange, 
  onImageChange, 
  onSave, 
  onClose 
}) => {
  const detailText = detail || `Welcome reward
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
              <h4 className="font-medium text-black mb-1">Banner Preview</h4>
              <div className="text-sm text-gray-600 space-y-1">
                {detailText.split('\n').map((line, index) => (
                  <div key={index} className={index % 2 === 0 ? 'font-medium text-black' : 'text-gray-600'}>
                    {line}
                  </div>
                ))}
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
