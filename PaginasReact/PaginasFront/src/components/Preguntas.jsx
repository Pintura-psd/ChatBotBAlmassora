import React, {useState} from "react";
import {Enviar} from "./Enviar.jsx";

const Preguntas = ({ questions }) => {

    const [respuestas, setRespuestas] = useState({});

    const enviar = (p) => {
        const respuesta= respuestas[p.id]|| "";
        //fetch api
        fetch("http://localhost:8000/enviar", {
            method: "POST",
            headers: {}
        })

    }

    return (
        <table className="table table-striped table-hover align-middle">
            <thead className="table-dark">
            <tr>
                <th>Pregunta</th>
            </tr>
            </thead>
            <tbody>
            {questions.map((p) => (
                <tr key={p.id}>
                    <td className="fw-semibold align-top">
                        <label htmlFor={"respuesta-" + p.id}>{p.pregunta}</label>
                        <form className="mt-2" onSubmit={(e) => e.preventDefault()}>
                <textarea
                    value={p.respuesta}
                    onSubmit={(e) =>
                        setRespuestas({ ...respuestas, [p.id]: e.target.value })
                    }
                    rows={3}
                    placeholder="Escribe tu respuesta"
                ></textarea>
                            <button onClick={() => enviar(p)}>Enviar</button>
                        </form>
                    </td>
                </tr>
            ))}
            </tbody>
        </table>
    );
};

export default Preguntas;
