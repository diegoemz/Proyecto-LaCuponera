import React from 'react';
import '../css/header.css';

export function Header({ onCategorySelect }) {
    return (
        <header>
            <nav className="navbar navbar-expand-lg bg-light">
                <div className="container-fluid">
                    <div className="d-flex justify-content-between align-items-center w-100">
                        <a className="navbar-brand" href="#" onClick={(e) => {
                            e.preventDefault();
                            window.location.href = "/";
                        }}>
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
            <nav className="navbar navbar-expand-lg py-4">
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
                            {["Belleza", "Comida", "Servicios", "Viajes", "Cosas que hacer"].map((categoria) => (
                                <a
                                    key={categoria}
                                    className="nav-link"
                                    href="#"
                                    onClick={() => onCategorySelect(categoria)}
                                >
                                    {categoria}
                                </a>
                            ))}
                        </div>
                    </div>
                </div>
            </nav>
        </header>
    );
}
