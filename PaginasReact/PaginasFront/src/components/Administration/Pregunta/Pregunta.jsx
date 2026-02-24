import React, { useState, useRef } from 'react';
import { Card, FloatingLabel, Form, Button } from 'react-bootstrap';
import './PreguntaEdit.css';

export const Pregunta = ({
    pregunta,
    isSelected,
    toggleSelect,
    onDeleteComplete
}) => {

    // Estados editables
    const [prompt, setPrompt] = useState(pregunta.prompt);
    const [respuesta, setRespuesta] = useState(pregunta.response);

    // Estados UI
    const [loading, setLoading] = useState(false);
    const [action, setAction] = useState(''); // 'save' | 'delete' | ''
    const [slideOut, setSlideOut] = useState(false);
    const [collapsed, setCollapsed] = useState(false);
    const [mensaje, setMensaje] = useState('');

    const wrapperRef = useRef(null);


    // Animación
    const triggerAnimation = (actionType, msg) => {

        setMensaje(msg);

        // fijar altura actual
        const height = wrapperRef.current.offsetHeight;
        wrapperRef.current.style.height = `${height}px`;

        setAction(actionType);

        requestAnimationFrame(() => {
            requestAnimationFrame(() => {
                setSlideOut(true);
            });
        });

        setTimeout(() => {
            setCollapsed(true);
        }, 300);
    };


    // EDITAR
    const editarPregunta = async () => {

        setLoading(true);

        try {

            const res = await fetch(`/api/${pregunta.id}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    prompt: prompt,
                    response: respuesta
                })
            });

            if (res.ok) {

                triggerAnimation(
                    'save',
                    'Se ha editado correctamente'
                );

            } else {

                console.error("Error al editar");

            }

        } catch (error) {

            console.error(error);

        } finally {

            setLoading(false);

        }

    };


    // ELIMINAR
    const eliminarPregunta = async () => {

        setLoading(true);

        try {

            const res = await fetch(`/api/${pregunta.id}`, {
                method: 'DELETE'
            });

            if (res.ok || res.status === 404) {

                triggerAnimation(
                    'delete',
                    'Se ha eliminado correctamente'
                );

                setTimeout(() => {
                    onDeleteComplete(pregunta.id);
                }, 300);

            } else {

                console.error("Error al eliminar");

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

            {/* fondo animado */}
            <div className={`pregunta-background rounded-3 ${action}`}>
                {action && <p>{mensaje}</p>}
            </div>


            {/* tarjeta */}
            <Card
                className={`
                    mb-3 
                    rounded-3 
                    overflow-hidden 
                    border border-dark 
                    p-0 
                    pregunta-card 
                    ${slideOut ? `slide-out-${action}` : ''}
                `}
            >

                {/* HEADER editable */}
                <Card.Header
                    className="
                        bg-dark 
                        text-white 
                        fw-semibold 
                        px-4 
                        py-3 
                        border-0 
                        d-flex 
                        justify-content-between 
                        align-items-center
                        gap-3
                    "
                >

                    <Form.Control
                        type="text"
                        value={prompt}
                        onChange={(e) => setPrompt(e.target.value)}
                        className="bg-dark text-white border-light fw-semibold"
                    />

                    <Form.Check
                        type="checkbox"
                        checked={isSelected}
                        onChange={() => toggleSelect(pregunta.id)}
                        className="text-white"
                    />

                </Card.Header>


                {/* BODY */}
                <Card.Body className="p-4">

                    <FloatingLabel
                        controlId={`res-${pregunta.id}`}
                        label="Escribe la respuesta aquí"
                        className="mb-3"
                    >

                        <Form.Control
                            as="textarea"
                            value={respuesta}
                            onChange={(e) => setRespuesta(e.target.value)}
                            className="border-1 border-dark"
                            placeholder="Respuesta"
                            style={{ height: '100px' }}
                        />

                    </FloatingLabel>


                    {/* BOTONES */}
                    <div className="d-flex justify-content-end gap-2">

                        <Button
                            variant="outline-success"
                            onClick={editarPregunta}
                            disabled={loading}
                        >
                            {loading
                                ? "Guardando..."
                                : "Guardar cambios"
                            }
                        </Button>


                        <Button
                            variant="outline-danger"
                            onClick={eliminarPregunta}
                            disabled={loading}
                        >
                            {loading
                                ? "Eliminando..."
                                : "Eliminar"
                            }
                        </Button>

                    </div>

                </Card.Body>

            </Card>

        </div>

    );

};
