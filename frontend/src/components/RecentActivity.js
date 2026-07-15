import React from 'react';

const RecentActivity = ({ activities }) => {
  return (
    <div className="bg-white rounded-2xl shadow-lg p-6 border-2 border-purple-200">
      <h2 className="text-2xl font-bold text-purple-700 mb-4 flex items-center gap-2">
        📋 Recent Activity
      </h2>
      {activities?.length === 0 ? (
        <p className="text-gray-400 text-center py-4">✨ No recent activity yet.</p>
      ) : (
        <ul className="space-y-2">
          {activities?.map(p => (
            <li key={p.id} className="flex items-center justify-between border-b border-gray-100 py-2 last:border-0">
              <div className="flex items-center gap-3">
                <span className="text-xl capitalize bg-gray-100 rounded-full px-3 py-1 text-sm font-medium text-gray-700">
                  {p.type}
                </span>
                <span className="text-sm text-gray-500">
                  {new Date(p.completed_at).toLocaleDateString('en-GB', { 
                    day: 'numeric', month: 'short' 
                  })}
                </span>
              </div>
              <div className="flex items-center gap-1">
                <span className="text-yellow-400">⭐</span>
                <span className="font-bold text-purple-600">{p.stars}</span>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default RecentActivity;