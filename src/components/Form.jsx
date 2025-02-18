import React, { useState } from "react";
import { auth } from "../firebase";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";

export const Form = ({ onAuthSuccess, onCloseForm }) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isRegister, setIsRegister] = useState(true);
    const [error, setError] = useState(null);

    const handleAuth = async (e) => {
        e.preventDefault();
        setError(null);
        try {
            const userCredential = isRegister
                ? await createUserWithEmailAndPassword(auth, email, password)
                : await signInWithEmailAndPassword(auth, email, password);
            console.log("Usuario autenticado:", userCredential.user);
            onAuthSuccess();
        } catch (error) {
            setError(error.message);
        }
    };

    return (
        <div className="container d-flex justify-content-center mt-5">
            <div className="card p-4 shadow" style={{ width: "25rem", backgroundColor: "#d4edda" }}>
                <button className="btn-close" onClick={onCloseForm}></button>
                <h2 className="text-center">{isRegister ? "Registro" : "Iniciar Sesión"}</h2>
                {error && <div className="alert alert-danger">{error}</div>}
                <form onSubmit={handleAuth}>
                    <div className="mb-3">
                        <label className="form-label">Correo Electrónico</label>
                        <input type="email" className="form-control" value={email} onChange={(e) => setEmail(e.target.value)} required />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Contraseña</label>
                        <input type="password" className="form-control" value={password} onChange={(e) => setPassword(e.target.value)} required />
                    </div>
                    <button type="submit" className="btn btn-success w-100">{isRegister ? "Registrarse" : "Iniciar Sesión"}</button>
                </form>
                <button className="btn btn-link mt-3" onClick={() => setIsRegister(!isRegister)}>
                    {isRegister ? "¿Ya tienes cuenta? Inicia sesión" : "¿No tienes cuenta? Regístrate"}
                </button>
            </div>
        </div>
    );
};
