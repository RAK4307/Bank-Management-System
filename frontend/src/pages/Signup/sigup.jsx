import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './sigup.css';

const Signup = () => {
  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    gender: 'male',
    type: 'savings',
    address: '',
    password: '',
    confirmPassword: ''
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    // Basic validation
    if (
      !form.firstName ||
      !form.lastName ||
      !form.email ||
      !form.password ||
      !form.confirmPassword
    ) {
      setError('Please fill all required fields');
      return;
    }
    if (form.password !== form.confirmPassword) {
      setError('Passwords do not match');
      return;
    }
    try {
      const res = await fetch('http://localhost:5000/api/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          first_name: form.firstName,
          last_name: form.lastName,
          email: form.email,
          phone: form.phone,
          gender: form.gender,
          account_type: form.type,
          address: form.address,
          password: form.password
        }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.message || 'Signup failed');
      } else {
        setSuccess('Signup successful!');
        setForm({
          firstName: '',
          lastName: '',
          email: '',
          phone: '',
          gender: 'male',
          type: 'savings',
          address: '',
          password: '',
          confirmPassword: ''
        });
        setTimeout(() => {
          navigate('/login');
        }, 1000);
      }
    } catch (err) {
      setError('Network error');
    }
  };

  return (
    <div className="signup-bg">
      <div className="signup-card-horizontal">
        <div className="signup-card-left">
          <h1 className="signup-title">
            Create Your <span>BluVault</span> Account
          </h1>
        </div>
        <div className="signup-card-right">
          <form onSubmit={handleSubmit} className="signup-grid-form">
            <div>
              <label htmlFor="firstName">First Name</label>
              <input type="text" id="firstName" name="firstName" value={form.firstName} onChange={handleChange} required placeholder="e.g. John" />
            </div>
            <div>
              <label htmlFor="lastName">Last Name</label>
              <input type="text" id="lastName" name="lastName" value={form.lastName} onChange={handleChange} required placeholder="e.g. Doe" />
            </div>
            <div>
              <label htmlFor="email">Email</label>
              <input type="email" id="email" name="email" value={form.email} onChange={handleChange} required placeholder="e.g. johndoe@gmail.com" />
            </div>
            <div>
              <label htmlFor="phone">Phone</label>
              <input type="tel" id="phone" name="phone" value={form.phone} onChange={handleChange} placeholder="e.g. 456-768-798" />
            </div>
            <div>
              <label htmlFor="gender">Gender</label>
              <select id="gender" name="gender" value={form.gender} onChange={handleChange}>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select>
            </div>
            <div>
              <label htmlFor="type">Account Type</label>
              <select id="type" name="type" value={form.type} onChange={handleChange}>
                <option value="savings">Savings</option>
                <option value="current">Current</option>
                <option value="fixed">Fixed Deposit</option>
              </select>
            </div>
            <div className="form-span-2">
              <label htmlFor="address">Address</label>
              <input type="text" id="address" name="address" value={form.address} onChange={handleChange} placeholder="e.g. Lake Street-23" />
            </div>
            <div>
              <label htmlFor="password">Password</label>
              <input type="password" id="password" name="password" value={form.password} onChange={handleChange} required placeholder="Enter password" />
            </div>
            <div>
              <label htmlFor="confirmPassword">Confirm Password</label>
              <input type="password" id="confirmPassword" name="confirmPassword" value={form.confirmPassword} onChange={handleChange} required placeholder="Re-enter password" />
            </div>
            <button type="submit" className="signup-btn form-span-2">Sign Up</button>
            {error && <div className="signup-error form-span-2">{error}</div>}
            {success && <div className="signup-success form-span-2">{success}</div>}
          </form>
          <p className="signup-login">
            Already have an account? <Link to="/login">Login here</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Signup;