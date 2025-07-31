import React, { useState, useMemo, useCallback } from 'react';
import { 
  Filter, 
  Calendar, 
  ChevronDown, 
  Eye, 
  Edit, 
  Download, 
  MoreHorizontal,
  X
} from 'lucide-react';

/**
 * Orders Component
 * 
 * A comprehensive orders management interface that displays order data in a table format
 * with filtering capabilities, status tracking, and action buttons.
 * 
 * Features:
 * - Order listing with detailed information
 * - Multiple filter options (date, type, status)
 * - Status color coding for better visibility
 * - Action buttons for order management
 * - Responsive design with Tailwind CSS
 * 
 * Performance Optimizations:
 * - useMemo for expensive computations
 * - useCallback for stable function references
 * - Optimized re-renders with proper dependency arrays
 * - Memoized child components to prevent unnecessary re-renders
 */
const Orders = React.memo(() => {
  // State management for filters and UI controls
  const [selectedDate] = useState('06/05/1999');
  const [filterBy, setFilterBy] = useState('All');
  const [orderType, setOrderType] = useState('All');
  const [orderStatus, setOrderStatus] = useState('All');

  /**
   * Sample order data - In a real application, this would come from an API
   * Memoized to prevent unnecessary re-creation on each render
   */
  const orders = useMemo(() => [
    {
      orderId: '12345670922O',
      paymentStatus: 'Pending',
      image: '/api/placeholder/60/60',
      productName: 'T shirt',
      name: 'Tarnnish',
      date: '13 aug 2024',
      hsn: '406000',
      size: {
        small: 5,
        medium: 10,
        large: 115
      },
      quantity: 130,
      price: 4566,
      salePrice: 4566,
      sku: 'bkhvhm0251',
      barcodeNo: '406000000000000',
      status: 'accepted',
      slotVendor: 'slot vendor',
      courierAlloted: 'YES',
      delivered: 'NO',
      actions: 'On way'
    },
    {
      orderId: '12345670922O',
      paymentStatus: 'Paid',
      image: '/api/placeholder/60/60',
      productName: 'T shirt',
      name: 'Tarnnish',
      date: '13 aug 2024',
      hsn: '406000',
      size: {
        small: 5,
        medium: 10,
        large: 115
      },
      quantity: 130,
      price: 4566,
      salePrice: 4566,
      sku: 'bkhvhm0251',
      barcodeNo: '406000000000000',
      status: 'processing',
      slotVendor: 'slot vendor',
      courierAlloted: 'YES',
      delivered: 'NO',
      actions: 'On way'
    }
  ], []); // Empty dependency array since this is static data

  /**
   * Optimized filter handler using useCallback to prevent unnecessary re-renders
   * Resets all filters to their default state
   */
  const handleResetFilter = useCallback(() => {
    setFilterBy('All');
    setOrderType('All');
    setOrderStatus('All');
  }, []);

  /**
   * Memoized utility function to get status-specific CSS classes
   * @param {string} status - The order status
   * @returns {string} CSS classes for styling
   */
  const getStatusColor = useMemo(() => (status) => {
    const statusMap = {
      accepted: 'bg-green-100 text-green-800',
      processing: 'bg-blue-100 text-blue-800',
      rejected: 'bg-red-100 text-red-800',
      pending: 'bg-yellow-100 text-yellow-800'
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
   * Memoized utility function to get courier status-specific CSS classes
   * @param {string} status - The courier status (YES/NO)
   * @returns {string} CSS classes for styling
   */
  const getCourierStatusColor = useMemo(() => (status) => {
    const statusMap = {
      yes: 'bg-green-500 text-white',
      no: 'bg-red-500 text-white'
    };
    return statusMap[status?.toLowerCase()] || 'bg-gray-500 text-white';
  }, []);

  /**
   * Optimized filter handlers using useCallback to prevent unnecessary re-renders
   */
  const handleFilterByChange = useCallback((e) => {
    setFilterBy(e.target.value);
  }, []);

  const handleOrderTypeChange = useCallback((e) => {
    setOrderType(e.target.value);
  }, []);

  const handleOrderStatusChange = useCallback((e) => {
    setOrderStatus(e.target.value);
  }, []);

  /**
   * Filtered orders based on current filter selections
   * Memoized to prevent unnecessary recalculations
   */
  const filteredOrders = useMemo(() => {
    return orders.filter(order => {
      if (orderStatus !== 'All' && order.status !== orderStatus.toLowerCase()) {
        return false;
      }
      // Add more filter logic here as needed
      return true;
    });
  }, [orders, orderStatus]);

  return (
    <div className="bg-white min-h-screen p-6">
      {/* Header Section - Title and date in one line */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-black">orders list</h1>
        <div className="flex items-center space-x-2">
          <span className="text-sm text-gray-600">06/05/1999 - 06/05/1999</span>
          <Calendar className="h-4 w-4 text-gray-400" />
        </div>
      </div>

      {/* Filter Controls Section */}
      <div className="flex items-center justify-between mb-6 pb-4 border-b border-gray-200">
        <div className="flex items-center space-x-4">
          {/* Filter Icon and Label */}
          <div className="flex items-center space-x-2">
            <Filter className="h-4 w-4 text-gray-400" />
            <span className="text-sm text-gray-700">Filter By</span>
          </div>

          {/* Date Filter */}
          <div className="relative">
            <select 
              value={filterBy}
              onChange={handleFilterByChange}
              className="appearance-none bg-white border border-gray-300 rounded px-3 py-1.5 pr-8 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              aria-label="Filter by date"
            >
              <option>Date</option>
              <option>This Week</option>
              <option>This Month</option>
            </select>
            <ChevronDown className="h-3 w-3 absolute right-2 top-2.5 text-gray-400 pointer-events-none" />
          </div>

          {/* Order Type Filter */}
          <div className="relative">
            <select 
              value={orderType}
              onChange={handleOrderTypeChange}
              className="appearance-none bg-white border border-gray-300 rounded px-3 py-1.5 pr-8 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              aria-label="Filter by order type"
            >
              <option>Order Type</option>
              <option>Online</option>
              <option>Offline</option>
            </select>
            <ChevronDown className="h-3 w-3 absolute right-2 top-2.5 text-gray-400 pointer-events-none" />
          </div>

          {/* Order Status Filter */}
          <div className="relative">
            <select 
              value={orderStatus}
              onChange={handleOrderStatusChange}
              className="appearance-none bg-white border border-gray-300 rounded px-3 py-1.5 pr-8 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              aria-label="Filter by order status"
            >
              <option>Order Status</option>
              <option>Pending</option>
              <option>Processing</option>
              <option>Accepted</option>
            </select>
            <ChevronDown className="h-3 w-3 absolute right-2 top-2.5 text-gray-400 pointer-events-none" />
          </div>
        </div>

        {/* Reset Filter Button */}
        <button 
          onClick={handleResetFilter}
          className="flex items-center space-x-1 text-red-500 hover:text-red-700 text-sm"
          aria-label="Reset all filters"
        >
          <X className="h-4 w-4" />
          <span>Reset Filter</span>
        </button>
      </div>

      {/* Orders Table */}
      <div className="overflow-x-auto">
        <table className="w-full">
          {/* Table Header */}
          <thead>
            <tr className="border-b border-gray-200">
              <th className="pb-3 text-left text-xs font-medium text-gray-700 uppercase">order id</th>
              <th className="pb-3 text-left text-xs font-medium text-gray-700 uppercase">Image</th>
              <th className="pb-3 text-left text-xs font-medium text-gray-700 uppercase">Product Name</th>
              <th className="pb-3 text-left text-xs font-medium text-gray-700 uppercase">name</th>
              <th className="pb-3 text-left text-xs font-medium text-gray-700 uppercase">date</th>
              <th className="pb-3 text-left text-xs font-medium text-gray-700 uppercase">HSN</th>
              <th className="pb-3 text-left text-xs font-medium text-gray-700 uppercase">size</th>
              <th className="pb-3 text-left text-xs font-medium text-gray-700 uppercase">quantity</th>
              <th className="pb-3 text-left text-xs font-medium text-gray-700 uppercase">Price</th>
              <th className="pb-3 text-left text-xs font-medium text-gray-700 uppercase">Sale Price</th>
              <th className="pb-3 text-left text-xs font-medium text-gray-700 uppercase">SKU</th>
              <th className="pb-3 text-left text-xs font-medium text-gray-700 uppercase">barcode no.</th>
              <th className="pb-3 text-left text-xs font-medium text-gray-700 uppercase">status</th>
              <th className="pb-3 text-left text-xs font-medium text-gray-700 uppercase">slot vendor</th>
              <th className="pb-3 text-left text-xs font-medium text-gray-700 uppercase">courier alloted</th>
              <th className="pb-3 text-left text-xs font-medium text-gray-700 uppercase">delivered</th>
              <th className="pb-3 text-left text-xs font-medium text-gray-700 uppercase">actions</th>
            </tr>
          </thead>
          
          {/* Table Body */}
          <tbody>
            {filteredOrders.map((order, index) => (
              <OrderRow 
                key={`${order.orderId}-${index}`}
                order={order}
                getStatusColor={getStatusColor}
                getPaymentStatusColor={getPaymentStatusColor}
                getCourierStatusColor={getCourierStatusColor}
              />
            ))}
          </tbody>
        </table>
      </div>

      {/* Footer Status */}
      <div className="mt-6 flex justify-center">
        <span className="inline-block px-4 py-2 bg-red-100 text-red-800 text-sm font-medium rounded">
          Rejected
        </span>
      </div>

      {/* Footer Date */}
      <div className="mt-4 text-center text-sm text-gray-500">
        Deal on 10/JUN/2020
      </div>
    </div>
  );
});

/**
 * OrderRow Component - Memoized row component for better performance
 * 
 * @param {Object} props - Component props
 * @param {Object} props.order - Order data object
 * @param {Function} props.getStatusColor - Function to get status color
 * @param {Function} props.getPaymentStatusColor - Function to get payment status color
 * @param {Function} props.getCourierStatusColor - Function to get courier status color
 */
const OrderRow = React.memo(({ 
  order, 
  getStatusColor, 
  getPaymentStatusColor, 
  getCourierStatusColor 
}) => {
  /**
   * Action button handlers - memoized to prevent unnecessary re-renders
   */
  const handleView = useCallback(() => {
    console.log('View order:', order.orderId);
    // Implement view logic here
  }, [order.orderId]);

  const handleEdit = useCallback(() => {
    console.log('Edit order:', order.orderId);
    // Implement edit logic here
  }, [order.orderId]);

  const handleDownload = useCallback(() => {
    console.log('Download order:', order.orderId);
    // Implement download logic here
  }, [order.orderId]);

  const handleMore = useCallback(() => {
    console.log('More actions for order:', order.orderId);
    // Implement more actions logic here
  }, [order.orderId]);

  return (
    <tr className="border-b border-gray-100">
      {/* Order ID with Payment Status Badge */}
      <td className="py-3">
        <div className="space-y-1">
          <div className="text-sm font-medium text-gray-900">{order.orderId}</div>
          <span className={`inline-block px-2 py-0.5 text-xs font-medium rounded ${getPaymentStatusColor(order.paymentStatus)}`}>
            {order.paymentStatus}
          </span>
        </div>
      </td>

      {/* Product Image */}
      <td className="py-3">
        <div className="w-10 h-10 bg-gray-200 rounded flex items-center justify-center">
          <div className="w-6 h-6 bg-blue-300 rounded" aria-label="Product image"></div>
        </div>
      </td>

      {/* Product Information */}
      <td className="py-3">
        <span className="text-sm text-gray-900">{order.productName}</span>
      </td>

      <td className="py-3">
        <span className="text-sm text-gray-700">{order.name}</span>
      </td>

      <td className="py-3">
        <span className="text-sm text-gray-700">{order.date}</span>
      </td>

      <td className="py-3">
        <span className="text-sm text-gray-700">{order.hsn}</span>
      </td>

      {/* Size Information */}
      <td className="py-3">
        <div className="space-y-0.5">
          <div className="text-xs text-gray-600">small</div>
          <div className="text-xs text-gray-600">medium</div>
          <div className="text-xs text-gray-600">large</div>
        </div>
      </td>

      {/* Quantity */}
      <td className="py-3">
        <div className="space-y-0.5">
          <div className="text-xs text-gray-900">{order.size.small}</div>
          <div className="text-xs text-gray-900">{order.size.medium}</div>
          <div className="text-xs text-gray-900">{order.size.large}</div>
        </div>
      </td>

      {/* Price */}
      <td className="py-3">
        <span className="text-sm text-gray-700">{order.price}</span>
      </td>

      <td className="py-3">
        <span className="text-sm text-gray-700">{order.salePrice}</span>
      </td>

      {/* SKU */}
      <td className="py-3">
        <span className="text-sm text-gray-700">{order.sku}</span>
      </td>

      {/* Barcode */}
      <td className="py-3">
        <span className="text-xs text-gray-700 font-mono">{order.barcodeNo}</span>
      </td>

      {/* Status */}
      <td className="py-3">
        <span className={`inline-block px-2 py-1 text-xs font-medium rounded ${getStatusColor(order.status)}`}>
          {order.status}
        </span>
      </td>

      <td className="py-3">
        <span className="text-sm text-gray-700">{order.slotVendor}</span>
      </td>

      {/* Courier Status */}
      <td className="py-3">
        <span className={`inline-block px-2 py-0.5 text-xs font-medium rounded ${getCourierStatusColor(order.courierAlloted)}`}>
          {order.courierAlloted}
        </span>
      </td>

      <td className="py-3">
        <span className={`inline-block px-2 py-0.5 text-xs font-medium rounded ${getCourierStatusColor(order.delivered)}`}>
          {order.delivered}
        </span>
      </td>

      {/* Actions */}
      <td className="py-3">
        <div className="flex items-center space-x-2">
          <span className="text-sm text-blue-600">{order.actions}</span>
          <div className="flex items-center space-x-1">
            <button 
              onClick={handleView}
              className="p-1 text-gray-400 hover:text-gray-600"
              aria-label="View order"
            >
              <Eye className="h-4 w-4" />
            </button>
            <button 
              onClick={handleEdit}
              className="p-1 text-gray-400 hover:text-gray-600"
              aria-label="Edit order"
            >
              <Edit className="h-4 w-4" />
            </button>
            <button 
              onClick={handleDownload}
              className="p-1 text-gray-400 hover:text-gray-600"
              aria-label="Download order"
            >
              <Download className="h-4 w-4" />
            </button>
            <button 
              onClick={handleMore}
              className="p-1 text-gray-400 hover:text-gray-600"
              aria-label="More actions"
            >
              <MoreHorizontal className="h-4 w-4" />
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
