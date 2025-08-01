import React, { useState, useCallback, useMemo, memo } from 'react';
import { Plus, Edit2, Trash2, Upload, Image as ImageIcon, X, ChevronLeft, ChevronRight } from 'lucide-react';

/**
 * Memoized PostItem Component - Enhanced for different sections
 */
const PostItem = memo(({ post, index, onEdit, onDelete, onPriorityUpdate, sectionType }) => {
  const handlePriorityChange = useCallback((e) => {
    onPriorityUpdate(post.id, parseInt(e.target.value) || 1);
  }, [post.id, onPriorityUpdate]);

  const handleEditClick = useCallback(() => {
    onEdit(post);
  }, [post, onEdit]);

  const handleDeleteClick = useCallback(() => {
    onDelete(post.id);
  }, [post.id, onDelete]);

  return (
    <div className="border-b border-gray-200 pb-6 mb-6">
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <h4 className="text-sm font-bold text-black mb-4">
            {sectionType} {index + 1}
          </h4>
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
            
            {/* Post Content Section - Matches Figma layout */}
            <div className="lg:col-span-2 space-y-3">
              <div>
                <h5 className="font-semibold text-xs mb-1">Welcome reward</h5>
                <p className="text-gray-500 text-xs leading-tight">Enjoy a welcome reward to spend in your first month.</p>
              </div>
              <div>
                <h5 className="font-semibold text-xs mb-1">Birthday reward</h5>
                <p className="text-gray-500 text-xs leading-tight">Celebrate your birthday month with a special discount</p>
              </div>
              <div>
                <h5 className="font-semibold text-xs mb-1">Private members' sale</h5>
                <p className="text-gray-500 text-xs leading-tight">Unlocked after your first order</p>
              </div>
            </div>

            {/* Uploaded Image Section */}
            <div className="flex flex-col items-center">
              <h5 className="text-xs font-bold text-black mb-2">uploaded image</h5>
              <div className="w-24 h-20 border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center overflow-hidden">
                {post.image ? (
                  <img 
                    src={post.image} 
                    alt="Uploaded"
                    className="w-full h-full object-cover rounded"
                  />
                ) : (
                  <ImageIcon className="w-6 h-6 text-gray-400" />
                )}
              </div>
            </div>

            {/* Priority Control Section */}
            <div className="flex flex-col items-center">
              <h5 className="text-xs font-bold text-black mb-2">priority</h5>
              <div className="text-center">
                <div className="text-2xl font-bold text-black mb-2">{post.priority}</div>
                <input
                  type="number"
                  value={post.priority}
                  onChange={handlePriorityChange}
                  className="w-12 px-1 py-1 border border-gray-300 rounded text-center focus:outline-none focus:border-blue-500 transition-colors text-xs"
                  min="1"
                  aria-label={`Priority for ${post.title}`}
                />
              </div>
            </div>

            {/* Preview Section */}
            <div className="flex flex-col items-center">
              <h5 className="text-xs font-bold text-black mb-2">Preview</h5>
              <div className="w-32 h-24 bg-gray-100 rounded-lg flex items-center justify-center overflow-hidden">
                {post.image ? (
                  <img 
                    src={post.image} 
                    alt="Preview"
                    className="w-full h-full object-cover rounded-lg"
                  />
                ) : (
                  <img 
                    src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80" 
                    alt="Default preview" 
                    className="w-full h-full object-cover rounded-lg"
                  />
                )}
              </div>
              <div className="mt-2 text-center space-y-1">
                <div>
                  <h6 className="font-semibold text-[10px] text-black">Welcome reward</h6>
                  <p className="text-gray-500 text-[9px] leading-tight">Enjoy a welcome reward to spend in your first month.</p>
                </div>
                <div>
                  <h6 className="font-semibold text-[10px] text-black">Birthday reward</h6>
                  <p className="text-gray-500 text-[9px] leading-tight">Celebrate your birthday month with a special discount</p>
                </div>
                <div>
                  <h6 className="font-semibold text-[10px] text-black">Private members' sale</h6>
                  <p className="text-gray-500 text-[9px] leading-tight">Unlocked after your first order</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-1 ml-4">
          <button 
            onClick={handleEditClick}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            type="button"
            aria-label={`Edit ${post.title}`}
          >
            <Edit2 className="w-4 h-4 text-gray-500" />
          </button>
          <button 
            onClick={handleDeleteClick}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            type="button"
            aria-label={`Delete ${post.title}`}
          >
            <Trash2 className="w-4 h-4 text-gray-500" />
          </button>
        </div>
      </div>
    </div>
  );
});

PostItem.displayName = 'PostItem';

/**
 * JoinUsControl Component - Complete Header and Footer Implementation
 */
