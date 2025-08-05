import React, { useState, useMemo, useCallback, memo, useRef, useEffect } from "react";
import {
  Search,
  Filter,
  RotateCcw,
  Calendar,
  Edit2,
  Trash2,
  Download,
  Check,
  X,
  Users,
  Package,
  ShoppingCart,
  DollarSign,
  TrendingUp,
  TrendingDown,
  // Plus,
  BarChart3,
  RefreshCw,
  FileSpreadsheet,
  ChevronDown,
  CalendarRange,
  // Info,
} from "lucide-react";
import * as XLSX from 'xlsx';
import jsPDF from 'jspdf';
import 'jspdf-autotable';

// Add custom styles for date picker
const datePickerStyles = `
  .date-picker-dropdown {
    animation: slideDown 0.2s ease-out;
  }
  
  @keyframes slideDown {
    from {
      opacity: 0;
      transform: translateY(-10px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
  
  .date-picker-option:hover {
    background-color: #f8fafc;
  }
  
  .date-picker-option.selected {
    background-color: #dbeafe;
    color: #1d4ed8;
  }
`;

// Inject styles
if (typeof document !== 'undefined') {
  const styleSheet = document.createElement("style");
  styleSheet.type = "text/css";
  styleSheet.innerText = datePickerStyles;
  document.head.appendChild(styleSheet);
}

/**
 * Unified Database & Dashboard Component - Performance Optimized
 *
 * A comprehensive admin interface that combines:
 * - Dashboard analytics with real-time statistics
 * - Database inventory management with advanced filtering
 * - SMS analytics and tracking
 * - Sales charts and visualizations
 * - Product sync management across marketplaces
 * - Marketplace connection status monitoring
 * - Sync logs and error tracking with audit trail
 *
 * Performance Optimizations:
 * - Memoized components to prevent unnecessary re-renders
 * - useCallback for stable function references
 * - Optimized filtering with proper dependency arrays
 * - Extracted sub-components for better code splitting
 * - Reduced object creation in render cycles
 * - Proper key props for list items
 * - Optimized hover states and transitions
 */

// Constants moved outside component to prevent recreation
const FILTER_OPTIONS = {
  categories: ["Profile", "inventory list", "Order statistics"],
  subcategories: [
    "Name",
    "EMAIL",
    "PHONE",
    "Date of Birth",
    "ADDRESS",
    "delete account record",
    "user details",
    "app reviews",
    "GENDER",
    "password details",
    "points",
    "PG rent receipt – Duly stamped",
  ],
  filterBy: ["category", "status"],
  dates: ["today", "week"],
};

// Date Range Options
const DATE_RANGE_OPTIONS = [
  { label: "Today", value: "today", days: 0 },
  { label: "Yesterday", value: "yesterday", days: 1 },
  { label: "Last 7 Days", value: "7days", days: 7 },
  { label: "Last 14 Days", value: "14days", days: 14 },
  { label: "Last 30 Days", value: "30days", days: 30 },
  { label: "Last 90 Days", value: "90days", days: 90 },
  { label: "This Month", value: "thisMonth", days: null },
  { label: "Last Month", value: "lastMonth", days: null },
  { label: "This Year", value: "thisYear", days: null },
  { label: "Custom Range", value: "custom", days: null },
];

const TIME_PERIODS = ["07 Days", "30 Days", "6 Months", "7 Days"];
const MONTHS = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

// Table Headers
const PRODUCT_SYNC_HEADERS = [
  "Image",
  "product name",
  "Price",
  "SKU",
  "barcode no.",
  "synced",
  "marketplace",
  "error",
  "action",
];

const INVENTORY_HEADERS = [
  "Image",
  "Product Name",
  "Category",
  "sub categories",
  "Price",
  "size",
  "quantity",
  "sale price",
  "actual price",
  "SKU",
  "barcode no.",
  "Description",
  "Manufacturing details",
  "Shipping returns and exchange",
  "meta title",
  "meta description",
  "slug URL",
  "photos",
  "size chart",
  "Action",
];

const SYNC_LOG_HEADERS = [
  "date",
  "operation",
  "market place",
  "status",
  "error message",
];

// Status Colors Configuration
const STATUS_COLORS = {
  success: "bg-[#00B69B] text-white",
  error: "bg-[#EF3826] text-white",
  warning: "bg-yellow-500 text-white",
  info: "bg-[#5088FF] text-white",
  Yes: "bg-[#00B69B] text-white",
  no: "bg-[#5088FF] text-white",
  sync: "bg-[#EF3826] text-white",
  fail: "bg-[#EF3826] text-white",
  connected: "bg-[#00B69B] hover:bg-green-600 text-white",
  "not connected": "bg-[#EF3826] hover:bg-red-600 text-white",
  "good to go": "bg-green-100 text-green-600",
  low: "bg-purple-100 text-purple-600",
  finished: "bg-red-100 text-red-600",
};

// Memoized Status Badge Component
const StatusBadge = memo(({ status, type = "status" }) => {
  const getStatusColor = useCallback((status, type) => {
    if (type === "error") return STATUS_COLORS.error;
    return STATUS_COLORS[status] || STATUS_COLORS.error;
  }, []);

  return (
    <span
      className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(
        status,
        type
      )}`}
    >
      {status}
    </span>
  );
});

StatusBadge.displayName = "StatusBadge";

// Memoized Action Buttons Component
const ActionButtons = memo(({ productId, onEdit, onDelete, onDownload }) => (
  <div className="flex gap-1">
    <button
      className="p-1.5 bg-gray-100 rounded hover:bg-gray-200"
      onClick={() => onEdit(productId)}
      aria-label="Edit product"
    >
      <Edit2 className="h-3 w-3 text-gray-600" />
    </button>
    <button
      className="p-1.5 bg-gray-100 rounded hover:bg-gray-200"
      onClick={() => onDelete(productId)}
      aria-label="Delete product"
    >
      <Trash2 className="h-3 w-3 text-gray-600" />
    </button>
    <button
      className="p-1.5 bg-gray-100 rounded hover:bg-gray-200"
      onClick={() => onDownload(productId)}
      aria-label="Download product data"
    >
      <Download className="h-3 w-3 text-gray-600" />
    </button>
  </div>
));

ActionButtons.displayName = "ActionButtons";

// Memoized Availability Button Component
const AvailabilityButton = memo(({ available, label }) => (
  <div className="flex items-center justify-center">
    <button
      className={`w-6 h-6 rounded-full flex items-center justify-center text-white text-xs font-bold ${
        available
          ? "bg-green-500 hover:bg-green-600"
          : "bg-red-500 hover:bg-red-600"
      } transition-colors cursor-pointer`}
      title={available ? `${label} available` : `No ${label.toLowerCase()}`}
    >
      {available ? <Check className="h-3 w-3" /> : <X className="h-3 w-3" />}
    </button>
  </div>
));

AvailabilityButton.displayName = "AvailabilityButton";

// Memoized Product Image Component
const ProductImage = memo(({ image, productName }) => (
  <div className="flex items-center gap-2">
    <div className="w-12 h-14 bg-gray-200 rounded overflow-hidden">
      <img
        src={image}
        alt={productName}
        className="w-full h-full object-cover"
        loading="lazy"
      />
    </div>
    <div className="flex gap-1">
      {[1, 2, 3, 4].map((i) => (
        <div key={i} className="w-3 h-3 bg-gray-300 rounded"></div>
      ))}
    </div>
  </div>
));

ProductImage.displayName = "ProductImage";

// Memoized Size Data Component
const SizeData = memo(({ sizes, dataType }) => (
  <div className="space-y-1">
    {sizes.map((size) => (
      <div key={`${size.size}-${dataType}`} className="text-xs text-gray-900">
        {dataType === "size" ? size.size : size[dataType]}
      </div>
    ))}
  </div>
));

SizeData.displayName = "SizeData";

const SettingButton = ({ isOn, onToggle, label }) => (
  <div className="flex justify-between items-center">
    <span className="text-gray-700">{label}</span>
    <button
      onClick={onToggle}
      className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-200 ${
        isOn
          ? "bg-green-100 text-green-700 hover:bg-green-200"
          : "bg-gray-100 text-gray-600 hover:bg-gray-200"
      }`}
    >
      {isOn ? "On" : "Off"}
    </button>
  </div>
);

const HourDropdown = ({ value, onChange, label }) => (
  <div className="flex justify-between items-center">
    <span className="text-gray-700">{label}</span>
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="bg-white border border-gray-300 rounded-lg px-3 py-2 text-sm font-medium text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200"
    >
      <option value="1hr">1 hour</option>
      <option value="3hr">3 hours</option>
      <option value="6hr">6 hours</option>
    </select>
  </div>
);

