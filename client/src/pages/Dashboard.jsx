import React, { useEffect, useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import api from '../api';
import TripForm from '../components/TripForm';

const Dashboard = () => {
  const [user, setUser] = useState(null);
  const [trips, setTrips] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editingTrip, setEditingTrip] = useState(null);
  const navigate = useNavigate();

  const fetchData = useCallback(async () => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login');
      return;
    }

    try {
      const [userRes, tripsRes] = await Promise.all([
        axios.get('http://localhost:5000/api/auth/me', {
          headers: { Authorization: `Bearer ${token}` }
        }),
        api.get('/trips')
      ]);
      
      setUser(userRes.data);
      setTrips(tripsRes.data);
    } catch (err) {
      localStorage.removeItem('token');
      navigate('/login');
    }
  }, [navigate]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  
  const handleEditClick = (trip) => {
    setEditingTrip(trip);
    setShowForm(true);
    window.scrollTo({ top: 0, behavior: 'smooth' }); 
  };

  const deleteTrip = async (id) => {
    if (window.confirm("Are you sure you want to delete this trip?")) {
      try {
        await api.delete(`/trips/${id}`);
        fetchData();
      } catch (err) {
        alert("Failed to delete the trip.");
      }
    }
  };

  const handleTripAction = () => {
    setShowForm(false);
    setEditingTrip(null);
    fetchData();
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <div className="dashboard-container">
      <header className="dashboard-header">
        <h1>TripVault Journal</h1>
        {user && <p>Welcome back, {user.name}</p>}
      </header>

      <section className="actions">
        <button 
          onClick={() => { setEditingTrip(null); setShowForm(!showForm); }} 
          className="btn-primary"
        >
          {showForm ? 'Close Form' : 'Create New Trip'}
        </button>
      </section>

      {showForm && (
        <div className="form-wrapper">
          <TripForm trip={editingTrip} onTripCreated={handleTripAction} />
        </div>
      )}

      <section className="trips-section">
        <h3>Your Trips</h3>
        {trips.length === 0 ? (
          <p className="empty-state">No trips recorded yet.</p>
        ) : (
          <div className="trips-grid">
            {trips.map((trip) => (
              <div key={trip._id} className="trip-card">
                <h4>{trip.title}</h4>
                <p><strong>Destination:</strong> {trip.destination}</p>
                <p><strong>Rating:</strong> {trip.rating || 'N/A'}/5</p>
                <div className="card-actions">
                  <button onClick={() => handleEditClick(trip)} className="btn-edit">Edit</button>
                  <button onClick={() => deleteTrip(trip._id)} className="btn-delete">Delete</button>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      <footer className="dashboard-footer">
        <button onClick={handleLogout} className="btn-logout">Log Out</button>
      </footer>
    </div>
  );
};

export default Dashboard;