import Pie from "../components/Pie/Pie.jsx";
import Barras from "../components/Barras/Barras.jsx";
import Top5Preguntas from "../components/Top5Preguntas.jsx";
import {Container, Card} from "react-bootstrap";

export const Estadisticas =()=> {
    return(
        <section>
            <div className="row p-2">

                <div className="col-lg-8 p-2">
                    <Card className={`mb-3 rounded-3 border border-dark p-0 barras-card`}>
                        <Card.Header className="bg-dark text-white fw-semibold px-4 py-3 border-0">
                            Estrada de tráfico mensual
                        </Card.Header>
                        <Card.Body className="p-4">
                            <Barras/>
                        </Card.Body>
                    </Card>
                </div>
                <div className="col-lg-4 p-2">
                    <div className= "row">
                        <Card className={`mb-3 rounded-3 border border-dark p-0 pie-card`}>
                            <Card.Header className="bg-dark text-white fw-semibold px-4 py-3 border-0">
                                Estadísticas del ChatBot
                            </Card.Header>

                            <Card.Body className="d-flex justify-content-center align-items-center" style={{ minHeight: '300px' }} >
                                    <div className="w-100" style={{ maxWidth: '300px' }}>
                                    <Pie/>
                                    </div>
                            </Card.Body>
                        </Card>
                    </div>
                    <div className="row">
                        <Top5Preguntas/>
                    </div>

                </div>
            </div>

            <div className="row p-2">
                <div className="col-lg-8 p-2">
                </div>

                <div className="col-lg-4 p-0">
                </div>
            </div>
        </section>
    )
}