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
        <header>
            {/* Parte superior del header */}
            <nav className="navbar navbar-expand-lg navbar-light bg-light shadow-sm">
                <div className="container-fluid">
                    <a className="navbar-brand" href="/">
                        <img src="/img/LogoCuponera.png" alt="Logo de Cuponera" width="200" height="70" className="d-inline-block align-text-top" />
                    </a>
                    <div className="d-flex align-items-center">
                        <a href="#" className="mx-3 text-dark fs-5">❤️</a>
                        <a href="#" className="mx-3 text-dark fs-5">🛒</a>
                        {usuario ? (
                            <button className="btn btn-outline-danger mx-3" onClick={handleSignOut}>Cerrar Sesión</button>
                        ) : (
                            <button className="btn btn-outline-dark mx-3" onClick={onSignInClick}>Iniciar Sesión</button>
                        )}
                    </div>
                </div>
            </nav>

            {/* Parte inferior del header con las categorías */}
            <nav className="navbar navbar-expand-lg py-3" style={{ backgroundColor: '#426b69ff', boxShadow: '0 2px 4px rgba(0,0,0,0.2)' }}>

                <div className="container-fluid justify-content-center">
                    <div className="navbar-nav flex-row gap-3">
{[
    { name: "Belleza", icon: "/img/beauty.svg" },
    { name: "Comida", icon: "/img/food.svg" },
    { name: "Servicios", icon: "/img/services.svg" },
    { name: "Viajes", icon: "/img/trips.svg" },
    { name: "Cosas que hacer", icon: "/img/thiings-to-do.svg" }
].map((categoria) => (
    <a 
        key={categoria.name} 
        className="nav-link btn btn-outline-light mx-2 p-2 rounded-pill text-uppercase fw-bold d-flex align-items-center gap-2"
        href="#" 
        onClick={() => onCategorySelect(categoria.name)}
        style={{ 
            backgroundColor: '#426b69ff',
            borderColor: '#ffffff',
            color: '#ffffff',
            transition: 'all 0.3s ease'
        }}
        onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#5a8a87'}
        onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#426b69ff'}
    >

        <img src={categoria.icon} alt={categoria.name} style={{ width: '24px', height: '24px', objectFit: 'cover', filter: 'brightness(0) invert(0)' }} />


        {categoria.name}
    </a>
))}

                    </div>
                </div>
            </nav>
        </header>
    );
}
