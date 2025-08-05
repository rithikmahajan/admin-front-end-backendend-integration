import React, { useState, useCallback, useMemo } from 'react';
import {
  Search,
  Filter,
  Eye,
  Edit,
  Trash2,
  Download,
  User,
  Phone,
  Mail,
  MapPin,
  Calendar,
  ShoppingBag,
  Package,
  Star,
  Lock,
  Unlock,
  Image,
  FileText,
  BarCode,
  DollarSign,
  ChevronRight,
  ChevronDown,
  X,
  Check,
  Camera,
  CreditCard,
  RefreshCw
} from 'lucide-react';
import DocumentPreviewModal from '../components/DocumentPreviewModal';
import SizeChartModal from '../components/SizeChartModal';

// Mock data - replace with actual API calls
const generateMockUserData = () => [
  {
    id: 1,
    name: "John Doe",
    email: "john.doe@email.com",
    phone: "+91 9876543210",
    countryCode: "+91",
    phoneNumber: "9876543210",
    dateOfBirth: "1990-05-15",
    address: {
      street: "123 Main Street",
      city: "Mumbai",
      state: "Maharashtra",
      pincode: "400001",
      country: "India"
    },
    deleteAccount: false,
    username: "johndoe90",
    appReviews: {
      rating: 4.5,
      totalReviews: 12,
      lastReview: "2024-12-15"
    },
    gender: "male",
    password: "••••••••",
    twoFactorEnabled: true,
    pointBalance: 2500
  },
  {
    id: 2,
    name: "Jane Smith",
    email: "jane.smith@email.com",
    phone: "+1 5551234567",
    countryCode: "+1",
    phoneNumber: "5551234567",
    dateOfBirth: "1988-08-22",
    address: {
      street: "456 Oak Avenue",
      city: "New York",
      state: "NY",
      pincode: "10001",
      country: "USA"
    },
    deleteAccount: false,
    username: "janesmith88",
    appReviews: {
      rating: 5.0,
      totalReviews: 8,
      lastReview: "2024-12-10"
    },
    gender: "female",
    password: "••••••••",
    twoFactorEnabled: false,
    pointBalance: 1750
  }
];

const generateMockOrderData = () => [
  {
    id: "ORD001",
    orderId: "ORD001",
    email: "john.doe@email.com",
    name: "John Doe",
    phone: "+91 9876543210",
    address: {
      street: "123 Main Street",
      city: "Mumbai",
      state: "Maharashtra",
      pincode: "400001",
      country: "India"
    },
    sku: "men/tshirt/insomniac-tshirt/2025/09/28/12345678",
    barcode: "12345678901234",
    prices: {
      amazon: 999,
      flipkart: 1099,
      website: 899,
      myntra: 1149
    },
    hsnCode: "12345678",
    documents: [
      { id: 1, type: "invoice", name: "invoice_001.pdf", preview: "/api/docs/preview/1", size: "2.3 MB", modified: "2024-12-15" },
      { id: 2, type: "receipt", name: "receipt_001.jpg", preview: "/api/docs/preview/2", size: "1.1 MB", modified: "2024-12-15" }
    ],
    paymentStatus: "completed",
    invoiceDetails: {
      invoiceNumber: "INV-2024-001",
      date: "2024-12-15",
      amount: 899,
      tax: 161.82,
      total: 1060.82
    }
  }
];

