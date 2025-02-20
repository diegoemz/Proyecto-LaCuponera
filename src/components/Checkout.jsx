import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getAuth } from "firebase/auth";
import { getFirestore, doc, getDoc, collection, addDoc } from "firebase/firestore";
import { app } from "../firebase";

const Checkout = () => {
  const [user, setUser] = useState(null);
  const [cupones, setCupones] = useState([]);
  const [total, setTotal] = useState(0);
  const navigate = useNavigate();
  const auth = getAuth(app);
  const db = getFirestore(app);

  useEffect(() => {
    const fetchUserData = async () => {
      const currentUser = auth.currentUser;
      if (currentUser) {
        const userRef = doc(db, "usuarios", currentUser.uid);
        const userSnap = await getDoc(userRef);

        if (userSnap.exists()) {
          setUser(userSnap.data());
        } else {
          console.error("No se encontraron datos del usuario en Firestore");
        }
      }
    };

    const fetchCupones = () => {
      const storedCupones = JSON.parse(localStorage.getItem("cupones") || "[]");

      const cuponesConCantidad = storedCupones.map((cupon) => ({
        ...cupon,
        codigo: generarCodigoUnico(),
        quantity: cupon.quantity || 1, // Asegurar que quantity siempre tenga un valor
      }));

      setCupones(cuponesConCantidad);

      // Calcular total a pagar
      const totalPagar = cuponesConCantidad.reduce(
        (acc, cupon) => acc + cupon.precioOferta * cupon.quantity,
        0
      );
      setTotal(totalPagar);
    };

    fetchUserData();
    fetchCupones();
  }, [auth, db]);

  const generarCodigoUnico = () => {
    return Math.random().toString(36).substr(2, 8).toUpperCase();
  };

  const handleConfirmarCompra = async () => {
    if (!user) {
      alert("Debe iniciar sesión para continuar.");
      return;
    }
  
    try {
      const compraRef = await addDoc(collection(db, "cupones-comprados"), {
        usuario: user,
        cupones: cupones,
        total: total,
        fechaCompra: new Date(),
      });
  
      localStorage.removeItem("cupones");
  
      alert("Compra realizada con éxito.");
      navigate(`/recibo/${compraRef.id}`); // Redirigir a la página del recibo con el ID de compra
    } catch (error) {
      console.error("Error al guardar la compra:", error);
      alert("Hubo un error al procesar la compra.");
    }
  };
  

  return (
    <div className="container mt-5">
      <h2 className="mb-4">Confirmar Compra</h2>

      {user ? (
        <div className="card p-3 mb-4">
          <h4>Datos del Usuario</h4>
          <p><strong>Nombre:</strong> {user.nombres} {user.apellidos}</p>
          <p><strong>Correo:</strong> {user.email}</p>
          <p><strong>Teléfono:</strong> {user.telefono}</p>
          <p><strong>Dirección:</strong> {user.direccion}</p>
          <p><strong>DUI:</strong> {user.dui}</p>
        </div>
      ) : (
        <p>Cargando datos del usuario...</p>
      )}

      <h4>Resumen de Cupones</h4>
      {cupones.length > 0 ? (
        cupones.map((cupon) => (
          <div className="card p-3 mb-2" key={cupon.id}>
            <h5>{cupon.titulo}</h5>
            <p><strong>Descripción:</strong> {cupon.descripcion}</p>
            <p><strong>Precio:</strong> ${cupon.precioOferta}</p>
            <p><strong>Cantidad:</strong> {cupon.quantity}</p>
            <p><strong>Subtotal:</strong> ${(cupon.precioOferta * cupon.quantity).toFixed(2)}</p>
            <p><strong>Código Único:</strong> {cupon.codigo}</p>
          </div>
        ))
      ) : (
        <p>No hay cupones en el carrito.</p>
      )}

      <h4 className="mt-4">Total a Pagar: <span className="text-success">${total.toFixed(2)}</span></h4>

      <button className="btn btn-success mt-3" onClick={handleConfirmarCompra}>
        Confirmar Compra
      </button>
    </div>
  );
};

export default Checkout;
