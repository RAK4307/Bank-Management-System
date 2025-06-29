import React, { useState, useEffect } from 'react';
import './Dashboard.css'; // Assuming you'll create this CSS file
import { BALANCE_UPDATED_EVENT } from '../../utils/events'; // Import the event constant

const Dashboard = () => {
  const [userFirstName, setUserFirstName] = useState('');
  const [accountNumber, setAccountNumber] = useState('');
  const [balance, setBalance] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const updateDashboardData = (event) => {
      console.log(`[Dashboard] updateDashboardData called by: ${event ? event.type : 'Initial Load'}`);

      // If this is a custom event, use the new balance from the event detail.
      // This is the most direct way to update the balance from same-tab actions.
      if (event && event.type === BALANCE_UPDATED_EVENT && event.detail && event.detail.newBalance !== undefined) {
        console.log('[Dashboard] Updating balance from custom event detail:', event.detail.newBalance);
        setBalance(Number(event.detail.newBalance));
        // We can return here because other user details (name, account) don't change during a transaction.
        return;
      }

      // For initial load or cross-tab updates, read from localStorage.
      // The 'storage' event is fired when another tab changes localStorage.
      if (event && event.type === 'storage' && event.key !== 'user') {
        return; // Ignore storage events for keys other than 'user'.
      }

      setLoading(true);
      const userString = localStorage.getItem('user');
      if (!userString) {
        console.log('[Dashboard] No user data in localStorage.');
        setError('No user logged in. Please log in to view your dashboard.');
        setUserFirstName('');
        setAccountNumber('');
        setBalance(null);
        setLoading(false);
        return;
      }

      try {
        const user = JSON.parse(userString);
        console.log('[Dashboard] Parsed user from localStorage:', user);
        const balanceToSet = user.balance !== undefined ? Number(user.balance) : null;
        setUserFirstName(user.first_name || 'User');
        setAccountNumber(user.account_number || '');
        setBalance(balanceToSet);
        setError('');
      } catch (e) {
        console.error('[Dashboard] Error parsing user data from localStorage:', e);
        setError('Error loading user data. Please log in again.');
      } finally {
        setLoading(false);
      }
    };

    // Initial load of data
    updateDashboardData(); // Call without an event object for initial load

    console.log('[Dashboard] Attaching event listeners.');
    // Listen for custom balance update event (for same-tab updates)
    window.addEventListener(BALANCE_UPDATED_EVENT, updateDashboardData);
    // Also listen for changes to localStorage (for cross-tab/window updates)
    window.addEventListener('storage', updateDashboardData);

    // Cleanup the event listener when the component unmounts
    return () => {
      console.log('[Dashboard] Detaching event listeners.');
      window.removeEventListener(BALANCE_UPDATED_EVENT, updateDashboardData);
      window.removeEventListener('storage', updateDashboardData);
    };
  }, []);

  if (loading) {
    return <div className="dashboard-container"><p>Loading dashboard...</p></div>;
  }

  return (
    <div className="dashboard-container">
      <h2>Welcome, {userFirstName}!</h2>
      {error && <p className="error-message">{error}</p>}
      {!error && (
        <div className="dashboard-info-card">
          <h3>Account Summary</h3>
          <p>Account Number: <strong>{accountNumber}</strong></p>
          <p>Current Balance: <strong>₹{balance !== null ? balance.toFixed(2) : 'N/A'}</strong></p>
        </div>
      )}
      {/* You can add more dashboard elements here */}
    </div>
  );
};

export default Dashboard;