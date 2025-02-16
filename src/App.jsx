import React, { useEffect, useState } from "react";
import { db } from "./firebase.js";
import { collection, getDocs } from "firebase/firestore";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import { Header } from "./components/header.jsx";
import { Carousel } from "./components/Carousel.jsx";
import { Cupon } from "./components/cupon.jsx";
import { Footer } from "./components/footer.jsx";

function App() {
  const [cupones, setCupones] = useState([]);
  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState(null);

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

  // Filtrar cupones según la categoría seleccionada
  const cuponesFiltrados = categoriaSeleccionada
    ? cupones.filter(cupon => cupon.categoria === categoriaSeleccionada)
    : cupones;

  return (
    <div style={{ backgroundColor: "rgb(227, 238, 206)", minHeight: "100vh" }}>
      <Header onCategorySelect={setCategoriaSeleccionada} />
      <Carousel />
      <Cupon cupones={cuponesFiltrados} />
      <Footer />
    </div>
  );
}

export default App;
