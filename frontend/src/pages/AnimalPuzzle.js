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

// These fixed sizes are the secret to making it work on phones
const PIECE_SIZE = 90; // Size of each puzzle piece box
const IMAGE_SIZE = PIECE_SIZE * 3; // The total image is 3 times the piece size

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

  // FRAMER MOTION DRAG END
  const handleDragEnd = (event, info, slotId) => {
    // If the piece is dropped close enough to its slot, snap it in!
    // We use a generous margin (e.g., 50 pixels) so it's easy for toddlers
    const dropDistance = Math.sqrt(info.offset.x ** 2 + info.offset.y ** 2);
    
    // For a real game, you'd check if the piece is physically over the box.
    // For simplicity, if she drags it and drops it, we'll count it if it matches.
    if (dropDistance > 20 && !placedPieces.includes(slotId)) {
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
      <div className="flex justify-center gap-2 md:gap-4 mb-6">
        {animals.map((animal) => (
          <button
            key={animal.id}
            onClick={() => changeAnimal(animal)}
            className={`text-4xl md:text-5xl p-2 rounded-2xl transition-transform hover:scale-110 ${
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
            <motion.div 
              animate={{ y: [0, -30, 0] }} 
              transition={{ repeat: Infinity, duration: 0.8 }}
              className="text-[120px] md:text-[180px] drop-shadow-2xl mb-6"
            >
              {selectedAnimal.emoji}
            </motion.div>
            
            <h2 className="text-3xl md:text-4xl font-bold text-purple-700 mb-4">
              Great job!
            </h2>
            <button
              onClick={resetPuzzle}
              className="mt-6 bg-gradient-to-b from-purple-400 to-purple-600 text-white px-8 py-3 md:px-10 md:py-4 rounded-full text-xl md:text-2xl font-bold shadow-[0_6px_0_#4c1d95] hover:shadow-[0_2px_0_#4c1d95] hover:translate-y-1 active:shadow-none active:translate-y-2 transition-all"
            >
              🔄 Play Again
            </button>
          </motion.div>
        ) : (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            
            <div className="text-center mb-4">
              <h2 className="text-xl md:text-2xl font-bold text-purple-700">
                Drag the pieces to fix the {selectedAnimal.id}!
              </h2>
            </div>

            {/* Puzzle Board */}
            <div 
              className="grid grid-cols-3 gap-1 mx-auto p-2 rounded-3xl shadow-2xl border-8 border-[#8B5A2B] bg-[#DEB887] mb-8"
              style={{ width: (PIECE_SIZE * 3) + 16 }} // 16 is for padding/borders
            >
              {Array.from({ length: totalSlots }).map((_, slotId) => {
                if (hiddenSlots.includes(slotId)) return null;
                const isPlaced = placedPieces.includes(slotId);

                return (
                  <div
                    key={slotId}
                    className={`relative rounded-lg overflow-hidden flex items-center justify-center ${
                      isPlaced ? 'bg-green-50 shadow-inner' : 'bg-gray-200 border-2 border-dashed border-gray-400'
                    }`}
                    style={{ width: PIECE_SIZE, height: PIECE_SIZE }}
                  >
                    {isPlaced && (
                      <div 
                        className="absolute text-[200px]"
                        style={{
                          width: IMAGE_SIZE,
                          height: IMAGE_SIZE,
                          lineHeight: `${IMAGE_SIZE}px`,
                          // FIXED PIXEL MATH
                          left: -(slotId % 3) * PIECE_SIZE,
                          top: -Math.floor(slotId / 3) * PIECE_SIZE,
                        }}
                      >
                        {selectedAnimal.emoji}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Draggable Pieces */}
            <div className="flex justify-center gap-2 flex-wrap max-w-lg mx-auto">
              {Array.from({ length: totalSlots }).map((_, pieceId) => {
                if (hiddenSlots.includes(pieceId) || placedPieces.includes(pieceId)) return null;

                return (
                  <motion.div
                    key={pieceId}
                    drag
                    dragSnapToOrigin={true}
                    onDragEnd={(e, info) => handleDragEnd(e, info, pieceId)}
                    whileHover={{ scale: 1.05 }}
                    whileDrag={{ scale: 1.1, zIndex: 50, cursor: 'grabbing' }}
                    className="bg-white rounded-lg shadow-lg border-2 border-purple-300 cursor-grab relative overflow-hidden"
                    style={{ width: PIECE_SIZE, height: PIECE_SIZE }}
                  >
                    <div 
                      className="absolute text-[200px]"
                      style={{
                        width: IMAGE_SIZE,
                        height: IMAGE_SIZE,
                        lineHeight: `${IMAGE_SIZE}px`,
                        // FIXED PIXEL MATH
                        left: -(pieceId % 3) * PIECE_SIZE,
                        top: -Math.floor(pieceId / 3) * PIECE_SIZE,
                      }}
                    >
                      {selectedAnimal.emoji}
                    </div>
                  </motion.div>
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