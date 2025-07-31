import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Upload, Mail, Edit, Trash2, Info } from "lucide-react";
import ConfirmationDialogue from "../components/confirmationDialogue";
import NotificationItem from "../components/NotificationItem";
import EditNotificationModal from "../components/EditNotificationModal";

// PushNotification page for sending and managing push notifications
const PushNotification = () => {
  // State for notification text
  const [notificationText, setNotificationText] = useState("");
  // State for deeplink
  const [deeplink, setDeeplink] = useState("eg yoraa/product/123");
  // State for target platform, allow multi-select
  const [platformOptions] = useState([
    { label: "Android", value: "android" },
    { label: "ios", value: "ios" },
  ]);
  const [selectedPlatforms, setSelectedPlatforms] = useState(["android"]);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  // State for uploaded image, initialize from localStorage
  const [image, setImage] = useState(() => {
    try {
      return localStorage.getItem("notificationImage") || null;
    } catch {
      return null;
    }
  });

  // Save image to localStorage whenever it changes
  useEffect(() => {
    if (image) {
      try {
        localStorage.setItem("notificationImage", image);
      } catch (error) {
        // Ignore localStorage errors as they are non-critical
        console.debug("Failed to save image to localStorage:", error);
      }
    } else {
      try {
        localStorage.removeItem("notificationImage");
      } catch {
        // Ignore localStorage errors
      }
    }
  }, [image]);

  // Reference for file input element
  const fileInputRef = useRef(null);

  // Navigation hook
  const navigate = useNavigate();

  // Example stacked notifications
  const [stackedNotifications, setStackedNotifications] = useState([
    { text: "Manage account and services linked to your Yoraa account" },
    { text: "Manage account and services linked to your Yoraa account" },
    { text: "Manage account and services linked to your Yoraa account" },
    { text: "Manage account and services linked to your Yoraa account" },
  ]);
  const [editIndex, setEditIndex] = useState(null);
  const [editValue, setEditValue] = useState("");

  // State for confirmation dialog
  const [dialogOpen, setDialogOpen] = useState(false);
  const [dialogAction, setDialogAction] = useState(null);
  const [selectedNotification, setSelectedNotification] = useState(null);

  return (
    <div className="bg-white min-h-screen font-montserrat">
      <div className="max-w-6xl ml-6 px-6 py-8 flex gap-12">
        {/* Left Column - Form */}
        <div className="flex-1 max-w-2xl">
          <h2 className="text-2xl font-bold text-black mb-8">
            Notification
          </h2>

          {/* Notification Text */}
          <div className="mb-8">
            <textarea
              value={notificationText}
              onChange={(e) => setNotificationText(e.target.value)}
              placeholder="Type Here"
              className="w-full h-36 border-2 border-black rounded-xl p-4 text-sm resize-none focus:outline-none focus:border-black font-montserrat text-[#979797]"
            />
          </div>

          {/* Notification Image Upload */}
          <div className="mb-8">
            <label className="block text-xl font-bold text-black mb-4">
              Notification image(optional)
            </label>
            {/* Hidden file input for image upload */}
            <input
              type="file"
              accept="image/*"
              ref={fileInputRef}
              style={{ display: "none" }}
              onChange={(e) => {
                const file = e.target.files[0];
                if (file) {
                  const reader = new FileReader();
                  reader.onload = (ev) => {
                    setImage(ev.target.result);
                    // localStorage update handled by useEffect
                  };
                  reader.readAsDataURL(file);
                }
              }}
            />
            <div className="flex items-center gap-3">
              <button
                type="button"
                className="flex items-center gap-2 bg-[#000AFF] text-white px-4 py-2.5 rounded-lg text-sm hover:bg-blue-700 border border-[#7280FF] shadow-sm font-montserrat"
                onClick={() =>
                  fileInputRef.current && fileInputRef.current.click()
                }
              >
                <Upload size={16} />
                Upload image
              </button>
              <div className="w-16 h-16 border-2 border-dashed border-[#CCD2E3] rounded-[15px] flex items-center justify-center">
                {/* Show uploaded image preview if available */}
                {image ? (
                  <img
                    src={image}
                    alt="Notification"
                    className="w-12 h-12 object-cover rounded-lg"
                  />
                ) : (
                  <div className="w-8 h-8 border-2 border-[#CCD2E3] rounded"></div>
                )}
              </div>
            </div>
          </div>

          {/* Deeplink */}
          <div className="mb-8">
            <label className="block text-xl font-bold text-black mb-4">
              Deeplink(optional) eg yoraa/product/123
            </label>
            <input
              type="text"
              value={deeplink}
              onChange={(e) => setDeeplink(e.target.value)}
              placeholder="enter Deeplink  eg yoraa/product/123"
              className="w-full max-w-lg border-2 border-black rounded-xl px-4 py-3 text-xl focus:outline-none focus:border-black text-[#979797] font-medium font-montserrat"
            />
          </div>

          {/* Target Platform Dropdown */}
          <div className="mb-8 relative">
            <label className="block text-2xl font-bold text-black mb-4">
              Target platform
            </label>
            <div className="relative max-w-xs">
              <button
                type="button"
                className="w-full border-2 border-black rounded-xl px-4 py-3 text-xl text-left focus:outline-none bg-white text-[#979797] font-medium font-montserrat"
                onClick={() => setDropdownOpen((open) => !open)}
              >
                {selectedPlatforms.length === 2
                  ? "android/ios"
                  : selectedPlatforms.length === 1
                  ? platformOptions.find(
                      (opt) => opt.value === selectedPlatforms[0]
                    )?.label
                  : "android/ios"}
              </button>
              {dropdownOpen && (
                <div className="absolute z-10 mt-1 w-full bg-white border-2 border-black rounded-xl shadow-lg">
                  <div className="py-1">
                    <button
                      type="button"
                      className={`w-full text-left px-4 py-2 text-sm font-montserrat ${
                        selectedPlatforms.length === 2
                          ? "text-blue-600 bg-gray-100"
                          : "text-gray-900"
                      }`}
                      onClick={() => {
                        setSelectedPlatforms(["android", "ios"]);
                        setDropdownOpen(false);
                      }}
                    >
                      Both
                      {selectedPlatforms.length === 2 && (
                        <span className="ml-2">✓</span>
                      )}
                    </button>
                    {platformOptions.map((opt) => (
                      <button
                        key={opt.value}
                        type="button"
                        className={`w-full text-left px-4 py-2 text-sm font-montserrat ${
                          selectedPlatforms.includes(opt.value) &&
                          selectedPlatforms.length === 1
                            ? "text-blue-600 bg-gray-100"
                            : "text-gray-900"
                        }`}
                        onClick={() => {
                          setSelectedPlatforms([opt.value]);
                          setDropdownOpen(false);
                        }}
                      >
                        {opt.label}
                        {selectedPlatforms.includes(opt.value) &&
                          selectedPlatforms.length === 1 && (
                            <span className="ml-2">✓</span>
                          )}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-4 mb-12">
            <button 
              className="text-black px-12 py-4 border border-[#E4E4E4] rounded-full text-base font-medium hover:bg-gray-50 font-montserrat"
            >
              save for later
            </button>
            <button 
              className="bg-black text-white px-12 py-4 rounded-full text-base font-medium hover:bg-gray-800 font-montserrat"
            >
              send Now
            </button>
          </div>

          {/* Stack notification for later */}
          <div>
            <h3 className="text-2xl font-bold text-black mb-6">
              Stack notification for later
            </h3>
            <div className="space-y-4">
              {stackedNotifications.map((notification, index) => (
                <div key={index} className="bg-white rounded-xl shadow-lg border border-gray-100 p-4 flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="w-6 h-6 bg-black rounded-full flex items-center justify-center">
                      <Info size={12} className="text-white" />
                    </div>
                    <p className="text-black text-base flex-1 font-montserrat leading-tight max-w-sm">
                      {notification.text}
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <button 
                      className="bg-black text-white px-6 py-2 rounded-full text-sm font-medium font-montserrat"
                      onClick={() => {
                        setDialogAction("send");
                        setSelectedNotification(notification);
                        setDialogOpen(true);
                      }}
                    >
                      send Now
                    </button>
                    <button 
                      className="p-2 rounded-lg hover:bg-gray-100"
                      onClick={() => {
                        setEditIndex(index);
                        setEditValue(notification.text);
                        setDialogAction("edit");
                        setSelectedNotification(notification);
                        setDialogOpen(true);
                      }}
                    >
                      <Edit size={16} className="text-[#667085]" />
                    </button>
                    <button 
                      className="p-2 rounded-lg hover:bg-gray-100"
                      onClick={() => {
                        setDialogAction("delete");
                        setSelectedNotification(notification);
                        setDialogOpen(true);
                      }}
                    >
                      <Trash2 size={16} className="text-[#667085]" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column - Preview */}
        <div className="w-80 flex-shrink-0">
          <div className="flex items-center gap-2 mb-6">
            <h3 className="text-2xl font-bold text-black">
              Preview
            </h3>
            {/* Info button */}
            <button
              className="bg-black rounded-full w-6 h-6 flex items-center justify-center"
              onClick={() =>
                navigate("/notification-preview", { state: { image } })
              }
              title="See full preview"
            >
              <Info size={12} className="text-white" />
            </button>
          </div>

          <div className="border-2 border-dashed border-[#CCD2E3] rounded-xl p-8 flex items-center justify-center h-80">
            <div className="text-center">
              {/* Show uploaded image if available, else show icon */}
              {image ? (
                <div className="w-full mx-auto border-2 border-blue-500 rounded-lg flex items-center justify-center overflow-hidden">
                  <img
                    src={image}
                    alt="Notification Preview"
                    className="w-full h-full object-cover rounded-lg"
                  />
                </div>
              ) : (
                <div className="w-16 h-16 mx-auto border-2 border-[#003F62] rounded-lg flex items-center justify-center">
                  <Mail size={32} className="text-[#003F62]" />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Dialogs */}
      {dialogOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div
            className="absolute inset-0 bg-black bg-opacity-20"
          />
          {dialogAction === "edit" ? (
            <EditNotificationModal
              value={editValue}
              onChange={(e) => setEditValue(e.target.value)}
              onSave={() => {
                const updated = [...stackedNotifications];
                updated[editIndex].text = editValue;
                setStackedNotifications(updated);
                setEditIndex(null);
                setDialogOpen(false);
              }}
              onCancel={() => {
                setEditIndex(null);
                setDialogOpen(false);
              }}
              original={selectedNotification?.text}
            />
          ) : dialogAction === "delete" ? (
            <ConfirmationDialogue
              open={dialogOpen}
              message={`Are you sure you want to delete this notification?`}
              confirmText="Delete"
              onConfirm={() => {
                setStackedNotifications(
                  stackedNotifications.filter(
                    (_, i) =>
                      i !==
                      stackedNotifications.indexOf(selectedNotification)
                  )
                );
                setDialogOpen(false);
              }}
              onCancel={() => setDialogOpen(false)}
            />
          ) : (
            <ConfirmationDialogue
              open={dialogOpen}
              message={"Are you sure you want to send the notification?"}
              onConfirm={() => {
                setDialogOpen(false);
                // Add your action logic here (send, edit, delete, info)
              }}
              onCancel={() => setDialogOpen(false)}
            />
          )}
        </div>
      )}
    </div>
  );
};

export default PushNotification;
