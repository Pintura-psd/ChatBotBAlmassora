import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';

const Navbar = ({ 
  logoUrl = "https://cdn.digitalvalue.es/almassora/assets/58e77f78faa087205cb5df6f",
  euLogoUrl = "https://cdn.digitalvalue.es/almassora/assets/5b5971a90ce6761e08795299",
  activeLanguage = "VA",
  onLanguageChange,
  onSearch
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleSearch = (e) => {
    e.preventDefault();
    if (onSearch) {
      onSearch(searchQuery);
    }
  };

  const handleLanguageClick = (lang) => {
    if (onLanguageChange) {
      onLanguageChange(lang);
    }
  };

  return (
    <>
      <style>{`
        .almassora-navbar {
          background: linear-gradient(135deg, #2765a3 0%, #1a4d7a 100%);
          padding: 0;
          box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
        }

        .almassora-navbar .container-fluid {
          padding: 0.5rem 1rem;
        }

        .almassora-navbar .logo img {
          height: 70px;
          transition: transform 0.3s ease;
        }

        .almassora-navbar .logo img:hover {
          transform: scale(1.05);
        }

        .navbar-link {
          color: white !important;
          padding: 1rem 1rem;
          text-decoration: none;
          display: inline-block;
          transition: all 0.3s ease;
          border-bottom: 6px solid transparent;
          cursor: pointer;
          font-weight: 500;
          position: relative;
        }

        .navbar-link:hover {
          background: rgba(255, 255, 255, 0.1);
        }

        .navbar-link.active {
          border-bottom-color: #2765a3;
          background: rgba(255, 255, 255, 0.15);
          font-weight: 600;
        }

        .navbar-link::after {
          content: '';
          position: absolute;
          bottom: -6px;
          left: 0;
          width: 0;
          height: 6px;
          background: #2765a3;
          transition: width 0.3s ease;
        }

        .navbar-link:hover::after {
          width: 100%;
        }

        .navbar-link.active::after {
          width: 100%;
        }

        .search-input {
          border-radius: 0 !important;
          border: 2px solid rgba(255, 255, 255, 0.3);
          transition: all 0.3s ease;
        }

        .search-input:focus {
          border-color: white;
          box-shadow: 0 0 0 0.2rem rgba(255, 255, 255, 0.25);
        }

        .eu-logo img {
          height: 60px;
          transition: transform 0.3s ease;
        }

        .eu-logo img:hover {
          transform: translateY(-3px);
        }

        .mobile-menu-button {
          background: none;
          border: none;
          color: white;
          font-size: 2rem;
          cursor: pointer;
          padding: 0.5rem;
          transition: all 0.3s ease;
        }

        .mobile-menu-button:hover {
          background: rgba(255, 255, 255, 0.1);
          border-radius: 4px;
        }

        .mobile-menu {
          display: none;
        }

        .desktop-menu {
          display: flex;
          align-items: center;
        }

        @media (max-width: 991px) {
          .desktop-menu {
            display: none !important;
          }
          
          .mobile-menu {
            display: block;
          }

          .mobile-dropdown {
            position: absolute;
            top: 100%;
            left: 0;
            right: 0;
            background: linear-gradient(135deg, #2765a3 0%, #1a4d7a 100%);
            padding: 1rem;
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.2);
            z-index: 1000;
            animation: slideDown 0.3s ease;
          }

          @keyframes slideDown {
            from {
              opacity: 0;
              transform: translateY(-10px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }

          .mobile-dropdown .navbar-link {
            display: block;
            padding: 0.75rem 1rem;
            border-bottom: 1px solid rgba(255, 255, 255, 0.1);
          }

          .mobile-dropdown .search-input {
            width: 100%;
            margin-bottom: 1rem;
          }

          .mobile-dropdown .language-selector {
            display: flex;
            gap: 0.5rem;
            justify-content: center;
            margin-top: 1rem;
          }
        }

        /* Accessibility improvements */
        .navbar-link:focus,
        .mobile-menu-button:focus {
          outline: 2px solid white;
          outline-offset: 2px;
        }
      `}</style>

      <nav className="almassora-navbar navbar navbar-expand-lg navbar-dark">
        <div className="container-fluid">
          <div className="d-flex justify-content-between align-items-center w-100">
            {/* Logo */}
            <a href="/" className="logo" aria-label="Almassora Home">
              <img 
                src={logoUrl} 
                height="70px" 
                alt="Almassora Logo" 
              />
            </a>
            
            {/* Mobile Menu Toggle */}
            <div className="mobile-menu">
              <button 
                className="mobile-menu-button" 
                type="button"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                aria-label="Toggle navigation menu"
                aria-expanded={isMenuOpen}
              >
                <i className={`bi ${isMenuOpen ? 'bi-x' : 'bi-list'}`}></i>
              </button>
            </div>

            {/* Desktop Menu */}
            <div className="desktop-menu">
              <a href="/ca/noticias" className="navbar-link">
                Notícies
              </a>
              
              <div className="mx-3" style={{width: '200px'}}>
                <form onSubmit={handleSearch}>
                  <input 
                    type="text" 
                    className="form-control search-input" 
                    placeholder="Busca aquí..." 
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    aria-label="Search"
                  />
                </form>
              </div>
              
              <span 
                className={`navbar-link ${activeLanguage === 'VA' ? 'active' : ''}`}
                onClick={() => handleLanguageClick('VA')}
                role="button"
                tabIndex={0}
                onKeyPress={(e) => e.key === 'Enter' && handleLanguageClick('VA')}
              >
                VA
              </span>
              
              <span 
                className={`navbar-link ${activeLanguage === 'ES' ? 'active' : ''}`}
                onClick={() => handleLanguageClick('ES')}
                role="button"
                tabIndex={0}
                onKeyPress={(e) => e.key === 'Enter' && handleLanguageClick('ES')}
              >
                ES
              </span>
              
              <a 
                href="https://www.almassora.es/ca/articulos/union-europea" 
                className="ms-3 eu-logo"
                aria-label="Unión Europea"
              >
                <img 
                  src={euLogoUrl} 
                  height="60px" 
                  alt="Logo Unión Europea" 
                />
              </a>
            </div>
          </div>

          {/* Mobile Dropdown Menu */}
          {isMenuOpen && (
            <div className="mobile-dropdown">
              <a href="/ca/noticias" className="navbar-link">
                Notícies
              </a>
              
              <form onSubmit={handleSearch}>
                <input 
                  type="text" 
                  className="form-control search-input" 
                  placeholder="Busca aquí..." 
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  aria-label="Search"
                />
              </form>

              <div className="language-selector">
                <span 
                  className={`navbar-link ${activeLanguage === 'VA' ? 'active' : ''}`}
                  onClick={() => {
                    handleLanguageClick('VA');
                    setIsMenuOpen(false);
                  }}
                  role="button"
                  tabIndex={0}
                >
                  VA
                </span>
                
                <span 
                  className={`navbar-link ${activeLanguage === 'ES' ? 'active' : ''}`}
                  onClick={() => {
                    handleLanguageClick('ES');
                    setIsMenuOpen(false);
                  }}
                  role="button"
                  tabIndex={0}
                >
                  ES
                </span>
              </div>

              <div className="text-center mt-3">
                <a 
                  href="https://www.almassora.es/ca/articulos/union-europea" 
                  className="eu-logo"
                >
                  <img 
                    src={euLogoUrl} 
                    height="50px" 
                    alt="Logo Unión Europea" 
                  />
                </a>
              </div>
            </div>
          )}
        </div>
      </nav>
    </>
  );
};

export default Navbar;