export const questions = [
  {
    pregunta: "Carlos 45 años, Dolor lumbar crónico por malas posturas",
    opciones: ["Madrid", "París", "Roma", "Berlín"],
    respuestaCorrecta: "París"
  },
  {
    pregunta: "¿Qué es 2 + 2?",
    opciones: ["3", "4", "5", "6"],
    respuestaCorrecta: "4"
  },
  {
    pregunta: "¿Qué lenguaje se usa para la web?",
    opciones: ["Python", "HTML", "C++", "Java"],
    respuestaCorrecta: "HTML"
  },
  {
    pregunta: "¿En qué continente se encuentra Egipto?",
    opciones: ["Asia", "Europa", "África", "América"],
    respuestaCorrecta: "África"
  },
  {
    pregunta: "¿Cuál es el animal más grande del mundo?",
    opciones: ["Elefante", "Ballena Azul", "Rinoceronte", "Jirafa"],
    respuestaCorrecta: "Ballena Azul"
  },
  {
    pregunta: "¿Quién escribió 'Cien años de soledad'?",
    opciones: ["Gabriel García Márquez", "Mario Vargas Llosa", "Carlos Fuentes", "Julio Cortázar"],
    respuestaCorrecta: "Gabriel García Márquez"
  },
  {
    pregunta: "¿Cuál es el país más grande del mundo por superficie?",
    opciones: ["China", "Canadá", "Estados Unidos", "Rusia"],
    respuestaCorrecta: "Rusia"
  },
  {
    pregunta: "¿Qué órgano humano es responsable de bombear la sangre?",
    opciones: ["Cerebro", "Estómago", "Corazón", "Hígado"],
    respuestaCorrecta: "Corazón"
  },
  {
    pregunta: "¿En qué año el hombre llegó a la Luna por primera vez?",
    opciones: ["1965", "1969", "1972", "1975"],
    respuestaCorrecta: "1969"
  },
  {
    pregunta: "¿Quién pintó la Mona Lisa?",
    opciones: ["Vincent van Gogh", "Pablo Picasso", "Leonardo da Vinci", "Claude Monet"],
    respuestaCorrecta: "Leonardo da Vinci"
  }
];

// Lógica para hacer la pregunta y devolver la respuesta
export const askQuestion = (questions) => {
  return new Promise((resolve) => {
    if (!questions.length) {
      resolve({ correcta: false }); // si no hay preguntas, devuelve incorrecta
      return;
    }

    const pregunta = questions[Math.floor(Math.random() * questions.length)];

    const modal = document.createElement("div");
    modal.className = "fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50";

    modal.innerHTML = `
      <div class="bg-white p-6 rounded-xl shadow-md max-w-md text-center space-y-4">
        <h2 class="text-xl font-bold text-gray-800">${pregunta.pregunta}</h2>
        ${pregunta.opciones.map((op, idx) => `
          <button data-index="${idx}" class="block w-full my-1 p-2 bg-blue-100 rounded hover:bg-blue-200">${op}</button>
        `).join('')}
      </div>
    `;

    document.body.appendChild(modal);

    modal.querySelectorAll("button").forEach(btn => {
      btn.addEventListener("click", () => {
        const index = parseInt(btn.getAttribute("data-index"));
        const correcta = pregunta.respuestaCorrecta === pregunta.opciones[index];
        modal.remove();
        resolve({ correcta });
      });
    });
  });
};
