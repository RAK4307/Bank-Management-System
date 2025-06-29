import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './login.css';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const res = await fetch('http://localhost:5000/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.message || 'Invalid credentials');
      } else {
        localStorage.setItem('user', JSON.stringify(data.user));
        navigate('/dashboard');
      }
    } catch (err) {
      setError('Network error');
    }
  };

  return (
    <div className="login-bg-horizontal">
      <div className="login-card-horizontal">
        <h2 className="login-title-img">
          Sign In to <span>BluVault</span>
        </h2>
        <form className="login-form-img" onSubmit={handleSubmit}>
          <div className="login-input-img">
            <span className="login-icon-img"><i className="fa fa-envelope"></i></span>
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="login-input-img">
            <span className="login-icon-img"><i className="fa fa-lock"></i></span>
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="login-btn-img">LOGIN</button>
          {error && <div className="login-error-img">{error}</div>}
        </form>
        <p className="login-register-img">
          Don't have an account? <Link to="/signup">Register here</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;