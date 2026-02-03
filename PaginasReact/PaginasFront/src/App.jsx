import React from 'react'
import './App.css'
import Preguntas from "./components/Preguntas.jsx";
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css'
import './chartConfig';


import {Button, Navbar} from 'react-bootstrap';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import {Admin} from "./paginas/Admin.jsx";
import { Estadisticas } from './paginas/Estadisticas.jsx';
import AlmassoraBT from "./paginas/AlmassoraBT.jsx";
import {MainLayout} from "./layouts/MainLayout.jsx";

function App() {
  return (
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<MainLayout />}>
            <Route index element={<AlmassoraBT />} />
            <Route path="admin" element={<Admin />} />
            <Route path="estadisticas" element={<Estadisticas />} />
          </Route>
        </Routes>
      </BrowserRouter>
  )
}

export default App
