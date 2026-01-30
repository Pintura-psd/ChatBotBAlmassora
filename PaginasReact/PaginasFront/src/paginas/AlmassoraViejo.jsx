import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.min.css';
import 'animate.css';

const Almassora = () => {
  const [currentBgIndex, setCurrentBgIndex] = useState(0);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const backgrounds = [
    'https://images.unsplash.com/photo-1519817914152-22d216bb9170?w=1920&h=1080&fit=crop',
    'https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?w=1920&h=1080&fit=crop',
    'https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=1920&h=1080&fit=crop'
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentBgIndex((prev) => (prev + 1) % backgrounds.length);
    }, 10000);
    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <style>{`
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }

        body {
          font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
        }

        /* Navbar Styles */
        .navbar {
          background: linear-gradient(135deg, #2765a3 0%, #1a4d7a 100%);
          padding: 0;
        }

        .navbar .container-fluid {
          padding: 0.5rem 1rem;
        }

        .logo img {
          height: 70px;
        }

        .navbar-link {
          color: white !important;
          padding: 1rem 1rem;
          text-decoration: none;
          display: inline-block;
          transition: all 0.3s;
          border-bottom: 6px solid transparent;
          cursor: pointer;
        }

        .navbar-link:hover {
          background: rgba(255, 255, 255, 0.1);
        }

        .navbar-link.active {
          border-bottom-color: #2765a3;
          background: rgba(255, 255, 255, 0.15);
        }

        .mobile-menu {
          display: none;
        }

        @media (max-width: 991px) {
          .desktop-menu {
            display: none !important;
          }
          .mobile-menu {
            display: block;
          }
        }

        /* Portada Section */
        .portada {
          position: relative;
          min-height: 600px;
          background: linear-gradient(135deg, rgba(39, 101, 163, 0.8), rgba(26, 77, 122, 0.9));
          overflow: hidden;
        }

        .portada-slider {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background-size: cover;
          background-position: center;
          filter: blur(1.4px);
          z-index: -1;
          animation: kenBurns 60s linear infinite;
          transition: background-image 1s ease-in-out;
        }

        @keyframes kenBurns {
          0% { transform: scale(1); }
          50% { transform: scale(1.1); }
          100% { transform: scale(1); }
        }

        .menu-portada {
          position: relative;
          z-index: 2;
          padding: 2rem 0;
        }

        .menu-caja {
          height: 120px;
          border-radius: 8px;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: all 0.3s;
          background-size: cover;
          background-position: center;
          position: relative;
          overflow: hidden;
        }

        .menu-caja::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(0, 0, 0, 0.4);
          transition: all 0.3s;
        }

        .menu-caja:hover::before {
          background: rgba(0, 0, 0, 0.2);
        }

        .menu-text {
          color: white;
          font-size: 1.5rem;
          font-weight: bold;
          text-align: center;
          position: relative;
          z-index: 1;
          margin: 0;
          text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
        }

        .ayto-img {
          background: linear-gradient(135deg, #c45800 0%, #ff7b00 100%);
        }

        .almassora-img {
          background: linear-gradient(135deg, #2765a3 0%, #4a90d9 100%);
        }

        .serveis-img {
          background: linear-gradient(135deg, #00843d 0%, #00a651 100%);
        }

        .menu-list {
          display: none;
          position: absolute;
          top: 120px;
          left: 0;
          right: 0;
          background: rgba(39, 101, 163, 0.95);
          border-radius: 0 0 8px 8px;
          padding: 1rem;
          z-index: 10;
          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.3);
        }

        .menu-column:hover .menu-list {
          display: block;
        }

        .menu-list a {
          color: #ffeeee !important;
          text-decoration: none;
          display: block;
          padding: 0.5rem 0;
          transition: all 0.3s;
        }

        .menu-list a:hover {
          padding-left: 10px;
          color: white !important;
        }

        .menu-destacado {
          height: 120px;
          border-radius: 8px;
          background-size: 60px;
          background-position: center;
          background-repeat: no-repeat;
          display: flex;
          align-items: flex-end;
          justify-content: center;
          padding: 1rem;
          cursor: pointer;
          transition: all 0.3s;
          margin-bottom: 1rem;
        }

        .menu-destacado a {
          text-decoration: none;
        }

        .destacados-strong {
          color: white;
          font-size: 1.1rem;
          font-weight: bold;
          text-align: center;
          margin: 0;
          text-shadow: 1px 1px 3px rgba(0, 0, 0, 0.7);
        }

        .pm8_industria {
          background-color: #7c3aed;
        }

        .pm8_licitaciones {
          background-color: #dc2626;
        }

        .pm8_cultura-02 {
          background-color: #ea580c;
        }

        .menu-destacado:hover {
          transform: translateY(-5px);
          box-shadow: 0 8px 16px rgba(0, 0, 0, 0.3);
        }

        .weather-card {
          background: white;
          border-radius: 8px;
          padding: 1rem;
          margin-bottom: 1rem;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
        }

        .section {
          padding: 3rem 0;
        }

        .main-header {
          font-size: 2rem;
          font-weight: bold;
          color: #2765a3;
          margin-bottom: 2rem;
          padding-bottom: 1rem;
          border-bottom: 3px solid #2765a3;
        }

        .noticia-caja {
          margin-bottom: 2rem;
        }

        .noticia-caja img {
          height: 170px;
          object-fit: cover;
          border-radius: 8px 8px 0 0;
          width: 100%;
        }

        .noticia-caja .card {
          border: 1px solid rgba(34, 36, 38, 0.15);
          border-radius: 8px;
          box-shadow: 0 1px 2px rgba(34, 36, 38, 0.15);
          transition: all 0.3s;
          height: 100%;
        }

        .noticia-caja .card:hover {
          box-shadow: 0 4px 8px rgba(34, 36, 38, 0.25);
          transform: translateY(-3px);
        }

        .noticia-caja .card-body {
          padding: 1.5rem;
        }

        .noticia-caja .card-subtitle {
          color: #767676;
          font-size: 0.875rem;
          margin-bottom: 0.75rem;
        }

        .noticia-caja .card-title {
          font-size: 1.1rem;
          color: #1a202c;
          font-weight: 600;
        }

        .noticia-caja a {
          text-decoration: none;
          color: inherit;
        }

        #fullCalendar {
          background: white;
          border-radius: 8px;
          padding: 1rem;
          box-shadow: 0 1px 2px rgba(34, 36, 38, 0.15);
        }

        .calendar-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 1rem;
        }

        .calendar-nav button {
          background: #2765a3;
          color: white;
          border: none;
          padding: 0.5rem 1rem;
          border-radius: 4px;
          cursor: pointer;
          margin: 0 0.25rem;
        }

        .calendar-nav button:hover {
          background: #1a4d7a;
        }

        .calendar-grid {
          width: 100%;
          border-collapse: collapse;
        }

        .calendar-grid th {
          background: #f5f5f5;
          padding: 0.75rem;
          text-align: center;
          font-weight: 600;
          border: 1px solid #e0e0e0;
        }

        .calendar-grid td {
          padding: 0.75rem;
          text-align: center;
          border: 1px solid #e0e0e0;
          cursor: pointer;
        }

        .calendar-grid td:hover {
          background: #f5f5f5;
        }

        .calendar-grid .today {
          background: #2765a3;
          color: white;
          font-weight: bold;
        }

        .calendar-grid .other-month {
          color: #ccc;
        }

        .fc-events-list {
          background: white;
          border-radius: 8px;
          padding: 1rem;
          box-shadow: 0 1px 2px rgba(34, 36, 38, 0.15);
        }

        .fc-events-list .event-header {
          background: #2765a3;
          color: white;
          padding: 1rem;
          border-radius: 4px;
          margin-bottom: 1rem;
        }

        #mapa1 {
          height: 500px;
          width: 100%;
          border-radius: 8px;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
          background: #e0e0e0;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #666;
        }

        footer {
          background: #000;
          color: white;
          padding: 2rem 0 1rem;
          margin-top: 2rem;
        }

        footer a {
          color: white;
          text-decoration: none;
          transition: all 0.3s;
        }

        footer a:hover {
          color: #2765a3;
        }

        footer .list-unstyled {
          padding: 0;
        }

        footer .list-unstyled li {
          margin-bottom: 0.5rem;
        }

        footer img {
          max-height: 60px;
        }

        .app-icons img {
          width: 40px;
          margin-right: 0.5rem;
        }
      `}</style>

      <main>
        {/* Navbar is now handled by MainLayout */}

        {/* Portada Section */}
        <Portada currentBgIndex={currentBgIndex} backgrounds={backgrounds} />

        {/* News Section */}
        <NewsSection />

        {/* Agenda Section */}
        <AgendaSection />

        {/* Map Section */}
        <MapSection />

        {/* Footer */}
        <Footer />
      </main>
    </>
  );
};

