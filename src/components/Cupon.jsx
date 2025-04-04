import React, { useState } from "react";
import { Link } from "react-router-dom";

export function Cupon({ cupones }) {
  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState("all");

  const cuponesFiltrados =
    categoriaSeleccionada === "all"
      ? cupones
      : cupones.filter((cupon) => cupon.categoria.toLowerCase() === categoriaSeleccionada.toLowerCase());

  const categorias = [...new Set(cupones.map((cupon) => cupon.categoria))];

  return (
    <div className="container">
      <div className="container text-center py-5">
        <h2 className="display-4 font-weight-bold text-black">Cupones Disponibles</h2>
        <p className="mt-4 lead text-black">Descubre nuestras mejores ofertas y ahorra</p>
      </div>
      <hr />

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
                      <Link
                        to={`/cupon/${cupon.id}`}
                        className="btn btn-light"
                      >
                        Más información
                      </Link>
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
