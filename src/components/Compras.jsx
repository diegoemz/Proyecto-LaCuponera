import React, { useEffect, useState } from "react";
import { db, auth } from "../firebase.js";
import { collection, getDocs, query, where } from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";
import { Link } from "react-router-dom";

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

  if (loading) return (
    <div className="d-flex justify-content-center align-items-center" style={{height: "200vh"}}>
      <div className="spinner-border text-primary" role="status">
        <span className="visually-hidden">Loading...</span>
      </div>
    </div>
  );
  
  if (!usuario) return (
    <div className="container mt-5">
      <div className="alert alert-warning" role="alert">
        <h4 className="alert-heading">Access Denied</h4>
        <p>You must be logged in to view your purchase history.</p>
        <hr />
        <p className="mb-0">Please log in or create an account to continue.</p>
      </div>
    </div>
  );

  if (compras.length === 0) return (
    <div className="container mt-5">
      <div className="alert alert-info" role="alert">
        <h4 className="alert-heading">No Purchases Found</h4>
        <p>It looks like you haven't made any purchases yet.</p>
        <hr />
        <p className="mb-0">Start shopping to see your purchase history here!</p>
      </div>
    </div>
  );

  // Categorizing purchases by status
  const disponibles = compras.filter((compra) => compra.status === "active");
  const canjeados = compras.filter((compra) => compra.status === "canjeado");
  const vencidos = compras.filter((compra) => compra.status === "vencido");

  return (
    <section className="container py-5">
      <h2 className="text-center mb-5 fw-bold">Purchase History</h2>

      <div className="row g-4">
        {/* Available Coupons */}
        <div className="col-12 col-lg-4">
          <div className="card border-0 shadow-sm h-100">
            <div className="card-header bg-success text-white py-3">
              <h3 className="mb-0 fs-4">
                <i className="bi bi-wallet2 me-2"></i>
                Available Coupons
              </h3>
            </div>
            <div className="card-body bg-light">
              {disponibles.length === 0 ? (
                <div className="text-muted text-center py-5">No available coupons</div>
              ) : (
                disponibles.map(compra => (
                  <div key={compra.id} className="mb-4 bg-white rounded-3 shadow-sm overflow-hidden">
                    <div className="p-3">
                      <div className="d-flex justify-content-between align-items-center mb-2">
                        <h5 className="mb-0 text-truncate fs-6">Order #{compra.id.slice(0, 8)}</h5>
                        <span className="badge bg-success">Active</span>
                      </div>
                      <dl className="row mb-0">
                        <dt className="col-sm-4 fw-normal text-muted">Total:</dt>
                        <dd className="col-sm-8 fw-bold">${compra.total.toFixed(2)}</dd>
                        
                        <dt className="col-sm-4 fw-normal text-muted">User:</dt>
                        <dd className="col-sm-8">{compra.usuario.nombres} {compra.usuario.apellidos}</dd>
                        
                        <dt className="col-sm-4 fw-normal text-muted">Date:</dt>
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
                    </div>
                    <div className="bg-light p-3 border-top">
                      <Link to={`/recibo/${compra.id}`} className="btn btn-outline-success w-100">
                        <i className="bi bi-receipt me-2"></i>
                        View Receipt
                      </Link>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>

        {/* Redeemed Coupons */}
        <div className="col-12 col-lg-4">
          <div className="card border-0 shadow-sm h-100">
            <div className="card-header bg-warning text-dark py-3">
              <h3 className="mb-0 fs-4">
                <i className="bi bi-check2-circle me-2"></i>
                Redeemed Coupons
              </h3>
            </div>
            <div className="card-body bg-light">
              {canjeados.length === 0 ? (
                <div className="text-muted text-center py-5">No redeemed coupons</div>
              ) : (
                canjeados.map(compra => (
                  <div key={compra.id} className="mb-3 bg-white rounded-3 shadow-sm p-3">
                    <div className="d-flex justify-content-between align-items-center mb-2">
                      <h6 className="mb-0 text-truncate fs-6">Order #{compra.id.slice(0, 8)}</h6>
                      <span className="badge bg-warning text-dark">Redeemed</span>
                    </div>
                    <p className="mb-1 fw-bold">${compra.total.toFixed(2)}</p>
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
          <div className="card border-0 shadow-sm h-100">
            <div className="card-header bg-danger text-white py-3">
              <h3 className="mb-0 fs-4">
                <i className="bi bi-clock-history me-2"></i>
                Expired Coupons
              </h3>
            </div>
            <div className="card-body bg-light">
              {vencidos.length === 0 ? (
                <div className="text-muted text-center py-5">No expired coupons</div>
              ) : (
                vencidos.map(compra => (
                  <div key={compra.id} className="mb-3 bg-white rounded-3 shadow-sm p-3">
                    <div className="d-flex justify-content-between align-items-center mb-2">
                      <h6 className="mb-0 text-truncate fs-6">Order #{compra.id.slice(0, 8)}</h6>
                      <span className="badge bg-danger">Expired</span>
                    </div>
                    <p className="mb-1 fw-bold">${compra.total.toFixed(2)}</p>
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