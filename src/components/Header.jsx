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

                    <div className="d-flex align-items-center">
                        <Link to="/cart" className="text-decoration-none mx-3">
                            <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" className="bi bi-bag-heart" viewBox="0 0 16 16">
                                <path fillRule="evenodd" d="M10.5 3.5a2.5 2.5 0 0 0-5 0V4h5zm1 0V4H15v10a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V4h3.5v-.5a3.5 3.5 0 1 1 7 0M14 14V5H2v9a1 1 0 0 0 1 1h10a1 1 0 0 0 1-1M8 7.993c1.664-1.711 5.825 1.283 0 5.132-5.825-3.85-1.664-6.843 0-5.132" />
                            </svg>
                        </Link>
                        <Link to="/" className="text-decoration-none mx-3">
                            <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" fill="currentColor" className="bi bi-bag-heart" viewBox="0 0 16 16">
                                <path d="M3 4.5a.5.5 0 0 1 .5-.5h6a.5.5 0 1 1 0 1h-6a.5.5 0 0 1-.5-.5m0 2a.5.5 0 0 1 .5-.5h6a.5.5 0 1 1 0 1h-6a.5.5 0 0 1-.5-.5m0 2a.5.5 0 0 1 .5-.5h6a.5.5 0 1 1 0 1h-6a.5.5 0 0 1-.5-.5m0 2a.5.5 0 0 1 .5-.5h6a.5.5 0 0 1 0 1h-6a.5.5 0 0 1-.5-.5m0 2a.5.5 0 0 1 .5-.5h6a.5.5 0 0 1 0 1h-6a.5.5 0 0 1-.5-.5M11.5 4a.5.5 0 0 0 0 1h1a.5.5 0 0 0 0-1zm0 2a.5.5 0 0 0 0 1h1a.5.5 0 0 0 0-1zm0 2a.5.5 0 0 0 0 1h1a.5.5 0 0 0 0-1zm0 2a.5.5 0 0 0 0 1h1a.5.5 0 0 0 0-1zm0 2a.5.5 0 0 0 0 1h1a.5.5 0 0 0 0-1z" />
                                <path d="M2.354.646a.5.5 0 0 0-.801.13l-.5 1A.5.5 0 0 0 1 2v13H.5a.5.5 0 0 0 0 1h15a.5.5 0 0 0 0-1H15V2a.5.5 0 0 0-.053-.224l-.5-1a.5.5 0 0 0-.8-.13L13 1.293l-.646-.647a.5.5 0 0 0-.708 0L11 1.293l-.646-.647a.5.5 0 0 0-.708 0L9 1.293 8.354.646a.5.5 0 0 0-.708 0L7 1.293 6.354.646a.5.5 0 0 0-.708 0L5 1.293 4.354.646a.5.5 0 0 0-.708 0L3 1.293zm-.217 1.198.51.51a.5.5 0 0 0 .707 0L4 1.707l.646.647a.5.5 0 0 0 .708 0L6 1.707l.646.647a.5.5 0 0 0 .708 0L8 1.707l.646.647a.5.5 0 0 0 .708 0L10 1.707l.646.647a.5.5 0 0 0 .708 0L12 1.707l.646.647a.5.5 0 0 0 .708 0l.509-.51.137.274V15H2V2.118z" />
                            </svg>
                        </Link>

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
                            <Link
                                key={categoria.name}
                                className="nav-link btn btn-outline-light mx-2 p-2 rounded-pill fw-bold d-flex align-items-center gap-2"
                                to={`/category/${categoria.name.toLowerCase()}`}
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
                            </Link>
                        ))}
                    </div>
                </div>
            </nav>
        </header>
    );
}
