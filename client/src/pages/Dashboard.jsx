import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Dashboard = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserData = async () => {
      const token = localStorage.getItem('token');
      
      try {
        const response = await axios.get('http://localhost:5000/api/auth/me', {
          headers: { 'Authorization': `Bearer ${token}` }
        });
        setUser(response.data);
      } catch (err) {
        // If token verification fails, clear token and boot to login
        localStorage.removeItem('token');
        navigate('/login');
      }
    };

    fetchUserData();
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <div className="auth-card" style={{ maxWidth: '500px', textAlign: 'center' }}>
      <h2>TripVault Journal</h2>
      <hr style={{ border: '0', height: '1px', background: '#eee', margin: '15px 0' }} />
      
      {user ? (
        <div>
          <p style={{ fontSize: '18px' }}>Welcome back, <strong>{user.name}</strong>!</p>
          <p style={{ color: '#7f8c8d', fontSize: '14px' }}>Registered Email: {user.email}</p>
        </div>
      ) : (
        <p>Loading your profile details...</p>
      )}

      <button onClick={handleLogout} className="btn btn-danger" style={{ marginTop: '20px' }}>
        Log Out
      </button>
    </div>
  );
};

export default Dashboard;