import React, { useState, useEffect } from 'react';

const missions = [
  {
    id: 1,
    type: 'matching',
    title: 'Fruit Matching',
    description: 'Match the fruits! 🍎',
    icon: '🍎',
    color: 'from-pink-400 to-rose-400',
    bgColor: 'bg-rose-50',
  },
  {
    id: 2,
    type: 'colors',
    title: 'Color Recognition',
    description: 'Find the colors! 🌈',
    icon: '🎨',
    color: 'from-blue-400 to-cyan-400',
    bgColor: 'bg-blue-50',
  },
  {
    id: 3,
    type: 'dentist',
    title: 'Dentist Game',
    description: 'Clean Rubble\'s teeth! 🦷',
    icon: '🦷',
    color: 'from-green-400 to-emerald-400',
    bgColor: 'bg-green-50',
  },
  {
    id: 4,
    type: 'animals',
    title: 'Farm Animals',
    description: 'Meet the animals! 🐄',
    icon: '🐄',
    color: 'from-yellow-400 to-amber-400',
    bgColor: 'bg-yellow-50',
  },
];

const MissionSlider = ({ onSelectMission }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showPreview, setShowPreview] = useState(false);
  const [selectedMission, setSelectedMission] = useState(null);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % missions.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const goToSlide = (index) => {
    setCurrentIndex(index);
  };

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % missions.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + missions.length) % missions.length);
  };

  const handleCardClick = (mission) => {
    setSelectedMission(mission);
    setShowPreview(true);
  };

  const currentMission = missions[currentIndex];

  return (
    <>
      <div className="relative w-full max-w-2xl mx-auto mb-8">
        {/* Card */}
        <div 
          className={`rounded-3xl p-8 bg-gradient-to-br ${currentMission.color} shadow-2xl cursor-pointer transition-all duration-500 hover:scale-[1.02]`}
          onClick={() => handleCardClick(currentMission)}
        >
          <div className="text-center">
            <div className="text-7xl mb-4">{currentMission.icon}</div>
            <h3 className="text-4xl font-bold text-white drop-shadow-md">
              {currentMission.title}
            </h3>
            <p className="text-white/90 text-xl mt-2">{currentMission.description}</p>
            <div className="mt-4">
              <span className="inline-block bg-white/20 backdrop-blur-sm px-6 py-2 rounded-full text-white text-sm font-semibold">
                👆 Tap to play
              </span>
            </div>
          </div>
        </div>

        {/* Navigation Buttons */}
        <button 
          onClick={(e) => { e.stopPropagation(); prevSlide(); }}
          className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/80 backdrop-blur-sm rounded-full p-3 shadow-lg hover:bg-white transition-colors text-xl"
        >
          ◀
        </button>
        <button 
          onClick={(e) => { e.stopPropagation(); nextSlide(); }}
          className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/80 backdrop-blur-sm rounded-full p-3 shadow-lg hover:bg-white transition-colors text-xl"
        >
          ▶
        </button>

        {/* Dot Indicators */}
        <div className="flex justify-center gap-2 mt-4">
          {missions.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`h-3 rounded-full transition-all duration-300 ${
                index === currentIndex ? 'w-8 bg-purple-600' : 'w-3 bg-purple-300'
              }`}
            />
          ))}
        </div>
      </div>

      {/* Mission Preview Modal */}
      {showPreview && selectedMission && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl border-4 border-purple-200">
            <button 
              onClick={() => setShowPreview(false)}
              className="float-right text-2xl text-gray-400 hover:text-gray-600"
            >
              ✕
            </button>

            <div className="text-center">
              <div className={`text-8xl bg-gradient-to-br ${selectedMission.color} rounded-full w-32 h-32 flex items-center justify-center mx-auto shadow-lg`}>
                {selectedMission.icon}
              </div>
              <h2 className="text-3xl font-bold text-purple-700 mt-4 capitalize">
                {selectedMission.title}
              </h2>
              <p className="text-gray-600 mt-2 text-lg">
                {selectedMission.description}
              </p>
              <button
                onClick={() => {
                  setShowPreview(false);
                  onSelectMission(selectedMission.type);
                }}
                className="w-full mt-6 bg-gradient-to-r from-purple-600 to-pink-500 text-white text-xl font-bold py-4 rounded-2xl shadow-lg hover:shadow-xl transform hover:scale-[1.02] transition-all"
              >
                🎮 Let's Play!
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default MissionSlider;