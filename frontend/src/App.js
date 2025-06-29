import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home/home';
import Login from './pages/Login/login';
import Signup from './pages/Signup/sigup';
import Body from './pages/Body/body';
import Deposite from './pages/Body/deposite/deposite';
import Withdraw from './pages/Body/withdraw/withdraw';
import Balance from './pages/Body/balance/balance';
import Transactions from './pages/Body/transactions/transactions';
import Profile from './pages/Body/profile/profile';
import AdminLogin from './pages/Admin/AdminLogin';
import AdminDashboard from './pages/Admin/AdminDashboard';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        {/* Dashboard with nested routes */}
        <Route path="/dashboard" element={<Body />}>
          <Route path="profile" element={<Profile />} />
          <Route path="deposite" element={<Deposite />} />
          <Route path="balance" element={<Balance />} />
          <Route path="withdraw" element={<Withdraw />} />
          <Route path="transactions" element={<Transactions />} />
        </Route>
        {/* Admin Routes */}
        <Route path="/admin" element={<AdminLogin />} />
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
      </Routes>
    </Router>
  );
};

export default App;