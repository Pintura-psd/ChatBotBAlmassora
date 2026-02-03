import React, { useState } from 'react';
import { Card, FloatingLabel, Form, Button } from 'react-bootstrap';
import './Pregunta.css';

export const Pregunta = ({ pregunta}) => {
    const [respuesta, setRespuesta] = useState(pregunta.response);
    const [loading, setLoading] = useState(false);
    const [action, setAction] = useState(''); // "" | "save" | "delete"
    const [mensaje, setMensaje] = useState(''); // mensaje que se muestra en el div
    const [showMessage, setShowMessage] = useState(false); // controla la visibilidad del mensaje

    const guardarRespuesta = async () => {
        setLoading(true);
        setAction('save'); 

        try {
            const response = await fetch('http://localhost:8080/api/', {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    id: pregunta.id,
                    prompt: pregunta.prompt,
                    response: respuesta
                })
            });

            if (response.ok) {
                // Mostramos la card deslizando
                setTimeout(() => {
                    setMensaje('Se ha guardado correctamente');
                    setShowMessage(true); // muestra el mensaje en el fondo
                }, 300); // espera a que la card se deslice
            } else {
                setAction('');
            }
        } catch (error) {
            console.error(error);
            setAction('');
        } finally {
            setLoading(false);
        }
    }

    const borrarPregunta = async () => {
        setLoading(true);
        setAction('delete'); 

        try {
            const response = await fetch(`http://localhost:8080/api/${pregunta.id}`, {
                method: 'DELETE',
            });

            if (response.ok || response.status === 404) {
                setTimeout(() => {
                    setMensaje('Se ha eliminado correctamente');
                    setShowMessage(true);
                }, 300);
            } else {
                setAction('');
            }
        } catch (error) {
            console.error(error);
            setAction('');
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className={`pregunta-wrapper ${action} ${showMessage ? 'show-message' : ''}`}>
            <div className="pregunta-background rounded-3 text-white">
                {showMessage && <p>{mensaje}</p>}
            </div>

            {/* La card siempre está mientras hay acción o no */}
            <Card className={`mb-3 rounded-3 overflow-hidden border border-dark p-0 pregunta-card ${action ? 'animating' : ''}`}>
                <Card.Header className="bg-dark text-white fw-semibold px-4 py-3 border-0">
                    {pregunta.prompt}
                </Card.Header>
                <Card.Body className="p-4">
                    <FloatingLabel
                        controlId={`res-${pregunta.id}`}
                        label="Escribe la respuesta aquí."
                        className="mb-3"
                    >
                        <Form.Control
                            as="textarea"
                            className="border-1 border-dark"
                            placeholder="Respuesta"
                            value={respuesta}
                            onChange={(e) => setRespuesta(e.target.value)}
                            style={{ height: '100px' }}
                        />
                    </FloatingLabel>

                    <div className="d-flex justify-content-end gap-2">
                        <Button variant="outline-success" onClick={guardarRespuesta} disabled={loading}>
                            {loading ? 'Guardando...' : 'Guardar'}
                        </Button>
                        <Button variant="outline-danger" onClick={borrarPregunta} disabled={loading}>
                            Eliminar
                        </Button>
                    </div>
                </Card.Body>
            </Card>
        </div>
    );
}