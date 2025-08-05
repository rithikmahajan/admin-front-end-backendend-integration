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

// Simplified DatabaseDashboard without modals to test
const DatabaseDashboardNoModals = () => {
  const [activeTab, setActiveTab] = useState('users');

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200">
          <div className="border-b border-gray-200 px-6 py-4">
            <div className="flex items-center justify-between">
              <h1 className="text-2xl font-bold text-gray-900">Database Dashboard</h1>
              <div className="flex items-center gap-3">
                <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                  <Download className="w-4 h-4 inline-block mr-2" />
                  Export All
                </button>
              </div>
            </div>
          </div>

          {/* Tab Navigation */}
          <div className="border-b border-gray-200">
            <nav className="flex space-x-8 px-6">
              {[
                { key: 'users', label: 'User Data', icon: User },
                { key: 'orders', label: 'Order Data', icon: ShoppingBag },
                { key: 'products', label: 'Product Data', icon: Package }
              ].map(({ key, label, icon: Icon }) => (
                <button
                  key={key}
                  onClick={() => setActiveTab(key)}
                  className={`flex items-center gap-2 py-4 px-2 border-b-2 font-medium text-sm transition-colors ${
                    activeTab === key
                      ? 'border-blue-500 text-blue-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  {label}
                </button>
              ))}
            </nav>
          </div>

          {/* Content Area */}
          <div className="p-6">
            {activeTab === 'users' && (
              <div>
                <h2 className="text-lg font-semibold text-gray-900 mb-4">User Data View</h2>
                <p className="text-gray-600">User data content would go here...</p>
                <div className="mt-4 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                  <p className="text-blue-700">✅ DatabaseDashboard (no modals) is working!</p>
                </div>
              </div>
            )}
            
            {activeTab === 'orders' && (
              <div>
                <h2 className="text-lg font-semibold text-gray-900 mb-4">Order Data View</h2>
                <p className="text-gray-600">Order data content would go here...</p>
              </div>
            )}
            
            {activeTab === 'products' && (
              <div>
                <h2 className="text-lg font-semibold text-gray-900 mb-4">Product Data View</h2>
                <p className="text-gray-600">Product data content would go here...</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DatabaseDashboardNoModals;
