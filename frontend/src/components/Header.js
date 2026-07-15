import React from 'react';

const Header = ({ childName, onLogout }) => {
  return (
    <header className="flex justify-between items-center p-6 bg-white/80 backdrop-blur-sm rounded-2xl shadow-md mb-8 border-2 border-purple-200">
      <div className="flex items-center gap-3">
        <span className="text-4xl">🐶</span>
        <h1 className="text-3xl font-bold text-purple-700">
          Paw-some Learning
        </h1>
      </div>
      <div className="flex items-center gap-4">
        {childName && (
          <span className="text-lg font-semibold text-purple-600 bg-purple-100 px-4 py-2 rounded-full">
            👧 {childName}
          </span>
        )}
        <button 
          onClick={onLogout}
          className="text-gray-500 hover:text-red-500 transition-colors text-sm font-medium"
        >
          Logout
        </button>
      </div>
    </header>
  );
};

export default Header;