import React from 'react';

const Stats = ({ totalStars, streak }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
      <div className="bg-white rounded-2xl shadow-lg p-6 border-2 border-yellow-200 flex items-center gap-4 bg-gradient-to-br from-yellow-50 to-yellow-100">
        <span className="text-5xl">⭐</span>
        <div>
          <p className="text-sm text-gray-500 font-medium">Total Stars</p>
          <p className="text-4xl font-bold text-yellow-600">{totalStars || 0}</p>
        </div>
      </div>
      <div className="bg-white rounded-2xl shadow-lg p-6 border-2 border-orange-200 flex items-center gap-4 bg-gradient-to-br from-orange-50 to-orange-100">
        <span className="text-5xl">🔥</span>
        <div>
          <p className="text-sm text-gray-500 font-medium">Learning Streak</p>
          <p className="text-4xl font-bold text-orange-600">{streak || 0} days</p>
        </div>
      </div>
    </div>
  );
};

export default Stats;