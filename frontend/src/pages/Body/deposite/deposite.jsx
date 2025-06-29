import React, { useState, useEffect } from 'react';
import './deposite.css'; 
import { dispatchBalanceUpdated } from '../../../utils/events'; // Import the event dispatcher
 
const Deposite = () => {
  const [account, setAccount] = useState(''); // We'll keep this to display it
  const [amount, setAmount] = useState('');
  const [message, setMessage] = useState(''); // State for success message
  const [error, setError] = useState('');     // State for error message

  useEffect(() => {
    // Get user from localStorage when the component mounts
    const user = JSON.parse(localStorage.getItem('user'));
    if (user && user.account_number) {
      setAccount(user.account_number);
    }
  }, []); // Empty dependency array ensures this runs only once

  const handleSubmit = async (e) => { // Make the function async
    e.preventDefault();
    setMessage(''); // Clear previous messages
    setError('');

    try {
      // The account number from state (set from localStorage) is used here
      const res = await fetch('http://localhost:5000/api/deposit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ account_number: account, amount }), // Send account_number and amount
      });
      const data = await res.json();

      if (res.ok) {
        console.log('[Deposit] Backend response successful. Received new balance:', data.newBalance); // Log API success
        console.log('[Deposit] Type of data.newBalance:', typeof data.newBalance); // NEW: Log type of newBalance
        setMessage(data.message); // Display success message
        setAmount('');
        // Update the user's balance in localStorage so it's reflected across the app
        const user = JSON.parse(localStorage.getItem('user'));
        if (user) {
          const updatedUser = { ...user, balance: data.newBalance }; // Create updated user object
          console.log('[Deposit] Updating localStorage with user:', updatedUser); // Log before saving
          localStorage.log('[Deposit] localStorage.setItem called with:', JSON.stringify(updatedUser)); // NEW: Confirm localStorage set
          localStorage.setItem('user', JSON.stringify(updatedUser)); // Save to localStorage
          dispatchBalanceUpdated(data.newBalance); // Dispatch custom event with new balance - CRUCIAL
          console.log('[Deposit] Custom event dispatched.'); // Log dispatch
        }
      } else {
        setError(data.message || 'Deposit failed. Please check your input.'); // Display error message
      }
    } catch (err) {
      console.error('[Deposit] Network or API error:', err);
    }
  };
 
  return (
    <div className="deposite-container">
      <h2>Deposit Money</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Account Number</label>
          {/* Display the account number as read-only text */}
          <p className="account-display">{account || 'Loading account...'}</p>
        </div>
        <div className="form-group">
          <label htmlFor='amount'>Amount: </label>
          <input
            id='amount'
            type="number"
            placeholder="Enter amount"
            value={amount}
            onChange={e => setAmount(e.target.value)}
            min="0.01"
            step="0.01"
            required
          />
        </div>
        <input type="submit" value="Deposit" />
        {message && <p className="success-message">{message}</p>} {/* Display success message */}
        {error && <p className="error-message">{error}</p>}     {/* Display error message */}
      </form>
    </div>
  );
};

export default Deposite;