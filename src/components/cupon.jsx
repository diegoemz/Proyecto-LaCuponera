import React from 'react';

const Cupon = () => {
    return (
        <div className="cupon-container">
            <img src="/public/discount-coupon.svg" alt="Cupón de Descuento" className="cupon-image" />
            <div className="cupon-content">
                <h1 className="cupon-title">Título de la Oferta</h1>
                <div className="cupon-prices">
                    <span className="regular-price">Precio Regular: $100</span>
                    <span className="offer-price">Precio de la Oferta: $80</span>
                </div>
                <div className="cupon-dates">
                    <p>Fecha de Inicio: 01/01/2023</p>
                    <p>Fecha de Fin: 31/01/2023</p>
                    <p>Fecha Límite para Usar el Cupón: 28/01/2023</p>
                    <p>Cantidad Límite de Cupones: 50</p>
                </div>
                <div className="cupon-description">
                    <p>Descripción de la Oferta: ¡Disfruta de un 20% de descuento en todos los tratamientos de belleza!</p>
                    <p>Otros Detalles: Válido solo para nuevos clientes.</p>
                </div>
                <a href="#" className="purchase-button">Comprar Ahora</a>
            </div>
        </div>
    );
};

export default Cupon;