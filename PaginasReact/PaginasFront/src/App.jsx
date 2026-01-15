import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Preguntas from "./components/Preguntas.jsx";

function App() {
    const preguntas = [
        { id: 1, pregunta: "¿Qué es React?", respuesta:"" },
        { id: 2, pregunta: "¿Qué es JSX?",respuesta:"" },
        { id: 3, pregunta: "¿Qué es un componente?",respuesta:"" },
    ];

  return (
      <div className="container py-4">
    <Preguntas
        questions={preguntas}
    />
      </div>
  )
}

export default App
