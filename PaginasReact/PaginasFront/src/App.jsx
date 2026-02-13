import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import './chartConfig';


import {BrowserRouter, Route, Routes} from "react-router-dom";
import {Admin} from "./paginas/Admin.jsx";
import { Estadisticas } from './paginas/Estadisticas.jsx';
import AlmassoraBT from "./paginas/AlmassoraBT.jsx";
import {MainLayout} from "./layouts/MainLayout.jsx";
import Menu from "./paginas/Menu.jsx";
import Login from "./paginas/Login.jsx";

function App() {
  return (
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<MainLayout />}>
            <Route index element={<AlmassoraBT />} />
            <Route path="admin" element={<Admin />} />
            <Route path="estadisticas" element={<Estadisticas />} />
            <Route path="menu" element={<Menu />} />
          </Route>
             <Route path="login" element={<Login />} />
        </Routes>
      </BrowserRouter>
  )
}

export default App
