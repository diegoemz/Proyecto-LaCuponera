import React, { useEffect, useState } from "react";
import { db } from "./firebase.js";
import { collection, getDocs } from "firebase/firestore";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

function App() {
  const [cupones, setCupones] = useState([]);

  useEffect(() => {
    const obtenerCupones = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "cupones"));
        const cuponesData = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setCupones(cuponesData);
      } catch (error) {
        console.error("Error al obtener cupones:", error);
      }
    };

    obtenerCupones();
  }, []);

  return (
    <div>
      <nav className="navbar navbar-expand-lg bg-light">
        <div className="container-fluid">
          <a className="navbar-brand" href="#">
            <img
              src="/img/LogoCuponera.png"
              alt="Logo de Cuponera"
              width="200"
              height="70"
              className="d-inline-block align-text-top"
              loading="lazy"
            />
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNavAltMarkup"
            aria-controls="navbarNavAltMarkup"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse justify-content-end" id="navbarNavAltMarkup">
            <div className="navbar-nav" style={{ padding: '0px 15px' }}>
              <a className="nav-link" href="#" aria-label="Belleza">Belleza</a>
              <a className="nav-link" href="#" aria-label="Comida">Comida</a>
              <a className="nav-link" href="#" aria-label="Servicios">Servicios</a>
              <a className="nav-link" href="#" aria-label="Viajes">Viajes</a>
              <a className="nav-link" href="#" aria-label="Cosas que hacer">Cosas que hacer</a>
            </div>
          </div>
        </div>
      </nav>

      <div className="d-flex justify-content-center my-4">
        <div
          id="carouselExample"
          className="carousel slide"
          style={{
            width: '85%',
            height: '500px',
            overflow: 'hidden',
          }}
          data-bs-ride="carousel"
        >
          <div className="carousel-inner" style={{ height: '100%' }}>
            <div className="carousel-item active" style={{ height: '100%' }}>
              <img
                src='/img/prueba1.jpg'
                className="d-block w-100 h-100"
                style={{ objectFit: 'cover' }}
                alt="Teatro"
              />
            </div>
            <div className="carousel-item" style={{ height: '100%' }}>
              <img
                src='/img/prueba3.jpg'
                className="d-block w-100 h-100"
                style={{ objectFit: 'cover' }}
                alt="Desarrollo"
              />
            </div>
          </div>
          <button
            className="carousel-control-prev"
            type="button"
            data-bs-target="#carouselExample"
            data-bs-slide="prev"
          >
            <span className="carousel-control-prev-icon" aria-hidden="true"></span>
            <span className="visually-hidden">Previous</span>
          </button>
          <button
            className="carousel-control-next"
            type="button"
            data-bs-target="#carouselExample"
            data-bs-slide="next"
          >
            <span className="carousel-control-next-icon" aria-hidden="true"></span>
            <span className="visually-hidden">Next</span>
          </button>
        </div>
      </div>

      <div className="container my-4">
        <h2 className="text-center">Cupones Disponibles</h2>
        <hr />
        <div className="row">
          {cupones.length > 0 ? (
            cupones.map((cupon) => (
              <div className="col-md-4 mb-4" key={cupon.id}>
                <div className="card h-100">
                  <img
                    src={cupon.imagen || "/img/default-cupon.jpg"}
                    className="card-img-top"
                    alt={cupon.titulo}
                    style={{ height: "200px", objectFit: "cover" }}
                  />
                  <div className="card-body">
                    <h5 className="card-title">{cupon.titulo}</h5>
                    <p className="card-text">{cupon.descripcion}</p>
                    <div className="d-flex justify-content-between">
                      <a href="#" className="btn btn-primary">Obtener cupón</a>
                      <button
                        className="btn btn-secondary"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target={`#info-${cupon.id}`}
                        aria-expanded="false"
                        aria-controls={`info-${cupon.id}`}
                      >
                        Más información
                      </button>
                    </div>
                    <div className="collapse mt-3" id={`info-${cupon.id}`}>
                      <ul className="list-group">
                        <li className="list-group-item"><strong>Precio regular:</strong> ${cupon.precioRegular}</li>
                        <li className="list-group-item"><strong>Precio oferta:</strong> ${cupon.precioOferta}</li>
                        <li className="list-group-item"><strong>Fecha de inicio:</strong> {new Date(cupon.fechaInicio.seconds * 1000).toLocaleDateString()}</li>
                        <li className="list-group-item"><strong>Fecha de fin:</strong> {new Date(cupon.fechaFin.seconds * 1000).toLocaleDateString()}</li>
                        <li className="list-group-item"><strong>Fecha límite para usar:</strong> {new Date(cupon.fechaLimite.seconds * 1000).toLocaleDateString()}</li>
                        {cupon.cantidadLimite && <li className="list-group-item"><strong>Cantidad límite de cupones:</strong> {cupon.cantidadLimite}</li>}
                        <li className="list-group-item"><strong>Otros detalles:</strong> {cupon.otrosDetalles || "No especificado"}</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p className="text-center">No hay cupones disponibles.</p>
          )}
        </div>
      </div>

      <footer className="bg-dark text-white text-center p-3">
        <p>&copy; 2025 Cuponera. Todos los derechos reservados.</p>
      </footer>
    </div>
  );
}

export default App;
