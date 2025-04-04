import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useCupones } from "../hooks/useCupones"; 
export function CuponDetalle() {
  const { id } = useParams(); 
  const navigate = useNavigate(); 
  const { cupones } = useCupones(); 

  const cuponSeleccionado = cupones.find(cupon => cupon.id === id);

  const [cantidad, setCantidad] = useState(1);

  const aumentarCantidad = () => setCantidad(cantidad + 1);
  const disminuirCantidad = () => {
    if (cantidad > 1) setCantidad(cantidad - 1);
  };

  const agregarAlCarrito = () => {
    const cuponesGuardados = JSON.parse(localStorage.getItem('carrito') || '[]');
    cuponesGuardados.push({ ...cuponSeleccionado, cantidad });
    localStorage.setItem('carrito', JSON.stringify(cuponesGuardados));
    alert("Cupón agregado al carrito");
  };

  if (!cuponSeleccionado) {
    return <p>El cupón no fue encontrado.</p>;
  }

  return (
    <div className="container mt-5 mb-5">
      <div className="row mb-4 d-flex align-items-center">
        <div className="col-md-6">
          <div className="card shadow-lg border-0 rounded-4">
            <img
              src={cuponSeleccionado.imagen || "/img/default-cupon.jpg"}
              alt={cuponSeleccionado.titulo}
              className="card-img-top rounded-4"
              style={{ objectFit: "cover", height: "100%" }}
            />
          </div>
        </div>
        <div className="col-md-6">
          <div className="card p-4 shadow-sm rounded-4 border-0">
            <h2 className="card-title text-dark mb-3">{cuponSeleccionado.titulo}</h2>
            <p><strong className="text-secondary">Descripción:</strong> {cuponSeleccionado.descripcion}</p>
            <p><strong className="text-secondary">Precio de Oferta:</strong> ${cuponSeleccionado.precioOferta}</p>
            <p><strong className="text-secondary">Precio Regular:</strong> <del>${cuponSeleccionado.precioRegular}</del></p>
            <p><strong className="text-secondary">Nombre de la Empresa:</strong> {cuponSeleccionado.nombreEmpresa}</p>
            <p><strong className="text-secondary">Fecha de Inicio:</strong> {new Date(cuponSeleccionado.fechaInicio.seconds * 1000).toLocaleDateString()}</p>
            <p><strong className="text-secondary">Fecha de Fin:</strong> {new Date(cuponSeleccionado.fechaFin.seconds * 1000).toLocaleDateString()}</p>
            <p><strong className="text-secondary">Fecha Límite de Uso:</strong> {new Date(cuponSeleccionado.fechaLimiteUso.seconds * 1000).toLocaleDateString()}</p>
            <p><strong className="text-secondary">Otros Detalles:</strong> {cuponSeleccionado.otrosDetalles}</p>

            <div className="d-flex align-items-center mb-3">
              <button 
                className="btn btn-outline-success rounded-circle shadow-sm" 
                onClick={disminuirCantidad}
                style={{ fontSize: "1.5rem", borderColor: "#28a745", color: "#28a745" }}
              >
                -
              </button>
              <input 
                type="number" 
                value={cantidad} 
                readOnly 
                className="mx-2 form-control text-center" 
                style={{ width: "60px", fontSize: "1.2rem", borderColor: "#28a745" }}
              />
              <button 
                className="btn btn-outline-success rounded-circle shadow-sm" 
                onClick={aumentarCantidad}
                style={{ fontSize: "1.5rem", borderColor: "#28a745", color: "#28a745" }}
              >
                +
              </button>
            </div>

            <div className="mt-3">
              <button 
                className="btn btn-success w-100 py-2 rounded-3 shadow-sm"
                onClick={agregarAlCarrito}
                style={{ fontSize: "1.1rem" }}
              >
                Agregar al carrito
              </button>
            </div>

            <div className="mt-3">
              <button 
                className="btn btn-link text-dark" 
                onClick={() => navigate(-1)}
                style={{ fontSize: "1rem" }}
              >
                Regresar
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