const Navbar = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark">
      <div className="container-fluid">
        <div className="d-flex justify-content-between align-items-center w-100">
          <a href="#" className="logo">
            <img src="https://cdn.digitalvalue.es/almassora/assets/58e77f78faa087205cb5df6f" height="70px" alt="Almassora" />
          </a>
          
          <div className="mobile-menu">
            <button className="btn btn-link text-white" type="button" data-bs-toggle="collapse" data-bs-target="#navbarMenu">
              <i className="bi bi-list" style={{fontSize: '2rem'}}></i>
            </button>
          </div>

          <div className="desktop-menu d-flex align-items-center">
            <a href="/ca/noticias" className="navbar-link">Notícies</a>
            <div className="mx-3" style={{width: '200px'}}>
              <input type="text" className="form-control" placeholder="Busca aquí..." style={{borderRadius: 0}} />
            </div>
            <span className="navbar-link active">VA</span>
            <span className="navbar-link">ES</span>
            <a href="https://www.almassora.es/ca/articulos/union-europea" className="ms-3">
              <img src="https://cdn.digitalvalue.es/almassora/assets/5b5971a90ce6761e08795299" height="60px" alt="UE" />
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
};

const Portada = ({ currentBgIndex, backgrounds }) => {
  return (
    <div className="portada">
      <div 
        className="portada-slider animate__animated animate__fadeIn" 
        style={{backgroundImage: `url('${backgrounds[currentBgIndex]}')`}}
      ></div>
      
      <div className="menu-portada">
        <div className="container-fluid" style={{padding: 0}}>
          <div className="row g-4" style={{margin: 0}}>
            <MenuColumn 
              title="AJUNTAMENT"
              className="ayto-img"
              items={[
                {text: "Assumptes econòmics", href: "/ca/articulos/assumptes-economics"},
                {text: "Fons Europeus", href: "/ca/articulos/union-europea"},
                {text: "Instal·lacions Municipals", href: "/ca/articulos/instal-lacions-municipals"},
                {text: "Àrees Municipals", href: "/ca/articulos/arees-municipals"},
                {text: "Organització Política", href: "/ca/articulos/organitzacio-politica"},
                {text: "OMIC", href: "/ca/articulos/omic"},
                {text: "JUSTIPROP", href: "/ca/articulos/justiprop"},
                {text: "Atenció ciutadana (SIAC)", href: "/ca/articulos/atencio-ciutadana-siac"},
                {text: "Bans", href: "/ca/articulos/bans"},
                {text: "Informació sobre mesures antifrau", href: "/ca/articulos/informacio-sobre-mesures-antifrau"},
                {text: "Participació Ciutadana", href: "https://participaciociutadana.almassora.es/"},
                {text: "Vídeos de Plens municipals", href: "https://videoacta.almassora.es/"}
              ]}
            />

            <MenuColumn 
              title="ALMASSORA"
              className="almassora-img"
              delay="0.1s"
              items={[
                {text: "Pressupostos participatius 2026", href: "/ca/articulos/pressupostos-participatius-2026"},
                {text: "Residència i centre de dia municipal", href: "/ca/articulos/residencia-i-centre-de-dia-municipal-de-persones-majors-depenents"},
                {text: "Salut", href: "/ca/articulos/salut"},
                {text: "Instal·lacions de Serveis Socials", href: "/ca/articulos/instal-lacions-de-serveis-socials"},
                {text: "Informació d'interès", href: "/ca/articulos/informacio-d-interes"},
                {text: "Ocupació Almassora", href: "/ca/articulos/ocupacio-almassora"},
                {text: "Transports públics", href: "/ca/articulos/transports-publics"},
                {text: "Jutjat de Pau i Registre Civil", href: "/ca/articulos/jutjat-de-pau-i-registre-civil"},
                {text: "Turisme i patrimoni", href: "/ca/articulos/turisme-i-patrimoni"},
                {text: "L'oratge en directe", href: "/ca/articulos/l-oratge-en-directe"},
                {text: "Farmàcies", href: "https://www.almassora.es/ca/farmacias"},
                {text: "Directori Web", href: "https://www.almassora.es/ca/directorio"},
                {text: "GESTIONANT-TE", href: "https://gestionandote.com/va/agencia/almassora"}
              ]}
            />

            <MenuColumn 
              title="SEU ELECTRÒNICA"
              className="serveis-img"
              delay="0.2s"
              items={[
                {text: "Carpeta ciutadana", href: "/ca/articulos/carpeta-ciutadana-1"},
                {text: "Notificació electrònica", href: "/ca/articulos/notificacio-electronica"},
                {text: "Formularis", href: "/ca/articulos/formularis"},
                {text: "Tràmits", href: "/ca/articulos/tramits"},
                {text: "Seu electrònica", href: "/ca/articulos/seu-electronica"},
                {text: "Ordenances", href: "/ca/articulos/ordenances"},
                {text: "Ocupació Pública", href: "/ca/articulos/ocupacio-publica"},
                {text: "Perfil del contractant", href: "/ca/articulos/perfil-del-contractant"},
                {text: "Portal de Transparència", href: "/ca/articulos/portal-de-transparencia-1"},
                {text: "Declaració d'accessibilitat", href: "/ca/articulos/declaracio-d-accessibilitat"},
                {text: "Incidències via pública", href: "https://www.almassora.es/ca/articulos/62ff781e4927e71803c3e7cc"},
                {text: "Inscripció activitats", href: "https://www.almassora.es/almassora/ca/articulos/592c4c76ce5d9f591572d527"},
                {text: "Cita Previa Ayuntamiento", href: "https://www.almassora.es/ca/articulos/cita-previa-ajuntament-d-almassora"},
                {text: "Tauler d'anuncis", href: "https://www.almassora.es/ca/articulos/tauler-d-anuncis"},
                {text: "Autoliquidacions", href: "https://autoliquidacions.almassora.es/autoliquidaciones/index.php?lang=va"},
                {text: "Validació de documents", href: "https://e-ajuntament.almassora.es/sta/CarpetaPublic/doEvent?APP_CODE=STA&PAGE_CODE=VALDOCS&lang=CA"}
              ]}
            />

            <DestacadosColumn />
          </div>
        </div>
      </div>
    </div>
  );
};

