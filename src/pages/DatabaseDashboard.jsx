import React, { useState, useCallback, useMemo } from 'react';

// Enhanced Database Dashboard based on Figma designs
const DatabaseDashboard = () => {
  const [activeTab, setActiveTab] = useState('users');
  const [searchTerm, setSearchTerm] = useState('');
  const [showPassword, setShowPassword] = useState({});
  const [documentPreview, setDocumentPreview] = useState(null);
  const [sizeChartPreview, setSizeChartPreview] = useState(null);

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
    return mockUsers.filter(user =>
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.username.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [searchTerm]);

  const filteredOrders = useMemo(() => {
    return mockOrders.filter(order =>
      order.orderId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.sku.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [searchTerm]);

  const filteredProducts = useMemo(() => {
    return mockProducts.filter(product =>
      product.article.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [searchTerm]);

  // Toggle password visibility
  const togglePassword = useCallback((userId) => {
    setShowPassword(prev => ({
      ...prev,
      [userId]: !prev[userId]
    }));
  }, []);

  // Document preview
  const openDocumentPreview = useCallback((doc) => {
    setDocumentPreview(doc);
  }, []);

  // Size chart preview
  const openSizeChart = useCallback((charts) => {
    setSizeChartPreview(charts);
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
                                border: '1px solid #d1d5db',
                                borderRadius: '4px',
                                cursor: 'pointer',
                                backgroundColor: 'white'
                              }}
                            >
                              {showPassword[user.id] ? '🙈' : '👁️'}
                            </button>
                          </div>
                          <div style={{ 
                            fontSize: '10px', 
                            color: '#ef4444',
                            backgroundColor: '#fef2f2',
                            padding: '3px 6px',
                            borderRadius: '3px',
                            border: '1px solid #fecaca'
                          }}>
                            🔐 Requires 2FA Authentication
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
    </div>
  );
};

export default DatabaseDashboard;
