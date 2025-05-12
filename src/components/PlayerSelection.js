import React, { useState } from 'react';

const PlayerSelection = ({ onStart }) => {
  const [playerCount, setPlayerCount] = useState(1);
  const [players, setPlayers] = useState([]);

  const handleStart = () => {
    const newPlayers = Array(playerCount).fill().map((_, i) => ({
      id: i + 1,
      name: `Jugador ${i + 1}`,
      position: 1
    }));
    setPlayers(newPlayers);
    onStart(newPlayers);
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow-lg">
      <h2 className="text-2xl font-bold mb-4">Selecciona jugadores</h2>
      <div className="flex space-x-4 mb-6">
        {[1, 2, 3, 4].map(num => (
          <button
            key={num}
            onClick={() => setPlayerCount(num)}
            className={`h-12 w-12 rounded-full ${playerCount === num ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
          >
            {num}
          </button>
        ))}
      </div>
      <button 
        onClick={handleStart}
        className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
      >
        Comenzar Juego
      </button>
    </div>
  );
};

export default PlayerSelection;