const generateMockProductData = () => [
  {
    id: "PROD001",
    name: "Insomniac T-Shirt",
    category: "men",
    subCategory: "tshirt",
    variants: [
      {
        id: "VAR001",
        color: "red",
        size: "M",
        image: "/api/products/images/red-tshirt.jpg",
        price: 899,
        stock: 45
      },
      {
        id: "VAR002",
        color: "blue",
        size: "L",
        image: "/api/products/images/blue-tshirt.jpg",
        price: 899,
        stock: 32
      },
      {
        id: "VAR003",
        color: "pink",
        size: "S",
        image: "/api/products/images/pink-tshirt.jpg",
        price: 899,
        stock: 28
      },
      {
        id: "VAR004",
        color: "orange",
        size: "XL",
        image: "/api/products/images/orange-tshirt.jpg",
        price: 899,
        stock: 15
      }
    ],
    status: "active",
    returnable: true,
    description: "Premium quality cotton t-shirt with comfortable fit and durable fabric.",
    manufacturingDetails: {
      material: "100% Cotton",
      origin: "India",
      manufacturer: "Adidas India Pvt Ltd",
      certifications: ["GOTS", "OEKO-TEX"]
    },
    shipping: {
      returns: "30 days return policy",
      exchange: "Size exchange available within 15 days",
      shipping: "Free shipping on orders above ₹499"
    },
    sizeCharts: [
      { id: 1, type: "inch", name: "size_chart_inch.jpg", url: "/api/charts/inch/1" },
      { id: 2, type: "cm", name: "size_chart_cm.jpg", url: "/api/charts/cm/2" },
      { id: 3, type: "measurement", name: "measurement_guide.jpg", url: "/api/charts/guide/3" }
    ]
  }
];

