import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useCupones } from "../hooks/useCupones"; // Hook para obtener cupones

export function CuponDetalle() {
  const { id } = useParams(); // Obtener el ID del cupón de la URL
  const navigate = useNavigate(); // Hook para navegar hacia atrás
  const { cupones } = useCupones(); // Obtener todos los cupones

  // Buscar el cupón por ID
  const cuponSeleccionado = cupones.find(cupon => cupon.id === id);

  const [cantidad, setCantidad] = useState(1);

  // Funciones para aumentar y disminuir la cantidad
  const aumentarCantidad = () => setCantidad(cantidad + 1);
  const disminuirCantidad = () => {
    if (cantidad > 1) setCantidad(cantidad - 1);
  };

  // Agregar al carrito
  const agregarAlCarrito = () => {
    const cuponesGuardados = JSON.parse(localStorage.getItem('carrito') || '[]');
    cuponesGuardados.push({ ...cuponSeleccionado, cantidad });
    localStorage.setItem('carrito', JSON.stringify(cuponesGuardados));
    alert("Cupón agregado al carrito");
  };

  // Si el cupón no existe, mostrar un mensaje de error
  if (!cuponSeleccionado) {
    return <p>El cupón no fue encontrado.</p>;
  }

  return (
    <div className="container mt-5">
      <div className="row">
        <div className="col-md-6">
          <img
            src={cuponSeleccionado.imagen || "/img/default-cupon.jpg"}
            alt={cuponSeleccionado.titulo}
            className="img-fluid"
          />
        </div>
        <div className="col-md-6">
          <h2>{cuponSeleccionado.titulo}</h2>
          <p><strong>Descripción:</strong> {cuponSeleccionado.descripcion}</p>
          <p><strong>Precio de Oferta:</strong> ${cuponSeleccionado.precioOferta}</p>
          <p><strong>Precio Regular:</strong> <del>${cuponSeleccionado.precioRegular}</del></p>
          <p><strong>Nombre de la Empresa:</strong> {cuponSeleccionado.nombreEmpresa}</p> {/* Nombre de la empresa */}
          <p><strong>Fecha de Inicio:</strong> {new Date(cuponSeleccionado.fechaInicio.seconds * 1000).toLocaleDateString()}</p>
          <p><strong>Fecha de Fin:</strong> {new Date(cuponSeleccionado.fechaFin.seconds * 1000).toLocaleDateString()}</p>
          <p><strong>Fecha Límite de Uso:</strong> {new Date(cuponSeleccionado.fechaLimiteUso.seconds * 1000).toLocaleDateString()}</p>
          <p><strong>Otros Detalles:</strong> {cuponSeleccionado.otrosDetalles}</p>

          <div className="d-flex align-items-center">
            <button className="btn btn-secondary" onClick={disminuirCantidad}>-</button>
            <input type="number" value={cantidad} readOnly className="mx-2" style={{ width: '60px' }} />
            <button className="btn btn-secondary" onClick={aumentarCantidad}>+</button>
          </div>

          <div className="mt-3">
            <button className="btn btn-success w-100" onClick={agregarAlCarrito}>Agregar al carrito</button>
          </div>

          <div className="mt-3">
            <button className="btn btn-link" onClick={() => navigate(-1)}>Regresar arriba</button>
          </div>
        </div>
      </div>
    </div>
  );
}
