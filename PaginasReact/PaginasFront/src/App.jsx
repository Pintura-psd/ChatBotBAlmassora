import React from 'react'
import './App.css'
import Preguntas from "./components/Preguntas.jsx";
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css'

import {Button, Navbar} from 'react-bootstrap';
import {Route, Routes} from "react-router-dom";
import {Admin} from "./paginas/Admin.jsx";
import {MainLayout} from "./layouts/MainLayout.jsx";

function App() {
    

  return (
      <>
      <Routes>
          <Route element={MainLayout}>
             <Route path="/admin" element={<Admin />} />
          </Route>
      </Routes>
      </>
  )
}

export default App
