import React, { useState, useRef } from 'react';
import { Card, FloatingLabel, Form, Button } from 'react-bootstrap';
import './PreguntaEdit.css';

export const Pregunta = ({
    pregunta,
    isSelected,
    toggleSelect,
    onDeleteComplete,
    onEditComplete
}) => {
    const [respuesta, setRespuesta] = useState(pregunta.response);
    const [prompt, setPrompt] = useState(pregunta.prompt);
    const [loading, setLoading] = useState(false);

    const [action, setAction] = useState('');        // 'save' | 'delete' | ''
    const [slideOut, setSlideOut] = useState(false); // dispara el deslizamiento
    const [collapsed, setCollapsed] = useState(false); // colapsa wrapper

    const wrapperRef = useRef(null);

    // ---------- Animación ----------
    const triggerAnimation = (actionType, mensaje, callback) => {
        pregunta.mensaje = mensaje;

        const height = wrapperRef.current?.offsetHeight || 0;
        wrapperRef.current.style.height = `${height}px`;

        setAction(actionType);

        // Deslizar tarjeta
        requestAnimationFrame(() => {
            requestAnimationFrame(() => setSlideOut(true));
        });

        // Colapsar wrapper después del slide
        setTimeout(() => {
            setCollapsed(true);
            // Esperar colapso antes de notificar al padre
            setTimeout(() => {
                if (callback) callback();
            }, 500); // coincide con transition: height 0.5s
        }, 300); // coincide con transition: transform 0.3s
    };

    // ---------- Editar ----------
    const editarPregunta = async () => {
        setLoading(true);
        try {
            const res = await fetch(`/api/fast`, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ id: pregunta.id, prompt, response: respuesta })
            });
            if (res.ok) {
                triggerAnimation('save', 'Se ha editado correctamente');
                if (onEditComplete) onEditComplete(pregunta.id, prompt, respuesta);
            }
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    // ---------- Eliminar ----------
    const eliminarPregunta = async () => {
        setLoading(true);
        try {
            const res = await fetch(`/fast${pregunta.id}`, { method: 'DELETE' });
            if (res.ok || res.status === 404) {
                triggerAnimation('delete', 'Se ha eliminado correctamente', () => {
                    if (onDeleteComplete) onDeleteComplete(pregunta.id);
                });
            }
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    // Se mantiene renderizado tras la animación para mostrar el fondo

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
                <Card.Header className="bg-dark text-white fw-semibold px-4 py-3 border-0 d-flex justify-content-between align-items-center gap-3">
                    <Form.Control
                        as="textarea"
                        value={prompt}
                        onChange={(e) => setPrompt(e.target.value)}
                        className="bg-dark text-white border-light fw-semibold"
                        style={{ resize: 'none', overflow: 'hidden', minHeight: '38px', maxHeight: '150px' }}
                    />
                    <Form.Check
                        type="checkbox"
                        checked={isSelected}
                        onChange={() => toggleSelect(pregunta.id)}
                        className="text-white flex-shrink-0"
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
                        <Button variant="outline-success" onClick={editarPregunta} disabled={loading}>
                            {loading ? "Guardando..." : "Guardar cambios"}
                        </Button>
                        <Button variant="outline-danger" onClick={eliminarPregunta} disabled={loading}>
                            {loading ? "Eliminando..." : "Eliminar"}
                        </Button>
                    </div>
                </Card.Body>
            </Card>
        </div>
    );
};
