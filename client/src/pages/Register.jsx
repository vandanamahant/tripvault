import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import api from '../api';

const Register = () => {
  const [name, setName] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    setError('');

    try {
    await api.post('/auth/register', { name, username, email, password });
      alert('Account created successfully! Redirecting to login...');
      navigate('/login');
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to register. Try again.');
    }
  };

  return (
    <div className="auth-card">
      <h2>Create Account</h2>
      {error && <div className="error-msg">{error}</div>}
      
      <form onSubmit={handleRegister}>
        <div className="form-group">
          <input 
            type="text" 
            placeholder="Full Name" 
            value={name} 
            onChange={(e) => setName(e.target.value)} 
            required 
          />
        </div>
        <div className="form-group">
          <input 
            type="text" 
            placeholder="Username" 
            value={username} 
            onChange={(e) => setUsername(e.target.value)} 
            required 
          />
        </div>
        <div className="form-group">
          <input 
            type="email" 
            placeholder="Email Address" 
            value={email} 
            onChange={(e) => setEmail(e.target.value)} 
            required 
          />
        </div>
        <div className="form-group">
          <input 
            type="password" 
            placeholder="Password" 
            value={password} 
            onChange={(e) => setPassword(e.target.value)} 
            required 
          />
        </div>
        <button type="submit" className="btn btn-primary">Sign Up</button>
      </form>

      <p className="switch-text">
        Already registered? <Link to="/login">Login here</Link>
      </p>
    </div>
  );
};

export default Register;