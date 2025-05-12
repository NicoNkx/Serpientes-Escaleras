import React from 'react';

const PlayerToken = ({ player, isSpecial, position = 0, totalPlayers = 1, style }) => {
  const colors = {
    1: 'bg-blue-500',
    2: 'bg-red-500',
    3: 'bg-green-500',
    4: 'bg-yellow-500'
  };

  // Calcular posición relativa cuando hay múltiples jugadores
  const getPositionStyle = () => {
    if (totalPlayers <= 1) return { left: '50%', top: '50%' };
    
    const angle = (position / totalPlayers) * Math.PI * 2;
    const radius = isSpecial ? 20 : 15;
    return {
      left: `calc(50% + ${Math.cos(angle) * radius}px)`,
      top: `calc(50% + ${Math.sin(angle) * radius}px)`
    };
  };

  return (
    <div 
      className={`absolute ${isSpecial ? 'h-8 w-8' : 'h-6 w-6'} rounded-full ${colors[player.id]} shadow-md 
        flex items-center justify-center text-white font-bold ${isSpecial ? 'text-sm' : 'text-xs'}`}
      style={{
        transform: 'translate(-50%, -50%)',
        ...getPositionStyle(),
        ...style
      }}
    >
      {player.id}
    </div>
  );
};

export default PlayerToken;