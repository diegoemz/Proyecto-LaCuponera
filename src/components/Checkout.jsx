import React, { useState, useEffect } from 'react';

const Checkout = ({  }) => {
  const [isCopied, setIsCopied] = useState(false);
  const couponCode = 'KE99-ANRBEY-28SQNE';

  const handleCopy = () => {
    navigator.clipboard.writeText(couponCode);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000); // Reset copied status after 2 seconds
  }

return (
    <>
    <section className="h-100 h-custom">
      <div className="container py-4 h-100">
        <div className="row d-flex justify-content-center align-items-center h-300">
            <div className="col">
                <div className="card">
                    <div className="card-body p-5">
                    <h2 className="text-xl font-bold text-center mb-4">Great job!</h2>
                      <p className="text-center mb-4">
                        You've just claimed your unique coupon code.<br />
                        Please copy the code below:
                      </p>
                      <div className="flex items-center justify-between bg-gray-100 p-2 rounded mb-4">
                        <span className="text-blue-600 font-medium">{couponCode}</span>
                        <button 
                          onClick={handleCopy}
                          className="text-green-500 hover:text-green-700 focus:outline-none">
                          {isCopied ? 'Copied' : 'Copy'}
                        </button>
                      </div>
                      <div className="mb-4">
                        <a href="https://www.amazon.com" className="block text-center bg-yellow-500 text-white rounded py-2 hover:bg-yellow-600">
                          Redeem Coupon on Amazon
                        </a>
                      </div>
                      <p className="text-sm text-center text-gray-600">
                        Not sure how to redeem this coupon? <a href="#" className="text-blue-500">Read this guide.</a>
                      </p>
                      <p className="text-center text-gray-600">
                        Available at <a href="https://www.amazon.com" className="text-orange-600 font-semibold">Amazon</a>
                      </p>

                    </div>  
                </div>
            </div>
        </div>
      </div>
    </section>
    </>
  );
};

export default Checkout;
