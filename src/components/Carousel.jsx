export function Carousel(){
    return (
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
                alt="Foto 1"
              />
            </div>
            <div className="carousel-item" style={{ height: '100%' }}>
              <img
                src='/img/carrusel1.jpg'
                className="d-block w-100 h-100"
                style={{ objectFit: 'cover' }}
                alt="Foto 2"
              />
            </div>
            <div className="carousel-item" style={{ height: '100%' }}>
              <img
                src='/img/prueba3.jpg'
                className="d-block w-100 h-100"
                style={{ objectFit: 'cover' }}
                alt="Foto 3"
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
    );
}