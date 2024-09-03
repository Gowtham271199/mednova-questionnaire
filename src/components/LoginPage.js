import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import '../App.css'; 

function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('https://mednova-be-1.onrender.com/api/auth/login', { email, password });
      if (response.data.success) {
        localStorage.setItem('token', response.data.token); // Store token in localStorage
        navigate('/questionnaire'); // Redirect to a desired page after successful login
      } else {
        setError(response.data.message);
      }
    } catch (err) {
      setError('Error logging in. Please try again.');
    }
  };
  

  return (
    <div className="login-page">
      <div className="login-container">
        <h1>Login</h1>
        <form onSubmit={handleSubmit} className="login-form">
          <div className="form-group">
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password:</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          {error && <p className="error-message">{error}</p>}
          <button type="submit" className="login-button">Login</button>
          <p className="signup-link">Don't have an account? <Link to="/signup">Sign up</Link></p>
        </form>
      </div>
    </div>
  );
}

export default LoginPage;
