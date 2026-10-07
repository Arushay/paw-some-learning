import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from './Header';
import Stats from './Stats';
import TodayProgress from './TodayProgress';
import RecentActivity from './RecentActivity';
import MissionSlider from './MissionSlider';
import { getDashboard } from '../services/api';
import '../index.css';

const Dashboard = ({ onLogout }) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [dashboard, setDashboard] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        const data = await getDashboard();
        setDashboard(data);
        setLoading(false);
      } catch (err) {
        console.error(err);
        if (err.response?.status === 401) {
          setError('Session expired. Please login again.');
          setTimeout(() => {
            localStorage.removeItem('token');
            window.location.reload();
          }, 2000);
        } else {
          setError('Failed to load dashboard');
        }
        setLoading(false);
      }
    };

    fetchDashboard();
  }, []);

  const handleSelectMission = (type) => {
    navigate(`/play/${type}`);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center animated-bg">
        <div className="text-center">
          <p className="text-4xl mb-4">🐶</p>
          <p className="text-xl text-purple-600">Loading your dashboard...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center animated-bg">
        <div className="text-center paw-card border-red-300 bg-red-50 p-8 rounded-2xl">
          <p className="text-2xl mb-2">❌</p>
          <p className="text-red-600 font-medium">{error}</p>
          <button 
            onClick={() => window.location.reload()} 
            className="mt-4 bg-purple-600 text-white px-6 py-2 rounded-full hover:bg-purple-700"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen animated-bg p-4 md:p-8">
      <div className="max-w-4xl mx-auto">
        <Header childName="Hiba" onLogout={onLogout} />
        
        {/* Mission Carousel */}
        <MissionSlider onSelectMission={handleSelectMission} />
        
        <Stats totalStars={dashboard.totalStars} streak={dashboard.streak} />
        <TodayProgress progress={dashboard.todayProgress} />
        <RecentActivity activities={dashboard.recentActivity} />
        
        <div className="mt-8 text-center text-sm text-gray-400 border-t border-gray-200 pt-4">
          🐾 Paw-some Learning • Made with ❤️ for Hiba
        </div>
      </div>
    </div>
  );
};

export default Dashboard;