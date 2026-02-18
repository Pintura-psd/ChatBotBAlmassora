import React, { useState, useEffect } from 'react';
import { Card, FloatingLabel, Form, Button } from 'react-bootstrap';
import './Pregunta.css';

export const Pregunta = ({ pregunta, isSelected, toggleSelect, onDeleteComplete }) => {
    const [respuesta, setRespuesta] = useState(pregunta.response);
    const [loading, setLoading] = useState(false);
    const [action, setAction] = useState('');
    const [isDeleting, setIsDeleting] = useState(false);

    // Cuando se está eliminando, no remover del DOM - solo mostrar la animación
    useEffect(() => {
        // No necesitamos hacer nada - la pregunta se queda ahí con el mensaje rojo visible
    }, []);

    const guardarRespuesta = async () => {
        setLoading(true);
        setAction('save');
        try {
            const res = await fetch('/api/', {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ id: pregunta.id, prompt: pregunta.prompt, response: respuesta })
            });
            if (res.ok) {
                pregunta.showMessage = true;
                pregunta.mensaje = "Se ha guardado correctamente";
            } else setAction('');
        } catch (error) {
            console.error(error);
            setAction('');
        } finally { setLoading(false); }
    };

    const borrarPregunta = async () => {
        setLoading(true);
        setAction('delete');
        try {
            const res = await fetch(`api/${pregunta.id}`, { method: 'DELETE' });
            if (res.ok || res.status === 404) {
                setIsDeleting(true); // Activar la animación de eliminación
                pregunta.mensaje = "Se ha eliminado correctamente";
            } else setAction('');
        } catch (error) {
            console.error(error);
            setAction('');
        } finally { setLoading(false); }
    };

    return (
        <div className={`pregunta-wrapper ${action} ${action ? 'show-message' : ''}`}>
            <div className="pregunta-background rounded-3 text-white">
                {action && <p>{pregunta.mensaje}</p>}
            </div>

            <Card className="mb-3 rounded-3 overflow-hidden border border-dark p-0 pregunta-card">
                <Card.Header className="bg-dark text-white fw-semibold px-4 py-3 border-0 d-flex justify-content-between align-items-center">
                    <span>{pregunta.prompt}</span>
                    <Form.Check
                        type="checkbox"
                        checked={isSelected}
                        onChange={() => toggleSelect(pregunta.id)}
                        className="text-white"
                    />
                </Card.Header>

                <Card.Body className="p-4">
                    <FloatingLabel controlId={`res-${pregunta.id}`} label="Escribe la respuesta aquí." className="mb-3">
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
};
