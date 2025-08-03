import React, { useState, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  Calendar, 
  ChevronDown, 
  Printer, 
  Download, 
  Share2,
  User,
  Package,
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
const OrderDetails = () => {
  const { orderId } = useParams();
  const navigate = useNavigate();
  
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

  const handleBack = useCallback(() => {
    navigate('/orders');
  }, [navigate]);

  return (
    <div className="bg-gray-50 min-h-screen p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-6">
          <button
            onClick={handleBack}
            className="flex items-center space-x-2 text-gray-600 hover:text-gray-800 mb-4"
          >
            <ArrowLeft className="h-4 w-4" />
            <span>Back to Orders</span>
          </button>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Order Details</h1>
        </div>

        {/* Order Details Container */}
        <div className="bg-white rounded-2xl shadow-sm p-6 space-y-6">
          {/* Order Header */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-6">
                <span className="text-gray-800 font-medium">Orders ID: #{orderData.id}</span>
                <div className={`px-3 py-1 rounded-lg text-sm font-semibold ${getStatusColor(orderStatus)}`}>
                  {orderStatus}
                </div>
              </div>
            </div>
            
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Calendar className="h-5 w-5 text-gray-400" />
                <span className="text-gray-900 font-semibold">{orderData.dateRange}</span>
              </div>
              
              <div className="flex items-center space-x-4">
                {/* Status Change Dropdown */}
                <div className="relative">
                  <button
                    onClick={() => setShowStatusDropdown(!showStatusDropdown)}
                    className="bg-gray-100 px-4 py-2 rounded-lg flex items-center justify-between w-48 text-sm font-semibold text-gray-800 hover:bg-gray-200"
                  >
                    <span>Change Status</span>
                    <ChevronDown className="h-4 w-4" />
                  </button>
                  
                  {showStatusDropdown && (
                    <div className="absolute top-full right-0 mt-1 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-1 z-50">
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
                
                {/* Action Buttons */}
                <button
                  onClick={handlePrint}
                  className="bg-gray-100 p-2 rounded-lg hover:bg-gray-200"
                  title="Print Order"
                >
                  <Printer className="h-5 w-5 text-gray-600" />
                </button>
                
                <button
                  onClick={handleDownload}
                  className="bg-gray-100 p-2 rounded-lg hover:bg-gray-200"
                  title="Download Order"
                >
                  <Download className="h-5 w-5 text-gray-600" />
                </button>
                
                <button
                  onClick={handleShare}
                  className="bg-gray-100 p-2 rounded-lg hover:bg-gray-200"
                  title="Share Order"
                >
                  <Share2 className="h-5 w-5 text-gray-600" />
                </button>
                
                <button className="bg-gray-100 px-4 py-2 rounded-lg text-sm font-semibold text-gray-800 hover:bg-gray-200">
                  Save
                </button>
              </div>
            </div>
          </div>

          {/* Main Content Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Customer Info */}
            <div className="bg-white border border-gray-200 rounded-2xl p-6">
              <div className="flex items-start space-x-4 mb-4">
                <div className="bg-gray-900 p-4 rounded-lg">
                  <User className="h-6 w-6 text-white" />
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">Customer</h3>
                  <div className="space-y-2 text-gray-600">
                    <p><span className="font-medium">Full Name:</span> {orderData.customer.name}</p>
                    <p><span className="font-medium">Email:</span> {orderData.customer.email}</p>
                    <p><span className="font-medium">Phone:</span> {orderData.customer.phone}</p>
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
                  <div className="space-y-2 text-gray-600 font-semibold">
                    <p><span className="font-medium">Shipping:</span> {orderData.orderInfo.shipping}</p>
                    <p><span className="font-medium">Payment Method:</span> {orderData.orderInfo.paymentMethod}</p>
                    <p><span className="font-medium">Status:</span> {orderData.orderInfo.status}</p>
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
                  <div className="text-gray-600 font-semibold">
                    <p><span className="font-medium">Address:</span> {orderData.deliveryAddress}</p>
                  </div>
                </div>
              </div>
              <button className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg text-sm font-medium hover:bg-blue-700">
                View profile
              </button>
            </div>
          </div>

          {/* Payment Info and Notes Row */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Payment Info */}
            <div className="bg-white border border-gray-200 rounded-2xl p-4">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Payment info</h3>
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <div className="w-9 h-5 bg-red-500 rounded flex items-center justify-center text-white text-xs font-bold">
                    M
                  </div>
                  <span className="text-gray-700 font-semibold">{orderData.paymentInfo.cardNumber}</span>
                </div>
                <p className="text-gray-700 font-semibold">
                  <span className="font-medium">Business name:</span> {orderData.paymentInfo.businessName}
                </p>
                <p className="text-gray-700 font-semibold">
                  <span className="font-medium">Phone:</span> {orderData.paymentInfo.phone}
                </p>
              </div>
            </div>

            {/* Notes */}
            <div className="space-y-2">
              <h3 className="text-xl font-medium text-gray-900">Note</h3>
              <div className="bg-white border border-gray-200 rounded-2xl p-4 h-32">
                <textarea
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="Type some notes"
                  className="w-full h-full resize-none border-none outline-none text-gray-700"
                />
              </div>
            </div>
          </div>

          {/* Documents Info */}
          <div className="bg-white border border-gray-200 rounded-2xl p-6 w-80">
            <div className="flex items-start space-x-4 mb-4">
              <div className="bg-gray-900 p-4 rounded-lg">
                <FileText className="h-6 w-6 text-white" />
              </div>
              <div className="flex-1">
                <h3 className="text-xl font-bold text-gray-900 mb-2">Documents submitted</h3>
                <div className="text-gray-600 font-semibold">
                  <p className="text-sm text-gray-500 mb-1">Document name</p>
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
          <div className="p-6 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold text-gray-900">Order</h2>
              <div className="flex items-center space-x-2">
                <button
                  onClick={handlePrint}
                  className="bg-gray-100 p-2 rounded-lg hover:bg-gray-200"
                  title="Print"
                >
                  <Printer className="h-5 w-5 text-gray-600" />
                </button>
                <button
                  onClick={handleShare}
                  className="p-2 hover:bg-gray-100 rounded"
                  title="Share"
                >
                  <Share2 className="h-5 w-5 text-gray-600" />
                </button>
                <button
                  onClick={handleDownload}
                  className="p-2 hover:bg-gray-100 rounded"
                  title="Download"
                >
                  <Download className="h-5 w-5 text-gray-600" />
                </button>
              </div>
            </div>
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Image</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Order ID</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Customer Name</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Size</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Quantity</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">SKU</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Barcode No.</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Sale Price</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {orderData.items.map((item, index) => (
                  <tr key={index} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="w-16 h-20 bg-gray-200 rounded overflow-hidden">
                        <img 
                          src={item.image} 
                          alt="Product" 
                          className="w-full h-full object-cover"
                        />
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="text-blue-600 underline font-medium">{item.id}</span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-gray-900 font-medium">{item.date}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-gray-900 font-medium">{item.customerName}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-gray-900 font-medium">{item.size}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-gray-900 font-medium">{item.quantity}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-gray-900 font-medium">{item.sku}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-gray-900 font-medium">{item.barcode}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-gray-900 font-medium">₹{item.price}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-gray-900 font-medium">₹{item.salePrice}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Order Summary */}
          <div className="p-6 border-t border-gray-200">
            <div className="flex justify-end">
              <div className="w-64 space-y-2">
                <div className="flex justify-between text-gray-600 font-bold">
                  <span>Sub Total</span>
                  <span>₹{orderData.summary.subTotal}</span>
                </div>
                <div className="flex justify-between text-gray-600 font-bold">
                  <span>Shipping Rate</span>
                  <span>₹{orderData.summary.shippingRate}</span>
                </div>
                <div className="flex justify-between text-gray-600 font-bold">
                  <span>Promo</span>
                  <span>₹{orderData.summary.promo}</span>
                </div>
                <div className="flex justify-between text-gray-600 font-bold">
                  <span>Points</span>
                  <span>₹{orderData.summary.points}</span>
                </div>
                <div className="flex justify-between text-gray-900 font-bold text-lg border-t pt-2">
                  <span>Total</span>
                  <span>₹{orderData.summary.total}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderDetails;
