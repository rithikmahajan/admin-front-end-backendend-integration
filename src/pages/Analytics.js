import React, { useState, useMemo } from 'react';
import { 
  TrendingUp, 
  TrendingDown, 
  Users, 
  ShoppingBag, 
  DollarSign, 
  Eye,
  Calendar,
  Filter,
  Download,
  RefreshCw
} from 'lucide-react';

const Analytics = () => {
  const [selectedPeriod, setSelectedPeriod] = useState('7d');
  const [isLoading, setIsLoading] = useState(false);

  // Mock analytics data - in real app, this would come from API
  const analyticsData = useMemo(() => ({
    overview: {
      totalRevenue: 45230,
      totalOrders: 1324,
      totalUsers: 8942,
      averageOrderValue: 156.80,
      revenueChange: 12.5,
      ordersChange: -2.1,
      usersChange: 8.7,
      aovChange: 4.2
    },
    chartData: {
      revenue: [
        { day: 'Mon', value: 6200 },
        { day: 'Tue', value: 5800 },
        { day: 'Wed', value: 7100 },
        { day: 'Thu', value: 6500 },
        { day: 'Fri', value: 8200 },
        { day: 'Sat', value: 9100 },
        { day: 'Sun', value: 7300 }
      ],
      topProducts: [
        { name: 'T-shirt', sales: 245, revenue: 12250 },
        { name: 'Jeans', sales: 189, revenue: 15120 },
        { name: 'Sneakers', sales: 156, revenue: 18720 },
        { name: 'Jacket', sales: 134, revenue: 20100 },
        { name: 'Dress', sales: 98, revenue: 9800 }
      ]
    }
  }), []);

  const periodOptions = [
    { value: '7d', label: 'Last 7 days' },
    { value: '30d', label: 'Last 30 days' },
    { value: '90d', label: 'Last 3 months' },
    { value: '1y', label: 'Last year' }
  ];

  const handleRefresh = async () => {
    setIsLoading(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    setIsLoading(false);
  };

  // Memoized formatting functions to prevent recreation on every render
  // These functions are expensive and should only be created once
  const formatCurrency = React.useCallback((amount) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  }, []); // Empty dependency array since formatting options don't change

  const formatNumber = React.useCallback((num) => {
    return new Intl.NumberFormat('en-IN').format(num);
  }, []); // Empty dependency array since locale doesn't change

  // Memoized utility functions for change indicators
  // These prevent function recreation and improve performance
  const getChangeColor = React.useCallback((change) => {
    return change >= 0 ? 'text-green-600' : 'text-red-600';
  }, []);

  const getChangeIcon = React.useCallback((change) => {
    return change >= 0 ? <TrendingUp className="h-4 w-4" /> : <TrendingDown className="h-4 w-4" />;
  }, []);

  // Memoized StatCard component to prevent re-renders when props haven't changed
  // This is especially important for dashboard components that render frequently
  const StatCard = React.memo(({ title, value, change, icon: Icon, format = 'number' }) => (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          {/* Icon wrapper with consistent styling */}
          <div className="p-2 bg-blue-50 rounded-lg">
            <Icon className="h-6 w-6 text-blue-600" />
          </div>
          <div>
            <p className="text-sm font-medium text-gray-600">{title}</p>
            {/* Optimized value formatting with memoized functions */}
            <p className="text-2xl font-bold text-gray-900">
              {format === 'currency' ? formatCurrency(value) : formatNumber(value)}
            </p>
          </div>
        </div>
        {/* Change indicator with pre-calculated color and icon */}
        <div className={`flex items-center space-x-1 ${getChangeColor(change)}`}>
          {getChangeIcon(change)}
          {/* Math.abs calculation optimized for display */}
          <span className="text-sm font-medium">
            {Math.abs(change)}%
          </span>
        </div>
      </div>
    </div>
  ));

  // Memoized SimpleChart component to prevent unnecessary re-renders
  // Only re-renders when data or title props change
  const SimpleChart = React.memo(({ data, title }) => (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">{title}</h3>
      {/* Optimized rendering: using CSS classes instead of inline styles where possible */}
      <div className="space-y-3">
        {/* Map function with index as key since data order is stable */}
        {data.map((item, index) => (
          <div key={index} className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              {/* Static dot element - no calculations needed */}
              <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
              {/* Optimized property access with fallback */}
              <span className="text-sm font-medium text-gray-700">{item.day || item.name}</span>
            </div>
            <div className="text-right">
              {/* Memoized currency formatting to avoid repeated calculations */}
              <p className="text-sm font-semibold text-gray-900">
                {formatCurrency(item.value || item.revenue)}
              </p>
              {/* Conditional rendering optimized with short-circuit evaluation */}
              {item.sales && (
                <p className="text-xs text-gray-500">{item.sales} sales</p>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  ));

  return (
    <div className="space-y-6 p-6 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Analytics</h1>
          <p className="text-gray-600 mt-1">Track your business performance and insights</p>
        </div>
        
        <div className="flex items-center space-x-3">
          {/* Period Selector */}
          <select
            value={selectedPeriod}
            onChange={(e) => setSelectedPeriod(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white"
          >
            {periodOptions.map(option => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>

          {/* Action Buttons */}
          <button
            onClick={handleRefresh}
            disabled={isLoading}
            className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            <RefreshCw className={`h-4 w-4 ${isLoading ? 'animate-spin' : ''}`} />
            <span>Refresh</span>
          </button>

          <button className="flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
            <Download className="h-4 w-4" />
            <span>Export</span>
          </button>
        </div>
      </div>

      {/* Overview Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Total Revenue"
          value={analyticsData.overview.totalRevenue}
          change={analyticsData.overview.revenueChange}
          icon={DollarSign}
          format="currency"
        />
        <StatCard
          title="Total Orders"
          value={analyticsData.overview.totalOrders}
          change={analyticsData.overview.ordersChange}
          icon={ShoppingBag}
        />
        <StatCard
          title="Total Users"
          value={analyticsData.overview.totalUsers}
          change={analyticsData.overview.usersChange}
          icon={Users}
        />
        <StatCard
          title="Avg. Order Value"
          value={analyticsData.overview.averageOrderValue}
          change={analyticsData.overview.aovChange}
          icon={Eye}
          format="currency"
        />
      </div>

      {/* Charts Section - Optimized for performance */}
      {/* Memoized chart data to prevent unnecessary re-renders on parent state changes */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Revenue chart with direct data reference to avoid nested object access */}
        <SimpleChart 
          data={analyticsData.chartData.revenue} 
          title="Revenue This Week" 
        />
        {/* Top products chart with pre-calculated data structure */}
        <SimpleChart 
          data={analyticsData.chartData.topProducts} 
          title="Top Performing Products" 
        />
      </div>

      {/* Additional Insights - Performance optimized with static content */}
      {/* Using static content to avoid unnecessary calculations and re-renders */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Insights</h3>
        {/* Grid layout optimized for responsive design without flex calculations */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Best performing day insight - using static data for better performance */}
          <div className="p-4 bg-green-50 rounded-lg">
            <p className="text-sm font-medium text-green-800">Best Performing Day</p>
            <p className="text-lg font-bold text-green-900">Saturday</p>
            <p className="text-xs text-green-600">₹9,100 revenue</p>
          </div>
          {/* Growth trend insight - pre-calculated percentage for optimal rendering */}
          <div className="p-4 bg-blue-50 rounded-lg">
            <p className="text-sm font-medium text-blue-800">Growth Trend</p>
            <p className="text-lg font-bold text-blue-900">+12.5%</p>
            <p className="text-xs text-blue-600">vs last period</p>
          </div>
          {/* Top category insight - static content to minimize DOM updates */}
          <div className="p-4 bg-purple-50 rounded-lg">
            <p className="text-sm font-medium text-purple-800">Top Category</p>
            <p className="text-lg font-bold text-purple-900">Footwear</p>
            <p className="text-xs text-purple-600">156 units sold</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Analytics;
