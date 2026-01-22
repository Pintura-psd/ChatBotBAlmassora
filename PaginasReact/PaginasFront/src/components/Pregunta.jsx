import React, { useState } from 'react'

export const Pregunta = ({ pregunta }) => {
    const [respuesta, setRespuesta] = useState(pregunta.response);
    const [loading, setLoading] = useState(false);
    const [mensaje, setMensaje] = useState('');

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
            } else {
                setMensaje('Error al guardar la respuesta');
            }
        } catch (error) {
            setMensaje('Error de conexión: ' + error.message);
        } finally {
            setLoading(false);
        }
    }

    return (
    <tr>
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
            <button className="btn btn-danger mt-2">Eliminar</button>
        </td>
    </tr>
  )
}
