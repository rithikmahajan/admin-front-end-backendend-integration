import React, { useState } from 'react';

const DatabaseDashboardInlineStyles = () => {
  const [activeTab, setActiveTab] = useState('users');

  return (
    <div style={{
      padding: '20px',
      backgroundColor: '#f9fafb',
      minHeight: '100vh'
    }}>
      <div style={{
        maxWidth: '1200px',
        margin: '0 auto'
      }}>
        <div style={{
          backgroundColor: 'white',
          borderRadius: '8px',
          border: '1px solid #e5e7eb',
          boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
        }}>
          {/* Header */}
          <div style={{
            borderBottom: '1px solid #e5e7eb',
            padding: '20px'
          }}>
            <h1 style={{
              fontSize: '24px',
              fontWeight: 'bold',
              color: '#111827',
              margin: 0
            }}>
              📊 Database Dashboard (Inline Styles)
            </h1>
          </div>

          {/* Tab Navigation */}
          <div style={{
            borderBottom: '1px solid #e5e7eb',
            padding: '0 20px'
          }}>
            <div style={{ display: 'flex', gap: '30px' }}>
              {[
                { key: 'users', label: '👤 User Data' },
                { key: 'orders', label: '🛒 Order Data' },
                { key: 'products', label: '📦 Product Data' }
              ].map(({ key, label }) => (
                <button
                  key={key}
                  onClick={() => setActiveTab(key)}
                  style={{
                    padding: '15px 8px',
                    border: 'none',
                    background: 'none',
                    borderBottom: activeTab === key ? '2px solid #3b82f6' : '2px solid transparent',
                    color: activeTab === key ? '#3b82f6' : '#6b7280',
                    fontWeight: '500',
                    cursor: 'pointer',
                    fontSize: '14px'
                  }}
                >
                  {label}
                </button>
              ))}
            </div>
          </div>

          {/* Content Area */}
          <div style={{ padding: '20px' }}>
            {activeTab === 'users' && (
              <div>
                <h2 style={{
                  fontSize: '18px',
                  fontWeight: '600',
                  color: '#111827',
                  marginBottom: '15px'
                }}>
                  User Data View
                </h2>
                <p style={{ color: '#6b7280', marginBottom: '15px' }}>
                  User data content would go here...
                </p>
                <div style={{
                  padding: '15px',
                  backgroundColor: '#dbeafe',
                  border: '1px solid #93c5fd',
                  borderRadius: '6px'
                }}>
                  <p style={{ color: '#1e40af', margin: 0 }}>
                    ✅ DatabaseDashboard (inline styles) is working!
                  </p>
                </div>
              </div>
            )}
            
            {activeTab === 'orders' && (
              <div>
                <h2 style={{
                  fontSize: '18px',
                  fontWeight: '600',
                  color: '#111827',
                  marginBottom: '15px'
                }}>
                  Order Data View
                </h2>
                <p style={{ color: '#6b7280' }}>
                  Order data content would go here...
                </p>
              </div>
            )}
            
            {activeTab === 'products' && (
              <div>
                <h2 style={{
                  fontSize: '18px',
                  fontWeight: '600',
                  color: '#111827',
                  marginBottom: '15px'
                }}>
                  Product Data View
                </h2>
                <p style={{ color: '#6b7280' }}>
                  Product data content would go here...
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DatabaseDashboardInlineStyles;
