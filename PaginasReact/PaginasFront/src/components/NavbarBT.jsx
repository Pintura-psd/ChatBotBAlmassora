import React from 'react';

const Navbar = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container-fluid ">
        {/* Logo */}
        <a className="navbar-brand" href="#">
          <img
            src="https://cdn.digitalvalue.es/almassora/assets/58e77f78faa087205cb5df6f"
            height="60"
            alt="Almassora"
          />
        </a>

        {/* Toggle button for mobile */}
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#nav"
          aria-controls="nav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* Navbar links */}
        <div className="collapse navbar-collapse" id="nav">
          <ul className="navbar-nav ms-auto align-items-lg-center gap-3">
            <li className="nav-item">
              <a className="nav-link" href="/menu">
                Menu
              </a>
            </li>
            <li className="nav-item">
                <label htmlFor="buscar" className="visually-hidden">
                    Buscar
                </label>
              <input id="buscar"className="form-control" placeholder="Buscar…" />
            </li>
            <li className="nav-item">
              <span className="nav-link active">VA</span>
            </li>
            <li className="nav-item">
              <span className="nav-link">ES</span>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
