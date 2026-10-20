import React from 'react';
import { useNavigate } from 'react-router-dom';

const HomePage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen animated-bg flex flex-col items-center justify-center p-6">
      
      {/* Hero Section */}
      <div className="text-center max-w-2xl">
        <div className="text-8xl mb-6 animate-bounce">🐶</div>
        
        <h1 className="text-5xl md:text-6xl font-bold text-purple-700 mb-4 font-kid drop-shadow-sm">
          Paw-some Learning!
        </h1>
        
        <p className="text-xl text-gray-600 mb-8">
          Join Buddy the Puppy on a magical adventure. 
          Learn colors, fruits, animals, and more!
        </p>

        {/* Play Button (Guest Mode) */}
        <button
          onClick={() => navigate('/dashboard')}
          className="bg-gradient-to-r from-pink-500 to-purple-600 text-white text-2xl font-bold py-4 px-10 rounded-full shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all"
        >
          🎮 Let's Play!
        </button>

        <p className="text-sm text-gray-400 mt-4">
          No sign up required to play
        </p>
      </div>

      {/* Login Section for Parents */}
      <div className="mt-16 bg-white/80 backdrop-blur-sm p-6 rounded-3xl shadow-lg border-2 border-purple-100 text-center max-w-sm w-full">
        <h3 className="text-lg font-bold text-gray-700 mb-2">
          Parent? 👩‍👧
        </h3>
        <p className="text-sm text-gray-500 mb-4">
          Sign in to save your child's progress and see their stars.
        </p>
        <button
          onClick={() => navigate('/login')}
          className="w-full bg-white text-purple-600 border-2 border-purple-200 font-semibold py-2 px-4 rounded-xl hover:bg-purple-50 transition-colors"
        >
          Sign In / Create Account
        </button>
      </div>

      {/* Cute Footer */}
      <div className="mt-12 text-sm text-purple-400 font-medium">
        Made with ❤️ for Hiba
      </div>
    </div>
  );
};

export default HomePage;