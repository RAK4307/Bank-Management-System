import React, { useState } from 'react';
import { Link, Outlet, useNavigate, useLocation } from 'react-router-dom';
import Footer from '../end/footer';
import './body.css';

const Body = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const navigate = useNavigate();

  // Get user data from localStorage
  const user = JSON.parse(localStorage.getItem('user')) || {};
  const {
    first_name = 'N/A',
    last_name = '',
    gender = 'N/A',
    phone = 'N/A',
    email = 'N/A',
    address = 'N/A',
    account_number = 'N/A'
  } = user;
  const name = `${first_name} ${last_name}`.trim();

  // Get the current nested route path
  const { pathname } = useLocation();
  const isDashboardRoot = pathname === '/dashboard';

  const handleLogout = () => {
    localStorage.removeItem('user');
    navigate('/');
  };

  return (
    <div className="dashboard-container">
      {/* Navbar */}
      <nav className="dashboard-navbar">
        <span className="sidebar-toggle" onClick={() => setSidebarOpen(true)}>&#9776;</span>
        <button className="btn logout-btn" onClick={handleLogout}>Logout</button>
      </nav>

      {/* Sidebar */}
      <aside className={`dashboard-sidebar-float${sidebarOpen ? ' open' : ''}`}>
        <div className="sidebar-user-img">
          <img
            src="https://png.pngtree.com/png-vector/20190223/ourmid/pngtree-profile-line-black-icon-png-image_691051.jpg"
            alt="User"
            className="nav-user-img"
          />
        </div>
        <nav className="sidebar-nav">
          <Link
            to="profile"
            state={{ name, gender, phone, email, address, account_number }}
            onClick={() => setSidebarOpen(false)}
          >
            Profile
          </Link>
          <Link to="deposite" onClick={() => setSidebarOpen(false)}>Deposit</Link>
          <Link to="balance" onClick={() => setSidebarOpen(false)}>Check Balance</Link>
          <Link to="withdraw" onClick={() => setSidebarOpen(false)}>Withdraw</Link>
          <Link to="transactions" onClick={() => setSidebarOpen(false)}>Transactions</Link>
        </nav>
      </aside>

      {/* Overlay to close sidebar */}
      {sidebarOpen && <div className="sidebar-overlay" onClick={() => setSidebarOpen(false)}></div>}

      {/* Main Content */}
      <main className="dashboard-profile-main">
        <h2>Welcome to the Dashboard</h2>
        {isDashboardRoot && (
          <div className="profile-info">
            <div><strong>Name:</strong> {name}</div>
            <div><strong>Account Number:</strong> {account_number}</div>
            <div><strong>Gender:</strong> {gender}</div>
            <div><strong>Phone:</strong> {phone}</div>
            <div><strong>Email:</strong> {email}</div>
            <div><strong>Address:</strong> {address}</div>
          </div>
        )}
        <div className="main-data">
          <Outlet />
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Body;