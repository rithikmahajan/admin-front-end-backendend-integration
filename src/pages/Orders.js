import React, { useState, useMemo, useCallback, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Filter, 
  Calendar, 
  ChevronDown, 
  Eye, 
  Edit, 
  Download, 
  MoreHorizontal,
  X,
  Printer,
  Scan,
  Share2,
  Check,
  AlertCircle,
  Package,
  Truck
} from 'lucide-react';

/**
 * Orders Component
 * 
 * A comprehensive orders management interface that displays order data in a table format
 * with enhanced filtering capabilities, status tracking, vendor allotment, courier management,
 * and real-time delivery status tracking.
 * 
 * Features:
 * - Order listing with detailed information
 * - Multiple filter options (date, type, status)
 * - Status color coding for better visibility
 * - Clickable order IDs that navigate to order details
 * - Payment status display under order ID
 * - Vendor allotment system with Yes/No options
 * - Courier allotment integration (Shiprocket)
 * - Real-time delivery status tracking
 * - Action buttons (barcode scan, print, download/share)
 * - Responsive design with Tailwind CSS
 * 
 * Performance Optimizations:
 * - useMemo for expensive computations
 * - useCallback for stable function references
 * - Optimized re-renders with proper dependency arrays
 * - Memoized child components to prevent unnecessary re-renders
 */
