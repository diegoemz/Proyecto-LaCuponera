import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';


const Cart = ({ cupones }) => {
  const [savedCupones, setSavedCupones] = useState([]);
  const navigate = useNavigate();


  useEffect(() => {
    const cuponesGuardados = JSON.parse(localStorage.getItem('cupones') || '[]');
    const mergedCupones = cuponesGuardados.map(localCupon => {
      const fullCupon = cupones.find(c => c.id === localCupon.id);
      return { 
        ...localCupon, 
        ...fullCupon,
        quantity: localCupon.quantity || 1 
      };
    });
    setSavedCupones(mergedCupones);
  }, [cupones]);

  const handleQuantityChange = (cuponId, newQuantity) => {
    const updatedCupones = savedCupones.map(cupon => 
      cupon.id === cuponId ? { ...cupon, quantity: Math.max(1, newQuantity) } : cupon
    );
    setSavedCupones(updatedCupones);
    localStorage.setItem('cupones', JSON.stringify(updatedCupones));
  };

  const handleRemoveCupon = (cuponId) => {
    const updatedCupones = savedCupones.filter(cupon => cupon.id !== cuponId);
    setSavedCupones(updatedCupones);
    localStorage.setItem('cupones', JSON.stringify(updatedCupones));
  };

  return (
    <>
    <section className="h-100 h-custom">
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

                    {savedCupones.length > 0 ? (
                      savedCupones.map((cupon) => (
                        <div className="card mb-3" key={cupon.id}>
                          <div className="card-body">
                            <div className="d-flex justify-content-between">
                              <div className="d-flex flex-row align-items-center">
                                <div>
                                  <img
                                    src={cupon.imagen || "/img/default-cupon.jpg"}
                                    className="img-fluid rounded-3"
                                    alt="Shopping item"
                                    style={{ width: '65px', height: '65px' }}
                                  />
                                </div>
                                <div className="ms-3">
                                  <h5>{cupon.titulo}</h5>
                                  <p className="small mb-0">{cupon.descripcion}</p>
                                </div>
                              </div>
                              <div className="d-flex flex-row align-items-center">
                                <div className="d-flex align-items-center" style={{ width: '120px' }}>
                                  <button 
                                    className="btn btn-sm btn-outline-secondary"
                                    onClick={() => handleQuantityChange(cupon.id, cupon.quantity - 1)}
                                  >
                                    -
                                  </button>
                                  <h5 className="fw-normal mb-0 mx-2">{cupon.quantity}</h5>
                                  <button 
                                    className="btn btn-sm btn-outline-secondary"
                                    onClick={() => handleQuantityChange(cupon.id, cupon.quantity + 1)}
                                  >
                                    +
                                  </button>
                                </div>
                                <div style={{ width: '80px' }}>
                                  <h5 className="mb-0">${(cupon.precioOferta * cupon.quantity).toFixed(2)}</h5>
                                </div>
                                <a 
                                  href="#!" 
                                  style={{ color: '#cecece' }}
                                  onClick={() => handleRemoveCupon(cupon.id)}
                                >
                                  <i className="fas fa-trash-alt"></i>
                                </a>
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

                  {/* Payment Section */}
                  <div className="col-lg-5">
                    <div className="card text-white rounded-3" style={{ backgroundColor: 'rgb(31, 59, 54)' }}>
                      <div className="card-body">
                        <div className="d-flex justify-content-between align-items-center mb-4">
                          <h5 className="mb-0">Card details</h5>
    
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

                        <div className="d-flex justify-content-between mb-4">
                          <p className="mb-2">Total</p>
                          <p className="mb-2">
                            ${savedCupones.reduce((total, cupon) => 
                              total + (cupon.precioOferta * cupon.quantity), 0).toFixed(2)}
                          </p>
                        </div>

                        <button
                          type="button"
                          className="btn btn-info btn-block btn-lg"
                          style={{ backgroundColor: 'rgb(88, 149, 105)', borderColor: 'rgb(88, 149, 105)' }}
                          onClick={() => navigate('/checkout')}

                        >
                          <div className="d-flex justify-content-between">
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
