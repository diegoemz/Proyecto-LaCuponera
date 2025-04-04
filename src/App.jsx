import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import { Header } from "./components/Header.jsx";
import { Carousel } from "./components/Carousel.jsx";
import { Cupon } from "./components/Cupon.jsx";
import { Footer } from "./components/Footer.jsx";
import Cart from "./components/Cart.jsx";
import Checkout from "./components/Checkout.jsx";
import Recibo from "./components/Recibo.jsx";
import Compras from "./components/Compras.jsx";
import { Login } from "./components/Login.jsx";  
import { useAuth } from "./hooks/useAuth";  
import { useCupones } from "./hooks/useCupones"; // Importar el hook personalizado

import { CuponDetalle } from "./components/CuponDetalle.jsx"; // Importar el componente de detalles del cupón
import { CategoriaCupones } from "./components/CategoriaCupones.jsx"; // Importar el componente para filtrar por categoría


//

function App() {

  const [mostrarForm, setMostrarForm] = useState(false);

  const { cupones, categorias } = useCupones(); // Usamos el hook para obtener cupones y categorías
  // Usamos el hook useAuth
  const { usuario, alerta, handleSignOut } = useAuth();

  return (
    <Router>
      <div>
        <Header usuario={usuario} onSignInClick={() => setMostrarForm(true)} onSignOutClick={handleSignOut} />

        {alerta && (
          <div className="alert alert-info text-center" role="alert">
            {alerta}
          </div>
        )}

        {mostrarForm && !usuario && (
          <div style={{ position: "fixed", top: 0, left: 0, right: 0, bottom: 0, backgroundColor: "rgba(0, 0, 0, 0.5)", zIndex: 1000 }}>
            <Login onAuthSuccess={() => { setMostrarForm(false); }} onCloseForm={() => setMostrarForm(false)} />
          </div>
        )}

        <Routes>
          <Route path="/" element={<><Carousel /><Cupon cupones={cupones} /></>} />
          <Route path="/cart" element={<Cart cupones={cupones} />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/compras" element={<Compras />} />
          <Route path="/category/:categoria" element={<CategoriaCupones cupones={cupones} />} />
          <Route path="/recibo/:id" element={<Recibo />} />
          <Route path="/cupon/:id" element={<CuponDetalle />} /> {/* Ruta de detalles del cupón */}
        </Routes>

        <Footer />
      </div>
    </Router>
  );
}

export default App;
