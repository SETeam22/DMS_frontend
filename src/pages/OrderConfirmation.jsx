import React from 'react';
import { useLocation } from 'react-router-dom';

const OrderConfirmation = () => {
  const location = useLocation();
  const { order, paymentMethod } = location.state || {};  // Destructure the order and paymentMethod from the location state

  // Here you would also typically send the order and payment details to your backend for processing if you haven't already done so

  return (
    <div className="bg-gray-50 min-h-screen flex items-center justify-center p-10">
      <div className="bg-white max-w-lg mx-auto p-8 shadow rounded">
        <h2 className="text-3xl font-bold text-center text-[#00df9a] mb-6">Thank you for your order!</h2>
        
        {order ? (
          <>
            <p className="text-center mb-3">Hi {order.customerName}, your order has been confirmed.</p>
            
            <div className="mb-4">
              <h3 className="text-xl font-semibold">Order Summary</h3>
              {order.orderItems.map((item, index) => (
                <div key={index} className="flex justify-between border-b py-2">
                  <span>{item.itemName} x {item.quantity}</span>
                  <span>${parseFloat(item.price).toFixed(2)}</span>
                </div>
              ))}
              <div className="flex justify-between font-bold mt-3">
                <span>Total:</span>
                <span>${order.orderItems.reduce((total, item) => total + item.quantity * item.price, 0).toFixed(2)}</span>
              </div>
            </div>

            <div className="mb-4">
              <h3 className="text-xl font-semibold">Payment Details</h3>
              <p>Card: **** **** **** {paymentMethod?.card?.last4}</p>
            </div>

            <p className="text-center text-gray-600 text-sm">A confirmation email has been sent to your email address.</p>
          </>
        ) : (
          <p className="text-center">No order details available.</p>
        )}

       
      </div>
    </div>
  );
};

export default OrderConfirmation;
