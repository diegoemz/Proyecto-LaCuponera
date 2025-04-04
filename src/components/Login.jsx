import React, { useState } from "react";
import { auth, db } from "../firebase"; // Importamos la configuración de Firebase
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore"; // Importamos la función para guardar datos en Firestore
import { useNavigate } from "react-router-dom";

export function Login({ onAuthSuccess, onCloseForm }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [nombres, setNombres] = useState(""); // Nombres
  const [apellidos, setApellidos] = useState(""); // Apellidos
  const [telefono, setTelefono] = useState(""); // Teléfono
  const [direccion, setDireccion] = useState(""); // Dirección
  const [dui, setDui] = useState(""); // DUI
  const [isRegister, setIsRegister] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  // Función para manejar el login y registro
  const handleAuth = async (e) => {
    e.preventDefault();
    setError(null);

    try {
      if (isRegister) {
        // Registro de nuevo usuario
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;

        // Guardar la información adicional del usuario en Firestore
        await setDoc(doc(db, "usuarios", user.uid), {
          nombres,
          apellidos,
          telefono,
          direccion,
          dui,
          email,
          createdAt: new Date(),
        });

        onAuthSuccess();
        navigate("/");
      } else {
        // Inicio de sesión con usuario existente
        await signInWithEmailAndPassword(auth, email, password);
        onAuthSuccess();
        navigate("/");
      }
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="container d-flex justify-content-center mt-5">
      <div
        className="card p-4 shadow-lg"
        style={{ width: "30rem", backgroundColor: "#f8f9fa", maxHeight: "80vh", overflowY: "auto", borderRadius: "10px" }}
      >
        <button className="btn-close" onClick={onCloseForm}></button>
        <h2 className="text-center mb-4">{isRegister ? "Registrarse" : "Iniciar Sesión"}</h2>
        
        {error && <div className="alert alert-danger">{error}</div>}

        <form onSubmit={handleAuth}>
          {isRegister && (
            <>
              <div className="mb-3">
                <label className="form-label">Nombres</label>
                <input
                  type="text"
                  className="form-control"
                  value={nombres}
                  onChange={(e) => setNombres(e.target.value)}
                  required
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Apellidos</label>
                <input
                  type="text"
                  className="form-control"
                  value={apellidos}
                  onChange={(e) => setApellidos(e.target.value)}
                  required
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Teléfono</label>
                <input
                  type="text"
                  className="form-control"
                  value={telefono}
                  onChange={(e) => setTelefono(e.target.value)}
                  required
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Dirección</label>
                <input
                  type="text"
                  className="form-control"
                  value={direccion}
                  onChange={(e) => setDireccion(e.target.value)}
                  required
                />
              </div>
              <div className="mb-3">
                <label className="form-label">DUI</label>
                <input
                  type="text"
                  className="form-control"
                  value={dui}
                  onChange={(e) => setDui(e.target.value)}
                  required
                />
              </div>
            </>
          )}

          <div className="mb-3">
            <label className="form-label">Correo Electrónico</label>
            <input
              type="email"
              className="form-control"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          
          <div className="mb-3">
            <label className="form-label">Contraseña</label>
            <input
              type="password"
              className="form-control"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button type="submit" className="btn btn-success w-100">{isRegister ? "Registrarse" : "Iniciar Sesión"}</button>
        </form>

        <button
          className="btn btn-link mt-3"
          onClick={() => setIsRegister(!isRegister)}
          style={{ color: "#007bff", textDecoration: "none" }}
        >
          {isRegister ? "¿Ya tienes cuenta? Inicia sesión" : "¿No tienes cuenta? Regístrate"}
        </button>
      </div>
    </div>
  );
}