// Date Range Picker Component
const DateRangePicker = memo(({ selectedRange, onRangeChange, dateRange }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [showCustomPicker, setShowCustomPicker] = useState(false);
  const [customStartDate, setCustomStartDate] = useState("");
  const [customEndDate, setCustomEndDate] = useState("");
  const dropdownRef = useRef(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
        setShowCustomPicker(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleRangeSelect = (option) => {
    if (option.value === "custom") {
      setShowCustomPicker(true);
    } else {
      onRangeChange(option);
      setIsOpen(false);
      setShowCustomPicker(false);
    }
  };

  const handleCustomRangeApply = () => {
    if (customStartDate && customEndDate) {
      const customOption = {
        label: "Custom Range",
        value: "custom",
        startDate: customStartDate,
        endDate: customEndDate,
      };
      onRangeChange(customOption);
      setIsOpen(false);
      setShowCustomPicker(false);
    }
  };

  const formatDateRange = () => {
    if (selectedRange.value === "custom" && selectedRange.startDate && selectedRange.endDate) {
      const start = new Date(selectedRange.startDate).toLocaleDateString('en-US', { 
        month: 'short', 
        day: 'numeric' 
      });
      const end = new Date(selectedRange.endDate).toLocaleDateString('en-US', { 
        month: 'short', 
        day: 'numeric', 
        year: 'numeric' 
      });
      return `${start} – ${end}`;
    }
    return dateRange;
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 text-sm text-black bg-gray-100 px-4 py-2 rounded-lg shadow-inner border border-slate-200 hover:bg-gray-200 transition-colors duration-200"
      >
        <CalendarRange className="h-4 w-4" />
        <span className="font-medium tracking-wide">
          {formatDateRange()}
        </span>
        <ChevronDown className={`h-4 w-4 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {isOpen && (
        <div className="absolute right-0 top-full mt-2 bg-white border border-gray-200 rounded-lg shadow-lg z-50 min-w-[280px] date-picker-dropdown">
          {!showCustomPicker ? (
            <div className="p-2">
              {DATE_RANGE_OPTIONS.map((option) => (
                <button
                  key={option.value}
                  onClick={() => handleRangeSelect(option)}
                  className={`w-full text-left px-3 py-2 rounded-md text-sm transition-colors duration-150 date-picker-option ${
                    selectedRange.value === option.value 
                      ? 'selected font-medium' 
                      : 'text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  {option.label}
                </button>
              ))}
            </div>
          ) : (
            <div className="p-4">
              <h4 className="text-sm font-medium text-gray-900 mb-3">Select Custom Range</h4>
              <div className="space-y-3">
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1">
                    Start Date
                  </label>
                  <input
                    type="date"
                    value={customStartDate}
                    onChange={(e) => setCustomStartDate(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1">
                    End Date
                  </label>
                  <input
                    type="date"
                    value={customEndDate}
                    onChange={(e) => setCustomEndDate(e.target.value)}
                    min={customStartDate}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                <div className="flex gap-2 pt-2">
                  <button
                    onClick={() => setShowCustomPicker(false)}
                    className="flex-1 px-3 py-2 text-sm text-gray-600 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors duration-150"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleCustomRangeApply}
                    disabled={!customStartDate || !customEndDate}
                    className="flex-1 px-3 py-2 text-sm bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-150"
                  >
                    Apply
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
});

DateRangePicker.displayName = "DateRangePicker";

// Main Database Component
const Database = () => {
  // State management for UI interactions
  const [activeTab, setActiveTab] = useState("dashboard");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedTimeRange, setSelectedTimeRange] = useState("07 Days");
  const [selectedDateRange, setSelectedDateRange] = useState({
    label: "Last 7 Days",
    value: "7days",
    days: 7
  });
  const [dateRange, setDateRange] = useState("Nov 11, 2025 – Nov 27, 2025");
  
  // Sales date range state
  const [selectedSalesDateRange, setSelectedSalesDateRange] = useState({
    label: "Last 7 Days",
    value: "7days",
    days: 7
  });
  const [salesDateRange, setSalesDateRange] = useState("Nov 11, 2025 – Nov 27, 2025");
  
  const [filters, setFilters] = useState({
    category: "",
    subcategory: "",
    date: "",
    filterBy: "",
  });

  // Data hooks - Centralized data management
  const { stats, smsStats, analyticsData } = useDashboardData();
  const { productSyncData, marketplaces, syncLogs } = useMarketplaceData();
  const { inventoryProducts } = useInventoryData();

  // Filtered data based on search
  const filteredSyncProducts = useMemo(() => {
    if (!searchTerm) return productSyncData;
    return productSyncData.filter(
      (product) =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.marketplace.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.sku.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [productSyncData, searchTerm]);

  const filteredInventoryProducts = useMemo(() => {
    return inventoryProducts.filter((product) => {
      const matchesSearch =
        !searchTerm ||
        product.productName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.sku.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesCategory =
        !filters.category || product.category === filters.category;
      const matchesSubcategory =
        !filters.subcategory || product.subcategory === filters.subcategory;

      return matchesSearch && matchesCategory && matchesSubcategory;
    });
  }, [inventoryProducts, searchTerm, filters.category, filters.subcategory]);

  // Event handlers
  const handleTabChange = useCallback((tab) => {
    setActiveTab(tab);
    setSearchTerm(""); // Reset search when switching tabs
  }, []);

  const handleTimeRangeChange = useCallback((period) => {
    setSelectedTimeRange(period);
  }, []);

  const handleSearchChange = useCallback((event) => {
    setSearchTerm(event.target.value);
  }, []);

  const handleFilterChange = useCallback((key, value) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  }, []);

  const resetFilters = useCallback(() => {
    setFilters({
      category: "",
      subcategory: "",
      date: "",
      filterBy: "",
    });
    setSearchTerm("");
  }, []);

  // Date range change handler
  const handleDateRangeChange = useCallback((rangeOption) => {
    setSelectedDateRange(rangeOption);
    
    // Calculate actual dates based on selection
    const today = new Date();
    let startDate, endDate;
    
    if (rangeOption.value === "custom" && rangeOption.startDate && rangeOption.endDate) {
      startDate = new Date(rangeOption.startDate);
      endDate = new Date(rangeOption.endDate);
    } else {
      switch (rangeOption.value) {
        case "today":
          startDate = endDate = new Date(today);
          break;
        case "yesterday":
          startDate = endDate = new Date(today.getTime() - 24 * 60 * 60 * 1000);
          break;
        case "7days":
          startDate = new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000);
          endDate = new Date(today);
          break;
        case "14days":
          startDate = new Date(today.getTime() - 14 * 24 * 60 * 60 * 1000);
          endDate = new Date(today);
          break;
        case "30days":
          startDate = new Date(today.getTime() - 30 * 24 * 60 * 60 * 1000);
          endDate = new Date(today);
          break;
        case "90days":
          startDate = new Date(today.getTime() - 90 * 24 * 60 * 60 * 1000);
          endDate = new Date(today);
          break;
        case "thisMonth":
          startDate = new Date(today.getFullYear(), today.getMonth(), 1);
          endDate = new Date(today);
          break;
        case "lastMonth":
          startDate = new Date(today.getFullYear(), today.getMonth() - 1, 1);
          endDate = new Date(today.getFullYear(), today.getMonth(), 0);
          break;
        case "thisYear":
          startDate = new Date(today.getFullYear(), 0, 1);
          endDate = new Date(today);
          break;
        default:
          startDate = new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000);
          endDate = new Date(today);
      }
    }
    
    // Format the date range for display
    const formatDate = (date) => {
      return date.toLocaleDateString('en-US', { 
        month: 'short', 
        day: 'numeric', 
        year: 'numeric' 
      });
    };
    
    const formattedRange = startDate.toDateString() === endDate.toDateString() 
      ? formatDate(startDate)
      : `${formatDate(startDate)} – ${formatDate(endDate)}`;
    
    setDateRange(formattedRange);
    
    // Here you would typically trigger data refetch with the new date range
    console.log('Date range changed:', { startDate, endDate, range: formattedRange });
  }, []);

  // Sales date range change handler
  const handleSalesDateRangeChange = useCallback((rangeOption) => {
    setSelectedSalesDateRange(rangeOption);
    
    // Calculate actual dates based on selection
    const today = new Date();
    let startDate, endDate;
    
    if (rangeOption.value === "custom" && rangeOption.startDate && rangeOption.endDate) {
      startDate = new Date(rangeOption.startDate);
      endDate = new Date(rangeOption.endDate);
    } else {
      switch (rangeOption.value) {
        case "today":
          startDate = endDate = new Date(today);
          break;
        case "yesterday":
          startDate = endDate = new Date(today.getTime() - 24 * 60 * 60 * 1000);
          break;
        case "7days":
          startDate = new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000);
          endDate = new Date(today);
          break;
        case "14days":
          startDate = new Date(today.getTime() - 14 * 24 * 60 * 60 * 1000);
          endDate = new Date(today);
          break;
        case "30days":
          startDate = new Date(today.getTime() - 30 * 24 * 60 * 60 * 1000);
          endDate = new Date(today);
          break;
        case "90days":
          startDate = new Date(today.getTime() - 90 * 24 * 60 * 60 * 1000);
          endDate = new Date(today);
          break;
        case "thisMonth":
          startDate = new Date(today.getFullYear(), today.getMonth(), 1);
          endDate = new Date(today);
          break;
        case "lastMonth":
          startDate = new Date(today.getFullYear(), today.getMonth() - 1, 1);
          endDate = new Date(today.getFullYear(), today.getMonth(), 0);
          break;
        case "thisYear":
          startDate = new Date(today.getFullYear(), 0, 1);
          endDate = new Date(today);
          break;
        default:
          startDate = new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000);
          endDate = new Date(today);
      }
    }
    
    // Format the date range for display
    const formatDate = (date) => {
      return date.toLocaleDateString('en-US', { 
        month: 'short', 
        day: 'numeric', 
        year: 'numeric' 
      });
    };
    
    const formattedRange = startDate.toDateString() === endDate.toDateString() 
      ? formatDate(startDate)
      : `${formatDate(startDate)} – ${formatDate(endDate)}`;
    
    setSalesDateRange(formattedRange);
    
    // Here you would typically trigger sales data refetch with the new date range
    console.log('Sales date range changed:', { startDate, endDate, range: formattedRange });
  }, []);

  // Action handlers with useCallback for performance
  const handleEdit = useCallback((productId) => {
    console.log("Edit product:", productId);
    // Add edit functionality here
  }, []);

  const handleDelete = useCallback((productId) => {
    console.log("Delete product:", productId);
    // Add delete functionality here
  }, []);

  const handleDownload = useCallback((productId) => {
    console.log("Download product:", productId);
    // Add download functionality here
  }, []);

  // Export handlers for Views Report section
  const handleExportPDF = useCallback(() => {
    try {
      const doc = new jsPDF();
      
      // Add title
      doc.setFontSize(20);
      doc.text('Views Report', 20, 30);
      
      // Add date range
      doc.setFontSize(12);
      doc.text(`Date Range: ${selectedDateRange.label}`, 20, 45);
      doc.text(`Period: ${dateRange}`, 20, 55);
      doc.text(`Generated on: ${new Date().toLocaleDateString()}`, 20, 65);
      
      // Add analytics data section
      doc.setFontSize(14);
      doc.text('Analytics Summary', 20, 85);
      
      // Prepare table data
      const tableData = analyticsData.map((item, index) => [
        item.title,
        item.value,
        item.growth ? `${item.growth}%` : 'N/A',
        item.growthType ? item.growthType.toUpperCase() : 'N/A'
      ]);
      
      // Add table
      doc.autoTable({
        startY: 95,
        head: [['Metric', 'Value', 'Growth', 'Trend']],
        body: tableData,
        theme: 'grid',
        styles: {
          fontSize: 10,
          cellPadding: 5,
        },
        headStyles: {
          fillColor: [59, 130, 246], // Blue color
          textColor: [255, 255, 255]
        }
      });
      
      // Add marketplace sync summary
      const finalY = doc.lastAutoTable.finalY + 20;
      doc.setFontSize(14);
      doc.text('Marketplace Status Summary', 20, finalY);
      
      const marketplaceData = marketplaces.map(mp => [
        mp.name,
        mp.status,
        mp.sellerId || 'Not connected',
        mp.lastSync || 'Never'
      ]);
      
      doc.autoTable({
        startY: finalY + 10,
        head: [['Marketplace', 'Status', 'Seller ID', 'Last Sync']],
        body: marketplaceData,
        theme: 'grid',
        styles: {
          fontSize: 10,
          cellPadding: 5,
        },
        headStyles: {
          fillColor: [34, 197, 94], // Green color
          textColor: [255, 255, 255]
        }
      });
      
      // Save the PDF
      doc.save(`views-report-${selectedDateRange.value}-${new Date().toISOString().split('T')[0]}.pdf`);
      
      console.log('PDF report exported successfully');
    } catch (error) {
      console.error('Error exporting PDF:', error);
      alert('Error generating PDF report. Please try again.');
    }
  }, [analyticsData, selectedDateRange, dateRange, marketplaces]);

  const handleExportExcel = useCallback(() => {
    try {
      // Create a new workbook
      const wb = XLSX.utils.book_new();
      
      // Analytics data worksheet
      const analyticsWS = XLSX.utils.json_to_sheet(
        analyticsData.map((item, index) => ({
          'Metric': item.title,
          'Value': item.value,
          'Growth (%)': item.growth || 'N/A',
          'Trend': item.growthType || 'N/A'
        }))
      );
      
      // Marketplace data worksheet
      const marketplaceWS = XLSX.utils.json_to_sheet(
        marketplaces.map(mp => ({
          'Marketplace': mp.name,
          'Status': mp.status,
          'Seller ID': mp.sellerId || 'Not connected',
          'Last Sync': mp.lastSync || 'Never'
        }))
      );
      
      // Sync logs worksheet
      const syncLogsWS = XLSX.utils.json_to_sheet(
        syncLogs.map(log => ({
          'Date': log.date,
          'Operation': log.operation,
          'Marketplace': log.marketplace,
          'Status': log.status,
          'Error Message': log.error || 'No errors'
        }))
      );
      
      // Product sync data worksheet
      const productSyncWS = XLSX.utils.json_to_sheet(
        productSyncData.map(product => ({
          'Product Name': product.name,
          'Price': product.price,
          'SKU': product.sku,
          'Barcode': product.barcode,
          'Synced': product.synced,
          'Marketplace': product.marketplace,
          'Status': product.status,
          'Error': product.error || 'No errors'
        }))
      );
      
      // Add worksheets to workbook
      XLSX.utils.book_append_sheet(wb, analyticsWS, 'Analytics Summary');
      XLSX.utils.book_append_sheet(wb, marketplaceWS, 'Marketplace Status');
      XLSX.utils.book_append_sheet(wb, syncLogsWS, 'Sync Logs');
      XLSX.utils.book_append_sheet(wb, productSyncWS, 'Product Sync Data');
      
      // Generate report info sheet
      const reportInfoWS = XLSX.utils.json_to_sheet([
        {
          'Report Type': 'Views Report',
          'Date Range': selectedDateRange.label,
          'Period': dateRange,
          'Generated On': new Date().toLocaleDateString(),
          'Generated At': new Date().toLocaleTimeString(),
          'Total Marketplaces': marketplaces.length,
          'Connected Marketplaces': marketplaces.filter(mp => mp.status === 'connected').length,
          'Total Products': productSyncData.length,
          'Synced Products': productSyncData.filter(p => p.synced === 'Yes').length
        }
      ]);
      
      XLSX.utils.book_append_sheet(wb, reportInfoWS, 'Report Info');
      
      // Write the file
      const fileName = `views-report-${selectedDateRange.value}-${new Date().toISOString().split('T')[0]}.xlsx`;
      XLSX.writeFile(wb, fileName);
      
      console.log('Excel report exported successfully');
    } catch (error) {
      console.error('Error exporting Excel:', error);
      alert('Error generating Excel report. Please try again.');
    }
  }, [analyticsData, selectedDateRange, dateRange, marketplaces, syncLogs, productSyncData]);

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Header with Tab Navigation */}
      <div className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="flex flex-wrap justify-between items-center mb-6 gap-4">
          <h1 className="text-4xl font-bold text-gray-900 tracking-tight">
            Dashboard
          </h1>
          <DateRangePicker 
            selectedRange={selectedDateRange}
            onRangeChange={handleDateRangeChange}
            dateRange={dateRange}
          />
        </div>

        {/* Tab Navigation */}
        <div className="flex space-x-8">
          <TabButton
            active={activeTab === "dashboard"}
            onClick={() => handleTabChange("dashboard")}
            label="Dashboard"
          />
          <TabButton
            active={activeTab === "sync"}
            onClick={() => handleTabChange("sync")}
            label="Marketplace Sync"
          />
          <TabButton
            active={activeTab === "analytics"}
            onClick={() => handleTabChange("analytics")}
            label="Analytics Reports"
          />
          <TabButton
            active={activeTab === "inventory"}
            onClick={() => handleTabChange("inventory")}
            label="DataBase"
          />
        </div>
      </div>

      {/* Tab Content */}
      <div className="px-6 py-6">
        {activeTab === "dashboard" && (
          <DashboardTab
            stats={stats}
            smsStats={smsStats}
            analyticsData={analyticsData}
            selectedTimeRange={selectedTimeRange}
            onTimeRangeChange={handleTimeRangeChange}
            onExportPDF={handleExportPDF}
            onExportExcel={handleExportExcel}
            selectedSalesDateRange={selectedSalesDateRange}
            onSalesDateRangeChange={handleSalesDateRangeChange}
            salesDateRange={salesDateRange}
          />
        )}

        {activeTab === "inventory" && (
          <InventoryTab
            products={filteredInventoryProducts}
            searchTerm={searchTerm}
            filters={filters}
            onSearchChange={handleSearchChange}
            onFilterChange={handleFilterChange}
            onResetFilters={resetFilters}
            onEdit={handleEdit}
            onDelete={handleDelete}
            onDownload={handleDownload}
          />
        )}

        {activeTab === "sync" && (
          <SyncTab
            productSyncData={filteredSyncProducts}
            marketplaces={marketplaces}
            syncLogs={syncLogs}
            searchTerm={searchTerm}
            onSearchChange={handleSearchChange}
          />
        )}

        {activeTab === "analytics" && <AnalyticsTab />}
      </div>
    </div>
  );
};

