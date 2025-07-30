// NotificationItem component renders a single notification row with input and action buttons
// Props:
// - value: string, notification text
// - disabled: boolean, disables input editing
// - onChange: function, called when input value changes
// - onInfo: function, called when Info button is clicked
// - onSend: function, called when Send button is clicked
// - onEdit: function, called when Edit button is clicked
// - onDelete: function, called when Delete button is clicked
// - isBold: boolean, makes input text bold
// Usage: <NotificationItem value={...} onChange={...} ... />
import { Info, Edit, Trash2 } from "lucide-react";

const NotificationItem = ({
  value,
  disabled,
  onChange,
  onInfo,
  onSend,
  onEdit,
  onDelete,
  isBold,
}) => (
  <div className="flex items-center gap-4 p-2">
    <input
      type="text"
      value={value}
      onChange={onChange}
      className={`text-sm font-semibold text-gray-900 w-64 p-4 rounded-md ${
        isBold ? "font-bold" : ""
      }`}
      style={{ boxShadow: "0 2px 8px rgba(0,0,0,0.07)" }}
      disabled={disabled}
    />
    <div className="flex items-center justify-between w-full">
      <div className="flex items-center gap-2">
        <button
          className="w-8 h-8 flex items-center justify-center bg-black rounded-full left-0 cursor-pointer"
          title="Info"
          onClick={onInfo}
        >
          <Info size={18} className="text-white" />
        </button>
        <button
          className="bg-black text-white px-8 py-2 rounded-full text-sm font-semibold hover:bg-gray-800 cursor-pointer"
          style={{ minWidth: 120 }}
          onClick={onSend}
        >
          send Now
        </button>
      </div>
      <div className="flex items-center gap-2">
        <button
          className="text-gray-400 hover:text-gray-600 p-2 cursor-pointer"
          title="Edit"
          onClick={onEdit}
        >
          <Edit size={18} />
        </button>
        <button
          className="text-gray-400 hover:text-gray-600 p-2 cursor-pointer"
          title="Delete"
          onClick={onDelete}
        >
          <Trash2 size={18} />
        </button>
      </div>
    </div>
  </div>
);

export default NotificationItem;
