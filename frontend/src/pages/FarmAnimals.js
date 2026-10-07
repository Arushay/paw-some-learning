import React, { useState } from 'react';
import PlayPage from './PlayPage';

const animals = [
  { name: 'Cow', emoji: '🐄', sound: 'Moo!', color: 'from-pink-400 to-rose-400' },
  { name: 'Pig', emoji: '🐖', sound: 'Oink!', color: 'from-blue-400 to-cyan-400' },
  { name: 'Sheep', emoji: '🐑', sound: 'Baa!', color: 'from-green-400 to-emerald-400' },
  { name: 'Chicken', emoji: '🐓', sound: 'Cluck!', color: 'from-yellow-400 to-amber-400' },
  { name: 'Horse', emoji: '🐎', sound: 'Neigh!', color: 'from-purple-400 to-pink-400' },
  { name: 'Duck', emoji: '🦆', sound: 'Quack!', color: 'from-orange-400 to-red-400' },
];

const FarmAnimals = () => {
  const [message, setMessage] = useState('');

  const playSound = (animal) => {
    const utterance = new SpeechSynthesisUtterance(animal.sound);
  utterance.rate = 1.2;
  utterance.pitch = 1.5;
  window.speechSynthesis.speak(utterance);
  setMessage(`🐾 ${animal.emoji} says: ${animal.sound}`);
  };

  return (
    <PlayPage title="Farm Animals" icon="🐄" color="from-yellow-400 to-amber-400">
      <div className="text-center mb-4">
        {message && (
          <p className="text-2xl font-bold text-purple-700">{message}</p>
        )}
        {!message && (
          <p className="text-gray-500">Tap an animal to hear its sound!</p>
        )}
      </div>

      <div className="grid grid-cols-2 gap-4">
        {animals.map((animal) => (
          <button
            key={animal.name}
            onClick={() => playSound(animal)}
            className={`bg-gradient-to-br ${animal.color} p-6 rounded-2xl shadow-lg hover:scale-105 transition transform`}
          >
            <div className="text-6xl">{animal.emoji}</div>
            <p className="text-white font-bold text-lg mt-2">{animal.name}</p>
          </button>
        ))}
      </div>
    </PlayPage>
  );
};

export default FarmAnimals;