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
            {questions.map((pregunta) => (
              <Pregunta key={pregunta.id} pregunta={pregunta} />
            ))}
            </tbody>
        </table>
    );
}

export default Preguntas;
