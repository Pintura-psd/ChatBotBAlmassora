import { useState, useEffect } from "react";
import { Button, Spinner } from "react-bootstrap";


export default function TrainingBtn() {
  const [entrenamientos, setEntrenamientos] = useState([]);
  const [isTraining, setIsTraining] = useState(false);

  const fetchEntrenamientos = async () => {
    try {
      const response = await fetch("/entrenamientos");
      if (!response.ok) throw new Error("Error al cargar entrenamientos");
      const data = await response.json();
      setEntrenamientos(data);
    } catch (error) {
      console.error(error);
    } finally {
      setIsTraining(false);
    }
  };

  useEffect(() => {
    fetchEntrenamientos();
  }, []);

  const handleEntrenar = async () => {
    setIsTraining(true);

    try {
      const response = await fetch(
        "/estadisticas/entrenar",
        { method: "POST" }
      );

      if (!response.ok) {
        throw new Error("Error entrenando");
      }

      const nuevoEntrenamiento = await response.json();

      setEntrenamientos((prev) => [...prev, nuevoEntrenamiento]);

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
