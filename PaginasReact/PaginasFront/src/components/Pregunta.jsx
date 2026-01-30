import React, { useState } from 'react'
import { Card, FloatingLabel, Form, Button } from 'react-bootstrap';

export const Pregunta = ({ pregunta }) => {
    const [respuesta, setRespuesta] = useState(pregunta.response);
    const [loading, setLoading] = useState(false);
    const [mensaje, setMensaje] = useState('');
    const [preguntaBorrada, setPreguntaBorrada] = useState(false);
    const [preguntaGuardada, setPreguntaGuardada] = useState(false);


    const guardarRespuesta = async () => {
        setLoading(true);
        setMensaje('');
        try {
            const response = await fetch('http://localhost:8080/api/', {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    id: pregunta.id,
                    prompt: pregunta.prompt,
                    response: respuesta
                })
            });

            if (response.ok) {
                setMensaje('Respuesta guardada correctamente');
                setPreguntaGuardada(true);
            } else {
                setMensaje('Error al guardar la respuesta');
            }
        } catch (error) {
            setMensaje('Error de conexión: ' + error.message);
        } finally {
            setLoading(false);
        }
    }
    
    const borrarPregunta = async () => {
        setLoading(true);
        setMensaje('');
        try {
            const response = await fetch(`http://localhost:8080/api/${pregunta.id}`, {
                method: 'DELETE',
            });

            if (response.ok) {
                setMensaje('Pregunta eliminada correctamente');
                setPreguntaBorrada(true);
            } else {
                setMensaje('Error al eliminar la pregunta');
            }
        } catch (error) {
            setMensaje('Error de conexión: ' + error.message);
        } finally {
            setLoading(false);
        }
    }

    if (preguntaGuardada) {
        return <div className="text-center text-success p-3">Respuesta guardada</div>;
    }

    if (preguntaBorrada) {
        return <div className="text-center text-muted p-3">Pregunta eliminada</div>;
    }

    return (
        <Card className="mb-3">
            <Card.Header className="fw-semibold">
                {pregunta.prompt}
            </Card.Header>
            <Card.Body>
                <FloatingLabel
                    controlId={`res-${pregunta.id}`}
                    label="Respuesta"
                    className="mb-3"
                >
                    <Form.Control
                        as="textarea"
                        placeholder="Escribe la respuesta aquí"
                        value={respuesta}
                        onChange={(e) => setRespuesta(e.target.value)}
                        style={{ height: '150px' }}
                    />
                </FloatingLabel>
                
                {mensaje && <small className="d-block mb-3 text-info">{mensaje}</small>}
                
                <div className="d-flex gap-2">
                    <Button
                        variant="success"
                        onClick={guardarRespuesta}
                        disabled={loading}
                    >
                        {loading ? 'Guardando...' : 'Guardar'}
                    </Button>
                    <Button
                        variant="danger"
                        onClick={borrarPregunta}
                        disabled={loading}
                    >
                        Eliminar
                    </Button>
                </div>
            </Card.Body>
        </Card>
    );
}
