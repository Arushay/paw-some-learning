import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from './Header';
import Stats from './Stats';
import TodayProgress from './TodayProgress';
import RecentActivity from './RecentActivity';
import MissionSlider from './MissionSlider';
import { getDashboard } from '../services/api';
import '../index.css';

const Dashboard = ({ onLogout, isAuthenticated }) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [dashboard, setDashboard] = useState({ totalStars: 0, streak: 0, todayProgress: [], recentActivity: [] });
  const navigate = useNavigate();

  useEffect(() => {
    // If guest, show empty dashboard immediately
    if (!isAuthenticated) {
      setLoading(false);
      return;
    }

    // If logged in, fetch real data
    const fetchDashboard = async () => {
      try {
        const data = await getDashboard();
        setDashboard(data);
        setLoading(false);
      } catch (err) {
        console.error(err);
        if (err.response?.status === 401) {
          // Token expired
          localStorage.removeItem('token');
          window.location.reload();
        } else {
          setError('Failed to load dashboard');
          setLoading(false);
        }
      }
    };

    fetchDashboard();
  }, [isAuthenticated]);

  const handleSelectMission = (type) => {
    navigate(`/play/${type}`);
  };

  if (loading) {
    return (
      <div className="min-h-screen animated-bg flex items-center justify-center">
        <div className="text-center">
          <p className="text-4xl mb-4">🐶</p>
          <p className="text-xl text-purple-600">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen animated-bg p-4 md:p-8">
      <div className="max-w-4xl mx-auto">
        
        {/* Show a special banner for guests */}
        {!isAuthenticated && (
          <div className="bg-white/80 p-3 rounded-xl mb-4 text-center border-2 border-purple-200">
            <span className="text-sm text-gray-600">Playing as Guest. </span>
            <button onClick={() => navigate('/login')} className="text-purple-600 font-bold hover:underline">
              Sign in to save your stars!
            </button>
          </div>
        )}

        {/* The Header needs a small update to change the button text if guest */}
        <Header 
          childName={isAuthenticated ? "Hiba" : "Guest"} 
          onLogout={isAuthenticated ? onLogout : () => navigate('/login')} 
          isAuthenticated={isAuthenticated}
        />
        
        <MissionSlider onSelectMission={handleSelectMission} />
        
        <Stats totalStars={dashboard.totalStars} streak={dashboard.streak} />
        <TodayProgress progress={dashboard.todayProgress} />
        <RecentActivity activities={dashboard.recentActivity} />
      </div>
    </div>
  );
};

export default Dashboard;