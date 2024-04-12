import React, { useState, useEffect } from 'react';

import { useNavigate, useLocation } from 'react-router-dom';

const PaymentPage = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const [paymentDetails, setPaymentDetails] = useState({
      cardNumber: '',
      expiryDate: '',
      cvv: '',
      nameOnCard: '',
      billingAddress: '',
    });
  
    const order = location.state?.order; // Assuming you have order details in the state
  
    // Redirect if no order data is present, after component mounts
    useEffect(() => {
      if (!order) {
        navigate('/payment'); 
      }
    }, [order, navigate]);
  
    const handleInputChange = (e) => {
      setPaymentDetails({ ...paymentDetails, [e.target.name]: e.target.value });
    };
  
    const handleSubmit = async (e) => {
      e.preventDefault();
      // Integrate with a payment service API
      // ...
      // On success:
      console.log('Payment Details Submitted:', paymentDetails);
      alert('Payment Successful! Thank you for your purchase.');
      navigate('/order-confirmation'); // Replace with the actual path to your order confirmation page
    };
  

  return (
    <div className="bg-gray-50 min-h-screen flex items-center justify-center p-10">
      <div className="bg-white max-w-2xl mx-auto p-8 shadow-lg w-full rounded-2xl">
        <h2 className="text-3xl font-bold text-center text-[#00df9a] mb-6">Payment Information</h2>

        {order && (
          <div className="mb-6 p-4 border-b-2">
            <h3 className="text-xl font-semibold mb-3">Order Summary</h3>
            {order.orderItems.map((item, index) => (
              <div key={index} className="flex justify-between mb-2">
                <div>{item.itemName}</div>
                <div>Qty: {item.quantity}</div>
                <div>${item.price}</div>
              </div>
            ))}
            <div className="text-lg font-bold">
              Total: ${order.orderItems.reduce((total, item) => total + item.quantity * item.price, 0).toFixed(2)}
            </div>
          </div>
        )}


        <form onSubmit={handleSubmit} className="flex flex-col space-y-6">
          {/* Card Details */}
          <div className="flex flex-col space-y-2">
            <label className="text-gray-700">Card Number:</label>
            <input
              type="text"
              name="cardNumber"
              placeholder="1234 5678 9012 3456"
              maxLength="19"
              value={paymentDetails.cardNumber}
              onChange={handleInputChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
              required
            />
            <label className="text-gray-700">Expiry Date:</label>
            <input
              type="text"
              name="expiryDate"
              placeholder="MM/YY"
              maxLength="5"
              value={paymentDetails.expiryDate}
              onChange={handleInputChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
              required
            />
            <label className="text-gray-700">CVV:</label>
            <input
              type="text"
              name="cvv"
              placeholder="123"
              maxLength="3"
              value={paymentDetails.cvv}
              onChange={handleInputChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
              required
            />
          </div>
          
          {/* Name on Card */}
          <label className="block text-gray-700">
            Name on Card:
            <input
              type="text"
              name="nameOnCard"
              placeholder="Full Name"
              value={paymentDetails.nameOnCard}
              onChange={handleInputChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
              required
            />
          </label>
          
          {/* Billing Address */}
          <label className="block text-gray-700">
            Billing Address:
            <textarea
              name="billingAddress"
              placeholder="1234 Main St, Anytown, CA 12345"
              value={paymentDetails.billingAddress}
              onChange={handleInputChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
              required
            />
          </label>
          
          {/* Submit Button */}
          <button
            type="submit"
            className="bg-[#00df9a] hover:bg-[#00b882] text-white font-medium py-2 px-4 rounded"
          >
            Checkout
          </button>
        </form>
      </div>
    </div>
  );
};

export default PaymentPage;
