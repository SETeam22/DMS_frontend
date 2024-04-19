import React from 'react';
import LoginNavBar from '../components/LoginNavBar';
import { useLocation, useNavigate } from 'react-router-dom';
import {
  useStripe,
  useElements,
  CardNumberElement,
  CardExpiryElement,
  CardCvcElement
} from '@stripe/react-stripe-js';

const CheckoutPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const stripe = useStripe();
  const elements = useElements();
  const order = location.state?.order;



  const handlePaymentSubmission = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) {
      console.error("Stripe has not loaded");
      return;
    }

    //const cardNumberElement = elements.getElement(CardNumberElement);
    //const cardExpiryElement = elements.getElement(CardExpiryElement);
    //const cardCvcElement = elements.getElement(CardCvcElement);
    const cardElement = elements.getElement(CardNumberElement);
    const cardHolderName = event.target.cardholderName.value;

    

    const {error, paymentMethod} = await stripe.createPaymentMethod({
      type: 'card',
      card: cardElement,
      billing_details: {
        // Include other billing details if necessary
        name: cardHolderName,
      },
    });

    if (error) {
      console.error('Payment Error:', error);
    } else {
      console.log('Payment Method:', paymentMethod);
      // Backend payment processing
      navigate('/order-confirmation', { state: { order, paymentMethod } });
    }
  };

  if (!order) {
    return <div>Please place an order before checking out.</div>;
  }

  return (
    <div>
      <LoginNavBar />
    <div className="bg-gray-50 min-h-screen flex items-center justify-center pt-30 p-10">
      <div className="bg-white max-w-2xl mx-auto p-8 shadow-lg w-full rounded-2xl mt-20">
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
            <div className="my-4">
              <label htmlFor="cardholderName" className="block text-sm font-medium text-gray-700">
                Cardholder Name
              </label>
              <input
                type="text"
                id="cardholderName"
                name="cardholderName"
                required
                className="p-4 bg-gray-100 rounded shadow-sm w-full"
                placeholder="Name as it appears on card"
              />
            </div>
            <div className="my-4">
              <label htmlFor="cardNumber" className="block text-sm font-medium text-gray-700">
                Card Number
              </label>
              <CardNumberElement id="cardNumber" className="p-4 bg-gray-100 rounded shadow-sm"/>
            </div>
            <div className="flex">
              <div className="mr-2 flex-1">
                <label htmlFor="cardExpiry" className="block text-sm font-medium text-gray-700">
                  Expiration Date
                </label>
                <CardExpiryElement id="cardExpiry" className="p-4 bg-gray-100 rounded shadow-sm"/>
              </div>
              <div className="ml-2 flex-1">
                <label htmlFor="cardCvc" className="block text-sm font-medium text-gray-700">
                  CVC
                </label>
                <CardCvcElement id="cardCvc" className="p-4 bg-gray-100 rounded shadow-sm"/>
              </div>
            </div>
            <button type="submit" disabled={!stripe} className="bg-[#00df9a] hover:bg-[#00b882] text-white font-medium py-2 px-4 rounded w-full mt-4">
              Pay Now
            </button>
          </form>
        </div>
      </div>
      </div>
    </div>
  );
};

export default CheckoutPage; 

