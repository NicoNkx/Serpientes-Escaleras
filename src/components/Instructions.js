import React from 'react';

const Instructions = ({ onClose }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-xl max-w-md w-full">
        <h2 className="text-2xl font-bold mb-4">Instrucciones</h2>
        <ul className="list-disc pl-5 space-y-2 mb-6">
          <li>Selecciona de 1 a 4 jugadores</li>
          <li>Tira el dado para moverte por el tablero</li>
          <li>Si caes en una escalera casilla dorada, sube a la casilla superior</li>
          <li>Si caes en una serpiente casilla azul, baja a la casilla inferior</li>
          <li>Las últimas 4 casillas son especiales</li>
          <li>El primero en llegar a la casilla 100 gana</li>
        </ul>
        <button 
          onClick={onClose}
          className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
        >
          Entendido
        </button>
      </div>
    </div>
  );
};

export default Instructions;