import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getAuth } from "firebase/auth";
import { getFirestore, doc, getDoc, collection, addDoc, updateDoc, increment } from "firebase/firestore";
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

  // Función para generar el código único del cupón
  const generarCodigoUnico = (empresaId) => {
    const numeroAleatorio = Math.floor(1000000 + Math.random() * 9000000);  // Genera un número aleatorio de 7 dígitos
    return `${empresaId}-${numeroAleatorio}`;
  };

  const handleConfirmarCompra = async () => {
    if (!user) {
      alert("Debe iniciar sesión para continuar.");
      return;
    }

    try {
      // Verificar que haya suficiente cantidad de cupones disponibles
      for (const cupon of cupones) {
        if (cupon.cantidadLimite < cupon.quantity) {
          alert(`No hay suficientes cupones de ${cupon.titulo} disponibles.`);
          return;
        }
      }

      // Crear el código único para cada cupón en la compra
      const cuponesConCodigo = cupones.map((cupon) => ({
        ...cupon,
        codigo: generarCodigoUnico(cupon.empresaId),  // Generar el código concatenando el código de la empresa y un número aleatorio
      }));

      // Confirmar la compra
      const compraRef = await addDoc(collection(db, "cupones-comprados"), {
        usuario: user,
        cupones: cuponesConCodigo,
        total: total,
        fechaCompra: new Date(),
        status: "active" // Agregar el estado de la compra
      });

      // Actualizar los cupones en Firestore (disminuir los disponibles y aumentar los vendidos)
      for (const cupon of cupones) {
        const cuponRef = doc(db, "cupones", cupon.id);
        await updateDoc(cuponRef, {
          cuponesVendidos: increment(cupon.quantity),  // Aumentar los cupones vendidos
          cantidadLimite: increment(-cupon.quantity)   // Disminuir los cupones disponibles
        });
      }

      // Limpiar carrito local
      localStorage.removeItem("cupones");

      alert("Compra realizada con éxito.");
      navigate(`/recibo/${compraRef.id}`);  // Redirigir a la página de recibo

    } catch (error) {
      console.error("Error al guardar la compra:", error);
      alert("Hubo un error al procesar la compra.");
    }
  };

  return (
    <section className="h-100 h-custom">
      <div className="container py-4 h-100">
        <div className="row d-flex justify-content-center align-items-center h-300">
          <div className="col">
            <div className="card">
              <div className="container mt-5 mb-5">
                <div className="row d-flex justify-content-center">
                  <div className="col-md-8">
                    <div className="invoice py-3">
                      <h5>Confirmar Compra</h5>
                      {user ? (
                        <>
                          <span className="font-weight-bold d-block mt-4">Hola, {user.nombres} {user.apellidos}</span>
                          <span>Confirma tu compra y se procesará en breve.</span>
                          <hr />

                          <div className="payment-details table-responsive">
                            <table className="table table-borderless">
                              <tbody>
                                <tr>
                                  <td>
                                    <div className="py-2">
                                      <span className="d-block text-muted">Dirección</span>
                                      <span>{user.direccion}</span>
                                    </div>
                                  </td>
                                  <td>
                                    <div className="py-2">
                                      <span className="d-block text-muted">Teléfono</span>
                                      <span>{user.telefono}</span>
                                    </div>
                                  </td>
                                  <td>
                                    <div className="py-2">
                                      <span className="d-block text-muted">Email</span>
                                      <span>{user.email}</span>
                                    </div>
                                  </td>
                                  <td>
                                    <div className="py-2">
                                      <span className="d-block text-muted">DUI</span>
                                      <span>{user.dui}</span>
                                    </div>
                                  </td>
                                </tr>
                              </tbody>
                            </table>
                          </div>
                          <hr />

                          <div className="product table-responsive">
                            <table className="table table-borderless">
                              <tbody>
                                {cupones.map((cupon) => (
                                  <tr key={cupon.codigo}>
                                    <td width="20%">
                                      <img src={cupon.imagen || "https://via.placeholder.com/90"} width="90" alt={cupon.titulo} />
                                    </td>
                                    <td width="60%">
                                      <span className="font-weight-bold">{cupon.titulo}</span> <hr />
                                      <div className="product-qty">
                                        <span className="d-block">Cantidad: {cupon.quantity}</span> <hr />
                                        <span>Descripción: {cupon.descripcion}</span>
                                      </div> <hr />
                                    </td>
                                  </tr>
                                ))}
                              </tbody>
                            </table>
                          </div>

                          <div className="row d-flex justify-content-end">
                            <div className="col-md-5">
                              <table className="table table-borderless">
                                <tbody className="totals">
                                  <tr>
                                    <td>
                                      <div className="text-left">
                                        <span className="text-muted">Subtotal</span>
                                      </div>
                                    </td>
                                    <td>
                                      <div className="text-right">
                                        <span>${total.toFixed(2)}</span>
                                      </div>
                                    </td>
                                  </tr>
                                  <tr>
                                    <td>
                                      <div className="text-left">
                                        <span className="text-muted">Descuento</span>
                                      </div>
                                    </td>
                                    <td>
                                      <div className="text-right">
                                        <span className="text-success">$0.00</span>
                                      </div>
                                    </td>
                                  </tr>
                                  <tr className="border-top border-bottom">
                                    <td>
                                      <div className="text-left">
                                        <span className="font-weight-bold">Total</span>
                                      </div>
                                    </td>
                                    <td>
                                      <div className="text-right">
                                        <span className="font-weight-bold">${total.toFixed(2)}</span>
                                      </div>
                                    </td>
                                  </tr>
                                </tbody>
                              </table>
                            </div>
                          </div>

                          <div className="payment border-top mt-3 mb-3 border-bottom table-responsive">
                            <table className="table table-borderless">
                              <tbody>
                                <tr>
                                  <td>
                                    <div className="py-2">
                                      <span className="d-block text-muted">Fecha de Compra</span>
                                      <span>{new Date().toLocaleDateString()}</span>
                                    </div>
                                  </td>
                                  <td>
                                    <div className="py-2">
                                      <span className="d-block text-muted">Total</span>
                                      <span>${total.toFixed(2)}</span>
                                    </div>
                                  </td>
                                </tr>
                              </tbody>
                            </table>
                          </div>

                          <p>Te enviaremos un correo de confirmación cuando el cupón sea procesado.</p>
                          <p className="font-weight-bold mb-0">¡Gracias por comprar con nosotros!</p>
                          <span>El equipo de La Cuponera</span>
                        </>
                      ) : (
                        <p>Cargando datos del usuario...</p>
                      )}
                    </div>

                    <button className="btn btn-success mt-3" onClick={handleConfirmarCompra}>
                      Confirmar Compra
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Checkout;
