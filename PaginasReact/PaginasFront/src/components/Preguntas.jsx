import React, {useEffect, useState} from "react";
import { Pregunta } from "./Pregunta.jsx";
import { Table } from "react-bootstrap";
const Preguntas = () => {
   
    const [questions, setQuestions] = useState([]);

    useEffect(() => {
        // Fetch questions from backend API when component mounts
        fetch("http://localhost:8080/api/admin")
            .then(response => response.json())
            .then(data => {
                // Update state with fetched questions
                setQuestions(data);
            })
    },[]);

    return (
        <div className="rounded-4 overflow-hidden">
             <Table striped bordered hover variant="dark">
                <thead>
                <tr>
                    <th className="w-75">Pregunta</th>
                    <th className="w-25 text-end">Acción</th>
                </tr>
                </thead>
                <tbody>
                {questions.map((pregunta) => (
                <Pregunta key={pregunta.id} pregunta={pregunta} />
                ))}
                </tbody>
            </Table>
        </div>
    );
}

export default Preguntas;
