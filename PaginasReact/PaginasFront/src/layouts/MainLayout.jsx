import {Outlet} from "react-router-dom";
import Navbar from "../components/Navbar.jsx";
import 'bootstrap/dist/css/bootstrap.min.css';

export const MainLayout = () => {

    return(
         <div className="min-vh-100">
            <div>
                <Navbar/>
            </div>
            <div style={{flex: '1', overflow: 'auto', width: '100%', height: '100%'}}>
                <Outlet/>
            </div>
        </div>
    )
}