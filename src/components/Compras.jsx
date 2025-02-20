import React, { useEffect, useState } from "react";
import { db, auth } from "../firebase.js";
import { collection, getDocs, query, where } from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";

const Compras = () => {
  const [compras, setCompras] = useState([]);
  const [loading, setLoading] = useState(true);
  const [usuario, setUsuario] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUsuario(user);
        obtenerCompras(user);
      } else {
        setUsuario(null);
        setLoading(false);
      }
    });

    return () => unsubscribe(); // Cleanup listener
  }, []);

  const obtenerCompras = async (user) => {
    try {
      const comprasRef = collection(db, "cupones-comprados");
      const q = query(comprasRef, where("usuario.email", "==", user.email));
      const comprasSnap = await getDocs(q);
      const comprasList = comprasSnap.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setCompras(comprasList);
    } catch (error) {
      console.error("Error fetching purchases:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <p>Loading purchases...</p>;
  if (!usuario) return <p>You must be logged in to view your purchases.</p>;
  if (compras.length === 0) return <p>No purchases found.</p>;

  // Categorizing purchases by status
  const disponibles = compras.filter((compra) => compra.status === "active");
  const canjeados = compras.filter((compra) => compra.status === "canjeado");
  const vencidos = compras.filter((compra) => compra.status === "vencido");

  const generarPDF = (compra) => {
    console.log(`Generating PDF for coupon ${compra.id}`);
    // Logic to generate PDF
  };

  return (
    <section className="container mt-4">
      <h2 className="text-center">Purchase History</h2>

      <div className="card p-3">
        <h3>Available Coupons</h3>
        {disponibles.length === 0 ? <p>No available coupons.</p> : disponibles.map(compra => (
          <div key={compra.id} className="mb-3">
            <h5>Purchase {compra.id}</h5>
            <p><strong>Total:</strong> ${compra.total.toFixed(2)}</p>
            <p><strong>Usuario:</strong> {compra.usuario.nombres} {compra.usuario.apellidos}</p>
            <p><strong>Title:</strong> {compra.cupones.titulo}</p>
            <p><strong>Code:</strong> {compra.cupones.codigo}</p>
            <p><strong>Purchase Date:</strong> {new Date(compra.fechaCompra.seconds * 1000).toLocaleString()}</p>
            <button className="btn btn-success" onClick={() => generarPDF(compra)}>Generate PDF</button>
          </div>
        ))}
      </div>

      <div className="card p-3 mt-3">
        <h3>Redeemed Coupons</h3>
        {canjeados.length === 0 ? <p>No redeemed coupons.</p> : canjeados.map(compra => (
          <div key={compra.id} className="mb-3">
            <h5>Purchase {compra.id}</h5>
            <p><strong>Total:</strong> ${compra.total.toFixed(2)}</p>
            <p><strong>Purchase Date:</strong> {new Date(compra.fechaCompra.seconds * 1000).toLocaleString()}</p>
          </div>
        ))}
      </div>

      <div className="card p-3 mt-3">
        <h3>Expired Coupons</h3>
        {vencidos.length === 0 ? <p>No expired coupons.</p> : vencidos.map(compra => (
          <div key={compra.id} className="mb-3">
            <h5>Purchase {compra.id}</h5>
            <p><strong>Total:</strong> ${compra.total.toFixed(2)}</p>
            <p><strong>Purchase Date:</strong> {new Date(compra.fechaCompra.seconds * 1000).toLocaleString()}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Compras;
