import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../css/admin-overview.css';

import AdminProducts from './admin-products';
import AdminCustomers from './admin-customers';
import AdminFeedback from './admin-feedback';
import AdminOrders from './orders';
import SalesDashboard from './statistics';
import Overview from './overview';
import Stores from './stores';

const menuItems = [
  'Overview',
  'Statistics',
  'Customers',
  'Products',
  'Feedback',
  'Orders',
  'Store'
];

const AdminOverview = () => {
  const navigate = useNavigate();
  const initialTab =
    localStorage.getItem('redirectToOrders') === 'true' ? 'Orders' : 'Overview';
  const [activeTab, setActiveTab] = useState(initialTab);

  // Clear redirect flag on load
  useEffect(() => {
    if (localStorage.getItem('redirectToOrders') === 'true') {
      localStorage.removeItem('redirectToOrders');
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('storeId');
    localStorage.removeItem('authToken');
    navigate('/');
  };

  return (
    <div className="admin-container">
      {/* Sidebar */}
      <aside className="sidebar">
        <h2 className="sidebar-title">DUKAANIFY</h2>
        <nav className="sidebar-menu">
          {menuItems.map(item => (
            <button
              key={item}
              className={`sidebar-link ${activeTab === item ? 'active' : ''}`}
              onClick={() => setActiveTab(item)}
            >
              {item}
            </button>
          ))}
          <button className="logout-btn" onClick={handleLogout}>
            Logout
          </button>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="admin-main">
        {activeTab === 'Overview' && <Overview />}
        {activeTab === 'Statistics' && <SalesDashboard />}
        {activeTab === 'Customers' && <AdminCustomers />}
        {activeTab === 'Products' && <AdminProducts />}
        {activeTab === 'Orders' && <AdminOrders />}
        {activeTab === 'Feedback' && <AdminFeedback />}
        {activeTab === 'Store' && <Stores />}
      </main>
    </div>
  );
};

export default AdminOverview;
