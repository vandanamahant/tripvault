import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import UserProfile from './components/UserProfile';

const Footer = () => {
  return (
    <footer className="app-footer">
      <p>
        TripVault Journal | Developed by Vandana Mahant |{' '}
        <a href="https://github.com/vandanamahant" target="_blank" rel="noopener noreferrer">
          GitHub Profile
        </a>
      </p>
    </footer>
  );
};

function App() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <Router>
      <div className="app-layout">
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route 
            path="/dashboard" 
            element={
              <Dashboard 
                isMobileMenuOpen={isMobileMenuOpen} 
                toggleMobileMenu={toggleMobileMenu} 
              />
            } 
          />
          <Route path="/profile/:username" element={<UserProfile />} />
          <Route path="*" element={<Navigate to="/login" />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;