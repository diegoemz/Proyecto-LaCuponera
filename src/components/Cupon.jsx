import React, { useState } from "react";

export function Cupon({ cupones }) {
  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState("all");

  // Filtrar cupones por categoría seleccionada
  const cuponesFiltrados =
    categoriaSeleccionada === "all"
      ? cupones
      : cupones.filter((cupon) => cupon.categoria.toLowerCase() === categoriaSeleccionada.toLowerCase());

  // Obtener categorías únicas de los cupones
  const categorias = [...new Set(cupones.map((cupon) => cupon.categoria))];

  return (
    <div className="container my-5">
      <div className="container text-center py-5" style={{ background: "linear-gradient(to bottom, #4caf50,rgb(118, 198, 122))", borderRadius: "10px", boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)" }}>
        <h2 className="display-4 font-weight-bold text-white">Cupones Disponibles</h2>
        <p className="mt-4 lead text-white">Descubre nuestras mejores ofertas y ahorra</p>
      </div>
      <hr />

      {/* Filtro de Categorías con dropdown estilizado */}
      <div className="d-flex justify-content-center mb-4">
        <div className="dropdown">
          <button
            className="btn btn-outline-success dropdown-toggle"
            type="button"
            id="dropdownMenuButton"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          >
            {categoriaSeleccionada === "all" ? "Todas las categorías" : categorias.find(c => c.toLowerCase() === categoriaSeleccionada).toUpperCase()}
          </button>
          <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton">
            <li>
              <button className="dropdown-item" onClick={() => setCategoriaSeleccionada("all")}>
                Todas las categorías
              </button>
            </li>
            {categorias.map((categoria, index) => (
              <li key={index}>
                <button
                  className={`dropdown-item ${categoriaSeleccionada === categoria.toLowerCase() ? "active" : ""}`}
                  onClick={() => setCategoriaSeleccionada(categoria.toLowerCase())}
                >
                  {categoria}
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Mostrar los cupones filtrados */}
      <div className="row">
        {cuponesFiltrados.length > 0 ? (
          cuponesFiltrados.map((cupon) => (
            <div className="col-md-4 mb-4" key={cupon.id}>
              <div className="card h-100 shadow border-0 rounded-lg overflow-hidden">
                <img
                  src={cupon.imagen || "/img/default-cupon.jpg"}
                  className="card-img-top"
                  alt={cupon.titulo}
                  style={{ height: "200px", objectFit: "cover" }}
                />
                <div className="card-body d-flex flex-column justify-content-between">
                  <div>
                    <h5 className="card-title font-weight-bold">{cupon.titulo}</h5>
                    <p className="card-text text-muted">{cupon.descripcion}</p>
                    <div className="mb-2">
                      <strong className="text-success">${cupon.precioOferta}</strong>
                      <span className="text-muted ml-2"><del>${cupon.precioRegular}</del></span>
                    </div>
                  </div>
                  <div>
                    <div className="d-flex justify-content-between mt-3">
                      <button
                        className="btn btn-outline-success"
                        onClick={() => {
                          const cuponesGuardados = JSON.parse(localStorage.getItem('cupones') || '[]');
                          if (!cuponesGuardados.some(c => c.id === cupon.id)) {
                            cuponesGuardados.push(cupon);
                            localStorage.setItem('cupones', JSON.stringify(cuponesGuardados));
                            alert('Cupón guardado correctamente');
                          } else {
                            alert('Este cupón ya está guardado');
                          }
                        }}
                      >
                        Obtener cupón
                      </button>
                      <button
                        className="btn btn-light"
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
                        <li className="list-group-item"><strong>Fecha de inicio:</strong> {cupon.fechaInicio ? new Date(cupon.fechaInicio.seconds * 1000).toLocaleDateString() : "No disponible"}</li>
                        <li className="list-group-item"><strong>Fecha de fin:</strong> {cupon.fechaFin ? new Date(cupon.fechaFin.seconds * 1000).toLocaleDateString() : "No disponible"}</li>
                        <li className="list-group-item"><strong>Otros detalles:</strong> {cupon.otrosDetalles || "No especificado"}</li>
                      </ul>
                    </div>
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
  );
}
