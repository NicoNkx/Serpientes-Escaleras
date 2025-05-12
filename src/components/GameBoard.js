  import React, { useState, useEffect } from 'react';
  import PlayerToken from './PlayerToken';

  const GameBoard = ({ players, currentPlayer, moveAnimation }) => {
    const [board, setBoard] = useState([]);
    const [animating, setAnimating] = useState(false);
    const cellSize = 60;
    
    // Mapeo de escaleras
    const ladderMap = {
      7: 45,
      28: 84,
      36: 65,
      50: 93,
      57: 78,
      73: 95,
      15: 2,
      23: 8,
      42: 17,
      55: 24,
      61: 30,
      76: 49,
      85: 60
    };

    useEffect(() => {
      const createCustomBoard = () => {
        const board = [];
        const positions = [];
        
        // Patrón del tablero
        for (let row = 0; row < 10; row++) {
          for (let col = 0; col < 10; col++) {
            const isReversed = row % 2 !== 0;
            const actualCol = isReversed ? 9 - col : col;
            positions.push({ row, col: actualCol });
          }
        }
        
        // Casilla INICIO
        board.push({
          number: 'INICIO',
          x: cellSize / 2,
          y: cellSize * 10.5,
          isStart: true,
          isSpecial: false,
          isLadder: false,
          isSnake: false
        });

        // Casillas numeradas (100 al 1)
        positions.reverse().forEach((pos, index) => {
          const number = 100 - index;
          const x = pos.col * cellSize + cellSize / 2;
          const y = (9 - pos.row) * cellSize + cellSize / 2;
          
          const ladders = [7, 28, 36, 50, 57, 73];
          const snakes = [15, 23, 42, 55, 61, 76, 85];
          const finalCells = [97, 98, 99, 100];
          
          board.push({
            number,
            x,
            y,
            isStart: false,
            isSpecial: finalCells.includes(number),
            isLadder: ladders.includes(number),
            isSnake: snakes.includes(number),
            ladderTarget: ladderMap[number] || null
          });
        });
        
        return board;
      };
      
      setBoard(createCustomBoard());
    }, []);

    const getCellStyle = (cell) => {
      if (!cell) return '';
      
      let baseStyle = 'absolute flex items-center justify-center border-2 shadow-md transition-all ';
      
      if (cell.isSpecial) {
        baseStyle += 'h-16 w-16 bg-red-400 border-red-600 rounded-md ';
      } else {
        baseStyle += 'h-12 w-12 rounded-lg ';
        
        if (cell.isLadder) {
          baseStyle += 'bg-yellow-300 border-yellow-500 ';
        } else if (cell.isSnake) {
          baseStyle += 'bg-blue-300 border-blue-500 ';
        } else {
          baseStyle += 'bg-white border-gray-300 ';
        }
      }
      
      return baseStyle;
    };

    const renderLadderIndicator = (cell) => {
      if (!cell.ladderTarget) return null;

      const isUp = cell.ladderTarget > cell.number;
      const emoji = isUp ? '🪜' : '🐍';
      const bgColor = isUp ? 'bg-yellow-500' : 'bg-blue-500';

      return (
        <div className={`absolute -top-4 -right-4 ${bgColor} text-white text-xs font-bold px-2 py-1 rounded-full`}>
          {emoji}{cell.ladderTarget}
        </div>
      );
    };



    if (board.length === 0) return <div className="text-center py-8">Cargando tablero...</div>;

    return (
      <div className="relative" style={{ 
        height: `${cellSize * 12}px`, 
        width: `${cellSize * 10}px`,
        margin: '0 auto'
      }}>
        {/* Fondo del tablero */}
        <div className="absolute inset-0 bg-blue-50 rounded-xl opacity-70"></div>

        {/* Casillas */}
        {board.map((cell, index) => (
          cell && (
            <div 
              key={index}
              className={getCellStyle(cell)}
              style={{
                left: `${cell.x - (cell.isSpecial ? cellSize/1.5 : cellSize/2)}px`,
                top: `${cell.y - (cell.isSpecial ? cellSize/1.5 : cellSize/2)}px`,
                zIndex: cell.isSpecial ? 20 : 10
              }}
            >
              <span className={`font-bold ${cell.isSpecial ? 'text-lg' : 'text-xs'} 
                ${cell.isSnake ? 'text-blue-800' : cell.isLadder ? 'text-yellow-700' : 'text-black'}`}>
                {cell.isStart ? 'INICIO' : cell.number}
              </span>

              {renderLadderIndicator(cell)}
              {players
                .filter(player => player.position === (cell.isStart ? 0 : cell.number))
                .map((player, i) => (
                  <PlayerToken 
                    key={i} 
                    player={player} 
                    isSpecial={cell.isSpecial}
                    position={i}
                    totalPlayers={players.filter(p => p.position === (cell.isStart ? 0 : cell.number)).length}
                  />
                ))}
            </div>
          )
        ))}

        {/* Animación de movimiento */}
        {moveAnimation && (
          <PlayerToken 
            player={moveAnimation.player} 
            isSpecial={false}
            style={{
              position: 'absolute',
              left: `${moveAnimation.x - cellSize/2}px`,
              top: `${moveAnimation.y - cellSize/2}px`,
              zIndex: 30,
              transition: 'all 0.5s ease-out'
            }}
          />
        )}
      </div>
    );
  };

  export default GameBoard;