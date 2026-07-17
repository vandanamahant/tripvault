import React, { useState } from 'react';
import api from '../api';

const TripForm = ({ onTripCreated }) => {
  const [formData, setFormData] = useState({
    title: '', destination: '', startDate: '', endDate: '', description: '', rating: ''
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post('/trips', formData); 
      onTripCreated(); 
      setFormData({ title: '', destination: '', startDate: '', endDate: '', description: '', rating: '' });
    } catch (err) {
      alert("Error creating trip");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="trip-form">
      <input type="text" placeholder="Title" value={formData.title} onChange={(e) => setFormData({...formData, title: e.target.value})} required />
      <input type="text" placeholder="Destination" value={formData.destination} onChange={(e) => setFormData({...formData, destination: e.target.value})} required />
      <input type="date" value={formData.startDate} onChange={(e) => setFormData({...formData, startDate: e.target.value})} />
      <input type="date" value={formData.endDate} onChange={(e) => setFormData({...formData, endDate: e.target.value})} />
      <textarea placeholder="Description" value={formData.description} onChange={(e) => setFormData({...formData, description: e.target.value})} />
      <input type="number" min="1" max="5" placeholder="Rating (1-5)" value={formData.rating} onChange={(e) => setFormData({...formData, rating: e.target.value})} />
      <button type="submit">Add Trip</button>
    </form>
  );
};

export default TripForm;