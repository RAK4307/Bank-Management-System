const express = require('express');
const cors = require('cors');
const path = require('path');
const customerRoutes = require('./routes/customerRoutes');
const authRoutes = require('./routes/auth');
const transactionRoutes = require('./routes/transactions');
const adminRoutes = require('./routes/admin');
require('dotenv').config();

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/', customerRoutes);
app.use('/api', authRoutes);
app.use('/api', transactionRoutes);
app.use('/api/admin', adminRoutes);

const PORT = process.env.PORT || 5000;


app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
