import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';


const CheckoutPage = () => {
 
  const location = useLocation();
  const navigate = useNavigate();
  const stripe = useStripe();
  const elements = useElements();
  const order = location.state?.order; // Retrieve the order state passed from OrderFormC
  
  const handlePaymentSubmission = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) {
      console.error("Stripe has not loaded");
      return;
    }

    const cardElement = elements.getElement(CardElement);

    const {error, paymentMethod} = await stripe.createPaymentMethod({
      type: 'card',
      card: cardElement,
    });

    if (error) {
      console.error('Payment Error:', error);
    } else {
      console.log('Payment Method:', paymentMethod);
      // Here you would typically handle further backend payment processing
      navigate('/order-confirmation', { state: { order, paymentMethod } });

    }
  };

  if (!order) {
    return <div>Please place an order before checking out.</div>;
  }

  return (
    <div className="bg-gray-50 min-h-screen flex items-center justify-center p-10">
      <div className="bg-white max-w-2xl mx-auto p-8 shadow-lg w-full rounded-2xl">
        <h2 className="text-3xl font-bold text-center text-[#00df9a] mb-6">Checkout</h2>
        <div>
          <h3 className="text-xl font-bold">Customer Details</h3>
          <p><strong>Name:</strong> {order.customerName}</p>
          <p><strong>Delivery Service ID:</strong> {order.deliveryService}</p>
          <p><strong>Pickup Address:</strong> {order.pickupAddress}</p>
          <p><strong>Delivery Address:</strong> {order.deliveryAddress}</p>
        </div>
        <div className="mt-4">
          <h3 className="text-xl font-bold">Order Items</h3>
          {order.orderItems.map((item, index) => (
            <div key={index} className="flex justify-between mt-2 p-2">
              <span>{item.itemName} x {item.quantity}</span>
              <span>${parseFloat(item.price).toFixed(2)}</span>
            </div>
          ))}
          <div className="mt-4">
            <strong>Total:</strong> ${order.orderItems.reduce((total, item) => total + item.quantity * item.price, 0).toFixed(2)}
          </div>
        </div>
        <div className="mt-4">
          <h3 className="text-xl font-bold">Payment Details</h3>
          <form onSubmit={handlePaymentSubmission}>
            <CardElement className="my-4 p-4 bg-gray-100 rounded shadow-sm"/>
            <button type="submit" disabled={!stripe} className="bg-[#00df9a] hover:bg-[#00b882] text-white font-medium py-2 px-4 rounded w-full">
              Pay Now
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