const Orders = React.memo(() => {
  const navigate = useNavigate();
  // State management for filters, UI controls, and enhanced order management
  const [selectedStartDate, setSelectedStartDate] = useState('06/05/1999');
  const [selectedEndDate, setSelectedEndDate] = useState('06/05/1999');
  const [filterBy, setFilterBy] = useState('Date');
  const [orderType, setOrderType] = useState('Order Type');
  const [orderStatus, setOrderStatus] = useState('Order Status');
  const [showDateDropdown, setShowDateDropdown] = useState(false);
  const [showOrderTypeDropdown, setShowOrderTypeDropdown] = useState(false);
  const [showOrderStatusDropdown, setShowOrderStatusDropdown] = useState(false);
  const [showDateRangePicker, setShowDateRangePicker] = useState(false);
  const [showVendorDropdown, setShowVendorDropdown] = useState({});
  const [selectedVendors, setSelectedVendors] = useState({});
  const [courierAllotments, setCourierAllotments] = useState({});
  const [deliveryStatuses, setDeliveryStatuses] = useState({});

  /**
   * Enhanced sample order data with additional fields for vendor allotment,
   * courier management, and delivery status tracking
   * Memoized to prevent unnecessary re-creation on each render
   */
  const orders = useMemo(() => [
    {
      orderId: '1234567892220',
      paymentStatus: 'Pending',
      image: '/api/placeholder/60/60',
      productName: 'T shirt',
      name: 'Tarnnish',
      date: '13 aug 2024',
      hsn: '406000',
      size: ['small', 'medium', 'large'],
      sizeQuantity: [5, 10, 115],
      quantity: 130,
      price: 4566,
      salePrice: 4566,
      sku: 'bkhvhm0251',
      barcodeNo: '406000000000000',
      status: 'pending',
      orderType: 'prepaid',
      slotVendor: 'slot vendor',
      courierAlloted: 'NO',
      delivered: 'NO',
      actions: 'Pending',
      vendorAllotted: false,
      courierTrackingId: null,
      deliveryStatus: 'Order Placed',
      lastUpdated: new Date().toISOString()
    },
    {
      orderId: '1234567892221',
      paymentStatus: 'Paid',
      image: '/api/placeholder/60/60',
      productName: 'T shirt',
      name: 'Tarnnish',
      date: '13 aug 2024',
      hsn: '406000',
      size: ['small', 'medium', 'large'],
      sizeQuantity: [5, 10, 115],
      quantity: 130,
      price: 4566,
      salePrice: 4566,
      sku: 'bkhvhm0251',
      barcodeNo: '406000000000000',
      status: 'processing',
      orderType: 'cod',
      slotVendor: 'slot vendor',
      courierAlloted: 'YES',
      delivered: 'NO',
      actions: 'Processing',
      vendorAllotted: true,
      courierTrackingId: 'SP123456789',
      deliveryStatus: 'In Transit',
      lastUpdated: new Date().toISOString()
    },
    {
      orderId: '1234567892222',
      paymentStatus: 'Paid',
      image: '/api/placeholder/60/60',
      productName: 'Lower',
      name: 'Shristi',
      date: '14 aug 2024',
      hsn: '406001',
      size: ['small', 'medium'],
      sizeQuantity: [8, 12],
      quantity: 20,
      price: 2500,
      salePrice: 2300,
      sku: 'bkhvhm0252',
      barcodeNo: '406001000000000',
      status: 'accepted',
      orderType: 'prepaid',
      slotVendor: 'vendor 2',
      courierAlloted: 'YES',
      delivered: 'YES',
      actions: 'Delivered',
      vendorAllotted: true,
      courierTrackingId: 'SP123456790',
      deliveryStatus: 'Delivered',
      lastUpdated: new Date().toISOString()
    },
    {
      orderId: '1234567892223',
      paymentStatus: 'Pending',
      image: '/api/placeholder/60/60',
      productName: 'Shorts',
      name: 'Rajesh',
      date: '15 aug 2024',
      hsn: '406002',
      size: ['medium', 'large'],
      sizeQuantity: [15, 25],
      quantity: 40,
      price: 1800,
      salePrice: 1650,
      sku: 'bkhvhm0253',
      barcodeNo: '406002000000000',
      status: 'rejected',
      orderType: 'cod',
      slotVendor: 'vendor 3',
      courierAlloted: 'NO',
      delivered: 'NO',
      actions: 'Rejected',
      vendorAllotted: false,
      courierTrackingId: null,
      deliveryStatus: 'Cancelled',
      lastUpdated: new Date().toISOString()
    },
    {
      orderId: '1234567892224',
      paymentStatus: 'Paid',
      image: '/api/placeholder/60/60',
      productName: 'Jacket',
      name: 'Priya',
      date: '16 aug 2024',
      hsn: '406003',
      size: ['small', 'medium', 'large'],
      sizeQuantity: [3, 7, 10],
      quantity: 20,
      price: 3500,
      salePrice: 3200,
      sku: 'bkhvhm0254',
      barcodeNo: '406003000000000',
      status: 'allotted to vendor',
      orderType: 'prepaid',
      slotVendor: 'vendor 1',
      courierAlloted: 'YES',
      delivered: 'NO',
      actions: 'On way',
      vendorAllotted: true,
      courierTrackingId: 'SP123456791',
      deliveryStatus: 'Out for Delivery',
      lastUpdated: new Date().toISOString()
    }
  ], []); // Empty dependency array since this is static data

  /**
   * Optimized filter handler using useCallback to prevent unnecessary re-renders
   * Resets all filters to their default state
   */
  const handleResetFilter = useCallback(() => {
    setFilterBy('Date');
    setOrderType('Order Type');
    setOrderStatus('Order Status');
    setShowDateDropdown(false);
    setShowOrderTypeDropdown(false);
    setShowOrderStatusDropdown(false);
  }, []);

  /**
   * Enhanced handlers for vendor allotment and courier management
   */
  const handleVendorAllotment = useCallback((orderId, allot) => {
    setSelectedVendors(prev => ({
      ...prev,
      [orderId]: allot
    }));
    // In a real app, this would make an API call
    console.log(`${allot ? 'Allotting' : 'Not allotting'} vendor for order ${orderId}`);
  }, []);

  const handleVendorSelection = useCallback((orderId, vendorName) => {
    // Confirm vendor selection
    setShowVendorDropdown(prev => ({
      ...prev,
      [orderId]: false
    }));
    // In a real app, this would make an API call to assign vendor
    console.log(`Vendor ${vendorName} assigned to order ${orderId}`);
  }, []);

  const handleCourierAllotment = useCallback((orderId, allot) => {
    setCourierAllotments(prev => ({
      ...prev,
      [orderId]: allot
    }));
    
    if (allot) {
      // Simulate Shiprocket integration
      const trackingId = `SP${Date.now()}`;
      setDeliveryStatuses(prev => ({
        ...prev,
        [orderId]: 'Shipped'
      }));
      console.log(`Courier allotted for order ${orderId}, tracking ID: ${trackingId}`);
    } else {
      setDeliveryStatuses(prev => ({
        ...prev,
        [orderId]: 'Pending Shipment'
      }));
    }
  }, []);

  const handleBarcodeScanning = useCallback((orderId) => {
    // In a real app, this would open camera/barcode scanner
    console.log(`Scanning barcode for order ${orderId}`);
    alert(`Barcode scanning for order ${orderId}\n(Camera functionality would be implemented here)`);
  }, []);

  const handleOrderIdClick = useCallback((orderId) => {
    // Navigate to order details page
    navigate(`/order-details/${orderId}`);
  }, [navigate]);
  /**
   * Date range handlers
   */
  const handleDateRangeToggle = useCallback(() => {
    setShowDateRangePicker(!showDateRangePicker);
  }, [showDateRangePicker]);

  const handleStartDateChange = useCallback((e) => {
    setSelectedStartDate(e.target.value);
  }, []);

  const handleEndDateChange = useCallback((e) => {
    setSelectedEndDate(e.target.value);
  }, []);

  /**
   * Dropdown handlers
   */
  const handleDateDropdownToggle = useCallback(() => {
    setShowDateDropdown(!showDateDropdown);
    setShowOrderTypeDropdown(false);
    setShowOrderStatusDropdown(false);
  }, [showDateDropdown]);

  const handleOrderTypeDropdownToggle = useCallback(() => {
    setShowOrderTypeDropdown(!showOrderTypeDropdown);
    setShowDateDropdown(false);
    setShowOrderStatusDropdown(false);
  }, [showOrderTypeDropdown]);

  const handleOrderStatusDropdownToggle = useCallback(() => {
    setShowOrderStatusDropdown(!showOrderStatusDropdown);
    setShowDateDropdown(false);
    setShowOrderTypeDropdown(false);
  }, [showOrderStatusDropdown]);

  /**
   * Filter option handlers
   */
  const handleDateFilterSelect = useCallback((value) => {
    setFilterBy(value);
    setShowDateDropdown(false);
  }, []);

  const handleOrderTypeSelect = useCallback((value) => {
    setOrderType(value);
    setShowOrderTypeDropdown(false);
  }, []);

  const handleOrderStatusSelect = useCallback((value) => {
    setOrderStatus(value);
    setShowOrderStatusDropdown(false);
  }, []);

  /**
   * Close dropdowns when clicking outside
   */
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!event.target.closest('.dropdown-container')) {
        setShowDateDropdown(false);
        setShowOrderTypeDropdown(false);
        setShowOrderStatusDropdown(false);
        setShowDateRangePicker(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  /**
   * Memoized utility function to get status-specific CSS classes
   * @param {string} status - The order status
   * @returns {string} CSS classes for styling
   */
  const getStatusColor = useMemo(() => (status) => {
    const statusMap = {
      accepted: 'bg-green-100 text-green-700',
      processing: 'bg-blue-100 text-blue-700',
      rejected: 'bg-red-100 text-red-700',
      pending: 'bg-yellow-100 text-yellow-700'
    };
    return statusMap[status?.toLowerCase()] || 'bg-gray-100 text-gray-800';
  }, []);

  /**
   * Memoized utility function to get payment status-specific CSS classes
   * @param {string} status - The payment status
   * @returns {string} CSS classes for styling
   */
  const getPaymentStatusColor = useMemo(() => (status) => {
    const statusMap = {
      paid: 'bg-green-500 text-white',
      pending: 'bg-red-500 text-white'
    };
    return statusMap[status?.toLowerCase()] || 'bg-gray-500 text-white';
  }, []);

  /**
   * Memoized utility function to get delivery status-specific CSS classes
   * @param {string} status - The delivery status
   * @returns {string} CSS classes for styling
   */
  const getDeliveryStatusColor = useMemo(() => (status) => {
    const statusMap = {
      'Order Placed': 'bg-blue-100 text-blue-700',
      'Pending Shipment': 'bg-yellow-100 text-yellow-700',
      'Shipped': 'bg-indigo-100 text-indigo-700',
      'In Transit': 'bg-purple-100 text-purple-700',
      'Out for Delivery': 'bg-orange-100 text-orange-700',
      'Delivered': 'bg-green-100 text-green-700',
      'Cancelled': 'bg-red-100 text-red-700',
      'Returned': 'bg-gray-100 text-gray-700'
    };
    return statusMap[status] || 'bg-gray-100 text-gray-800';
  }, []);

  /**
   * Optimized filter handlers using useCallback to prevent unnecessary re-renders
   */
  const filteredOrders = useMemo(() => {
    return orders.filter(order => {
      // Filter by order status
      if (orderStatus !== 'Order Status' && order.status !== orderStatus.toLowerCase()) {
        return false;
      }
      
      // Filter by order type
      if (orderType !== 'Order Type' && order.orderType !== orderType.toLowerCase()) {
        return false;
      }
      
      // Add date filtering logic here if needed
      // if (filterBy !== 'Date') {
      //   // Implement date filtering logic based on filterBy value
      // }
      
      return true;
    });
  }, [orders, orderStatus, orderType, filterBy]);

  return (
    <div className="bg-gray-50 min-h-screen p-6">
      <div className="max-w-full mx-auto bg-white rounded-lg shadow-sm p-6">
      {/* Header Section - Title and date in one line */}
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center space-x-3">
          <h1 className="text-xl font-semibold text-black">orders list</h1>
          <button className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded">
            <Printer className="h-4 w-4" />
          </button>
        </div>
        <div className="relative">
          <button 
            onClick={handleDateRangeToggle}
            className="dropdown-container flex items-center space-x-2 bg-gray-50 px-3 py-1 rounded hover:bg-gray-100 transition-colors"
          >
            <span className="text-sm text-gray-600 font-medium">{selectedStartDate}</span>
            <span className="text-sm text-gray-400">-</span>
            <span className="text-sm text-gray-600 font-medium">{selectedEndDate}</span>
            <Calendar className="h-4 w-4 text-gray-400" />
          </button>
          
          {/* Date Range Picker Dropdown */}
          {showDateRangePicker && (
            <div className="dropdown-container absolute right-0 top-full mt-2 bg-white rounded-lg shadow-lg border border-gray-200 p-4 z-50 min-w-[300px]">
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Start Date</label>
                  <input
                    type="date"
                    value={selectedStartDate}
                    onChange={handleStartDateChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">End Date</label>
                  <input
                    type="date"
                    value={selectedEndDate}
                    onChange={handleEndDateChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                <div className="flex justify-end space-x-2 pt-2">
                  <button
                    onClick={() => setShowDateRangePicker(false)}
                    className="px-3 py-1 text-sm text-gray-600 hover:text-gray-800"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={() => setShowDateRangePicker(false)}
                    className="px-3 py-1 text-sm bg-blue-600 text-white rounded hover:bg-blue-700"
                  >
                    Apply
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Filter Controls Section */}
      <div className="flex items-center justify-between mb-6 pb-4 border-b border-gray-200">
        <div className="flex items-center space-x-4">
          {/* Filter Icon and Label */}
          <div className="flex items-center space-x-2">
            <Filter className="h-4 w-4 text-gray-400" />
            <span className="text-sm text-gray-700 font-medium">Filter By</span>
          </div>

          {/* Date Filter */}
          <div className="relative dropdown-container">
            <button
              onClick={handleDateDropdownToggle}
              className="flex items-center justify-between bg-white border border-gray-300 rounded px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 min-w-[120px] hover:bg-gray-50"
              aria-label="Filter by date"
            >
              <span className={filterBy === 'Date' ? 'text-gray-400' : 'text-gray-900'}>
                {filterBy}
              </span>
              <ChevronDown className="h-3 w-3 text-gray-400 ml-2" />
            </button>
            
            {/* Date Dropdown */}
            {showDateDropdown && (
              <div className="absolute top-full left-0 mt-1 bg-white rounded-lg shadow-lg border border-gray-200 py-1 z-50 min-w-[180px]">
                <button
                  onClick={() => handleDateFilterSelect('Today')}
                  className="w-full px-4 py-2 text-left text-sm hover:bg-gray-50 text-gray-700"
                >
                  Today
                </button>
                <button
                  onClick={() => handleDateFilterSelect('This week')}
                  className="w-full px-4 py-2 text-left text-sm hover:bg-gray-50 text-gray-700"
                >
                  This week
                </button>
                <button
                  onClick={() => handleDateFilterSelect('This month')}
                  className="w-full px-4 py-2 text-left text-sm hover:bg-gray-50 text-gray-700"
                >
                  This month
                </button>
                <hr className="my-1" />
                <button
                  onClick={() => {
                    handleDateFilterSelect('select a Range');
                    setShowDateRangePicker(true);
                  }}
                  className="w-full px-4 py-2 text-left text-sm hover:bg-gray-50 text-gray-700"
                >
                  select a Range
                </button>
              </div>
            )}
          </div>

          {/* Order Type Filter */}
          <div className="relative dropdown-container">
            <button
              onClick={handleOrderTypeDropdownToggle}
              className="flex items-center justify-between bg-white border border-gray-300 rounded px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 min-w-[120px] hover:bg-gray-50"
              aria-label="Filter by order type"
            >
              <span className={orderType === 'Order Type' ? 'text-gray-400' : 'text-gray-900'}>
                {orderType}
              </span>
              <ChevronDown className="h-3 w-3 text-gray-400 ml-2" />
            </button>
            
            {/* Order Type Dropdown */}
            {showOrderTypeDropdown && (
              <div className="absolute top-full left-0 mt-1 bg-white rounded-lg shadow-lg border border-gray-200 py-1 z-50 min-w-[140px]">
                <div className="px-4 py-2 text-xs text-gray-500 border-b border-gray-100">
                  choose sort by
                </div>
                <button
                  onClick={() => handleOrderTypeSelect('Prepaid')}
                  className="w-full px-4 py-2 text-left text-sm hover:bg-gray-50 text-gray-700"
                >
                  Prepaid
                </button>
                <button
                  onClick={() => handleOrderTypeSelect('Cod')}
                  className="w-full px-4 py-2 text-left text-sm hover:bg-gray-50 text-gray-700"
                >
                  Cod
                </button>
                <button
                  onClick={() => handleOrderTypeSelect('Partial Paid')}
                  className="w-full px-4 py-2 text-left text-sm hover:bg-gray-50 text-gray-700"
                >
                  Partial Paid
                </button>
              </div>
            )}
          </div>

          {/* Order Status Filter */}
          <div className="relative dropdown-container">
            <button
              onClick={handleOrderStatusDropdownToggle}
              className="flex items-center justify-between bg-white border border-gray-300 rounded px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 min-w-[120px] hover:bg-gray-50"
              aria-label="Filter by order status"
            >
              <span className={orderStatus === 'Order Status' ? 'text-gray-400' : 'text-gray-900'}>
                {orderStatus}
              </span>
              <ChevronDown className="h-3 w-3 text-gray-400 ml-2" />
            </button>
            
            {/* Order Status Dropdown */}
            {showOrderStatusDropdown && (
              <div className="absolute top-full left-0 mt-1 bg-white rounded-lg shadow-lg border border-gray-200 py-1 z-50 min-w-[160px]">
                <div className="px-4 py-2 text-xs text-gray-500 border-b border-gray-100">
                  choose sort by
                </div>
                <button
                  onClick={() => handleOrderStatusSelect('Pending')}
                  className="w-full px-4 py-2 text-left text-sm hover:bg-gray-50 text-gray-700"
                >
                  Pending
                </button>
                <button
                  onClick={() => handleOrderStatusSelect('Processing')}
                  className="w-full px-4 py-2 text-left text-sm hover:bg-gray-50 text-gray-700"
                >
                  Processing
                </button>
                <button
                  onClick={() => handleOrderStatusSelect('Accepted')}
                  className="w-full px-4 py-2 text-left text-sm hover:bg-gray-50 text-gray-700"
                >
                  Accepted
                </button>
                <button
                  onClick={() => handleOrderStatusSelect('Allotted to vendor')}
                  className="w-full px-4 py-2 text-left text-sm hover:bg-gray-50 text-gray-700"
                >
                  Allotted to vendor
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Reset Filter Button */}
        <button 
          onClick={handleResetFilter}
          className="flex items-center space-x-1 text-red-500 hover:text-red-700 text-sm font-medium"
          aria-label="Reset all filters"
        >
          <X className="h-4 w-4" />
          <span>Reset Filter</span>
        </button>
      </div>

      {/* Orders Table */}
      <div className="overflow-x-auto bg-white rounded-lg border border-gray-200">
        <table className="w-full">
          {/* Table Header */}
          <thead className="bg-gray-50">
            <tr className="border-b border-gray-200">
              <th className="py-3 px-2 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">order id</th>
              <th className="py-3 px-2 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Image</th>
              <th className="py-3 px-2 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Product Name</th>
              <th className="py-3 px-2 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">name</th>
              <th className="py-3 px-2 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">date</th>
              <th className="py-3 px-2 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">HSN</th>
              <th className="py-3 px-2 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">size</th>
              <th className="py-3 px-2 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">quantity</th>
              <th className="py-3 px-2 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Price</th>
              <th className="py-3 px-2 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Sale Price</th>
              <th className="py-3 px-2 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">SKU</th>
              <th className="py-3 px-2 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">barcode no.</th>
              <th className="py-3 px-2 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">status</th>
              <th className="py-3 px-2 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">vendor allotment</th>
              <th className="py-3 px-2 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">courier alloted</th>
              <th className="py-3 px-2 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">delivery status</th>
              <th className="py-3 px-2 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">actions</th>
            </tr>
          </thead>
          
          {/* Table Body */}
          <tbody className="bg-white divide-y divide-gray-100">
            {filteredOrders.map((order, index) => (
              <OrderRow 
                key={`${order.orderId}-${index}`}
                order={order}
                getStatusColor={getStatusColor}
                getPaymentStatusColor={getPaymentStatusColor}
                getDeliveryStatusColor={getDeliveryStatusColor}
                onOrderIdClick={handleOrderIdClick}
                onVendorAllotment={handleVendorAllotment}
                onVendorSelection={handleVendorSelection}
                onCourierAllotment={handleCourierAllotment}
                onBarcodeScanning={handleBarcodeScanning}
                showVendorDropdown={showVendorDropdown}
                setShowVendorDropdown={setShowVendorDropdown}
                selectedVendors={selectedVendors}
                courierAllotments={courierAllotments}
                deliveryStatuses={deliveryStatuses}
              />
            ))}
          </tbody>
        </table>
      </div>

      {/* Footer Status */}
      <div className="mt-8 flex justify-center">
        <span className="inline-block px-6 py-2 bg-red-100 text-red-700 text-sm font-medium rounded-md">
          Rejected
        </span>
      </div>

      {/* Footer Date */}
      <div className="mt-6 text-center text-sm text-gray-500">
        Deal on 10/JUN/2020
      </div>
      </div>
    </div>
  );
});

/**
 * OrderRow Component - Enhanced row component with comprehensive order management features
 * 
 * @param {Object} props - Component props
 * @param {Object} props.order - Order data object
 * @param {Function} props.getStatusColor - Function to get status color
 * @param {Function} props.getPaymentStatusColor - Function to get payment status color
 * @param {Function} props.getDeliveryStatusColor - Function to get delivery status color
 * @param {Function} props.onOrderIdClick - Function to handle order ID click
 * @param {Function} props.onVendorAllotment - Function to handle vendor allotment
 * @param {Function} props.onVendorSelection - Function to handle vendor selection
 * @param {Function} props.onCourierAllotment - Function to handle courier allotment
 * @param {Function} props.onBarcodeScanning - Function to handle barcode scanning
 * @param {Object} props.showVendorDropdown - State for vendor dropdown visibility
 * @param {Function} props.setShowVendorDropdown - Function to set vendor dropdown visibility
 * @param {Object} props.selectedVendors - State for selected vendors
 * @param {Object} props.courierAllotments - State for courier allotments
 * @param {Object} props.deliveryStatuses - State for delivery statuses
 */
const OrderRow = React.memo(({ 
  order, 
  getStatusColor, 
  getPaymentStatusColor, 
  getDeliveryStatusColor,
  onOrderIdClick,
  onVendorAllotment,
  onVendorSelection,
  onCourierAllotment,
  onBarcodeScanning,
  showVendorDropdown,
  setShowVendorDropdown,
  selectedVendors,
  courierAllotments,
  deliveryStatuses
}) => {
  // Available vendors for allotment
  const availableVendors = ['Vendor 1', 'Vendor 2', 'Vendor 3'];

  /**
   * Action button handlers - memoized to prevent unnecessary re-renders
   */
  const handleView = useCallback(() => {
    onOrderIdClick(order.orderId);
  }, [order.orderId, onOrderIdClick]);

  const handleEdit = useCallback(() => {
    console.log('Edit order:', order.orderId);
    // Implement edit logic here
  }, [order.orderId]);

  const handleDownload = useCallback(() => {
    console.log('Download order:', order.orderId);
    // Implement download logic here
  }, [order.orderId]);

  const handleShare = useCallback(() => {
    console.log('Share order:', order.orderId);
    if (navigator.share) {
      navigator.share({
        title: `Order #${order.orderId}`,
        text: `Order details for #${order.orderId}`,
        url: `${window.location.origin}/order-details/${order.orderId}`,
      }).catch(console.error);
    } else {
      // Fallback - copy to clipboard
      navigator.clipboard.writeText(`${window.location.origin}/order-details/${order.orderId}`)
        .then(() => alert('Order link copied to clipboard!'))
        .catch(console.error);
    }
  }, [order.orderId]);

  const handlePrint = useCallback(() => {
    console.log('Print order:', order.orderId);
    // Open order details in new window for printing
    const printWindow = window.open(`/order-details/${order.orderId}?print=true`, '_blank');
    if (printWindow) {
      printWindow.onload = () => {
        printWindow.print();
      };
    }
  }, [order.orderId]);

  const handleBarcodeScan = useCallback(() => {
    onBarcodeScanning(order.orderId);
  }, [order.orderId, onBarcodeScanning]);

  const toggleVendorDropdown = useCallback(() => {
    setShowVendorDropdown(prev => ({
      ...prev,
      [order.orderId]: !prev[order.orderId]
    }));
  }, [order.orderId, setShowVendorDropdown]);

  const handleVendorAllot = useCallback((allot) => {
    onVendorAllotment(order.orderId, allot);
    if (allot) {
      toggleVendorDropdown();
    }
  }, [order.orderId, onVendorAllotment, toggleVendorDropdown]);

  const handleVendorSelect = useCallback((vendorName) => {
    onVendorSelection(order.orderId, vendorName);
  }, [order.orderId, onVendorSelection]);

  const handleCourierAllot = useCallback((allot) => {
    onCourierAllotment(order.orderId, allot);
  }, [order.orderId, onCourierAllotment]);

  // Get current states
  const isVendorAllotted = selectedVendors[order.orderId];
  const isCourierAllotted = courierAllotments[order.orderId];
  const currentDeliveryStatus = deliveryStatuses[order.orderId] || order.deliveryStatus;

  return (
    <tr className="border-b border-gray-100 hover:bg-gray-50">
      {/* Order ID with Payment Status Badge - Now Clickable */}
      <td className="py-4 px-2">
        <div className="space-y-2">
          <button
            onClick={handleView}
            className="text-sm font-medium text-blue-600 hover:text-blue-800 underline cursor-pointer"
          >
            {order.orderId}
          </button>
          <div className="text-xs font-medium text-gray-500 uppercase tracking-wider">
            PAYMENT STATUS
          </div>
          <span className={`inline-block px-2 py-1 text-xs font-medium rounded ${getPaymentStatusColor(order.paymentStatus)}`}>
            {order.paymentStatus}
          </span>
        </div>
      </td>

      {/* Product Image */}
      <td className="py-4 px-2">
        <div className="w-12 h-12 bg-gray-100 rounded overflow-hidden flex items-center justify-center">
          <div className="w-10 h-10 bg-blue-200 rounded flex items-center justify-center">
            <div className="w-6 h-6 bg-blue-400 rounded" aria-label="Product image"></div>
          </div>
        </div>
      </td>

      {/* Product Information */}
      <td className="py-4 px-2">
        <span className="text-sm font-medium text-gray-900">{order.productName}</span>
      </td>

      <td className="py-4 px-2">
        <span className="text-sm text-gray-700">{order.name}</span>
      </td>

      <td className="py-4 px-2">
        <span className="text-sm text-gray-700">{order.date}</span>
      </td>

      <td className="py-4 px-2">
        <span className="text-sm text-gray-700">{order.hsn}</span>
      </td>

      {/* Size Information */}
      <td className="py-4 px-2">
        <div className="space-y-1">
          {order.size.map((size, index) => (
            <div key={size} className="text-xs text-gray-600">{size}</div>
          ))}
        </div>
      </td>

      {/* Quantity */}
      <td className="py-4 px-2">
        <div className="space-y-1">
          {order.sizeQuantity.map((qty, index) => (
            <div key={index} className="text-xs text-gray-900 font-medium">{qty}</div>
          ))}
        </div>
      </td>

      {/* Price */}
      <td className="py-4 px-2">
        <span className="text-sm text-gray-700 font-medium">₹{order.price}</span>
      </td>

      <td className="py-4 px-2">
        <span className="text-sm text-gray-700 font-medium">₹{order.salePrice}</span>
      </td>

      {/* SKU */}
      <td className="py-4 px-2">
        <span className="text-sm text-gray-700">{order.sku}</span>
      </td>

      {/* Barcode */}
      <td className="py-4 px-2">
        <span className="text-xs text-gray-700 font-mono break-all">{order.barcodeNo}</span>
      </td>

      {/* Status */}
      <td className="py-4 px-2">
        <span className={`inline-block px-3 py-1 text-xs font-medium rounded-full ${getStatusColor(order.status)}`}>
          {order.status}
        </span>
      </td>

      {/* Vendor Allotment */}
      <td className="py-4 px-2">
        <div className="space-y-2">
          <div className="text-xs text-gray-600 font-medium text-center">
            allot vendor
          </div>
          <div className="flex items-center space-x-2">
            <button
              onClick={() => handleVendorAllot(false)}
              className={`px-3 py-1 text-xs font-medium rounded-full border ${
                isVendorAllotted === false 
                  ? 'bg-gray-200 border-gray-300 text-gray-700' 
                  : 'bg-white border-gray-300 text-gray-600 hover:bg-gray-50'
              }`}
            >
              No
            </button>
            <button
              onClick={() => handleVendorAllot(true)}
              className={`px-3 py-1 text-xs font-medium rounded-full ${
                isVendorAllotted === true 
                  ? 'bg-red-500 text-white' 
                  : 'bg-white border border-gray-300 text-gray-600 hover:bg-gray-50'
              }`}
            >
              Yes
            </button>
          </div>
          
          {/* Vendor Selection Dropdown */}
          {isVendorAllotted && (
            <div className="relative">
              <div className="mt-2 bg-white border border-gray-200 rounded-lg shadow-lg p-2 z-50 min-w-[150px]">
                <div className="text-xs text-gray-500 mb-2">vendor name</div>
                {availableVendors.map((vendor, index) => (
                  <div key={vendor} className="space-y-1">
                    <button
                      onClick={() => handleVendorSelect(vendor)}
                      className="w-full text-left px-2 py-1 text-sm text-gray-700 hover:bg-gray-50 rounded"
                    >
                      {vendor.toLowerCase()}
                    </button>
                    {index < availableVendors.length - 1 && (
                      <hr className="border-gray-200" />
                    )}
                  </div>
                ))}
                <button
                  onClick={() => handleVendorSelect('Confirmed')}
                  className="w-full mt-2 bg-blue-600 text-white px-3 py-1 rounded text-sm font-medium hover:bg-blue-700"
                >
                  confirm
                </button>
              </div>
            </div>
          )}
        </div>
      </td>

      {/* Courier Allotment */}
      <td className="py-4 px-2">
        <div className="space-y-2">
          <div className="flex items-center space-x-2">
            <button
              onClick={() => handleCourierAllot(false)}
              className={`px-3 py-1 text-xs font-medium rounded-full border ${
                isCourierAllotted === false 
                  ? 'bg-gray-200 border-gray-300 text-gray-700' 
                  : 'bg-white border-gray-300 text-gray-600 hover:bg-gray-50'
              }`}
            >
              No
            </button>
            <button
              onClick={() => handleCourierAllot(true)}
              className={`px-3 py-1 text-xs font-medium rounded-full ${
                isCourierAllotted === true 
                  ? 'bg-blue-600 text-white' 
                  : 'bg-white border border-gray-300 text-gray-600 hover:bg-gray-50'
              }`}
            >
              Yes
            </button>
          </div>
          {isCourierAllotted && (
            <div className="text-xs text-green-600 font-medium">
              <Package className="inline w-3 h-3 mr-1" />
              Shiprocket
            </div>
          )}
        </div>
      </td>

      {/* Delivery Status */}
      <td className="py-4 px-2">
        <span className={`inline-block px-2 py-1 text-xs font-medium rounded-full ${getDeliveryStatusColor(currentDeliveryStatus)}`}>
          {currentDeliveryStatus}
        </span>
      </td>

      {/* Actions */}
      <td className="py-4 px-2">
        <div className="flex flex-col items-start space-y-2">
          <div className="flex items-center space-x-1">
            <button 
              onClick={handleBarcodeScan}
              className="p-1.5 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded"
              aria-label="Scan barcode"
              title="Scan Barcode"
            >
              <Scan className="h-4 w-4" />
            </button>
            <button 
              onClick={handlePrint}
              className="p-1.5 text-gray-400 hover:text-green-600 hover:bg-green-50 rounded"
              aria-label="Print order"
              title="Print Order"
            >
              <Printer className="h-4 w-4" />
            </button>
            <button 
              onClick={handleDownload}
              className="p-1.5 text-gray-400 hover:text-purple-600 hover:bg-purple-50 rounded"
              aria-label="Download order"
              title="Download Order"
            >
              <Download className="h-4 w-4" />
            </button>
            <button 
              onClick={handleShare}
              className="p-1.5 text-gray-400 hover:text-orange-600 hover:bg-orange-50 rounded"
              aria-label="Share order"
              title="Share Order"
            >
              <Share2 className="h-4 w-4" />
            </button>
          </div>
        </div>
      </td>
    </tr>
  );
});

// Set display names for debugging
Orders.displayName = 'Orders';
OrderRow.displayName = 'OrderRow';

export default Orders;
