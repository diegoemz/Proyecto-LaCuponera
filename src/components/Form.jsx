import React, { useState } from "react";
import { auth, db } from "../firebase";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";

export const Form = ({ onAuthSuccess, onCloseForm }) => {
    const [nombres, setNombre] = useState("");
    const [apellidos, setApellido] = useState("");
    const [telefono, setTelefono] = useState("");
    const [direccion, setDireccion] = useState("");
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
                userCredential = await createUserWithEmailAndPassword(auth, email, password);

                await setDoc(doc(db, "usuarios", userCredential.user.uid), {
                    nombres,
                    apellidos,
                    telefono,
                    direccion,
                    dui,
                    email,
                    createdAt: new Date()
                });
            } else {
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
    <div
        className="card p-4 shadow-lg"
        style={{ width: "30rem", backgroundColor: "#f8f9fa", maxHeight: "80vh", overflowY: "auto", borderRadius: "10px" }}>
        <button className="btn-close" onClick={onCloseForm}></button>
        <h2 className="text-center mb-4" style={{ fontFamily: 'Arial, sans-serif', color: '#343a40' }}>
            {isRegister ? "Registro" : "Iniciar Sesión"}
        </h2>
        {error && <div className="alert alert-danger">{error}</div>}
        <form onSubmit={handleAuth}>
            {isRegister && (
                <>
                    <div className="mb-3">
                        <label className="form-label">Nombres</label>
                        <input type="text" className="form-control" value={nombres} onChange={(e) => setNombre(e.target.value)} required />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Apellidos</label>
                        <input type="text" className="form-control" value={apellidos} onChange={(e) => setApellido(e.target.value)} required />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Teléfono</label>
                        <input type="text" className="form-control" value={telefono} onChange={(e) => setTelefono(e.target.value)} required />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Dirección</label>
                        <input type="text" className="form-control" value={direccion} onChange={(e) => setDireccion(e.target.value)} required />
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
            <button type="submit" className="btn btn-success w-100" style={{ borderRadius: "5px", transition: "background-color 0.3s" }} onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#218838'} onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#28a745'}>
                {isRegister ? "Registrarse" : "Iniciar Sesión"}
            </button>
        </form>
        <button className="btn btn-link mt-3" onClick={() => setIsRegister(!isRegister)} style={{ color: '#007bff', textDecoration: 'none' }}>
            {isRegister ? "¿Ya tienes cuenta? Inicia sesión" : "¿No tienes cuenta? Regístrate"}
        </button>
    </div>
</div>
    );
};
