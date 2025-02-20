import React, { useState } from "react";
import { auth, db } from "../firebase"; // Importa Firestore
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore"; // Importa funciones de Firestore

export const Form = ({ onAuthSuccess, onCloseForm }) => {
    const [nombre, setNombre] = useState("");
    const [apellido, setApellido] = useState("");
    const [dui, setDui] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isRegister, setIsRegister] = useState(true);
    const [error, setError] = useState(null);

    const handleAuth = async (e) => {
        e.preventDefault();
        setError(null);

        try {
            let userCredential;
            if (isRegister) {
                // Registrar usuario en Firebase Authentication
                userCredential = await createUserWithEmailAndPassword(auth, email, password);
                
                // Guardar usuario en Firestore
                await setDoc(doc(db, "usuarios", userCredential.user.uid), {
                    nombre,
                    apellido,
                    dui,
                    email,
                    createdAt: new Date()
                });
            } else {
                // Iniciar sesión
                userCredential = await signInWithEmailAndPassword(auth, email, password);
            }

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
                    {isRegister && (
                        <>
                            <div className="mb-3">
                                <label className="form-label">Nombre</label>
                                <input type="text" className="form-control" value={nombre} onChange={(e) => setNombre(e.target.value)} required />
                            </div>
                            <div className="mb-3">
                                <label className="form-label">Apellido</label>
                                <input type="text" className="form-control" value={apellido} onChange={(e) => setApellido(e.target.value)} required />
                            </div>
                            <div className="mb-3">
                                <label className="form-label">DUI</label>
                                <input type="text" className="form-control" value={dui} onChange={(e) => setDui(e.target.value)} required />
                            </div>
                        </>
                    )}
                    <div className="mb-3">
                        <label className="form-label">Correo Electrónico</label>
                        <input type="email" className="form-control" value={email} onChange={(e) => setEmail(e.target.value)} required />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Contraseña</label>
                        <input type="password" className="form-control" value={password} onChange={(e) => setPassword(e.target.value)} required />
                    </div>
                    <button type="submit" className="btn btn-success w-100">
                        {isRegister ? "Registrarse" : "Iniciar Sesión"}
                    </button>
                </form>
                <button className="btn btn-link mt-3" onClick={() => setIsRegister(!isRegister)}>
                    {isRegister ? "¿Ya tienes cuenta? Inicia sesión" : "¿No tienes cuenta? Regístrate"}
                </button>
            </div>
        </div>
    );
};
