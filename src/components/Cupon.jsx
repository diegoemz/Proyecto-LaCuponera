export function Cupon({ cupones }){
    return (
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
    );
}