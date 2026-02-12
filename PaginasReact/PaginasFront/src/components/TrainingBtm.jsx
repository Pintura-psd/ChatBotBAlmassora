import { useEffect, useState } from "react";
import { Button, Spinner } from "react-bootstrap";


export default function TrainingBtn() {
  const [entrenamientos, setEntrenamientos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isTraining, setIsTraining] = useState(false);

  const fetchEntrenamientos = async () => {
    try {
      const response = await fetch("http://localhost:8080/entrenamientos");
      if (!response.ok) throw new Error("Error al cargar entrenamientos");
      const data = await response.json();
      setEntrenamientos(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEntrenamientos();
  }, []);

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

      setEntrenamientos((prev) => [...prev, nuevoEntrenamiento]);

    } catch (error) {
      console.error(error);
    } finally {
      setIsTraining(false);
    }
  };

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center" style={{ height: 350 }}>
      </div>
    );
  }

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
