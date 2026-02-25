import React, { useEffect, useState, useRef } from "react";
import { Pregunta } from "../PreguntaEdit/PreguntaEdit.jsx";
import Pagination from "react-bootstrap/Pagination";
import { Button } from "react-bootstrap";
import "../PreguntaEdit/PreguntaEdit.css";
import "./PreguntasEdit.css";

const Preguntas = () => {

    const [questions, setQuestions] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [selectedQuestions, setSelectedQuestions] = useState([]);
    const preguntasRefs = useRef({});

    const questionsPerPage = 10;


    // FETCH inicial
    useEffect(() => {

        fetch("http://localhost:8080/api/fast")
            .then(res => res.json())
            .then(data => {

                const initialized = data.map(q => ({
                    ...q
                }));

                setQuestions(initialized);

            })
            .catch(error => console.error(error));

    }, []);



    // PAGINACIÓN
    const indexOfLastQuestion = currentPage * questionsPerPage;
    const indexOfFirstQuestion = indexOfLastQuestion - questionsPerPage;

    const currentQuestions = questions.slice(
        indexOfFirstQuestion,
        indexOfLastQuestion
    );

    const totalPages = Math.ceil(
        questions.length / questionsPerPage
    );



    // CHECKBOX
    const toggleSelect = (id) => {

        setSelectedQuestions(prev =>

            prev.includes(id)
                ? prev.filter(x => x !== id)
                : [...prev, id]

        );

    };



    



    // EDITAR INDIVIDUAL (nuevo)
    const handleEditComplete = (id, newPrompt, newResponse) => {

        setQuestions(prev =>
            prev.map(q =>
                q.id === id
                    ? {
                        ...q,
                        prompt: newPrompt,
                        response: newResponse
                    }
                    : q
            )
        );

    };



    // ELIMINAR SELECCIONADAS usando la función de cada pregunta
    const borrarSeleccionadas = () => {
        if (selectedQuestions.length === 0) return;

        // Llamar la función eliminarPregunta de cada Pregunta seleccionada
        selectedQuestions.forEach(id => {
            if (preguntasRefs.current[id]) {
                preguntasRefs.current[id].eliminarPregunta();
            }
        });
    };

    // ELIMINAR INDIVIDUAL (desde cada Pregunta)
    const handleDeleteComplete = (id) => {
        setSelectedQuestions(prev => prev.filter(x => x !== id));
        // Limpiar referencia
        delete preguntasRefs.current[id];
    };



    // PAGINACIÓN dinámica
    const getPaginationItems = () => {

        const items = [];

        let startPage = Math.max(currentPage - 2, 1);
        let endPage = Math.min(startPage + 4, totalPages);

        if (endPage - startPage < 4)
            startPage = Math.max(endPage - 4, 1);


        for (let number = startPage; number <= endPage; number++) {

            items.push(

                <Pagination.Item
                    key={number}
                    active={number === currentPage}
                    onClick={() => setCurrentPage(number)}
                >
                    {number}
                </Pagination.Item>

            );

        }

        return items;

    };



    return (

        <>

            {currentQuestions.map((pregunta) => (

                <Pregunta

                    ref={el => preguntasRefs.current[pregunta.id] = el}

                    key={pregunta.id}

                    pregunta={pregunta}

                    isSelected={
                        selectedQuestions.includes(pregunta.id)
                    }

                    toggleSelect={toggleSelect}

                    onDeleteComplete={handleDeleteComplete}

                    onEditComplete={handleEditComplete}

                />

            ))}



            <div className="d-flex justify-content-end mb-3">

                <Button
                    variant="outline-danger"
                    onClick={borrarSeleccionadas}
                    disabled={
                        selectedQuestions.length === 0
                    }
                >
                    Eliminar seleccionadas
                    ({selectedQuestions.length})
                </Button>

            </div>



            {totalPages > 1 && (

                <div className="d-flex justify-content-center mt-4">

                    <Pagination>

                        <Pagination.First
                            onClick={() => setCurrentPage(1)}
                            disabled={currentPage === 1}
                        />

                        <Pagination.Prev
                            onClick={() =>
                                setCurrentPage(prev =>
                                    Math.max(prev - 1, 1)
                                )
                            }
                            disabled={currentPage === 1}
                        />

                        {getPaginationItems()}

                        <Pagination.Next
                            onClick={() =>
                                setCurrentPage(prev =>
                                    Math.min(prev + 1, totalPages)
                                )
                            }
                            disabled={
                                currentPage === totalPages
                            }
                        />

                        <Pagination.Last
                            onClick={() =>
                                setCurrentPage(totalPages)
                            }
                            disabled={
                                currentPage === totalPages
                            }
                        />

                    </Pagination>

                </div>

            )}

        </>

    );

};

export default Preguntas;
