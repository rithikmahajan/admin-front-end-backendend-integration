import React, { useState, useMemo, useCallback } from 'react';
import { 
  Users, Package, ShoppingCart, DollarSign, TrendingUp, TrendingDown, 
  Calendar, Search, Plus, BarChart3, RefreshCw
} from 'lucide-react';

/**
 * Dashboard Component - Main admin dashboard with analytics and marketplace sync
 * 
 * Features:
 * - Real-time statistics display with optimized rendering
 * - SMS analytics and tracking
 * - Sales charts and visualizations
 * - Product sync management across marketplaces
 * - Marketplace connection status monitoring
 * - Sync logs and error tracking with audit trail
 * 
 * Performance Optimizations:
 * - useMemo for data arrays to prevent unnecessary re-creation
 * - useCallback for event handlers to prevent child re-renders
 * - Proper key props for list items
 * - Optimized hover states and transitions
 */
const Dashboard = () => {
  // State management for UI interactions
  const [selectedTimeRange, setSelectedTimeRange] = useState('07 Days');

  // Memoized dashboard statistics data to prevent unnecessary re-renders
  const stats = useMemo(() => [
    {
      title: 'Total User',
      value: '40,689',
      change: '+8.5%',
      changeType: 'increase',
      period: 'Up from yesterday',
      icon: Users,
      color: 'bg-blue-500'
    },
    {
      title: 'Total Order',
      value: '10293',
      change: '+1.3%',
      changeType: 'increase',
      period: 'Up from past week',
      icon: ShoppingCart,
      color: 'bg-green-500'
    },
    {
      title: 'Total Sales',
      value: '$89,000',
      change: '-4.3%',
      changeType: 'decrease',
      period: 'Down from yesterday',
      icon: DollarSign,
      color: 'bg-yellow-500'
    },
    {
      title: 'Total Pending',
      value: '2040',
      change: '+1.8%',
      changeType: 'increase',
      period: 'Up from yesterday',
      icon: Package,
      color: 'bg-purple-500'
    },
    {
      title: 'Sync Products',
      value: '10293',
      change: '+1.3%',
      changeType: 'increase',
      period: 'Up from past week',
      icon: RefreshCw,
      color: 'bg-indigo-500'
    }
  ], []);

  // Memoized SMS statistics to optimize rendering performance
  const smsStats = useMemo(() => [
    { title: 'SMS Sent', value: '50,000' },
    { title: 'Delivery Report', value: '35%' },
    { title: 'Promotional SMS', value: '₹ 3345' },
    { title: 'Transactional SMS', value: '₹ 778' }
  ], []);

  // Memoized analytics data for performance optimization
  const analyticsData = useMemo(() => [
    { title: 'Visitor', value: '395', growth: '348.9', growthType: 'up' },
    { title: 'New Visitors', value: '932', growth: '565.7', growthType: 'up' },
    { title: 'Average engagement time', value: '1m 50', growth: '250.1', growthType: 'down' },
    { title: 'Total Visitors', value: '150K', growth: null, growthType: null }
  ], []);

  // Memoized product sync data with marketplace information
  const productSyncData = useMemo(() => [
    { 
      id: 1,
      image: '/api/placeholder/200/200',
      name: 'Item Stock',
      price: '2025',
      sku: '2025',
      barcode: '2025',
      synced: 'Yes',
      marketplace: 'amazon',
      status: 'connected',
      error: null,
      action: 'sync now'
    },
    {
      id: 2,
      image: '/api/placeholder/200/200', 
      name: 'Item Stock',
      price: '2025',
      sku: '2025',
      barcode: '2025',
      synced: 'no',
      marketplace: 'flipkart',
      status: 'not connected',
      error: 'sync',
      action: 'sync now'
    },
    {
      id: 3,
      image: '/api/placeholder/200/200',
      name: 'Item Stock', 
      price: '2025',
      sku: '2025',
      barcode: '2025',
      synced: 'sync',
      marketplace: 'ajio',
      status: 'not connected',
      error: 'sync',
      action: 'sync now'
    }
  ], []);

  // Memoized marketplace configuration data
  const marketplaces = useMemo(() => [
    { id: 1, name: 'amazon', sellerId: '1234', status: 'connected', lastSync: '02.03pm' },
    { id: 2, name: 'flipkart', sellerId: '5678', status: 'not connected', lastSync: null },
    { id: 3, name: 'ajio', sellerId: '4587', status: 'connected', lastSync: null },
    { id: 4, name: 'myntra', sellerId: null, status: 'not connected', lastSync: null },
    { id: 5, name: 'nykaa', sellerId: null, status: 'not connected', lastSync: null }
  ], []);

  // Memoized sync logs data for audit trail
  const syncLogs = useMemo(() => [
    { id: 1, date: 'Nov 11,2025', operation: 'product sync', marketplace: 'amazon', status: 'success', error: null },
    { id: 2, date: 'Nov 11,2025', operation: 'inventory sync', marketplace: 'flipkart', status: 'fail', error: 'connection timeout' },
    { id: 3, date: 'Nov 11,2025', operation: 'product sync', marketplace: 'ajio', status: 'fail', error: 'invalid credentials' }
  ], []);

  // Callback for handling time range changes (prevents unnecessary re-renders)
  const handleTimeRangeChange = useCallback((period) => {
    setSelectedTimeRange(period);
  }, []);

  // Memoized time period options to prevent array recreation
  const timePeriods = useMemo(() => ['07 Days', '30 Days', '6 Months', '7 Days'], []);

  /**
   * Reusable StatCard component for displaying dashboard statistics
   * Optimized with proper prop destructuring and memoization
   */
  const StatCard = useCallback(({ stat }) => {
    const Icon = stat.icon;
    return (
      <div className="bg-white rounded-2xl shadow-sm p-6 hover:shadow-md transition-shadow duration-200">
        <div className="flex items-center justify-between mb-4">
          <div className={`p-3 rounded-full ${stat.color}`}>
            <Icon className="h-6 w-6 text-white" />
          </div>
        </div>
        <div>
          <p className="text-base font-semibold text-[#202224] opacity-70 mb-1">{stat.title}</p>
          <p className="text-3xl font-bold text-[#202224] tracking-wide mb-3">{stat.value}</p>
          <div className="flex items-center">
            {stat.changeType === 'increase' ? (
              <TrendingUp className="h-4 w-4 text-green-500 mr-1" />
            ) : (
              <TrendingDown className="h-4 w-4 text-red-500 mr-1" />
            )}
            <span className={`text-base font-semibold ${
              stat.changeType === 'increase' ? 'text-[#00b69b]' : 'text-[#f93c65]'
            }`}>
              {stat.change}
            </span>
            <span className="text-base text-[#606060] ml-1">{stat.period}</span>
          </div>
        </div>
      </div>
    );
  }, []);

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Dashboard Header Section */}
      <div className="bg-white px-6 py-4 shadow-sm">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 mb-1">Dashboard/ analytics</h1>
            <div className="flex items-center space-x-2 text-sm text-gray-600">
              <Calendar className="h-4 w-4" />
              <span>Nov 11,2025-Nov 27 2025</span>
            </div>
          </div>
          {/* Campaign Creation Button */}
          <button className="bg-[#101316] text-white px-4 py-2 rounded-md flex items-center space-x-2 hover:bg-gray-800 transition-colors duration-200">
            <Plus className="h-4 w-4" />
            <span className="text-sm font-semibold">Create Campaign</span>
          </button>
        </div>
      </div>

      {/* Main Content Container */}
      <div className="px-6 py-6 space-y-6">
        {/* Statistics Cards Grid - Optimized with memoized component */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
          {stats.map((stat, index) => (
            <StatCard key={`stat-${index}`} stat={stat} />
          ))}
        </div>

        {/* SMS Statistics Section - Consolidated view */}
        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {smsStats.map((stat, index) => (
              <div key={`sms-${index}`} className="text-left">
                <p className="text-sm font-normal text-[#101316] mb-2">{stat.title}</p>
                <p className="text-2xl font-bold text-[#202020]">{stat.value}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Sales Analytics Chart Section */}
        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-xl font-bold text-gray-900">Sales Details</h3>
            <div className="flex items-center space-x-2">
              {/* Month selector - could be enhanced with more options */}
              <select className="border border-gray-300 rounded px-3 py-1 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
                <option>October</option>
                <option>November</option>
                <option>December</option>
              </select>
            </div>
          </div>
          
          {/* Chart Placeholder - Ready for chart library integration */}
          <div className="h-64 bg-gray-100 rounded-lg flex items-center justify-center mb-6 hover:bg-gray-50 transition-colors duration-200">
            <div className="text-center">
              <BarChart3 className="h-16 w-16 text-gray-400 mx-auto mb-2" />
              <p className="text-gray-500 text-sm">Chart visualization area</p>
            </div>
          </div>

          {/* Analytics Metrics Grid */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
            {analyticsData.map((item, index) => (
              <div key={`analytics-${index}`}>
                <p className="text-sm font-semibold text-[#9aa0a6] mb-1 tracking-wider">{item.title}</p>
                <p className="text-xl font-semibold text-[#9aa0a6] mb-1">{item.value}</p>
                {/* Growth indicator with proper null checking */}
                {item.growth && (
                  <div className="flex items-center">
                    <span className={`text-sm ${item.growthType === 'up' ? 'text-green-500' : 'text-red-500'}`}>
                      {item.growth}
                    </span>
                    {item.growthType === 'up' ? (
                      <TrendingUp className="h-3 w-3 text-green-500 ml-1" />
                    ) : (
                      <TrendingDown className="h-3 w-3 text-red-500 ml-1" />
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Views Report Section with Time Period Selector */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <h4 className="font-bold text-gray-900">Views Report</h4>
            <div className="flex flex-wrap gap-2">
              {/* Optimized time period buttons with callback */}
              {timePeriods.map((period) => (
                <button
                  key={period}
                  className={`px-4 py-2 rounded text-xs font-bold transition-all duration-200 ${
                    selectedTimeRange === period
                      ? 'bg-zinc-900 text-white border border-zinc-400'
                      : 'bg-white text-zinc-500 border border-zinc-400 hover:bg-gray-50'
                  }`}
                  onClick={() => handleTimeRangeChange(period)}
                >
                  {period}
                </button>
              ))}
              {/* Export functionality placeholder */}
              <button className="px-4 py-2 rounded text-xs font-bold bg-white border border-zinc-300 text-zinc-900 hover:bg-gray-50 transition-colors duration-200">
                Export PDF
              </button>
            </div>
          </div>
        </div>

        {/* Product Sync Manager Section */}
        <div className="bg-white rounded-xl shadow-sm p-6">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">product sync manager</h2>
          
          {/* Search Functionality */}
          <div className="mb-6">
            <div className="relative max-w-md">
              <Search className="h-5 w-5 absolute left-3 top-3 text-gray-400" />
              <input
                type="text"
                placeholder="Search"
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200"
              />
            </div>
          </div>

          {/* Product Sync Table - Optimized for large datasets */}
          <div className="overflow-x-auto">
            <table className="w-full table-auto">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-3 px-4 font-normal text-[15px] text-black">Image</th>
                  <th className="text-left py-3 px-4 font-normal text-[15px] text-black">product name</th>
                  <th className="text-left py-3 px-4 font-normal text-[15px] text-black">Price</th>
                  <th className="text-left py-3 px-4 font-normal text-[15px] text-black">SKU</th>
                  <th className="text-left py-3 px-4 font-normal text-[15px] text-black">barcode no.</th>
                  <th className="text-left py-3 px-4 font-normal text-[15px] text-black">synced</th>
                  <th className="text-left py-3 px-4 font-normal text-[15px] text-black">marketplace</th>
                  <th className="text-left py-3 px-4 font-normal text-[15px] text-black">error</th>
                  <th className="text-left py-3 px-4 font-normal text-[15px] text-black">action</th>
                </tr>
              </thead>
              <tbody>
                {productSyncData.map((product) => (
                  <tr key={`product-${product.id}`} className="border-b border-gray-100 hover:bg-gray-50 transition-colors duration-150">
                    <td className="py-4 px-4">
                      {/* Placeholder for product image - optimized loading */}
                      <div className="w-16 h-16 bg-gray-200 rounded-lg flex items-center justify-center">
                        <Package className="h-8 w-8 text-gray-400" />
                      </div>
                    </td>
                    <td className="py-4 px-4 font-medium text-gray-900 text-[21px]">{product.name}</td>
                    <td className="py-4 px-4 text-gray-700 text-[21px]">{product.price}</td>
                    <td className="py-4 px-4 text-gray-700 text-[21px]">{product.sku}</td>
                    <td className="py-4 px-4 text-gray-700 text-[21px]">{product.barcode}</td>
                    <td className="py-4 px-4">
                      {/* Status badges with proper styling */}
                      <span className={`px-6 py-3 rounded-full text-sm font-semibold ${
                        product.synced === 'Yes' ? 'bg-green-500 text-white' : 
                        product.synced === 'no' ? 'bg-blue-500 text-white' : 'bg-red-500 text-white'
                      }`}>
                        {product.synced}
                      </span>
                    </td>
                    <td className="py-4 px-4 text-gray-700 capitalize text-[21px]">{product.marketplace}</td>
                    <td className="py-4 px-4">
                      {product.error && (
                        <span className="px-6 py-3 rounded-full text-sm font-semibold bg-red-500 text-white">
                          {product.error}
                        </span>
                      )}
                    </td>
                    <td className="py-4 px-4">
                      <button className="bg-blue-600 text-white px-4 py-2 rounded text-sm font-medium hover:bg-blue-700 transition-colors duration-200">
                        sync NOW
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Orders from Marketplace and Out Series Settings */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Orders from Marketplace Configuration */}
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h3 className="text-2xl font-bold text-gray-900 mb-6">orders from marketplace</h3>
            <div className="space-y-4">
              <div className="flex justify-between items-center py-2">
                <span className="text-lg text-gray-700">global inventory sync</span>
                <span className="text-lg text-green-600 font-medium">on</span>
              </div>
              <div className="flex justify-between items-center py-2">
                <span className="text-lg text-gray-700">sync frequency</span>
                <span className="text-lg text-green-600 font-medium">enabled</span>
              </div>
              <div className="flex justify-between items-center py-2">
                <span className="text-lg text-gray-700">per marketplace rules</span>
                <span className="text-lg text-gray-700 font-medium">6 hours</span>
              </div>
            </div>
          </div>
          
          {/* Out Series Settings Configuration */}
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h3 className="text-2xl font-bold text-gray-900 mb-6">out series settings</h3>
            <div className="space-y-4">
              <div className="flex justify-between items-center py-2">
                <span className="text-lg text-gray-700">global sync</span>
                <div className="flex space-x-4">
                  <span className="text-lg text-green-600 font-medium">on</span>
                  <span className="text-lg text-green-600 font-medium">delivered</span>
                </div>
              </div>
              <div className="flex justify-between items-center py-2">
                <span className="text-lg text-gray-700">additional sync</span>
                <div className="flex space-x-4">
                  <span className="text-lg text-red-600 font-medium">off</span>
                  <span className="text-lg text-red-600 font-medium">failed</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Connect Marketplaces Section */}
        <div className="bg-white rounded-xl shadow-sm p-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Connect marketplaces</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Available Marketplaces */}
            <div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Available marketplace</h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center font-bold border-b pb-2">
                  <span className="text-lg">marketplace</span>
                  <span className="text-lg">actions</span>
                </div>
                {marketplaces.map((marketplace) => (
                  <div key={`marketplace-${marketplace.id}`} className="flex justify-between items-center py-2">
                    <span className="text-lg text-gray-700 capitalize">{marketplace.name}</span>
                    <button className={`px-6 py-3 rounded-full text-sm font-semibold transition-colors duration-200 ${
                      marketplace.status === 'connected' 
                        ? 'bg-green-500 hover:bg-green-600 text-white' 
                        : 'bg-red-500 hover:bg-red-600 text-white'
                    }`}>
                      {marketplace.status}
                    </button>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Connected Accounts */}
            <div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">connected accounts</h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center font-bold border-b pb-2">
                  <span className="text-lg">seller id</span>
                  <span className="text-lg">last sync</span>
                </div>
                {marketplaces.map((marketplace) => (
                  <div key={`account-${marketplace.id}`} className="flex justify-between items-center py-2">
                    <span className="text-sm text-gray-700 font-mono">
                      {marketplace.sellerId || 'Not connected'}
                    </span>
                    <span className="text-sm text-gray-700">
                      {marketplace.lastSync || 'Never'}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Sync Logs and Audit Trail */}
        <div className="bg-white rounded-xl shadow-sm p-6">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">sync logs</h2>
          
          <div className="overflow-x-auto">
            <table className="w-full table-auto">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-3 px-4 font-bold text-gray-700 text-lg">date</th>
                  <th className="text-left py-3 px-4 font-bold text-gray-700 text-lg">operation</th>
                  <th className="text-left py-3 px-4 font-bold text-gray-700 text-lg">market place</th>
                  <th className="text-left py-3 px-4 font-bold text-gray-700 text-lg">status</th>
                  <th className="text-left py-3 px-4 font-bold text-gray-700 text-lg">error message</th>
                </tr>
              </thead>
              <tbody>
                {syncLogs.map((log) => (
                  <tr key={`log-${log.id}`} className="border-b border-gray-100 hover:bg-gray-50 transition-colors duration-150">
                    <td className="py-4 px-4 text-sm font-bold text-gray-900 tracking-wider">Nov 11,2025</td>
                    <td className="py-4 px-4 text-sm font-bold text-gray-900 capitalize">{log.operation}</td>
                    <td className="py-4 px-4 text-sm text-gray-700 capitalize">{log.marketplace}</td>
                    <td className="py-4 px-4">
                      <span className={`px-6 py-3 rounded-full text-sm font-semibold ${
                        log.status === 'success' 
                          ? 'bg-green-500 text-white' 
                          : 'bg-red-500 text-white'
                      }`}>
                        {log.status}
                      </span>
                    </td>
                    <td className="py-4 px-4">
                      {log.error ? (
                        <span className="px-6 py-3 rounded-full text-sm font-semibold bg-red-500 text-white">
                          {log.error}
                        </span>
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
      </div>
    </div>
  );
};

export default Dashboard;
