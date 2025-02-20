import React, { useEffect, useState } from "react";
import { db } from "../firebase.js";
import { collection, getDocs } from "firebase/firestore";

const Compras = () => {
  const [compras, setCompras] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const obtenerCompras = async () => {
      try {
        const comprasRef = collection(db, "cupones-comprados");
        const comprasSnap = await getDocs(comprasRef);
        const comprasList = comprasSnap.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
        setCompras(comprasList);
      } catch (error) {
        console.error("Error al obtener las compras:", error);
      } finally {
        setLoading(false);
      }
    };

    obtenerCompras();
  }, []);

  if (loading) return <p>Cargando compras...</p>;
  if (compras.length === 0) return <p>No se encontraron compras.</p>;

  return (
    <section className="container mt-4">
      <h2 className="text-center">Historial de Compras</h2>
      <div className="card p-3">
        {compras.map((compra) => (
          <div key={compra.id} className="mb-3">
            <h5>Compra {compra.id}</h5>
            <p><strong>Usuario:</strong> {compra.usuario.nombres} {compra.usuario.apellidos}</p>
            <p><strong>Total:</strong> ${compra.total.toFixed(2)}</p>
            <p><strong>Fecha de Compra:</strong> {new Date(compra.fechaCompra.seconds * 1000).toLocaleString()}</p>
            <a href={`/recibo/${compra.id}`} className="btn btn-primary">Ver Recibo</a>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Compras;
