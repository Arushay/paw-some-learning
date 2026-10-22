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
        {/* We use stars instead of text for the score */}
        <div className="text-3xl mb-2">
          {Array.from({ length: fruits.length }).map((_, i) => (
            <span key={i} className={i < score ? 'opacity-100' : 'opacity-20'}>
              ⭐
            </span>
          ))}
        </div>
        {message && (
          <p className="text-3xl">{message}</p>
        )}
      </div>

      {/* Draggable Fruits */}
      <div className="grid grid-cols-2 gap-4 mb-8">
        {fruits.map((fruit) => (
          <div
            key={fruit.id}
            draggable={!matched[fruit.id]}
            onDragStart={(e) => handleDragStart(e, fruit)}
            className={`text-6xl p-6 rounded-2xl text-center cursor-grab transition ${
              matched[fruit.id] 
                ? 'opacity-0' // Hide fruit when matched
                : 'bg-white shadow-md border-2 border-purple-100 hover:scale-105'
            }`}
          >
            {fruit.emoji}
          </div>
        ))}
      </div>

      {/* Drop Zones (Shadows) */}
      <div className="grid grid-cols-2 gap-4">
        {fruits.map((fruit) => (
          <div
            key={fruit.id}
            onDrop={(e) => handleDrop(e, fruit)}
            onDragOver={handleDragOver}
            className={`h-28 rounded-2xl border-4 border-dashed flex items-center justify-center text-6xl transition ${
              matched[fruit.id] 
                ? 'border-green-400 bg-green-50' 
                : 'border-gray-300 bg-gray-100'
            }`}
          >
            {/* The Shadow! We use CSS filter to make it black */}
            {matched[fruit.id] ? (
              <span className="drop-shadow-md">✨</span> 
            ) : (
              <span className="opacity-20 grayscale brightness-0">
                {fruit.emoji}
              </span>
            )}
          </div>
        ))}
      </div>
    </PlayPage>
  );
    
   
};

export default FruitMatching;