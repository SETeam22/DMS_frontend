// TrackOrder.jsx

import React from 'react';

const TrackOrder = () => {
  // Dummy order data
  const order = {
    orderId: "123456",
    status: "In Transit",
    estimatedDelivery: "March 25, 2024",
    shippingAddress: "123 Main Street, Anytown, USA",
    items: [
      { name: "Product 1", quantity: 2 },
      { name: "Product 2", quantity: 1 }
    ]
  };

  return (
    <div className="container mx-auto p-4">
      <div className="max-w-lg mx-auto bg-green-400 rounded-lg shadow-md p-8 text-black">
        <h2 className="text-2xl font-bold mb-4">Track Order</h2>
        <div className="mb-4">
          <p className="font-semibold">Order ID: {order.orderId}</p>
          <p className="font-semibold">Status: {order.status}</p>
          <p className="font-semibold">Estimated Delivery: {order.estimatedDelivery}</p>
          <p className="font-semibold">Shipping Address: {order.shippingAddress}</p>
        </div>
        <div>
          <h3 className="text-lg font-semibold mb-2">Items</h3>
          {order.items.map((item, index) => (
            <div key={index} className="border-b border-gray-300 pb-2 mb-2">
              <p>{item.name}</p>
              <p>Quantity: {item.quantity}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TrackOrder;