const JoinUsControl = memo(() => {
  // Header form state
  const [headerFormState, setHeaderFormState] = useState({
    detail: '',
    selectedImage: null
  });

  // Bottom form state
  const [bottomFormState, setBottomFormState] = useState({
    detail: '',
    selectedImage: null
  });

  // Modal states
  const [modalStates, setModalStates] = useState({
    isEditModalOpen: false,
    isSuccessModalOpen: false,
    isDeleteSuccessModalOpen: false,
    isScreenViewOpen: false
  });

  // Edit form state
  const [editState, setEditState] = useState({
    editingPost: null,
    editTitle: '',
    editDetail: '',
    editPriority: 1,
    editSection: 'posting'
  });

  // Text positioning states for preview and arrange functionality
  const [headerTextPosition, setHeaderTextPosition] = useState({ x: 20, y: 20 });
  const [bottomTextPosition, setBottomTextPosition] = useState({ x: 20, y: 20 });
  const [isDraggingHeader, setIsDraggingHeader] = useState(false);
  const [isDraggingBottom, setIsDraggingBottom] = useState(false);
  const [headerDragOffset, setHeaderDragOffset] = useState({ x: 0, y: 0 });
  const [bottomDragOffset, setBottomDragOffset] = useState({ x: 0, y: 0 });

  // Posts data with sections
  const [posts, setPosts] = useState(() => [
    {
      id: 1,
      title: 'Welcome reward',
      detail: 'Enjoy a welcome reward to spend in your first month.',
      priority: 1,
      section: 'head',
      image: null,
      textPosition: { x: 20, y: 20 }
    },
    {
      id: 2,
      title: 'Birthday reward', 
      detail: 'Celebrate your birthday month with a special discount',
      priority: 1,
      section: 'posting',
      image: null,
      textPosition: { x: 20, y: 20 }
    },
    {
      id: 3,
      title: 'Private members sale', 
      detail: 'Unlocked after your first order',
      priority: 2,
      section: 'posting',
      image: null,
      textPosition: { x: 20, y: 20 }
    },
    {
      id: 4,
      title: 'Bottom reward',
      detail: 'Special bottom section promotional content',
      priority: 1,
      section: 'bottom',
      image: null,
      textPosition: { x: 20, y: 20 }
    }
  ]);

  /**
   * Header image upload handler
   */
  const handleHeaderImageUpload = useCallback((event) => {
    const file = event.target.files[0];
    if (file) {
      if (headerFormState.selectedImage) {
        URL.revokeObjectURL(headerFormState.selectedImage);
      }
      const imageUrl = URL.createObjectURL(file);
      setHeaderFormState(prev => ({
        ...prev,
        selectedImage: imageUrl
      }));
    }
  }, [headerFormState.selectedImage]);

  /**
   * Bottom image upload handler
   */
  const handleBottomImageUpload = useCallback((event) => {
    const file = event.target.files[0];
    if (file) {
      if (bottomFormState.selectedImage) {
        URL.revokeObjectURL(bottomFormState.selectedImage);
      }
      const imageUrl = URL.createObjectURL(file);
      setBottomFormState(prev => ({
        ...prev,
        selectedImage: imageUrl
      }));
    }
  }, [bottomFormState.selectedImage]);

  /**
   * Header post creation handler
   */
  const handleCreateHeaderPost = useCallback(() => {
    const { detail } = headerFormState;
    
    if (detail) {
      const newPost = {
        id: Date.now(),
        title: 'Header Post',
        detail,
        priority: 1,
        section: 'head',
        image: headerFormState.selectedImage,
        textPosition: { ...headerTextPosition }
      };
      
      setPosts(prevPosts => [...prevPosts, newPost]);
      setHeaderFormState({ detail: '', selectedImage: null });
      setHeaderTextPosition({ x: 20, y: 20 }); // Reset text position
    }
  }, [headerFormState, headerTextPosition]);

  /**
   * Bottom post creation handler
   */
  const handleCreateBottomPost = useCallback(() => {
    const { detail } = bottomFormState;
    
    if (detail) {
      const newPost = {
        id: Date.now() + 1,
        title: 'Bottom Post',
        detail,
        priority: 1,
        section: 'bottom',
        image: bottomFormState.selectedImage,
        textPosition: { ...bottomTextPosition }
      };
      
      setPosts(prevPosts => [...prevPosts, newPost]);
      setBottomFormState({ detail: '', selectedImage: null });
      setBottomTextPosition({ x: 20, y: 20 }); // Reset text position
    }
  }, [bottomFormState, bottomTextPosition]);

  /**
   * Post deletion handler
   */
  const handleDeletePost = useCallback((id) => {
    setPosts(prevPosts => prevPosts.filter(post => post.id !== id));
    setModalStates(prev => ({
      ...prev,
      isDeleteSuccessModalOpen: true
    }));
  }, []);

  /**
   * Priority update handler
   */
  const handlePriorityUpdate = useCallback((id, newPriority) => {
    setPosts(prevPosts => 
      prevPosts.map(post => 
        post.id === id ? { ...post, priority: newPriority } : post
      )
    );
  }, []);

  /**
   * Edit handlers
   */
  const handleEditClick = useCallback((post) => {
    setEditState({
      editingPost: post,
      editTitle: post.title,
      editDetail: post.detail,
      editPriority: post.priority,
      editSection: post.section
    });
    setModalStates(prev => ({
      ...prev,
      isEditModalOpen: true
    }));
  }, []);

  const handleSaveEdit = useCallback(() => {
    const { editingPost, editTitle, editDetail, editPriority } = editState;
    
    if (editingPost) {
      setPosts(prevPosts => 
        prevPosts.map(post => 
          post.id === editingPost.id 
            ? { ...post, title: editTitle, detail: editDetail, priority: editPriority }
            : post
        )
      );
      
      setModalStates(prev => ({
        ...prev,
        isEditModalOpen: false,
        isSuccessModalOpen: true
      }));
      
      setEditState({
        editingPost: null,
        editTitle: '',
        editDetail: '',
        editPriority: 1,
        editSection: 'posting'
      });
    }
  }, [editState]);

  /**
   * Modal handlers
   */
  const handleSuccessModalClose = useCallback(() => {
    setModalStates(prev => ({ ...prev, isSuccessModalOpen: false }));
  }, []);

  const handleDeleteSuccessModalClose = useCallback(() => {
    setModalStates(prev => ({ ...prev, isDeleteSuccessModalOpen: false }));
  }, []);

  const handleScreenViewOpen = useCallback(() => {
    setModalStates(prev => ({ ...prev, isScreenViewOpen: true }));
  }, []);

  const handleScreenViewClose = useCallback(() => {
    setModalStates(prev => ({ ...prev, isScreenViewOpen: false }));
  }, []);

  const handleCancelEdit = useCallback(() => {
    setModalStates(prev => ({ ...prev, isEditModalOpen: false }));
    setEditState({
      editingPost: null,
      editTitle: '',
      editDetail: '',
      editPriority: 1,
      editSection: 'posting'
    });
  }, []);

  /**
   * Form input handlers
   */
  const handleHeaderDetailChange = useCallback((e) => {
    setHeaderFormState(prev => ({ ...prev, detail: e.target.value }));
  }, []);

  const handleBottomDetailChange = useCallback((e) => {
    setBottomFormState(prev => ({ ...prev, detail: e.target.value }));
  }, []);

  const handleEditTitleChange = useCallback((e) => {
    setEditState(prev => ({ ...prev, editTitle: e.target.value }));
  }, []);

  const handleEditDetailChange = useCallback((e) => {
    setEditState(prev => ({ ...prev, editDetail: e.target.value }));
  }, []);

  const handleEditPriorityChange = useCallback((e) => {
    setEditState(prev => ({ ...prev, editPriority: parseInt(e.target.value) || 1 }));
  }, []);

  /**
   * Image removal handlers
   */
  const handleRemoveHeaderImage = useCallback(() => {
    if (headerFormState.selectedImage) {
      URL.revokeObjectURL(headerFormState.selectedImage);
    }
    setHeaderFormState(prev => ({ ...prev, selectedImage: null }));
  }, [headerFormState.selectedImage]);

  const handleRemoveBottomImage = useCallback(() => {
    if (bottomFormState.selectedImage) {
      URL.revokeObjectURL(bottomFormState.selectedImage);
    }
    setBottomFormState(prev => ({ ...prev, selectedImage: null }));
  }, [bottomFormState.selectedImage]);

  /**
   * Drag and drop functionality for text positioning - Header
   */
  const handleHeaderMouseDown = useCallback((e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setIsDraggingHeader(true);
    setHeaderDragOffset({
      x: e.clientX - rect.left - headerTextPosition.x,
      y: e.clientY - rect.top - headerTextPosition.y
    });
  }, [headerTextPosition]);

  const handleHeaderMouseMove = useCallback((e) => {
    if (!isDraggingHeader) return;
    
    const rect = e.currentTarget.getBoundingClientRect();
    const newX = e.clientX - rect.left - headerDragOffset.x;
    const newY = e.clientY - rect.top - headerDragOffset.y;
    
    // Constrain within preview area bounds
    const maxX = rect.width - 200; // Approximate text width
    const maxY = rect.height - 100; // Approximate text height
    
    setHeaderTextPosition({
      x: Math.max(0, Math.min(newX, maxX)),
      y: Math.max(0, Math.min(newY, maxY))
    });
  }, [isDraggingHeader, headerDragOffset]);

  const handleHeaderMouseUp = useCallback(() => {
    setIsDraggingHeader(false);
  }, []);

  /**
   * Drag and drop functionality for text positioning - Bottom
   */
  const handleBottomMouseDown = useCallback((e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setIsDraggingBottom(true);
    setBottomDragOffset({
      x: e.clientX - rect.left - bottomTextPosition.x,
      y: e.clientY - rect.top - bottomTextPosition.y
    });
  }, [bottomTextPosition]);

  const handleBottomMouseMove = useCallback((e) => {
    if (!isDraggingBottom) return;
    
    const rect = e.currentTarget.getBoundingClientRect();
    const newX = e.clientX - rect.left - bottomDragOffset.x;
    const newY = e.clientY - rect.top - bottomDragOffset.y;
    
    // Constrain within preview area bounds
    const maxX = rect.width - 200; // Approximate text width
    const maxY = rect.height - 100; // Approximate text height
    
    setBottomTextPosition({
      x: Math.max(0, Math.min(newX, maxX)),
      y: Math.max(0, Math.min(newY, maxY))
    });
  }, [isDraggingBottom, bottomDragOffset]);

  const handleBottomMouseUp = useCallback(() => {
    setIsDraggingBottom(false);
  }, []);

  /**
   * Computed values
   */
  const headPosts = useMemo(() => 
    posts.filter(post => post.section === 'head').sort((a, b) => a.priority - b.priority), 
    [posts]
  );

  const postingPosts = useMemo(() => 
    posts.filter(post => post.section === 'posting').sort((a, b) => a.priority - b.priority), 
    [posts]
  );

  const bottomPosts = useMemo(() => 
    posts.filter(post => post.section === 'bottom').sort((a, b) => a.priority - b.priority), 
    [posts]
  );

  // Cleanup effect
  React.useEffect(() => {
    return () => {
      if (headerFormState.selectedImage) {
        URL.revokeObjectURL(headerFormState.selectedImage);
      }
      if (bottomFormState.selectedImage) {
        URL.revokeObjectURL(bottomFormState.selectedImage);
      }
    };
  }, [headerFormState.selectedImage, bottomFormState.selectedImage]);

  return (
    <div className="min-h-screen">
      <div className="p-6">
        
        {/* Main Header */}
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-black mb-6">join us control screen</h1>
        </div>

        {/* Add Header Details Section */}
        <div className="mb-16">
          <h2 className="text-lg font-bold text-black mb-8 text-center">Add header details</h2>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            
            {/* Header - Add Image Section */}
            <div className="space-y-4">
              <div className="text-center">
                <h3 className="text-sm font-bold text-black mb-4">Add image</h3>
                
                <div className="border-2 border-dashed border-gray-400 rounded-lg p-8 text-center h-48 flex flex-col items-center justify-center">
                  {headerFormState.selectedImage ? (
                    <div className="space-y-3">
                      <img 
                        src={headerFormState.selectedImage} 
                        alt="Header uploaded preview" 
                        className="max-w-full max-h-32 object-contain mx-auto rounded-lg"
                        loading="lazy"
                      />
                      <button
                        onClick={handleRemoveHeaderImage}
                        className="text-red-500 hover:text-red-700 transition-colors text-xs"
                        type="button"
                      >
                        Remove Image
                      </button>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      <div className="w-16 h-16 mx-auto border-2 border-gray-400 rounded-lg flex items-center justify-center">
                        <ImageIcon className="w-8 h-8 text-gray-400" />
                      </div>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleHeaderImageUpload}
                        className="hidden"
                        id="header-image-upload"
                        aria-label="Upload header image file"
                      />
                      <label
                        htmlFor="header-image-upload"
                        className="bg-blue-600 text-white px-6 py-2 rounded-md cursor-pointer hover:bg-blue-700 inline-flex items-center gap-2 transition-colors text-sm font-medium"
                      >
                        <Plus className="w-4 h-4" />
                        upload image
                      </label>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Header - Create Detail Section */}
            <div className="space-y-4">
              <div>
                <h3 className="text-sm font-bold text-black mb-4">Create detail</h3>
                <textarea
                  value={headerFormState.detail}
                  onChange={handleHeaderDetailChange}
                  rows={10}
                  className="w-full px-4 py-4 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 resize-none transition-colors text-sm"
                  placeholder=""
                  aria-label="Header post details"
                />
              </div>
            </div>

            {/* Header - Preview Section */}
            <div className="space-y-4">
              <div>
                <div className="flex items-center gap-2 mb-4">
                  <h3 className="text-sm font-bold text-black">Preview and arrange</h3>
                  <div className="w-4 h-4 bg-gray-800 rounded-full flex items-center justify-center">
                    <span className="text-white text-[10px]">i</span>
                  </div>
                </div>
                
                <div 
                  className="bg-gray-100 rounded-lg h-48 mb-4 flex items-center justify-center overflow-hidden relative cursor-move"
                  onMouseDown={handleHeaderMouseDown}
                  onMouseMove={handleHeaderMouseMove}
                  onMouseUp={handleHeaderMouseUp}
                  onMouseLeave={handleHeaderMouseUp}
                >
                  {/* Background Image */}
                  {headerFormState.selectedImage ? (
                    <img 
                      src={headerFormState.selectedImage} 
                      alt="Header preview" 
                      className="w-full h-full object-cover rounded-lg absolute inset-0"
                      loading="lazy"
                    />
                  ) : (
                    <img 
                      src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80" 
                      alt="Default header preview" 
                      className="w-full h-full object-cover rounded-lg absolute inset-0"
                      loading="lazy"
                    />
                  )}

                  {/* Draggable Text Overlay */}
                  <div
                    className="absolute cursor-move select-none max-w-xs z-10"
                    style={{
                      left: headerTextPosition.x,
                      top: headerTextPosition.y,
                      transform: isDraggingHeader ? 'scale(1.02)' : 'scale(1)',
                      transition: isDraggingHeader ? 'none' : 'transform 0.2s ease'
                    }}
                    onMouseDown={handleHeaderMouseDown}
                  >
                    <div className="text-xs space-y-1">
                      {headerFormState.detail ? (
                        <div className="space-y-1">
                          {headerFormState.detail.split('\n').map((line, index) => (
                            <div 
                              key={index} 
                              className="font-semibold text-black"
                              style={{
                                textShadow: '1px 1px 2px rgba(255, 255, 255, 0.8), -1px -1px 2px rgba(255, 255, 255, 0.8)'
                              }}
                            >
                              {line}
                            </div>
                          ))}
                        </div>
                      ) : (
                        <div className="space-y-1">
                          <div>
                            <h4 className="font-semibold text-black mb-1" style={{
                              textShadow: '1px 1px 2px rgba(255, 255, 255, 0.8), -1px -1px 2px rgba(255, 255, 255, 0.8)'
                            }}>Welcome reward</h4>
                            <p className="text-gray-700 leading-tight" style={{
                              textShadow: '1px 1px 2px rgba(255, 255, 255, 0.8)'
                            }}>Enjoy a welcome reward to spend in your first month.</p>
                          </div>
                          <div>
                            <h4 className="font-semibold text-black mb-1" style={{
                              textShadow: '1px 1px 2px rgba(255, 255, 255, 0.8), -1px -1px 2px rgba(255, 255, 255, 0.8)'
                            }}>Birthday reward</h4>
                            <p className="text-gray-700 leading-tight" style={{
                              textShadow: '1px 1px 2px rgba(255, 255, 255, 0.8)'
                            }}>Celebrate your birthday month with a special discount</p>
                          </div>
                          <div>
                            <h4 className="font-semibold text-black mb-1" style={{
                              textShadow: '1px 1px 2px rgba(255, 255, 255, 0.8), -1px -1px 2px rgba(255, 255, 255, 0.8)'
                            }}>Private members' sale</h4>
                            <p className="text-gray-700 leading-tight" style={{
                              textShadow: '1px 1px 2px rgba(255, 255, 255, 0.8)'
                            }}>Unlocked after your first order</p>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Helper text when dragging is available */}
                  {!headerFormState.selectedImage && !headerFormState.detail && (
                    <div className="absolute inset-0 flex items-center justify-center text-gray-400 text-sm">
                      <p>Drag text to arrange position</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Header Action Buttons */}
          <div className="mt-8 flex justify-center gap-4">
            <button
              onClick={handleCreateHeaderPost}
              className="bg-black text-white px-12 py-3 rounded-full hover:bg-gray-800 transition-colors text-sm font-medium"
              disabled={!headerFormState.detail}
              type="button"
            >
              Post to head
            </button>
            <button 
              onClick={handleScreenViewOpen}
              className="bg-red-500 text-white px-8 py-3 rounded-full hover:bg-red-600 transition-colors text-sm font-medium"
              type="button"
            >
              screen view
            </button>
          </div>
        </div>

        {/* Add Bottom Details Section */}
        <div className="mb-16">
          <h2 className="text-lg font-bold text-black mb-8 text-center">Add bottom details</h2>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            
            {/* Bottom - Add Image Section */}
            <div className="space-y-4">
              <div className="text-center">
                <h3 className="text-sm font-bold text-black mb-4">Add image</h3>
                
                <div className="border-2 border-dashed border-gray-400 rounded-lg p-8 text-center h-48 flex flex-col items-center justify-center">
                  {bottomFormState.selectedImage ? (
                    <div className="space-y-3">
                      <img 
                        src={bottomFormState.selectedImage} 
                        alt="Bottom uploaded preview" 
                        className="max-w-full max-h-32 object-contain mx-auto rounded-lg"
                        loading="lazy"
                      />
                      <button
                        onClick={handleRemoveBottomImage}
                        className="text-red-500 hover:text-red-700 transition-colors text-xs"
                        type="button"
                      >
                        Remove Image
                      </button>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      <div className="w-16 h-16 mx-auto border-2 border-gray-400 rounded-lg flex items-center justify-center">
                        <ImageIcon className="w-8 h-8 text-gray-400" />
                      </div>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleBottomImageUpload}
                        className="hidden"
                        id="bottom-image-upload"
                        aria-label="Upload bottom image file"
                      />
                      <label
                        htmlFor="bottom-image-upload"
                        className="bg-blue-600 text-white px-6 py-2 rounded-md cursor-pointer hover:bg-blue-700 inline-flex items-center gap-2 transition-colors text-sm font-medium"
                      >
                        <Plus className="w-4 h-4" />
                        upload image
                      </label>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Bottom - Create Detail Section */}
            <div className="space-y-4">
              <div>
                <h3 className="text-sm font-bold text-black mb-4">Create detail</h3>
                <textarea
                  value={bottomFormState.detail}
                  onChange={handleBottomDetailChange}
                  rows={10}
                  className="w-full px-4 py-4 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 resize-none transition-colors text-sm"
                  placeholder=""
                  aria-label="Bottom post details"
                />
              </div>
            </div>

            {/* Bottom - Preview Section */}
            <div className="space-y-4">
              <div>
                <div className="flex items-center gap-2 mb-4">
                  <h3 className="text-sm font-bold text-black">Preview and arrange</h3>
                  <div className="w-4 h-4 bg-gray-800 rounded-full flex items-center justify-center">
                    <span className="text-white text-[10px]">i</span>
                  </div>
                </div>
                
                <div 
                  className="bg-gray-100 rounded-lg h-48 mb-4 flex items-center justify-center overflow-hidden relative cursor-move"
                  onMouseDown={handleBottomMouseDown}
                  onMouseMove={handleBottomMouseMove}
                  onMouseUp={handleBottomMouseUp}
                  onMouseLeave={handleBottomMouseUp}
                >
                  {/* Background Image */}
                  {bottomFormState.selectedImage ? (
                    <img 
                      src={bottomFormState.selectedImage} 
                      alt="Bottom preview" 
                      className="w-full h-full object-cover rounded-lg absolute inset-0"
                      loading="lazy"
                    />
                  ) : (
                    <img 
                      src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80" 
                      alt="Default bottom preview" 
                      className="w-full h-full object-cover rounded-lg absolute inset-0"
                      loading="lazy"
                    />
                  )}

                  {/* Draggable Text Overlay */}
                  <div
                    className="absolute cursor-move select-none max-w-xs z-10"
                    style={{
                      left: bottomTextPosition.x,
                      top: bottomTextPosition.y,
                      transform: isDraggingBottom ? 'scale(1.02)' : 'scale(1)',
                      transition: isDraggingBottom ? 'none' : 'transform 0.2s ease'
                    }}
                    onMouseDown={handleBottomMouseDown}
                  >
                    <div className="text-xs space-y-1">
                      {bottomFormState.detail ? (
                        <div className="space-y-1">
                          {bottomFormState.detail.split('\n').map((line, index) => (
                            <div 
                              key={index} 
                              className="font-semibold text-black"
                              style={{
                                textShadow: '1px 1px 2px rgba(255, 255, 255, 0.8), -1px -1px 2px rgba(255, 255, 255, 0.8)'
                              }}
                            >
                              {line}
                            </div>
                          ))}
                        </div>
                      ) : (
                        <div className="space-y-1">
                          <div>
                            <h4 className="font-semibold text-black mb-1" style={{
                              textShadow: '1px 1px 2px rgba(255, 255, 255, 0.8), -1px -1px 2px rgba(255, 255, 255, 0.8)'
                            }}>Welcome reward</h4>
                            <p className="text-gray-700 leading-tight" style={{
                              textShadow: '1px 1px 2px rgba(255, 255, 255, 0.8)'
                            }}>Enjoy a welcome reward to spend in your first month.</p>
                          </div>
                          <div>
                            <h4 className="font-semibold text-black mb-1" style={{
                              textShadow: '1px 1px 2px rgba(255, 255, 255, 0.8), -1px -1px 2px rgba(255, 255, 255, 0.8)'
                            }}>Birthday reward</h4>
                            <p className="text-gray-700 leading-tight" style={{
                              textShadow: '1px 1px 2px rgba(255, 255, 255, 0.8)'
                            }}>Celebrate your birthday month with a special discount</p>
                          </div>
                          <div>
                            <h4 className="font-semibold text-black mb-1" style={{
                              textShadow: '1px 1px 2px rgba(255, 255, 255, 0.8), -1px -1px 2px rgba(255, 255, 255, 0.8)'
                            }}>Private members' sale</h4>
                            <p className="text-gray-700 leading-tight" style={{
                              textShadow: '1px 1px 2px rgba(255, 255, 255, 0.8)'
                            }}>Unlocked after your first order</p>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Helper text when dragging is available */}
                  {!bottomFormState.selectedImage && !bottomFormState.detail && (
                    <div className="absolute inset-0 flex items-center justify-center text-gray-400 text-sm">
                      <p>Drag text to arrange position</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Action Buttons */}
          <div className="mt-8 flex justify-center gap-4">
            <button
              onClick={handleCreateBottomPost}
              className="bg-black text-white px-12 py-3 rounded-full hover:bg-gray-800 transition-colors text-sm font-medium"
              disabled={!bottomFormState.detail}
              type="button"
            >
              Post to bottom
            </button>
            <button 
              onClick={handleScreenViewOpen}
              className="bg-red-500 text-white px-8 py-3 rounded-full hover:bg-red-600 transition-colors text-sm font-medium"
              type="button"
            >
              screen view
            </button>
          </div>
        </div>

        {/* Posts Management Section with CRUD */}
        <div className="mt-12 space-y-12">
          
          {/* Head Section */}
          <div>
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold text-black">Head</h3>
            </div>

            {headPosts.map((post, index) => (
              <PostItem
                key={post.id}
                post={post}
                index={index}
                onEdit={handleEditClick}
                onDelete={handleDeletePost}
                onPriorityUpdate={handlePriorityUpdate}
                sectionType="head posting"
              />
            ))}

            {headPosts.length === 0 && (
              <div className="border-b border-gray-200 pb-6 mb-6">
                <p className="text-gray-500 text-sm text-center py-8">No head posts yet. Create one using the form above.</p>
              </div>
            )}
          </div>

          {/* All Posting Section */}
          <div>
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold text-black">All posting</h3>
            </div>

            {postingPosts.map((post, index) => (
              <PostItem
                key={post.id}
                post={post}
                index={index}
                onEdit={handleEditClick}
                onDelete={handleDeletePost}
                onPriorityUpdate={handlePriorityUpdate}
                sectionType="posting"
              />
            ))}

            {postingPosts.length === 0 && (
              <div className="border-b border-gray-200 pb-6 mb-6">
                <p className="text-gray-500 text-sm text-center py-8">No posting posts yet.</p>
              </div>
            )}
          </div>

          {/* Bottom Section */}
          <div>
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold text-black">Bottom</h3>
            </div>

            {bottomPosts.map((post, index) => (
              <PostItem
                key={post.id}
                post={post}
                index={index}
                onEdit={handleEditClick}
                onDelete={handleDeletePost}
                onPriorityUpdate={handlePriorityUpdate}
                sectionType="bottom posting"
              />
            ))}

            {bottomPosts.length === 0 && (
              <div className="border-b border-gray-200 pb-6 mb-6">
                <p className="text-gray-500 text-sm text-center py-8">No bottom posts yet. Create one using the form above.</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Edit Modal */}
      {modalStates.isEditModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto mx-4">
            
            <div className="flex items-center justify-between p-6 border-b">
              <h2 className="text-2xl font-bold text-black">
                Edit <span className="font-bold">{editState.editSection} post</span>
              </h2>
              <button
                onClick={handleCancelEdit}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                type="button"
                aria-label="Close edit modal"
              >
                <X className="w-6 h-6 text-gray-500" />
              </button>
            </div>

            <div className="p-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-bold text-black mb-3">Edit Title</h3>
                    <input
                      type="text"
                      value={editState.editTitle}
                      onChange={handleEditTitleChange}
                      className="w-full px-4 py-3 border-2 border-black rounded-xl focus:outline-none focus:border-blue-500 transition-colors"
                      placeholder="Enter title..."
                      aria-label="Edit post title"
                    />
                  </div>

                  <div>
                    <h3 className="text-lg font-bold text-black mb-3">Edit Detail</h3>
                    <textarea
                      value={editState.editDetail}
                      onChange={handleEditDetailChange}
                      rows={6}
                      className="w-full px-4 py-3 border-2 border-black rounded-xl focus:outline-none focus:border-blue-500 resize-none transition-colors"
                      placeholder="Enter details..."
                      aria-label="Edit post details"
                    />
                  </div>

                  <div>
                    <h3 className="text-lg font-bold text-black mb-3">Priority</h3>
                    <input
                      type="number"
                      value={editState.editPriority}
                      onChange={handleEditPriorityChange}
                      className="w-full px-4 py-3 border-2 border-black rounded-xl focus:outline-none focus:border-blue-500 text-center text-lg font-bold transition-colors"
                      min="1"
                      aria-label="Edit post priority"
                    />
                  </div>
                </div>

                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-bold text-black mb-3">Preview</h3>
                    <div className="bg-gray-100 rounded-lg h-48 mb-4 flex items-center justify-center overflow-hidden">
                      <img 
                        src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80" 
                        alt="Preview" 
                        className="w-full h-full object-cover"
                        loading="lazy"
                      />
                    </div>
                    <div className="text-left space-y-3">
                      <div>
                        <h4 className="font-medium text-base mb-1">{editState.editTitle || "Title Preview"}</h4>
                        <p className="text-gray-600 text-sm">{editState.editDetail || "Detail preview will appear here..."}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex justify-center gap-4 mt-8 pt-6 border-t">
                <button
                  onClick={handleSaveEdit}
                  className="bg-black text-white px-16 py-3 rounded-full hover:bg-gray-800 transition-colors font-medium"
                  type="button"
                >
                  save
                </button>
                <button
                  onClick={handleCancelEdit}
                  className="border border-gray-300 text-black px-12 py-3 rounded-full hover:bg-gray-50 transition-colors font-medium"
                  type="button"
                >
                  go back
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Success Modal */}
      {modalStates.isSuccessModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-2xl w-80 mx-4">
            <div className="flex justify-end p-4">
              <button
                onClick={handleSuccessModalClose}
                className="p-1 hover:bg-gray-100 rounded-lg transition-colors"
                type="button"
                aria-label="Close success modal"
              >
                <X className="w-5 h-5 text-gray-500" />
              </button>
            </div>
            <div className="px-8 pb-8 text-center">
              <h2 className="text-lg font-bold text-black mb-8 leading-tight">
                posting updated successfully!
              </h2>
              <button
                onClick={handleSuccessModalClose}
                className="bg-black text-white px-16 py-3 rounded-full hover:bg-gray-800 transition-colors font-semibold"
                type="button"
              >
                Done
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Success Modal */}
      {modalStates.isDeleteSuccessModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-2xl w-80 mx-4">
            <div className="flex justify-end p-4">
              <button
                onClick={handleDeleteSuccessModalClose}
                className="p-1 hover:bg-gray-100 rounded-lg transition-colors"
                type="button"
                aria-label="Close delete success modal"
              >
                <X className="w-5 h-5 text-gray-500" />
              </button>
            </div>
            <div className="px-8 pb-8 text-center">
              <h2 className="text-lg font-bold text-black mb-8 leading-tight">
                posting deleted successfully!
              </h2>
              <button
                onClick={handleDeleteSuccessModalClose}
                className="bg-black text-white px-16 py-3 rounded-full hover:bg-gray-800 transition-colors font-semibold"
                type="button"
              >
                Done
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Screen View Modal - Enhanced to match Figma */}
      {modalStates.isScreenViewOpen && (
        <div className="fixed inset-0 bg-white z-50 overflow-hidden">
          {/* Fixed Header - Stagnant upper part */}
          <div className="bg-white border-b border-gray-200 px-6 py-4 fixed top-0 left-0 right-0 z-10">
            <div className="flex items-center justify-between max-w-7xl mx-auto">
              <div className="flex items-center gap-4">
                <h1 className="text-xl font-bold text-black">YORAA</h1>
              </div>
              <div className="flex items-center gap-4">
                <button 
                  onClick={handleScreenViewClose}
                  className="border border-gray-300 text-black px-8 py-3 rounded-full hover:bg-gray-50 transition-colors"
                  type="button"
                >
                  go back
                </button>
              </div>
            </div>
          </div>

          {/* Main Content - Scrollable lower part */}
          <div className="flex pt-20 min-h-screen">
            {/* Sidebar */}
            <div className="w-72 bg-white border-r border-gray-200 p-6 overflow-y-auto">
              <div className="space-y-1">
                <h2 className="text-2xl font-bold text-black mb-6">Dashboard</h2>
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-bold text-black mb-2">App functional area</h3>
                    <div className="space-y-1 ml-2">
                      <p className="text-sm font-medium text-black">join us control screen</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Scrollable Content Area - Moved to left */}
            <div className="flex-1 overflow-y-auto">
              <div className="pl-4 pr-8 py-8 bg-gray-50 min-h-full">
                <div className="max-w-5xl space-y-6">
                  
                  {/* Header Content - Moved to left alignment */}
                  <div className="bg-black text-white p-8 text-left relative rounded-lg max-w-4xl">
                    <div className="space-y-2">
                      <p className="text-sm tracking-wide">WANT</p>
                      <p className="text-5xl font-bold">10% OFF</p>
                      <p className="text-lg">YOUR NEXT PURCHASE?</p>
                      <p className="text-sm">PLUS REWARD GIVEAWAY AND MORE!</p>
                      <div className="mt-6">
                        <p className="text-sm">What are you waiting for?</p>
                        <p className="text-sm">Become a Rewards member today!</p>
                      </div>
                    </div>
                  </div>

                  {/* Scrollable Content Cards - Aligned to left */}
                  <div className="overflow-x-auto pb-4">
                    <div className="flex gap-4 min-w-max">
                      {[1, 2, 3, 4, 5].map((i) => (
                        <div key={i} className="bg-yellow-300 p-4 relative h-80 w-72 flex-shrink-0 rounded-lg">
                          <p className="text-xs text-center mb-2">Expires in 8 days</p>
                          <p className="text-sm font-bold text-center mb-4">YORAA Concert Giveaways</p>
                          <div className="absolute inset-3 flex items-center justify-center">
                            <img 
                              src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80" 
                              alt={`Promotional content ${i}`}
                              className="w-full h-full object-cover rounded"
                            />
                          </div>
                          <div className="absolute bottom-3 left-3 right-3">
                            <div className="border border-black text-center py-1 bg-white bg-opacity-90 rounded">
                              <p className="text-xs font-medium">MEMBERS EXCLUSIVE</p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Navigation Arrows - Left aligned */}
                  <div className="flex gap-4 mt-6">
                    <button className="bg-gray-200 p-3 rounded-full hover:bg-gray-300 transition-colors">
                      <ChevronLeft className="w-5 h-5" />
                    </button>
                    <button className="bg-gray-200 p-3 rounded-full hover:bg-gray-300 transition-colors">
                      <ChevronRight className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
});

JoinUsControl.displayName = 'JoinUsControl';

export default JoinUsControl;
