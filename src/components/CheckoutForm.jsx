import React, { useState } from 'react';
import { useStripe, useElements, PaymentElement } from '@stripe/react-stripe-js';

const CheckoutForm = ({ clientSecret }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [message, setMessage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) {
      // Stripe.js has not loaded yet. Make sure to disable form submission until Stripe.js has loaded.
      console.error("Stripe has not loaded");
      return;
    }

    setIsLoading(true);

    const { error } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        // Replace with your own return URL where you want to handle the post-payment experience
        return_url: "http://localhost:5173/order-confirmation",
      },
    });

    if (error) {
      // Show error to your customer (e.g., payment details incomplete)
      setMessage(error.message);
      setIsLoading(false);
    } else {
      // The payment has been processed or Stripe.js was initialized with a PaymentIntent or SetupIntent that has already been confirmed.
      // Your customer will be redirected to your `return_url`. In the meantime, you can do other tasks like showing a confirmation message.
    }
  };

  return (
    <form id="payment-form" onSubmit={handleSubmit}>
      <PaymentElement id="payment-element" />
      <button
        disabled={isLoading || !stripe || !elements}
        className="mt-4 w-full bg-blue-500 text-white font-medium py-2 px-4 rounded disabled:bg-gray-400 disabled:cursor-not-allowed"
      >
        {isLoading ? 'Processing...' : 'Pay Now'}
      </button>
      {message && <div id="payment-message" className="text-red-500 mt-2">{message}</div>}
    </form>
  );
};

export default CheckoutForm;
