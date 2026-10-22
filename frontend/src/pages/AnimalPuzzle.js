import React, { useState } from 'react';
import PlayPage from './PlayPage';

// We will use a 2x2 puzzle (4 pieces)
const puzzlePieces = [
  { id: 1, emoji: '🐄', label: 'Head' },
  { id: 2, emoji: '🐄', label: 'Body' },
  { id: 3, emoji: '🐄', label: 'Legs' },
  { id: 4, emoji: '🐄', label: 'Tail' },
];

const AnimalPuzzle = () => {
  const [placedPieces, setPlacedPieces] = useState({});
  const [isComplete, setIsComplete] = useState(false);

  // Voice function
  const speak = (text) => {
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = 0.85;
    utterance.pitch = 1.4; // Happy voice
    window.speechSynthesis.speak(utterance);
  };

  // Play a "pop" sound when a piece is placed
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

  const handleDrop = (e, targetId) => {
    e.preventDefault();
    const pieceId = parseInt(e.dataTransfer.getData('pieceId'));

    // Check if the piece matches the target slot
    if (pieceId === targetId && !placedPieces[targetId]) {
      playPopSound();
      const newPlaced = { ...placedPieces, [targetId]: true };
      setPlacedPieces(newPlaced);

      // Check if all 4 pieces are placed
      if (Object.keys(newPlaced).length === 4) {
        setIsComplete(true);
        speak("Moo! You did it! I love my puzzle!");
      }
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const resetPuzzle = () => {
    setPlacedPieces({});
    setIsComplete(false);
  };

  return (
    <PlayPage title="Animal Puzzle" icon="🐄" color="from-pink-400 to-rose-400">
      
      {/* The Magic Reward */}
      {isComplete ? (
        <div className="text-center py-8">
          {/* The animal dances by bouncing and spinning! */}
          <div className="text-[150px] animate-bounce mb-6 drop-shadow-2xl">
            🐄
          </div>
          <h2 className="text-4xl font-bold text-purple-700 mb-4 animate-pulse">
            Moo! Great Job!
          </h2>
          <button
            onClick={resetPuzzle}
            className="mt-4 bg-purple-600 text-white px-8 py-4 rounded-full text-xl font-bold hover:bg-purple-700 transition"
          >
            🔄 Play Again
          </button>
        </div>
      ) : (
        <>
          <div className="text-center mb-6">
            <h2 className="text-2xl font-bold text-purple-700">
              Drag the pieces to build the Cow!
            </h2>
          </div>

          {/* Puzzle Board (The Drop Zones) */}
          <div className="grid grid-cols-2 gap-2 max-w-sm mx-auto mb-8 p-4 bg-white/50 rounded-3xl shadow-inner border-4 border-dashed border-purple-200">
            {[1, 2, 3, 4].map((slotId) => (
              <div
                key={slotId}
                onDrop={(e) => handleDrop(e, slotId)}
                onDragOver={handleDragOver}
                className={`h-32 rounded-2xl flex items-center justify-center transition-all ${
                  placedPieces[slotId] 
                    ? 'bg-green-100 border-4 border-green-400 shadow-md' 
                    : 'bg-gray-100 border-4 border-gray-200'
                }`}
              >
                {placedPieces[slotId] ? (
                  <span className="text-6xl animate-in zoom-in">🐄</span>
                ) : (
                  <span className="text-4xl opacity-20">❓</span>
                )}
              </div>
            ))}
          </div>

          {/* The Draggable Pieces */}
          <div className="flex justify-center gap-4 flex-wrap">
            {puzzlePieces.map((piece) => {
              // Don't show the piece if it's already placed
              if (placedPieces[piece.id]) return null;

              return (
                <div
                  key={piece.id}
                  draggable
                  onDragStart={(e) => handleDragStart(e, piece.id)}
                  className="text-6xl bg-white p-4 rounded-2xl shadow-lg border-2 border-purple-200 cursor-grab hover:scale-110 transition-transform active:cursor-grabbing"
                >
                  {piece.emoji}
                </div>
              );
            })}
          </div>
        </>
      )}
    </PlayPage>
  );
};

export default AnimalPuzzle;