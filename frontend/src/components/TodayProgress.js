import React from 'react';

const TodayProgress = ({ progress }) => {
  const completed = progress?.filter(p => p.completed) || [];

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6 border-2 border-purple-200 mb-6">
      <h2 className="text-2xl font-bold text-purple-700 mb-4 flex items-center gap-2">
        📈 Today's Progress
      </h2>
      {completed.length === 0 ? (
        <p className="text-gray-400 text-center py-4">🎯 No missions completed yet today.</p>
      ) : (
        <ul className="space-y-3">
          {completed.map(p => (
            <li key={p.id} className="flex items-center justify-between bg-purple-50 rounded-xl px-4 py-3 border-2 border-purple-100">
              <div className="flex items-center gap-3">
                <span className="text-2xl">✅</span>
                <span className="font-medium capitalize text-gray-700">{p.type}</span>
              </div>
              <div className="flex items-center gap-1">
                <span className="text-yellow-400 text-xl">⭐</span>
                <span className="font-bold text-purple-600">{p.stars}</span>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default TodayProgress;