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


  return (
    <section className="container py-5">
      <h2 className="text-center mb-5 fw-bold text-green-600">Purchase History</h2>

      <div className="row g-4">
        {/* Available Coupons */}
        <div className="col-12 col-lg-4">
          <div className="card border-success shadow-sm">
            <div className="card-header bg-success text-white">
              <h3 className="mb-0">
                <i className="bi bi-wallet2 me-2"></i>
                Available Coupons ({disponibles.length})
              </h3>
            </div>
            <div className="card-body">
              {disponibles.length === 0 ? (
                <div className="text-muted">No available coupons</div>
              ) : (
                disponibles.map(compra => (
                  <div key={compra.id} className="mb-4 p-3 bg-light rounded">
                    <div className="d-flex justify-content-between align-items-start mb-2">
                      <h5 className="mb-0 text-truncate">Order #{compra.id.slice(0, 8)}</h5>
                      <span className="badge bg-success">Active</span>
                    </div>
                    <dl className="row mb-2">
                      <dt className="col-sm-4">Total:</dt>
                      <dd className="col-sm-8">${compra.total.toFixed(2)}</dd>
                      
                      <dt className="col-sm-4">User:</dt>
                      <dd className="col-sm-8">{compra.usuario.nombres} {compra.usuario.apellidos}</dd>
                      
                      <dt className="col-sm-4">Date:</dt>
                      <dd className="col-sm-8">
                        {new Date(compra.fechaCompra.seconds * 1000).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'short',
                          day: 'numeric',
                          hour: '2-digit',
                          minute: '2-digit'
                        })}
                      </dd>
                    </dl>
                    <div className="d-grid">
                      <a href={`/recibo/${compra.id}`} className="btn btn-outline-success">
                        <i className="bi bi-receipt me-2"></i>
                        View Receipt
                      </a>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>

        {/* Redeemed Coupons */}
        <div className="col-12 col-lg-4">
          <div className="card border-warning shadow-sm">
            <div className="card-header bg-warning text-dark">
              <h3 className="mb-0">
                <i className="bi bi-check2-circle me-2"></i>
                Redeemed Coupons ({canjeados.length})
              </h3>
            </div>
            <div className="card-body">
              {canjeados.length === 0 ? (
                <div className="text-muted">No redeemed coupons</div>
              ) : (
                canjeados.map(compra => (
                  <div key={compra.id} className="mb-3 p-3 bg-light rounded">
                    <div className="d-flex justify-content-between align-items-start mb-2">
                      <h6 className="mb-0 text-truncate">Order #{compra.id.slice(0, 8)}</h6>
                      <span className="badge bg-warning text-dark">Redeemed</span>
                    </div>
                    <p className="mb-1">Total: ${compra.total.toFixed(2)}</p>
                    <small className="text-muted">
                      {new Date(compra.fechaCompra.seconds * 1000).toLocaleDateString()}
                    </small>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>

        {/* Expired Coupons */}
        <div className="col-12 col-lg-4">
          <div className="card border-danger shadow-sm">
            <div className="card-header bg-danger text-white">
              <h3 className="mb-0">
                <i className="bi bi-clock-history me-2"></i>
                Expired Coupons ({vencidos.length})
              </h3>
            </div>
            <div className="card-body">
              {vencidos.length === 0 ? (
                <div className="text-muted">No expired coupons</div>
              ) : (
                vencidos.map(compra => (
                  <div key={compra.id} className="mb-3 p-3 bg-light rounded">
                    <div className="d-flex justify-content-between align-items-start mb-2">
                      <h6 className="mb-0 text-truncate">Order #{compra.id.slice(0, 8)}</h6>
                      <span className="badge bg-danger">Expired</span>
                    </div>
                    <p className="mb-1">Total: ${compra.total.toFixed(2)}</p>
                    <small className="text-muted">
                      {new Date(compra.fechaCompra.seconds * 1000).toLocaleDateString()}
                    </small>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Compras;