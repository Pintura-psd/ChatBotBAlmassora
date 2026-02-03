import Pie from "../components/Pie/Pie.jsx";
import {Container} from "react-bootstrap";

export const Estadisticas =()=> {
    return(
        
            <div className="min-vh-100 p-3 ">
                <Container >
                    <Pie/>
                </Container>
           </div>
        
    )
}