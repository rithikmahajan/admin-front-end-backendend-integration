import React, { useState, useCallback, useMemo } from 'react';
import TwoFactorAuth from '../components/TwoFactorAuth';

// Enhanced Database Dashboard based on Figma designs
const DatabaseDashboard = () => {
  const [activeTab, setActiveTab] = useState('users');
  const [searchTerm, setSearchTerm] = useState('');
  const [showPassword, setShowPassword] = useState({});
  const [documentPreview, setDocumentPreview] = useState(null);
  const [sizeChartPreview, setSizeChartPreview] = useState(null);
  
  // 2FA states for password viewing
  const [show2FAModal, setShow2FAModal] = useState(false);
  const [pending2FAUserId, setPending2FAUserId] = useState(null);
  const [show2FASuccess, setShow2FASuccess] = useState(false);
  const [authenticated2FAUsers, setAuthenticated2FAUsers] = useState(new Set());
  
  // Filter states
  const [filters, setFilters] = useState({
    users: {
      gender: 'all',
      accountStatus: 'all',
      pointRange: 'all',
      dateRange: 'all'
    },
    orders: {
      deliveryStatus: 'all',
      paymentStatus: 'all',
      dateRange: 'all',
      priceRange: 'all'
    },
    products: {
      status: 'all',
      brand: 'all',
      category: 'all',
      stockLevel: 'all'
    }
  });

  // Mock data for User Data View (View 1) - Based on Figma Design
  const mockUsers = [
    {
      id: 1,
      name: "Rajesh Kumar Sharma",
      email: "rajesh.sharma@gmail.com",
      phone: {
        countryCode: "+91",
        number: "9876543210"
      },
      dateOfBirth: "15/06/1995", // DD/MM/YYYY format
      address: {
        street: "123, MG Road, Sector 15",
        city: "Mumbai",
        state: "Maharashtra",
        pincode: "400001",
        landmark: "Near Metro Station"
      },
      deleteAccount: false,
      username: "rajesh_kumar_95",
      appReviews: {
        rating: 4.5,
        reviewCount: 23,
        lastReviewDate: "2025-07-20"
      },
      gender: "male",
      password: "R@j3sh#Secure2025!",
      pointBalance: 1250,
      accountCreated: "2023-01-15",
      lastLogin: "2025-08-05"
    },
    {
      id: 2,
      name: "Priya Patel Singh",
      email: "priya.singh@hotmail.com",
      phone: {
        countryCode: "+91",
        number: "8765432109"
      },
      dateOfBirth: "22/03/1990",
      address: {
        street: "456, Park Avenue, Block B",
        city: "Delhi",
        state: "Delhi",
        pincode: "110001",
        landmark: "Opposite City Mall"
      },
      deleteAccount: false,
      username: "priya_fashion_lover",
      appReviews: {
        rating: 4.8,
        reviewCount: 45,
        lastReviewDate: "2025-08-01"
      },
      gender: "female",
      password: "Pr!ya@Delhi2024#",
      pointBalance: 2750,
      accountCreated: "2022-11-08",
      lastLogin: "2025-08-06"
    },
    {
      id: 3,
      name: "Mohammed Ali Khan",
      email: "ali.khan@yahoo.com",
      phone: {
        countryCode: "+971",
        number: "501234567"
      },
      dateOfBirth: "10/12/1988",
      address: {
        street: "789, Business Bay Tower 3",
        city: "Dubai",
        state: "Dubai",
        pincode: "00000",
        landmark: "Business Bay Metro"
      },
      deleteAccount: true,
      username: "ali_dubai_shopper",
      appReviews: {
        rating: 3.9,
        reviewCount: 12,
        lastReviewDate: "2025-06-15"
      },
      gender: "male",
      password: "Ali@Dubai123!",
      pointBalance: 580,
      accountCreated: "2024-03-22",
      lastLogin: "2025-07-10"
    },
    {
      id: 4,
      name: "Sarah Johnson Williams",
      email: "sarah.williams@outlook.com",
      phone: {
        countryCode: "+1",
        number: "5551234567"
      },
      dateOfBirth: "28/09/1992",
      address: {
        street: "321, Broadway Street, Apt 4B",
        city: "New York",
        state: "New York",
        pincode: "10001",
        landmark: "Times Square Area"
      },
      deleteAccount: false,
      username: "sarah_ny_fashion",
      appReviews: {
        rating: 4.9,
        reviewCount: 67,
        lastReviewDate: "2025-08-04"
      },
      gender: "female",
      password: "S@rah#NYC2025!",
      pointBalance: 3420,
      accountCreated: "2023-05-14",
      lastLogin: "2025-08-06"
    }
  ];

  // Mock data for Order Data View (View 2) - Based on Figma Design
  const mockOrders = [
    {
      id: "ORD001",
      orderId: "ORD2025001",
      email: "rajesh.sharma@gmail.com",
      name: "Rajesh Kumar Sharma",
      phone: {
        countryCode: "+91",
        number: "9876543210"
      },
      address: {
        street: "123, MG Road, Sector 15",
        city: "Mumbai",
        state: "Maharashtra",
        pincode: "400001",
        landmark: "Near Metro Station"
      },
      sku: "men/tshirt/insomniac tshirt/2025/07/28/12345678",
      barcode: "12345678901234",
      prices: {
        website: 899,
        app: 849,
        wholesale: 699,
        marketplace: 920
      },
      hsnCode: "61091000",
      documents: [
        { 
          type: "invoice", 
          name: "invoice_001.pdf", 
          url: "/docs/invoice_001.pdf",
          sides: "single",
          uploadDate: "2025-07-28"
        },
        { 
          type: "receipt", 
          name: "receipt_001_front.jpg", 
          url: "/docs/receipt_001_front.jpg",
          sides: "front",
          uploadDate: "2025-07-28"
        },
        { 
          type: "receipt", 
          name: "receipt_001_back.jpg", 
          url: "/docs/receipt_001_back.jpg",
          sides: "back",
          uploadDate: "2025-07-28"
        }
      ],
      paymentStatus: "completed",
      invoiceDetails: {
        invoiceNo: "INV2025001",
        amount: 849,
        date: "2025-07-28",
        taxAmount: 127.35,
        totalAmount: 976.35
      },
      orderDate: "2025-07-28",
      deliveryStatus: "delivered"
    },
    {
      id: "ORD002",
      orderId: "ORD2025002",
      email: "priya.singh@hotmail.com",
      name: "Priya Patel Singh",
      phone: {
        countryCode: "+91",
        number: "8765432109"
      },
      address: {
        street: "456, Park Avenue, Block B",
        city: "Delhi",
        state: "Delhi",
        pincode: "110001",
        landmark: "Opposite City Mall"
      },
      sku: "women/dress/summer floral dress/2025/08/01/87654321",
      barcode: "87654321098765",
      prices: {
        website: 1299,
        app: 1199,
        wholesale: 899,
        marketplace: 1350
      },
      hsnCode: "62043200",
      documents: [
        { 
          type: "invoice", 
          name: "invoice_002.pdf", 
          url: "/docs/invoice_002.pdf",
          sides: "single",
          uploadDate: "2025-08-01"
        },
        { 
          type: "warranty", 
          name: "warranty_card.jpg", 
          url: "/docs/warranty_card.jpg",
          sides: "single",
          uploadDate: "2025-08-01"
        }
      ],
      paymentStatus: "pending",
      invoiceDetails: {
        invoiceNo: "INV2025002",
        amount: 1199,
        date: "2025-08-01",
        taxAmount: 179.85,
        totalAmount: 1378.85
      },
      orderDate: "2025-08-01",
      deliveryStatus: "processing"
    },
    {
      id: "ORD003",
      orderId: "ORD2025003",
      email: "sarah.williams@outlook.com",
      name: "Sarah Johnson Williams",
      phone: {
        countryCode: "+1",
        number: "5551234567"
      },
      address: {
        street: "321, Broadway Street, Apt 4B",
        city: "New York",
        state: "New York",
        pincode: "10001",
        landmark: "Times Square Area"
      },
      sku: "women/jeans/skinny blue jeans/2025/08/03/11223344",
      barcode: "11223344556677",
      prices: {
        website: 2499,
        app: 2299,
        wholesale: 1799,
        marketplace: 2650
      },
      hsnCode: "62034200",
      documents: [
        { 
          type: "invoice", 
          name: "invoice_003.pdf", 
          url: "/docs/invoice_003.pdf",
          sides: "single",
          uploadDate: "2025-08-03"
        },
        { 
          type: "customs", 
          name: "customs_declaration_front.jpg", 
          url: "/docs/customs_front.jpg",
          sides: "front",
          uploadDate: "2025-08-03"
        },
        { 
          type: "customs", 
          name: "customs_declaration_back.jpg", 
          url: "/docs/customs_back.jpg",
          sides: "back",
          uploadDate: "2025-08-03"
        }
      ],
      paymentStatus: "completed",
      invoiceDetails: {
        invoiceNo: "INV2025003",
        amount: 2299,
        date: "2025-08-03",
        taxAmount: 344.85,
        totalAmount: 2643.85
      },
      orderDate: "2025-08-03",
      deliveryStatus: "shipped"
    }
  ];

  // Mock data for Product Data View (View 3) - Based on Figma Design
  const mockProducts = [
    {
      id: 1,
      image: "/products/adidas_tshirt_variants.jpg",
      article: "Adidas Classic Performance T-Shirt",
      variants: [
        { color: "red", size: "S", sku: "ADI-TSH-RED-S-001", stock: 45 },
        { color: "blue", size: "M", sku: "ADI-TSH-BLU-M-002", stock: 32 },
        { color: "pink", size: "L", sku: "ADI-TSH-PNK-L-003", stock: 28 },
        { color: "orange", size: "XL", sku: "ADI-TSH-ORG-XL-004", stock: 15 },
        { color: "red", size: "M", sku: "ADI-TSH-RED-M-005", stock: 52 },
        { color: "blue", size: "L", sku: "ADI-TSH-BLU-L-006", stock: 38 },
        { color: "pink", size: "S", sku: "ADI-TSH-PNK-S-007", stock: 41 },
        { color: "orange", size: "M", sku: "ADI-TSH-ORG-M-008", stock: 29 }
      ],
      status: "returnable",
      description: "Premium cotton blend performance t-shirt with moisture-wicking technology. Features the iconic Adidas three stripes design with a comfortable athletic fit. Perfect for workouts, casual wear, and active lifestyle.",
      manufacturingDetails: "Made in India, 100% Premium Cotton with moisture-wicking finish. Manufactured at Adidas certified facility in Tamil Nadu. Quality tested for durability and colorfastness.",
      shippingReturns: "Free shipping on orders above ₹499. 7-day easy return policy. Exchange available within 14 days. International shipping available to 50+ countries.",
      sizeCharts: [
        { type: "men", url: "/charts/men_tshirt_adidas.jpg", name: "Men's T-Shirt Size Chart" },
        { type: "women", url: "/charts/women_tshirt_adidas.jpg", name: "Women's T-Shirt Size Chart" },
        { type: "kids", url: "/charts/kids_tshirt_adidas.jpg", name: "Kids T-Shirt Size Chart" }
      ],
      category: "men/tshirt",
      brand: "Adidas",
      launchDate: "2025-06-15",
      rating: 4.6,
      reviewCount: 234
    },
    {
      id: 2,
      image: "/products/nike_running_shoes.jpg",
      article: "Nike Air Max Revolution Running Shoes",
      variants: [
        { color: "black", size: "7", sku: "NIKE-AIR-BLK-7-001", stock: 23 },
        { color: "white", size: "8", sku: "NIKE-AIR-WHT-8-002", stock: 18 },
        { color: "grey", size: "9", sku: "NIKE-AIR-GRY-9-003", stock: 31 },
        { color: "blue", size: "10", sku: "NIKE-AIR-BLU-10-004", stock: 12 },
        { color: "black", size: "8", sku: "NIKE-AIR-BLK-8-005", stock: 27 },
        { color: "white", size: "9", sku: "NIKE-AIR-WHT-9-006", stock: 35 }
      ],
      status: "non-returnable",
      description: "Revolutionary running shoes with Nike Air Max technology for superior comfort and performance. Featuring lightweight mesh upper, responsive cushioning, and durable rubber outsole for all-terrain running.",
      manufacturingDetails: "Manufactured in Vietnam using Nike's sustainable manufacturing process. Made with 20% recycled materials. Quality certified by Nike Global Standards.",
      shippingReturns: "Free shipping on orders above ₹999. Non-returnable due to hygiene reasons. Exchange available only for manufacturing defects within 48 hours of delivery.",
      sizeCharts: [
        { type: "men", url: "/charts/men_shoes_nike.jpg", name: "Men's Shoe Size Chart" },
        { type: "women", url: "/charts/women_shoes_nike.jpg", name: "Women's Shoe Size Chart" },
        { type: "kids", url: "/charts/kids_shoes_nike.jpg", name: "Kids Shoe Size Chart" }
      ],
      category: "men/shoes",
      brand: "Nike",
      launchDate: "2025-07-01",
      rating: 4.8,
      reviewCount: 456
    },
    {
      id: 3,
      image: "/products/zara_summer_dress.jpg",
      article: "Zara Floral Summer Midi Dress",
      variants: [
        { color: "floral-pink", size: "XS", sku: "ZARA-DRS-FLP-XS-001", stock: 16 },
        { color: "floral-blue", size: "S", sku: "ZARA-DRS-FLB-S-002", stock: 22 },
        { color: "solid-yellow", size: "M", sku: "ZARA-DRS-SLY-M-003", stock: 19 },
        { color: "floral-pink", size: "L", sku: "ZARA-DRS-FLP-L-004", stock: 14 },
        { color: "solid-white", size: "XL", sku: "ZARA-DRS-SLW-XL-005", stock: 8 }
      ],
      status: "returnable",
      description: "Elegant midi dress perfect for summer occasions. Features a flowing silhouette with delicate floral prints and breathable fabric. Ideal for both casual outings and semi-formal events.",
      manufacturingDetails: "Made in Spain with premium European fabrics. 100% Viscose with anti-wrinkle treatment. Eco-friendly dyeing process certified by OEKO-TEX Standard 100.",
      shippingReturns: "Free shipping on orders above ₹799. 30-day return policy. Free exchange within 15 days. International shipping to Europe and North America.",
      sizeCharts: [
        { type: "women", url: "/charts/women_dress_zara.jpg", name: "Women's Dress Size Chart" },
        { type: "petite", url: "/charts/petite_dress_zara.jpg", name: "Petite Size Chart" },
        { type: "plus", url: "/charts/plus_dress_zara.jpg", name: "Plus Size Chart" }
      ],
      category: "women/dress",
      brand: "Zara",
      launchDate: "2025-05-20",
      rating: 4.4,
      reviewCount: 178
    }
  ];

  // Filter functions
  const filteredUsers = useMemo(() => {
    return mockUsers.filter(user => {
      // Search filter
      const searchMatch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.username.toLowerCase().includes(searchTerm.toLowerCase());
      
      // Gender filter
      const genderMatch = filters.users.gender === 'all' || user.gender === filters.users.gender;
      
      // Account status filter
      const statusMatch = filters.users.accountStatus === 'all' || 
        (filters.users.accountStatus === 'active' && !user.deleteAccount) ||
        (filters.users.accountStatus === 'deleted' && user.deleteAccount);
      
      // Point range filter
      const pointMatch = filters.users.pointRange === 'all' ||
        (filters.users.pointRange === 'low' && user.pointBalance < 500) ||
        (filters.users.pointRange === 'medium' && user.pointBalance >= 500 && user.pointBalance < 1000) ||
        (filters.users.pointRange === 'high' && user.pointBalance >= 1000);
      
      return searchMatch && genderMatch && statusMatch && pointMatch;
    });
  }, [searchTerm, filters.users]);

  const filteredOrders = useMemo(() => {
    return mockOrders.filter(order => {
      // Search filter
      const searchMatch = order.orderId.toLowerCase().includes(searchTerm.toLowerCase()) ||
        order.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        order.sku.toLowerCase().includes(searchTerm.toLowerCase());
      
      // Delivery status filter
      const deliveryMatch = filters.orders.deliveryStatus === 'all' || 
        order.deliveryStatus === filters.orders.deliveryStatus;
      
      // Payment status filter
      const paymentMatch = filters.orders.paymentStatus === 'all' || 
        order.paymentStatus === filters.orders.paymentStatus;
      
      return searchMatch && deliveryMatch && paymentMatch;
    });
  }, [searchTerm, filters.orders]);

  const filteredProducts = useMemo(() => {
    return mockProducts.filter(product => {
      // Search filter
      const searchMatch = product.article.toLowerCase().includes(searchTerm.toLowerCase());
      
      // Status filter
      const statusMatch = filters.products.status === 'all' || product.status === filters.products.status;
      
      // Brand filter
      const brandMatch = filters.products.brand === 'all' || product.brand === filters.products.brand;
      
      // Category filter
      const categoryMatch = filters.products.category === 'all' || 
        product.category.includes(filters.products.category);
      
      // Stock level filter
      const totalStock = product.variants.reduce((sum, variant) => sum + variant.stock, 0);
      const stockMatch = filters.products.stockLevel === 'all' ||
        (filters.products.stockLevel === 'low' && totalStock < 50) ||
        (filters.products.stockLevel === 'medium' && totalStock >= 50 && totalStock < 150) ||
        (filters.products.stockLevel === 'high' && totalStock >= 150);
      
      return searchMatch && statusMatch && brandMatch && categoryMatch && stockMatch;
    });
  }, [searchTerm, filters.products]);

  // Toggle password visibility with 2FA authentication
  const togglePassword = useCallback((userId) => {
    // If user is already authenticated, just toggle password visibility
    if (authenticated2FAUsers.has(userId)) {
      setShowPassword(prev => ({
        ...prev,
        [userId]: !prev[userId]
      }));
    } else {
      // Require 2FA authentication first
      setPending2FAUserId(userId);
      setShow2FAModal(true);
    }
  }, [authenticated2FAUsers]);

  // Handle 2FA submission for password viewing
  const handle2FASubmit = useCallback((data) => {
    if (data && data.verificationCode.length === 4 && data.emailPassword && data.defaultPassword) {
      setShow2FAModal(false);
      setShow2FASuccess(true);
      
      // Add user to authenticated users
      setAuthenticated2FAUsers(prev => new Set([...prev, pending2FAUserId]));
      
      // Show password after authentication
      setTimeout(() => {
        setShowPassword(prev => ({
          ...prev,
          [pending2FAUserId]: true
        }));
        setShow2FASuccess(false);
        setPending2FAUserId(null);
      }, 2000);
      
      console.log('2FA Authentication Data for password viewing:', {
        userId: pending2FAUserId,
        verificationCode: data.verificationCode,
        emailPassword: data.emailPassword,
        defaultPassword: data.defaultPassword
      });
    } else {
      alert('Please fill in all fields');
    }
  }, [pending2FAUserId]);

  // Handle 2FA cancellation
  const handleCancel2FA = useCallback(() => {
    setShow2FAModal(false);
    setPending2FAUserId(null);
  }, []);

  // Close 2FA success modal
  const handleClose2FASuccess = useCallback(() => {
    setShow2FASuccess(false);
    setPending2FAUserId(null);
  }, []);

  // Document preview
  const openDocumentPreview = useCallback((doc) => {
    setDocumentPreview(doc);
  }, []);

  // Size chart preview
  const openSizeChart = useCallback((charts) => {
    setSizeChartPreview(charts);
  }, []);

  // Filter handler
  const updateFilter = useCallback((tab, filterType, value) => {
    setFilters(prev => ({
      ...prev,
      [tab]: {
        ...prev[tab],
        [filterType]: value
      }
    }));
  }, []);

  // Reset filters
  const resetFilters = useCallback((tab) => {
    setFilters(prev => ({
      ...prev,
      [tab]: {
        ...Object.keys(prev[tab]).reduce((acc, key) => {
          acc[key] = 'all';
          return acc;
        }, {})
      }
    }));
  }, []);

  return (
    <div style={{
      padding: '20px 20px 20px 10px',
      backgroundColor: '#f9fafb',
      minHeight: '100vh'
    }}>
      <div style={{
        maxWidth: 'none',
        margin: '0',
        width: '100%'
      }}>
        {/* Header */}
        <div style={{
          backgroundColor: 'white',
          borderRadius: '8px',
          border: '1px solid #e5e7eb',
          marginBottom: '20px',
          padding: '20px'
        }}>
          <h1 style={{
            fontSize: '28px',
            fontWeight: 'bold',
            color: '#111827',
            margin: '0 0 15px 0'
          }}>
            📊 Database Dashboard
          </h1>
          
          {/* Search Bar */}
          <div style={{
            display: 'flex',
            gap: '15px',
            alignItems: 'center'
          }}>
            <input
              type="text"
              placeholder="Search database..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              style={{
                flex: 1,
                padding: '10px 15px',
                border: '1px solid #d1d5db',
                borderRadius: '6px',
                fontSize: '14px'
              }}
            />
            <button style={{
              padding: '10px 20px',
              backgroundColor: '#3b82f6',
              color: 'white',
              border: 'none',
              borderRadius: '6px',
              cursor: 'pointer'
            }}>
              🔍 Search
            </button>
          </div>
        </div>

        {/* Advanced Filters */}
        <div style={{
          backgroundColor: 'white',
          borderRadius: '8px',
          border: '1px solid #e5e7eb',
          marginBottom: '20px',
          padding: '20px'
        }}>
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: '15px'
          }}>
            <h3 style={{
              fontSize: '16px',
              fontWeight: '600',
              color: '#374151',
              margin: 0,
              display: 'flex',
              alignItems: 'center',
              gap: '8px'
            }}>
              🔧 Advanced Filters
            </h3>
            <button
              onClick={() => resetFilters(activeTab)}
              style={{
                padding: '6px 12px',
                backgroundColor: '#f3f4f6',
                border: '1px solid #d1d5db',
                borderRadius: '4px',
                cursor: 'pointer',
                fontSize: '12px',
                color: '#374151'
              }}
            >
              🔄 Reset Filters
            </button>
          </div>

          {/* User Filters */}
          {activeTab === 'users' && (
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
              gap: '15px'
            }}>
              <div>
                <label style={{ fontSize: '12px', fontWeight: '500', color: '#374151', display: 'block', marginBottom: '5px' }}>
                  👤 Gender
                </label>
                <select
                  value={filters.users.gender}
                  onChange={(e) => updateFilter('users', 'gender', e.target.value)}
                  style={{
                    width: '100%',
                    padding: '8px 12px',
                    border: '1px solid #d1d5db',
                    borderRadius: '4px',
                    fontSize: '14px'
                  }}
                >
                  <option value="all">All Genders</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                </select>
              </div>

              <div>
                <label style={{ fontSize: '12px', fontWeight: '500', color: '#374151', display: 'block', marginBottom: '5px' }}>
                  ✅ Account Status
                </label>
                <select
                  value={filters.users.accountStatus}
                  onChange={(e) => updateFilter('users', 'accountStatus', e.target.value)}
                  style={{
                    width: '100%',
                    padding: '8px 12px',
                    border: '1px solid #d1d5db',
                    borderRadius: '4px',
                    fontSize: '14px'
                  }}
                >
                  <option value="all">All Status</option>
                  <option value="active">Active</option>
                  <option value="deleted">Deleted</option>
                </select>
              </div>

              <div>
                <label style={{ fontSize: '12px', fontWeight: '500', color: '#374151', display: 'block', marginBottom: '5px' }}>
                  💰 Point Range
                </label>
                <select
                  value={filters.users.pointRange}
                  onChange={(e) => updateFilter('users', 'pointRange', e.target.value)}
                  style={{
                    width: '100%',
                    padding: '8px 12px',
                    border: '1px solid #d1d5db',
                    borderRadius: '4px',
                    fontSize: '14px'
                  }}
                >
                  <option value="all">All Points</option>
                  <option value="low">Low (&lt; 500)</option>
                  <option value="medium">Medium (500-999)</option>
                  <option value="high">High (≥ 1000)</option>
                </select>
              </div>
            </div>
          )}

          {/* Order Filters */}
          {activeTab === 'orders' && (
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
              gap: '15px'
            }}>
              <div>
                <label style={{ fontSize: '12px', fontWeight: '500', color: '#374151', display: 'block', marginBottom: '5px' }}>
                  🚚 Delivery Status
                </label>
                <select
                  value={filters.orders.deliveryStatus}
                  onChange={(e) => updateFilter('orders', 'deliveryStatus', e.target.value)}
                  style={{
                    width: '100%',
                    padding: '8px 12px',
                    border: '1px solid #d1d5db',
                    borderRadius: '4px',
                    fontSize: '14px'
                  }}
                >
                  <option value="all">All Delivery Status</option>
                  <option value="pending">Pending</option>
                  <option value="shipped">Shipped</option>
                  <option value="delivered">Delivered</option>
                  <option value="cancelled">Cancelled</option>
                </select>
              </div>

              <div>
                <label style={{ fontSize: '12px', fontWeight: '500', color: '#374151', display: 'block', marginBottom: '5px' }}>
                  💳 Payment Status
                </label>
                <select
                  value={filters.orders.paymentStatus}
                  onChange={(e) => updateFilter('orders', 'paymentStatus', e.target.value)}
                  style={{
                    width: '100%',
                    padding: '8px 12px',
                    border: '1px solid #d1d5db',
                    borderRadius: '4px',
                    fontSize: '14px'
                  }}
                >
                  <option value="all">All Payment Status</option>
                  <option value="pending">Pending</option>
                  <option value="completed">Completed</option>
                  <option value="failed">Failed</option>
                  <option value="refunded">Refunded</option>
                </select>
              </div>
            </div>
          )}

          {/* Product Filters */}
          {activeTab === 'products' && (
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
              gap: '15px'
            }}>
              <div>
                <label style={{ fontSize: '12px', fontWeight: '500', color: '#374151', display: 'block', marginBottom: '5px' }}>
                  🔄 Return Status
                </label>
                <select
                  value={filters.products.status}
                  onChange={(e) => updateFilter('products', 'status', e.target.value)}
                  style={{
                    width: '100%',
                    padding: '8px 12px',
                    border: '1px solid #d1d5db',
                    borderRadius: '4px',
                    fontSize: '14px'
                  }}
                >
                  <option value="all">All Status</option>
                  <option value="returnable">Returnable</option>
                  <option value="non-returnable">Non-Returnable</option>
                </select>
              </div>

              <div>
                <label style={{ fontSize: '12px', fontWeight: '500', color: '#374151', display: 'block', marginBottom: '5px' }}>
                  🏷️ Brand
                </label>
                <select
                  value={filters.products.brand}
                  onChange={(e) => updateFilter('products', 'brand', e.target.value)}
                  style={{
                    width: '100%',
                    padding: '8px 12px',
                    border: '1px solid #d1d5db',
                    borderRadius: '4px',
                    fontSize: '14px'
                  }}
                >
                  <option value="all">All Brands</option>
                  <option value="Adidas">Adidas</option>
                  <option value="Nike">Nike</option>
                  <option value="Zara">Zara</option>
                </select>
              </div>

              <div>
                <label style={{ fontSize: '12px', fontWeight: '500', color: '#374151', display: 'block', marginBottom: '5px' }}>
                  📦 Category
                </label>
                <select
                  value={filters.products.category}
                  onChange={(e) => updateFilter('products', 'category', e.target.value)}
                  style={{
                    width: '100%',
                    padding: '8px 12px',
                    border: '1px solid #d1d5db',
                    borderRadius: '4px',
                    fontSize: '14px'
                  }}
                >
                  <option value="all">All Categories</option>
                  <option value="tshirt">T-Shirts</option>
                  <option value="shoes">Shoes</option>
                  <option value="dress">Dresses</option>
                </select>
              </div>

              <div>
                <label style={{ fontSize: '12px', fontWeight: '500', color: '#374151', display: 'block', marginBottom: '5px' }}>
                  📊 Stock Level
                </label>
                <select
                  value={filters.products.stockLevel}
                  onChange={(e) => updateFilter('products', 'stockLevel', e.target.value)}
                  style={{
                    width: '100%',
                    padding: '8px 12px',
                    border: '1px solid #d1d5db',
                    borderRadius: '4px',
                    fontSize: '14px'
                  }}
                >
                  <option value="all">All Stock Levels</option>
                  <option value="low">Low (&lt; 50)</option>
                  <option value="medium">Medium (50-149)</option>
                  <option value="high">High (≥ 150)</option>
                </select>
              </div>
            </div>
          )}
        </div>

        {/* Tab Navigation */}
        <div style={{
          backgroundColor: 'white',
          borderRadius: '8px',
          border: '1px solid #e5e7eb',
          marginBottom: '20px'
        }}>
          <div style={{
            display: 'flex',
            borderBottom: '1px solid #e5e7eb'
          }}>
            {[
              { key: 'users', label: '👤 User Data', desc: 'Profile & Account Info' },
              { key: 'orders', label: '🛒 Order Data', desc: 'Order History & Details' },
              { key: 'products', label: '📦 Product Data', desc: 'Inventory & Variants' }
            ].map(({ key, label, desc }) => (
              <button
                key={key}
                onClick={() => setActiveTab(key)}
                style={{
                  flex: 1,
                  padding: '20px',
                  border: 'none',
                  backgroundColor: activeTab === key ? '#eff6ff' : 'transparent',
                  borderBottom: activeTab === key ? '3px solid #3b82f6' : '3px solid transparent',
                  cursor: 'pointer',
                  textAlign: 'center'
                }}
              >
                <div style={{
                  fontSize: '16px',
                  fontWeight: '600',
                  color: activeTab === key ? '#1e40af' : '#374151',
                  marginBottom: '5px'
                }}>
                  {label}
                </div>
                <div style={{
                  fontSize: '12px',
                  color: '#6b7280'
                }}>
                  {desc}
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Content Area */}
        <div style={{
          backgroundColor: 'white',
          borderRadius: '8px',
          border: '1px solid #e5e7eb',
          padding: '20px'
        }}>
          {/* Filter Summary */}
          <div style={{
            backgroundColor: '#f8fafc',
            border: '1px solid #e2e8f0',
            borderRadius: '6px',
            padding: '12px',
            marginBottom: '20px',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: '10px'
          }}>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '15px',
              fontSize: '14px',
              color: '#374151'
            }}>
              <span style={{ fontWeight: '600' }}>
                📊 Results: {
                  activeTab === 'users' ? filteredUsers.length :
                  activeTab === 'orders' ? filteredOrders.length :
                  filteredProducts.length
                } items
              </span>
              {searchTerm && (
                <span style={{
                  padding: '4px 8px',
                  backgroundColor: '#dbeafe',
                  borderRadius: '4px',
                  fontSize: '12px'
                }}>
                  🔍 Search: "{searchTerm}"
                </span>
              )}
            </div>
            <div style={{
              display: 'flex',
              gap: '8px',
              flexWrap: 'wrap'
            }}>
              {/* Active filter indicators */}
              {activeTab === 'users' && (
                <>
                  {filters.users.gender !== 'all' && (
                    <span style={{
                      padding: '4px 8px',
                      backgroundColor: '#fef3c7',
                      borderRadius: '4px',
                      fontSize: '12px'
                    }}>
                      👤 {filters.users.gender}
                    </span>
                  )}
                  {filters.users.accountStatus !== 'all' && (
                    <span style={{
                      padding: '4px 8px',
                      backgroundColor: '#d1fae5',
                      borderRadius: '4px',
                      fontSize: '12px'
                    }}>
                      ✅ {filters.users.accountStatus}
                    </span>
                  )}
                  {filters.users.pointRange !== 'all' && (
                    <span style={{
                      padding: '4px 8px',
                      backgroundColor: '#f0fdf4',
                      borderRadius: '4px',
                      fontSize: '12px'
                    }}>
                      💰 {filters.users.pointRange} points
                    </span>
                  )}
                </>
              )}
              {activeTab === 'orders' && (
                <>
                  {filters.orders.deliveryStatus !== 'all' && (
                    <span style={{
                      padding: '4px 8px',
                      backgroundColor: '#dbeafe',
                      borderRadius: '4px',
                      fontSize: '12px'
                    }}>
                      🚚 {filters.orders.deliveryStatus}
                    </span>
                  )}
                  {filters.orders.paymentStatus !== 'all' && (
                    <span style={{
                      padding: '4px 8px',
                      backgroundColor: '#fef3c7',
                      borderRadius: '4px',
                      fontSize: '12px'
                    }}>
                      💳 {filters.orders.paymentStatus}
                    </span>
                  )}
                </>
              )}
              {activeTab === 'products' && (
                <>
                  {filters.products.status !== 'all' && (
                    <span style={{
                      padding: '4px 8px',
                      backgroundColor: '#f0fdf4',
                      borderRadius: '4px',
                      fontSize: '12px'
                    }}>
                      🔄 {filters.products.status}
                    </span>
                  )}
                  {filters.products.brand !== 'all' && (
                    <span style={{
                      padding: '4px 8px',
                      backgroundColor: '#fef2f2',
                      borderRadius: '4px',
                      fontSize: '12px'
                    }}>
                      🏷️ {filters.products.brand}
                    </span>
                  )}
                  {filters.products.category !== 'all' && (
                    <span style={{
                      padding: '4px 8px',
                      backgroundColor: '#ede9fe',
                      borderRadius: '4px',
                      fontSize: '12px'
                    }}>
                      📦 {filters.products.category}
                    </span>
                  )}
                  {filters.products.stockLevel !== 'all' && (
                    <span style={{
                      padding: '4px 8px',
                      backgroundColor: '#ecfdf5',
                      borderRadius: '4px',
                      fontSize: '12px'
                    }}>
                      📊 {filters.products.stockLevel} stock
                    </span>
                  )}
                </>
              )}
            </div>
          </div>

          {/* User Data View */}
          {activeTab === 'users' && (
            <div>
              <h2 style={{
                fontSize: '20px',
                fontWeight: '600',
                color: '#111827',
                marginBottom: '20px'
              }}>
                👤 User Profile Data
              </h2>
              
              <div style={{ overflowX: 'auto' }}>
                <table style={{
                  width: '100%',
                  borderCollapse: 'collapse',
                  fontSize: '14px'
                }}>
                  <thead>
                    <tr style={{ backgroundColor: '#f9fafb' }}>
                      <th style={{ padding: '12px', textAlign: 'left', borderBottom: '1px solid #e5e7eb', minWidth: '150px' }}>Name</th>
                      <th style={{ padding: '12px', textAlign: 'left', borderBottom: '1px solid #e5e7eb', minWidth: '200px' }}>Email</th>
                      <th style={{ padding: '12px', textAlign: 'left', borderBottom: '1px solid #e5e7eb', minWidth: '160px' }}>Phone</th>
                      <th style={{ padding: '12px', textAlign: 'left', borderBottom: '1px solid #e5e7eb', minWidth: '120px' }}>DOB</th>
                      <th style={{ padding: '12px', textAlign: 'left', borderBottom: '1px solid #e5e7eb', minWidth: '250px' }}>Address</th>
                      <th style={{ padding: '12px', textAlign: 'left', borderBottom: '1px solid #e5e7eb', minWidth: '150px' }}>Username</th>
                      <th style={{ padding: '12px', textAlign: 'left', borderBottom: '1px solid #e5e7eb', minWidth: '120px' }}>App Reviews</th>
                      <th style={{ padding: '12px', textAlign: 'left', borderBottom: '1px solid #e5e7eb', minWidth: '100px' }}>Gender</th>
                      <th style={{ padding: '12px', textAlign: 'left', borderBottom: '1px solid #e5e7eb', minWidth: '180px' }}>Password</th>
                      <th style={{ padding: '12px', textAlign: 'left', borderBottom: '1px solid #e5e7eb', minWidth: '120px' }}>Points</th>
                      <th style={{ padding: '12px', textAlign: 'left', borderBottom: '1px solid #e5e7eb', minWidth: '120px' }}>Account Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredUsers.map((user) => (
                      <tr key={user.id}>
                        <td style={{ padding: '12px', borderBottom: '1px solid #f3f4f6' }}>
                          <div style={{ fontWeight: '600' }}>{user.name}</div>
                          <div style={{ fontSize: '11px', color: '#6b7280' }}>
                            Created: {user.accountCreated}
                          </div>
                        </td>
                        <td style={{ padding: '12px', borderBottom: '1px solid #f3f4f6' }}>
                          <div>{user.email}</div>
                          <div style={{ fontSize: '11px', color: '#6b7280' }}>
                            Last Login: {user.lastLogin}
                          </div>
                        </td>
                        <td style={{ padding: '12px', borderBottom: '1px solid #f3f4f6' }}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                            <select style={{
                              padding: '2px 4px',
                              border: '1px solid #d1d5db',
                              borderRadius: '3px',
                              fontSize: '12px',
                              backgroundColor: '#f9fafb'
                            }} value={user.phone.countryCode} disabled>
                              <option value="+91">🇮🇳 +91</option>
                              <option value="+1">🇺🇸 +1</option>
                              <option value="+971">🇦🇪 +971</option>
                            </select>
                            <span>{user.phone.number}</span>
                          </div>
                        </td>
                        <td style={{ padding: '12px', borderBottom: '1px solid #f3f4f6' }}>
                          <div style={{ fontWeight: '500' }}>{user.dateOfBirth}</div>
                          <div style={{ fontSize: '11px', color: '#6b7280' }}>DD/MM/YYYY</div>
                        </td>
                        <td style={{ padding: '12px', borderBottom: '1px solid #f3f4f6' }}>
                          <div><strong>Street:</strong> {user.address.street}</div>
                          <div><strong>City:</strong> {user.address.city}, {user.address.state}</div>
                          <div><strong>PIN:</strong> {user.address.pincode}</div>
                          <div style={{ fontSize: '11px', color: '#6b7280' }}>
                            📍 {user.address.landmark}
                          </div>
                        </td>
                        <td style={{ padding: '12px', borderBottom: '1px solid #f3f4f6' }}>
                          <div style={{ fontWeight: '500' }}>@{user.username}</div>
                        </td>
                        <td style={{ padding: '12px', borderBottom: '1px solid #f3f4f6' }}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                            <span>⭐</span>
                            <span style={{ fontWeight: '600' }}>{user.appReviews.rating}</span>
                            <span style={{ color: '#6b7280' }}>/5</span>
                          </div>
                          <div style={{ fontSize: '11px', color: '#6b7280' }}>
                            {user.appReviews.reviewCount} reviews
                          </div>
                          <div style={{ fontSize: '10px', color: '#9ca3af' }}>
                            Last: {user.appReviews.lastReviewDate}
                          </div>
                        </td>
                        <td style={{ padding: '12px', borderBottom: '1px solid #f3f4f6' }}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                            <span>{user.gender === 'male' ? '👨' : '👩'}</span>
                            <span style={{ textTransform: 'capitalize' }}>{user.gender}</span>
                          </div>
                        </td>
                        <td style={{ padding: '12px', borderBottom: '1px solid #f3f4f6' }}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '5px' }}>
                            <span style={{ fontFamily: 'monospace', fontSize: '12px' }}>
                              {showPassword[user.id] ? user.password : '••••••••••••••••'}
                            </span>
                            <button
                              onClick={() => togglePassword(user.id)}
                              style={{
                                padding: '4px 8px',
                                fontSize: '12px',
                                border: authenticated2FAUsers.has(user.id) ? '1px solid #10b981' : '1px solid #d1d5db',
                                borderRadius: '4px',
                                cursor: 'pointer',
                                backgroundColor: authenticated2FAUsers.has(user.id) ? '#f0fdf4' : 'white',
                                color: authenticated2FAUsers.has(user.id) ? '#065f46' : '#374151'
                              }}
                            >
                              {showPassword[user.id] ? '🙈' : authenticated2FAUsers.has(user.id) ? '✅👁️' : '��👁️'}
                            </button>
                          </div>
                          <div style={{ 
                            fontSize: '10px', 
                            color: authenticated2FAUsers.has(user.id) ? '#059669' : '#ef4444',
                            backgroundColor: authenticated2FAUsers.has(user.id) ? '#f0fdf4' : '#fef2f2',
                            padding: '3px 6px',
                            borderRadius: '3px',
                            border: authenticated2FAUsers.has(user.id) ? '1px solid #bbf7d0' : '1px solid #fecaca'
                          }}>
                            {authenticated2FAUsers.has(user.id) ? '✅ 2FA Authenticated' : '🔐 Requires 2FA Authentication'}
                          </div>
                        </td>
                        <td style={{ padding: '12px', borderBottom: '1px solid #f3f4f6' }}>
                          <div style={{ 
                            display: 'flex', 
                            alignItems: 'center', 
                            gap: '6px',
                            padding: '6px 10px',
                            backgroundColor: '#f0fdf4',
                            borderRadius: '6px',
                            border: '1px solid #bbf7d0'
                          }}>
                            <span>💰</span>
                            <span style={{ fontWeight: '600', color: '#15803d' }}>
                              {user.pointBalance}
                            </span>
                            <span style={{ fontSize: '11px', color: '#6b7280' }}>pts</span>
                          </div>
                        </td>
                        <td style={{ padding: '12px', borderBottom: '1px solid #f3f4f6' }}>
                          <span style={{
                            color: user.deleteAccount ? '#ef4444' : '#10b981',
                            fontWeight: '600',
                            padding: '4px 8px',
                            borderRadius: '4px',
                            backgroundColor: user.deleteAccount ? '#fef2f2' : '#f0fdf4',
                            border: user.deleteAccount ? '1px solid #fecaca' : '1px solid #bbf7d0',
                            fontSize: '12px'
                          }}>
                            {user.deleteAccount ? '❌ Deleted' : '✅ Active'}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Order Data View */}
          {activeTab === 'orders' && (
            <div>
              <h2 style={{
                fontSize: '20px',
                fontWeight: '600',
                color: '#111827',
                marginBottom: '20px'
              }}>
                🛒 Order History Data
              </h2>
              
              {filteredOrders.map((order) => (
                <div key={order.id} style={{
                  border: '1px solid #e5e7eb',
                  borderRadius: '8px',
                  padding: '20px',
                  marginBottom: '20px',
                  backgroundColor: '#fefefe'
                }}>
                  {/* Order Header */}
                  <div style={{ 
                    borderBottom: '1px solid #e5e7eb', 
                    paddingBottom: '15px', 
                    marginBottom: '20px',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center'
                  }}>
                    <div>
                      <h3 style={{ 
                        color: '#3b82f6', 
                        margin: '0 0 5px 0', 
                        cursor: 'pointer',
                        fontSize: '18px',
                        fontWeight: '600'
                      }}>
                        🔗 Order ID: {order.orderId}
                      </h3>
                      <div style={{ fontSize: '12px', color: '#6b7280' }}>
                        Order Date: {order.orderDate} | Status: 
                        <span style={{
                          marginLeft: '5px',
                          padding: '2px 6px',
                          borderRadius: '3px',
                          backgroundColor: order.deliveryStatus === 'delivered' ? '#d1fae5' : 
                                          order.deliveryStatus === 'shipped' ? '#dbeafe' : '#fef3c7',
                          color: order.deliveryStatus === 'delivered' ? '#065f46' : 
                                 order.deliveryStatus === 'shipped' ? '#1e3a8a' : '#92400e',
                          fontSize: '11px',
                          fontWeight: '500'
                        }}>
                          {order.deliveryStatus.toUpperCase()}
                        </span>
                      </div>
                    </div>
                    <div style={{
                      padding: '8px 12px',
                      backgroundColor: order.paymentStatus === 'completed' ? '#d1fae5' : '#fef3c7',
                      color: order.paymentStatus === 'completed' ? '#065f46' : '#92400e',
                      borderRadius: '6px',
                      fontSize: '12px',
                      fontWeight: '600'
                    }}>
                      💳 {order.paymentStatus.toUpperCase()}
                    </div>
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '25px' }}>
                    {/* Customer Information */}
                    <div style={{
                      backgroundColor: '#f8fafc',
                      padding: '15px',
                      borderRadius: '6px',
                      border: '1px solid #e2e8f0'
                    }}>
                      <h4 style={{ margin: '0 0 12px 0', color: '#374151', display: 'flex', alignItems: 'center', gap: '8px' }}>
                        � Customer Details
                      </h4>
                      <div style={{ marginBottom: '8px' }}>
                        <strong>Name:</strong> {order.name}
                      </div>
                      <div style={{ marginBottom: '8px' }}>
                        <strong>Email:</strong> {order.email}
                      </div>
                      <div style={{ marginBottom: '12px' }}>
                        <strong>Phone:</strong> 
                        <span style={{
                          marginLeft: '8px',
                          padding: '2px 6px',
                          backgroundColor: '#e0e7ff',
                          borderRadius: '3px',
                          fontSize: '12px'
                        }}>
                          {order.phone.countryCode} {order.phone.number}
                        </span>
                      </div>
                      <div style={{ 
                        padding: '8px',
                        backgroundColor: 'white',
                        border: '1px solid #d1d5db',
                        borderRadius: '4px',
                        fontSize: '12px'
                      }}>
                        <div><strong>📍 Address:</strong></div>
                        <div>{order.address.street}</div>
                        <div>{order.address.city}, {order.address.state}</div>
                        <div>PIN: {order.address.pincode}</div>
                        <div style={{ color: '#6b7280', fontStyle: 'italic' }}>
                          Landmark: {order.address.landmark}
                        </div>
                      </div>
                    </div>
                    
                    {/* Product Details */}
                    <div style={{
                      backgroundColor: '#f0fdf4',
                      padding: '15px',
                      borderRadius: '6px',
                      border: '1px solid #bbf7d0'
                    }}>
                      <h4 style={{ margin: '0 0 12px 0', color: '#374151', display: 'flex', alignItems: 'center', gap: '8px' }}>
                        📦 Product Information
                      </h4>
                      <div style={{ marginBottom: '8px' }}>
                        <strong>SKU Format:</strong>
                        <div style={{
                          fontFamily: 'monospace',
                          fontSize: '11px',
                          padding: '6px 8px',
                          backgroundColor: 'white',
                          border: '1px solid #d1d5db',
                          borderRadius: '3px',
                          marginTop: '4px',
                          wordBreak: 'break-all'
                        }}>
                          {order.sku}
                        </div>
                      </div>
                      <div style={{ marginBottom: '8px' }}>
                        <strong>Barcode (14-digit):</strong>
                        <div style={{
                          fontFamily: 'monospace',
                          fontSize: '12px',
                          fontWeight: '600',
                          letterSpacing: '1px'
                        }}>
                          {order.barcode}
                        </div>
                      </div>
                      <div>
                        <strong>HSN Code (8-digit):</strong>
                        <span style={{
                          marginLeft: '8px',
                          fontFamily: 'monospace',
                          fontWeight: '600',
                          color: '#059669'
                        }}>
                          {order.hsnCode}
                        </span>
                      </div>
                    </div>
                    
                    {/* Pricing Information */}
                    <div style={{
                      backgroundColor: '#fefce8',
                      padding: '15px',
                      borderRadius: '6px',
                      border: '1px solid #fde047'
                    }}>
                      <h4 style={{ margin: '0 0 12px 0', color: '#374151', display: 'flex', alignItems: 'center', gap: '8px' }}>
                        💰 Multi-Platform Pricing
                      </h4>
                      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
                        <div style={{ fontSize: '12px' }}>
                          <strong>Website:</strong> ₹{order.prices.website}
                        </div>
                        <div style={{ fontSize: '12px' }}>
                          <strong>App:</strong> ₹{order.prices.app}
                        </div>
                        <div style={{ fontSize: '12px' }}>
                          <strong>Wholesale:</strong> ₹{order.prices.wholesale}
                        </div>
                        <div style={{ fontSize: '12px' }}>
                          <strong>Marketplace:</strong> ₹{order.prices.marketplace}
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Documents Section */}
                  <div style={{ 
                    marginTop: '20px', 
                    padding: '15px', 
                    backgroundColor: '#f1f5f9', 
                    borderRadius: '6px',
                    border: '1px solid #cbd5e1'
                  }}>
                    <h4 style={{ margin: '0 0 12px 0', display: 'flex', alignItems: 'center', gap: '8px' }}>
                      📄 Document Management
                    </h4>
                    <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', marginBottom: '12px' }}>
                      {order.documents.map((doc, idx) => (
                        <button
                          key={idx}
                          onClick={() => openDocumentPreview(doc)}
                          style={{
                            padding: '8px 12px',
                            backgroundColor: '#3b82f6',
                            color: 'white',
                            border: 'none',
                            borderRadius: '4px',
                            cursor: 'pointer',
                            fontSize: '12px',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '6px'
                          }}
                        >
                          📄 View {doc.type}
                          {doc.sides !== 'single' && (
                            <span style={{
                              fontSize: '10px',
                              backgroundColor: 'rgba(255,255,255,0.2)',
                              padding: '2px 4px',
                              borderRadius: '2px'
                            }}>
                              {doc.sides}
                            </span>
                          )}
                        </button>
                      ))}
                    </div>
                    
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <div>
                        <button
                          style={{
                            padding: '8px 16px',
                            backgroundColor: '#059669',
                            color: 'white',
                            border: 'none',
                            borderRadius: '4px',
                            cursor: 'pointer',
                            fontSize: '12px'
                          }}
                        >
                          📋 Invoice Details - {order.invoiceDetails.invoiceNo}
                        </button>
                      </div>
                      <div style={{ fontSize: '12px', color: '#6b7280' }}>
                        Total Amount: ₹{order.invoiceDetails.totalAmount} (incl. ₹{order.invoiceDetails.taxAmount} tax)
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Product Data View */}
          {activeTab === 'products' && (
            <div>
              <h2 style={{
                fontSize: '20px',
                fontWeight: '600',
                color: '#111827',
                marginBottom: '20px'
              }}>
                📦 Product Inventory Data
              </h2>
              
              {filteredProducts.map((product) => (
                <div key={product.id} style={{
                  border: '1px solid #e5e7eb',
                  borderRadius: '8px',
                  padding: '20px',
                  marginBottom: '20px',
                  backgroundColor: '#fefefe'
                }}>
                  {/* Product Header */}
                  <div style={{ 
                    borderBottom: '1px solid #e5e7eb', 
                    paddingBottom: '15px', 
                    marginBottom: '20px',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center'
                  }}>
                    <div>
                      <h3 style={{ margin: '0 0 5px 0', fontSize: '18px', fontWeight: '600' }}>
                        {product.article}
                      </h3>
                      <div style={{ fontSize: '12px', color: '#6b7280' }}>
                        Brand: {product.brand} | Category: {product.category} | Launched: {product.launchDate}
                      </div>
                      <div style={{ fontSize: '12px', color: '#6b7280', marginTop: '3px' }}>
                        ⭐ {product.rating}/5 ({product.reviewCount} reviews)
                      </div>
                    </div>
                    <div style={{
                      padding: '8px 12px',
                      backgroundColor: product.status === 'returnable' ? '#d1fae5' : '#fef2f2',
                      color: product.status === 'returnable' ? '#065f46' : '#dc2626',
                      borderRadius: '6px',
                      fontSize: '12px',
                      fontWeight: '600'
                    }}>
                      {product.status === 'returnable' ? '✅ RETURNABLE' : '❌ NON-RETURNABLE'}
                    </div>
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: '250px 1fr', gap: '25px' }}>
                    {/* Product Image */}
                    <div>
                      <div style={{
                        width: '230px',
                        height: '230px',
                        backgroundColor: '#f3f4f6',
                        borderRadius: '8px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '72px',
                        border: '2px solid #e5e7eb'
                      }}>
                        {product.category.includes('tshirt') ? '👕' : 
                         product.category.includes('shoes') ? '👟' : 
                         product.category.includes('dress') ? '👗' : '📦'}
                      </div>
                      <div style={{ 
                        marginTop: '10px', 
                        textAlign: 'center', 
                        fontSize: '11px', 
                        color: '#6b7280' 
                      }}>
                        Product Image Preview
                      </div>
                    </div>
                    
                    {/* Product Details */}
                    <div>
                      {/* Color & Size Variants */}
                      <div style={{ marginBottom: '20px' }}>
                        <h4 style={{ margin: '0 0 10px 0', display: 'flex', alignItems: 'center', gap: '8px' }}>
                          🎨 Available Variants ({product.variants.length} total)
                        </h4>
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(140px, 1fr))', gap: '8px' }}>
                          {product.variants.map((variant, idx) => (
                            <div key={idx} style={{
                              padding: '8px 10px',
                              backgroundColor: '#f8fafc',
                              border: '1px solid #e2e8f0',
                              borderRadius: '6px',
                              fontSize: '11px',
                              textAlign: 'center'
                            }}>
                              <div style={{ fontWeight: '600', textTransform: 'capitalize' }}>
                                {variant.color} - {variant.size}
                              </div>
                              <div style={{ color: '#6b7280', fontSize: '10px' }}>
                                SKU: {variant.sku}
                              </div>
                              <div style={{ 
                                color: variant.stock > 20 ? '#059669' : variant.stock > 10 ? '#d97706' : '#dc2626',
                                fontSize: '10px',
                                fontWeight: '600'
                              }}>
                                Stock: {variant.stock}
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                      
                      {/* Product Information */}
                      <div style={{ marginBottom: '15px' }}>
                        <h4 style={{ margin: '0 0 8px 0', color: '#374151' }}>📝 Product Description</h4>
                        <p style={{ 
                          margin: '0', 
                          color: '#6b7280', 
                          fontSize: '13px', 
                          lineHeight: '1.5',
                          backgroundColor: '#f9fafb',
                          padding: '10px',
                          borderRadius: '4px',
                          border: '1px solid #e5e7eb'
                        }}>
                          {product.description}
                        </p>
                      </div>
                      
                      <div style={{ marginBottom: '15px' }}>
                        <h4 style={{ margin: '0 0 8px 0', color: '#374151' }}>🏭 Manufacturing Details</h4>
                        <p style={{ 
                          margin: '0', 
                          color: '#6b7280', 
                          fontSize: '13px',
                          backgroundColor: '#f0fdf4',
                          padding: '10px',
                          borderRadius: '4px',
                          border: '1px solid #bbf7d0'
                        }}>
                          {product.manufacturingDetails}
                        </p>
                      </div>
                      
                      <div style={{ marginBottom: '20px' }}>
                        <h4 style={{ margin: '0 0 8px 0', color: '#374151' }}>🚚 Shipping & Returns Policy</h4>
                        <p style={{ 
                          margin: '0', 
                          color: '#6b7280', 
                          fontSize: '13px',
                          backgroundColor: '#fef3c7',
                          padding: '10px',
                          borderRadius: '4px',
                          border: '1px solid #fde047'
                        }}>
                          {product.shippingReturns}
                        </p>
                      </div>
                      
                      {/* Action Buttons */}
                      <div style={{ 
                        display: 'flex', 
                        gap: '10px', 
                        flexWrap: 'wrap',
                        padding: '15px',
                        backgroundColor: '#f8fafc',
                        borderRadius: '6px',
                        border: '1px solid #e2e8f0'
                      }}>
                        <button
                          onClick={() => openSizeChart(product.sizeCharts)}
                          style={{
                            padding: '10px 16px',
                            backgroundColor: '#8b5cf6',
                            color: 'white',
                            border: 'none',
                            borderRadius: '6px',
                            cursor: 'pointer',
                            fontSize: '12px',
                            fontWeight: '600',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '6px'
                          }}
                        >
                          📏 Size Charts ({product.sizeCharts.length})
                        </button>
                        <button style={{
                          padding: '10px 16px',
                          backgroundColor: '#f59e0b',
                          color: 'white',
                          border: 'none',
                          borderRadius: '6px',
                          cursor: 'pointer',
                          fontSize: '12px',
                          fontWeight: '600',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '6px'
                        }}>
                          ✏️ Edit Product
                        </button>
                        <button style={{
                          padding: '10px 16px',
                          backgroundColor: '#10b981',
                          color: 'white',
                          border: 'none',
                          borderRadius: '6px',
                          cursor: 'pointer',
                          fontSize: '12px',
                          fontWeight: '600',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '6px'
                        }}>
                          📋 Manage Variants
                        </button>
                        <button style={{
                          padding: '10px 16px',
                          backgroundColor: '#ef4444',
                          color: 'white',
                          border: 'none',
                          borderRadius: '6px',
                          cursor: 'pointer',
                          fontSize: '12px',
                          fontWeight: '600',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '6px'
                        }}>
                          🗑️ Delete Product
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Document Preview Modal */}
      {documentPreview && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(0,0,0,0.7)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 1000
        }}>
          <div style={{
            backgroundColor: 'white',
            borderRadius: '8px',
            padding: '20px',
            maxWidth: '700px',
            width: '90%',
            maxHeight: '80vh',
            overflowY: 'auto'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
              <div>
                <h3 style={{ margin: 0 }}>📄 Document Preview</h3>
                <div style={{ fontSize: '12px', color: '#6b7280', marginTop: '4px' }}>
                  {documentPreview.type.toUpperCase()} | {documentPreview.sides.toUpperCase()} | Uploaded: {documentPreview.uploadDate}
                </div>
              </div>
              <button
                onClick={() => setDocumentPreview(null)}
                style={{
                  padding: '8px 12px',
                  backgroundColor: '#ef4444',
                  color: 'white',
                  border: 'none',
                  borderRadius: '4px',
                  cursor: 'pointer',
                  fontWeight: '600'
                }}
              >
                ✕ Close
              </button>
            </div>
            
            <div style={{
              border: '1px solid #e5e7eb',
              borderRadius: '6px',
              overflow: 'hidden',
              marginBottom: '15px'
            }}>
              <div style={{
                height: '450px',
                backgroundColor: '#f3f4f6',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '72px'
              }}>
                📄
              </div>
            </div>
            
            <div style={{
              textAlign: 'center',
              padding: '15px',
              backgroundColor: '#f8fafc',
              borderRadius: '6px',
              border: '1px solid #e2e8f0'
            }}>
              <div style={{ fontWeight: '600', marginBottom: '8px' }}>
                {documentPreview.name}
              </div>
              <div style={{ fontSize: '12px', color: '#6b7280', marginBottom: '12px' }}>
                Document Type: {documentPreview.type} | Sides: {documentPreview.sides}
              </div>
              <div style={{ display: 'flex', gap: '10px', justifyContent: 'center', flexWrap: 'wrap' }}>
                <button style={{
                  padding: '6px 12px',
                  backgroundColor: '#3b82f6',
                  color: 'white',
                  border: 'none',
                  borderRadius: '4px',
                  cursor: 'pointer',
                  fontSize: '12px'
                }}>
                  📥 Download
                </button>
                <button style={{
                  padding: '6px 12px',
                  backgroundColor: '#059669',
                  color: 'white',
                  border: 'none',
                  borderRadius: '4px',
                  cursor: 'pointer',
                  fontSize: '12px'
                }}>
                  🔍 Zoom
                </button>
                <button style={{
                  padding: '6px 12px',
                  backgroundColor: '#dc2626',
                  color: 'white',
                  border: 'none',
                  borderRadius: '4px',
                  cursor: 'pointer',
                  fontSize: '12px'
                }}>
                  🗑️ Delete
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Size Chart Modal */}
      {sizeChartPreview && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(0,0,0,0.7)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 1000
        }}>
          <div style={{
            backgroundColor: 'white',
            borderRadius: '8px',
            padding: '20px',
            maxWidth: '900px',
            width: '90%',
            maxHeight: '80vh',
            overflowY: 'auto'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
              <h3 style={{ margin: 0 }}>📏 Size Charts Reference</h3>
              <button
                onClick={() => setSizeChartPreview(null)}
                style={{
                  padding: '8px 12px',
                  backgroundColor: '#ef4444',
                  color: 'white',
                  border: 'none',
                  borderRadius: '4px',
                  cursor: 'pointer',
                  fontWeight: '600'
                }}
              >
                ✕ Close
              </button>
            </div>
            <div style={{ 
              display: 'grid', 
              gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', 
              gap: '20px' 
            }}>
              {sizeChartPreview.map((chart, idx) => (
                <div key={idx} style={{
                  border: '1px solid #e5e7eb',
                  borderRadius: '6px',
                  overflow: 'hidden'
                }}>
                  <div style={{
                    padding: '12px',
                    backgroundColor: '#f8fafc',
                    borderBottom: '1px solid #e5e7eb',
                    textAlign: 'center'
                  }}>
                    <h4 style={{ margin: 0, textTransform: 'uppercase', fontWeight: '600' }}>
                      {chart.type} SIZE CHART
                    </h4>
                    <div style={{ fontSize: '11px', color: '#6b7280', marginTop: '4px' }}>
                      {chart.name}
                    </div>
                  </div>
                  <div style={{
                    height: '320px',
                    backgroundColor: '#f3f4f6',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '64px'
                  }}>
                    📏
                  </div>
                  <div style={{
                    padding: '10px',
                    backgroundColor: '#fafafa',
                    textAlign: 'center',
                    fontSize: '11px',
                    color: '#6b7280'
                  }}>
                    Click to view full size chart
                  </div>
                </div>
              ))}
            </div>
            <div style={{
              marginTop: '20px',
              padding: '15px',
              backgroundColor: '#f0fdf4',
              borderRadius: '6px',
              border: '1px solid #bbf7d0'
            }}>
              <div style={{ fontSize: '12px', color: '#374151' }}>
                <strong>📋 Size Chart Notes:</strong>
                <ul style={{ margin: '8px 0', paddingLeft: '20px' }}>
                  <li>All measurements are in inches/cm as specified</li>
                  <li>Size charts may vary between different product variants</li>
                  <li>Refer to individual product specifications for exact measurements</li>
                  <li>Contact customer support for size recommendations</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 2FA Modal for Password Viewing */}
      {show2FAModal && (
        <TwoFactorAuth
          onSubmit={handle2FASubmit}
          onClose={handleCancel2FA}
          phoneNumber="+91 9876543210"
          emailAddress="admin@company.com"
        />
      )}

      {/* 2FA Success Modal */}
      {show2FASuccess && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(0,0,0,0.7)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 1000
        }}>
          <div style={{
            backgroundColor: 'white',
            borderRadius: '8px',
            padding: '30px',
            maxWidth: '400px',
            width: '90%',
            textAlign: 'center',
            boxShadow: '0px 4px 120px 2px rgba(0,0,0,0.25)'
          }}>
            <div style={{
              fontSize: '48px',
              marginBottom: '20px'
            }}>
              ✅
            </div>
            <h3 style={{
              fontSize: '24px',
              fontWeight: '600',
              color: '#059669',
              margin: '0 0 15px 0'
            }}>
              Authentication Successful!
            </h3>
            <p style={{
              fontSize: '14px',
              color: '#6b7280',
              margin: '0 0 25px 0'
            }}>
              You can now view sensitive password information. This session will remain authenticated for your convenience.
            </p>
            <button
              onClick={handleClose2FASuccess}
              style={{
                padding: '10px 20px',
                backgroundColor: '#059669',
                color: 'white',
                border: 'none',
                borderRadius: '6px',
                cursor: 'pointer',
                fontSize: '14px',
                fontWeight: '600'
              }}
            >
              Continue
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default DatabaseDashboard;
