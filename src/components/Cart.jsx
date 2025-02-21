import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Cart = ({ cupones }) => {
  const [savedCupones, setSavedCupones] = useState([]);
  const [cardholderName, setCardholderName] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [expiration, setExpiration] = useState('');
  const [cvv, setCvv] = useState('');
  const [errors, setErrors] = useState({});
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

  // Función para formatear el número de la tarjeta
  const formatCardNumber = (value) => {
    return value.replace(/\D/g, '').replace(/(\d{4})(?=\d)/g, '$1 ');
  };

  // Validar el formulario al enviar
  const handleCheckout = () => {
    const newErrors = {};

    // Validar nombre del titular
    if (!cardholderName.trim()) {
      newErrors.cardholderName = 'El nombre del titular es requerido.';
    } else if (!/^[A-Za-z\s]+$/.test(cardholderName)) {
      newErrors.cardholderName = 'Solo se permiten letras y espacios.';
    }

    // Validar número de tarjeta
    if (!cardNumber.trim()) {
      newErrors.cardNumber = 'El número de tarjeta es requerido.';
    } else if (cardNumber.replace(/\s/g, '').length !== 16) {
      newErrors.cardNumber = 'El número de tarjeta debe tener 16 dígitos.';
    }

    // Validar fecha de expiración
    if (!expiration.trim()) {
      newErrors.expiration = 'La fecha de expiración es requerida.';
    } else if (!/^\d{2}\/\d{4}$/.test(expiration)) {
      newErrors.expiration = 'El formato debe ser MM/YYYY.';
    }

    // Validar CVV
    if (!cvv.trim()) {
      newErrors.cvv = 'El CVV es requerido.';
    } else if (!/^\d{3}$/.test(cvv)) {
      newErrors.cvv = 'El CVV debe tener 3 dígitos.';
    }

    // Si hay errores, no continuar
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    // Si no hay errores, redirigir al checkout
    navigate('/checkout');
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
                                  <div className="ms-3 px-2">
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
                                value={cardholderName}
                                onChange={(e) => setCardholderName(e.target.value)}
                                onBlur={() => {
                                  if (!/^[A-Za-z\s]+$/.test(cardholderName)) {
                                    setErrors((prev) => ({ ...prev, cardholderName: 'Solo se permiten letras y espacios.' }));
                                  } else {
                                    setErrors((prev) => ({ ...prev, cardholderName: '' }));
                                  }
                                }}
                              />
                              <label className="form-label" htmlFor="typeName">
                                Cardholder's Name
                              </label>
                              {errors.cardholderName && (
                                <div className="text-danger small">{errors.cardholderName}</div>
                              )}
                            </div>

                            <div className="form-outline form-white mb-4">
                              <input
                                type="text"
                                id="typeText"
                                className="form-control form-control-lg"
                                placeholder="1234 5678 9012 3457"
                                value={cardNumber}
                                maxLength={19}
                                onChange={(e) => setCardNumber(formatCardNumber(e.target.value))}
                                onBlur={() => {
                                  if (cardNumber.replace(/\s/g, '').length !== 16) {
                                    setErrors((prev) => ({ ...prev, cardNumber: 'El número de tarjeta debe tener 16 dígitos.' }));
                                  } else {
                                    setErrors((prev) => ({ ...prev, cardNumber: '' }));
                                  }
                                }}
                              />
                              <label className="form-label" htmlFor="typeText">
                                Card Number
                              </label>
                              {errors.cardNumber && (
                                <div className="text-danger small">{errors.cardNumber}</div>
                              )}
                            </div>

                            <div className="row mb-4">
                              <div className="col-md-6">
                                <div className="form-outline form-white">
                                  <input
                                    type="text"
                                    id="typeExp"
                                    className="form-control form-control-lg"
                                    placeholder="MM/YYYY"
                                    maxLength={7}
                                    value={expiration}
                                    onChange={(e) => setExpiration(e.target.value)}
                                    onBlur={() => {
                                      if (!/^\d{2}\/\d{4}$/.test(expiration)) {
                                        setErrors((prev) => ({ ...prev, expiration: 'El formato debe ser MM/YYYY.' }));
                                      } else {
                                        setErrors((prev) => ({ ...prev, expiration: '' }));
                                      }
                                    }}
                                  />
                                  <label className="form-label" htmlFor="typeExp">
                                    Expiration
                                  </label>
                                  {errors.expiration && (
                                    <div className="text-danger small">{errors.expiration}</div>
                                  )}
                                </div>
                              </div>
                              <div className="col-md-6">
                                <div className="form-outline form-white">
                                  <input
                                    type="password"
                                    id="typeText"
                                    className="form-control form-control-lg"
                                    placeholder="&#9679;&#9679;&#9679;"
                                    value={cvv}
                                    maxLength={3}
                                    onChange={(e) => setCvv(e.target.value)}
                                    onBlur={() => {
                                      if (!/^\d{3}$/.test(cvv)) {
                                        setErrors((prev) => ({ ...prev, cvv: 'El CVV debe tener 3 dígitos.' }));
                                      } else {
                                        setErrors((prev) => ({ ...prev, cvv: '' }));
                                      }
                                    }}
                                  />
                                  <label className="form-label" htmlFor="typeText">
                                    CVV
                                  </label>
                                  {errors.cvv && (
                                    <div className="text-danger small">{errors.cvv}</div>
                                  )}
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
                            onClick={handleCheckout}
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