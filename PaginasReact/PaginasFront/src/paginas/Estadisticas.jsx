import Pie from "../components/Estadisticas/Pie/Pie.jsx";
import Barras from "../components/Estadisticas/Barras/Barras.jsx";
import BarrasGradiante from "../components/Estadisticas/Barras/BarrasGradiante.jsx";
import Top5Preguntas from "../components/Estadisticas/Top5/Top5Preguntas.jsx" ;
import "./Estadisticas.css";
import { Container, Card, Form } from "react-bootstrap";
import { useState } from "react";
import TrainingBtn from "../components/TrainingBtn.jsx";

export const Estadisticas = () => {
    const [mostrarBarrasGradiante, setMostrarBarrasGradiante] = useState(false);
    
    return (
        <section>
            <div className="row p-2">
                <div className="col-lg-8 p-2">
                    <Card className={`mb-3 rounded-3 border border-dark p-0 barras-card`}>
                        <Card.Header className="bg-dark text-white fw-semibold px-4 py-3 border-0 d-flex justify-content-between align-items-center">
                            Estrada de tráfico mensual
                            <Form.Check
                                type="switch"
                                id="custom-switch"
                                label="Mostrar gráfico alternativo"
                                onChange={() => setMostrarBarrasGradiante(prev => !prev)}
                                className="secondary-switch text-white"
                            />
                        </Card.Header>

                        <Card.Body className="p-4">
                            {mostrarBarrasGradiante ? (<BarrasGradiante />) : (<Barras />)}
                        </Card.Body>
                    </Card>
                </div>

                <div className="col-lg-4 p-2">
                    <div className="row">
                        <Card className={`mb-3 rounded-3 border border-dark p-0 pie-card`}>
                            <Card.Header className="bg-dark text-white fw-semibold px-4 py-3 border-0">
                                Estadísticas del ChatBot
                            </Card.Header>

                            <Card.Body className="d-flex justify-content-center align-items-center" style={{ minHeight: '300px' }} >
                                <div className="w-100" style={{ maxWidth: '300px' }}>
                                    <Pie />
                                </div>
                            </Card.Body>
                        </Card>
                    </div>
                    <div className="row">
                        <Top5Preguntas />
                    </div>

                </div>
            </div>

            
        </section>
    )
}