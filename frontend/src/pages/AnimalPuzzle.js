import React, { useState } from 'react';
import PlayPage from './PlayPage';
import { motion, AnimatePresence } from 'framer-motion';

const animals = [
  { id: 'cow', emoji: '🐄', sound: 'Moo! You fixed the cow!' },
  { id: 'pig', emoji: '🐖', sound: 'Oink! You fixed the pig!' },
  { id: 'sheep', emoji: '🐑', sound: 'Baa! You fixed the sheep!' },
  { id: 'duck', emoji: '🦆', sound: 'Quack! You fixed the duck!' },
];

const totalSlots = 9;
const hiddenSlots = [6, 7, 8]; 

const AnimalPuzzle = () => {
  const [selectedAnimal, setSelectedAnimal] = useState(animals[0]);
  const [placedPieces, setPlacedPieces] = useState([]);
  const [isComplete, setIsComplete] = useState(false);

  const speak = (text) => {
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = 0.85;
    utterance.pitch = 1.4;
    window.speechSynthesis.speak(utterance);
  };

  const playPopSound = () => {
    const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    const oscillator = audioCtx.createOscillator();
    const gainNode = audioCtx.createGain();
    oscillator.connect(gainNode);
    gainNode.connect(audioCtx.destination);
    oscillator.frequency.value = 800;
    oscillator.type = 'sine';
    gainNode.gain.setValueAtTime(0.2, audioCtx.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 0.1);
    oscillator.start();
    oscillator.stop(audioCtx.currentTime + 0.1);
  };

  const handleDragStart = (e, pieceId) => {
    e.dataTransfer.setData('pieceId', pieceId);
  };

  const handleDrop = (e, slotId) => {
    e.preventDefault();
    const pieceId = parseInt(e.dataTransfer.getData('pieceId'));

    if (pieceId === slotId && !placedPieces.includes(slotId)) {
      playPopSound();
      const newPlaced = [...placedPieces, slotId];
      setPlacedPieces(newPlaced);

      if (newPlaced.length === 6) {
        setIsComplete(true);
        speak(selectedAnimal.sound);
      }
    }
  };

  const changeAnimal = (animal) => {
    setSelectedAnimal(animal);
    setPlacedPieces([]);
    setIsComplete(false);
  };

  const resetPuzzle = () => {
    setPlacedPieces([]);
    setIsComplete(false);
  };

  return (
    <PlayPage title="Animal Puzzle" icon="🧩" color="from-pink-400 to-rose-400">
      
      {/* Animal Selector */}
      <div className="flex justify-center gap-4 mb-8">
        {animals.map((animal) => (
          <button
            key={animal.id}
            onClick={() => changeAnimal(animal)}
            className={`text-5xl p-2 rounded-2xl transition-transform hover:scale-110 ${
              selectedAnimal.id === animal.id ? 'bg-purple-200 border-4 border-purple-500 scale-110' : 'bg-white shadow-md'
            }`}
          >
            {animal.emoji}
          </button>
        ))}
      </div>

      <AnimatePresence>
        {isComplete ? (
          <motion.div 
            initial={{ scale: 0 }} 
            animate={{ scale: 1 }} 
            className="text-center py-8 relative"
          >
            {/* Confetti */}
            {[...Array(30)].map((_, i) => (
              <div 
                key={i} 
                className="confetti"
                style={{
                  left: `${Math.random() * 100}%`,
                  animationDelay: `${Math.random() * 2}s`,
                  animationDuration: `${1.5 + Math.random() * 2}s`,
                  color: ['#ef4444', '#3b82f6', '#eab308', '#22c55e'][Math.floor(Math.random() * 4)]
                }}
              >
                {Math.random() > 0.5 ? '⭐' : '🎉'}
              </div>
            ))}

            <motion.div 
              animate={{ y: [0, -30, 0] }} 
              transition={{ repeat: Infinity, duration: 0.8 }}
              className="text-[180px] drop-shadow-2xl mb-6"
            >
              {selectedAnimal.emoji}
            </motion.div>
            
            <h2 className="text-4xl font-bold text-purple-700 mb-4">
              Great job!
            </h2>
            <button
              onClick={resetPuzzle}
              className="mt-6 bg-gradient-to-b from-purple-400 to-purple-600 text-white px-10 py-4 rounded-full text-2xl font-bold shadow-[0_6px_0_#4c1d95] hover:shadow-[0_2px_0_#4c1d95] hover:translate-y-1 active:shadow-none active:translate-y-2 transition-all"
            >
              🔄 Play Again
            </button>
          </motion.div>
        ) : (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            
            <div className="text-center mb-6">
              <h2 className="text-2xl font-bold text-purple-700">
                Drag the pieces to fix the {selectedAnimal.id}!
              </h2>
            </div>

            {/* Puzzle Board */}
            <div className="grid grid-cols-3 gap-2 max-w-[340px] mx-auto p-4 rounded-3xl shadow-2xl border-8 border-[#8B5A2B] bg-[#DEB887] mb-12">
              {Array.from({ length: totalSlots }).map((_, slotId) => {
                if (hiddenSlots.includes(slotId)) return null;
                const isPlaced = placedPieces.includes(slotId);

                return (
                  <div
                    key={slotId}
                    onDrop={(e) => handleDrop(e, slotId)}
                    onDragOver={(e) => e.preventDefault()}
                    className={`h-24 w-full relative rounded-xl overflow-hidden transition-all ${
                      isPlaced ? 'bg-green-50 shadow-inner' : 'bg-gray-200 border-2 border-dashed border-gray-400'
                    }`}
                  >
                    {isPlaced && (
                      <div 
                        className="absolute inset-0 w-[300%] h-[300%] text-[300px] leading-[200px]"
                        style={{ transform: `translate(${-(slotId % 3) * 33.33}%, ${-Math.floor(slotId / 3) * 33.33}%)` }}
                      >
                        {selectedAnimal.emoji}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Draggable Pieces with Framer Motion */}
            <div className="flex justify-center gap-4 flex-wrap max-w-lg mx-auto">
              {Array.from({ length: totalSlots }).map((_, pieceId) => {
                if (hiddenSlots.includes(pieceId) || placedPieces.includes(pieceId)) return null;

                return (
                  <div
                    key={pieceId}
                    draggable
                    onDragStart={(e) => handleDragStart(e, pieceId)}
                    className="cursor-grab active:cursor-grabbing"
                  >
                    <motion.div
                      whileHover={{ scale: 1.15, rotate: Math.random() * 10 - 5 }}
                      whileTap={{ scale: 1.2 }}
                      className="h-20 w-20 bg-white rounded-xl shadow-lg border-2 border-purple-300 relative overflow-hidden"
                    >
                      <div 
                        className="absolute inset-0 w-[300%] h-[300%] text-[240px] leading-[160px]"
                        style={{ transform: `translate(${-(pieceId % 3) * 33.33}%, ${-Math.floor(pieceId / 3) * 33.33}%)` }}
                      >
                        {selectedAnimal.emoji}
                      </div>
                    </motion.div>
                  </div>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </PlayPage>
  );
};

export default AnimalPuzzle;