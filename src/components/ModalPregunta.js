import React, { useState } from 'react';

const ModalPregunta = ({ isOpen, caso, onClose, onRespuestaCorrecta }) => {
  const [seleccion, setSeleccion] = useState(null);
  const [mensaje, setMensaje] = useState('');

  if (!isOpen || !caso) return null;

  const handleClick = (opcion) => {
    setSeleccion(opcion);
    if (opcion === caso.correcta) {
      setMensaje('¡Respuesta correcta!');
      onRespuestaCorrecta();
    } else {
      setMensaje('Respuesta incorrecta.');
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-80">
        <h2 className="text-xl font-bold mb-4">Pregunta</h2>
        <p className="mb-4">{caso.pregunta}</p>
        <div className="space-y-2">
          {caso.respuestas.map((r, i) => (
            <button
              key={i}
              onClick={() => handleClick(r.tipo)}
              className="w-full px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              {r.tipo}
            </button>
          ))}
        </div>
        {mensaje && <p className="mt-4 text-center">{mensaje}</p>}
        <div className="mt-4 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
          >Cerrar</button>
        </div>
      </div>
    </div>
  );
};

export default ModalPregunta;
