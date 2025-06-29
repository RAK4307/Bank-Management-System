import React, { useState, useEffect } from 'react';
import './transactions.css';
import { BALANCE_UPDATED_EVENT } from '../../../utils/events'; // Import the event constant

const Transactions = () => {
  const [transactions, setTransactions] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTransactions = async (event) => {
      // Log the event type for debugging
      console.log(`[Transactions] fetchTransactions called by: ${event ? event.type : 'Initial Load'}`);

      // If it's a 'storage' event, filter it.
      if (event && event.type === 'storage') {
        if (event.key !== 'user' && event.key !== null) {
          console.log(`[Transactions] Ignoring storage event for irrelevant key: ${event.key}`);
          return; // Ignore irrelevant storage events
        }
      }

      setLoading(true);
      try {
        const user = JSON.parse(localStorage.getItem('user'));
        if (!user || !user.account_number) {
          console.log('[Transactions] No user account info found in localStorage.');
          setError('Could not find user account information. Please log in again.');
          setLoading(false);
          return;
        }
        console.log(`[Transactions] Fetching transactions for account: ${user.account_number}`);

        const res = await fetch(`http://localhost:5000/api/transactions/${user.account_number}`);
        if (!res.ok) {
          const data = await res.json();
          console.error('[Transactions] API error:', data.message);
          throw new Error(data.message || 'Failed to fetch transactions.');
        }

        const data = await res.json();
        console.log('[Transactions] Transactions fetched successfully:', data);
        setTransactions(data);
      } catch (err) {
        console.error('[Transactions] Error fetching transactions:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    // Initial fetch when the component mounts
    fetchTransactions();

    console.log('[Transactions] Attaching event listeners.');
    // Listen for custom balance update event (for same-tab updates)
    window.addEventListener(BALANCE_UPDATED_EVENT, fetchTransactions);
    // Also listen for changes to localStorage (for cross-tab/window updates)
    window.addEventListener('storage', fetchTransactions);

    // Cleanup the event listener when the component unmounts
    return () => {
      console.log('[Transactions] Detaching event listeners.');
      window.removeEventListener(BALANCE_UPDATED_EVENT, fetchTransactions);
      window.removeEventListener('storage', fetchTransactions);
    };
  }, []);

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  if (loading) {
    return <div className="transactions-container"><p>Loading transactions...</p></div>;
  }

  if (error) {
    return <div className="transactions-container error-message">{error}</div>;
  }

  return (
    <div className="transactions-container">
      <h2>Transaction History</h2>
      {transactions.length > 0 ? (
        <table className="transactions-table">
          <thead>
            <tr>
              <th>Date</th>
              <th>Type</th>
              <th>Amount</th>
            </tr>
          </thead>
          <tbody>
            {transactions.map((tx, index) => (
              <tr key={index}>
                <td>{formatDate(tx.transaction_date)}</td>
                <td className={`transaction-type ${tx.type}`}>{tx.type}</td>
                <td className={`transaction-amount ${tx.type}`}>{tx.type === 'deposit' ? '+' : '-'} ₹{Number(tx.amount).toFixed(2)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No transactions found for this account.</p>
      )}
    </div>
  );
};

export default Transactions;