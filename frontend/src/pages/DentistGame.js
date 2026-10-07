import React, { useState } from 'react';
import PlayPage from './PlayPage';

const initialTeeth = [
  { id: 1, clean: false, food: '🍬', label: 'Candy' },
  { id: 2, clean: false, food: '🍭', label: 'Lollipop' },
  { id: 3, clean: false, food: '🍫', label: 'Chocolate' },
  { id: 4, clean: false, food: '🧁', label: 'Cupcake' },
  { id: 5, clean: false, food: '🍩', label: 'Donut' },
  { id: 6, clean: false, food: '🍪', label: 'Cookie' },
];

const DentistGame = () => {
  const [teeth, setTeeth] = useState(initialTeeth);
  const [cleaned, setCleaned] = useState(0);
  const [message, setMessage] = useState('');

  const handleClean = (id) => {
    const tooth = teeth.find(t => t.id === id);
    if (tooth.clean) {
      setMessage('✅ Already clean!');
      return;
    }

    setTeeth(teeth.map(t => t.id === id ? { ...t, clean: true } : t));
    const newCleaned = cleaned + 1;
    setCleaned(newCleaned);
    setMessage(`🪥 Cleaned ${tooth.food}!`);

    if (newCleaned === teeth.length) {
      setMessage('🎉 All teeth are clean! Shiny smile!');
    }
  };

  return (
    <PlayPage title="Dentist Game" icon="🦷" color="from-green-400 to-emerald-400">
      <div className="text-center mb-4">
        <p className="text-xl font-semibold text-gray-700">
          🪥 Cleaned: {cleaned} / {teeth.length}
        </p>
        {message && (
          <p className="text-lg font-medium text-purple-600 mt-2">{message}</p>
        )}
      </div>

      <div className="grid grid-cols-3 gap-4 mb-6">
        {teeth.map((tooth) => (
          <button
            key={tooth.id}
            onClick={() => handleClean(tooth.id)}
            className={`p-4 rounded-2xl text-4xl transition transform ${
              tooth.clean
                ? 'bg-green-100 border-2 border-green-400 scale-95'
                : 'bg-yellow-100 border-2 border-yellow-400 hover:scale-105'
            }`}
          >
            {tooth.clean ? '🦷✨' : tooth.food}
            <p className="text-xs text-gray-500 mt-1">{tooth.clean ? 'Clean!' : tooth.label}</p>
          </button>
        ))}
      </div>

      {cleaned === teeth.length && (
        <div className="text-center py-4">
          <p className="text-6xl mb-2">🦷✨</p>
          <p className="text-2xl font-bold text-green-600">Shiny teeth!</p>
          <p className="text-gray-600">You're a great dentist!</p>
        </div>
      )}
    </PlayPage>
  );
};

export default DentistGame;