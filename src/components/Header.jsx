import React from 'react';
import '../css/header.css'; // Corrected import path

export function Header() {
    return (
        <header>
            <nav className="navbar navbar-expand-lg bg-light">
                <div className="container-fluid">
                    <div className="d-flex justify-content-between align-items-center w-100">
                        <a className="navbar-brand" href="#">
                            <img
                                src="/img/LogoCuponera.png"
                                alt="Logo de Cuponera"
                                width="200"
                                height="70"
                                className="d-inline-block align-text-top"
                                loading="lazy"
                            />
                        </a>
                        <div className="d-flex align-items-center">
                            <a href="#" className="mx-4 text-dark emoji-link">❤️</a>
                            <a href="#" className="mx-4 text-dark emoji-link">🛒</a>
                            <a href="#" className="btn btn-outline-dark mx-4">Sign In</a>
                        </div>
                    </div>
                </div>
            </nav>
            <nav className="navbar navbar-expand-lg bg-light">
                <div className="container-fluid">
                    <button
                        className="navbar-toggler"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#navbarNavAltMarkup"
                        aria-controls="navbarNavAltMarkup"
                        aria-expanded="false"
                        aria-label="Toggle navigation"
                    >
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse justify-content-center" id="navbarNavAltMarkup">
                        <div className="navbar-nav" style={{ padding: '0px 15px' }}>
                            <a className="nav-link" href="#" aria-label="Belleza">
                                <i className="fas fa-spa"></i> Belleza
                            </a>
                            <a className="nav-link" href="#" aria-label="Comida">
                                <i className="fas fa-utensils"></i> Comida
                            </a>
                            <a className="nav-link" href="#" aria-label="Servicios">
                                <i className="fas fa-concierge-bell"></i> Servicios
                            </a>
                            <a className="nav-link" href="#" aria-label="Viajes">
                                <i className="fas fa-plane"></i> Viajes
                            </a>
                            <a className="nav-link" href="#" aria-label="Cosas que hacer">
                                <i className="fas fa-calendar-alt"></i> Cosas que hacer
                            </a>
                        </div>
                    </div>
                </div>
            </nav>
        </header>
    );
}