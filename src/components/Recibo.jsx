import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { db } from "../firebase.js";
import { doc, getDoc } from "firebase/firestore";

const Recibo = () => {
  const { id } = useParams(); // Obtener el id del recibo desde la URL
  const [recibo, setRecibo] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const obtenerRecibo = async () => {
      try {
        const reciboRef = doc(db, "cupones-comprados", id);
        const reciboSnap = await getDoc(reciboRef);

        if (reciboSnap.exists()) {
          setRecibo(reciboSnap.data());
        } else {
          console.log("No se encontró el recibo");
        }
      } catch (error) {
        console.error("Error al obtener el recibo:", error);
      } finally {
        setLoading(false);
      }
    };

    obtenerRecibo();
  }, [id]);

  if (loading) return <p>Cargando recibo...</p>;
  if (!recibo) return <p>Recibo no encontrado.</p>;

  return (
    <div className="container mt-4">
      <h2 className="text-center">Recibo de Compra</h2>
      <div className="card p-3">
        <h5>Datos del Usuario</h5>
        <p><strong>Nombre:</strong> {recibo.usuario.nombres} {recibo.usuario.apellidos}</p>
        <p><strong>Email:</strong> {recibo.usuario.email}</p>
        <p><strong>Teléfono:</strong> {recibo.usuario.telefono}</p>
        <p><strong>Dirección:</strong> {recibo.usuario.direccion}</p>
        <hr />
        <h5>Cupones Comprados</h5>
        {recibo.cupones.map((cupon, index) => (
          <div key={index} className="mb-3">
            <h6>{cupon.titulo}</h6>
            <p><strong>Código:</strong> {cupon.codigo}</p>
            <p><strong>Descripción:</strong> {cupon.descripcion}</p>
            <p><strong>Cantidad:</strong> {cupon.quantity}</p>
            <p><strong>Precio Oferta:</strong> ${cupon.precioOferta.toFixed(2)}</p>
            <p><strong>Precio Regular:</strong> ${cupon.precioRegular.toFixed(2)}</p>
          </div>
        ))}
        <hr />
        <h5>Total Pagado: ${recibo.total.toFixed(2)}</h5>
        <p><strong>Fecha de Compra:</strong> {new Date(recibo.fechaCompra.seconds * 1000).toLocaleString()}</p>
      </div>
    </div>
  );
};

export default Recibo;