// Component for User Data View
const UserDataView = ({ data, onEdit, onDelete, onViewPassword }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedUser, setSelectedUser] = useState(null);
  const [showPasswordModal, setShowPasswordModal] = useState(false);

  const filteredData = useMemo(() => {
    if (!data || data.length === 0) {
      return [];
    }
    return data.filter(user => 
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.username.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [data, searchTerm]);

  const handleViewPassword = useCallback((user) => {
    if (user.twoFactorEnabled) {
      setSelectedUser(user);
      setShowPasswordModal(true);
    } else {
      onViewPassword(user);
    }
  }, [onViewPassword]);

  return (
    <div className="space-y-6">
      {/* Search and Filters */}
      <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <input
            type="text"
            placeholder="Search users..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
        <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
          <Filter className="w-4 h-4" />
          Filters
        </button>
      </div>

      {/* User Cards */}
      <div className="grid gap-6">
        {filteredData.length === 0 ? (
          <div className="bg-white rounded-lg shadow-md border border-gray-200 p-8 text-center">
            <User className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-600 mb-2">No Users Found</h3>
            <p className="text-gray-500">
              {searchTerm ? 'No users match your search criteria.' : 'No user data available.'}
            </p>
          </div>
        ) : (
          filteredData.map((user) => (
          <div key={user.id} className="bg-white rounded-lg shadow-md border border-gray-200 p-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Personal Information */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-900 border-b pb-2">Personal Information</h3>
                
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <User className="w-4 h-4 text-gray-500" />
                    <div>
                      <p className="text-sm text-gray-500">Name</p>
                      <p className="font-medium">{user.name}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3">
                    <Mail className="w-4 h-4 text-gray-500" />
                    <div>
                      <p className="text-sm text-gray-500">Email</p>
                      <p className="font-medium">{user.email}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3">
                    <Phone className="w-4 h-4 text-gray-500" />
                    <div>
                      <p className="text-sm text-gray-500">Phone</p>
                      <p className="font-medium">{user.phone}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3">
                    <Calendar className="w-4 h-4 text-gray-500" />
                    <div>
                      <p className="text-sm text-gray-500">Date of Birth</p>
                      <p className="font-medium">{new Date(user.dateOfBirth).toLocaleDateString()}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Address and Account Info */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-900 border-b pb-2">Address & Account</h3>
                
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <MapPin className="w-4 h-4 text-gray-500 mt-1" />
                    <div>
                      <p className="text-sm text-gray-500">Address</p>
                      <p className="font-medium">
                        {user.address.street}, {user.address.city}<br />
                        {user.address.state} - {user.address.pincode}<br />
                        {user.address.country}
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3">
                    <div className="w-4 h-4 flex items-center justify-center">
                      <span className="text-gray-500">@</span>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Username</p>
                      <p className="font-medium">{user.username}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3">
                    <div className="w-4 h-4 flex items-center justify-center">
                      <span className="text-gray-500">♂♀</span>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Gender</p>
                      <p className="font-medium capitalize">{user.gender}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Reviews, Points and Security */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-900 border-b pb-2">Reviews & Security</h3>
                
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <Star className="w-4 h-4 text-yellow-500" />
                    <div>
                      <p className="text-sm text-gray-500">App Reviews</p>
                      <p className="font-medium">{user.appReviews.rating}/5 ({user.appReviews.totalReviews} reviews)</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3">
                    <DollarSign className="w-4 h-4 text-green-500" />
                    <div>
                      <p className="text-sm text-gray-500">Point Balance</p>
                      <p className="font-medium">{user.pointBalance.toLocaleString()} points</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3">
                    <Lock className="w-4 h-4 text-gray-500" />
                    <div>
                      <p className="text-sm text-gray-500">Password</p>
                      <div className="flex items-center gap-2">
                        <span className="font-medium">{user.password}</span>
                        <button
                          onClick={() => handleViewPassword(user)}
                          className="p-1 text-blue-600 hover:text-blue-800"
                          title="View Password"
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3">
                    <div className={`w-3 h-3 rounded-full ${user.deleteAccount ? 'bg-red-500' : 'bg-green-500'}`}></div>
                    <div>
                      <p className="text-sm text-gray-500">Account Status</p>
                      <p className="font-medium">{user.deleteAccount ? 'Marked for Deletion' : 'Active'}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="flex justify-end gap-2 mt-6 pt-4 border-t">
              <button
                onClick={() => onEdit(user)}
                className="flex items-center gap-2 px-3 py-2 text-blue-600 border border-blue-600 rounded-lg hover:bg-blue-50 transition-colors"
              >
                <Edit className="w-4 h-4" />
                Edit
              </button>
              <button
                onClick={() => onDelete(user)}
                className="flex items-center gap-2 px-3 py-2 text-red-600 border border-red-600 rounded-lg hover:bg-red-50 transition-colors"
              >
                <Trash2 className="w-4 h-4" />
                Delete
              </button>
            </div>
          </div>
          ))
        )}
      </div>

      {/* Two Factor Authentication Modal */}
      {showPasswordModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-md w-full p-6">
            <h3 className="text-lg font-semibold mb-4">Two Factor Authentication Required</h3>
            <p className="text-gray-600 mb-6">
              This user has two-factor authentication enabled. Please verify your identity to view the password.
            </p>
            <div className="flex justify-end gap-3">
              <button
                onClick={() => setShowPasswordModal(false)}
                className="px-4 py-2 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  onViewPassword(selectedUser);
                  setShowPasswordModal(false);
                }}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                Verify & View
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// Component for Order Data View
const OrderDataView = ({ data, onViewOrder, onViewInvoice }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDocument, setSelectedDocument] = useState(null);

  const filteredData = useMemo(() => {
    return data.filter(order => 
      order.orderId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [data, searchTerm]);

  const DocumentPreviewModal = ({ document, onClose }) => (
    <DocumentPreviewModal
      documents={[document]}
      initialDocumentIndex={0}
      onClose={onClose}
    />
  );

  return (
    <div className="space-y-6">
      {/* Search */}
      <div className="relative max-w-md">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
        <input
          type="text"
          placeholder="Search orders..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
      </div>

      {/* Order Cards */}
      <div className="grid gap-6">
        {filteredData.length === 0 ? (
          <div className="bg-white rounded-lg shadow-md border border-gray-200 p-8 text-center">
            <ShoppingBag className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-600 mb-2">No Orders Found</h3>
            <p className="text-gray-500">
              {searchTerm ? 'No orders match your search criteria.' : 'No order data available.'}
            </p>
          </div>
        ) : (
          filteredData.map((order) => (
          <div key={order.id} className="bg-white rounded-lg shadow-md border border-gray-200 p-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Order Information */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-900 border-b pb-2">Order Information</h3>
                
                <div className="space-y-3">
                  <div>
                    <p className="text-sm text-gray-500">Order ID</p>
                    <button
                      onClick={() => onViewOrder(order)}
                      className="font-medium text-blue-600 hover:text-blue-800 underline"
                    >
                      {order.orderId}
                    </button>
                  </div>
                  
                  <div>
                    <p className="text-sm text-gray-500">Customer</p>
                    <p className="font-medium">{order.name}</p>
                    <p className="text-sm text-gray-600">{order.email}</p>
                    <p className="text-sm text-gray-600">{order.phone}</p>
                  </div>
                  
                  <div>
                    <p className="text-sm text-gray-500">Address</p>
                    <p className="text-sm">
                      {order.address.street}, {order.address.city}<br />
                      {order.address.state} - {order.address.pincode}
                    </p>
                  </div>
                </div>
              </div>

              {/* Product and Pricing */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-900 border-b pb-2">Product Details</h3>
                
                <div className="space-y-3">
                  <div>
                    <p className="text-sm text-gray-500">SKU</p>
                    <p className="font-mono text-sm bg-gray-100 p-2 rounded">{order.sku}</p>
                  </div>
                  
                  <div>
                    <p className="text-sm text-gray-500">Barcode</p>
                    <div className="flex items-center gap-2">
                      <BarCode className="w-4 h-4 text-gray-500" />
                      <p className="font-mono text-sm">{order.barcode}</p>
                    </div>
                  </div>
                  
                  <div>
                    <p className="text-sm text-gray-500">Platform Prices</p>
                    <div className="grid grid-cols-2 gap-2 text-sm">
                      <div>Amazon: ₹{order.prices.amazon}</div>
                      <div>Flipkart: ₹{order.prices.flipkart}</div>
                      <div>Website: ₹{order.prices.website}</div>
                      <div>Myntra: ₹{order.prices.myntra}</div>
                    </div>
                  </div>
                  
                  <div>
                    <p className="text-sm text-gray-500">HSN Code</p>
                    <p className="font-mono text-sm">{order.hsnCode}</p>
                  </div>
                </div>
              </div>

              {/* Documents and Payment */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-900 border-b pb-2">Documents & Payment</h3>
                
                <div className="space-y-3">
                  <div>
                    <p className="text-sm text-gray-500">Documents</p>
                    <div className="space-y-2">
                      {order.documents.map((doc) => (
                        <div key={doc.id} className="flex items-center justify-between bg-gray-50 p-2 rounded">
                          <span className="text-sm font-medium">{doc.name}</span>
                          <button
                            onClick={() => setSelectedDocument(doc)}
                            className="text-blue-600 hover:text-blue-800"
                          >
                            <Eye className="w-4 h-4" />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div>
                    <p className="text-sm text-gray-500">Payment Status</p>
                    <div className="flex items-center gap-2">
                      <div className={`w-3 h-3 rounded-full ${
                        order.paymentStatus === 'completed' ? 'bg-green-500' : 
                        order.paymentStatus === 'pending' ? 'bg-yellow-500' : 'bg-red-500'
                      }`}></div>
                      <span className="capitalize font-medium">{order.paymentStatus}</span>
                    </div>
                  </div>
                  
                  <div>
                    <p className="text-sm text-gray-500">Invoice</p>
                    <button
                      onClick={() => onViewInvoice(order.invoiceDetails)}
                      className="text-blue-600 hover:text-blue-800 underline text-sm"
                    >
                      View Invoice ({order.invoiceDetails.invoiceNumber})
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          ))
        )}
      </div>

      {/* Document Preview Modal */}
      {selectedDocument && (
        <DocumentPreviewModal
          documents={[selectedDocument]}
          initialDocumentIndex={0}
          onClose={() => setSelectedDocument(null)}
        />
      )}
    </div>
  );
};

// Component for Product Data View
const ProductDataView = ({ data, onEdit, onDelete, onViewSizeChart }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [selectedSizeChart, setSelectedSizeChart] = useState(null);

  const filteredData = useMemo(() => {
    return data.filter(product => 
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.category.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [data, searchTerm]);

  const handleViewSizeChart = useCallback((charts) => {
    setSelectedSizeChart(charts);
  }, []);

  return (
    <div className="space-y-6">
      {/* Search */}
      <div className="relative max-w-md">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
        <input
          type="text"
          placeholder="Search products..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
      </div>

      {/* Product Cards */}
      <div className="grid gap-6">
        {filteredData.length === 0 ? (
          <div className="bg-white rounded-lg shadow-md border border-gray-200 p-8 text-center">
            <Package className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-600 mb-2">No Products Found</h3>
            <p className="text-gray-500">
              {searchTerm ? 'No products match your search criteria.' : 'No product data available.'}
            </p>
          </div>
        ) : (
          filteredData.map((product) => (
          <div key={product.id} className="bg-white rounded-lg shadow-md border border-gray-200 p-6">
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
              {/* Product Image */}
              <div className="space-y-4">
                <div className="aspect-square bg-gray-100 rounded-lg flex items-center justify-center">
                  <Package className="w-16 h-16 text-gray-400" />
                </div>
                <div className="text-center">
                  <h3 className="font-semibold text-lg">{product.name}</h3>
                  <p className="text-gray-600 capitalize">{product.category} / {product.subCategory}</p>
                </div>
              </div>

              {/* Variants */}
              <div className="space-y-4">
                <h4 className="font-semibold border-b pb-2">Variants</h4>
                <div className="space-y-3 max-h-64 overflow-y-auto">
                  {product.variants.map((variant) => (
                    <div key={variant.id} className="border rounded-lg p-3">
                      <div className="flex items-center gap-3 mb-2">
                        <div 
                          className="w-6 h-6 rounded-full border"
                          style={{ backgroundColor: variant.color }}
                          title={variant.color}
                        ></div>
                        <span className="font-medium">{variant.size}</span>
                        <span className="text-green-600 font-semibold">₹{variant.price}</span>
                      </div>
                      <div className="text-sm text-gray-600">
                        Stock: {variant.stock} units
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Product Details */}
              <div className="space-y-4">
                <h4 className="font-semibold border-b pb-2">Product Details</h4>
                
                <div className="space-y-3">
                  <div>
                    <p className="text-sm text-gray-500">Status</p>
                    <div className="flex items-center gap-2">
                      <div className={`w-3 h-3 rounded-full ${
                        product.status === 'active' ? 'bg-green-500' : 'bg-red-500'
                      }`}></div>
                      <span className="capitalize font-medium">{product.status}</span>
                    </div>
                  </div>
                  
                  <div>
                    <p className="text-sm text-gray-500">Returnable</p>
                    <p className="font-medium">{product.returnable ? 'Yes' : 'No'}</p>
                  </div>
                  
                  <div>
                    <p className="text-sm text-gray-500">Description</p>
                    <p className="text-sm text-gray-700 line-clamp-3">{product.description}</p>
                  </div>
                  
                  <div>
                    <p className="text-sm text-gray-500">Manufacturing</p>
                    <div className="text-sm text-gray-700">
                      <p>Material: {product.manufacturingDetails.material}</p>
                      <p>Origin: {product.manufacturingDetails.origin}</p>
                      <p>Manufacturer: {product.manufacturingDetails.manufacturer}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Actions and Size Charts */}
              <div className="space-y-4">
                <h4 className="font-semibold border-b pb-2">Actions</h4>
                
                <div className="space-y-3">
                  <button
                    onClick={() => setSelectedSizeChart(product.sizeCharts)}
                    className="w-full flex items-center gap-2 px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    <Image className="w-4 h-4" />
                    View Size Charts
                  </button>
                  
                  <button
                    onClick={() => onEdit(product)}
                    className="w-full flex items-center gap-2 px-3 py-2 text-blue-600 border border-blue-600 rounded-lg hover:bg-blue-50 transition-colors"
                  >
                    <Edit className="w-4 h-4" />
                    Edit Product
                  </button>
                  
                  <button
                    onClick={() => onDelete(product)}
                    className="w-full flex items-center gap-2 px-3 py-2 text-red-600 border border-red-600 rounded-lg hover:bg-red-50 transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                    Delete Product
                  </button>
                </div>

                <div className="pt-4 border-t">
                  <p className="text-sm text-gray-500 mb-2">Shipping & Returns</p>
                  <div className="text-xs text-gray-600 space-y-1">
                    <p>{product.shipping.returns}</p>
                    <p>{product.shipping.exchange}</p>
                    <p>{product.shipping.shipping}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          ))
        )}
      </div>

      {/* Size Chart Modal */}
      {selectedSizeChart && (
        <SizeChartModal
          charts={selectedSizeChart}
          onClose={() => setSelectedSizeChart(null)}
        />
      )}
    </div>
  );
};

// Main Database Dashboard Component
const DatabaseDashboard = () => {
  const [activeView, setActiveView] = useState('users');
  const [userData] = useState(generateMockUserData());
  const [orderData] = useState(generateMockOrderData());
  const [productData] = useState(generateMockProductData());

  // Handlers for user actions
  const handleEditUser = useCallback((user) => {
    console.log('Edit user:', user);
    // Implement edit functionality
  }, []);

  const handleDeleteUser = useCallback((user) => {
    console.log('Delete user:', user);
    // Implement delete functionality
  }, []);

  const handleViewPassword = useCallback((user) => {
    console.log('View password for user:', user);
    // Implement password viewing with 2FA
  }, []);

  const handleViewOrder = useCallback((order) => {
    console.log('View order details:', order);
    // Navigate to order details view
  }, []);

  const handleViewInvoice = useCallback((invoice) => {
    console.log('View invoice:', invoice);
    // Open invoice modal or navigate to invoice view
  }, []);

  const handleEditProduct = useCallback((product) => {
    console.log('Edit product:', product);
    // Navigate to product edit form
  }, []);

  const handleDeleteProduct = useCallback((product) => {
    console.log('Delete product:', product);
    // Implement product deletion
  }, []);

  const handleViewSizeChart = useCallback((charts) => {
    console.log('View size charts:', charts);
    // Open size chart modal
  }, []);

  const views = [
    { id: 'users', label: 'User Data', icon: User, count: userData.length },
    { id: 'orders', label: 'Order Data', icon: ShoppingBag, count: orderData.length },
    { id: 'products', label: 'Product Data', icon: Package, count: productData.length }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <h1 className="text-2xl font-bold text-gray-900">Database Dashboard</h1>
            <div className="flex items-center gap-4">
              <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                <Download className="w-4 h-4" />
                Export Data
              </button>
              <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                <RefreshCw className="w-4 h-4" />
                Refresh
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex space-x-8">
            {views.map((view) => {
              const IconComponent = view.icon;
              return (
                <button
                  key={view.id}
                  onClick={() => setActiveView(view.id)}
                  className={`flex items-center gap-2 py-4 px-2 border-b-2 font-medium text-sm transition-colors ${
                    activeView === view.id
                      ? 'border-blue-500 text-blue-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  <IconComponent className="w-5 h-5" />
                  {view.label}
                  <span className="bg-gray-100 text-gray-600 px-2 py-1 rounded-full text-xs">
                    {view.count}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {activeView === 'users' && (
          <UserDataView
            data={userData}
            onEdit={handleEditUser}
            onDelete={handleDeleteUser}
            onViewPassword={handleViewPassword}
          />
        )}
        
        {activeView === 'orders' && (
          <OrderDataView
            data={orderData}
            onViewOrder={handleViewOrder}
            onViewInvoice={handleViewInvoice}
          />
        )}
        
        {activeView === 'products' && (
          <ProductDataView
            data={productData}
            onEdit={handleEditProduct}
            onDelete={handleDeleteProduct}
            onViewSizeChart={handleViewSizeChart}
          />
        )}
      </div>
    </div>
  );
};

export default DatabaseDashboard;
