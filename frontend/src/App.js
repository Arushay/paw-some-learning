import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import FruitMatching from './pages/FruitMatching';
import ColorRecognition from './pages/ColorRecognition';
import DentistGame from './pages/DentistGame';
import FarmAnimals from './pages/FarmAnimals';
import AnimalPuzzle from './pages/AnimalPuzzle'; // Make sure this is imported!
import './index.css';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setIsAuthenticated(true);
    }
    setLoading(false);
  }, []);

  const handleLogin = () => {
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsAuthenticated(false);
  };

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }

  return (
    <BrowserRouter>
      <Routes>
        {/* 1. Default Page is the Dashboard (Guest Mode) */}
        <Route 
          path="/" 
          element={<Dashboard onLogout={handleLogout} isAuthenticated={isAuthenticated} />} 
        />

        {/* 2. Login Page */}
        <Route 
          path="/login" 
          element={isAuthenticated ? <Navigate to="/" /> : <Login onLogin={handleLogin} />} 
        />

        {/* 3. Games */}
        <Route path="/play/matching" element={<AnimalPuzzle />} />
        <Route path="/play/colors" element={<ColorRecognition />} />
        <Route path="/play/dentist" element={<DentistGame />} />
        <Route path="/play/animals" element={<AnimalPuzzle />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;