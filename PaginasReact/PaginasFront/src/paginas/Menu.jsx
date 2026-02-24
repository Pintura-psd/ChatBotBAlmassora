import "./Menu.css";
import { Link } from "react-router-dom";
import { Container, Row, Col, Card, Button } from "react-bootstrap";

const DashboardCards = () => {
    return (
        <div className="bg-secondary text-dark py-5 min-vh-100">
            <Container>
                <div className="bg-white text-dark border border-dark rounded-5">   
                    
                    <div className="bg-dark text-white fw-semibold px-4 py-3 border-0 text-center rounded-top-5 pb-4 mb-4">
                        <h1>Selector</h1>
                    </div>
                

                    <Row className="justify-content-center">

                        {/* Menú Principal */}
                        <Col md={4} className="mb-4 d-flex justify-content-center">
                            <Card
                                className="mb-3 border border-dark p-0 rounded-5"
                                style={{ borderRadius: "5px", width: "400px" }}
                            >
                                <Card.Header className="bg-dark text-white fw-semibold px-4 py-3 border-0 rounded-top-5 text-center">
                                    <h3>Ayuntamiento Almassora</h3>
                                </Card.Header>

                                <Card.Body className="p-4 text-center">
                                    <div
                                        className="d-inline-flex align-items-center justify-content-center bg-primary rounded-circle mb-3"
                                        style={{ width: "80px", height: "80px" }}
                                    >
                                        <i className="bi bi-house-door-fill fs-1 text-white"></i>
                                    </div>

                                    <Card.Text className="text-dark opacity-75">
                                        Accede a la página principal del Ayuntamiento de Almassora, aquí podrás interactuar con el ChatBot, consultar información y mucho más.
                                    </Card.Text>
                                
                                </Card.Body>

                                <Card.Footer className="d-flex justify-content-center border-0">
                                    <Button 
                                    as={Link} 
                                    to="/"
                                    variant="outline-dark" 
                                    className="rounded-pill px-4"
                                    >

                                        Ir al Inicio
                                    </Button>
                                </Card.Footer>
                            </Card>
                        </Col>

                        {/* Estadísticas */}
                        <Col md={4} className="mb-4 d-flex justify-content-center">
                            <Card
                                className="mb-3 border border-dark p-0 rounded-5"
                                style={{ borderRadius: "5px", width: "400px" }}
                            >
                                <Card.Header className="bg-dark text-white fw-semibold px-4 py-3 border-0 rounded-top-5 text-center">
                                    <h3>Estadísticas</h3>
                                </Card.Header>

                                <Card.Body className="p-4 text-center">
                                    <div
                                        className="d-inline-flex align-items-center justify-content-center bg-warning rounded-circle mb-3"
                                        style={{ width: "80px", height: "80px" }}
                                    >
                                        <i className="bi bi-bar-chart-fill fs-1 text-white"></i>
                                    </div>

                                    <Card.Text className="text-dark opacity-75">
                                        Visualiza gráficos interactivos, métricas de rendimiento y
                                        análisis detallados de tus datos.
                                    </Card.Text>

                                </Card.Body>

                                <Card.Footer className="d-flex justify-content-center border-0">
                                    <Button 
                                    as={Link} 
                                    to="/estadisticas"
                                    variant="outline-dark" 
                                    className="rounded-pill px-4"
                                    >
                                        Ver Estadísticas
                                    </Button>
                                </Card.Footer>
                            </Card>
                        </Col>

                        {/* Responder Preguntas */}
                        <Col md={4} className="mb-4 d-flex justify-content-center">
                            <Card
                                className="mb-3 border border-dark p-0 rounded-5"
                                style={{ borderRadius: "5px", width: "400px" }}
                            >
                                <Card.Header className="bg-dark text-white fw-semibold px-4 py-3 border-0 rounded-top-5 text-center">
                                <h3> Responder Preguntas</h3>
                                </Card.Header>

                                <Card.Body className="p-4 text-center">
                                    <div
                                        className="d-inline-flex align-items-center justify-content-center bg-danger rounded-circle mb-3"
                                        style={{ width: "80px", height: "80px" }}
                                    >
                                        <i className="bi bi-question-circle-fill fs-1 text-white"></i>
                                    </div>

                                    <Card.Text className="text-dark opacity-75">
                                        Gestiona y responde preguntas de usuarios,
                                        administra el conocimiento y ayuda a tu comunidad.
                                    </Card.Text>

                                
                                </Card.Body>
                                <Card.Footer className="d-flex justify-content-center border-0">
                                    <Button
                                    as={Link} 
                                    to="/admin"
                                    variant="outline-dark" 
                                    className="rounded-pill px-4"
                                    >
                                        Responder Preguntas
                                    </Button>
                                </Card.Footer>
                            </Card>
                        </Col>

                        {/* Editar Preguntas */}
                        <Col md={4} className="mb-4 d-flex justify-content-center">
                            <Card
                                className="mb-3 border border-dark p-0 rounded-5"
                                style={{ borderRadius: "5px", width: "400px" }}
                            >
                                <Card.Header className="bg-dark text-white fw-semibold px-4 py-3 border-0 rounded-top-5 text-center">
                                    <h3>Editar Preguntas</h3>
                                </Card.Header>

                                <Card.Body className="p-4 text-center">
                                    <div
                                        className="d-inline-flex align-items-center justify-content-center bg-success rounded-circle mb-3"
                                        style={{ width: "80px", height: "80px" }}
                                    >
                                        <i className="bi bi-pencil-square fs-1 text-white"></i>
                                    </div>

                                    <Card.Text className="text-dark opacity-75">
                                        Edita, modifica y actualiza las preguntas
                                        existentes en la base de conocimiento del ChatBot.
                                    </Card.Text>

                                </Card.Body>
                                <Card.Footer className="d-flex justify-content-center border-0">
                                    <Button
                                    as={Link} 
                                    to="/edit"
                                    variant="outline-dark" 
                                    className="rounded-pill px-4"
                                    >
                                        Editar Preguntas
                                    </Button>
                                </Card.Footer>
                            </Card>
                        </Col>
                    </Row>


                </div>
            </Container>
        </div>
    );
};

export default DashboardCards;
