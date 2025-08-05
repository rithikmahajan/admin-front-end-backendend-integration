import React from 'react';
import { X, AlertTriangle } from 'lucide-react';

const DeleteConfirmationModal = ({ 
  isOpen = false,
  onConfirm,
  onCancel,
  title = "are you sure you want to delete this",
  message = "",
  confirmText = "Yes",
  cancelText = "Cancel",
  itemName = "",
  isDangerous = true
}) => {
  if (!isOpen) return null;

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      onCancel?.();
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Escape') {
      onCancel?.();
    }
  };

  React.useEffect(() => {
    if (isOpen) {
      document.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    }
    
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  return (
    <div 
      className="fixed inset-0 bg-black bg-opacity-60 backdrop-blur-sm flex items-center justify-center p-4 z-50 transition-all duration-300 ease-out"
      onClick={handleOverlayClick}
      style={{
        animation: 'fadeIn 0.3s ease-out'
      }}
    >
      <div 
        className="bg-white rounded-2xl shadow-[0px_20px_80px_rgba(0,0,0,0.15)] w-full max-w-md mx-auto relative transform transition-all duration-300 ease-out"
        style={{
          animation: 'slideUp 0.3s ease-out'
        }}
      >
        
        {/* Close Button */}
        <button
          onClick={onCancel}
          className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center text-gray-400 hover:text-gray-600 transition-all duration-200 rounded-full hover:bg-gray-100 group"
        >
          <X size={18} className="group-hover:scale-110 transition-transform" />
        </button>

        <div className="p-8 pt-12 text-center">
          {/* Warning Icon with Pulse Animation */}
          <div className="flex justify-center mb-6">
            <div 
              className={`w-20 h-20 ${isDangerous ? 'bg-red-500' : 'bg-orange-500'} rounded-full flex items-center justify-center shadow-lg relative`}
              style={{
                animation: 'pulse 2s infinite'
              }}
            >
              <AlertTriangle size={32} className="text-white" strokeWidth={2.5} />
              
              {/* Pulse Ring */}
              <div 
                className={`absolute inset-0 ${isDangerous ? 'bg-red-500' : 'bg-orange-500'} rounded-full opacity-30`}
                style={{
                  animation: 'ping 2s cubic-bezier(0, 0, 0.2, 1) infinite'
                }}
              />
            </div>
          </div>

          {/* Title */}
          <h2 className="font-montserrat font-bold text-[20px] text-gray-900 leading-[24px] tracking-[-0.5px] mb-3">
            {title}
          </h2>

          {/* Item Name (if provided) */}
          {itemName && (
            <div className="mb-4">
              <p className="font-montserrat font-semibold text-[16px] text-gray-800 bg-gray-50 px-4 py-2 rounded-lg border">
                "{itemName}"
              </p>
            </div>
          )}

          {/* Message (if provided) */}
          {message && (
            <p className="font-montserrat text-[14px] text-gray-600 leading-[20px] mb-6 px-2">
              {message}
            </p>
          )}

          {/* Warning Note */}
          <div className="bg-red-50 border border-red-200 rounded-xl p-4 mb-6">
            <p className="font-montserrat text-[13px] text-red-700 leading-[18px]">
              ⚠️ This action cannot be undone. Please be certain.
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3 mt-8">
            {/* Confirm Button */}
            <button
              onClick={onConfirm}
              className={`flex-1 ${isDangerous ? 'bg-red-500 hover:bg-red-600' : 'bg-orange-500 hover:bg-orange-600'} text-white py-4 px-6 rounded-xl font-montserrat font-semibold text-[16px] transition-all duration-200 transform hover:scale-[1.02] active:scale-[0.98] shadow-lg hover:shadow-xl focus:outline-none focus:ring-4 focus:ring-red-200`}
            >
              {confirmText}
            </button>

            {/* Cancel Button */}
            <button
              onClick={onCancel}
              className="flex-1 bg-gray-100 text-gray-700 py-4 px-6 rounded-xl font-montserrat font-semibold text-[16px] border border-gray-200 hover:bg-gray-200 hover:border-gray-300 transition-all duration-200 transform hover:scale-[1.02] active:scale-[0.98] shadow-sm hover:shadow-md focus:outline-none focus:ring-4 focus:ring-gray-200"
            >
              {cancelText}
            </button>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(30px) scale(0.9);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }

        @keyframes pulse {
          0%, 100% {
            transform: scale(1);
          }
          50% {
            transform: scale(1.05);
          }
        }

        @keyframes ping {
          75%, 100% {
            transform: scale(1.3);
            opacity: 0;
          }
        }
      `}</style>
    </div>
  );
};

export default DeleteConfirmationModal;
