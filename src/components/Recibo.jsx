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

export default Recibo;
