import React, { useState, useEffect } from "react";
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
          <div className="card">
            <img
              src={cuponSeleccionado.imagen || "/img/default-cupon.jpg"}
              alt={cuponSeleccionado.titulo}
              className="card-img-top"
            />
          </div>
        </div>
        <div className="col-md-6">
          <div className="card p-4 shadow-sm">
            <h2 className="card-title">{cuponSeleccionado.titulo}</h2>
            <p><strong>Descripción:</strong> {cuponSeleccionado.descripcion}</p>
            <p><strong>Precio de Oferta:</strong> ${cuponSeleccionado.precioOferta}</p>
            <p><strong>Precio Regular:</strong> <del>${cuponSeleccionado.precioRegular}</del></p>
            <p><strong>Nombre de la Empresa:</strong> {cuponSeleccionado.nombreEmpresa}</p>
            <p><strong>Fecha de Inicio:</strong> {new Date(cuponSeleccionado.fechaInicio.seconds * 1000).toLocaleDateString()}</p>
            <p><strong>Fecha de Fin:</strong> {new Date(cuponSeleccionado.fechaFin.seconds * 1000).toLocaleDateString()}</p>
            <p><strong>Fecha Límite de Uso:</strong> {new Date(cuponSeleccionado.fechaLimiteUso.seconds * 1000).toLocaleDateString()}</p>
            <p><strong>Otros Detalles:</strong> {cuponSeleccionado.otrosDetalles}</p>

            <div className="d-flex align-items-center mb-3">
              <button className="btn btn-secondary" onClick={disminuirCantidad}>-</button>
              <input type="number" value={cantidad} readOnly className="mx-2 form-control text-center" style={{ width: '60px' }} />
              <button className="btn btn-secondary" onClick={aumentarCantidad}>+</button>
            </div>

            <div className="mt-3">
              <button className="btn btn-success w-100" onClick={agregarAlCarrito}>Agregar al carrito</button>
            </div>

            <div className="mt-3">
              <button className="btn btn-link" onClick={() => navigate(-1)}>Regresar</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
