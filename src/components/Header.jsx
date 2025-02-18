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
            <nav className="navbar navbar-expand-lg bg-light">
                <div className="container-fluid d-flex justify-content-between">
                    <a className="navbar-brand" href="/">
                        <img src="/img/LogoCuponera.png" alt="Logo de Cuponera" width="200" height="70" />
                    </a>
                    <div className="d-flex align-items-center">
                        <a href="#" className="mx-3 text-dark">❤️</a>
                        <a href="#" className="mx-3 text-dark">🛒</a>
                        {usuario ? (
                            <button className="btn btn-outline-danger mx-3" onClick={handleSignOut}>Sign Out</button>
                        ) : (
                            <button className="btn btn-outline-dark mx-3" onClick={onSignInClick}>Sign In</button>
                        )}
                    </div>
                </div>
            </nav>
            <nav className="navbar navbar-expand-lg py-4">
                <div className="container-fluid">
                    <div className="collapse navbar-collapse justify-content-center">
                        <div className="navbar-nav">
                            {["Belleza", "Comida", "Servicios", "Viajes", "Cosas que hacer"].map((categoria) => (
                                <a 
                                    key={categoria} 
                                    className="nav-link btn btn-outline-light mx-2 p-2"
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

