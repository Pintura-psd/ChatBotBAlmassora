import React, { useState, useRef } from 'react';
import { Card, FloatingLabel, Form, Button } from 'react-bootstrap';
import './Pregunta.css';

export const Pregunta = ({ pregunta, isSelected, toggleSelect, onDeleteComplete }) => {
    const [respuesta, setRespuesta] = useState(pregunta.response);
    const [loading, setLoading] = useState(false);
    const [action, setAction] = useState('');        // 'save' | 'delete' | ''
    const [slideOut, setSlideOut] = useState(false); // dispara el deslizamiento de la tarjeta
    const [collapsed, setCollapsed] = useState(false); // contrae el wrapper DESPUÉS del slide
    const wrapperRef = useRef(null);

    const triggerAnimation = (actionType, mensaje) => {
        pregunta.mensaje = mensaje;

        // Paso 1: fijar la altura actual del wrapper para que no colapse todavía
        const height = wrapperRef.current.offsetHeight;
        wrapperRef.current.style.height = `${height}px`;

        // Paso 2: mostrar el fondo
        setAction(actionType);

        // Paso 3: un frame después, deslizar la tarjeta
        requestAnimationFrame(() => {
            requestAnimationFrame(() => {
                setSlideOut(true);
            });
        });

        // Paso 4: cuando termine el slide (0.3s), contraer el wrapper a 50px
        setTimeout(() => setCollapsed(true), 300);
    };

    const guardarRespuesta = async () => {
        setLoading(true);
        try {
            const res = await fetch('/api/', {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ id: pregunta.id, prompt: pregunta.prompt, response: respuesta })
            });
            if (res.ok) {
                triggerAnimation('save', 'Se ha guardado correctamente');
            }
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    const borrarPregunta = async () => {
        setLoading(true);
        try {
            const res = await fetch(`api/${pregunta.id}`, { method: 'DELETE' });
            if (res.ok || res.status === 404) {
                triggerAnimation('delete', 'Se ha eliminado correctamente');
            }
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    const wrapperClass = [
        'pregunta-wrapper',
        action ? 'show-message' : '',
        collapsed ? action : '',
    ].join(' ');

    return (
        <div className={wrapperClass} ref={wrapperRef}>
            <div className={`pregunta-background rounded-3 ${action}`}>
                {action && <p>{pregunta.mensaje}</p>}
            </div>

            <Card className={`mb-3 rounded-3 overflow-hidden border border-dark p-0 pregunta-card ${slideOut ? `slide-out-${action}` : ''}`}>
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