// Tab Button Component
const TabButton = memo(({ active, onClick, label }) => (
  <button
    className={`py-2 px-4 text-sm font-medium border-b-2 transition-colors ${
      active
        ? "border-blue-500 text-blue-600"
        : "border-transparent text-gray-500 hover:text-gray-700"
    }`}
    onClick={onClick}
  >
    {label}
  </button>
));

TabButton.displayName = "TabButton";

// Dashboard Tab Component
const DashboardTab = memo(
  ({
    stats,
    smsStats,
    analyticsData,
    selectedTimeRange,
    onTimeRangeChange,
    onExportPDF,
    onExportExcel,
    selectedSalesDateRange,
    onSalesDateRangeChange,
    salesDateRange,
  }) => (
    <div className="space-y-6">
      <StatsGrid stats={stats} />
      <SMSStatsSection smsStats={smsStats} />
      <SalesAnalyticsSection
        analyticsData={analyticsData}
        selectedTimeRange={selectedTimeRange}
        onTimeRangeChange={onTimeRangeChange}
        onExportPDF={onExportPDF}
        onExportExcel={onExportExcel}
        selectedSalesDateRange={selectedSalesDateRange}
        onSalesDateRangeChange={onSalesDateRangeChange}
        salesDateRange={salesDateRange}
      />
      <MarketplaceSettingsSection />
    </div>
  )
);

