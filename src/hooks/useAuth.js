// hooks/useAuth.js
import { useState, useEffect } from "react";
import { auth } from "../firebase"; // Importar la configuración de Firebase
import { onAuthStateChanged, signOut } from "firebase/auth"; // Importar los métodos necesarios de Firebase

export function useAuth() {
  const [usuario, setUsuario] = useState(null);
  const [alerta, setAlerta] = useState(null);

  useEffect(() => {
    // Manejar el estado de sesión del usuario
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUsuario(user);
        setAlerta("¡Has iniciado sesión correctamente!");
        setTimeout(() => setAlerta(null), 3000);
      } else {
        setUsuario(null);
        setAlerta("Has cerrado sesión.");
        setTimeout(() => setAlerta(null), 3000);
      }
    });

    return () => unsubscribe(); // Limpiar el listener cuando el componente se desmonte
  }, []);

  // Función para cerrar sesión
  const handleSignOut = async () => {
    try {
      await signOut(auth);
      setUsuario(null);
    } catch (error) {
      console.error("Error al cerrar sesión:", error);
    }
  };

  return { usuario, alerta, handleSignOut };
}
