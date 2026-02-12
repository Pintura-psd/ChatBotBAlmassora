import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import Chat from "../components/Chat/Chat.jsx";

export default function Almassora() {
  const backgrounds = [
    "https://images.unsplash.com/photo-1519817914152-22d216bb9170?w=1920",
    "https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?w=1920",
    "https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=1920",
  ];

  const [bg, setBg] = useState(0);

  useEffect(() => {
    const i = setInterval(() => setBg((b) => (b + 1) % backgrounds.length), 8000);
    return () => clearInterval(i);
  }, []);

  return (
    <>
      {/* HERO */}
      <section
        className="text-white d-flex align-items-center"
        style={{
          minHeight: "60vh",
          backgroundImage: `linear-gradient(rgba(0,0,0,.5),rgba(0,0,0,.5)),url(${backgrounds[bg]})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="container">
            <div className="row g-4">
                <HeroCard title="AJUNTAMENT" color="primary" />   {/* Azul */}
                <HeroCard title="ALMASSORA" color="warning" />    {/* Amarillo */}
                <HeroCard title="SEU ELECTRÒNICA" color="danger" /> {/* Rojo */}
                <HeroWeather />
               </div>
        </div>

      </section>

      {/* NEWS */}
      <section className="py-5 bg-light">
        <div className="container">
          <h2 className="border-bottom pb-2 mb-4">Notícies</h2>
          <div className="row g-4">
            {[1, 2, 3, 4].map((i) => (
              <div className="col-md-6 col-lg-3" key={i}>
                <div className="card h-100 shadow-sm">
                  <img className="card-img-top" src="https://picsum.photos/400/300" alt={`Notícia destacada ${i}`}/>
                  <div className="card-body">
                    <small className="text-muted">26 gener 2026</small>
                    <h6 className="mt-2">Notícia destacada {i}</h6>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* AGENDA */}
      <section className="py-5">
        <div className="container">
          <h2 className="border-bottom pb-2 mb-4">Agenda</h2>
          <div className="row">
            <div className="col-md-6">
              <table className="table table-bordered text-center">
                <thead className="table-light">
                  <tr>
                    {['Dl','Dt','Dc','Dj','Dv','Ds','Dg'].map(d => <th key={d}>{d}</th>)}
                  </tr>
                </thead>
                <tbody>
                  <tr>{[29,30,31,1,2,3,4].map(d => <td key={d}>{d}</td>)}</tr>
                </tbody>
              </table>
            </div>
            <div className="col-md-6">
              <div className="alert alert-secondary">No hi ha esdeveniments avui</div>
            </div>
          </div>
        </div>
      </section>

      {/* MAP */}
      <section className="py-5 bg-light">
        <div className="container">
          <h2 className="border-bottom pb-2 mb-4">Situació</h2>
          <div className="bg-secondary text-white d-flex align-items-center justify-content-center" style={{height:300}}>
            Mapa aquí
          </div>
        </div>
      </section>
        
        <Chat/>

      {/* FOOTER */}
      <footer className="bg-dark text-white py-4">
        <div className="container">
          <div className="row g-4">
            <div className="col-md-3"><img src="https://cdn.digitalvalue.es/almassora/assets/58e77f78faa087205cb5df6f" height="50" /></div>
            <div className="col-md-4">
              <p className="mb-1">Plaça de Pere Cornell, 1</p>
              <a href="tel:964560001" className="text-white">964 56 00 01</a>
            </div>
            <div className="col-md-5">
              <a className="text-white me-3" href="#">Legal</a>
              <a className="text-white me-3" href="#">Privacitat</a>
              <a className="text-white" href="#">Cookies</a>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}

function HeroCard({ title, color = 'primary' }) {
  return (
    <div className="col-md-6 col-lg-3 p-3">
      <div className={`bg-${color} text-white text-center py-5 rounded shadow-sm`}>
        <h5 className="fw-bold">{title}</h5>
      </div>
    </div>
  );
}

function HeroWeather() {
  return (
    <div className="col-md-6 col-lg-3 p-3">
      <div className="bg-white text-dark text-center py-4 rounded shadow-sm">
        <i className="bi bi-sun fs-1 text-warning"></i>
        <h3 className="mt-2">16ºC</h3>
        <small>L'oratge</small>
      </div>
    </div>
  );
}
