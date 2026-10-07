import React, { useState } from 'react';
import PlayPage from './PlayPage';

const fruits = [
  { id: 1, name: 'Apple', emoji: '🍎', color: 'red' },
  { id: 2, name: 'Banana', emoji: '🍌', color: 'yellow' },
  { id: 3, name: 'Strawberry', emoji: '🍓', color: 'red' },
  { id: 4, name: 'Orange', emoji: '🍊', color: 'orange' },
];

const FruitMatching = () => {
  const [matched, setMatched] = useState({});
  const [score, setScore] = useState(0);
  const [message, setMessage] = useState('');

  const handleDragStart = (e, fruit) => {
    e.dataTransfer.setData('fruitId', fruit.id);
  };

  const handleDrop = (e, targetFruit) => {
    e.preventDefault();
    const fruitId = parseInt(e.dataTransfer.getData('fruitId'));
    const fruit = fruits.find(f => f.id === fruitId);

    if (!fruit) return;

    if (fruit.id === targetFruit.id && !matched[fruit.id]) {
      setMatched({ ...matched, [fruit.id]: true });
      setScore(score + 1);
      setMessage(`✅ ${fruit.emoji} Matched!`);
      
      if (score + 1 === fruits.length) {
        setMessage('🎉 All fruits matched! Great job!');
      }
    } else if (matched[fruit.id]) {
      setMessage('⏳ Already matched!');
    } else {
      setMessage('❌ Try again!');
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  return (
    <PlayPage title="Fruit Matching" icon="🍎" color="from-pink-400 to-rose-400">
      <div className="text-center mb-4">
        <p className="text-xl font-semibold text-gray-700">
          ⭐ Score: {score} / {fruits.length}
        </p>
        {message && (
          <p className="text-lg font-medium text-purple-600 mt-2">{message}</p>
        )}
      </div>

      <div className="grid grid-cols-2 gap-4 mb-6">
        {fruits.map((fruit) => (
          <div
            key={fruit.id}
            draggable={!matched[fruit.id]}
            onDragStart={(e) => handleDragStart(e, fruit)}
            className={`text-6xl p-6 rounded-2xl text-center cursor-grab transition ${
              matched[fruit.id] ? 'opacity-50 bg-gray-100 cursor-default' : 'bg-purple-50 hover:bg-purple-100'
            }`}
          >
            {fruit.emoji}
            <p className="text-sm text-gray-500 mt-2">{fruit.name}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-2 gap-4">
        {fruits.map((fruit) => (
          <div
            key={fruit.id}
            onDrop={(e) => handleDrop(e, fruit)}
            onDragOver={handleDragOver}
            className={`h-24 rounded-2xl border-4 border-dashed flex items-center justify-center text-2xl font-bold transition ${
              matched[fruit.id] ? 'border-green-400 bg-green-50' : 'border-purple-300 bg-purple-50'
            }`}
          >
            {matched[fruit.id] ? '✅' : fruit.name}
          </div>
        ))}
      </div>
    </PlayPage>
  );
};

export default FruitMatching;