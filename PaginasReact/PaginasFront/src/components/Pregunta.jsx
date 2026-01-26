import React, { useState } from 'react'

export const Pregunta = ({ pregunta }) => {
    const [respuesta, setRespuesta] = useState(pregunta.response);
    const [loading, setLoading] = useState(false);
    const [mensaje, setMensaje] = useState('');
    const [borrada, setBorrada] = useState(false);

    const guardarRespuesta = async () => {
        setLoading(true);
        setMensaje('');
        try {
            const response = await fetch('http://localhost:8080/api', {
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
            } else {
                const error = await response.text();
                setMensaje('Error al guardar la respuesta: ' + error);
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
                setBorrada(true);
            } else {
                const error = await response.text();
                setMensaje('Error al eliminar la pregunta: ' + error);
            }
        } catch (error) {
            setMensaje('Error de conexión: ' + error.message);
        } finally {
            setLoading(false);
        }
    }

    return (
        <tr>
            {borrada ? (
                <td colSpan="2">Pregunta eliminada</td>
            ) : (
                <>
                    <td>
                        <h5>{pregunta.prompt}</h5>
                        <textarea 
                            name="respuesta" 
                            id={`res-${pregunta.id}`} 
                            value={respuesta}
                            onChange={(e) => setRespuesta(e.target.value)}
                        ></textarea>
                        {mensaje && <small className="d-block mt-2">{mensaje}</small>}
                    </td>
                    <td>
                        <button 
                            className="btn btn-primary" 
                            onClick={guardarRespuesta}
                            disabled={loading}
                        >
                            {loading ? 'Guardando...' : 'Guardar'}
                        </button>
                        <button className="btn btn-danger mt-2" onClick={borrarPregunta}>
                            Eliminar
                        </button>
                    </td>
                </>
            )}
        </tr>
    )
}
