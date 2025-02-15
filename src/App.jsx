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

  return (
    <div>
      <Header />
      <Carousel />
      <Cupon cupones={cupones} />
      <Footer />
    </div>
  );
}

export default App;
