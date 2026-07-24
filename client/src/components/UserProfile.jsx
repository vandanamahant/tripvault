import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

export default function UserProfile() {
  const { id } = useParams();
  const [profileData, setProfileData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  
  const [isEditing, setIsEditing] = useState(false);
  const [bioInput, setBioInput] = useState('');
  const [updating, setUpdating] = useState(false);

  const token = localStorage.getItem('token');

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        setLoading(true);
        const { data } = await axios.get(`${API_BASE_URL}/api/users/${id}/profile`);
        setProfileData(data);
        setBioInput(data?.user?.bio || '');
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to load profile.');
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [id]);

  const handleUpdateBio = async (e) => {
    e.preventDefault();
    try {
      setUpdating(true);
      const { data } = await axios.put(
        `${API_BASE_URL}/api/users/profile`,
        { bio: bioInput },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setProfileData(prev => ({
        ...prev,
        user: { ...prev.user, bio: data.bio || bioInput }
      }));
      setIsEditing(false);
    } catch (err) {
      alert(err.response?.data?.message || 'Failed to update bio.');
    } finally {
      setUpdating(false);
    }
  };

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
        
        {!isEditing ? (
          <div>
            <p className="profile-bio">
              {user?.bio || 'No bio provided yet.'}
            </p>
            {token && (
              <button 
                className="btn btn-secondary profile-action-btn" 
                onClick={() => setIsEditing(true)}
              >
                Edit Bio
              </button>
            )}
          </div>
        ) : (
          <form onSubmit={handleUpdateBio} className="bio-edit-form">
            <textarea
              className="bio-textarea"
              value={bioInput}
              onChange={(e) => setBioInput(e.target.value)}
              placeholder="Write your new bio..."
              rows="3"
              required
            />
            <div className="bio-form-actions">
              <button type="submit" className="btn btn-primary" disabled={updating}>
                {updating ? 'Saving...' : 'Save Bio'}
              </button>
              <button 
                type="button" 
                className="btn btn-secondary" 
                onClick={() => setIsEditing(false)}
              >
                Cancel
              </button>
            </div>
          </form>
        )}
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