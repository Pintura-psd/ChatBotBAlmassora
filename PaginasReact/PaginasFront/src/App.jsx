import React from 'react'
import './App.css'
import Preguntas from "./components/Preguntas.jsx";
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css'

import {Button, Navbar} from 'react-bootstrap';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import {Admin} from "./paginas/Admin.jsx";
import Almassora from "./paginas/Almassora.jsx";
import {MainLayout} from "./layouts/MainLayout.jsx";

function App() {
  return (
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<MainLayout />}>
            <Route index element={<Almassora />} />
            <Route path="admin" element={<Admin />} />
          </Route>
        </Routes>
      </BrowserRouter>
  )
}

export default App
