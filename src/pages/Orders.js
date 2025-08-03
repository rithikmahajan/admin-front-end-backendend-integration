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
  Truck,
  User,
  FileText,
  ArrowLeft
} from 'lucide-react';

/**
 * OrderDetails Component
 * 
 * Displays comprehensive order information including customer details,
 * order items, payment info, delivery address, and order summary.
 * 
 * Features:
 * - Order status management
 * - Customer information display
 * - Order items listing
 * - Payment and delivery information
 * - Action buttons (print, download, share)
 */
const OrderDetails = React.memo(({ orderId, onBack }) => {
  // State for order status management
  const [orderStatus, setOrderStatus] = useState('Pending');
  const [showStatusDropdown, setShowStatusDropdown] = useState(false);
  const [notes, setNotes] = useState('');

  // Mock order data - in real app, this would be fetched based on orderId
  const orderData = {
    id: orderId || '6743',
    status: 'Pending',
    dateRange: 'Feb 16,2022 - Feb 20,2022',
    customer: {
      name: 'Shristi Singh',
      email: 'shristi@gmail.com',
      phone: '+91 904 1212'
    },
    orderInfo: {
      shipping: 'Next express',
      paymentMethod: 'Paypal',
      status: 'Pending'
    },
    deliveryAddress: 'Dharam Colony, Palam Vihar, Gurgaon, Haryana',
    paymentInfo: {
      cardNumber: 'Master Card **** **** 6557',
      businessName: 'Shristi Singh',
      phone: '+91 904 231 1212'
    },
    items: [
      {
        id: '123456789222i',
        image: '/api/placeholder/130/143',
        date: '27 nov 2025',
        customerName: 'pearl',
        size: 'stock',
        quantity: 2025,
        sku: '2025',
        barcode: '2025',
        price: 4566,
        salePrice: 4566
      },
      {
        id: '123456789222i',
        image: '/api/placeholder/130/143',
        date: '27 nov 2025',
        customerName: 'pearl',
        size: 'stock',
        quantity: 2025,
        sku: '2025',
        barcode: '2025',
        price: 4566,
        salePrice: 4566
      }
    ],
    summary: {
      subTotal: 2025,
      shippingRate: 202,
      promo: 2025,
      points: 2025,
      total: 2025
    },
    documents: {
      name: 'aadhar card'
    }
  };

  // Status options
  const statusOptions = [
    'Pending',
    'Processing',
    'Accepted',
    'Allotted to vendor',
    'Shipped',
    'Delivered',
    'Cancelled',
    'Rejected'
  ];

  // Status color mapping
  const getStatusColor = (status) => {
    const colorMap = {
      'Pending': 'bg-orange-200 text-orange-800',
      'Processing': 'bg-blue-200 text-blue-800',
      'Accepted': 'bg-green-200 text-green-800',
      'Allotted to vendor': 'bg-indigo-200 text-indigo-800',
      'Shipped': 'bg-purple-200 text-purple-800',
      'Delivered': 'bg-green-500 text-white',
      'Cancelled': 'bg-red-200 text-red-800',
      'Rejected': 'bg-red-500 text-white'
    };
    return colorMap[status] || 'bg-gray-200 text-gray-800';
  };

  // Event handlers
  const handleStatusChange = useCallback((status) => {
    setOrderStatus(status);
    setShowStatusDropdown(false);
  }, []);

  const handlePrint = useCallback(() => {
    window.print();
  }, []);

  const handleDownload = useCallback(() => {
    // Generate and download order details as PDF
    const orderInfo = {
      orderId: orderData.id,
      customer: orderData.customer,
      orderInfo: orderData.orderInfo,
      deliveryAddress: orderData.deliveryAddress,
      paymentInfo: orderData.paymentInfo,
      items: orderData.items,
      summary: orderData.summary,
      status: orderStatus,
      dateRange: orderData.dateRange
    };
    
    // Create a downloadable JSON file (in production, you'd generate a PDF)
    const jsonData = JSON.stringify(orderInfo, null, 2);
    const blob = new Blob([jsonData], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    
    const link = document.createElement('a');
    link.href = url;
    link.download = `order-${orderData.id}-details.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    
    console.log('Downloaded order details for:', orderId);
  }, [orderId, orderData, orderStatus]);

  const handleShare = useCallback(() => {
    // Share order details
    if (navigator.share) {
      navigator.share({
        title: `Order #${orderData.id}`,
        text: `Order details for #${orderData.id}`,
        url: window.location.href,
      });
    } else {
      // Fallback - copy to clipboard
      navigator.clipboard.writeText(window.location.href);
      alert('Order link copied to clipboard!');
    }
  }, [orderData.id]);

  const handleSave = useCallback(() => {
    // Save order changes (status, notes, etc.)
    console.log('Saving order changes:', {
      orderId: orderData.id,
      status: orderStatus,
      notes: notes
    });
    alert('Order saved successfully!');
  }, [orderData.id, orderStatus, notes]);

  return (
    <div className="bg-gray-50 min-h-screen p-4">
      <div className="max-w-full mx-0 ml-4">
        {/* Header */}
        <div className="mb-8">
          <button
            onClick={onBack}
            className="flex items-center space-x-2 text-gray-600 hover:text-gray-800 mb-4"
          >
            <ArrowLeft className="h-4 w-4" />
            <span>Back to Orders</span>
          </button>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">order details</h1>
          <h2 className="text-2xl font-bold text-gray-800">order</h2>
        </div>

        {/* Order Details Container */}
        <div className="bg-white rounded-2xl shadow-sm p-6 space-y-6">
          {/* Order Header */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-6">
                <span className="text-sm font-medium text-gray-900">Orders ID: #{orderData.id}</span>
                <div className={`px-3 py-2 rounded-lg text-xs font-semibold ${getStatusColor(orderStatus)}`}>
                  {orderStatus}
                </div>
              </div>
            </div>
            
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Calendar className="h-6 w-6 text-gray-400" />
                <span className="text-base font-semibold text-black">{orderData.dateRange}</span>
              </div>
              
              <div className="flex items-center space-x-5">
                {/* Status Change Dropdown */}
                <div className="relative">
                  <button
                    onClick={() => setShowStatusDropdown(!showStatusDropdown)}
                    className="bg-gray-100 px-4 py-3 rounded-lg flex items-center justify-between w-56"
                  >
                    <span className="text-sm font-semibold text-gray-900">Change Status</span>
                    <ChevronDown className="h-5 w-5 text-gray-400" />
                  </button>
                  
                  {showStatusDropdown && (
                    <div className="absolute top-full right-0 mt-2 bg-white rounded-lg shadow-lg border border-gray-200 py-1 z-50 w-56">
                      {statusOptions.map((status) => (
                        <button
                          key={status}
                          onClick={() => handleStatusChange(status)}
                          className="w-full px-4 py-2 text-left text-sm hover:bg-gray-50 text-gray-700"
                        >
                          {status}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
                
                {/* Print Button */}
                <button
                  onClick={handlePrint}
                  className="bg-gray-100 px-4 py-3 rounded-lg flex items-center justify-center"
                >
                  <Printer className="h-6 w-6 text-gray-600" />
                </button>
                
                {/* Save Button */}
                <button
                  onClick={handleSave}
                  className="bg-gray-100 px-4 py-3 rounded-lg"
                >
                  <span className="text-sm font-semibold text-gray-900">Save</span>
                </button>
              </div>
            </div>
          </div>

          {/* Information Cards Row */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Customer Info */}
            <div className="bg-white border border-gray-200 rounded-2xl p-6">
              <div className="flex items-start space-x-4 mb-4">
                <div className="bg-gray-900 p-4 rounded-lg">
                  <User className="h-6 w-6 text-white" />
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">Customer</h3>
                  <div className="space-y-2 text-base text-gray-600">
                    <p>Full Name: {orderData.customer.name}</p>
                    <p>Email: {orderData.customer.email}</p>
                    <p>Phone: {orderData.customer.phone}</p>
                  </div>
                </div>
              </div>
              <button className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg text-sm font-medium hover:bg-blue-700">
                View profile
              </button>
            </div>

            {/* Order Info */}
            <div className="bg-white border border-gray-200 rounded-2xl p-6">
              <div className="flex items-start space-x-4 mb-4">
                <div className="bg-gray-900 p-4 rounded-lg">
                  <Package className="h-6 w-6 text-white" />
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">Order Info</h3>
                  <div className="space-y-2 text-base text-gray-600 font-semibold">
                    <p>Shipping: {orderData.orderInfo.shipping}</p>
                    <p>Payment Method: {orderData.orderInfo.paymentMethod}</p>
                    <p>Status: {orderData.orderInfo.status}</p>
                  </div>
                </div>
              </div>
              <button 
                onClick={handleDownload}
                className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg text-sm font-medium hover:bg-blue-700"
              >
                Download info
              </button>
            </div>

            {/* Delivery Info */}
            <div className="bg-white border border-gray-200 rounded-2xl p-6">
              <div className="flex items-start space-x-4 mb-4">
                <div className="bg-gray-900 p-4 rounded-lg">
                  <Package className="h-6 w-6 text-white" />
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">Deliver to</h3>
                  <div className="text-base text-gray-600 font-semibold">
                    <p>Address: {orderData.deliveryAddress}</p>
                  </div>
                </div>
              </div>
              <button className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg text-sm font-medium hover:bg-blue-700">
                View profile
              </button>
            </div>
          </div>

          {/* Payment Info and Notes Row */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Payment Info */}
            <div className="bg-white border border-gray-200 rounded-2xl p-4">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">payment info</h3>
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <div className="w-9 h-5 bg-red-600 rounded flex items-center justify-center">
                    <span className="text-xs text-white font-bold">M</span>
                  </div>
                  <span className="text-base font-semibold text-gray-700">
                    {orderData.paymentInfo.cardNumber}
                  </span>
                </div>
                <p className="text-base font-semibold text-gray-700">
                  Business name: {orderData.paymentInfo.businessName}
                </p>
                <p className="text-base font-semibold text-gray-700">
                  Phone: {orderData.paymentInfo.phone}
                </p>
              </div>
            </div>

            {/* Note */}
            <div className="md:col-span-2">
              <h3 className="text-xl font-medium text-gray-900 mb-2">Note</h3>
              <div className="bg-white border border-gray-200 rounded-2xl p-4">
                <textarea
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="Type some notes"
                  className="w-full h-20 text-base text-gray-700 placeholder-gray-500 border-none outline-none resize-none"
                />
              </div>
            </div>
          </div>

          {/* Documents Info - Positioned separately as in Figma */}
          <div className="bg-white border border-gray-200 rounded-2xl p-6 w-80">
            <div className="flex items-start space-x-4 mb-4">
              <div className="bg-gray-900 p-4 rounded-lg">
                <FileText className="h-6 w-6 text-white" />
              </div>
              <div className="flex-1">
                <h3 className="text-xl font-bold text-gray-900 mb-2">documents submitted</h3>
                <div className="text-base text-gray-600 font-semibold">
                  <p>document name</p>
                  <p>{orderData.documents.name}</p>
                </div>
              </div>
            </div>
            <button className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg text-sm font-medium hover:bg-blue-700">
              View documents
            </button>
          </div>
        </div>

        {/* Order Items Table */}
        <div className="bg-white rounded-2xl shadow-sm mt-6">
          {/* Table Header */}
          <div className="px-6 py-4 border-b border-gray-200">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-3xl font-bold text-gray-900">order</h2>
              <div className="flex items-center space-x-2">
                <button
                  onClick={handlePrint}
                  className="bg-gray-100 p-2 rounded-lg hover:bg-gray-200"
                >
                  <Printer className="h-6 w-6 text-gray-600" />
                </button>
                <button 
                  onClick={handleShare}
                  className="p-2 hover:bg-gray-100 rounded"
                >
                  <Share2 className="h-6 w-6 text-gray-600" />
                </button>
                <button
                  onClick={handleDownload}
                  className="p-2 hover:bg-gray-100 rounded"
                >
                  <Download className="h-6 w-6 text-gray-600" />
                </button>
              </div>
            </div>
            
            {/* Table Column Headers */}
            <div className="grid grid-cols-10 gap-4 text-sm font-medium text-gray-600">
              <div>Image</div>
              <div>order id</div>
              <div>date</div>
              <div>customer name</div>
              <div>size</div>
              <div>quantity</div>
              <div>SKU</div>
              <div>barcode no.</div>
              <div>Price</div>
              <div>sale price</div>
            </div>
          </div>

          {/* Table Body */}
          <div className="p-6">
            {orderData.items.map((item, index) => (
              <div key={index} className="grid grid-cols-10 gap-4 items-center py-4 border-b border-gray-100 last:border-b-0">
                <div>
                  <img 
                    src={item.image} 
                    alt="Product" 
                    className="w-32 h-36 object-cover rounded-lg bg-gray-100"
                  />
                </div>
                <div>
                  <span className="text-xl font-medium text-blue-600 underline cursor-pointer">
                    {item.id}
                  </span>
                </div>
                <div className="text-xl font-medium text-gray-900">{item.date}</div>
                <div className="text-xl font-medium text-gray-900">{item.customerName}</div>
                <div className="text-xl font-medium text-gray-900">{item.size}</div>
                <div className="text-xl font-medium text-gray-900">{item.quantity}</div>
                <div className="text-xl font-medium text-gray-900">{item.sku}</div>
                <div className="text-xl font-medium text-gray-900">{item.barcode}</div>
                <div className="text-xl font-medium text-gray-900">{item.price}</div>
                <div className="text-xl font-medium text-gray-900">{item.salePrice}</div>
              </div>
            ))}
          </div>

          {/* Order Summary */}
          <div className="px-6 pb-6 flex justify-end">
            <div className="space-y-4">
              <div className="flex justify-between text-xl font-bold text-gray-600 min-w-[200px]">
                <span>Sub Total</span>
                <span className="text-gray-900">{orderData.summary.subTotal}</span>
              </div>
              <div className="flex justify-between text-xl font-bold text-gray-600">
                <span>Shipping Rate</span>
                <span className="text-gray-900">{orderData.summary.shippingRate}</span>
              </div>
              <div className="flex justify-between text-xl font-bold text-gray-600">
                <span>Promo</span>
                <span className="text-gray-900">{orderData.summary.promo}</span>
              </div>
              <div className="flex justify-between text-xl font-bold text-gray-600">
                <span>Points</span>
                <span className="text-gray-900">{orderData.summary.points}</span>
              </div>
              <div className="flex justify-between text-xl font-bold text-gray-600 pt-2 border-t border-gray-200">
                <span>Total</span>
                <span className="text-gray-900">{orderData.summary.total}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center mt-16 text-sm text-white bg-gray-800 py-4 rounded-lg">
          © 2025 YORA. All rights reserved.
        </div>
      </div>
    </div>
  );
});

/**
 * ReturnWindowScreen Component
 * 
 * A dedicated screen for managing return requests with options to:
 * - View return reason and product images
 * - Accept or reject the return
 * - Allot vendor and courier if accepted
 * - Provide explanation for rejection
 */
const ReturnWindowScreen = React.memo(({ returnId, onBack }) => {
  const [returnStatus, setReturnStatus] = useState('pending');
  const [selectedReason, setSelectedReason] = useState('');
  const [vendorAllotted, setVendorAllotted] = useState(false);
  const [courierAllotted, setCourierAllotted] = useState(false);
  const [explanation, setExplanation] = useState('');
  const [showVendorOptions, setShowVendorOptions] = useState(false);
  const [showCourierOptions, setShowCourierOptions] = useState(false);
  const [showVendorSelection, setShowVendorSelection] = useState(false);
  const [selectedVendor, setSelectedVendor] = useState('');

  // Sample return reasons
  const returnReasons = [
    'Size/fit issue (For Exchanging the product)',
    'Product not as expected',
    'Wrong item received',
    'Damaged/defective product',
    'Late delivery',
    'Quality not as expected'
  ];

  // Handle status change
  const handleStatusChange = useCallback((status) => {
    setReturnStatus(status);
    if (status === 'accepted') {
      setShowVendorOptions(true);
    } else {
      setShowVendorOptions(false);
      setShowCourierOptions(false);
      setVendorAllotted(false);
      setCourierAllotted(false);
    }
  }, []);

  // Handle vendor allotment
  const handleVendorAllotment = useCallback((allot) => {
    setVendorAllotted(allot);
    if (allot) {
      setShowCourierOptions(true);
      setShowVendorSelection(true);
    } else {
      setShowCourierOptions(false);
      setCourierAllotted(false);
      setShowVendorSelection(false);
      setSelectedVendor('');
    }
  }, []);

  // Handle vendor selection
  const handleVendorSelection = useCallback((vendor) => {
    setSelectedVendor(vendor);
  }, []);

  // Handle vendor confirmation
  const handleVendorConfirm = useCallback(() => {
    if (selectedVendor) {
      setShowVendorSelection(false);
      console.log(`Vendor ${selectedVendor} confirmed for return ${returnId}`);
      alert(`Vendor "${selectedVendor}" has been successfully assigned to return ${returnId}`);
    }
  }, [selectedVendor, returnId]);

  // Handle courier allotment
  const handleCourierAllotment = useCallback((allot) => {
    setCourierAllotted(allot);
  }, []);

  // Handle send response
  const handleSendResponse = useCallback(() => {
    const response = {
      returnId,
      status: returnStatus,
      vendorAllotted,
      courierAllotted,
      explanation,
      timestamp: new Date().toISOString()
    };
    
    console.log('Return response:', response);
    alert(`Return ${returnStatus} successfully!\nVendor: ${vendorAllotted ? 'Allotted' : 'Not allotted'}\nCourier: ${courierAllotted ? 'Allotted' : 'Not allotted'}`);
    
    // In a real app, this would make an API call
    onBack();
  }, [returnId, returnStatus, vendorAllotted, courierAllotted, explanation, onBack]);

  return (
    <div className="bg-gray-50 min-h-screen p-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-4">
            <button
              onClick={onBack}
              className="flex items-center space-x-2 text-gray-600 hover:text-gray-800"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              <span>Back to Returns</span>
            </button>
          </div>
          <h1 className="text-2xl font-bold text-gray-900">Return Window Screen</h1>
        </div>

        {/* Main Content */}
        <div className="bg-white rounded-lg shadow-lg p-6">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
            
            {/* Image Preview Section */}
            <div className="lg:col-span-1">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Image Preview</h3>
              <div className="space-y-4">
                {/* Main Product Image */}
                <div className="w-full h-64 bg-gray-100 rounded-lg overflow-hidden">
                  <div className="w-full h-full bg-blue-200 rounded flex items-center justify-center">
                    <div className="w-32 h-32 bg-blue-400 rounded" aria-label="Product image"></div>
                  </div>
                </div>
                
                {/* Thumbnail Images */}
                <div className="grid grid-cols-2 gap-2">
                  {[1, 2, 3, 4].map((_, index) => (
                    <div key={index} className="w-full h-20 bg-gray-100 rounded overflow-hidden">
                      <div className="w-full h-full bg-blue-200 rounded flex items-center justify-center">
                        <div className="w-8 h-8 bg-blue-400 rounded" aria-label={`Thumbnail ${index + 1}`}></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Reason of Return Section */}
            <div className="lg:col-span-1">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Reason of return</h3>
              <div className="space-y-1">
                {returnReasons.map((reason, index) => (
                  <div
                    key={index}
                    className={`p-3 border-b border-gray-200 cursor-pointer hover:bg-gray-50 ${
                      selectedReason === reason ? 'bg-blue-50 border-blue-200' : ''
                    }`}
                    onClick={() => setSelectedReason(reason)}
                  >
                    <p className="text-sm text-gray-700">{reason}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Status Section */}
            <div className="lg:col-span-1">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Status</h3>
              <div className="space-y-4">
                <button
                  onClick={() => handleStatusChange('accepted')}
                  className={`w-full px-4 py-2 rounded-lg font-medium ${
                    returnStatus === 'accepted'
                      ? 'bg-green-500 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  Accepted
                </button>
                <button
                  onClick={() => handleStatusChange('rejected')}
                  className={`w-full px-4 py-2 rounded-lg font-medium ${
                    returnStatus === 'rejected'
                      ? 'bg-red-500 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  Rejected
                </button>
              </div>

              {/* Vendor and Courier Allotment (only show if accepted) */}
              {showVendorOptions && (
                <div className="mt-6 space-y-4">
                  <div>
                    <h4 className="text-sm font-medium text-gray-700 mb-2">Allot Vendor</h4>
                    <div className="flex space-x-2">
                      <button
                        onClick={() => handleVendorAllotment(false)}
                        className={`px-4 py-2 rounded-full text-sm font-medium ${
                          vendorAllotted === false
                            ? 'bg-gray-200 text-gray-700'
                            : 'bg-white border border-gray-300 text-gray-600 hover:bg-gray-50'
                        }`}
                      >
                        No
                      </button>
                      <button
                        onClick={() => handleVendorAllotment(true)}
                        className={`px-4 py-2 rounded-full text-sm font-medium ${
                          vendorAllotted === true
                            ? 'bg-blue-600 text-white'
                            : 'bg-white border border-gray-300 text-gray-600 hover:bg-gray-50'
                        }`}
                      >
                        Yes
                      </button>
                    </div>

                    {/* Display selected vendor name */}
                    {vendorAllotted && selectedVendor && !showVendorSelection && (
                      <div className="mt-4">
                        <div className="text-sm font-medium text-gray-700 mb-2">Assigned Vendor:</div>
                        <span className="inline-block px-3 py-1 bg-blue-100 text-blue-800 font-medium rounded-full text-sm">
                          {selectedVendor}
                        </span>
                      </div>
                    )}

                    {/* Vendor Selection Dropdown */}
                    {showVendorSelection && (
                      <div className="mt-4">
                        <div className="bg-white border border-gray-200 rounded-xl shadow-lg p-4 max-w-[220px]">
                          <div className="text-sm font-medium text-gray-400 mb-3">vendor name</div>
                          <div className="space-y-0">
                            {['ven 1', 'ven 2', 'ven 3'].map((vendor, index) => (
                              <div key={vendor}>
                                <label className="flex items-center justify-between py-2 px-2 hover:bg-gray-50 rounded cursor-pointer">
                                  <span className="text-sm font-medium text-gray-900">{vendor}</span>
                                  <div className="relative">
                                    <input
                                      type="radio"
                                      name="vendor-selection"
                                      value={vendor}
                                      checked={selectedVendor === vendor}
                                      onChange={() => handleVendorSelection(vendor)}
                                      className="sr-only"
                                    />
                                    <div className={`w-5 h-5 rounded border-2 flex items-center justify-center ${
                                      selectedVendor === vendor 
                                        ? 'border-blue-500 bg-blue-50' 
                                        : 'border-gray-300 bg-white'
                                    }`}>
                                      {selectedVendor === vendor && (
                                        <Check className="w-3 h-3 text-blue-500" />
                                      )}
                                    </div>
                                  </div>
                                </label>
                                {index < 2 && <hr className="border-gray-200" />}
                              </div>
                            ))}
                          </div>
                          <button
                            onClick={handleVendorConfirm}
                            disabled={!selectedVendor}
                            className={`w-full mt-4 px-4 py-2 rounded-lg text-sm font-medium flex items-center justify-center space-x-2 ${
                              selectedVendor
                                ? 'bg-blue-600 text-white hover:bg-blue-700'
                                : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                            }`}
                          >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                            </svg>
                            <span>confirm</span>
                          </button>
                        </div>
                      </div>
                    )}
                  </div>

                  {showCourierOptions && (
                    <div>
                      <h4 className="text-sm font-medium text-gray-700 mb-2">Courier Allotted</h4>
                      <div className="flex space-x-2">
                        <button
                          onClick={() => handleCourierAllotment(false)}
                          className={`px-4 py-2 rounded-full text-sm font-medium ${
                            courierAllotted === false
                              ? 'bg-gray-200 text-gray-700'
                              : 'bg-white border border-gray-300 text-gray-600 hover:bg-gray-50'
                          }`}
                        >
                          No
                        </button>
                        <button
                          onClick={() => handleCourierAllotment(true)}
                          className={`px-4 py-2 rounded-full text-sm font-medium ${
                            courierAllotted === true
                              ? 'bg-blue-600 text-white'
                              : 'bg-white border border-gray-300 text-gray-600 hover:bg-gray-50'
                          }`}
                        >
                          Yes
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Give Reason/Explanation Section */}
            <div className="lg:col-span-2">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Give Explanation</h3>
              <div className="space-y-4">
                <textarea
                  value={explanation}
                  onChange={(e) => setExplanation(e.target.value)}
                  placeholder={returnStatus === 'rejected' ? 'Provide reason for rejection...' : 'Add any additional notes...'}
                  className="w-full h-32 p-3 border-2 border-gray-300 rounded-lg resize-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  rows={6}
                />
                
                {/* Send Response Button */}
                <div className="flex justify-center pt-4">
                  <button
                    onClick={handleSendResponse}
                    className="bg-black text-white px-8 py-3 rounded-full font-semibold hover:bg-gray-800 transition-colors"
                  >
                    Send Response
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
});

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
  const [selectedVendorNames, setSelectedVendorNames] = useState({});
  const [allottedVendorNames, setAllottedVendorNames] = useState({});
  const [courierAllotments, setCourierAllotments] = useState({});
  const [deliveryStatuses, setDeliveryStatuses] = useState({});
  
  // New state for order details view
  const [showOrderDetails, setShowOrderDetails] = useState(false);
  const [selectedOrderId, setSelectedOrderId] = useState(null);
  
  // New state for return window screen
  const [showReturnWindow, setShowReturnWindow] = useState(false);
  const [selectedReturnId, setSelectedReturnId] = useState(null);
  
  // New state for tab management
  const [activeTab, setActiveTab] = useState('orders');

  // Tab handler
  const handleTabChange = useCallback((tab) => {
    setActiveTab(tab);
  }, []);

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
      allottedVendorName: null,
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
      allottedVendorName: 'ven 1',
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
      allottedVendorName: 'ven 2',
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
      allottedVendorName: null,
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
      allottedVendorName: 'ven 3',
      courierTrackingId: 'SP123456791',
      deliveryStatus: 'Out for Delivery',
      lastUpdated: new Date().toISOString()
    }
  ], []); // Empty dependency array since this is static data

  /**
   * Sample return requests data
   * Memoized to prevent unnecessary re-creation on each render
   */
  const returnRequests = useMemo(() => [
    {
      orderId: '1234567892225',
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
      status: 'return requested',
      orderType: 'prepaid',
      slotVendor: 'slot vendor',
      courierAlloted: 'NO',
      delivered: 'YES',
      actions: 'Return Pending',
      vendorAllotted: true,
      allottedVendorName: 'ven 1',
      courierTrackingId: 'SP123456792',
      deliveryStatus: 'Return Requested',
      lastUpdated: new Date().toISOString(),
      returnReason: 'Size/fit issue (For Exchanging the product)',
      returnStatus: 'pending'
    },
    {
      orderId: '1234567892226',
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
      status: 'return approved',
      orderType: 'prepaid',
      slotVendor: 'vendor 2',
      courierAlloted: 'YES',
      delivered: 'YES',
      actions: 'Return Approved',
      vendorAllotted: true,
      allottedVendorName: 'ven 2',
      courierTrackingId: 'SP123456793',
      deliveryStatus: 'Return Approved',
      lastUpdated: new Date().toISOString(),
      returnReason: 'Product not as expected',
      returnStatus: 'accepted'
    },
    {
      orderId: '1234567892227',
      paymentStatus: 'Paid',
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
      status: 'return rejected',
      orderType: 'cod',
      slotVendor: 'vendor 3',
      courierAlloted: 'NO',
      delivered: 'YES',
      actions: 'Return Rejected',
      vendorAllotted: false,
      allottedVendorName: null,
      courierTrackingId: null,
      deliveryStatus: 'Return Rejected',
      lastUpdated: new Date().toISOString(),
      returnReason: 'Damaged/defective product',
      returnStatus: 'rejected'
    }
  ], []); // Empty dependency array since this is static data

  // Initialize allotted vendor names from existing order data
  useEffect(() => {
    const initialAllottedVendors = {};
    const initialSelectedVendors = {};
    const allData = [...orders, ...returnRequests];
    
    allData.forEach(order => {
      if (order.allottedVendorName) {
        initialAllottedVendors[order.orderId] = order.allottedVendorName;
        initialSelectedVendors[order.orderId] = true;
      } else if (order.vendorAllotted) {
        initialSelectedVendors[order.orderId] = true;
      }
    });
    
    setAllottedVendorNames(initialAllottedVendors);
    setSelectedVendors(prev => ({...prev, ...initialSelectedVendors}));
  }, [orders, returnRequests]);

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
    
    if (allot) {
      setShowVendorDropdown(prev => ({
        ...prev,
        [orderId]: true
      }));
    } else {
      setShowVendorDropdown(prev => ({
        ...prev,
        [orderId]: false
      }));
      setSelectedVendorNames(prev => ({
        ...prev,
        [orderId]: ''
      }));
      setAllottedVendorNames(prev => ({
        ...prev,
        [orderId]: null
      }));
    }
    
    console.log(`${allot ? 'Allotting' : 'Not allotting'} vendor for order ${orderId}`);
  }, []);

  const handleVendorSelection = useCallback((orderId, vendorName) => {
    if (vendorName === 'Confirmed') {
      // Close dropdown after confirmation and store the allotted vendor
      setShowVendorDropdown(prev => ({
        ...prev,
        [orderId]: false
      }));
      const selectedVendor = selectedVendorNames[orderId];
      if (selectedVendor) {
        setAllottedVendorNames(prev => ({
          ...prev,
          [orderId]: selectedVendor
        }));
        console.log(`Vendor ${selectedVendor} confirmed for order ${orderId}`);
        alert(`Vendor "${selectedVendor}" has been successfully assigned to order ${orderId}`);
      }
    } else {
      // Set selected vendor
      setSelectedVendorNames(prev => ({
        ...prev,
        [orderId]: vendorName
      }));
    }
  }, [selectedVendorNames]);

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
    // Show order details inline instead of navigating
    setSelectedOrderId(orderId);
    setShowOrderDetails(true);
  }, []);

  const handleReturnIdClick = useCallback((returnId) => {
    // Show return window screen
    setSelectedReturnId(returnId);
    setShowReturnWindow(true);
  }, []);
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
      pending: 'bg-yellow-100 text-yellow-700',
      'return requested': 'bg-orange-100 text-orange-700',
      'return approved': 'bg-green-100 text-green-700',
      'return rejected': 'bg-red-100 text-red-700',
      'allotted to vendor': 'bg-indigo-100 text-indigo-700'
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
      'Returned': 'bg-gray-100 text-gray-700',
      'Return Requested': 'bg-orange-100 text-orange-700',
      'Return Approved': 'bg-green-100 text-green-700',
      'Return Rejected': 'bg-red-100 text-red-700'
    };
    return statusMap[status] || 'bg-gray-100 text-gray-800';
  }, []);

  /**
   * Optimized filter handlers using useCallback to prevent unnecessary re-renders
   */
  const filteredOrders = useMemo(() => {
    const currentData = activeTab === 'orders' ? orders : returnRequests;
    
    return currentData.filter(order => {
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
  }, [orders, returnRequests, activeTab, orderStatus, orderType, filterBy]);

  // If showing order details, render the OrderDetails component
  if (showOrderDetails && selectedOrderId) {
    return <OrderDetails orderId={selectedOrderId} onBack={() => setShowOrderDetails(false)} />;
  }

  // If showing return window screen, render the ReturnWindowScreen component
  if (showReturnWindow && selectedReturnId) {
    return <ReturnWindowScreen returnId={selectedReturnId} onBack={() => setShowReturnWindow(false)} />;
  }

  return (
    <div className="bg-gray-50 min-h-screen p-4">
      <div className="max-w-full mx-0 ml-4">
      {/* Tab Navigation */}
      <div className="flex items-center space-x-8 mb-6">
        <button
          onClick={() => handleTabChange('orders')}
          className={`text-xl font-semibold pb-2 ${
            activeTab === 'orders' 
              ? 'text-black border-b-2 border-black' 
              : 'text-gray-500 hover:text-gray-700'
          }`}
        >
          orders list
        </button>
        <button
          onClick={() => handleTabChange('returns')}
          className={`text-xl font-semibold pb-2 ${
            activeTab === 'returns' 
              ? 'text-black border-b-2 border-black' 
              : 'text-gray-500 hover:text-gray-700'
          }`}
        >
          return requests
        </button>
      </div>

      {/* Header Section - Title and date in one line */}
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center space-x-3">
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
                {activeTab === 'orders' ? (
                  <>
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
                  </>
                ) : (
                  <>
                    <button
                      onClick={() => handleOrderStatusSelect('Return requested')}
                      className="w-full px-4 py-2 text-left text-sm hover:bg-gray-50 text-gray-700"
                    >
                      Return requested
                    </button>
                    <button
                      onClick={() => handleOrderStatusSelect('Return approved')}
                      className="w-full px-4 py-2 text-left text-sm hover:bg-gray-50 text-gray-700"
                    >
                      Return approved
                    </button>
                    <button
                      onClick={() => handleOrderStatusSelect('Return rejected')}
                      className="w-full px-4 py-2 text-left text-sm hover:bg-gray-50 text-gray-700"
                    >
                      Return rejected
                    </button>
                  </>
                )}
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
      <div className="bg-white rounded-lg border border-gray-200 mr-4">
        <table className="w-full">
          {/* Table Header */}
          <thead className="bg-gray-50">
            <tr className="border-b border-gray-200">
              <th className="py-3 px-2 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                {activeTab === 'returns' ? 'return id' : 'order id'}
              </th>
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
              {activeTab === 'returns' ? (
                <th className="py-3 px-2 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">return to vendor</th>
              ) : (
                <th className="py-3 px-2 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">vendor allotment</th>
              )}
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
                onReturnIdClick={handleReturnIdClick}
                onVendorAllotment={handleVendorAllotment}
                onVendorSelection={handleVendorSelection}
                onCourierAllotment={handleCourierAllotment}
                onBarcodeScanning={handleBarcodeScanning}
                showVendorDropdown={showVendorDropdown}
                setShowVendorDropdown={setShowVendorDropdown}
                selectedVendors={selectedVendors}
                selectedVendorNames={selectedVendorNames}
                allottedVendorNames={allottedVendorNames}
                courierAllotments={courierAllotments}
                deliveryStatuses={deliveryStatuses}
                activeTab={activeTab}
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
  onReturnIdClick,
  onVendorAllotment,
  onVendorSelection,
  onCourierAllotment,
  onBarcodeScanning,
  showVendorDropdown,
  setShowVendorDropdown,
  selectedVendors,
  selectedVendorNames,
  allottedVendorNames,
  courierAllotments,
  deliveryStatuses,
  activeTab
}) => {
  // Available vendors for allotment
  const availableVendors = ['ven 1', 'ven 2', 'ven 3'];

  /**
   * Action button handlers - memoized to prevent unnecessary re-renders
   */
  const handleView = useCallback(() => {
    if (activeTab === 'returns') {
      onReturnIdClick(order.orderId);
    } else {
      onOrderIdClick(order.orderId);
    }
  }, [order.orderId, onOrderIdClick, onReturnIdClick, activeTab]);

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

  const handleVendorAllot = useCallback((allot) => {
    onVendorAllotment(order.orderId, allot);
  }, [order.orderId, onVendorAllotment]);

  const handleVendorSelect = useCallback((vendorName) => {
    onVendorSelection(order.orderId, vendorName);
  }, [order.orderId, onVendorSelection]);

  const handleVendorConfirm = useCallback(() => {
    if (selectedVendorNames[order.orderId]) {
      onVendorSelection(order.orderId, 'Confirmed');
    }
  }, [order.orderId, onVendorSelection, selectedVendorNames]);

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
            {activeTab === 'returns' ? 'RETURN STATUS' : 'PAYMENT STATUS'}
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

      {/* Vendor Allotment or Return to Vendor */}
      <td className="py-4 px-2">
        <div className="space-y-2">
          <div className="text-xs text-gray-600 font-medium text-center">
            {activeTab === 'returns' ? 'return to vendor' : 'allot vendor'}
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
                  ? (activeTab === 'returns' ? 'bg-blue-600 text-white' : 'bg-red-500 text-white')
                  : 'bg-white border border-gray-300 text-gray-600 hover:bg-gray-50'
              }`}
            >
              Yes
            </button>
          </div>
          
          {/* Display allotted vendor name */}
          {(isVendorAllotted || order.allottedVendorName || allottedVendorNames[order.orderId]) && (
            <div className="text-xs text-center mt-2">
              <span className="inline-block px-2 py-1 bg-blue-100 text-blue-800 font-medium rounded-full">
                {allottedVendorNames[order.orderId] || order.allottedVendorName || 'Vendor Assigned'}
              </span>
            </div>
          )}
          
          {/* Vendor Selection Dropdown */}
          {isVendorAllotted && showVendorDropdown[order.orderId] && (
            <div className="relative">
              <div className="mt-2 bg-white border border-gray-200 rounded-xl shadow-lg p-4 z-50 min-w-[220px]">
                <div className="text-sm font-medium text-gray-400 mb-3">vendor name</div>
                <div className="space-y-0">
                  {availableVendors.map((vendor, index) => (
                    <div key={vendor}>
                      <label className="flex items-center justify-between py-2 px-2 hover:bg-gray-50 rounded cursor-pointer">
                        <span className="text-sm font-medium text-gray-900">{vendor}</span>
                        <div className="relative">
                          <input
                            type="radio"
                            name={`vendor-selection-${order.orderId}`}
                            value={vendor}
                            checked={selectedVendorNames[order.orderId] === vendor}
                            onChange={() => handleVendorSelect(vendor)}
                            className="sr-only"
                          />
                          <div className={`w-5 h-5 rounded border-2 flex items-center justify-center ${
                            selectedVendorNames[order.orderId] === vendor 
                              ? 'border-blue-500 bg-blue-50' 
                              : 'border-gray-300 bg-white'
                          }`}>
                            {selectedVendorNames[order.orderId] === vendor && (
                              <Check className="w-3 h-3 text-blue-500" />
                            )}
                          </div>
                        </div>
                      </label>
                      {index < availableVendors.length - 1 && <hr className="border-gray-200" />}
                    </div>
                  ))}
                </div>
                <button
                  onClick={handleVendorConfirm}
                  disabled={!selectedVendorNames[order.orderId]}
                  className={`w-full mt-4 px-4 py-2 rounded-lg text-sm font-medium flex items-center justify-center space-x-2 ${
                    selectedVendorNames[order.orderId]
                      ? 'bg-blue-600 text-white hover:bg-blue-700'
                      : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                  }`}
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                  </svg>
                  <span>confirm</span>
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
ReturnWindowScreen.displayName = 'ReturnWindowScreen';
OrderDetails.displayName = 'OrderDetails';
Orders.displayName = 'Orders';
OrderRow.displayName = 'OrderRow';

export default Orders;
