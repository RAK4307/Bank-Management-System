const express = require('express');
const router = express.Router();
const db = require('../db'); // Your DB connection pool, correctly named 'db'

// Deposit money route
router.post('/deposit', async (req, res) => { // Removed '/api' prefix
  const { account_number, amount } = req.body;

  if (!account_number || !amount || isNaN(amount) || parseFloat(amount) <= 0) {
    return res.status(400).json({ message: 'Invalid account number or amount.' });
  }

  let connection;
  try {
    connection = await db.getConnection(); // Use 'db' instead of undefined 'pool'
    // Call the stored procedure
    // Note: MySQL stored procedures return results as an array of arrays
    await connection.execute(
      'CALL sp_deposit(?, ?, @new_balance, @message)',
      [account_number, parseFloat(amount)]
    );

    // Retrieve OUT parameters
    const [outParams] = await connection.execute(
      'SELECT @new_balance AS new_balance, @message AS message'
    );

    if (!outParams || outParams.length === 0) {
      console.error('Failed to retrieve OUT parameters after deposit.');
      return res.status(500).json({ message: 'Internal server error.' });
    }

    const { 'new_balance': newBalanceResult, 'message': messageResult } = outParams[0];

    if (newBalanceResult === null) { // Indicates an error from the procedure
      return res.status(400).json({ message: messageResult || 'Transaction failed.' });
    }
    res.status(200).json({
      message: messageResult,
      newBalance: newBalanceResult // This is what your frontend expects
    });

  } catch (error) {
    console.error('Database error during deposit:', error);
    res.status(500).json({ message: 'Internal server error.' });
  } finally {
    if (connection) connection.release();
  }
});

// Withdraw money route
router.post('/withdraw', async (req, res) => { // Removed '/api' prefix
  const { account_number, amount } = req.body;

  if (!account_number || !amount || isNaN(amount) || parseFloat(amount) <= 0) {
    return res.status(400).json({ message: 'Invalid account number or amount.' });
  }

  let connection;
  try {
    connection = await db.getConnection(); // Use 'db' instead of undefined 'pool'
    await connection.execute(
      'CALL sp_withdraw(?, ?, @new_balance, @message)',
      [account_number, parseFloat(amount)]
    );

    const [outParams] = await connection.execute(
      'SELECT @new_balance AS new_balance, @message AS message'
    );

    if (!outParams || outParams.length === 0) {
      console.error('Failed to retrieve OUT parameters after withdrawal.');
      return res.status(500).json({ message: 'Internal server error.' });
    }

    const { 'new_balance': newBalanceResult, 'message': messageResult } = outParams[0];

    // Handle specific error case from stored procedure
    if (messageResult === 'Insufficient funds.') {
        return res.status(400).json({ message: messageResult, newBalance: newBalanceResult });
    }
    if (newBalanceResult === null) {
      return res.status(400).json({ message: messageResult || 'Transaction failed.' });
    }

    res.status(200).json({
      message: messageResult,
      newBalance: newBalanceResult
    });

  } catch (error) {
    console.error('Database error during withdrawal:', error);
    res.status(500).json({ message: 'Internal server error.' });
  } finally {
    if (connection) connection.release();
  }
});


// Get balance route
router.get('/balance/:account_number', async (req, res) => {
  const { account_number } = req.params;

  if (!account_number) {
    return res.status(400).json({ message: 'Account number is required.' });
  }

  try {
    const [users] = await db.query('SELECT balance FROM users WHERE account_number = ?', [account_number]);

    if (users.length === 0) {
      return res.status(404).json({ message: 'Account not found.' });
    }

    res.status(200).json({ balance: users[0].balance });
  } catch (error) {
    console.error('Get balance error:', error);
    res.status(500).json({ message: 'Server error while fetching balance.' });
  }
});

// View transactions for an account
router.get('/transactions/:account_number', async (req, res) => {
  const { account_number } = req.params;

  if (!account_number) {
    return res.status(400).json({ message: 'Account number is required.' });
  }

  try {
    // Order by date to show the most recent transactions first
    const [transactions] = await db.query(
      'SELECT type, amount, transaction_date FROM transactions WHERE account_number = ? ORDER BY transaction_date DESC',
      [account_number]
    );

    res.status(200).json(transactions);
  } catch (error) {
    console.error('View transactions error:', error);
    res.status(500).json({ message: 'Server error while fetching transactions.' });
  }
});

module.exports = router;