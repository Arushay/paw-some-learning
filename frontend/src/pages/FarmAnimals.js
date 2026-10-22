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
    setMessage(`🐾 ${animal.emoji} says: ${animal.sound}`);
    
    // Stop any currently speaking voice
    window.speechSynthesis.cancel();

    // Create the speech
    const utterance = new SpeechSynthesisUtterance(animal.sound);
    
    // 🎛️ Tune the voice to be kid-friendly
    utterance.rate = 0.8;   // Slower (normal is 1.0)
    utterance.pitch = 1.3;  // Slightly higher/cheerful
    utterance.volume = 1;   // Maximum volume

    // Try to find a female/child voice if available
    const voices = window.speechSynthesis.getVoices();
    const friendlyVoice = voices.find(voice => 
      voice.name.includes('Samantha') || // Mac female voice
      voice.name.includes('Google UK English Female') || 
      voice.name.includes('Zira')
    );
    
    if (friendlyVoice) {
      utterance.voice = friendlyVoice;
    }

    window.speechSynthesis.speak(utterance);
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