import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

export default function UserProfile() {
  const { id } = useParams();
  const [profileData, setProfileData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        setLoading(true);
        const { data } = await axios.get(`${API_BASE_URL}/api/users/${id}/profile`);
        setProfileData(data);
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to load profile.');
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [id]);

  if (loading) {
    return (
      <div className="profile-status-container">
        <p>Loading...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="profile-status-container">
        <p className="error-text">{error}</p>
      </div>
    );
  }

  const { user, trips } = profileData || {};

  return (
    <div className="profile-page-container">
      <div className="profile-header-card">
        <h1 className="profile-name">{user?.name}</h1>
        {user?.username && <p className="profile-username">@{user.username}</p>}
        <p className="profile-bio">
          {user?.bio || 'No bio provided yet.'}
        </p>
      </div>

      <h2 className="profile-section-title">Trips</h2>

      {!trips || trips.length === 0 ? (
        <p className="no-trips-text">No trips shared yet.</p>
      ) : (
        <div className="profile-trips-grid">
          {trips.map((trip) => (
            <div key={trip._id} className="profile-trip-card">
              {trip.coverImage ? (
                <div className="profile-trip-image-container">
                  <img 
                    src={trip.coverImage} 
                    alt={trip.title} 
                    className="profile-trip-image" 
                  />
                </div>
              ) : (
                <div className="profile-trip-image-placeholder">No Image</div>
              )}
              <div className="profile-trip-content">
                <h3 className="profile-trip-title">{trip.title}</h3>
                <p className="profile-trip-destination">📍 {trip.destination}</p>
                <span className="profile-trip-rating">Rating: {trip.rating || 'N/A'} ⭐</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}