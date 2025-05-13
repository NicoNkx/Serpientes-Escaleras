import React, { useState, useEffect } from 'react';
import GameBoard from './components/GameBoard';
import PlayerSelection from './components/PlayerSelection';
import Instructions from './components/Instructions';
import Dice from './components/Dice';
import { questions } from './utils/questions'; 
import { askQuestion } from './utils/questions'; 
import { questionsHard, askQuestionHard } from './utils/questionsHard';


const App = () => {
  const [gameStarted, setGameStarted] = useState(false);
  const [players, setPlayers] = useState([]);
  const [currentPlayer, setCurrentPlayer] = useState(0);
  const [showInstructions, setShowInstructions] = useState(false);
  const [moveAnimation, setMoveAnimation] = useState(null);
  const [board, setBoard] = useState([]);

  const getPlayerColor = (id) => {
    const colorClasses = ['text-blue-600', 'text-red-600', 'text-green-600', 'text-yellow-500'];
    return colorClasses[id % colorClasses.length];
  };

  const startGame = (newPlayers) => {
    const playersWithStart = newPlayers.map(p => ({ ...p, position: 0 }));
    setPlayers(playersWithStart);
    setGameStarted(true);
  };

  const animateMovement = (player, from, to, board) => {
    const fromCell = from === 0 ? board[0] : board.find(c => c.number === from);
    const toCell = to === 0 ? board[0] : board.find(c => c.number === to);

    if (!fromCell || !toCell) return Promise.resolve();

    setMoveAnimation({
      player,
      x: fromCell.x,
      y: fromCell.y
    });

    return new Promise(resolve => {
      setTimeout(() => {
        setMoveAnimation({
          player,
          x: toCell.x,
          y: toCell.y
        });
        setTimeout(resolve, 500);
      }, 100);
    });
  };

  const movePlayer = async (steps) => {
    const newPlayers = [...players];
    const player = newPlayers[currentPlayer];
    const currentPosition = player.position;
    let newPosition = currentPosition + steps;

    if (currentPosition + steps > 100) {
  alert("¡Debes sacar el número exacto para ganar!");
  setCurrentPlayer((currentPlayer + 1) % players.length);
  return;
  }


    for (let i = 1; i <= steps; i++) {
      await animateMovement(player, currentPosition + i - 1, currentPosition + i, board);
    }

    const escaleras = {
      7: 45, 28: 84, 36: 65, 50: 93, 57: 78, 73: 95
    };

    const serpientes = {
      15: 2, 23: 8, 42: 17, 55: 24, 61: 30, 76: 49, 85: 60
    };

    if (escaleras[newPosition]) {
      const oldPos = newPosition;
      const target = escaleras[newPosition];
      newPosition = target;
      await animateMovement(player, oldPos, newPosition, board);
      alert(`¡Escalera! Subes de ${oldPos} a ${target}`);
    } else if (serpientes[newPosition]) {
      const oldPos = newPosition;
      const result = await askQuestion(questions);
      if (result.correcta) {
        alert("¡Respuesta correcta! Te salvaste de la serpiente.");
      } else {
        const target = serpientes[newPosition];
        newPosition = target;
        await animateMovement(player, oldPos, newPosition, board);
        alert(`¡Respuesta incorrecta! Bajas de ${oldPos} a ${target}`);
      }
    }

    player.position = Math.min(newPosition, 100);




    // --- primero, revisa si ganó
    if (player.position === 100) {
      const result = await askQuestionHard(questionsHard);
      if (result.correcta) {
        alert(`¡Respuesta correcta! Jugador ${player.id} ha ganado la partida 🎉`);
        setGameStarted(false);
        return;
      } else {
        alert("¡Respuesta incorrecta! No puedes ganar todavía. Vuelves a la casilla 90.");
        const oldPos = 100;
        const target = 90;
        player.position = target;
        await animateMovement(player, oldPos, target, board);
      }
    }

    // --- luego revisa casillas 97-99
    if ([97, 98, 99].includes(player.position)) {
      const result = await askQuestionHard(questionsHard);
      if (!result.correcta) {
        alert(`¡Respuesta incorrecta! Bajas a la casilla 95 desde la ${player.position}.`);
        const oldPos = player.position;
        const target = 95;
        player.position = target;
        await animateMovement(player, oldPos, target, board);
      } else {
        alert("¡Respuesta correcta! Puedes seguir avanzando.");
      }
    }
    



    setCurrentPlayer((currentPlayer + 1) % players.length);
    setPlayers(newPlayers);
    setMoveAnimation(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-100 to-blue-100 p-4">
      <div className="max-w-4xl mx-auto">
        <header className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-purple-700">Serpientes y Escaleras</h1>
          <div className="flex space-x-4">
            <button
              onClick={() => setShowInstructions(true)}
              className="px-4 py-2 bg-white rounded-lg shadow hover:bg-gray-100 transition"
            >
              Como se juega
            </button>
            <a
              href="https://github.com/NicoNkx/Casos-Cl-nicos-S-E"
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 bg-white rounded-lg shadow hover:bg-gray-100 transition"
            >
              Instrucciones
            </a>
          </div>
        </header>


        {!gameStarted ? (
          <div className="space-y-6">
            <PlayerSelection onStart={startGame} />
          </div>
        ) : (
        <div className="flex space-x-6 items-start">
          {/* Tablero */}
          <div className="bg-white p-6 rounded-xl shadow-lg">
            <GameBoard
              players={players}
              currentPlayer={currentPlayer}
              moveAnimation={moveAnimation}
            />
          </div>

          {/* Panel lateral libre */}
          <div className="flex flex-col items-center space-y-8 pt-48">
            <div className="text-3xl font-bold text-indigo-1000">
              Turno de:
              <span className={`ml-2 ${getPlayerColor(currentPlayer)}`}>
                {players[currentPlayer]?.name || `Jugador ${currentPlayer + 1}`}
              </span>
            </div>

            <div className="mt-4">
              <Dice onRoll={movePlayer} />
            </div>
          </div>
        </div>


        )}

        {showInstructions && (
          <Instructions onClose={() => setShowInstructions(false)} />
        )}
      </div>
    </div>
  );
};

export default App;
