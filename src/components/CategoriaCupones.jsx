// src/components/CategoriaCupones.js
import React from "react";
import { useParams } from "react-router-dom";
import { Cupon } from "./Cupon"; // Importar el componente Cupon

export function CategoriaCupones({ cupones }) {
  const { categoria } = useParams(); // Obtener la categoría de los parámetros de la URL
  const cuponesFiltrados = categoria
    ? cupones.filter((cupon) => cupon.categoria.toLowerCase() === categoria.toLowerCase())
    : cupones; // Filtrar los cupones si hay una categoría, sino mostrar todos

  return (
  <Cupon cupones={cuponesFiltrados} />
   // Pasar los cupones filtrados al componente Cupon
   );
}
