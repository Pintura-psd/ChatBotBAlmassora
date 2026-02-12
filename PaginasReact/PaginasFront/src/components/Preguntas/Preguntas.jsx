import React, { useEffect, useState } from "react";
import { Pregunta } from "../../Pregunta/Pregunta.jsx";
import Pagination from "react-bootstrap/Pagination";
import { Button } from "react-bootstrap";
import "../../Pregunta/Pregunta.css";
import "./Preguntas.css";

const Preguntas = () => {
    const [questions, setQuestions] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [selectedQuestions, setSelectedQuestions] = useState([]);
    const questionsPerPage = 10;

    // Fetch preguntas
    useEffect(() => {
        fetch("http://localhost:8080/api/admin")
            .then(res => res.json())
            .then(data => {
                const initialized = data.map(q => ({
                    ...q,
                    deleting: false,
                    showMessage: false,
                    mensaje: "",
                }));
                setQuestions(initialized);
            })
            .catch(error => console.error(error));
    }, []);

    const indexOfLastQuestion = currentPage * questionsPerPage;
    const indexOfFirstQuestion = indexOfLastQuestion - questionsPerPage;
    const currentQuestions = questions.slice(indexOfFirstQuestion, indexOfLastQuestion);
    const totalPages = Math.ceil(questions.length / questionsPerPage);

    const toggleSelect = (id) => {
        setSelectedQuestions(prev =>
            prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]
        );
    };

    // Borrar preguntas seleccionadas pero mantener divs rojos
    const borrarSeleccionadas = () => {
        if (selectedQuestions.length === 0) return;

        setQuestions(prev =>
            prev.map(q =>
                selectedQuestions.includes(q.id)
                    ? {
                        ...q,
                        deleting: true,
                        showMessage: true,
                        mensaje: "Se ha eliminado correctamente"
                    }
                    : q
            )
        );

        // Limpiamos selección pero dejamos los divs visibles
        setSelectedQuestions([]);
    };

    // Paginación dinámica (solo 5 páginas alrededor de la actual)
    const getPaginationItems = () => {
        const items = [];
        let startPage = Math.max(currentPage - 2, 1);
        let endPage = Math.min(startPage + 4, totalPages);
        if (endPage - startPage < 4) startPage = Math.max(endPage - 4, 1);

        for (let number = startPage; number <= endPage; number++) {
            items.push(
                <Pagination.Item
                    key={number}
                    active={number === currentPage}
                    onClick={() => setCurrentPage(number)}
                    className="text-white"
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
                    key={pregunta.id}
                    pregunta={pregunta}
                    isSelected={selectedQuestions.includes(pregunta.id)}
                    toggleSelect={toggleSelect}
                />
            ))}

            {/* Botón siempre visible */}
            <div className="d-flex justify-content-end mb-3">
                <Button
                    variant="outline-danger"
                    onClick={borrarSeleccionadas}
                    disabled={selectedQuestions.length === 0}
                >
                    Eliminar seleccionadas ({selectedQuestions.length})
                </Button>
            </div>

            {/* Paginación */}
            {totalPages > 1 && (
                <div className="d-flex justify-content-center mt-4" data-bs-theme="dark">
                    <Pagination>
                        <Pagination.First
                            onClick={() => setCurrentPage(1)}
                            disabled={currentPage === 1}
                        />
                        <Pagination.Prev
                            onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                            disabled={currentPage === 1}
                        />
                        {getPaginationItems()}
                        <Pagination.Next
                            onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                            disabled={currentPage === totalPages}
                        />
                        <Pagination.Last
                            onClick={() => setCurrentPage(totalPages)}
                            disabled={currentPage === totalPages}
                        />
                    </Pagination>
                </div>
            )}
        </>
    );
};

export default Preguntas;