DashboardTab.displayName = "DashboardTab";

// Inventory Tab Component
const InventoryTab = memo(
  ({
    products,
    searchTerm,
    filters,
    onSearchChange,
    onFilterChange,
    onResetFilters,
    onEdit,
    onDelete,
    onDownload,
  }) => (
    <div className="space-y-6">
      {/* Search and Filter Bar */}
      <div className="bg-white rounded-lg p-4 shadow-sm">
        <div className="flex items-center gap-4 flex-wrap">
          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search products..."
              value={searchTerm}
              onChange={onSearchChange}
              className="pl-10 pr-4 py-2 border border-gray-300 rounded-md text-sm focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          <Filter className="h-5 w-5 text-gray-600" />

          {/* Filter Controls */}
          <select
            value={filters.filterBy}
            onChange={(e) => onFilterChange("filterBy", e.target.value)}
            className="border border-gray-300 rounded-md px-3 py-2 text-sm focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="">Filter By</option>
            {FILTER_OPTIONS.filterBy.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>

          <select
            value={filters.category}
            onChange={(e) => onFilterChange("category", e.target.value)}
            className="border border-gray-300 rounded-md px-3 py-2 text-sm focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="">Choose category</option>
            {FILTER_OPTIONS.categories.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>

          <select
            value={filters.subcategory}
            onChange={(e) => onFilterChange("subcategory", e.target.value)}
            className="border border-gray-300 rounded-md px-3 py-2 text-sm focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="">Choose sub category</option>
            {FILTER_OPTIONS.subcategories.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>

          <button
            onClick={onResetFilters}
            className="text-red-500 hover:text-red-600 text-sm font-medium flex items-center gap-1"
          >
            <RotateCcw className="h-4 w-4" />
            Reset Filter
          </button>
        </div>
      </div>

      {/* Inventory Results */}
      <div className="bg-white rounded-lg shadow-sm">
        <div className="p-4 border-b">
          <h2 className="text-lg font-semibold text-black">
            Inventory Data ({products.length} items)
          </h2>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full">
            <thead className="bg-gray-50 border-b">
              <tr>
                {INVENTORY_HEADERS.map((header) => (
                  <th
                    key={header}
                    className="px-4 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider"
                  >
                    {header}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {products.map((product) => (
                <InventoryProductRow
                  key={product.id}
                  product={product}
                  onEdit={onEdit}
                  onDelete={onDelete}
                  onDownload={onDownload}
                />
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
);

InventoryTab.displayName = "InventoryTab";

// Sync Tab Component
const SyncTab = memo(
  ({ productSyncData, marketplaces, syncLogs, searchTerm, onSearchChange }) => (
    <div className="space-y-6">
      <ProductSyncSection
        productSyncData={productSyncData}
        searchTerm={searchTerm}
        onSearchChange={onSearchChange}
      />
      <MarketplaceConnectionsSection marketplaces={marketplaces} />
      <SyncLogsSection syncLogs={syncLogs} />
    </div>
  )
);

SyncTab.displayName = "SyncTab";

// Analytics Tab Component
const AnalyticsTab = memo(() => (
  <div className="space-y-6">
    {/* Analytics Header */}
    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
      <div>
        <h2 className="text-2xl font-bold text-gray-900">Analytics Reports</h2>
        <p className="text-gray-600 mt-1">
          Track your business performance and insights
        </p>
      </div>

      <div className="flex items-center space-x-3">
        {/* Period Selector */}
        <select className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white">
          <option value="7d">Last 7 days</option>
          <option value="30d">Last 30 days</option>
          <option value="90d">Last 3 months</option>
          <option value="1y">Last year</option>
        </select>

        {/* Action Buttons */}
        <button className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
          <RefreshCw className="h-4 w-4" />
          <span>Refresh</span>
        </button>

        <button className="flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
          <Download className="h-4 w-4" />
          <span>Export</span>
        </button>
      </div>
    </div>

    {/* Analytics Overview Stats */}
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-blue-50 rounded-lg">
              <DollarSign className="h-6 w-6 text-blue-600" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-600">Total Revenue</p>
              <p className="text-2xl font-bold text-gray-900">₹45,230</p>
            </div>
          </div>
          <div className="flex items-center space-x-1 text-green-600">
            <TrendingUp className="h-4 w-4" />
            <span className="text-sm font-medium">12.5%</span>
          </div>
        </div>
      </div>

      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-green-50 rounded-lg">
              <ShoppingCart className="h-6 w-6 text-green-600" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-600">Total Orders</p>
              <p className="text-2xl font-bold text-gray-900">1,324</p>
            </div>
          </div>
          <div className="flex items-center space-x-1 text-red-600">
            <TrendingDown className="h-4 w-4" />
            <span className="text-sm font-medium">2.1%</span>
          </div>
        </div>
      </div>

      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-purple-50 rounded-lg">
              <Users className="h-6 w-6 text-purple-600" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-600">Total Users</p>
              <p className="text-2xl font-bold text-gray-900">8,942</p>
            </div>
          </div>
          <div className="flex items-center space-x-1 text-green-600">
            <TrendingUp className="h-4 w-4" />
            <span className="text-sm font-medium">8.7%</span>
          </div>
        </div>
      </div>

      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-yellow-50 rounded-lg">
              <Package className="h-6 w-6 text-yellow-600" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-600">
                Avg. Order Value
              </p>
              <p className="text-2xl font-bold text-gray-900">₹156.80</p>
            </div>
          </div>
          <div className="flex items-center space-x-1 text-green-600">
            <TrendingUp className="h-4 w-4" />
            <span className="text-sm font-medium">4.2%</span>
          </div>
        </div>
      </div>
    </div>

    {/* Charts Section */}
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          Revenue This Week
        </h3>
        <div className="h-64 bg-gray-100 rounded-lg flex items-center justify-center">
          <div className="text-center">
            <BarChart3 className="h-16 w-16 text-gray-400 mx-auto mb-2" />
            <p className="text-gray-500 text-sm">Revenue chart visualization</p>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          Top Performing Products
        </h3>
        <div className="space-y-3">
          {[
            { name: "T-shirt", sales: 245, revenue: 12250 },
            { name: "Jeans", sales: 189, revenue: 15120 },
            { name: "Sneakers", sales: 156, revenue: 18720 },
            { name: "Jacket", sales: 134, revenue: 20100 },
            { name: "Dress", sales: 98, revenue: 9800 },
          ].map((item, index) => (
            <div key={index} className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                <span className="text-sm font-medium text-gray-700">
                  {item.name}
                </span>
              </div>
              <div className="text-right">
                <p className="text-sm font-semibold text-gray-900">
                  ₹{item.revenue.toLocaleString()}
                </p>
                <p className="text-xs text-gray-500">{item.sales} sales</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>

    {/* Additional Insights */}
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">
        Quick Insights
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="p-4 bg-green-50 rounded-lg">
          <p className="text-sm font-medium text-green-600">
            Best Performing Day
          </p>
          <p className="text-lg font-bold text-green-900">Saturday</p>
          <p className="text-xs text-green-600">₹9,100 revenue</p>
        </div>

        <div className="p-4 bg-blue-50 rounded-lg">
          <p className="text-sm font-medium text-blue-600">Growth Trend</p>
          <p className="text-lg font-bold text-blue-900">+12.5%</p>
          <p className="text-xs text-blue-600">vs last period</p>
        </div>

        <div className="p-4 bg-purple-50 rounded-lg">
          <p className="text-sm font-medium text-purple-600">Top Category</p>
          <p className="text-lg font-bold text-purple-900">Footwear</p>
          <p className="text-xs text-purple-600">156 units sold</p>
        </div>
      </div>
    </div>
  </div>
));

AnalyticsTab.displayName = "AnalyticsTab";

// Custom hooks for data management (same as before but organized)
const useDashboardData = () => {
  const stats = useMemo(
    () => [
      {
        title: "Total User",
        value: "40,689",
        change: "+8.5%",
        changeType: "increase",
        period: "Up from yesterday",
        icon: Users,
        color: "bg-blue-500",
      },
      {
        title: "Total Order",
        value: "10293",
        change: "+1.3%",
        changeType: "increase",
        period: "Up from past week",
        icon: ShoppingCart,
        color: "bg-green-500",
      },
      {
        title: "Total Sales",
        value: "$89,000",
        change: "-4.3%",
        changeType: "decrease",
        period: "Down from yesterday",
        icon: DollarSign,
        color: "bg-yellow-500",
      },
      {
        title: "Total Pending",
        value: "2040",
        change: "+1.8%",
        changeType: "increase",
        period: "Up from yesterday",
        icon: Package,
        color: "bg-purple-500",
      },
      {
        title: "Sync Products",
        value: "10293",
        change: "+1.3%",
        changeType: "increase",
        period: "Up from past week",
        icon: RefreshCw,
        color: "bg-indigo-500",
      },
    ],
    []
  );

  const smsStats = useMemo(
    () => [
      { title: "SMS Sent", value: "50,000" },
      { title: "Delivery Report", value: "35%" },
      { title: "Promotional SMS", value: "₹ 3345" },
      { title: "Transactional SMS", value: "₹ 778" },
    ],
    []
  );

  const analyticsData = useMemo(
    () => [
      { title: "Visitor", value: "395", growth: "348.9", growthType: "up" },
      {
        title: "New Visitors",
        value: "932",
        growth: "565.7",
        growthType: "up",
      },
      {
        title: "Average engagement time",
        value: "1m 50",
        growth: "250.1",
        growthType: "down",
      },
      {
        title: "Total Visitors",
        value: "150K",
        growth: null,
        growthType: null,
      },
    ],
    []
  );

  return { stats, smsStats, analyticsData };
};

const useMarketplaceData = () => {
  const productSyncData = useMemo(
    () => [
      {
        id: 1,
        image: "/api/placeholder/200/200",
        name: "Item Stock",
        price: "2025",
        sku: "2025",
        barcode: "2025",
        synced: "Yes",
        marketplace: "amazon",
        status: "connected",
        error: null,
        action: "sync now",
      },
      {
        id: 2,
        image: "/api/placeholder/200/200",
        name: "Item Stock",
        price: "2025",
        sku: "2025",
        barcode: "2025",
        synced: "no",
        marketplace: "flipkart",
        status: "not connected",
        error: "sync",
        action: "sync now",
      },
      {
        id: 3,
        image: "/api/placeholder/200/200",
        name: "Item Stock",
        price: "2025",
        sku: "2025",
        barcode: "2025",
        synced: "sync",
        marketplace: "ajio",
        status: "not connected",
        error: "sync",
        action: "sync now",
      },
    ],
    []
  );

  const marketplaces = useMemo(
    () => [
      {
        id: 1,
        name: "amazon",
        sellerId: "1234",
        status: "connected",
        lastSync: "02.03pm",
      },
      {
        id: 2,
        name: "flipkart",
        sellerId: "5678",
        status: "not connected",
        lastSync: null,
      },
      {
        id: 3,
        name: "ajio",
        sellerId: "4587",
        status: "connected",
        lastSync: null,
      },
      {
        id: 4,
        name: "myntra",
        sellerId: null,
        status: "not connected",
        lastSync: null,
      },
      {
        id: 5,
        name: "nykaa",
        sellerId: null,
        status: "not connected",
        lastSync: null,
      },
    ],
    []
  );

  const syncLogs = useMemo(
    () => [
      {
        id: 1,
        date: "Nov 11,2025",
        operation: "product sync",
        marketplace: "amazon",
        status: "success",
        error: null,
      },
      {
        id: 2,
        date: "Nov 11,2025",
        operation: "inventory sync",
        marketplace: "flipkart",
        status: "fail",
        error: "connection timeout",
      },
      {
        id: 3,
        date: "Nov 11,2025",
        operation: "product sync",
        marketplace: "ajio",
        status: "fail",
        error: "invalid credentials",
      },
    ],
    []
  );

  return { productSyncData, marketplaces, syncLogs };
};

const useInventoryData = () => {
  const inventoryProducts = useMemo(
    () => [
      {
        id: 1,
        image: "/api/placeholder/120/140",
        productName: "T shirt",
        category: "T shirt",
        subcategory: "T shirt",
        returnable: "returnable",
        sizes: [
          {
            size: "small",
            quantity: 5,
            myntraPrice: 4566,
            amazonPrice: 4566,
            flipkartPrice: 4566,
            nykaPrice: 4566,
            salePrice: 4566,
            actualPrice: 4566,
          },
          {
            size: "medium",
            quantity: 10,
            myntraPrice: 4566,
            amazonPrice: 4566,
            flipkartPrice: 4566,
            nykaPrice: 4566,
            salePrice: 4566,
            actualPrice: 4566,
          },
          {
            size: "large",
            quantity: 15,
            myntraPrice: 4566,
            amazonPrice: 4566,
            flipkartPrice: 4566,
            nykaPrice: 4566,
            salePrice: 4566,
            actualPrice: 4566,
          },
        ],
        sku: "blk/m/inso123",
        barcode: "45660000000000",
        description: "this is a shirt",
        manufacturingDetails: "mfd by apparels pvt ltd",
        shippingReturns: "7 day return",
        metaTitle: "dhdhd/dhdhdh",
        metaDescription: "ths/ isnsn/s",
        slugUrl: "ths/ isnsn/s",
        photos: true,
        sizeChart: true,
        status: "good to go",
      },
      {
        id: 2,
        image: "/api/placeholder/120/140",
        productName: "T shirt",
        category: "T shirt",
        subcategory: "T shirt",
        returnable: "returnable",
        sizes: [
          {
            size: "small",
            quantity: 3,
            myntraPrice: 3999,
            amazonPrice: 3999,
            flipkartPrice: 3999,
            nykaPrice: 3999,
            salePrice: 3999,
            actualPrice: 3999,
          },
          {
            size: "medium",
            quantity: 8,
            myntraPrice: 3999,
            amazonPrice: 3999,
            flipkartPrice: 3999,
            nykaPrice: 3999,
            salePrice: 3999,
            actualPrice: 3999,
          },
          {
            size: "large",
            quantity: 12,
            myntraPrice: 3999,
            amazonPrice: 3999,
            flipkartPrice: 3999,
            nykaPrice: 3999,
            salePrice: 3999,
            actualPrice: 3999,
          },
        ],
        sku: "red/l/inso124",
        barcode: "45660000000001",
        description: "red cotton shirt",
        manufacturingDetails: "mfd by textile mills",
        shippingReturns: "7 day return",
        metaTitle: "red-shirt-cotton",
        metaDescription: "comfortable red shirt",
        slugUrl: "red-cotton-shirt",
        photos: true,
        sizeChart: true,
        status: "low",
      },
      {
        id: 3,
        image: "/api/placeholder/120/140",
        productName: "T shirt",
        category: "T shirt",
        subcategory: "T shirt",
        returnable: "returnable",
        sizes: [
          {
            size: "small",
            quantity: 0,
            myntraPrice: 2999,
            amazonPrice: 2999,
            flipkartPrice: 2999,
            nykaPrice: 2999,
            salePrice: 2999,
            actualPrice: 2999,
          },
          {
            size: "medium",
            quantity: 2,
            myntraPrice: 2999,
            amazonPrice: 2999,
            flipkartPrice: 2999,
            nykaPrice: 2999,
            salePrice: 2999,
            actualPrice: 2999,
          },
          {
            size: "large",
            quantity: 5,
            myntraPrice: 2999,
            amazonPrice: 2999,
            flipkartPrice: 2999,
            nykaPrice: 2999,
            salePrice: 2999,
            actualPrice: 2999,
          },
        ],
        sku: "blu/xl/inso125",
        barcode: "45660000000002",
        description: "blue formal shirt",
        manufacturingDetails: "mfd by fashion house",
        shippingReturns: "7 day return",
        metaTitle: "blue-formal-shirt",
        metaDescription: "professional blue shirt",
        slugUrl: "blue-formal-shirt",
        photos: true,
        sizeChart: false,
        status: "finished",
      },
    ],
    []
  );

  return { inventoryProducts };
};

// All other components remain the same but are imported from the previous implementations
// I'll include the essential ones here for completeness:

const StatsGrid = memo(({ stats }) => (
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
    {stats.map((stat, index) => (
      <StatCard key={`stat-${index}`} stat={stat} />
    ))}
  </div>
));

StatsGrid.displayName = "StatsGrid";

const StatCard = memo(({ stat }) => {
  const Icon = stat.icon;
  return (
    <div className="bg-white rounded-2xl shadow-md p-6 border border-gray-100/50 hover:border-gray-200/60 group backdrop-blur-sm">
      <div className="flex items-center justify-between mb-4">
        <div
          className={`p-3 rounded-xl ${stat.color} group-hover:scale-105 transition-transform duration-200 shadow-sm`}
        >
          <Icon className="h-6 w-6 text-white" />
        </div>
      </div>
      <div>
        <p className="text-base font-medium text-[#202224] opacity-75 mb-1 group-hover:opacity-90 transition-opacity duration-200">
          {stat.title}
        </p>
        <p className="text-3xl font-bold text-[#202224] tracking-wide mb-3 group-hover:text-gray-800 transition-colors duration-200">
          {stat.value}
        </p>
        <div className="flex items-center bg-gray-50/50 rounded-lg px-3 py-1.5 group-hover:bg-gray-50/80 transition-colors duration-200">
          {stat.changeType === "increase" ? (
            <TrendingUp className="h-4 w-4 text-emerald-500 mr-1.5" />
          ) : (
            <TrendingDown className="h-4 w-4 text-rose-500 mr-1.5" />
          )}
          <span
            className={`text-sm font-semibold ${
              stat.changeType === "increase"
                ? "text-[#00b69b]"
                : "text-[#f93c65]"
            }`}
          >
            {stat.change}
          </span>
          <span className="text-sm text-[#606060] ml-1">{stat.period}</span>
        </div>
      </div>
    </div>
  );
});

StatCard.displayName = "StatCard";

const SMSStatsSection = memo(({ smsStats }) => (
  <div className="bg-white rounded-2xl shadow-md p-8 border border-gray-100/50">
    <h3 className="text-2xl font-bold text-gray-900 mb-6">SMS Analytics</h3>
    <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
      {smsStats.map((stat, index) => (
        <div
          key={`sms-${index}`}
          className="text-left group bg-gray-50 rounded-xl p-6 border border-gray-100"
        >
          <p className="text-sm font-medium text-[#101316] opacity-75 mb-2 group-hover:opacity-90 transition-opacity duration-200">
            {stat.title}
          </p>
          <p className="text-3xl font-bold text-[#202020] group-hover:text-gray-800 transition-colors duration-200">
            {stat.value}
          </p>
        </div>
      ))}
    </div>
  </div>
));

SMSStatsSection.displayName = "SMSStatsSection";

const SalesAnalyticsSection = memo(
  ({ analyticsData, selectedTimeRange, onTimeRangeChange, onExportPDF, onExportExcel, selectedSalesDateRange, onSalesDateRangeChange, salesDateRange }) => {
    // State for sales date range picker
    const [isSalesDatePickerOpen, setIsSalesDatePickerOpen] = useState(false);
    const [showSalesCustomPicker, setShowSalesCustomPicker] = useState(false);
    const [salesCustomStartDate, setSalesCustomStartDate] = useState("");
    const [salesCustomEndDate, setSalesCustomEndDate] = useState("");
    const salesDatePickerRef = useRef(null);

    // Close dropdown when clicking outside
    useEffect(() => {
      const handleClickOutside = (event) => {
        if (salesDatePickerRef.current && !salesDatePickerRef.current.contains(event.target)) {
          setIsSalesDatePickerOpen(false);
          setShowSalesCustomPicker(false);
        }
      };

      document.addEventListener("mousedown", handleClickOutside);
      return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const handleSalesRangeSelect = (option) => {
      if (option.value === "custom") {
        setShowSalesCustomPicker(true);
      } else {
        onSalesDateRangeChange(option);
        setIsSalesDatePickerOpen(false);
        setShowSalesCustomPicker(false);
      }
    };

    const handleSalesCustomRangeApply = () => {
      if (salesCustomStartDate && salesCustomEndDate) {
        const customOption = {
          label: "Custom Range",
          value: "custom",
          startDate: salesCustomStartDate,
          endDate: salesCustomEndDate,
        };
        onSalesDateRangeChange(customOption);
        setIsSalesDatePickerOpen(false);
        setShowSalesCustomPicker(false);
      }
    };

    const formatSalesDateRange = () => {
      if (selectedSalesDateRange.value === "custom" && selectedSalesDateRange.startDate && selectedSalesDateRange.endDate) {
        const start = new Date(selectedSalesDateRange.startDate).toLocaleDateString('en-US', { 
          month: 'short', 
          day: 'numeric' 
        });
        const end = new Date(selectedSalesDateRange.endDate).toLocaleDateString('en-US', { 
          month: 'short', 
          day: 'numeric', 
          year: 'numeric' 
        });
        return `${start} – ${end}`;
      }
      return salesDateRange;
    };

    return (
    <div className="bg-white rounded-2xl shadow-md p-8">
      <div className="flex justify-between items-center mb-8">
        <h3 className="text-2xl font-bold text-gray-900">Sales Details</h3>
        <div className="flex items-center space-x-4">
          {/* Sales Date Range Picker */}
          <div className="relative" ref={salesDatePickerRef}>
            <button
              onClick={() => setIsSalesDatePickerOpen(!isSalesDatePickerOpen)}
              className="flex items-center gap-2 text-sm text-black bg-gray-100 px-4 py-2 rounded-lg shadow-inner border border-slate-200 hover:bg-gray-200 transition-colors duration-200"
            >
              <CalendarRange className="h-4 w-4" />
              <span className="font-medium tracking-wide">
                {formatSalesDateRange()}
              </span>
              <ChevronDown className={`h-4 w-4 transition-transform duration-200 ${isSalesDatePickerOpen ? 'rotate-180' : ''}`} />
            </button>

            {isSalesDatePickerOpen && (
              <div className="absolute right-0 top-full mt-2 bg-white border border-gray-200 rounded-lg shadow-lg z-50 min-w-[280px] date-picker-dropdown">
                {!showSalesCustomPicker ? (
                  <div className="p-2">
                    {DATE_RANGE_OPTIONS.map((option) => (
                      <button
                        key={option.value}
                        onClick={() => handleSalesRangeSelect(option)}
                        className={`w-full text-left px-3 py-2 rounded-md text-sm transition-colors duration-150 date-picker-option ${
                          selectedSalesDateRange.value === option.value 
                            ? 'selected font-medium' 
                            : 'text-gray-700 hover:bg-gray-50'
                        }`}
                      >
                        {option.label}
                      </button>
                    ))}
                  </div>
                ) : (
                  <div className="p-4">
                    <h4 className="text-sm font-medium text-gray-900 mb-3">Select Custom Range</h4>
                    <div className="space-y-3">
                      <div>
                        <label className="block text-xs font-medium text-gray-700 mb-1">
                          Start Date
                        </label>
                        <input
                          type="date"
                          value={salesCustomStartDate}
                          onChange={(e) => setSalesCustomStartDate(e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-medium text-gray-700 mb-1">
                          End Date
                        </label>
                        <input
                          type="date"
                          value={salesCustomEndDate}
                          onChange={(e) => setSalesCustomEndDate(e.target.value)}
                          min={salesCustomStartDate}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        />
                      </div>
                      <div className="flex gap-2 pt-2">
                        <button
                          onClick={() => setShowSalesCustomPicker(false)}
                          className="flex-1 px-3 py-2 text-sm text-gray-600 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors duration-150"
                        >
                          Cancel
                        </button>
                        <button
                          onClick={handleSalesCustomRangeApply}
                          disabled={!salesCustomStartDate || !salesCustomEndDate}
                          className="flex-1 px-3 py-2 text-sm bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-150"
                        >
                          Apply
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
          
          {/* Month selector */}
          <select className="border border-gray-200 rounded-xl px-4 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-gray-50/50 hover:bg-gray-50 transition-colors duration-200">
            {MONTHS.map((month) => (
              <option key={month} value={month}>
                {month}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="h-64 bg-gradient-to-br from-gray-50 to-gray-100/50 rounded-2xl flex items-center justify-center mb-8 hover:from-gray-50/80 hover:to-gray-100/30 transition-all duration-300 border border-gray-100/50">
        <div className="text-center">
          <BarChart3 className="h-16 w-16 text-gray-400 mx-auto mb-3" />
          <p className="text-gray-500 text-sm font-medium">
            Chart visualization area
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
        {analyticsData.map((item, index) => (
          <div key={`analytics-${index}`} className="group">
            <p className="text-sm font-semibold text-[#9aa0a6] mb-2 tracking-wider group-hover:text-gray-600 transition-colors duration-200">
              {item.title}
            </p>
            <p className="text-2xl font-bold text-[#9aa0a6] mb-2 group-hover:text-gray-700 transition-colors duration-200">
              {item.value}
            </p>
            {item.growth && (
              <div className="flex items-center bg-gray-50/50 rounded-lg px-3 py-1.5 group-hover:bg-gray-50/80 transition-colors duration-200">
                <span
                  className={`text-sm font-semibold mr-1.5 ${
                    item.growthType === "up"
                      ? "text-emerald-500"
                      : "text-rose-500"
                  }`}
                >
                  {item.growth}
                </span>
                {item.growthType === "up" ? (
                  <TrendingUp className="h-4 w-4 text-emerald-500" />
                ) : (
                  <TrendingDown className="h-4 w-4 text-rose-500" />
                )}
              </div>
            )}
          </div>
        ))}
      </div>

      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6 pt-6 border-t border-gray-100">
        <h4 className="text-xl font-bold text-gray-900">Views Report</h4>
        <div className="flex flex-wrap gap-3">
          {TIME_PERIODS.map((period) => (
            <button
              key={period}
              className={`px-5 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200 ${
                selectedTimeRange === period
                  ? "bg-zinc-900 text-white shadow-md hover:bg-zinc-800"
                  : "bg-gray-50 text-zinc-600 border border-gray-200 hover:bg-gray-100 hover:border-gray-300"
              }`}
              onClick={() => onTimeRangeChange(period)}
            >
              {period}
            </button>
          ))}
          <button 
            onClick={onExportPDF}
            className="px-5 py-2.5 rounded-xl text-sm font-semibold bg-gradient-to-r from-blue-500 to-blue-600 text-white hover:from-blue-600 hover:to-blue-700 shadow-md hover:shadow-lg transition-all duration-200"
          >
            Export PDF
          </button>
          <button 
            onClick={onExportExcel}
            className="px-5 py-2.5 rounded-xl text-sm font-semibold bg-gradient-to-r from-green-500 to-green-600 text-white hover:from-green-600 hover:to-green-700 shadow-md hover:shadow-lg transition-all duration-200 flex items-center gap-2"
          >
            <FileSpreadsheet className="h-4 w-4" />
            Export Excel
          </button>
        </div>
      </div>
    </div>
    );
  }
);

SalesAnalyticsSection.displayName = "SalesAnalyticsSection";

// Inventory Product Row Component
const InventoryProductRow = memo(
  ({ product, onEdit, onDelete, onDownload }) => (
    <tr className="hover:bg-gray-50/70 transition-colors duration-200 group border-b border-gray-100/60">
      <td className="px-6 py-5">
        <ProductImage image={product.image} productName={product.productName} />
      </td>
      <td className="px-6 py-5">
        <div className="font-semibold text-gray-900 text-sm group-hover:text-gray-800 transition-colors duration-200">
          {product.productName}
        </div>
        <div className="flex items-center gap-1.5 mt-2">
          <span className="w-2.5 h-2.5 bg-gray-800 rounded-full"></span>
          <span className="w-2.5 h-2.5 bg-gray-400 rounded-full"></span>
        </div>
      </td>
      <td className="px-6 py-5">
        <span className="text-sm text-gray-800 font-medium bg-gray-50/80 px-3 py-1.5 rounded-lg group-hover:bg-gray-100/80 transition-colors duration-200">
          {product.category}
        </span>
      </td>
      <td className="px-6 py-5">
        <span className="text-sm text-gray-800 font-medium">
          {product.subcategory}
        </span>
        <div className="text-xs text-gray-500 mt-1.5 bg-blue-50/60 px-2 py-1 rounded-md">
          {product.returnable}
        </div>
      </td>
      <td className="px-6 py-5">
        <div className="space-y-1.5">
          <div className="text-xs text-gray-600 bg-purple-50/60 px-2 py-1 rounded-md font-medium">
            myntra
          </div>
          <div className="text-xs text-gray-600 bg-orange-50/60 px-2 py-1 rounded-md font-medium">
            amazon
          </div>
          <div className="text-xs text-gray-600 bg-blue-50/60 px-2 py-1 rounded-md font-medium">
            flipkart
          </div>
          <div className="text-xs text-gray-600 bg-pink-50/60 px-2 py-1 rounded-md font-medium">
            nykaa
          </div>
        </div>
      </td>
      <td className="px-6 py-5">
        <SizeData sizes={product.sizes} dataType="size" />
      </td>
      <td className="px-6 py-5">
        <SizeData sizes={product.sizes} dataType="quantity" />
      </td>
      <td className="px-6 py-5">
        <SizeData sizes={product.sizes} dataType="salePrice" />
      </td>
      <td className="px-6 py-5">
        <SizeData sizes={product.sizes} dataType="actualPrice" />
      </td>
      <td className="px-6 py-5">
        <span className="text-xs text-gray-600 font-mono bg-gray-50/80 px-2 py-1 rounded-md">
          {product.sku}
        </span>
      </td>
      <td className="px-6 py-5">
        <span className="text-xs text-gray-600 font-mono bg-gray-50/80 px-2 py-1 rounded-md">
          {product.barcode}
        </span>
      </td>
      <td className="px-6 py-5">
        <span className="text-xs text-gray-700 truncate max-w-xs block bg-gray-50/50 px-2 py-1.5 rounded-md">
          {product.description}
        </span>
      </td>
      <td className="px-6 py-5">
        <span className="text-xs text-gray-700 truncate max-w-xs block bg-gray-50/50 px-2 py-1.5 rounded-md">
          {product.manufacturingDetails}
        </span>
      </td>
      <td className="px-6 py-5">
        <span className="text-xs text-gray-700 bg-green-50/60 px-2 py-1.5 rounded-md font-medium">
          {product.shippingReturns}
        </span>
      </td>
      <td className="px-6 py-5">
        <span className="text-xs text-gray-700 truncate max-w-xs block bg-indigo-50/50 px-2 py-1.5 rounded-md">
          {product.metaTitle}
        </span>
      </td>
      <td className="px-6 py-5">
        <span className="text-xs text-gray-700 truncate max-w-xs block bg-indigo-50/50 px-2 py-1.5 rounded-md">
          {product.metaDescription}
        </span>
      </td>
      <td className="px-6 py-5">
        <span className="text-xs text-gray-700 truncate max-w-xs block bg-slate-50/80 px-2 py-1.5 rounded-md font-mono">
          {product.slugUrl}
        </span>
      </td>
      <td className="px-6 py-5">
        <AvailabilityButton available={product.photos} label="Photos" />
      </td>
      <td className="px-6 py-5">
        <AvailabilityButton available={product.sizeChart} label="Size chart" />
      </td>
      <td className="px-6 py-5">
        <div className="flex flex-col items-center gap-3">
          <StatusBadge status={product.status} />
          <ActionButtons
            productId={product.id}
            onEdit={onEdit}
            onDelete={onDelete}
            onDownload={onDownload}
          />
        </div>
      </td>
    </tr>
  )
);

InventoryProductRow.displayName = "InventoryProductRow";

// Additional components (simplified for brevity - include all from Dashboard_optimized.js)
const ProductSyncSection = memo(
  ({ productSyncData, searchTerm, onSearchChange }) => (
    <div className="bg-white rounded-2xl shadow-md p-8">
      <h2 className="text-3xl font-bold text-gray-900 mb-10">
        Product Sync Manager
      </h2>

      <div className="mb-10">
        <div className="relative max-w-xl">
          <Search className="h-5 w-5 absolute left-4 top-3.5 text-gray-400 pointer-events-none" />
          <input
            type="text"
            placeholder="Search products, marketplace, or SKU..."
            value={searchTerm}
            onChange={onSearchChange}
            className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-gray-50 hover:bg-white focus:bg-white transition-all duration-200 text-sm font-medium placeholder:text-gray-400"
          />
        </div>
      </div>

      <div className="overflow-x-auto rounded-xl border border-gray-100">
        <table className="w-full table-auto">
          <thead>
            <tr className="bg-gray-50 border-b border-gray-200">
              {PRODUCT_SYNC_HEADERS.map((header) => (
                <th
                  key={header}
                  className="text-left py-4 px-6 font-semibold text-sm text-gray-600 uppercase tracking-wide"
                >
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {productSyncData.map((product, index) => (
              <tr
                key={`sync-product-${product.id}`}
                className={`border-b border-gray-100 hover:bg-gray-50 transition-colors duration-200 group ${
                  index % 2 === 0 ? "bg-white" : "bg-gray-50"
                }`}
              >
                <td className="py-5 px-6">
                  <div className="w-16 h-16 bg-gradient-to-br from-gray-100 to-gray-200 rounded-xl flex items-center justify-center group-hover:from-gray-200 group-hover:to-gray-300 transition-all duration-200 shadow-sm">
                    <Package className="h-8 w-8 text-gray-500" />
                  </div>
                </td>
                <td className="py-5 px-6 font-semibold text-gray-900 text-base group-hover:text-gray-800 transition-colors duration-200">
                  {product.name}
                </td>
                <td className="py-5 px-6 text-gray-700 text-base font-medium">
                  <span className="bg-green-50 px-3 py-1.5 rounded-lg">
                    {product.price}
                  </span>
                </td>
                <td className="py-5 px-6 text-gray-700 text-sm">
                  <span className="bg-gray-100 px-3 py-1.5 rounded-lg font-mono">
                    {product.sku}
                  </span>
                </td>
                <td className="py-5 px-6 text-gray-700 text-sm">
                  <span className="bg-gray-100 px-3 py-1.5 rounded-lg font-mono">
                    {product.barcode}
                  </span>
                </td>
                <td className="py-5 px-6">
                  <StatusBadge status={product.synced} />
                </td>
                <td className="py-5 px-6">
                  <span
                    className={`text-sm font-semibold capitalize px-3 py-1.5 rounded-lg ${
                      product.marketplace === "amazon"
                        ? "bg-orange-50 text-orange-700"
                        : product.marketplace === "flipkart"
                        ? "bg-blue-50 text-blue-700"
                        : product.marketplace === "myntra"
                        ? "bg-purple-50 text-purple-700"
                        : product.marketplace === "nykaa"
                        ? "bg-pink-50 text-pink-700"
                        : "bg-gray-100 text-gray-700"
                    }`}
                  >
                    {product.marketplace}
                  </span>
                </td>
                <td className="py-5 px-6">
                  {product.error && (
                    <StatusBadge status={product.error} type="error" />
                  )}
                </td>
                <td className="py-5 px-6">
                  <button className="bg-gradient-to-r from-blue-600 to-blue-700 text-white px-5 py-2.5 rounded-xl text-sm font-semibold hover:from-blue-700 hover:to-blue-800 shadow-md hover:shadow-lg transition-all duration-200 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500">
                    Sync Now
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
);

ProductSyncSection.displayName = "ProductSyncSection";

const MarketplaceSettingsSection = memo(() => {
  const [settings, setSettings] = useState({
    globalInventorySync: true,
    syncFrequency: true,
    globalSync: true,
    additionalSync: false,
    perMarketplaceRules: "6hr",
  });

  const toggleSetting = (key) => {
    setSettings((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  const updateDropdown = (value) => {
    setSettings((prev) => ({
      ...prev,
      perMarketplaceRules: value,
    }));
  };

  return (
    <div className="bg-white rounded-2xl shadow-md p-8">
      <h3 className="text-3xl font-bold text-gray-900 mb-10">
        Marketplace Settings
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        <div className="bg-gray-50 rounded-xl p-6 border border-gray-100">
          <h4 className="text-lg font-semibold text-gray-800 mb-6 tracking-tight">
            Orders from marketplace
          </h4>
          <div className="space-y-5">
            <SettingButton
              isOn={settings.globalInventorySync}
              onToggle={() => toggleSetting("globalInventorySync")}
              label="Global inventory sync"
            />
            <SettingButton
              isOn={settings.syncFrequency}
              onToggle={() => toggleSetting("syncFrequency")}
              label="Sync frequency"
            />
            <HourDropdown
              value={settings.perMarketplaceRules}
              onChange={updateDropdown}
              label="Per marketplace rules"
            />
          </div>
        </div>
        <div className="bg-gray-50 rounded-xl p-6 border border-gray-100">
          <h4 className="text-lg font-semibold text-gray-800 mb-6 tracking-tight">
            Out series settings
          </h4>
          <div className="space-y-5">
            <SettingButton
              isOn={settings.globalSync}
              onToggle={() => toggleSetting("globalSync")}
              label="Global sync"
            />
            <SettingButton
              isOn={settings.additionalSync}
              onToggle={() => toggleSetting("additionalSync")}
              label="Additional sync"
            />
          </div>
        </div>
      </div>
    </div>
  );
});

MarketplaceSettingsSection.displayName = "MarketplaceSettingsSection";

const MarketplaceConnectionsSection = memo(({ marketplaces }) => (
  <div className="bg-white rounded-2xl shadow-md p-8">
    <h2 className="text-3xl font-bold text-gray-900 mb-8">
      Connect Marketplaces
    </h2>

    <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
      <div>
        <h3 className="text-xl font-semibold text-gray-800 mb-5 tracking-tight">
          Available marketplace
        </h3>
        <div className="space-y-5">
          <div className="flex justify-between items-center font-semibold border-b border-gray-200 pb-3 text-gray-600 uppercase text-sm tracking-wide">
            <span>Marketplace</span>
            <span>Actions</span>
          </div>
          {marketplaces.map((marketplace) => (
            <div
              key={`available-${marketplace.id}`}
              className="flex justify-between items-center py-2 border-b border-dashed border-gray-100"
            >
              <span className="text-base text-gray-800 capitalize">
                {marketplace.name}
              </span>
              <button
                className={`px-5 py-2 rounded-full text-xs font-medium shadow-sm hover:opacity-90 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 ${
                  STATUS_COLORS[marketplace.status] ||
                  STATUS_COLORS["not connected"]
                }`}
              >
                {marketplace.status}
              </button>
            </div>
          ))}
        </div>
      </div>

      <div>
        <h3 className="text-xl font-semibold text-gray-800 mb-5 tracking-tight">
          Connected accounts
        </h3>
        <div className="space-y-5">
          <div className="flex justify-between items-center font-semibold border-b border-gray-200 pb-3 text-gray-600 uppercase text-sm tracking-wide">
            <span>Seller ID</span>
            <span>Last Sync</span>
          </div>
          {marketplaces.map((marketplace) => (
            <div
              key={`connected-${marketplace.id}`}
              className="flex justify-between items-center py-2 border-b border-dashed border-gray-100"
            >
              <span className="text-sm text-gray-700 font-mono truncate max-w-[160px]">
                {marketplace.sellerId || "Not connected"}
              </span>
              <span className="text-sm text-gray-600">
                {marketplace.lastSync || "Never"}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  </div>
));

MarketplaceConnectionsSection.displayName = "MarketplaceConnectionsSection";

const SyncLogsSection = memo(({ syncLogs }) => (
  <div className="bg-white rounded-2xl shadow-md p-8">
    <h2 className="text-3xl font-bold text-gray-900 mb-8">Sync Logs</h2>

    <div className="overflow-x-auto">
      <table className="w-full table-auto border-collapse">
        <thead>
          <tr className="border-b border-gray-200 bg-gray-50">
            {SYNC_LOG_HEADERS.map((header) => (
              <th
                key={header}
                className="text-left py-4 px-5 text-sm font-semibold text-gray-600 uppercase tracking-wider"
              >
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {syncLogs.map((log) => (
            <tr
              key={`sync-log-${log.id}`}
              className="border-b border-gray-100 hover:bg-gray-50 transition-colors duration-150"
            >
              <td className="py-4 px-5 text-sm font-medium text-gray-900 whitespace-nowrap">
                {log.date}
              </td>
              <td className="py-4 px-5 text-sm font-medium text-gray-900 capitalize whitespace-nowrap">
                {log.operation}
              </td>
              <td className="py-4 px-5 text-sm text-gray-700 capitalize whitespace-nowrap">
                {log.marketplace}
              </td>
              <td className="py-4 px-5">
                <StatusBadge status={log.status} />
              </td>
              <td className="py-4 px-5">
                {log.error ? (
                  <StatusBadge status={log.error} type="error" />
                ) : (
                  <span className="text-gray-400 text-sm">No errors</span>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
));

SyncLogsSection.displayName = "SyncLogsSection";

export default Database;
