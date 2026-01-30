import {Outlet} from "react-router-dom";
import NavbarBT from "../components/NavbarBT.jsx";
import 'bootstrap/dist/css/bootstrap.min.css';

export const MainLayout = () => {

    return(
         <div className="min-vh-100">
            <div>
                <NavbarBT/>
            </div>
            <div className="bg-white">
                  <Outlet/>
            </div>
          
        </div>
    )
}