import React, {useEffect, useState} from "react";
import { Pregunta } from "./Pregunta.jsx";
const Preguntas = () => {
   
    const [questions, setQuestions] = useState([]);

    useEffect(() => {
        // Fetch questions from backend API when component mounts
        fetch("http://localhost:8080/admin")
            .then(response => response.json())
            .then(data => {
                // Update state with fetched questions
                setQuestions(data);
            })
    },[])

    return (
        <table className="table table-striped">
            <thead>
            <tr>
                <th>Pregunta</th>
                <th>Acción</th>
            </tr>
            </thead>
            <tbody>
<<<<<<< HEAD
            {questions.map((pregunta) => (
              <Pregunta key={pregunta.id} pregunta={pregunta} />
=======
            {questions.map((p) => (
                <tr key={p.id}>
                    <td className="fw-semibold align-top">
                        <label htmlFor={"respuesta-" + p.id}>{p.pregunta}</label>
                        <form
                            className="mt-2"
                            onSubmit={(e) => e.preventDefault()}>
                <textarea
                    value={p.respuesta}
                    onSubmit={(e) =>
                        setRespuestas({ ...respuestas, [p.id]: e.target.value })
                    }
                    rows={3}
                    placeholder="Escribe tu respuesta"
                ></textarea>
                            <button type="submit" className="btn btn-success">
                                Enviar
                            </button>
                        </form>
                    </td>
                </tr>
>>>>>>> main
            ))}
            </tbody>
        </table>
    );
}

export default Preguntas;
