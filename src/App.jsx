import React, { useEffect, useState } from "react";
import { db, auth } from "./firebase.js";
import { collection, getDocs } from "firebase/firestore";
import { onAuthStateChanged, signOut } from "firebase/auth";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import { Header } from "./components/header.jsx";
import { Carousel } from "./components/Carousel.jsx";
import { Cupon } from "./components/cupon.jsx";
import { Footer } from "./components/footer.jsx";
import { Form } from "./components/Form.jsx";

function App() {
  const [cupones, setCupones] = useState([]);
  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState(null);
  const [usuario, setUsuario] = useState(null);
  const [mostrarForm, setMostrarForm] = useState(false);
  const [alerta, setAlerta] = useState(null);

  useEffect(() => {
    const obtenerCupones = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "cupones"));
        const cuponesData = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setCupones(cuponesData);
      } catch (error) {
        console.error("Error al obtener cupones:", error);
      }
    };

    obtenerCupones();
  }, []);

  useEffect(() => {
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
    return () => unsubscribe();
  }, []);

  const cuponesFiltrados = categoriaSeleccionada
    ? cupones.filter(cupon => cupon.categoria === categoriaSeleccionada)
    : cupones;

  const handleSignOut = async () => {
    try {
      await signOut(auth);
      setUsuario(null);
    } catch (error) {
      console.error("Error al cerrar sesión:", error);
    }
  };

  return (
    <div style={{ backgroundColor: "rgb(227, 238, 206)", minHeight: "100vh" }}>
      <Header
        onCategorySelect={setCategoriaSeleccionada}
        usuario={usuario}
        onSignInClick={() => setMostrarForm(true)}
        onSignOutClick={handleSignOut}
      />
      {alerta && (
        <div className="alert alert-info text-center" role="alert">
          {alerta}
        </div>
      )}
      {mostrarForm && !usuario && (
        <div style={{ position: "fixed", top: 0, left: 0, right: 0, bottom: 0, backgroundColor: "rgba(0, 0, 0, 0.5)", zIndex: 1000 }}>
          <Form
            onAuthSuccess={() => { setUsuario(auth.currentUser); setMostrarForm(false); }}
            onCloseForm={() => setMostrarForm(false)}
          />
        </div>
      )}
      <Carousel />
      <Cupon cupones={cuponesFiltrados} />
      <Footer />
    </div>
  );
}

export default App;
