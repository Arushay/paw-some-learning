import React from 'react';
import { useNavigate } from 'react-router-dom';

const PlayPage = ({ title, icon, color, children, onComplete }) => {
  const navigate = useNavigate();

  return (
    <div className={`min-h-screen bg-gradient-to-br ${color} p-4 md:p-8`}>
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <button 
            onClick={() => navigate('/')}
            className="bg-white/20 backdrop-blur-sm text-white px-4 py-2 rounded-full hover:bg-white/30 transition"
          >
            ← Back
          </button>
          <div className="flex items-center gap-3">
            <span className="text-3xl">{icon}</span>
            <h1 className="text-2xl font-bold text-white">{title}</h1>
          </div>
          <div className="w-20"></div> {/* spacer */}
        </div>

        {/* Game Content */}
        <div className="bg-white/90 backdrop-blur-sm rounded-3xl p-6 shadow-2xl">
          {children}
        </div>

        {/* Complete Button */}
        {onComplete && (
          <button
            onClick={onComplete}
            className="w-full mt-6 bg-green-500 text-white text-xl font-bold py-4 rounded-2xl shadow-lg hover:bg-green-600 transition"
          >
            ✅ Done! Collect Stars
          </button>
        )}
      </div>
    </div>
  );
};

export default PlayPage;