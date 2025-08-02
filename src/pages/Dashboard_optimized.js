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
 * - Component extraction for better maintainability
 */

// Constants
const TIME_PERIODS = ['07 Days', '30 Days', '6 Months', '7 Days'];
const MONTHS = ['October', 'November', 'December'];

// Table Headers
const PRODUCT_SYNC_HEADERS = [
  'Image', 'product name', 'Price', 'SKU', 
  'barcode no.', 'synced', 'marketplace', 'error', 'action'
];

const SYNC_LOG_HEADERS = [
  'date', 'operation', 'market place', 'status', 'error message'
];

// Status Colors Configuration
const STATUS_COLORS = {
  success: 'bg-green-500 text-white',
  error: 'bg-red-500 text-white',
  warning: 'bg-yellow-500 text-white',
  info: 'bg-blue-500 text-white',
  Yes: 'bg-green-500 text-white',
  no: 'bg-blue-500 text-white',
  sync: 'bg-red-500 text-white',
  fail: 'bg-red-500 text-white',
  connected: 'bg-green-500 hover:bg-green-600 text-white',
  'not connected': 'bg-red-500 hover:bg-red-600 text-white'
};

const Dashboard = () => {
  // State management for UI interactions
  const [selectedTimeRange, setSelectedTimeRange] = useState('07 Days');
  const [searchTerm, setSearchTerm] = useState('');

  // Data hooks - Centralized data management
  const { stats, smsStats, analyticsData } = useDashboardData();
  const { productSyncData, marketplaces, syncLogs } = useMarketplaceData();

  // Filtered data based on search
  const filteredProducts = useMemo(() => {
    if (!searchTerm) return productSyncData;
    return productSyncData.filter(product => 
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.marketplace.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.sku.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [productSyncData, searchTerm]);

  // Event handlers
  const handleTimeRangeChange = useCallback((period) => {
    setSelectedTimeRange(period);
  }, []);

  const handleSearchChange = useCallback((event) => {
    setSearchTerm(event.target.value);
  }, []);

  return (
    <div className="bg-gray-50 min-h-screen">
      <DashboardHeader />
      <div className="px-6 py-6 space-y-6">
        <StatsGrid stats={stats} />
        <SMSStatsSection smsStats={smsStats} />
        <SalesAnalyticsSection 
          analyticsData={analyticsData}
          selectedTimeRange={selectedTimeRange}
          onTimeRangeChange={handleTimeRangeChange}
        />
        <ProductSyncSection 
          productSyncData={filteredProducts} 
          searchTerm={searchTerm}
          onSearchChange={handleSearchChange}
        />
        <MarketplaceSettingsSection />
        <MarketplaceConnectionsSection marketplaces={marketplaces} />
        <SyncLogsSection syncLogs={syncLogs} />
      </div>
    </div>
  );
};

// Custom hooks for data management
const useDashboardData = () => {
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

  const smsStats = useMemo(() => [
    { title: 'SMS Sent', value: '50,000' },
    { title: 'Delivery Report', value: '35%' },
    { title: 'Promotional SMS', value: '₹ 3345' },
    { title: 'Transactional SMS', value: '₹ 778' }
  ], []);

  const analyticsData = useMemo(() => [
    { title: 'Visitor', value: '395', growth: '348.9', growthType: 'up' },
    { title: 'New Visitors', value: '932', growth: '565.7', growthType: 'up' },
    { title: 'Average engagement time', value: '1m 50', growth: '250.1', growthType: 'down' },
    { title: 'Total Visitors', value: '150K', growth: null, growthType: null }
  ], []);

  return { stats, smsStats, analyticsData };
};

const useMarketplaceData = () => {
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

  const marketplaces = useMemo(() => [
    { id: 1, name: 'amazon', sellerId: '1234', status: 'connected', lastSync: '02.03pm' },
    { id: 2, name: 'flipkart', sellerId: '5678', status: 'not connected', lastSync: null },
    { id: 3, name: 'ajio', sellerId: '4587', status: 'connected', lastSync: null },
    { id: 4, name: 'myntra', sellerId: null, status: 'not connected', lastSync: null },
    { id: 5, name: 'nykaa', sellerId: null, status: 'not connected', lastSync: null }
  ], []);

  const syncLogs = useMemo(() => [
    { id: 1, date: 'Nov 11,2025', operation: 'product sync', marketplace: 'amazon', status: 'success', error: null },
    { id: 2, date: 'Nov 11,2025', operation: 'inventory sync', marketplace: 'flipkart', status: 'fail', error: 'connection timeout' },
    { id: 3, date: 'Nov 11,2025', operation: 'product sync', marketplace: 'ajio', status: 'fail', error: 'invalid credentials' }
  ], []);

  return { productSyncData, marketplaces, syncLogs };
};

// UI Components
const DashboardHeader = React.memo(() => (
  <div className="bg-white px-6 py-4 shadow-sm">
    <div className="flex justify-between items-center">
      <HeaderInfo />
      <CreateCampaignButton />
    </div>
  </div>
));

const HeaderInfo = React.memo(() => (
  <div>
    <h1 className="text-2xl font-bold text-gray-900 mb-1">Dashboard/ analytics</h1>
    <div className="flex items-center space-x-2 text-sm text-gray-600">
      <Calendar className="h-4 w-4" />
      <span>Nov 11,2025-Nov 27 2025</span>
    </div>
  </div>
));

const CreateCampaignButton = React.memo(() => (
  <button className="bg-[#101316] text-white px-4 py-2 rounded-md flex items-center space-x-2 hover:bg-gray-800 transition-colors duration-200">
    <Plus className="h-4 w-4" />
    <span className="text-sm font-semibold">Create Campaign</span>
  </button>
));

const StatsGrid = React.memo(({ stats }) => (
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
    {stats.map((stat, index) => (
      <StatCard key={`stat-${index}`} stat={stat} />
    ))}
  </div>
));

const StatCard = React.memo(({ stat }) => {
  const Icon = stat.icon;
  return (
    <div className="bg-white rounded-2xl shadow-sm p-6 hover:shadow-md transition-shadow duration-200">
      <div className="flex items-center justify-between mb-4">
        <div className={`p-3 rounded-full ${stat.color}`}>
          <Icon className="h-6 w-6 text-white" />
        </div>
      </div>
      <StatContent stat={stat} />
    </div>
  );
});

const StatContent = React.memo(({ stat }) => (
  <div>
    <p className="text-base font-semibold text-[#202224] opacity-70 mb-1">{stat.title}</p>
    <p className="text-3xl font-bold text-[#202224] tracking-wide mb-3">{stat.value}</p>
    <StatChange stat={stat} />
  </div>
));

const StatChange = React.memo(({ stat }) => (
  <div className="flex items-center">
    <TrendIcon changeType={stat.changeType} />
    <span className={`text-base font-semibold ${
      stat.changeType === 'increase' ? 'text-[#00b69b]' : 'text-[#f93c65]'
    }`}>
      {stat.change}
    </span>
    <span className="text-base text-[#606060] ml-1">{stat.period}</span>
  </div>
));

const TrendIcon = React.memo(({ changeType }) => (
  changeType === 'increase' ? (
    <TrendingUp className="h-4 w-4 text-green-500 mr-1" />
  ) : (
    <TrendingDown className="h-4 w-4 text-red-500 mr-1" />
  )
));

const SMSStatsSection = React.memo(({ smsStats }) => (
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
));

const SalesAnalyticsSection = React.memo(({ analyticsData, selectedTimeRange, onTimeRangeChange }) => (
  <div className="bg-white rounded-xl shadow-sm p-6">
    <div className="flex justify-between items-center mb-6">
      <h3 className="text-xl font-bold text-gray-900">Sales Details</h3>
      <div className="flex items-center space-x-2">
        <select className="border border-gray-300 rounded px-3 py-1 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
          {MONTHS.map(month => (
            <option key={month} value={month}>{month}</option>
          ))}
        </select>
      </div>
    </div>
    
    <div className="h-64 bg-gray-100 rounded-lg flex items-center justify-center mb-6 hover:bg-gray-50 transition-colors duration-200">
      <div className="text-center">
        <BarChart3 className="h-16 w-16 text-gray-400 mx-auto mb-2" />
        <p className="text-gray-500 text-sm">Chart visualization area</p>
      </div>
    </div>

    <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
      {analyticsData.map((item, index) => (
        <div key={`analytics-${index}`}>
          <p className="text-sm font-semibold text-[#9aa0a6] mb-1 tracking-wider">{item.title}</p>
          <p className="text-xl font-semibold text-[#9aa0a6] mb-1">{item.value}</p>
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

    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
      <h4 className="font-bold text-gray-900">Views Report</h4>
      <div className="flex flex-wrap gap-2">
        {TIME_PERIODS.map((period) => (
          <button
            key={period}
            className={`px-4 py-2 rounded text-xs font-bold transition-all duration-200 ${
              selectedTimeRange === period
                ? 'bg-zinc-900 text-white border border-zinc-400'
                : 'bg-white text-zinc-500 border border-zinc-400 hover:bg-gray-50'
            }`}
            onClick={() => onTimeRangeChange(period)}
          >
            {period}
          </button>
        ))}
        <button className="px-4 py-2 rounded text-xs font-bold bg-white border border-zinc-300 text-zinc-900 hover:bg-gray-50 transition-colors duration-200">
          Export PDF
        </button>
      </div>
    </div>
  </div>
));

const ProductSyncSection = React.memo(({ productSyncData, searchTerm, onSearchChange }) => (
  <div className="bg-white rounded-xl shadow-sm p-6">
    <h2 className="text-3xl font-bold text-gray-900 mb-6">product sync manager</h2>
    
    <SearchInput searchTerm={searchTerm} onSearchChange={onSearchChange} />

    <ProductSyncTable productSyncData={productSyncData} />
  </div>
));

const SearchInput = React.memo(({ searchTerm, onSearchChange }) => (
  <div className="mb-6">
    <div className="relative max-w-md">
      <Search className="h-5 w-5 absolute left-3 top-3 text-gray-400" />
      <input
        type="text"
        placeholder="Search products, marketplace, or SKU..."
        value={searchTerm}
        onChange={onSearchChange}
        className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200"
      />
    </div>
  </div>
));

const ProductSyncTable = React.memo(({ productSyncData }) => (
  <div className="overflow-x-auto">
    <table className="w-full table-auto">
      <TableHeader headers={PRODUCT_SYNC_HEADERS} />
      <tbody>
        {productSyncData.map((product) => (
          <ProductSyncRow key={`product-${product.id}`} product={product} />
        ))}
      </tbody>
    </table>
  </div>
));

const TableHeader = React.memo(({ headers, headerClass = "font-normal text-[15px] text-black" }) => (
  <thead>
    <tr className="border-b border-gray-200">
      {headers.map(header => (
        <th key={header} className={`text-left py-3 px-4 ${headerClass}`}>
          {header}
        </th>
      ))}
    </tr>
  </thead>
));

const ProductSyncRow = React.memo(({ product }) => (
  <tr className="border-b border-gray-100 hover:bg-gray-50 transition-colors duration-150">
    <ProductImage />
    <ProductDetails product={product} />
    <SyncActions product={product} />
  </tr>
));

const ProductImage = React.memo(() => (
  <td className="py-4 px-4">
    <div className="w-16 h-16 bg-gray-200 rounded-lg flex items-center justify-center">
      <Package className="h-8 w-8 text-gray-400" />
    </div>
  </td>
));

const ProductDetails = React.memo(({ product }) => (
  <>
    <td className="py-4 px-4 font-medium text-gray-900 text-[21px]">{product.name}</td>
    <td className="py-4 px-4 text-gray-700 text-[21px]">{product.price}</td>
    <td className="py-4 px-4 text-gray-700 text-[21px]">{product.sku}</td>
    <td className="py-4 px-4 text-gray-700 text-[21px]">{product.barcode}</td>
    <td className="py-4 px-4">
      <StatusBadge status={product.synced} />
    </td>
    <td className="py-4 px-4 text-gray-700 capitalize text-[21px]">{product.marketplace}</td>
  </>
));

const SyncActions = React.memo(({ product }) => (
  <>
    <td className="py-4 px-4">
      {product.error && <StatusBadge status={product.error} type="error" />}
    </td>
    <td className="py-4 px-4">
      <SyncButton />
    </td>
  </>
));

const SyncButton = React.memo(() => (
  <button className="bg-blue-600 text-white px-4 py-2 rounded text-sm font-medium hover:bg-blue-700 transition-colors duration-200">
    sync NOW
  </button>
));

const StatusBadge = React.memo(({ status, type = 'status' }) => {
  const getStatusColor = (status, type) => {
    if (type === 'error') return STATUS_COLORS.error;
    return STATUS_COLORS[status] || STATUS_COLORS.error;
  };

  return (
    <span className={`px-6 py-3 rounded-full text-sm font-semibold ${getStatusColor(status, type)}`}>
      {status}
    </span>
  );
});

const MarketplaceSettingsSection = React.memo(() => (
  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
    <SettingsCard 
      title="orders from marketplace"
      settings={[
        { label: 'global inventory sync', value: 'on', type: 'success' },
        { label: 'sync frequency', value: 'enabled', type: 'success' },
        { label: 'per marketplace rules', value: '6 hours', type: 'neutral' }
      ]}
    />
    <SettingsCard 
      title="out series settings"
      settings={[
        { label: 'global sync', values: ['on', 'delivered'], types: ['success', 'success'] },
        { label: 'additional sync', values: ['off', 'failed'], types: ['error', 'error'] }
      ]}
    />
  </div>
));

const SettingsCard = React.memo(({ title, settings }) => (
  <div className="bg-white rounded-xl shadow-sm p-6">
    <h3 className="text-2xl font-bold text-gray-900 mb-6">{title}</h3>
    <div className="space-y-4">
      {settings.map((setting, index) => (
        <div key={index} className="flex justify-between items-center py-2">
          <span className="text-lg text-gray-700">{setting.label}</span>
          {setting.values ? (
            <div className="flex space-x-4">
              {setting.values.map((value, valueIndex) => (
                <span key={valueIndex} className={`text-lg font-medium ${
                  setting.types[valueIndex] === 'success' ? 'text-green-600' : 'text-red-600'
                }`}>
                  {value}
                </span>
              ))}
            </div>
          ) : (
            <span className={`text-lg font-medium ${
              setting.type === 'success' ? 'text-green-600' : 
              setting.type === 'error' ? 'text-red-600' : 'text-gray-700'
            }`}>
              {setting.value}
            </span>
          )}
        </div>
      ))}
    </div>
  </div>
));

const MarketplaceConnectionsSection = React.memo(({ marketplaces }) => (
  <div className="bg-white rounded-xl shadow-sm p-6">
    <h2 className="text-2xl font-bold text-gray-900 mb-6">Connect marketplaces</h2>
    
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      <MarketplaceList 
        title="Available marketplace"
        headers={['marketplace', 'actions']}
        data={marketplaces}
        renderRow={(marketplace) => (
          <MarketplaceActions marketplace={marketplace} />
        )}
      />
      
      <MarketplaceList 
        title="connected accounts"
        headers={['seller id', 'last sync']}
        data={marketplaces}
        renderRow={(marketplace) => (
          <MarketplaceAccountInfo marketplace={marketplace} />
        )}
      />
    </div>
  </div>
));

const MarketplaceActions = React.memo(({ marketplace }) => (
  <>
    <span className="text-lg text-gray-700 capitalize">{marketplace.name}</span>
    <button className={`px-6 py-3 rounded-full text-sm font-semibold transition-colors duration-200 ${
      STATUS_COLORS[marketplace.status] || STATUS_COLORS['not connected']
    }`}>
      {marketplace.status}
    </button>
  </>
));

const MarketplaceAccountInfo = React.memo(({ marketplace }) => (
  <>
    <span className="text-sm text-gray-700 font-mono">
      {marketplace.sellerId || 'Not connected'}
    </span>
    <span className="text-sm text-gray-700">
      {marketplace.lastSync || 'Never'}
    </span>
  </>
));

const MarketplaceList = React.memo(({ title, headers, data, renderRow }) => (
  <div>
    <h3 className="text-xl font-bold text-gray-900 mb-4">{title}</h3>
    <div className="space-y-4">
      <div className="flex justify-between items-center font-bold border-b pb-2">
        {headers.map(header => (
          <span key={header} className="text-lg">{header}</span>
        ))}
      </div>
      {data.map((item) => (
        <div key={`${title}-${item.id}`} className="flex justify-between items-center py-2">
          {renderRow(item)}
        </div>
      ))}
    </div>
  </div>
));

const SyncLogsSection = React.memo(({ syncLogs }) => (
  <div className="bg-white rounded-xl shadow-sm p-6">
    <h2 className="text-3xl font-bold text-gray-900 mb-6">sync logs</h2>
    
    <div className="overflow-x-auto">
      <table className="w-full table-auto">
        <TableHeader headers={SYNC_LOG_HEADERS} headerClass="font-bold text-gray-700 text-lg" />
        <tbody>
          {syncLogs.map((log) => (
            <SyncLogRow key={`log-${log.id}`} log={log} />
          ))}
        </tbody>
      </table>
    </div>
  </div>
));

const SyncLogRow = React.memo(({ log }) => (
  <tr className="border-b border-gray-100 hover:bg-gray-50 transition-colors duration-150">
    <LogDateCell />
    <LogDataCells log={log} />
    <LogStatusCells log={log} />
  </tr>
));

const LogDateCell = React.memo(() => (
  <td className="py-4 px-4 text-sm font-bold text-gray-900 tracking-wider">
    Nov 11,2025
  </td>
));

const LogDataCells = React.memo(({ log }) => (
  <>
    <td className="py-4 px-4 text-sm font-bold text-gray-900 capitalize">{log.operation}</td>
    <td className="py-4 px-4 text-sm text-gray-700 capitalize">{log.marketplace}</td>
  </>
));

const LogStatusCells = React.memo(({ log }) => (
  <>
    <td className="py-4 px-4">
      <StatusBadge status={log.status} />
    </td>
    <td className="py-4 px-4">
      {log.error ? (
        <StatusBadge status={log.error} type="error" />
      ) : (
        <span className="text-gray-400 text-sm">No errors</span>
      )}
    </td>
  </>
));

export default Dashboard;
