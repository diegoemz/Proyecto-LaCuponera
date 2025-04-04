import React, { useState, useEffect } from "react";
import { auth, db } from "../firebase"; // Asegúrate de importar correctamente Firebase
import { useNavigate } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore"; // Importamos los métodos necesarios para leer datos de Firestore
import { updatePassword, reauthenticateWithCredential, EmailAuthProvider } from "firebase/auth";

const Cuenta = () => {
  const navigate = useNavigate();
  const [usuario, setUsuario] = useState(null);
  const [nuevaContraseña, setNuevaContraseña] = useState("");
  const [confirmarContraseña, setConfirmarContraseña] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  // Obtener la información del usuario autenticado desde Firestore
  useEffect(() => {
    const user = auth.currentUser;
    if (user) {
      // Obtener datos del usuario desde Firestore usando el email
      const obtenerUsuario = async () => {
        const docRef = doc(db, "usuarios", user.uid); // Utilizamos UID para obtener el documento de Firestore
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          setUsuario(docSnap.data()); // Almacena la información del usuario en el estado
        } else {
          console.log("No se encontró el usuario en Firestore");
        }
      };
      obtenerUsuario();
    } else {
      navigate("/login"); // Redirigir a login si el usuario no está autenticado
    }
  }, [navigate]);

  const cambiarContraseña = async (e) => {
    e.preventDefault();
    
    // Validar que las contraseñas coincidan
    if (nuevaContraseña !== confirmarContraseña) {
      setError("Las contraseñas no coinciden.");
      return;
    }

    try {
      setLoading(true);
      const user = auth.currentUser;

      // Solicitamos al usuario la contraseña actual para reautenticarse
      const credential = EmailAuthProvider.credential(user.email, prompt("Por favor, ingrese su contraseña actual"));

      // Re-autenticar al usuario
      await reauthenticateWithCredential(user, credential);

      // Cambiar la contraseña
      await updatePassword(user, nuevaContraseña);
      alert("Contraseña cambiada con éxito.");
      navigate("/"); // Redirigir a otra página, como la página de inicio
    } catch (error) {
      setError("Hubo un error al cambiar la contraseña. Intenta de nuevo.");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  if (!usuario) return <div>Cargando...</div>;

  return (
    <div className="container mt-5 mb-5">
      <h4 className="text-center mb-4">Mi Cuenta</h4>
      <div className="card shadow-sm rounded-4 p-4">
        <div className="mb-3">
          <strong>Nombre:</strong> {usuario.nombres} {usuario.apellidos}
        </div>
        <div className="mb-3">
          <strong>Email:</strong> {usuario.email}
        </div>
        <div className="mb-3">
          <strong>Dirección:</strong> {usuario.direccion}
        </div>
        <div className="mb-3">
          <strong>DUI:</strong> {usuario.dui}
        </div>
        <div className="mb-3">
          <strong>Teléfono:</strong> {usuario.telefono}
        </div>

        <h5 className="mt-4">Cambiar Contraseña</h5>
        <form onSubmit={cambiarContraseña}>
          <div className="mb-3">
            <label htmlFor="nuevaContraseña" className="form-label">Nueva Contraseña</label>
            <input
              type="password"
              className="form-control"
              id="nuevaContraseña"
              value={nuevaContraseña}
              onChange={(e) => setNuevaContraseña(e.target.value)}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="confirmarContraseña" className="form-label">Confirmar Contraseña</label>
            <input
              type="password"
              className="form-control"
              id="confirmarContraseña"
              value={confirmarContraseña}
              onChange={(e) => setConfirmarContraseña(e.target.value)}
              required
            />
          </div>

          {error && <div className="alert alert-danger">{error}</div>}

          <button type="submit" className="btn btn-primary w-100" disabled={loading}>
            {loading ? "Cambiando..." : "Cambiar Contraseña"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Cuenta;
