import {Navbar} from "react-bootstrap";
import {Outlet} from "react-router-dom";

export const MainLayout = () => {

    return(
        <>
            <Navbar/>
            <Outlet/>
        </>
    )
}