const MenuColumn = ({ title, className, items, delay = "0s" }) => {
  return (
    <div className="col-lg-3 col-md-6 position-relative menu-column">
      <div className={`menu-caja ${className} animate__animated animate__fadeInDown`} style={{animationDelay: delay}}>
        <p className="menu-text">{title}</p>
      </div>
      <div className="menu-list animate__animated animate__fadeInDown">
        {items.map((item, index) => (
          <a key={index} href={item.href}>{item.text}</a>
        ))}
      </div>
    </div>
  );
};

const DestacadosColumn = () => {
  return (
    <div className="col-lg-3 col-md-6">
      <div className="weather-card animate__animated animate__fadeInDown" style={{animationDelay: '0.3s'}}>
        <div className="d-flex align-items-center justify-content-center gap-2">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" width="60px">
            <g>
              <path fill="none" stroke="#f59e0b" strokeLinecap="round" strokeMiterlimit="10" strokeWidth="3" d="M42.5 32A10.5 10.5 0 1132 21.5 10.5 10.5 0 0142.5 32zM32 15.71V9.5m0 45v-6.21m11.52-27.81l4.39-4.39M16.09 47.91l4.39-4.39m0-23l-4.39-4.39m31.82 31.78l-4.39-4.39M15.71 32H9.5m45 0h-6.21"></path>
              <animateTransform attributeName="transform" dur="45s" from="0 32 32" repeatCount="indefinite" to="360 32 32" type="rotate"></animateTransform>
            </g>
          </svg>
          <h2 className="mb-0">16°C</h2>
        </div>
        <p className="text-end mb-0 mt-2">
          <small><a href="https://almassora.es/ca/articulos/l-oratge-en-directe">L'Oratge a Almassora</a></small>
        </p>
      </div>

      <div className="menu-destacado pm8_industria animate__animated animate__fadeInDown" style={{animationDelay: '0.4s'}}>
        <a href="https://almassoraempresas.es/va/">
          <p className="destacados-strong">Almassora Empreses</p>
        </a>
      </div>

      <div className="menu-destacado pm8_licitaciones animate__animated animate__fadeInDown" style={{animationDelay: '0.5s'}}>
        <a href="https://www.almassora.es/ca/articulos/tramits">
          <p className="destacados-strong">Tràmits</p>
        </a>
      </div>

      <div className="menu-destacado pm8_cultura-02 animate__animated animate__fadeInDown" style={{animationDelay: '0.6s'}}>
        <a href="https://entrades.almassora.es/par-public/rest/evento/listado?lang=ca">
          <p className="destacados-strong">Venda d'entrades</p>
        </a>
      </div>
    </div>
  );
};

