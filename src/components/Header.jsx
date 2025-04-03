import React from 'react';
import { Link } from "react-router-dom";
import { auth } from "../firebase";
import { signOut } from "firebase/auth";
import '../css/header.css';

export function Header({ usuario, onSignInClick }) {
  const handleSignOut = async () => {
    try {
      await signOut(auth);
      console.log("Sesión cerrada");
    } catch (error) {
      console.error("Error al cerrar sesión:", error);
    }
  };

  return (
    <header>
      <nav className="navbar navbar-expand-lg navbar-light bg-light shadow-sm py-3 px-6">
        <div className="container-fluid">
          <Link className="navbar-brand" to="/">
            <img src="/img/cuponeralogo.svg" alt="Logo de Cuponera" />
          </Link>

          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="navbarNav">
            <div className="d-flex align-items-center ms-auto">
              <Link to="/cart" className="text-decoration-none mx-3">
                <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" className="bi bi-bag-heart" viewBox="0 0 16 16">
                  <path fillRule="evenodd" d="M10.5 3.5a2.5 2.5 0 0 0-5 0V4h5zm1 0V4H15v10a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V4h3.5v-.5a3.5 3.5 0 1 1 7 0M14 14V5H2v9a1 1 0 0 0 1 1h10a1 1 0 0 0 1-1M8 7.993c1.664-1.711 5.825 1.283 0 5.132-5.825-3.85-1.664-6.843 0-5.132" />
                </svg>
              </Link>
              <Link to="/compras" className="text-decoration-none mx-3">
                <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" fill="currentColor" className="bi bi-bag-heart" viewBox="0 0 16 16">
                  <path d="M0 2a1 1 0 0 1 1-1h14a1 1 0 0 1 1 1v2a1 1 0 0 1-1 1v7.5a2.5 2.5 0 0 1-2.5 2.5h-9A2.5 2.5 0 0 1 1 12.5V5a1 1 0 0 1-1-1zm2 3v7.5A1.5 1.5 0 0 0 3.5 14h9a1.5 1.5 0 0 0 1.5-1.5V5zm13-3H1v2h14zM5 7.5a.5.5 0 0 1 .5-.5h5a.5.5 0 0 1 0 1h-5a.5.5 0 0 1-.5-.5" />
                </svg>
              </Link>

              {usuario ? (
                <button className="btn btn-outline-danger mx-3" onClick={handleSignOut}>Cerrar Sesión</button>
              ) : (
                <button className="btn btn-outline-dark mx-3" onClick={onSignInClick}>Iniciar Sesión</button>
              )}
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
}
