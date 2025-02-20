import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { db } from "../firebase.js";
import { doc, getDoc } from "firebase/firestore";

const Recibo = () => {
  const { id } = useParams();
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
    <section className="h-100 h-custom">
<<<<<<< Updated upstream
    <div className="container py-4 h-100">
      <div className="row d-flex justify-content-center align-items-center h-300">
        <div className="card">
          <div className="card-body">
            <div className="container mb-5 mt-3">
              <div className="row d-flex align-items-baseline">
                <div className="col-xl-9">
                  <p style={{ color: "#7e8d9f", fontSize: "20px" }}>
                    Invoice >> <strong>ID: #{id}</strong>
                  </p>
                </div>
                <div className="col-xl-3 float-end gap-2">
                  <button className="btn btn-light text-capitalize border-0">
                    <i className="fas fa-print text-primary"></i> Print
                  </button>
                  <button className="btn btn-light text-capitalize">
                    <i className="far fa-file-pdf text-danger"></i> Export
                  </button>
                </div>
              </div>
              <hr />
              <div className="row">
                <div className="col-xl-8">
                  <ul className="list-unstyled">
                    <li className="text-muted">To: <span style={{ color: "#5d9fc5" }}>{recibo.usuario.nombres} {recibo.usuario.apellidos}</span></li>
                    <li className="text-muted">{recibo.usuario.direccion}</li>
                    <li className="text-muted"><i className="fas fa-phone"></i> {recibo.usuario.telefono}</li>
                  </ul>
                </div>
                <div className="col-xl-4">
                  <p className="text-muted">Invoice</p>
                  <ul className="list-unstyled">
                    <li className="text-muted"><span className="fw-bold">Fecha:</span> {new Date(recibo.fechaCompra.seconds * 1000).toLocaleString()}</li>
                    <li className="text-muted"><span className="fw-bold">Estado:</span> <span className="badge bg-success text-black fw-bold">Pagado</span></li>
                  </ul>
                </div>
              </div>
              <div className="row my-2 mx-1 justify-content-center">
                <table className="table table-striped table-borderless">
                  <thead style={{ backgroundColor: "#84B0CA" }} className="text-white">
                    <tr>
                      <th>#</th>
                      <th>Descripción</th>
                      <th>Cantidad</th>
                      <th>Precio Oferta</th>
                      <th>Codigo</th>
                      <th>Total</th>
                    </tr>
                  </thead>
                  <tbody>
                    {recibo.cupones.map((cupon, index) => (
                      <tr key={index}>
                        <th>{index + 1}</th>
                        <td>{cupon.titulo}</td>
                        <td>{cupon.quantity}</td>
                        <td>${cupon.precioOferta.toFixed(2)}</td>
                        <td>{cupon.codigo}</td>
                        <td>${(cupon.quantity * cupon.precioOferta).toFixed(2)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="row">
                <div className="col-xl-8">
                  <p className="ms-3">Añadir notas adicionales e información de pago</p>
                </div>
                <div className="col-xl-3">
                  <ul className="list-unstyled">
                    <li className="text-muted ms-3"><span className="text-black me-4">Total Pagado:</span> ${recibo.total.toFixed(2)}</li>
                  </ul>
                </div>
              </div>
              <hr />
              <div className="row">
                <div className="col-xl-10">
                  <p>Gracias por su compra</p>
=======
      <div className="container py-4 h-100">
        <div className="row d-flex justify-content-center align-items-center">
          <div className="col">
            <div className="card">
              <div className="container mt-5 mb-5">
                <h5>Recibo de Compra</h5>
                <div className="invoice py-3">
                  <div>
                    <span className="font-weight-bold">Nombre:</span> {recibo.usuario.nombres} {recibo.usuario.apellidos}
                  </div>
                  <div>
                    <span className="font-weight-bold">Email:</span> {recibo.usuario.email}
                  </div>
                  <div>
                    <span className="font-weight-bold">Teléfono:</span> {recibo.usuario.telefono}
                  </div>
                  <div>
                    <span className="font-weight-bold">Dirección:</span> {recibo.usuario.direccion}
                  </div>
                  <hr />

                  <div className="product table-responsive">
                    <h5>Cupones Comprados</h5>
                    <table className="table table-borderless">
                      <tbody>
                        {recibo.cupones.map((cupon, index) => (
                          <tr key={index}>
                            <td width="20%">
                              <img src={cupon.imagen || "https://via.placeholder.com/90"} width="90" alt={cupon.titulo} />
                            </td>
                            <td width="60%">
                              <span className="font-weight-bold">{cupon.titulo}</span> <hr />
                              <div className="product-qty">
                                <span>Cantidad: {cupon.quantity}</span> <hr />
                                <span>Descripción: {cupon.descripcion}</span>
                              </div>
                            </td>
                            <td width="20%" className="text-center">
                              <span className="font-weight-bold">{cupon.codigo}</span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>

                  <div className="totals text-right">
                    <hr />
                    <div className="font-weight-bold">Total Pagado: ${recibo.total.toFixed(2)}</div>
                    <div><strong>Fecha de Compra:</strong> {new Date(recibo.fechaCompra.seconds * 1000).toLocaleString()}</div>
                  </div>

                  <p>Te enviaremos un correo de confirmación cuando el cupón sea procesado.</p>
                  <p className="font-weight-bold mb-0">¡Gracias por comprar con nosotros!</p>
                  <span>El equipo de La Cuponera</span>
>>>>>>> Stashed changes
                </div>
              </div>
            </div>
          </div>
        </div>
<<<<<<< Updated upstream
        </div>
=======
>>>>>>> Stashed changes
      </div>
    </section>
  );
};

export default Recibo;