const NewsSection = () => {
  const news = [
    {
      img: "https://cdn.digitalvalue.es/almassora/assets2/697868488377120e4cae02df",
      date: "dilluns, 26 de gener del 2026",
      title: "Incendio ya controlado en una finca de Almassora",
      href: "/ca/articulos/incendio-ya-controlado-en-una-finca-de-almassora"
    },
    {
      img: "https://cdn.digitalvalue.es/almassora/assets2/697729523fb952a74b042ae9",
      date: "dilluns, 26 de gener del 2026",
      title: "Almassora concede a la filóloga clásica Mariló Limo Escura el premio Clara Campoamor",
      href: "/ca/articulos/almassora-concede-a-la-filologa-clasica-marilo-limo-escura-el-premio-clara-campoamor"
    },
    {
      img: "https://cdn.digitalvalue.es/almassora/assets2/697864c28377120e4cae0290",
      date: "dissabte, 24 de gener del 2026",
      title: "Almassora Educa pone en valor la excelencia académica",
      href: "/ca/articulos/almassora-educa"
    },
    {
      img: "https://cdn.digitalvalue.es/almassora/assets2/697865d98377120e4cae02c6",
      date: "dissabte, 24 de gener del 2026",
      title: "Almassora concede premio Clara Campoamor con motivo del Día Internacional de la Mujer",
      href: "/ca/articulos/premio-clara-campoamor"
    }
  ];

  return (
    <div className="section" style={{backgroundColor: '#eeeeee', padding: '3rem 2rem'}}>
      <div className="container-fluid" style={{padding: 0}}>
        <h1 className="main-header">Notícies</h1>
        <div className="row">
          {news.map((item, index) => (
            <div key={index} className="col-lg-3 col-md-6 noticia-caja">
              <a href={item.href}>
                <div className="card animate__animated animate__fadeIn">
                  <img src={item.img} className="card-img-top" alt={item.title} />
                  <div className="card-body">
                    <p className="card-subtitle">{item.date}</p>
                    <h5 className="card-title">{item.title}</h5>
                  </div>
                </div>
              </a>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const AgendaSection = () => {
  return (
    <div className="section" style={{backgroundColor: '#ffffff', padding: '3rem 2rem'}}>
      <div className="container-fluid" style={{padding: 0}}>
        <h1 className="main-header">Agenda</h1>
        <div className="row">
          <div className="col-lg-6">
            <div id="fullCalendar">
              <div className="calendar-header">
                <h4>Gener 2026</h4>
                <div className="calendar-nav">
                  <button>Avui</button>
                  <button>‹</button>
                  <button>›</button>
                </div>
              </div>
              <table className="calendar-grid">
                <thead>
                  <tr>
                    <th>Dl</th>
                    <th>Dt</th>
                    <th>Dc</th>
                    <th>Dj</th>
                    <th>Dv</th>
                    <th>Ds</th>
                    <th>Dg</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="other-month">29</td>
                    <td className="other-month">30</td>
                    <td className="other-month">31</td>
                    <td>1</td>
                    <td>2</td>
                    <td>3</td>
                    <td>4</td>
                  </tr>
                  <tr>
                    <td>5</td>
                    <td>6</td>
                    <td>7</td>
                    <td>8</td>
                    <td>9</td>
                    <td>10</td>
                    <td>11</td>
                  </tr>
                  <tr>
                    <td>12</td>
                    <td>13</td>
                    <td>14</td>
                    <td>15</td>
                    <td>16</td>
                    <td>17</td>
                    <td>18</td>
                  </tr>
                  <tr>
                    <td>19</td>
                    <td>20</td>
                    <td>21</td>
                    <td>22</td>
                    <td>23</td>
                    <td>24</td>
                    <td>25</td>
                  </tr>
                  <tr>
                    <td>26</td>
                    <td className="today">27</td>
                    <td>28</td>
                    <td>29</td>
                    <td>30</td>
                    <td>31</td>
                    <td className="other-month">1</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          <div className="col-lg-6">
            <div className="fc-events-list">
              <div className="event-header">
                <h5 className="mb-0">27 de gener del 2026</h5>
              </div>
              <p className="text-muted">No hi ha esdeveniments programats per avui</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const MapSection = () => {
  return (
    <div className="section" style={{backgroundColor: '#eeeeee', padding: '3rem 2rem'}}>
      <div className="container-fluid" style={{padding: 0}}>
        <h1 className="main-header">Situació</h1>
        <div id="mapa1" className="animate__animated animate__fadeIn">
          <p>Mapa interactiu d'Almassora<br/><small className="text-muted">(Integrar Leaflet o Google Maps aquí)</small></p>
        </div>
      </div>
    </div>
  );
};

const Footer = () => {
  return (
    <footer style={{padding: '2rem 2rem 1rem'}}>
      <div className="container-fluid" style={{padding: 0}}>
        <div className="row">
          <div className="col-lg-3 col-md-6 mb-4">
            <a href="#" className="logo">
              <img src="https://cdn.digitalvalue.es/almassora/assets/58e77f78faa087205cb5df6f" alt="Almassora" />
            </a>
          </div>
          <div className="col-lg-3 col-md-6 mb-4">
            <ul className="list-unstyled">
              <li>Plaça de Pere Cornell, 1, 12550, Castelló</li>
              <li><a href="tel:964560001">964 56 00 01</a></li>
              <li><a href="mailto:e-ajuntament@almassora.es">e-ajuntament@almassora.es</a></li>
            </ul>
          </div>
          <div className="col-lg-4 col-md-6 mb-4">
            <ul className="list-unstyled">
              <li><a href="/ca/sitemap">Sitemap</a></li>
              <li><a href="/ca/articulos/aviso-legal">Avís legal</a></li>
              <li><a href="/ca/articulos/politica-de-privacidad">Política de privacitat</a></li>
              <li><a href="/ca/articulos/declaracio-d-accessibilitat">Accessibilitat</a></li>
              <li><a href="/ca/articulos/politica-de-cookies">Política de cookies</a></li>
            </ul>
          </div>
          <div className="col-lg-2 col-md-6 mb-4">
            <div className="app-icons">
              <a href="#"><img src="/common/portada/assets/icons/logo-android.png" alt="Android" /></a>
              <a href="#"><img src="/common/portada/assets/icons/logo-apple.png" alt="iOS" /></a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Almassora;