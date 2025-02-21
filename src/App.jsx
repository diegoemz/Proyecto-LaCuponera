import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route, useParams } from "react-router-dom";
import { db, auth } from "./firebase.js";
import 'bootstrap/dist/css/bootstrap.min.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import { collection, getDocs } from "firebase/firestore";
import { onAuthStateChanged, signOut } from "firebase/auth";
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import { Header } from "./components/Header.jsx";
import { Carousel } from "./components/Carousel.jsx";
import { Cupon } from "./components/Cupon.jsx";
import { Footer } from "./components/Footer.jsx";
import { Form } from "./components/Form.jsx";
import Cart from "./components/Cart.jsx";
import Checkout from "./components/Checkout.jsx";
import Recibo from "./components/Recibo.jsx";
import Compras from "./components/Compras.jsx";

function CategoriaCupones({ cupones }) {
  let { categoria } = useParams();
  const cuponesFiltrados = cupones.filter(cupon => cupon.categoria.toLowerCase() === categoria.toLowerCase());

  return (
    <>
      <Cupon cupones={cuponesFiltrados} />
    </>
  );
}

function App() {
  const [cupones, setCupones] = useState([]);
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

  const handleSignOut = async () => {
    try {
      await signOut(auth);
      setUsuario(null);
    } catch (error) {
      console.error("Error al cerrar sesión:", error);
    }
  };

  return (
    <Router>
      <div style={{ backgroundColor: "rgb(227, 238, 206)", minHeight: "100vh" }}>
        <Header usuario={usuario} onSignInClick={() => setMostrarForm(true)} onSignOutClick={handleSignOut} />
        
        {alerta && (
          <div className="alert alert-info text-center" role="alert">
            {alerta}
          </div>
        )}

        {mostrarForm && !usuario && (
          <div style={{ position: "fixed", top: 0, left: 0, right: 0, bottom: 0, backgroundColor: "rgba(0, 0, 0, 0.5)", zIndex: 1000 }}>
            <Form onAuthSuccess={() => { setUsuario(auth.currentUser); setMostrarForm(false); }} onCloseForm={() => setMostrarForm(false)} />
          </div>
        )}

        <Routes>
          <Route path="/" element={<><Carousel /><Cupon cupones={cupones} /></>} />
          <Route path="/cart" element={<Cart cupones={cupones} />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/compras" element={<Compras />} />
          <Route path="/category/:categoria" element={<CategoriaCupones cupones={cupones} />} />
          <Route path="/recibo/:id" element={<Recibo />} />
        </Routes>

        <Footer />
      </div>
    </Router>
  );
}

export default App;
