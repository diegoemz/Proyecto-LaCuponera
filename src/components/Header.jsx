export function Header() {
    return (
        <header>
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
        </header>
    );
}
