import React, { useState, useEffect } from 'react';

const Cart = ({ cupones }) => {
  const [savedCupones, setSavedCupones] = useState([]);

  useEffect(() => {
    const cuponesGuardados = JSON.parse(localStorage.getItem('cupones') || '[]');
    // Merge local storage cupones with current cupones data
    const mergedCupones = cuponesGuardados.map(localCupon => {
      const fullCupon = cupones.find(c => c.id === localCupon.id);
      return { ...localCupon, ...fullCupon };
    });
    setSavedCupones(mergedCupones);
  }, [cupones]);

  const handleRemoveCupon = (cuponId) => {
    const updatedCupones = savedCupones.filter(cupon => cupon.id !== cuponId);
    setSavedCupones(updatedCupones);
    localStorage.setItem('cupones', JSON.stringify(updatedCupones));
  };

  return (
    <>
    <div className="row">
    {savedCupones.length > 0 ? (
      savedCupones.map((cupon) => (
        <div className="col-md-6 mb-4" key={cupon.id}>
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
              
              <div className="row">
                <div className="col-md-6">
                  <p className="card-text"><strong>Precio:</strong> ${cupon.precio}</p>
                  <p className="card-text"><strong>Descuento:</strong> {cupon.descuento}%</p>
                  <p className="card-text"><strong>Categoría:</strong> {cupon.categoria}</p>
                </div>
              </div>

              <div className="mt-3">
                <button
                  className="btn btn-danger w-100"
                  onClick={() => handleRemoveCupon(cupon.id)}
                >
                  Eliminar del carrito
                </button>
              </div>
            </div>
          </div>
        </div>
      ))
    ) : (
      <div className="col-12">
        <p className="text-center">No hay cupones guardados en el carrito.</p>
      </div>
    )}
  </div>
    <section className="h-100 h-custom" style={{ backgroundColor: '#eee' }}>
      <div className="container py-5 h-100">
        <div className="row d-flex justify-content-center align-items-center h-100">
          <div className="col">
            <div className="card">
              <div className="card-body p-4">
                <div className="row">
                  <div className="col-lg-7">
                    <h5 className="mb-3">
                      <a href="#!" className="text-body">
                        <i className="fas fa-long-arrow-alt-left me-2"></i>Continue shopping
                      </a>
                    </h5>
                    <hr />
                    <div className="d-flex justify-content-between align-items-center mb-4">
                      <div>
                        <p className="mb-1">Shopping cart</p>
                      </div>
                      <div>
                        <p className="mb-0">
                          <span className="text-muted">Sort by:</span>
                          <a href="#!" className="text-body">
                            price <i className="fas fa-angle-down mt-1"></i>
                          </a>
                        </p>
                      </div>
                    </div>

                    {/* Item 1 */}
                    <div className="card mb-3">
                      <div className="card-body">
                        <div className="d-flex justify-content-between">
                          <div className="d-flex flex-row align-items-center">
                            <div>
                              <img
                                src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-shopping-carts/img1.webp"
                                className="img-fluid rounded-3"
                                alt="Shopping item"
                                style={{ width: '65px' }}
                              />
                            </div>
                            <div className="ms-3">
                              <h5>Iphone 11 pro</h5>
                              <p className="small mb-0">256GB, Navy Blue</p>
                            </div>
                          </div>
                          <div className="d-flex flex-row align-items-center">
                            <div style={{ width: '50px' }}>
                              <h5 className="fw-normal mb-0">2</h5>
                            </div>
                            <div style={{ width: '80px' }}>
                              <h5 className="mb-0">$900</h5>
                            </div>
                            <a href="#!" style={{ color: '#cecece' }}>
                              <i className="fas fa-trash-alt"></i>
                            </a>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Item 2 */}
                    <div className="card mb-3">
                      <div className="card-body">
                        <div className="d-flex justify-content-between">
                          <div className="d-flex flex-row align-items-center">
                            <div>
                              <img
                                src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-shopping-carts/img2.webp"
                                className="img-fluid rounded-3"
                                alt="Shopping item"
                                style={{ width: '65px' }}
                              />
                            </div>
                            <div className="ms-3">
                              <h5>Samsung galaxy Note 10</h5>
                              <p className="small mb-0">256GB, Navy Blue</p>
                            </div>
                          </div>
                          <div className="d-flex flex-row align-items-center">
                            <div style={{ width: '50px' }}>
                              <h5 className="fw-normal mb-0">2</h5>
                            </div>
                            <div style={{ width: '80px' }}>
                              <h5 className="mb-0">$900</h5>
                            </div>
                            <a href="#!" style={{ color: '#cecece' }}>
                              <i className="fas fa-trash-alt"></i>
                            </a>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Item 3 */}
                    <div className="card mb-3">
                      <div className="card-body">
                        <div className="d-flex justify-content-between">
                          <div className="d-flex flex-row align-items-center">
                            <div>
                              <img
                                src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-shopping-carts/img3.webp"
                                className="img-fluid rounded-3"
                                alt="Shopping item"
                                style={{ width: '65px' }}
                              />
                            </div>
                            <div className="ms-3">
                              <h5>Canon EOS M50</h5>
                              <p className="small mb-0">Onyx Black</p>
                            </div>
                          </div>
                          <div className="d-flex flex-row align-items-center">
                            <div style={{ width: '50px' }}>
                              <h5 className="fw-normal mb-0">1</h5>
                            </div>
                            <div style={{ width: '80px' }}>
                              <h5 className="mb-0">$1199</h5>
                            </div>
                            <a href="#!" style={{ color: '#cecece' }}>
                              <i className="fas fa-trash-alt"></i>
                            </a>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Item 4 */}
                    <div className="card mb-3 mb-lg-0">
                      <div className="card-body">
                        <div className="d-flex justify-content-between">
                          <div className="d-flex flex-row align-items-center">
                            <div>
                              <img
                                src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-shopping-carts/img4.webp"
                                className="img-fluid rounded-3"
                                alt="Shopping item"
                                style={{ width: '65px' }}
                              />
                            </div>
                            <div className="ms-3">
                              <h5>MacBook Pro</h5>
                              <p className="small mb-0">1TB, Graphite</p>
                            </div>
                          </div>
                          <div className="d-flex flex-row align-items-center">
                            <div style={{ width: '50px' }}>
                              <h5 className="fw-normal mb-0">1</h5>
                            </div>
                            <div style={{ width: '80px' }}>
                              <h5 className="mb-0">$1799</h5>
                            </div>
                            <a href="#!" style={{ color: '#cecece' }}>
                              <i className="fas fa-trash-alt"></i>
                            </a>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Payment Section */}
                  <div className="col-lg-5">
                    <div className="card bg-primary text-white rounded-3">
                      <div className="card-body">
                        <div className="d-flex justify-content-between align-items-center mb-4">
                          <h5 className="mb-0">Card details</h5>
                          <img
                            src="https://mdbcdn.b-cdn.net/img/Photos/Avatars/avatar-6.webp"
                            className="img-fluid rounded-3"
                            style={{ width: '45px' }}
                            alt="Avatar"
                          />
                        </div>

                        <p className="small mb-2">Card type</p>
                        <a href="#!" type="submit" className="text-white">
                          <i className="fab fa-cc-mastercard fa-2x me-2"></i>
                        </a>
                        <a href="#!" type="submit" className="text-white">
                          <i className="fab fa-cc-visa fa-2x me-2"></i>
                        </a>
                        <a href="#!" type="submit" className="text-white">
                          <i className="fab fa-cc-amex fa-2x me-2"></i>
                        </a>
                        <a href="#!" type="submit" className="text-white">
                          <i className="fab fa-cc-paypal fa-2x"></i>
                        </a>

                        <form className="mt-4">
                          <div className="form-outline form-white mb-4">
                            <input
                              type="text"
                              id="typeName"
                              className="form-control form-control-lg"
                              placeholder="Cardholder's Name"
                            />
                            <label className="form-label" htmlFor="typeName">
                              Cardholder's Name
                            </label>
                          </div>

                          <div className="form-outline form-white mb-4">
                            <input
                              type="text"
                              id="typeText"
                              className="form-control form-control-lg"
                              placeholder="1234 5678 9012 3457"
                              minLength="19"
                              maxLength="19"
                            />
                            <label className="form-label" htmlFor="typeText">
                              Card Number
                            </label>
                          </div>

                          <div className="row mb-4">
                            <div className="col-md-6">
                              <div className="form-outline form-white">
                                <input
                                  type="text"
                                  id="typeExp"
                                  className="form-control form-control-lg"
                                  placeholder="MM/YYYY"
                                  minLength="7"
                                  maxLength="7"
                                />
                                <label className="form-label" htmlFor="typeExp">
                                  Expiration
                                </label>
                              </div>
                            </div>
                            <div className="col-md-6">
                              <div className="form-outline form-white">
                                <input
                                  type="password"
                                  id="typeText"
                                  className="form-control form-control-lg"
                                  placeholder="&#9679;&#9679;&#9679;"
                                  minLength="3"
                                  maxLength="3"
                                />
                                <label className="form-label" htmlFor="typeText">
                                  Cvv
                                </label>
                              </div>
                            </div>
                          </div>
                        </form>

                        <hr className="my-4" />

                        <div className="d-flex justify-content-between">
                          <p className="mb-2">Subtotal</p>
                          <p className="mb-2">$4798.00</p>
                        </div>

                        <div className="d-flex justify-content-between">
                          <p className="mb-2">Shipping</p>
                          <p className="mb-2">$20.00</p>
                        </div>

                        <div className="d-flex justify-content-between mb-4">
                          <p className="mb-2">Total(Incl. taxes)</p>
                          <p className="mb-2">$4818.00</p>
                        </div>

                        <button
                          type="button"
                          className="btn btn-info btn-block btn-lg"
                        >
                          <div className="d-flex justify-content-between">
                            <span>$4818.00</span>
                            <span>
                              Checkout <i className="fas fa-long-arrow-alt-right ms-2"></i>
                            </span>
                          </div>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    </>
  );
};

export default Cart;
