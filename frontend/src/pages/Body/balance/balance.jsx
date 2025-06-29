import React, { useState, useEffect } from 'react';
import './balance.css';
import { BALANCE_UPDATED_EVENT } from '../../../utils/events'; // Import the event constant

const Balance = () => {
  const [balance, setBalance] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);
  const [accountNumber, setAccountNumber] = useState('');

  useEffect(() => {
    const updateBalanceFromStorage = (event) => { // Event object passed here
      // This function will be called by:
      // 1. Initial mount (event is undefined)
      // 2. Custom event (event.type === BALANCE_UPDATED_EVENT)
      // 3. Storage event (event.type === 'storage')

      // Log the event type for debugging
      console.log(`[Balance] updateBalanceFromStorage called by: ${event ? event.type : 'Initial Load'}`);

      // If it's a 'storage' event, filter it.
      // The 'storage' event's `key` property is null if localStorage.clear() is called.
      if (event && event.type === 'storage') {
        if (event.key !== 'user' && event.key !== null) {
          console.log(`[Balance] Ignoring storage event for irrelevant key: ${event.key}`);
          return; // Ignore irrelevant storage events
        }
        // If key is 'user' or null, proceed.
      }
      // If it's not a 'storage' event (i.e., our custom event or initial load), proceed.

   
      setLoading(true);
      const userString = localStorage.getItem('user');
      if (!userString) {
        console.log('[Balance] No user data in localStorage.');
        setAccountNumber('');
        setBalance(null);
        setError('No user information found. Please log in again.');
        setLoading(false);
        return;
      }

      try {
      const user = JSON.parse(userString);
      console.log('[Balance] Parsed user from localStorage:', user); // Log the parsed user object
      setAccountNumber(user.account_number || ''); // Update account number
      setBalance(user.balance !== undefined ? Number(user.balance) : null); // Update balance
      setError(''); // Clear error on successful parse
      }  catch (e) {
        console.error('[Balance] Error parsing user data from localStorage:', e);
        setError('Error loading user data. Please log in again.');
      } finally {
        setLoading(false);
      }
    };

    // Initial balance update when the component mounts
    updateBalanceFromStorage();

    // Add event listener for custom balance update event (for same-tab updates)
    window.addEventListener(BALANCE_UPDATED_EVENT, updateBalanceFromStorage);
    // Also keep the 'storage' event listener for cross-tab/window updates (fires for other tabs/windows)
    window.addEventListener('storage', updateBalanceFromStorage);

    // Clean up the event listener when the component unmounts
     return () => {
      console.log('[Balance] Detaching event listeners.');
      window.removeEventListener(BALANCE_UPDATED_EVENT, updateBalanceFromStorage);
      window.removeEventListener('storage', updateBalanceFromStorage);
    };
  }, []); // Empty dependency array means this effect runs once on mount and cleans up on unmount

  if (loading) {
    return <div className="balance-container"><p>Loading balance...</p></div>;
  }
  return (
    <div className="balance-container">
      <h2>Your Account Balance</h2>
      <div className="balance-info">Account Number: <strong>{accountNumber}</strong></div>
      {error && <p className="error-message">{error}</p>}
      {balance !== null && !error && (
        <div className="success-message balance-display">
          Current Balance: <strong>₹{Number(balance).toFixed(2)}</strong>
        </div>
      )}
    </div>
  );
};

export default Balance;