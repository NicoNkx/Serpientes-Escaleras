import React, { useState } from 'react';

const Dice = ({ onRoll }) => {
  const [rolling, setRolling] = useState(false);
  const [value, setValue] = useState(1);

  const rollDice = () => {
    if (rolling) return;
    
    setRolling(true);
    const rolls = 10 + Math.floor(Math.random() * 10);
    let count = 0;
    
    const interval = setInterval(() => {
      setValue(1 + Math.floor(Math.random() * 6));
      count++;
      
      if (count >= rolls) {
        clearInterval(interval);
        setRolling(false);
        const finalValue = 1 + Math.floor(Math.random() * 6);
        setValue(finalValue);
        onRoll(finalValue);
      }
    }, 100);
  };

  return (
    <button 
      onClick={rollDice}
      disabled={rolling}
      className={`h-16 w-16 bg-white rounded-lg shadow-lg flex items-center justify-center text-3xl font-bold
        ${rolling ? 'animate-spin' : 'hover:bg-gray-100 cursor-pointer'}`}
    >
      {value}
    </button>
  );
};

export default Dice;