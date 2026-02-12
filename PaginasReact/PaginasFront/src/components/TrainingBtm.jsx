import { useState } from "react";
import { Button, Spinner } from "react-bootstrap";


export default function TrainingBtn() {
  const [entrenamientos, setEntrenamientos] = useState([]);
  const [isTraining, setIsTraining] = useState(false);

  // 🔹 Botón entrenar
  const handleEntrenar = async () => {
    setIsTraining(true);

    try {
      const response = await fetch(
        "http://localhost:8080/estadisticas/entrenar",
        { method: "POST" }
      );

      if (!response.ok) {
        throw new Error("Error entrenando");
      }

      const nuevoEntrenamiento = await response.json();

      // ✅ OPCIÓN 1: añadir directamente a la lista
      setEntrenamientos((prev) => [...prev, nuevoEntrenamiento]);

      // ✅ OPCIÓN 2 (más segura): recargar lista
      // await fetchEntrenamientos();

    } catch (error) {
      console.error(error);
    } finally {
      setIsTraining(false);
    }
  };

  return (
    <div>
      <Button  variant="outline-dark"
       onClick={handleEntrenar} 
       disabled={isTraining}
       >
        
        {isTraining ? (
          <>
            <Spinner size="sm" className="me-2" />
            Entrenando...
          </>
        ) : (
          "Entrenar chatbot"
        )}
      </Button>

      <ul className="mt-3">
        {entrenamientos.map((e, i) => (
          <li key={i}>{e.mensaje}</li>
        ))}
      </ul>
    </div>
  );
}
