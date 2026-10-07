import React from 'react';
import { useNavigate } from 'react-router-dom';

const MissionPreview = ({ mission, onClose }) => {
  const navigate = useNavigate();

  const missionIcons = {
    matching: '🍎',
    colors: '🎨',
    dentist: '🦷',
    animals: '🐄'
  };

  const missionColors = {
    matching: 'from-pink-400 to-rose-400',
    colors: 'from-blue-400 to-cyan-400',
    dentist: 'from-green-400 to-emerald-400',
    animals: 'from-yellow-400 to-amber-400'
  };

  const missionDescriptions = {
    matching: 'Match each fruit to its shadow! Tap the fruit and drag it to the right place.',
    colors: 'Find the right color! Can you tap the correct one?',
    dentist: 'Rubble has a toothache! Clean his teeth by tapping the food away.',
    animals: 'Meet the farm animals! Tap each one to hear its sound.'
  };

  const handlePlay = () => {
    navigate(`/play/${mission.type}`);
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl border-4 border-purple-200">
        {/* Close button */}
        <button 
          onClick={onClose}
          className="float-right text-2xl text-gray-400 hover:text-gray-600"
        >
          ✕
        </button>

        {/* Mission Icon */}
        <div className="text-center">
          <div className={`text-8xl bg-gradient-to-br ${missionColors[mission.type]} rounded-full w-32 h-32 flex items-center justify-center mx-auto shadow-lg`}>
            {missionIcons[mission.type]}
          </div>
          <h2 className="text-3xl font-bold text-purple-700 mt-4 capitalize">
            {mission.type} Mission
          </h2>
          <p className="text-gray-600 mt-2 text-lg">
            {missionDescriptions[mission.type]}
          </p>
        </div>

        {/* Play Button */}
        <button
          onClick={handlePlay}
          className="w-full mt-6 bg-gradient-to-r from-purple-600 to-pink-500 text-white text-xl font-bold py-4 rounded-2xl shadow-lg hover:shadow-xl transform hover:scale-[1.02] transition-all"
        >
          🎮 Let's Play!
        </button>
      </div>
    </div>
  );
};

export default MissionPreview;