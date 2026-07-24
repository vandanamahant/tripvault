import React, { useEffect, useState, useCallback } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import api from '../api';
import TripForm from '../components/TripForm';

const Dashboard = () => {
  const [user, setUser] = useState(null);
  const [trips, setTrips] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editingTrip, setEditingTrip] = useState(null);
  const navigate = useNavigate();

  const loadData = useCallback(async () => {
    const token = localStorage.getItem('token');
    if (!token) return navigate('/login');

    try {
      const [uRes, tRes] = await Promise.all([
        axios.get('http://localhost:5000/api/auth/me', {
          headers: { Authorization: `Bearer ${token}` }
        }),
        api.get('/trips')
      ]);
      
      setUser(uRes.data);
      setTrips(tRes.data);
    } catch (e) {
      localStorage.removeItem('token');
      navigate('/login');
    }
  }, [navigate]);

  useEffect(() => { loadData(); }, [loadData]);

  const handleEdit = (trip) => {
    setEditingTrip(trip);
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Sure, delete this?")) return;
    try {
      await api.delete(`/trips/${id}`);
      loadData();
    } catch (e) {
      alert("Delete failed.");
    }
  };

  return (
    <div className="dashboard-container">
      <header className="dashboard-header">
        <h1>TripVault Journal</h1>
        {user && (
          <div className="user-welcome">
            <p>Welcome back, {user.name}</p>
            <Link 
              to={`/profile/${user._id}`} 
              className="btn btn-secondary" 
              style={{ marginTop: '8px', display: 'inline-block', textDecoration: 'none' }}
            >
              View My Profile
            </Link>
          </div>
        )}
      </header>

      <section className="actions">
        <button 
          className="btn btn-primary" 
          onClick={() => { setEditingTrip(null); setShowForm(!showForm); }}
        >
          {showForm ? 'Cancel' : 'Create New Trip'}
        </button>
      </section>

      {showForm && (
        <div className="form-wrapper">
          <TripForm 
            trip={editingTrip} 
            onTripCreated={() => { setShowForm(false); loadData(); }} 
          />
        </div>
      )}

      <section className="trips-section">
        <h3>Your Trips</h3>
        {!trips.length ? <p className="empty-state">No trips yet.</p> : (
          <div className="trips-grid">
            {trips.map(trip => (
              <div key={trip._id} className="trip-card">
                <h4>{trip.title}</h4>
                <p><strong>Destination:</strong> {trip.destination}</p>
                <p><strong>Rating:</strong> {trip.rating || 'N/A'}/5</p>
                <div className="card-actions">
                  <button className="btn btn-edit" onClick={() => handleEdit(trip)}>Edit</button>
                  <button className="btn btn-delete" onClick={() => handleDelete(trip._id)}>Delete</button>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      <footer className="dashboard-footer">
        <button className="btn btn-logout" onClick={() => { localStorage.clear(); navigate('/login'); }}>Log Out</button>
      </footer>
    </div>
  );
};

export default Dashboard;