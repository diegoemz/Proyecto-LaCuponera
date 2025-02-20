import React from 'react';
import { auth } from "../firebase";
import { signOut } from "firebase/auth";
import '../css/header.css';

export function Header({ onCategorySelect, usuario, onSignInClick }) {
    const handleSignOut = async () => {
        try {
            await signOut(auth);
            console.log("Sesión cerrada");
        } catch (error) {
            console.error("Error al cerrar sesión:", error);
        }
    };

    return (
        <header >
            <nav className="navbar navbar-expand-lg navbar-light bg-light shadow-sm py-3 px-6">
                <div className="container-fluid">
                    <a className="navbar-brand" href="/">
                        <img src="/img/cuponeralogo.svg" alt="Logo de Cuponera" />
                    </a>
                    <div className="d-flex align-items-center">
                        <a href="/cart" className="text-decoration-none mx-3">
                            <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" class="bi bi-bag-heart" viewBox="0 0 16 16">
                                <path fill-rule="evenodd" d="M10.5 3.5a2.5 2.5 0 0 0-5 0V4h5zm1 0V4H15v10a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V4h3.5v-.5a3.5 3.5 0 1 1 7 0M14 14V5H2v9a1 1 0 0 0 1 1h10a1 1 0 0 0 1-1M8 7.993c1.664-1.711 5.825 1.283 0 5.132-5.825-3.85-1.664-6.843 0-5.132" />
                            </svg>
                        </a>

                        {usuario ? (
                            <button className="btn btn-outline-danger mx-3" onClick={handleSignOut}>Cerrar Sesión</button>
                        ) : (
                            <button className="btn btn-outline-dark mx-3" onClick={onSignInClick}>Iniciar Sesión</button>
                        )}
                    </div>
                </div>
            </nav>

            <nav className="navbar navbar-expand-lg py-3" style={{ backgroundColor: 'rgb(88, 149, 105)', boxShadow: '0 2px 4px rgba(0,0,0,0.2)' }}>

                <div className="container-fluid justify-content-center">
                    <div className="navbar-nav flex-row" style={{ gap: '3.5rem' }}>
                        {[
                            { name: "Belleza", icon: "/img/beauty.svg" },
                            { name: "Comida", icon: "/img/food.svg" },
                            { name: "Servicios", icon: "/img/services.svg" },
                            { name: "Viajes", icon: "/img/trips.svg" },
                            { name: "Cosas que hacer", icon: "/img/thiings-to-do.svg" }
                        ].map((categoria) => (
                            <a
                                key={categoria.name}
                                className="nav-link btn btn-outline-light mx-2 p-2 rounded-pill fw-bold d-flex align-items-center gap-2"
                                href="#"
                                onClick={() => onCategorySelect(categoria.name)}
                                style={{
                                    backgroundColor: 'rgb(88, 149, 105)',
                                    borderColor: '#ffffff',
                                    color: '#ffffff',
                                    transition: 'all 0.3s ease',
                                }}
                                onMouseOver={(e) => e.currentTarget.style.backgroundColor = 'rgb(88, 149, 105)'}
                                onMouseOut={(e) => e.currentTarget.style.backgroundColor = 'rgb(115, 163, 128)'}
                            >

                                <img src={categoria.icon} alt={categoria.name} style={{ width: '24px', height: '24px', objectFit: 'cover', filter: 'brightness(0) invert(1)' }} />


                                {categoria.name}
                            </a>
                        ))}

                    </div>
                </div>
            </nav>
        </header>
    );
}
