import { useEffect, useState } from "react";
import { Card, ListGroup } from "react-bootstrap";
import './Top5Preguntas.css';
import LoadingDisc from "./LoadingDisc.jsx";

export default function Top5Preguntas() {
  const [estadisticas, setEstadisticas] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEstadisticas = async () => {
      try {
        const response = await fetch("http://localhost:8080/estadisticas");

        if (!response.ok) {
          throw new Error("Error al obtener estadísticas");
        }

        const data = await response.json();
        setEstadisticas(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchEstadisticas();
  }, []);

  if (loading) return <div className="d-flex justify-content-center align-items-center" style={{ height: '350px' }}><LoadingDisc/></div>;

  const top5 = estadisticas?.top5Preguntas || [];

  return (
    <Card className={`mb-3 rounded-3 border border-dark p-0 pie-card`}>
      <Card.Header className="bg-dark text-white fw-semibold px-4 py-3 border-0">
        Preguntas más frecuentes (última hora)
      </Card.Header>

      <Card.Body className="d-flex justify-content-center align-items-center">
        {top5.length > 0 ? (
          <ListGroup className="mb-0 ps-3">
            {top5.map((pregunta, index) => (
            
              <ListGroup horizontal
                key={index}
                className={`mb-3 rounded-3 border border-dark p-0 top5card-card`}
              >
                    <ListGroup.Item className="col-10">
                        <span className="me-3">{pregunta.pregunta}</span>
                    </ListGroup.Item>
                
                    <ListGroup.Item className="col-2 border border-dark bg-dark justify-content-center d-flex align-items-center text-white fw-semibold">
                        {pregunta.repeticiones}
                    </ListGroup.Item>
                </ListGroup>
           
            ))}
           </ListGroup>
        ) : (
          <p className="text-muted fst-italic mb-0">
            No hay datos disponibles en la última hora.
          </p>
        )}
      </Card.Body>
    </Card>
  );
}

