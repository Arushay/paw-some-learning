import React, { useState, useEffect } from 'react';
import PlayPage from './PlayPage';

const colors = [
  { name: 'Red', hex: '#ef4444', emoji: '🔴' },
  { name: 'Blue', hex: '#3b82f6', emoji: '🔵' },
  { name: 'Green', hex: '#22c55e', emoji: '🟢' },
  { name: 'Yellow', hex: '#eab308', emoji: '🟡' },
];

const ColorRecognition = () => {
  const [currentColor, setCurrentColor] = useState(null);
  const [options, setOptions] = useState([]);
  const [score, setScore] = useState(0);
  const [message, setMessage] = useState('');
  const [round, setRound] = useState(0);
  const [totalRounds] = useState(5);

  const generateRound = () => {
    const randomColor = colors[Math.floor(Math.random() * colors.length)];
    setCurrentColor(randomColor);

    // Shuffle options (include the correct one)
    const shuffled = [...colors].sort(() => Math.random() - 0.5);
    setOptions(shuffled);
  };

  useEffect(() => {
    generateRound();
  }, []);

  const handleSelect = (selectedColor) => {
    if (selectedColor.name === currentColor.name) {
      setScore(score + 1);
      setMessage(`✅ Correct! ${currentColor.emoji} ${currentColor.name}!`);
    } else {
      setMessage(`❌ Oops! That's ${selectedColor.emoji} ${selectedColor.name}`);
    }

    setRound(round + 1);

    if (round + 1 >= totalRounds) {
      setMessage(`🎉 Game over! You scored ${score + 1}/${totalRounds}`);
    } else {
      setTimeout(generateRound, 1200);
    }
  };

  const isGameOver = round >= totalRounds;

  return (
    <PlayPage title="Color Recognition" icon="🎨" color="from-blue-400 to-cyan-400">
      <div className="text-center mb-6">
        <p className="text-xl font-semibold text-gray-700">
          Round {Math.min(round + 1, totalRounds)} / {totalRounds}
        </p>
        <p className="text-lg font-medium text-purple-600">
          ⭐ Score: {score} / {totalRounds}
        </p>
        {message && (
          <p className="text-xl font-bold mt-2">{message}</p>
        )}
      </div>

      {!isGameOver && currentColor && (
        <div className="text-center">
          <div className="text-6xl mb-4">🔍</div>
          <p className="text-2xl font-bold text-gray-700 mb-6">
            Find the <span style={{ color: currentColor.hex }}>{currentColor.name}</span> color!
          </p>
          <div className="grid grid-cols-2 gap-4">
            {options.map((color) => (
              <button
                key={color.name}
                onClick={() => handleSelect(color)}
                className="h-24 rounded-2xl text-2xl font-bold text-white shadow-lg hover:scale-105 transition transform"
                style={{ backgroundColor: color.hex }}
              >
                {color.emoji} {color.name}
              </button>
            ))}
          </div>
        </div>
      )}

      {isGameOver && (
        <div className="text-center py-8">
          <p className="text-6xl mb-4">🎉</p>
          <p className="text-2xl font-bold text-purple-700">Great job!</p>
          <p className="text-lg text-gray-600">You got {score}/{totalRounds} correct!</p>
          <button
            onClick={() => {
              setScore(0);
              setRound(0);
              setMessage('');
              generateRound();
            }}
            className="mt-4 bg-purple-600 text-white px-6 py-3 rounded-full hover:bg-purple-700 transition"
          >
            🔄 Play Again
          </button>
        </div>
      )}
    </PlayPage>
  );
};

export default ColorRecognition;