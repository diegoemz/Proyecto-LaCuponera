// src/hooks/useCupones.js
import { useState, useEffect } from "react";
import { db } from "../firebase"; // Importamos la configuración de Firebase
import { collection, getDocs, query, where } from "firebase/firestore";

export function useCupones() {
  const [cupones, setCupones] = useState([]);
  const [categorias, setCategorias] = useState([]);
  
  // Cargar cupones aprobados y activos
  useEffect(() => {
    const obtenerCupones = async () => {
      try {
        const querySnapshot = await getDocs(query(collection(db, "cupones"), where("estado", "==", "Oferta aprobada"), where("estadoInterno", "==", "Activas")));
        const cuponesData = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setCupones(cuponesData);

        const categoriasData = [...new Set(cuponesData.map(cupon => cupon.categoria))];
        setCategorias(categoriasData);
      } catch (error) {
        console.error("Error al obtener cupones:", error);
      }
    };

    obtenerCupones();
  }, []);

  return { cupones, categorias };
}
