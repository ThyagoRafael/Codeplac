import React, { useState, useEffect } from "react";
import logo from "../../assets/img/logoprincipalparaosite.png";
import "../css/header.css";
import { NavLink } from "react-router-dom";

export const Header = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const checkLogin = () => {
      const user = localStorage.getItem("user");
      setIsLoggedIn(!!user);
    };

    checkLogin();
    window.addEventListener("storage", checkLogin);

    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("storage", checkLogin);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <header className={`header-container ${scrolled ? "scrolled" : ""}`}>
      <div className="header-main-bar">
        <img src={logo} alt="Codeplac" className="logo-img" />
        <nav className="header-nav desktop-nav">
          <NavLink to="/" end>
            HOME
          </NavLink>
          <NavLink to="/ranking">RANKING</NavLink>

          {/* DIV PAI QUE GERENCIA O HOVER DO DROPDOWN */}
          <div
            className="nav-item-dropdown"
            onMouseEnter={() => setDropdownOpen(true)}
            onMouseLeave={() => setDropdownOpen(false)}
          >
            <span className={dropdownOpen ? "active" : ""}>ATIVIDADES</span>
            {dropdownOpen && (
              <div className="dropdown-menu">
                <NavLink to="/eventos" onClick={() => setDropdownOpen(false)}>
                  EVENTOS
                </NavLink>
                <NavLink to="/historico" onClick={() => setDropdownOpen(false)}>
                  HISTÓRICO
                </NavLink>
                <NavLink to="/galeria" onClick={() => setDropdownOpen(false)}>
                  GALERIA
                </NavLink>
              </div>
            )}
          </div>

          <NavLink to="/equipe">EQUIPE</NavLink>
          <NavLink to="/contato">CONTATOS</NavLink>
        </nav>
        <div
          className="mobile-menu-btn"
          onClick={() => setMobileOpen(!mobileOpen)}
        >
          <span></span>
          <span></span>
          <span></span>
        </div>
      </div>

      <div className="header-login-btn">
        {isLoggedIn ? (
          <NavLink to="/perfil" className="active">
            PERFIL
          </NavLink>
        ) : (
          <NavLink to="/login">LOGIN</NavLink>
        )}
      </div>

      {mobileOpen && (
        <div className="mobile-menu">
          <NavLink to="/" onClick={() => setMobileOpen(false)}>
            HOME
          </NavLink>
          <NavLink
            to={isLoggedIn ? "/perfil" : "/login"}
            onClick={() => setMobileOpen(false)}
          >
            {isLoggedIn ? "PERFIL" : "LOGIN"}
          </NavLink>
        </div>
      )}
    </header>
  );
};

export default Header;
