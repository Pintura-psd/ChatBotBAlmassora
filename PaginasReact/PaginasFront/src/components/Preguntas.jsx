import React, { useEffect, useState } from "react";
import { Pregunta } from "./Pregunta.jsx";
import "./Pregunta.css";
const Preguntas = () => {

    const [questions, setQuestions] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const questionsPerPage = 20;


    useEffect(() => {
        // Fetch questions from backend API when component mounts
        fetch("http://localhost:8080/api/admin")
            .then(response => response.json())
            .then(data => {
                // Update state with fetched questions
                setQuestions(data);
            })
    }, []);

    const indexOfLastQuestion = currentPage * questionsPerPage;
    const indexOfFirstQuestion = indexOfLastQuestion - questionsPerPage;

    const currentQuestions = questions.slice(
        indexOfFirstQuestion,
        indexOfLastQuestion
    );

    const totalPages = Math.ceil(questions.length / questionsPerPage);

    return (

        <>
            {currentQuestions.map((pregunta) => (
                <Pregunta key={pregunta.id} pregunta={pregunta} />
            ))}

            <div className="d-flex justify-content-center mt-3">
                {Array.from({ length: totalPages }, (_, index) => (
                    <button
                        key={index}
                        className="btn btn-outline-dark mx-1"
                        onClick={() => setCurrentPage(index + 1)}
                    >
                        {index + 1}
                    </button>
                ))}
            </div>
            
        </>
    );
}

export default Preguntas;
