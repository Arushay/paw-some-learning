// Inside Dashboard.js
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
        setError('Failed to load dashboard');
        setLoading(false);
      }
    };

    fetchDashboard();
  }, [isAuthenticated]);

  const handleSelectMission = (type) => {
    navigate(`/play/${type}`);
  };

  // ... rest of the component remains the same, 
  // but we remove the "if (error)" block so guests don't see errors.

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

        <Header childName={isAuthenticated ? "Hiba" : "Guest"} onLogout={isAuthenticated ? onLogout : () => navigate('/')} />
        
        <MissionSlider onSelectMission={handleSelectMission} />
        
        <Stats totalStars={dashboard.totalStars} streak={dashboard.streak} />
        <TodayProgress progress={dashboard.todayProgress} />
        <RecentActivity activities={dashboard.recentActivity} />
      </div>
    </div>
  );
};

export default Dashboard;