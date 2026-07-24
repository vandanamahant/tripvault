import React, { useState, useEffect } from 'react';
import api from '../api';

const TripForm = ({ trip, onTripCreated }) => {
  const [formData, setFormData] = useState({
    title: '', destination: '', startDate: '', endDate: '', description: '', rating: ''
  });
  const [file, setFile] = useState(null);

  useEffect(() => {
    if (trip) {
      setFormData({
        title: trip.title || '',
        destination: trip.destination || '',
        startDate: trip.startDate ? trip.startDate.split('T')[0] : '',
        endDate: trip.endDate ? trip.endDate.split('T')[0] : '',
        description: trip.description || '',
        rating: trip.rating || ''
      });
      setFile(null);
    }
  }, [trip]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = new FormData();
      data.append('title', formData.title);
      data.append('destination', formData.destination);
      data.append('startDate', formData.startDate);
      data.append('endDate', formData.endDate);
      data.append('description', formData.description);
      data.append('rating', formData.rating);
      
      if (file) {
        data.append('image', file);
      }

      const config = {
        headers: { 'Content-Type': 'multipart/form-data' }
      };

      if (trip) {
        await api.put(`/trips/${trip._id}`, data, config);
      } else {
        await api.post('/trips', data, config);
      }
      
      onTripCreated();
      setFormData({ title: '', destination: '', startDate: '', endDate: '', description: '', rating: '' });
      setFile(null);
    } catch (err) {
      alert(trip ? "Error updating trip" : "Error creating trip");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="trip-form">
      <input 
        type="text" 
        placeholder="Title" 
        value={formData.title} 
        onChange={(e) => setFormData({...formData, title: e.target.value})} 
        required 
      />
      <input 
        type="text" 
        placeholder="Destination" 
        value={formData.destination} 
        onChange={(e) => setFormData({...formData, destination: e.target.value})} 
        required 
      />
      <input 
        type="date" 
        value={formData.startDate} 
        onChange={(e) => setFormData({...formData, startDate: e.target.value})} 
      />
      <input 
        type="date" 
        value={formData.endDate} 
        onChange={(e) => setFormData({...formData, endDate: e.target.value})} 
      />
      <textarea 
        placeholder="Description" 
        value={formData.description} 
        onChange={(e) => setFormData({...formData, description: e.target.value})} 
      />
      <input 
        type="number" 
        min="1" 
        max="5" 
        placeholder="Rating (1-5)" 
        value={formData.rating} 
        onChange={(e) => setFormData({...formData, rating: e.target.value})} 
      />
      
      <div className="file-input-group">
        <label>Trip Cover Image</label>
        <input 
          type="file" 
          accept="image/*" 
          onChange={(e) => setFile(e.target.files[0])} 
        />
      </div>

      <button type="submit">{trip ? 'Update Trip' : 'Add Trip'}</button>
    </form>
  );
};

export default TripForm;