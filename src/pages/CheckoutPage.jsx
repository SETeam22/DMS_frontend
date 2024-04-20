import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { Tab } from '@mui/material';
import { secureFetch } from '../helper/SecureFetch.jsx';
// import { GooglePayButton } from '@stripe/react-stripe-js'; // Assuming this is available or similar

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
  
      const cardElement = elements.getElement(CardElement);
      const { error, paymentMethod } = await stripe.createPaymentMethod({
          type: 'card',
          card: cardElement,
      });
  
      if (error) {
          console.error('Payment Error:', error);
      } else {
          // Assuming you already calculated total and tax somewhere in your component
  
          const updatedOrder = {
              ...order,
              total: grandTotal.toFixed(2),
              paymentMethod: "card",
              paymentDetails: "paid",
              status: 'Pending',
              driver: null
          };
          console.log(updatedOrder)
          // Use secureFetch or any other method to send the data to your server
          try {
              const response = await secureFetch('http://localhost:3000/api/orders', {
                  method: 'POST',
                  headers: {
                      'Content-Type': 'application/json'
                  },
                  body: JSON.stringify(updatedOrder)
              });
            //   if (!response.ok) {
            //     throw new Error('Failed to update order after payment');
            // }
    
            const responseData = response.data; // Using response.data directly, as per your setup
            console.log('Order updated successfully:', responseData);
            navigate('/order-confirmation', { state: { order: responseData, paymentMethod } });
          } catch (err) {
              console.error('Error updating order:', err);
          }
      }
  };
  
  

    const handleBack = () => {
        navigate(-1); // Go back to the previous page
    };

    const handleCancel = () => {
        navigate('/home'); // Adjust the route as needed
    };

    if (!order) {
        return <div>Please place an order before checking out.</div>;
    }

    const calculateTotal = () => {
      return order.orderItems.reduce((acc, item) => {
          const itemPrice = Number(item.price) || 0;  // Ensuring price is a number
          return acc + (itemPrice);
      }, 0);
  };

  const total = calculateTotal();
  const tax = total * 0.02;  // 2% tax
  const grandTotal = total + tax;


    return (
        <div className="bg-gray-50 min-h-screen flex items-center justify-center p-10">
            <div className="bg-white max-w-2xl mx-auto p-8 shadow-lg w-full rounded-2xl">
                <h2 className="text-3xl font-bold text-center text-[#00df9a] mb-6">Checkout</h2>
                <div>
                    <h3 className="text-xl font-bold">Customer Details</h3>
                    <p><strong>Name:</strong> {order.customerName}</p>
                    <p><strong>Delivery Service ID:</strong> {order.deliveryService}</p>
                    <p><strong>Pickup Address:</strong> {`${order.pickupAddress.street}, ${order.pickupAddress.city}, ${order.pickupAddress.state} ${order.pickupAddress.postalCode}`}</p>
                    <p><strong>Delivery Address:</strong> {`${order.deliveryAddress.street}, ${order.deliveryAddress.city}, ${order.deliveryAddress.state} ${order.deliveryAddress.postalCode}`}</p>
                </div>
                <div className="mt-4">
                    <h3 className="text-xl font-bold">Order Items</h3>
                    {order.orderItems.map((item, index) => (
                        <div key={index} className="flex justify-between mt-2 p-2">
                            <span>{item.itemName} x {item.quantity}</span>
                            <span>${Number(item.price).toFixed(2)}</span>
                        </div>
                    ))}
                   <div className="mt-2 p-2">
                   <div className="flex justify-between mt-2 p-2">
                            <span className="text-x font-bold">Items Total:</span>
                            <span>${total.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between mt-2 p-2">
                            <span className="text-x font-bold">Tax (2%):</span>
                            <span>${tax.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between mt-2 p-2">
                            <span className="text-x font-bold">Total :</span>
                            <span>${grandTotal.toFixed(2)}</span>
                    </div>

                </div>

                </div>
                <div className="mt-4">
                    <h3 className="text-xl font-bold">Payment Details</h3>
                    <form onSubmit={handlePaymentSubmission}>
                        <CardElement className="my-4 p-4 bg-gray-100 rounded shadow-sm"/>

                        <button type="submit" disabled={!stripe} className="bg-[#00df9a] hover:bg-[#00b882] text-white font-medium py-2 px-4 rounded w-full">
                            Pay with Credit Card
                        </button>
                    </form>
                    <div className="flex justify-between mt-2 p-2">
                    <button onClick={handleBack} className="flex mt-2 bg-gray-300 hover:bg-gray-400 text-black font-medium py-2 px-4 rounded">
                        Back
                    </button>
                    <button onClick={handleCancel} className="flex mt-2 bg-[#00df9a] hover:bg-[#00b882] text-white font-medium py-2 px-4 rounded">
                        Cancel
                    </button>
                    </div>
                    
                    
                </div>
            </div>
        </div>
    );
};

export default CheckoutPage;
