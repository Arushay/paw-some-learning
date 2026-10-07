import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import FruitMatching from './pages/FruitMatching';
import ColorRecognition from './pages/ColorRecognition';
import DentistGame from './pages/DentistGame';
import FarmAnimals from './pages/FarmAnimals';
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
        <Route 
          path="/login" 
          element={
            isAuthenticated ? <Navigate to="/" /> : <Login onLogin={handleLogin} />
          } 
        />
        <Route 
          path="/" 
          element={
            isAuthenticated ? <Dashboard onLogout={handleLogout} /> : <Navigate to="/login" />
          } 
        />
        <Route 
          path="/play/matching" 
          element={
            isAuthenticated ? <FruitMatching /> : <Navigate to="/login" />
          } 
        />
        <Route 
          path="/play/colors" 
          element={
            isAuthenticated ? <ColorRecognition /> : <Navigate to="/login" />
          } 
        />
        <Route 
          path="/play/dentist" 
          element={
            isAuthenticated ? <DentistGame /> : <Navigate to="/login" />
          } 
        />
        <Route 
          path="/play/animals" 
          element={
            isAuthenticated ? <FarmAnimals /> : <Navigate to="/login" />
          } 
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;