import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import HomePage from './pages/HomePage'; 
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import FruitMatching from './pages/FruitMatching';
import ColorRecognition from './pages/ColorRecognition';
import DentistGame from './pages/DentistGame';
import FarmAnimals from './pages/FarmAnimals';
import AnimalPuzzle from './pages/AnimalPuzzle';
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
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-4xl mb-4">🐶</p>
          <p className="text-xl text-purple-600">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <BrowserRouter>
 <Routes>
        {/* 1. Public Homepage */}
        <Route path="/" element={<HomePage />} />

        {/* 2. Login Page */}
        <Route 
          path="/login" 
          element={isAuthenticated ? <Navigate to="/dashboard" /> : <Login onLogin={handleLogin} />} 
        />

        {/* 3. Dashboard (Guests can view, but data might be empty) */}
        <Route 
          path="/dashboard" 
          element={<Dashboard onLogout={handleLogout} isAuthenticated={isAuthenticated} />} 
        />

        {/* 4. Games (Anyone can play) */}
        <Route path="/play/matching" element={<FruitMatching />} />
        <Route path="/play/colors" element={<ColorRecognition />} />
        <Route path="/play/dentist" element={<DentistGame />} />
        <Route path="/play/animals" element={<FarmAnimals />} />
        <Route path="/play/animals" element={<AnimalPuzzle />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;